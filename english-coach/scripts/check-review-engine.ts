import { buildReviewPrompt, buildReviewQueue, reviewSummary } from "../src/lib/reviewEngine";
import type { MistakeMemory } from "../src/types";

function fail(message: string): never {
  console.error(`[review-engine] FAIL: ${message}`);
  process.exit(1);
}

const now = new Date();
const old = new Date(now.getTime() - 5 * 86400000).toISOString();

const mistakes: MistakeMemory[] = [
  {
    mistakeId: "article_usage",
    profileId: "test",
    mistakeType: "article_usage",
    count: 6,
    examples: ["I need apple.", "I need apple → I need an apple."],
    lastSeenAt: old,
    status: "recurring",
  },
  {
    mistakeId: "past_tense",
    profileId: "test",
    mistakeType: "past_tense",
    count: 2,
    examples: ["I go yesterday.", "I go yesterday → I went yesterday."],
    lastSeenAt: old,
    status: "recurring",
  },
];

const queue = buildReviewQueue(mistakes);
if (queue.length !== 2) fail("Expected two review items");
if (queue[0].mistakeType !== "article_usage") fail("High-count mistake should be first");
if (queue[0].priority !== "high") fail("High-count recurring mistake should be high priority");
if (queue[0].reviewStatus !== "due") fail("Old recurring mistake should be due");
if (!queue[0].drillInstruction.includes("Review article usage")) fail("Drill instruction should describe mistake type");

const prompt = buildReviewPrompt(queue[0]);
if (!prompt.includes("Review this recurring mistake")) fail("Review prompt missing intro");
if (!prompt.includes("article_usage")) fail("Review prompt missing mistake type");
if (!prompt.includes("I need apple")) fail("Review prompt missing example/correction");

const summary = reviewSummary(mistakes);
if (summary.total !== 2) fail("Summary total mismatch");
if (summary.highPriority !== 1) fail("Summary highPriority mismatch");
if (summary.recurring !== 2) fail("Summary recurring mismatch");

console.log("[review-engine] OK: review queue, priority, due status, summary, and prompt generation work.");
