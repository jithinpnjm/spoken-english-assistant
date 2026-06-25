import type { GermanA1BookLesson } from "../germanA1BookLessonTypes";

export const germanA1BookLessonsPart02: GermanA1BookLesson[] = [
  {
    lessonNo: 4,
    titleEn: "Numbers Part 2: 20–100",
    titleDe: "Zahlen Teil 2: 20–100",
    introduction: "Numbers from 21 upward work differently in German — you say the small number first, then the big one, connected by 'und'. So 45 is 'fünfundvierzig' (five-and-forty). This is the opposite of English and trips almost every beginner up at the supermarket checkout. Once you get used to the flip, you can handle any price or age between 20 and 100.",
    theRule: [
      "For numbers 21 to 99, say the single digit first, add 'und', and then say the tens (e.g., 21 is 'einundzwanzig': one-and-twenty).",
      "The number 1 loses its 's' when combined: 'einundzwanzig', not 'einsundzwanzig'.",
      "The tens generally end in '-zig' (vierzig, fünfzig), but 30 is an exception and ends in '-ßig' (dreißig).",
      "20 (zwanzig), 60 (sechzig, dropping the 's'), and 70 (siebzig, dropping the 'en') have slight spelling shifts from their base numbers."
    ],
    formula: [
      "21-99: [Single digit (no 's' for 1)] + und + [Ten word]",
      "Example 34: vier + und + dreißig = vierunddreißig"
    ],
    grammarTable: {
      headers: ["Tens", "German", "Example", "German Word"],
      rows: [
        ["20", "zwanzig", "21", "einundzwanzig"],
        ["30", "dreißig", "32", "zweiunddreißig"],
        ["40", "vierzig", "43", "dreiundvierzig"],
        ["50", "fünfzig", "54", "vierundfünfzig"],
        ["60", "sechzig", "65", "fünfundsechzig"],
        ["70", "siebzig", "76", "sechsundsiebzig"],
        ["80", "achtzig", "87", "siebenundachtzig"],
        ["90", "neunzig", "98", "achtundneunzig"],
        ["100", "hundert", "99", "neunundneunzig"]
      ]
    },
    vocabulary: [
      { de: "dreißig", en: "thirty", example: "Das Buch hat dreißig Seiten.", exampleEn: "The book has thirty pages." },
      { de: "vierzig", en: "forty", example: "Er ist vierzig Jahre alt.", exampleEn: "He is forty years old." },
      { de: "fünfzig", en: "fifty", example: "Das kostet fünfzig Euro.", exampleEn: "That costs fifty euros." },
      { de: "hundert", en: "one hundred", example: "Hundert Menschen sind hier.", exampleEn: "One hundred people are here." },
      { de: "kosten", en: "to cost", example: "Wie viel kostet das?", exampleEn: "How much does that cost?" },
      { de: "der Euro", en: "euro", example: "Der Kaffee kostet drei Euro.", exampleEn: "The coffee costs three euros." },
      { de: "der Cent", en: "cent", example: "Das macht neunzig Cent.", exampleEn: "That comes to ninety cents." },
      { de: "wie viel", en: "how much", example: "Wie viel Uhr ist es?", exampleEn: "How much (what) time is it?" },
      { de: "teuer", en: "expensive", example: "Das Auto ist teuer.", exampleEn: "The car is expensive." },
      { de: "billig", en: "cheap", example: "Das Wasser ist billig.", exampleEn: "The water is cheap." }
    ],
    modelSentences: [
      {
        de: "Das kostet fünfundvierzig Euro.",
        en: "That costs forty-five euros.",
        breakdown: "Das = That | kostet = costs | fünfundvierzig = forty-five | Euro = euros → 'That costs forty-five euros.'"
      },
      {
        de: "Meine Oma ist dreiundachtzig Jahre alt.",
        en: "My grandma is eighty-three years old.",
        breakdown: "Meine = My | Oma = grandma | ist = is | dreiundachtzig = eighty-three | Jahre = years | alt = old → 'My grandma is eighty-three years old.'"
      },
      {
        de: "Der Zug hat zweiundsechzig Minuten Verspätung.",
        en: "The train has a sixty-two minute delay.",
        breakdown: "Der = The | Zug = train | hat = has | zweiundsechzig = sixty-two | Minuten = minutes | Verspätung = delay → 'The train has a sixty-two minute delay.'"
      },
      {
        de: "Wie viel kostet das Brot?",
        en: "How much does the bread cost?",
        breakdown: "Wie viel = How much | kostet = costs | das = the | Brot = bread → 'How much does the bread cost?'"
      }
    ],
    culturalNote: "When a cashier tells you a price, they often omit the words 'Euro' and 'Cent'. If the total is 24.50€, they will likely just say 'vierundzwanzig fünfzig'. Knowing your numbers back-to-front prevents the awkward pause of holding out a handful of coins and hoping they take the right amount.",
    exercises: [
      {
        type: "translate",
        instruction: "Write out the full German word for these numbers.",
        items: [
          { prompt: "37", answer: "siebenunddreißig" },
          { prompt: "81", answer: "einundachtzig" },
          { prompt: "54", answer: "vierundfünfzig" }
        ]
      },
      {
        type: "choose",
        instruction: "Choose the correct spoken price.",
        items: [
          { prompt: "45€ (fünfundvierzig Euro / vierzigundfünf Euro)", answer: "fünfundvierzig Euro" },
          { prompt: "62€ (sechsundzwanzig Euro / zweiundsechzig Euro)", answer: "zweiundsechzig Euro" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "zwanzigundfünf",
        right: "fünfundzwanzig",
        explanation: "English speakers naturally want to say the tens first. In German, the single digit always comes first."
      },
      {
        wrong: "einsunddreißig",
        right: "einunddreißig",
        explanation: "The number 1 is 'eins', but when compounded with 'und', the 's' is dropped."
      },
      {
        wrong: "dreizig",
        right: "dreißig",
        explanation: "Unlike 20 (zwanzig) and 40 (vierzig), 30 is spelled with an 'ß' (Eszett), making it 'dreißig'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 random numbers between 20 and 100 in English, and I will translate them to German.",
      "Ask Sky: Can we play a game where you list prices of grocery items and I write down the digits?",
      "Ask Sky: Test me on the spelling of the 'tens' (20, 30, 40, etc.) in German."
    ],
    examRelevance: "Hören Teil 1 & 2: Prices, weights, and ages are heavily tested. You will hear a price like 45€ but the multiple choice will try to trick you with 54€.",
    lessonGoal: "Mentally process and verbally state German numbers from 20 to 100 instantly, especially for ages and prices."
  },
  {
    lessonNo: 5,
    titleEn: "Alphabet",
    titleDe: "Das Alphabet",
    introduction: "In Germany, people spell out names, street addresses, and email addresses all the time — on the phone, at the post office, at government offices. The tricky part is that several German letters sound completely different from what English speakers expect. Get these right and you will never have your name misspelled on an official form again.",
    theRule: [
      "The vowels A, E, and I are pronounced differently: 'A' sounds like 'ah', 'E' sounds like 'eh', and 'I' sounds like a sharp 'ee'.",
      "'J' is pronounced like the English 'Y' (Yot).",
      "'V' is pronounced like an English 'F' (Fau), while 'W' is pronounced like an English 'V' (Veh).",
      "German has four extra letters: Ä (ae), Ö (oe), Ü (ue), and ß (Eszett/sharp S).",
      "To ask someone to spell something, ask 'Wie buchstabiert man das?'"
    ],
    formula: [
      "Spelling request: Wie buchstabieren Sie [Name/Word]?",
      "Spelling reply: Das buchstabiert man: [Letter] - [Letter] - [Letter]..."
    ],
    vocabulary: [
      { de: "das Alphabet", en: "alphabet", example: "Das Alphabet hat 26 Buchstaben.", exampleEn: "The alphabet has 26 letters." },
      { de: "der Buchstabe", en: "letter (of alphabet)", example: "A ist ein Buchstabe.", exampleEn: "A is a letter." },
      { de: "buchstabieren", en: "to spell", example: "Können Sie das buchstabieren?", exampleEn: "Can you spell that?" },
      { de: "der Name", en: "name", example: "Mein Name ist Schmidt.", exampleEn: "My name is Schmidt." },
      { de: "der Vorname", en: "first name", example: "Mein Vorname ist Tom.", exampleEn: "My first name is Tom." },
      { de: "der Nachname", en: "last name / surname", example: "Ihr Nachname ist Müller.", exampleEn: "Her last name is Müller." },
      { de: "die E-Mail-Adresse", en: "email address", example: "Wie ist Ihre E-Mail-Adresse?", exampleEn: "What is your email address?" },
      { de: "der Punkt", en: "dot / full stop", example: "max punkt meyer at gmail punkt com", exampleEn: "max dot meyer at gmail dot com" },
      { de: "das At-Zeichen", en: "@ symbol", example: "Das At-Zeichen ist wichtig.", exampleEn: "The @ symbol is important." },
      { de: "schreiben", en: "to write", example: "Wie schreibt man das?", exampleEn: "How do you write that?" }
    ],
    modelSentences: [
      {
        de: "Können Sie das bitte buchstabieren?",
        en: "Can you please spell that?",
        breakdown: "Können = Can | Sie = you (formal) | das = that | bitte = please | buchstabieren = spell → Polite request to spell something out."
      },
      {
        de: "Mein Nachname ist Meier: M - E - I - E - R.",
        en: "My last name is Meier: M - E - I - E - R.",
        breakdown: "Mein = My | Nachname = last name | ist = is | Meier = last name → Remember: German 'E' sounds like 'eh', 'I' sounds like 'ee'."
      },
      {
        de: "Wie schreibt man das?",
        en: "How do you write that?",
        breakdown: "Wie = How | schreibt = writes | man = one / you (general) | das = that → A useful phrase when you are not sure how something is spelled."
      },
      {
        de: "Müller, mit M - Ü - L - L - E - R.",
        en: "Müller, with M - Ü - L - L - E - R.",
        breakdown: "Müller = last name | mit = with → The Ü (U-umlaut) is a unique German letter — pronounced like 'ue'."
      }
    ],
    culturalNote: "If you have a non-German name, you will spell it constantly. To clarify letters over bad phone lines, Germans use the 'Buchstabiertafel' (spelling alphabet) using names: A wie Anton, B wie Berta, S wie Siegfried. When spelling an email address, '@' is simply pronounced 'at' (like the English word).",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct pronunciation sound for the German letter.",
        items: [
          { prompt: "The German letter 'E' sounds like the English: ( A / E / I )", answer: "A" },
          { prompt: "The German letter 'I' sounds like the English: ( E / I / Y )", answer: "E" },
          { prompt: "The German letter 'W' sounds like the English: ( W / V / F )", answer: "V" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the useful phrases.",
        items: [
          { prompt: "How do you write that?", answer: "Wie schreibt man das?" },
          { prompt: "Can you spell that?", answer: "Können Sie das buchstabieren?" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Pronouncing 'I' as 'eye'.",
        right: "Pronouncing 'I' as 'ee'.",
        explanation: "If you spell 'Smith' using the English 'I' sound, a German will write down 'Smath' or 'Smeith' because the English 'I' sounds like the German diphthong 'ei'."
      },
      {
        wrong: "Confusing V and W.",
        right: "V = 'Fau' (f sound), W = 'Veh' (v sound).",
        explanation: "If your name is 'Victor' and you say 'V' (Veh), they will write down 'Wictor'. You must spell it 'Fau - I - C...'"
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can you dictate 5 difficult German names letter by letter so I can write them down?",
      "Ask Sky: I will spell my first and last name using German letter sounds. Can you tell me if I get it right?",
      "Ask Sky: What are the standard names used in the German telephone alphabet (Buchstabiertafel)?"
    ],
    examRelevance: "Hören Teil 1 & Sprechen Teil 1: You are almost guaranteed to hear someone spell out a name or street in the listening test. In the speaking test, the examiner will explicitly ask you to spell your first name, last name, or hometown.",
    lessonGoal: "Accurately spell your own name and email address in German, and correctly write down words spelled out to you."
  },
  {
    lessonNo: 6,
    titleEn: "Introducing Yourself",
    titleDe: "Sich vorstellen",
    introduction: "Whether you are starting the A1 speaking exam, joining a new workplace, or just meeting someone at a party, introducing yourself in German follows a simple, reliable pattern. Three short sentences — your name, where you are from, and where you live now — are all you need to make a confident first impression.",
    theRule: [
      "To say your name, use 'Ich heiße...' (I am called...) or 'Ich bin...' (I am...).",
      "To say where you are from originally, use 'Ich komme aus...' (I come from...).",
      "To say where you currently live, use 'Ich wohne in...' (I live in...).",
      "The verb in these simple statements always takes the first-person '-e' ending: heiß-e, komm-e, wohn-e."
    ],
    formula: [
      "Name: Ich + heiße + [Name].",
      "Origin: Ich + komme + aus + [Country/City].",
      "Residence: Ich + wohne + in + [City]."
    ],
    vocabulary: [
      { de: "heißen", en: "to be called", example: "Ich heiße Anna.", exampleEn: "My name is Anna (I am called Anna)." },
      { de: "kommen", en: "to come", example: "Ich komme aus Spanien.", exampleEn: "I come from Spain." },
      { de: "aus", en: "from (origin)", example: "Er kommt aus Berlin.", exampleEn: "He comes from Berlin." },
      { de: "wohnen", en: "to live (reside)", example: "Ich wohne in München.", exampleEn: "I live in Munich." },
      { de: "in", en: "in", example: "Wir wohnen in Hamburg.", exampleEn: "We live in Hamburg." },
      { de: "das Land", en: "country", example: "Deutschland ist ein Land.", exampleEn: "Germany is a country." },
      { de: "die Stadt", en: "city", example: "Berlin ist eine Stadt.", exampleEn: "Berlin is a city." },
      { de: "Deutschland", en: "Germany", example: "Ich wohne in Deutschland.", exampleEn: "I live in Germany." },
      { de: "die Schweiz", en: "Switzerland", example: "Ich komme aus der Schweiz.", exampleEn: "I come from Switzerland." },
      { de: "Österreich", en: "Austria", example: "Wien ist in Österreich.", exampleEn: "Vienna is in Austria." }
    ],
    modelSentences: [
      {
        de: "Guten Tag, ich heiße Thomas Müller.",
        en: "Good day, my name is Thomas Müller.",
        breakdown: "Guten Tag = Good day | ich = I | heiße = am called | Thomas Müller = full name → Standard formal self-introduction."
      },
      {
        de: "Ich komme aus Italien.",
        en: "I come from Italy.",
        breakdown: "Ich = I | komme = come | aus = from | Italien = Italy → 'aus' means 'from' when talking about where you were born or grew up."
      },
      {
        de: "Ich wohne jetzt in Frankfurt.",
        en: "I live in Frankfurt now.",
        breakdown: "Ich = I | wohne = live | jetzt = now | in = in | Frankfurt = city name → 'wohnen' means where you currently live."
      },
      {
        de: "Ich komme aus der Türkei, aber ich wohne in Köln.",
        en: "I come from Turkey, but I live in Cologne.",
        breakdown: "Ich komme aus = I come from | der Türkei = Turkey (needs 'der' before it) | aber = but | ich wohne in = I live in | Köln = Cologne → Some countries need an article — Turkey is one of them."
      }
    ],
    culturalNote: "When introducing yourself in a business setting, Germans usually use their first and last name ('Ich bin Lukas Weber'). In very formal contexts, they might only use their last name. Be aware that a few countries have articles in German. If you are from the USA, Switzerland, or Turkey, you don't just say 'aus USA', you say 'aus den USA', 'aus der Schweiz', or 'aus der Türkei'.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Fill in the correct verb or preposition.",
        items: [
          { prompt: "Ich ___ aus Frankreich.", answer: "komme", hint: "verb for origin" },
          { prompt: "Ich wohne ___ Berlin.", answer: "in", hint: "preposition for location" },
          { prompt: "Ich ___ Laura.", answer: "heiße", hint: "verb for name" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate your introduction.",
        items: [
          { prompt: "I am called Max and I live in Munich.", answer: "Ich heiße Max und ich wohne in München." },
          { prompt: "I come from Germany.", answer: "Ich komme aus Deutschland." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich bin heiße Peter.",
        right: "Ich heiße Peter. (or: Ich bin Peter.)",
        explanation: "English speakers often try to use 'bin' (am) and 'heiße' together. You only need one verb here. Either say 'Ich heiße Peter' or 'Ich bin Peter' — not both."
      },
      {
        wrong: "Ich komme von Spanien.",
        right: "Ich komme aus Spanien.",
        explanation: "To say where you were born or grew up, always use 'aus', never 'von'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can you pretend to be a stranger at a party, and we practice introducing ourselves back and forth?",
      "Ask Sky: I am from [Your Country] and live in [Your City]. How do I say this perfectly in German?",
      "Ask Sky: Which countries require 'articles' when I say 'Ich komme aus...'?"
    ],
    examRelevance: "Sprechen Teil 1: The very first task of the speaking exam requires you to introduce yourself. You must fluently string together your name, origin, residence, age, languages, and profession.",
    lessonGoal: "Introduce yourself smoothly, stating your name, country of origin, and current city using correct verbs and prepositions."
  },
  {
    lessonNo: 7,
    titleEn: "Getting to Know Someone",
    titleDe: "Jemanden kennenlernen",
    introduction: "A real conversation is a two-way street. Once you introduce yourself, you need to ask the other person about themselves. In German, there is an important rule: you speak differently to a stranger than to a friend. Using the wrong form can come across as rude or too familiar. This lesson gives you both sets of questions so you are ready for any situation.",
    theRule: [
      "Use 'Sie' (capitalized) to address strangers, elders, or professionals. The verb ends in '-en' (e.g., Woher kommen Sie?).",
      "Use 'du' to address friends, children, and peers in casual settings. The verb ends in '-st' (e.g., Woher kommst du?).",
      "To ask 'where from', use the question word 'Woher'.",
      "To ask 'where at', use the question word 'Wo'."
    ],
    formula: [
      "Formal: Question word + Verb(-en) + Sie? -> Woher kommen Sie?",
      "Informal: Question word + Verb(-st) + du? -> Woher kommst du?"
    ],
    grammarTable: {
      headers: ["Pronoun", "heißen (to be called)", "kommen (to come)", "wohnen (to live)"],
      rows: [
        ["ich", "heiße", "komme", "wohne"],
        ["du (informal)", "heißt (exception: no s)", "kommst", "wohnst"],
        ["Sie (formal)", "heißen", "kommen", "wohnen"]
      ]
    },
    vocabulary: [
      { de: "wer", en: "who", example: "Wer bist du?", exampleEn: "Who are you?" },
      { de: "woher", en: "where from", example: "Woher kommen Sie?", exampleEn: "Where do you come from?" },
      { de: "wo", en: "where (location)", example: "Wo wohnst du?", exampleEn: "Where do you live?" },
      { de: "sprechen", en: "to speak", example: "Sprechen Sie Englisch?", exampleEn: "Do you speak English?" },
      { de: "die Sprache", en: "language", example: "Welche Sprachen sprichst du?", exampleEn: "Which languages do you speak?" },
      { de: "Deutsch", en: "German", example: "Ich lerne Deutsch.", exampleEn: "I am learning German." },
      { de: "Englisch", en: "English", example: "Wir sprechen Englisch.", exampleEn: "We speak English." },
      { de: "und", en: "and", example: "Ich heiße Max und du?", exampleEn: "My name is Max, and you?" },
      { de: "ein bisschen", en: "a little bit", example: "Ich spreche ein bisschen Deutsch.", exampleEn: "I speak a little bit of German." },
      { de: "welche", en: "which", example: "Welche Sprache ist das?", exampleEn: "Which language is that?" }
    ],
    modelSentences: [
      {
        de: "Wie heißen Sie?",
        en: "What is your name? (Formal)",
        breakdown: "Wie = How | heißen = are called | Sie = you (formal) → Literally 'How are you called?' — used with strangers or in professional settings."
      },
      {
        de: "Woher kommst du?",
        en: "Where do you come from? (Informal)",
        breakdown: "Woher = Where from | kommst = come | du = you (informal) → Used with friends or people your own age."
      },
      {
        de: "Wo wohnen Sie?",
        en: "Where do you live? (Formal)",
        breakdown: "Wo = Where | wohnen = live | Sie = you (formal) → Asking about where someone currently lives."
      },
      {
        de: "Welche Sprachen sprichst du?",
        en: "Which languages do you speak? (Informal)",
        breakdown: "Welche = Which | Sprachen = languages | sprichst = speak | du = you (informal) → 'sprechen' changes its vowel for 'du': sprichst."
      }
    ],
    culturalNote: "The 'Sie' vs. 'du' distinction (known as 'siezen' and 'duzen') is taken very seriously in Germany. In a corporate job, you might work with a colleague for years and still use 'Sie'. It is always safest to default to 'Sie' with adults until they explicitly offer the 'du', usually by saying 'Wir können gerne du sagen' (We can gladly say 'du').",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct verb ending based on the pronoun.",
        items: [
          { prompt: "Wo wohn___ Sie? (-st / -en)", answer: "-en" },
          { prompt: "Woher komm___ du? (-st / -en)", answer: "-st" },
          { prompt: "Wie heiß___ du? (-en / -t)", answer: "-t" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Choose between 'Wo' (where) and 'Woher' (where from).",
        items: [
          { prompt: "___ wohnst du?", answer: "Wo", hint: "Asking for static location" },
          { prompt: "___ kommen Sie?", answer: "Woher", hint: "Asking for origin" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Wo kommst du?",
        right: "Woher kommst du?",
        explanation: "A very common error. 'Wo' means 'where' (location). 'Woher' means 'where from' (motion/origin). You cannot use 'wo' with the verb 'kommen' in this context."
      },
      {
        wrong: "Wer heißt du?",
        right: "Wie heißt du?",
        explanation: "In English, we ask 'WHAT is your name?'. In German, we literally ask 'HOW are you called?' -> 'Wie heißt du?'. 'Wer' means 'who' (Wer bist du?)."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can you ask me 5 questions using the formal 'Sie' so I can practice answering them?",
      "Ask Sky: Give me 3 scenarios and I will tell you whether to use 'du' or 'Sie'.",
      "Ask Sky: What is the difference between 'sprechen' for 'ich' and 'du'? Can you explain the vowel change?"
    ],
    examRelevance: "Sprechen Teil 2: In the speaking exam, you will pick cards with words on them and must form direct questions to your partner. If you confuse the verb endings for 'Sie' and 'du', you will lose points.",
    lessonGoal: "Ask someone about their name, origin, residence, and languages spoken, using both formal and informal address correctly."
  },
  {
    lessonNo: 8,
    titleEn: "How are you?",
    titleDe: "Wie geht's?",
    introduction: "In German, 'Wie geht es dir?' is a real question — not just a filler greeting. When a German asks how you are, they genuinely expect an honest answer. Knowing how to ask and answer correctly will make your conversations feel much more natural, and you will avoid the famous beginner mistake of saying 'Ich bin gut'.",
    theRule: [
      "The phrase 'How are you?' translates literally to 'How goes it to you?'. Therefore, you must use special 'to me / to you' words.",
      "Informal: 'Wie geht es dir?' (How goes it to you?)",
      "Formal: 'Wie geht es Ihnen?' (How goes it to you [formal]?)",
      "Short version: 'Wie geht's?' (Only use informally!)",
      "The answer must follow the same structure: 'Mir geht es...' (To me it goes...)."
    ],
    formula: [
      "Question (Informal): Wie geht es + dir?",
      "Question (Formal): Wie geht es + Ihnen?",
      "Answer: Mir geht es + [Adverb: gut/schlecht/etc.]."
    ],
    vocabulary: [
      { de: "wie geht's", en: "how's it going", example: "Hallo Anna, wie geht's?", exampleEn: "Hello Anna, how's it going?" },
      { de: "dir", en: "to you (informal dative)", example: "Wie geht es dir?", exampleEn: "How are you?" },
      { de: "Ihnen", en: "to you (formal dative)", example: "Wie geht es Ihnen, Herr Meyer?", exampleEn: "How are you, Mr. Meyer?" },
      { de: "mir", en: "to me (dative)", example: "Mir geht es gut.", exampleEn: "I am fine." },
      { de: "gut", en: "good / fine", example: "Mir geht es sehr gut.", exampleEn: "I am doing very well." },
      { de: "sehr", en: "very", example: "Das Wetter ist sehr gut.", exampleEn: "The weather is very good." },
      { de: "schlecht", en: "bad", example: "Mir geht es heute schlecht.", exampleEn: "I feel bad today." },
      { de: "super", en: "super / great", example: "Mir geht es super!", exampleEn: "I am doing great!" },
      { de: "auch", en: "also / too", example: "Mir geht es auch gut.", exampleEn: "I am doing well too." },
      { de: "müde", en: "tired", example: "Ich bin müde.", exampleEn: "I am tired." }
    ],
    modelSentences: [
      {
        de: "Guten Tag Frau Schmidt, wie geht es Ihnen?",
        en: "Good day Mrs. Schmidt, how are you?",
        breakdown: "Guten Tag = Good day | Frau Schmidt = Mrs. Schmidt | wie = how | geht = goes | es = it | Ihnen = to you (formal) → Formal way to ask how someone is."
      },
      {
        de: "Hallo Tom, wie geht's?",
        en: "Hello Tom, how's it going?",
        breakdown: "Hallo = Hello | Tom = first name | wie geht's = how goes it (short for 'wie geht es') → Casual, fast way to ask friends."
      },
      {
        de: "Danke, mir geht es sehr gut. Und dir?",
        en: "Thanks, I am doing very well. And you?",
        breakdown: "Danke = Thanks | mir = to me | geht es = goes it | sehr = very | gut = good | Und dir = And you (informal) → Always return the question!"
      },
      {
        de: "Mir geht es nicht so gut.",
        en: "I am not doing so well.",
        breakdown: "Mir = to me | geht es = goes it | nicht = not | so = so | gut = good → Honest answer when things are not great."
      }
    ],
    culturalNote: "If you ask a German colleague 'Wie geht es Ihnen?' on a Monday morning, do not be surprised if they actually tell you they have a headache, didn't sleep well, or are stressed about a project. It is not considered impolite to answer honestly with 'nicht so gut' (not so well).",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Complete the mini dialogues.",
        items: [
          { prompt: "Wie geht es ___ , Herr Wagner?", answer: "Ihnen", hint: "Formal 'you' in dative" },
          { prompt: "Danke, ___ geht es super.", answer: "mir", hint: "'to me' in dative" },
          { prompt: "Hallo Lisa, wie geht es ___?", answer: "dir", hint: "Informal 'you' in dative" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate to German.",
        items: [
          { prompt: "I am doing well, thanks. And you (informal)?", answer: "Mir geht es gut, danke. Und dir?" },
          { prompt: "I am not doing so well today.", answer: "Mir geht es heute nicht so gut." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich bin gut.",
        right: "Mir geht es gut.",
        explanation: "Saying 'Ich bin gut' means 'I am a good person' or 'I am highly skilled at something'. To say you feel well, you MUST use 'Mir geht es gut'."
      },
      {
        wrong: "Wie geht du?",
        right: "Wie geht es dir?",
        explanation: "You cannot translate 'how are you' word-for-word. The correct structure is 'Wie geht es' + the 'to you' word (dir or Ihnen)."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can we practice a short dialogue where I am feeling bad today, and you ask me what is wrong?",
      "Ask Sky: Explain the difference between 'Ich bin gut' and 'Mir geht es gut' with more examples.",
      "Ask Sky: How do I reply to 'Wie geht's' with a neutral response, like 'so-so' or 'okay'?"
    ],
    examRelevance: "Sprechen Teil 1 & 2: This often serves as the warm-up question from the examiner before the actual test begins. Answering fluently sets a great impression.",
    lessonGoal: "Correctly ask about someone's well-being in both formal and informal situations, and reply accurately using the correct 'to me / to you' words."
  },
  {
    lessonNo: 9,
    titleEn: "Sentence Structure Part 1",
    titleDe: "Satzbau Teil 1",
    introduction: "There is one rule in German grammar that affects absolutely every sentence you will ever say or write. The verb must always be the second 'chunk' in a statement — no matter what. This single rule is the key to sounding correct in German. Master it early and your sentences will instantly sound natural.",
    theRule: [
      "In a standard declarative sentence (a regular statement), the conjugated verb is ALWAYS in the second position.",
      "The first position is usually the subject (who/what is doing the action).",
      "The third position (and beyond) contains the object or other information.",
      "Do not confuse 'second position' with 'second word'. If the subject is 'Der große Hund' (The big dog - 3 words), the verb comes immediately after that entire block."
    ],
    formula: [
      "Position 1 (Subject) + Position 2 (Conjugated Verb) + Position 3 (Object/Rest)",
      "Example: Ich (1) + trinke (2) + Wasser (3)."
    ],
    vocabulary: [
      { de: "lernen", en: "to learn / study", example: "Ich lerne Deutsch.", exampleEn: "I am learning German." },
      { de: "trinken", en: "to drink", example: "Er trinkt Tee.", exampleEn: "He is drinking tea." },
      { de: "essen", en: "to eat", example: "Wir essen Pizza.", exampleEn: "We are eating pizza." },
      { de: "machen", en: "to do / make", example: "Was machst du?", exampleEn: "What are you doing?" },
      { de: "kaufen", en: "to buy", example: "Sie kauft ein Buch.", exampleEn: "She is buying a book." },
      { de: "der Kaffee", en: "coffee", example: "Ich trinke Kaffee.", exampleEn: "I drink coffee." },
      { de: "das Wasser", en: "water", example: "Das Wasser ist kalt.", exampleEn: "The water is cold." },
      { de: "das Brot", en: "bread", example: "Ich esse Brot.", exampleEn: "I eat bread." },
      { de: "der Tee", en: "tea", example: "Trinkst du Tee?", exampleEn: "Do you drink tea?" },
      { de: "das Buch", en: "book", example: "Ich kaufe das Buch.", exampleEn: "I am buying the book." }
    ],
    modelSentences: [
      {
        de: "Ich trinke Kaffee.",
        en: "I drink coffee.",
        breakdown: "Ich = I (position 1) | trinke = drink (position 2 — the verb) | Kaffee = coffee (position 3) → Standard sentence order."
      },
      {
        de: "Der Mann lernt Deutsch.",
        en: "The man is learning German.",
        breakdown: "Der Mann = The man (position 1 — the whole subject block) | lernt = learns (position 2) | Deutsch = German (position 3) → 'Der Mann' is one unit, not two positions."
      },
      {
        de: "Wir machen einen Kurs.",
        en: "We are doing a course.",
        breakdown: "Wir = We (position 1) | machen = do (position 2) | einen Kurs = a course (position 3) → 'einen' is how 'ein' looks after action verbs with masculine words — just memorize this phrase for now."
      },
      {
        de: "Die Frau kauft das Wasser.",
        en: "The woman buys the water.",
        breakdown: "Die Frau = The woman (position 1) | kauft = buys (position 2) | das Wasser = the water (position 3) → Simple, clear sentence."
      }
    ],
    culturalNote: "Germans are very particular about their V2 (Verb-Second) rule. While native speakers make grammar mistakes with cases or genders, they almost never mess up verb position. If you misplace the verb, it immediately marks you as a beginner and can sometimes make your sentence entirely incomprehensible.",
    exercises: [
      {
        type: "reorder",
        instruction: "Put the words in the correct order to form a statement.",
        items: [
          { prompt: "Deutsch / lernt / Anna", answer: "Anna lernt Deutsch." },
          { prompt: "trinken / Kaffee / Wir", answer: "Wir trinken Kaffee." },
          { prompt: "ein Buch / Er / kauft", answer: "Er kauft ein Buch." }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Fill in the blank with the correctly conjugated verb from the prompt.",
        items: [
          { prompt: "Ich ___ (trinken) Wasser.", answer: "trinke", hint: "conjugate for 'ich'" },
          { prompt: "Der Mann ___ (essen) Brot.", answer: "isst", hint: "irregular form for 'er/sie/es'" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich Kaffee trinke.",
        right: "Ich trinke Kaffee.",
        explanation: "English speakers sometimes fall into a Subject-Object-Verb pattern when translating in their heads. In German main clauses, the verb must be in position 2."
      },
      {
        wrong: "Der großer Hund trinken Wasser.",
        right: "Der große Hund trinkt Wasser.",
        explanation: "Treating 'Der großer Hund' as three separate positions and throwing the verb somewhere else. 'Der große Hund' is ONE unit (the subject). The verb comes directly after it."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 scrambled German sentences consisting of a subject, verb, and object, and I will put them in the correct V2 order.",
      "Ask Sky: Why do Germans call it 'Position 2' instead of 'Word 2'? Can you give me examples?",
      "Ask Sky: Can you test me on verb conjugation for the verbs in this lesson (trinken, essen, machen, etc.)?"
    ],
    examRelevance: "Schreiben Teil 1 & 2: When you write an email or fill out forms, every single sentence will be graded on whether the verb is in the second position.",
    lessonGoal: "Construct simple, correct German statements by ensuring the conjugated verb is strictly locked into the second position."
  },
  {
    lessonNo: 10,
    titleEn: "Sentence Structure Part 2",
    titleDe: "Satzbau Teil 2",
    introduction: "Starting every sentence with 'Ich' sounds repetitive and robotic. In German, you can start a sentence with a time word like 'Today' or 'Now' to make your speech more dynamic — but there is a catch. The verb must still stay in second place. This means the subject 'I' gets pushed back to third place. Germans call this 'Inversion' and it is very natural once you get the hang of it.",
    theRule: [
      "The verb is rigidly locked in Position 2. It does not move.",
      "If you place a time (Today), place (Here), or other adverb in Position 1 to emphasize it, the subject gets pushed out of Position 1.",
      "The subject must move to Position 3, immediately AFTER the verb.",
      "Time + Verb + Subject + Object. (Heute trinke ich Kaffee.)"
    ],
    formula: [
      "Standard: Subject (1) + Verb (2) + Time/Place (3)",
      "Inversion: Time/Place (1) + Verb (2) + Subject (3)"
    ],
    vocabulary: [
      { de: "heute", en: "today", example: "Heute lerne ich.", exampleEn: "Today I am learning." },
      { de: "morgen", en: "tomorrow", example: "Morgen arbeite ich.", exampleEn: "Tomorrow I work." },
      { de: "jetzt", en: "now", example: "Jetzt trinken wir Tee.", exampleEn: "Now we are drinking tea." },
      { de: "hier", en: "here", example: "Hier ist das Buch.", exampleEn: "Here is the book." },
      { de: "dort", en: "there", example: "Dort wohnt er.", exampleEn: "He lives there." },
      { de: "spielen", en: "to play", example: "Die Kinder spielen.", exampleEn: "The children are playing." },
      { de: "arbeiten", en: "to work", example: "Ich arbeite heute.", exampleEn: "I work today." },
      { de: "oft", en: "often", example: "Ich lese oft.", exampleEn: "I read often." },
      { de: "immer", en: "always", example: "Er ist immer müde.", exampleEn: "He is always tired." },
      { de: "am Wochenende", en: "on the weekend", example: "Am Wochenende habe ich frei.", exampleEn: "On the weekend I am free." }
    ],
    modelSentences: [
      {
        de: "Heute spiele ich Fußball.",
        en: "Today I play soccer.",
        breakdown: "Heute = Today (position 1) | spiele = play (position 2 — verb stays here!) | ich = I (position 3) | Fußball = soccer (position 4) → Subject moves back when time word comes first."
      },
      {
        de: "Jetzt trinken wir Kaffee.",
        en: "Now we are drinking coffee.",
        breakdown: "Jetzt = Now (position 1) | trinken = drink (position 2) | wir = we (position 3) | Kaffee = coffee (position 4) → Same pattern with 'wir'."
      },
      {
        de: "Hier arbeitet mein Vater.",
        en: "My father works here.",
        breakdown: "Hier = Here (position 1) | arbeitet = works (position 2) | mein Vater = my father (position 3 — whole subject block) → 'mein Vater' is one unit."
      },
      {
        de: "Morgen kauft sie ein Auto.",
        en: "Tomorrow she is buying a car.",
        breakdown: "Morgen = Tomorrow (position 1) | kauft = buys (position 2) | sie = she (position 3) | ein Auto = a car (position 4) → Verb stays in 2, subject moves to 3."
      }
    ],
    culturalNote: "Germans love starting sentences with time words to set the context immediately. 'Morgen gehen wir ins Kino' (Tomorrow we are going to the movies) sounds much more natural and dynamic than always starting with 'Wir'. Mastering this inversion makes you sound less like a textbook and more like a local.",
    exercises: [
      {
        type: "reorder",
        instruction: "Reorder the words. Start the sentence with the bold word.",
        items: [
          { prompt: "**Heute** / Deutsch / ich / lerne", answer: "Heute lerne ich Deutsch." },
          { prompt: "**Jetzt** / wir / Pizza / essen", answer: "Jetzt essen wir Pizza." },
          { prompt: "**Hier** / kauft / der Mann / Brot", answer: "Hier kauft der Mann Brot." }
        ]
      },
      {
        type: "translate",
        instruction: "Translate these sentences, starting with the time or place.",
        items: [
          { prompt: "Tomorrow I work.", answer: "Morgen arbeite ich." },
          { prompt: "Now we are drinking water.", answer: "Jetzt trinken wir Wasser." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Heute ich trinke Kaffee.",
        right: "Heute trinke ich Kaffee.",
        explanation: "This is the most common A1 mistake! English says 'Today I drink'. If you do this in German, 'Heute' is pos 1, 'ich' is pos 2, and the verb is pushed to pos 3. The verb MUST stay in pos 2."
      },
      {
        wrong: "Am Wochenende ich spiele Fußball.",
        right: "Am Wochenende spiele ich Fußball.",
        explanation: "Even if the time expression is multiple words ('Am Wochenende'), it occupies the FIRST position block. The verb must immediately follow it."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 simple sentences starting with 'Ich'. I want to rewrite them to start with a time word like 'Heute' or 'Morgen'.",
      "Ask Sky: What is 'Inversion' in German grammar? Explain it to me simply with examples.",
      "Ask Sky: Can we practice a conversation where I tell you my schedule for today, tomorrow, and the weekend, using correct V2 order?"
    ],
    examRelevance: "Schreiben Teil 2: To get maximum points for writing, you must demonstrate variety in your sentence structure. Starting every sentence with 'Ich' lowers your score. Using 'Inversion' correctly boosts it.",
    lessonGoal: "Build dynamic sentences by placing time or place words at the beginning, while correctly inverting the subject to keep the verb in position 2."
  }
];
