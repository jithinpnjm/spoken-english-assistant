import { ActivityType } from "./curriculum";
import { ProficiencyLevel } from "../types";

export interface ActivityCatalogItem {
  id: string;
  type: ActivityType;
  level: ProficiencyLevel;
  title: string;
  module: string;
  teacherPurpose: string;
  learnerPromise: string;
  starterInstruction: string;
  exampleLearnerAnswer: string;
  correctionFocus: string[];
}

export const activityCatalog: ActivityCatalogItem[] = [
  {
    id: "b-warmup-introduce-family",
    type: "warmup",
    level: "Beginner",
    title: "Talk about family",
    module: "Daily life foundation",
    teacherPurpose: "Make the learner produce simple complete sentences with be, have, and live.",
    learnerPromise: "You will speak about your family using simple correct sentences.",
    starterInstruction: "Tell me three simple sentences about your family.",
    exampleLearnerAnswer: "I have a wife. We live in Berlin. My baby is small.",
    correctionFocus: ["be verb", "have/has", "simple sentence order"]
  },
  {
    id: "b-scenario-shopping",
    type: "scenario",
    level: "Beginner",
    title: "Buy something in a shop",
    module: "Real-life scenarios",
    teacherPurpose: "Teach polite buying phrases and basic question forms.",
    learnerPromise: "You will practise asking for price, size, and payment.",
    starterInstruction: "You are in a shop. Ask me for the price of a jacket.",
    exampleLearnerAnswer: "How much is this jacket?",
    correctionFocus: ["question order", "polite requests", "articles"]
  },
  {
    id: "i-work-standup",
    type: "workplace",
    level: "Intermediate",
    title: "Daily standup update",
    module: "Workplace English",
    teacherPurpose: "Turn loose work explanation into concise professional update format.",
    learnerPromise: "You will sound clearer in daily standups.",
    starterInstruction: "Give your update: yesterday, today, blockers.",
    exampleLearnerAnswer: "Yesterday I fixed the logging issue. Today I will test the deployment. I have one blocker with permissions.",
    correctionFocus: ["tense consistency", "professional vocabulary", "concise phrasing"]
  },
  {
    id: "i-grammar-articles",
    type: "grammar",
    level: "Intermediate",
    title: "Articles: a, an, the",
    module: "Grammar precision",
    teacherPurpose: "Target one of the most common Indian-English article gaps in spoken English.",
    learnerPromise: "You will learn when to say a, an, the, or no article.",
    starterInstruction: "Describe your office desk using a, an, and the.",
    exampleLearnerAnswer: "There is a laptop on the desk. The laptop is silver.",
    correctionFocus: ["articles", "specific vs general nouns", "countable nouns"]
  },
  {
    id: "i-fluency-story",
    type: "fluency",
    level: "Intermediate",
    title: "Tell a short story",
    module: "Fluency and storytelling",
    teacherPurpose: "Help the learner connect events using sequence markers and past tense.",
    learnerPromise: "You will speak for one minute with better flow.",
    starterInstruction: "Tell me about a recent trip or weekend in one minute.",
    exampleLearnerAnswer: "First we took the train. Then we visited the old town. After that we had dinner.",
    correctionFocus: ["linking words", "past tense", "hesitation reduction"]
  },
  {
    id: "a-work-incident",
    type: "workplace",
    level: "Advanced",
    title: "Explain an incident like a senior engineer",
    module: "Advanced workplace communication",
    teacherPurpose: "Train concise incident explanation with impact, mitigation, and next steps.",
    learnerPromise: "You will sound more senior and structured in technical discussions.",
    starterInstruction: "Explain a recent production or deployment issue using impact, cause, mitigation, and next step.",
    exampleLearnerAnswer: "The deployment caused elevated latency. We rolled back within ten minutes and are investigating the config change.",
    correctionFocus: ["register", "precision", "cause-effect", "executive summary"]
  },
  {
    id: "a-grammar-conditionals",
    type: "grammar",
    level: "Advanced",
    title: "Conditionals for risk and planning",
    module: "Advanced grammar for work",
    teacherPurpose: "Make conditionals precise and natural in professional contexts.",
    learnerPromise: "You will use if, unless, in case, and provided that more naturally.",
    starterInstruction: "Describe a deployment risk using if and unless.",
    exampleLearnerAnswer: "If the smoke tests fail, we will roll back. Unless the error rate increases, we can continue monitoring.",
    correctionFocus: ["conditionals", "modal verbs", "professional register"]
  }
];

export function getCatalogFor(level: ProficiencyLevel, type?: ActivityType) {
  return activityCatalog.filter((item) => item.level === level && (!type || item.type === type));
}

export function pickCatalogItem(level: ProficiencyLevel, type: ActivityType, day: number) {
  const items = getCatalogFor(level, type);
  if (!items.length) return activityCatalog.find((item) => item.level === level) || activityCatalog[0];
  return items[Math.max(0, day - 1) % items.length];
}
