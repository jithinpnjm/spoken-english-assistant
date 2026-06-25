export interface GermanA1PdfStudyNotePage {
  batch: string;
  sourcePages: string;
  page: number;
  heading: string;
  text: string;
}

export const germanA1PdfStudyNotes: GermanA1PdfStudyNotePage[] = [
  {
    "batch": "Batch 01",
    "sourcePages": "pages 1-15",
    "page": 1,
    "heading": "1. Sich vorstellen - Introducing yourself",
    "text": "German A1 Notes - Batch 01 (pages 1-15)\nPage 1\nGerman A1 Typed Study Notes\nBatch 01 - converted from handwritten notes, pages 1-15\nScope: self-introduction, greetings, alphabet sounds, numbers, days/months, personal pronouns,\nsein/haben, family vocabulary, regular/irregular verbs, articles, city vocabulary, and basic question\npatterns.\nI standardized spelling, capitalization, translations, and a few grammar points where the handwriting contained\nlearner-style wording or small mistakes. German nouns are capitalized, and articles are included where they\nmatter.\n1. Sich vorstellen - Introducing yourself\nUse formal Sie with strangers, teachers, officials, and interviews. Use informal du with friends, family,\nchildren, and close colleagues.\nGerman question\nEnglish meaning\nModel answer\nWie ist Ihr Name?\nWhat is your name?\nMein Name ist Alex.\nWie heißen Sie?\nWhat is your name? /\nWhat are you called?\nIch heiße Alex.\nWer sind Sie?\nWho are you?\nIch bin Alex.\nWoher kommen Sie?\nWhere do you come\nfrom?\nIch komme aus Kothamangalam.\nWo wohnen Sie?\nWhere do you live?\nIch wohne in Kaloor.\nWas ist Ihr Job? / Was sind\nSie von Beruf?\nWhat is your job /\nprofession?\nIch bin Priester von Beruf.\nWelche Sprachen sprechen\nSie?\nWhich languages do you\nspeak?\nIch spreche Malayalam, Englisch und ein bisschen\nDeutsch.\nWie ist Ihr Vorname?\nWhat is your first name?\nMein Vorname ist Alex.\nWie ist Ihr Nachname?\nWhat is your surname?\nMein Nachname ist George.\nWie ist Ihr Familienname?\nWhat is your family\nname?\nMein Familienname ist Chundattu.\nWas sind Ihre Hobbys?\nWhat are your hobbies?\nMeine Hobbys sind Lesen und Reisen.\nWas ist Ihr Hobby?\nWhat is your hobby?\nMein Hobby ist Spielen.\nWie alt sind Sie?\nHow old are you?\nIch bin zweiunddreißig Jahre alt.\nWie ist Ihre Handynummer?\nWhat is your mobile\nnumber?\nMeine Handynummer ist ...\nWie ist Ihre Telefonnummer?\nWhat is your phone\nnumber?\nMeine Telefonnummer ist ...\nWie ist die Vorwahl von\nKothamangalam?\nWhat is the dialing code\nfor Kothamangalam?\nDie Vorwahl von Kothamangalam ist ...\nWie ist Ihre Postleitzahl?\nWhat is your postal\ncode?\nMeine Postleitzahl ist ...\nUseful pattern: Ich komme aus + place = I come from a place. Ich wohne in + place = I live in a place.\n2. Greetings and polite expressions\nGerman A1 Notes - Batch 01 (pages 1-15)\nPage 1"
  },
  {
    "batch": "Batch 01",
    "sourcePages": "pages 1-15",
    "page": 2,
    "heading": "3. Alphabet and useful sound groups",
    "text": "German A1 Notes - Batch 01 (pages 1-15)\nPage 2\nGerman\nEnglish\nUsage note\nGrüß Gott\nGood bless you / Hello\nCommon greeting in southern Germany and\nAustria.\nGuten Morgen\nGood morning\nMorning greeting.\nGuten Abend\nGood evening\nEvening greeting.\nGute Nacht\nGood night\nUsed when leaving or going to sleep.\nAuf Wiedersehen\nGoodbye\nFormal/neutral.\nTschüss\nBye\nInformal.\nDanke\nThank you\nStandard thanks.\nBitte\nPlease / You are welcome\nCan mean please or response to thanks.\nBis morgen\nSee you tomorrow\nFor tomorrow.\nBis später\nSee you later\nFor later today.\nEntschuldigung\nExcuse me / Sorry\nFor apology or getting attention.\nGuten Tag\nGood day\nNeutral daytime greeting.\nBis bald\nSee you soon\nGeneral goodbye.\n3. Alphabet and useful sound groups\nGerman letters have stable pronunciations. The handwritten notes list the alphabet and common sound\npairs. Use the table below as a pronunciation aid.\nLetter/group\nApproximate sound / note\nA B C D E F G H I J\na, be, tse, de, e, ef, ge, ha, i, yot\nK L M N O P Q R S T\nka, el, em, en, o, pe, ku, er, es, te\nU V W X Y Z\nu, fau, ve, iks, üpsilon, tset\nÄ Ö Ü\nUmlaut vowels. Pronounce with rounded/changed vowel sound.\nß\nEszett. Sounds like ss. Example: Straße.\nei\nSounds like English eye. Example: nein.\nie\nLong ee sound. Example: sieben.\n4. Numbers - die Zahlen\nNumber\nGerman\n0\nnull\n1\neins\n2\nzwei\n3\ndrei\n4\nvier\n5\nfünf\n6\nsechs\n7\nsieben\n8\nacht\n9\nneun\n10\nzehn\nGerman A1 Notes - Batch 01 (pages 1-15)\nPage 2"
  }
];

function normalizeToken(value: string): string {
  return value
    .toLowerCase()
    .replace(/[.,;:!?()[\]{}"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "from", "this", "that", "your", "you", "are", "use", "used",
  "german", "english", "lesson", "a1", "page", "pages", "batch", "study", "notes",
  "der", "die", "das", "ein", "eine", "ich", "du", "sie", "sie", "ist", "sind"
]);

function queryTokens(query: string): string[] {
  return normalizeToken(query)
    .split(" ")
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

export function findRelatedPdfStudyNotes(query: string, limit = 4): GermanA1PdfStudyNotePage[] {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return [];

  return germanA1PdfStudyNotes
    .map((note) => {
      const noteText = normalizeToken(`${note.heading} ${note.text}`);
      const score = tokens.reduce((sum, token) => {
        if (noteText.includes(token)) return sum + (note.heading.toLowerCase().includes(token) ? 4 : 1);
        return sum;
      }, 0);
      return { note, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.note.batch.localeCompare(b.note.batch) || a.note.page - b.note.page)
    .slice(0, limit)
    .map((item) => item.note);
}

export function buildPdfStudyNoteQueryForLesson(input: {
  titleEn: string;
  titleDe: string;
  theRule: string[];
  formula: string[];
  vocabulary: Array<{ de: string; en: string }>;
  modelSentences: Array<{ de: string; en: string }>;
}): string {
  return [
    input.titleEn,
    input.titleDe,
    input.theRule.join(" "),
    input.formula.join(" "),
    input.vocabulary.map((item) => `${item.de} ${item.en}`).join(" "),
    input.modelSentences.map((item) => `${item.de} ${item.en}`).join(" ")
  ].join(" ");
}
