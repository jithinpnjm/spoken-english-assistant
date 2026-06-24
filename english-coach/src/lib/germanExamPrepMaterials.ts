import type { GermanLevel } from "./germanCurriculumRegistry";

export type GermanExamSection = "hoeren" | "lesen" | "schreiben" | "sprechen" | "mock";

export interface GermanExamPrepTask {
  title: string;
  instruction: string;
  sample: string;
  answerHint: string;
}

export interface GermanExamPrepMaterial {
  level: GermanLevel;
  section: GermanExamSection;
  examFormat: string[];
  strategy: string[];
  redemittel: string[];
  tasks: GermanExamPrepTask[];
  mistakeChecklist: string[];
}

const a1Materials: Record<GermanExamSection, GermanExamPrepMaterial> = {
  hoeren: {
    level: "A1",
    section: "hoeren",
    examFormat: [
      "Short announcements, phone calls, appointments, prices, times, names, numbers, places.",
      "You usually need one exact detail, not full translation.",
      "Listen first for context, then for the target detail."
    ],
    strategy: [
      "Before listening, underline the target: time, price, name, place, or yes/no.",
      "Ignore unknown words if the target detail is clear.",
      "Train German numbers daily because this is where A1 learners lose easy marks."
    ],
    redemittel: ["Wie bitte?", "Können Sie das wiederholen?", "Der Termin ist um ...", "Das kostet ... Euro."],
    tasks: [
      { title: "Appointment detail", instruction: "Listen/read and extract only the time.", sample: "Der Termin ist am Dienstag um zehn Uhr.", answerHint: "um zehn Uhr" },
      { title: "Price detail", instruction: "Extract the price.", sample: "Das macht zwölf Euro fünfzig.", answerHint: "12,50 €" },
      { title: "Phone number", instruction: "Write the digits you hear.", sample: "null eins sieben sechs, drei vier ...", answerHint: "0176 34 ..." }
    ],
    mistakeChecklist: ["Do not confuse fünfzehn/fünfzig.", "Do not use am for clock time.", "Do not translate every word while listening."]
  },
  lesen: {
    level: "A1",
    section: "lesen",
    examFormat: [
      "Signs, notices, advertisements, short emails, schedules, opening hours, and simple messages.",
      "Tasks often ask whether information is true/false or which option matches a text.",
      "The answer is usually visible in one sentence or one line."
    ],
    strategy: [
      "Read the question first, then scan the text for the keyword.",
      "Pay attention to negatives: kein, nicht, geschlossen, verboten, nur.",
      "For timetables and signs, numbers and days matter more than full grammar."
    ],
    redemittel: ["geöffnet", "geschlossen", "nur", "ab", "bis", "heute", "morgen", "am Montag"],
    tasks: [
      { title: "Opening hours", instruction: "Find when the office is open.", sample: "Geöffnet: Montag bis Freitag, 9-12 Uhr.", answerHint: "Mon-Fri, 9-12" },
      { title: "Notice", instruction: "Decide if you can enter.", sample: "Heute geschlossen.", answerHint: "No, it is closed today." },
      { title: "Message", instruction: "Find what the person wants.", sample: "Kannst du bitte Brot kaufen?", answerHint: "Buy bread." }
    ],
    mistakeChecklist: ["Do not read word by word first.", "Do not ignore negative words.", "Do not choose an answer that is only almost the same." ]
  },
  schreiben: {
    level: "A1",
    section: "schreiben",
    examFormat: [
      "Form filling with personal details.",
      "Short message: invitation, reply, appointment, reservation, apology, or request.",
      "Usually 3-5 short sentences are enough."
    ],
    strategy: [
      "Use fixed sentence blocks. Accuracy beats length.",
      "Always cover all bullet points from the task.",
      "Check greeting, verb position, date/time, request, and closing."
    ],
    redemittel: ["Liebe/Lieber ...", "ich lade dich ein", "Kannst du kommen?", "Ich habe einen Termin", "Viele Grüße", "Mit freundlichen Grüßen"],
    tasks: [
      { title: "Form", instruction: "Fill personal details correctly.", sample: "Vorname, Nachname, Adresse, Geburtsdatum, Nationalität", answerHint: "Do not confuse Vorname/Nachname." },
      { title: "Invitation", instruction: "Write a short birthday invitation.", sample: "Invite Max on Saturday at 18:00.", answerHint: "Lieber Max, ich lade dich ..." },
      { title: "Appointment", instruction: "Write that you cannot come and ask for a new appointment.", sample: "You are sick tomorrow.", answerHint: "Leider kann ich morgen nicht kommen ..." }
    ],
    mistakeChecklist: ["Do not write long English-style sentences.", "Do not forget comma after greeting.", "Do not miss any task bullet point." ]
  },
  sprechen: {
    level: "A1",
    section: "sprechen",
    examFormat: [
      "Part 1: introduce yourself.",
      "Part 2: ask and answer simple topic-card questions.",
      "Part 3: make a request or react to a request."
    ],
    strategy: [
      "Prepare a safe self-introduction and practise it until automatic.",
      "For topic cards, make one simple question: Haben Sie ...? Wo ist ...? Wann ...?",
      "If you forget a word, simplify. Do not go silent."
    ],
    redemittel: ["Ich heiße ...", "Ich komme aus ...", "Ich wohne in ...", "Ich arbeite als ...", "Haben Sie ...?", "Können Sie bitte ...?"],
    tasks: [
      { title: "Self introduction", instruction: "Say 6 facts about yourself.", sample: "Name, country, city, job, family, hobby.", answerHint: "Use memorized A1 sentences." },
      { title: "Ask a question", instruction: "Make a question for the topic Essen.", sample: "Topic card: Essen", answerHint: "Was essen Sie gern?" },
      { title: "Request", instruction: "Ask someone to repeat slowly.", sample: "You did not understand.", answerHint: "Können Sie das bitte langsam wiederholen?" }
    ],
    mistakeChecklist: ["Do not use du with examiner unless told.", "Do not answer with one word only.", "Do not overcomplicate your sentences." ]
  },
  mock: {
    level: "A1",
    section: "mock",
    examFormat: ["Mini run across Hören, Lesen, Schreiben, and Sprechen.", "Use a timer and do not pause between sections.", "Review mistakes after the full run."],
    strategy: ["Do the mock in one sitting.", "Mark every mistake by section.", "Return to the exact book lesson that fixes the mistake."],
    redemittel: ["Prüfung starten", "Antwort prüfen", "Fehler wiederholen"],
    tasks: [
      { title: "Full mini mock", instruction: "Complete one task from each section.", sample: "Hören + Lesen + Schreiben + Sprechen", answerHint: "Review after all parts." }
    ],
    mistakeChecklist: ["Stopping too early.", "Reviewing only grammar, not listening/reading strategy.", "Not repeating corrected sentences aloud." ]
  }
};

export function getGermanExamPrepMaterial(level: GermanLevel, section: GermanExamSection): GermanExamPrepMaterial {
  if (level === "A1") return a1Materials[section];
  return {
    ...a1Materials[section],
    level,
    examFormat: [`${level} exam prep is currently scaffolded from A1 strategy and should be expanded with ${level}-specific material.`, ...a1Materials[section].examFormat],
  };
}
