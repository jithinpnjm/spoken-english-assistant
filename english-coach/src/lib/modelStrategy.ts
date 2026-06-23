export type CoachProviderName = "gemini" | "openai" | "anthropic" | "local";

export interface ProviderCandidate {
  name: CoachProviderName;
  model: string;
  enabled: boolean;
  purpose: "chat" | "live" | "evaluation" | "fine_tuning_candidate";
  notes: string;
}

export interface FineTuningExample {
  id: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  activityType: string;
  lessonStep: string;
  teachingPhase: string;
  learnerInput: string;
  idealTeacherResponse: {
    coachReply: string;
    correctedSentence: string;
    naturalVersion: string;
    mistakeTypes: string[];
    ruleExplanation: string;
    nextInstruction: string;
  };
  acceptedByHumanTeacher: boolean;
  source: "golden_eval" | "real_session" | "manual_authoring";
}

export const providerCandidates: ProviderCandidate[] = [
  {
    name: "gemini",
    model: "gemini-3.1-flash-lite",
    enabled: true,
    purpose: "chat",
    notes: "Current default. Fast and cheap enough for frequent lessons. Must pass teacher evals before production use."
  },
  {
    name: "gemini",
    model: "gemini-3.1-flash-live-preview",
    enabled: true,
    purpose: "live",
    notes: "Current live voice candidate. Must be driven by lesson state, not generic prompt-only behaviour."
  },
  {
    name: "openai",
    model: "future-openai-teacher-model",
    enabled: false,
    purpose: "evaluation",
    notes: "Add later behind a provider adapter for A/B testing teacher quality."
  },
  {
    name: "anthropic",
    model: "future-claude-teacher-model",
    enabled: false,
    purpose: "evaluation",
    notes: "Add later behind a provider adapter for lesson/correction quality comparison."
  },
  {
    name: "local",
    model: "future-local-instruct-model",
    enabled: false,
    purpose: "fine_tuning_candidate",
    notes: "Only consider after enough accepted correction examples are collected."
  }
];

export function shouldConsiderFineTuning(args: { evalPassRate: number; acceptedExamples: number; modelStillGeneric: boolean }) {
  return args.evalPassRate < 0.9 && args.acceptedExamples >= 300 && args.modelStillGeneric;
}

export function fineTuningReadinessChecklist() {
  return [
    "At least 300 accepted teacher examples across levels and activities",
    "Clear output schema stable for at least two app versions",
    "Teacher eval suite with pass/fail scoring",
    "Human-reviewed corrections for common learner mistakes",
    "Provider comparison showing base models still fail the same teacher behaviours",
    "Privacy review before exporting real learner data"
  ];
}
