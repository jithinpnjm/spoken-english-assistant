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
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, " ");
}

const taskBank: GermanPracticeTask[] = [
  {
    id: "a0-greetings-1",
    level: "A0",
    subtopicId: "a0-greetings",
    type: "short_answer",
    prompt: "How do you politely say: Good day?",
    helper: "Use the formal greeting used in shops and offices.",
    expectedAnswers: ["guten tag"],
    correctedModel: "Guten Tag.",
    explanation: "Guten Tag is a safe formal greeting for shops, offices, doctors, and official appointments.",
    mistakeFocus: ["greeting", "formal phrase"],
  },
  {
    id: "a0-greetings-2",
    level: "A0",
    subtopicId: "a0-greetings",
    type: "short_answer",
    prompt: "How do you say: Thank you?",
    helper: "One word is enough.",
    expectedAnswers: ["danke"],
    correctedModel: "Danke.",
    explanation: "Danke is the basic phrase for thank you. You can also say Danke schön.",
    mistakeFocus: ["polite phrase"],
  },
  {
    id: "a0-repeat-slowly-1",
    level: "A0",
    subtopicId: "a0-repair-phrases",
    type: "short_answer",
    prompt: "How do you politely ask: Can you please repeat that?",
    helper: "Use Können Sie ... bitte ...?",
    expectedAnswers: ["koennen sie das bitte wiederholen", "können sie das bitte wiederholen"],
    correctedModel: "Können Sie das bitte wiederholen?",
    explanation: "This is a polite Sie-form question. It is a survival phrase for offices, doctors, transport, and shops.",
    mistakeFocus: ["polite phrase", "question form"],
  },
  {
    id: "a0-repeat-slowly-2",
    level: "A0",
    subtopicId: "a0-repair-phrases",
    type: "short_answer",
    prompt: "How do you say: I do not understand?",
    helper: "Start with Ich ...",
    expectedAnswers: ["ich verstehe nicht"],
    correctedModel: "Ich verstehe nicht.",
    explanation: "This is one of the most important survival phrases when living in Germany.",
    mistakeFocus: ["survival phrase", "verb form"],
  },
  {
    id: "a0-numbers-time-1",
    level: "A0",
    subtopicId: "a0-numbers-time",
    type: "fill_blank",
    prompt: "Fill the blank: Ich habe einen Termin ___ 10 Uhr.",
    helper: "Use the preposition for exact clock time.",
    expectedAnswers: ["um"],
    correctedModel: "Ich habe einen Termin um 10 Uhr.",
    explanation: "Use um for exact time: um 10 Uhr.",
    mistakeFocus: ["time expression", "preposition"],
  },
  {
    id: "a0-numbers-time-2",
    level: "A0",
    subtopicId: "a0-numbers-time",
    type: "fill_blank",
    prompt: "Fill the blank: Der Termin ist ___ Montag.",
    helper: "Use the preposition for days.",
    expectedAnswers: ["am"],
    correctedModel: "Der Termin ist am Montag.",
    explanation: "Use am for days: am Montag.",
    mistakeFocus: ["date expression", "preposition"],
  },
  {
    id: "a1-hoeren-time-numbers-1",
    level: "A1",
    subtopicId: "a1-hoeren-time-numbers",
    type: "short_answer",
    prompt: "You hear: Der Termin ist um zehn Uhr. What time is the appointment? Answer in German.",
    helper: "Use the full phrase with um.",
    expectedAnswers: ["um zehn uhr", "zehn uhr", "um 10 uhr", "10 uhr"],
    correctedModel: "Der Termin ist um zehn Uhr.",
    explanation: "For exact appointment time, German uses um + time.",
    mistakeFocus: ["listening detail", "time expression"],
  },
  {
    id: "a1-lesen-signs-messages-1",
    level: "A1",
    subtopicId: "a1-lesen-signs-messages",
    type: "short_answer",
    prompt: "A sign says: Heute geschlossen. What does it mean? Answer in English or German.",
    helper: "geschlossen means closed.",
    expectedAnswers: ["closed today", "today closed", "heute geschlossen", "closed"],
    correctedModel: "Heute geschlossen. = Closed today.",
    explanation: "geschlossen means closed. This is useful for shops, offices, restaurants, and public services.",
    mistakeFocus: ["reading keyword", "public signs"],
  },
  {
    id: "a1-schreiben-form-1",
    level: "A1",
    subtopicId: "a1-schreiben-form",
    type: "short_answer",
    prompt: "Write a simple form answer for nationality: Indian.",
    helper: "Use the German adjective for Indian nationality.",
    expectedAnswers: ["indisch", "indian"],
    correctedModel: "Nationalität: indisch",
    explanation: "For nationality on a form, write indisch.",
    mistakeFocus: ["form field", "personal information"],
  },
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
    id: "a1-termin-accusative-2",
    level: "A1",
    subtopicId: "a1-schreiben-termin",
    type: "sentence_build",
    prompt: "Build the German sentence: I have an appointment tomorrow.",
    helper: "Use Ich habe + einen Termin + morgen.",
    expectedAnswers: ["ich habe morgen einen termin", "ich habe einen termin morgen"],
    correctedModel: "Ich habe morgen einen Termin.",
    explanation: "The more natural word order is: Ich habe morgen einen Termin. Morgen can come after the verb phrase in simple A1 sentences.",
    mistakeFocus: ["word order", "accusative", "time expression"],
  },
  {
    id: "a1-invitation-reply-1",
    level: "A1",
    subtopicId: "a1-schreiben-einladung",
    type: "sentence_build",
    prompt: "Build the German sentence: Thank you for the invitation.",
    helper: "Use Danke für ...",
    expectedAnswers: ["danke fuer die einladung", "danke für die einladung"],
    correctedModel: "Danke für die Einladung.",
    explanation: "Einladung is a noun, so it is capitalized: die Einladung.",
    mistakeFocus: ["capitalization", "preposition"],
  },
  {
    id: "a1-sprechen-self-intro-1",
    level: "A1",
    subtopicId: "a1-sprechen-self-intro",
    type: "sentence_build",
    prompt: "Build the German sentence: My name is Jithin.",
    helper: "Use Ich heiße ...",
    expectedAnswers: ["ich heisse jithin", "ich heiße jithin"],
    correctedModel: "Ich heiße Jithin.",
    explanation: "Use heißen for saying your name: Ich heiße ...",
    mistakeFocus: ["verb form", "self introduction"],
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
    id: "a1-grammar-accusative-1",
    level: "A1",
    subtopicId: "a1-grammar-accusative",
    type: "fill_blank",
    prompt: "Fill the blank: Ich trinke ___ Kaffee.",
    helper: "Kaffee is masculine: der Kaffee. After trinken, use accusative.",
    expectedAnswers: ["einen"],
    correctedModel: "Ich trinke einen Kaffee.",
    explanation: "Kaffee is masculine, and as the object of trinken it takes accusative: einen Kaffee.",
    mistakeFocus: ["article", "accusative"],
  },
  {
    id: "a2-hoeren-appointments-1",
    level: "A2",
    subtopicId: "a2-hoeren-appointments",
    type: "short_answer",
    prompt: "You hear: Der Termin wurde auf Freitag verschoben. Which day is the new appointment?",
    helper: "auf Freitag verschoben means moved to Friday.",
    expectedAnswers: ["freitag", "am freitag"],
    correctedModel: "Der Termin wurde auf Freitag verschoben.",
    explanation: "verschoben means postponed/rescheduled. Auf Freitag means to Friday.",
    mistakeFocus: ["listening detail", "appointment vocabulary"],
  },
  {
    id: "a2-schreiben-problem-email-1",
    level: "A2",
    subtopicId: "a2-schreiben-problem-email",
    type: "sentence_build",
    prompt: "Build the German sentence: I cannot come because I am sick.",
    helper: "Use weil. In a weil-clause, the verb goes to the end.",
    expectedAnswers: ["ich kann nicht kommen weil ich krank bin", "ich kann heute nicht kommen weil ich krank bin"],
    correctedModel: "Ich kann nicht kommen, weil ich krank bin.",
    explanation: "In a subordinate clause with weil, the verb moves to the end: weil ich krank bin.",
    mistakeFocus: ["weil clause", "word order"],
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
    id: "a2-perfekt-2",
    level: "A2",
    subtopicId: "a2-grammar-perfekt",
    type: "fill_blank",
    prompt: "Fill the blank: Ich bin zum Arzt ___.",
    helper: "Use the Partizip II of gehen.",
    expectedAnswers: ["gegangen"],
    correctedModel: "Ich bin zum Arzt gegangen.",
    explanation: "Movement verbs often use sein in Perfekt. gehen becomes gegangen.",
    mistakeFocus: ["Perfekt", "sein auxiliary", "movement verb"],
  },
  {
    id: "b1-lesen-opinions-1",
    level: "B1",
    subtopicId: "b1-lesen-opinions",
    type: "short_answer",
    prompt: "In an opinion text, what does Meiner Meinung nach mean?",
    helper: "It introduces a personal opinion.",
    expectedAnswers: ["in my opinion", "meiner meinung nach", "my opinion"],
    correctedModel: "Meiner Meinung nach ... = In my opinion ...",
    explanation: "This phrase is useful for B1 writing and speaking when giving opinions.",
    mistakeFocus: ["opinion phrase", "B1 connector"],
  },
  {
    id: "b1-schreiben-opinion-email-1",
    level: "B1",
    subtopicId: "b1-schreiben-opinion-email",
    type: "sentence_build",
    prompt: "Build the German sentence: In my opinion, German is important for life in Germany.",
    helper: "Use Meiner Meinung nach + verb position after the phrase.",
    expectedAnswers: ["meiner meinung nach ist deutsch wichtig fuer das leben in deutschland", "meiner meinung nach ist deutsch wichtig für das leben in deutschland"],
    correctedModel: "Meiner Meinung nach ist Deutsch wichtig für das Leben in Deutschland.",
    explanation: "After the fronted phrase Meiner Meinung nach, the verb comes next: ist. Nouns are capitalized: Deutsch, Leben, Deutschland.",
    mistakeFocus: ["word order", "opinion phrase", "capitalization"],
  },
  {
    id: "b1-sprechen-planen-1",
    level: "B1",
    subtopicId: "b1-sprechen-planen",
    type: "sentence_build",
    prompt: "Build a polite suggestion: We could meet at 10 o'clock.",
    helper: "Use Wir könnten ...",
    expectedAnswers: ["wir koennten uns um 10 uhr treffen", "wir könnten uns um 10 uhr treffen"],
    correctedModel: "Wir könnten uns um 10 Uhr treffen.",
    explanation: "Könnten is Konjunktiv II and is useful for polite suggestions in B1 speaking.",
    mistakeFocus: ["Konjunktiv II", "suggestion", "word order"],
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
  const direct = taskBank.filter((task) => task.level === level && task.subtopicId === subtopic.id);
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
