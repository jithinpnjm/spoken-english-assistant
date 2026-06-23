import { buildCursorTeachingPrompt } from "../src/server/cursorPromptBuilder";
import { createPastTensePilotCursor } from "../src/server/lessonCursorLogic";

function fail(message: string): never {
  console.error(`[teach-first] FAIL: ${message}`);
  process.exit(1);
}

const cursor = createPastTensePilotCursor({ learnerId: "test", sessionDay: 1, now: "2026-01-01T10:00:00.000Z" });
const prompt = buildCursorTeachingPrompt({
  cursor,
  learnerName: "Sandra",
  level: "Beginner",
  mode: "balanced",
  learnerMessage: "start",
  mistakeMemoryText: "No mistakes yet.",
  interactionMode: "chat",
});

const required = [
  "Do not test before teaching",
  "INTRO PHASE",
  "Teach the concept first",
  "Do not ask the learner to produce a sentence before explanation and examples",
  "Chat mode means type/rewrite/correct in text",
];

for (const phrase of required) {
  if (!prompt.includes(phrase)) fail(`Prompt missing phrase: ${phrase}`);
}

console.log("[teach-first] OK: intro prompt enforces class-first teaching flow.");
