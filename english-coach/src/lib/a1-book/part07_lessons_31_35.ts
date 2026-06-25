import type { GermanA1BookLesson } from "../germanA1BookLessonTypes";

export const germanA1BookLessonsPart07: GermanA1BookLesson[] = [
  {
    lessonNo: 31,
    titleEn: "Personal Pronouns Accusative",
    titleDe: "Personalpronomen im Akkusativ",
    introduction: "In English, if you want to say 'I love he', it sounds completely wrong. You must change 'he' to the object pronoun 'him'. German does the exact same thing when a person receives an action. You must change the subject pronouns (ich, du, er) into object pronouns (mich, dich, ihn) to show who is being called, visited, or loved.",
    theRule: [
      "When a pronoun is the direct object of a sentence, it must change form.",
      "'ich' (I) becomes 'mich' (me).",
      "'du' (you) becomes 'dich' (you).",
      "'er' (he) becomes 'ihn' (him).",
      "Just like with articles, the feminine 'sie' (she/they) and neuter 'es' (it) DO NOT change.",
      "'wir' (we) becomes 'uns' (us), and 'ihr' (you all) becomes 'euch' (you all)."
    ],
    formula: [
      "Subject + Verb + Object Pronoun",
      "Example: Ich (Subject) + sehe (Verb) + dich (Object Pronoun)."
    ],
    grammarTable: {
      headers: ["Subject Pronoun", "Object Pronoun", "English Meaning"],
      rows: [
        ["ich", "mich", "me"],
        ["du", "dich", "you (informal)"],
        ["er", "ihn", "him"],
        ["sie", "sie", "her (no change)"],
        ["es", "es", "it (no change)"],
        ["wir", "uns", "us"],
        ["ihr", "euch", "you all (informal)"],
        ["sie / Sie", "sie / Sie", "them / you formal (no change)"]
      ]
    },
    vocabulary: [
      { de: "mich", en: "me", example: "Hörst du mich?", exampleEn: "Do you hear me?" },
      { de: "dich", en: "you (object)", example: "Ich liebe dich.", exampleEn: "I love you." },
      { de: "ihn", en: "him", example: "Kennst du ihn?", exampleEn: "Do you know him?" },
      { de: "uns", en: "us", example: "Er besucht uns.", exampleEn: "He is visiting us." },
      { de: "euch", en: "you all (object)", example: "Wir sehen euch.", exampleEn: "We see you all." },
      { de: "kennen", en: "to know (a person)", example: "Ich kenne sie.", exampleEn: "I know her." },
      { de: "lieben", en: "to love", example: "Sie liebt ihn.", exampleEn: "She loves him." },
      { de: "anrufen", en: "to call (phone)", example: "Ruf mich an!", exampleEn: "Call me!" },
      { de: "fragen", en: "to ask", example: "Der Lehrer fragt uns.", exampleEn: "The teacher asks us." },
      { de: "verstehen", en: "to understand", example: "Ich verstehe dich nicht.", exampleEn: "I don't understand you." }
    ],
    modelSentences: [
      {
        de: "Ich kenne den Mann nicht. Kennst du ihn?",
        en: "I don't know the man. Do you know him?",
        breakdown: "Ich = I | kenne = know | den Mann = the man (direct object) | nicht = not | Kennst = Know | du = you | ihn = him (replaces 'den Mann' as the direct object pronoun) → 'er' (he) becomes 'ihn' (him) as the object."
      },
      {
        de: "Wir suchen Maria. Siehst du sie?",
        en: "We are looking for Maria. Do you see her?",
        breakdown: "Wir = We | suchen = looking for | Maria = name | Siehst = See | du = you | sie = her (replaces 'Maria' as the object) → Feminine pronouns do not change — 'sie' stays 'sie'."
      },
      {
        de: "Der Chef braucht uns heute im Büro.",
        en: "The boss needs us in the office today.",
        breakdown: "Der Chef = The boss (doing the needing) | braucht = needs | uns = us (direct object) | heute = today | im Büro = in the office → 'wir' becomes 'uns' as the direct object."
      },
      {
        de: "Ich liebe dich und du liebst mich.",
        en: "I love you and you love me.",
        breakdown: "Ich = I | liebe = love | dich = you (direct object, 'du' becomes 'dich') | und = and | du = you | liebst = love | mich = me (direct object, 'ich' becomes 'mich') → Both pronouns switch to their object forms."
      }
    ],
    culturalNote: "The phrase 'Ich liebe dich' (I love you) is a very heavy, serious statement in Germany, reserved strictly for romantic partners or close family. You do not say 'Ich liebe dich' to a friend or to describe your favorite pizza. For those lighter feelings, Germans say 'Ich mag dich' (I like you) or 'Ich liebe Pizza' (without the personal pronoun).",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Fill in the correct object pronoun.",
        items: [
          { prompt: "Wo ist Thomas? Ich sehe ___ nicht.", answer: "ihn", hint: "him" },
          { prompt: "Hallo Anna, ich verstehe ___ nicht.", answer: "dich", hint: "you (informal)" },
          { prompt: "Wir haben ein Problem. Kannst du ___ helfen?", answer: "uns", hint: "us" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the sentence into German.",
        items: [
          { prompt: "I love him.", answer: "Ich liebe ihn." },
          { prompt: "Are you calling me? (anrufen)", answer: "Rufst du mich an?" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ruf ich an!",
        right: "Ruf mich an!",
        explanation: "Translating 'Call I' instead of 'Call me'. The person being called is receiving the action, so they must be in the object form — 'ich' becomes 'mich'."
      },
      {
        wrong: "Wo ist mein Stift? Ich brauche er.",
        right: "Wo ist mein Stift? Ich brauche ihn.",
        explanation: "Because a pen is masculine ('der Stift'), its pronoun is 'er' (he). When you need it, it becomes the direct object ('him'), which means you must use 'ihn'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can you give me 5 sentences using 'er', 'sie', 'ich', and 'wir', and I will rewrite them to make those pronouns the object?",
      "Ask Sky: Why doesn't the pronoun 'es' change when it is the direct object? Give me some examples.",
      "Ask Sky: Let's do a roleplay where we are looking for lost friends at a party using object pronouns ('Ihn? Nein, ich sehe ihn nicht.')."
    ],
    examRelevance: "Lesen & Hören: Exam texts heavily rely on pronouns to avoid repeating nouns. If an email says 'Wir besuchen ihn', you must know that 'ihn' refers to the male friend mentioned two sentences earlier.",
    lessonGoal: "Replace nouns with correctly changed object personal pronouns to smoothly say 'me, him, us, you' in a sentence."
  },
  {
    lessonNo: 32,
    titleEn: "Dative Articles",
    titleDe: "Dativartikel",
    introduction: "In German, there is a difference between doing something TO an object and doing something FOR someone. If you give a book to the man, the book is what you are giving (direct object), but the man receiving it is the indirect object. This is the Dative case. The Dative case signals the receiver, the beneficiary, or the target of an action, and it forces EVERY article to change its shape.",
    theRule: [
      "The Dative case is used for indirect objects (e.g., giving *to someone*, helping *someone*).",
      "Unlike the direct object case, the Dative case changes EVERY gender's article.",
      "Masculine (der) and Neuter (das) both become 'dem' (or 'einem').",
      "Feminine (die) becomes 'der' (or 'einer'). Yes, the feminine article becomes 'der' in Dative!",
      "Plural (die) becomes 'den'. Additionally, you must attach an extra '-n' to the end of the plural noun itself if it doesn't already end in 'n' or 's'."
    ],
    formula: [
      "Masculine/Neuter: der/das -> dem | ein -> einem",
      "Feminine: die -> der | eine -> einer",
      "Plural: die -> den + Noun(n)"
    ],
    grammarTable: {
      headers: ["Gender", "When Subject", "When Indirect Object"],
      rows: [
        ["Masculine", "der / ein Mann", "dem / einem Mann"],
        ["Neuter", "das / ein Kind", "dem / einem Kind"],
        ["Feminine", "die / eine Frau", "der / einer Frau (CHANGES to der!)"],
        ["Plural", "die / keine Kinder", "den / keinen Kindern (ADD -n)"]
      ]
    },
    vocabulary: [
      { de: "helfen", en: "to help", example: "Ich helfe dem Mann.", exampleEn: "I help the man." },
      { de: "danken", en: "to thank", example: "Wir danken der Frau.", exampleEn: "We thank the woman." },
      { de: "gefallen", en: "to please / to like", example: "Das Auto gefällt dem Kind.", exampleEn: "The child likes the car (The car pleases the child)." },
      { de: "gehören", en: "to belong to", example: "Das Buch gehört der Lehrerin.", exampleEn: "The book belongs to the teacher." },
      { de: "antworten", en: "to answer", example: "Er antwortet dem Chef.", exampleEn: "He answers the boss." },
      { de: "geben", en: "to give", example: "Ich gebe dem Hund das Wasser.", exampleEn: "I give the dog the water." },
      { de: "das Auto", en: "car", example: "Wir sitzen in dem Auto.", exampleEn: "We are sitting in the car." },
      { de: "der Mann", en: "man", example: "Der Mann ist groß.", exampleEn: "The man is tall." },
      { de: "die Frau", en: "woman", example: "Die Frau liest.", exampleEn: "The woman is reading." },
      { de: "das Kind", en: "child", example: "Das Kind spielt.", exampleEn: "The child is playing." }
    ],
    modelSentences: [
      {
        de: "Ich helfe dem Mann und der Frau.",
        en: "I help the man and the woman.",
        breakdown: "Ich = I | helfe = help (this verb always needs an indirect object) | dem Mann = to the man (masculine -> 'der' becomes 'dem') | und = and | der Frau = to the woman (feminine -> 'die' becomes 'der') → Both articles change for the indirect object."
      },
      {
        de: "Das Buch gehört dem Kind.",
        en: "The book belongs to the child.",
        breakdown: "Das Buch = The book (subject, unchanged) | gehört = belongs to (this verb always needs an indirect object) | dem Kind = to the child (neuter -> 'das' becomes 'dem') → The verb 'gehören' always points to the person who owns something."
      },
      {
        de: "Er gibt den Kindern ein Geschenk.",
        en: "He gives the children a gift.",
        breakdown: "Er = He | gibt = gives | den Kindern = to the children (plural -> 'die' becomes 'den', and 'Kinder' gets an extra '-n') | ein Geschenk = a gift (direct object) → Plural indirect object: article becomes 'den' and noun gets '-n'."
      },
      {
        de: "Wie gefällt der Tisch einer Frau?",
        en: "How does a woman like the table?",
        breakdown: "Wie = How | gefällt = pleases | der Tisch = the table (subject) | einer Frau = to a woman (feminine indirect object with indefinite article -> 'eine' becomes 'einer') → 'gefallen' works backwards from English: the thing being liked is the subject."
      }
    ],
    culturalNote: "Some common German verbs simply require the indirect object form, even if they don't look like they have two objects. For instance, 'helfen' (to help), 'danken' (to thank), and 'antworten' (to answer). A German views this as 'I give help TO you' or 'I give thanks TO you'. Memorizing these verbs is essential.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Fill in the correct indirect object article (dem, der, den).",
        items: [
          { prompt: "Ich helfe ___ Mann. (der Mann)", answer: "dem", hint: "Masculine indirect object" },
          { prompt: "Das Haus gehört ___ Frau. (die Frau)", answer: "der", hint: "Feminine indirect object" },
          { prompt: "Wir danken ___ Kindern. (die Kinder)", answer: "den", hint: "Plural indirect object" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate into German.",
        items: [
          { prompt: "I am helping a child. (das Kind)", answer: "Ich helfe einem Kind." },
          { prompt: "The car belongs to the woman. (die Frau)", answer: "Das Auto gehört der Frau." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich danke die Frau.",
        right: "Ich danke der Frau.",
        explanation: "'Danken' strictly requires the indirect object form. The feminine article 'die' changes to 'der' here."
      },
      {
        wrong: "Er gibt das Buch den Kinder.",
        right: "Er gibt das Buch den Kindern.",
        explanation: "In the plural indirect object form ('den'), you must also attach an '-n' to the end of the noun if it does not already end in one."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me a list of the 10 most common verbs that always use the indirect object form for A1.",
      "Ask Sky: Can you explain the difference between the direct object and indirect object using the verb 'geben' (to give)?",
      "Ask Sky: Test me! Give me a noun and I will change it to both the direct object form and the indirect object form."
    ],
    examRelevance: "Schreiben Teil 2 & Hören: Incorrectly applying the indirect object article is a major red flag for examiners. If you write 'Ich helfe den Mann' instead of 'dem Mann', you lose grammar points immediately.",
    lessonGoal: "Understand the concept of the indirect object and correctly change articles into the indirect object form for all genders and plurals."
  },
  {
    lessonNo: 33,
    titleEn: "Ordinal Numbers",
    titleDe: "Ordinalzahlen",
    introduction: "Saying 'I arrived on the three of May' sounds just as wrong in German as it does in English. For dates, rankings, and floors of a building, you need ordinal numbers (first, second, third). German ordinal numbers are very systematic: you just attach a specific ending to the regular numbers you already know.",
    theRule: [
      "To form ordinal numbers from 1 to 19, add '-te' to the number (zwei -> zweite, vier -> vierte).",
      "To form ordinal numbers from 20 onwards, add '-ste' to the number (zwanzig -> zwanzigste).",
      "There are three important exceptions to memorize: 1 is 'erste', 3 is 'dritte', and 7 is 'siebte'.",
      "When written as digits, German uses a dot to indicate an ordinal number instead of 'st' or 'th' (e.g., 1. = first, 4. = fourth).",
      "When saying a date with 'am' (on the), you must add an '-n' to the ordinal ending (am ersten, am vierten)."
    ],
    formula: [
      "1-19: Number + te (Exceptions: erste, dritte, siebte)",
      "20+: Number + ste (zwanzigste, einundzwanzigste)",
      "With 'am' (Dates): am + Number + ten / sten"
    ],
    grammarTable: {
      headers: ["Number", "Base Word", "Ordinal (The xth)", "Date format (On the xth)"],
      rows: [
        ["1.", "eins", "der erste", "am ersten"],
        ["2.", "zwei", "der zweite", "am zweiten"],
        ["3.", "drei", "der dritte", "am dritten"],
        ["7.", "sieben", "der siebte", "am siebten"],
        ["10.", "zehn", "der zehnte", "am zehnten"],
        ["20.", "zwanzig", "der zwanzigste", "am zwanzigsten"]
      ]
    },
    vocabulary: [
      { de: "erste", en: "first", example: "Das ist das erste Mal.", exampleEn: "That is the first time." },
      { de: "zweite", en: "second", example: "Der zweite Platz.", exampleEn: "The second place." },
      { de: "dritte", en: "third", example: "Wir wohnen im dritten Stock.", exampleEn: "We live on the third floor." },
      { de: "siebte", en: "seventh", example: "Heute ist der siebte.", exampleEn: "Today is the seventh." },
      { de: "der Januar", en: "January", example: "Der Januar ist kalt.", exampleEn: "January is cold." },
      { de: "der Februar", en: "February", example: "Mein Geburtstag ist im Februar.", exampleEn: "My birthday is in February." },
      { de: "der Geburtstag", en: "birthday", example: "Wann hast du Geburtstag?", exampleEn: "When is your birthday?" },
      { de: "das Datum", en: "date", example: "Welches Datum ist heute?", exampleEn: "What date is today?" },
      { de: "heute", en: "today", example: "Heute ist der vierte.", exampleEn: "Today is the fourth." },
      { de: "der Stock", en: "floor / story (of a building)", example: "Die Wohnung ist im ersten Stock.", exampleEn: "The apartment is on the first floor." }
    ],
    modelSentences: [
      {
        de: "Heute ist der vierte Januar.",
        en: "Today is the fourth of January.",
        breakdown: "Heute = Today | ist = is | der vierte = the fourth (vier + te) | Januar = January → Ordinal is formed by adding '-te' to the number."
      },
      {
        de: "Ich habe am zwanzigsten Mai Geburtstag.",
        en: "I have my birthday on the twentieth of May.",
        breakdown: "Ich habe = I have | am = on the | zwanzigsten = twentieth (zwanzig + sten, because of 'am') | Mai = May | Geburtstag = birthday → When using 'am', ordinals get an extra '-n' at the end."
      },
      {
        de: "Das Büro ist im ersten Stock.",
        en: "The office is on the first floor.",
        breakdown: "Das Büro = The office | ist = is | im = in the | ersten = first (erste + n because of the article 'im') | Stock = floor → Exception: 1 is 'erste', not 'einste'."
      },
      {
        de: "Er ist als dritter angekommen.",
        en: "He arrived as third.",
        breakdown: "Er = He | ist angekommen = arrived | als dritter = as third → Exception: 3 is 'dritte', not 'dreite'."
      }
    ],
    culturalNote: "When looking at a German calendar or invitation, you will never see '3rd' or '4th'. You will see '3.' and '4.'. If you are invited to a party on '12.05.', this means the twelfth of May (Tag.Monat.Jahr), not the fifth of December. Europe puts the day before the month.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct spelled-out ordinal number.",
        items: [
          { prompt: "1. -> ( einste / erste / eins )", answer: "erste" },
          { prompt: "3. -> ( dreite / dritte / dreiste )", answer: "dritte" },
          { prompt: "20. -> ( zwanzigte / zwanzigste / zwanzig )", answer: "zwanzigste" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Fill in the correct ordinal number with the '-n' ending for dates.",
        items: [
          { prompt: "Ich komme am ___ (5.) August.", answer: "fünften", hint: "fünf + ten" },
          { prompt: "Die Party ist am ___ (1.) Mai.", answer: "ersten", hint: "erste + n" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Mein Geburtstag ist am vier Mai.",
        right: "Mein Geburtstag ist am vierten Mai.",
        explanation: "You must use ordinal numbers for dates. Saying 'am vier' is like saying 'on the four of May'."
      },
      {
        wrong: "Die Party ist am erste Mai.",
        right: "Die Party ist am ersten Mai.",
        explanation: "When you use 'am', you always need an extra '-n' on the ordinal. 'Heute ist der erste' is correct (no 'am'). But 'am erste' is wrong — it must be 'am ersten'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 random dates written as digits (like 14.02.) and I will spell them out in German.",
      "Ask Sky: Can we practice saying our birthdays and the birthdays of our family members?",
      "Ask Sky: How do I read the years aloud when giving a full date of birth, like 15.08.1990?"
    ],
    examRelevance: "Sprechen Teil 1 & Hören Teil 3: You will almost certainly be asked 'Wann haben Sie Geburtstag?' (When is your birthday?). Also, listening to voicemails about appointment dates requires understanding ordinal numbers.",
    lessonGoal: "Form and pronounce ordinal numbers, memorize the exceptions, and correctly state dates using the 'am ...-ten' format."
  },
  {
    lessonNo: 34,
    titleEn: "Questions of Time",
    titleDe: "Fragen zur Zeit",
    introduction: "Appointments in Germany run like clockwork, and showing up at the wrong time is considered highly unprofessional. To manage your schedule, a simple 'When?' (Wann) is not enough. You need to know how to ask how long something takes, since when something has been happening, and until when a shop stays open.",
    theRule: [
      "'Wie lange?' asks about the duration of an event (How long?). The answer usually includes 'für' (for) or just a time frame.",
      "'Seit wann?' asks about an event that started in the past and is STILL ongoing (Since when?). The answer uses 'seit' (since).",
      "'Ab wann?' asks about an event starting in the future (From when on?). The answer uses 'ab' (from).",
      "'Bis wann?' asks about the end point of an event (Until when?). The answer uses 'bis' (until)."
    ],
    formula: [
      "Duration: Wie lange + verb + subject? -> Answer: (für) [time]",
      "Past to Present: Seit wann + verb + subject? -> Answer: seit [time]",
      "Future Start: Ab wann + verb + subject? -> Answer: ab [time]",
      "End Point: Bis wann + verb + subject? -> Answer: bis [time]"
    ],
    vocabulary: [
      { de: "wie lange", en: "how long", example: "Wie lange dauert der Film?", exampleEn: "How long does the movie last?" },
      { de: "seit wann", en: "since when", example: "Seit wann lernst du Deutsch?", exampleEn: "Since when are you learning German?" },
      { de: "ab wann", en: "from when (future)", example: "Ab wann ist das Restaurant offen?", exampleEn: "From when is the restaurant open?" },
      { de: "bis wann", en: "until when", example: "Bis wann arbeitest du?", exampleEn: "Until when do you work?" },
      { de: "dauern", en: "to last / take (time)", example: "Die Fahrt dauert eine Stunde.", exampleEn: "The drive takes one hour." },
      { de: "warten", en: "to wait", example: "Wie lange wartest du schon?", exampleEn: "How long have you been waiting?" },
      { de: "der Tag", en: "day", example: "Das dauert zwei Tage.", exampleEn: "That takes two days." },
      { de: "die Woche", en: "week", example: "Ich bin eine Woche hier.", exampleEn: "I am here for one week." },
      { de: "der Monat", en: "month", example: "Seit einem Monat lerne ich Deutsch.", exampleEn: "I have been learning German for a month." },
      { de: "das Jahr", en: "year", example: "Er arbeitet hier seit einem Jahr.", exampleEn: "He has worked here for a year." }
    ],
    modelSentences: [
      {
        de: "Wie lange dauert der Kurs? Er dauert drei Stunden.",
        en: "How long does the course last? It lasts three hours.",
        breakdown: "Wie lange = How long | dauert = lasts | der Kurs = the course | Er dauert = It lasts | drei Stunden = three hours → 'dauern' is the verb for how long something takes."
      },
      {
        de: "Seit wann wohnen Sie in Berlin? Seit 2020.",
        en: "Since when have you lived in Berlin? Since 2020.",
        breakdown: "Seit wann = Since when | wohnen = live | Sie = you (formal) | in Berlin = in Berlin | Seit 2020 = Since 2020 → 'seit' is used for actions that started in the past and are still true now."
      },
      {
        de: "Ab wann kann ich das Auto holen? Ab morgen.",
        en: "From when can I get the car? From tomorrow.",
        breakdown: "Ab wann = From when (future start) | kann = can | ich = I | das Auto = the car | holen = get | Ab morgen = From tomorrow → 'ab' is used for future starting points."
      },
      {
        de: "Bis wann hat der Supermarkt geöffnet? Bis 22 Uhr.",
        en: "Until when is the supermarket open? Until 10 PM.",
        breakdown: "Bis wann = Until when | hat der Supermarkt geöffnet = is the supermarket open | Bis 22 Uhr = Until 22:00 → 'bis' is used for end points."
      }
    ],
    culturalNote: "Unlike English, which uses the present perfect tense for ongoing actions ('I have been living here for a year'), German simply uses the present tense with 'seit'. 'Ich lebe hier seit einem Jahr' translates literally to 'I live here since a year', but it is the perfectly correct way to express an ongoing condition in German.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct time question word.",
        items: [
          { prompt: "___ arbeitest du heute? - Bis 17 Uhr. ( Wie lange / Bis wann )", answer: "Bis wann" },
          { prompt: "___ wohnst du hier? - Seit August. ( Seit wann / Ab wann )", answer: "Seit wann" },
          { prompt: "___ dauert die Pause? - 30 Minuten. ( Wie lange / Bis wann )", answer: "Wie lange" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the question.",
        items: [
          { prompt: "How long does the trip take? (die Fahrt / dauern)", answer: "Wie lange dauert die Fahrt?" },
          { prompt: "Since when have you been learning German? (lernen)", answer: "Seit wann lernst du Deutsch?" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich habe Deutsch gelernt seit 2022.",
        right: "Ich lerne Deutsch seit 2022.",
        explanation: "English speakers naturally reach for the past tense to say 'I have been learning'. If you are still learning it now, you must use the present tense with 'seit'."
      },
      {
        wrong: "Seit wann ist der Shop offen morgen?",
        right: "Ab wann ist der Shop morgen offen?",
        explanation: "Using 'seit' for the future. 'Seit' is strictly past-to-present. If something opens in the future, you must use 'ab'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Create a schedule for a fictional conference, and I will ask you 5 questions about when things start, end, and how long they take.",
      "Ask Sky: What is the grammar rule for the nouns that come after the word 'seit'? Why does it say 'seit einem Jahr'?",
      "Ask Sky: Ask me how long I have been doing my hobbies, and I will answer using 'seit' and the present tense."
    ],
    examRelevance: "Lesen & Sprechen Teil 2: On the speaking cards, you might get the word 'Dauer' (Duration) or 'Anfang' (Start). You must know exactly whether to formulate a 'Wie lange' or 'Ab wann' question.",
    lessonGoal: "Ask and answer precise questions about the duration, starting points, and ending points of events using 'wie lange', 'seit wann', 'ab wann', and 'bis wann'."
  },
  {
    lessonNo: 35,
    titleEn: "Possessive Pronouns Dative",
    titleDe: "Possessivpronomen Dativ",
    introduction: "In Lesson 32, you learned that helping 'the' mother requires the indirect object article 'der' (Ich helfe der Mutter). But what if you want to help YOUR mother? The possessive pronoun must take on that same indirect object form. Navigating possessive pronouns here sounds intimidating, but it follows a beautifully consistent pattern: you just glue the indirect object endings directly onto the words like 'mein' or 'dein'.",
    theRule: [
      "Possessive pronouns (mein, dein, sein, etc.) adopt the indirect object endings whenever they represent an indirect object.",
      "Masculine and Neuter nouns demand the '-em' ending. (mein -> meinem).",
      "Feminine nouns demand the '-er' ending. (mein -> meiner).",
      "Plural nouns demand the '-en' ending AND an extra '-n' attached to the noun itself. (mein -> meinen).",
      "This happens automatically after certain verbs (helfen, danken, gehören) or prepositions (mit, von, zu)."
    ],
    formula: [
      "Masculine/Neuter: mein + em -> meinem [Vater / Kind]",
      "Feminine: mein + er -> meiner [Mutter]",
      "Plural: mein + en -> meinen [Eltern]"
    ],
    grammarTable: {
      headers: ["Gender", "When Subject", "When Indirect Object"],
      rows: [
        ["Masculine", "mein Bruder", "meinem Bruder"],
        ["Neuter", "mein Auto", "meinem Auto"],
        ["Feminine", "meine Schwester", "meiner Schwester"],
        ["Plural", "meine Freunde", "meinen Freunden (ADD -n)"]
      ]
    },
    vocabulary: [
      { de: "meinem", en: "my (masc/neuter indirect object)", example: "Ich helfe meinem Vater.", exampleEn: "I help my father." },
      { de: "meiner", en: "my (fem indirect object)", example: "Das gehört meiner Mutter.", exampleEn: "That belongs to my mother." },
      { de: "meinen", en: "my (plural indirect object)", example: "Ich danke meinen Eltern.", exampleEn: "I thank my parents." },
      { de: "deinem", en: "your (masc/neuter indirect object)", example: "Wie geht es deinem Bruder?", exampleEn: "How is your brother?" },
      { de: "mit", en: "with (always Indirect Object)", example: "Ich spiele mit meinem Hund.", exampleEn: "I am playing with my dog." },
      { de: "gratulieren", en: "to congratulate", example: "Wir gratulieren deinem Sohn.", exampleEn: "We congratulate your son." },
      { de: "passen", en: "to fit", example: "Das Shirt passt meinem Kind.", exampleEn: "The shirt fits my child." },
      { de: "der Freund", en: "friend", example: "Ich antworte meinem Freund.", exampleEn: "I am answering my friend." },
      { de: "das Baby", en: "baby", example: "Das Spielzeug gefällt dem Baby.", exampleEn: "The baby likes the toy." },
      { de: "die Tante", en: "aunt", example: "Ich fahre zu meiner Tante.", exampleEn: "I am driving to my aunt's." }
    ],
    modelSentences: [
      {
        de: "Ich helfe meinem Vater im Garten.",
        en: "I help my father in the garden.",
        breakdown: "Ich = I | helfe = help (this verb points to the person being helped) | meinem Vater = my father (masculine indirect object -> 'mein' + 'em') | im Garten = in the garden → 'mein' becomes 'meinem' for masculine."
      },
      {
        de: "Das Auto gehört meiner Schwester.",
        en: "The car belongs to my sister.",
        breakdown: "Das Auto = The car | gehört = belongs to (points to the owner) | meiner Schwester = my sister (feminine indirect object -> 'mein' + 'er') → 'mein' becomes 'meiner' for feminine."
      },
      {
        de: "Gehst du mit deinen Freunden ins Kino?",
        en: "Are you going to the movies with your friends?",
        breakdown: "Gehst du = Are you going | mit = with (this word always requires the indirect object form) | deinen Freunden = your friends (plural indirect object -> 'dein' + 'en', and 'Freunde' gets extra '-n') | ins Kino = to the movies → 'mit' always triggers this ending."
      },
      {
        de: "Wie geht es Ihrem Mann?",
        en: "How is your husband? (Formal)",
        breakdown: "Wie geht es = How goes it (the 'es' in this phrase always points to an indirect object) | Ihrem Mann = your husband (formal 'your', masculine indirect object -> 'Ihr' + 'em') → Formal 'Ihr' follows the same pattern."
      }
    ],
    culturalNote: "The phrase 'Wie geht es...?' (How are you?) literally translates to 'How goes it TO...'. Therefore, if you ask how someone's family members are doing, you must use the indirect object form. Asking a colleague 'Wie geht es deiner Frau?' (How is your wife?) shows excellent grammatical command and politeness.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Add the correct ending (-em, -er, -en) to the possessive pronoun.",
        items: [
          { prompt: "Ich fahre mit mein___ Bruder. (der Bruder)", answer: "meinem", hint: "Masculine indirect object" },
          { prompt: "Das gehört mein___ Mutter. (die Mutter)", answer: "meiner", hint: "Feminine indirect object" },
          { prompt: "Ich danke mein___ Eltern. (die Eltern)", answer: "meinen", hint: "Plural indirect object" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate into German using the correct possessive pronoun ending.",
        items: [
          { prompt: "How is your father? (informal / der Vater)", answer: "Wie geht es deinem Vater?" },
          { prompt: "I am helping my sister. (die Schwester)", answer: "Ich helfe meiner Schwester." }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich spiele mit mein Hund.",
        right: "Ich spiele mit meinem Hund.",
        explanation: "The preposition 'mit' (with) always requires the indirect object ending. It forces the possessive pronoun to take the '-em' ending for the masculine dog."
      },
      {
        wrong: "Ich helfe meine Mutter.",
        right: "Ich helfe meiner Mutter.",
        explanation: "Learners look at 'die Mutter' and think 'meine' is fine. But 'helfen' requires the indirect object form, and the feminine ending is '-er', not '-e'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 10 sentences missing the possessive pronoun ending. I will fill in -em, -er, or -en based on the noun.",
      "Ask Sky: Explain which prepositions ALWAYS force the indirect object form (like 'mit' and 'von').",
      "Ask Sky: Roleplay an office conversation where we ask about each other's family members using 'Wie geht es...?'."
    ],
    examRelevance: "Schreiben Teil 1: When writing informal letters, asking 'Wie geht es deiner Familie?' or 'Wie geht es deinem Hund?' is standard letter etiquette and will earn you full marks for grammar and context.",
    lessonGoal: "Correctly attach the '-em', '-er', or '-en' ending to possessive pronouns after certain verbs or prepositions like 'mit'."
  }
];
