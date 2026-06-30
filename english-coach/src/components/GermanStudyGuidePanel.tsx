import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, BookOpen, ClipboardCheck, ExternalLink, Mic, Radio, Search, StopCircle, Volume2 } from "lucide-react";
import { germanA1BookLessons } from "../lib/a1-book/germanA1BookLessons";
import type { GermanA1BookLesson } from "../lib/germanA1BookLessonTypes";
import type { GermanLevel } from "../lib/germanCurriculumRegistry";
import GermanLessonPracticePanel from "./GermanLessonPracticePanel";
import GermanMistakeTrainerPanel from "./GermanMistakeTrainerPanel";
import GermanLessonMasteryChecklist from "./GermanLessonMasteryChecklist";
import GermanLessonRevisionPlan from "./GermanLessonRevisionPlan";
import GermanExamPrepPanel from "./GermanExamPrepPanel";

interface GermanStudyGuidePanelProps {
  level: GermanLevel;
  onLevelChange?: (level: GermanLevel) => void;
  learnerName: string;
  isLiveActive: boolean;
  isAgentSpeaking?: boolean;
  liveError?: string | null;
  liveTranscript?: string[];
  onPracticeWithSky: (context: string) => void;
  onStartLive?: () => void;
  onStopLive: () => void;
  onBackToPortals?: () => void;
  initialLessonNo?: number;
  onLessonViewed?: () => void;
}

type StudyTab = "learn" | "speak" | "practice" | "concepts";

// Maps each lesson number to anchor IDs in topic HTML pages
const LESSON_GUIDE_SECTIONS: Record<number, string[]> = {
  1:  ["vb01"],            // Greetings
  2:  ["vb12"],            // Common Phrases
  3:  ["vb04"],            // Numbers 1–20
  4:  ["vb05"],            // Numbers 20–100
  5:  ["vb03"],            // Alphabet
  6:  ["vb02"],            // Introducing Yourself
  7:  ["vb02","vb06"],     // Getting to Know Someone
  8:  ["vb01"],            // How are you?
  9:  ["w01"],             // Sentence Structure 1
  10: ["w01"],             // Sentence Structure 2
  11: ["vb07"],            // Pronouns Overview
  12: ["v04"],             // haben & sein
  13: ["v02","v03"],       // Regular vs Irregular Verbs
  14: ["v02"],             // Regular Verbs
  15: ["v03"],             // Irregular Verbs
  16: ["vb05"],            // Numbers above 100
  17: ["w09"],             // Adjectives & Opposites
  18: ["vb02"],            // Introducing Someone Else
  19: ["art04","art05"],   // Definite / Indefinite Articles
  20: ["art05"],           // Indefinite Articles
  21: ["art06"],           // Negative Articles kein/keine
  22: ["vb09"],            // Time — Official
  23: ["vb09"],            // Time — Colloquial
  24: ["art07"],           // Possessive Pronouns Nominative
  25: ["vb10"],            // My Family
  26: ["art04"],           // Accusative Articles
  27: ["art07"],           // Possessive Pronouns Accusative
  28: ["v05"],             // Modal Verb möchten
  29: ["vb06"],            // W-Questions
  30: ["vd04"],            // In a Restaurant
  31: ["art08"],           // Personal Pronouns Accusative
  32: ["art04"],           // Dative Articles
  33: ["vs09"],            // Ordinal Numbers / Dates
  34: ["vb09"],            // Questions of Time
  35: ["art07"],           // Possessive Pronouns Dative
  36: ["art08"],           // Personal Pronouns Dative
  37: ["v07"],             // Separable Verbs
  38: ["vb09"],            // Daily Routine
  39: ["w05"],             // Imperative
  40: ["vd02"],            // Giving Directions
  41: ["t08"],             // war / hatte — Simple Past
  42: ["v08"],             // Non-Separable Verbs
  43: ["vs01","vs02"],     // Talking About Health
  44: ["t02"],             // Perfekt — Sentence Structure
  45: ["t03"],             // Perfekt — haben or sein
  46: ["t04","t05"],       // Partizip II forms
  47: ["vs04"],            // Vacation / Travel
  48: ["vd03"],            // In the Supermarket
  49: ["vd10"],            // Weather
  50: ["vb09"],            // Fixing Appointments
  51: ["vs08"],            // Letter Writing — Invitation
  52: ["vd09"],            // Likes and Dislikes / Hobbies
  53: ["vb06"],            // welch- (Question Words)
  54: ["w04"],             // Negation
  55: ["vd07"],            // Buying Clothes
  56: ["vd08"],            // Transport / Hiring a Taxi
  57: ["vb09"],            // Adverbs of Time
  58: ["vs07"],            // Telephone Conversations
  59: ["vs03"],            // At the Doctor's
  60: ["vs04"],            // Letter — Hotel Reservation
  61: ["vs09"],            // Filling in a Form
  62: ["vs06"],            // The Post Office
  63: ["vs05"],            // The Bank
  64: ["vd05"],            // Looking for an Apartment
  65: ["vd08"],            // Buying a Train Ticket
};

const GUIDE_SECTION_LABELS: Record<string, string> = {
  // Vocabulary Basics page
  vb01: "Greetings", vb02: "Introductions", vb03: "Alphabet",
  vb04: "Numbers 1–100", vb05: "Numbers 100+", vb06: "Question Words",
  vb07: "Personal Pronouns", vb08: "Days & Months", vb09: "Time Expressions",
  vb10: "Family", vb11: "Jobs & Professions", vb12: "Useful Phrases",
  // Vocabulary Daily page
  vd01: "City & Places", vd02: "Directions", vd03: "Food & Drink",
  vd04: "In the Restaurant", vd05: "House & Rooms", vd06: "Furniture",
  vd07: "Clothing", vd08: "Transport", vd09: "Hobbies", vd10: "Weather",
  // Vocabulary Life page
  vs01: "Body Parts", vs02: "Health & Illness", vs03: "At the Doctor's",
  vs04: "Travel & Hotel", vs05: "The Bank", vs06: "Post Office",
  vs07: "Phone Calls", vs08: "Writing Letters", vs09: "Registration & Dates",
  vs10: "Festivals",
  // Grammar sections that may appear in guide list
  art04: "Definite Articles", art05: "Indefinite Articles",
  art06: "kein/keine Negation", art07: "Possessive Articles", art08: "Personal Pronouns",
  v02: "Regular Verbs", v03: "Irregular Verbs", v04: "sein & haben",
  v05: "Modal Verbs", v07: "Separable Verbs", v08: "Inseparable Verbs",
  t02: "Perfekt Structure", t03: "haben vs sein", t04: "Partizip II (Regular)",
  t05: "Partizip II (Irregular)", t08: "war & hatte",
  w01: "V2 Word Order", w04: "Negation (nicht/kein)",
  w05: "Imperatives", w06: "Connectors", w09: "Adjective Endings",
};

