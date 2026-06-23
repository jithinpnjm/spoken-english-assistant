export interface TeacherEvalCase {
  id: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  activityType: "warmup" | "grammar" | "scenario" | "workplace" | "fluency" | "review";
  mode: "gentle_conversation" | "balanced" | "strict_correction" | "roleplay" | "workplace";
  learnerInput: string;
  mustContainAny: string[];
  mustNotContainAny: string[];
  expectedMistakeTypes: string[];
  expectedTeacherAction: string;
}

export const teacherEvalCases: TeacherEvalCase[] = [
  {
    id: "beginner-past-simple-001",
    level: "Beginner",
    activityType: "grammar",
    mode: "balanced",
    learnerInput: "Yesterday I go to office and I eat lunch there.",
    mustContainAny: ["went", "ate", "the office", "past"],
    mustNotContainAny: ["That's interesting", "tell me more about your office"],
    expectedMistakeTypes: ["tense", "articles"],
    expectedTeacherAction: "Correct past simple and ask the learner to repeat or create another past simple sentence."
  },
  {
    id: "intermediate-present-perfect-001",
    level: "Intermediate",
    activityType: "grammar",
    mode: "balanced",
    learnerInput: "I have visited Switzerland last year.",
    mustContainAny: ["visited Switzerland last year", "past simple", "last year"],
    mustNotContainAny: ["Where in Switzerland", "nice trip"],
    expectedMistakeTypes: ["tense"],
    expectedTeacherAction: "Explain present perfect vs past simple using the finished-time expression."
  },
  {
    id: "advanced-conditionals-001",
    level: "Advanced",
    activityType: "grammar",
    mode: "workplace",
    learnerInput: "If the release has a problem, we rollback immediately.",
    mustContainAny: ["If the release has a problem", "we will roll back", "professional"],
    mustNotContainAny: ["cool", "nice", "what happened next"],
    expectedMistakeTypes: ["sentence_structure", "vocabulary"],
    expectedTeacherAction: "Upgrade the conditional to precise professional workplace English."
  },
  {
    id: "workplace-standup-001",
    level: "Intermediate",
    activityType: "workplace",
    mode: "workplace",
    learnerInput: "Yesterday I was fixing one issue and today I will do release, no blockers only some confusion with logs.",
    mustContainAny: ["Yesterday, I worked on", "Today, I will", "blocker", "professional"],
    mustNotContainAny: ["what is your favorite", "tell me about your weekend"],
    expectedMistakeTypes: ["sentence_structure", "vocabulary"],
    expectedTeacherAction: "Rewrite the standup update in concise professional English."
  },
  {
    id: "scenario-restaurant-001",
    level: "Beginner",
    activityType: "scenario",
    mode: "roleplay",
    learnerInput: "I want one water and one rice please.",
    mustContainAny: ["I would like", "a glass of water", "please"],
    mustNotContainAny: ["let's talk about grammar", "office"],
    expectedMistakeTypes: ["articles", "naturalness"],
    expectedTeacherAction: "Correct ordering language and continue the restaurant roleplay."
  }
];
