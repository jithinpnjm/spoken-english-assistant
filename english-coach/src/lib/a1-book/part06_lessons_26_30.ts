import type { GermanA1BookLesson } from "../germanA1BookLessonTypes";

export const germanA1BookLessonsPart06: GermanA1BookLesson[] = [
  {
    lessonNo: 26,
    titleEn: "Accusative Articles",
    titleDe: "Akkusativartikel",
    introduction: "In English, we say 'He sees the table'. In German, you must prove that the table is the object being seen by changing its article. This is called the Accusative case. Without it, a German sentence like 'Der Hund beißt der Mann' literally means 'The dog bites the man AND the man bites the dog'. Accusative clarifies exactly who is doing the action and who is receiving it.",
    theRule: [
      "The subject of the sentence (the one doing the action) is in the Nominative case.",
      "The direct object (the thing receiving the action) is in the Accusative case.",
      "Here is the great news: Feminine (die), Neuter (das), and Plural (die) articles DO NOT CHANGE in the Accusative.",
      "ONLY the masculine article changes: 'der' becomes 'den'. 'ein' becomes 'einen'. 'kein' becomes 'keinen'.",
      "Always ask yourself: Is this noun doing the action, or is something happening to it?"
    ],
    formula: [
      "Nominative Subject + Verb + Accusative Object",
      "Masculine change: der -> den | ein -> einen | kein -> keinen"
    ],
    grammarTable: {
      headers: ["Gender", "Nominative (Subject)", "Accusative (Direct Object)"],
      rows: [
        ["Masculine", "der / ein / kein Tisch", "den / einen / keinen Tisch (CHANGES!)"],
        ["Feminine", "die / eine / keine Lampe", "die / eine / keine Lampe (no change)"],
        ["Neuter", "das / ein / kein Buch", "das / ein / kein Buch (no change)"],
        ["Plural", "die / - / keine Autos", "die / - / keine Autos (no change)"]
      ]
    },
    vocabulary: [
      { de: "brauchen", en: "to need", example: "Ich brauche den Stift.", exampleEn: "I need the pen." },
      { de: "suchen", en: "to look for", example: "Wir suchen einen Tisch.", exampleEn: "We are looking for a table." },
      { de: "finden", en: "to find", example: "Er findet den Schlüssel nicht.", exampleEn: "He cannot find the key." },
      { de: "kaufen", en: "to buy", example: "Sie kauft das Auto.", exampleEn: "She is buying the car." },
      { de: "haben", en: "to have", example: "Ich habe einen Hund.", exampleEn: "I have a dog." },
      { de: "der Stift", en: "pen", example: "Hast du einen Stift?", exampleEn: "Do you have a pen?" },
      { de: "der Computer", en: "computer", example: "Er kauft einen Computer.", exampleEn: "He is buying a computer." },
      { de: "der Garten", en: "garden", example: "Wir haben einen Garten.", exampleEn: "We have a garden." },
      { de: "der Kaffee", en: "coffee", example: "Ich trinke den Kaffee.", exampleEn: "I drink the coffee." },
      { de: "der Tee", en: "tea", example: "Trinkst du einen Tee?", exampleEn: "Are you drinking a tea?" }
    ],
    modelSentences: [
      {
        de: "Ich brauche einen Computer.",
        en: "I need a computer.",
        breakdown: "Ich(I/subject) brauche(need/verb) einen Computer(a computer/masculine direct object -> einen)."
      },
      {
        de: "Suchen Sie den Bahnhof?",
        en: "Are you looking for the train station?",
        breakdown: "Suchen(Look for) Sie(you formal/subject) den Bahnhof(the train station/masculine direct object -> den)?"
      },
      {
        de: "Wir haben keinen Hund, wir haben eine Katze.",
        en: "We have no dog, we have a cat.",
        breakdown: "Wir haben keinen Hund(masculine acc -> keinen), wir haben eine Katze(feminine acc -> eine/no change)."
      },
      {
        de: "Der Mann trinkt den Kaffee.",
        en: "The man drinks the coffee.",
        breakdown: "Der Mann(The man/masculine subject -> der) trinkt(drinks) den Kaffee(the coffee/masculine object -> den)."
      }
    ],
    culturalNote: "When Germans hear 'Ich habe ein Hund' instead of 'einen Hund', it sounds distinctly jarring, similar to hearing 'Me have a dog' in English. Because 'haben' (to have) always triggers the Accusative, mastering the 'einen' ending for masculine nouns is one of the biggest leaps you can make toward sounding fluent.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Fill in the correct Accusative article (den, die, das, einen, eine, ein).",
        items: [
          { prompt: "Ich habe ___ Bruder. (ein)", answer: "einen", hint: "Masculine direct object." },
          { prompt: "Wir suchen ___ Lampe. (die)", answer: "die", hint: "Feminine does not change." },
          { prompt: "Kaufst du ___ Stift? (der)", answer: "den", hint: "Masculine direct object." }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the sentence, paying attention to the masculine object.",
        items: [
          { prompt: "I need a coffee. (der Kaffee)", answer: "Ich brauche einen Kaffee." },
          { prompt: "He cannot find the key. (der Schlüssel)", answer: "Er findet den Schlüssel nicht." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich trinke ein Kaffee.",
        right: "Ich trinke einen Kaffee.",
        explanation: "Coffee is masculine (der Kaffee). When you drink it, it becomes the direct object. You must change 'ein' to 'einen'."
      },
      {
        wrong: "Den Mann lernt Deutsch.",
        right: "Der Mann lernt Deutsch.",
        explanation: "Overcorrecting! The man is doing the action (he is the subject). Subjects must stay in the Nominative case ('der')."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 sentences missing their articles. I have to figure out if the word is the subject (Nominative) or object (Accusative) and provide the right article.",
      "Ask Sky: Does the verb 'sein' (to be) trigger the Accusative case? Why or why not?",
      "Ask Sky: Write a short story about going shopping using lots of masculine nouns in the Accusative case."
    ],
    examRelevance: "Schreiben Teil 1 & 2: You will be graded heavily on your ability to use the Accusative case. Writing 'Ich suche ein Bahnhof' will result in an immediate grammar penalty.",
    lessonGoal: "Correctly identify direct objects in a sentence and accurately change masculine articles to 'den', 'einen', or 'keinen'."
  },
  {
    lessonNo: 27,
    titleEn: "Possessive Pronouns Accusative",
    titleDe: "Possessivpronomen im Akkusativ",
    introduction: "Now that you know the Accusative case changes 'der' to 'den', you need to apply this exact same logic to your possessive pronouns. If you are visiting YOUR father or looking for MY key, those family members and objects are receiving the action. Therefore, 'mein' must become 'meinen'.",
    theRule: [
      "Possessive pronouns follow the exact same Accusative rules as indefinite articles (ein -> einen).",
      "Only masculine nouns change in the Accusative case.",
      "mein -> meinen, dein -> deinen, sein -> seinen, ihr -> ihren, unser -> unseren, euer -> euren, Ihr -> Ihren.",
      "Feminine, Neuter, and Plural possessive pronouns keep their standard Nominative endings (meine, mein, meine)."
    ],
    formula: [
      "Subject + Verb + [meinen/deinen/seinen/etc.] + Masculine Noun",
      "Subject + Verb + [meine/mein/meine] + Feminine/Neuter/Plural Noun"
    ],
    grammarTable: {
      headers: ["Gender", "Nominative (Subject)", "Accusative (Direct Object)"],
      rows: [
        ["Masculine", "mein Vater (my father)", "meinen Vater (CHANGES!)"],
        ["Feminine", "meine Mutter", "meine Mutter (no change)"],
        ["Neuter", "mein Kind", "mein Kind (no change)"],
        ["Plural", "meine Eltern", "meine Eltern (no change)"]
      ]
    },
    vocabulary: [
      { de: "besuchen", en: "to visit", example: "Ich besuche meinen Opa.", exampleEn: "I am visiting my grandpa." },
      { de: "anrufen", en: "to call (on the phone)", example: "Rufst du deinen Vater an?", exampleEn: "Are you calling your father?" },
      { de: "lieben", en: "to love", example: "Sie liebt ihren Hund.", exampleEn: "She loves her dog." },
      { de: "fragen", en: "to ask", example: "Ich frage meinen Lehrer.", exampleEn: "I ask my teacher." },
      { de: "verstehen", en: "to understand", example: "Ich verstehe meinen Bruder nicht.", exampleEn: "I don't understand my brother." },
      { de: "der Lehrer", en: "male teacher", example: "Das ist mein Lehrer.", exampleEn: "That is my teacher." },
      { de: "der Chef", en: "male boss", example: "Ich suche meinen Chef.", exampleEn: "I am looking for my boss." },
      { de: "der Freund", en: "boyfriend / male friend", example: "Sie liebt ihren Freund.", exampleEn: "She loves her boyfriend." },
      { de: "der Koffer", en: "suitcase", example: "Ich packe meinen Koffer.", exampleEn: "I pack my suitcase." },
      { de: "der Termin", en: "appointment", example: "Ich vergesse meinen Termin.", exampleEn: "I forget my appointment." }
    ],
    modelSentences: [
      {
        de: "Ich besuche morgen meinen Vater.",
        en: "I am visiting my father tomorrow.",
        breakdown: "Ich(subject) besuche(visit) morgen(tomorrow) meinen Vater(my father/masc. object -> meinen)."
      },
      {
        de: "Verstehst du deinen Bruder?",
        en: "Do you understand your brother?",
        breakdown: "Verstehst(understand) du(subject) deinen Bruder(your brother/masc. object -> deinen)?"
      },
      {
        de: "Wir suchen unseren Chef und unsere Kollegin.",
        en: "We are looking for our boss and our colleague.",
        breakdown: "Wir(subject) suchen unseren Chef(masc. object -> unseren) und unsere Kollegin(fem. object -> unsere/no change)."
      },
      {
        de: "Herr Schmidt, ich brauche Ihren Schlüssel.",
        en: "Mr. Schmidt, I need your key.",
        breakdown: "Herr Schmidt, ich brauche Ihren(your formal/capitalized masc. acc.) Schlüssel(key)."
      }
    ],
    culturalNote: "If you call in sick to a German office, you might say 'Ich besuche heute meinen Arzt' (I am visiting my doctor today). 'Der Arzt' is masculine, so 'mein' becomes 'meinen'. Germans appreciate correct case usage here as it shows precision and clarity in professional communication.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Add the correct Accusative ending to the possessive pronoun.",
        items: [
          { prompt: "Sie liebt ihr___ Freund. (der Freund)", answer: "ihren", hint: "Masculine direct object." },
          { prompt: "Ich frage mein___ Lehrer. (der Lehrer)", answer: "meinen", hint: "Masculine direct object." },
          { prompt: "Wir besuchen unser___ Oma. (die Oma)", answer: "unsere", hint: "Feminine does not change in Accusative." }
        ]
      },
      {
        type: "translate",
        instruction: "Translate into German.",
        items: [
          { prompt: "Do you (informal) have your key? (der Schlüssel)", answer: "Hast du deinen Schlüssel?" },
          { prompt: "I am looking for my suitcase. (der Koffer)", answer: "Ich suche meinen Koffer." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich liebe mein Hund.",
        right: "Ich liebe meinen Hund.",
        explanation: "The dog is receiving the love (direct object). Because 'der Hund' is masculine, 'mein' MUST become 'meinen'."
      },
      {
        wrong: "Meinen Bruder lernt Deutsch.",
        right: "Mein Bruder lernt Deutsch.",
        explanation: "Do not put the subject into the Accusative case! The brother is doing the action (learning). He remains in the Nominative ('mein Bruder')."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 verbs that always take the Accusative case, and let me write practice sentences using 'meinen' and 'deinen'.",
      "Ask Sky: Test me! Give me a noun and tell me if it's the subject or the object, and I will choose between 'mein' and 'meinen'.",
      "Ask Sky: How do I say 'I miss my family' and 'I miss my brother' in German?"
    ],
    examRelevance: "Sprechen Teil 2: Formulating questions to your partner like 'Wie oft besuchst du deinen Opa?' (How often do you visit your grandpa?) demonstrates higher-level A1 grammar control.",
    lessonGoal: "Correctly decline possessive pronouns into the Accusative case, specifically adding '-en' for masculine direct objects."
  },
  {
    lessonNo: 28,
    titleEn: "Modal Verb: möchten",
    titleDe: "Modalverb: möchten",
    introduction: "Saying 'I want a coffee' (Ich will einen Kaffee) can sound aggressive and demanding in German. To navigate polite society, cafes, and restaurants, you must use the magical word 'möchten' (would like). It is a modal verb, which means it behaves a little strangely: it alters the whole sentence by kicking the second action verb to the very end.",
    theRule: [
      "'möchten' is used to express polite wishes or requests.",
      "Modal Verb Conjugation Rule: The 'ich' and 'er/sie/es' forms are ALWAYS identical. (Ich möchte, er möchte - NO 't' for er!).",
      "Sentence Structure Rule: 'möchten' takes Position 2. If there is another verb in the sentence (like 'to drink' or 'to pay'), it gets kicked to the very end of the sentence in its full infinitive form (-en).",
      "You can also use 'möchten' alone with just an object: 'Ich möchte einen Kaffee'."
    ],
    formula: [
      "Without second verb: Subject + möchte + [Accusative Object]",
      "With second verb: Subject + möchte + [Accusative Object / Details] + [Infinitive Verb]"
    ],
    grammarTable: {
      headers: ["Pronoun", "möchten (would like)"],
      rows: [
        ["ich", "möchte"],
        ["du", "möchtest"],
        ["er/sie/es", "möchte (IDENTICAL to ich!)"],
        ["wir", "möchten"],
        ["ihr", "möchtet"],
        ["sie/Sie", "möchten"]
      ]
    },
    vocabulary: [
      { de: "möchten", en: "would like", example: "Ich möchte zahlen.", exampleEn: "I would like to pay." },
      { de: "trinken", en: "to drink", example: "Was möchten Sie trinken?", exampleEn: "What would you like to drink?" },
      { de: "essen", en: "to eat", example: "Wir möchten etwas essen.", exampleEn: "We would like to eat something." },
      { de: "bestellen", en: "to order", example: "Ich möchte jetzt bestellen.", exampleEn: "I would like to order now." },
      { de: "bezahlen (oder zahlen)", en: "to pay", example: "Wir möchten bitte bezahlen.", exampleEn: "We would like to pay, please." },
      { de: "die Speisekarte", en: "menu", example: "Die Speisekarte, bitte.", exampleEn: "The menu, please." },
      { de: "das Wasser", en: "water", example: "Ich möchte ein Wasser.", exampleEn: "I would like a water." },
      { de: "der Kuchen", en: "cake", example: "Er möchte den Kuchen probieren.", exampleEn: "He would like to try the cake." },
      { de: "probieren", en: "to try / taste", example: "Möchtest du probieren?", exampleEn: "Would you like to try?" },
      { de: "bitte", en: "please", example: "Einen Kaffee, bitte.", exampleEn: "A coffee, please." }
    ],
    modelSentences: [
      {
        de: "Ich möchte einen Kaffee trinken.",
        en: "I would like to drink a coffee.",
        breakdown: "Ich(subject) möchte(would like/pos 2) einen Kaffee(masc. object) trinken(drink/infinitive at the very end)."
      },
      {
        de: "Was möchtest du heute machen?",
        en: "What would you like to do today?",
        breakdown: "Was(What) möchtest(would like/pos 2) du(subject) heute(today) machen(do/infinitive at the end)?"
      },
      {
        de: "Er möchte jetzt bezahlen.",
        en: "He would like to pay now.",
        breakdown: "Er(He) möchte(would like/identical to 'ich' form) jetzt(now) bezahlen(pay/end)."
      },
      {
        de: "Wir möchten bitte die Speisekarte.",
        en: "We would like the menu, please.",
        breakdown: "Wir möchten(would like/pos 2) bitte(please) die Speisekarte(the menu/object). (No second verb needed here)."
      }
    ],
    culturalNote: "When ordering in Germany, 'Ich bekomme...' (I get) or 'Ich nehme...' (I'll take) are also perfectly polite. However, 'Ich will...' (I want) sounds like a toddler throwing a tantrum. Defaulting to 'Ich möchte...' ensures you are always viewed as a polite guest.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Conjugate 'möchten' correctly.",
        items: [
          { prompt: "Was ___ du essen?", answer: "möchtest", hint: "du form" },
          { prompt: "Der Mann ___ einen Tee trinken.", answer: "möchte", hint: "er/sie/es form is identical to ich" },
          { prompt: "Wir ___ bestellen, bitte.", answer: "möchten", hint: "wir form" }
        ]
      },
      {
        type: "reorder",
        instruction: "Put the sentence in the correct order, placing the infinitive verb at the end.",
        items: [
          { prompt: "Kaffee / trinken / Ich / möchte / einen", answer: "Ich möchte einen Kaffee trinken." },
          { prompt: "bezahlen / Wir / jetzt / möchten", answer: "Wir möchten jetzt bezahlen." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Er möchtet einen Tee.",
        right: "Er möchte einen Tee.",
        explanation: "Learners naturally try to add the standard '-t' ending for 'er'. Modal verbs break this rule. The 'er' form is strictly 'möchte'."
      },
      {
        wrong: "Ich möchte trinken einen Kaffee.",
        right: "Ich möchte einen Kaffee trinken.",
        explanation: "Applying English word order ('I would like to drink a coffee'). In German, the second verb ('trinken') MUST go to the very end of the clause."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Create a roleplay where you are a waiter and I am the customer using 'möchten' to order my food and pay.",
      "Ask Sky: What are the other 5 modal verbs in German, and do they also kick the second verb to the end?",
      "Ask Sky: Give me 5 scrambled sentences with 'möchten' and an infinitive verb, and I will put them in the correct word order."
    ],
    examRelevance: "Sprechen Teil 2 & 3: Making polite requests is a mandatory requirement. You will have to ask your partner for things ('Möchtest du ins Kino gehen?' or 'Ich möchte bitte das Buch haben').",
    lessonGoal: "Politely express wishes using 'möchten', conjugating it correctly, and successfully sending the second infinitive verb to the end of the sentence."
  },
  {
    lessonNo: 29,
    titleEn: "W-Questions (Was? Wo? Wann?)",
    titleDe: "W-Fragen",
    introduction: "A conversation dies quickly if you can only ask Yes/No questions. To gather real information, you need open-ended questions. In German, these are called 'W-Fragen' because almost all the question words begin with 'W'. Mastering the word order for W-Questions ensures you never get lost, miss an appointment, or misunderstand a price.",
    theRule: [
      "In a W-Question, the W-Word is ALWAYS in Position 1.",
      "The conjugated verb is ALWAYS locked in Position 2.",
      "The subject comes immediately after the verb in Position 3.",
      "This is a strict mathematical formula. Unlike English, German does not use helper verbs like 'do' or 'does' to make a question."
    ],
    formula: [
      "Position 1 (W-Word) + Position 2 (Verb) + Position 3 (Subject) + Rest?",
      "Example: Wann (1) + fängt (2) + die Party (3) + an (Rest)?"
    ],
    grammarTable: {
      headers: ["W-Word", "English Meaning", "Example"],
      rows: [
        ["Was", "What", "Was machst du? (What are you doing?)"],
        ["Wo", "Where (location)", "Wo bist du? (Where are you?)"],
        ["Woher", "Where from", "Woher kommst du? (Where do you come from?)"],
        ["Wohin", "Where to", "Wohin gehst du? (Where are you going?)"],
        ["Wann", "When", "Wann fängt der Kurs an? (When does the course start?)"],
        ["Wer", "Who", "Wer ist das? (Who is that?)"],
        ["Wie", "How", "Wie alt bist du? (How old are you?)"],
        ["Warum", "Why", "Warum lernst du Deutsch? (Why are you learning German?)"]
      ]
    },
    vocabulary: [
      { de: "was", en: "what", example: "Was essen wir?", exampleEn: "What are we eating?" },
      { de: "wo", en: "where", example: "Wo wohnst du?", exampleEn: "Where do you live?" },
      { de: "wann", en: "when", example: "Wann kommst du?", exampleEn: "When are you coming?" },
      { de: "wer", en: "who", example: "Wer ist der Mann?", exampleEn: "Who is the man?" },
      { de: "wie", en: "how", example: "Wie funktioniert das?", exampleEn: "How does that work?" },
      { de: "warum", en: "why", example: "Warum bist du hier?", exampleEn: "Why are you here?" },
      { de: "wohin", en: "where to", example: "Wohin fährst du?", exampleEn: "Where are you driving to?" },
      { de: "der Kurs", en: "course / class", example: "Wann beginnt der Kurs?", exampleEn: "When does the course begin?" },
      { de: "die Party", en: "party", example: "Wo ist die Party?", exampleEn: "Where is the party?" },
      { de: "anfangen", en: "to start / begin", example: "Wann fängt der Film an?", exampleEn: "When does the movie start?" }
    ],
    modelSentences: [
      {
        de: "Was machst du am Wochenende?",
        en: "What are you doing on the weekend?",
        breakdown: "Was(What/pos 1) machst(do/pos 2) du(you/subject pos 3) am Wochenende(on the weekend)?"
      },
      {
        de: "Woher kommt der neue Kollege?",
        en: "Where does the new colleague come from?",
        breakdown: "Woher(Where from/pos 1) kommt(comes/pos 2) der neue Kollege(the new colleague/subject block pos 3)?"
      },
      {
        de: "Wann hast du Zeit für mich?",
        en: "When do you have time for me?",
        breakdown: "Wann(When/pos 1) hast(have/pos 2) du(you/subject pos 3) Zeit(time) für mich(for me)?"
      },
      {
        de: "Warum ist das Auto so teuer?",
        en: "Why is the car so expensive?",
        breakdown: "Warum(Why/pos 1) ist(is/pos 2) das Auto(the car/subject pos 3) so teuer(so expensive)?"
      }
    ],
    culturalNote: "Germans are not fond of small talk, so they rely heavily on direct W-Questions to get straight to the point. While an English speaker might ask, 'I was wondering if you might know what time the meeting is?', a German colleague will simply ask, 'Wann ist das Meeting?'. Do not take this directness as rudeness.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Choose the correct W-Word.",
        items: [
          { prompt: "___ wohnen Sie? - Ich wohne in Berlin.", answer: "Wo", hint: "Asking for location." },
          { prompt: "___ kommst du heute? - Um 18 Uhr.", answer: "Wann", hint: "Asking for a time." },
          { prompt: "___ ist die Frau? - Das ist meine Chefin.", answer: "Wer", hint: "Asking for a person (Who)." }
        ]
      },
      {
        type: "reorder",
        instruction: "Build the W-Question in the correct word order.",
        items: [
          { prompt: "du / Warum / Deutsch / lernst / ?", answer: "Warum lernst du Deutsch?" },
          { prompt: "beginnt / Wann / der Kurs / ?", answer: "Wann beginnt der Kurs?" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Was du machst heute?",
        right: "Was machst du heute?",
        explanation: "Directly translating 'What you doing today?'. The verb MUST be in Position 2 immediately following the W-Word."
      },
      {
        wrong: "Wer heißt du?",
        right: "Wie heißt du?",
        explanation: "Translating 'Who are you called' or 'What is your name' literally. In German, you ask 'How are you called?' -> 'Wie heißt du?'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 answers (e.g. 'Ich wohne in Hamburg'), and I will try to form the correct W-Question that matches the answer.",
      "Ask Sky: Explain the difference between 'wo', 'woher', and 'wohin' with motion vs. location.",
      "Ask Sky: Can we practice a quick interview? You ask me 5 W-Questions about my life, and I will answer."
    ],
    examRelevance: "Sprechen Teil 2: In the speaking exam, you pick up cards with a single topic word on them (e.g., 'Essen'). You MUST form a correct W-Question to ask your partner (e.g., 'Was isst du gern?').",
    lessonGoal: "Formulate open-ended questions using various W-Words while strictly maintaining the 'W-Word + Verb + Subject' word order."
  },
  {
    lessonNo: 30,
    titleEn: "In a Restaurant",
    titleDe: "Im Restaurant",
    introduction: "Dining out in Germany requires putting multiple grammar concepts together: using 'möchten' to be polite, Accusative articles for the food you are ordering, and specific vocabulary for the bill. German waiters are professional, fast, and practical; knowing exactly how to order and pay ensures a stress-free meal.",
    theRule: [
      "To order food or drinks politely, use: 'Ich möchte...' (I would like) or 'Ich hätte gern...' (I would gladly have).",
      "The food or drink you order is the direct object, so it MUST be in the Accusative case (e.g., 'einen Kaffee', 'einen Salat').",
      "When asking for the bill, you just say 'Zahlen, bitte' (Pay, please) or 'Ich möchte bitte zahlen'.",
      "The waiter will ask 'Zusammen oder getrennt?' (Together or separate?). It is very common in Germany to split the bill item by item."
    ],
    formula: [
      "Ordering: Ich hätte gern + [Accusative Item] + bitte.",
      "Paying: Wir möchten + bitte + zahlen."
    ],
    vocabulary: [
      { de: "das Restaurant", en: "restaurant", example: "Das Restaurant ist gut.", exampleEn: "The restaurant is good." },
      { de: "der Kellner / die Kellnerin", en: "waiter / waitress", example: "Der Kellner kommt sofort.", exampleEn: "The waiter is coming immediately." },
      { de: "die Speisekarte", en: "menu", example: "Die Speisekarte, bitte.", exampleEn: "The menu, please." },
      { de: "bestellen", en: "to order", example: "Wir möchten bestellen.", exampleEn: "We would like to order." },
      { de: "die Rechnung", en: "bill / check", example: "Die Rechnung, bitte.", exampleEn: "The bill, please." },
      { de: "zahlen", en: "to pay", example: "Ich möchte zahlen.", exampleEn: "I would like to pay." },
      { de: "zusammen", en: "together", example: "Zahlen Sie zusammen?", exampleEn: "Are you paying together?" },
      { de: "getrennt", en: "separate", example: "Nein, bitte getrennt.", exampleEn: "No, separately please." },
      { de: "das Trinkgeld", en: "tip / gratuity", example: "Das Trinkgeld ist wichtig.", exampleEn: "The tip is important." },
      { de: "lecker", en: "delicious / tasty", example: "Das Essen ist sehr lecker.", exampleEn: "The food is very delicious." }
    ],
    modelSentences: [
      {
        de: "Hallo, wir möchten bitte bestellen.",
        en: "Hello, we would like to order please.",
        breakdown: "Hallo, wir möchten(would like) bitte(please) bestellen(order/infinitive at end)."
      },
      {
        de: "Ich hätte gern einen Salat und ein Wasser.",
        en: "I would like a salad and a water.",
        breakdown: "Ich hätte gern(I would gladly have/polite phrase) einen Salat(masc. acc.) und ein Wasser(neuter acc.)."
      },
      {
        de: "Hat es geschmeckt? Ja, es war sehr lecker.",
        en: "Did it taste good? Yes, it was very delicious.",
        breakdown: "Hat(Has) es(it) geschmeckt(tasted)? Ja, es war(was) sehr lecker(delicious)."
      },
      {
        de: "Zahlen, bitte. Zusammen oder getrennt?",
        en: "Pay, please. Together or separately?",
        breakdown: "Zahlen(Pay), bitte. Zusammen(together) oder(or) getrennt(separately)?"
      }
    ],
    culturalNote: "When paying the bill in Germany, the waiter usually brings a wallet directly to your table. If the bill is 18.50€ and you hand them a 20€ note, you simply say 'Stimmt so' (Keep the change / That's right). A 5% to 10% tip is standard, but you tell the waiter the final total you want to pay before they hand you your change.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Fill in the missing words for a restaurant scenario.",
        items: [
          { prompt: "Wir möchten bitte die ___. (menu)", answer: "Speisekarte", hint: "What you read to choose food." },
          { prompt: "Ich hätte gern ___ Kaffee. (a)", answer: "einen", hint: "Masculine Accusative" },
          { prompt: "Zusammen oder ___? (separate)", answer: "getrennt", hint: "When splitting the bill." }
        ]
      },
      {
        type: "translate",
        instruction: "Translate your request to the waiter.",
        items: [
          { prompt: "We would like to pay, please.", answer: "Wir möchten bitte zahlen." },
          { prompt: "I would like a water.", answer: "Ich möchte ein Wasser." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich nehme ein Kaffee.",
        right: "Ich nehme einen Kaffee.",
        explanation: "Forgetting the Accusative case when ordering. The coffee is the direct object of what you are taking/getting."
      },
      {
        wrong: "Wir möchten die Kontrolle, bitte. (Trying to ask for 'the check').",
        right: "Wir möchten die Rechnung, bitte.",
        explanation: "False friend! 'Die Kontrolle' means inspection or security check. You must ask for 'die Rechnung' (the calculation/bill)."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can we do a full restaurant roleplay? You are the waiter in Berlin, and I am ordering food and asking to pay separately.",
      "Ask Sky: Explain exactly how 'Trinkgeld' works in Germany. How do I physically hand over the tip?",
      "Ask Sky: Give me a menu in German, and ask me what I would like to order."
    ],
    examRelevance: "Hören & Sprechen Teil 2: Restaurant dialogues are extremely common in the listening exam. In the speaking exam, you may have to negotiate where to eat or order food based on picture cards.",
    lessonGoal: "Navigate a German restaurant confidently: ordering food using the Accusative case, asking for the bill, and specifying payment methods."
  }
];