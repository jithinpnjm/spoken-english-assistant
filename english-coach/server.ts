import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "10mb" }));

// Request logger — logs every API call with timing
app.use((req, _res, next) => {
  if (req.path.startsWith("/api/")) {
    console.log(`[Server] ${req.method} ${req.path} — ${new Date().toISOString()}`);
  }
  next();
});

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

// Transcribe audio blob (base64 webm) using Gemini
app.post("/api/transcribe", async (req: express.Request, res: express.Response) => {
  try {
    const { audioBase64, mimeType = "audio/webm" } = req.body;
    if (!audioBase64) return res.status(400).json({ error: "audioBase64 is required" });

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
      contents: [{
        parts: [
          { text: "Transcribe this audio exactly as spoken. Return only the spoken words, nothing else. No punctuation corrections, no summaries." },
          { inlineData: { mimeType, data: audioBase64 } }
        ]
      }]
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

    const level = userLevel || "Intermediate";
    const name = userName || "Student";
    const activityType: string = dailyActivity?.type || "warmup";
    const memoryText = Array.isArray(mistakeMemory)
      ? mistakeMemory.slice(0, 8).map((m: any) => `${m.mistakeType || m.type}: ${m.count || 0}`).join("\n")
      : "No stored recurring mistakes yet.";

    // Count how many user turns have happened so far (excluding the current one)
    const userTurnCount = Array.isArray(history) ? history.filter((h: any) => h.role === "user").length : 0;
    // Activity is only completable after meaningful practice (at least 5 student responses)
    const canComplete = userTurnCount >= 5;

    const activityInstructions: Record<string, string> = {
      warmup: `ACTIVITY: Daily warm-up.
LESSON PLAN:
1. Ask the student: "Tell me three things you did today."
2. After each thing they say, respond naturally, then correct ONE grammar/vocabulary mistake clearly.
3. After all three things, summarize the top 2 mistakes and give a short drill sentence to repeat correctly.
4. Score fluency, grammar, vocabulary.
You are building speaking confidence here. Be warm. Correct gently but do not skip mistakes.`,

      grammar: `ACTIVITY: Grammar lesson.
LESSON PLAN — follow this sequence strictly:
1. INTRODUCE: Start by naming today's grammar target based on the student's level. For Beginner: past simple tense ("I went", "She said"). For Intermediate: present perfect vs past simple. For Advanced: conditionals or reported speech.
2. EXPLAIN: Give 2 clear example sentences showing right vs wrong. Example: Wrong: "Yesterday I go to market." Right: "Yesterday I went to the market."
3. DRILL: Ask the student to make one sentence using the target grammar about their day.
4. CORRECT: Correct any grammar error in their sentence with the rule reason. Example: "You said 'I go' — use past tense 'went' because the action is finished."
5. PRACTICE more: Ask 2–3 more practice questions targeting the same grammar rule.
6. SUMMARIZE: After enough practice, give a homework sentence for them to practice later.
DO NOT just chat. DO NOT move to a new topic. Stay on the grammar lesson until the student has practiced at least 5 times.
${canComplete ? "The student has now practiced enough — you may set completedActivity to true if they showed good understanding." : "The student has NOT practiced enough yet — set completedActivity to false. Keep drilling."}`,

      scenario: `ACTIVITY: Real-life scenario roleplay.
SCENARIO: You are a waiter at a restaurant. The student is the customer.
1. Open the scene naturally: "Welcome to Sky Bistro! Here is your menu. What would you like to order?"
2. Respond in character to whatever they order.
3. After each exchange, BREAK CHARACTER briefly: point out one language mistake, give the correct version, then return to the scene.
4. After 4–5 exchanges, end the scene and give a full correction summary.
Stay in character between corrections. Make it feel real.`,

      workplace: `ACTIVITY: Workplace English — Daily Standup.
LESSON PLAN:
1. Explain the format: "In a standup, you say: what you did yesterday, what you're doing today, and any blockers."
2. Ask: "Tell me your standup update. Speak like you are in a real team meeting."
3. After they speak, correct: grammar mistakes, informal language, unclear phrasing.
4. Show a professional version of what they said.
5. Ask a follow-up: "How would you say this more formally: [give an informal sentence]?"
6. Give 2–3 business English phrases they should remember.`,

      fluency: `ACTIVITY: 60-second fluency challenge.
1. Pick a topic: "Tell me about your family" or "Describe your daily routine" or "Talk about your job or studies."
2. Give the student 60 seconds to speak without stopping. Tell them: "Don't worry about mistakes yet — just keep talking!"
3. After they finish, score fluency (did they pause a lot? repeat words? lose their train of thought?).
4. Then go back and correct the 3 most important grammar or vocabulary mistakes.
5. Ask them to repeat one corrected sentence back to you naturally.`,

      review: `ACTIVITY: Mistake review and targeted drill.
RECURRING MISTAKES THIS STUDENT MAKES:\n${memoryText}
1. Pick the top 2 recurring mistakes from the list above.
2. Explain each mistake: what they do wrong, why it's wrong, and the correct rule.
3. Give a drill: ask them to say 3 sentences that use the correct form.
4. Correct each attempt immediately with the rule.
5. End with a "never forget" tip for each mistake.
If no recurring mistakes are recorded, do a general grammar review for their level (${level}).`,
    };

    const modeContext: Record<string, string> = {
      gentle_conversation: "Be warm, encouraging, and patient. Point out only one mistake at a time. Prioritize keeping the student speaking over perfect correction.",
      balanced: "Correct all clear grammar, tense, and vocabulary mistakes. Be warm but thorough. Don't skip mistakes to be polite.",
      strict_correction: "Correct EVERY mistake rigorously. State what was wrong, the correct form, and the grammar rule every time. Do not move on until the student corrects themselves.",
      roleplay: "Stay immersed in the roleplay scenario. Correct mistakes as part of the scene where possible.",
      workplace: "Focus on professional register, business vocabulary, and formal grammar. Flag informal language immediately.",
    };

    const levelContext: Record<string, string> = {
      Beginner: "The student is a beginner. Use very simple vocabulary. Explain grammar in the simplest terms possible. Be very patient.",
      Intermediate: "The student is intermediate. Focus on tense consistency, articles, prepositions, and natural phrasing.",
      Advanced: "The student is advanced. Focus on subtle errors — word choice, idioms, register, sentence rhythm.",
    };

    const systemInstruction = `You are Sky, a structured English language coach for ${name}.
${levelContext[level] || levelContext["Intermediate"]}
CORRECTION MODE: ${modeContext[mode || "balanced"]}

${activityInstructions[activityType] || activityInstructions["warmup"]}

RULES:
- Keep coachReply short, spoken-friendly, and natural. No markdown or bullet symbols in your spoken reply.
- ALWAYS correct mistakes — never ignore them to be polite.
- Always end with exactly one question or instruction to keep the student practicing.
- Return valid JSON only.`;

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
    // Never mark complete if the student hasn't had enough practice turns
    if (!canComplete) payload.challengeUpdate.completedActivity = false;
    console.log(`[Server] /api/coach-interaction OK — fluency:${payload.fluencyScore} grammar:${payload.grammarScore} mistakes:${payload.mistakes?.length ?? 0} userTurns:${userTurnCount} canComplete:${canComplete}`);
    return res.json(payload);
  } catch (err: any) {
    console.error("[Server] Coach API Error:", err?.message || err);
    return res.status(500).json({ error: err.message || "Internal Coach API error." });
  }
});

app.get("/api/config", (_req: express.Request, res: express.Response) => {
  return res.json({
    apiKey: process.env.GEMINI_API_KEY || "",
    model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
    liveModel: process.env.GEMINI_LIVE_MODEL || "models/gemini-3.1-flash-live-preview",
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
