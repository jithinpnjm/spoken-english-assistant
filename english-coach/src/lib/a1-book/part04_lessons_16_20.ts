import type { GermanA1BookLesson } from "../germanA1BookLessonTypes";

export const germanA1BookLessonsPart04: GermanA1BookLesson[] = [
  {
    lessonNo: 16,
    titleEn: "Numbers Part 3: Above 100",
    titleDe: "Zahlen Teil 3: Über 100",
    introduction: "Knowing numbers above 100 is crucial for stating years, paying rent, and giving exact addresses. German strings numbers together into massive single words, which looks terrifying at first. However, the pattern is completely logical. Once you break it down into blocks, reading large numbers becomes a simple puzzle.",
    theRule: [
      "To say numbers above 100, say the hundreds first, then add the tens and units exactly as you learned them (e.g., 121 = hundert einundzwanzig).",
      "Numbers below one million are technically written as one single, long word (e.g., dreihundertfünfundvierzig for 345).",
      "For years between 1100 and 1999, Germans say 'hundreds' instead of thousands. 1985 is 'neunzehnhundertfünfundachtzig' (19-hundred-85).",
      "Years 2000 and above are spoken normally using 'tausend' (zweitausend, zweitausendfünf)."
    ],
    formula: [
      "Standard: [Hundreds] + hundert + [Tens/Units] -> zwei + hundert + zehn = zweihundertzehn",
      "Years (1100-1999): [First two digits] + hundert + [Last two digits] -> neunzehn + hundert + neunzig = neunzehnhundertneunzig"
    ],
    vocabulary: [
      { de: "hundert", en: "hundred", example: "Das kostet hundert Euro.", exampleEn: "That costs a hundred euros." },
      { de: "tausend", en: "thousand", example: "Er hat tausend Fragen.", exampleEn: "He has a thousand questions." },
      { de: "die Million", en: "million", example: "Berlin hat vier Millionen Einwohner.", exampleEn: "Berlin has four million inhabitants." },
      { de: "das Jahr", en: "year", example: "Wir sind im Jahr zweitausend.", exampleEn: "We are in the year two thousand." },
      { de: "die Miete", en: "rent", example: "Die Miete ist achthundert Euro.", exampleEn: "The rent is eight hundred euros." },
      { de: "verdienen", en: "to earn", example: "Wie viel verdienst du?", exampleEn: "How much do you earn?" },
      { de: "das Gehalt", en: "salary", example: "Das Gehalt ist gut.", exampleEn: "The salary is good." },
      { de: "teuer", en: "expensive", example: "Tausend Euro ist zu teuer.", exampleEn: "A thousand euros is too expensive." },
      { de: "die Zahl", en: "number / figure", example: "Das ist eine große Zahl.", exampleEn: "That is a big number." },
      { de: "geboren", en: "born", example: "Ich bin zweitausend geboren.", exampleEn: "I was born in 2000." }
    ],
    modelSentences: [
      {
        de: "Das Auto kostet viertausendzweihundert Euro.",
        en: "The car costs four thousand two hundred euros.",
        breakdown: "Das Auto(The car) kostet(costs) viertausend(four thousand) zweihundert(two hundred) Euro(euros)."
      },
      {
        de: "Ich bin im Jahr neunzehnhundertneunundneunzig geboren.",
        en: "I was born in the year 1999.",
        breakdown: "Ich bin(am) im(in the) Jahr(year) neunzehn(nineteen) hundert(hundred) neunundneunzig(ninety-nine) geboren(born)."
      },
      {
        de: "Meine Miete ist siebenhundertfünfzig Euro.",
        en: "My rent is 750 euros.",
        breakdown: "Meine Miete(My rent) ist(is) siebenhundert(seven hundred) fünfzig(fifty) Euro."
      },
      {
        de: "Zweitausendfünfzehn war ein gutes Jahr.",
        en: "2015 was a good year.",
        breakdown: "Zweitausend(Two thousand) fünfzehn(fifteen) war(was) ein(a) gutes(good) Jahr(year)."
      }
    ],
    culturalNote: "When writing text messages or emails, Germans use digits for almost any number above 12 because writing out 'dreitausendvierhundertfünfundzwanzig' is visually exhausting. However, you must be able to read these numbers aloud accurately when dealing with bank clerks, real estate agents, or government offices.",
    exercises: [
      {
        type: "translate",
        instruction: "Write the numerical digits for the spelled-out German numbers.",
        items: [
          { prompt: "eintausendfünfhundert", answer: "1500" },
          { prompt: "neunzehnhundertachtzig", answer: "1980" },
          { prompt: "dreihundertfünfundvierzig", answer: "345" }
        ]
      },
      {
        type: "choose",
        instruction: "Select the correct way to read the year out loud.",
        items: [
          { prompt: "1994 (eintausendneunhundertvierundneunzig / neunzehnhundertvierundneunzig)", answer: "neunzehnhundertvierundneunzig" },
          { prompt: "2012 (zwanzighundertzwölf / zweitausendzwölf)", answer: "zweitausendzwölf" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "eintausendneunhundertneunzig (for the year 1990)",
        right: "neunzehnhundertneunzig",
        explanation: "While 'eintausendneunhundert...' is mathematically correct for the number 1,990, Germans almost never use it for historical dates before 2000. You must use the 'hundreds' format for years."
      },
      {
        wrong: "zwei hundert und fünfzig",
        right: "zweihundertfünfzig",
        explanation: "English speakers naturally add 'and' (und) between the hundreds and the tens. In German, there is no 'und' there. 'und' is ONLY used between single units and tens (fünf-und-fünfzig)."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 random years from history, and I will try to write out how to pronounce them in German.",
      "Ask Sky: Give me some typical German rental prices (e.g., 850€, 1200€) in digits, and I will spell them out.",
      "Ask Sky: How do you say large numbers like '1.5 million' or '2.3 million' in German?"
    ],
    examRelevance: "Hören Teil 3: You will often hear radio announcements or news clips with large numbers, such as a traffic jam length (z.B. 15 Kilometer), a year, or a ticket price. Misinterpreting these numbers costs points.",
    lessonGoal: "Correctly pronounce years, prices, and large numbers up to 10,000, understanding the structural differences from English."
  },
  {
    lessonNo: 17,
    titleEn: "Adjectives and Opposites",
    titleDe: "Adjektive und Gegenteile",
    introduction: "Adjectives breathe life into your sentences, allowing you to describe feelings, sizes, and quality. Here is a massive relief for A1 learners: when an adjective comes AFTER the verb 'sein' (to be) to describe the subject, it takes NO complex endings. It stays exactly as it appears in the dictionary. Learning these adjectives in pairs of opposites is the fastest way to double your vocabulary.",
    theRule: [
      "When an adjective comes after a form of 'sein' (is, am, are), it is called a 'predicative adjective'.",
      "Predicative adjectives do NOT change. They do not get any grammatical endings (e.g., Das Auto ist klein. Die Autos sind klein).",
      "Use 'sehr' (very) before the adjective to intensify it positively or neutrally.",
      "Use 'zu' (too) before the adjective to indicate that something is excessively or negatively intense."
    ],
    formula: [
      "Subject + sein + Adjective -> Der Kaffee ist heiß.",
      "Subject + sein + (sehr / zu) + Adjective -> Der Kaffee ist zu heiß."
    ],
    vocabulary: [
      { de: "groß", en: "big / tall", example: "Das Haus ist groß.", exampleEn: "The house is big." },
      { de: "klein", en: "small / short", example: "Das Kind ist klein.", exampleEn: "The child is small." },
      { de: "heiß", en: "hot", example: "Der Tee ist zu heiß.", exampleEn: "The tea is too hot." },
      { de: "kalt", en: "cold", example: "Das Wasser ist sehr kalt.", exampleEn: "The water is very cold." },
      { de: "teuer", en: "expensive", example: "Das Auto ist teuer.", exampleEn: "The car is expensive." },
      { de: "billig", en: "cheap", example: "Das Brot ist billig.", exampleEn: "The bread is cheap." },
      { de: "neu", en: "new", example: "Mein Handy ist neu.", exampleEn: "My cellphone is new." },
      { de: "alt", en: "old", example: "Die Frau ist alt.", exampleEn: "The woman is old." },
      { de: "sehr", en: "very", example: "Das Essen ist sehr gut.", exampleEn: "The food is very good." },
      { de: "zu", en: "too (excessive)", example: "Die Wohnung ist zu klein.", exampleEn: "The apartment is too small." }
    ],
    modelSentences: [
      {
        de: "Mein Haus ist neu, aber es ist zu klein.",
        en: "My house is new, but it is too small.",
        breakdown: "Mein Haus(My house) ist(is) neu(new), aber(but) es(it) ist(is) zu(too) klein(small)."
      },
      {
        de: "Der Kaffee ist sehr heiß.",
        en: "The coffee is very hot.",
        breakdown: "Der Kaffee(The coffee) ist(is) sehr(very) heiß(hot)."
      },
      {
        de: "Sind die Tomaten billig oder teuer?",
        en: "Are the tomatoes cheap or expensive?",
        breakdown: "Sind(Are) die Tomaten(the tomatoes/plural) billig(cheap) oder(or) teuer(expensive)?"
      },
      {
        de: "Das Auto ist alt und sehr teuer.",
        en: "The car is old and very expensive.",
        breakdown: "Das Auto(The car) ist(is) alt(old) und(and) sehr(very) teuer(expensive)."
      }
    ],
    culturalNote: "Germans are known for direct communication. If you ask a German friend if your new jacket looks good, and they don't like it, they might just say 'Nein, sie ist nicht schön' (No, it's not beautiful). While English speakers might cushion the blow, Germans view direct adjectives as honest rather than rude.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the logical opposite of the adjective.",
        items: [
          { prompt: "heiß -> ( neu / groß / kalt )", answer: "kalt" },
          { prompt: "teuer -> ( billig / alt / klein )", answer: "billig" },
          { prompt: "neu -> ( sehr / alt / schlecht )", answer: "alt" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Fill in 'sehr' (very) or 'zu' (too) based on the context hint.",
        items: [
          { prompt: "Ich trinke den Kaffee nicht. Er ist ___ heiß.", answer: "zu", hint: "negative/excessive amount" },
          { prompt: "Das Essen schmeckt fantastisch! Es ist ___ gut.", answer: "sehr", hint: "positive intensifier" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Die Autos sind kleines.",
        right: "Die Autos sind klein.",
        explanation: "Learners often try to make adjectives plural if the noun is plural. Predicative adjectives (after 'sein') NEVER take an ending. Only the verb (sind) changes for plurals."
      },
      {
        wrong: "Der Kaffee ist zu gut.",
        right: "Der Kaffee ist sehr gut.",
        explanation: "In English slang, 'too good' can mean 'amazing'. In German, 'zu' is strictly negative/excessive. 'Zu gut' implies it's suspiciously good or causing a problem. Use 'sehr' for positive enhancement."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 10 German adjectives, and I will try to reply with their direct opposites.",
      "Ask Sky: Create 5 fill-in-the-blank sentences where I have to choose between 'sehr' and 'zu'.",
      "Ask Sky: Can we practice describing objects in a room using simple 'Das ist...' sentences and adjectives?"
    ],
    examRelevance: "Schreiben Teil 1 & Sprechen Teil 2: Describing things simply is a core A1 task. You must be able to state whether your apartment is big, your food is hot, or a ticket is expensive without getting tangled in adjective declension rules.",
    lessonGoal: "Describe people, objects, and situations using basic adjectives and intensifiers without applying unnecessary grammatical endings."
  },
  {
    lessonNo: 18,
    titleEn: "How to Introduce Someone Else",
    titleDe: "Jemanden vorstellen",
    introduction: "Once you can introduce yourself, the next step is introducing colleagues, friends, or family to each other. This requires a mental shift from 'I' (ich) to 'he/she/they' (er/sie), ensuring you change the verb endings to match. Mastering this allows you to act as a bridge in social and professional settings.",
    theRule: [
      "To point out or introduce someone, use the fixed phrase 'Das ist...' (This is...) for one person, or 'Das sind...' (These are...) for multiple people.",
      "After the introduction, switch to the 3rd person pronouns 'er' (he) or 'sie' (she/they) to provide more details.",
      "Remember to conjugate the verbs for the 3rd person: 'er/sie' singular takes the '-t' ending (er kommt, sie wohnt).",
      "If you introduce two people, the pronoun 'sie' (they) takes the '-en' plural ending (sie kommen)."
    ],
    formula: [
      "Singular Introduction: Das ist + [Name]. Er/Sie + verb(-t) + aus/in...",
      "Plural Introduction: Das sind + [Name 1] und [Name 2]. Sie + verb(-en) + aus/in..."
    ],
    vocabulary: [
      { de: "vorstellen", en: "to introduce", example: "Ich möchte Tom vorstellen.", exampleEn: "I would like to introduce Tom." },
      { de: "der Freund", en: "male friend / boyfriend", example: "Das ist mein Freund.", exampleEn: "This is my friend." },
      { de: "die Freundin", en: "female friend / girlfriend", example: "Das ist meine Freundin Anna.", exampleEn: "This is my friend Anna." },
      { de: "der Kollege", en: "male colleague", example: "Er ist mein Kollege.", exampleEn: "He is my colleague." },
      { de: "die Kollegin", en: "female colleague", example: "Sie ist eine Kollegin.", exampleEn: "She is a colleague." },
      { de: "das ist", en: "this is", example: "Das ist Herr Weber.", exampleEn: "This is Mr. Weber." },
      { de: "das sind", en: "these are", example: "Das sind Maria und Tom.", exampleEn: "These are Maria and Tom." },
      { de: "auch", en: "also / too", example: "Er kommt auch aus Berlin.", exampleEn: "He also comes from Berlin." },
      { de: "zusammen", en: "together", example: "Sie arbeiten zusammen.", exampleEn: "They work together." },
      { de: "kennen", en: "to know (a person)", example: "Kennst du Tom?", exampleEn: "Do you know Tom?" }
    ],
    modelSentences: [
      {
        de: "Das ist mein Kollege, Tom. Er arbeitet hier.",
        en: "This is my colleague, Tom. He works here.",
        breakdown: "Das ist(This is) mein Kollege(my colleague), Tom. Er(He) arbeitet(works / 3rd person '-t' ending) hier(here)."
      },
      {
        de: "Das ist Frau Müller. Sie kommt aus Österreich.",
        en: "This is Mrs. Müller. She comes from Austria.",
        breakdown: "Das ist(This is) Frau Müller. Sie(She) kommt(comes / 3rd person '-t' ending) aus Österreich(from Austria)."
      },
      {
        de: "Das sind Laura und Paul. Sie wohnen in München.",
        en: "These are Laura and Paul. They live in Munich.",
        breakdown: "Das sind(These are / plural) Laura und Paul. Sie(They) wohnen(live / plural '-en' ending) in München."
      },
      {
        de: "Kennst du Max? Er ist mein Freund.",
        en: "Do you know Max? He is my friend.",
        breakdown: "Kennst(Know) du Max? Er ist(is) mein Freund(my friend)."
      }
    ],
    culturalNote: "In German, the words 'Freund' and 'Freundin' are notoriously ambiguous. Saying 'Er ist mein Freund' usually implies he is your romantic boyfriend. To introduce a platonic friend, Germans usually say 'Er ist ein Freund von mir' (He is a friend of mine) to avoid any awkward misunderstandings.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Choose between 'Das ist' (singular) and 'Das sind' (plural).",
        items: [
          { prompt: "___ Herr und Frau Schmidt.", answer: "Das sind", hint: "Two people" },
          { prompt: "___ mein Kollege Peter.", answer: "Das ist", hint: "One person" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Conjugate the verb for the 3rd person.",
        items: [
          { prompt: "Das ist Anna. Sie ___ (kommen) aus Spanien.", answer: "kommt", hint: "sie (she) takes -t" },
          { prompt: "Das sind Tom und Lisa. Sie ___ (arbeiten) hier.", answer: "arbeiten", hint: "sie (they) takes -en" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Das sind meine Kollegin.",
        right: "Das ist meine Kollegin.",
        explanation: "Because 'Kollegin' (female colleague) ends in 'in', learners sometimes confuse it for a plural. It is singular, so it must be 'Das ist'."
      },
      {
        wrong: "Das ist Herr Wagner. Sie kommt aus Berlin.",
        right: "Das ist Herr Wagner. Er kommt aus Berlin.",
        explanation: "When stressed, learners mix up 'er' (he) and 'sie' (she). Always align the pronoun with the gender of the person you just introduced."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can we do a roleplay where I introduce my fictional wife and my two children to you?",
      "Ask Sky: What is the polite way to introduce two colleagues to each other in a formal German office setting?",
      "Ask Sky: Give me 3 sentences describing a friend, and I will correct any pronoun or verb ending mistakes you intentionally make."
    ],
    examRelevance: "Sprechen Teil 1 & 2: While you primarily introduce yourself, the examiner might ask you questions about your partner, family members, or friends, forcing you to use 'er' or 'sie' and the correct 3rd person verb endings.",
    lessonGoal: "Introduce individuals and groups correctly using 'Das ist' / 'Das sind' and smoothly transition to 3rd person pronouns and verb endings to provide details."
  },
  {
    lessonNo: 19,
    titleEn: "Definite Articles: der, die, das",
    titleDe: "Bestimmte Artikel: der, die, das",
    introduction: "In English, there is only one word for 'the'. In German, every single noun is assigned a grammatical gender: masculine, feminine, or neuter. The article reveals this gender. Learning a German noun without its article is like learning only half the word, because every grammar rule you learn from this point forward will depend on whether a word is der, die, or das.",
    theRule: [
      "Masculine nouns use the article 'der'. Feminine nouns use 'die'. Neuter nouns use 'das'.",
      "Grammatical gender often ignores logic. For example, 'das Mädchen' (the girl) is neuter, and 'der Tisch' (the table) is masculine.",
      "In the Plural (more than one), the definite article is ALWAYS 'die', regardless of what gender the word had in the singular.",
      "You must memorize the article at the exact same time you memorize the noun. Do not just learn 'Hund'. Learn 'der Hund'."
    ],
    formula: [
      "Singular: der [Masculine], die [Feminine], das [Neuter]",
      "Plural: die [All Genders]"
    ],
    grammarTable: {
      headers: ["Gender", "Article (Singular)", "Example", "Plural Article"],
      rows: [
        ["Masculine", "der", "der Tisch (table)", "die Tische"],
        ["Feminine", "die", "die Lampe (lamp)", "die Lampen"],
        ["Neuter", "das", "das Buch (book)", "die Bücher"]
      ]
    },
    vocabulary: [
      { de: "der Tisch", en: "table", example: "Der Tisch ist groß.", exampleEn: "The table is big." },
      { de: "der Stuhl", en: "chair", example: "Der Stuhl ist alt.", exampleEn: "The chair is old." },
      { de: "der Mann", en: "man", example: "Der Mann arbeitet.", exampleEn: "The man is working." },
      { de: "die Tür", en: "door", example: "Die Tür ist offen.", exampleEn: "The door is open." },
      { de: "die Lampe", en: "lamp", example: "Die Lampe ist hell.", exampleEn: "The lamp is bright." },
      { de: "die Frau", en: "woman", example: "Die Frau liest.", exampleEn: "The woman is reading." },
      { de: "das Fenster", en: "window", example: "Das Fenster ist zu.", exampleEn: "The window is closed." },
      { de: "das Buch", en: "book", example: "Das Buch ist neu.", exampleEn: "The book is new." },
      { de: "das Mädchen", en: "girl", example: "Das Mädchen spielt.", exampleEn: "The girl is playing." },
      { de: "das Kind", en: "child", example: "Das Kind schläft.", exampleEn: "The child is sleeping." }
    ],
    modelSentences: [
      {
        de: "Der Tisch ist sehr groß und der Stuhl ist neu.",
        en: "The table is very big and the chair is new.",
        breakdown: "Der Tisch(The table/masculine) ist groß und der Stuhl(the chair/masculine) ist neu."
      },
      {
        de: "Die Frau kauft die Lampe.",
        en: "The woman buys the lamp.",
        breakdown: "Die Frau(The woman/feminine) kauft die Lampe(the lamp/feminine)."
      },
      {
        de: "Das Buch ist gut. Die Bücher sind sehr gut.",
        en: "The book is good. The books are very good.",
        breakdown: "Das Buch(The book/neuter singular) ist gut. Die Bücher(The books/plural uses 'die') sind sehr gut."
      },
      {
        de: "Das Mädchen heißt Anna.",
        en: "The girl is named Anna.",
        breakdown: "Das Mädchen(The girl/neuter!) heißt Anna."
      }
    ],
    culturalNote: "There is no fast trick to mastering articles. German toddlers learn them naturally through thousands of hours of listening. As an adult learner, you will make article mistakes for years. Don't let it stop you from speaking! Germans are used to foreigners mixing up 'der', 'die', and 'das', and they will still understand you perfectly.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct definite article for the noun.",
        items: [
          { prompt: "___ Buch ( der / die / das )", answer: "das" },
          { prompt: "___ Tisch ( der / die / das )", answer: "der" },
          { prompt: "___ Lampe ( der / die / das )", answer: "die" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Fill in the correct plural article.",
        items: [
          { prompt: "Das ist das Kind. Hier spielen ___ Kinder.", answer: "die", hint: "Plural article is always the same" },
          { prompt: "Der Stuhl ist alt. ___ Stühle sind neu.", answer: "Die", hint: "Plural article" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Die Mädchen spielt.",
        right: "Das Mädchen spielt.",
        explanation: "Because a girl is female, learners assume the article is 'die'. However, the grammatical suffix '-chen' (used for diminutives) always forces a word to be neuter ('das')."
      },
      {
        wrong: "Der Bücher sind hier.",
        right: "Die Bücher sind hier.",
        explanation: "'Buch' is 'das Buch'. But once it becomes plural (Bücher), you abandon the original article and MUST use the universal plural article 'die'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can you give me a trick or rule-of-thumb to guess if a word is der, die, or das based on its ending?",
      "Ask Sky: Quiz me! Give me 10 common A1 nouns, and I will guess their articles.",
      "Ask Sky: Write a short paragraph using lots of nouns, but leave the articles blank so I can fill them in."
    ],
    examRelevance: "Lesen, Schreiben, Hören, Sprechen: Articles are the bedrock of German grammar. If you don't know the article, you cannot form the Accusative or Dative cases properly, which will cause massive point deductions in the Writing exam.",
    lessonGoal: "Understand the concept of grammatical gender and memorize the definite articles 'der, die, das' along with their base nouns."
  },
  {
    lessonNo: 20,
    titleEn: "Indefinite Articles (ein, eine)",
    titleDe: "Unbestimmte Artikel: ein, eine",
    introduction: "When you go to a bakery, you rarely ask for 'THE bread'; you usually ask for 'A bread'. For this, you need indefinite articles. Fortunately, if you have already memorized whether a word is 'der', 'die', or 'das', learning the indefinite articles is incredibly simple because masculine and neuter nouns share the exact same word.",
    theRule: [
      "If the noun is masculine ('der') or neuter ('das'), the indefinite article is 'ein' (a/an).",
      "If the noun is feminine ('die'), the indefinite article is 'eine' (a/an).",
      "There is NO indefinite article in the plural! Just like in English, you cannot say 'a books'. You simply drop the article entirely.",
      "This rule applies strictly to the Nominative case (the subject of the sentence or after the verb 'sein')."
    ],
    formula: [
      "der (Masculine) -> ein",
      "das (Neuter) -> ein",
      "die (Feminine) -> eine",
      "Plural -> [no article]"
    ],
    grammarTable: {
      headers: ["Gender", "Definite (The)", "Indefinite (A/An)"],
      rows: [
        ["Masculine", "der", "ein"],
        ["Neuter", "das", "ein"],
        ["Feminine", "die", "eine"],
        ["Plural", "die", "(none)"]
      ]
    },
    vocabulary: [
      { de: "ein", en: "a / an (masculine/neuter)", example: "Das ist ein Tisch.", exampleEn: "That is a table." },
      { de: "eine", en: "a / an (feminine)", example: "Das ist eine Lampe.", exampleEn: "That is a lamp." },
      { de: "der Apfel", en: "apple", example: "Das ist ein Apfel.", exampleEn: "This is an apple." },
      { de: "die Banane", en: "banana", example: "Das ist eine Banane.", exampleEn: "This is a banana." },
      { de: "das Brötchen", en: "bread roll", example: "Ein Brötchen kostet einen Euro.", exampleEn: "A bread roll costs one euro." },
      { de: "der Computer", en: "computer", example: "Das ist ein Computer.", exampleEn: "That is a computer." },
      { de: "die Tasche", en: "bag", example: "Ist das eine Tasche?", exampleEn: "Is that a bag?" },
      { de: "das Auto", en: "car", example: "Ein Auto ist teuer.", exampleEn: "A car is expensive." },
      { de: "der Hund", en: "dog", example: "Hier ist ein Hund.", exampleEn: "Here is a dog." },
      { de: "die Katze", en: "cat", example: "Das ist eine Katze.", exampleEn: "That is a cat." }
    ],
    modelSentences: [
      {
        de: "Das ist ein Tisch und das ist eine Lampe.",
        en: "That is a table and that is a lamp.",
        breakdown: "Das ist ein Tisch(a table/masculine uses 'ein') und das ist eine Lampe(a lamp/feminine uses 'eine')."
      },
      {
        de: "Ist das ein Auto? Nein, das ist ein Fahrrad.",
        en: "Is that a car? No, that is a bicycle.",
        breakdown: "Ist das ein Auto(a car/neuter uses 'ein')? Nein, das ist ein Fahrrad(a bike/neuter uses 'ein')."
      },
      {
        de: "Das ist eine Banane und das sind Äpfel.",
        en: "That is a banana and those are apples.",
        breakdown: "Das ist eine Banane(a banana/feminine) und das sind Äpfel(apples/plural uses no article)."
      },
      {
        de: "Hier ist ein Hund.",
        en: "Here is a dog.",
        breakdown: "Hier ist ein Hund(a dog/masculine uses 'ein')."
      }
    ],
    culturalNote: "When speaking quickly, Germans often swallow the end of the indefinite article. You might hear someone say 'Das is 'n Auto' instead of 'ein Auto', or 'Das is 'ne Lampe' instead of 'eine Lampe'. Do not write this in your exam, but expect to hear it on the street.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct indefinite article.",
        items: [
          { prompt: "Das ist ___ Tasche. (die Tasche) -> ( ein / eine )", answer: "eine" },
          { prompt: "Das ist ___ Computer. (der Computer) -> ( ein / eine )", answer: "ein" },
          { prompt: "Das ist ___ Brötchen. (das Brötchen) -> ( ein / eine )", answer: "ein" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the sentences to German using indefinite articles.",
        items: [
          { prompt: "That is a dog. (der Hund)", answer: "Das ist ein Hund." },
          { prompt: "Those are bananas. (die Bananen)", answer: "Das sind Bananen." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Das sind eine Äpfel.",
        right: "Das sind Äpfel.",
        explanation: "Learners often try to put 'eine' in front of plural nouns because 'eine' ends in 'e' like many plural words. Just like in English, you cannot say 'a apples'. Plurals take no indefinite article."
      },
      {
        wrong: "Das ist eine Mädchen.",
        right: "Das ist ein Mädchen.",
        explanation: "Even though a girl is biologically female, the word 'das Mädchen' is grammatically neuter. Therefore, it MUST take the neuter indefinite article 'ein', not 'eine'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can we play a game where you show me pictures of common objects, and I have to say 'Das ist ein/eine...'?",
      "Ask Sky: Explain the difference between 'ein', 'eine', and 'einen'—when do I need to start worrying about 'einen'?",
      "Ask Sky: Write 5 sentences using plural nouns to test if I accidentally use 'eine' where I shouldn't."
    ],
    examRelevance: "Sprechen Teil 2: Describing what you see on the prompt cards usually starts with identifying the object: 'Auf dem Bild sehe ich ein Auto' (On the picture I see a car). Misgendering objects here is a classic beginner mistake.",
    lessonGoal: "Correctly use 'ein' and 'eine' to identify singular masculine, feminine, and neuter objects, and correctly omit the article for plurals."
  }
];