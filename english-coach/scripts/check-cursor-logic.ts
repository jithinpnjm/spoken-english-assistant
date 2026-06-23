import { createPastTensePilotCursor, moveCursorAfterTurn, popDigression, pushDigression } from "../src/server/lessonCursorLogic";

function fail(message: string): never {
  console.error(`[cursor] FAIL: ${message}`);
  process.exit(1);
}

const cursor = createPastTensePilotCursor({ learnerId: "test", sessionDay: 1, now: "2026-01-01T10:00:00.000Z" });
if (cursor.subsectionId !== "b09-past-tense-pilot-01") fail(`Expected pilot start, got ${cursor.subsectionId}`);
if (cursor.phase !== "intro") fail(`Expected intro phase, got ${cursor.phase}`);

const withQuestion = pushDigression(cursor, "What is the difference between was and had?", "2026-01-01T10:01:00.000Z");
if (withQuestion.digressionStack.length !== 1) fail("Digression was not pushed");
if (withQuestion.phase !== "intro") fail("Digression must not change phase");

const afterQuestion = popDigression(withQuestion, "2026-01-01T10:02:00.000Z");
if (afterQuestion.digressionStack.length !== 0) fail("Digression was not popped");
if (afterQuestion.phase !== "intro") fail("Returning from digression must preserve phase");

const moved = moveCursorAfterTurn({ cursor, messageType: "learner_attempt", advancePhase: true, now: "2026-01-01T10:03:00.000Z" });
if (moved.phase !== "model") fail(`Expected model phase after advance, got ${moved.phase}`);
if (moved.subsectionId !== cursor.subsectionId) fail("Advancing phase must not change subsection");

console.log("[cursor] OK: pilot start, digression push/pop, and phase movement validated.");
