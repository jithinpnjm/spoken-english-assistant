import type { GermanA1BookLesson } from "../germanA1BookLessonTypes";

export const germanA1BookLessonsPart08: GermanA1BookLesson[] = [
  {
    lessonNo: 36,
    titleEn: "Personal Pronouns Dative",
    titleDe: "Personalpronomen im Dativ",
    introduction: "Just as you learned that 'helfen' (to help) forces a noun into the indirect object form, it also forces personal pronouns to change. If you want to say 'Help me!' or 'I thank you', you cannot use 'ich' or 'mich'. You must use the special words 'mir' and 'dir'. Mastering these short words completely transforms how you interact with Germans.",
    theRule: [
      "When a pronoun is the indirect object of a sentence (following verbs like helfen, danken, gehören) or a preposition like 'mit', it must take a special form.",
      "'ich' becomes 'mir' (to me).",
      "'du' becomes 'dir' (to you).",
      "'er' (he) and 'es' (it) both become 'ihm' (to him/to it).",
      "'sie' (she) becomes 'ihr' (to her).",
      "Plurals: 'wir' -> 'uns', 'ihr' -> 'euch', 'sie/Sie' -> 'ihnen/Ihnen'."
    ],
    formula: [
      "Subject + Verb + Indirect Object Pronoun",
      "Example: Das Auto + gehört + mir."
    ],
    grammarTable: {
      headers: ["Subject Form", "Indirect Object Form", "English Meaning"],
      rows: [
        ["ich", "mir", "(to) me"],
        ["du", "dir", "(to) you (informal)"],
        ["er / es", "ihm", "(to) him / it"],
        ["sie", "ihr", "(to) her"],
        ["wir", "uns", "(to) us"],
        ["ihr", "euch", "(to) you all"],
        ["sie / Sie", "ihnen / Ihnen", "(to) them / you (formal)"]
      ]
    },
    vocabulary: [
      { de: "mir", en: "to me", example: "Hilf mir bitte.", exampleEn: "Help me please." },
      { de: "dir", en: "to you (informal)", example: "Ich danke dir.", exampleEn: "I thank you." },
      { de: "ihm", en: "to him / it", example: "Das Buch gehört ihm.", exampleEn: "The book belongs to him." },
      { de: "ihr", en: "to her", example: "Das Kleid passt ihr.", exampleEn: "The dress fits her." },
      { de: "ihnen", en: "to them", example: "Ich antworte ihnen.", exampleEn: "I answer them." },
      { de: "Ihnen", en: "to you (formal)", example: "Wie geht es Ihnen?", exampleEn: "How are you?" },
      { de: "gehören", en: "to belong to", example: "Wem gehört das?", exampleEn: "Who does that belong to?" },
      { de: "passen", en: "to fit", example: "Die Schuhe passen mir.", exampleEn: "The shoes fit me." },
      { de: "antworten", en: "to answer", example: "Bitte antworte mir.", exampleEn: "Please answer me." },
      { de: "schmecken", en: "to taste good to", example: "Die Pizza schmeckt mir.", exampleEn: "The pizza tastes good to me." }
    ],
    modelSentences: [
      {
        de: "Kannst du mir helfen?",
        en: "Can you help me?",
        breakdown: "Kannst = Can | du = you (subject) | mir = to me (indirect object pronoun) | helfen = help (sent to the end) → 'ich' becomes 'mir' as the indirect object."
      },
      {
        de: "Das Essen ist sehr lecker. Es schmeckt mir gut.",
        en: "The food is very delicious. It tastes good to me.",
        breakdown: "Das Essen = The food | ist sehr lecker = is very delicious | Es = It (subject) | schmeckt = tastes (this verb always points to the person experiencing the taste) | mir = to me | gut = well → 'schmecken' always needs an indirect object pronoun."
      },
      {
        de: "Gehört der Stift dir oder gehört er ihm?",
        en: "Does the pen belong to you or does it belong to him?",
        breakdown: "Gehört = Belongs | der Stift = the pen (subject) | dir = to you (indirect object pronoun) | oder = or | gehört er = does it belong | ihm = to him (indirect object pronoun) → 'gehören' always points to the owner."
      },
      {
        de: "Ich antworte der Chefin. Ich antworte ihr.",
        en: "I answer the boss. I answer her.",
        breakdown: "Ich = I | antworte = answer | der Chefin = the boss (indirect object noun) | Ich = I | antworte = answer | ihr = her (indirect object pronoun replacing 'die Chefin') → The pronoun replaces the noun but stays in the same indirect object form."
      }
    ],
    culturalNote: "You have been using indirect object pronouns since Lesson 8 without realizing it! When you ask 'Wie geht es dir?' (How are you?), you are literally asking 'How goes it TO YOU?'. The response 'Mir geht es gut' literally means 'TO ME it goes well'. This is why you cannot say 'Ich bin gut'.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Fill in the correct indirect object pronoun.",
        items: [
          { prompt: "Der Kaffee ist für Tom. Er schmeckt ___ sehr gut.", answer: "ihm", hint: "to him" },
          { prompt: "Anna sucht ihr Buch. Das Buch gehört ___.", answer: "ihr", hint: "to her" },
          { prompt: "Herr Schmidt, kann ich ___ helfen?", answer: "Ihnen", hint: "to you (formal)" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the sentence, making sure to use the correct pronoun form.",
        items: [
          { prompt: "I thank you (informal).", answer: "Ich danke dir." },
          { prompt: "The car belongs to me.", answer: "Das Auto gehört mir." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich helfe dich.",
        right: "Ich helfe dir.",
        explanation: "English speakers use the direct object for 'help'. In German, 'helfen' strictly requires the indirect object form, so 'dich' MUST become 'dir'."
      },
      {
        wrong: "Das T-Shirt gefällt mich.",
        right: "Das T-Shirt gefällt mir.",
        explanation: "Same issue. 'gefallen' (to be pleasing to) requires the indirect object form. It pleases TO me -> 'mir'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 sentences using 'mich' or 'dich' incorrectly with verbs like helfen or gefallen, and I will fix them.",
      "Ask Sky: Create a short dialogue where someone is trying on clothes, using 'passen' and 'gefallen' with indirect object pronouns.",
      "Ask Sky: How do I tell the difference between 'ihr' (to her) and 'ihr' (you all) in a sentence?"
    ],
    examRelevance: "Sprechen Teil 2: Responding naturally with 'Das gefällt mir' (I like that) or 'Ich helfe dir' shows native-like command of cases. Writing emails to friends also frequently requires 'dir' and 'mir'.",
    lessonGoal: "Replace nouns with correctly chosen indirect object personal pronouns (mir, dir, ihm, ihr, uns, euch, ihnen) when using the right verbs."
  },
  {
    lessonNo: 37,
    titleEn: "Separable Verbs (Trennbare Verben)",
    titleDe: "Trennbare Verben",
    introduction: "German has a fantastic way of creating new verbs: it glues a little preposition (like 'an' or 'auf') to the front of a base verb. 'Kommen' means to come, but 'ankommen' means to arrive. However, in a normal sentence, these verbs break apart! The prefix detaches and flies all the way to the very end of the sentence. This creates the famous German 'sentence bracket'.",
    theRule: [
      "A separable verb consists of a prefix (an-, auf-, ein-, mit-, etc.) and a base verb (fangen, stehen, kaufen).",
      "In a present tense statement, the base verb takes Position 2 and is conjugated normally.",
      "The prefix breaks off and goes to the VERY END of the clause.",
      "If you use a Modal verb (like 'möchten' or 'können'), the separable verb does NOT split. The whole word goes to the end in its full form."
    ],
    formula: [
      "Standard: Subject (1) + Conjugated Base Verb (2) + Object/Time + Prefix (End).",
      "Modal: Subject (1) + Modal Verb (2) + Object/Time + Full Separable Verb (End)."
    ],
    vocabulary: [
      { de: "aufstehen", en: "to wake up / get up", example: "Ich stehe um 7 Uhr auf.", exampleEn: "I get up at 7 o'clock." },
      { de: "anfangen", en: "to begin / start", example: "Der Kurs fängt jetzt an.", exampleEn: "The course starts now." },
      { de: "einkaufen", en: "to shop (groceries)", example: "Wir kaufen im Supermarkt ein.", exampleEn: "We are shopping in the supermarket." },
      { de: "fernsehen", en: "to watch TV", example: "Er sieht abends fern.", exampleEn: "He watches TV in the evening." },
      { de: "anrufen", en: "to call (phone)", example: "Rufst du mich heute an?", exampleEn: "Are you calling me today?" },
      { de: "mitkommen", en: "to come along", example: "Kommst du mit?", exampleEn: "Are you coming along?" },
      { de: "zumachen", en: "to close", example: "Ich mache die Tür zu.", exampleEn: "I close the door." },
      { de: "aufmachen", en: "to open", example: "Machst du das Fenster auf?", exampleEn: "Are you opening the window?" },
      { de: "abfahren", en: "to depart", example: "Der Zug fährt um 8 Uhr ab.", exampleEn: "The train departs at 8 o'clock." },
      { de: "ankommen", en: "to arrive", example: "Wann kommt der Bus an?", exampleEn: "When does the bus arrive?" }
    ],
    modelSentences: [
      {
        de: "Ich kaufe heute im Supermarkt ein.",
        en: "I am shopping in the supermarket today.",
        breakdown: "Ich = I | kaufe = buy (base verb in position 2, without the 'ein' prefix) | heute = today | im Supermarkt = in the supermarket | ein = prefix sent to the very end → The prefix 'ein' breaks off from 'einkaufen'."
      },
      {
        de: "Der Film fängt um acht Uhr an.",
        en: "The movie starts at eight o'clock.",
        breakdown: "Der Film = The movie (subject) | fängt = starts (base verb in position 2) | um acht Uhr = at eight o'clock | an = prefix sent to the end → 'anfangen' splits: base verb comes 2nd, prefix goes last."
      },
      {
        de: "Wann stehst du am Wochenende auf?",
        en: "When do you get up on the weekend?",
        breakdown: "Wann = When (position 1) | stehst = stand (base verb, position 2) | du = you | am Wochenende = on the weekend | auf = prefix sent to the end → Question structure with a separable verb."
      },
      {
        de: "Ich möchte heute einkaufen.",
        en: "I would like to shop today.",
        breakdown: "Ich = I | möchte = would like (modal verb, position 2) | heute = today | einkaufen = the full separable verb goes to the end without splitting → When a modal verb is used, the separable verb stays whole."
      }
    ],
    culturalNote: "When listening to Germans speak, you must pay attention until the very last word of the sentence. If someone says 'Ich rufe meine Mutter...', you don't know if they are calling out to her (rufen) or calling her on the phone (anrufen) until you hear the 'an' drop at the end of the sentence.",
    exercises: [
      {
        type: "reorder",
        instruction: "Put the sentence in the correct order, placing the prefix at the end.",
        items: [
          { prompt: "stehe / um sechs Uhr / auf / Ich", answer: "Ich stehe um sechs Uhr auf." },
          { prompt: "fern / wir / am Abend / sehen", answer: "Am Abend sehen wir fern." }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Fill in the missing prefix at the end of the sentence.",
        items: [
          { prompt: "Der Zug kommt um 15 Uhr ___. (ankommen)", answer: "an", hint: "prefix for arrive" },
          { prompt: "Bitte mache das Fenster ___. (zumachen)", answer: "zu", hint: "prefix for close" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich aufstehe um 7 Uhr.",
        right: "Ich stehe um 7 Uhr auf.",
        explanation: "Treating a separable verb like an English word. You MUST physically break the prefix off and move it to the end."
      },
      {
        wrong: "Er seht fern.",
        right: "Er sieht fern.",
        explanation: "Forgetting that the base verb might be irregular! 'sehen' changes its vowel from 'e' to 'ie' for 'er'. So 'fernsehen' becomes 'er sieht... fern'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 separable verbs in their full form, and I will write a sentence for each showing how they split.",
      "Ask Sky: Can we practice a phone call scenario where we use 'anrufen', 'mitkommen', and 'ankommen'?",
      "Ask Sky: Why doesn't the verb split when I use a modal verb like 'können' or 'möchten'?"
    ],
    examRelevance: "Schreiben Teil 1 & Hören Teil 1: You must be able to write an email saying 'Ich komme um 14 Uhr an' (I arrive at 14:00). In listening, understanding the separated prefix is key to understanding the action.",
    lessonGoal: "Correctly conjugate and split separable verbs, ensuring the prefix lands at the absolute end of the sentence."
  },
  {
    lessonNo: 38,
    titleEn: "Daily Routine",
    titleDe: "Tagesablauf",
    introduction: "Talking about your daily routine is the ultimate test of everything you've learned so far. You will need to use time expressions, separable verbs (like waking up), and most importantly: Inversion. When you string actions together using 'first', 'then', and 'after that', those words take Position 1, which means the verb stays in Position 2, pushing the subject to Position 3.",
    theRule: [
      "To describe a sequence of events, use transition words: zuerst (first), dann (then), danach (after that), and später (later).",
      "Because these transition words occupy Position 1, the verb MUST be in Position 2.",
      "The subject ('ich') gets pushed to Position 3 (e.g., Dann trinke ich Kaffee).",
      "If you use a separable verb (like aufstehen), the prefix still goes to the very end of the sentence."
    ],
    formula: [
      "Time/Sequence Word (1) + Verb (2) + Subject (3) + Rest + (Prefix).",
      "Zuerst + stehe + ich + um 7 Uhr + auf."
    ],
    vocabulary: [
      { de: "zuerst", en: "first", example: "Zuerst dusche ich.", exampleEn: "First I shower." },
      { de: "dann", en: "then", example: "Dann frühstücke ich.", exampleEn: "Then I eat breakfast." },
      { de: "danach", en: "after that", example: "Danach gehe ich arbeiten.", exampleEn: "After that I go to work." },
      { de: "später", en: "later", example: "Später kaufe ich ein.", exampleEn: "Later I go shopping." },
      { de: "duschen", en: "to take a shower", example: "Ich dusche morgens.", exampleEn: "I shower in the morning." },
      { de: "frühstücken", en: "to eat breakfast", example: "Wann frühstückst du?", exampleEn: "When do you eat breakfast?" },
      { de: "arbeiten", en: "to work", example: "Ich arbeite von 9 bis 17 Uhr.", exampleEn: "I work from 9 to 17." },
      { de: "Mittagspause machen", en: "to take a lunch break", example: "Dann mache ich Mittagspause.", exampleEn: "Then I take a lunch break." },
      { de: "Feierabend machen", en: "to finish work for the day", example: "Um 18 Uhr mache ich Feierabend.", exampleEn: "At 18:00 I finish work." },
      { de: "ins Bett gehen", en: "to go to bed", example: "Ich gehe um 23 Uhr ins Bett.", exampleEn: "I go to bed at 23:00." }
    ],
    modelSentences: [
      {
        de: "Zuerst stehe ich um sieben Uhr auf.",
        en: "First I get up at seven o'clock.",
        breakdown: "Zuerst = First (position 1) | stehe = stand (base verb, position 2) | ich = I (pushed to position 3) | um sieben Uhr = at seven o'clock | auf = prefix sent to the end → Sequence word pushes 'ich' back."
      },
      {
        de: "Dann dusche ich und danach frühstücke ich.",
        en: "Then I shower and after that I eat breakfast.",
        breakdown: "Dann = Then (position 1) | dusche = shower (position 2) | ich = I (position 3) | und = and | danach = after that (position 1 again) | frühstücke = eat breakfast (position 2) | ich = I (position 3) → The rule repeats for each new clause."
      },
      {
        de: "Um acht Uhr fahre ich zur Arbeit.",
        en: "At eight o'clock I drive to work.",
        breakdown: "Um acht Uhr = At eight o'clock (position 1 — time block) | fahre = drive (position 2) | ich = I (position 3) | zur Arbeit = to work → A time block in position 1 works the same way."
      },
      {
        de: "Später sehe ich fern und gehe ins Bett.",
        en: "Later I watch TV and go to bed.",
        breakdown: "Später = Later (position 1) | sehe = see (position 2) | ich = I (position 3) | fern = prefix at the end | und = and | gehe ins Bett = go to bed → Two actions linked with 'und'."
      }
    ],
    culturalNote: "The word 'Feierabend' is a beloved German concept. It literally translates to 'celebration evening', but it simply means the time when your workday is officially over. Wishing colleagues 'Schönen Feierabend!' (Have a nice evening off!) as you leave the office is deeply embedded in German work culture.",
    exercises: [
      {
        type: "reorder",
        instruction: "Build the daily routine sentence with correct word order.",
        items: [
          { prompt: "Dann / ich / Kaffee / trinke", answer: "Dann trinke ich Kaffee." },
          { prompt: "auf / Zuerst / ich / stehe", answer: "Zuerst stehe ich auf." },
          { prompt: "gehe / ich / Danach / arbeiten", answer: "Danach gehe ich arbeiten." }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the step of the daily routine.",
        items: [
          { prompt: "Later I eat breakfast.", answer: "Später frühstücke ich." },
          { prompt: "Then I watch TV. (fernsehen)", answer: "Dann sehe ich fern." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Dann ich frühstücke.",
        right: "Dann frühstücke ich.",
        explanation: "The most persistent A1 mistake! When you start a sentence with 'Dann', 'Zuerst', or 'Danach', the verb MUST come immediately after it in Position 2."
      },
      {
        wrong: "Zuerst ich stehe auf.",
        right: "Zuerst stehe ich auf.",
        explanation: "A double mistake: the verb is pushed to the wrong position, and the separable prefix is forgotten. Correct order: 'Zuerst stehe ich auf'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can I describe my actual morning routine to you using 'zuerst', 'dann', and 'danach', and you correct my word order?",
      "Ask Sky: Give me a list of 5 activities in English, and I will write a German paragraph linking them together chronologically.",
      "Ask Sky: What exactly is 'Feierabend' and how do I use it in a sentence?"
    ],
    examRelevance: "Sprechen Teil 2 & Schreiben Teil 2: Describing what you do on a normal day or on the weekend is a classic exam prompt. Seamlessly linking sentences with 'dann' and 'danach' (with perfect word order) guarantees high marks.",
    lessonGoal: "Narrate a chronological sequence of events describing a daily routine using transition words, correct word order, and separable verbs."
  },
  {
    lessonNo: 39,
    titleEn: "Imperative Sentences",
    titleDe: "Imperativsätze",
    introduction: "Sometimes you don't want to ask a question; you need to give a command, advice, or an instruction. 'Come here!', 'Read this!', 'Drink water!'. In German, this is called the Imperative. Depending on who you are talking to—a formal stranger, a close friend, or a group of people—the way you construct a command changes significantly.",
    theRule: [
      "For Formal 'Sie' (strangers/adults): Put the verb in Position 1, followed immediately by 'Sie'. (Kommen Sie!)",
      "For Informal Plural 'ihr' (a group of friends): Just use the normal 'ihr' conjugation and drop the pronoun. (Kommt!)",
      "For Informal Singular 'du' (one friend): Take the 'du' conjugation, and chop off both the '-st' ending and the word 'du'. (Kommst du -> Komm!)",
      "To make a command polite, simply add the word 'bitte' (please) anywhere after the verb."
    ],
    formula: [
      "Formal (Sie): Verb(en) + Sie + Rest! (Gehen Sie!)",
      "Plural (ihr): Verb(t) + Rest! (Geht!)",
      "Singular (du): Verb stem + Rest! (Geh!)"
    ],
    grammarTable: {
      headers: ["Base Verb", "Formal (Sie)", "Informal Plural (ihr)", "Informal Singular (du)"],
      rows: [
        ["kommen (to come)", "Kommen Sie!", "Kommt!", "Komm!"],
        ["machen (to do/make)", "Machen Sie!", "Macht!", "Mach!"],
        ["trinken (to drink)", "Trinken Sie!", "Trinkt!", "Trink!"],
        ["lesen (to read / e->ie)", "Lesen Sie!", "Lest!", "Lies! (keep vowel change, drop '-st')"]
      ]
    },
    vocabulary: [
      { de: "kommen", en: "to come", example: "Komm bitte her!", exampleEn: "Please come here!" },
      { de: "gehen", en: "to go", example: "Gehen Sie geradeaus.", exampleEn: "Go straight ahead." },
      { de: "machen", en: "to do / make", example: "Mach deine Hausaufgaben!", exampleEn: "Do your homework!" },
      { de: "sprechen", en: "to speak", example: "Sprechen Sie langsam, bitte.", exampleEn: "Speak slowly, please." },
      { de: "lesen", en: "to read", example: "Lies den Text.", exampleEn: "Read the text." },
      { de: "warten", en: "to wait", example: "Wartet hier auf mich.", exampleEn: "Wait here for me. (to a group)" },
      { de: "helfen", en: "to help", example: "Hilf mir!", exampleEn: "Help me!" },
      { de: "ruhig", en: "quiet", example: "Sei ruhig!", exampleEn: "Be quiet!" },
      { de: "langsam", en: "slow(ly)", example: "Fahrt langsam!", exampleEn: "Drive slowly! (to a group)" },
      { de: "bitte", en: "please", example: "Unterschreiben Sie bitte hier.", exampleEn: "Please sign here." }
    ],
    modelSentences: [
      {
        de: "Trinken Sie viel Wasser!",
        en: "Drink lots of water! (Formal)",
        breakdown: "Trinken = Verb in position 1 | Sie = formal pronoun right after | viel Wasser = lots of water → Formal command: verb first, then 'Sie'."
      },
      {
        de: "Komm bitte heute Abend zu mir.",
        en: "Please come to my place tonight. (Informal singular)",
        breakdown: "Komm = Base verb with '-st' removed (no 'du' needed) | bitte = please | heute Abend = tonight | zu mir = to my place → Informal singular command: just the bare stem."
      },
      {
        de: "Macht die Tür zu, Kinder!",
        en: "Close the door, children! (Informal plural)",
        breakdown: "Macht = Normal '-t' ending for 'ihr' (no 'ihr' needed) | die Tür = the door | zu = prefix at end | Kinder = children → Informal plural command: normal '-t' form without the pronoun."
      },
      {
        de: "Sprich bitte etwas lauter.",
        en: "Please speak a little louder. (Informal singular)",
        breakdown: "Sprich = Irregular vowel-changed stem (e -> i), drop the '-st' | bitte = please | etwas lauter = a little louder → Irregular verb: keep the vowel change, drop the '-st'."
      }
    ],
    culturalNote: "German commands sound very harsh when directly translated into English, but they are completely normal. A doctor will tell you 'Trinken Sie viel Tee!' (Drink lots of tea!) rather than saying 'You might want to consider drinking tea'. It is viewed as clear advice, not an aggressive order, especially if 'bitte' is included.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Form the correct command for one friend ('du' form).",
        items: [
          { prompt: "___ (kaufen) Milch!", answer: "Kauf", hint: "Drop the '-st'" },
          { prompt: "___ (trinken) den Kaffee!", answer: "Trink", hint: "Drop the '-st'" },
          { prompt: "___ (helfen) mir!", answer: "Hilf", hint: "Irregular vowel changes to 'i'" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the formal command ('Sie' form).",
        items: [
          { prompt: "Come here, please! (herkommen)", answer: "Kommen Sie bitte her!" },
          { prompt: "Wait here. (warten)", answer: "Warten Sie hier." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Kommst du hier!",
        right: "Komm hier!",
        explanation: "You must drop BOTH the '-st' and the word 'du' to form a command for a friend. Keeping them makes it a question ('Are you coming here?')."
      },
      {
        wrong: "Machen das bitte!",
        right: "Machen Sie das bitte!",
        explanation: "For the formal command, you CANNOT drop the pronoun. The word 'Sie' is absolutely mandatory immediately after the verb."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 situations (e.g., 'A friend is talking too fast'), and I will write a command sentence for each.",
      "Ask Sky: How do I form the command for the verb 'sein' (to be) for 'du', 'ihr', and 'Sie'?",
      "Ask Sky: Test me! Give me a verb and tell me if I need to make a command for 'Sie', 'du', or 'ihr'."
    ],
    examRelevance: "Sprechen Teil 3 (Bitten formulieren): In the final speaking task, you must formulate requests based on pictures. For example, if you see an open window, you must say 'Machen Sie bitte das Fenster zu!' (Please close the window!).",
    lessonGoal: "Give clear commands, advice, and instructions using the correct forms for formal (Sie), informal singular (du), and informal plural (ihr) situations."
  },
  {
    lessonNo: 40,
    titleEn: "Giving Directions",
    titleDe: "Wegbeschreibung",
    introduction: "Getting lost in a German city is inevitable, but asking for and understanding directions is a skill you can easily master. This lesson combines the Imperative (commands like 'go', 'turn') with specific directional vocabulary. Once you know your left from your right, you can navigate any street in Berlin or Munich.",
    theRule: [
      "Use the Imperative 'Gehen Sie...' (Go...) or 'Fahren Sie...' (Drive/Ride...) to give directions.",
      "To say 'straight ahead', use 'geradeaus'.",
      "To say 'turn right/left', use the separable verb 'abbiegen' -> 'Biegen Sie rechts/links ab'.",
      "Use 'bis zur' (until/up to) with feminine landmarks: 'bis zur Ampel' (up to the traffic light) or 'bis zur Kreuzung' (up to the intersection)."
    ],
    formula: [
      "Gehen/Fahren Sie + [Direction: geradeaus / nach links / nach rechts].",
      "Biegen Sie + [links/rechts] + ab.",
      "Gehen Sie bis zur + [Landmark: Ampel / Kreuzung]."
    ],
    vocabulary: [
      { de: "geradeaus", en: "straight ahead", example: "Gehen Sie immer geradeaus.", exampleEn: "Always go straight ahead." },
      { de: "links", en: "left", example: "Biegen Sie links ab.", exampleEn: "Turn left." },
      { de: "rechts", en: "right", example: "Die Bank ist auf der rechten Seite.", exampleEn: "The bank is on the right side." },
      { de: "abbiegen", en: "to turn (direction)", example: "Biegen Sie hier ab.", exampleEn: "Turn here." },
      { de: "die Straße", en: "street", example: "Gehen Sie diese Straße entlang.", exampleEn: "Go along this street." },
      { de: "die Kreuzung", en: "intersection", example: "Gehen Sie bis zur Kreuzung.", exampleEn: "Go up to the intersection." },
      { de: "die Ampel", en: "traffic light", example: "An der Ampel rechts.", exampleEn: "At the traffic light, right." },
      { de: "die Ecke", en: "corner", example: "Das Café ist an der Ecke.", exampleEn: "The cafe is on the corner." },
      { de: "weitergehen", en: "to keep walking", example: "Gehen Sie weiter.", exampleEn: "Keep walking." },
      { de: "wenden", en: "to turn around", example: "Bitte wenden Sie.", exampleEn: "Please turn around." }
    ],
    modelSentences: [
      {
        de: "Entschuldigung, wie komme ich zum Bahnhof?",
        en: "Excuse me, how do I get to the train station?",
        breakdown: "Entschuldigung = Excuse me | wie = how | komme = come | ich = I | zum Bahnhof = to the train station ('zu' + 'dem' combined to 'zum') → Standard phrase to ask for directions."
      },
      {
        de: "Gehen Sie geradeaus bis zur Ampel.",
        en: "Go straight ahead up to the traffic light.",
        breakdown: "Gehen Sie = Go (formal command) | geradeaus = straight ahead | bis zur = up to (preposition for feminine destination) | Ampel = traffic light → 'bis zur' means 'until you reach' a feminine landmark."
      },
      {
        de: "Biegen Sie an der Kreuzung rechts ab.",
        en: "Turn right at the intersection.",
        breakdown: "Biegen Sie = Turn (formal command) | an der Kreuzung = at the intersection | rechts = right | ab = prefix at the end of the clause → 'abbiegen' is a separable verb — 'ab' goes to the end."
      },
      {
        de: "Der Supermarkt ist an der Ecke auf der linken Seite.",
        en: "The supermarket is on the corner on the left side.",
        breakdown: "Der Supermarkt = The supermarket | ist = is | an der Ecke = on the corner | auf der linken Seite = on the left side → Describing the location of the destination."
      }
    ],
    culturalNote: "Germans are very helpful when you ask for directions, but they will give you highly precise, literal instructions. They will not say 'it's just around the corner' if it is actually two blocks away. Expect to hear combinations like 'erste Straße links, dann zweite rechts' (first street left, then second right).",
    exercises: [
      {
        type: "translate",
        instruction: "Translate the formal directions.",
        items: [
          { prompt: "Go straight ahead.", answer: "Gehen Sie geradeaus." },
          { prompt: "Turn left here. (abbiegen)", answer: "Biegen Sie hier links ab." }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Complete the direction using the correct vocabulary word.",
        items: [
          { prompt: "Gehen Sie bis zur ___ (traffic light).", answer: "Ampel", hint: "Red, yellow, green lights" },
          { prompt: "Die Apotheke ist an der ___ (corner).", answer: "Ecke", hint: "Where two streets meet" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Biegen Sie links.",
        right: "Biegen Sie links ab.",
        explanation: "The verb is 'abbiegen', which is separable. If you just say 'biegen', it means 'bend' (e.g., bending a piece of metal). You MUST put the 'ab' at the end of the sentence to mean 'turn'."
      },
      {
        wrong: "Gehen rechts.",
        right: "Gehen Sie rechts. / Geh rechts.",
        explanation: "Failing to use the proper command structure. You must either include 'Sie' for formal, or drop the '-en' entirely for informal ('Geh')."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Create a simple text-based map, tell me where I am, and I will write directions to get to a specific building.",
      "Ask Sky: Give me a list of places (like pharmacy, post office) and practice asking 'Entschuldigung, wie komme ich zum/zur...?'",
      "Ask Sky: I will give you directions in German. Tell me if they make sense or if my grammar is confusing."
    ],
    examRelevance: "Hören Teil 2 & Sprechen Teil 3: You will hear people explaining where a building is, and you must select the correct map. You may also need to explain to your partner how to get to a meeting point.",
    lessonGoal: "Ask for and give clear, step-by-step directions using the formal command form, direction words (links/rechts/geradeaus), and the separable verb 'abbiegen'."
  }
];
