import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not defined. Gemini features will fail.");
}

const ai = new GoogleGenAI({
  apiKey: apiKey || "",
  httpOptions: {
    headers: {
      "User-Agent": "english-coach-secure",
    },
  },
});

app.post("/api/coach-interaction", async (req: express.Request, res: express.Response) => {
  try {
    const { messageText, userLevel, userName, history, mode, dailyActivity, mistakeMemory, challengeDay } = req.body;
    if (!messageText) return res.status(400).json({ error: "messageText is required in body." });

    const level = userLevel || "Intermediate";
    const name = userName || "Student";
    const memoryText = Array.isArray(mistakeMemory)
      ? mistakeMemory.slice(0, 8).map((m: any) => `${m.mistakeType || m.type}: ${m.count || 0}`).join("\n")
      : "No stored recurring mistakes yet.";

    const systemInstruction = `You are Sky, a premium spoken-English coach for ${name}.
Level: ${level}. Coaching mode: ${mode || "balanced"}.
Daily activity: ${dailyActivity ? JSON.stringify(dailyActivity) : "general practice"}.
Learner memory:\n${memoryText}

Act like a structured language-learning app, not a generic chatbot. Keep coachReply short, natural, and spoken-friendly. Correct useful mistakes, give a natural spoken version, give one micro drill, score fluency/grammar/vocabulary from 1 to 100, and ask exactly one next question. Return JSON only.`;

    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.slice(-12).forEach((item: any) => contents.push({ role: item.role === "user" ? "user" : "model", parts: [{ text: item.text }] }));
    }
    contents.push({ role: "user", parts: [{ text: messageText }] });

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            coachReply: { type: Type.STRING },
            correctedSentence: { type: Type.STRING },
            naturalVersion: { type: Type.STRING },
            mistakes: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { type: { type: Type.STRING }, original: { type: Type.STRING }, corrected: { type: Type.STRING }, explanation: { type: Type.STRING }, severity: { type: Type.STRING } }, required: ["type", "original", "corrected", "explanation", "severity"] } },
            fluencyScore: { type: Type.NUMBER },
            grammarScore: { type: Type.NUMBER },
            vocabularyScore: { type: Type.NUMBER },
            pronunciationFocus: { type: Type.STRING },
            microDrill: { type: Type.OBJECT, properties: { instruction: { type: Type.STRING }, examples: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["instruction", "examples"] },
            repeatPractice: { type: Type.STRING },
            nextQuestion: { type: Type.STRING },
            challengeUpdate: { type: Type.OBJECT, properties: { day: { type: Type.NUMBER }, completedActivity: { type: Type.BOOLEAN }, homework: { type: Type.STRING } }, required: ["day", "completedActivity", "homework"] }
          },
          required: ["coachReply", "correctedSentence", "naturalVersion", "mistakes", "fluencyScore", "grammarScore", "vocabularyScore", "pronunciationFocus", "microDrill", "repeatPractice", "nextQuestion", "challengeUpdate"]
        }
      }
    });

    const payload = JSON.parse((response.text || "{}").trim());
    payload.challengeUpdate ||= { day: challengeDay || 1, completedActivity: false, homework: "Practice for five more minutes." };
    return res.json(payload);
  } catch (err: any) {
    console.error("Coach API Error:", err?.message || err);
    return res.status(500).json({ error: err.message || "Internal Coach API error." });
  }
});

app.get("/api/config", (_req: express.Request, res: express.Response) => {
  return res.json({
    model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
    liveModel: process.env.GEMINI_LIVE_MODEL || "models/gemini-3.1-flash-live-preview",
    apiKeyExposed: false,
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

  app.listen(PORT, "0.0.0.0", () => console.log(`Server successfully started. Running on http://localhost:${PORT}`));
}

bootstrap();
