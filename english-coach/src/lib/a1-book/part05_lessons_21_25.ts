import type { GermanA1BookLesson } from "../germanA1BookLessonTypes";

export const germanA1BookLessonsPart05: GermanA1BookLesson[] = [
  {
    lessonNo: 21,
    titleEn: "Negative Articles (kein/keine)",
    titleDe: "Negative Artikel (kein/keine)",
    introduction: "In English, to express a negative, we usually use 'not a' or 'not any' (e.g., I don't have a car). German takes a much more elegant approach. If a noun would normally use the article 'ein' or 'eine', you simply attach a 'k' to the front to negate the entire sentence. Mastering 'kein' allows you to express exactly what you don't have, don't need, or don't want.",
    theRule: [
      "To negate a noun that has an indefinite article (ein/eine) or no article (plurals), use the negative article 'kein' or 'keine'.",
      "If the noun is masculine (der) or neuter (das), use 'kein' (instead of ein).",
      "If the noun is feminine (die), use 'keine' (instead of eine).",
      "For plural nouns, which have no indefinite article, you always use 'keine' to say 'no [items]'.",
      "Do not use 'nicht' to negate a noun that has 'ein/eine'. Always use 'kein/keine'."
    ],
    formula: [
      "Masculine (der) -> ein -> kein",
      "Neuter (das) -> ein -> kein",
      "Feminine (die) -> eine -> keine",
      "Plural -> (none) -> keine"
    ],
    grammarTable: {
      headers: ["Gender", "Indefinite Article (A/An)", "Negative Article (No/Not a)"],
      rows: [
        ["Masculine", "ein Tisch", "kein Tisch"],
        ["Neuter", "ein Auto", "kein Auto"],
        ["Feminine", "eine Lampe", "keine Lampe"],
        ["Plural", "(none) Autos", "keine Autos"]
      ]
    },
    vocabulary: [
      { de: "kein", en: "no / not a (masculine/neuter)", example: "Ich habe kein Auto.", exampleEn: "I don't have a car." },
      { de: "keine", en: "no / not a (feminine/plural)", example: "Das ist keine Lampe.", exampleEn: "That is not a lamp." },
      { de: "das Problem", en: "problem", example: "Kein Problem!", exampleEn: "No problem!" },
      { de: "das Geld", en: "money", example: "Ich habe kein Geld.", exampleEn: "I have no money." },
      { de: "die Lust", en: "desire / mood (to do something)", example: "Ich habe keine Lust.", exampleEn: "I don't feel like it." },
      { de: "die Ahnung", en: "idea / clue", example: "Ich habe keine Ahnung.", exampleEn: "I have no idea." },
      { de: "die Frage", en: "question", example: "Ich habe keine Fragen.", exampleEn: "I have no questions." },
      { de: "das Haustier", en: "pet", example: "Wir haben kein Haustier.", exampleEn: "We have no pet." },
      { de: "der Fehler", en: "mistake", example: "Das ist kein Fehler.", exampleEn: "That is not a mistake." },
      { de: "brauchen", en: "to need", example: "Ich brauche keine Hilfe.", exampleEn: "I do not need help." }
    ],
    modelSentences: [
      {
        de: "Ist das ein Tisch? Nein, das ist kein Tisch.",
        en: "Is that a table? No, that is not a table.",
        breakdown: "Ist das = Is that | ein Tisch = a table | Nein = No | das ist kein Tisch = that is not a table → 'kein' is the negative form of 'ein' for masculine nouns."
      },
      {
        de: "Ich habe heute keine Zeit und keine Lust.",
        en: "I have no time and no desire today.",
        breakdown: "Ich = I | habe = have | heute = today | keine Zeit = no time (feminine) | und = and | keine Lust = no desire (feminine) → Both are feminine, both use 'keine'."
      },
      {
        de: "Wir haben keine Kinder.",
        en: "We have no children.",
        breakdown: "Wir = We | haben = have | keine Kinder = no children (plural) → Plural nouns always use 'keine'."
      },
      {
        de: "Entschuldigung, ich habe keine Ahnung.",
        en: "Excuse me, I have no idea.",
        breakdown: "Entschuldigung = Excuse me | ich = I | habe = have | keine Ahnung = no idea (feminine) → 'keine Ahnung' is a very common phrase — learn it as a whole."
      }
    ],
    culturalNote: "The phrase 'Keine Ahnung' (No idea/clue) is one of the most frequently used conversational fillers in spoken German. If someone asks you for directions and you don't know, shrugging and saying 'Tut mir leid, keine Ahnung' (Sorry, no idea) is perfectly natural and widely accepted.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Fill in 'kein' or 'keine'.",
        items: [
          { prompt: "Ich habe ___ Geld. (das Geld)", answer: "kein", hint: "Neuter noun" },
          { prompt: "Das ist ___ Frage. (die Frage)", answer: "keine", hint: "Feminine noun" },
          { prompt: "Wir haben ___ Probleme. (die Probleme)", answer: "keine", hint: "Plural noun" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate using the negative article.",
        items: [
          { prompt: "I have no time.", answer: "Ich habe keine Zeit." },
          { prompt: "That is not a car. (das Auto)", answer: "Das ist kein Auto." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich habe nicht ein Auto.",
        right: "Ich habe kein Auto.",
        explanation: "English speakers literally translate 'not a' to 'nicht ein'. In German grammar, 'nicht' and 'ein' merge to form 'kein'. Never put 'nicht' directly in front of 'ein'."
      },
      {
        wrong: "Wir haben kein Kinder.",
        right: "Wir haben keine Kinder.",
        explanation: "Since plural words don't have an 'ein' form, learners forget to use the 'keine' ending. Remember: Feminine and Plural both strictly take 'keine'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 sentences with 'ein' or 'eine' and I will rewrite them to be negative using 'kein' and 'keine'.",
      "Ask Sky: Explain why we say 'kein Problem' instead of 'nicht Problem'.",
      "Ask Sky: Let's do a roleplay where you offer me different foods and drinks, and I refuse them all using 'kein/keine'."
    ],
    examRelevance: "Hören & Sprechen Teil 2: In the speaking test, if your partner asks 'Hast du ein Haustier?' (Do you have a pet?), answering 'Nein, ich habe kein Haustier' perfectly demonstrates your grasp of negative articles.",
    lessonGoal: "Correctly negate nouns using 'kein' and 'keine' based on their gender and number, completely avoiding the incorrect 'nicht ein' structure."
  },
  {
    lessonNo: 22,
    titleEn: "Time — Official",
    titleDe: "Uhrzeit offiziell",
    introduction: "If you want to catch a train, book a doctor's appointment, or listen to the news in Germany, you must understand the 24-hour clock. The official time format is incredibly strict but brilliantly logical. There is no AM or PM to confuse things. Once you master reading numbers up to 59, you can instantly read official German time without a second thought.",
    theRule: [
      "Official time uses the 24-hour format (00:00 to 24:00).",
      "The format is always spoken identically: [Hour] + Uhr + [Minute].",
      "For example, 14:30 is spoken as 'vierzehn Uhr dreißig'.",
      "To ask for the time, you say 'Wie spät ist es?' (How late is it?) or 'Wie viel Uhr ist es?' (How much clock is it?).",
      "To express 'at' a certain time, use the preposition 'um' (e.g., um 14 Uhr)."
    ],
    formula: [
      "Asking: Wie spät ist es? / Wie viel Uhr ist es?",
      "Answering: Es ist + [Hour 0-24] + Uhr + [Minute 0-59].",
      "At a time: um + [Hour] + Uhr + [Minute]."
    ],
    grammarTable: {
      headers: ["Digital Time", "Spoken Official German", "Literal Translation"],
      rows: [
        ["09:15", "neun Uhr fünfzehn", "nine clock fifteen"],
        ["14:30", "vierzehn Uhr dreißig", "fourteen clock thirty"],
        ["17:45", "siebzehn Uhr fünfundvierzig", "seventeen clock forty-five"],
        ["20:00", "zwanzig Uhr", "twenty clock"]
      ]
    },
    vocabulary: [
      { de: "die Uhr", en: "clock / o'clock", example: "Es ist drei Uhr.", exampleEn: "It is three o'clock." },
      { de: "die Uhrzeit", en: "time of day", example: "Was ist die Uhrzeit?", exampleEn: "What is the time?" },
      { de: "die Stunde", en: "hour", example: "Der Test dauert eine Stunde.", exampleEn: "The test lasts one hour." },
      { de: "die Minute", en: "minute", example: "Ein Zug kommt in einer Minute.", exampleEn: "A train arrives in one minute." },
      { de: "um", en: "at (time)", example: "Wir treffen uns um acht Uhr.", exampleEn: "We are meeting at eight o'clock." },
      { de: "von ... bis", en: "from ... to", example: "Ich arbeite von acht bis siebzehn Uhr.", exampleEn: "I work from 8:00 to 17:00." },
      { de: "anfangen", en: "to begin / start", example: "Der Film fängt um 20 Uhr an.", exampleEn: "The movie starts at 20:00." },
      { de: "abfahren", en: "to depart", example: "Der Zug fährt um 14 Uhr ab.", exampleEn: "The train departs at 14:00." },
      { de: "ankommen", en: "to arrive", example: "Der Bus kommt um 10 Uhr an.", exampleEn: "The bus arrives at 10:00." },
      { de: "spät", en: "late", example: "Wie spät ist es?", exampleEn: "What time is it (How late is it)?" }
    ],
    modelSentences: [
      {
        de: "Wie spät ist es? Es ist vierzehn Uhr zwanzig.",
        en: "What time is it? It is 14:20.",
        breakdown: "Wie spät = How late (time question) | ist es = is it | Es ist = It is | vierzehn = fourteen | Uhr = o'clock (separator) | zwanzig = twenty → Always put 'Uhr' between the hour and the minutes."
      },
      {
        de: "Der Zug fährt um neunzehn Uhr fünfundvierzig ab.",
        en: "The train departs at 19:45.",
        breakdown: "Der Zug = The train | fährt ab = departs (the 'ab' part goes to the end of the sentence) | um = at | neunzehn Uhr fünfundvierzig = 19:45 → 'um' is the word for 'at' with clock times."
      },
      {
        de: "Wir arbeiten von acht Uhr bis sechzehn Uhr dreißig.",
        en: "We work from 8:00 to 16:30.",
        breakdown: "Wir = We | arbeiten = work | von = from | acht Uhr = 8:00 | bis = until | sechzehn Uhr dreißig = 16:30 → 'von...bis' means 'from...to'."
      },
      {
        de: "Es ist null Uhr fünf.",
        en: "It is 00:05 (12:05 AM).",
        breakdown: "Es ist = It is | null = zero | Uhr = o'clock | fünf = five → Midnight is 'null Uhr', and the minutes follow as normal."
      }
    ],
    culturalNote: "When reading train schedules in Germany, Switzerland, or Austria, you will only ever see the 24-hour clock. Punctuality is culturally paramount, so distinguishing between 07:00 (morning) and 19:00 (evening) is critical to not missing your connection.",
    exercises: [
      {
        type: "translate",
        instruction: "Write out the official spoken time in German.",
        items: [
          { prompt: "15:20", answer: "fünfzehn Uhr zwanzig" },
          { prompt: "08:45", answer: "acht Uhr fünfundvierzig" }
        ]
      },
      {
        type: "choose",
        instruction: "Select the correct question for asking the time.",
        items: [
          { prompt: "( Wie viel Zeit ist es? / Wie spät ist es? )", answer: "Wie spät ist es?" },
          { prompt: "( Was ist die Uhr? / Wie viel Uhr ist es? )", answer: "Wie viel Uhr ist es?" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Es ist vierzehn dreißig Uhr.",
        right: "Es ist vierzehn Uhr dreißig.",
        explanation: "A very common mistake. The word 'Uhr' acts as a separator between the hours and the minutes. It must go in the middle, not at the end."
      },
      {
        wrong: "Der Kurs ist an 10 Uhr.",
        right: "Der Kurs ist um 10 Uhr.",
        explanation: "In English, we say 'at' a certain time. In German, the preposition for clock times is always strictly 'um'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 digital times (like 17:42) and I will spell out how to say them in official German.",
      "Ask Sky: Can we practice a roleplay where I am at the train station asking for departure and arrival times?",
      "Ask Sky: What is the difference between 'Uhr' and 'Stunde'?"
    ],
    examRelevance: "Hören Teil 1 & 3: Official times are guaranteed to appear in listening comprehension tasks (like airport announcements or voicemail messages). If you hear 'dreizehn Uhr', you must instantly know it means 1 PM.",
    lessonGoal: "Confidently read, speak, and understand the 24-hour clock format using the strict 'Hour + Uhr + Minute' structure."
  },
  {
    lessonNo: 23,
    titleEn: "Time — Colloquial",
    titleDe: "Uhrzeit inoffiziell",
    introduction: "While the train station uses 24-hour time, your friends at the cafe do not. In casual conversation, Germans use the 12-hour clock combined with words like 'half', 'quarter', 'to', and 'past'. The biggest trap for learners? The German 'half' looks forward to the next hour, not backward. Saying 'halb drei' does NOT mean 3:30!",
    theRule: [
      "Colloquial time uses the 12-hour clock (1 to 12). The word 'Uhr' is usually dropped.",
      "Use 'nach' (past) for the first 20 minutes of the hour (e.g., 14:10 = zehn nach zwei).",
      "Use 'vor' (to/before) for the last 20 minutes of the hour (e.g., 14:50 = zehn vor drei).",
      "15 minutes is 'Viertel'. (e.g., 14:15 = Viertel nach zwei; 14:45 = Viertel vor drei).",
      "THE TRAP: 'halb' (half) means 30 minutes BEFORE the next hour. (e.g., 14:30 = halb drei [halfway to three])."
    ],
    formula: [
      "Minutes 1-20: [Minute] + nach + [Current Hour]",
      "Minutes 40-59: [Minute] + vor + [Next Hour]",
      "Minute 30: halb + [Next Hour]",
      "Minute 15/45: Viertel nach/vor + [Hour]"
    ],
    grammarTable: {
      headers: ["Digital Time", "Colloquial German", "Literal Meaning"],
      rows: [
        ["14:05", "fünf nach zwei", "five past two"],
        ["14:15", "Viertel nach zwei", "quarter past two"],
        ["14:30", "halb drei", "half(way to) three"],
        ["14:45", "Viertel vor drei", "quarter to three"],
        ["14:50", "zehn vor drei", "ten to three"]
      ]
    },
    vocabulary: [
      { de: "nach", en: "past / after", example: "Es ist fünf nach zwölf.", exampleEn: "It is five past twelve." },
      { de: "vor", en: "to / before", example: "Es ist zehn vor acht.", exampleEn: "It is ten to eight." },
      { de: "das Viertel", en: "quarter", example: "Es ist Viertel nach eins.", exampleEn: "It is quarter past one." },
      { de: "halb", en: "half", example: "Wir treffen uns um halb vier.", exampleEn: "We meet at half past three (3:30)." },
      { de: "kurz vor", en: "shortly before", example: "Es ist kurz vor acht.", exampleEn: "It is just before eight." },
      { de: "kurz nach", en: "shortly after", example: "Es ist kurz nach zwei.", exampleEn: "It is just past two." },
      { de: "gleich", en: "almost / soon", example: "Es ist gleich neun.", exampleEn: "It is almost nine." },
      { de: "morgens", en: "in the morning", example: "Ich trinke morgens Kaffee.", exampleEn: "I drink coffee in the morning." },
      { de: "abends", en: "in the evening", example: "Abends lese ich.", exampleEn: "In the evening I read." },
      { de: "die Mittagspause", en: "lunch break", example: "Um halb eins ist Mittagspause.", exampleEn: "At 12:30 is the lunch break." }
    ],
    modelSentences: [
      {
        de: "Es ist Viertel vor fünf.",
        en: "It is quarter to five (4:45).",
        breakdown: "Es ist = It is | Viertel = quarter | vor = before/to | fünf = five → 15 minutes before 5 o'clock = 4:45."
      },
      {
        de: "Wir sehen uns um halb acht.",
        en: "We will see each other at 7:30.",
        breakdown: "Wir = We | sehen uns = see each other | um = at | halb acht = halfway to eight → 'halb acht' means halfway to 8, which is 7:30."
      },
      {
        de: "Ist es schon zehn nach vier?",
        en: "Is it already ten past four (4:10)?",
        breakdown: "Ist es = Is it | schon = already | zehn = ten | nach = past | vier = four → 10 minutes past 4 = 4:10."
      },
      {
        de: "Mein Zug kommt um kurz vor neun.",
        en: "My train arrives just before nine.",
        breakdown: "Mein Zug = My train | kommt = arrives | um = at | kurz vor = shortly before | neun = nine → Approximately 8:55 or 8:57."
      }
    ],
    culturalNote: "In Eastern Germany and parts of the South, you might hear 'dreiviertel drei' (three-quarters three). This means 2:45! Similarly, 'viertel drei' (quarter three) means 2:15. As an A1 learner, stick strictly to 'Viertel vor' and 'Viertel nach' everywhere in Germany, as everyone understands it, but be prepared to occasionally hear the regional variations.",
    exercises: [
      {
        type: "translate",
        instruction: "Translate the digital time to the colloquial German spoken format.",
        items: [
          { prompt: "16:30", answer: "halb fünf" },
          { prompt: "08:15", answer: "Viertel nach acht" },
          { prompt: "19:50", answer: "zehn vor acht" }
        ]
      },
      {
        type: "choose",
        instruction: "Select the correct digital time for the colloquial phrase.",
        items: [
          { prompt: "halb zwei -> ( 02:30 / 13:30 / 14:00 )", answer: "13:30" },
          { prompt: "Viertel vor zwölf -> ( 11:45 / 12:15 / 12:45 )", answer: "11:45" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Es ist halb drei (meaning 3:30).",
        right: "Es ist halb vier.",
        explanation: "The most dangerous time trap! In German, 'halb' refers to the hour that is approaching. Halfway to 4 is 3:30. 'Halb drei' means 2:30."
      },
      {
        wrong: "Es ist zehn nach vierzehn.",
        right: "Es ist zehn nach zwei.",
        explanation: "You cannot mix official and colloquial systems. Never use numbers 13-24 with vor/nach/halb. Always convert back to the 12-hour clock."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 digital times, and I will write both the official and colloquial way to say them.",
      "Ask Sky: Can you explain the regional variations like 'dreiviertel zwölf' and how to calculate them?",
      "Ask Sky: Test me! Say a colloquial time in German, and I will tell you what the digital time is."
    ],
    examRelevance: "Hören Teil 1: Exam questions deliberately try to trick you. Audio might say 'Wir treffen uns um halb acht' (7:30), but the multiple-choice options will show pictures of clocks at 8:30, 7:30, and 7:00.",
    lessonGoal: "Master colloquial time expressions using the 12-hour clock, 'vor', 'nach', and fully understand the forward-looking logic of 'halb'."
  },
  {
    lessonNo: 24,
    titleEn: "Possessive Pronouns Nominative",
    titleDe: "Possessivpronomen Nominativ",
    introduction: "Being able to say 'the book' is great, but saying 'my book' or 'your phone' is essential for establishing ownership and personal connection. Possessive pronouns in German are fantastic because they behave exactly like the 'ein/eine' and 'kein/keine' articles you already know. The endings match perfectly based on the gender of the noun they possess.",
    theRule: [
      "The base possessive words are: mein (my), dein (your informal), sein (his/its), ihr (her/their), unser (our), euer (your plural), Ihr (your formal).",
      "The ending of the possessive pronoun depends strictly on the noun coming AFTER it.",
      "If the noun is masculine (der) or neuter (das), add no ending (e.g., mein Tisch, mein Buch).",
      "If the noun is feminine (die) or plural, add an '-e' (e.g., meine Lampe, meine Bücher)."
    ],
    formula: [
      "Masculine/Neuter -> base word (mein, dein, sein...)",
      "Feminine/Plural -> base word + e (meine, deine, seine...)"
    ],
    grammarTable: {
      headers: ["Person", "Base Word", "Masc/Neuter (der/das)", "Fem/Plural (die)"],
      rows: [
        ["ich (I)", "mein", "mein Hund", "meine Katze"],
        ["du (you)", "dein", "dein Hund", "deine Katze"],
        ["er / es (he/it)", "sein", "sein Hund", "seine Katze"],
        ["sie (she)", "ihr", "ihr Hund", "ihre Katze"],
        ["wir (we)", "unser", "unser Hund", "unsere Katze"],
        ["ihr (you all)", "euer", "euer Hund", "eure Katze (note: drops the middle e)"],
        ["sie / Sie (they/formal)", "ihr / Ihr", "ihr / Ihr Hund", "ihre / Ihre Katze"]
      ]
    },
    vocabulary: [
      { de: "mein", en: "my", example: "Das ist mein Auto.", exampleEn: "That is my car." },
      { de: "dein", en: "your (informal)", example: "Ist das dein Handy?", exampleEn: "Is that your cell phone?" },
      { de: "sein", en: "his / its", example: "Das ist sein Bruder.", exampleEn: "That is his brother." },
      { de: "ihr", en: "her / their", example: "Wo ist ihre Tasche?", exampleEn: "Where is her bag?" },
      { de: "unser", en: "our", example: "Unser Haus ist alt.", exampleEn: "Our house is old." },
      { de: "euer", en: "your (plural)", example: "Ist das euer Hund?", exampleEn: "Is that your (pl) dog?" },
      { de: "Ihr", en: "your (formal)", example: "Hier ist Ihr Ticket.", exampleEn: "Here is your ticket." },
      { de: "das Handy", en: "cell phone", example: "Mein Handy ist neu.", exampleEn: "My cell phone is new." },
      { de: "der Schlüssel", en: "key", example: "Wo ist dein Schlüssel?", exampleEn: "Where is your key?" },
      { de: "die Brille", en: "glasses", example: "Das ist meine Brille.", exampleEn: "Those are my glasses." }
    ],
    modelSentences: [
      {
        de: "Das ist mein Auto und das ist meine Tasche.",
        en: "That is my car and that is my bag.",
        breakdown: "Das ist = That is | mein Auto = my car (neuter -> no ending) | und = and | das ist = that is | meine Tasche = my bag (feminine -> add -e) → The ending changes based on the noun's gender."
      },
      {
        de: "Ist das dein Schlüssel? Nein, das ist sein Schlüssel.",
        en: "Is that your key? No, that is his key.",
        breakdown: "Ist das = Is that | dein Schlüssel = your key (masculine -> no ending) | Nein = No | das ist = that is | sein Schlüssel = his key (masculine -> no ending) → Masculine always takes no extra ending."
      },
      {
        de: "Herr Müller, ist das Ihre Brille?",
        en: "Mr. Müller, are those your glasses?",
        breakdown: "Herr Müller = formal address | ist das = is that | Ihre Brille = your glasses (formal 'your' + -e for feminine) → Capitalize 'Ihr' when using the formal 'you'."
      },
      {
        de: "Anna sucht ihr Buch.",
        en: "Anna is looking for her book.",
        breakdown: "Anna = subject | sucht = looks for | ihr Buch = her book (neuter -> base form 'ihr', no extra ending) → Anna is female, so 'ihr' means 'her'."
      }
    ],
    culturalNote: "When addressing someone formally with 'Sie', the possessive pronoun is 'Ihr/Ihre' and it is ALWAYS capitalized in writing. This is crucial in business emails to show respect and distinguish it from the lowercase 'ihr' which means 'her' or 'their'.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Add the correct ending (-e or nothing) to the possessive pronoun.",
        items: [
          { prompt: "Das ist mein___ Tisch. (der Tisch)", answer: "mein", hint: "Masculine takes no ending in nominative." },
          { prompt: "Wo ist dein___ Lampe? (die Lampe)", answer: "deine", hint: "Feminine takes -e." },
          { prompt: "Das sind unser___ Kinder. (die Kinder - Plural)", answer: "unsere", hint: "Plural takes -e." }
        ]
      },
      {
        type: "choose",
        instruction: "Select the correct base possessive word.",
        items: [
          { prompt: "Peter hat ein Auto. Das ist ( ihr / sein ) Auto.", answer: "sein" },
          { prompt: "Maria hat ein Buch. Das ist ( ihr / sein ) Buch.", answer: "ihr" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Anna hat einen Hund. Das ist sein Hund.",
        right: "Anna hat einen Hund. Das ist ihr Hund.",
        explanation: "English speakers sometimes use 'sein' (his) as a universal 'its/their'. Anna is female, so her base possessive word MUST be 'ihr' (her)."
      },
      {
        wrong: "Das ist euere Katze.",
        right: "Das ist eure Katze.",
        explanation: "When adding an '-e' to 'euer', the middle 'e' drops out for smoother pronunciation. It becomes 'eure', not 'euere'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me a person and an object, and I will write the correct sentence using a possessive pronoun (e.g. Tom + das Auto -> Das ist sein Auto).",
      "Ask Sky: Explain why 'ihr', 'Ihr', and 'ihre' can mean so many different things depending on capitalization and context.",
      "Ask Sky: Can we practice a roleplay where we try to find the owners of lost items in an office?"
    ],
    examRelevance: "Schreiben Teil 1 & 2: In your exam emails, you will constantly write about 'meine Wohnung', 'mein Kurs', or ask 'Wie ist Ihre Adresse?'. Incorrect possessive endings immediately reveal a shaky grammar foundation.",
    lessonGoal: "Assign ownership to masculine, feminine, neuter, and plural nouns using the correct possessive pronoun bases and endings."
  },
  {
    lessonNo: 25,
    titleEn: "My Family",
    titleDe: "Meine Familie",
    introduction: "Talking about your family is a universal icebreaker. It is also the perfect practical application for the possessive pronouns you just learned. Since family members are people, their grammatical gender perfectly matches their biological gender: male relatives are 'der' (mein), and female relatives are 'die' (meine).",
    theRule: [
      "Male family members (father, brother, son) are masculine (der). Use 'mein'.",
      "Female family members (mother, sister, daughter) are feminine (die). Use 'meine'.",
      "Plural family members (parents, children, siblings) are plural (die). Use 'meine'.",
      "When introducing them, use 'Das ist mein/meine...' for one person, and 'Das sind meine...' for multiple people."
    ],
    formula: [
      "Male: Das ist + mein + [Vater / Bruder / Opa]",
      "Female: Das ist + meine + [Mutter / Schwester / Oma]",
      "Plural: Das sind + meine + [Eltern / Geschwister / Kinder]"
    ],
    grammarTable: {
      headers: ["Relationship", "Male (mein)", "Female (meine)", "Plural (meine)"],
      rows: [
        ["Parents", "der Vater (father)", "die Mutter (mother)", "die Eltern (parents)"],
        ["Siblings", "der Bruder (brother)", "die Schwester (sister)", "die Geschwister (siblings)"],
        ["Children", "der Sohn (son)", "die Tochter (daughter)", "die Kinder (children)"],
        ["Grandparents", "der Großvater (Opa)", "die Großmutter (Oma)", "die Großeltern (grandparents)"]
      ]
    },
    vocabulary: [
      { de: "die Familie", en: "family", example: "Meine Familie ist groß.", exampleEn: "My family is big." },
      { de: "der Vater", en: "father", example: "Mein Vater heißt Thomas.", exampleEn: "My father is named Thomas." },
      { de: "die Mutter", en: "mother", example: "Meine Mutter arbeitet hier.", exampleEn: "My mother works here." },
      { de: "die Eltern", en: "parents", example: "Das sind meine Eltern.", exampleEn: "These are my parents." },
      { de: "der Bruder", en: "brother", example: "Er ist mein Bruder.", exampleEn: "He is my brother." },
      { de: "die Schwester", en: "sister", example: "Hast du eine Schwester?", exampleEn: "Do you have a sister?" },
      { de: "die Geschwister", en: "siblings", example: "Ich habe keine Geschwister.", exampleEn: "I have no siblings." },
      { de: "der Sohn", en: "son", example: "Mein Sohn ist fünf Jahre alt.", exampleEn: "My son is five years old." },
      { de: "die Tochter", en: "daughter", example: "Das ist seine Tochter.", exampleEn: "That is his daughter." },
      { de: "der Ehemann / die Ehefrau", en: "husband / wife", example: "Das ist mein Ehemann.", exampleEn: "This is my husband." }
    ],
    modelSentences: [
      {
        de: "Das ist mein Vater und das ist meine Mutter.",
        en: "This is my father and this is my mother.",
        breakdown: "Das ist = This is | mein Vater = my father (male -> no ending) | und = and | das ist = this is | meine Mutter = my mother (female -> add -e) → Gender of the family member determines the ending."
      },
      {
        de: "Hast du Geschwister? Ja, ich habe einen Bruder.",
        en: "Do you have siblings? Yes, I have a brother.",
        breakdown: "Hast du = Do you have | Geschwister = siblings (plural) | Ja = Yes | ich habe = I have | einen Bruder = a brother → 'einen' is the form of 'ein' when 'brother' is the object of 'haben'."
      },
      {
        de: "Das sind meine Großeltern. Sie wohnen in Berlin.",
        en: "These are my grandparents. They live in Berlin.",
        breakdown: "Das sind = These are (plural) | meine Großeltern = my grandparents (plural -> meine) | Sie = They | wohnen = live | in Berlin = in Berlin → Always use 'Das sind' for groups."
      },
      {
        de: "Wie heißt deine Schwester? Sie heißt Julia.",
        en: "What is your sister's name? She is named Julia.",
        breakdown: "Wie heißt = What is the name of | deine Schwester = your sister (female -> deine with -e) | Sie heißt = She is named | Julia = name → Female family member, so use 'deine'."
      }
    ],
    culturalNote: "Germans rarely use the formal words 'Großvater' and 'Großmutter' in daily speech; they almost exclusively say 'Opa' and 'Oma'. Similarly, instead of 'Ehemann' (husband), many Germans simply say 'mein Mann' (my man), and instead of 'Ehefrau' (wife), they say 'meine Frau' (my woman).",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Use the correct possessive pronoun (mein / meine).",
        items: [
          { prompt: "Das ist ___ Bruder.", answer: "mein", hint: "Male relative" },
          { prompt: "Hier sind ___ Eltern.", answer: "meine", hint: "Plural relatives" },
          { prompt: "Das ist ___ Tochter Anna.", answer: "meine", hint: "Female relative" }
        ]
      },
      {
        type: "choose",
        instruction: "Select the correct plural or singular introductory phrase.",
        items: [
          { prompt: "( Das ist / Das sind ) meine Geschwister.", answer: "Das sind" },
          { prompt: "( Das ist / Das sind ) mein Opa.", answer: "Das ist" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich habe zwei Bruders.",
        right: "Ich habe zwei Brüder.",
        explanation: "English simply adds an 's' for plural. German family plurals often involve vowel changes. Bruder -> Brüder. Mutter -> Mütter. Vater -> Väter. These must be memorized."
      },
      {
        wrong: "Das ist mein Eltern.",
        right: "Das sind meine Eltern.",
        explanation: "'Eltern' (parents) is always plural. Therefore, it requires the plural intro 'Das sind' and the plural possessive ending 'meine'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can you ask me 5 questions about my family (like names, ages, and where they live) so I can practice answering?",
      "Ask Sky: What are the plural forms of all the family vocabulary words in this lesson?",
      "Ask Sky: How do I say extended family members like aunt, uncle, and cousin in German?"
    ],
    examRelevance: "Sprechen Teil 1 & 2: Examiners frequently hand you prompt cards with words like 'Familie', 'Eltern', or 'Geschwister'. You must be able to ask your partner a question like 'Wo leben deine Eltern?' and answer it smoothly.",
    lessonGoal: "Introduce your immediate and extended family members correctly using gender-accurate vocabulary and possessive pronouns."
  }
];
