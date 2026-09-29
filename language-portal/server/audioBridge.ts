// WebSocket bridge between the browser and the Gemini Live API (/api/audio-bridge).
// Ported from english-coach/src/server/audioBridge.ts (+ installRealtimeBridge.ts, which only wired it up).
// The Gemini API key never reaches the browser: the browser talks to this bridge, the bridge talks to
// Google with the server-side key.
//
// Changes vs the old bridge:
// - The browser no longer sends a raw system prompt or model name. It sends the lesson context
//   ({topic, level, taskType, prompt}) and the server builds the teacher instruction and picks the model,
//   so the bridge cannot be used as a general-purpose free Gemini Live proxy.
// - Only realtimeInput / clientContent messages are forwarded upstream after setup.
// - Abuse protection (the old bridge had none — it was not behind the Firebase auth middleware):
//   origin check, optional access code, per-IP session rate limit, concurrency caps, max session length,
//   and a max message size.
// - Input and output transcription are requested from Gemini so the UI can show a transcript without a
//   second model call (the client still falls back to /api/transcribe if no transcript arrives).

import type http from "http";
import { WebSocket, WebSocketServer } from "ws";
import type { RuntimeConfig } from "./config";
import { accessCodeMatches, clientIp, FixedWindowRateLimiter, isOriginAllowed } from "./hardening";
import { sanitizeLesson } from "./coach/lesson";
import { buildTeacherPrompt } from "./coach/teacherPrompt";

export const AUDIO_BRIDGE_PATH = "/api/audio-bridge";
const MAX_CLIENT_MESSAGE_BYTES = 512 * 1024;
const SETUP_TIMEOUT_MS = 10_000;

function buildServiceUrl(credential: string) {
  const url = new URL("wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent");
  url.searchParams.set("key", credential);
  return url.toString();
}

function safeJson(raw: WebSocket.RawData) {
  try {
    return JSON.parse(raw.toString());
  } catch {
    return null;
  }
}

/** Close codes that may legally be sent in a close frame. */
function sendableCloseCode(code: number | undefined, fallback = 1011) {
  if (!code) return fallback;
  if ((code >= 1000 && code <= 1003) || (code >= 1007 && code <= 1014) || (code >= 3000 && code <= 4999)) return code;
  return fallback;
}

function shortReason(reason: string) {
  return Buffer.from(reason).subarray(0, 120).toString();
}

export function buildLiveSetup(rawLesson: unknown, config: Pick<RuntimeConfig, "geminiLiveModel" | "geminiLiveVoice">) {
  const lesson = sanitizeLesson(rawLesson);
  const model = config.geminiLiveModel.startsWith("models/") ? config.geminiLiveModel : `models/${config.geminiLiveModel}`;
  return {
    setup: {
      model,
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: config.geminiLiveVoice } } },
      },
      realtimeInputConfig: {
        automaticActivityDetection: {
          startOfSpeechSensitivity: "START_SENSITIVITY_HIGH",
          endOfSpeechSensitivity: "END_SENSITIVITY_HIGH",
          prefixPaddingMs: 20,
          silenceDurationMs: 500,
        },
      },
      inputAudioTranscription: {},
      outputAudioTranscription: {},
      systemInstruction: { parts: [{ text: buildTeacherPrompt({ lesson, mode: "live" }) }] },
    },
  };
}

