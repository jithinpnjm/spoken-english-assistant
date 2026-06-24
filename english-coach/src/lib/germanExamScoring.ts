import type { GermanExamSection } from "./germanExamPrepMaterials";

export interface GermanExamRubricCriterion {
  name: string;
  maxPoints: number;
  whatGoodLooksLike: string;
  commonLosses: string[];
}

export interface GermanExamRubric {
  section: GermanExamSection;
  totalPoints: number;
  criteria: GermanExamRubricCriterion[];
  passGuidance: string;
}

export interface GermanWeakTopicMapping {
  issue: string;
  signalWords: string[];
  reviseLessons: number[];
  correctionStrategy: string;
}

export const germanA1ExamRubrics: Record<GermanExamSection, GermanExamRubric> = {
  hoeren: {
    section: "hoeren",
    totalPoints: 15,
    passGuidance: "Pass focus: catch exact details. One correct key detail is more important than full translation.",
    criteria: [
      { name: "Key detail captured", maxPoints: 8, whatGoodLooksLike: "Time, price, number, name, place, or yes/no answer is correct.", commonLosses: ["confusing numbers", "missing am/um", "guessing from context"] },
      { name: "Question focus", maxPoints: 4, whatGoodLooksLike: "Learner answers exactly what the question asks.", commonLosses: ["answering a different detail", "over-listening"] },
      { name: "Listening strategy", maxPoints: 3, whatGoodLooksLike: "Learner previews target detail and ignores irrelevant words.", commonLosses: ["trying to translate everything"] }
    ]
  },
  lesen: {
    section: "lesen",
    totalPoints: 15,
    passGuidance: "Pass focus: find evidence in the text. Do not choose answers that only feel similar.",
    criteria: [
      { name: "Text evidence", maxPoints: 7, whatGoodLooksLike: "Answer is supported by a word, number, date, sign, or sentence in the text.", commonLosses: ["not checking evidence", "ignoring negative words"] },
      { name: "Task matching", maxPoints: 5, whatGoodLooksLike: "Learner matches notice/message/sign to the exact question.", commonLosses: ["almost-right answer", "wrong opening hours"] },
      { name: "Reading strategy", maxPoints: 3, whatGoodLooksLike: "Learner reads question first and scans for keywords.", commonLosses: ["reading slowly word by word first"] }
    ]
  },
  schreiben: {
    section: "schreiben",
    totalPoints: 20,
    passGuidance: "Pass focus: cover all bullet points with short correct German. Length is less important than clarity.",
    criteria: [
      { name: "Task coverage", maxPoints: 7, whatGoodLooksLike: "All requested points are included: reason, time/date, request, reply, or form field.", commonLosses: ["missing bullet point", "wrong form field"] },
      { name: "Grammar accuracy", maxPoints: 5, whatGoodLooksLike: "Verb position, articles, cases, and basic endings are mostly correct.", commonLosses: ["verb not position 2", "wrong accusative", "wrong article"] },
      { name: "Vocabulary and Redemittel", maxPoints: 4, whatGoodLooksLike: "Uses safe A1 phrases such as Leider, ich möchte, Können Sie, Viele Grüße.", commonLosses: ["English translation", "too informal"] },
      { name: "Structure", maxPoints: 4, whatGoodLooksLike: "Greeting, short content, request/action, closing are clear.", commonLosses: ["no greeting", "no closing", "long unclear sentence"] }
    ]
  },
  sprechen: {
    section: "sprechen",
    totalPoints: 20,
    passGuidance: "Pass focus: keep speaking with simple correct sentences. Do not go silent.",
    criteria: [
      { name: "Self introduction", maxPoints: 5, whatGoodLooksLike: "Name, origin, city, job/course, family, hobbies are expressed clearly.", commonLosses: ["one-word answers", "missing basic facts"] },
      { name: "Question formation", maxPoints: 5, whatGoodLooksLike: "Forms simple questions with Haben Sie, Wo ist, Wann, Was kostet.", commonLosses: ["English word order", "missing verb"] },
      { name: "Grammar and vocabulary", maxPoints: 5, whatGoodLooksLike: "Uses A1 sentence patterns, articles, and basic verbs correctly enough.", commonLosses: ["wrong verb form", "wrong article"] },
      { name: "Pronunciation and interaction", maxPoints: 5, whatGoodLooksLike: "Pronunciation is understandable and learner asks for repetition when needed.", commonLosses: ["too quiet", "going silent", "not asking for repetition"] }
    ]
  },
  mock: {
    section: "mock",
    totalPoints: 70,
    passGuidance: "Pass focus: complete all sections, then revise the weakest two skills first.",
    criteria: [
      { name: "Completion", maxPoints: 20, whatGoodLooksLike: "Learner finishes all exam sections without stopping.", commonLosses: ["stopping after one hard section"] },
      { name: "Accuracy", maxPoints: 25, whatGoodLooksLike: "Answers are mostly correct and supported by the task.", commonLosses: ["guessing", "not checking evidence"] },
      { name: "Review quality", maxPoints: 25, whatGoodLooksLike: "Learner identifies mistake pattern and revises related lessons.", commonLosses: ["redoing without review"] }
    ]
  }
};

