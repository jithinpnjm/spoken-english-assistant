import type { CoachMessage, CoachSession } from "../types";
import type { CurriculumCourseView, LessonCursorView } from "./curriculumClient";

export interface TopicProgressItem {
  id: string;
  title: string;
  moduleTitle: string;
  minutesSpent: number;
  targetMinutes: number;
  percent: number;
  status: "not_started" | "started" | "good" | "strong";
}

export function estimateMinutesFromMessages(messages: CoachMessage[]) {
  const learnerTurns = messages.filter((item) => item.sender === "user").length;
  const coachTurns = messages.filter((item) => item.sender === "coach").length;
  return Math.max(0, Math.round((learnerTurns * 1.5 + coachTurns * 0.75) * 10) / 10);
}

export function topicStatus(percent: number): TopicProgressItem["status"] {
  if (percent >= 100) return "strong";
  if (percent >= 60) return "good";
  if (percent > 0) return "started";
  return "not_started";
}

export function buildTopicProgress(args: {
  courses: CurriculumCourseView[];
  cursor: LessonCursorView | null;
  sessions: CoachSession[];
  messages: CoachMessage[];
  targetMinutes?: number;
}): TopicProgressItem[] {
  const target = args.targetMinutes || 20;
  const currentTopicId = args.cursor?.subsectionId;
  const currentMinutes = estimateMinutesFromMessages(args.messages);

  return args.courses.flatMap((course) => course.modules).flatMap((module) => {
    return module.subsections.map((subsection) => {
      const relatedSessionMinutes = args.sessions
        .filter((session) => session.title?.toLowerCase().includes(subsection.title.toLowerCase()))
        .length * 5;
      const minutesSpent = subsection.id === currentTopicId ? Math.max(currentMinutes, relatedSessionMinutes) : relatedSessionMinutes;
      const percent = Math.min(100, Math.round((minutesSpent / target) * 100));
      return {
        id: subsection.id,
        title: subsection.title,
        moduleTitle: module.title,
        minutesSpent,
        targetMinutes: target,
        percent,
        status: topicStatus(percent),
      };
    });
  });
}

export function topicProgressSummary(items: TopicProgressItem[]) {
  return {
    totalTopics: items.length,
    startedTopics: items.filter((item) => item.status !== "not_started").length,
    goodTopics: items.filter((item) => item.status === "good" || item.status === "strong").length,
    strongTopics: items.filter((item) => item.status === "strong").length,
  };
}
