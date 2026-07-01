import type http from "http";
import { WebSocket, WebSocketServer } from "ws";

interface AudioBridgeOptions {
  credential: string;
  defaultLiveModel: string;
}

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

function normalizeClientSetup(raw: any, defaultLiveModel: string) {
  const setup = raw?.setup || raw?.setupClient || {};
  const model = setup.model || defaultLiveModel;
  const systemText = setup.systemInstruction?.parts?.[0]?.text || setup.systemInstructionText || setup.teacherPrompt || "You are Sky, a concise spoken English teacher. Keep replies short, correct mistakes, and ask one targeted speaking question.";
  const modalities = setup.responseModalities || ["AUDIO"];

  return {
    setup: {
      model,
      generationConfig: {
        responseModalities: modalities,
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: setup.voiceName || "Aoede",
            },
          },
        },
      },
      realtimeInputConfig: {
        automaticActivityDetection: {
          startOfSpeechSensitivity: "START_SENSITIVITY_HIGH",
          endOfSpeechSensitivity: "END_SENSITIVITY_HIGH",
          prefixPaddingMs: 20,
          silenceDurationMs: 500,
        },
      },
      systemInstruction: {
        parts: [{ text: systemText }],
      },
    },
  };
}

export function attachAudioBridge(server: http.Server, options: AudioBridgeOptions) {
  const bridge = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const url = new URL(request.url || "", `http://${request.headers.host}`);
    if (url.pathname !== "/api/audio-bridge") return;
    bridge.handleUpgrade(request, socket, head, (client) => bridge.emit("connection", client, request));
  });

  bridge.on("connection", (client: WebSocket) => {
    if (!options.credential) {
      client.close(1011, "Server credential is not configured");
      return;
    }

    const upstream = new WebSocket(buildServiceUrl(options.credential));
    const queue: string[] = [];
    let setupSeen = false;

    const sendUpstream = (payload: any) => {
      const serialized = typeof payload === "string" ? payload : JSON.stringify(payload);
      if (upstream.readyState === WebSocket.OPEN) upstream.send(serialized);
      else queue.push(serialized);
    };

    upstream.on("open", () => {
      while (queue.length) upstream.send(queue.shift()!);
    });

    upstream.on("message", (message) => {
      if (client.readyState === WebSocket.OPEN) client.send(message.toString());
    });

    upstream.on("error", () => {
      if (client.readyState === WebSocket.OPEN) client.close(1011, "Audio bridge upstream error");
    });

    upstream.on("close", (code, reason) => {
      if (client.readyState === WebSocket.OPEN) client.close(code || 1000, reason.toString() || "Audio bridge closed");
    });

    client.on("message", (message) => {
      const parsed = safeJson(message);
      if (!parsed) {
        client.send(JSON.stringify({ error: "Invalid JSON sent to audio bridge" }));
        return;
      }

      if (!setupSeen && (parsed.setup || parsed.setupClient)) {
        setupSeen = true;
        sendUpstream(normalizeClientSetup(parsed, options.defaultLiveModel));
        return;
      }

      sendUpstream(parsed);
    });

    client.on("close", () => {
      try { upstream.close(); } catch {}
    });

    client.on("error", () => {
      try { upstream.close(); } catch {}
    });
  });
}
