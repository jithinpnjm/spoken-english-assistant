import type express from "express";
import { Type } from "@google/genai";
import { buildCursorTeachingPrompt } from "./cursorPromptBuilder";
import { interactionModeRule } from "./interactionModeRules";
import { moveCursorAfterTurn, pushDigression, popDigression, isPreviousCalendarDay, markTeacherDeliveredPhase } from "./lessonCursorLogic";
import { getOrCreateLessonCursor, saveLessonCursor } from "./lessonCursorStore";
import type { LessonMessageType } from "./lessonCursorTypes";
import { analysePronunciationAndFluency } from "./pronunciationFluencyEngine";

function safeLevel(value: string): "Beginner" | "Intermediate" | "Advanced" {
  if (value === "Beginner" || value === "Advanced") return value;
  return "Intermediate";
}

function safeMessageType(value: string): LessonMessageType {
  if (value === "learner_question" || value === "learner_attempt") return value;
  return "on_topic_response";
}

function memoryToText(mistakeMemory: any) {
  return Array.isArray(mistakeMemory) && mistakeMemory.length
    ? mistakeMemory.slice(0, 8).map((m: any) => `${m.mistakeType || m.type}: ${m.count || 0} occurrence(s), status=${m.status || "active"}`).join("\n")
    : "No stored recurring mistakes yet.";
}

export function createCursorCoachHandler(ai: any) {
  return async function cursorCoachHandler(req: express.Request, res: express.Response) {
    try {
      const { messageText, userLevel, userName, mode, mistakeMemory, challengeDay, profileId, interactionMode } = req.body;
      if (!messageText) return res.status(400).json({ error: "messageText is required in body." });

      const level = safeLevel(userLevel || "Intermediate");
      const name = userName || "Student";
      const learnerId = profileId || name.toLowerCase().replace(/[^a-z0-9_-]/g, "_") || "student";
      const now = new Date().toISOString();
      const isLive = interactionMode === "live";
      const modeRule = interactionModeRule(isLive ? "live" : "chat");
      const fluencyAnalysis = analysePronunciationAndFluency(messageText, level);

      let cursor = await getOrCreateLessonCursor({ learnerId, level, sessionDay: challengeDay || 1 });
      const phaseBeforeResponse = cursor.phase;
      const resumeAfterBreak = isPreviousCalendarDay(cursor.lastActiveAt, now);
      const mistakeMemoryText = memoryToText(mistakeMemory);

      const baseInstruction = buildCursorTeachingPrompt({
        cursor,
        learnerName: name,
        level,
        mode: mode || "balanced",
        learnerMessage: messageText,
        mistakeMemoryText,
        interactionMode: isLive ? "live" : "chat",
        resumeAfterBreak,
        resumeAfterDigression: cursor.digressionStack.length > 0,
      });
      const fluencyInstruction = `
Pronunciation and fluency coaching signal:
- Estimated fluency score: ${fluencyAnalysis.fluencyScore}/10.
- Pacing: ${fluencyAnalysis.pacing}.
- Filler count: ${fluencyAnalysis.fillerCount}.
- Chunking advice: ${fluencyAnalysis.chunkingAdvice}
- Pronunciation focus: ${fluencyAnalysis.pronunciationFocus}
Use this signal lightly. Do not over-explain. Give one repeat or rewrite action only.`;
      const systemInstruction = `${baseInstruction}\n\n${modeRule}\n\n${fluencyInstruction}`;

      const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
        contents: [{ role: "user", parts: [{ text: messageText }] }],
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              messageType: { type: Type.STRING },
              teacherMessage: { type: Type.STRING },
              correctedSentence: { type: Type.STRING, nullable: true },
              naturalVersion: { type: Type.STRING, nullable: true },
              ruleApplied: { type: Type.STRING },
              exampleUsed: { type: Type.STRING, nullable: true },
              score: {
                type: Type.OBJECT,
                nullable: true,
                properties: {
                  grammar: { type: Type.NUMBER },
                  vocabulary: { type: Type.NUMBER },
                  fluency: { type: Type.NUMBER },
                },
              },
              microDrill: { type: Type.STRING, nullable: true },
              advancePhase: { type: Type.BOOLEAN },
              homework: { type: Type.STRING, nullable: true },
            },
            required: ["messageType", "teacherMessage", "correctedSentence", "naturalVersion", "ruleApplied", "exampleUsed", "score", "microDrill", "advancePhase", "homework"],
          },
        },
      });

      const parsed = JSON.parse((response.text || "{}").trim());
      const messageType = safeMessageType(parsed.messageType || "on_topic_response");

      if (messageType === "learner_question") {
        cursor = pushDigression(cursor, messageText, now);
        cursor = popDigression(cursor, now);
      } else if (messageType === "on_topic_response" && cursor.status === "in_progress") {
        cursor = markTeacherDeliveredPhase(cursor, now);
      } else {
        cursor = moveCursorAfterTurn({ cursor, messageType, advancePhase: Boolean(parsed.advancePhase), now });
      }
      await saveLessonCursor(cursor);

      const isChat = !isLive;
      const payload = {
        coachReply: parsed.teacherMessage || "Good. Continue with one complete sentence.",
        correctedSentence: parsed.correctedSentence || "",
        naturalVersion: parsed.naturalVersion || "",
        mistakes: parsed.correctedSentence ? [{ type: "cursor_rule", original: messageText, corrected: parsed.correctedSentence, explanation: parsed.ruleApplied || cursor.subsectionId, severity: "medium" }] : [],
        fluencyScore: parsed.score?.fluency ?? fluencyAnalysis.fluencyScore,
        grammarScore: parsed.score?.grammar ?? 7,
        vocabularyScore: parsed.score?.vocabulary ?? 7,
        pronunciationFocus: fluencyAnalysis.pronunciationFocus,
        microDrill: { instruction: parsed.microDrill || fluencyAnalysis.microDrill.instruction || (isChat ? "Rewrite the improved sentence once." : "Repeat the improved sentence once."), examples: parsed.exampleUsed ? [parsed.exampleUsed, ...fluencyAnalysis.microDrill.examples] : fluencyAnalysis.microDrill.examples },
        repeatPractice: parsed.naturalVersion || parsed.correctedSentence || fluencyAnalysis.repeatPractice,
        nextQuestion: parsed.microDrill || fluencyAnalysis.microDrill.instruction || "Please answer with one complete sentence.",
        lessonStep: cursor.subsectionId,
        teachingPhase: cursor.phase,
        teacherAction: `Taught ${cursor.subsectionId} at phase ${phaseBeforeResponse}; next phase is ${cursor.phase}`,
        challengeUpdate: { day: challengeDay || 1, completedActivity: cursor.status === "completed", homework: parsed.homework || "Practise today's corrected sentence three times." },
        cursor,
      };

      return res.json(payload);
    } catch (err: any) {
      console.error("[Server] Cursor coach error:", err?.message || err);
      return res.status(500).json({ error: err.message || "Cursor coach failed." });
    }
  };
}
