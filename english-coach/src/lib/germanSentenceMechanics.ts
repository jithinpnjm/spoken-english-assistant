export interface GermanSentencePattern {
  id: string;
  title: string;
  formula: string;
  examples: Array<{
    de: string;
    en: string;
    breakdown: string;
  }>;
  teacherNote: string;
}

export interface GermanArticleCaseTransformation {
  noun: string;
  gender: "masculine" | "feminine" | "neuter" | "plural";
  nominative: string;
  accusative: string;
  dative: string;
  examples: Array<{
    de: string;
    en: string;
    why: string;
  }>;
}

export const a1SentencePatterns: GermanSentencePattern[] = [
  {
    id: "statement-v2",
    title: "Statement: subject + verb + rest",
    formula: "Subject + conjugated verb + object/time/place",
    teacherNote: "In a normal German sentence, the conjugated verb must be in position 2. First choose the person, then transform the verb, then add the rest.",
    examples: [
      { de: "Ich trinke Wasser.", en: "I drink water.", breakdown: "ich = subject, trinke = conjugated verb, Wasser = object" },
      { de: "Du lernst Deutsch.", en: "You learn German.", breakdown: "du + lernst, not du lernen" },
      { de: "Wir wohnen in Berlin.", en: "We live in Berlin.", breakdown: "wir + wohnen because wir uses the infinitive-like -en form" }
    ]
  },
  {
    id: "yes-no-question",
    title: "Yes/no question: verb first",
    formula: "Conjugated verb + subject + rest?",
    teacherNote: "For simple yes/no questions, German starts with the conjugated verb. This is different from English.",
    examples: [
      { de: "Trinkst du Kaffee?", en: "Do you drink coffee?", breakdown: "trinkst comes first, then du" },
      { de: "Haben Sie Zeit?", en: "Do you have time?", breakdown: "haben comes first for the formal question" },
      { de: "Kommst du morgen?", en: "Are you coming tomorrow?", breakdown: "kommst + du + morgen" }
    ]
  },
  {
    id: "w-question",
    title: "W-question: question word + verb + subject",
    formula: "W-word + conjugated verb + subject + rest?",
    teacherNote: "For W-questions, the question word takes position 1, and the conjugated verb stays in position 2.",
    examples: [
      { de: "Wann kommst du?", en: "When are you coming?", breakdown: "Wann = position 1, kommst = position 2" },
      { de: "Wo wohnen Sie?", en: "Where do you live?", breakdown: "Wo + wohnen + Sie" },
      { de: "Was kostet das?", en: "How much does that cost?", breakdown: "Was + kostet + das" }
    ]
  },
  {
    id: "modal-verb",
    title: "Modal verb: modal in position 2, second verb at the end",
    formula: "Subject + modal verb + rest + infinitive",
    teacherNote: "With möchten/können/müssen, the modal verb is conjugated and the action verb goes to the end in infinitive form.",
    examples: [
      { de: "Ich möchte einen Kaffee trinken.", en: "I would like to drink a coffee.", breakdown: "möchte is conjugated; trinken stays at the end" },
      { de: "Können Sie bitte langsam sprechen?", en: "Can you please speak slowly?", breakdown: "können is conjugated; sprechen is infinitive at the end" },
      { de: "Wir möchten eine Fahrkarte kaufen.", en: "We would like to buy a ticket.", breakdown: "möchten + object + kaufen" }
    ]
  },
  {
    id: "separable-verb",
    title: "Separable verb: prefix moves to the end",
    formula: "Subject + conjugated verb stem + rest + prefix",
    teacherNote: "For separable verbs in simple present, the prefix separates and moves to the end of the sentence.",
    examples: [
      { de: "Ich stehe um 7 Uhr auf.", en: "I get up at 7 o'clock.", breakdown: "aufstehen -> stehe ... auf" },
      { de: "Wir kaufen heute ein.", en: "We shop today.", breakdown: "einkaufen -> kaufen ... ein" },
      { de: "Er sieht am Abend fern.", en: "He watches TV in the evening.", breakdown: "fernsehen -> sieht ... fern" }
    ]
  }
];

