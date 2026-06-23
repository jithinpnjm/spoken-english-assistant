export type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced";
export type InteractionMode = "writing" | "listening";

export interface UserProfile {
  uid: string;
  name: string;
  level: ProficiencyLevel;
  highContrast: boolean;
  createdAt: string;
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
}

export interface CoachMessage {
  messageId: string;
  sessionId: string;
  userId: string;
  sender: "user" | "coach";
  text: string;
  grammarCorrection: string | null;
  identifiedMistakes?: string[];
  coachingTip?: string;
  createdAt: string;
}
