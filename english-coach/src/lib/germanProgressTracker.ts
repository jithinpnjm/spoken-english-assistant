import type { GermanLevel, GermanSkill } from "./germanCurriculumRegistry";

export type GermanMistakeType =
  | "article"
  | "case"
  | "verb"
  | "word_order"
  | "connector"
  | "preposition"
  | "vocabulary"
  | "spelling"
  | "capitalization"
  | "pronunciation"
  | "task_completion";

export interface GermanMistakeEvent {
  id: string;
  createdAt: string;
  level: GermanLevel;
  skill: GermanSkill;
  subtopicId: string;
  mistakeType: GermanMistakeType;
  originalAnswer: string;
  correctedAnswer: string;
  explanation: string;
}

export interface GermanSkillProgress {
  level: GermanLevel;
  skill: GermanSkill;
  completedSubtopics: number;
  totalSubtopics: number;
  averageScore: number;
  minutesSpent: number;
}

export interface GermanProgressSummary {
  currentGoal: "A1" | "A2" | "B1";
  skillProgress: GermanSkillProgress[];
  recentMistakes: GermanMistakeEvent[];
  priorityRepairs: GermanMistakeType[];
  recommendedNext: string;
}

export const seedGermanProgress: GermanProgressSummary = {
  currentGoal: "A1",
  skillProgress: [
    { level: "A0", skill: "survival", completedSubtopics: 2, totalSubtopics: 3, averageScore: 78, minutesSpent: 45 },
    { level: "A1", skill: "schreiben", completedSubtopics: 1, totalSubtopics: 3, averageScore: 62, minutesSpent: 35 },
    { level: "A1", skill: "sprechen", completedSubtopics: 1, totalSubtopics: 1, averageScore: 70, minutesSpent: 30 },
    { level: "A1", skill: "grammatik", completedSubtopics: 1, totalSubtopics: 2, averageScore: 58, minutesSpent: 40 },
  ],
  recentMistakes: [
    {
      id: "m-termin-accusative",
      createdAt: new Date().toISOString(),
      level: "A1",
      skill: "schreiben",
      subtopicId: "a1-schreiben-termin",
      mistakeType: "case",
      originalAnswer: "Ich habe ein Termin.",
      correctedAnswer: "Ich habe einen Termin.",
      explanation: "Termin is masculine and after haben it needs accusative: einen Termin.",
    },
  ],
  priorityRepairs: ["case", "article", "word_order"],
  recommendedNext: "Repair A1 accusative with haben + masculine nouns, then practice appointment writing again.",
};

export function calculateCompletionPercent(item: GermanSkillProgress): number {
  if (!item.totalSubtopics) return 0;
  return Math.round((item.completedSubtopics / item.totalSubtopics) * 100);
}

export function mistakeTypeLabel(type: GermanMistakeType): string {
  return type.replace(/_/g, " ");
}

export function getWeakestSkill(summary: GermanProgressSummary): GermanSkillProgress | null {
  if (summary.skillProgress.length === 0) return null;
  return [...summary.skillProgress].sort((a, b) => a.averageScore - b.averageScore)[0];
}
