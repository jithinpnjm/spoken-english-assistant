import { findCourseForSubsection, findModuleForSubsection, getCurriculumSubsection } from "./curriculumRegistry";
import { getPilotPastTenseContent } from "./pilotPastTenseContent";
import type { LessonCursor } from "./lessonCursorTypes";

export interface CursorPromptInput {
  cursor: LessonCursor;
  learnerName: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  mode: string;
  learnerMessage: string;
  mistakeMemoryText: string;
  resumeAfterBreak?: boolean;
  resumeAfterDigression?: boolean;
}

export function getSubsectionTeachingContent(subsectionId: string) {
  return getPilotPastTenseContent(subsectionId);
}

function list(items: string[]) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

export function buildCursorTeachingPrompt(input: CursorPromptInput) {
  const subsection = getCurriculumSubsection(input.cursor.subsectionId);
  const module = findModuleForSubsection(input.cursor.subsectionId);
  const course = findCourseForSubsection(input.cursor.subsectionId);
  const content = getSubsectionTeachingContent(input.cursor.subsectionId);

  if (!subsection || !module || !course) {
    throw new Error(`Unable to resolve curriculum path for ${input.cursor.subsectionId}`);
  }
  if (!content) {
    throw new Error(`No authored teaching content found for ${input.cursor.subsectionId}`);
  }

  const examples = list(content.examples);
  const mistakes = content.commonMistakes.map((item, index) => `${index + 1}. Wrong: ${item.wrong} | Right: ${item.right} | Why: ${item.why}`).join("\n");
  const drills = list(content.activityTemplates.drill);
  const successCriteria = list(content.successCriteria);

  const resumeInstruction = input.resumeAfterBreak
    ? `\nRESUME MODE: The learner is returning after a break. Greet briefly, mention this exact progress summary, then continue from the current phase. Progress summary: ${input.cursor.phaseSummary}\n`
    : "";

  const digressionInstruction = input.resumeAfterDigression
    ? `\nRESUME AFTER SIDE QUESTION: Briefly say we are returning to the lesson, restate the current rule in one sentence, then continue from phase ${input.cursor.phase}.\n`
    : "";

  return `You are Sky, a personal spoken-English teacher for ${input.learnerName}.\n\nYou are currently teaching:\nCourse: ${course.title} (${course.id})\nModule: ${module.title} (${module.id})\nSubsection: ${subsection.title} (${subsection.id})\nPhase: ${input.cursor.phase}\nTurns at this phase: ${input.cursor.turnsAtPhase}\nLearner level: ${input.level}\nCoaching mode: ${input.mode}\n\n${resumeInstruction}${digressionInstruction}\nCONTENT FOR THIS SUBSECTION ONLY:\nRule: ${content.ruleSummary}\nExplanation for this learner level: ${content.explanation[input.level]}\n\nExamples:\n${examples}\n\nCommon mistakes:\n${mistakes}\n\nDrill prompts:\n${drills}\n\nRoleplay scenario: ${content.activityTemplates.roleplay.scenario}\nLearner role: ${content.activityTemplates.roleplay.learnerRole}\nTeacher role: ${content.activityTemplates.roleplay.agentRole}\n\nSuccess criteria:\n${successCriteria}\n\nHomework: ${content.homework}\n\nRecurring learner mistake memory:\n${input.mistakeMemoryText || "No recurring mistakes yet."}\n\nSTRICT CURSOR RULES:\n1. You may only teach the subsection content above.\n2. Do not introduce a different grammar topic.\n3. Do not change courseId, moduleId, subsectionId, or phase. The backend owns the cursor.\n4. If the learner asks a side question, set messageType to learner_question and answer briefly.\n5. If the learner is attempting the drill or speaking task, set messageType to learner_attempt.\n6. If you are giving explanation/modeling only, set messageType to on_topic_response.\n7. Set advancePhase true only when the current phase goal is reasonably met.\n8. Keep teacherMessage spoken-friendly and specific.\n9. Return valid JSON only.\n\nReturn JSON matching this schema:\n{\n  "messageType": "on_topic_response" | "learner_question" | "learner_attempt",\n  "teacherMessage": string,\n  "correctedSentence": string | null,\n  "naturalVersion": string | null,\n  "ruleApplied": string,\n  "exampleUsed": string | null,\n  "score": { "grammar": number, "vocabulary": number, "fluency": number } | null,\n  "microDrill": string | null,\n  "advancePhase": boolean,\n  "homework": string | null\n}`;
}

export function buildDigressionPrompt(args: { learnerQuestion: string; subsectionTitle: string }) {
  return `The learner asked a side question that is not part of the current subsection: ${args.subsectionTitle}.\n\nQuestion: ${args.learnerQuestion}\n\nAnswer clearly in 2-4 short sentences. Do not start a new full lesson. End by saying we will return to the current lesson. Return JSON only: { "teacherMessage": string }`;
}
