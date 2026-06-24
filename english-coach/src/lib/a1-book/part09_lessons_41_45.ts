import type { GermanA1BookLesson } from "../germanA1BookLessonTypes";

export const germanA1BookLessonsPart09: GermanA1BookLesson[] = [
  {
    lessonNo: 41,
    titleEn: "war / hatte — Simple Past of sein/haben",
    titleDe: "war / hatte — Präteritum von sein und haben",
    introduction: "To talk about the past in spoken German, we almost always use a complex two-verb structure (the Present Perfect). However, there are two massive exceptions: 'sein' (to be) and 'haben' (to have). For these two verbs, Germans use the Simple Past (Präteritum) even in casual conversation. Saying 'I was sick' or 'I had time' requires memorizing 'war' and 'hatte'.",
    theRule: [
      "'war' is the past tense of 'sein' (I was). 'hatte' is the past tense of 'haben' (I had).",
      "Just like with modal verbs, the 'ich' form and the 'er/sie/es' form are completely identical (ich war / er war).",
      "Do NOT add a '-t' to the 'er/sie/es' form. It remains exactly the same as 'ich'.",
      "Use 'war' to describe past states or locations (I was tired, I was in Berlin).",
      "Use 'hatte' to describe past possessions or physical feelings (I had a car, I had a headache)."
    ],
    formula: [
      "Past State: Subject + war(en) + Adjective/Place. (Ich war müde.)",
      "Past Possession: Subject + hatte(n) + Noun. (Ich hatte Zeit.)"
    ],
    grammarTable: {
      headers: ["Pronoun", "war (was)", "hatte (had)"],
      rows: [
        ["ich", "war", "hatte"],
        ["du", "warst", "hattest"],
        ["er/sie/es", "war (identical to ich!)", "hatte (identical to ich!)"],
        ["wir", "waren", "hatten"],
        ["ihr", "wart", "hattet"],
        ["sie/Sie", "waren", "hatten"]
      ]
    },
    vocabulary: [
      { de: "war", en: "was", example: "Ich war gestern zu Hause.", exampleEn: "I was at home yesterday." },
      { de: "hatte", en: "had", example: "Er hatte einen Hund.", exampleEn: "He had a dog." },
      { de: "gestern", en: "yesterday", example: "Gestern war Montag.", exampleEn: "Yesterday was Monday." },
      { de: "früher", en: "in the past / earlier", example: "Früher hatte ich kein Auto.", exampleEn: "In the past I had no car." },
      { de: "letztes Jahr", en: "last year", example: "Letztes Jahr war ich in Berlin.", exampleEn: "Last year I was in Berlin." },
      { de: "letzte Woche", en: "last week", example: "Letzte Woche hatte ich Urlaub.", exampleEn: "Last week I had vacation." },
      { de: "der Urlaub", en: "vacation / holiday", example: "Mein Urlaub war schön.", exampleEn: "My vacation was nice." },
      { de: "das Glück", en: "luck", example: "Wir hatten viel Glück.", exampleEn: "We had a lot of luck." },
      { de: "der Stress", en: "stress", example: "Hattest du Stress auf der Arbeit?", exampleEn: "Did you have stress at work?" },
      { de: "das Wochenende", en: "weekend", example: "Das Wochenende war super.", exampleEn: "The weekend was great." }
    ],
    modelSentences: [
      {
        de: "Gestern war ich krank.",
        en: "Yesterday I was sick.",
        breakdown: "Gestern(Time/pos 1) war(was/verb pos 2) ich(subject pos 3) krank(sick)."
      },
      {
        de: "Letzte Woche hatte ich viel Stress.",
        en: "Last week I had a lot of stress.",
        breakdown: "Letzte Woche(Time block/pos 1) hatte(had/pos 2) ich(subject) viel Stress(a lot of stress)."
      },
      {
        de: "Wo warst du am Wochenende?",
        en: "Where were you on the weekend?",
        breakdown: "Wo(Where) warst(were/du form) du(subject) am Wochenende(on the weekend)?"
      },
      {
        de: "Früher hatten wir kein Geld, aber wir waren glücklich.",
        en: "In the past we had no money, but we were happy.",
        breakdown: "Früher(In the past) hatten(had/wir form) wir(we) kein Geld(no money), aber(but) wir(we) waren(were/wir form) glücklich(happy)."
      },
      {
        de: "Mein Vater hatte ein altes Auto. Es war sehr laut.",
        en: "My father had an old car. It was very loud.",
        breakdown: "Mein Vater(Subject) hatte(had/er form identical to ich) ein altes Auto. Es(It) war(was) sehr laut(loud)."
      },
      {
        de: "Hattet ihr einen guten Flug?",
        en: "Did you all have a good flight?",
        breakdown: "Hattet(Had/ihr form for yes/no question pos 1) ihr(you all) einen guten Flug(a good flight/accusative)?"
      }
    ],
    culturalNote: "While you *can* technically form the complex past tense for these verbs ('Ich bin gewesen' for 'I have been', or 'Ich habe gehabt' for 'I have had'), Germans almost never use them in spoken language. They sound clumsy and overly formal. Relying exclusively on 'war' and 'hatte' will make you sound much more natural.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Choose between the correct form of 'war' (was) and 'hatte' (had).",
        items: [
          { prompt: "Gestern ___ ich keine Zeit. (had)", answer: "hatte", hint: "Past of haben" },
          { prompt: "Die Pizza ___ sehr lecker! (was)", answer: "war", hint: "Past of sein (es)" },
          { prompt: "Wo ___ ihr gestern Abend? (were)", answer: "wart", hint: "Past of sein (ihr form)" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the past tense statement.",
        items: [
          { prompt: "Last week I was sick.", answer: "Letzte Woche war ich krank." },
          { prompt: "Did you (informal) have time?", answer: "Hattest du Zeit?" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Letztes Jahr ich war in München.",
        right: "Letztes Jahr war ich in München.",
        explanation: "Inversion rule still applies! 'Letztes Jahr' takes Position 1, so the verb 'war' MUST stay in Position 2, pushing 'ich' to Position 3."
      },
      {
        wrong: "Mein Bruder wart hier.",
        right: "Mein Bruder war hier.",
        explanation: "Adding a '-t' to the 3rd person singular. Modal verbs and 'war/hatte' do NOT take a '-t' for 'er/sie/es'. The 'er' form of 'war' is just 'war'."
      },
      {
        wrong: "Ich war Hunger.",
        right: "Ich hatte Hunger.",
        explanation: "Translating 'I was hungry' literally. In German, you 'have' hunger. Therefore, in the past tense, you 'had' hunger (Ich hatte Hunger)."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Ask me 5 questions about what I was doing or how I felt yesterday, and I will reply using 'war' and 'hatte'.",
      "Ask Sky: Can you give me a fill-in-the-blank story in the past tense using only 'war' and 'hatte'?",
      "Ask Sky: How do I say 'I was at the doctor's' using 'war' and the correct preposition?"
    ],
    examRelevance: "Sprechen Teil 2 & Schreiben Teil 1: When recounting an experience (e.g., 'Wie war der Urlaub?'), you must be able to use 'war' and 'hatte' fluently. Writing an excuse email (e.g., 'Gestern war ich krank') is a standard A1 task.",
    lessonGoal: "Describe past states and possessions using 'war' and 'hatte' while maintaining correct Verb-Second word order and avoiding the '-t' ending mistake for the 3rd person."
  },
  {
    lessonNo: 42,
    titleEn: "Non-Separable Verbs (Untrennbare Verben)",
    titleDe: "Untrennbare Verben",
    introduction: "In Lesson 37, you learned about verbs that split apart (like 'aufstehen'). However, there is a distinct family of prefixes in German that are permanently glued to their base verbs. They never separate, no matter what. Memorizing these specific 'superglue' prefixes will save you from breaking words that are meant to stay whole.",
    theRule: [
      "There are 8 prefixes that NEVER separate from the verb: be-, emp-, ent-, er-, ge-, miss-, ver-, zer-.",
      "A common mnemonic to remember them is: 'Be-emp-ent-er-ge-miss-ver-zer'.",
      "Because they do not separate, you treat them exactly like completely normal verbs. The whole word takes Position 2.",
      "Example: 'verstehen' (to understand). You say 'Ich verstehe das' (I understand that). You NEVER say 'Ich stehe das ver'."
    ],
    formula: [
      "Subject (1) + Non-Separable Verb (2) + Object/Rest.",
      "Ich (1) + besuche (2) + meinen Vater (3)."
    ],
    vocabulary: [
      { de: "verstehen", en: "to understand", example: "Ich verstehe die Frage.", exampleEn: "I understand the question." },
      { de: "besuchen", en: "to visit", example: "Wir besuchen unsere Oma.", exampleEn: "We are visiting our grandma." },
      { de: "bezahlen", en: "to pay", example: "Er bezahlt die Rechnung.", exampleEn: "He pays the bill." },
      { de: "bekommen", en: "to get / receive", example: "Ich bekomme ein Paket.", exampleEn: "I am receiving a package." },
      { de: "erzählen", en: "to tell / narrate", example: "Die Mutter erzählt eine Geschichte.", exampleEn: "The mother tells a story." },
      { de: "vergessen", en: "to forget", example: "Vergiss das nicht!", exampleEn: "Don't forget that!" },
      { de: "verkaufen", en: "to sell", example: "Sie verkauft ihr Auto.", exampleEn: "She is selling her car." },
      { de: "gefallen", en: "to be pleasing / to like", example: "Das Bild gefällt mir.", exampleEn: "I like the picture (It pleases me)." },
      { de: "erwarten", en: "to expect", example: "Ich erwarte eine E-Mail.", exampleEn: "I am expecting an email." },
      { de: "der Fehler", en: "mistake", example: "Er versteht den Fehler.", exampleEn: "He understands the mistake." }
    ],
    modelSentences: [
      {
        de: "Ich verstehe dieses Wort nicht.",
        en: "I do not understand this word.",
        breakdown: "Ich(subject) verstehe(understand/glued prefix 'ver') dieses Wort(this word) nicht."
      },
      {
        de: "Besuchst du am Wochenende deine Eltern?",
        en: "Are you visiting your parents on the weekend?",
        breakdown: "Besuchst(Visit/glued prefix 'be') du am Wochenende deine Eltern?"
      },
      {
        de: "Wir bekommen heute Besuch.",
        en: "We are getting visitors today.",
        breakdown: "Wir bekommen(get/receive) heute Besuch(visit/noun)."
      },
      {
        de: "Der Mann verkauft sein altes Fahrrad.",
        en: "The man is selling his old bicycle.",
        breakdown: "Der Mann verkauft(sells) sein altes Fahrrad."
      },
      {
        de: "Erzählen Sie mir von Ihrem Beruf.",
        en: "Tell me about your profession. (Formal imperative)",
        breakdown: "Erzählen(Tell) Sie mir(to me/dative) von Ihrem(about your) Beruf."
      },
      {
        de: "Ich vergesse immer meinen Schlüssel.",
        en: "I always forget my key.",
        breakdown: "Ich vergesse(forget/glued prefix 'ver') immer(always) meinen Schlüssel(my key/accusative)."
      }
    ],
    culturalNote: "The prefix changes the entire meaning of the base word. 'Kaufen' means to buy, but 'verkaufen' means to sell! 'Kommen' means to come, but 'bekommen' means to receive! Do not assume you know what a word means just because you recognize the root verb.",
    exercises: [
      {
        type: "choose",
        instruction: "Determine if the verb splits or stays whole.",
        items: [
          { prompt: "besuchen: ( Ich besuche ihn / Ich suche ihn be )", answer: "Ich besuche ihn" },
          { prompt: "anrufen (separable): ( Ich anrufe ihn / Ich rufe ihn an )", answer: "Ich rufe ihn an" },
          { prompt: "verstehen: ( Ich verstehe das / Ich stehe das ver )", answer: "Ich verstehe das" }
        ]
      },
      {
        type: "reorder",
        instruction: "Put the words in the correct order.",
        items: [
          { prompt: "die Rechnung / bezahlt / Der Gast", answer: "Der Gast bezahlt die Rechnung." },
          { prompt: "Auto / Er / sein / verkauft", answer: "Er verkauft sein Auto." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich suche meine Oma be.",
        right: "Ich besuche meine Oma.",
        explanation: "Treating a 'be-' verb as separable. The prefix 'be-' is on the permanent superglue list. It never goes to the end of the sentence."
      },
      {
        wrong: "Ich bekomme nach Berlin.",
        right: "Ich komme nach Berlin.",
        explanation: "False friend! 'Bekommen' sounds like 'become' in English, but it actually means 'to receive/get'. If you want to say you are coming to Berlin, just use 'kommen'."
      },
      {
        wrong: "Wir zahlen die Rechnung be.",
        right: "Wir bezahlen die Rechnung.",
        explanation: "Again, splitting an inseparable verb. 'Bezahlen' (to pay) stays whole in Position 2."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can you test me with 10 verbs and I have to guess if they are separable (like aufstehen) or non-separable (like besuchen)?",
      "Ask Sky: What is the mnemonic 'be-emp-ent-er-ge-miss-ver-zer' and can you give me one common A1 verb for each prefix?",
      "Ask Sky: Give me English sentences using 'sell', 'forget', 'visit', and 'understand', and I will translate them using non-separable verbs."
    ],
    examRelevance: "Lesen & Schreiben: Using 'bekommen' correctly in an email (e.g., 'Ich habe deine E-Mail bekommen') is a staple of A1 correspondence. Incorrectly separating these verbs causes massive confusion.",
    lessonGoal: "Identify non-separable prefixes and use their verbs properly in Position 2 without breaking them apart."
  },
  {
    lessonNo: 43,
    titleEn: "Talking About Your Health",
    titleDe: "Über Gesundheit sprechen",
    introduction: "If you need to call in sick to work or visit a doctor in Germany, you must know how to describe where you hurt. Germans use two very specific structures to express pain: the noun-based 'I have...-pain' (Ich habe Kopfschmerzen) and the verb-based 'My... hurts me' (Mir tut der Kopf weh). Mastering these ensures you get the right help quickly.",
    theRule: [
      "Structure 1: Noun + Schmerzen. Use the verb 'haben'. (Ich habe Kopfschmerzen = I have head-pains).",
      "Structure 2: The separable verb 'wehtun' (to hurt).",
      "In Structure 2, the body part is the subject (doing the hurting), and you are the victim (in the Dative case -> 'mir').",
      "Therefore: [Body part] + tut + mir + weh. (Der Kopf tut mir weh).",
      "If plural body parts hurt (like teeth or eyes), use the plural verb 'tun': [Plural body parts] + tun + mir + weh."
    ],
    formula: [
      "Structure 1: Ich habe + [Body Part]schmerzen.",
      "Structure 2 (Singular): Mein [Body Part] + tut + mir + weh.",
      "Structure 2 (Plural): Meine [Plural Body Parts] + tun + mir + weh."
    ],
    grammarTable: {
      headers: ["Body Part", "Structure 1 (haben)", "Structure 2 (wehtun)"],
      rows: [
        ["der Kopf (head)", "Ich habe Kopfschmerzen.", "Der Kopf tut mir weh."],
        ["der Bauch (stomach)", "Ich habe Bauchschmerzen.", "Mein Bauch tut mir weh."],
        ["der Zahn (tooth)", "Ich habe Zahnschmerzen.", "Mein Zahn tut mir weh."],
        ["die Augen (eyes - plural)", "Ich habe Augenschmerzen.", "Meine Augen tun mir weh."]
      ]
    },
    vocabulary: [
      { de: "der Kopf", en: "head", example: "Mein Kopf ist heiß.", exampleEn: "My head is hot." },
      { de: "der Bauch", en: "stomach / belly", example: "Der Bauch tut mir weh.", exampleEn: "My stomach hurts." },
      { de: "der Hals", en: "throat / neck", example: "Ich habe Halsschmerzen.", exampleEn: "I have a sore throat." },
      { de: "der Rücken", en: "back", example: "Mein Rücken tut weh.", exampleEn: "My back hurts." },
      { de: "der Zahn", en: "tooth", example: "Der Zahnarzt ist hier.", exampleEn: "The dentist is here." },
      { de: "die Schmerzen", en: "pain(s) / ache", example: "Haben Sie Schmerzen?", exampleEn: "Do you have pain?" },
      { de: "wehtun", en: "to hurt (separable)", example: "Wo tut es weh?", exampleEn: "Where does it hurt?" },
      { de: "der Arzt", en: "doctor", example: "Ich muss zum Arzt gehen.", exampleEn: "I must go to the doctor." },
      { de: "die Apotheke", en: "pharmacy", example: "Wo ist die Apotheke?", exampleEn: "Where is the pharmacy?" },
      { de: "das Medikament", en: "medicine / drug", example: "Ich brauche ein Medikament.", exampleEn: "I need medicine." }
    ],
    modelSentences: [
      {
        de: "Ich bin krank. Ich habe Kopfschmerzen und Fieber.",
        en: "I am sick. I have a headache and a fever.",
        breakdown: "Ich bin krank. Ich habe Kopfschmerzen(headaches/compound noun) und Fieber(fever)."
      },
      {
        de: "Mein Rücken tut mir sehr weh.",
        en: "My back hurts me a lot.",
        breakdown: "Mein Rücken(My back/subject pos 1) tut(does/verb pos 2) mir(to me/dative) sehr(very) weh(hurt/prefix at end)."
      },
      {
        de: "Meine Augen tun mir weh. Ich brauche eine Brille.",
        en: "My eyes hurt. I need glasses.",
        breakdown: "Meine Augen(My eyes/plural subject) tun(do/plural verb) mir(to me) weh(hurt/prefix). Ich brauche eine Brille."
      },
      {
        de: "Wo tut es Ihnen weh, Herr Müller?",
        en: "Where does it hurt you, Mr. Müller? (Formal)",
        breakdown: "Wo(Where) tut(does) es(it/subject) Ihnen(to you/formal dative) weh(hurt prefix)?"
      },
      {
        de: "Gehen Sie in die Apotheke und kaufen Sie Medikamente.",
        en: "Go to the pharmacy and buy medicine.",
        breakdown: "Gehen Sie(Imperative formal) in die Apotheke(into the pharmacy) und kaufen Sie(buy) Medikamente."
      },
      {
        de: "Gute Besserung!",
        en: "Get well soon!",
        breakdown: "Gute(Good) Besserung(bettering/recovery) - Fixed expression."
      }
    ],
    culturalNote: "When someone is sick, the standard German response is 'Gute Besserung!' (literally: Good bettering!). If you need over-the-counter medicine like aspirin or cough syrup, you cannot buy it in a normal supermarket or drugstore (Drogerie). You MUST go to a specialized pharmacy ('die Apotheke'), which is indicated by a large red 'A' sign.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Choose between 'tut' (singular) and 'tun' (plural).",
        items: [
          { prompt: "Mein Zahn ___ mir weh.", answer: "tut", hint: "One tooth" },
          { prompt: "Meine Ohren (ears) ___ mir weh.", answer: "tun", hint: "Multiple ears" },
          { prompt: "Der Bauch ___ sehr weh.", answer: "tut", hint: "One stomach" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate using the 'haben' + Schmerzen structure.",
        items: [
          { prompt: "I have a sore throat. (der Hals)", answer: "Ich habe Halsschmerzen." },
          { prompt: "Do you have a headache? (der Kopf)", answer: "Hast du Kopfschmerzen?" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich bin Kopfschmerzen.",
        right: "Ich habe Kopfschmerzen.",
        explanation: "You cannot BE a headache. In German, pain is something you possess (haben). Always use 'Ich habe'."
      },
      {
        wrong: "Mein Kopf wehtut.",
        right: "Mein Kopf tut weh.",
        explanation: "Forgetting that 'wehtun' is a separable verb. 'tut' is the conjugated part that must sit in Position 2. 'weh' is the prefix that flies to the end."
      },
      {
        wrong: "Mein Bein tut mich weh.",
        right: "Mein Bein tut mir weh.",
        explanation: "Using the Accusative 'mich' instead of the Dative 'mir'. The pain is happening TO you, so it requires the Dative."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can we do a doctor's office roleplay? I will come in with different symptoms and you advise me on what to do.",
      "Ask Sky: Give me 5 body parts, and I will write both the 'schmerzen' version and the 'wehtun' version for each.",
      "Ask Sky: How do I say 'I need to make an appointment with the doctor' in German?"
    ],
    examRelevance: "Sprechen Teil 3 & Hören Teil 2: Picture cards frequently show body parts or a doctor's office. You must be able to formulate a request like 'Haben Sie etwas gegen Halsschmerzen?' (Do you have something for a sore throat?).",
    lessonGoal: "Describe illness and pain fluently using both compound nouns (Kopfschmerzen) and the separable dative verb 'wehtun'."
  },
  {
    lessonNo: 44,
    titleEn: "Past Perfect 1: Sentence Structure (Perfekt)",
    titleDe: "Das Perfekt: Satzbau",
    introduction: "In English, we have the Simple Past ('I played') and the Present Perfect ('I have played'). In spoken German, the Simple Past is almost entirely dead (except for 'war/hatte'). For 90% of daily conversations about the past, Germans use the 'Perfekt'. It requires a helper verb in Position 2 and a special past-tense word (Partizip II) at the absolute end of the sentence.",
    theRule: [
      "The Perfekt consists of two parts: a helper verb (haben or sein) AND the Partizip II (the past participle, e.g., 'gemacht').",
      "The helper verb goes in Position 2 and is conjugated normally to match the subject (ich habe, du hast).",
      "The Partizip II NEVER changes its spelling. It flies to the VERY END of the sentence.",
      "This creates the famous 'Sentence Bracket'. Everything else (time, object, place) gets squeezed between the helper verb and the Partizip II."
    ],
    formula: [
      "Subject (1) + helper verb [haben/sein] (2) + [Time/Object/Rest] + Partizip II (End).",
      "Example: Ich (1) + habe (2) + gestern Pizza + gegessen (End)."
    ],
    vocabulary: [
      { de: "gemacht", en: "done / made (from machen)", example: "Ich habe meine Hausaufgaben gemacht.", exampleEn: "I have done my homework." },
      { de: "gekauft", en: "bought (from kaufen)", example: "Er hat ein Auto gekauft.", exampleEn: "He has bought a car." },
      { de: "gelernt", en: "learned (from lernen)", example: "Wir haben viel gelernt.", exampleEn: "We have learned a lot." },
      { de: "gespielt", en: "played (from spielen)", example: "Hast du Fußball gespielt?", exampleEn: "Did you play soccer?" },
      { de: "gekocht", en: "cooked (from kochen)", example: "Sie hat Suppe gekocht.", exampleEn: "She cooked soup." },
      { de: "gesagt", en: "said (from sagen)", example: "Was hast du gesagt?", exampleEn: "What did you say?" },
      { de: "gehört", en: "heard (from hören)", example: "Ich habe das Lied gehört.", exampleEn: "I heard the song." },
      { de: "gestern", en: "yesterday", example: "Gestern habe ich gearbeitet.", exampleEn: "Yesterday I worked." },
      { de: "heute Morgen", en: "this morning", example: "Heute Morgen habe ich Tee getrunken.", exampleEn: "This morning I drank tea." },
      { de: "schon", en: "already", example: "Ich habe schon gegessen.", exampleEn: "I have already eaten." }
    ],
    modelSentences: [
      {
        de: "Ich habe gestern ein Buch gekauft.",
        en: "I bought a book yesterday.",
        breakdown: "Ich habe(helper verb pos 2) gestern ein Buch(middle stuff) gekauft(Partizip II at end)."
      },
      {
        de: "Was hast du am Wochenende gemacht?",
        en: "What did you do on the weekend?",
        breakdown: "Was(W-Word) hast(helper verb pos 2) du am Wochenende(middle stuff) gemacht(Partizip II at end)?"
      },
      {
        de: "Wir haben schon Pizza bestellt.",
        en: "We have already ordered pizza.",
        breakdown: "Wir haben(helper verb) schon(already) Pizza bestellt(ordered/Partizip II)."
      },
      {
        de: "Er hat mir eine Geschichte erzählt.",
        en: "He told me a story.",
        breakdown: "Er hat(helper verb) mir eine Geschichte(middle stuff) erzählt(told/Partizip II without 'ge' because 'er-' is inseparable)."
      },
      {
        de: "Haben Sie das Wort gehört?",
        en: "Did you hear the word? (Formal)",
        breakdown: "Haben(Helper verb pos 1 for yes/no question) Sie das Wort gehört(Partizip II at end)?"
      },
      {
        de: "Heute Morgen habe ich Deutsch gelernt.",
        en: "This morning I studied German.",
        breakdown: "Heute Morgen(Time pos 1) habe(helper verb pos 2) ich Deutsch gelernt(Partizip II at end)."
      }
    ],
    culturalNote: "When Germans tell a story, you won't know exactly what happened until they say the final word of the sentence. They might say, 'Ich habe gestern im Supermarkt einen großen Kuchen...' (I have yesterday in the supermarket a big cake...) and you have to wait to find out if they 'gekauft' (bought it), 'gegessen' (ate it), or 'gemacht' (made it).",
    exercises: [
      {
        type: "reorder",
        instruction: "Build the Perfekt sentence, placing the Partizip II at the very end.",
        items: [
          { prompt: "gekocht / Suppe / Ich / habe", answer: "Ich habe Suppe gekocht." },
          { prompt: "hast / gestern / Was / gemacht / du / ?", answer: "Was hast du gestern gemacht?" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Conjugate the helper verb 'haben' to complete the bracket.",
        items: [
          { prompt: "Wir ___ heute viel gearbeitet.", answer: "haben", hint: "wir form of haben" },
          { prompt: "___ du schon das Auto gekauft?", answer: "Hast", hint: "du form of haben" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich habe gemacht meine Hausaufgaben.",
        right: "Ich habe meine Hausaufgaben gemacht.",
        explanation: "A classic English-speaker mistake. You cannot place the main action verb right after the helper verb. 'gemacht' MUST go to the end."
      },
      {
        wrong: "Wir haben gekauftet ein Brot.",
        right: "Wir haben ein Brot gekauft.",
        explanation: "Do not add present tense endings (-e, -st, -t, -en) to the Partizip II! 'gekauft' is the final, frozen form. It never changes."
      },
      {
        wrong: "Gestern ich habe gearbeitet.",
        right: "Gestern habe ich gearbeitet.",
        explanation: "Forgetting the Inversion rule. If 'gestern' is in Pos 1, the helper verb 'habe' stays in Pos 2, pushing 'ich' to Pos 3."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 sentences in the present tense (e.g., 'Ich kaufe ein Buch') and I will rewrite them into the Perfekt past tense.",
      "Ask Sky: Why do some Partizip II words like 'gekauft' end in '-t', but others like 'gegessen' end in '-en'?",
      "Ask Sky: Let's practice conversations about what we did last weekend using the Perfekt tense."
    ],
    examRelevance: "Sprechen Teil 2 & Schreiben Teil 1: When you are asked to write an email explaining why you couldn't come to a party, or talk about what you did on your holiday, you MUST use the Perfekt tense structure flawlessly.",
    lessonGoal: "Construct grammatically perfect past-tense sentences by placing the conjugated helper verb in Position 2 and the frozen Partizip II at the absolute end of the sentence."
  },
  {
    lessonNo: 45,
    titleEn: "Past Perfect 2: haben or sein as helper",
    titleDe: "Das Perfekt: haben oder sein als Hilfsverb",
    introduction: "In the last lesson, we used 'haben' as the helper verb for the past tense. But wait—some verbs refuse to use 'haben'! For a very specific group of verbs, you must use 'sein' (to be) as your helper verb. This sounds strange to English ears ('I am gone' instead of 'I have gone'), but the logic behind which verbs use 'sein' is actually very strict and easy to learn.",
    theRule: [
      "Use 'sein' (bin, bist, ist, sind, seid) as the helper verb for verbs that express MOTION from point A to point B (e.g., gehen, fahren, fliegen, kommen).",
      "Use 'sein' for verbs that express a CHANGE OF STATE (e.g., aufwachen - to wake up, sterben - to die).",
      "Use 'sein' for two major exceptions: 'bleiben' (to stay - geblieben) and 'passieren' (to happen - passiert).",
      "For ALL OTHER VERBS (90% of verbs, including transitive verbs that take a direct object), use 'haben'."
    ],
    formula: [
      "Motion/Change of state: Subject + sein (conjugated) + ... + Partizip II (End).",
      "Example: Ich (1) + bin (2) + nach Berlin + gefahren (End)."
    ],
    grammarTable: {
      headers: ["Helper Verb", "When to use", "Examples (Partizip II)"],
      rows: [
        ["sein (bin/ist...)", "Motion from A to B", "gegangen (gone), gefahren (driven), geflogen (flown), gekommen (come)"],
        ["sein (bin/ist...)", "Change of state / Exceptions", "aufgewacht (woken up), geblieben (stayed), passiert (happened)"],
        ["haben (habe/hat...)", "No motion / Has a direct object", "gemacht (done), gekauft (bought), gelesen (read), geschlafen (slept)"]
      ]
    },
    vocabulary: [
      { de: "gegangen", en: "gone / walked (from gehen)", example: "Ich bin ins Kino gegangen.", exampleEn: "I went to the movies." },
      { de: "gefahren", en: "driven / traveled (from fahren)", example: "Er ist nach München gefahren.", exampleEn: "He drove to Munich." },
      { de: "gekommen", en: "come / arrived (from kommen)", example: "Wann bist du gekommen?", exampleEn: "When did you arrive?" },
      { de: "geflogen", en: "flown (from fliegen)", example: "Wir sind nach Spanien geflogen.", exampleEn: "We flew to Spain." },
      { de: "geblieben", en: "stayed (from bleiben - EXCEPTION)", example: "Ich bin zu Hause geblieben.", exampleEn: "I stayed at home." },
      { de: "passiert", en: "happened (from passieren - EXCEPTION)", example: "Was ist passiert?", exampleEn: "What happened?" },
      { de: "schnell", en: "fast / quickly", example: "Er ist schnell gefahren.", exampleEn: "He drove fast." },
      { de: "das Auto", en: "car", example: "Wir haben ein Auto gekauft.", exampleEn: "We bought a car." },
      { de: "nach", en: "to (for cities/countries)", example: "Ich bin nach Rom geflogen.", exampleEn: "I flew to Rome." },
      { de: "gestern Abend", en: "yesterday evening", example: "Gestern Abend bin ich ausgegangen.", exampleEn: "Yesterday evening I went out." }
    ],
    modelSentences: [
      {
        de: "Ich bin gestern nach Berlin gefahren.",
        en: "I drove to Berlin yesterday.",
        breakdown: "Ich bin(helper 'sein' for motion) gestern nach Berlin gefahren(driven/Partizip II at end)."
      },
      {
        de: "Wann bist du nach Hause gekommen?",
        en: "When did you come home?",
        breakdown: "Wann(When) bist(are/helper 'sein' for du) du nach Hause gekommen(come)?"
      },
      {
        de: "Wir sind am Wochenende zu Hause geblieben.",
        en: "We stayed at home on the weekend.",
        breakdown: "Wir sind(are/helper 'sein' exception) am Wochenende zu Hause geblieben(stayed)."
      },
      {
        de: "Was ist gestern im Büro passiert?",
        en: "What happened in the office yesterday?",
        breakdown: "Was ist(is/helper 'sein') gestern im Büro passiert(happened)?"
      },
      {
        de: "Er hat das Auto gefahren.",
        en: "He drove the car.",
        breakdown: "Er hat(helper 'haben' because there is a direct object 'das Auto') das Auto gefahren. (Note: When driving an object, use haben. When traveling yourself, use sein)."
      },
      {
        de: "Wir haben viel getanzt und dann sind wir gegangen.",
        en: "We danced a lot and then we went/left.",
        breakdown: "Wir haben(helper) viel getanzt(danced/no A-to-B motion) und dann sind(helper for motion) wir gegangen(gone)."
      }
    ],
    culturalNote: "Understanding this rule instantly levels up your German. If someone asks 'Was hast du gemacht?' (What did you do?), they use 'hast' because doing something isn't moving. If you answer 'Ich habe nach Berlin gefahren', it sounds like you literally picked up the city of Berlin and drove it somewhere like a steering wheel. You must say 'Ich bin nach Berlin gefahren'.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct helper verb (haben or sein).",
        items: [
          { prompt: "Ich ___ gestern Pizza gegessen. ( habe / bin )", answer: "habe", hint: "Eating is not motion A to B." },
          { prompt: "Wir ___ am Montag nach Hamburg geflogen. ( haben / sind )", answer: "sind", hint: "Flying is motion A to B." },
          { prompt: "Wo ___ ihr am Sonntag geblieben? ( habt / seid )", answer: "seid", hint: "bleiben (to stay) is an exception that takes sein." }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the sentence using the correct helper verb.",
        items: [
          { prompt: "I went to the supermarket. (gehen)", answer: "Ich bin in den Supermarkt gegangen." },
          { prompt: "What happened? (passieren)", answer: "Was ist passiert?" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich habe nach München gefahren.",
        right: "Ich bin nach München gefahren.",
        explanation: "Fahren is motion from A to B. It MUST use the 'sein' helper verb (bin)."
      },
      {
        wrong: "Wir sind geschlafen.",
        right: "Wir haben geschlafen.",
        explanation: "Overcorrecting! Sleeping is not a motion or a change of state. It uses the normal 'haben' helper verb."
      },
      {
        wrong: "Ich habe zu Hause geblieben.",
        right: "Ich bin zu Hause geblieben.",
        explanation: "'Bleiben' (to stay) means staying in ONE place, so logic suggests 'haben'. But German grammar dictates 'bleiben' is a strict exception that always takes 'sein'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me a list of 10 common verbs, and I will tell you if they take 'haben' or 'sein' in the Perfekt tense.",
      "Ask Sky: Can you explain the difference between 'Ich bin gefahren' and 'Ich habe das Auto gefahren'?",
      "Ask Sky: Write a short paragraph about a terrible vacation, leaving blanks for the helper verbs (habe/bin) so I can fill them in."
    ],
    examRelevance: "Sprechen & Schreiben: Examiners listen closely for the correct helper verb. Saying 'Ich bin ins Kino gegangen' instead of 'Ich habe ins Kino gegangen' immediately signals that you have mastered foundational A1 grammar.",
    lessonGoal: "Correctly choose between 'haben' and 'sein' as helper verbs in the Perfekt tense based on whether the action involves motion from A to B, a change of state, or is a specific exception."
  }
];