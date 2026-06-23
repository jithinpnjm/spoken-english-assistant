import express from "express";
import path from "path";
import http from "http";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { ActivityType, buildLessonStatePrompt, getActivityDefinition } from "./src/lib/curriculum";
import { installRealtimeBridge } from "./src/server/installRealtimeBridge";

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
  httpOptions: { headers: { "User-Agent": "english-coach-teaching-engine" } },
});

function safeLevel(value: string): "Beginner" | "Intermediate" | "Advanced" {
  if (value === "Beginner" || value === "Advanced") return value;
  return "Intermediate";
}

function safeActivity(value: string): ActivityType {
  if (["warmup", "grammar", "scenario", "workplace", "fluency", "review"].includes(value)) return value as ActivityType;
  return "warmup";
}

function buildModeInstruction(mode: string) {
  const modes: Record<string, string> = {
    gentle_conversation: "Gentle mode: keep confidence high. Correct only the highest-value mistake first, but still follow the lesson step. Do not drift into free chat.",
    balanced: "Balanced mode: correct all clear grammar, vocabulary, tense, article, and preposition mistakes. Keep the lesson moving.",
    strict_correction: "Strict mode: correct every meaningful error and require the learner to repeat or rewrite the corrected sentence before moving to a new subtopic.",
    roleplay: "Roleplay mode: stay in scene, but still follow the activity step and briefly correct mistakes between turns.",
    workplace: "Workplace mode: optimize for concise, professional phrasing, register, and clarity. Upgrade informal wording immediately."
  };
  return modes[mode] || modes.balanced;
}

function buildLevelInstruction(level: string) {
  const levels: Record<string, string> = {
    Beginner: "Beginner path: use short sentences, simple words, one rule at a time, and repetition. Never explain more than one grammar idea in one turn.",
    Intermediate: "Intermediate path: focus on tense consistency, articles, prepositions, word order, and natural spoken phrasing. Give concise rule explanations.",
    Advanced: "Advanced path: focus on precision, register, nuance, idioms, sentence rhythm, concision, and native-like phrasing. Push for more sophisticated answers."
  };
  return levels[level] || levels.Intermediate;
}

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

app.post("/api/coach-interaction", async (req: express.Request, res: express.Response) => {
  try {
    const { messageText, userLevel, userName, history, mode, dailyActivity, mistakeMemory, challengeDay } = req.body;
    if (!messageText) return res.status(400).json({ error: "messageText is required in body." });

    const level = safeLevel(userLevel || "Intermediate");
    const name = userName || "Student";
    const activityType = safeActivity(dailyActivity?.type || "warmup");
    const learnerTurnsBeforeCurrent = Array.isArray(history) ? history.filter((h: any) => h.role === "user").length : 0;
    const learnerTurnsIncludingCurrent = learnerTurnsBeforeCurrent + 1;
    const definition = getActivityDefinition(activityType, level);
    const stepIndex = Math.min(Math.max(0, learnerTurnsBeforeCurrent), definition.steps.length - 1);
    const currentStep = definition.steps[stepIndex];
    const canComplete = learnerTurnsIncludingCurrent >= definition.minLearnerTurns && currentStep.phase === "summary";

    const memoryText = Array.isArray(mistakeMemory) && mistakeMemory.length
      ? mistakeMemory.slice(0, 8).map((m: any) => `${m.mistakeType || m.type}: ${m.count || 0} occurrence(s), status=${m.status || "active"}`).join("\n")
      : "No stored recurring mistakes yet. Start building memory from this session.";

    const lessonState = buildLessonStatePrompt({ definition, stepIndex, learnerTurns: learnerTurnsIncludingCurrent, mistakeMemoryText: memoryText, mode: mode || "balanced" });

    const systemInstruction = `You are Sky, a professional spoken-English teacher for ${name}. You are not a chit-chat bot.

${buildLevelInstruction(level)}
${buildModeInstruction(mode || "balanced")}

${lessonState}

STRICT TEACHING RULES:
1. Follow the current lesson step exactly. Do not jump to random topics.
2. If the learner answers off-topic, briefly acknowledge and route them back to the current learner task.
3. Every turn must contain a teaching action: model, correction, drill, repetition, roleplay line, fluency feedback, or summary.
4. coachReply is the spoken answer. It must be short enough to say aloud, but it must still teach.
5. correctedSentence must be empty only when the learner's sentence is already natural and correct.
6. naturalVersion must upgrade the learner's sentence into natural spoken English.
7. Ask exactly one next question or instruction, and it must match the current lesson step.
8. Do not set completedActivity true unless the activity completion rubric is satisfied.
9. Return JSON only.`;

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
            lessonStep: { type: Type.STRING },
            teachingPhase: { type: Type.STRING },
            teacherAction: { type: Type.STRING },
            challengeUpdate: { type: Type.OBJECT, properties: { day: { type: Type.NUMBER }, completedActivity: { type: Type.BOOLEAN }, homework: { type: Type.STRING } }, required: ["day", "completedActivity", "homework"] }
          },
          required: ["coachReply", "correctedSentence", "naturalVersion", "mistakes", "fluencyScore", "grammarScore", "vocabularyScore", "pronunciationFocus", "microDrill", "repeatPractice", "nextQuestion", "lessonStep", "teachingPhase", "teacherAction", "challengeUpdate"]
        }
      }
    });

    const payload = JSON.parse((response.text || "{}").trim());
    payload.lessonStep = currentStep.id;
    payload.teachingPhase = currentStep.phase;
    payload.teacherAction = currentStep.teacherGoal;
    payload.challengeUpdate ||= { day: challengeDay || 1, completedActivity: false, homework: "Practice the corrected sentence three times." };
    if (!canComplete) payload.challengeUpdate.completedActivity = false;

    console.log(`[Server] coach OK activity:${activityType} level:${level} step:${currentStep.id} phase:${currentStep.phase} turns:${learnerTurnsIncludingCurrent}/${definition.minLearnerTurns} complete:${payload.challengeUpdate.completedActivity}`);
    return res.json(payload);
  } catch (err: any) {
    console.error("[Server] Coach API Error:", err?.message || err);
    return res.status(500).json({ error: err.message || "Internal Coach API error." });
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
    app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html"));
  }

  server.listen(PORT, "0.0.0.0", () => console.log(`Server successfully started. Running on http://localhost:${PORT}`));
}

bootstrap();
