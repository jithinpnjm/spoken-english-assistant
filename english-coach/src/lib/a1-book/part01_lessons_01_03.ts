import type { GermanA1BookLesson } from "../germanA1BookLessonTypes";

export const germanA1BookLessonsPart01: GermanA1BookLesson[] = [
  {
    lessonNo: 1,
    titleEn: "Greetings",
    titleDe: "Begrüßungen",
    introduction: "The first thing you say in Germany sets the whole tone. Walk into a bakery, a waiting room, or a job interview — the greeting tells people immediately whether you are respectful or clueless. This lesson gives you the exact words for the right moment of day, and teaches you when to keep it formal and when you can relax.",
    theRule: [
      "Use formal greetings like 'Guten Tag' with strangers, adults in shops, doctors, and colleagues you don't know well.",
      "Use informal greetings like 'Hallo' or 'Hi' with friends, family members, children, and peers in casual settings.",
      "German splits the day into distinct greeting zones: Morgen (morning), Tag (mid-day), Abend (evening), and Nacht (night).",
      "When leaving, 'Auf Wiedersehen' is the standard formal goodbye, while 'Tschüss' is the standard informal goodbye."
    ],
    formula: [
      "Formal Greeting: Guten [Time of day] + Herr/Frau + [Last Name]",
      "Informal Greeting: Hallo + [First Name]",
      "Formal Goodbye: Auf Wiedersehen, Herr/Frau + [Last Name]",
      "Informal Goodbye: Tschüss + [First Name]"
    ],
    vocabulary: [
      { de: "der Morgen", en: "morning", example: "Guten Morgen, Frau Schmidt.", exampleEn: "Good morning, Mrs. Schmidt." },
      { de: "der Tag", en: "day", example: "Guten Tag, Herr Müller.", exampleEn: "Good day, Mr. Müller." },
      { de: "der Abend", en: "evening", example: "Guten Abend zusammen.", exampleEn: "Good evening everyone." },
      { de: "die Nacht", en: "night", example: "Gute Nacht, Mama.", exampleEn: "Good night, Mom." },
      { de: "der Herr", en: "Mr. / gentleman", example: "Das ist Herr Wagner.", exampleEn: "That is Mr. Wagner." },
      { de: "die Frau", en: "Mrs. / woman", example: "Guten Tag, Frau Weber.", exampleEn: "Good day, Mrs. Weber." },
      { de: "Hallo", en: "hello", example: "Hallo Anna, wie geht es dir?", exampleEn: "Hello Anna, how are you?" },
      { de: "Tschüss", en: "bye", example: "Tschüss, bis morgen!", exampleEn: "Bye, until tomorrow!" },
      { de: "Auf Wiedersehen", en: "goodbye (formal)", example: "Auf Wiedersehen, Herr Doktor.", exampleEn: "Goodbye, doctor." },
      { de: "bis bald", en: "see you soon", example: "Tschüss, bis bald!", exampleEn: "Bye, see you soon!" }
    ],
    modelSentences: [
      {
        de: "Guten Morgen, Herr Fischer.",
        en: "Good morning, Mr. Fischer.",
        breakdown: "Guten = Good | Morgen = Morning | Herr Fischer = Mr. Fischer → Formal morning greeting."
      },
      {
        de: "Gute Nacht, Maria.",
        en: "Good night, Maria.",
        breakdown: "Gute = Good | Nacht = Night | Maria = first name → 'Gute Nacht' is always said this way — just memorize it."
      },
      {
        de: "Hallo Lukas, bis bald!",
        en: "Hello Lukas, see you soon!",
        breakdown: "Hallo = Hello | Lukas = first name | bis = until | bald = soon → Casual goodbye to a friend."
      },
      {
        de: "Auf Wiedersehen, Frau Becker.",
        en: "Goodbye, Mrs. Becker.",
        breakdown: "Auf Wiedersehen = Goodbye (formal, literally 'until we see each other again') | Frau Becker = Mrs. Becker → Formal farewell."
      }
    ],
    culturalNote: "In rural areas like Bavaria or Austria, people often say 'Grüß Gott' (Greet God) instead of 'Guten Tag'. In Northern Germany, like Hamburg, you will hear 'Moin' at any time of day, not just the morning. When entering smaller shops or waiting rooms in Germany, it is considered very rude not to say a general 'Guten Tag' to the room.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Fill in the missing adjective ending or greeting word.",
        items: [
          { prompt: "___ Tag, Herr Meyer.", answer: "Guten", hint: "Formal daytime greeting" },
          { prompt: "Gute ___, Mama. Schlaf gut.", answer: "Nacht", hint: "Said before going to sleep" },
          { prompt: "___ Wiedersehen!", answer: "Auf", hint: "Formal goodbye phrase" }
        ]
      },
      {
        type: "choose",
        instruction: "Choose the correct greeting based on the context.",
        items: [
          { prompt: "Greeting your boss at 9:00 AM: (Hallo / Guten Morgen)", answer: "Guten Morgen" },
          { prompt: "Saying goodbye to your best friend: (Auf Wiedersehen / Tschüss)", answer: "Tschüss" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Gute Tag.",
        right: "Guten Tag.",
        explanation: "Germans always say 'Guten Tag' — this is a fixed phrase. 'Guten' is the correct form here. Just memorize it as one whole chunk: 'Guten Tag!'"
      },
      {
        wrong: "Guten Nacht.",
        right: "Gute Nacht.",
        explanation: "Germans always say 'Gute Nacht' — this is a fixed phrase too. 'Gute' is the correct form before 'Nacht'. Memorize it as a chunk: 'Gute Nacht!'"
      },
      {
        wrong: "Hallo Herr Schmidt.",
        right: "Guten Tag, Herr Schmidt.",
        explanation: "Mixing informal 'Hallo' with formal 'Herr' sounds unnatural and slightly disrespectful in German. Pick one register."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can we do a roleplay where I walk into a German doctor's office at 2 PM and need to greet the receptionist?",
      "Ask Sky: Give me 3 scenarios and let me guess if I should use 'Tschüss' or 'Auf Wiedersehen'.",
      "Ask Sky: What are some regional greetings I might hear if I travel to Munich?"
    ],
    examRelevance: "Sprechen Teil 1 (Sich vorstellen): The examiners will judge your very first interaction. Greeting them with a confident 'Guten Tag' sets the right tone for the A1 oral exam.",
    lessonGoal: "Confidently choose and properly pronounce the correct formal or informal German greeting based on the time of day and the social context."
  },
  {
    lessonNo: 2,
    titleEn: "Common Phrases",
    titleDe: "Häufige Redemittel",
    introduction: "A few small words can make the difference between sounding polite and sounding rude in Germany. 'Bitte', 'Danke', and 'Entschuldigung' are the building blocks of everyday politeness. Without them, even a grammatically perfect sentence can come across as demanding. These are the words you will use every single day — in shops, on the street, and in the office.",
    theRule: [
      "'Bitte' translates to 'please' when asking for something, but it also means 'you're welcome' when responding to 'danke'.",
      "When someone says 'Danke' (thank you), it is mandatory in German culture to reply with 'Bitte' or 'Gerne' (gladly).",
      "To get someone's attention or apologize, use 'Entschuldigung' (Excuse me/Sorry).",
      "'Ja' (yes) and 'Nein' (no) are direct in German; you do not need to soften them as much as in English."
    ],
    formula: [
      "Asking: [Noun/Item] + bitte. (e.g., Einen Kaffee, bitte.)",
      "Responding to Thanks: Danke. -> Bitte! (or Bitte schön!)",
      "Getting Attention: Entschuldigung, ... + [Question]"
    ],
    vocabulary: [
      { de: "bitte", en: "please / you're welcome", example: "Einen Tee, bitte.", exampleEn: "A tea, please." },
      { de: "danke", en: "thank you", example: "Danke für die Hilfe.", exampleEn: "Thank you for the help." },
      { de: "die Entschuldigung", en: "excuse me / apology", example: "Entschuldigung, wo ist der Bahnhof?", exampleEn: "Excuse me, where is the train station?" },
      { de: "ja", en: "yes", example: "Ja, das stimmt.", exampleEn: "Yes, that is correct." },
      { de: "nein", en: "no", example: "Nein, danke.", exampleEn: "No, thank you." },
      { de: "genau", en: "exactly", example: "Genau, das ist richtig.", exampleEn: "Exactly, that is right." },
      { de: "gern (or gerne)", en: "gladly / with pleasure", example: "Ich helfe gerne.", exampleEn: "I gladly help." },
      { de: "das Problem", en: "problem", example: "Kein Problem!", exampleEn: "No problem!" },
      { de: "die Hilfe", en: "help", example: "Ich brauche Hilfe.", exampleEn: "I need help." },
      { de: "die Frage", en: "question", example: "Ich habe eine Frage.", exampleEn: "I have a question." }
    ],
    modelSentences: [
      {
        de: "Ein Wasser, bitte.",
        en: "A water, please.",
        breakdown: "Ein = A | Wasser = water | bitte = please → Short and polite way to order something."
      },
      {
        de: "Vielen Dank für den Kaffee.",
        en: "Many thanks for the coffee.",
        breakdown: "Vielen = Many | Dank = thanks | für = for | den Kaffee = the coffee → 'Vielen Dank' is a warm way to say thank you."
      },
      {
        de: "Entschuldigung, ich habe eine Frage.",
        en: "Excuse me, I have a question.",
        breakdown: "Entschuldigung = Excuse me | ich = I | habe = have | eine = a | Frage = question → Use 'Entschuldigung' to politely get attention."
      },
      {
        de: "Nein, danke. Das ist alles.",
        en: "No, thank you. That is all.",
        breakdown: "Nein = No | danke = thank you | Das = That | ist = is | alles = all → Polite way to decline and signal you are finished."
      }
    ],
    culturalNote: "Germans value directness, which foreigners sometimes mistake for rudeness. If a German waiter asks if you want more bread, a simple 'Nein, danke' is perfectly polite. You don't need to invent an excuse. However, omitting 'bitte' when ordering (saying just 'Ein Bier') is considered incredibly rude.",
    exercises: [
      {
        type: "translate",
        instruction: "Translate the short dialogues into German.",
        items: [
          { prompt: "A water, please.", answer: "Ein Wasser, bitte." },
          { prompt: "Excuse me, I have a question.", answer: "Entschuldigung, ich habe eine Frage." }
        ]
      },
      {
        type: "reorder",
        instruction: "Unscramble the words to form correct phrases.",
        items: [
          { prompt: "Problem / Kein / !", answer: "Kein Problem!" },
          { prompt: "Dank / Kaffee / Vielen / den / für", answer: "Vielen Dank für den Kaffee." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Danke dir. -> Ich bin willkommen.",
        right: "Danke dir. -> Bitte schön! (or Gerne!)",
        explanation: "In German, 'willkommen' only means 'welcome' as in welcoming someone to a place, like 'Welcome to Germany!'. When someone thanks you, always reply with 'Bitte' or 'Gerne' — never 'Du bist willkommen'."
      },
      {
        wrong: "Entschuldigen.",
        right: "Entschuldigung.",
        explanation: "The word you use to get someone's attention on the street or in a shop is 'Entschuldigung'. Just use that one word — it is a set expression, like saying 'Excuse me'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can we practice a short dialogue where I buy a coffee and we use 'bitte' and 'danke' correctly?",
      "Ask Sky: What are 3 different ways to say 'thank you' in German, from casual to very formal?",
      "Ask Sky: How do I politely decline an offer in German without sounding rude?"
    ],
    examRelevance: "Hören & Sprechen Teil 2: You will hear short everyday dialogues (like shopping or ordering) where these polite phrases act as major contextual clues. You must also use them when making requests in the speaking exam.",
    lessonGoal: "Appropriately ask for things, express gratitude, reply to thanks, and get someone's attention using core German polite phrases."
  },
  {
    lessonNo: 3,
    titleEn: "Numbers Part 1: 1–20",
    titleDe: "Zahlen Teil 1: 1–20",
    introduction: "You cannot survive a single day in Germany without numbers. You need them to say your age, give your phone number, pay for something, or tell someone what floor you live on. The good news: 1 to 12 are unique words you just learn by heart, and 13 to 19 follow a very clear pattern — so they are not as hard as they look.",
    theRule: [
      "Numbers 0 to 12 are unique and must be memorized individually.",
      "Numbers 13 to 19 are formed by taking the base number and adding '-zehn' (ten). For example: vier (4) + zehn (10) = vierzehn (14).",
      "Watch out for exceptions: 16 is 'sechzehn' (drops the 's' from sechs) and 17 is 'siebzehn' (drops the 'en' from sieben)."
    ],
    formula: [
      "13-19 Pattern: [Base Number 3-9] + zehn",
      "Exception 16: sech (not sechs) + zehn = sechzehn",
      "Exception 17: sieb (not sieben) + zehn = siebzehn"
    ],
    grammarTable: {
      headers: ["Number", "German", "Number", "German"],
      rows: [
        ["0", "null", "11", "elf"],
        ["1", "eins", "12", "zwölf"],
        ["2", "zwei", "13", "dreizehn"],
        ["3", "drei", "14", "vierzehn"],
        ["4", "vier", "15", "fünfzehn"],
        ["5", "fünf", "16", "sechzehn"],
        ["6", "sechs", "17", "siebzehn"],
        ["7", "sieben", "18", "achtzehn"],
        ["8", "acht", "19", "neunzehn"],
        ["9", "neun", "20", "zwanzig"],
        ["10", "zehn", "", ""]
      ]
    },
    vocabulary: [
      { de: "die Zahl", en: "number", example: "Elf ist eine Zahl.", exampleEn: "Eleven is a number." },
      { de: "die Telefonnummer", en: "telephone number", example: "Wie ist deine Telefonnummer?", exampleEn: "What is your telephone number?" },
      { de: "die Vorwahl", en: "area code", example: "Die Vorwahl von Kothamangalam ist 0485.", exampleEn: "The area code of Kothamangalam is 0485." },
      { de: "das Alter", en: "age", example: "Mein Alter ist zwanzig.", exampleEn: "My age is twenty." },
      { de: "plus", en: "plus", example: "Zwei plus drei ist fünf.", exampleEn: "Two plus three is five." },
      { de: "minus", en: "minus", example: "Zehn minus eins ist neun.", exampleEn: "Ten minus one is nine." },
      { de: "null", en: "zero", example: "Ich habe null Euro.", exampleEn: "I have zero euros." },
      { de: "eins", en: "one", example: "Ich habe einen Bruder.", exampleEn: "I have one brother." },
      { de: "elf", en: "eleven", example: "Das Kind ist elf Jahre alt.", exampleEn: "The child is eleven years old." },
      { de: "zwölf", en: "twelve", example: "Es ist zwölf Uhr.", exampleEn: "It is twelve o'clock." },
      { de: "zwanzig", en: "twenty", example: "Wir sind zwanzig Personen.", exampleEn: "We are twenty people." }
    ],
    modelSentences: [
      {
        de: "Ich bin neunzehn Jahre alt.",
        en: "I am nineteen years old.",
        breakdown: "Ich = I | bin = am | neunzehn = nineteen | Jahre = years | alt = old → 'I am nineteen years old.'"
      },
      {
        de: "Fünf plus sieben ist zwölf.",
        en: "Five plus seven is twelve.",
        breakdown: "Fünf = Five | plus = plus | sieben = seven | ist = is | zwölf = twelve → 'Five plus seven is twelve.'"
      },
      {
        de: "Meine Nummer ist null eins sieben...",
        en: "My number is zero one seven...",
        breakdown: "Meine = My | Nummer = number | ist = is | null = zero | eins = one | sieben = seven → Phone numbers are read digit by digit."
      },
      {
        de: "Wir haben vierzehn Stühle.",
        en: "We have fourteen chairs.",
        breakdown: "Wir = We | haben = have | vierzehn = fourteen | Stühle = chairs → 'We have fourteen chairs.'"
      }
    ],
    culturalNote: "When spelling out phone numbers in Germany, people usually read them in pairs (e.g., 01 76 ... read as 'null eins, sechsundsiebzehn'). However, for A1, dictating numbers single digit by digit ('null, eins, sieben, sechs') is perfectly acceptable and ensures you make no mistakes.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Solve the basic math equations with German number words.",
        items: [
          { prompt: "Zwei plus elf ist ___.", answer: "dreizehn", hint: "2 + 11" },
          { prompt: "Zwanzig minus vier ist ___.", answer: "sechzehn", hint: "20 - 4" },
          { prompt: "Acht plus neun ist ___.", answer: "siebzehn", hint: "8 + 9" }
        ]
      },
      {
        type: "choose",
        instruction: "Select the correct spelling for the number.",
        items: [
          { prompt: "16 (sechszehn / sechzehn)", answer: "sechzehn" },
          { prompt: "17 (siebzehn / siebenzehn)", answer: "siebzehn" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "sechszehn",
        right: "sechzehn",
        explanation: "Learners often apply the regular rule (sechs + zehn) blindly. For 16, the 's' is dropped."
      },
      {
        wrong: "siebenzehn",
        right: "siebzehn",
        explanation: "Similarly to 16, learners forget to drop the 'en'. 17 is 'siebzehn', not 'siebenzehn'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can you give me 5 simple math problems (addition and subtraction under 20) in German to solve?",
      "Ask Sky: Dictate a German phone number to me digit by digit so I can practice listening to numbers.",
      "Ask Sky: Ask me how old my family members are, and I will answer using numbers 1-20."
    ],
    examRelevance: "Hören Teil 1: You will absolutely have to listen to a phone number, a room number, or an age. Misunderstanding 16 vs 6 or 17 vs 7 is a deliberate trap set by examiners.",
    lessonGoal: "Count flawlessly from 0 to 20, understand spoken numbers in this range, and spell the exceptions (16 and 17) correctly."
  }
];
