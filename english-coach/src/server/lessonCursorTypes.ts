import type { CurriculumPhase } from "./curriculumRegistry";

export type LessonCursorStatus = "in_progress" | "awaiting_learner_attempt" | "completed";
export type LessonMessageType = "on_topic_response" | "learner_question" | "learner_attempt";

export interface LessonDigression {
  learnerQuestion: string;
  askedAtPhase: CurriculumPhase;
  timestamp: string;
}

export interface LessonCursor {
  learnerId: string;
  courseId: string;
  moduleId: string;
  subsectionId: string;
  phase: CurriculumPhase;
  turnsAtPhase: number;
  status: LessonCursorStatus;
  digressionStack: LessonDigression[];
  lastActiveAt: string;
  sessionDay: number;
  phaseSummary: string;
  lastTeacherAction?: "taught_intro" | "taught_model" | "asked_guided_practice" | "corrected_attempt" | "asked_rewrite" | "started_free_practice" | "summarized";
}

export const LESSON_PHASE_ORDER: CurriculumPhase[] = [
  "intro",
  "model",
  "controlled_practice",
  "correction",
  "repeat",
  "free_practice",
  "summary",
];
