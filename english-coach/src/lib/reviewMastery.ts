import type { MistakeMemory, ReviewAttempt } from "../types";

export function classifyReviewAttempt(args: {
  learnerAnswer: string;
  expectedPattern: string;
  correctedExample?: string;
}): ReviewAttempt["result"] {
  const answer = args.learnerAnswer.trim().toLowerCase();
  const expected = args.expectedPattern.trim().toLowerCase();
  const corrected = args.correctedExample?.trim().toLowerCase() || "";

  if (!answer) return "needs_work";
  if (corrected && answer === corrected) return "success";
  if (expected && answer.includes(expected)) return "success";
  if (answer.length >= 8) return "partial";
  return "needs_work";
}

export function nextMistakeStatus(mistake: MistakeMemory, result: ReviewAttempt["result"]): MistakeMemory["status"] {
  if (result === "success") {
    const successful = (mistake.reviewStats?.successfulAttempts || 0) + 1;
    if (successful >= 3) return "mastered";
    return "improving";
  }
  if (result === "partial") return mistake.status === "mastered" ? "improving" : mistake.status;
  if (mistake.count >= 2) return "recurring";
  return "new";
}

export function masteryScoreAfterAttempt(mistake: MistakeMemory, result: ReviewAttempt["result"]) {
  const current = mistake.reviewStats?.masteryScore ?? (mistake.status === "mastered" ? 90 : mistake.status === "improving" ? 60 : 20);
  if (result === "success") return Math.min(100, current + 20);
  if (result === "partial") return Math.min(80, current + 8);
  return Math.max(0, current - 10);
}

export function nextReviewDateForResult(result: ReviewAttempt["result"], status: MistakeMemory["status"], now = new Date()) {
  const next = new Date(now.getTime());
  const days = result === "success"
    ? status === "mastered" ? 14 : 5
    : result === "partial" ? 2 : 1;
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

export function applyReviewAttemptToMistake(mistake: MistakeMemory, attempt: ReviewAttempt): MistakeMemory {
  const status = nextMistakeStatus(mistake, attempt.result);
  const attempts = (mistake.reviewStats?.attempts || 0) + 1;
  const successfulAttempts = (mistake.reviewStats?.successfulAttempts || 0) + (attempt.result === "success" ? 1 : 0);
  return {
    ...mistake,
    status,
    lastSeenAt: attempt.createdAt,
    reviewStats: {
      attempts,
      successfulAttempts,
      lastReviewedAt: attempt.createdAt,
      nextReviewAt: nextReviewDateForResult(attempt.result, status, new Date(attempt.createdAt)),
      masteryScore: masteryScoreAfterAttempt(mistake, attempt.result),
    },
  };
}

export function createReviewAttempt(args: {
  profileId: string;
  mistakeId: string;
  mistakeType: string;
  prompt: string;
  learnerAnswer: string;
  expectedPattern: string;
  correctedExample?: string;
  feedback?: string;
  now?: string;
}): ReviewAttempt {
  const createdAt = args.now || new Date().toISOString();
  const result = classifyReviewAttempt({ learnerAnswer: args.learnerAnswer, expectedPattern: args.expectedPattern, correctedExample: args.correctedExample });
  return {
    attemptId: `review_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    profileId: args.profileId,
    mistakeId: args.mistakeId,
    mistakeType: args.mistakeType,
    prompt: args.prompt,
    learnerAnswer: args.learnerAnswer,
    expectedPattern: args.expectedPattern,
    result,
    feedback: args.feedback || (result === "success" ? "Good correction. This mistake is improving." : result === "partial" ? "Partly correct. Review the model and try one cleaner version." : "This needs more practice. Review the correction and try again."),
    createdAt,
  };
}
