export type GermanLevel = "A0" | "A1" | "A2" | "B1";

export type GermanSkill =
  | "survival"
  | "hoeren"
  | "lesen"
  | "schreiben"
  | "sprechen"
  | "wortschatz"
  | "grammatik"
  | "mock_exam"
  | "mistake_repair";

export interface GermanSubtopic {
  id: string;
  title: string;
  description: string;
  grammarFocus: string[];
  vocabularyFocus: string[];
  survivalUse: string;
  goetheUse: string;
  practiceModes: string[];
  targetMinutes: number;
}

export interface GermanSection {
  id: string;
  skill: GermanSkill;
  title: string;
  description: string;
  subtopics: GermanSubtopic[];
}

export interface GermanLevelPlan {
  level: GermanLevel;
  title: string;
  subtitle: string;
  goal: string;
  sections: GermanSection[];
}

const commonA1WritingSubtopics: GermanSubtopic[] = [
  {
    id: "a1-schreiben-form",
    title: "Fill personal forms",
    description: "Practice name, address, phone, nationality, date of birth, and simple personal details.",
    grammarFocus: ["sein", "haben", "noun capitalization", "numbers", "dates"],
    vocabularyFocus: ["Name", "Adresse", "Telefonnummer", "Geburtsdatum", "Nationalität"],
    survivalUse: "Useful for Anmeldung, doctor forms, Kita forms, and course registration.",
    goetheUse: "A1 writing and reading tasks often require understanding or completing personal information.",
    practiceModes: ["form fill", "dictation", "number drill", "rewrite"],
    targetMinutes: 30,
  },
  {
    id: "a1-schreiben-termin",
    title: "Appointment messages",
    description: "Write short messages to cancel, confirm, or ask for an appointment.",
    grammarFocus: ["modal verbs", "word order", "accusative basics", "time expressions"],
    vocabularyFocus: ["der Termin", "krank", "kommen", "heute", "verschieben"],
    survivalUse: "Useful for doctor, Ausländerbehörde, Kita, office, and German class appointments.",
    goetheUse: "Supports A1 short message writing tasks.",
    practiceModes: ["write", "review", "rewrite", "speak corrected version"],
    targetMinutes: 45,
  },
  {
    id: "a1-schreiben-einladung",
    title: "Invitation replies",
    description: "Accept, decline, thank someone, and ask simple follow-up questions.",
    grammarFocus: ["nicht / kein", "modal verbs", "simple connectors", "time phrases"],
    vocabularyFocus: ["Danke", "leider", "kommen", "Geburtstag", "Party"],
    survivalUse: "Useful for neighbours, friends, school/Kita invitations, and simple social messages.",
    goetheUse: "Common A1-style short message skill.",
    practiceModes: ["short message", "correction", "rewrite", "live question"],
    targetMinutes: 35,
  },
];