export const germanA1WeakTopicMappings: GermanWeakTopicMapping[] = [
  { issue: "Numbers, prices, phone numbers, or times are wrong", signalWords: ["number", "price", "phone", "time", "uhr", "euro", "fünfzehn", "fünfzig"], reviseLessons: [3, 4, 16, 22, 23, 33, 34], correctionStrategy: "Drill numbers aloud, then practise appointment and price sentences until automatic." },
  { issue: "Sentence word order is wrong", signalWords: ["word order", "verb position", "satzbau", "question order"], reviseLessons: [9, 10, 29, 39], correctionStrategy: "Return to the verb-position rule: statement has conjugated verb in position two; question often starts with verb or W-word." },
  { issue: "Articles or cases are wrong", signalWords: ["article", "der", "die", "das", "ein", "eine", "accusative", "dative", "akkusativ", "dativ"], reviseLessons: [19, 20, 21, 26, 27, 31, 32, 35, 36], correctionStrategy: "Revise article + noun together, then practise accusative/dative model sentences." },
  { issue: "Writing task misses bullet points", signalWords: ["writing", "email", "letter", "form", "invitation", "reservation", "bullet"], reviseLessons: [50, 51, 60, 61], correctionStrategy: "Use a fixed writing frame: greeting, reason, requested detail, request/action, closing." },
  { issue: "Speaking answer is too short or learner goes silent", signalWords: ["speaking", "sprechen", "silent", "introduction", "question"], reviseLessons: [1, 2, 6, 7, 18, 25, 29, 52, 58], correctionStrategy: "Memorize safe speaking blocks and ask for repetition instead of stopping." },
  { issue: "Past tense / Perfekt is weak", signalWords: ["past", "perfekt", "war", "hatte", "partizip", "vacation"], reviseLessons: [41, 44, 45, 46, 47], correctionStrategy: "Practise haben/sein + Partizip II with short daily-life sentences." }
];

export function getWeakTopicMappingsForSection(section: GermanExamSection): GermanWeakTopicMapping[] {
  if (section === "hoeren") return germanA1WeakTopicMappings.filter((item) => item.reviseLessons.some((lesson) => [3, 4, 16, 22, 23, 33, 34].includes(lesson)));
  if (section === "lesen") return germanA1WeakTopicMappings.filter((item) => item.reviseLessons.some((lesson) => [50, 51, 60, 61, 62, 63, 64, 65].includes(lesson)) || item.issue.includes("Articles"));
  if (section === "schreiben") return germanA1WeakTopicMappings.filter((item) => item.issue.includes("Writing") || item.issue.includes("Articles") || item.issue.includes("Sentence"));
  if (section === "sprechen") return germanA1WeakTopicMappings.filter((item) => item.issue.includes("Speaking") || item.issue.includes("Sentence") || item.issue.includes("Articles"));
  return germanA1WeakTopicMappings;
}
