import type { GermanLevel, GermanSubtopic } from "./germanCurriculumRegistry";
import { getGermanLevel } from "./germanCurriculumRegistry";

export type GermanPathGroup = "foundation" | "grammar" | "survival" | "exam" | "vocabulary";
export type GermanPathSource = "learn-german-original" | "goethe" | "custom-survival";

export interface GermanOrderedPathItem {
  subtopicId: string;
  level: GermanLevel;
  sequence: number;
  pathGroup: GermanPathGroup;
  sourceInspiredBy: GermanPathSource;
  recommendedBefore?: string[];
  recommendedAfter?: string[];
}

export interface GermanOrderedPathEntry extends GermanOrderedPathItem {
  subtopic: GermanSubtopic;
}

export const germanOrderedPath: GermanOrderedPathItem[] = [
  { subtopicId: "a0-greetings", level: "A0", sequence: 1, pathGroup: "foundation", sourceInspiredBy: "learn-german-original" },
  { subtopicId: "a0-repair-phrases", level: "A0", sequence: 2, pathGroup: "survival", sourceInspiredBy: "custom-survival" },
  { subtopicId: "a0-numbers-time", level: "A0", sequence: 3, pathGroup: "foundation", sourceInspiredBy: "learn-german-original" },
  { subtopicId: "a1-sprechen-self-intro", level: "A1", sequence: 4, pathGroup: "foundation", sourceInspiredBy: "learn-german-original" },
  { subtopicId: "a1-grammar-word-order", level: "A1", sequence: 5, pathGroup: "grammar", sourceInspiredBy: "learn-german-original" },
  { subtopicId: "a1-hoeren-time-numbers", level: "A1", sequence: 6, pathGroup: "exam", sourceInspiredBy: "goethe" },
  { subtopicId: "a1-lesen-signs-messages", level: "A1", sequence: 7, pathGroup: "exam", sourceInspiredBy: "goethe" },
  { subtopicId: "a1-schreiben-form", level: "A1", sequence: 8, pathGroup: "exam", sourceInspiredBy: "goethe" },
  { subtopicId: "a1-grammar-accusative", level: "A1", sequence: 9, pathGroup: "grammar", sourceInspiredBy: "learn-german-original" },
  { subtopicId: "a1-schreiben-termin", level: "A1", sequence: 10, pathGroup: "survival", sourceInspiredBy: "custom-survival" },
  { subtopicId: "a1-schreiben-einladung", level: "A1", sequence: 11, pathGroup: "exam", sourceInspiredBy: "goethe" },
  { subtopicId: "a2-hoeren-appointments", level: "A2", sequence: 12, pathGroup: "survival", sourceInspiredBy: "goethe" },
  { subtopicId: "a2-grammar-perfekt", level: "A2", sequence: 13, pathGroup: "grammar", sourceInspiredBy: "learn-german-original" },
  { subtopicId: "a2-schreiben-problem-email", level: "A2", sequence: 14, pathGroup: "exam", sourceInspiredBy: "goethe" },
  { subtopicId: "b1-lesen-opinions", level: "B1", sequence: 15, pathGroup: "exam", sourceInspiredBy: "goethe" },
  { subtopicId: "b1-grammar-connectors", level: "B1", sequence: 16, pathGroup: "grammar", sourceInspiredBy: "learn-german-original" },
  { subtopicId: "b1-schreiben-opinion-email", level: "B1", sequence: 17, pathGroup: "exam", sourceInspiredBy: "goethe" },
  { subtopicId: "b1-sprechen-planen", level: "B1", sequence: 18, pathGroup: "exam", sourceInspiredBy: "goethe" },
];

export function getOrderedPath(level?: GermanLevel): GermanOrderedPathEntry[] {
  const items = level ? germanOrderedPath.filter((item) => item.level === level) : germanOrderedPath;
  return items
    .map((item) => {
      const plan = getGermanLevel(item.level);
      const subtopic = plan.sections.flatMap((section) => section.subtopics).find((entry) => entry.id === item.subtopicId);
      return subtopic ? { ...item, subtopic } : null;
    })
    .filter((item): item is GermanOrderedPathEntry => Boolean(item))
    .sort((a, b) => a.sequence - b.sequence);
}

export function getNextOrderedPathItem(completedSubtopicIds: string[], level?: GermanLevel): GermanOrderedPathEntry | null {
  return getOrderedPath(level).find((item) => !completedSubtopicIds.includes(item.subtopicId)) || null;
}

export function getOrderedPathGroupLabel(group: GermanPathGroup): string {
  if (group === "foundation") return "Foundation";
  if (group === "grammar") return "Grammar";
  if (group === "survival") return "Living in Germany";
  if (group === "exam") return "Goethe exam";
  return "Vocabulary";
}