// Maps each lesson to relevant grammar.html anchor IDs
const LESSON_GRAMMAR_SECTIONS: Record<number, string[]> = {
  1:  [],
  2:  [],
  3:  [],
  4:  [],
  5:  ["g01"],               // Alphabet → Pronunciation
  6:  [],
  7:  [],
  8:  [],
  9:  ["g14","w01"],          // Sentence structure → Word Order
  10: ["g14","w01"],
  11: ["g04"],               // Pronouns → Verb conjugation
  12: ["g04","g05"],         // haben & sein → irregular
  13: ["g04","g05"],         // Regular vs Irregular
  14: ["g04"],
  15: ["g05"],
  16: [],
  17: [],
  18: [],
  19: ["g02","g03"],         // Definite articles → gender + cases
  20: ["g02","g03"],         // Indefinite articles
  21: ["g08"],               // kein/keine → negation
  22: [],
  23: [],
  24: [],
  25: [],
  26: ["g03"],               // Accusative → cases
  27: [],
  28: ["g06"],               // möchten → modal verbs
  29: ["g15"],               // W-questions → question types
  30: [],
  31: ["g03"],               // Personal pronouns Akk → cases
  32: ["g03"],               // Dative articles → cases
  33: [],
  34: [],
  35: [],
  36: ["g03"],               // Personal pronouns Dat → cases
  37: ["g07"],               // Separable verbs
  38: [],
  39: [],
  40: [],
  41: ["g10","g11","t08"],   // war/hatte → Präteritum
  42: ["g07","v08"],         // Non-separable verbs
  43: [],
  44: ["g10","t02"],         // Perfekt sentence structure
  45: ["g10","t03"],         // haben or sein
  46: ["g10","t04","t05"],   // Partizip II forms
  47: [],
  48: [],
  49: [],
  50: [],
  51: [],
  52: [],
  53: [],
  54: [],
  55: [],
  56: [],
  57: [],
  58: [],
  59: [],
  60: [],
  61: [],
  62: ["g12"],               // Post office → prepositions
  63: [],
  64: [],
  65: [],
};

const GRAMMAR_SECTION_LABELS: Record<string, string> = {
  g01: "Pronunciation Guide", g02: "Gender: der/die/das", g03: "The Case System",
  g04: "Verb Conjugation",    g05: "Irregular Verbs",     g06: "Modal Verbs",
  g07: "Separable Verbs",     g08: "kein vs nicht",       g09: "Adjective Endings",
  g10: "Perfekt (haben/sein)",g11: "Perfekt vs Präteritum",g12: "Prepositions",
  g13: "Two-Way Preps",       g14: "Word Order (V2)",     g15: "Questions & Commands",
  g16: "Confusing Word Pairs",g17: "Numbers & Dates",     g18: "Common Mistakes",
  // Articles & Cases topic page
  art01: "Gender & Grammatical Gender", art02: "Gender Guessing Rules",
  art03: "Cases Explained",            art04: "Definite Article Tables",
  art05: "Indefinite Articles",        art06: "kein/keine — Negation",
  art07: "Possessive Articles",        art08: "Personal Pronouns",
  // Verbs topic page
  v02: "Regular Conjugation", v03: "Irregular Verbs",  v04: "sein & haben",
  v05: "Modal Verbs",         v06: "Verb Bracket",     v07: "Separable Verbs",
  v08: "Inseparable Verbs",
  // Prepositions topic page
  p02: "GODFU — Akkusativ 5", p03: "Dative 8 Preps",  p04: "Contractions (zum/zur…)",
  p05: "Wo? vs Wohin?",       p08: "How to say 'to'", p09: "Time Prepositions",
  // Tenses topic page
  t01: "Tenses Overview",          t02: "Perfekt Structure",      t03: "haben vs sein",
  t04: "Partizip II (Regular)",    t05: "Partizip II (Irregular)",t06: "Separable/Insep. in Perfekt",
  t07: "Präteritum Introduction",  t08: "war & hatte",            t09: "Perfekt vs Präteritum",
  t10: "Common Tense Mistakes",
  // Word Order topic page
  w01: "V2 Rule", w02: "Position 1 Choices", w03: "Questions (Yes/No & W-)",
  w04: "Negation (nicht/kein)",    w05: "Imperatives",            w06: "Connectors",
  w07: "Subordinate Clauses",      w08: "TeKaMoLo Order",         w09: "Adjective Endings",
  w10: "Common Word Order Mistakes",
};

// Resolve the full href for a grammar anchor key
function grammarHref(sec: string): string {
  if (sec.startsWith("t"))   return `/a1-tenses.html#${sec}`;
  if (sec.startsWith("w"))   return `/a1-word-order.html#${sec}`;
  if (sec.startsWith("p"))   return `/a1-prepositions.html#${sec}`;
  if (sec.startsWith("art")) return `/a1-articles-cases.html#${sec}`;
  if (sec.startsWith("v") && !sec.startsWith("voc")) return `/a1-verbs.html#${sec}`;
  return `/a1-german-grammar.html#${sec}`;
}

// Resolve the full href for a vocab/guide anchor key
function guideHref(sec: string): string {
  if (sec.startsWith("vb")) return `/a1-vocabulary-basics.html#${sec}`;
  if (sec.startsWith("vd")) return `/a1-vocabulary-daily.html#${sec}`;
  if (sec.startsWith("vs")) return `/a1-vocabulary-life.html#${sec}`;
  return grammarHref(sec); // t, w, art, v, p all route through grammar
}

// ── Grammar Library ─────────────────────────────────────────────
// Each entry links to a section in the grammar HTML pages.
// href uses root-relative paths so it works both in dev (Vite) and prod.
interface GrammarTopic {
  label: string;
  href: string;
  tag: string; // colour tag
}
interface GrammarGroup {
  title: string;
  colour: string; // Tailwind border-/text- colour class stem
  topics: GrammarTopic[];
}

