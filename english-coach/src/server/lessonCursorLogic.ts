import { findCourseForSubsection, findModuleForSubsection, getCurriculumSubsection, getInitialSubsectionForLevel, getNextSubsection, type CurriculumLevelBand, type CurriculumPhase } from "./curriculumRegistry";
import { LESSON_PHASE_ORDER, type LessonCursor, type LessonMessageType } from "./lessonCursorTypes";

export const PAST_TENSE_PILOT_FIRST_SUBSECTION = "b09-past-tense-pilot-01";

export function normalizeLevelBand(level: string | undefined): CurriculumLevelBand {
  if (level === "Beginner" || level === "Advanced") return level;
  return "Intermediate";
}

function createCursorAtSubsection(args: {
  learnerId: string;
  subsectionId: string;
  sessionDay?: number;
  now?: string;
}): LessonCursor {
  const subsection = getCurriculumSubsection(args.subsectionId);
  const module = findModuleForSubsection(args.subsectionId);
  const course = findCourseForSubsection(args.subsectionId);
  if (!subsection || !module || !course) throw new Error(`Unable to resolve curriculum path for ${args.subsectionId}`);

  return {
    learnerId: args.learnerId,
    courseId: course.id,
    moduleId: module.id,
    subsectionId: subsection.id,
    phase: "intro",
    turnsAtPhase: 0,
    status: "in_progress",
    digressionStack: [],
    lastActiveAt: args.now || new Date().toISOString(),
    sessionDay: args.sessionDay || 1,
    phaseSummary: `Starting ${subsection.title}.`,
  };
}

export function createInitialLessonCursor(args: {
  learnerId: string;
  level: string | undefined;
  sessionDay?: number;
  now?: string;
}): LessonCursor {
  const levelBand = normalizeLevelBand(args.level);
  const subsection = getInitialSubsectionForLevel(levelBand);
  return createCursorAtSubsection({ ...args, subsectionId: subsection.id });
}

export function createPastTensePilotCursor(args: {
  learnerId: string;
  sessionDay?: number;
  now?: string;
}): LessonCursor {
  return createCursorAtSubsection({ ...args, subsectionId: PAST_TENSE_PILOT_FIRST_SUBSECTION });
}

export function isPreviousCalendarDay(lastActiveAt: string, nowIso = new Date().toISOString()) {
  return new Date(lastActiveAt).toDateString() !== new Date(nowIso).toDateString();
}

export function getNextPhase(phase: CurriculumPhase): CurriculumPhase | null {
  const index = LESSON_PHASE_ORDER.indexOf(phase);
  if (index < 0 || index === LESSON_PHASE_ORDER.length - 1) return null;
  return LESSON_PHASE_ORDER[index + 1];
}

export function pushDigression(cursor: LessonCursor, learnerQuestion: string, now = new Date().toISOString()): LessonCursor {
  return {
    ...cursor,
    digressionStack: [...cursor.digressionStack, { learnerQuestion, askedAtPhase: cursor.phase, timestamp: now }],
    lastActiveAt: now,
  };
}

export function popDigression(cursor: LessonCursor, now = new Date().toISOString()): LessonCursor {
  return {
    ...cursor,
    digressionStack: cursor.digressionStack.slice(0, -1),
    lastActiveAt: now,
  };
}

export function moveCursorAfterTurn(args: {
  cursor: LessonCursor;
  messageType: LessonMessageType;
  advancePhase: boolean;
  now?: string;
}): LessonCursor {
  const now = args.now || new Date().toISOString();
  const cursor = args.cursor;
  if (args.messageType === "learner_question") return cursor;

  const turnsAtPhase = args.messageType === "learner_attempt" ? cursor.turnsAtPhase + 1 : cursor.turnsAtPhase;
  if (!args.advancePhase) return { ...cursor, turnsAtPhase, status: "awaiting_learner_attempt", lastActiveAt: now };

  const nextPhase = getNextPhase(cursor.phase);
  if (nextPhase) {
    return {
      ...cursor,
      phase: nextPhase,
      turnsAtPhase: 0,
      status: "in_progress",
      lastActiveAt: now,
      phaseSummary: `Completed ${cursor.phase}; moving to ${nextPhase}.`,
    };
  }

  const nextSubsection = getNextSubsection(cursor.subsectionId);
  if (!nextSubsection) return { ...cursor, turnsAtPhase, status: "completed", lastActiveAt: now, phaseSummary: "Completed the final subsection." };

  const module = findModuleForSubsection(nextSubsection.id);
  const course = findCourseForSubsection(nextSubsection.id);
  if (!module || !course) throw new Error(`Unable to resolve next curriculum path for ${nextSubsection.id}`);

  return {
    ...cursor,
    courseId: course.id,
    moduleId: module.id,
    subsectionId: nextSubsection.id,
    phase: "intro",
    turnsAtPhase: 0,
    status: "in_progress",
    lastActiveAt: now,
    phaseSummary: `Starting ${nextSubsection.title}.`,
  };
}
