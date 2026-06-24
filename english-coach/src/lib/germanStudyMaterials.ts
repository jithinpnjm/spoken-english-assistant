import type { GermanLevel, GermanSubtopic } from "./germanCurriculumRegistry";

export interface GermanStudyExample {
  de: string;
  en: string;
  note?: string;
}

export interface GermanVocabularyItem {
  de: string;
  en: string;
  example?: string;
}

export interface GermanStudyMaterial {
  id: string;
  level: GermanLevel;
  subtopicId: string;
  lessonGoal: string;
  simpleExplanation: string[];
  germanPattern: string[];
  wordByWord: GermanStudyExample[];
  vocabulary: GermanVocabularyItem[];
  modelExamples: GermanStudyExample[];
  commonMistakes: string[];
  miniDrills: string[];
  speakingPrompts: string[];
  writingOrListeningTask: string;
  repeatWithLiveAgent: string[];
}

const specificStudyMaterials: Record<string, GermanStudyMaterial> = {
  "a1-hoeren-time-numbers": {
    id: "study-a1-hoeren-time-numbers",
    level: "A1",
    subtopicId: "a1-hoeren-time-numbers",
    lessonGoal: "Understand appointment times, phone numbers, prices, and simple dates in German audio.",
    simpleExplanation: [
      "In Germany, appointments, train announcements, shop prices, and phone numbers are usually said quickly.",
      "At A1, you do not need to understand every word. Your first goal is to catch exact details: time, date, number, place, and price.",
      "When you hear a time, listen for the small word before it. um means at an exact time. am means on a day or date."
    ],
    germanPattern: [
      "Termin + um + time: Der Termin ist um 10 Uhr.",
      "Termin + am + day/date: Der Termin ist am Montag.",
      "Price: Das kostet 12 Euro 50.",
      "Phone number: Meine Telefonnummer ist ..."
    ],
    wordByWord: [
      { de: "Der Termin ist um 10 Uhr.", en: "The appointment is at 10 o'clock.", note: "um = at an exact time" },
      { de: "Der Termin ist am Montag.", en: "The appointment is on Monday.", note: "am = on a day/date" },
      { de: "Das kostet zwölf Euro fünfzig.", en: "That costs twelve euros fifty.", note: "Prices may be spoken as Euro + cents." }
    ],
    vocabulary: [
      { de: "der Termin", en: "appointment", example: "Ich habe einen Termin." },
      { de: "um", en: "at", example: "um 10 Uhr" },
      { de: "am", en: "on", example: "am Montag" },
      { de: "die Telefonnummer", en: "phone number", example: "Meine Telefonnummer ist ..." },
      { de: "der Euro", en: "euro", example: "Das kostet 10 Euro." }
    ],
    modelExamples: [
      { de: "Ich habe morgen um 9 Uhr einen Termin.", en: "I have an appointment tomorrow at 9 o'clock." },
      { de: "Die Praxis ist am Freitag geschlossen.", en: "The clinic is closed on Friday." },
      { de: "Meine Telefonnummer ist null eins sieben sechs ...", en: "My phone number is 0176 ..." }
    ],
    commonMistakes: [
      "Using am for clock time. Say um 10 Uhr, not am 10 Uhr.",
      "Missing the difference between fünfzehn and fünfzig.",
      "Trying to translate every word instead of catching the key number/time."
    ],
    miniDrills: [
      "Translate: The appointment is at 8 o'clock.",
      "Choose: am or um — Der Termin ist ___ Dienstag.",
      "Choose: am or um — Der Termin ist ___ 14 Uhr.",
      "Write one sentence with Telefonnummer."
    ],
    speakingPrompts: [
      "Say your appointment time in German.",
      "Ask: When is the appointment?",
      "Say a fake German phone number slowly."
    ],
    writingOrListeningTask: "Listen for or read one short appointment sentence and extract only the time/date/number. Do not translate everything.",
    repeatWithLiveAgent: [
      "Der Termin ist um 10 Uhr.",
      "Der Termin ist am Montag.",
      "Können Sie das bitte wiederholen?"
    ]
  },
  "a1-schreiben-form": {
    id: "study-a1-schreiben-form",
    level: "A1",
    subtopicId: "a1-schreiben-form",
    lessonGoal: "Fill basic German forms with personal information correctly.",
    simpleExplanation: [
      "German A1 exams and real German life both require form filling.",
      "You should be able to write your name, address, date of birth, nationality, phone number, and email clearly.",
      "Most mistakes are not grammar mistakes; they are field-understanding mistakes. Learn what each field asks for."
    ],
    germanPattern: [
      "Name: Jithin Joseph",
      "Adresse: Straße + Hausnummer, PLZ + Stadt",
      "Geburtsdatum: TT.MM.JJJJ",
      "Nationalität: indisch",
      "Telefonnummer: +49 ..."
    ],
    wordByWord: [
      { de: "Vorname", en: "first name" },
      { de: "Nachname / Familienname", en: "last name / family name" },
      { de: "Geburtsdatum", en: "date of birth" },
      { de: "Staatsangehörigkeit", en: "nationality/citizenship" }
    ],
    vocabulary: [
      { de: "der Vorname", en: "first name" },
      { de: "der Nachname", en: "last name" },
      { de: "die Adresse", en: "address" },
      { de: "die Postleitzahl", en: "postal code" },
      { de: "die Staatsangehörigkeit", en: "nationality" }
    ],
    modelExamples: [
      { de: "Vorname: Jithin", en: "First name: Jithin" },
      { de: "Nachname: Joseph", en: "Last name: Joseph" },
      { de: "Nationalität: indisch", en: "Nationality: Indian" }
    ],
    commonMistakes: [
      "Writing full address into the wrong field.",
      "Confusing Vorname and Nachname.",
      "Writing India instead of indisch when nationality is requested."
    ],
    miniDrills: [
      "What does Vorname mean?",
      "What does PLZ mean?",
      "Write a fake form line for Telefonnummer.",
      "Write Nationalität for Indian."
    ],
    speakingPrompts: [
      "Spell your first name in German letters.",
      "Say your phone number slowly.",
      "Ask someone to repeat a form question."
    ],
    writingOrListeningTask: "Fill a mini-form with name, address, date of birth, nationality, and phone number.",
    repeatWithLiveAgent: [
      "Mein Vorname ist Jithin.",
      "Mein Nachname ist Joseph.",
      "Meine Nationalität ist indisch."
    ]
  },
  "a2-schreiben-problem-email": {
    id: "study-a2-problem-email",
    level: "A2",
    subtopicId: "a2-schreiben-problem-email",
    lessonGoal: "Write a short polite email about a problem, cancellation, or new appointment.",
    simpleExplanation: [
      "A2 writing often asks you to explain a small real-life problem in a polite way.",
      "You need a greeting, the problem, the reason, a request, and a closing.",
      "The safest structure is short and clear. Do not write long complicated sentences."
    ],
    germanPattern: [
      "Sehr geehrte Damen und Herren,",
      "leider kann ich nicht kommen, weil ...",
      "Könnten Sie mir bitte einen neuen Termin geben?",
      "Mit freundlichen Grüßen"
    ],
    wordByWord: [
      { de: "leider", en: "unfortunately" },
      { de: "weil ich krank bin", en: "because I am sick", note: "verb goes to the end after weil" },
      { de: "Könnten Sie bitte ...?", en: "Could you please ...?", note: "polite request" }
    ],
    vocabulary: [
      { de: "leider", en: "unfortunately" },
      { de: "absagen", en: "to cancel" },
      { de: "verschieben", en: "to postpone/reschedule" },
      { de: "der neue Termin", en: "new appointment" },
      { de: "Mit freundlichen Grüßen", en: "Kind regards" }
    ],
    modelExamples: [
      { de: "Leider kann ich morgen nicht zum Termin kommen, weil ich krank bin.", en: "Unfortunately I cannot come to the appointment tomorrow because I am sick." },
      { de: "Könnten Sie mir bitte einen neuen Termin geben?", en: "Could you please give me a new appointment?" }
    ],
    commonMistakes: [
      "Putting the verb in the wrong place after weil.",
      "Writing too informal for an office/doctor email.",
      "Forgetting to ask clearly what you want."
    ],
    miniDrills: [
      "Complete: Leider kann ich nicht kommen, weil ich krank ___.",
      "Write one polite request with Könnten Sie bitte.",
      "Rewrite: Ich bin krank. Ich kann nicht kommen. Use weil."
    ],
    speakingPrompts: [
      "Say you cannot come because you are sick.",
      "Ask politely for a new appointment.",
      "Say you want to reschedule the appointment."
    ],
    writingOrListeningTask: "Write a 40-60 word email cancelling an appointment and asking for a new one.",
    repeatWithLiveAgent: [
      "Leider kann ich nicht kommen, weil ich krank bin.",
      "Könnten Sie mir bitte einen neuen Termin geben?",
      "Mit freundlichen Grüßen"
    ]
  },
  "b1-schreiben-opinion-email": {
    id: "study-b1-opinion-writing",
    level: "B1",
    subtopicId: "b1-schreiben-opinion-email",
    lessonGoal: "Write a structured B1 opinion with a reason, example, and conclusion.",
    simpleExplanation: [
      "B1 writing expects you to express an opinion clearly, not just write isolated sentences.",
      "Use fixed Redemittel to reduce grammar risk: Meiner Meinung nach, Ich finde, dass, Ein Vorteil ist, dass, Zum Schluss.",
      "A safe B1 answer has: opinion, reason, example, maybe advantage/disadvantage, short conclusion."
    ],
    germanPattern: [
      "Meiner Meinung nach + verb ...",
      "Ich finde, dass + subject + ... + verb at the end.",
      "Ein Vorteil ist, dass ...",
      "Zum Schluss möchte ich sagen, dass ..."
    ],
    wordByWord: [
      { de: "Meiner Meinung nach ist Deutsch wichtig.", en: "In my opinion, German is important.", note: "verb comes after the fronted phrase" },
      { de: "Ich finde, dass Deutsch im Alltag hilft.", en: "I think that German helps in daily life.", note: "verb at the end after dass" }
    ],
    vocabulary: [
      { de: "Meiner Meinung nach", en: "in my opinion" },
      { de: "der Vorteil", en: "advantage" },
      { de: "der Nachteil", en: "disadvantage" },
      { de: "zum Beispiel", en: "for example" },
      { de: "zum Schluss", en: "in conclusion" }
    ],
    modelExamples: [
      { de: "Meiner Meinung nach ist Deutsch sehr wichtig für das Leben in Deutschland.", en: "In my opinion, German is very important for life in Germany." },
      { de: "Ein Vorteil ist, dass man Briefe und Termine besser versteht.", en: "One advantage is that you understand letters and appointments better." }
    ],
    commonMistakes: [
      "Forgetting verb position after Meiner Meinung nach.",
      "Using dass but not sending the verb to the end.",
      "Writing an opinion without a reason or example."
    ],
    miniDrills: [
      "Write one sentence starting with Meiner Meinung nach.",
      "Write one dass sentence about learning German.",
      "Write one advantage of speaking German in Germany."
    ],
    speakingPrompts: [
      "Give your opinion about learning German.",
      "Say one advantage and one disadvantage of online learning.",
      "End with a short conclusion."
    ],
    writingOrListeningTask: "Write an 80-word B1 opinion post about whether German is important for living in Germany.",
    repeatWithLiveAgent: [
      "Meiner Meinung nach ist Deutsch wichtig.",
      "Ein Vorteil ist, dass man mehr versteht.",
      "Zum Schluss möchte ich sagen, dass Deutsch im Alltag hilft."
    ]
  }
};