const GRAMMAR_LIBRARY: GrammarGroup[] = [
  {
    title: "Sounds & Pronunciation",
    colour: "purple",
    topics: [
      { label: "Full Pronunciation Guide", href: "/a1-german-grammar.html#g01", tag: "g01" },
      { label: "Umlauts & ß explained", href: "/a1-german-grammar.html#g01", tag: "g01a" },
      { label: "Letter combinations (ch/sch/st)", href: "/a1-german-grammar.html#g01", tag: "g01b" },
    ],
  },
  {
    title: "Articles & Cases",
    colour: "blue",
    topics: [
      { label: "Topic Page — Articles & Cases", href: "/a1-articles-cases.html", tag: "ac-home" },
      { label: "Gender: der / die / das", href: "/a1-articles-cases.html#art01", tag: "art01" },
      { label: "Gender guessing rules", href: "/a1-articles-cases.html#art02", tag: "art02" },
      { label: "Cases explained (Nom/Akk/Dat)", href: "/a1-articles-cases.html#art03", tag: "art03" },
      { label: "Definite article tables", href: "/a1-articles-cases.html#art04", tag: "art04" },
      { label: "Indefinite articles (ein/eine)", href: "/a1-articles-cases.html#art05", tag: "art05" },
      { label: "kein/keine — negation", href: "/a1-articles-cases.html#art06", tag: "art06" },
      { label: "Possessive articles", href: "/a1-articles-cases.html#art07", tag: "art07" },
      { label: "Personal pronouns (all cases)", href: "/a1-articles-cases.html#art08", tag: "art08" },
    ],
  },
  {
    title: "Verbs",
    colour: "sky",
    topics: [
      { label: "Topic Page — Verbs", href: "/a1-verbs.html", tag: "v-home" },
      { label: "Regular conjugation", href: "/a1-verbs.html#v02", tag: "v02" },
      { label: "Irregular verbs (3 groups)", href: "/a1-verbs.html#v03", tag: "v03" },
      { label: "sein & haben", href: "/a1-verbs.html#v04", tag: "v04" },
      { label: "Modal verbs — all 6", href: "/a1-verbs.html#v05", tag: "v05" },
      { label: "The verb bracket", href: "/a1-verbs.html#v06", tag: "v06" },
      { label: "Separable verbs", href: "/a1-verbs.html#v07", tag: "v07" },
      { label: "Inseparable verbs", href: "/a1-verbs.html#v08", tag: "v08" },
    ],
  },
  {
    title: "Tenses",
    colour: "emerald",
    topics: [
      { label: "Topic Page — Tenses", href: "/a1-tenses.html", tag: "t-home" },
      { label: "Perfekt sentence structure", href: "/a1-tenses.html#t02", tag: "t02" },
      { label: "haben vs sein (decision tree)", href: "/a1-tenses.html#t03", tag: "t03" },
      { label: "Partizip II — regular verbs", href: "/a1-tenses.html#t04", tag: "t04" },
      { label: "Partizip II — irregular forms", href: "/a1-tenses.html#t05", tag: "t05" },
      { label: "Separable & insep. in Perfekt", href: "/a1-tenses.html#t06", tag: "t06" },
      { label: "war & hatte (Präteritum)", href: "/a1-tenses.html#t08", tag: "t08" },
      { label: "Perfekt vs Präteritum", href: "/a1-tenses.html#t09", tag: "t09" },
    ],
  },
  {
    title: "Prepositions",
    colour: "amber",
    topics: [
      { label: "Topic Page — Prepositions", href: "/a1-prepositions.html", tag: "p-home" },
      { label: "GODFU — Accusative 5", href: "/a1-prepositions.html#p02", tag: "p02" },
      { label: "Dative 8 Prepositions", href: "/a1-prepositions.html#p03", tag: "p03" },
      { label: "Contractions (zum/zur/im/ins)", href: "/a1-prepositions.html#p04", tag: "p04" },
      { label: "Two-Way Preps (Wo/Wohin)", href: "/a1-prepositions.html#p05", tag: "p05" },
      { label: "How to say 'to' in German", href: "/a1-prepositions.html#p08", tag: "p08" },
      { label: "Time prepositions (am/im/seit)", href: "/a1-prepositions.html#p09", tag: "p09" },
    ],
  },
  {
    title: "Sentence Building",
    colour: "rose",
    topics: [
      { label: "Topic Page — Sentence Building", href: "/a1-word-order.html", tag: "w-home" },
      { label: "V2 Rule & Word Order", href: "/a1-word-order.html#w01", tag: "w01" },
      { label: "Questions (Yes/No & W-)", href: "/a1-word-order.html#w03", tag: "w03" },
      { label: "Negation (nicht vs kein)", href: "/a1-word-order.html#w04", tag: "w04" },
      { label: "Imperatives (commands)", href: "/a1-word-order.html#w05", tag: "w05" },
      { label: "Connectors (deshalb/weil)", href: "/a1-word-order.html#w06", tag: "w06" },
      { label: "Subordinate clauses (weil/dass)", href: "/a1-word-order.html#w07", tag: "w07" },
      { label: "TeKaMoLo word order", href: "/a1-word-order.html#w08", tag: "w08" },
      { label: "Adjective Endings", href: "/a1-word-order.html#w09", tag: "w09" },
    ],
  },
  {
    title: "Vocabulary — Basics",
    colour: "slate",
    topics: [
      { label: "Topic Page — Basics", href: "/a1-vocabulary-basics.html", tag: "vb-home" },
      { label: "Greetings & Farewells", href: "/a1-vocabulary-basics.html#vb01", tag: "vb01" },
      { label: "Introducing Yourself", href: "/a1-vocabulary-basics.html#vb02", tag: "vb02" },
      { label: "Alphabet & Special Letters", href: "/a1-vocabulary-basics.html#vb03", tag: "vb03" },
      { label: "Numbers 1–100", href: "/a1-vocabulary-basics.html#vb04", tag: "vb04" },
      { label: "Question Words", href: "/a1-vocabulary-basics.html#vb06", tag: "vb06" },
      { label: "Days, Months & Seasons", href: "/a1-vocabulary-basics.html#vb08", tag: "vb08" },
      { label: "Family", href: "/a1-vocabulary-basics.html#vb10", tag: "vb10" },
      { label: "Useful Phrases", href: "/a1-vocabulary-basics.html#vb12", tag: "vb12" },
    ],
  },
  {
    title: "Vocabulary — Daily Life",
    colour: "sky",
    topics: [
      { label: "Topic Page — Daily Life", href: "/a1-vocabulary-daily.html", tag: "vd-home" },
      { label: "City & Places", href: "/a1-vocabulary-daily.html#vd01", tag: "vd01" },
      { label: "Directions", href: "/a1-vocabulary-daily.html#vd02", tag: "vd02" },
      { label: "Food & Drink", href: "/a1-vocabulary-daily.html#vd03", tag: "vd03" },
      { label: "In the Restaurant", href: "/a1-vocabulary-daily.html#vd04", tag: "vd04" },
      { label: "House & Rooms", href: "/a1-vocabulary-daily.html#vd05", tag: "vd05" },
      { label: "Clothing & Shopping", href: "/a1-vocabulary-daily.html#vd07", tag: "vd07" },
      { label: "Transport", href: "/a1-vocabulary-daily.html#vd08", tag: "vd08" },
      { label: "Hobbies", href: "/a1-vocabulary-daily.html#vd09", tag: "vd09" },
      { label: "Weather", href: "/a1-vocabulary-daily.html#vd10", tag: "vd10" },
    ],
  },
  {
    title: "Vocabulary — Life Skills",
    colour: "purple",
    topics: [
      { label: "Topic Page — Life Skills", href: "/a1-vocabulary-life.html", tag: "vs-home" },
      { label: "Body Parts", href: "/a1-vocabulary-life.html#vs01", tag: "vs01" },
      { label: "Health & Illness", href: "/a1-vocabulary-life.html#vs02", tag: "vs02" },
      { label: "At the Doctor's", href: "/a1-vocabulary-life.html#vs03", tag: "vs03" },
      { label: "Travel & Hotel", href: "/a1-vocabulary-life.html#vs04", tag: "vs04" },
      { label: "The Bank", href: "/a1-vocabulary-life.html#vs05", tag: "vs05" },
      { label: "Post Office", href: "/a1-vocabulary-life.html#vs06", tag: "vs06" },
      { label: "Phone Calls", href: "/a1-vocabulary-life.html#vs07", tag: "vs07" },
      { label: "Writing Letters & Emails", href: "/a1-vocabulary-life.html#vs08", tag: "vs08" },
      { label: "Registration & Dates", href: "/a1-vocabulary-life.html#vs09", tag: "vs09" },
      { label: "Festivals & Occasions", href: "/a1-vocabulary-life.html#vs10", tag: "vs10" },
    ],
  },
  {
    title: "Reference",
    colour: "emerald",
    topics: [
      { label: "Full Grammar Guide", href: "/a1-german-grammar.html", tag: "gram" },
      { label: "Confusing Word Pairs", href: "/a1-german-grammar.html#g16", tag: "g16" },
      { label: "Numbers & Dates", href: "/a1-german-grammar.html#g17", tag: "g17" },
      { label: "Common Mistakes", href: "/a1-german-grammar.html#g18", tag: "g18" },
    ],
  },
];

