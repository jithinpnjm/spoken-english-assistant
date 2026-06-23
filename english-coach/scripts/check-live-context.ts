import { buildLiveLessonContext } from "../src/lib/liveLessonContext";
import type { CurriculumCourseView, LessonCursorView, ProductTrackView } from "../src/lib/curriculumClient";

function fail(message: string): never {
  console.error(`[live-context] FAIL: ${message}`);
  process.exit(1);
}

const courses: CurriculumCourseView[] = [{
  id: "course",
  title: "Course",
  order: 1,
  levelBand: "Beginner",
  modules: [{
    id: "module-1",
    title: "Module One",
    order: 1,
    courseId: "course",
    levelBand: "Beginner",
    subsections: [{ id: "lesson-1", title: "Lesson One", order: 1, prerequisiteIds: [], phases: ["intro", "model"] }],
  }],
}];

const cursor: LessonCursorView = {
  learnerId: "learner",
  courseId: "course",
  moduleId: "module-1",
  subsectionId: "lesson-1",
  phase: "controlled_practice",
  turnsAtPhase: 0,
  status: "in_progress",
  lastActiveAt: "2026-01-01T10:00:00.000Z",
  sessionDay: 1,
  phaseSummary: "Completed model; moving to guided practice.",
};

const track: ProductTrackView = {
  id: "foundation-english",
  title: "Foundation English",
  description: "Basics",
  primaryLevel: "Beginner",
  moduleIds: ["module-1"],
};

const context = buildLiveLessonContext({ courses, cursor, selectedTrack: track, fallbackTopic: "Daily warm-up" });
for (const expected of ["LIVE CURRICULUM MODE", "Foundation English", "Module One", "Lesson One", "controlled_practice", "Saved progress summary"]) {
  if (!context.includes(expected)) fail(`Missing ${expected}`);
}

const fallback = buildLiveLessonContext({ courses, cursor: null, selectedTrack: null, fallbackTopic: "Daily warm-up" });
if (!fallback.includes("General practice topic")) fail("Fallback live context missing general practice topic");

console.log("[live-context] OK: Live Mode receives active curriculum context and fallback practice context.");
