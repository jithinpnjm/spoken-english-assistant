export interface GermanA1BookLesson {
  lessonNo: number;
  titleEn: string;
  titleDe: string;
  introduction: string;
  theRule: string[];
  formula: string[];
  grammarTable?: { headers: string[]; rows: string[][] };
  vocabulary: Array<{ de: string; en: string; example: string; exampleEn: string }>;
  modelSentences: Array<{ de: string; en: string; breakdown: string }>;
  culturalNote: string;
  exercises: Array<{
    type: "fill_blank" | "reorder" | "translate" | "choose";
    instruction: string;
    items: Array<{ prompt: string; answer: string; hint?: string }>;
  }>;
  commonMistakes: Array<{ wrong: string; right: string; explanation: string }>;
  skyPracticePrompts: string[];
  examRelevance: string;
  lessonGoal: string;
}

type LessonSeed = [number, string, string, string];

const lessonSeeds: LessonSeed[] = [
  [1, "Greetings", "Begrüßungen", "speaking"],
  [2, "Common Phrases", "Häufige Redemittel", "speaking"],
  [3, "Numbers Part 1: 1–20", "Zahlen Teil 1: 1–20", "numbers"],
  [4, "Numbers Part 2: 20–100", "Zahlen Teil 2: 20–100", "numbers"],
  [5, "Alphabet", "Alphabet", "speaking"],
  [6, "Introducing Yourself", "Sich vorstellen", "speaking"],
  [7, "Getting to Know Someone", "Jemanden kennenlernen", "speaking"],
  [8, "Wie geht's?", "Wie geht's?", "speaking"],
  [9, "Sentence Structure Part 1", "Satzbau Teil 1", "grammar"],
  [10, "Sentence Structure Part 2", "Satzbau Teil 2", "grammar"],
  [11, "Pronouns Overview", "Pronomen", "grammar"],
  [12, "Verb Conjugation: haben and sein", "Verbkonjugation: haben und sein", "grammar"],
  [13, "Regular and Irregular Verbs", "Regelmäßige und unregelmäßige Verben", "grammar"],
  [14, "Regular Verb Conjugation", "Regelmäßige Verben konjugieren", "grammar"],
  [15, "Irregular Verb Conjugation", "Unregelmäßige Verben konjugieren", "grammar"],
  [16, "Numbers Part 3: Above 100", "Zahlen Teil 3: Über 100", "numbers"],
  [17, "Adjectives and Opposites", "Adjektive und Gegenteile", "vocabulary"],
  [18, "Introducing Someone Else", "Jemanden vorstellen", "speaking"],
  [19, "Definite Articles", "Bestimmte Artikel", "grammar"],
  [20, "Indefinite Articles", "Unbestimmte Artikel", "grammar"],
  [21, "Negative Articles", "Negative Artikel", "grammar"],
  [22, "Official Time", "Uhrzeit offiziell", "time"],
  [23, "Unofficial Time", "Uhrzeit inoffiziell", "time"],
  [24, "Possessive Pronouns Nominative", "Possessivpronomen im Nominativ", "grammar"],
  [25, "My Family", "Meine Familie", "vocabulary"],
  [26, "Accusative Articles", "Akkusativartikel", "grammar"],
  [27, "Possessive Pronouns Accusative", "Possessivpronomen im Akkusativ", "grammar"],
  [28, "Modal Verb möchten", "Modalverb möchten", "grammar"],
  [29, "W-Questions", "W-Fragen", "speaking"],
  [30, "In a Restaurant", "Im Restaurant", "survival"],
  [31, "Personal Pronouns Accusative", "Personalpronomen im Akkusativ", "grammar"],
  [32, "Dative Articles", "Dativartikel", "grammar"],
  [33, "Ordinal Numbers", "Ordinalzahlen", "numbers"],
  [34, "Questions of Time", "Fragen zur Zeit", "time"],
  [35, "Possessive Pronouns Dative", "Possessivpronomen im Dativ", "grammar"],
  [36, "Personal Pronouns Dative", "Personalpronomen im Dativ", "grammar"],
  [37, "Separable Verbs", "Trennbare Verben", "grammar"],
  [38, "Daily Routine", "Tagesablauf", "survival"],
  [39, "Imperative Sentences", "Imperativsätze", "grammar"],
  [40, "Giving Directions", "Wegbeschreibung", "survival"],
  [41, "war / hatte", "Präteritum von sein und haben", "past"],
  [42, "Non-Separable Verbs", "Untrennbare Verben", "grammar"],
  [43, "Talking About Health", "Über Gesundheit sprechen", "survival"],
  [44, "Perfekt Part 1: Sentence Structure", "Perfekt Teil 1: Satzbau", "past"],
  [45, "Perfekt Part 2: haben or sein", "Perfekt Teil 2: haben oder sein", "past"],
  [46, "Perfekt Part 3: Partizip II", "Perfekt Teil 3: Partizip II", "past"],
  [47, "Vacation in the Past", "Was hast du im Urlaub gemacht?", "past"],
  [48, "In the Supermarket", "Im Supermarkt", "survival"],
  [49, "Weather", "Das Wetter", "survival"],
  [50, "Fixing Appointments", "Termine vereinbaren", "survival"],
  [51, "Letter Writing: Invitation", "Briefeschreiben: Einladung", "writing"],
  [52, "Likes and Dislikes", "Vorlieben ausdrücken", "speaking"],
  [53, "Interrogative Pronoun welch-", "Fragepronomen welch-", "grammar"],
  [54, "Demonstrative Article dies-", "Demonstrativartikel dies-", "grammar"],
  [55, "Buying Clothes", "Kleidung kaufen", "survival"],
  [56, "Hiring a Taxi", "Mit dem Taxi fahren", "survival"],
  [57, "Adverbs of Time", "Temporaladverbien", "time"],
  [58, "Telephone Conversations", "Telefongespräche", "speaking"],
  [59, "At the Doctor's", "Beim Arzt", "survival"],
  [60, "Letter Writing: Hotel Reservation", "Briefeschreiben: Hotelreservierung", "writing"],
  [61, "Filling Up a Form", "Ein Formular ausfüllen", "writing"],
  [62, "The Post Office", "Die Post", "survival"],
  [63, "The Bank", "Die Bank", "survival"],
  [64, "Looking for an Apartment", "Eine Wohnung suchen", "survival"],
  [65, "Buying a Train Ticket", "Eine Zugfahrkarte kaufen", "survival"]
];

