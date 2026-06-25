export interface A1StudyBookPdfPage {
  batchId: string;
  sourcePageRange: string;
  sourcePdfFileName: string;
  sourcePdfSha256: string;
  pdfPageNumber: number;
  sourcePageLabel: string;
  text: string;
}

export interface A1StudyBookPdfLessonQueryInput {
  lessonNo: number;
  titleEn: string;
  titleDe: string;
  introduction: string;
  theRule: string[];
  formula: string[];
  vocabulary: Array<{ de: string; en: string; example?: string }>;
  modelSentences: Array<{ de: string; en: string; breakdown?: string }>;
  commonMistakes: Array<{ wrong: string; right: string; explanation: string }>;
}

export interface A1StudyBookPdfPageRef {
  batchId: string;
  pdfPageNumber: number;
}

export interface A1StudyBookTopicIndexEntry {
  id: string;
  title: string;
  stage: "source" | "survival" | "identity" | "grammar" | "cases" | "daily-life" | "exam-life";
  lessonNos: number[];
  pageRefs: A1StudyBookPdfPageRef[];
}
