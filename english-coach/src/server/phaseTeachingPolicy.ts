import type { CurriculumPhase } from "./curriculumRegistry";
import type { LessonCursor } from "./lessonCursorTypes";

export function phaseTeachingPolicy(phase: CurriculumPhase, interactionMode: "chat" | "live" = "chat", cursor?: LessonCursor) {
  const learnerAction = interactionMode === "live" ? "say" : "type";
  const repeatAction = interactionMode === "live" ? "repeat aloud" : "rewrite in chat";

  const alreadyTaught = cursor?.status === "awaiting_learner_attempt" || Boolean(cursor?.lastTeacherAction);
  const common = `Do not test before teaching. Do not ask the learner to produce the target structure until you have explained and modeled it.`;

  if (alreadyTaught) {
    switch (phase) {
      case "intro":
        return `INTRO FOLLOW-UP: The intro mini class has already been delivered. Do not repeat the whole lesson opening. Evaluate the learner's recognition/check answer briefly, give the correct answer if needed, and set advancePhase true so the backend moves to model phase.`;
      case "model":
        return `MODEL FOLLOW-UP: The model examples have already been delivered. Do not repeat all examples. Briefly confirm the learner noticed the pattern, then set advancePhase true so the backend moves to controlled practice.`;
      case "controlled_practice":
        return `CONTROLLED PRACTICE FOLLOW-UP: Evaluate the learner's guided answer. If there is an error, correct it and set advancePhase true so the backend moves to correction phase.`;
      case "correction":
        return `CORRECTION FOLLOW-UP: The correction has been given. Ask the learner to ${repeatAction} the corrected sentence and set advancePhase true when ready.`;
      case "repeat":
        return `REPEAT FOLLOW-UP: Check the rewritten/repeated sentence briefly. If it matches the correction well enough, set advancePhase true so the backend moves to free practice.`;
      default:
        return common;
    }
  }

  switch (phase) {
    case "intro":
      return `${common}\nINTRO PHASE: Teach the concept first. Explain what the topic means, when to use it, and the basic structure. Give 2-3 simple examples. End with one easy recognition question, not a production task. For example, ask the learner to choose which example is correct or identify the past word.`;
    case "model":
      return `${common}\nMODEL PHASE: Show model sentences and break them down. Explain subject, verb form, time word, and natural spoken version. Then ask the learner to notice a pattern, not create a new sentence yet.`;
    case "controlled_practice":
      return `CONTROLLED PRACTICE PHASE: Now give a small guided task. Ask the learner to ${learnerAction} one sentence using a provided word bank or sentence frame. Keep it easy and constrained.`;
    case "correction":
      return `CORRECTION PHASE: Correct the learner's attempt. Explain the mistake in simple words, provide a better sentence, and ask the learner to ${repeatAction}.`;
    case "repeat":
      return `REPEAT PHASE: Ask the learner to ${repeatAction} the corrected sentence. Do not introduce a new topic. Focus on accuracy and naturalness.`;
    case "free_practice":
      return `FREE PRACTICE PHASE: Start a short conversation or roleplay using only the current topic. Ask one focused follow-up question and correct mistakes naturally.`;
    case "summary":
      return `SUMMARY PHASE: Recap the rule, give 2 corrected examples from the session, mention one recurring mistake, and give small homework.`;
    default:
      return common;
  }
}