export function attachAudioBridge(server: http.Server, config: RuntimeConfig, isAuthenticated: (request: http.IncomingMessage) => boolean = () => true) {
  const bridge = new WebSocketServer({ noServer: true, maxPayload: MAX_CLIENT_MESSAGE_BYTES });
  const sessionLimiter = new FixedWindowRateLimiter(config.liveSessionsPerHour, 60 * 60 * 1000);
  const activeByIp = new Map<string, number>();
  let activeTotal = 0;

  server.on("upgrade", (request, socket, head) => {
    const url = new URL(request.url || "", "http://localhost");
    if (url.pathname !== AUDIO_BRIDGE_PATH) {
      socket.destroy();
      return;
    }
    if (!isOriginAllowed(request, config)) {
      socket.write("HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n");
      socket.destroy();
      return;
    }
    if (!isAuthenticated(request)) {
      socket.write("HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n");
      socket.destroy();
      return;
    }
    bridge.handleUpgrade(request, socket, head, (client) => bridge.emit("connection", client, request));
  });

  bridge.on("connection", (client: WebSocket, request: http.IncomingMessage) => {
    const ip = clientIp(request);
    const url = new URL(request.url || "", "http://localhost");

    const reject = (code: string, message: string, closeCode = 1008) => {
      try {
        client.send(JSON.stringify({ bridgeError: { code, message } }));
      } catch {}
      client.close(closeCode, shortReason(message));
    };

    if (!config.geminiApiKey) return reject("not_configured", "Voice practice is not configured on the server.", 1011);
    if (!accessCodeMatches(config, url.searchParams.get("code"))) return reject("access_code_required", "An access code is required for AI practice.");
    if (activeTotal >= config.liveMaxConcurrentTotal) return reject("busy", "Voice practice is busy right now. Please try again in a few minutes.", 1013);
    if ((activeByIp.get(ip) || 0) >= config.liveMaxConcurrentPerIp) return reject("too_many_sessions", "You already have an active voice session. Stop it before starting another.");
    const retryAfter = sessionLimiter.take(ip);
    if (retryAfter > 0) return reject("rate_limited", `Voice session limit reached. Try again in ${Math.ceil(retryAfter / 60)} minute(s).`);

    activeTotal += 1;
    activeByIp.set(ip, (activeByIp.get(ip) || 0) + 1);
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      activeTotal = Math.max(0, activeTotal - 1);
      const remaining = (activeByIp.get(ip) || 1) - 1;
      if (remaining > 0) activeByIp.set(ip, remaining);
      else activeByIp.delete(ip);
      clearTimeout(sessionTimer);
      clearTimeout(setupTimer);
    };

    let upstream: WebSocket | null = null;
    const queue: string[] = [];

    const closeBoth = (code: number, reason: string) => {
      release();
      if (client.readyState === WebSocket.OPEN || client.readyState === WebSocket.CONNECTING) client.close(code, shortReason(reason));
      if (upstream && (upstream.readyState === WebSocket.OPEN || upstream.readyState === WebSocket.CONNECTING)) {
        try { upstream.close(); } catch {}
      }
    };

    const sessionTimer = setTimeout(() => {
      try {
        client.send(JSON.stringify({ bridgeNotice: { code: "session_time_limit", message: `Voice sessions are limited to ${Math.round(config.liveMaxSessionSeconds / 60)} minutes. Start a new session to continue.` } }));
      } catch {}
      closeBoth(4000, "Session time limit reached");
    }, config.liveMaxSessionSeconds * 1000);

    const setupTimer = setTimeout(() => {
      if (upstream) return;
      reject("setup_timeout", "No session setup received.");
      release();
    }, SETUP_TIMEOUT_MS);

    const sendUpstream = (payload: unknown) => {
      const serialized = JSON.stringify(payload);
      if (upstream?.readyState === WebSocket.OPEN) upstream.send(serialized);
      else queue.push(serialized);
    };

    const openUpstream = (setupMessage: unknown) => {
      upstream = new WebSocket(buildServiceUrl(config.geminiApiKey));
      queue.push(JSON.stringify(setupMessage));

      upstream.on("open", () => {
        while (queue.length) upstream!.send(queue.shift()!);
      });
      upstream.on("message", (message) => {
        if (client.readyState === WebSocket.OPEN) client.send(message.toString());
      });
      upstream.on("error", (err) => {
        console.warn("[AudioBridge] Upstream error:", err?.message || err);
        closeBoth(1011, "Audio bridge upstream error");
      });
      upstream.on("close", (code, reason) => {
        if (code !== 1000) console.warn(`[AudioBridge] Upstream closed: ${code} ${reason.toString()}`);
        closeBoth(sendableCloseCode(code, 1000), reason.toString() || "Audio bridge closed");
      });
    };

    client.on("message", (message) => {
      const parsed = safeJson(message);
      if (!parsed || typeof parsed !== "object") {
        client.send(JSON.stringify({ bridgeError: { code: "invalid_json", message: "Invalid JSON sent to audio bridge" } }));
        return;
      }

      if (!upstream) {
        if (!parsed.setupClient) {
          reject("setup_required", "The first message must be setupClient.");
          release();
          return;
        }
        clearTimeout(setupTimer);
        openUpstream(buildLiveSetup(parsed.setupClient.lesson, config));
        return;
      }

      // After setup only audio/text input from the learner is forwarded.
      if (parsed.realtimeInput) sendUpstream({ realtimeInput: parsed.realtimeInput });
      else if (parsed.clientContent) sendUpstream({ clientContent: parsed.clientContent });
    });

    client.on("close", () => closeBoth(1000, "client closed"));
    client.on("error", () => closeBoth(1011, "client error"));
  });

  return {
    stats: () => ({ activeTotal, activeIps: activeByIp.size }),
  };
}
