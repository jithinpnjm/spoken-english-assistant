// language-portal production server: serves the Docusaurus static build and the AI practice API.
// Modelled on english-coach/server.ts (Express + ws + @google/genai), minus the Vite dev middleware,
// the curriculum/cursor endpoints and Firebase auth (see README "AI practice server" for why).
//
// Routes:
//   GET  /healthz               liveness probe
//   GET  /api/config            public client config (no secrets)
//   POST /api/chat              text practice coach (structured correction loop)
//   POST /api/transcribe        audio -> text (fallback transcript for voice sessions)
//   WS   /api/audio-bridge      Gemini Live voice bridge
//   GET  *                      Docusaurus static site from build/

import http from "http";
import express from "express";
import { GoogleGenAI } from "@google/genai";
import { getRuntimeConfig, logRuntimeValidation } from "./config";
import {
  apiRequestLogger,
  asyncHandler,
  corsForAllowedOrigins,
  errorHandler,
  FixedWindowRateLimiter,
  rateLimit,
  rejectForeignOrigins,
  requireAccessCode,
  validateAudioPayload,
} from "./hardening";
import { attachAudioBridge, AUDIO_BRIDGE_PATH } from "./audioBridge";
import { createChatHandler } from "./coach/chatHandler";
import { serveStaticSite } from "./staticSite";

// Local development convenience: load language-portal/.env if present (never in production images).
if (process.env.NODE_ENV !== "production") {
  try {
    process.loadEnvFile();
  } catch {
    // No .env file — rely on the real environment.
  }
}

const config = getRuntimeConfig();
logRuntimeValidation(config);

const app = express();
app.disable("x-powered-by");
const server = http.createServer(app);
const bridge = attachAudioBridge(server, config);

const ai = new GoogleGenAI({
  apiKey: config.geminiApiKey,
  httpOptions: { headers: { "User-Agent": "language-portal-practice-coach" } },
});

app.get("/healthz", (_req, res) => res.json({ ok: true, live: bridge.stats() }));

app.use("/api", corsForAllowedOrigins(config));
app.use("/api", express.json({ limit: `${Math.ceil(config.maxAudioBase64Bytes / 1_000_000) + 1}mb` }));
app.use(apiRequestLogger);

app.get("/api/config", (_req, res) => {
  res.json({
    liveModel: config.geminiLiveModel,
    audioBridgePath: AUDIO_BRIDGE_PATH,
    browserCredentialExposed: false,
    aiConfigured: Boolean(config.geminiApiKey),
    accessCodeRequired: Boolean(config.practiceAccessCode),
    liveMaxSessionSeconds: config.liveMaxSessionSeconds,
  });
});

const guarded = [rejectForeignOrigins(config), requireAccessCode(config)];

app.post(
  "/api/chat",
  ...guarded,
  rateLimit(new FixedWindowRateLimiter(config.chatRequestsPerMinute, 60_000), "chat"),
  asyncHandler(createChatHandler(ai, config.geminiModel)),
);

app.post(
  "/api/transcribe",
  ...guarded,
  rateLimit(new FixedWindowRateLimiter(config.transcribeRequestsPerMinute, 60_000), "transcribe"),
  validateAudioPayload(config.maxAudioBase64Bytes),
  asyncHandler(async (req, res) => {
    const { audioBase64 } = req.body;
    const mimeType = typeof req.body.mimeType === "string" && /^audio\/[a-z0-9.+-]+$/i.test(req.body.mimeType) ? req.body.mimeType : "audio/wav";
    const response = await ai.models.generateContent({
      model: config.geminiModel,
      contents: [
        {
          parts: [
            { text: "Transcribe this audio exactly as spoken. Return only the spoken words, nothing else. No corrections, no summaries." },
            { inlineData: { mimeType, data: audioBase64 } },
          ],
        },
      ],
    });
    return res.json({ transcript: response.text?.trim() || "" });
  }),
);

app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));
app.use(errorHandler);

serveStaticSite(app, config.staticDir);

server.listen(config.port, "0.0.0.0", () => {
  console.log(`[Server] language-portal listening on http://localhost:${config.port} (static: ${config.staticDir})`);
});

function shutdown(signal: string) {
  console.log(`[Server] ${signal} received, shutting down.`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 8000).unref();
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
