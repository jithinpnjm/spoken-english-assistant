export type PracticeLanguage = 'English' | 'German';

/** Lesson context passed from MDX: <AIPracticeComponent topic level taskType prompt />. */
export interface LessonContext {
  language: PracticeLanguage;
  topic: string;
  level: string;
  taskType: string;
  prompt: string;
  pageTitle?: string;
}

export type PracticePhase = 'opening' | 'practice' | 'repeat' | 'summary' | 'complete';

export interface PracticeState {
  phase: PracticePhase;
  learnerTurns: number;
  repeatAttempts: number;
}

export interface MistakeMemoryItem {
  original: string;
  corrected: string;
  rule?: string;
}

export interface ChatReply {
  teacherMessage: string;
  correctedSentence: string | null;
  naturalVersion: string | null;
  ruleApplied: string | null;
  score: {grammar: number | null; vocabulary: number | null; fluency: number | null} | null;
  homework: string | null;
  mistake: MistakeMemoryItem | null;
  state: PracticeState;
  suggestSummary: boolean;
}

export interface TranscriptEntry {
  id: string;
  role: 'learner' | 'teacher' | 'system';
  text: string;
  source: 'chat' | 'voice';
  reply?: ChatReply;
}