export const a1ArticleCaseTransformations: GermanArticleCaseTransformation[] = [
  {
    noun: "Termin",
    gender: "masculine",
    nominative: "ein Termin / der Termin",
    accusative: "einen Termin / den Termin",
    dative: "einem Termin / dem Termin",
    examples: [
      { de: "Das ist ein Termin.", en: "That is an appointment.", why: "Nominative after sein: ein Termin." },
      { de: "Ich habe einen Termin.", en: "I have an appointment.", why: "Termin is masculine and after haben it becomes accusative: einen Termin." },
      { de: "Ich komme zu dem Termin.", en: "I am coming to the appointment.", why: "zu takes dative: dem Termin." }
    ]
  },
  {
    noun: "Kaffee",
    gender: "masculine",
    nominative: "ein Kaffee / der Kaffee",
    accusative: "einen Kaffee / den Kaffee",
    dative: "einem Kaffee / dem Kaffee",
    examples: [
      { de: "Das ist ein Kaffee.", en: "That is a coffee.", why: "Nominative: ein Kaffee." },
      { de: "Ich möchte einen Kaffee.", en: "I would like a coffee.", why: "Kaffee is masculine object: einen Kaffee." },
      { de: "Mit dem Kaffee bezahle ich fünf Euro.", en: "With the coffee I pay five euros.", why: "mit takes dative: dem Kaffee." }
    ]
  },
  {
    noun: "Fahrkarte",
    gender: "feminine",
    nominative: "eine Fahrkarte / die Fahrkarte",
    accusative: "eine Fahrkarte / die Fahrkarte",
    dative: "einer Fahrkarte / der Fahrkarte",
    examples: [
      { de: "Das ist eine Fahrkarte.", en: "That is a ticket.", why: "Feminine nominative: eine Fahrkarte." },
      { de: "Ich kaufe eine Fahrkarte.", en: "I buy a ticket.", why: "Feminine accusative stays eine." },
      { de: "Ich frage nach der Fahrkarte.", en: "I ask about the ticket.", why: "nach takes dative: der Fahrkarte." }
    ]
  },
  {
    noun: "Hotel",
    gender: "neuter",
    nominative: "ein Hotel / das Hotel",
    accusative: "ein Hotel / das Hotel",
    dative: "einem Hotel / dem Hotel",
    examples: [
      { de: "Das ist ein Hotel.", en: "That is a hotel.", why: "Neuter nominative: ein Hotel." },
      { de: "Ich suche ein Hotel.", en: "I am looking for a hotel.", why: "Neuter accusative stays ein." },
      { de: "Ich wohne in dem Hotel.", en: "I live/stay in the hotel.", why: "location with in uses dative: dem Hotel." }
    ]
  }
];

function normalize(value: string): string {
  return value.toLowerCase();
}

export function getSentencePatternsForLesson(input: string): GermanSentencePattern[] {
  const text = normalize(input);
  const patterns: GermanSentencePattern[] = [a1SentencePatterns[0]];

  if (text.includes("question") || text.includes("frage") || text.includes("w-question") || text.includes("directions")) {
    patterns.push(a1SentencePatterns[1], a1SentencePatterns[2]);
  }
  if (text.includes("möchten") || text.includes("modal") || text.includes("können") || text.includes("restaurant") || text.includes("taxi") || text.includes("ticket")) {
    patterns.push(a1SentencePatterns[3]);
  }
  if (text.includes("separable") || text.includes("trennbar") || text.includes("routine") || text.includes("aufstehen") || text.includes("einkaufen") || text.includes("fernsehen")) {
    patterns.push(a1SentencePatterns[4]);
  }

  return Array.from(new Map(patterns.map((pattern) => [pattern.id, pattern])).values()).slice(0, 4);
}

export function getArticleTransformationsForLesson(input: string): GermanArticleCaseTransformation[] {
  const text = normalize(input);
  const matches = a1ArticleCaseTransformations.filter((item) => text.includes(normalize(item.noun)));

  if (matches.length > 0) return matches;

  if (text.includes("appointment") || text.includes("termin")) return a1ArticleCaseTransformations.filter((item) => item.noun === "Termin");
  if (text.includes("restaurant") || text.includes("coffee") || text.includes("kaffee")) return a1ArticleCaseTransformations.filter((item) => item.noun === "Kaffee");
  if (text.includes("train") || text.includes("ticket") || text.includes("fahrkarte")) return a1ArticleCaseTransformations.filter((item) => item.noun === "Fahrkarte");
  if (text.includes("hotel") || text.includes("reservation")) return a1ArticleCaseTransformations.filter((item) => item.noun === "Hotel");
  if (text.includes("accusative") || text.includes("akkusativ") || text.includes("dative") || text.includes("dativ") || text.includes("article")) return a1ArticleCaseTransformations;

  return [];
}
