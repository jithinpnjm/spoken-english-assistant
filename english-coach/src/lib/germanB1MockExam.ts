export type B1MockSection = "lesen" | "hoeren" | "schreiben" | "sprechen";

export interface B1MockTask {
  id: string;
  section: B1MockSection;
  teil: number;
  prompt: string;
  expectedKeywords: string[];
  modelAnswer: string;
  maxPoints: number;
  feedbackFocus: string[];
}

export interface B1MockSectionResult {
  section: B1MockSection;
  score: number;
  maxScore: number;
  percentage: number;
  passEstimate: boolean;
}

export interface B1MockResult {
  totalScore: number;
  maxScore: number;
  moduleResults: B1MockSectionResult[];
  allModulesPassEstimate: boolean;
  feedback: string[];
  nextStudyPlan: string[];
}

export const b1MockTasks: B1MockTask[] = [
  {
    id: "b1-lesen-teil4-opinion",
    section: "lesen",
    teil: 4,
    prompt: "Reading simulation: A reader comment says: 'Ich finde, Kinder sollten weniger Zeit am Handy verbringen, weil Bewegung wichtiger ist.' Does the person support less phone time for children?",
    expectedKeywords: ["yes", "ja", "support", "supports", "unterstuetzt", "weniger handy"],
    modelAnswer: "Ja. Die Person ist dafür, dass Kinder weniger Zeit am Handy verbringen.",
    maxPoints: 20,
    feedbackFocus: ["stance recognition", "opinion reading"],
  },
  {
    id: "b1-hoeren-teil4-speaker",
    section: "hoeren",
    teil: 4,
    prompt: "Listening simulation: Speaker A says public transport is better for the environment. Which topic is Speaker A supporting?",
    expectedKeywords: ["public transport", "oeffentliche verkehrsmittel", "umwelt", "environment", "bus", "train", "bahn"],
    modelAnswer: "Speaker A unterstützt öffentliche Verkehrsmittel, weil sie besser für die Umwelt sind.",
    maxPoints: 20,
    feedbackFocus: ["speaker matching", "main idea listening"],
  },
  {
    id: "b1-schreiben-teil2-opinion",
    section: "schreiben",
    teil: 2,
    prompt: "Writing simulation: Write 4-6 German sentences giving your opinion about learning German for life in Germany. Include one reason and one example.",
    expectedKeywords: ["meiner meinung", "ich finde", "weil", "zum beispiel", "deutsch", "deutschland"],
    modelAnswer: "Meiner Meinung nach ist Deutsch sehr wichtig für das Leben in Deutschland. Man braucht Deutsch, weil viele Briefe und Termine auf Deutsch sind. Zum Beispiel muss man beim Arzt oder beim Bürgeramt oft Deutsch sprechen. Deshalb lerne ich regelmäßig.",
    maxPoints: 30,
    feedbackFocus: ["opinion phrase", "reason", "example", "connector"],
  },
  {
    id: "b1-sprechen-teil1-plan",
    section: "sprechen",
    teil: 1,
    prompt: "Speaking simulation: Plan a small German study meeting with a partner. Mention time, place, material, and who brings snacks.",
    expectedKeywords: ["wir koennten", "wir könnten", "treffen", "um", "ort", "material", "snacks"],
    modelAnswer: "Wir könnten uns am Samstag um 10 Uhr in der Bibliothek treffen. Ich bringe das Grammatikbuch mit. Du könntest Snacks mitbringen. Danach üben wir gemeinsam Sprechen.",
    maxPoints: 30,
    feedbackFocus: ["planning", "suggestion", "Konjunktiv II", "interaction"],
  },
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/[.,!?;:]/g, " ").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, " ").trim();
}

function scoreTask(task: B1MockTask, answer: string): number {
  const normalizedAnswer = normalize(answer);
  const hits = task.expectedKeywords.filter((keyword) => normalizedAnswer.includes(normalize(keyword))).length;
  const ratio = task.expectedKeywords.length ? hits / Math.min(task.expectedKeywords.length, 4) : 0;
  return Math.max(0, Math.min(task.maxPoints, Math.round(task.maxPoints * ratio)));
}

export function scoreB1MockExam(answers: Record<string, string>): B1MockResult {
  const sectionMax: Record<B1MockSection, number> = { lesen: 0, hoeren: 0, schreiben: 0, sprechen: 0 };
  const sectionScore: Record<B1MockSection, number> = { lesen: 0, hoeren: 0, schreiben: 0, sprechen: 0 };
  const feedback: string[] = [];

  for (const task of b1MockTasks) {
    sectionMax[task.section] += task.maxPoints;
    const score = scoreTask(task, answers[task.id] || "");
    sectionScore[task.section] += score;
    if (score < task.maxPoints * 0.6) {
      feedback.push(`${task.section} Teil ${task.teil}: repair ${task.feedbackFocus.join(", ")}. Model: ${task.modelAnswer}`);
    }
  }

  const moduleResults = (Object.keys(sectionMax) as B1MockSection[]).map((section) => {
    const maxScore = sectionMax[section];
    const score = sectionScore[section];
    const percentage = maxScore ? Math.round((score / maxScore) * 100) : 0;
    return { section, score, maxScore, percentage, passEstimate: percentage >= 60 };
  });

  const totalScore = moduleResults.reduce((sum, item) => sum + item.score, 0);
  const maxScore = moduleResults.reduce((sum, item) => sum + item.maxScore, 0);

  return {
    totalScore,
    maxScore,
    moduleResults,
    allModulesPassEstimate: moduleResults.every((item) => item.passEstimate),
    feedback: feedback.length ? feedback : ["Good B1 mini mock attempt. Repeat the model answers and add more Redemittel next time."],
    nextStudyPlan: [
      "Review B1 opinion phrases and connectors.",
      "Practise one speaker-matching listening task.",
      "Write one 80-word opinion post with reason and example.",
      "Practise planning with Wir könnten / Wie wäre es, wenn ...?",
    ],
  };
}
