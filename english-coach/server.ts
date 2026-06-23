import express from "express";
import path from "path";
import http from "http";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { curriculumCourses, curriculumStats } from "./src/server/curriculumRegistry";
import { startLevelTrack, startModule, startSubsection } from "./src/server/curriculumActions";
import { productModes, productTracks, productionCurriculumSummary } from "./src/server/productionTaxonomy";
import { installRealtimeBridge } from "./src/server/installRealtimeBridge";
import { createCursorCoachHandler } from "./src/server/cursorCoachHandler";
import { apiRequestLogger, asyncHandler, errorHandler, getRuntimeConfig, logRuntimeValidation, validateAudioPayload } from "./src/server/serverHardening";
import { firebaseAuthMiddleware } from "./src/server/serverAuth";

dotenv.config();

const runtimeConfig = getRuntimeConfig();
logRuntimeValidation(runtimeConfig);

const app = express();
const server = http.createServer(app);
installRealtimeBridge(server);
const PORT = runtimeConfig.port;

app.use(express.json({ limit: "10mb" }));
app.use(apiRequestLogger);

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || "",
  httpOptions: { headers: { "User-Agent": "english-coach-cursor-engine" } },
});

const apiAuth = firebaseAuthMiddleware(runtimeConfig);

app.post("/api/transcribe", apiAuth, validateAudioPayload(runtimeConfig.maxAudioBase64Bytes), asyncHandler(async (req: express.Request, res: express.Response) => {
  const { audioBase64, mimeType = "audio/webm" } = req.body;
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
    contents: [{ parts: [
      { text: "Transcribe this audio exactly as spoken. Return only the spoken words, nothing else. No punctuation corrections, no summaries." },
      { inlineData: { mimeType, data: audioBase64 } }
    ] }]
  });
  const transcript = response.text?.trim() || "";
  console.log(`[Server] /api/transcribe OK — transcript length: ${transcript.length}`);
  return res.json({ transcript });
}));

app.post("/api/coach-interaction", apiAuth, createCursorCoachHandler(ai));

app.get("/api/curriculum", apiAuth, (_req: express.Request, res: express.Response) => {
  return res.json({
    stats: curriculumStats,
    courses: curriculumCourses,
    production: {
      summary: productionCurriculumSummary,
      modes: productModes,
      tracks: productTracks,
    },
  });
});

app.post("/api/curriculum/start", apiAuth, asyncHandler(async (req: express.Request, res: express.Response) => {
  const { learnerId, levelBand, moduleId, subsectionId, sessionDay } = req.body;
  if (!learnerId) return res.status(400).json({ error: "learnerId is required" });
  const cursor = subsectionId
    ? await startSubsection({ learnerId, subsectionId, sessionDay })
    : moduleId
      ? await startModule({ learnerId, moduleId, sessionDay })
      : await startLevelTrack({ learnerId, levelBand: levelBand || "Intermediate", sessionDay });
  return res.json({ cursor });
}));

app.get("/api/config", (_req: express.Request, res: express.Response) => {
  return res.json({
    model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
    liveModel: process.env.GEMINI_LIVE_MODEL || "models/gemini-3.1-flash-live-preview",
    browserCredentialExposed: false,
    directBrowserLiveDeprecated: true,
    audioBridgePath: "/api/audio-bridge",
    requireApiAuth: runtimeConfig.requireApiAuth,
    allowedUsersConfigured: true,
  });
});

app.use(errorHandler);

async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  server.listen(PORT, "0.0.0.0", () => console.log(`Server successfully started. Running on http://localhost:${PORT}`));
}

bootstrap();
