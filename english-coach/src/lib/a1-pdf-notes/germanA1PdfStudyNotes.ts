import type { GermanA1PdfStudyNotePage } from "./types";
import { germanA1PdfStudyNotesBatch01 } from "./batch01";
import { germanA1PdfStudyNotesBatch02 } from "./batch02";
import { germanA1PdfStudyNotesBatch03 } from "./batch03";
import { germanA1PdfStudyNotesBatch04 } from "./batch04";
import { germanA1PdfStudyNotesBatch05 } from "./batch05";
import { germanA1PdfStudyNotesBatch06 } from "./batch06";
import { germanA1PdfStudyNotesBatch07 } from "./batch07";
import { germanA1PdfStudyNotesBatch08 } from "./batch08";

export const germanA1PdfStudyNotes: GermanA1PdfStudyNotePage[] = [
  ...germanA1PdfStudyNotesBatch01,
  ...germanA1PdfStudyNotesBatch02,
  ...germanA1PdfStudyNotesBatch03,
  ...germanA1PdfStudyNotesBatch04,
  ...germanA1PdfStudyNotesBatch05,
  ...germanA1PdfStudyNotesBatch06,
  ...germanA1PdfStudyNotesBatch07,
  ...germanA1PdfStudyNotesBatch08
];

function normalizeToken(value: string): string {
  return value
    .toLowerCase()
    .replace(/[.,;:!?()[\]{}"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "from", "this", "that", "your", "you", "are", "use", "used",
  "german", "english", "lesson", "a1", "page", "pages", "batch", "study", "notes",
  "der", "die", "das", "ein", "eine", "ich", "du", "sie", "ist", "sind"
]);

function queryTokens(query: string): string[] {
  return normalizeToken(query)
    .split(" ")
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

export function findRelatedPdfStudyNotes(query: string, limit = 4): GermanA1PdfStudyNotePage[] {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return [];

  return germanA1PdfStudyNotes
    .map((note) => {
      const noteText = normalizeToken(`${note.heading} ${note.text}`);
      const score = tokens.reduce((sum, token) => {
        if (noteText.includes(token)) return sum + (note.heading.toLowerCase().includes(token) ? 4 : 1);
        return sum;
      }, 0);
      return { note, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.note.batch.localeCompare(b.note.batch) || a.note.page - b.note.page)
    .slice(0, limit)
    .map((item) => item.note);
}

export function buildPdfStudyNoteQueryForLesson(input: {
  titleEn: string;
  titleDe: string;
  theRule: string[];
  formula: string[];
  vocabulary: Array<{ de: string; en: string }>;
  modelSentences: Array<{ de: string; en: string }>;
}): string {
  return [
    input.titleEn,
    input.titleDe,
    input.theRule.join(" "),
    input.formula.join(" "),
    input.vocabulary.map((item) => `${item.de} ${item.en}`).join(" "),
    input.modelSentences.map((item) => `${item.de} ${item.en}`).join(" ")
  ].join(" ");
}
