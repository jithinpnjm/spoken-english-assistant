export interface GermanA2ExamPart {
  teil: number;
  points: number;
  task: string;
}

export interface GermanA2ExamModule {
  name: "Lesen" | "Hören" | "Schreiben" | "Sprechen";
  english: string;
  durationMinutes: number;
  points: number;
  parts: GermanA2ExamPart[];
}

export interface GermanA2SurvivalModule {
  id: string;
  titleEn: string;
  titleDe: string;
  whyNeeded: string;
  coreContent: string[];
  keyVocabulary: string[];
  practicalTips: string[];
}

export interface GermanA2WordGroup {
  id: string;
  titleEn: string;
  titleDe: string;
  examples: string[];
  examUse: string;
  dailyLifeUse: string;
}

export const germanA2ExamFramework = {
  fullName: "Goethe-Zertifikat A2",
  cefrLevel: "A2",
  passingScore: "60 of 100 total points, plus minimum 45 of 75 across Lesen+Hören+Schreiben and minimum 15 of 25 in Sprechen.",
  scoringNote: "Lesen, Hören, and Schreiben raw scores out of 20 are multiplied by 1.25 to convert to 25 points each; Sprechen is scored directly out of 25.",
  modules: [
    {
      name: "Lesen",
      english: "Reading",
      durationMinutes: 30,
      points: 25,
      parts: [
        { teil: 1, points: 5, task: "Read a text and answer 5 statements with 3 multiple-choice options." },
        { teil: 2, points: 5, task: "Read an information table and match wishes/purposes to the correct information." },
        { teil: 3, points: 5, task: "Read an informal email/letter and complete statements with 3 options." },
        { teil: 4, points: 5, task: "Match statements to the correct advertisement among several options." },
      ],
    },
    {
      name: "Hören",
      english: "Listening",
      durationMinutes: 30,
      points: 25,
      parts: [
        { teil: 1, points: 5, task: "3 short texts, multiple choice, heard twice." },
        { teil: 2, points: 5, task: "One longer dialogue; match 5 named people to 9 pictures, heard once." },
        { teil: 3, points: 5, task: "5 short conversations, multiple choice, heard once." },
        { teil: 4, points: 5, task: "Radio interview; 5 true/false statements, heard once." },
      ],
    },
    {
      name: "Schreiben",
      english: "Writing",
      durationMinutes: 30,
      points: 25,
      parts: [
        { teil: 1, points: 10, task: "Write a short informal SMS/message of about 20-30 words to a friend." },
        { teil: 2, points: 10, task: "Write a short formal or semi-formal email of about 30-40 words." },
      ],
    },
    {
      name: "Sprechen",
      english: "Speaking",
      durationMinutes: 15,
      points: 25,
      parts: [
        { teil: 1, points: 4, task: "Question-answer exchange using topic cards." },
        { teil: 2, points: 8, task: "Short monologue on a familiar personal topic with guiding questions." },
        { teil: 3, points: 8, task: "Joint planning task with partner: negotiate and agree on a plan." },
        { teil: 4, points: 5, task: "Pronunciation points across the whole speaking module." },
      ],
    },
  ] satisfies GermanA2ExamModule[],
};

export const germanA2SurvivalModules: GermanA2SurvivalModule[] = [
  {
    id: "a2-survival-bewerbung",
    titleEn: "Job Applications — Bewerbung Basics",
    titleDe: "Die Bewerbung",
    whyNeeded: "A2 courses cover job vocabulary, but often do not teach the practical mechanics of applying for a job in Germany.",
    coreContent: ["Lebenslauf", "Anschreiben", "Vorstellungsgespräch", "Arbeitsagentur / Bundesagentur für Arbeit"],
    keyVocabulary: ["die Bewerbung", "der Lebenslauf", "das Anschreiben", "das Vorstellungsgespräch", "die Arbeitsagentur"],
    practicalTips: ["German CVs are often formally structured and complete.", "Learn polite email phrasing for applications and follow-ups."],
  },
  {
    id: "a2-survival-health-advanced",
    titleEn: "Health System Advanced",
    titleDe: "Überweisung, Rezept und Krankschreibung",
    whyNeeded: "A1 health content covers basic symptoms. A2 learners need to understand referrals, prescriptions, sick notes, and appointment communication.",
    coreContent: ["Überweisung to specialist", "Rezept from doctor", "Arbeitsunfähigkeitsbescheinigung / Krankschreibung", "Termin beim Facharzt"],
    keyVocabulary: ["die Überweisung", "das Rezept", "die Krankschreibung", "der Facharzt", "die Krankenkasse"],
    practicalTips: ["Ask if you need an Überweisung before visiting a specialist.", "Learn how to say you need a sick note for work or Kita."],
  },
  {
    id: "a2-survival-contracts-notices",
    titleEn: "Contracts and Notices",
    titleDe: "Verträge, Kündigung und Fristen",
    whyNeeded: "A2 learners living in Germany need to understand contracts, cancellation periods, notices, and deadlines.",
    coreContent: ["Kündigung", "Widerruf", "Frist", "Vertrag", "schriftlich kündigen"],
    keyVocabulary: ["der Vertrag", "die Kündigung", "die Frist", "der Widerruf", "schriftlich"],
    practicalTips: ["Read deadlines carefully in contracts.", "Keep written confirmation when cancelling services or memberships."],
  },
];

export const germanA2WordGroups: GermanA2WordGroup[] = [
  {
    id: "a2-berufe",
    titleEn: "Occupations",
    titleDe: "Berufe",
    examples: ["der Arzt/die Ärztin", "der Lehrer/die Lehrerin", "der Ingenieur/die Ingenieurin", "der Verkäufer/die Verkäuferin"],
    examUse: "Sprechen self-introduction, work topics, reading profiles and adverts.",
    dailyLifeUse: "Work introductions, job applications, office and service conversations.",
  },
  {
    id: "a2-familienstand",
    titleEn: "Marital status",
    titleDe: "Familienstand",
    examples: ["ledig", "verheiratet", "getrennt", "geschieden"],
    examUse: "Form filling, self-introduction, reading personal details.",
    dailyLifeUse: "Official forms, Anmeldung-related forms, tax/insurance forms.",
  },
  {
    id: "a2-schule-schulfaecher",
    titleEn: "School and subjects",
    titleDe: "Schule und Schulfächer",
    examples: ["Biologie", "Chemie", "Deutsch", "Englisch", "Mathematik", "Geschichte", "der Stundenplan"],
    examUse: "Reading/listening texts about school, family, children, and education.",
    dailyLifeUse: "Kita/school communication, parent meetings, children's timetables.",
  },
  {
    id: "a2-feiertage",
    titleEn: "Public holidays",
    titleDe: "Feiertage",
    examples: ["Weihnachten", "Ostern", "Silvester", "Neujahr", "der Feiertag"],
    examUse: "Listening/reading schedules, invitations, event planning.",
    dailyLifeUse: "Closures, appointments, work holidays, Kita/school calendar.",
  },
  {
    id: "a2-masse-waehrungen",
    titleEn: "Measures and currencies",
    titleDe: "Maße und Währungen",
    examples: ["Euro", "Cent", "Meter", "Kilometer", "Liter", "Kilogramm", "Grad Celsius"],
    examUse: "Shopping, travel, weather, cooking, instructions.",
    dailyLifeUse: "Groceries, rent, travel distance, weather, recipes, invoices.",
  },
];

export function getGermanA2ExamModule(name: GermanA2ExamModule["name"]): GermanA2ExamModule | undefined {
  return germanA2ExamFramework.modules.find((module) => module.name === name);
}
