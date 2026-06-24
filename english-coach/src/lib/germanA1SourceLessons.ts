export interface GermanA1SourceLesson {
  lessonNo: number;
  titleEn: string;
  titleDe: string;
  coreContent: string[];
  goetheVocabulary: string[];
  examRelevance: string;
  dailyLifeExtension: string[];
  commonMistakes: string[];
}

const lessonSeed: Array<[number, string, string]> = [
  [1, "Greetings", "Begrüßungen"],
  [2, "Common Phrases", "Häufige Redemittel"],
  [3, "Numbers (Part 1): 1–20", "Zahlen (Teil 1)"],
  [4, "Numbers (Part 2): 20–100", "Zahlen (Teil 2)"],
  [5, "Alphabet", "Alphabet"],
  [6, "Introducing Yourself", "Sich vorstellen"],
  [7, "Getting to Know Someone", "Jemanden kennenlernen"],
  [8, "Wie geht's? (How are you?)", "Wie geht's?"],
  [9, "Sentence Structure (Part 1)", "Satzbau (Teil 1)"],
  [10, "Sentence Structure (Part 2)", "Satzbau (Teil 2)"],
  [11, "Pronomen (Pronouns Overview)", "Pronomen"],
  [12, "Verb Conjugation (Part 1): haben & sein", "Verbkonjugation: haben und sein"],
  [13, "What is a Verb? (Regular vs. Irregular)", "Regelmäßige und unregelmäßige Verben"],
  [14, "Verb Conjugation (Part 2): Regular Verbs", "Verbkonjugation: regelmäßige Verben"],
  [15, "Verb Conjugation (Part 3): Irregular Verbs", "Verbkonjugation: unregelmäßige Verben"],
  [16, "Numbers (Part 3): Above 100", "Zahlen (Teil 3)"],
  [17, "Adjectives and Opposites", "Adjektive und Gegenteile"],
  [18, "How to Introduce Someone Else", "Jemanden vorstellen"],
  [19, "Definite Articles (der, die, das)", "Bestimmte Artikel"],
  [20, "Indefinite Articles", "Unbestimmte Artikel"],
  [21, "Negative Articles (kein/keine)", "Negative Artikel"],
  [22, "Time (Official)", "Uhrzeit (offiziell)"],
  [23, "Time (Unofficial/Colloquial)", "Uhrzeit (inoffiziell)"],
  [24, "Possessive Pronouns (Nominative)", "Possessivpronomen (Nominativ)"],
  [25, "My Family", "Meine Familie"],
  [26, "Accusative Articles", "Akkusativartikel"],
  [27, "Possessive Pronouns (Accusative)", "Possessivpronomen (Akkusativ)"],
  [28, "Modal Verb 'möchten'", "Modalverb: möchten"],
  [29, "W-Fragen (Was? Wo? Wann?)", "W-Fragen"],
  [30, "In a Restaurant", "Im Restaurant"],
  [31, "Personal Pronouns (Accusative)", "Personalpronomen (Akkusativ)"],
  [32, "Dative Articles", "Dativartikel"],
  [33, "Ordinal Numbers", "Ordinalzahlen"],
  [34, "Questions of Time", "Fragen zur Zeit"],
  [35, "Possessive Pronouns (Dative)", "Possessivpronomen (Dativ)"],
  [36, "Personal Pronouns (Dative)", "Personalpronomen (Dativ)"],
  [37, "Separable Verbs", "Trennbare Verben"],
  [38, "Daily Routine", "Tagesablauf"],
  [39, "Imperative Sentences", "Imperativsätze"],
  [40, "Giving Directions", "Wegbeschreibung"],
  [41, "'war' or 'hatte'? (Simple Past of sein/haben)", "Präteritum: war/hatte"],
  [42, "Non-Separable Verbs", "Untrennbare Verben"],
  [43, "Talking About Your Health", "Über Gesundheit sprechen"],
  [44, "Past Perfect 1: Sentence Structure (Perfekt)", "Perfekt (Teil 1): Satzbau"],
  [45, "Past Perfect 2: haben or sein as Helping Verb", "Perfekt (Teil 2): haben oder sein"],
  [46, "Past Perfect 3: Forms (Partizip II)", "Perfekt (Teil 3): Formen"],
  [47, "What Did You Do on Your Vacation?", "Was hast du im Urlaub gemacht?"],
  [48, "In the Supermarket", "Im Supermarkt"],
  [49, "How is the Weather?", "Wie ist das Wetter?"],
  [50, "Fixing Appointments", "Termine vereinbaren"],
  [51, "Letter Writing — Invitation", "Briefe schreiben — Einladung"],
  [52, "Expressing Likes and Dislikes", "Vorlieben ausdrücken"],
  [53, "Interrogative Pronoun 'welch-'", "Fragepronomen: welch-"],
  [54, "Demonstrative Article 'dies-'", "Demonstrativartikel: dies-"],
  [55, "Buying Clothes", "Kleidung kaufen"],
  [56, "Hiring a Taxi", "Ein Taxi nehmen"],
  [57, "Adverbs of Time", "Temporaladverbien"],
  [58, "Telephone Conversations", "Telefongespräche"],
  [59, "At the Doctor's", "Beim Arzt"],
  [60, "Letter Writing — Hotel Reservation", "Briefe schreiben — Hotelreservierung"],
  [61, "Filling Up a Form", "Ein Formular ausfüllen"],
  [62, "The Post Office", "Die Post"],
  [63, "The Bank", "Die Bank"],
  [64, "Looking for an Apartment", "Eine Wohnung suchen"],
  [65, "Buying a Train Ticket", "Eine Zugfahrkarte kaufen"]
];