export const germanCurriculum: GermanLevelPlan[] = [
  {
    level: "A0",
    title: "A0 Survival German",
    subtitle: "Immediate German for living in Germany",
    goal: "Handle basic daily situations before full A1 exam preparation.",
    sections: [
      {
        id: "a0-survival-speaking",
        skill: "survival",
        title: "Survival Speaking",
        description: "Memorize and speak the core phrases needed for daily interactions.",
        subtopics: [
          {
            id: "a0-greetings",
            title: "Greetings and polite phrases",
            description: "Use formal/informal greetings, goodbye, please, thank you, and sorry.",
            grammarFocus: ["fixed phrases", "formal vs informal"],
            vocabularyFocus: ["Guten Tag", "Hallo", "Tschüss", "Danke", "Entschuldigung"],
            survivalUse: "Every shop, office, transport, doctor, and neighbour interaction.",
            goetheUse: "Foundation for A1 speaking and listening.",
            practiceModes: ["listen-repeat", "roleplay", "quick response"],
            targetMinutes: 20,
          },
          {
            id: "a0-repair-phrases",
            title: "I do not understand / repeat slowly",
            description: "Ask people to repeat, slow down, or switch to English when needed.",
            grammarFocus: ["polite question pattern", "Sie form exposure"],
            vocabularyFocus: ["Ich verstehe nicht", "wiederholen", "langsamer", "Englisch"],
            survivalUse: "Critical when dealing with offices, doctors, Kita, and transport.",
            goetheUse: "Useful speaking repair skill for oral practice.",
            practiceModes: ["listen-repeat", "live roleplay", "pronunciation"],
            targetMinutes: 30,
          },
        ],
      },
      {
        id: "a0-daily-basics",
        skill: "survival",
        title: "Numbers, time, dates",
        description: "Understand and say numbers, prices, phone numbers, dates, and appointment times.",
        subtopics: [
          {
            id: "a0-numbers-time",
            title: "Numbers and appointment time",
            description: "Practice numbers, prices, time, days, months, and dates.",
            grammarFocus: ["um + time", "am + day", "fixed appointment sentences"],
            vocabularyFocus: ["Uhr", "Montag", "Januar", "heute", "morgen"],
            survivalUse: "Appointments, ticket counters, shops, phone numbers, and forms.",
            goetheUse: "Core A1 Hören, Lesen, Schreiben, and Sprechen skill.",
            practiceModes: ["dictation", "fill blank", "speak", "listen"],
            targetMinutes: 45,
          },
        ],
      },
    ],
  },
  {
    level: "A1",
    title: "A1 Goethe Start Deutsch 1",
    subtitle: "First active exam target",
    goal: "Prepare for Goethe A1 while building practical daily German.",
    sections: [
      {
        id: "a1-hoeren",
        skill: "hoeren",
        title: "Hören",
        description: "Short announcements, phone messages, times, prices, and simple daily audio.",
        subtopics: [
          {
            id: "a1-hoeren-time-numbers",
            title: "Time, dates, numbers in audio",
            description: "Listen for appointment times, phone numbers, prices, and dates.",
            grammarFocus: ["time expressions", "numbers", "W-questions"],
            vocabularyFocus: ["Uhr", "um", "am", "Euro", "Telefonnummer"],
            survivalUse: "Understand appointments, shops, stations, and phone messages.",
            goetheUse: "A1 listening tasks often test exact details such as time/place/number.",
            practiceModes: ["listen", "multiple choice", "dictation", "repeat"],
            targetMinutes: 40,
          },
        ],
      },
      {
        id: "a1-lesen",
        skill: "lesen",
        title: "Lesen",
        description: "Read signs, short messages, notices, ads, and form information.",
        subtopics: [
          {
            id: "a1-lesen-signs-messages",
            title: "Signs and short messages",
            description: "Read opening hours, simple notices, SMS-style messages, and appointment information.",
            grammarFocus: ["noun capitalization", "present tense recognition", "negation"],
            vocabularyFocus: ["geöffnet", "geschlossen", "Termin", "heute", "morgen"],
            survivalUse: "Read practical signs and daily messages in Germany.",
            goetheUse: "Core A1 reading format.",
            practiceModes: ["true/false", "matching", "keyword review"],
            targetMinutes: 35,
          },
        ],
      },
      {
        id: "a1-schreiben",
        skill: "schreiben",
        title: "Schreiben",
        description: "Forms, short messages, appointment cancellation, invitation replies, and sick messages.",
        subtopics: commonA1WritingSubtopics,
      },
      {
        id: "a1-sprechen",
        skill: "sprechen",
        title: "Sprechen",
        description: "Introduce yourself, spell your name, give phone/address, ask and answer simple questions.",
        subtopics: [
          {
            id: "a1-sprechen-self-intro",
            title: "Self introduction and personal questions",
            description: "Answer name, country, city, language, work, family, and hobby questions.",
            grammarFocus: ["sein", "heißen", "kommen aus", "wohnen in", "verb position 2"],
            vocabularyFocus: ["Name", "Land", "Stadt", "Sprache", "Beruf", "Familie"],
            survivalUse: "Introduce yourself at appointments, classes, and social situations.",
            goetheUse: "Core A1 oral exam preparation.",
            practiceModes: ["live question", "repeat", "pronunciation", "correction"],
            targetMinutes: 60,
          },
        ],
      },
      {
        id: "a1-grammatik",
        skill: "grammatik",
        title: "Grammatik",
        description: "A1 grammar used inside exam and survival tasks.",
        subtopics: [
          {
            id: "a1-grammar-word-order",
            title: "Sentence structure and verb position",
            description: "Build simple German sentences with the verb in position 2.",
            grammarFocus: ["verb position 2", "yes/no questions", "W-questions"],
            vocabularyFocus: ["ich", "du", "Sie", "heute", "morgen"],
            survivalUse: "Needed for every spoken/written sentence.",
            goetheUse: "Needed across A1 writing and speaking.",
            practiceModes: ["sentence build", "correct sentence", "rewrite"],
            targetMinutes: 45,
          },
          {
            id: "a1-grammar-accusative",
            title: "Accusative basics",
            description: "Understand common accusative patterns like einen Termin after haben.",
            grammarFocus: ["der -> den/einen", "haben + accusative", "simple objects"],
            vocabularyFocus: ["der Termin", "der Kaffee", "der Apfel", "ein/einen"],
            survivalUse: "Appointments, shopping, food, and basic requests.",
            goetheUse: "Improves A1 writing and speaking accuracy.",
            practiceModes: ["article drill", "fill blank", "rewrite"],
            targetMinutes: 45,
          },
        ],
      },
    ],
  },
  {
    level: "A2",
    title: "A2 Goethe Bridge",
    subtitle: "Independent daily German and B1 preparation",
    goal: "Handle longer daily situations and build the grammar base for B1.",
    sections: [
      {
        id: "a2-hoeren",
        skill: "hoeren",
        title: "Hören",
        description: "Longer daily conversations, appointment changes, announcements, and service interactions.",
        subtopics: [
          {
            id: "a2-hoeren-appointments",
            title: "Appointment changes and problem details",
            description: "Understand time/date changes, reasons, and next actions in spoken German.",
            grammarFocus: ["Perfekt recognition", "weil", "modal verbs", "time phrases"],
            vocabularyFocus: ["verschieben", "absagen", "später", "früher", "Grund"],
            survivalUse: "Doctors, offices, Kita, service calls, and work appointments.",
            goetheUse: "A2 listening/detail extraction practice.",
            practiceModes: ["listen", "detail question", "transcript reveal", "repeat"],
            targetMinutes: 45,
          },
        ],
      },
      {
        id: "a2-schreiben",
        skill: "schreiben",
        title: "Schreiben",
        description: "Semi-formal emails, problem explanation, requests, rescheduling, and complaint basics.",
        subtopics: [
          {
            id: "a2-schreiben-problem-email",
            title: "Explain a problem in an email",
            description: "Write a short connected email explaining what happened and what you need.",
            grammarFocus: ["Perfekt", "weil/dass", "word order", "polite modal verbs"],
            vocabularyFocus: ["Problem", "leider", "bitte", "könnten", "Termin", "Rechnung"],
            survivalUse: "Useful for landlords, doctors, offices, service providers, and work.",
            goetheUse: "A2 writing task preparation and B1 bridge.",
            practiceModes: ["write", "review", "rewrite", "speaking summary"],
            targetMinutes: 60,
          },
        ],
      },
      {
        id: "a2-grammatik",
        skill: "grammatik",
        title: "Grammatik",
        description: "Perfekt, dative, two-way prepositions, subordinate clauses, and comparisons.",
        subtopics: [
          {
            id: "a2-grammar-perfekt",
            title: "Perfekt for past events",
            description: "Talk and write about what happened yesterday, last week, or before an appointment.",
            grammarFocus: ["haben/sein", "Partizip II", "separable verbs", "irregular verbs"],
            vocabularyFocus: ["gestern", "letzte Woche", "gemacht", "gegangen", "gekommen"],
            survivalUse: "Explain what happened to doctors, offices, teachers, and colleagues.",
            goetheUse: "A2 speaking/writing and B1 foundation.",
            practiceModes: ["sentence build", "fill blank", "short story", "correction"],
            targetMinutes: 60,
          },
        ],
      },
    ],
  },
  {
    level: "B1",
    title: "B1 Goethe Zertifikat",
    subtitle: "Long-term certification target",
    goal: "Prepare for full B1 reading, listening, writing, speaking, and mock exam readiness.",
    sections: [
      {
        id: "b1-lesen",
        skill: "lesen",
        title: "Lesen",
        description: "Forum posts, articles, advertisements, opinions, matching, and timed reading.",
        subtopics: [
          {
            id: "b1-lesen-opinions",
            title: "Opinion texts and forum posts",
            description: "Identify opinion, reason, contrast, and conclusion in longer texts.",
            grammarFocus: ["connectors", "subordinate clauses", "relative clauses recognition"],
            vocabularyFocus: ["Meinung", "Vorteil", "Nachteil", "trotzdem", "deshalb"],
            survivalUse: "Read community, school, housing, work, and public information texts.",
            goetheUse: "B1 reading and opinion comprehension.",
            practiceModes: ["reading", "matching", "distractor review", "summary"],
            targetMinutes: 60,
          },
        ],
      },
      {
        id: "b1-schreiben",
        skill: "schreiben",
        title: "Schreiben",
        description: "Informal/semi-formal emails, requests, complaints, opinions, and argument structure.",
        subtopics: [
          {
            id: "b1-schreiben-opinion-email",
            title: "Opinion email with reasons",
            description: "Write a structured opinion with reasons, examples, and polite tone.",
            grammarFocus: ["weil", "dass", "obwohl", "connectors", "Konjunktiv II"],
            vocabularyFocus: ["meiner Meinung nach", "ein Vorteil", "ein Nachteil", "deshalb", "außerdem"],
            survivalUse: "Useful for work, school/Kita, services, complaints, and official communication.",
            goetheUse: "B1 writing preparation.",
            practiceModes: ["plan", "write", "review", "rewrite", "score"],
            targetMinutes: 75,
          },
        ],
      },
      {
        id: "b1-sprechen",
        skill: "sprechen",
        title: "Sprechen",
        description: "Plan together, present a topic, answer questions, discuss opinions, and repair mistakes.",
        subtopics: [
          {
            id: "b1-sprechen-planen",
            title: "Gemeinsam etwas planen",
            description: "Make suggestions, agree, disagree politely, divide tasks, and summarize a plan.",
            grammarFocus: ["Konjunktiv II", "dass clauses", "modal verbs", "suggestion patterns"],
            vocabularyFocus: ["vorschlagen", "könnten", "einverstanden", "organisieren", "Treffpunkt"],
            survivalUse: "Plan with colleagues, friends, family, Kita/school, and service providers.",
            goetheUse: "B1 speaking Teil 1 preparation.",
            practiceModes: ["live roleplay", "correction", "repeat", "follow-up questions"],
            targetMinutes: 75,
          },
        ],
      },
      {
        id: "b1-grammatik",
        skill: "grammatik",
        title: "Grammatik",
        description: "Subordinate clauses, connectors, Konjunktiv II, relative clauses, passive basics, adjective endings.",
        subtopics: [
          {
            id: "b1-grammar-connectors",
            title: "Connectors for opinions and arguments",
            description: "Use deshalb, trotzdem, außerdem, obwohl, and weil to build B1-level answers.",
            grammarFocus: ["connector word order", "subordinate clauses", "contrast and reason"],
            vocabularyFocus: ["deshalb", "trotzdem", "außerdem", "obwohl", "weil"],
            survivalUse: "Explain opinions and reasons in work, school, and official contexts.",
            goetheUse: "Core for B1 writing and speaking.",
            practiceModes: ["sentence combine", "rewrite", "opinion paragraph", "live answer"],
            targetMinutes: 60,
          },
        ],
      },
    ],
  },
];

export function getGermanLevel(level: GermanLevel): GermanLevelPlan {
  return germanCurriculum.find((item) => item.level === level) || germanCurriculum[1];
}

export function getGermanSubtopicCount(level: GermanLevel): number {
  return getGermanLevel(level).sections.reduce((sum, section) => sum + section.subtopics.length, 0);
}
