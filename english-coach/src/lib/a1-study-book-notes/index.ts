import { batch01StudyBookPages } from "./batch01";
import { batch02StudyBookPages } from "./batch02";
import { batch03StudyBookPages } from "./batch03";
import { batch04StudyBookPages } from "./batch04";
import { batch05StudyBookPages } from "./batch05";
import { batch06StudyBookPages } from "./batch06";
import { batch07StudyBookPages } from "./batch07";
import { batch08StudyBookPages } from "./batch08";
import type { A1StudyBookPdfLessonQueryInput, A1StudyBookPdfPage, A1StudyBookPdfPageRef, A1StudyBookTopicIndexEntry } from "./types";

export const a1StudyBookPdfPages: A1StudyBookPdfPage[] = [...batch01StudyBookPages, ...batch02StudyBookPages, ...batch03StudyBookPages, ...batch04StudyBookPages, ...batch05StudyBookPages, ...batch06StudyBookPages, ...batch07StudyBookPages, ...batch08StudyBookPages];

export const a1StudyBookTopicIndex: A1StudyBookTopicIndexEntry[] = [
  { id: "source-method", title: "Source method and audit pages", stage: "source", lessonNos: [], pageRefs: [{ batchId: "batch01", pdfPageNumber: 1 }, { batchId: "batch01", pdfPageNumber: 2 }, { batchId: "batch02", pdfPageNumber: 1 }, { batchId: "batch02", pdfPageNumber: 2 }, { batchId: "batch03", pdfPageNumber: 1 }, { batchId: "batch07", pdfPageNumber: 1 }] },
  { id: "self-introduction", title: "Self introduction and personal questions", stage: "identity", lessonNos: [6, 8], pageRefs: [{ batchId: "batch01", pdfPageNumber: 3 }, { batchId: "batch01", pdfPageNumber: 4 }, { batchId: "batch01", pdfPageNumber: 10 }, { batchId: "batch01", pdfPageNumber: 11 }, { batchId: "batch01", pdfPageNumber: 14 }] },
  { id: "greetings-goodbyes", title: "Greetings and goodbyes", stage: "survival", lessonNos: [1], pageRefs: [{ batchId: "batch01", pdfPageNumber: 5 }] },
  { id: "common-politeness", title: "Common polite phrases", stage: "survival", lessonNos: [2], pageRefs: [{ batchId: "batch01", pdfPageNumber: 5 }] },
  { id: "alphabet-spelling", title: "Alphabet, spelling and special sounds", stage: "survival", lessonNos: [5], pageRefs: [{ batchId: "batch01", pdfPageNumber: 4 }] },
  { id: "numbers-1-21", title: "Numbers 1-21", stage: "survival", lessonNos: [3], pageRefs: [{ batchId: "batch01", pdfPageNumber: 5 }] },
  { id: "numbers-20-100", title: "Numbers 20-100 and classroom math signs", stage: "survival", lessonNos: [4], pageRefs: [{ batchId: "batch01", pdfPageNumber: 5 }, { batchId: "batch01", pdfPageNumber: 6 }, { batchId: "batch01", pdfPageNumber: 7 }] },
  { id: "numbers-above-100", title: "Numbers above 100", stage: "survival", lessonNos: [16], pageRefs: [{ batchId: "batch01", pdfPageNumber: 12 }] },
  { id: "hobbies", title: "Hobbies, likes and free-time vocabulary", stage: "identity", lessonNos: [7, 52], pageRefs: [{ batchId: "batch01", pdfPageNumber: 7 }, { batchId: "batch01", pdfPageNumber: 8 }, { batchId: "batch01", pdfPageNumber: 9 }, { batchId: "batch01", pdfPageNumber: 10 }, { batchId: "batch05", pdfPageNumber: 2 }] },
  { id: "frequency-adverbs", title: "Frequency adverbs with mögen and activity examples", stage: "daily-life", lessonNos: [52, 57], pageRefs: [{ batchId: "batch03", pdfPageNumber: 3 }] },
  { id: "dates-months-time", title: "Days, months, dates and time questions", stage: "survival", lessonNos: [22, 23, 33, 34, 57], pageRefs: [{ batchId: "batch01", pdfPageNumber: 13 }, { batchId: "batch01", pdfPageNumber: 14 }, { batchId: "batch04", pdfPageNumber: 6 }, { batchId: "batch06", pdfPageNumber: 10 }, { batchId: "batch08", pdfPageNumber: 5 }] },
  { id: "pronouns-sein-haben-family", title: "Pronouns, sein/haben and family", stage: "grammar", lessonNos: [11, 12, 25], pageRefs: [{ batchId: "batch01", pdfPageNumber: 15 }, { batchId: "batch01", pdfPageNumber: 16 }, { batchId: "batch01", pdfPageNumber: 17 }, { batchId: "batch01", pdfPageNumber: 18 }] },
  { id: "sentence-structure", title: "Sentence structure: verb in position 2 and time-word inversion", stage: "grammar", lessonNos: [9, 10], pageRefs: [{ batchId: "batch01", pdfPageNumber: 15 }, { batchId: "batch01", pdfPageNumber: 18 }, { batchId: "batch02", pdfPageNumber: 6 }, { batchId: "batch02", pdfPageNumber: 7 }] },
  { id: "verbs-basic", title: "Regular and irregular verbs", stage: "grammar", lessonNos: [13, 14, 15], pageRefs: [{ batchId: "batch01", pdfPageNumber: 18 }, { batchId: "batch01", pdfPageNumber: 19 }, { batchId: "batch02", pdfPageNumber: 6 }, { batchId: "batch02", pdfPageNumber: 7 }] },
  { id: "germany-city-professions", title: "Germany questions, city places and professions", stage: "identity", lessonNos: [17, 18], pageRefs: [{ batchId: "batch01", pdfPageNumber: 20 }, { batchId: "batch01", pdfPageNumber: 21 }, { batchId: "batch02", pdfPageNumber: 3 }, { batchId: "batch02", pdfPageNumber: 4 }] },
  { id: "articles-directions-food", title: "Articles, directions, food and opposites", stage: "grammar", lessonNos: [19, 20, 21], pageRefs: [{ batchId: "batch02", pdfPageNumber: 5 }, { batchId: "batch02", pdfPageNumber: 8 }, { batchId: "batch02", pdfPageNumber: 9 }, { batchId: "batch02", pdfPageNumber: 10 }, { batchId: "batch02", pdfPageNumber: 11 }, { batchId: "batch02", pdfPageNumber: 12 }, { batchId: "batch02", pdfPageNumber: 13 }] },
  { id: "house-furniture", title: "House, furniture and household vocabulary", stage: "daily-life", lessonNos: [64], pageRefs: [{ batchId: "batch02", pdfPageNumber: 15 }, { batchId: "batch03", pdfPageNumber: 1 }, { batchId: "batch05", pdfPageNumber: 3 }] },
  { id: "possessive-pronouns-nominative", title: "Possessive pronouns in nominative (mein/dein/sein/ihr)", stage: "cases", lessonNos: [24], pageRefs: [{ batchId: "batch01", pdfPageNumber: 15 }, { batchId: "batch01", pdfPageNumber: 16 }, { batchId: "batch03", pdfPageNumber: 8 }, { batchId: "batch03", pdfPageNumber: 9 }] },
  { id: "accusative-articles-direct-objects", title: "Accusative articles and direct objects", stage: "cases", lessonNos: [26], pageRefs: [{ batchId: "batch02", pdfPageNumber: 14 }, { batchId: "batch03", pdfPageNumber: 6 }] },
  { id: "accusative-possessives", title: "Possessive articles in accusative/object use", stage: "cases", lessonNos: [27], pageRefs: [{ batchId: "batch03", pdfPageNumber: 8 }, { batchId: "batch03", pdfPageNumber: 9 }] },
  { id: "modal-moechten", title: "Modal verb möchten and infinitive-at-end examples", stage: "grammar", lessonNos: [28], pageRefs: [{ batchId: "batch03", pdfPageNumber: 2 }, { batchId: "batch04", pdfPageNumber: 1 }] },
  { id: "w-questions-frequency-time", title: "W-questions, frequency and time questions", stage: "cases", lessonNos: [29], pageRefs: [{ batchId: "batch02", pdfPageNumber: 5 }, { batchId: "batch03", pdfPageNumber: 4 }, { batchId: "batch03", pdfPageNumber: 6 }] },
  { id: "restaurant-food-payment", title: "Restaurant, food, ordering and payment", stage: "daily-life", lessonNos: [30], pageRefs: [{ batchId: "batch02", pdfPageNumber: 8 }, { batchId: "batch02", pdfPageNumber: 9 }, { batchId: "batch02", pdfPageNumber: 10 }, { batchId: "batch03", pdfPageNumber: 5 }] },
  { id: "accusative-personal-pronouns", title: "Accusative personal pronouns and object verbs", stage: "cases", lessonNos: [31], pageRefs: [{ batchId: "batch03", pdfPageNumber: 7 }, { batchId: "batch03", pdfPageNumber: 11 }] },
  { id: "quantities-gifts-dative-pronouns", title: "Quantities, gifts and dative pronouns", stage: "cases", lessonNos: [36, 48], pageRefs: [{ batchId: "batch03", pdfPageNumber: 10 }] },
  { id: "dative-articles", title: "Dative articles and location endings", stage: "cases", lessonNos: [32], pageRefs: [{ batchId: "batch02", pdfPageNumber: 14 }, { batchId: "batch04", pdfPageNumber: 4 }, { batchId: "batch04", pdfPageNumber: 8 }, { batchId: "batch05", pdfPageNumber: 5 }] },
  { id: "possessive-dative", title: "Possessive articles in dative", stage: "cases", lessonNos: [35], pageRefs: [{ batchId: "batch04", pdfPageNumber: 4 }, { batchId: "batch05", pdfPageNumber: 5 }] },
  { id: "personal-pronouns-dative", title: "Personal pronouns in dative", stage: "cases", lessonNos: [36], pageRefs: [{ batchId: "batch03", pdfPageNumber: 10 }, { batchId: "batch04", pdfPageNumber: 9 }, { batchId: "batch05", pdfPageNumber: 6 }, { batchId: "batch07", pdfPageNumber: 4 }] },
  { id: "separable-verbs", title: "Separable verbs and examples", stage: "grammar", lessonNos: [37], pageRefs: [{ batchId: "batch04", pdfPageNumber: 2 }, { batchId: "batch04", pdfPageNumber: 3 }, { batchId: "batch04", pdfPageNumber: 5 }] },
  { id: "daily-routine-movement", title: "Daily routine and movement/location verbs", stage: "daily-life", lessonNos: [38], pageRefs: [{ batchId: "batch04", pdfPageNumber: 5 }, { batchId: "batch05", pdfPageNumber: 1 }, { batchId: "batch05", pdfPageNumber: 7 }, { batchId: "batch05", pdfPageNumber: 8 }] },
  { id: "directions-location", title: "Directions, location and movement", stage: "daily-life", lessonNos: [40], pageRefs: [{ batchId: "batch05", pdfPageNumber: 4 }, { batchId: "batch05", pdfPageNumber: 7 }, { batchId: "batch05", pdfPageNumber: 8 }, { batchId: "batch05", pdfPageNumber: 9 }] },
  { id: "appointments", title: "Appointments and time arrangements", stage: "daily-life", lessonNos: [50], pageRefs: [{ batchId: "batch04", pdfPageNumber: 2 }, { batchId: "batch04", pdfPageNumber: 11 }] },
  { id: "letter-invitation", title: "Invitation and informal letter writing", stage: "exam-life", lessonNos: [51], pageRefs: [{ batchId: "batch04", pdfPageNumber: 7 }, { batchId: "batch05", pdfPageNumber: 2 }, { batchId: "batch08", pdfPageNumber: 10 }] },
  { id: "registration-forms", title: "Registration vocabulary and form filling", stage: "exam-life", lessonNos: [61], pageRefs: [{ batchId: "batch04", pdfPageNumber: 11 }, { batchId: "batch08", pdfPageNumber: 6 }] },
  { id: "post-office", title: "Post office and service vocabulary", stage: "exam-life", lessonNos: [62], pageRefs: [{ batchId: "batch04", pdfPageNumber: 10 }, { batchId: "batch08", pdfPageNumber: 10 }] },
  { id: "bank", title: "Bank vocabulary and answers", stage: "exam-life", lessonNos: [63], pageRefs: [{ batchId: "batch04", pdfPageNumber: 12 }, { batchId: "batch04", pdfPageNumber: 13 }] },
  { id: "connectors", title: "Connectors: darum, deshalb, deswegen", stage: "daily-life", lessonNos: [52], pageRefs: [{ batchId: "batch06", pdfPageNumber: 1 }, { batchId: "batch06", pdfPageNumber: 2 }] },
  { id: "clothing-welcher-dieser", title: "Clothing with welcher/dieser questions", stage: "daily-life", lessonNos: [53, 54, 55], pageRefs: [{ batchId: "batch06", pdfPageNumber: 4 }, { batchId: "batch06", pdfPageNumber: 9 }, { batchId: "batch06", pdfPageNumber: 10 }] },
  { id: "time-place-movement-prepositions", title: "Time, place and movement prepositions", stage: "daily-life", lessonNos: [56, 57], pageRefs: [{ batchId: "batch06", pdfPageNumber: 3 }, { batchId: "batch08", pdfPageNumber: 5 }] },
  { id: "past-sein-haben", title: "war / hatte and past tense practice", stage: "grammar", lessonNos: [41], pageRefs: [{ batchId: "batch04", pdfPageNumber: 5 }, { batchId: "batch06", pdfPageNumber: 5 }] },
  { id: "non-separable-verbs", title: "Non-separable verbs and verb patterns", stage: "grammar", lessonNos: [42], pageRefs: [{ batchId: "batch06", pdfPageNumber: 8 }, { batchId: "batch07", pdfPageNumber: 2 }] },
  { id: "perfekt", title: "Perfekt sentence structure, helpers and participles", stage: "grammar", lessonNos: [44, 45, 46, 47], pageRefs: [{ batchId: "batch06", pdfPageNumber: 5 }, { batchId: "batch06", pdfPageNumber: 8 }, { batchId: "batch06", pdfPageNumber: 11 }, { batchId: "batch07", pdfPageNumber: 2 }, { batchId: "batch07", pdfPageNumber: 3 }, { batchId: "batch07", pdfPageNumber: 14 }, { batchId: "batch07", pdfPageNumber: 15 }, { batchId: "batch07", pdfPageNumber: 16 }] },
  { id: "telephone", title: "Telephone phrases and responses", stage: "daily-life", lessonNos: [58], pageRefs: [{ batchId: "batch06", pdfPageNumber: 6 }] },
  { id: "letter-reply", title: "Letter reply and apology writing", stage: "exam-life", lessonNos: [51, 60], pageRefs: [{ batchId: "batch06", pdfPageNumber: 7 }, { batchId: "batch08", pdfPageNumber: 7 }, { batchId: "batch08", pdfPageNumber: 9 }] },
  { id: "imperative", title: "Imperative, invitation email and prohibition signs", stage: "daily-life", lessonNos: [39], pageRefs: [{ batchId: "batch07", pdfPageNumber: 10 }, { batchId: "batch07", pdfPageNumber: 11 }, { batchId: "batch07", pdfPageNumber: 13 }] },
  { id: "health-body-symptoms", title: "Body parts, health expressions and symptoms", stage: "daily-life", lessonNos: [43, 59], pageRefs: [{ batchId: "batch07", pdfPageNumber: 5 }, { batchId: "batch07", pdfPageNumber: 6 }, { batchId: "batch07", pdfPageNumber: 7 }, { batchId: "batch07", pdfPageNumber: 8 }, { batchId: "batch07", pdfPageNumber: 9 }, { batchId: "batch07", pdfPageNumber: 12 }, { batchId: "batch08", pdfPageNumber: 3 }, { batchId: "batch08", pdfPageNumber: 4 }] },
  { id: "weather", title: "Weather sentences and compound nouns", stage: "daily-life", lessonNos: [49], pageRefs: [{ batchId: "batch07", pdfPageNumber: 16 }, { batchId: "batch07", pdfPageNumber: 17 }] },
  { id: "travel-hotel", title: "Travel and hotel vocabulary", stage: "exam-life", lessonNos: [56, 60], pageRefs: [{ batchId: "batch08", pdfPageNumber: 1 }, { batchId: "batch08", pdfPageNumber: 2 }, { batchId: "batch08", pdfPageNumber: 6 }, { batchId: "batch08", pdfPageNumber: 8 }] },
  { id: "housing-train-source", title: "Apartment, train and airport vocabulary", stage: "exam-life", lessonNos: [64, 65], pageRefs: [{ batchId: "batch07", pdfPageNumber: 14 }, { batchId: "batch08", pdfPageNumber: 2 }, { batchId: "batch08", pdfPageNumber: 10 }] },
];

