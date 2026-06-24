import type { GermanLevel } from "./germanCurriculumRegistry";

export type GermanA2RepairFocus =
  | "dass_clause"
  | "weil_denn"
  | "adjective_ending"
  | "wenn_clause"
  | "comparative"
  | "obwohl_trotzdem"
  | "indirect_question"
  | "two_way_preposition"
  | "polite_request"
  | "picture_description";

export interface GermanA2RepairTask {
  id: string;
  level: GermanLevel;
  focus: GermanA2RepairFocus;
  title: string;
  prompt: string;
  expectedAnswer: string;
  correctedModel: string;
  explanation: string;
  dailyLifeUse: string;
  goetheUse: string;
}

export const germanA2RepairTasks: GermanA2RepairTask[] = [
  {
    id: "a2-repair-dass-verb-end",
    level: "A2",
    focus: "dass_clause",
    title: "dass clause verb-final repair",
    prompt: "Rewrite correctly: Ich denke, dass Deutsch ist wichtig.",
    expectedAnswer: "Ich denke, dass Deutsch wichtig ist.",
    correctedModel: "Ich denke, dass Deutsch wichtig ist.",
    explanation: "In a dass-clause, the conjugated verb goes to the end: ... dass Deutsch wichtig ist.",
    dailyLifeUse: "Express opinions clearly in work, school, and daily conversations.",
    goetheUse: "Useful in A2 Schreiben and Sprechen when giving opinions or beliefs.",
  },
  {
    id: "a2-repair-weil-denn-word-order",
    level: "A2",
    focus: "weil_denn",
    title: "weil vs denn word order",
    prompt: "Choose a correct version: Ich komme später, weil mein Zug Verspätung hat. / Ich komme später, denn mein Zug hat Verspätung.",
    expectedAnswer: "Both are correct.",
    correctedModel: "Ich komme später, weil mein Zug Verspätung hat. / Ich komme später, denn mein Zug hat Verspätung.",
    explanation: "weil is subordinate and sends the verb to the end. denn is coordinating and keeps verb-second order.",
    dailyLifeUse: "Explain delays, sickness, and appointment problems.",
    goetheUse: "A2 writing and speaking often require a simple reason.",
  },
  {
    id: "a2-repair-adjective-ending-nom",
    level: "A2",
    focus: "adjective_ending",
    title: "nominative adjective ending",
    prompt: "Fill the blank: Das ist ein ___ Mann. (nett)",
    expectedAnswer: "netter",
    correctedModel: "Das ist ein netter Mann.",
    explanation: "After ein with a masculine nominative noun, the adjective carries the -er ending: ein netter Mann.",
    dailyLifeUse: "Describe people more naturally than A1 level.",
    goetheUse: "A2 Lesen and Schreiben expect stronger description control.",
  },
  {
    id: "a2-repair-wenn-fronted",
    level: "A2",
    focus: "wenn_clause",
    title: "fronted wenn-clause repair",
    prompt: "Rewrite correctly: Wenn ich Zeit habe, ich komme mit.",
    expectedAnswer: "Wenn ich Zeit habe, komme ich mit.",
    correctedModel: "Wenn ich Zeit habe, komme ich mit.",
    explanation: "When the wenn-clause comes first, the main clause starts with the verb: komme ich.",
    dailyLifeUse: "Planning appointments, meetings, family activities, and travel.",
    goetheUse: "Useful for A2 Sprechen Teil 3 joint planning.",
  },
  {
    id: "a2-repair-comparative",
    level: "A2",
    focus: "comparative",
    title: "irregular comparative",
    prompt: "Correct the sentence: Dieser Kurs ist guter als der andere Kurs.",
    expectedAnswer: "Dieser Kurs ist besser als der andere Kurs.",
    correctedModel: "Dieser Kurs ist besser als der andere Kurs.",
    explanation: "The comparative of gut is irregular: gut -> besser -> am besten.",
    dailyLifeUse: "Compare courses, apartments, products, jobs, and travel options.",
    goetheUse: "A2 speaking/writing uses comparisons for opinions and choices.",
  },
  {
    id: "a2-repair-obwohl-trotzdem",
    level: "A2",
    focus: "obwohl_trotzdem",
    title: "obwohl vs trotzdem",
    prompt: "Correct the word order: Ich gehe joggen, obwohl es regnet. Es regnet, trotzdem ich gehe joggen.",
    expectedAnswer: "Ich gehe joggen, obwohl es regnet. Es regnet, trotzdem gehe ich joggen.",
    correctedModel: "Ich gehe joggen, obwohl es regnet. Es regnet, trotzdem gehe ich joggen.",
    explanation: "obwohl sends the verb to the end. trotzdem is an adverb and triggers inversion: trotzdem gehe ich.",
    dailyLifeUse: "Express contrast in realistic daily opinions.",
    goetheUse: "A2 writing/speaking rewards connected contrastive sentences.",
  },
  {
    id: "a2-repair-indirect-question",
    level: "A2",
    focus: "indirect_question",
    title: "indirect question word order",
    prompt: "Rewrite politely: Wann ist der Termin? -> Können Sie mir sagen, ...",
    expectedAnswer: "Können Sie mir sagen, wann der Termin ist?",
    correctedModel: "Können Sie mir sagen, wann der Termin ist?",
    explanation: "In an indirect question, the verb goes to the end: wann der Termin ist.",
    dailyLifeUse: "Useful at doctors, Bürgeramt, school, Kita, landlords, and service desks.",
    goetheUse: "Useful for A2 formal/semi-formal email and speaking tasks.",
  },
  {
    id: "a2-repair-two-way-preposition",
    level: "A2",
    focus: "two_way_preposition",
    title: "two-way preposition: location vs movement",
    prompt: "Choose: Ich bin in ___ Küche. / Ich gehe in ___ Küche. (die Küche)",
    expectedAnswer: "der / die",
    correctedModel: "Ich bin in der Küche. Ich gehe in die Küche.",
    explanation: "Location uses dative: in der Küche. Movement/direction uses accusative: in die Küche.",
    dailyLifeUse: "Apartment, directions, furniture, and daily home communication.",
    goetheUse: "A2 Lesen, Schreiben, and Sprechen often include places and movement.",
  },
  {
    id: "a2-repair-polite-request",
    level: "A2",
    focus: "polite_request",
    title: "polite request with könnten",
    prompt: "Make this polite: Geben Sie mir bitte einen neuen Termin.",
    expectedAnswer: "Könnten Sie mir bitte einen neuen Termin geben?",
    correctedModel: "Könnten Sie mir bitte einen neuen Termin geben?",
    explanation: "Könnten Sie ...? sounds more polite than a direct imperative, especially in offices and formal emails.",
    dailyLifeUse: "Doctors, Bürgeramt, landlords, school/Kita, services, and workplace requests.",
    goetheUse: "Useful for A2 Schreiben Teil 2 and Sprechen interactions.",
  },
  {
    id: "a2-repair-picture-description",
    level: "A2",
    focus: "picture_description",
    title: "picture description sentence starter",
    prompt: "Write one A2 picture-description sentence using: Auf dem Bild sieht man ...",
    expectedAnswer: "Auf dem Bild sieht man eine Familie.",
    correctedModel: "Auf dem Bild sieht man eine Familie.",
    explanation: "Use Auf dem Bild sieht man ... to start a simple picture description. Then add who, where, and what they are doing.",
    dailyLifeUse: "Describe photos, situations, apartments, and work scenes.",
    goetheUse: "Useful for A2 speaking development and monologue-style tasks.",
  }
];

export function getA2RepairTasksByFocus(focus: GermanA2RepairFocus): GermanA2RepairTask[] {
  return germanA2RepairTasks.filter((task) => task.focus === focus);
}