function lower(value: string): string {
  return value.toLowerCase();
}

function tagsFor(titleEn: string, titleDe: string): string[] {
  const text = lower(`${titleEn} ${titleDe}`);
  const tags: string[] = [];
  if (/listen|audio|time|uhr|telefon|phone|number|zahlen|date|datum|weather|wetter|train|zug/.test(text)) tags.push("hoeren");
  if (/letter|form|schreiben|formular|reservation|invitation|email|post|bank|apartment|wohnung/.test(text)) tags.push("schreiben", "lesen");
  if (/introduc|greeting|phrase|question|wie geht|restaurant|doctor|taxi|appointment|sprechen|kennenlernen/.test(text)) tags.push("sprechen");
  if (/sentence|verb|article|pronoun|akkusativ|dativ|modal|perfekt|imperative|adverb|welch|dies|negativ|possessive|satzbau|artikel|pronomen/.test(text)) tags.push("grammatik");
  if (/family|food|supermarket|clothes|weather|health|restaurant|apartment|post|bank|train|taxi|wohnung|arzt|kleidung/.test(text)) tags.push("wortschatz", "survival");
  return Array.from(new Set(tags.length ? tags : ["study"]));
}

function coreContentFor(titleEn: string, titleDe: string): string[] {
  return [
    `Understand the A1 topic: ${titleEn} / ${titleDe}.`,
    "Learn the essential words, short German patterns, and one or two safe model sentences.",
    "Use the topic in a simple daily-life sentence and one Goethe-style exam task."
  ];
}

function vocabularyFor(titleEn: string, titleDe: string): string[] {
  const text = lower(`${titleEn} ${titleDe}`);
  if (text.includes("greeting")) return ["Guten Morgen", "Guten Tag", "Hallo", "Auf Wiedersehen", "Tschüss"];
  if (text.includes("phrase")) return ["bitte", "danke", "Entschuldigung", "Wie bitte?", "leider"];
  if (text.includes("number") || text.includes("zahlen")) return ["eins", "zwei", "zehn", "zwanzig", "hundert"];
  if (text.includes("time") || text.includes("uhr")) return ["die Uhr", "um", "am", "heute", "morgen"];
  if (text.includes("form")) return ["der Vorname", "der Nachname", "die Adresse", "das Geburtsdatum", "die Telefonnummer"];
  if (text.includes("doctor") || text.includes("arzt")) return ["der Arzt", "krank", "Schmerzen", "das Rezept", "die Apotheke"];
  if (text.includes("train") || text.includes("zug")) return ["der Zug", "die Fahrkarte", "der Bahnhof", "abfahren", "ankommen"];
  if (text.includes("apartment") || text.includes("wohnung")) return ["die Wohnung", "die Miete", "das Zimmer", "suchen", "besichtigen"];
  if (text.includes("restaurant")) return ["die Speisekarte", "bestellen", "zahlen", "das Wasser", "die Rechnung"];
  return [titleDe, titleEn, "bitte", "ich", "Sie"];
}

