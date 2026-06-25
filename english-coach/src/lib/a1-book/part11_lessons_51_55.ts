import type { GermanA1BookLesson } from "../germanA1BookLessonTypes";

export const germanA1BookLessonsPart11: GermanA1BookLesson[] = [
  {
    lessonNo: 51,
    titleEn: "Letter Writing — Invitation",
    titleDe: "Briefeschreiben — Einladung",
    introduction: "In the digital age, Germans still highly value formal and semi-formal written invitations for birthdays, weddings, or office parties. Knowing how to open, structure, and close a written invitation is a core social skill. Furthermore, writing a short message is a mandatory task in the Goethe A1 exam.",
    theRule: [
      "For informal letters, open with 'Liebe [Female Name],' or 'Lieber [Male Name],'. Notice the extra 'r' for men!",
      "Always put a comma after the greeting. The first word of the actual letter on the next line MUST start with a lowercase letter.",
      "Use the verb 'einladen' (to invite) to make the request. It is separable: 'Ich lade dich zu meiner Party ein.'",
      "Close an informal letter with 'Viele Grüße' (Many greetings) or 'Liebe Grüße' (Dear greetings), followed by your name on the next line."
    ],
    formula: [
      "Greeting: Liebe [Anna] / Lieber [Tom],",
      "Body (lowercase start!): ich lade dich zu [Event / Dative] ein.",
      "Closing: Viele Grüße, [Your Name]"
    ],
    vocabulary: [
      { de: "einladen", en: "to invite (separable)", example: "Ich lade dich ein.", exampleEn: "I invite you." },
      { de: "die Einladung", en: "invitation", example: "Danke für die Einladung.", exampleEn: "Thank you for the invitation." },
      { de: "feiern", en: "to celebrate", example: "Wir feiern meinen Geburtstag.", exampleEn: "We are celebrating my birthday." },
      { de: "die Party", en: "party", example: "Die Party ist am Samstag.", exampleEn: "The party is on Saturday." },
      { de: "mitbringen", en: "to bring along (separable)", example: "Bring bitte Getränke mit.", exampleEn: "Please bring drinks." },
      { de: "werden", en: "to become / turn (age)", example: "Ich werde 30 Jahre alt.", exampleEn: "I am turning 30 years old." },
      { de: "Liebe Grüße", en: "kind regards / lots of love", example: "Liebe Grüße, Maria.", exampleEn: "Kind regards, Maria." },
      { de: "Lieber", en: "Dear (for a male)", example: "Lieber Max,", exampleEn: "Dear Max," },
      { de: "Liebe", en: "Dear (for a female)", example: "Liebe Sarah,", exampleEn: "Dear Sarah," },
      { de: "hoffen", en: "to hope", example: "Ich hoffe, du hast Zeit.", exampleEn: "I hope you have time." }
    ],
    modelSentences: [
      {
        de: "Lieber Paul, ich lade dich zu meiner Geburtstagsparty ein.",
        en: "Dear Paul, I invite you to my birthday party.",
        breakdown: "Lieber = Dear (for a male name) | Paul = name | ich lade ... ein = I invite (split verb — 'ein' goes to the end) | dich = you | zu meiner Geburtstagsparty = to my birthday party → Start lowercase after the comma, and 'ein' jumps to the end of the sentence."
      },
      {
        de: "Ich werde am Samstag 25 Jahre alt.",
        en: "I am turning 25 years old on Saturday.",
        breakdown: "Ich werde(become/turn) am Samstag 25 Jahre alt."
      },
      {
        de: "Die Party fängt um 20 Uhr an. Kannst du kommen?",
        en: "The party starts at 8 PM. Can you come?",
        breakdown: "Die Party fängt(starts) um 20 Uhr an(prefix). Kannst du kommen(infinitive at end)?"
      },
      {
        de: "Bitte bring etwas zu trinken mit. Viele Grüße, Anna.",
        en: "Please bring something to drink. Best regards, Anna.",
        breakdown: "Bitte bring(Imperative) etwas zu trinken mit(prefix at end). Viele Grüße(Closing phrase), Anna."
      }
    ],
    culturalNote: "When you are invited to a German home for a party, it is customary to ask 'Soll ich etwas mitbringen?' (Should I bring something?). Hosts often ask guests to bring a salad or their own specific drinks. Also, arriving exactly on time for a private party is expected—being 30 minutes late without calling is rude.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct greeting for an informal letter.",
        items: [
          { prompt: "To your friend Thomas: ( Liebe Thomas, / Lieber Thomas, )", answer: "Lieber Thomas," },
          { prompt: "To your friend Julia: ( Liebe Julia, / Lieber Julia, )", answer: "Liebe Julia," }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Fill in the missing words for a standard invitation letter.",
        items: [
          { prompt: "Lieber Tom, ___ feiere meinen Geburtstag.", answer: "ich", hint: "Must be lowercase because it follows the comma." },
          { prompt: "Ich lade dich zu meiner Party ___. (einladen)", answer: "ein", hint: "Separable prefix at the end of the sentence." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Lieber Max,\nIch lade dich ein.",
        right: "Lieber Max,\nich lade dich ein.",
        explanation: "In English, we capitalize the first letter of the body of an email. In German, the greeting and the body are considered ONE sentence divided by a comma. The body MUST start with a lowercase letter (unless the first word is a noun like 'Morgen')."
      },
      {
        wrong: "Ich lade dich an meiner Party.",
        right: "Ich lade dich zu meiner Party ein.",
        explanation: "The verb 'einladen' takes the preposition 'zu' + Dative, never 'an'. Also, do not forget the 'ein' at the end."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can you help me write a 4-sentence invitation to a barbecue (Grillparty) for my friends?",
      "Ask Sky: What are the formal equivalents of 'Lieber/Liebe' if I need to invite my boss to an event?",
      "Ask Sky: Correct my letter! I will write a short invitation in German, and you tell me if I made any punctuation or grammar mistakes."
    ],
    examRelevance: "Schreiben Teil 2: Writing a 30-word message is 50% of your writing score. You are often prompted to invite a friend, suggest a time, and ask them to bring something. Mastering the 'Liebe/r... , ich...' structure guarantees easy points.",
    lessonGoal: "Write a grammatically correct informal invitation, applying the correct gendered greeting, lowercase continuation, and separable verb structure."
  },
  {
    lessonNo: 52,
    titleEn: "Expressing Likes and Dislikes",
    titleDe: "Vorlieben und Abneigungen ausdrücken",
    introduction: "To make friends, you must be able to talk about what you enjoy doing. German handles 'liking' things in a way that often confuses English speakers. There is a strict divide: if you like doing an ACTION (swimming, reading), you use an adverb ('gern'). If you like a NOUN (coffee, dogs), you use a verb ('mögen'). Mixing these up sounds very broken.",
    theRule: [
      "To express that you like DOING an action, use the normal verb + the adverb 'gern' (gladly). Example: 'Ich schwimme gern' (I swim gladly = I like swimming).",
      "To express that you like a NOUN (an object or person), use the verb 'mögen' (to like). Example: 'Ich mag Kaffee' (I like coffee).",
      "Do NOT say 'Ich mag schwimmen'. While occasionally heard in slang, it is grammatically poor. Always use 'Ich schwimme gern'.",
      "To express dislike, simply add 'nicht' (not). 'Ich schwimme nicht gern' or 'Ich mag keinen Kaffee'."
    ],
    formula: [
      "Action: Subject + Verb + gern. (Ich koche gern.)",
      "Noun: Subject + mag + Accusative Noun. (Ich mag Pizza.)"
    ],
    grammarTable: {
      headers: ["Pronoun", "mögen (to like a noun)"],
      rows: [
        ["ich", "mag (irregular!)"],
        ["du", "magst"],
        ["er/sie/es", "mag (identical to ich!)"],
        ["wir", "mögen"],
        ["ihr", "mögt"],
        ["sie/Sie", "mögen"]
      ]
    },
    vocabulary: [
      { de: "gern", en: "gladly / like to do", example: "Ich lese gern.", exampleEn: "I like to read." },
      { de: "mögen", en: "to like (a thing/person)", example: "Ich mag Hunde.", exampleEn: "I like dogs." },
      { de: "das Hobby", en: "hobby", example: "Was ist dein Hobby?", exampleEn: "What is your hobby?" },
      { de: "schwimmen", en: "to swim", example: "Er schwimmt gern.", exampleEn: "He likes swimming." },
      { de: "kochen", en: "to cook", example: "Kochen Sie gern?", exampleEn: "Do you like to cook?" },
      { de: "tanzen", en: "to dance", example: "Wir tanzen sehr gern.", exampleEn: "We like dancing a lot." },
      { de: "die Musik", en: "music", example: "Ich mag klassische Musik.", exampleEn: "I like classical music." },
      { de: "der Sport", en: "sport", example: "Magst du Sport?", exampleEn: "Do you like sports?" },
      { de: "hassen", en: "to hate", example: "Ich hasse Regen.", exampleEn: "I hate rain." },
      { de: "das Lieblingsessen", en: "favorite food", example: "Mein Lieblingsessen ist Pizza.", exampleEn: "My favorite food is pizza." }
    ],
    modelSentences: [
      {
        de: "Ich spiele gern Fußball, aber ich mag kein Tennis.",
        en: "I like playing soccer, but I don't like tennis.",
        breakdown: "Ich spiele gern(play gladly = like playing) Fußball, aber ich mag(like/verb) kein Tennis(noun)."
      },
      {
        de: "Magst du Kaffee? Nein, ich trinke lieber Tee.",
        en: "Do you like coffee? No, I prefer to drink tea.",
        breakdown: "Magst(Like) du Kaffee? Nein, ich trinke(drink) lieber(rather/comparative of gern) Tee."
      },
      {
        de: "Meine Schwester kocht sehr gern.",
        en: "My sister likes cooking a lot.",
        breakdown: "Meine Schwester kocht(cooks) sehr gern(very gladly)."
      },
      {
        de: "Wir mögen den neuen Kollegen nicht.",
        en: "We do not like the new colleague.",
        breakdown: "Wir mögen(like) den neuen Kollegen(masculine accusative object) nicht."
      }
    ],
    culturalNote: "If you want to say 'favorite', Germans use the prefix 'Lieblings-'. You can attach it to almost anything: Lieblingsbuch (favorite book), Lieblingsfilm (favorite movie), Lieblingsfarbe (favorite color). It is a fantastic vocabulary hack to instantly expand your expressive range.",
    exercises: [
      {
        type: "choose",
        instruction: "Choose between 'gern' (for verbs) and 'mögen' (for nouns).",
        items: [
          { prompt: "Ich ___ Schokolade. ( mag / esse gern )", answer: "mag" },
          { prompt: "Ich ___ Musik. ( höre gern / mag )", answer: "höre gern" },
          { prompt: "Er ___ nicht arbeiten. ( mag / arbeitet nicht gern )", answer: "arbeitet nicht gern" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Conjugate the irregular verb 'mögen'.",
        items: [
          { prompt: "___ du den Film?", answer: "Magst", hint: "du form" },
          { prompt: "Der Hund ___ keine Katzen.", answer: "mag", hint: "er/sie/es form" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich mag kochen.",
        right: "Ich koche gern.",
        explanation: "Do not use 'mögen' followed by a verb in A1 German. It translates poorly. If you like an action, you must do the action 'gern' (gladly)."
      },
      {
        wrong: "Er mögt Pizza.",
        right: "Er mag Pizza.",
        explanation: "'mögen' follows modal verb rules! The 'er/sie/es' form is completely identical to the 'ich' form (mag). You do not add a 't'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Ask me 5 questions about my hobbies and what I like to eat, and I will answer using 'gern' and 'mögen'.",
      "Ask Sky: How do I express that I PREFER doing something? (e.g., I like swimming, but I prefer running).",
      "Ask Sky: Give me a list of 10 nouns, and I will create sentences expressing whether I like them or not."
    ],
    examRelevance: "Sprechen Teil 2: The topic 'Freizeit' (Free time) or 'Hobbys' appears on almost every exam. Asking 'Was machst du gern in deiner Freizeit?' (What do you like to do in your free time?) is a guaranteed point-scorer.",
    lessonGoal: "Correctly differentiate between using 'gern' to express liking an action and the verb 'mögen' to express liking a noun."
  },
  {
    lessonNo: 53,
    titleEn: "Interrogative Pronoun welch-",
    titleDe: "Fragepronomen welch-",
    introduction: "When someone offers you a drink, you might ask, 'Which drink?'. When you are shopping, a clerk might ask, 'Which shirt do you want?'. The word 'which' (welch-) is an interrogative pronoun that acts exactly like a definite article (der/die/das). It physically changes its ending to match the gender and case of the noun it is asking about.",
    theRule: [
      "The base word is 'welch-'. It cannot be used without an ending.",
      "The ending you attach is identical to the last letter of the definite article for that noun.",
      "If it's 'der' (masculine nominative), use 'welcher'. If it's 'das' (neuter), use 'welches'. If it's 'die' (feminine or plural), use 'welche'.",
      "If the noun is the direct object (Accusative masculine 'den'), use 'welchen'."
    ],
    formula: [
      "Nominative: Welcher (der), Welche (die), Welches (das), Welche (plural).",
      "Accusative: Welchen (den), Welche (die), Welches (das), Welche (plural)."
    ],
    grammarTable: {
      headers: ["Gender", "Nominative (Subject)", "Accusative (Direct Object)"],
      rows: [
        ["Masculine (der/den)", "welcher Rock? (which skirt?)", "welchen Rock? (CHANGES!)"],
        ["Feminine (die)", "welche Jacke?", "welche Jacke? (no change)"],
        ["Neuter (das)", "welches Hemd?", "welches Hemd? (no change)"],
        ["Plural (die)", "welche Schuhe?", "welche Schuhe? (no change)"]
      ]
    },
    vocabulary: [
      { de: "welcher", en: "which (masculine nom)", example: "Welcher Tag ist heute?", exampleEn: "Which day is today?" },
      { de: "welches", en: "which (neuter)", example: "Welches Auto kaufst du?", exampleEn: "Which car are you buying?" },
      { de: "welche", en: "which (feminine/plural)", example: "Welche Schuhe gefallen dir?", exampleEn: "Which shoes do you like?" },
      { de: "welchen", en: "which (masculine acc)", example: "Welchen Rock möchtest du?", exampleEn: "Which skirt would you like?" },
      { de: "der Rock", en: "skirt", example: "Der Rock ist zu kurz.", exampleEn: "The skirt is too short." },
      { de: "das Hemd", en: "shirt (button-up)", example: "Das Hemd ist weiß.", exampleEn: "The shirt is white." },
      { de: "die Jacke", en: "jacket", example: "Ich brauche eine Jacke.", exampleEn: "I need a jacket." },
      { de: "die Schuhe", en: "shoes (plural)", example: "Die Schuhe sind teuer.", exampleEn: "The shoes are expensive." },
      { de: "der Pullover", en: "sweater", example: "Welchen Pullover nimmst du?", exampleEn: "Which sweater are you taking?" },
      { de: "nehmen", en: "to take", example: "Ich nehme den Kaffee.", exampleEn: "I'll take the coffee." }
    ],
    modelSentences: [
      {
        de: "Welcher Zug fährt nach Berlin?",
        en: "Which train travels to Berlin?",
        breakdown: "Welcher = Which | Zug = train | fährt = travels | nach Berlin = to Berlin → 'Welcher' is used for 'der' words (masculine) when asking 'which?'"
      },
      {
        de: "Welchen Apfel möchtest du?",
        en: "Which apple would you like?",
        breakdown: "Welchen = Which | Apfel = apple | möchtest du = would you like → 'Welchen' is used when the 'der' word is the thing being chosen/wanted."
      },
      {
        de: "Welche Jacke kaufst du? Die rote Jacke.",
        en: "Which jacket are you buying? The red jacket.",
        breakdown: "Welche = Which | Jacke = jacket | kaufst du = are you buying → 'Welche' is used for 'die' words (feminine) when asking 'which?'"
      },
      {
        de: "Welches Buch liest er gerade?",
        en: "Which book is he reading right now?",
        breakdown: "Welches = Which | Buch = book | liest er = is he reading | gerade = right now → 'Welches' is used for 'das' words (neuter) when asking 'which?'"
      }
    ],
    culturalNote: "When shopping for clothes in Germany, assistants are usually less intrusive than in the US. They will let you browse. If you ask for help, they will ask highly specific questions like 'Welchen Stil suchen Sie?' (Which style are you looking for?) to efficiently narrow down your options.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Add the correct ending (-er, -e, -es, -en) to the word 'welch-'.",
        items: [
          { prompt: "___ Stift brauchst du? (der Stift / Accusative object)", answer: "Welchen", hint: "Masculine direct object." },
          { prompt: "___ T-Shirt kaufst du? (das T-Shirt / Accusative object)", answer: "Welches", hint: "Neuter object." },
          { prompt: "___ Frau ist deine Mutter? (die Frau / Nominative subject)", answer: "Welche", hint: "Feminine subject." }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the question using 'welch-'.",
        items: [
          { prompt: "Which train? (der Zug / Nominative)", answer: "Welcher Zug?" },
          { prompt: "Which shoes? (die Schuhe / Plural)", answer: "Welche Schuhe?" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Welche Tag ist heute?",
        right: "Welcher Tag ist heute?",
        explanation: "'Der Tag' is masculine, and here it is the subject. The ending must mirror 'der' -> 'welcher'."
      },
      {
        wrong: "Welcher Pullover kaufst du?",
        right: "Welchen Pullover kaufst du?",
        explanation: "You are buying the sweater, making it the direct object (Accusative). Masculine accusative is 'den', so it must be 'welchen'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 10 nouns with their articles, and I will write a question asking 'Which [noun] do you want?' using 'welchen', 'welche', or 'welches'.",
      "Ask Sky: How do I answer a 'welch-' question? (e.g., Which apple? -> This apple).",
      "Ask Sky: Let's roleplay in a clothing store. You are the clerk asking me which items I want to try on."
    ],
    examRelevance: "Lesen & Hören: Multiple choice questions often hinge on identifying specifically *which* item someone chose. You will frequently hear dialogues like: 'Welchen Kuchen möchten Sie?' - 'Den Apfelkuchen, bitte.'",
    lessonGoal: "Accurately ask 'which' by attaching definite article endings to 'welch-' depending on the gender and case of the noun."
  },
  {
    lessonNo: 54,
    titleEn: "Demonstrative Article dies-",
    titleDe: "Demonstrativartikel dies-",
    introduction: "Once someone asks you 'Which shirt?' (Welches Hemd?), you need to be able to point to one and say 'THIS shirt!'. The demonstrative article 'dies-' (this/these) follows the exact same mechanical rules you just learned for 'welch-'. It adopts the ending of the definite article so you can point things out with grammatical precision.",
    theRule: [
      "The base word is 'dies-'. It points to a specific object close to you (this one / these ones).",
      "Like 'welch-', it takes the ending of the definite article (der -> dieser, die -> diese, das -> dieses).",
      "In the Accusative case, the masculine form changes: 'den' -> 'diesen'.",
      "'Welch-' and 'dies-' are the perfect pair: Question: Welches? Answer: Dieses."
    ],
    formula: [
      "Nominative: Dieser (der), Diese (die), Dieses (das), Diese (plural).",
      "Accusative: Diesen (den), Diese (die), Dieses (das), Diese (plural)."
    ],
    grammarTable: {
      headers: ["Gender", "Question (welch-)", "Answer Nominative", "Answer Accusative"],
      rows: [
        ["Masculine", "welcher / welchen?", "dieser Rock (this skirt)", "diesen Rock (this skirt/object)"],
        ["Feminine", "welche?", "diese Jacke", "diese Jacke"],
        ["Neuter", "welches?", "dieses Hemd", "dieses Hemd"],
        ["Plural", "welche?", "diese Schuhe", "diese Schuhe"]
      ]
    },
    vocabulary: [
      { de: "dieser", en: "this (masculine nom)", example: "Dieser Mann ist mein Vater.", exampleEn: "This man is my father." },
      { de: "dieses", en: "this (neuter)", example: "Dieses Buch ist spannend.", exampleEn: "This book is exciting." },
      { de: "diese", en: "this (feminine) / these (plural)", example: "Diese Schuhe sind zu klein.", exampleEn: "These shoes are too small." },
      { de: "diesen", en: "this (masculine acc)", example: "Ich kaufe diesen Computer.", exampleEn: "I am buying this computer." },
      { de: "der Computer", en: "computer", example: "Welchen Computer kaufst du?", exampleEn: "Which computer are you buying?" },
      { de: "das Kleid", en: "dress", example: "Dieses Kleid ist sehr schön.", exampleEn: "This dress is very beautiful." },
      { de: "die Hose", en: "pants / trousers", example: "Diese Hose passt mir nicht.", exampleEn: "These pants do not fit me." },
      { de: "der Mantel", en: "coat", example: "Ich brauche diesen Mantel.", exampleEn: "I need this coat." },
      { de: "das Auto", en: "car", example: "Wem gehört dieses Auto?", exampleEn: "Who does this car belong to?" },
      { de: "kosten", en: "to cost", example: "Was kostet dieser Tisch?", exampleEn: "What does this table cost?" }
    ],
    modelSentences: [
      {
        de: "Welchen Pullover nimmst du? Ich nehme diesen Pullover.",
        en: "Which sweater are you taking? I am taking this sweater.",
        breakdown: "Welchen Pullover = Which sweater | nimmst du = are you taking | Ich nehme = I am taking | diesen Pullover = this sweater → 'Welchen' and 'diesen' both end in '-en' here because you're choosing the sweater (it's the thing being taken)."
      },
      {
        de: "Dieses Auto ist zu teuer. Ich habe kein Geld.",
        en: "This car is too expensive. I have no money.",
        breakdown: "Dieses = This | Auto = car | ist = is | zu teuer = too expensive → 'Dieses' is used for 'das' words (neuter) to say 'this'."
      },
      {
        de: "Diese Schuhe gefallen mir sehr gut.",
        en: "These shoes please me very much (I like these shoes).",
        breakdown: "Diese = These | Schuhe = shoes | gefallen = please / look good | mir = to me → 'Diese' is used for plural or 'die' words. 'gefallen' works backwards: the shoes are doing the pleasing, you are the one being pleased."
      },
      {
        de: "Kennen Sie diesen Mann?",
        en: "Do you know this man?",
        breakdown: "Kennen Sie = Do you know (formal) | diesen Mann = this man → 'Diesen' is used because it's a 'der' word being pointed at/referred to as the object."
      }
    ],
    culturalNote: "When pointing at objects casually, Germans often skip 'dieser' entirely and just use stressed definite articles. They will point at a cake and say 'Den Kuchen nehme ich' (literally: THE cake I take). However, in formal language and written German, 'dies-' is mandatory and tested.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Add the correct ending (-er, -e, -es, -en) to the word 'dies-'.",
        items: [
          { prompt: "Ich trinke ___ Kaffee. (der Kaffee / Accusative object)", answer: "diesen", hint: "Masculine direct object." },
          { prompt: "___ Buch ist sehr gut. (das Buch / Nominative subject)", answer: "Dieses", hint: "Neuter subject." },
          { prompt: "___ Lampen sind zu hell. (die Lampen / Plural)", answer: "Diese", hint: "Plural subject." }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the dialogue using welch- and dies-.",
        items: [
          { prompt: "Which skirt? (der Rock) -> This skirt.", answer: "Welcher Rock? -> Dieser Rock." },
          { prompt: "Which jacket? (die Jacke) -> This jacket.", answer: "Welche Jacke? -> Diese Jacke." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich möchte dies Auto.",
        right: "Ich möchte dieses Auto.",
        explanation: "You must always finish the word 'dies-'. Because 'Auto' is neuter (das Auto), it MUST end in '-es'. 'Dies' alone is only used in rare slang or poetry."
      },
      {
        wrong: "Ich nehme dieser Stift.",
        right: "Ich nehme diesen Stift.",
        explanation: "The pen (der Stift) is being taken by you; it is the direct object. The masculine article must change to accusative (den -> diesen)."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 sentences where I have to choose between 'dieser', 'diese', 'dieses', and 'diesen'.",
      "Ask Sky: Explain the difference between 'das ist' (that is) and 'dieses Auto ist' (this car is).",
      "Ask Sky: Create a short dialogue at an electronics store where I point to different items to ask their price."
    ],
    examRelevance: "Lesen & Hören Teil 2: Identifying exactly what the speaker is pointing to is a key comprehension skill. If someone says 'Ich nehme diesen hier', you must know they are selecting a masculine object.",
    lessonGoal: "Point to specific objects accurately by attaching the correct definite article endings to the demonstrative word 'dies-'."
  },
  {
    lessonNo: 55,
    titleEn: "Buying Clothes",
    titleDe: "Kleidung kaufen",
    introduction: "Shopping for clothes in Germany is a linguistic gauntlet. You must state what you are looking for (Accusative), ask to try it on (separable verbs), and finally judge how it fits and looks on you (Dative verbs). Conquering this real-world scenario combines three major grammar pillars into one practical skill.",
    theRule: [
      "To ask to try something on, use the separable verb 'anprobieren': 'Kann ich das anprobieren?'.",
      "To judge size/fit, use 'passen' (to fit) + Dative: 'Die Hose passt mir nicht' (The pants do not fit me).",
      "To judge appearance/style, use 'stehen' (to suit/look good) + Dative: 'Die Farbe steht dir' (The color looks good on you).",
      "Remember that clothing items have strict genders (der Rock, die Hose, das Hemd), which dictates the pronouns you use."
    ],
    formula: [
      "Request: Kann ich + [Accusative Item] + anprobieren?",
      "Fit: [Item] + passt / passen + mir + (nicht).",
      "Style: [Item] + steht / stehen + mir + (gut/nicht)."
    ],
    grammarTable: {
      headers: ["Action", "Verb", "Structure", "Example"],
      rows: [
        ["Trying on", "anprobieren (separable)", "Modal + ... + infinitive", "Kann ich das Hemd anprobieren?"],
        ["Checking fit (size)", "passen (Dative)", "Item + passt + mir", "Der Pullover passt mir gut."],
        ["Checking style (looks)", "stehen (Dative)", "Item + steht + mir", "Die Jacke steht mir nicht."]
      ]
    },
    vocabulary: [
      { de: "anprobieren", en: "to try on (separable)", example: "Ich möchte die Hose anprobieren.", exampleEn: "I would like to try the pants on." },
      { de: "passen", en: "to fit (size)", example: "Die Schuhe passen mir.", exampleEn: "The shoes fit me." },
      { de: "stehen", en: "to suit (appearance)", example: "Das Kleid steht dir super.", exampleEn: "The dress looks great on you." },
      { de: "die Größe", en: "size", example: "Haben Sie das in Größe M?", exampleEn: "Do you have that in size M?" },
      { de: "die Umkleidekabine", en: "fitting room", example: "Wo ist die Umkleidekabine?", exampleEn: "Where is the fitting room?" },
      { de: "die Farbe", en: "color", example: "Die Farbe ist zu dunkel.", exampleEn: "The color is too dark." },
      { de: "eng", en: "tight", example: "Das Hemd ist zu eng.", exampleEn: "The shirt is too tight." },
      { de: "weit", en: "wide / loose", example: "Die Hose ist zu weit.", exampleEn: "The pants are too loose." },
      { de: "die Hose", en: "pants / trousers", example: "Ich suche eine schwarze Hose.", exampleEn: "I am looking for black pants." },
      { de: "das T-Shirt", en: "T-shirt", example: "Dieses T-Shirt ist billig.", exampleEn: "This T-shirt is cheap." }
    ],
    modelSentences: [
      {
        de: "Entschuldigung, kann ich diese Hose anprobieren?",
        en: "Excuse me, can I try these pants on?",
        breakdown: "Entschuldigung, kann(Modal pos 2) ich diese Hose(Accusative feminine object) anprobieren(Infinitive at end)?"
      },
      {
        de: "Wie passt das Hemd? Es ist leider zu eng.",
        en: "How does the shirt fit? It is unfortunately too tight.",
        breakdown: "Wie passt das Hemd(subject)? Es ist leider(unfortunately) zu eng(too tight)."
      },
      {
        de: "Dieser Mantel steht Ihnen sehr gut.",
        en: "This coat looks very good on you. (Formal)",
        breakdown: "Dieser Mantel = This coat | steht = suits / looks good on | Ihnen = you (formal) | sehr gut = very well → A great phrase to compliment a customer in a shop."
      },
      {
        de: "Haben Sie diese Jacke eine Nummer größer?",
        en: "Do you have this jacket one size larger?",
        breakdown: "Haben Sie(Do you have) diese Jacke eine Nummer(one number/size) größer(larger/comparative)?"
      }
    ],
    culturalNote: "Clothing sizes in Germany differ slightly from the US. While S, M, L, and XL are universally understood for casual wear (like T-Shirts), tailored clothing uses European sizing numbers (e.g., women's 36, 38, 40; men's 48, 50, 52). If you need a different size, ask for 'eine Nummer größer' (one number bigger) or 'eine Nummer kleiner' (one number smaller).",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Choose between 'passen' (size) and 'stehen' (looks).",
        items: [
          { prompt: "Der Rock ist zu groß. Er ___ mir nicht.", answer: "passt", hint: "Relates to physical size/fit." },
          { prompt: "Die blaue Farbe ___ dir fantastisch!", answer: "steht", hint: "Relates to visual appearance." }
        ]
      },
      {
        type: "translate",
        instruction: "Translate your request to the shop assistant.",
        items: [
          { prompt: "Where is the fitting room?", answer: "Wo ist die Umkleidekabine?" },
          { prompt: "Can I try this on? (anprobieren)", answer: "Kann ich das anprobieren?" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Die Hose steht zu klein.",
        right: "Die Hose ist zu klein. (oder: Die Hose passt nicht.)",
        explanation: "You cannot use 'stehen' to describe size. 'Stehen' is ONLY used for aesthetics (how it looks on you)."
      },
      {
        wrong: "Das Hemd passt mich.",
        right: "Das Hemd passt mir.",
        explanation: "Both 'passen' and 'stehen' strictly require the Dative pronoun. The shirt fits TO me (mir), not 'mich'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Let's roleplay! I am in a clothing store trying on an ugly, oversized sweater, and you are the honest German friend telling me how it looks.",
      "Ask Sky: How do I ask a shop assistant if a piece of clothing comes in a different color?",
      "Ask Sky: What are the German words for different clothing patterns (striped, checkered, plain)?"
    ],
    examRelevance: "Hören & Sprechen Teil 2: Shopping dialogues are mandatory for A1. You will hear audio of someone in a fitting room deciding whether an item 'passt' or not. You must also be able to form a request like 'Ich möchte den Pullover anprobieren'.",
    lessonGoal: "Navigate a clothing store interaction: asking to try items on, requesting different sizes, and judging fit and appearance using Dative verbs."
  }
];