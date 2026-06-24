export interface GermanB1ExamPart {
  teil: number;
  items?: number;
  durationMinutes?: number | string;
  task: string;
}

export interface GermanB1ExamModule {
  name: "Lesen" | "Hören" | "Schreiben" | "Sprechen";
  english: string;
  durationMinutes: number | string;
  points: number;
  plainLanguageSummary: string;
  parts: GermanB1ExamPart[];
}

export interface GermanB1Phrase {
  de: string;
  en: string;
  use: string;
}

export interface GermanB1GuidanceModule {
  id: string;
  titleEn: string;
  titleDe: string;
  plainLanguageHook: string;
  coreContent: string[];
  practicalTips: string[];
}

export const germanB1ExamFramework = {
  fullName: "Goethe-Zertifikat B1",
  cefrLevel: "B1",
  passingRule: "Each module is scored independently out of 100. Each module needs 60 points to pass. There is no averaging across modules.",
  moduleNote: "The four modules can be taken together or separately. If one module is not passed, only that module needs to be repeated.",
  modules: [
    {
      name: "Lesen",
      english: "Reading",
      durationMinutes: 65,
      points: 100,
      plainLanguageSummary: "Read real-life texts and answer comprehension questions.",
      parts: [
        { teil: 1, items: 6, durationMinutes: 10, task: "Personal text/blog post; decide whether 6 statements are true or false." },
        { teil: 2, items: 6, durationMinutes: 20, task: "Two short newspaper-style texts; multiple-choice detailed understanding." },
        { teil: 3, items: 7, durationMinutes: 10, task: "Match seven situations to the correct advertisements." },
        { teil: 4, items: 7, durationMinutes: 15, task: "Read reader comments/opinions and decide if each supports or opposes a position." },
        { teil: 5, items: 4, durationMinutes: 10, task: "Read formal rules/terms and answer multiple-choice questions." },
      ],
    },
    {
      name: "Hören",
      english: "Listening",
      durationMinutes: 40,
      points: 100,
      plainLanguageSummary: "Hear messages, announcements, conversations, and a debate; answer while listening.",
      parts: [
        { teil: 1, items: 10, durationMinutes: "part of 40", task: "Five short voicemail-style messages, played twice, two questions each." },
        { teil: 2, items: 5, durationMinutes: "part of 40", task: "One longer announcement, played once, five multiple-choice questions." },
        { teil: 3, items: 7, durationMinutes: "part of 40", task: "One natural conversation, played once, seven true/false statements." },
        { teil: 4, items: 8, durationMinutes: "part of 40", task: "One radio discussion/debate, played twice, match statements to speakers." },
      ],
    },
    {
      name: "Schreiben",
      english: "Writing",
      durationMinutes: 60,
      points: 100,
      plainLanguageSummary: "Write three short texts and cover all required content points.",
      parts: [
        { teil: 1, durationMinutes: 20, task: "Personal email of about 80 words covering three given content points." },
        { teil: 2, durationMinutes: 25, task: "Forum-style opinion post of about 80 words with reasons and structure." },
        { teil: 3, durationMinutes: 15, task: "Short semi-formal/formal email of about 40 words, often apology/request/decline." },
      ],
    },
    {
      name: "Sprechen",
      english: "Speaking",
      durationMinutes: "15 minutes paired oral plus 15 minutes preparation",
      points: 100,
      plainLanguageSummary: "Plan with a partner, give a short presentation, and react to the partner's presentation.",
      parts: [
        { teil: 1, durationMinutes: 3, task: "Plan something together using guide points; make suggestions and reach a decision." },
        { teil: 2, durationMinutes: 3, task: "Give a structured presentation using prompts: topic, experience, home country, pros/cons, closing." },
        { teil: 3, durationMinutes: 2, task: "React to partner presentation, give feedback, ask a question, answer follow-up." },
      ],
    },
  ] satisfies GermanB1ExamModule[],
};

