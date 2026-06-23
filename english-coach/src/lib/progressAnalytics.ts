import type { CoachMessage, CoachSession, LearnerProfile, MistakeMemory } from "../types";
import type { CurriculumCourseView, LessonCursorView, ProductTrackView } from "./curriculumClient";

export interface ProgressSummary {
  challengeDay: number;
  streak: number;
  totalPracticeMinutes: number;
  totalSessions: number;
  totalMessages: number;
  learnerMessages: number;
  coachMessages: number;
  averageScores: {
    fluency: number | null;
    grammar: number | null;
    vocabulary: number | null;
  };
  activeMistakes: number;
  masteredMistakes: number;
  recurringMistakes: number;
  currentLessonLabel: string;
  currentTrackLabel: string;
  nextBestAction: string;
}

function average(values: number[]) {
  if (!values.length) return null;
  return Math.round((values.reduce((sum, item) => sum + item, 0) / values.length) * 10) / 10;
}

export function lessonLabel(courses: CurriculumCourseView[], cursor: LessonCursorView | null) {
  if (!cursor) return "No active lesson";
  const module = courses.flatMap((course) => course.modules).find((item) => item.id === cursor.moduleId);
  const subsection = module?.subsections.find((item) => item.id === cursor.subsectionId);
  return `${module?.title || cursor.moduleId} · ${subsection?.title || cursor.subsectionId} · ${cursor.phase}`;
}

export function buildProgressSummary(args: {
  learnerProfile: LearnerProfile | null;
  sessions: CoachSession[];
  messages: CoachMessage[];
  mistakes: MistakeMemory[];
  courses: CurriculumCourseView[];
  cursor: LessonCursorView | null;
  selectedTrack: ProductTrackView | null;
}): ProgressSummary {
  const learnerMessages = args.messages.filter((item) => item.sender === "user").length;
  const coachMessages = args.messages.filter((item) => item.sender === "coach").length;
  const fluencyScores = args.messages.map((item) => item.fluencyScore).filter((item): item is number => typeof item === "number");
  const grammarScores = args.messages.map((item) => item.grammarScore).filter((item): item is number => typeof item === "number");
  const vocabularyScores = args.messages.map((item) => item.vocabularyScore).filter((item): item is number => typeof item === "number");
  const masteredMistakes = args.mistakes.filter((item) => item.status === "mastered").length;
  const recurringMistakes = args.mistakes.filter((item) => item.status === "recurring").length;
  const activeMistakes = args.mistakes.filter((item) => item.status !== "mastered").length;

  let nextBestAction = "Start or continue a Study lesson.";
  if (recurringMistakes > 0) nextBestAction = "Do one Review drill for the most recurring mistake.";
  else if (args.cursor?.status === "in_progress") nextBestAction = "Continue the current lesson and complete one guided answer.";
  else if (learnerMessages < 2) nextBestAction = "Speak or type at least two complete sentences today.";
  else if (args.learnerProfile?.challengeDay && args.learnerProfile.challengeDay < 60) nextBestAction = "Complete today's 60-day challenge practice.";

  return {
    challengeDay: args.learnerProfile?.challengeDay || 1,
    streak: args.learnerProfile?.streak || 0,
    totalPracticeMinutes: args.learnerProfile?.totalPracticeMinutes || 0,
    totalSessions: args.sessions.length,
    totalMessages: args.messages.length,
    learnerMessages,
    coachMessages,
    averageScores: {
      fluency: average(fluencyScores),
      grammar: average(grammarScores),
      vocabulary: average(vocabularyScores),
    },
    activeMistakes,
    masteredMistakes,
    recurringMistakes,
    currentLessonLabel: lessonLabel(args.courses, args.cursor),
    currentTrackLabel: args.selectedTrack?.title || "No track selected",
    nextBestAction,
  };
}