const colourMap: Record<string, { border: string; bg: string; text: string; hover: string }> = {
  purple:  { border: "border-purple-800",  bg: "bg-purple-950/50",  text: "text-purple-300",  hover: "hover:bg-purple-900/50" },
  blue:    { border: "border-blue-800",    bg: "bg-blue-950/50",    text: "text-blue-300",    hover: "hover:bg-blue-900/50" },
  sky:     { border: "border-sky-800",     bg: "bg-sky-950/50",     text: "text-sky-300",     hover: "hover:bg-sky-900/50" },
  emerald: { border: "border-emerald-800", bg: "bg-emerald-950/50", text: "text-sky-300", hover: "hover:bg-emerald-900/50" },
  amber:   { border: "border-amber-800",   bg: "bg-amber-950/50",   text: "text-amber-300",   hover: "hover:bg-amber-900/50" },
  rose:    { border: "border-rose-800",    bg: "bg-rose-950/50",    text: "text-rose-300",    hover: "hover:bg-rose-900/50" },
  slate:   { border: "border-slate-700",   bg: "bg-slate-950/50",   text: "text-slate-300",   hover: "hover:bg-slate-800/50" },
  teal:    { border: "border-teal-800",    bg: "bg-teal-950/50",    text: "text-teal-300",    hover: "hover:bg-teal-900/50" },
};
// ── End Grammar Library ────────────────────────────────────────

interface A1CourseModule {
  id: string;
  phase: string;
  title: string;
  subtitle: string;
  lessonRange: [number, number];
}

const a1CourseModules: A1CourseModule[] = [
  { id: "first-contact", phase: "Start", title: "First contact", subtitle: "greetings, politeness, yes/no responses", lessonRange: [1, 2] },
  { id: "sounds-numbers", phase: "Start", title: "Sounds, spelling and numbers", subtitle: "1-100, spelling names, alphabet sounds", lessonRange: [3, 5] },
  { id: "personal-details", phase: "Start", title: "About me", subtitle: "name, age, hobby, country, short answers", lessonRange: [6, 8] },
  { id: "sentence-engine", phase: "Build", title: "Sentence engine", subtitle: "word order, pronouns, sein/haben, core verbs", lessonRange: [9, 15] },
  { id: "describe-world", phase: "Build", title: "People, places and things", subtitle: "large numbers, jobs, city places, articles", lessonRange: [16, 21] },
  { id: "time-family", phase: "Build", title: "Time, dates and family", subtitle: "clock time, days, months, family ownership", lessonRange: [22, 25] },
  { id: "objects-questions", phase: "Use", title: "Accusative and wishes", subtitle: "direct objects, möchten, W-questions, restaurant ordering", lessonRange: [26, 30] },
  { id: "dative-location", phase: "Use", title: "Dative and location", subtitle: "dative pronouns, places, dates, duration", lessonRange: [31, 36] },
  { id: "movement-directions", phase: "Use", title: "Movement and directions", subtitle: "routine, separable verbs, commands, directions", lessonRange: [37, 40] },
  { id: "past-health", phase: "Use", title: "Past, body and health", subtitle: "war/hatte, Perfekt, body parts, symptoms", lessonRange: [41, 46] },
  { id: "daily-tasks", phase: "Life", title: "Daily tasks", subtitle: "vacation, supermarket, weather, appointments", lessonRange: [47, 50] },
  { id: "writing-shopping", phase: "Life", title: "Writing and shopping", subtitle: "invitation, likes, welcher/dieser, clothes", lessonRange: [51, 55] },
  { id: "travel-care", phase: "Life", title: "Travel, phone and care", subtitle: "taxi, time adverbs, phone calls, doctor", lessonRange: [56, 59] },
  { id: "paperwork", phase: "Life", title: "Forms and services", subtitle: "hotel, registration, post office, bank", lessonRange: [60, 63] },
  { id: "housing-train", phase: "Life", title: "Housing and trains", subtitle: "apartment search and train tickets", lessonRange: [64, 65] },
];

