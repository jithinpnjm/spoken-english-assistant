export type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced";
export type InteractionMode = "writing" | "live_voice";
export type CoachMode = "gentle_conversation" | "balanced" | "strict_correction" | "roleplay" | "workplace";
export type MessageSource = "chat" | "live" | "system";
export type MessageKind = "user_transcript" | "coach_reply" | "correction" | "suggestion" | "lesson_instruction" | "evaluation_summary";
export type TeachingPhase = "intro" | "model" | "controlled_practice" | "correction" | "repeat" | "free_practice" | "summary" | string;

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  level: ProficiencyLevel;
  highContrast: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LearnerProfile {
  profileId: string;
  ownerUid: string;
  ownerEmail: string;
  displayName: "Jithin" | "Sandra" | string;
  targetLanguage: "english";
  level: ProficiencyLevel;
  goal: "spoken_fluency" | "workplace" | "interview" | "daily_life";
  correctionStyle: "gentle" | "balanced" | "strict";
  challengeStartDate: string;
  challengeDay: number;
  streak: number;
  totalPracticeMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface MistakeMemory {
  mistakeId: string;
  profileId: string;
  mistakeType: string;
  count: number;
  examples: string[];
  lastSeenAt: string;
  status: "new" | "recurring" | "improving" | "mastered";
}

export interface CoachSession {
  sessionId: string;
  userId: string;
  userName: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  mode: InteractionMode;
  profileId: string;
  activityType?: string;
  challengeDay?: number;
}

export interface MistakeDetail {
  type: string;
  original: string;
  corrected: string;
  explanation: string;
  severity: "low" | "medium" | "high" | string;
}

export interface CoachMessage {
  messageId: string;
  sessionId: string;
  userId: string;
  sender: "user" | "coach" | "system";
  source: MessageSource;
  kind: MessageKind;
  text: string;
  shouldTriggerCoachResponse: boolean;
  grammarCorrection: string | null;
  naturalVersion?: string | null;
  identifiedMistakes?: string[];
  mistakes?: MistakeDetail[];
  coachingTip?: string;
  fluencyScore?: number;
  grammarScore?: number;
  vocabularyScore?: number;
  pronunciationFocus?: string;
  repeatPractice?: string;
  microDrill?: { instruction: string; examples: string[] };
  lessonStep?: string;
  teachingPhase?: TeachingPhase;
  teacherAction?: string;
  createdAt: string;
}
