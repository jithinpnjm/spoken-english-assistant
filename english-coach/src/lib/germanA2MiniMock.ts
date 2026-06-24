export type A2MiniMockSection = "lesen" | "hoeren" | "schreiben" | "sprechen";

export interface A2MiniMockTask {
  id: string;
  section: A2MiniMockSection;
  teil: number;
  prompt: string;
  expectedKeywords: string[];
  modelAnswer: string;
  maxPoints: number;
  explanation: string;
}

export interface A2MiniMockResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  writtenBlockScore: number;
  speakingScore: number;
  passEstimate: boolean;
  sectionScores: Record<A2MiniMockSection, number>;
  feedback: string[];
  nextStudyPlan: string[];
}

export const a2MiniMockTasks: A2MiniMockTask[] = [
  {
    id: "a2-lesen-advert",
    section: "lesen",
    teil: 4,
    prompt: "Reading simulation: You want a German course in the evening. An advert says: 'Deutsch A2, Montag und Mittwoch, 18:00-19:30'. Is this advert suitable?",
    expectedKeywords: ["ja", "yes", "evening", "abend", "18", "suitable"],
    modelAnswer: "Ja, der Kurs ist geeignet, weil er am Abend um 18:00 Uhr stattfindet.",
    maxPoints: 25,
    explanation: "A2 Lesen often asks you to match a practical need to the right advert or notice.",
  },
  {
    id: "a2-hoeren-delay",
    section: "hoeren",
    teil: 3,
    prompt: "Listening simulation: You hear: 'Der Zug hat zwanzig Minuten Verspätung.' How late is the train?",
    expectedKeywords: ["zwanzig", "20", "minuten", "verspaetung", "verspätung"],
    modelAnswer: "Der Zug hat zwanzig Minuten Verspätung.",
    maxPoints: 25,
    explanation: "A2 Hören requires extracting time, delay, place, and action details quickly.",
  },
  {
    id: "a2-schreiben-formal-email",
    section: "schreiben",
    teil: 2,
    prompt: "Writing simulation: Write a short formal email. Say you cannot come to the appointment, explain why, and ask for a new appointment.",
    expectedKeywords: ["termin", "leider", "nicht kommen", "weil", "neuen termin", "mit freundlichen gruessen", "mit freundlichen grüßen"],
    modelAnswer: "Sehr geehrte Damen und Herren, leider kann ich morgen nicht zum Termin kommen, weil ich krank bin. Könnten Sie mir bitte einen neuen Termin geben? Mit freundlichen Grüßen, Jithin",
    maxPoints: 25,
    explanation: "A2 Schreiben Teil 2 expects a short formal or semi-formal email with all required points.",
  },
  {
    id: "a2-sprechen-plan",
    section: "sprechen",
    teil: 3,
    prompt: "Speaking simulation: Plan a weekend activity with a partner. Mention activity, time, place, and transport.",
    expectedKeywords: ["wir koennten", "wir könnten", "samstag", "treffen", "um", "mit dem", "fahren"],
    modelAnswer: "Wir könnten am Samstag ins Museum gehen. Wir treffen uns um 10 Uhr am Bahnhof und fahren mit dem Zug. Danach können wir zusammen Kaffee trinken.",
    maxPoints: 25,
    explanation: "A2 Sprechen Teil 3 tests simple joint planning with suggestions and agreement.",
  },
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/[.,!?;:]/g, " ").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, " ").trim();
}

function scoreTask(task: A2MiniMockTask, answer: string): number {
  const normalizedAnswer = normalize(answer);
  const hits = task.expectedKeywords.filter((keyword) => normalizedAnswer.includes(normalize(keyword))).length;
  const ratio = task.expectedKeywords.length ? hits / Math.min(task.expectedKeywords.length, 5) : 0;
  return Math.max(0, Math.min(task.maxPoints, Math.round(task.maxPoints * ratio)));
}

export function scoreA2MiniMock(answers: Record<string, string>): A2MiniMockResult {
  const sectionScores: Record<A2MiniMockSection, number> = { lesen: 0, hoeren: 0, schreiben: 0, sprechen: 0 };
  const feedback: string[] = [];
  const maxScore = a2MiniMockTasks.reduce((sum, task) => sum + task.maxPoints, 0);

  for (const task of a2MiniMockTasks) {
    const score = scoreTask(task, answers[task.id] || "");
    sectionScores[task.section] += score;
    if (score < task.maxPoints * 0.6) {
      feedback.push(`${task.section} Teil ${task.teil}: ${task.explanation} Model: ${task.modelAnswer}`);
    }
  }

  const totalScore = Object.values(sectionScores).reduce((sum, score) => sum + score, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);
  const writtenBlockScore = sectionScores.lesen + sectionScores.hoeren + sectionScores.schreiben;
  const speakingScore = sectionScores.sprechen;

  return {
    totalScore,
    maxScore,
    percentage,
    writtenBlockScore,
    speakingScore,
    passEstimate: percentage >= 60 && writtenBlockScore >= 45 && speakingScore >= 15,
    sectionScores,
    feedback: feedback.length ? feedback : ["Good A2 mini mock attempt. Repeat the model answers aloud and rewrite the writing task once."],
    nextStudyPlan: [
      "Review A2 appointment and delay vocabulary.",
      "Practise one formal email with Könnten Sie bitte ...?",
      "Drill weil/denn word order.",
      "Practise one partner-planning answer with Wir könnten ...",
    ],
  };
}
