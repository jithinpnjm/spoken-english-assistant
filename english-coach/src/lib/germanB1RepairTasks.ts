import type { GermanLevel } from "./germanCurriculumRegistry";

export type GermanB1RepairFocus =
  | "reflexive_verb"
  | "noun_verb_combination"
  | "lassen"
  | "weak_noun"
  | "da_compound"
  | "wo_compound"
  | "purpose_clause"
  | "ohne_zu_ohne_dass"
  | "state_passive"
  | "konjunktiv_ii"
  | "semi_formal_email";

export interface GermanB1RepairTask {
  id: string;
  level: GermanLevel;
  focus: GermanB1RepairFocus;
  title: string;
  prompt: string;
  expectedAnswer: string;
  correctedModel: string;
  explanation: string;
  redemittel?: string[];
  examUse: string;
  dailyLifeUse: string;
}

export const germanB1RepairTasks: GermanB1RepairTask[] = [
  {
    id: "b1-repair-reflexive-freuen",
    level: "B1",
    focus: "reflexive_verb",
    title: "Reflexive verb: sich freuen",
    prompt: "Correct the sentence: Ich freue auf den Urlaub.",
    expectedAnswer: "Ich freue mich auf den Urlaub.",
    correctedModel: "Ich freue mich auf den Urlaub.",
    explanation: "sich freuen auf requires a reflexive pronoun. For ich, the pronoun is mich.",
    examUse: "Useful in B1 speaking and writing about plans, feelings, and experiences.",
    dailyLifeUse: "Used constantly for plans and positive expectations.",
  },
  {
    id: "b1-repair-noun-verb-decision",
    level: "B1",
    focus: "noun_verb_combination",
    title: "Noun-verb combination",
    prompt: "Improve the phrase: eine Entscheidung machen.",
    expectedAnswer: "eine Entscheidung treffen",
    correctedModel: "Wir müssen heute eine Entscheidung treffen.",
    explanation: "German uses the fixed expression eine Entscheidung treffen, not machen.",
    examUse: "Useful in B1 Lesen and Schreiben for formal and semi-formal language.",
    dailyLifeUse: "Useful at work, in planning, and in formal discussions.",
  },
  {
    id: "b1-repair-lassen-service",
    level: "B1",
    focus: "lassen",
    title: "lassen for having something done",
    prompt: "Say naturally: I am having my car repaired.",
    expectedAnswer: "Ich lasse mein Auto reparieren.",
    correctedModel: "Ich lasse mein Auto reparieren.",
    explanation: "lassen + infinitive is used when someone else does the service for you.",
    examUse: "Useful in B1 service, work, and daily-life topics.",
    dailyLifeUse: "Haircut, car repair, cleaning, document processing, and other services.",
  },
  {
    id: "b1-repair-weak-noun-customer",
    level: "B1",
    focus: "weak_noun",
    title: "Weak noun ending",
    prompt: "Correct the sentence: Ich sehe den Kunde.",
    expectedAnswer: "Ich sehe den Kunden.",
    correctedModel: "Ich sehe den Kunden.",
    explanation: "der Kunde is a weak noun. Outside nominative singular it takes -n: den Kunden.",
    examUse: "Small but precise B1 grammar point, especially around work and service topics.",
    dailyLifeUse: "Useful for workplace vocabulary such as Kunde, Kollege, Herr, Mensch.",
  },
  {
    id: "b1-repair-da-compound",
    level: "B1",
    focus: "da_compound",
    title: "da-compound for things/ideas",
    prompt: "Replace the repeated phrase: Ich habe ein Problem. Kannst du mir mit dem Problem helfen?",
    expectedAnswer: "Ich habe ein Problem. Kannst du mir damit helfen?",
    correctedModel: "Ich habe ein Problem. Kannst du mir damit helfen?",
    explanation: "damit replaces mit dem Problem when referring to a thing or idea.",
    examUse: "Makes B1 writing and speaking less repetitive.",
    dailyLifeUse: "Natural daily conversation and workplace problem-solving.",
  },
  {
    id: "b1-repair-wo-compound",
    level: "B1",
    focus: "wo_compound",
    title: "wo-compound question",
    prompt: "Make the question more standard: Mit was lernst du Deutsch?",
    expectedAnswer: "Womit lernst du Deutsch?",
    correctedModel: "Womit lernst du Deutsch?",
    explanation: "wo + mit becomes womit. It asks with what, when asking about a thing or method.",
    examUse: "Useful for B1 Sprechen Teil 3 follow-up questions.",
    dailyLifeUse: "Ask cleaner clarification questions in daily conversation.",
  },
  {
    id: "b1-repair-um-zu-damit",
    level: "B1",
    focus: "purpose_clause",
    title: "um...zu vs damit",
    prompt: "Choose the correct connector: Ich lerne Deutsch, ___ in Deutschland zu arbeiten.",
    expectedAnswer: "um",
    correctedModel: "Ich lerne Deutsch, um in Deutschland zu arbeiten.",
    explanation: "Use um...zu when the subject is the same in both actions: I learn; I work.",
    examUse: "One of the most important B1 purpose-clause contrasts.",
    dailyLifeUse: "Explain goals and reasons clearly.",
  },
  {
    id: "b1-repair-damit-different-subject",
    level: "B1",
    focus: "purpose_clause",
    title: "damit for different subject",
    prompt: "Correct the sentence: Ich erkläre es langsam, um du es verstehst.",
    expectedAnswer: "Ich erkläre es langsam, damit du es verstehst.",
    correctedModel: "Ich erkläre es langsam, damit du es verstehst.",
    explanation: "Use damit when the subjects are different: I explain; you understand.",
    examUse: "Important for B1 writing and speaking precision.",
    dailyLifeUse: "Useful for work, parenting, teaching, and explaining instructions.",
  },
  {
    id: "b1-repair-ohne-zu",
    level: "B1",
    focus: "ohne_zu_ohne_dass",
    title: "ohne...zu same subject",
    prompt: "Correct the sentence: Er ging, ohne dass sich zu verabschieden.",
    expectedAnswer: "Er ging, ohne sich zu verabschieden.",
    correctedModel: "Er ging, ohne sich zu verabschieden.",
    explanation: "Use ohne...zu when the subject is the same: he left; he did not say goodbye.",
    examUse: "Useful in B1 narration and complaints.",
    dailyLifeUse: "Describe what happened without an expected action.",
  },
  {
    id: "b1-repair-state-passive",
    level: "B1",
    focus: "state_passive",
    title: "Zustandspassiv: state, not action",
    prompt: "Choose the natural state sentence: Die Tür wird geschlossen. / Die Tür ist geschlossen.",
    expectedAnswer: "Die Tür ist geschlossen.",
    correctedModel: "Die Tür ist geschlossen.",
    explanation: "sein + Partizip II describes the result state. werden + Partizip II describes the action/process.",
    examUse: "Important for reading formal notices and distinguishing action vs state.",
    dailyLifeUse: "Understand signs: geschlossen, geöffnet, reserviert.",
  },
  {
    id: "b1-repair-konjunktiv-politeness",
    level: "B1",
    focus: "konjunktiv_ii",
    title: "Konjunktiv II polite request",
    prompt: "Make this more polite: Können Sie mir helfen?",
    expectedAnswer: "Könnten Sie mir helfen?",
    correctedModel: "Könnten Sie mir bitte helfen?",
    explanation: "Könnten is Konjunktiv II and sounds more polite than können.",
    redemittel: ["Könnten Sie bitte ...?", "Ich würde gern ...", "Das wäre sehr nett."],
    examUse: "Useful in B1 speaking, planning, and formal writing.",
    dailyLifeUse: "Useful at offices, doctors, work, shops, and services.",
  },
  {
    id: "b1-repair-semi-formal-email",
    level: "B1",
    focus: "semi_formal_email",
    title: "Semi-formal email structure",
    prompt: "Write one safe opening for a semi-formal apology email.",
    expectedAnswer: "Es tut mir leid, dass ich nicht kommen kann.",
    correctedModel: "Es tut mir leid, dass ich nicht kommen kann.",
    explanation: "This is a safe B1 structure for apologising and introducing the reason in Schreiben Teil 3.",
    redemittel: ["Es tut mir leid, dass ...", "Leider kann ich nicht ...", "Ich hoffe auf Ihr Verständnis."],
    examUse: "Directly useful for B1 Schreiben Teil 3.",
    dailyLifeUse: "Emails to landlords, doctors, offices, school/Kita, and colleagues.",
  }
];

export function getB1RepairTasksByFocus(focus: GermanB1RepairFocus): GermanB1RepairTask[] {
  return germanB1RepairTasks.filter((task) => task.focus === focus);
}
