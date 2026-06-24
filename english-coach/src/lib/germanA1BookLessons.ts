export interface GermanA1BookLesson {
  lessonNo: number;
  titleEn: string;
  titleDe: string;
  introduction: string;
  theRule: string[];
  formula: string[];
  grammarTable?: {
    headers: string[];
    rows: string[][];
  };
  vocabulary: Array<{
    de: string;
    en: string;
    example: string;
    exampleEn: string;
  }>;
  modelSentences: Array<{
    de: string;
    en: string;
    breakdown: string;
  }>;
  culturalNote: string;
  exercises: Array<{
    type: "fill_blank" | "reorder" | "translate" | "choose";
    instruction: string;
    items: Array<{
      prompt: string;
      answer: string;
      hint?: string;
    }>;
  }>;
  commonMistakes: Array<{
    wrong: string;
    right: string;
    explanation: string;
  }>;
  skyPracticePrompts: string[];
  examRelevance: string;
  lessonGoal: string;
}

export const germanA1BookLessons: GermanA1BookLesson[] = [];

export function getA1BookLessonByNo(lessonNo: number): GermanA1BookLesson | undefined {
  return germanA1BookLessons.find((lesson) => lesson.lessonNo === lessonNo);
}

export function findRelatedA1BookLessons(_query: string, limit = 8): GermanA1BookLesson[] {
  return germanA1BookLessons.slice(0, limit);
}
