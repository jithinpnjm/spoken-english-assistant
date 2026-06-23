import { findCourseForSubsection, findModuleForSubsection, getCurriculumModule, getCurriculumSubsection, getFirstCourseForLevel, type CurriculumLevelBand } from "./curriculumRegistry";
import { createInitialLessonCursor } from "./lessonCursorLogic";
import { resetLessonCursor, saveLessonCursor } from "./lessonCursorStore";
import type { LessonCursor } from "./lessonCursorTypes";

function createCursorAtSubsection(args: {
  learnerId: string;
  subsectionId: string;
  sessionDay?: number;
}): LessonCursor {
  const subsection = getCurriculumSubsection(args.subsectionId);
  const module = findModuleForSubsection(args.subsectionId);
  const course = findCourseForSubsection(args.subsectionId);
  if (!subsection || !module || !course) throw new Error(`Unable to resolve subsection ${args.subsectionId}`);
  return {
    learnerId: args.learnerId,
    courseId: course.id,
    moduleId: module.id,
    subsectionId: subsection.id,
    phase: "intro",
    turnsAtPhase: 0,
    status: "in_progress",
    digressionStack: [],
    lastActiveAt: new Date().toISOString(),
    sessionDay: args.sessionDay || 1,
    phaseSummary: `Starting ${subsection.title}.`,
  };
}

export async function startLevelTrack(args: {
  learnerId: string;
  levelBand: CurriculumLevelBand;
  sessionDay?: number;
}) {
  const course = getFirstCourseForLevel(args.levelBand);
  const firstSubsection = course.modules[0]?.subsections[0];
  if (!firstSubsection) throw new Error(`No first subsection for ${args.levelBand}`);
  const cursor = createCursorAtSubsection({ learnerId: args.learnerId, subsectionId: firstSubsection.id, sessionDay: args.sessionDay });
  return saveLessonCursor(cursor);
}

export async function startModule(args: {
  learnerId: string;
  moduleId: string;
  sessionDay?: number;
}) {
  const module = getCurriculumModule(args.moduleId);
  const firstSubsection = module?.subsections[0];
  if (!module || !firstSubsection) throw new Error(`Module not found or empty: ${args.moduleId}`);
  const cursor = createCursorAtSubsection({ learnerId: args.learnerId, subsectionId: firstSubsection.id, sessionDay: args.sessionDay });
  return saveLessonCursor(cursor);
}

export async function startSubsection(args: {
  learnerId: string;
  subsectionId: string;
  sessionDay?: number;
}) {
  const cursor = createCursorAtSubsection(args);
  return saveLessonCursor(cursor);
}

export async function resetForLevel(args: {
  learnerId: string;
  level: string | undefined;
  sessionDay?: number;
}) {
  return resetLessonCursor(args);
}

export function previewInitialCursor(args: {
  learnerId: string;
  level: string | undefined;
  sessionDay?: number;
}) {
  return createInitialLessonCursor(args);
}