const categoryVocabulary: Record<string, GermanA1BookLesson["vocabulary"]> = {
  speaking: [
    { de: "Guten Tag", en: "good day", example: "Guten Tag, ich heiße Jithin.", exampleEn: "Good day, my name is Jithin." },
    { de: "bitte", en: "please", example: "Sprechen Sie bitte langsam.", exampleEn: "Please speak slowly." },
    { de: "Wie bitte?", en: "pardon?", example: "Wie bitte? Können Sie das wiederholen?", exampleEn: "Pardon? Can you repeat that?" }
  ],
  grammar: [
    { de: "der Satz", en: "sentence", example: "Der Satz ist kurz.", exampleEn: "The sentence is short." },
    { de: "das Verb", en: "verb", example: "Das Verb steht auf Position zwei.", exampleEn: "The verb is in position two." },
    { de: "der Artikel", en: "article", example: "Der Artikel ist wichtig.", exampleEn: "The article is important." }
  ],
  numbers: [
    { de: "die Zahl", en: "number", example: "Die Zahl ist vierundzwanzig.", exampleEn: "The number is twenty-four." },
    { de: "kosten", en: "to cost", example: "Das kostet zwölf Euro.", exampleEn: "That costs twelve euros." },
    { de: "der Euro", en: "euro", example: "Ich bezahle zehn Euro.", exampleEn: "I pay ten euros." }
  ],
  time: [
    { de: "um", en: "at", example: "Der Termin ist um zehn Uhr.", exampleEn: "The appointment is at ten o'clock." },
    { de: "am", en: "on", example: "Der Kurs ist am Montag.", exampleEn: "The course is on Monday." },
    { de: "der Termin", en: "appointment", example: "Ich habe einen Termin.", exampleEn: "I have an appointment." }
  ],
  survival: [
    { de: "Ich möchte", en: "I would like", example: "Ich möchte eine Fahrkarte.", exampleEn: "I would like a ticket." },
    { de: "Ich brauche", en: "I need", example: "Ich brauche Hilfe.", exampleEn: "I need help." },
    { de: "Wo ist ...?", en: "Where is ...?", example: "Wo ist der Bahnhof?", exampleEn: "Where is the train station?" }
  ],
  writing: [
    { de: "Liebe Grüße", en: "kind regards", example: "Liebe Grüße, Jithin", exampleEn: "Kind regards, Jithin" },
    { de: "Sehr geehrte Damen und Herren", en: "Dear Sir or Madam", example: "Sehr geehrte Damen und Herren, ich habe eine Frage.", exampleEn: "Dear Sir or Madam, I have a question." },
    { de: "die Einladung", en: "invitation", example: "Danke für die Einladung.", exampleEn: "Thank you for the invitation." }
  ],
  past: [
    { de: "gestern", en: "yesterday", example: "Gestern war ich krank.", exampleEn: "Yesterday I was sick." },
    { de: "ich habe gemacht", en: "I did/made", example: "Ich habe Sport gemacht.", exampleEn: "I did sports." },
    { de: "ich bin gefahren", en: "I went/travelled", example: "Ich bin nach Berlin gefahren.", exampleEn: "I travelled to Berlin." }
  ],
  vocabulary: [
    { de: "groß", en: "big/tall", example: "Das Zimmer ist groß.", exampleEn: "The room is big." },
    { de: "klein", en: "small", example: "Die Tasche ist klein.", exampleEn: "The bag is small." },
    { de: "wichtig", en: "important", example: "Deutsch ist wichtig.", exampleEn: "German is important." }
  ]
};