export function buildGermanStudyMaterial(level: GermanLevel, subtopic: GermanSubtopic): GermanStudyMaterial {
  const specific = specificStudyMaterials[subtopic.id];
  if (specific) return specific;

  const grammar = subtopic.grammarFocus.length ? subtopic.grammarFocus : ["basic sentence structure"];
  const vocabulary = subtopic.vocabularyFocus.length ? subtopic.vocabularyFocus : [subtopic.title];

  return {
    id: `study-${subtopic.id}`,
    level,
    subtopicId: subtopic.id,
    lessonGoal: `Learn to use ${subtopic.title.toLowerCase()} in simple German for daily life and Goethe-style tasks.`,
    simpleExplanation: [
      subtopic.description,
      "Start by understanding the meaning in English. Then learn the German pattern. Finally, repeat short German sentences until they feel automatic.",
      "Do not try to make long sentences first. For German A1/A2, short correct sentences are better than long broken sentences."
    ],
    germanPattern: grammar.map((item) => `${item}: learn the pattern, then make one short sentence.`),
    wordByWord: [
      { de: subtopic.title, en: "topic phrase", note: "Use this as the anchor for the lesson." }
    ],
    vocabulary: vocabulary.map((item) => ({ de: item, en: "learn and translate this item", example: `Use ${item} in one short sentence.` })),
    modelExamples: [
      { de: "Ich lerne Deutsch.", en: "I am learning German." },
      { de: "Können Sie das bitte wiederholen?", en: "Can you please repeat that?" },
      { de: "Ich brauche Hilfe.", en: "I need help." }
    ],
    commonMistakes: [
      "Trying to translate word-for-word from English.",
      "Forgetting the conjugated verb position.",
      "Skipping articles such as der, die, das, ein, eine."
    ],
    miniDrills: [
      "Write one sentence with the first vocabulary item.",
      "Say the model sentence aloud three times.",
      "Change one word in the model sentence and say it again."
    ],
    speakingPrompts: [
      "Say one sentence about yourself using this topic.",
      "Ask one simple question using this topic.",
      "Repeat the corrected sentence after the live teacher."
    ],
    writingOrListeningTask: subtopic.goetheUse,
    repeatWithLiveAgent: [
      "Ich lerne Deutsch.",
      "Bitte langsam.",
      "Können Sie das bitte wiederholen?"
    ]
  };
}
