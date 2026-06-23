import type { GermanLevel, GermanSubtopic } from "./germanCurriculumRegistry";

export type GermanPracticeTaskType = "fill_blank" | "sentence_build" | "short_answer" | "rewrite";

export interface GermanPracticeTask {
  id: string;
  level: GermanLevel;
  subtopicId: string;
  type: GermanPracticeTaskType;
  prompt: string;
  helper: string;
  expectedAnswers: string[];
  correctedModel: string;
  explanation: string;
  mistakeFocus: string[];
}

export interface GermanPracticeReview {
  result: "correct" | "almost" | "needs_correction";
  correctedGerman: string;
  explanation: string;
  mistakeFocus: string[];
  rewriteRequired: boolean;
}

function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.!?]/g, "")
    .replace(/\s+/g, " ");
}

const fallbackTasks: GermanPracticeTask[] = [
  {
    id: "a1-termin-accusative-1",
    level: "A1",
    subtopicId: "a1-schreiben-termin",
    type: "fill_blank",
    prompt: "Fill the blank: Ich habe ___ Termin um 10 Uhr.",
    helper: "Termin is masculine: der Termin. After haben, use accusative.",
    expectedAnswers: ["einen"],
    correctedModel: "Ich habe einen Termin um 10 Uhr.",
    explanation: "After haben, masculine der/ein changes to den/einen in accusative. So it is einen Termin.",
    mistakeFocus: ["article", "accusative"],
  },
  {
    id: "a1-word-order-1",
    level: "A1",
    subtopicId: "a1-grammar-word-order",
    type: "sentence_build",
    prompt: "Build the German sentence: I cannot come today.",
    helper: "Use: ich + kann + heute + nicht + kommen.",
    expectedAnswers: ["ich kann heute nicht kommen"],
    correctedModel: "Ich kann heute nicht kommen.",
    explanation: "The modal verb kann is in position 2. The main verb kommen goes to the end.",
    mistakeFocus: ["word order", "modal verb"],
  },
  {
    id: "a0-repeat-slowly-1",
    level: "A0",
    subtopicId: "a0-repair-phrases",
    type: "short_answer",
    prompt: "How do you politely ask: Can you please repeat that?",
    helper: "Use Können Sie ... bitte ...?",
    expectedAnswers: ["können sie das bitte wiederholen", "koennen sie das bitte wiederholen"],
    correctedModel: "Können Sie das bitte wiederholen?",
    explanation: "This is a polite Sie-form question. It is a survival phrase for offices, doctors, transport, and shops.",
    mistakeFocus: ["polite phrase", "question form"],
  },
  {
    id: "a2-perfekt-1",
    level: "A2",
    subtopicId: "a2-grammar-perfekt",
    type: "fill_blank",
    prompt: "Fill the blank: Gestern ___ ich Deutsch gelernt.",
    helper: "Use the auxiliary for lernen in Perfekt.",
    expectedAnswers: ["habe"],
    correctedModel: "Gestern habe ich Deutsch gelernt.",
    explanation: "Most regular verbs use haben in Perfekt. Lernen becomes gelernt.",
    mistakeFocus: ["Perfekt", "auxiliary"],
  },
  {
    id: "b1-connectors-1",
    level: "B1",
    subtopicId: "b1-grammar-connectors",
    type: "rewrite",
    prompt: "Rewrite with deshalb: Ich bin krank. Ich kann heute nicht kommen.",
    helper: "Use deshalb and remember verb position after connector.",
    expectedAnswers: ["ich bin krank deshalb kann ich heute nicht kommen"],
    correctedModel: "Ich bin krank, deshalb kann ich heute nicht kommen.",
    explanation: "After deshalb, the conjugated verb comes directly after the connector: deshalb kann ich ...",
    mistakeFocus: ["connector", "word order"],
  },
];

export function buildGermanPracticeTasks(level: GermanLevel, subtopic: GermanSubtopic): GermanPracticeTask[] {
  const direct = fallbackTasks.filter((task) => task.level === level && task.subtopicId === subtopic.id);
  if (direct.length > 0) return direct;

  return [
    {
      id: `${subtopic.id}-starter-task`,
      level,
      subtopicId: subtopic.id,
      type: "short_answer",
      prompt: `Write one simple German sentence for: ${subtopic.title}`,
      helper: `Focus on: ${subtopic.grammarFocus.slice(0, 2).join(" and ") || "clear German sentence"}.`,
      expectedAnswers: [],
      correctedModel: "This topic needs a model answer in the next content PR.",
      explanation: "This is a free starter task. The next engine version will add stronger model answers for this subtopic.",
      mistakeFocus: subtopic.grammarFocus.slice(0, 2),
    },
  ];
}

export function reviewGermanAnswer(task: GermanPracticeTask, answer: string): GermanPracticeReview {
  const normalized = normalizeAnswer(answer);
  const expected = task.expectedAnswers.map(normalizeAnswer);

  if (expected.length > 0 && expected.includes(normalized)) {
    return {
      result: "correct",
      correctedGerman: task.correctedModel,
      explanation: "Correct. Now say or rewrite the full model sentence once to make it automatic.",
      mistakeFocus: [],
      rewriteRequired: false,
    };
  }

  const almost = expected.length > 0 && expected.some((item) => normalized.includes(item) || item.includes(normalized));

  return {
    result: almost ? "almost" : "needs_correction",
    correctedGerman: task.correctedModel,
    explanation: task.explanation,
    mistakeFocus: task.mistakeFocus,
    rewriteRequired: true,
  };
}

export function reviewLabel(result: GermanPracticeReview["result"]): string {
  if (result === "correct") return "Correct";
  if (result === "almost") return "Almost correct";
  return "Needs correction";
}