function pageKey(ref: A1StudyBookPdfPageRef): string {
  return `${ref.batchId}:${ref.pdfPageNumber}`;
}

const pageByKey = new Map(a1StudyBookPdfPages.map((page) => [pageKey(page), page]));

export function getA1StudyBookPagesByRefs(refs: A1StudyBookPdfPageRef[]): A1StudyBookPdfPage[] {
  return refs.map((ref) => pageByKey.get(pageKey(ref))).filter((page): page is A1StudyBookPdfPage => Boolean(page));
}

export function findIndexedA1StudyBookPagesForLesson(lessonNo: number): A1StudyBookPdfPage[] {
  const refs = a1StudyBookTopicIndex
    .filter((topic) => topic.lessonNos.includes(lessonNo))
    .flatMap((topic) => topic.pageRefs);
  const uniqueRefs = Array.from(new Map(refs.map((ref) => [pageKey(ref), ref])).values());
  return getA1StudyBookPagesByRefs(uniqueRefs);
}

export function findIndexedA1StudyBookTopicsForLesson(lessonNo: number): A1StudyBookTopicIndexEntry[] {
  return a1StudyBookTopicIndex.filter((topic) => topic.lessonNos.includes(lessonNo));
}

export function getUnindexedA1StudyBookPages(): A1StudyBookPdfPage[] {
  const indexedKeys = new Set(a1StudyBookTopicIndex.flatMap((topic) => topic.pageRefs.map(pageKey)));
  return a1StudyBookPdfPages.filter((page) => !indexedKeys.has(pageKey(page)));
}

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "from", "this", "that", "your", "you", "are", "use", "used",
  "german", "english", "lesson", "a1", "page", "pages", "batch", "study", "notes", "source",
  "der", "die", "das", "ein", "eine", "einen", "einem", "ich", "du", "sie", "ist", "sind"
]);

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[.,;:!?()[\]{}"'`´’‘“”/\|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function queryTokens(query: string): string[] {
  return normalize(query)
    .split(" ")
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

export function buildA1StudyBookPdfQueryForLesson(input: A1StudyBookPdfLessonQueryInput): string {
  return [
    input.lessonNo,
    input.titleEn,
    input.titleDe,
    input.introduction,
    input.theRule.join(" "),
    input.formula.join(" "),
    input.vocabulary.map((item) => `${item.de} ${item.en} ${item.example ?? ""}`).join(" "),
    input.modelSentences.map((item) => `${item.de} ${item.en} ${item.breakdown ?? ""}`).join(" "),
    input.commonMistakes.map((item) => `${item.wrong} ${item.right} ${item.explanation}`).join(" ")
  ].join(" ");
}

export function findRelatedA1StudyBookPdfPages(query: string, limit = 6): A1StudyBookPdfPage[] {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return [];

  return a1StudyBookPdfPages
    .map((page) => {
      const haystack = normalize(`${page.sourcePageLabel} ${page.text}`);
      const score = tokens.reduce((sum, token) => {
        if (!haystack.includes(token)) return sum;
        const headingBoost = normalize(page.sourcePageLabel).includes(token) ? 4 : 0;
        return sum + 1 + headingBoost;
      }, 0);
      return { page, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.page.batchId.localeCompare(b.page.batchId) || a.page.pdfPageNumber - b.page.pdfPageNumber)
    .slice(0, limit)
    .map((item) => item.page);
}