function conceptFileFor(lessonNo: number): string {
  if (lessonNo <= 3)  return "a1-part01-lessons-01-03.html";
  if (lessonNo <= 10) return "a1-part02-lessons-04-10.html";
  if (lessonNo <= 15) return "a1-part03-lessons-11-15.html";
  if (lessonNo <= 20) return "a1-part04-lessons-16-20.html";
  if (lessonNo <= 25) return "a1-part05-lessons-21-25.html";
  if (lessonNo <= 30) return "a1-part06-lessons-26-30.html";
  if (lessonNo <= 35) return "a1-part07-lessons-31-35.html";
  if (lessonNo <= 40) return "a1-part08-lessons-36-40.html";
  if (lessonNo <= 45) return "a1-part09-lessons-41-45.html";
  if (lessonNo <= 50) return "a1-part10-lessons-46-50.html";
  if (lessonNo <= 55) return "a1-part11-lessons-51-55.html";
  return "a1-part12-lessons-56-65.html";
}

function conceptAnchorFor(lessonNo: number): string {
  return `lesson-${String(lessonNo).padStart(2, "0")}`;
}

function tabsForLesson(lessonNo: number): Array<{ id: StudyTab; label: string }> {
  const speakLabel = lessonNo <= 5 ? "Listen & repeat" : lessonNo <= 8 ? "Answer aloud" : "Speak";
  return [
    { id: "learn", label: "Learn" },
    { id: "concepts", label: "Study Concepts" },
    { id: "speak", label: speakLabel },
    { id: "practice", label: "Practice" },
  ];
}

function moduleForLesson(lessonNo: number): A1CourseModule {
  return a1CourseModules.find((item) => lessonNo >= item.lessonRange[0] && lessonNo <= item.lessonRange[1]) || a1CourseModules[0];
}

function lessonsForModule(module: A1CourseModule): GermanA1BookLesson[] {
  return germanA1BookLessons.filter((lesson) => lesson.lessonNo >= module.lessonRange[0] && lesson.lessonNo <= module.lessonRange[1]);
}

function buildLessonSearchText(lesson: GermanA1BookLesson): string {
  return [
    lesson.titleEn,
    lesson.titleDe,
    lesson.introduction,
    lesson.theRule.join(" "),
    lesson.formula.join(" "),
    lesson.vocabulary.map((item) => `${item.de} ${item.en} ${item.example}`).join(" "),
    lesson.modelSentences.map((item) => `${item.de} ${item.en} ${item.breakdown}`).join(" "),
    lesson.commonMistakes.map((item) => `${item.wrong} ${item.right} ${item.explanation}`).join(" "),
  ].join(" ");
}

function buildLessonContext(lesson: GermanA1BookLesson, learnerName: string): string {
  const foundationOrder = lesson.lessonNo <= 5
    ? `Teaching order:
1. Do not teach sentence grammar yet.
2. Teach pronunciation, meaning, and when to use each phrase.
3. Ask the learner to repeat short chunks.
4. Correct pronunciation and article/greeting form only.
5. End with one tiny role-play.`
    : lesson.lessonNo <= 8
      ? `Teaching order:
1. Keep answers short and formulaic.
2. Drill question -> answer patterns.
3. Correct pronunciation and word choice.
4. Avoid explaining full sentence grammar unless needed.`
      : `Teaching order:
1. Explain the meaning.
2. Teach the sentence pattern.
3. Drill two model sentences.
4. Correct grammar immediately.
5. Ask the learner to produce one short German sentence.`;

  return `You are teaching ${learnerName} Lesson ${lesson.lessonNo}: "${lesson.titleEn}" (${lesson.titleDe}).

LESSON GOAL:
${lesson.lessonGoal}

LESSON FOCUS:
${lesson.theRule.map((item) => `- ${item}`).join("\n")}

KEY VOCABULARY:
${lesson.vocabulary.slice(0, 10).map((item) => `- ${item.de} = ${item.en}`).join("\n")}

MODEL SENTENCES:
${lesson.modelSentences.slice(0, 4).map((item) => `- ${item.de} (${item.en})`).join("\n")}

COMMON MISTAKES:
${lesson.commonMistakes.map((item) => `- ${item.wrong} -> ${item.right}: ${item.explanation}`).join("\n")}

${foundationOrder}`;
}

function SmallSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-4">
      <h3 className="mb-3 text-sm font-semibold text-sky-300 uppercase tracking-wide">{title}</h3>
      {children}
    </section>
  );
}

