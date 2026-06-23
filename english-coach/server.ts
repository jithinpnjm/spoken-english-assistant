import express from "express";
import path from "path";
import http from "http";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { curriculumCourses, curriculumStats } from "./src/server/curriculumRegistry";
import { startLevelTrack, startModule, startSubsection } from "./src/server/curriculumActions";
import { installRealtimeBridge } from "./src/server/installRealtimeBridge";
import { createCursorCoachHandler } from "./src/server/cursorCoachHandler";

dotenv.config();

const app = express();
const server = http.createServer(app);
installRealtimeBridge(server);
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "10mb" }));

app.use((req, _res, next) => {
  if (req.path.startsWith("/api/")) console.log(`[Server] ${req.method} ${req.path} — ${new Date().toISOString()}`);
  next();
});

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) console.warn("WARNING: GEMINI_API_KEY is not defined. Gemini features will fail.");

const ai = new GoogleGenAI({
  apiKey: apiKey || "",
  httpOptions: { headers: { "User-Agent": "english-coach-cursor-engine" } },
});

app.post("/api/transcribe", async (req: express.Request, res: express.Response) => {
  try {
    const { audioBase64, mimeType = "audio/webm" } = req.body;
    if (!audioBase64) return res.status(400).json({ error: "audioBase64 is required" });

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
      contents: [{ parts: [
        { text: "Transcribe this audio exactly as spoken. Return only the spoken words, nothing else. No punctuation corrections, no summaries." },
        { inlineData: { mimeType, data: audioBase64 } }
      ] }]
    });
    const transcript = response.text?.trim() || "";
    console.log(`[Server] /api/transcribe OK — transcript: "${transcript.slice(0, 80)}"`);
    return res.json({ transcript });
  } catch (err: any) {
    console.error("[Server] Transcribe error:", err?.message || err);
    return res.status(500).json({ error: err.message || "Transcription failed" });
  }
});

app.post("/api/coach-interaction", createCursorCoachHandler(ai));

app.get("/api/curriculum", (_req: express.Request, res: express.Response) => {
  return res.json({ stats: curriculumStats, courses: curriculumCourses });
});

app.post("/api/curriculum/start", async (req: express.Request, res: express.Response) => {
  try {
    const { learnerId, levelBand, moduleId, subsectionId, sessionDay } = req.body;
    if (!learnerId) return res.status(400).json({ error: "learnerId is required" });
    const cursor = subsectionId
      ? await startSubsection({ learnerId, subsectionId, sessionDay })
      : moduleId
        ? await startModule({ learnerId, moduleId, sessionDay })
        : await startLevelTrack({ learnerId, levelBand: levelBand || "Intermediate", sessionDay });
    return res.json({ cursor });
  } catch (err: any) {
    console.error("[Server] curriculum start error:", err?.message || err);
    return res.status(500).json({ error: err.message || "Unable to start curriculum item" });
  }
});

app.get("/api/config", (_req: express.Request, res: express.Response) => {
  return res.json({
    model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
    liveModel: process.env.GEMINI_LIVE_MODEL || "models/gemini-3.1-flash-live-preview",
    browserCredentialExposed: false,
    directBrowserLiveDeprecated: true,
    audioBridgePath: "/api/audio-bridge",
  });
});

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
