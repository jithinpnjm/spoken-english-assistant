// POST /api/chat — text practice coach.
// Successor of english-coach/src/server/cursorCoachHandler.ts: same structured-JSON teacher reply and
// correction/repeat loop, but lesson context comes from the MDX page and the flow state travels with the
// request instead of living in Firestore.

import type express from "express";
import { Type, type GoogleGenAI } from "@google/genai";
import { LIMITS, levelBand, sanitizeLesson } from "./lesson";
import { analyseFluency, fluencyInstruction } from "./fluencySignal";
import { nextPracticeState, safeMessageType, sanitizeState, shouldSuggestSummary } from "./lessonFlow";
import { buildTeacherPrompt, type MistakeMemoryItem } from "./teacherPrompt";

type ChatAction = "start" | "message" | "summary";

interface HistoryTurn {
  role: "learner" | "teacher";
  text: string;
}

function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function sanitizeHistory(raw: unknown): HistoryTurn[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(-LIMITS.historyTurns)
    .map((item: any) => ({ role: item?.role === "teacher" ? "teacher" : "learner", text: clip(item?.text, LIMITS.historyTurnChars) }) as HistoryTurn)
    .filter((item) => item.text);
}

function sanitizeMistakes(raw: unknown): MistakeMemoryItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(-LIMITS.mistakeMemory)
    .map((item: any) => ({ original: clip(item?.original, 300), corrected: clip(item?.corrected, 300), rule: clip(item?.rule, 200) || undefined }))
    .filter((item) => item.original && item.corrected);
}

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    messageType: { type: Type.STRING },
    teacherMessage: { type: Type.STRING },
    correctedSentence: { type: Type.STRING, nullable: true },
    naturalVersion: { type: Type.STRING, nullable: true },
    ruleApplied: { type: Type.STRING, nullable: true },
    score: {
      type: Type.OBJECT,
      nullable: true,
      properties: {
        grammar: { type: Type.NUMBER },
        vocabulary: { type: Type.NUMBER },
        fluency: { type: Type.NUMBER },
      },
    },
    needsRepeat: { type: Type.BOOLEAN },
    scenarioComplete: { type: Type.BOOLEAN },
    homework: { type: Type.STRING, nullable: true },
  },
  required: ["messageType", "teacherMessage", "correctedSentence", "naturalVersion", "ruleApplied", "score", "needsRepeat", "scenarioComplete", "homework"],
};

function clampScore(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(1, Math.min(10, Math.round(n))) : null;
}

export function createChatHandler(ai: GoogleGenAI, model: string) {
  return async function chatHandler(req: express.Request, res: express.Response) {
    const body = req.body || {};
    const action: ChatAction = body.action === "start" || body.action === "summary" ? body.action : "message";
    const lesson = sanitizeLesson(body.lesson);
    const history = sanitizeHistory(body.history);
    const mistakeMemory = sanitizeMistakes(body.mistakeMemory);
    let state = sanitizeState(body.state);
    const message = clip(body.message, LIMITS.message);

    if (action === "message" && !message) return res.status(400).json({ error: "message is required." });
    if (action === "start") state = { phase: "opening", learnerTurns: 0, repeatAttempts: 0 };
    if (action === "summary") state = { ...state, phase: "summary" };

    const learnerSpoke = action === "message";
    const extraSignal =
      learnerSpoke && lesson.language === "English" && lesson.taskType !== "tutor"
        ? fluencyInstruction(analyseFluency(message, levelBand(lesson.level)))
        : undefined;

    const systemInstruction = buildTeacherPrompt({ lesson, mode: "chat", state, mistakeMemory, extraSignal });

    const contents = history.map((turn) => ({ role: turn.role === "teacher" ? "model" : "user", parts: [{ text: turn.text }] }));
    const userText =
      action === "start"
        ? "(The learner pressed Start. Begin the practice with your opening turn.)"
        : action === "summary"
          ? "(The learner pressed Finish. Give the summary now.)"
          : message;
    contents.push({ role: "user", parts: [{ text: userText }] });

    const response = await ai.models.generateContent({
      model,
      contents,
      config: { systemInstruction, responseMimeType: "application/json", responseSchema: RESPONSE_SCHEMA, temperature: 0.6 },
    });

    let parsed: any = {};
    try {
      parsed = JSON.parse((response.text || "{}").trim());
    } catch {
      console.warn("[Chat] Model returned non-JSON output; falling back to plain text.");
      parsed = { teacherMessage: response.text || "" };
    }

    const outcome = {
      messageType: learnerSpoke ? safeMessageType(parsed.messageType) : "on_topic_response" as const,
      needsRepeat: learnerSpoke && Boolean(parsed.needsRepeat),
      scenarioComplete: Boolean(parsed.scenarioComplete),
    };
    const nextState = nextPracticeState(state, outcome, learnerSpoke);
    const correctedSentence = clip(parsed.correctedSentence, 600) || null;
    const normalize = (text: string) => text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    const isRealCorrection = Boolean(correctedSentence) && normalize(correctedSentence || "") !== normalize(message);

    return res.json({
      teacherMessage: clip(parsed.teacherMessage, 6000) || "Let's keep going. Please answer with one complete sentence.",
      correctedSentence,
      naturalVersion: clip(parsed.naturalVersion, 600) || null,
      ruleApplied: clip(parsed.ruleApplied, 400) || null,
      score: parsed.score && learnerSpoke
        ? { grammar: clampScore(parsed.score.grammar), vocabulary: clampScore(parsed.score.vocabulary), fluency: clampScore(parsed.score.fluency) }
        : null,
      homework: clip(parsed.homework, 600) || null,
      // Recorded client-side as session mistake memory and sent back on later turns.
      mistake: learnerSpoke && isRealCorrection && outcome.messageType !== "learner_question"
        ? { original: message.slice(0, 300), corrected: correctedSentence, rule: clip(parsed.ruleApplied, 200) || undefined }
        : null,
      state: nextState,
      suggestSummary: shouldSuggestSummary(nextState, outcome),
    });
  };
}
