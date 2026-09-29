// Practice-block flow control. This is the successor of english-coach's lesson cursor
// (lessonCursorLogic.ts / lessonCursorTypes.ts). The old cursor walked a 338-subsection registry through
// intro -> model -> controlled_practice -> correction -> repeat -> free_practice -> summary and was
// persisted in Firestore. In the portal the MDX page itself does the intro/model teaching, so a practice
// block only needs the part of the loop that happens *after* the page: open -> practice ->
// (correction -> rewrite/repeat)* -> summary. The state is small and travels with each request, so the
// server stays stateless (no Firestore) while the backend still owns the transition rules.

export type PracticePhase = "opening" | "practice" | "repeat" | "summary" | "complete";
export type MessageType = "on_topic_response" | "learner_question" | "learner_attempt";

export interface PracticeState {
  phase: PracticePhase;
  learnerTurns: number;
  /** How many rewrite/repeat attempts the learner has made for the current correction. */
  repeatAttempts: number;
}

export interface TurnOutcome {
  messageType: MessageType;
  needsRepeat: boolean;
  scenarioComplete: boolean;
}

/** After this many failed rewrite attempts the teacher gives the model answer and moves on. */
export const MAX_REPEAT_ATTEMPTS = 2;
/** After this many learner turns the UI offers a summary even if the scenario is still open. */
export const SUGGEST_SUMMARY_AFTER_TURNS = 10;

const PHASES: PracticePhase[] = ["opening", "practice", "repeat", "summary", "complete"];

export function initialPracticeState(): PracticeState {
  return { phase: "opening", learnerTurns: 0, repeatAttempts: 0 };
}

export function sanitizeState(raw: unknown): PracticeState {
  const input = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const phase = PHASES.includes(input.phase as PracticePhase) ? (input.phase as PracticePhase) : "opening";
  const learnerTurns = Number.isFinite(Number(input.learnerTurns)) ? Math.max(0, Math.min(500, Number(input.learnerTurns))) : 0;
  const repeatAttempts = Number.isFinite(Number(input.repeatAttempts)) ? Math.max(0, Math.min(10, Number(input.repeatAttempts))) : 0;
  return { phase, learnerTurns, repeatAttempts };
}

export function safeMessageType(value: unknown): MessageType {
  if (value === "learner_question" || value === "learner_attempt") return value;
  return "on_topic_response";
}

/** Applies one teacher turn to the state. `learnerSpoke` is false for the opening and summary requests. */
export function nextPracticeState(state: PracticeState, outcome: TurnOutcome, learnerSpoke: boolean): PracticeState {
  const learnerTurns = state.learnerTurns + (learnerSpoke ? 1 : 0);

  if (state.phase === "summary" || state.phase === "complete") {
    return { phase: "complete", learnerTurns, repeatAttempts: 0 };
  }
  if (state.phase === "opening" && !learnerSpoke) {
    return { phase: "practice", learnerTurns, repeatAttempts: 0 };
  }
  // A side question never moves the lesson; the teacher answers briefly and returns to the same step.
  if (outcome.messageType === "learner_question") {
    return { ...state, phase: state.phase === "opening" ? "practice" : state.phase, learnerTurns };
  }
  if (outcome.needsRepeat) {
    const repeatAttempts = state.phase === "repeat" ? state.repeatAttempts + 1 : 0;
    if (repeatAttempts >= MAX_REPEAT_ATTEMPTS) return { phase: "practice", learnerTurns, repeatAttempts: 0 };
    return { phase: "repeat", learnerTurns, repeatAttempts };
  }
  return { phase: "practice", learnerTurns, repeatAttempts: 0 };
}

export function shouldSuggestSummary(state: PracticeState, outcome: TurnOutcome): boolean {
  if (state.phase === "complete" || state.phase === "summary") return false;
  return outcome.scenarioComplete || state.learnerTurns >= SUGGEST_SUMMARY_AFTER_TURNS;
}