export const germanB1Redemittel = {
  opinions: [
    { de: "Ich bin der Meinung, dass ...", en: "I am of the opinion that ...", use: "Schreiben Teil 2 / presentation opinion" },
    { de: "Meiner Meinung nach ...", en: "In my opinion ...", use: "Opinion sentence opener" },
    { de: "Ich finde es wichtig, dass ...", en: "I think it is important that ...", use: "Reasoned opinion" },
    { de: "Ich denke, dass ...", en: "I think that ...", use: "Safe opinion phrase" },
  ] satisfies GermanB1Phrase[],
  agreeDisagree: [
    { de: "Da bin ich ganz deiner/Ihrer Meinung.", en: "I completely agree with you.", use: "Discussion response" },
    { de: "Das sehe ich auch so.", en: "I see it the same way.", use: "Agreement" },
    { de: "Da bin ich anderer Meinung.", en: "I have a different opinion.", use: "Polite disagreement" },
    { de: "Das stimmt, aber ...", en: "That is true, but ...", use: "Balanced disagreement" },
  ] satisfies GermanB1Phrase[],
  suggestions: [
    { de: "Ich schlage vor, dass ...", en: "I suggest that ...", use: "Sprechen Teil 1 planning" },
    { de: "Wie wäre es, wenn ...?", en: "How about if ...?", use: "Suggestion" },
    { de: "Wir könnten ...", en: "We could ...", use: "Polite planning" },
    { de: "Hast du / Haben Sie eine Idee?", en: "Do you have an idea?", use: "Partner interaction" },
  ] satisfies GermanB1Phrase[],
  presentation: [
    { de: "Ich möchte über das Thema ... sprechen.", en: "I would like to talk about the topic of ...", use: "Presentation opening" },
    { de: "In meinem Heimatland ist es so, dass ...", en: "In my home country, it is the case that ...", use: "Presentation country comparison" },
    { de: "Ein Vorteil ist, dass ... Ein Nachteil ist, dass ...", en: "One advantage is that ... One disadvantage is that ...", use: "Pros and cons" },
    { de: "Zum Schluss möchte ich sagen, dass ...", en: "In conclusion, I would like to say that ...", use: "Presentation closing" },
  ] satisfies GermanB1Phrase[],
};

export const germanB1GuidanceModules: GermanB1GuidanceModule[] = [
  {
    id: "b1-guidance-certificate-use",
    titleEn: "B1 Certificate Use Cases",
    titleDe: "Wofür man B1 braucht",
    plainLanguageHook: "B1 is often a practical life milestone, not only a language milestone.",
    coreContent: [
      "B1 certificates are commonly used for official German-life milestones.",
      "Check the latest local requirements before relying on any certificate path.",
      "Goethe B1 and telc B1 are both common accepted exam routes for many purposes.",
    ],
    practicalTips: [
      "Keep the certificate safely because it may be needed more than once.",
      "Verify requirements with the relevant local office before booking an exam.",
    ],
  },
  {
    id: "b1-guidance-exam-day",
    titleEn: "Exam-Day Practical Tips",
    titleDe: "Praktische Tipps für den Prüfungstag",
    plainLanguageHook: "Many failures come from timing and format surprises, not only weak German.",
    coreContent: [
      "Arrive early with ID and registration confirmation.",
      "Use black or blue pen for written answers.",
      "Know which listening parts are repeated and which are played once.",
      "In writing, cover every required content point.",
      "In speaking, asking for repetition is acceptable.",
    ],
    practicalTips: [
      "Practise timed writing before exam day.",
      "Use fixed Redemittel to reduce grammar risk under pressure.",
    ],
  },
];

export function getGermanB1ExamModule(name: GermanB1ExamModule["name"]): GermanB1ExamModule | undefined {
  return germanB1ExamFramework.modules.find((module) => module.name === name);
}
