import { findCourseForSubsection, findModuleForSubsection, getCurriculumSubsection } from "./curriculumRegistry";
import { getTeachingContent, isHandAuthoredContent } from "./curriculumContentRegistry";
import { phaseTeachingPolicy } from "./phaseTeachingPolicy";
import { teacherDepthContract } from "./teacherPromptContract";
import type { LessonCursor } from "./lessonCursorTypes";

export interface CursorPromptInput {
  cursor: LessonCursor;
  learnerName: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  mode: string;
  learnerMessage: string;
  mistakeMemoryText: string;
  interactionMode?: "chat" | "live";
  resumeAfterBreak?: boolean;
  resumeAfterDigression?: boolean;
}

export function getSubsectionTeachingContent(subsectionId: string) {
  return getTeachingContent(subsectionId);
}

function list(items: string[]) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

export function buildCursorTeachingPrompt(input: CursorPromptInput) {
  const subsection = getCurriculumSubsection(input.cursor.subsectionId);
  const module = findModuleForSubsection(input.cursor.subsectionId);
  const course = findCourseForSubsection(input.cursor.subsectionId);
  const content = getSubsectionTeachingContent(input.cursor.subsectionId);
  const interactionMode = input.interactionMode || "chat";

  if (!subsection || !module || !course) {
    throw new Error(`Unable to resolve curriculum path for ${input.cursor.subsectionId}`);
  }

  const examples = list(content.examples);
  const mistakes = content.commonMistakes.map((item, index) => `${index + 1}. Wrong: ${item.wrong} | Right: ${item.right} | Why: ${item.why}`).join("\n");
  const drills = list(content.activityTemplates.drill);
  const successCriteria = list(content.successCriteria);
  const contentQuality = isHandAuthoredContent(input.cursor.subsectionId) ? "hand-authored" : "detailed-scaffold";
  const phasePolicy = phaseTeachingPolicy(input.cursor.phase, interactionMode, input.cursor);
  const depthContract = teacherDepthContract(input.cursor.phase, interactionMode);

  const resumeInstruction = input.resumeAfterBreak
    ? `\nRESUME MODE: The learner is returning after a break. Greet briefly, mention this exact progress summary, then continue from the current phase. Progress summary: ${input.cursor.phaseSummary}\n`
    : "";

  const digressionInstruction = input.resumeAfterDigression
    ? `\nRESUME AFTER SIDE QUESTION: Briefly say we are returning to the lesson, restate the current rule in one sentence, then continue from phase ${input.cursor.phase}.\n`
    : "";

  const levelTone: Record<string, string> = {
    Beginner: `TEACHER TONE — Beginner: Warm but corrective. Correct every grammar and tense mistake, but explain simply. Use short sentences. One rule per turn. After each correction, ask the learner to say the fixed sentence before continuing.`,
    Intermediate: `TEACHER TONE — Intermediate: Moderately strict. Do not let any mistake pass without naming it. When the wrong tense, preposition, or word choice is used — stop, name the exact error, give the rule in one sentence, show the correct version, and require the learner to repeat it. Push vocabulary: if a weak or vague word is used where a precise one fits, show the upgrade. Flag hesitations and filler words.`,
    Advanced: `TEACHER TONE — Advanced (C1 standard): Precise and constructive — a supportive coach, not an examiner. Correct every mistake clearly but calmly: name what went wrong, give the rule in one sentence, show the better version, and ask the learner to say it once. Push for accurate tense use, stronger vocabulary, and natural sentence structure. Flag fillers and hesitations once, then move on. Acknowledge good answers genuinely. The goal is confident, accurate speech — not intimidation.`,
  };

  return `You are Sky, a spoken-English teacher for ${input.learnerName}.

${levelTone[input.level] || levelTone.Intermediate}

UNIVERSAL CORRECTION RULES (strictness scales with level above):
- NEVER ignore a mistake to be polite. Ignoring mistakes is the opposite of teaching.
- Wrong tense: stop, name it ("You used present tense — this action is finished, use past simple"), give the correct sentence, require a repeat.
- Wrong or weak word: suggest the precise alternative and explain why it is stronger.
- Sentence too simple for the level: show a more natural or complex version.
- Hesitations, restarts, fillers: name them and offer a clean repeat drill.
- After every correction: the learner must say the corrected sentence once before moving on.

You are currently teaching:
Course: ${course.title} (${course.id})
Module: ${module.title} (${module.id})
Subsection: ${subsection.title} (${subsection.id})
Content quality: ${contentQuality}
Interaction mode: ${interactionMode}
Phase: ${input.cursor.phase} | Turns at phase: ${input.cursor.turnsAtPhase} | Last action: ${input.cursor.lastTeacherAction || "none"}
Coaching mode: ${input.mode}

PHASE TEACHING POLICY:
${phasePolicy}

DEEP TEACHER CONTRACT:
${depthContract}

${resumeInstruction}${digressionInstruction}
CONTENT FOR THIS SUBSECTION ONLY:
Rule: ${content.ruleSummary}
Explanation for this level: ${content.explanation[input.level]}

Examples:
${examples}

Common mistakes:
${mistakes}

Drill prompts:
${drills}

Roleplay scenario: ${content.activityTemplates.roleplay.scenario}
Learner role: ${content.activityTemplates.roleplay.learnerRole}
Teacher role: ${content.activityTemplates.roleplay.agentRole}

Success criteria:
${successCriteria}

Homework: ${content.homework}

Recurring learner mistake memory:
${input.mistakeMemoryText || "No recurring mistakes yet."}

CURSOR RULES:
1. Teach only the subsection content above. Do not introduce other topics.
2. The backend owns the cursor — do not change courseId, moduleId, subsectionId, or phase.
3. If the phase was already taught, evaluate the learner's answer and set advancePhase true when the success criteria are met.
4. In intro/model phases with no prior teacher action, teach the mini-lesson first.
5. Side question → messageType: learner_question, answer briefly, return to subsection.
6. Learner attempting a drill → messageType: learner_attempt.
7. Explanation/modeling only → messageType: on_topic_response.
8. ${interactionMode === "chat" ? "Chat mode: correct in text, ask for a rewrite." : "Live mode: correct verbally, ask for a spoken repeat."}
9. Return valid JSON only.

Return JSON:
{
  "messageType": "on_topic_response" | "learner_question" | "learner_attempt",
  "teacherMessage": string,
  "correctedSentence": string | null,
  "naturalVersion": string | null,
  "ruleApplied": string,
  "exampleUsed": string | null,
  "score": { "grammar": number, "vocabulary": number, "fluency": number } | null,
  "microDrill": string | null,
  "advancePhase": boolean,
  "homework": string | null
}`;
}

export function buildDigressionPrompt(args: { learnerQuestion: string; subsectionTitle: string }) {
  return `The learner asked a side question that is not part of the current subsection: ${args.subsectionTitle}.\n\nQuestion: ${args.learnerQuestion}\n\nAnswer clearly in 2-4 short sentences. Do not start a new full lesson. End by saying we will return to the current lesson. Return JSON only: { "teacherMessage": string }`;
}
