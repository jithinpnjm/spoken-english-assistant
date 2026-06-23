export type ActivityType = "warmup" | "grammar" | "scenario" | "workplace" | "fluency" | "review";
export type TeachingPhase = "intro" | "model" | "controlled_practice" | "correction" | "repeat" | "free_practice" | "summary";

export interface LessonStep {
  id: string;
  phase: TeachingPhase;
  teacherGoal: string;
  learnerTask: string;
  minTurnsToAdvance: number;
}

export interface ActivityDefinition {
  type: ActivityType;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  objective: string;
  targetSkill: string;
  minLearnerTurns: number;
  openingPrompt: string;
  steps: LessonStep[];
  completionRubric: string[];
}

const beginnerGrammar: ActivityDefinition = {
  type: "grammar",
  title: "Past simple for daily life",
  level: "Beginner",
  objective: "Teach finished actions using past simple forms like went, ate, worked, watched.",
  targetSkill: "Use past simple in complete spoken sentences.",
  minLearnerTurns: 6,
  openingPrompt: "Today we will practise past simple. I will show you one wrong sentence and one correct sentence, then you will make your own sentence.",
  steps: [
    { id: "explain", phase: "model", teacherGoal: "Explain the rule with one wrong/right pair.", learnerTask: "Notice the correct past form.", minTurnsToAdvance: 0 },
    { id: "drill_1", phase: "controlled_practice", teacherGoal: "Ask for one sentence about yesterday.", learnerTask: "Say one sentence using past simple.", minTurnsToAdvance: 1 },
    { id: "correct_1", phase: "correction", teacherGoal: "Correct verb tense, article, and word order mistakes.", learnerTask: "Read or repeat the corrected sentence.", minTurnsToAdvance: 1 },
    { id: "drill_2", phase: "controlled_practice", teacherGoal: "Ask a second past simple question about food, work, or travel.", learnerTask: "Answer in past simple.", minTurnsToAdvance: 1 },
    { id: "repeat", phase: "repeat", teacherGoal: "Give one natural final version and ask learner to repeat.", learnerTask: "Repeat the improved sentence.", minTurnsToAdvance: 1 },
    { id: "summary", phase: "summary", teacherGoal: "Summarize the rule and homework.", learnerTask: "Confirm homework.", minTurnsToAdvance: 0 }
  ],
  completionRubric: ["At least four learner attempts", "At least one corrected sentence repeated", "Past simple used correctly once"]
};

const intermediateGrammar: ActivityDefinition = {
  type: "grammar",
  title: "Present perfect vs past simple",
  level: "Intermediate",
  objective: "Teach when to use I have done versus I did.",
  targetSkill: "Choose between life experience and finished-time statements.",
  minLearnerTurns: 6,
  openingPrompt: "Today we will practise present perfect versus past simple. Use present perfect for life experience and past simple for a finished time.",
  steps: [
    { id: "contrast", phase: "model", teacherGoal: "Give a clear contrast: I have visited Switzerland vs I visited Switzerland last year.", learnerTask: "Understand the time difference.", minTurnsToAdvance: 0 },
    { id: "experience", phase: "controlled_practice", teacherGoal: "Ask one have you ever question.", learnerTask: "Answer with I have or I have never.", minTurnsToAdvance: 1 },
    { id: "finished_time", phase: "controlled_practice", teacherGoal: "Ask when it happened.", learnerTask: "Answer with past simple and a time expression.", minTurnsToAdvance: 1 },
    { id: "correction", phase: "correction", teacherGoal: "Correct tense choice and explain why.", learnerTask: "Repeat the corrected pair.", minTurnsToAdvance: 1 },
    { id: "free", phase: "free_practice", teacherGoal: "Ask learner to tell a short story using both forms.", learnerTask: "Speak 2-3 sentences using both tenses.", minTurnsToAdvance: 1 },
    { id: "summary", phase: "summary", teacherGoal: "Give short rule and homework.", learnerTask: "Confirm homework.", minTurnsToAdvance: 0 }
  ],
  completionRubric: ["Both tense forms attempted", "Finished-time sentence correct", "Experience sentence correct"]
};