export default function GermanStudyGuidePanel({
  level, onLevelChange, learnerName, isLiveActive, isAgentSpeaking, liveError, liveTranscript,
  onPracticeWithSky, onStartLive, onStopLive, onBackToPortals,
  initialLessonNo, onLessonViewed,
}: GermanStudyGuidePanelProps) {
  const [selectedNo, setSelectedNo] = useState<number>(initialLessonNo ?? 1);
  const [activeModuleId, setActiveModuleId] = useState(moduleForLesson(initialLessonNo ?? 1).id);
  const [activeTab, setActiveTab] = useState<StudyTab>("learn");
  const [search, setSearch] = useState("");
  const [grammarOpen, setGrammarOpen] = useState(false);
  const [openGrammarGroup, setOpenGrammarGroup] = useState<string | null>(null);
  const [mainView, setMainView] = useState<"study" | "exam">("study");

  useEffect(() => {
    if (initialLessonNo && initialLessonNo !== selectedNo) {
      setSelectedNo(initialLessonNo);
      setActiveModuleId(moduleForLesson(initialLessonNo).id);
      setActiveTab("learn");
      setMainView("study");
      onLessonViewed?.();
    }
  }, [initialLessonNo]);

  const selected = germanA1BookLessons.find((lesson) => lesson.lessonNo === selectedNo) ?? germanA1BookLessons[0];
  const selectedModule = moduleForLesson(selected.lessonNo);
  const activeModule = a1CourseModules.find((item) => item.id === activeModuleId) || selectedModule;

  const visibleLessons = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (term) {
      return germanA1BookLessons.filter((lesson) =>
        lesson.titleEn.toLowerCase().includes(term) ||
        lesson.titleDe.toLowerCase().includes(term) ||
        String(lesson.lessonNo) === term ||
        lesson.vocabulary.some((item) => item.de.toLowerCase().includes(term) || item.en.toLowerCase().includes(term))
      );
    }
    return lessonsForModule(activeModule);
  }, [activeModule, search]);

  const availableTabs = tabsForLesson(selected.lessonNo);

  useEffect(() => {
    if (!availableTabs.some((tab) => tab.id === activeTab)) setActiveTab("learn");
  }, [availableTabs, activeTab]);

  function chooseLesson(lessonNo: number) {
    setSelectedNo(lessonNo);
    setActiveModuleId(moduleForLesson(lessonNo).id);
    setActiveTab("learn");
  }

  const liveButton = (
    <button
      onClick={isLiveActive ? onStopLive : (onStartLive ?? (() => onPracticeWithSky(buildLessonContext(selected, learnerName))))}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
        isLiveActive ? "bg-red-800/70 text-red-100 hover:bg-red-800" : "bg-indigo-600 text-white hover:bg-indigo-500"
      }`}
    >
      {isLiveActive ? <><StopCircle className="h-3.5 w-3.5" /> Stop</> : <><Mic className="h-3.5 w-3.5" /> Live</>}
    </button>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0b0d1a" }}>

      {/* ── Sidebar ── */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-700/50 overflow-hidden" style={{ background: "#0f1120" }}>

        {/* Sidebar header */}
        <div className="flex-shrink-0 p-4 border-b border-slate-700/40 space-y-3">
          {onBackToPortals && (
            <button onClick={onBackToPortals} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-400 transition">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
          )}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Deutsch Coach</p>
              <p className="text-sm font-bold text-white mt-0.5">{learnerName}</p>
            </div>
            {liveButton}
          </div>
          {isLiveActive && (
            <p className="flex items-center gap-1.5 text-xs">
              <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isAgentSpeaking ? "bg-red-400" : "bg-sky-400"}`} />
              <span className={isAgentSpeaking ? "text-red-300" : "text-sky-400"}>
                {isAgentSpeaking ? "Sky is speaking…" : "Listening to you"}
              </span>
            </p>
          )}
          {liveError && (
            <p className="text-xs text-red-300 bg-red-900/30 border border-red-900/50 rounded-lg px-2 py-1.5">{liveError}</p>
          )}
          {onLevelChange && (
            <div className="flex gap-1">
              {(["A0", "A1", "A2", "B1"] as GermanLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onLevelChange(lvl)}
                  className={`flex-1 rounded-md py-1 text-xs font-bold transition ${
                    level === lvl
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-800/30 text-slate-500 hover:bg-slate-700/40 hover:text-sky-400"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        {level === "A1" && (
          <div className="flex-shrink-0 p-3 border-b border-slate-700/40">
            <label className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/10 px-3 py-2">
              <Search className="h-3.5 w-3.5 text-slate-600" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search lessons or vocabulary…"
                className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-700"
              />
            </label>
          </div>
        )}

        {/* Module / Lesson list */}
        <div className="flex-1 overflow-y-auto">
          {level === "A1" ? (
            <div className="p-3 space-y-0.5">
              {search.trim() ? (
                visibleLessons.length === 0 ? (
                  <p className="text-xs text-slate-700 text-center py-6">No results</p>
                ) : (
                  visibleLessons.map((lesson) => (
                    <button
                      key={lesson.lessonNo}
                      onClick={() => { chooseLesson(lesson.lessonNo); setMainView("study"); }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                        selected.lessonNo === lesson.lessonNo && mainView === "study"
                          ? "bg-indigo-600/30 text-slate-100 border border-indigo-500/50"
                          : "text-slate-500 hover:bg-slate-800/30 hover:text-sky-300"
                      }`}
                    >
                      <span className="text-[10px] font-mono text-slate-600">L{lesson.lessonNo} </span>
                      <span className="font-medium">{lesson.titleEn}</span>
                    </button>
                  ))
                )
              ) : (
                a1CourseModules.map((module) => {
                  const isActive = module.id === activeModule.id;
                  const isSelectedModule = module.id === selectedModule.id;
                  return (
                    <div key={module.id}>
                      <button
                        onClick={() => { setActiveModuleId(module.id); setSearch(""); }}
                        className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                          isActive
                            ? "bg-slate-700/40 text-slate-200 border border-slate-700/50"
                            : "text-slate-500 hover:text-sky-400 hover:bg-slate-800/20"
                        }`}
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          {isSelectedModule && <span className="h-1.5 w-1.5 rounded-full bg-sky-400 flex-shrink-0" />}
                          <span className="truncate">{module.title}</span>
                        </span>
                        <span className="text-[10px] text-slate-600 flex-shrink-0 ml-2">L{module.lessonRange[0]}–{module.lessonRange[1]}</span>
                      </button>
                      {isActive && (
                        <div className="ml-4 mt-0.5 mb-1 space-y-0.5 border-l border-slate-700/60 pl-2">
                          {lessonsForModule(module).map((lesson) => (
                            <button
                              key={lesson.lessonNo}
                              onClick={() => { chooseLesson(lesson.lessonNo); setMainView("study"); }}
                              className={`w-full rounded px-2 py-1.5 text-left text-xs transition ${
                                selected.lessonNo === lesson.lessonNo && mainView === "study"
                                  ? "bg-indigo-600/30 text-slate-200 font-semibold"
                                  : "text-slate-500 hover:text-sky-400 hover:bg-slate-800/20"
                              }`}
                            >
                              <span className="font-mono text-slate-600 mr-1.5">{lesson.lessonNo}.</span>
                              {lesson.titleEn}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className="p-6 text-center space-y-1">
              <p className="text-sm text-slate-500">65-lesson guide available for A1.</p>
              <p className="text-xs text-slate-700">Select A1 above.</p>
            </div>
          )}
        </div>

        {/* Footer: Exam Prep + Grammar Library */}
        <div className="flex-shrink-0 border-t border-slate-700/40">
          <button
            onClick={() => setMainView(mainView === "exam" ? "study" : "exam")}
            className={`w-full flex items-center gap-2 px-4 py-3 text-xs font-semibold transition ${
              mainView === "exam" ? "text-sky-300 bg-slate-800/30" : "text-slate-500 hover:text-indigo-400"
            }`}
          >
            <ClipboardCheck className="h-3.5 w-3.5" /> Exam Prep
          </button>
          <button
            onClick={() => setGrammarOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-slate-500 hover:text-indigo-400 transition border-t border-slate-700/40"
          >
            <span className="flex items-center gap-2"><BookOpen className="h-3.5 w-3.5" /> Grammar Library</span>
            <span className="opacity-40">{grammarOpen ? "▲" : "▼"}</span>
          </button>
          {grammarOpen && (
            <div className="max-h-72 overflow-y-auto px-3 pb-3 space-y-2 border-t border-slate-700/40">
              <div className="grid grid-cols-2 gap-1 pt-2">
                {[
                  { href: "/a1-articles-cases.html", label: "Articles", cls: "border-blue-900 text-blue-400 hover:bg-blue-900/30" },
                  { href: "/a1-verbs.html", label: "Verbs", cls: "border-sky-900 text-sky-400 hover:bg-sky-900/30" },
                  { href: "/a1-prepositions.html", label: "Preps", cls: "border-amber-900 text-amber-400 hover:bg-amber-900/30" },
                  { href: "/a1-tenses.html", label: "Tenses", cls: "border-emerald-900 text-sky-400 hover:bg-slate-800/30" },
                  { href: "/a1-word-order.html", label: "Sentences", cls: "border-rose-900 text-rose-400 hover:bg-rose-900/30" },
                  { href: "/a1-german-grammar.html", label: "Full Guide", cls: "border-violet-900 text-violet-400 hover:bg-violet-900/30" },
                ].map((item) => (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-1 rounded border px-2 py-1.5 text-[11px] font-semibold transition ${item.cls}`}>
                    <ExternalLink className="h-2.5 w-2.5 flex-shrink-0" /> {item.label}
                  </a>
                ))}
              </div>
              {GRAMMAR_LIBRARY.map((group) => {
                const c = colourMap[group.colour];
                const isOpen = openGrammarGroup === group.title;
                return (
                  <div key={group.title} className={`rounded-lg border ${c.border}`}>
                    <button
                      onClick={() => setOpenGrammarGroup(isOpen ? null : group.title)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition ${c.bg} ${c.text}`}
                    >
                      <span>{group.title}</span>
                      <span className="opacity-50">{isOpen ? "▲" : "▼"}</span>
                    </button>
                    {isOpen && (
                      <div className="flex flex-col gap-0.5 px-2 pb-2 pt-1">
                        {group.topics.map((topic) => (
                          <a key={topic.tag} href={topic.href} target="_blank" rel="noopener noreferrer"
                            className={`flex items-center gap-1 rounded px-2 py-1.5 text-xs transition ${c.text} ${c.hover}`}>
                            <BookOpen className="h-3 w-3 shrink-0 opacity-60" />
                            {topic.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 min-w-0 overflow-y-auto" style={{ background: "#0b0d1a" }}>
        {mainView === "exam" ? (
          <div className="p-6">
            <GermanExamPrepPanel
              level={level}
              learnerName={learnerName}
              isLiveActive={isLiveActive}
              onStartSpeakingPractice={onPracticeWithSky}
              onStopLive={onStopLive}
              onJumpToLesson={(n) => { chooseLesson(n); setMainView("study"); }}
            />
          </div>
        ) : level !== "A1" ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <p className="text-slate-500 text-sm">The 65-lesson guide is available for A1.</p>
              <p className="text-xs text-slate-700">Select A1 in the sidebar.</p>
            </div>
          </div>
        ) : (
          <>
            {/* Sticky lesson header */}
            <div className="sticky top-0 z-10 border-b border-slate-700/40 px-6 py-4 flex items-center justify-between gap-4" style={{ background: "#0f1120" }}>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-slate-500">
                  {selectedModule.title} · Lesson {selected.lessonNo} of 65
                </p>
                <h1 className="mt-0.5 text-lg font-bold text-white truncate">
                  {selected.titleEn}
                  <span className="ml-2 text-sm font-normal text-slate-500">{selected.titleDe}</span>
                </h1>
              </div>
              <button
                onClick={isLiveActive ? onStopLive : () => onPracticeWithSky(buildLessonContext(selected, learnerName))}
                className={`flex-shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
                  isLiveActive ? "bg-red-800/70 text-red-100 hover:bg-red-800" : "bg-indigo-600 text-white hover:bg-indigo-500"
                }`}
              >
                {isLiveActive ? <><StopCircle className="h-3.5 w-3.5" /> Stop</> : <><Mic className="h-3.5 w-3.5" /> Practise with Sky</>}
              </button>
            </div>

            {/* Live transcript */}
            {(isLiveActive || (liveTranscript && liveTranscript.length > 0)) && (
              <div className="mx-6 mt-4 rounded-lg border border-slate-700/50 bg-slate-800/30">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/40">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Live transcript</p>
                  <Radio className={`h-3.5 w-3.5 ${isLiveActive ? "text-sky-400 animate-pulse" : "text-slate-700"}`} />
                </div>
                <div className="max-h-40 overflow-y-auto p-3 space-y-2">
                  {!liveTranscript?.length ? (
                    <p className="text-xs text-slate-700 text-center py-2">Listening — Sky's replies will appear here.</p>
                  ) : (
                    liveTranscript.map((line, i) => (
                      <div key={i} className="rounded-lg border border-slate-700/50 bg-slate-800/20 px-3 py-2">
                        <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">
                          <Volume2 className="h-2.5 w-2.5" /> Sky said
                        </p>
                        <p className="text-sm leading-relaxed text-slate-100">{line}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="px-6 pt-4 flex gap-1 border-b border-slate-700/30 pb-0">
              {availableTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-t-lg px-5 py-2.5 text-sm font-semibold transition border-b-2 ${
                    activeTab === tab.id
                      ? "border-indigo-400 text-sky-300"
                      : "border-transparent text-slate-600 hover:text-indigo-400"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="px-6 py-5 space-y-4">
              {activeTab === "learn" && (
                <>
                  <SmallSection title="What to understand first">
                    <p className="text-base leading-7 text-slate-100">{selected.introduction}</p>
                  </SmallSection>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <SmallSection title="Rules">
                      <ul className="space-y-2">
                        {selected.theRule.map((item) => (
                          <li key={item} className="flex gap-2 text-base leading-7 text-slate-100">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </SmallSection>
                    <SmallSection title="Vocabulary">
                      <div className="grid gap-2">
                        {selected.vocabulary.map((word) => (
                          <div key={`${word.de}-${word.en}`} className="rounded-md border border-slate-700/50 bg-[#0b0d1a] p-3">
                            <p className="text-base font-semibold text-white">{word.de}<span className="font-normal text-slate-500"> = {word.en}</span></p>
                            <p className="mt-1 text-sm leading-6 text-slate-500">{word.example}</p>
                          </div>
                        ))}
                      </div>
                    </SmallSection>
                  </div>

                  <SmallSection title="Model sentences">
                    <div className="grid gap-3 md:grid-cols-2">
                      {selected.modelSentences.map((item) => (
                        <div key={item.de} className="rounded-md border border-slate-700/50 bg-[#0b0d1a] p-3">
                          <p className="text-base font-semibold text-white">{item.de}</p>
                          <p className="mt-1 text-sm text-slate-500">{item.en}</p>
                          <p className="mt-2 text-sm leading-6 text-sky-300">{item.breakdown}</p>
                        </div>
                      ))}
                    </div>
                  </SmallSection>

                  {selected.letterSamples && selected.letterSamples.length > 0 && (
                    <SmallSection title="Letter writing samples">
                      <div className="space-y-5">
                        {selected.letterSamples.map((sample, i) => (
                          <div key={i} className="rounded-md border border-slate-700/50 bg-[#0b0d1a] p-4">
                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">{sample.scenario}</p>
                            {sample.taskPrompt && (
                              <div className="mb-4 rounded border border-amber-900/40 bg-amber-950/20 px-3 py-2.5">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-1">Exam task prompt</p>
                                <p className="text-sm text-amber-300 leading-relaxed">{sample.taskPrompt}</p>
                              </div>
                            )}
                            <pre className="whitespace-pre-wrap text-sm text-slate-100 font-sans leading-7">{sample.letter}</pre>
                          </div>
                        ))}
                      </div>
                    </SmallSection>
                  )}

                  <div className="grid gap-4 md:grid-cols-2">
                    <SmallSection title="Exam relevance">
                      <p className="text-base leading-7 text-slate-100">{selected.examRelevance}</p>
                    </SmallSection>
                    <SmallSection title="Formula">
                      <ul className="space-y-1.5">
                        {selected.formula.map((item, i) => (
                          <li key={i} className="text-base leading-7 text-slate-100">• {item}</li>
                        ))}
                      </ul>
                    </SmallSection>
                  </div>

                </>
              )}

              {activeTab === "speak" && (
                <>
                  <SmallSection title={selected.lessonNo <= 5 ? "Hear it, say it, recognise it" : "Question and answer patterns"}>
                    <div className="grid gap-3 md:grid-cols-2">
                      {selected.modelSentences.slice(0, 8).map((item) => (
                        <div key={item.de} className="rounded-md border border-slate-700/50 bg-[#0b0d1a] p-3">
                          <p className="text-lg font-semibold text-white">{item.de}</p>
                          <p className="mt-1 text-base text-slate-500">{item.en}</p>
                          <p className="mt-2 text-sm leading-6 text-sky-300">{item.breakdown}</p>
                        </div>
                      ))}
                    </div>
                  </SmallSection>
                  <SmallSection title="Beginner drill">
                    <div className="grid gap-2 md:grid-cols-3">
                      {[
                        { step: "Step 1", text: "Listen to the phrase once." },
                        { step: "Step 2", text: "Repeat only the German chunk." },
                        { step: "Step 3", text: "Use it in a tiny real-life situation." },
                      ].map((s) => (
                        <div key={s.step} className="rounded-md border border-slate-700/50 bg-[#0b0d1a] p-3">
                          <p className="text-xs uppercase tracking-widest text-slate-500">{s.step}</p>
                          <p className="mt-1 text-base text-slate-100">{s.text}</p>
                        </div>
                      ))}
                    </div>
                  </SmallSection>
                </>
              )}

              {activeTab === "practice" && (
                <div className="space-y-4">
                  <GermanLessonPracticePanel lesson={selected} />
                  <GermanMistakeTrainerPanel lesson={selected} />
                  <GermanLessonMasteryChecklist lesson={selected} />
                  <GermanLessonRevisionPlan lesson={selected} />
                  <SmallSection title="Mistakes to avoid">
                    <div className="grid gap-2">
                      {selected.commonMistakes.map((item) => (
                        <div key={`${item.wrong}-${item.right}`} className="rounded-md border border-slate-700/50 bg-[#0b0d1a] p-3">
                          <p className="text-base text-red-300">{item.wrong} <span className="text-slate-600">→</span> <span className="text-sky-300">{item.right}</span></p>
                          <p className="mt-1 text-sm leading-6 text-slate-500">{item.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </SmallSection>
                </div>
              )}

              {activeTab === "concepts" && (() => {
                const file = conceptFileFor(selected.lessonNo);
                const anchor = conceptAnchorFor(selected.lessonNo);
                const href = `/${file}#${anchor}`;
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                        Lesson {selected.lessonNo} — merged study reference (book + handwritten notes)
                      </p>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-md border border-sky-700/50 bg-sky-900/20 px-3 py-1.5 text-xs font-semibold text-sky-400 hover:bg-sky-900/40 transition"
                      >
                        <ExternalLink className="h-3 w-3" /> Open full page
                      </a>
                    </div>
                    <iframe
                      key={href}
                      src={href}
                      title={`Lesson ${selected.lessonNo} Study Concepts`}
                      className="w-full rounded-xl border border-slate-700/50"
                      style={{ height: "72vh", background: "#0b0d1a" }}
                      sandbox="allow-same-origin allow-scripts"
                    />
                  </div>
                );
              })()}

            </div>
          </>
        )}
      </main>
    </div>
  );
}