function examRelevanceFor(tags: string[]): string {
  if (tags.includes("hoeren")) return "Useful for Goethe A1 Hören: catching exact words, numbers, times, prices, dates, and short dialogue details.";
  if (tags.includes("lesen")) return "Useful for Goethe A1 Lesen: recognising signs, forms, ads, notes, and short messages.";
  if (tags.includes("schreiben")) return "Useful for Goethe A1 Schreiben: forms, invitations, short messages, appointments, and practical writing.";
  if (tags.includes("sprechen")) return "Useful for Goethe A1 Sprechen: self-introduction, spelling, simple questions, and short answers.";
  if (tags.includes("grammatik")) return "Useful across all Goethe A1 tasks because accurate word order, articles, cases, and verb forms prevent basic mistakes.";
  return "Useful for Goethe A1 because the topic belongs to the official A1 daily-life communication range.";
}

function dailyLifeFor(tags: string[]): string[] {
  const items = ["Use this topic in real German life with short, safe sentences instead of translating long English sentences."];
  if (tags.includes("survival")) items.push("Directly useful for life in Germany: appointments, offices, shopping, health, travel, housing, or services.");
  if (tags.includes("sprechen")) items.push("Practise saying it aloud because this is likely to happen in face-to-face conversations.");
  return items;
}

function mistakesFor(tags: string[]): string[] {
  const items = ["Translating English word order directly into German."];
  if (tags.includes("grammatik")) items.push("Forgetting verb position, articles, or case endings.");
  if (tags.includes("hoeren")) items.push("Trying to understand every word instead of listening for the key detail.");
  if (tags.includes("schreiben")) items.push("Writing too much; at A1, short correct German is better.");
  if (tags.includes("sprechen")) items.push("Answering in English first instead of using a simple German model sentence.");
  return items;
}

export const germanA1SourceLessons: GermanA1SourceLesson[] = lessonSeed.map(([lessonNo, titleEn, titleDe]) => {
  const tags = tagsFor(titleEn, titleDe);
  return {
    lessonNo,
    titleEn,
    titleDe,
    coreContent: coreContentFor(titleEn, titleDe),
    goetheVocabulary: vocabularyFor(titleEn, titleDe),
    examRelevance: examRelevanceFor(tags),
    dailyLifeExtension: dailyLifeFor(tags),
    commonMistakes: mistakesFor(tags)
  };
});

export function getA1SourceLessonByNo(lessonNo: number): GermanA1SourceLesson | undefined {
  return germanA1SourceLessons.find((lesson) => lesson.lessonNo === lessonNo);
}

export function getA1SourceLessonsForSkill(skillOrText = "", limit = 12): GermanA1SourceLesson[] {
  const text = lower(skillOrText);
  const wantedTags = tagsFor(text, text);
  const scored = germanA1SourceLessons
    .map((lesson) => {
      const lessonTags = tagsFor(lesson.titleEn, lesson.titleDe);
      const haystack = lower([lesson.titleEn, lesson.titleDe, ...lesson.coreContent, ...lesson.goetheVocabulary].join(" "));
      const tagScore = wantedTags.filter((tag) => lessonTags.includes(tag)).length * 3;
      const textScore = text.split(/\s+/).filter((word) => word.length > 3 && haystack.includes(word)).length;
      return { lesson, score: tagScore + textScore };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.lesson.lessonNo - b.lesson.lessonNo);

  return (scored.length ? scored.map((item) => item.lesson) : germanA1SourceLessons).slice(0, limit);
}
