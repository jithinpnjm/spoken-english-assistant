// Lesson context sent by <AIPracticeComponent topic level taskType prompt /> in the MDX pages.
// This replaces the old english-coach curriculum registry + lesson cursor store: the MDX page now owns
// the lesson content, and the server only needs enough context to teach and correct inside it.

export type PracticeLanguage = "English" | "German";
export type LevelBand = "Beginner" | "Intermediate" | "Advanced";
export type InteractionMode = "chat" | "live";

export interface LessonContext {
  language: PracticeLanguage;
  topic: string;
  /** CEFR level as written in the MDX (e.g. "A1", "B2-C1"). */
  level: string;
  /** speaking | writing | reading | listening | roleplay | tutor (free-form, kept short). */
  taskType: string;
  /** Scenario / system behaviour authored in the MDX page. */
  prompt: string;
  /** Page the learner is on (used by the global tutor for context). */
  pageTitle?: string;
}

export const LIMITS = {
  topic: 200,
  level: 20,
  taskType: 30,
  prompt: 6000,
  pageTitle: 200,
  message: 2000,
  historyTurns: 24,
  historyTurnChars: 2000,
  mistakeMemory: 8,
} as const;

function clip(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function sanitizeLesson(raw: unknown): LessonContext {
  const input = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const language = clip(input.language, 20).toLowerCase().startsWith("german") ? "German" : "English";
  return {
    language,
    topic: clip(input.topic, LIMITS.topic) || "General practice",
    level: clip(input.level, LIMITS.level) || (language === "German" ? "A1" : "B1"),
    taskType: clip(input.taskType, LIMITS.taskType).toLowerCase() || "speaking",
    prompt: clip(input.prompt, LIMITS.prompt),
    pageTitle: clip(input.pageTitle, LIMITS.pageTitle) || undefined,
  };
}

/** Maps a CEFR label (or the old Beginner/Intermediate/Advanced labels) to the teaching-tone band. */
export function levelBand(level: string): LevelBand {
  const normalized = level.trim().toUpperCase();
  if (normalized.startsWith("BEGINNER")) return "Beginner";
  if (normalized.startsWith("ADVANCED")) return "Advanced";
  if (normalized.startsWith("INTERMEDIATE")) return "Intermediate";
  const first = primaryCefr(normalized);
  if (first.startsWith("A")) return "Beginner";
  if (first.startsWith("C")) return "Advanced";
  return "Intermediate";
}

/** First CEFR code in the label, e.g. "B2-C1" -> "B2". */
export function primaryCefr(level: string): string {
  return level.trim().toUpperCase().match(/[ABC][012]/)?.[0] || "";
}
