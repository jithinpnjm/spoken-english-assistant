import { findModule, findSubsection, type CurriculumCourseView, type LessonCursorView, type ProductTrackView } from "./curriculumClient";

export interface LiveLessonContextInput {
  courses: CurriculumCourseView[];
  cursor: LessonCursorView | null;
  selectedTrack: ProductTrackView | null;
  fallbackTopic: string;
}

const phaseInstruction: Record<string, string> = {
  intro: "Teach the concept first, then ask one short recognition question. Do not jump into free chat.",
  model: "Give examples and pattern breakdown, then ask the learner what they notice.",
  controlled_practice: "Ask for one guided spoken answer using a short frame or word bank.",
  correction: "Correct the learner's last attempt, explain the fix briefly, and ask them to repeat aloud.",
  repeat: "Ask the learner to repeat or say the corrected sentence naturally.",
  free_practice: "Run a short conversation or roleplay using only this lesson topic.",
  summary: "Summarize the lesson and give one small speaking homework task.",
};

export function buildLiveLessonContext(input: LiveLessonContextInput) {
  if (!input.cursor) {
    return `General practice topic: ${input.fallbackTopic}. Keep this as English practice, not generic chat.`;
  }

  const module = findModule(input.courses, input.cursor.moduleId);
  const lesson = findSubsection(input.courses, input.cursor.subsectionId);
  const phase = input.cursor.phase;

  return [
    "LIVE CURRICULUM MODE.",
    `Track: ${input.selectedTrack?.title || "Study track"}.`,
    `Module: ${module?.title || input.cursor.moduleId}.`,
    `Lesson: ${lesson?.title || input.cursor.subsectionId}.`,
    `Phase: ${phase}.`,
    `Phase instruction: ${phaseInstruction[phase] || "Continue the current lesson phase."}`,
    `Saved progress summary: ${input.cursor.phaseSummary || "Continue from the active lesson cursor."}`,
    "Rules: stay inside this lesson, keep replies short for voice, correct one high-value mistake, ask exactly one spoken action, and do not restart from the beginning unless the learner asks.",
  ].join("\n");
}