const advancedGrammar: ActivityDefinition = {
  type: "grammar",
  title: "Natural conditionals for professional speech",
  level: "Advanced",
  objective: "Make conditional sentences sound precise and professional.",
  targetSkill: "Use if/when/unless structures in workplace explanations.",
  minLearnerTurns: 6,
  openingPrompt: "Today we will practise natural conditionals for workplace English: if, when, unless, and in case.",
  steps: [
    { id: "model", phase: "model", teacherGoal: "Model precise conditional sentences for work.", learnerTask: "Notice the structure and tone.", minTurnsToAdvance: 0 },
    { id: "controlled", phase: "controlled_practice", teacherGoal: "Ask learner to describe a work risk using if.", learnerTask: "Create one conditional sentence.", minTurnsToAdvance: 1 },
    { id: "upgrade", phase: "correction", teacherGoal: "Upgrade grammar, register, and clarity.", learnerTask: "Repeat the professional version.", minTurnsToAdvance: 1 },
    { id: "alternatives", phase: "controlled_practice", teacherGoal: "Ask learner to restate using unless or in case.", learnerTask: "Create an alternative version.", minTurnsToAdvance: 1 },
    { id: "free", phase: "free_practice", teacherGoal: "Ask for a short workplace explanation using two conditionals.", learnerTask: "Speak naturally with conditionals.", minTurnsToAdvance: 1 },
    { id: "summary", phase: "summary", teacherGoal: "Summarize natural phrasing choices.", learnerTask: "Confirm homework.", minTurnsToAdvance: 0 }
  ],
  completionRubric: ["Two conditional structures attempted", "Professional rewrite repeated", "Register improved"]
};

export function getActivityDefinition(activityType: ActivityType, level: "Beginner" | "Intermediate" | "Advanced"): ActivityDefinition {
  if (activityType === "grammar") {
    if (level === "Beginner") return beginnerGrammar;
    if (level === "Advanced") return advancedGrammar;
    return intermediateGrammar;
  }
  const common: ActivityDefinition = {
    type: activityType,
    title: activityType === "workplace" ? "Workplace speaking lab" : activityType === "scenario" ? "Real-life roleplay" : activityType === "fluency" ? "60-second fluency challenge" : activityType === "review" ? "Mistake memory review" : "Daily warm-up",
    level,
    objective: "Run a structured spoken-English activity with correction, repetition, and measurable feedback.",
    targetSkill: activityType,
    minLearnerTurns: activityType === "fluency" ? 4 : 5,
    openingPrompt: `Start the ${activityType} activity for a ${level} learner. Do not chat generally. Follow the lesson steps and keep the learner practising.`,
    steps: [
      { id: "intro", phase: "intro", teacherGoal: "Explain the activity in one sentence.", learnerTask: "Get ready to answer.", minTurnsToAdvance: 0 },
      { id: "attempt_1", phase: "controlled_practice", teacherGoal: "Ask the first targeted speaking question.", learnerTask: "Answer in a complete sentence.", minTurnsToAdvance: 1 },
      { id: "correct_1", phase: "correction", teacherGoal: "Correct the most useful mistakes and give a better version.", learnerTask: "Repeat or rewrite the correction.", minTurnsToAdvance: 1 },
      { id: "attempt_2", phase: "free_practice", teacherGoal: "Ask a realistic follow-up question.", learnerTask: "Answer more naturally.", minTurnsToAdvance: 1 },
      { id: "repeat", phase: "repeat", teacherGoal: "Give one phrase to repeat aloud.", learnerTask: "Repeat the phrase.", minTurnsToAdvance: 1 },
      { id: "summary", phase: "summary", teacherGoal: "Summarize progress and homework.", learnerTask: "Finish the activity.", minTurnsToAdvance: 0 }
    ],
    completionRubric: ["Minimum learner turns reached", "At least one correction repeated", "One measurable homework item assigned"]
  };
  return common;
}

export function buildLessonStatePrompt(args: { definition: ActivityDefinition; stepIndex: number; learnerTurns: number; mistakeMemoryText: string; mode: string; }) {
  const step = args.definition.steps[Math.min(args.stepIndex, args.definition.steps.length - 1)];
  return `ACTIVITY ENGINE STATE
Activity: ${args.definition.title}
Level path: ${args.definition.level}
Objective: ${args.definition.objective}
Target skill: ${args.definition.targetSkill}
Current step ${args.stepIndex + 1}/${args.definition.steps.length}: ${step.id} (${step.phase})
Teacher goal now: ${step.teacherGoal}
Learner task now: ${step.learnerTask}
Learner turns so far: ${args.learnerTurns}
Minimum turns to complete activity: ${args.definition.minLearnerTurns}
Mode: ${args.mode}
Recurring mistake memory:
${args.mistakeMemoryText || "No mistake memory yet."}

Completion rubric:
${args.definition.completionRubric.map((r, i) => `${i + 1}. ${r}`).join("\n")}

You must behave like a teacher following this lesson state. Do not switch topics unless the current step asks for it. Do not complete the activity until the minimum learner turns and rubric are satisfied.`;
}
