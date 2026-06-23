import type { MistakeMemory } from "../types";

export type ReviewPriority = "high" | "medium" | "low";
export type ReviewStatus = "due" | "soon" | "mastered" | "new";

export interface ReviewItem extends MistakeMemory {
  priority: ReviewPriority;
  reviewStatus: ReviewStatus;
  dueAt: string;
  nextAction: string;
  drillInstruction: string;
  modelCorrection: string;
}

function daysAgo(iso: string) {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return 999;
  return Math.floor((Date.now() - then) / 86400000);
}

export function reviewPriority(mistake: MistakeMemory): ReviewPriority {
  if (mistake.status === "mastered") return "low";
  if (mistake.count >= 5) return "high";
  if (mistake.count >= 2 || mistake.status === "recurring") return "medium";
  return "low";
}

export function nextDueAt(mistake: MistakeMemory) {
  const last = new Date(mistake.lastSeenAt || Date.now());
  const days = mistake.status === "mastered" ? 14 : mistake.count >= 5 ? 1 : mistake.count >= 2 ? 2 : 3;
  last.setDate(last.getDate() + days);
  return last.toISOString();
}

export function reviewStatus(mistake: MistakeMemory): ReviewStatus {
  if (mistake.status === "mastered") return "mastered";
  if (mistake.status === "new") return "new";
  const due = new Date(nextDueAt(mistake)).getTime();
  const now = Date.now();
  if (due <= now) return "due";
  if (due - now <= 86400000) return "soon";
  return "soon";
}

function latestExample(mistake: MistakeMemory) {
  return mistake.examples?.[0] || "No example captured yet.";
}

function correctionExample(mistake: MistakeMemory) {
  return mistake.examples?.find((item) => item.includes("→")) || latestExample(mistake);
}

export function drillForMistake(mistake: MistakeMemory) {
  const type = mistake.mistakeType.replace(/_/g, " ");
  const correction = correctionExample(mistake);
  return {
    instruction: `Review ${type}. First read the correction, then rewrite one improved sentence using the same rule.`,
    modelCorrection: correction,
    nextAction: `Fix one ${type} mistake and write a cleaner sentence.`,
  };
}

export function toReviewItem(mistake: MistakeMemory): ReviewItem {
  const drill = drillForMistake(mistake);
  return {
    ...mistake,
    priority: reviewPriority(mistake),
    reviewStatus: reviewStatus(mistake),
    dueAt: nextDueAt(mistake),
    nextAction: drill.nextAction,
    drillInstruction: drill.instruction,
    modelCorrection: drill.modelCorrection,
  };
}

export function buildReviewQueue(mistakes: MistakeMemory[]) {
  return mistakes
    .map(toReviewItem)
    .sort((a, b) => {
      const rank = { high: 0, medium: 1, low: 2 } as const;
      const statusRank = { due: 0, soon: 1, new: 2, mastered: 3 } as const;
      return statusRank[a.reviewStatus] - statusRank[b.reviewStatus] || rank[a.priority] - rank[b.priority] || b.count - a.count;
    });
}

export function reviewSummary(mistakes: MistakeMemory[]) {
  const queue = buildReviewQueue(mistakes);
  return {
    total: queue.length,
    due: queue.filter((item) => item.reviewStatus === "due").length,
    recurring: queue.filter((item) => item.status === "recurring").length,
    mastered: queue.filter((item) => item.status === "mastered").length,
    highPriority: queue.filter((item) => item.priority === "high").length,
    topItem: queue[0] || null,
  };
}

export function buildReviewPrompt(item: ReviewItem) {
  return `Review this recurring mistake: ${item.mistakeType}. ${item.drillInstruction} Example/correction: ${item.modelCorrection}`;
}
