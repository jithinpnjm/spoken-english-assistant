import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header per guidelines
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not defined. Gemini features will fail.");
}

const ai = new GoogleGenAI({
  apiKey: apiKey || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// AI Coach Interaction endpoint - full-stack server proxy for API Key protection
app.post("/api/coach-interaction", async (req: express.Request, res: express.Response) => {
  try {
    const { messageText, userLevel, userName, history } = req.body;
    if (!messageText) {
      return res.status(400).json({ error: "messageText is required in body." });
    }

    const level = userLevel || "Intermediate";
    const name = userName || "Student";

    const systemInstruction = `You are a helpful, encouraging, and supportive English conversation coach named Sky.
Your student is ${name}, practicing at the '${level}' proficiency level.

Instructions:
1. Evaluate ${name}'s message carefully for spelling, formatting, and grammar mistakes.
2. Formulate your response in JSON matching the response schema.
3. The "coachReply" should be a warm conversational response (2 to 3 sentences long), ending with an interactive wait/question to guide them in continuous talking. Keep the language level-appropriate for ${level}. Do not include markdown signs or bolding inside coachReply because it is spoken out loud.
4. If they made mistakes, provide the corrected spelling or grammar in "inputCorrection". If their phrasing was perfectly correct and natural, return null.
5. In "identifiedMistakes", list each specific issue clearly with why it is incorrect. If none, return an empty array [].
6. In "coachingTip", provide one tiny coaching gold standard tip for their level, or empty string.`;

    const contents: any[] = [];

    // Add conversation history
    if (history && Array.isArray(history)) {
      // Limit history to last 10 messages to save context space
      const recentHistory = history.slice(-10);
      recentHistory.forEach((item: any) => {
        contents.push({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.text }],
        });
      });
    }

    // Append actual user message
    contents.push({
      role: "user",
      parts: [{ text: messageText }],
    });

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            coachReply: {
              type: Type.STRING,
              description: "A friendly verbal response keeping the conversation flow going, followed by an engaging question. Avoid markdown elements.",
            },
            inputCorrection: {
              type: Type.STRING,
              description: "The full corrected text of what the user wrote, keeping their original style but with perfect spelling & grammar. Set to null if user wrote perfectly.",
            },
            identifiedMistakes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of spelling or grammar mistakes. Return empty array if zero mistakes.",
            },
            coachingTip: {
              type: Type.STRING,
              description: "A short, actionable advice note to help them sound more fluent, or empty string.",
            },
          },
          required: ["coachReply", "inputCorrection", "identifiedMistakes", "coachingTip"],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response string returned from Gemini.");
    }

    const payload = JSON.parse(responseText.trim());
    return res.json(payload);
  } catch (err: any) {
    console.error("Coach API Error:", err?.message || err);
    return res.status(500).json({ error: err.message || "Internal Coach API error." });
  }
});

// Expose config for direct browser WebSocket connections (local development only)
app.get("/api/config", (req: express.Request, res: express.Response) => {
  return res.json({
    apiKey: process.env.GEMINI_API_KEY || "",
    model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
    liveModel: process.env.GEMINI_LIVE_MODEL || "models/gemini-3.1-flash-live-preview",
  });
});

// Start server containing frontend dev or build serving
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html as fallback for the SPA
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started. Running on http://localhost:${PORT}`);
  });
}

bootstrap();

