import { createPastTensePilotCursor, markTeacherDeliveredPhase, moveCursorAfterTurn } from "../src/server/lessonCursorLogic";

function fail(message: string): never {
  console.error(`[lesson-progression] FAIL: ${message}`);
  process.exit(1);
}

const initial = createPastTensePilotCursor({ learnerId: "test", sessionDay: 1, now: "2026-01-01T10:00:00.000Z" });
if (initial.phase !== "intro") fail(`Expected intro, got ${initial.phase}`);
if (initial.turnsAtPhase !== 0) fail("Initial cursor should have zero turns at phase");

const afterTeachingIntro = markTeacherDeliveredPhase(initial, "2026-01-01T10:01:00.000Z");
if (afterTeachingIntro.phase !== "intro") fail("Teaching intro should not immediately change phase");
if (afterTeachingIntro.lastTeacherAction !== "taught_intro") fail("Intro teacher action was not recorded");
if (afterTeachingIntro.status !== "awaiting_learner_attempt") fail("Cursor should wait for learner answer after intro teaching");

const afterLearnerCheckAnswer = moveCursorAfterTurn({
  cursor: afterTeachingIntro,
  messageType: "learner_attempt",
  advancePhase: false,
  now: "2026-01-01T10:02:00.000Z",
});

if (afterLearnerCheckAnswer.phase !== "model") fail(`Expected model phase after mini-check answer, got ${afterLearnerCheckAnswer.phase}`);
if (afterLearnerCheckAnswer.turnsAtPhase !== 0) fail("New phase should reset turnsAtPhase");
if (afterLearnerCheckAnswer.lastTeacherAction !== undefined) fail("New phase should clear lastTeacherAction");

const afterTeachingModel = markTeacherDeliveredPhase(afterLearnerCheckAnswer, "2026-01-01T10:03:00.000Z");
const afterLearnerNoticing = moveCursorAfterTurn({
  cursor: afterTeachingModel,
  messageType: "learner_attempt",
  advancePhase: false,
  now: "2026-01-01T10:04:00.000Z",
});
if (afterLearnerNoticing.phase !== "controlled_practice") fail(`Expected controlled_practice, got ${afterLearnerNoticing.phase}`);

console.log("[lesson-progression] OK: intro and model are taught once, then learner replies advance the lesson.");
