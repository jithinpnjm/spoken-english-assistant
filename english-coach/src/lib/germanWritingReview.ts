export type GermanWritingLevel = "A1" | "A2" | "B1";

export interface GermanWritingPrompt {
  id: string;
  level: GermanWritingLevel;
  title: string;
  instructions: string[];
  helper: string;
  minWords?: number;
  maxWords?: number;
  modelAnswer: string;
}

export interface GermanWritingReview {
  score: number;
  passed: boolean;
  correctedVersion: string;
  naturalVersion: string;
  feedback: string[];
  missingPoints: string[];
  mistakeFocus: string[];
  rewriteInstruction: string;
}

export const germanWritingPrompts: GermanWritingPrompt[] = [
  {
    id: "a1-sick-message",
    level: "A1",
    title: "A1 short message: sick today",
    instructions: [
      "Write to your German teacher.",
      "Say you are sick.",
      "Say you cannot come today.",
      "Ask for the homework.",
    ],
    helper: "Use: Ich bin krank. Ich kann heute nicht kommen. Was ist die Hausaufgabe?",
    maxWords: 40,
    modelAnswer: "Hallo, ich bin krank. Ich kann heute nicht kommen. Was ist die Hausaufgabe? Viele Grüße, Jithin",
  },
  {
    id: "a1-appointment-cancel",
    level: "A1",
    title: "A1 short message: cancel appointment",
    instructions: [
      "Write a short message.",
      "Say you have an appointment today.",
      "Say you cannot come.",
      "Ask for a new appointment.",
    ],
    helper: "Use: einen Termin, heute, nicht kommen, neuen Termin.",
    maxWords: 45,
    modelAnswer: "Hallo, ich habe heute einen Termin. Leider kann ich nicht kommen. Können wir einen neuen Termin machen? Viele Grüße, Jithin",
  },
  {
    id: "a2-late-sms",
    level: "A2",
    title: "A2 SMS: you are late",
    instructions: [
      "Write an SMS to a friend.",
      "Say you are late.",
      "Explain why.",
      "Suggest a new time or place.",
    ],
    helper: "Use weil and a clear next step.",
    minWords: 20,
    maxWords: 45,
    modelAnswer: "Hallo, ich komme leider später, weil mein Zug Verspätung hat. Können wir uns um 18 Uhr am Bahnhof treffen? Bis gleich!",
  },
  {
    id: "b1-opinion-email",
    level: "B1",
    title: "B1 opinion email: German in daily life",
    instructions: [
      "Write a short email or post.",
      "Give your opinion about learning German in Germany.",
      "Give at least two reasons.",
      "Use connectors such as weil, deshalb, außerdem, trotzdem.",
    ],
    helper: "Use a clear structure: opinion, reasons, example, conclusion.",
    minWords: 70,
    maxWords: 140,
    modelAnswer: "Meiner Meinung nach ist Deutsch sehr wichtig für das Leben in Deutschland. Man braucht Deutsch, weil viele Briefe, Termine und Informationen auf Deutsch sind. Außerdem kann man mit Nachbarn, Ärzten und Kollegen besser sprechen. Deshalb möchte ich regelmäßig üben.",
  },
];

function normalized(text: string): string {
  return text.toLowerCase().replace(/[.,!?;:]/g, " ").replace(/\s+/g, " ").trim();
}

function hasAny(text: string, words: string[]): boolean {
  const value = normalized(text);
  return words.some((word) => value.includes(normalized(word)));
}

function wordCount(text: string): number {
  return normalized(text).split(" ").filter(Boolean).length;
}

export function getWritingPrompt(level: GermanWritingLevel): GermanWritingPrompt {
  return germanWritingPrompts.find((prompt) => prompt.level === level) || germanWritingPrompts[0];
}

export function reviewGermanWriting(prompt: GermanWritingPrompt, answer: string): GermanWritingReview {
  const feedback: string[] = [];
  const missingPoints: string[] = [];
  const mistakeFocus = new Set<string>();
  let score = 100;

  if (!answer.trim()) {
    return {
      score: 0,
      passed: false,
      correctedVersion: prompt.modelAnswer,
      naturalVersion: prompt.modelAnswer,
      feedback: ["No answer was provided."],
      missingPoints: prompt.instructions,
      mistakeFocus: ["task completion"],
      rewriteInstruction: "Write the full answer using the model as support.",
    };
  }

  const count = wordCount(answer);
  if (prompt.minWords && count < prompt.minWords) {
    score -= 15;
    feedback.push(`Your answer is short. Target at least ${prompt.minWords} words.`);
    mistakeFocus.add("length");
  }
  if (prompt.maxWords && count > prompt.maxWords) {
    score -= 10;
    feedback.push(`Your answer is too long for this task. Target no more than ${prompt.maxWords} words.`);
    mistakeFocus.add("exam format");
  }

  if (prompt.id.includes("sick") && !hasAny(answer, ["krank"])) {
    score -= 20;
    missingPoints.push("Say that you are sick: Ich bin krank.");
    mistakeFocus.add("task completion");
  }
  if (prompt.id.includes("sick") && !hasAny(answer, ["nicht kommen", "kann heute nicht kommen"])) {
    score -= 20;
    missingPoints.push("Say that you cannot come today.");
    mistakeFocus.add("modal verb");
  }
  if (prompt.id.includes("appointment") && !hasAny(answer, ["termin"])) {
    score -= 20;
    missingPoints.push("Mention the appointment: Termin.");
    mistakeFocus.add("vocabulary");
  }
  if (prompt.id.includes("appointment") && !hasAny(answer, ["neuen termin", "neuer termin", "termin machen", "termin verschieben"])) {
    score -= 20;
    missingPoints.push("Ask for a new appointment.");
    mistakeFocus.add("task completion");
  }
  if (prompt.level === "A2" && !hasAny(answer, ["weil", "denn"])) {
    score -= 15;
    feedback.push("For A2, try to give a reason with weil or denn.");
    mistakeFocus.add("connector");
  }
  if (prompt.level === "B1" && !hasAny(answer, ["meiner meinung", "weil", "deshalb", "außerdem", "trotzdem"])) {
    score -= 25;
    feedback.push("For B1, include opinion and connectors such as weil, deshalb, außerdem, trotzdem.");
    mistakeFocus.add("B1 connectors");
  }
  if (answer.includes(" ein Termin") || answer.includes(" ein termin")) {
    score -= 10;
    feedback.push("Use accusative after haben: einen Termin, not ein Termin.");
    mistakeFocus.add("accusative");
  }
  if (/[a-zäöüß] ich /.test(answer)) {
    score -= 5;
    feedback.push("Check sentence boundaries and capitalization. German sentences normally start with a capital letter.");
    mistakeFocus.add("capitalization");
  }

  if (feedback.length === 0 && missingPoints.length === 0) {
    feedback.push("Good task completion. Now rewrite once using the corrected/natural model to make it automatic.");
  }

  const finalScore = Math.max(0, Math.min(100, score));

  return {
    score: finalScore,
    passed: finalScore >= 60,
    correctedVersion: prompt.modelAnswer,
    naturalVersion: prompt.modelAnswer,
    feedback,
    missingPoints,
    mistakeFocus: Array.from(mistakeFocus),
    rewriteInstruction: "Rewrite your answer once using the corrected version. Then say it aloud.",
  };
}
