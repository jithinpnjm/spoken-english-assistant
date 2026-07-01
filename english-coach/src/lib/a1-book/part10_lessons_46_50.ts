import type { GermanA1BookLesson } from "../germanA1BookLessonTypes";

export const germanA1BookLessonsPart10: GermanA1BookLesson[] = [
  {
    lessonNo: 46,
    titleEn: "Past Perfect 3: Partizip II forms",
    titleDe: "Das Perfekt: Partizip II Formen",
    introduction: "You know how to build a past tense sentence with 'haben' or 'sein' in Position 2. But what goes at the end? The 'Partizip II' (the past participle). In English, we usually just add '-ed' (play -> played). In German, there is a clear system to build these end-words, depending on whether the base verb is regular, irregular, separable, or ends in '-ieren'.",
    theRule: [
      "Regular Verbs (Weak): Add 'ge-' to the front and '-t' to the end of the stem (machen -> ge-mach-t).",
      "Irregular Verbs (Strong): Add 'ge-' to the front and '-en' to the end. The middle vowel often changes! (trinken -> ge-trunk-en).",
      "Separable Verbs: The 'ge-' goes BETWEEN the prefix and the stem (einkaufen -> ein-ge-kauf-t).",
      "Verbs ending in '-ieren': NEVER take 'ge-'. Just add '-t' (studieren -> studier-t).",
      "Inseparable prefixes (be-, ver-, er-): NEVER take 'ge-' (besuchen -> besuch-t)."
    ],
    formula: [
      "Regular: ge + stem + t (gesagt, gemacht)",
      "Irregular: ge + stem + en (gesehen, gegessen)",
      "Separable: prefix + ge + stem + t/en (aufgestanden, eingekauft)",
      "-ieren Verbs: stem + t (telefoniert, studiert)"
    ],
    grammarTable: {
      headers: ["Verb Type", "Infinitive", "Partizip II Form", "Rule"],
      rows: [
        ["Regular", "kaufen", "gekauft", "ge + kauf + t"],
        ["Irregular", "finden", "gefunden", "ge + fund + en (vowel change!)"],
        ["Separable", "anrufen", "angerufen", "an + ge + ruf + en"],
        ["-ieren Verb", "telefonieren", "telefoniert", "telefonier + t (No ge-)"],
        ["Inseparable", "verstehen", "verstanden", "verstand + en (No ge-)"]
      ]
    },
    vocabulary: [
      { de: "gemacht", en: "done / made", example: "Ich habe Sport gemacht.", exampleEn: "I did sports." },
      { de: "gekauft", en: "bought", example: "Wir haben ein Auto gekauft.", exampleEn: "We bought a car." },
      { de: "gegessen", en: "eaten", example: "Hast du schon gegessen?", exampleEn: "Have you already eaten?" },
      { de: "getrunken", en: "drunk", example: "Er hat Wasser getrunken.", exampleEn: "He drank water." },
      { de: "gesehen", en: "seen", example: "Ich habe den Film gesehen.", exampleEn: "I saw the movie." },
      { de: "eingekauft", en: "shopped", example: "Sie hat im Supermarkt eingekauft.", exampleEn: "She shopped in the supermarket." },
      { de: "telefoniert", en: "telephoned / called", example: "Ich habe mit Anna telefoniert.", exampleEn: "I talked on the phone with Anna." },
      { de: "studiert", en: "studied (at university)", example: "Er hat in Berlin studiert.", exampleEn: "He studied in Berlin." },
      { de: "besucht", en: "visited", example: "Wir haben Oma besucht.", exampleEn: "We visited grandma." },
      { de: "verstanden", en: "understood", example: "Ich habe das nicht verstanden.", exampleEn: "I did not understand that." }
    ],
    modelSentences: [
      {
        de: "Ich habe gestern viel gearbeitet und danach eingekauft.",
        en: "I worked a lot yesterday and shopped afterwards.",
        breakdown: "Ich habe(helper) gestern viel gearbeitet(ge+arbeit+et / regular) und danach eingekauft(ein+ge+kauf+t / separable)."
      },
      {
        de: "Wir haben mit dem Chef telefoniert.",
        en: "We talked on the phone with the boss.",
        breakdown: "Wir haben(helper) mit dem Chef telefoniert(No 'ge' because it ends in -ieren)."
      },
      {
        de: "Hast du meine E-Mail bekommen?",
        en: "Did you receive my email?",
        breakdown: "Hast(helper) du meine E-Mail bekommen(Inseparable prefix 'be', so no 'ge' is added)."
      },
      {
        de: "Ich habe eine Pizza gegessen und Cola getrunken.",
        en: "I ate a pizza and drank cola.",
        breakdown: "Ich habe(helper) eine Pizza gegessen(irregular: ge+gess+en) und Cola getrunken(irregular: ge+trunk+en)."
      }
    ],
    culturalNote: "You might wonder why Germans use such a complicated past tense for speaking. It actually helps comprehension! Because the Partizip II is locked at the end of the sentence, listeners are forced to let the speaker finish before interrupting, making conversations surprisingly orderly.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correctly formed Partizip II.",
        items: [
          { prompt: "studieren -> ( gestudiert / studiert )", answer: "studiert" },
          { prompt: "sagen -> ( gesagen / gesagt )", answer: "gesagt" },
          { prompt: "aufstehen -> ( aufgestanden / geaufstanden )", answer: "aufgestanden" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Fill in the missing Partizip II based on the infinitive in brackets.",
        items: [
          { prompt: "Ich habe meine Oma ___ (besuchen).", answer: "besucht", hint: "Inseparable prefix 'be-' takes no 'ge-'." },
          { prompt: "Wir haben das Auto ___ (kaufen).", answer: "gekauft", hint: "Regular verb." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich habe das Auto be-ge-sucht.",
        right: "Ich habe das Auto besucht. (Wait, you visit a car? No. Ich habe die Oma besucht.)",
        explanation: "Never add 'ge-' to a verb that starts with an inseparable prefix like 'be-', 'ver-', or 'er-'."
      },
      {
        wrong: "Wir haben ge-telefoniert.",
        right: "Wir haben telefoniert.",
        explanation: "Verbs ending in '-ieren' (usually words imported from French or Latin, like reparieren, studieren) never take the 'ge-' prefix."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me a list of 10 infinitives. I will try to turn them into their correct Partizip II forms.",
      "Ask Sky: Which irregular verbs have the most surprising vowel changes in the Partizip II? (like trinken -> getrunken).",
      "Ask Sky: Give me a short story in the present tense, and I will rewrite it into the Perfekt tense."
    ],
    examRelevance: "Schreiben Teil 1 & 2: You cannot pass the writing section without demonstrating the ability to form the past tense correctly. Using 'gearbeitet' instead of 'gearbeiten' is a critical grammar checkpoint.",
    lessonGoal: "Construct the correct Partizip II form for regular, irregular, separable, and '-ieren' verbs, knowing when to use 'ge-' and when to drop it."
  },
  {
    lessonNo: 47,
    titleEn: "Talking About Your Vacation",
    titleDe: "Über den Urlaub sprechen",
    introduction: "Germans are the world champions of traveling! Asking 'Wie war der Urlaub?' (How was the vacation?) is the ultimate Monday morning office icebreaker. To join the conversation, you need to combine your new past tense skills ('war' and the Perfekt) with specific travel vocabulary, and know how to say exactly where you went.",
    theRule: [
      "To say you went TO a country or city, use the preposition 'nach' (Ich bin nach Spanien geflogen).",
      "EXCEPTION: A few countries have feminine or plural articles (die Schweiz, die Türkei, die USA). For these, you must use 'in' + Accusative (Ich bin in die Türkei geflogen).",
      "To describe how the vacation was, use the Simple Past of sein: 'Der Urlaub war toll' (The vacation was great).",
      "Use 'sein' as the helper verb for all travel motion (fliegen, fahren, reisen)."
    ],
    formula: [
      "Travel: Subject + bin/ist + nach + [City/Country without article] + geflogen/gefahren.",
      "State: Der Urlaub / Das Hotel / Das Wetter + war + [Adjective]."
    ],
    vocabulary: [
      { de: "der Urlaub", en: "vacation / holiday", example: "Mein Urlaub war super.", exampleEn: "My vacation was great." },
      { de: "das Meer", en: "sea / ocean", example: "Wir sind ans Meer gefahren.", exampleEn: "We drove to the sea." },
      { de: "der Strand", en: "beach", example: "Ich lag am Strand.", exampleEn: "I lay on the beach." },
      { de: "die Berge", en: "mountains", example: "Wir wandern in den Bergen.", exampleEn: "We are hiking in the mountains." },
      { de: "das Hotel", en: "hotel", example: "Das Hotel war sehr teuer.", exampleEn: "The hotel was very expensive." },
      { de: "die Fahrkarte", en: "ticket (train/bus)", example: "Ich habe die Fahrkarte gekauft.", exampleEn: "I bought the ticket." },
      { de: "das Flugzeug", en: "airplane", example: "Das Flugzeug ist groß.", exampleEn: "The airplane is big." },
      { de: "reisen", en: "to travel", example: "Ich reise gern.", exampleEn: "I like to travel." },
      { de: "buchen", en: "to book", example: "Hast du das Hotel gebucht?", exampleEn: "Did you book the hotel?" },
      { de: "das Wetter", en: "weather", example: "Das Wetter war fantastisch.", exampleEn: "The weather was fantastic." }
    ],
    modelSentences: [
      {
        de: "Wir sind im Sommer nach Italien gefahren.",
        en: "We drove to Italy in the summer.",
        breakdown: "Wir sind(helper for motion) im Sommer(time) nach Italien(to Italy) gefahren(driven)."
      },
      {
        de: "Ich bin in die USA geflogen.",
        en: "I flew to the USA.",
        breakdown: "Ich bin(helper) in die USA(into the USA / plural exception, no 'nach') geflogen(flown)."
      },
      {
        de: "Das Wetter war sehr schön und das Hotel war günstig.",
        en: "The weather was very nice and the hotel was cheap.",
        breakdown: "Das Wetter war(was) sehr schön(nice) und das Hotel war(was) günstig(cheap/favorable)."
      },
      {
        de: "Hast du die Tickets schon gebucht?",
        en: "Have you already booked the tickets?",
        breakdown: "Hast(helper 'haben' because booking is not motion) du die Tickets schon gebucht(booked)?"
      }
    ],
    culturalNote: "Germans legally receive a minimum of 20 to 24 days of paid vacation per year, though most full-time jobs offer 30 days. They take this time very seriously. Popular destinations include 'Mallorca' (often jokingly called the 17th German state), Italy, and the Alps. When returning, colleagues expect you to share stories over coffee.",
    exercises: [
      {
        type: "choose",
        instruction: "Choose the correct preposition (nach or in).",
        items: [
          { prompt: "Wir fliegen ___ Spanien. ( nach / in )", answer: "nach" },
          { prompt: "Er reist ___ die Schweiz. ( nach / in )", answer: "in" },
          { prompt: "Ich fahre ___ Berlin. ( nach / in )", answer: "nach" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Fill in the correct helper verb (haben or sein).",
        items: [
          { prompt: "Wir ___ das Hotel online gebucht.", answer: "haben", hint: "Booking is not motion." },
          { prompt: "Ich ___ nach Paris geflogen.", answer: "bin", hint: "Flying is motion A to B." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich fliege nach der Türkei.",
        right: "Ich fliege in die Türkei.",
        explanation: "Because Turkey has an article (die Türkei), you cannot use 'nach'. You must use 'in' + the Accusative article."
      },
      {
        wrong: "Der Urlaub hat sehr gut gewesen.",
        right: "Der Urlaub war sehr gut.",
        explanation: "Avoid trying to build the complex past tense of 'sein' (has been). Just use the simple past 'war'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Let's do a roleplay where we are colleagues on Monday morning and you ask me 'Wie war der Urlaub?'",
      "Ask Sky: Can you give me a list of all the countries that require 'in' instead of 'nach'?",
      "Ask Sky: Give me 5 questions about travel preferences, and I will answer them in German."
    ],
    examRelevance: "Sprechen Teil 2 & Schreiben: 'Urlaub' and 'Reisen' are among the top 3 most common themes in the Goethe A1 exam. You must be able to describe past trips and ask your partner about theirs.",
    lessonGoal: "Discuss a past vacation fluently by using 'nach' for countries without articles, 'in die' for exception countries, and applying the Perfekt tense correctly."
  },
  {
    lessonNo: 48,
    titleEn: "In the Supermarket",
    titleDe: "Im Supermarkt",
    introduction: "Buying groceries in Germany is a fast-paced experience. The cashiers are famously swift, and you need to know how to navigate weights, packaging, and quantities. A major grammatical quirk in German makes this easier than in English: when specifying weights or measures, the unit word itself does NOT become plural!",
    theRule: [
      "When asking for quantities, use 'Ich brauche...' (I need) or 'Ich möchte...' (I would like).",
      "Nouns expressing weight or measure (Kilo, Gramm, Liter, Flasche) stay SINGULAR after a number, unless they are feminine words like 'Flasche' or 'Packung' or 'Dose'.",
      "Rule of thumb: Neuter/Masculine units (das Kilo, das Gramm, der Liter) stay singular: 2 Kilo (NOT 2 Kilos).",
      "Feminine units (die Flasche, die Packung) become plural normally: 2 Flaschen, 2 Packungen.",
      "The food item that follows the weight takes NO connecting word. (e.g., 'ein Kilo Äpfel' — NOT 'ein Kilo von Äpfeln')."
    ],
    formula: [
      "Quantity (Number) + Neuter/Masc Measure (Singular) + Item -> zwei Kilo Tomaten.",
      "Quantity (Number) + Fem Measure (Plural) + Item -> zwei Flaschen Wasser."
    ],
    grammarTable: {
      headers: ["Quantity", "Measure Word", "Item", "Correct German Phrase"],
      rows: [
        ["1", "das Kilo", "Äpfel", "ein Kilo Äpfel"],
        ["2", "das Kilo (stays singular!)", "Äpfel", "zwei Kilo Äpfel"],
        ["500", "das Gramm", "Käse", "fünfhundert Gramm Käse"],
        ["2", "die Flasche (fem -> plural!)", "Milch", "zwei Flaschen Milch"]
      ]
    },
    vocabulary: [
      { de: "das Kilo (Kilogramm)", en: "kilo", example: "Ich möchte ein Kilo Tomaten.", exampleEn: "I would like a kilo of tomatoes." },
      { de: "das Gramm", en: "gram", example: "200 Gramm Käse, bitte.", exampleEn: "200 grams of cheese, please." },
      { de: "der Liter", en: "liter", example: "Ich brauche zwei Liter Milch.", exampleEn: "I need two liters of milk." },
      { de: "die Flasche", en: "bottle", example: "Wir kaufen drei Flaschen Wasser.", exampleEn: "We are buying three bottles of water." },
      { de: "die Packung", en: "package / packet", example: "Eine Packung Nudeln, bitte.", exampleEn: "A package of pasta, please." },
      { de: "das Brot", en: "bread", example: "Das Brot ist frisch.", exampleEn: "The bread is fresh." },
      { de: "das Obst", en: "fruit (collective)", example: "Essen Sie gern Obst?", exampleEn: "Do you like eating fruit?" },
      { de: "das Gemüse", en: "vegetables (collective)", example: "Gemüse ist gesund.", exampleEn: "Vegetables are healthy." },
      { de: "das Fleisch", en: "meat", example: "Ich esse kein Fleisch.", exampleEn: "I don't eat meat." },
      { de: "kosten", en: "to cost", example: "Was kostet das Kilo?", exampleEn: "How much is the kilo?" }
    ],
    modelSentences: [
      {
        de: "Ich brauche zwei Kilo Kartoffeln und drei Flaschen Saft.",
        en: "I need two kilos of potatoes and three bottles of juice.",
        breakdown: "Ich brauche zwei Kilo(no plural 's') Kartoffeln und drei Flaschen(feminine measure takes plural 'n') Saft."
      },
      {
        de: "Haben Sie frisches Brot?",
        en: "Do you have fresh bread?",
        breakdown: "Haben Sie(formal) frisches Brot?"
      },
      {
        de: "Ich möchte bitte 100 Gramm Käse.",
        en: "I would like 100 grams of cheese, please.",
        breakdown: "Ich möchte bitte hundert Gramm(no plural) Käse."
      },
      {
        de: "Was kosten zwei Packungen Eier?",
        en: "What do two packages of eggs cost?",
        breakdown: "Was kosten(plural verb) zwei Packungen(plural fem. measure) Eier(eggs)?"
      }
    ],
    culturalNote: "When you reach the checkout (die Kasse) in a German supermarket, be ready. You are expected to pack your own bags at lightning speed. Cashiers will often sit while scanning. You will also need to bring your own reusable bags, or buy them at the checkout, as plastic bags are heavily restricted or banned.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct way to express the weight/measure.",
        items: [
          { prompt: "3 kilos of apples -> ( drei Kilos Äpfel / drei Kilo Äpfel )", answer: "drei Kilo Äpfel" },
          { prompt: "2 bottles of water -> ( zwei Flasche Wasser / zwei Flaschen Wasser )", answer: "zwei Flaschen Wasser" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Translate the missing word.",
        items: [
          { prompt: "Ich brauche eine ___ (package) Reis.", answer: "Packung", hint: "feminine word for packet" },
          { prompt: "Was ___ (costs) das Fleisch?", answer: "kostet", hint: "singular verb for 'das Fleisch'" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Zwei Kilo von Tomaten.",
        right: "Zwei Kilo Tomaten.",
        explanation: "English uses 'of' (a kilo OF tomatoes). German completely omits this preposition. Just put the two nouns next to each other."
      },
      {
        wrong: "Ich brauche 3 Kilos Äpfel.",
        right: "Ich brauche 3 Kilo Äpfel.",
        explanation: "Neuter and masculine measurement words (Kilo, Gramm, Liter) NEVER take a plural ending when following a number."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can we practice a roleplay at the meat/cheese counter (die Fleischtheke) where I have to order specific weights?",
      "Ask Sky: Give me a grocery list in English with weights and quantities, and I will translate it into German.",
      "Ask Sky: What is 'Pfand' in Germany and how do I return my bottles?"
    ],
    examRelevance: "Hören Teil 1 & Sprechen Teil 2: Prices, weights, and grocery shopping are classic A1 themes. You must be able to understand 'Das macht drei Euro vierzig' and ask your partner questions about what they buy.",
    lessonGoal: "Accurately state quantities, weights, and measures when shopping for groceries, properly using the singular rule for masculine/neuter units."
  },
  {
    lessonNo: 49,
    titleEn: "How is the Weather?",
    titleDe: "Wie ist das Wetter?",
    introduction: "Talking about the weather is the ultimate small talk topic worldwide. In German, discussing the weather is very straightforward, but it relies heavily on the impersonal pronoun 'es' (it). While we say 'the sun is shining', Germans often build sentences around 'Es ist...' (It is...).",
    theRule: [
      "To ask about the weather, say: 'Wie ist das Wetter heute?' (How is the weather today?).",
      "For adjectives (warm, cold, nice, cloudy), use 'Es ist + [Adjective]'. (Es ist kalt).",
      "For specific weather actions (raining, snowing), 'Es' acts as the subject doing the verb. (Es regnet = It rains / It is raining).",
      "Unlike English, German does NOT have an 'is raining' or 'is snowing' form. You just use the present tense verb: 'Es regnet'."
    ],
    formula: [
      "Describing states: Es + ist + [Adjective: warm/kalt/schön].",
      "Describing actions: Es + [Verb: regnet/schneit]."
    ],
    grammarTable: {
      headers: ["English", "German Sentence", "Grammar Structure"],
      rows: [
        ["It is cold.", "Es ist kalt.", "Es + ist + Adjective"],
        ["It is sunny.", "Es ist sonnig. (or: Die Sonne scheint.)", "Es + ist + Adjective"],
        ["It is raining.", "Es regnet.", "Es + Verb (regnen)"],
        ["It is snowing.", "Es schneit.", "Es + Verb (schneien)"]
      ]
    },
    vocabulary: [
      { de: "das Wetter", en: "weather", example: "Das Wetter ist heute schön.", exampleEn: "The weather is nice today." },
      { de: "die Sonne", en: "sun", example: "Die Sonne scheint.", exampleEn: "The sun is shining." },
      { de: "regnen", en: "to rain", example: "Es regnet stark.", exampleEn: "It is raining heavily." },
      { de: "der Regen", en: "rain", example: "Wir brauchen keinen Regen.", exampleEn: "We don't need rain." },
      { de: "schneien", en: "to snow", example: "Im Winter schneit es oft.", exampleEn: "In winter it snows often." },
      { de: "warm", en: "warm", example: "Heute ist es sehr warm.", exampleEn: "Today it is very warm." },
      { de: "kalt", en: "cold", example: "Mir ist kalt.", exampleEn: "I am cold." },
      { de: "windig", en: "windy", example: "Es ist windig an der Küste.", exampleEn: "It is windy on the coast." },
      { de: "bewölkt", en: "cloudy", example: "Der Himmel ist bewölkt.", exampleEn: "The sky is cloudy." },
      { de: "heiß", en: "hot", example: "Im August ist es heiß.", exampleEn: "In August it is hot." },
      { de: "die Sonnencreme", en: "sun cream / sunscreen", example: "Bei Sonne brauche ich Sonnencreme.", exampleEn: "In the sun I need sunscreen." },
      { de: "der Sonnenschirm", en: "sun umbrella / sunshade", example: "Wir sitzen unter dem Sonnenschirm.", exampleEn: "We are sitting under the sunshade." }
    ],
    modelSentences: [
      {
        de: "Wie ist das Wetter heute in Berlin?",
        en: "How is the weather today in Berlin?",
        breakdown: "Wie(How) ist(is) das Wetter(the weather) heute(today) in Berlin?"
      },
      {
        de: "Es ist sehr kalt und es schneit.",
        en: "It is very cold and it is snowing.",
        breakdown: "Es ist sehr kalt(It is very cold) und es schneit(it snows/verb)."
      },
      {
        de: "Gestern war es schön, aber heute regnet es.",
        en: "Yesterday it was nice, but today it is raining.",
        breakdown: "Gestern = Yesterday | war = was | es schön = it nice | aber = but | heute = today | regnet es = it rains → Time word first, then the verb, then 'es' — same inversion rule."
      },
      {
        de: "Die Sonne scheint und es ist warm.",
        en: "The sun is shining and it is warm.",
        breakdown: "Die Sonne scheint(The sun shines) und es ist warm(it is warm)."
      }
    ],
    culturalNote: "Germans have a famous saying: 'Es gibt kein schlechtes Wetter, nur falsche Kleidung' (There is no bad weather, only the wrong clothing). Rain or snow rarely stops Germans from cycling to work or taking a walk on a Sunday afternoon, provided they have their 'Regenjacke' (rain jacket).",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Fill in the missing verb (ist, regnet, schneit).",
        items: [
          { prompt: "Nimm einen Regenschirm (umbrella) mit. Es ___.", answer: "regnet", hint: "Action of water falling from sky" },
          { prompt: "Es ___ heute sehr windig.", answer: "ist", hint: "State of being windy" },
          { prompt: "Im Dezember ___ es oft in Deutschland.", answer: "schneit", hint: "Action of snow falling" }
        ]
      },
      {
        type: "reorder",
        instruction: "Put the sentence in correct word order.",
        items: [
          { prompt: "kalt / sehr / ist / Es / heute", answer: "Heute ist es sehr kalt. / Es ist heute sehr kalt." },
          { prompt: "scheint / Die / Sonne", answer: "Die Sonne scheint." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Es ist regnen.",
        right: "Es regnet.",
        explanation: "English speakers constantly try to translate 'It is raining' literally. German has no continuous 'is ...ing' form. You just use the base verb 'regnen' conjugated for 'es'."
      },
      {
        wrong: "Ich bin kalt.",
        right: "Mir ist kalt.",
        explanation: "If you say 'Ich bin kalt', it literally means 'My personality is cold' or 'My corpse is cold'. To say you *feel* cold, you must use the Dative structure: 'Mir ist kalt' (To me it is cold)."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 different cities around the world with their current weather, and I will write a German sentence for each.",
      "Ask Sky: How do I talk about the weather in the past tense? (e.g., 'It rained yesterday').",
      "Ask Sky: Test me! Give me pictures or descriptions of weather in English, and I will translate them to German."
    ],
    examRelevance: "Sprechen Teil 1 & Hören: Weather reports are frequently played in the listening comprehension section. Understanding 'Es regnet' versus 'Es ist sonnig' helps you pick the right multiple-choice picture.",
    lessonGoal: "Ask about and describe the weather accurately using 'Es ist + [Adjective]' and the action verbs 'regnen' and 'schneien'."
  },
  {
    lessonNo: 50,
    titleEn: "Fixing Appointments (Termine vereinbaren)",
    titleDe: "Termine vereinbaren",
    introduction: "In Germany, spontaneity is rare in professional or even social settings; everything revolves around 'der Termin' (the appointment). To successfully navigate daily life, you need to be able to propose a time, accept a time, or politely decline and suggest an alternative. This requires mastering the days of the week and a few key verbs.",
    theRule: [
      "Days of the week are all masculine (der). When you say 'on Monday', you must use the preposition 'am' (am Montag).",
      "To ask if someone is free, use: 'Hast du / Haben Sie Zeit am [Tag] um [Uhrzeit]?'",
      "To accept, say: 'Ja, das passt mir' (Yes, that suits me) or 'Ja, da habe ich Zeit'.",
      "To decline, say: 'Nein, das geht leider nicht' (No, unfortunately that doesn't work) or 'Da habe ich leider keine Zeit'.",
      "To suggest an alternative: 'Können wir uns am [Tag] treffen?' (Can we meet on [Day]?)."
    ],
    formula: [
      "Proposing: Hast du am + [Tag] + um + [Uhrzeit] + Zeit?",
      "Accepting: Ja, das passt mir (gut).",
      "Declining: Tut mir leid, da habe ich keine Zeit."
    ],
    grammarTable: {
      headers: ["Day of the Week", "German", "On [Day] (am...)"],
      rows: [
        ["Monday", "der Montag", "am Montag"],
        ["Tuesday", "der Dienstag", "am Dienstag"],
        ["Wednesday", "der Mittwoch", "am Mittwoch"],
        ["Thursday", "der Donnerstag", "am Donnerstag"],
        ["Friday", "der Freitag", "am Freitag"],
        ["Saturday", "der Samstag", "am Samstag"],
        ["Sunday", "der Sonntag", "am Sonntag"]
      ]
    },
    vocabulary: [
      { de: "der Termin", en: "appointment", example: "Ich habe einen Termin beim Arzt.", exampleEn: "I have an appointment at the doctor." },
      { de: "passen", en: "to suit / fit", example: "Am Montag passt es mir gut.", exampleEn: "On Monday it suits me well." },
      { de: "vereinbaren", en: "to arrange / agree on", example: "Wir müssen einen Termin vereinbaren.", exampleEn: "We must arrange an appointment." },
      { de: "verschieben", en: "to postpone / move", example: "Können wir den Termin verschieben?", exampleEn: "Can we postpone the appointment?" },
      { de: "absagen", en: "to cancel", example: "Ich muss den Termin leider absagen.", exampleEn: "I unfortunately have to cancel the appointment." },
      { de: "leider", en: "unfortunately", example: "Leider habe ich keine Zeit.", exampleEn: "Unfortunately I have no time." },
      { de: "frei haben", en: "to have free time / time off", example: "Hast du morgen frei?", exampleEn: "Do you have time off tomorrow?" },
      { de: "das Wochenende", en: "weekend", example: "Was machst du am Wochenende?", exampleEn: "What are you doing on the weekend?" },
      { de: "sich treffen", en: "to meet (each other)", example: "Wir treffen uns um 8 Uhr.", exampleEn: "We meet at 8 o'clock." },
      { de: "gehen", en: "to work / be possible", example: "Geht es am Dienstag?", exampleEn: "Does Tuesday work?" }
    ],
    modelSentences: [
      {
        de: "Hast du am Freitag um 15 Uhr Zeit?",
        en: "Do you have time on Friday at 3 PM?",
        breakdown: "Hast du am(on) Freitag(Friday) um(at) 15 Uhr Zeit(time)?"
      },
      {
        de: "Tut mir leid, am Freitag geht es leider nicht. Da muss ich arbeiten.",
        en: "I'm sorry, Friday unfortunately doesn't work. I have to work then.",
        breakdown: "Tut mir leid(I'm sorry), am Freitag geht(works/functions) es leider(unfortunately) nicht. Da(Then/There) muss(must) ich arbeiten."
      },
      {
        de: "Passt es Ihnen am Mittwochmorgen?",
        en: "Does Wednesday morning suit you? (Formal)",
        breakdown: "Passt = Suits | es = it | Ihnen = you (formal) | am Mittwochmorgen = on Wednesday morning → Polite way to suggest a time to someone you address formally."
      },
      {
        de: "Ja, das passt mir sehr gut. Wir treffen uns am Mittwoch.",
        en: "Yes, that suits me very well. We will meet on Wednesday.",
        breakdown: "Ja = Yes | das passt = that suits | mir = me | sehr gut = very well | Wir treffen uns = We meet each other | am Mittwoch = on Wednesday → Confirming the appointment."
      }
    ],
    culturalNote: "Punctuality is not a stereotype; it is a rigid social expectation in Germany. If you agree to a 'Termin' at 14:00, arriving at 14:05 requires an apology. If you need to cancel (absagen) or postpone (verschieben), you must do so as early as possible. Ghosting an appointment is considered extremely disrespectful.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct preposition for days and times.",
        items: [
          { prompt: "Wir treffen uns ___ Montag. ( um / am / im )", answer: "am" },
          { prompt: "Der Termin ist ___ 14 Uhr. ( um / am / im )", answer: "um" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the phrases for fixing an appointment.",
        items: [
          { prompt: "Does Friday work? (gehen)", answer: "Geht es am Freitag?" },
          { prompt: "Yes, that suits me. (passen)", answer: "Ja, das passt mir." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Wir treffen uns in Montag.",
        right: "Wir treffen uns am Montag.",
        explanation: "In English, we say 'on Monday'. In German, you must combine 'an' + 'dem' to create the fixed preposition 'am' for all days of the week."
      },
      {
        wrong: "Das passt mich.",
        right: "Das passt mir.",
        explanation: "The verb 'passen' (to suit) requires the Dative case because the time 'is suitable TO you'. You must use 'mir', not the accusative 'mich'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Let's do a roleplay where we try to find a time to meet for coffee, but we are both very busy and keep rejecting each other's times.",
      "Ask Sky: How do I formally cancel a doctor's appointment in German?",
      "Ask Sky: Give me a schedule, and then ask me 'Hast du am [Tag] Zeit?' I will look at the schedule and answer."
    ],
    examRelevance: "Sprechen Teil 3: This is exactly what the final speaking task tests. You and your partner will each have a calendar with different free slots. You must negotiate back and forth using 'passen', 'Zeit haben', and 'geht nicht' until you find a common time.",
    lessonGoal: "Propose, accept, and decline appointments politely using days of the week (am...), times (um...), and the Dative verb 'passen'."
  }
];
