import { ActivityType } from "./curriculum";
import { ProficiencyLevel } from "../types";

export interface ChallengeDayPlan {
  day: number;
  level: ProficiencyLevel;
  activityType: ActivityType;
  title: string;
  objective: string;
  targetGrammar?: string;
  targetVocabulary: string[];
  speakingTask: string;
  successCriteria: string[];
  homework: string;
}

const beginnerDays: ChallengeDayPlan[] = [
  {
    day: 1,
    level: "Beginner",
    activityType: "warmup",
    title: "Introduce yourself clearly",
    objective: "Speak 5 simple sentences about name, family, job, and city.",
    targetGrammar: "be verb: I am, my name is, I live in",
    targetVocabulary: ["name", "live", "work", "family", "city"],
    speakingTask: "Introduce yourself in 30 seconds.",
    successCriteria: ["Uses I am correctly", "Says at least 5 sentences", "Repeats corrected version once"],
    homework: "Record a 30-second self-introduction."
  },
  {
    day: 2,
    level: "Beginner",
    activityType: "grammar",
    title: "Yesterday actions",
    objective: "Use past simple for finished actions.",
    targetGrammar: "past simple regular and common irregular verbs",
    targetVocabulary: ["went", "ate", "worked", "watched", "visited"],
    speakingTask: "Say 5 things you did yesterday.",
    successCriteria: ["Uses at least 3 past verbs", "Corrects one tense mistake", "Repeats final sentence"],
    homework: "Write 5 sentences starting with Yesterday I."
  },
  {
    day: 3,
    level: "Beginner",
    activityType: "scenario",
    title: "Order food politely",
    objective: "Use polite ordering phrases in a restaurant.",
    targetGrammar: "I would like + noun",
    targetVocabulary: ["menu", "water", "rice", "bill", "please"],
    speakingTask: "Roleplay ordering food and asking for the bill.",
    successCriteria: ["Uses I would like", "Uses please", "Completes 4 roleplay turns"],
    homework: "Practise: I would like a glass of water, please."
  }
];

const intermediateDays: ChallengeDayPlan[] = [
  {
    day: 1,
    level: "Intermediate",
    activityType: "grammar",
    title: "Present perfect vs past simple",
    objective: "Separate life experience from finished-time events.",
    targetGrammar: "I have done vs I did yesterday/last year",
    targetVocabulary: ["ever", "never", "already", "last year", "recently"],
    speakingTask: "Answer 3 experience questions and 3 finished-time follow-ups.",
    successCriteria: ["Uses have/has for experience", "Uses past simple with finished time", "Corrects one mixed-tense sentence"],
    homework: "Make 5 pairs: I have... / I did it..."
  },
  {
    day: 2,
    level: "Intermediate",
    activityType: "workplace",
    title: "Daily standup update",
    objective: "Give concise professional updates.",
    targetGrammar: "past progress, today plan, blockers",
    targetVocabulary: ["worked on", "planning to", "blocked by", "investigating", "follow up"],
    speakingTask: "Give a standup update with yesterday, today, and blockers.",
    successCriteria: ["Uses 3-part standup structure", "Sounds professional", "Receives and repeats upgraded version"],
    homework: "Prepare tomorrow's standup in 3 sentences."
  },
  {
    day: 3,
    level: "Intermediate",
    activityType: "fluency",
    title: "Speak for one minute",
    objective: "Reduce hesitation and improve connected speech.",
    targetVocabulary: ["first", "then", "after that", "finally", "because"],
    speakingTask: "Speak for 60 seconds about your workday.",
    successCriteria: ["Keeps speaking", "Uses linking words", "Improves one repeated sentence"],
    homework: "Repeat the same answer once more with fewer pauses."
  }
];

const advancedDays: ChallengeDayPlan[] = [
  {
    day: 1,
    level: "Advanced",
    activityType: "workplace",
    title: "Explain a technical incident clearly",
    objective: "Explain problem, impact, mitigation, and next steps in professional English.",
    targetGrammar: "cause-effect and conditional phrasing",
    targetVocabulary: ["impact", "mitigation", "root cause", "rollback", "follow-up"],
    speakingTask: "Explain an incident update to a manager.",
    successCriteria: ["Uses structured incident format", "Avoids vague wording", "Sounds concise and senior"],
    homework: "Prepare a 45-second incident summary."
  },
  {
    day: 2,
    level: "Advanced",
    activityType: "grammar",
    title: "Professional conditionals",
    objective: "Use if, unless, in case, and when naturally in work discussions.",
    targetGrammar: "conditionals for risk and planning",
    targetVocabulary: ["unless", "in case", "provided that", "assuming", "fallback"],
    speakingTask: "Describe deployment risks using 3 conditional structures.",
    successCriteria: ["Uses two conditional structures", "Improves register", "Repeats polished version"],
    homework: "Write 3 risk sentences using if/unless/in case."
  },
  {
    day: 3,
    level: "Advanced",
    activityType: "review",
    title: "Precision and concision review",
    objective: "Replace long or vague sentences with concise professional phrasing.",
    targetVocabulary: ["concise", "specific", "actionable", "priority", "trade-off"],
    speakingTask: "Explain a complex topic in 30 seconds, then refine it.",
    successCriteria: ["Reduces filler", "Improves precision", "Uses stronger verbs"],
    homework: "Rewrite one long work sentence into a concise version."
  }
];

function cycle<T>(items: T[], index: number) {
  return items[index % items.length];
}

export function getChallengeDayPlan(day: number, level: ProficiencyLevel): ChallengeDayPlan {
  const safeDay = Math.max(1, Math.min(60, day || 1));
  if (level === "Beginner") return { ...cycle(beginnerDays, safeDay - 1), day: safeDay };
  if (level === "Advanced") return { ...cycle(advancedDays, safeDay - 1), day: safeDay };
  return { ...cycle(intermediateDays, safeDay - 1), day: safeDay };
}

export function getWeeklyTheme(day: number) {
  const week = Math.ceil(Math.max(1, day) / 7);
  const themes = [
    "Foundation speaking habits",
    "Daily life grammar and confidence",
    "Real-world scenarios",
    "Workplace speaking",
    "Fluency and storytelling",
    "Mistake correction and precision",
    "Exam-style speaking discipline",
    "Final consolidation"
  ];
  return themes[Math.min(themes.length - 1, week - 1)];
}
