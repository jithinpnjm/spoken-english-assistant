export type A1MockSection = "hoeren" | "lesen" | "schreiben" | "sprechen";

export interface A1MockTask {
  id: string;
  section: A1MockSection;
  prompt: string;
  expectedAnswer: string;
  modelAnswer: string;
  points: number;
  explanation: string;
}

export interface A1MockResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  passEstimate: boolean;
  sectionScores: Record<A1MockSection, number>;
  feedback: string[];
  nextStudyPlan: string[];
}

export const a1MiniMockTasks: A1MockTask[] = [
  {
    id: "a1-mock-hoeren-time",
    section: "hoeren",
    prompt: "Listening simulation: You hear: Der Termin ist um zehn Uhr. Question: When is the appointment?",
    expectedAnswer: "um zehn uhr",
    modelAnswer: "Der Termin ist um zehn Uhr.",
    points: 10,
    explanation: "A1 listening often tests exact details such as time, place, or number.",
  },
  {
    id: "a1-mock-lesen-sign",
    section: "lesen",
    prompt: "Reading: Heute geschlossen. Question: Is the shop open today?",
    expectedAnswer: "no",
    modelAnswer: "No. It is closed today.",
    points: 10,
    explanation: "Heute geschlossen means closed today.",
  },
  {
    id: "a1-mock-schreiben-sick",
    section: "schreiben",
    prompt: "Writing: Write a short message to your teacher. Say you are sick, cannot come today, and ask for homework.",
    expectedAnswer: "krank nicht kommen hausaufgabe",
    modelAnswer: "Hallo, ich bin krank. Ich kann heute nicht kommen. Was ist die Hausaufgabe? Viele Grüße, Jithin",
    points: 20,
    explanation: "A1 writing checks whether all task points are included and understandable.",
  },
  {
    id: "a1-mock-sprechen-intro",
    section: "sprechen",
    prompt: "Speaking simulation: Introduce yourself with name, city, country, and language.",
    expectedAnswer: "ich heiße ich wohne ich komme ich spreche",
    modelAnswer: "Ich heiße Jithin. Ich komme aus Indien. Ich wohne in Berlin. Ich spreche Englisch und lerne Deutsch.",
    points: 20,
    explanation: "A1 speaking expects simple personal information in clear sentences.",
  },
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/[.,!?;:]/g, " ").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, " ").trim();
}

export function scoreA1MiniMock(answers: Record<string, string>): A1MockResult {
  const sectionScores: Record<A1MockSection, number> = { hoeren: 0, lesen: 0, schreiben: 0, sprechen: 0 };
  const feedback: string[] = [];
  const maxScore = a1MiniMockTasks.reduce((sum, task) => sum + task.points, 0);

  for (const task of a1MiniMockTasks) {
    const answer = normalize(answers[task.id] || "");
    const expectedTokens = normalize(task.expectedAnswer).split(" ").filter(Boolean);
    const hits = expectedTokens.filter((token) => answer.includes(token)).length;
    const ratio = expectedTokens.length ? hits / expectedTokens.length : 0;
    const earned = Math.round(task.points * ratio);
    sectionScores[task.section] += earned;
    if (earned < task.points) {
      feedback.push(`${task.section}: Review task ${task.id}. ${task.explanation}`);
    }
  }

  const totalScore = Object.values(sectionScores).reduce((sum, score) => sum + score, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  return {
    totalScore,
    maxScore,
    percentage,
    passEstimate: percentage >= 60,
    sectionScores,
    feedback: feedback.length ? feedback : ["Good first A1 mini mock attempt. Repeat the corrected model answers aloud."],
    nextStudyPlan: [
      "Review appointment time listening.",
      "Practice signs and short messages.",
      "Rewrite one A1 short message.",
      "Repeat self-introduction aloud three times.",
    ],
  };
}
