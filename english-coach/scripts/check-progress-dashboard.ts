import { buildProgressSummary } from "../src/lib/progressAnalytics";
import type { CoachMessage, CoachSession, LearnerProfile, MistakeMemory } from "../src/types";

function fail(message: string): never {
  console.error(`[progress-dashboard] FAIL: ${message}`);
  process.exit(1);
}

const learnerProfile: LearnerProfile = {
  profileId: "learner",
  ownerUid: "uid",
  ownerEmail: "learner@example.com",
  displayName: "Learner",
  targetLanguage: "english",
  level: "Intermediate",
  goal: "spoken_fluency",
  correctionStyle: "balanced",
  challengeStartDate: "2026-01-01",
  challengeDay: 12,
  streak: 5,
  totalPracticeMinutes: 120,
  createdAt: "2026-01-01T10:00:00.000Z",
  updatedAt: "2026-01-02T10:00:00.000Z",
};

const sessions: CoachSession[] = [
  { sessionId: "s1", userId: "u", userName: "Learner", title: "Study", createdAt: "2026-01-01T10:00:00.000Z", updatedAt: "2026-01-01T10:00:00.000Z", mode: "writing", profileId: "learner" },
  { sessionId: "s2", userId: "u", userName: "Learner", title: "Review", createdAt: "2026-01-02T10:00:00.000Z", updatedAt: "2026-01-02T10:00:00.000Z", mode: "writing", profileId: "learner" },
];

const messages: CoachMessage[] = [
  { messageId: "m1", sessionId: "s1", userId: "u", sender: "user", source: "chat", kind: "coach_reply", text: "I checked the logs.", shouldTriggerCoachResponse: true, grammarCorrection: null, createdAt: "2026-01-01T10:00:00.000Z" },
  { messageId: "m2", sessionId: "s1", userId: "u", sender: "coach", source: "chat", kind: "coach_reply", text: "Good.", shouldTriggerCoachResponse: false, grammarCorrection: null, fluencyScore: 8, grammarScore: 7, vocabularyScore: 8, createdAt: "2026-01-01T10:01:00.000Z" },
  { messageId: "m3", sessionId: "s2", userId: "u", sender: "coach", source: "chat", kind: "coach_reply", text: "Review.", shouldTriggerCoachResponse: false, grammarCorrection: null, fluencyScore: 6, grammarScore: 8, vocabularyScore: 7, createdAt: "2026-01-02T10:01:00.000Z" },
];

const mistakes: MistakeMemory[] = [
  { mistakeId: "a", profileId: "learner", mistakeType: "article_usage", count: 3, examples: [], lastSeenAt: "2026-01-01T10:00:00.000Z", status: "recurring" },
  { mistakeId: "b", profileId: "learner", mistakeType: "tense", count: 1, examples: [], lastSeenAt: "2026-01-01T10:00:00.000Z", status: "mastered" },
];

const summary = buildProgressSummary({ learnerProfile, sessions, messages, mistakes, courses: [], cursor: null, selectedTrack: null });

if (summary.challengeDay !== 12) fail("challengeDay mismatch");
if (summary.streak !== 5) fail("streak mismatch");
if (summary.totalPracticeMinutes !== 120) fail("minutes mismatch");
if (summary.totalSessions !== 2) fail("session count mismatch");
if (summary.totalMessages !== 3) fail("message count mismatch");
if (summary.learnerMessages !== 1) fail("learner message count mismatch");
if (summary.coachMessages !== 2) fail("coach message count mismatch");
if (summary.averageScores.fluency !== 7) fail(`expected fluency avg 7, got ${summary.averageScores.fluency}`);
if (summary.averageScores.grammar !== 7.5) fail(`expected grammar avg 7.5, got ${summary.averageScores.grammar}`);
if (summary.activeMistakes !== 1) fail("active mistake count mismatch");
if (summary.masteredMistakes !== 1) fail("mastered mistake count mismatch");
if (!summary.nextBestAction.includes("Review")) fail("recurring mistake should recommend review drill");

console.log("[progress-dashboard] OK: progress summary analytics compute challenge, scores, sessions, turns, mistakes, and next action.");
