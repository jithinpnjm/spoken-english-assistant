import type { GermanLevel, GermanSkill } from "./germanCurriculumRegistry";

export interface GermanVocabularyItem {
  id: string;
  german: string;
  article?: "der" | "die" | "das";
  plural?: string;
  english: string;
  level: GermanLevel;
  topic: string;
  examSections: GermanSkill[];
  example: string;
  casePattern?: string;
  prepositionPattern?: string;
  mistakeCount: number;
  dueForReview: boolean;
  survivalPriority: "low" | "medium" | "high";
}

export const germanVocabularyBank: GermanVocabularyItem[] = [
  {
    id: "termin",
    german: "Termin",
    article: "der",
    plural: "Termine",
    english: "appointment",
    level: "A1",
    topic: "appointments",
    examSections: ["hoeren", "schreiben", "sprechen"],
    example: "Ich habe morgen einen Termin.",
    casePattern: "haben + accusative: einen Termin",
    mistakeCount: 0,
    dueForReview: true,
    survivalPriority: "high",
  },
  {
    id: "hausaufgabe",
    german: "Hausaufgabe",
    article: "die",
    plural: "Hausaufgaben",
    english: "homework",
    level: "A1",
    topic: "class and learning",
    examSections: ["schreiben", "sprechen"],
    example: "Was ist die Hausaufgabe?",
    mistakeCount: 0,
    dueForReview: true,
    survivalPriority: "medium",
  },
  {
    id: "krank",
    german: "krank",
    english: "sick",
    level: "A1",
    topic: "health",
    examSections: ["schreiben", "sprechen"],
    example: "Ich bin krank.",
    mistakeCount: 0,
    dueForReview: true,
    survivalPriority: "high",
  },
  {
    id: "apotheke",
    german: "Apotheke",
    article: "die",
    plural: "Apotheken",
    english: "pharmacy",
    level: "A1",
    topic: "health",
    examSections: ["lesen", "sprechen"],
    example: "Wo ist die Apotheke?",
    mistakeCount: 0,
    dueForReview: true,
    survivalPriority: "high",
  },
  {
    id: "bahnhof",
    german: "Bahnhof",
    article: "der",
    plural: "Bahnhöfe",
    english: "train station",
    level: "A1",
    topic: "transport",
    examSections: ["hoeren", "lesen", "sprechen"],
    example: "Ich bin am Bahnhof.",
    prepositionPattern: "am Bahnhof",
    mistakeCount: 0,
    dueForReview: true,
    survivalPriority: "high",
  },
  {
    id: "rechnung",
    german: "Rechnung",
    article: "die",
    plural: "Rechnungen",
    english: "bill / invoice",
    level: "A2",
    topic: "services and payments",
    examSections: ["lesen", "schreiben", "sprechen"],
    example: "Ich habe eine Frage zur Rechnung.",
    casePattern: "haben + accusative: eine Rechnung",
    mistakeCount: 0,
    dueForReview: true,
    survivalPriority: "high",
  },
  {
    id: "verspaetung",
    german: "Verspätung",
    article: "die",
    plural: "Verspätungen",
    english: "delay",
    level: "A2",
    topic: "transport",
    examSections: ["hoeren", "schreiben", "sprechen"],
    example: "Mein Zug hat Verspätung.",
    mistakeCount: 0,
    dueForReview: true,
    survivalPriority: "high",
  },
  {
    id: "meiner-meinung-nach",
    german: "meiner Meinung nach",
    english: "in my opinion",
    level: "B1",
    topic: "opinions and arguments",
    examSections: ["schreiben", "sprechen"],
    example: "Meiner Meinung nach ist Deutsch sehr wichtig.",
    mistakeCount: 0,
    dueForReview: true,
    survivalPriority: "medium",
  },
  {
    id: "trotzdem",
    german: "trotzdem",
    english: "nevertheless / despite that",
    level: "B1",
    topic: "connectors",
    examSections: ["lesen", "schreiben", "sprechen"],
    example: "Ich bin krank, trotzdem lerne ich Deutsch.",
    mistakeCount: 0,
    dueForReview: true,
    survivalPriority: "medium",
  },
];

export function getVocabularyByLevel(level: GermanLevel): GermanVocabularyItem[] {
  return germanVocabularyBank.filter((item) => item.level === level);
}

export function getDueVocabulary(): GermanVocabularyItem[] {
  return germanVocabularyBank.filter((item) => item.dueForReview);
}

export function getVocabularyByTopic(topic: string): GermanVocabularyItem[] {
  return germanVocabularyBank.filter((item) => item.topic.toLowerCase().includes(topic.toLowerCase()));
}

export function getHighSurvivalVocabulary(): GermanVocabularyItem[] {
  return germanVocabularyBank.filter((item) => item.survivalPriority === "high");
}
