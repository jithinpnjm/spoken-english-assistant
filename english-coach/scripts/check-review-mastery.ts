import { applyReviewAttemptToMistake, createReviewAttempt } from "../src/lib/reviewMastery";
import type { MistakeMemory } from "../src/types";

function fail(message: string): never {
  console.error(`[review-mastery] FAIL: ${message}`);
  process.exit(1);
}

let memory: MistakeMemory = {
  mistakeId: "article_usage",
  profileId: "test",
  mistakeType: "article_usage",
  count: 5,
  examples: ["model correction example"],
  lastSeenAt: "2026-01-01T10:00:00.000Z",
  status: "recurring",
};

const prompt = "Review article usage";
const expectedPattern = "an apple";

for (let i = 0; i < 3; i += 1) {
  const attempt = createReviewAttempt({
    profileId: "test",
    mistakeId: memory.mistakeId,
    mistakeType: memory.mistakeType,
    prompt,
    learnerAnswer: `This is an apple ${i}`,
    expectedPattern,
    now: `2026-01-0${i + 2}T10:00:00.000Z`,
  });
  if (attempt.result !== "success") fail(`Expected success for attempt ${i + 1}`);
  memory = applyReviewAttemptToMistake(memory, attempt);
}

if (memory.status !== "mastered") fail(`Expected mastered, got ${memory.status}`);
if (memory.reviewStats?.attempts !== 3) fail("Expected three attempts");
if (memory.reviewStats?.successfulAttempts !== 3) fail("Expected three successful attempts");
if ((memory.reviewStats?.masteryScore || 0) < 80) fail("Expected mastery score >= 80");

const weak = createReviewAttempt({
  profileId: "test",
  mistakeId: memory.mistakeId,
  mistakeType: memory.mistakeType,
  prompt,
  learnerAnswer: "x",
  expectedPattern,
  now: "2026-01-06T10:00:00.000Z",
});
if (weak.result !== "needs_work") fail("Expected needs_work for weak review answer");

console.log("[review-mastery] OK: review attempts update mastery state and score.");
