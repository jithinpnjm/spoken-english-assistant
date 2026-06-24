import type { GermanLevel } from "./germanCurriculumRegistry";

export interface GermanListeningTask {
  id: string;
  level: GermanLevel;
  title: string;
  hiddenTranscript: string;
  question: string;
  expectedAnswer: string;
  explanation: string;
  vocabulary: string[];
}

export interface GermanListeningReview {
  correct: boolean;
  transcript: string;
  correctedAnswer: string;
  explanation: string;
  vocabulary: string[];
  repeatSentence: string;
}

export const germanListeningTasks: GermanListeningTask[] = [
  {
    id: "a1-appointment-time",
    level: "A1",
    title: "A1 appointment time",
    hiddenTranscript: "Guten Tag. Ihr Termin ist morgen um zehn Uhr.",
    question: "When is the appointment?",
    expectedAnswer: "morgen um zehn uhr",
    explanation: "Listen for morgen and um zehn Uhr. These are the key time details.",
    vocabulary: ["morgen", "der Termin", "um zehn Uhr"],
  },
  {
    id: "a1-shop-closed",
    level: "A1",
    title: "A1 public notice",
    hiddenTranscript: "Heute ist die Apotheke geschlossen.",
    question: "What is closed today?",
    expectedAnswer: "apotheke",
    explanation: "The keyword is Apotheke. geschlossen means closed.",
    vocabulary: ["die Apotheke", "heute", "geschlossen"],
  },
  {
    id: "a2-delay-message",
    level: "A2",
    title: "A2 delay message",
    hiddenTranscript: "Mein Zug hat Verspätung. Ich komme zwanzig Minuten später.",
    question: "How late is the person?",
    expectedAnswer: "zwanzig minuten",
    explanation: "The delay detail is zwanzig Minuten später.",
    vocabulary: ["die Verspätung", "später", "zwanzig Minuten"],
  },
  {
    id: "b1-opinion-short",
    level: "B1",
    title: "B1 opinion detail",
    hiddenTranscript: "Meiner Meinung nach ist Deutsch im Alltag wichtig, weil man Termine und Briefe besser versteht.",
    question: "Why is German important according to the speaker?",
    expectedAnswer: "termine briefe besser versteht",
    explanation: "The reason comes after weil: appointments and letters become easier to understand.",
    vocabulary: ["meiner Meinung nach", "im Alltag", "weil", "besser verstehen"],
  },
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/[.,!?;:]/g, " ").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, " ").trim();
}

export function getListeningTasks(level: GermanLevel): GermanListeningTask[] {
  return germanListeningTasks.filter((task) => task.level === level);
}

export function reviewListeningAnswer(task: GermanListeningTask, answer: string): GermanListeningReview {
  const normalizedAnswer = normalize(answer);
  const expectedTokens = normalize(task.expectedAnswer).split(" ").filter(Boolean);
  const hits = expectedTokens.filter((token) => normalizedAnswer.includes(token)).length;
  const correct = expectedTokens.length ? hits / expectedTokens.length >= 0.5 : false;

  return {
    correct,
    transcript: task.hiddenTranscript,
    correctedAnswer: task.expectedAnswer,
    explanation: task.explanation,
    vocabulary: task.vocabulary,
    repeatSentence: task.hiddenTranscript,
  };
}
