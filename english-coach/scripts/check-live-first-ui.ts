import { buildTopicProgress, estimateMinutesFromMessages, topicProgressSummary, topicStatus } from "../src/lib/topicProgress";
import type { CoachMessage, CoachSession } from "../src/types";
import type { CurriculumCourseView, LessonCursorView } from "../src/lib/curriculumClient";

function fail(message: string): never {
  console.error(`[live-first-ui] FAIL: ${message}`);
  process.exit(1);
}

const messages: CoachMessage[] = [
  { messageId: "u1", sessionId: "s1", userId: "u", sender: "user", source: "chat", kind: "coach_reply", text: "I need help.", shouldTriggerCoachResponse: true, grammarCorrection: null, createdAt: "2026-01-01T10:00:00.000Z" },
  { messageId: "c1", sessionId: "s1", userId: "u", sender: "coach", source: "chat", kind: "coach_reply", text: "Sure.", shouldTriggerCoachResponse: false, grammarCorrection: null, createdAt: "2026-01-01T10:01:00.000Z" },
  { messageId: "u2", sessionId: "s1", userId: "u", sender: "user", source: "chat", kind: "coach_reply", text: "Can you repeat?", shouldTriggerCoachResponse: true, grammarCorrection: null, createdAt: "2026-01-01T10:02:00.000Z" },
];

const minutes = estimateMinutesFromMessages(messages);
if (minutes !== 3.8) fail(`expected 3.8 estimated minutes, got ${minutes}`);
if (topicStatus(0) !== "not_started") fail("0 percent should be not_started");
if (topicStatus(40) !== "started") fail("40 percent should be started");
if (topicStatus(70) !== "good") fail("70 percent should be good");
if (topicStatus(100) !== "strong") fail("100 percent should be strong");

const courses: CurriculumCourseView[] = [{
  id: "course",
  title: "Course",
  levelBand: "Beginner",
  order: 1,
  modules: [{
    id: "module",
    title: "Module",
    courseId: "course",
    levelBand: "Beginner",
    order: 1,
    subsections: [
      { id: "topic-1", title: "Topic One", order: 1, prerequisiteIds: [], phases: ["intro"] },
      { id: "topic-2", title: "Topic Two", order: 2, prerequisiteIds: [], phases: ["intro"] },
    ],
  }],
}];

const cursor: LessonCursorView = {
  learnerId: "learner",
  courseId: "course",
  moduleId: "module",
  subsectionId: "topic-1",
  phase: "intro",
  turnsAtPhase: 0,
  status: "in_progress",
  lastActiveAt: "2026-01-01T10:00:00.000Z",
  sessionDay: 1,
};

const sessions: CoachSession[] = [
  { sessionId: "s2", userId: "u", userName: "Learner", title: "Study: Topic Two", createdAt: "2026-01-01T10:00:00.000Z", updatedAt: "2026-01-01T10:00:00.000Z", mode: "writing", profileId: "learner" },
];

const progress = buildTopicProgress({ courses, cursor, sessions, messages, targetMinutes: 10 });
const first = progress.find((item) => item.id === "topic-1");
const second = progress.find((item) => item.id === "topic-2");
if (!first || first.minutesSpent !== 3.8) fail("current topic should use message-based minutes");
if (!second || second.minutesSpent !== 5) fail("non-current topic should use session estimate");

const summary = topicProgressSummary(progress);
if (summary.totalTopics !== 2) fail("summary totalTopics mismatch");
if (summary.startedTopics !== 2) fail("summary startedTopics mismatch");

console.log("[live-first-ui] OK: topic-time progress and simplified coverage summary work.");