function categoryRules(category: string, titleEn: string): string[] {
  if (category === "grammar") return [
    "Do not memorize only the English meaning. Notice the German form: verb position, article, case, and ending.",
    "For A1, short correct sentences are better than long translated English sentences.",
    "After every rule, build one sentence with ich, one with du/Sie, and one with er/sie/es."
  ];
  if (category === "survival") return [
    "Learn one polite request, one question, and one emergency fallback sentence for this situation.",
    "Use Sie with strangers, doctors, taxi drivers, shop staff, and officials.",
    "If you do not understand, say: Können Sie das bitte wiederholen?"
  ];
  if (category === "writing") return [
    "Use a fixed opening, two short content sentences, one request, and a fixed closing.",
    "At A1, do not write long complex sentences. Keep the message clear and correct.",
    "Always check greeting, comma, verb position, time/date, and closing."
  ];
  if (category === "time" || category === "numbers") return [
    "Train your ear and mouth. Numbers and times must become automatic.",
    "In German, many numbers from 21 to 99 are spoken unit first, then tens.",
    "For appointments, use um for clock time and am for days or dates."
  ];
  return [
    `Use ${titleEn.toLowerCase()} first in a model sentence, then in your own real-life sentence.`,
    "Memorize the safest sentence before trying variations.",
    "Practise aloud with the Live coach until pronunciation and word order are stable."
  ];
}

function categoryFormula(category: string): string[] {
  if (category === "grammar") return ["Subject + conjugated verb + rest", "Question word + verb + subject + rest", "Article + noun + correct case ending"];
  if (category === "writing") return ["Greeting + comma", "Reason / information", "Request", "Closing + name"];
  if (category === "survival") return ["Ich möchte bitte + noun", "Können Sie bitte + infinitive?", "Wo ist + place?"];
  if (category === "past") return ["haben/sein in position 2 + Partizip II at the end", "Gestern + verb position 2 + subject + rest", "war/hatte for sein/haben in spoken past"];
  return ["Model sentence", "Change one word", "Say it aloud", "Use it in a real situation"];
}

function grammarTableFor(category: string): GermanA1BookLesson["grammarTable"] | undefined {
  if (category === "grammar") return {
    headers: ["Focus", "Safe A1 pattern", "Example"],
    rows: [["Statement", "Subject + verb + rest", "Ich lerne Deutsch."], ["Question", "W-word + verb + subject", "Wo wohnst du?"], ["Formal", "Verb + Sie + rest", "Sprechen Sie Deutsch?"]]
  };
  if (category === "numbers") return {
    headers: ["Number type", "German pattern", "Example"],
    rows: [["21-99", "unit + und + tens", "vierundzwanzig"], ["price", "Euro + cents", "zwölf Euro fünfzig"], ["large number", "hundert/tausend blocks", "eintausendzweihundert"]]
  };
  if (category === "time") return {
    headers: ["Meaning", "German", "Example"],
    rows: [["at time", "um", "um 10 Uhr"], ["on day/date", "am", "am Montag"], ["from-to", "von ... bis", "von 9 bis 17 Uhr"]]
  };
  return undefined;
}

function modelSentencesFor(category: string, titleEn: string): GermanA1BookLesson["modelSentences"] {
  const base = category === "writing"
    ? ["Liebe Anna, ich lade dich zu meiner Party ein.", "Kannst du am Samstag kommen?", "Viele Grüße, Jithin"]
    : category === "survival"
      ? ["Guten Tag, ich brauche Hilfe.", "Können Sie das bitte wiederholen?", "Wo ist der Bahnhof?"]
      : category === "grammar"
        ? ["Ich lerne Deutsch.", "Lernst du Deutsch?", "Ich habe einen Termin."]
        : category === "past"
          ? ["Gestern war ich zu Hause.", "Ich habe Kaffee getrunken.", "Wir sind nach Berlin gefahren."]
          : ["Guten Tag, ich heiße Jithin.", "Ich komme aus Indien.", "Ich wohne in Berlin."];
  return base.map((de) => ({ de, en: "Safe A1 model sentence for this lesson.", breakdown: `Use this as a repeatable sentence while studying ${titleEn}. Focus on verb position and pronunciation.` }));
}

