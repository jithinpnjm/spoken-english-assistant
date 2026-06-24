import type { GermanA1BookLesson } from "../germanA1BookLessonTypes";
import { germanA1BookLessonsPart01 } from "./part01_lessons_01_03";
import { germanA1BookLessonsPart02 } from "./part02_lessons_04_10";
import { germanA1BookLessonsPart03 } from "./part03_lessons_11_15";
import { germanA1BookLessonsPart04 } from "./part04_lessons_16_20";
import { germanA1BookLessonsPart05 } from "./part05_lessons_21_25";
import { germanA1BookLessonsPart06 } from "./part06_lessons_26_30";
import { germanA1BookLessonsPart07 } from "./part07_lessons_31_35";
import { germanA1BookLessonsPart08 } from "./part08_lessons_36_40";
import { germanA1BookLessonsPart09 } from "./part09_lessons_41_45";
import { germanA1BookLessonsPart10 } from "./part10_lessons_46_50";
import { germanA1BookLessonsPart11 } from "./part11_lessons_51_55";
import { germanA1BookLessonsPart12 } from "./part12_lessons_56_65";

export const germanA1BookLessons: GermanA1BookLesson[] = [
  ...germanA1BookLessonsPart01,
  ...germanA1BookLessonsPart02,
  ...germanA1BookLessonsPart03,
  ...germanA1BookLessonsPart04,
  ...germanA1BookLessonsPart05,
  ...germanA1BookLessonsPart06,
  ...germanA1BookLessonsPart07,
  ...germanA1BookLessonsPart08,
  ...germanA1BookLessonsPart09,
  ...germanA1BookLessonsPart10,
  ...germanA1BookLessonsPart11,
  ...germanA1BookLessonsPart12,
].sort((a, b) => a.lessonNo - b.lessonNo);

export function getA1BookLessonByNo(lessonNo: number): GermanA1BookLesson | undefined {
  return germanA1BookLessons.find((lesson) => lesson.lessonNo === lessonNo);
}

export function findRelatedA1BookLessons(query: string, limit = 8): GermanA1BookLesson[] {
  const terms = query.toLowerCase().split(/[^a-zA-ZäöüÄÖÜß0-9]+/).filter((term) => term.length > 2);
  const scored = germanA1BookLessons.map((lesson) => {
    const haystack = [lesson.titleEn, lesson.titleDe, lesson.introduction, lesson.lessonGoal, lesson.examRelevance, lesson.theRule.join(" "), lesson.formula.join(" "), lesson.vocabulary.map((item) => `${item.de} ${item.en}`).join(" ")].join(" ").toLowerCase();
    const score = terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
    return { lesson, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.lesson.lessonNo - b.lesson.lessonNo);
  return (scored.length ? scored.map((item) => item.lesson) : germanA1BookLessons).slice(0, limit);
}