function commonMistakesFor(category: string): GermanA1BookLesson["commonMistakes"] {
  const shared = [{ wrong: "I translate the full English sentence directly.", right: "I use a short German model sentence.", explanation: "Direct translation creates wrong word order. Start from a German pattern." }];
  if (category === "grammar") return [...shared, { wrong: "Ich Deutsch lerne.", right: "Ich lerne Deutsch.", explanation: "In a normal German statement, the conjugated verb is in position two." }];
  if (category === "writing") return [...shared, { wrong: "Long paragraph with many English-style clauses.", right: "Short A1 message with greeting, reason, request, closing.", explanation: "A1 writing rewards clarity and correctness more than long sentences." }];
  if (category === "survival") return [...shared, { wrong: "du with strangers", right: "Sie with strangers", explanation: "Use formal Sie in shops, offices, taxis, clinics, and public services." }];
  return shared;
}

function buildLesson([lessonNo, titleEn, titleDe, category]: LessonSeed): GermanA1BookLesson {
  const vocabulary = categoryVocabulary[category] || categoryVocabulary.speaking;
  return {
    lessonNo,
    titleEn,
    titleDe,
    introduction: `${titleEn} is an A1 building block for Goethe exam tasks and real life in Germany. The original Gemini lesson gives the core textbook structure; this enriched version keeps the useful rules but simplifies the learning path for a brand-new German learner. First understand the English idea, then memorize a short German model, then practise it aloud and in writing.`,
    theRule: categoryRules(category, titleEn),
    formula: categoryFormula(category),
    grammarTable: grammarTableFor(category),
    vocabulary,
    modelSentences: modelSentencesFor(category, titleEn),
    culturalNote: category === "survival" ? "In Germany, short polite sentences work better than over-explaining. Say what you need, use bitte, and ask for repetition when needed." : "German learning becomes easier when you connect each rule to a real situation: appointment, form, shop, train, doctor, neighbour, or office.",
    exercises: [
      { type: "translate", instruction: `Translate or produce one safe A1 sentence for ${titleEn}.`, items: [{ prompt: "I need help.", answer: "Ich brauche Hilfe.", hint: "Use ich + verb + object." }] },
      { type: "fill_blank", instruction: "Fill the missing German word.", items: [{ prompt: "Können Sie das bitte ___?", answer: "wiederholen", hint: "repeat = wiederholen" }] }
    ],
    commonMistakes: commonMistakesFor(category),
    skyPracticePrompts: [
      `Ask the German Live Coach: Teach me ${titleEn} in very simple English and drill me in German.`,
      `Ask the German Live Coach: Give me five A1 sentences for ${titleDe} and correct my pronunciation.`,
      `Ask the German Live Coach: Test me Goethe A1 style on ${titleEn}.`
    ],
    examRelevance: category === "writing" ? "Goethe A1 Schreiben: use this topic for short forms, notes, invitations, reservations, or practical messages." : category === "speaking" ? "Goethe A1 Sprechen: use this topic for introductions, questions, answers, spelling, and roleplay." : category === "survival" ? "Goethe A1 Hören/Lesen/Sprechen: this topic appears in everyday service situations and short dialogues." : "Goethe A1 all parts: this grammar or vocabulary improves accuracy across listening, reading, writing, and speaking.",
    lessonGoal: `After this lesson, you can understand ${titleEn.toLowerCase()} and produce at least three correct A1 German sentences about it.`
  };
}

export const germanA1BookLessons: GermanA1BookLesson[] = lessonSeeds.map(buildLesson);

export function getA1BookLessonByNo(lessonNo: number): GermanA1BookLesson | undefined {
  return germanA1BookLessons.find((lesson) => lesson.lessonNo === lessonNo);
}

function normalize(value: string): string {
  return value.toLowerCase();
}

export function findRelatedA1BookLessons(query: string, limit = 8): GermanA1BookLesson[] {
  const terms = normalize(query).split(/[^a-zA-ZäöüÄÖÜß0-9]+/).filter((term) => term.length > 2);
  const scored = germanA1BookLessons.map((lesson) => {
    const haystack = normalize([lesson.titleEn, lesson.titleDe, lesson.introduction, lesson.lessonGoal, lesson.examRelevance, lesson.theRule.join(" "), lesson.formula.join(" "), lesson.vocabulary.map((item) => `${item.de} ${item.en}`).join(" ")].join(" "));
    const score = terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
    return { lesson, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.lesson.lessonNo - b.lesson.lessonNo);
  return (scored.length ? scored.map((item) => item.lesson) : germanA1BookLessons).slice(0, limit);
}
