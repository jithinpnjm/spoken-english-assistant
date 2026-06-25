import type { GermanA1BookLesson } from "../germanA1BookLessonTypes";

export const germanA1BookLessonsPart03: GermanA1BookLesson[] = [
  {
    lessonNo: 11,
    titleEn: "Pronouns Overview",
    titleDe: "Pronomen",
    introduction: "Imagine telling a story where you constantly repeat someone's name: 'Thomas is here. Thomas is eating. Thomas is tired.' Pronouns solve this by replacing nouns (he, she, it, we). In German, getting your personal pronouns right is critical because the ending of every single verb you use depends entirely on which pronoun you choose as your subject.",
    theRule: [
      "German has singular pronouns (ich, du, er, sie, es) and plural pronouns (wir, ihr, sie).",
      "'sie' (lowercase) can mean 'she' OR 'they'. You can only tell the difference by looking at the verb ending.",
      "'Sie' (capitalized) is the formal 'you' and can be used for one person or multiple people.",
      "'es' (it) is used not just for objects, but for any noun with 'das' as its article (like 'das Mädchen' — the girl)."
    ],
    formula: [
      "Singular: ich (I), du (you), er (he), sie (she), es (it)",
      "Plural: wir (we), ihr (you all), sie (they), Sie (you formal)"
    ],
    grammarTable: {
      headers: ["Person", "Singular", "Person", "Plural"],
      rows: [
        ["1st", "ich (I)", "1st", "wir (we)"],
        ["2nd", "du (you informal)", "2nd", "ihr (you all informal)"],
        ["3rd", "er / sie / es (he/she/it)", "3rd", "sie (they) / Sie (you formal)"]
      ]
    },
    vocabulary: [
      { de: "ich", en: "I", example: "Ich lerne.", exampleEn: "I am learning." },
      { de: "du", en: "you (informal singular)", example: "Kommst du?", exampleEn: "Are you coming?" },
      { de: "er", en: "he", example: "Er arbeitet.", exampleEn: "He works." },
      { de: "sie (she)", en: "she", example: "Sie trinkt Wasser.", exampleEn: "She is drinking water." },
      { de: "es", en: "it", example: "Es ist kalt.", exampleEn: "It is cold." },
      { de: "wir", en: "we", example: "Wir gehen jetzt.", exampleEn: "We are going now." },
      { de: "ihr", en: "you all (informal plural)", example: "Was macht ihr?", exampleEn: "What are you all doing?" },
      { de: "sie (they)", en: "they", example: "Wo sind sie?", exampleEn: "Where are they?" },
      { de: "Sie (formal)", en: "you (formal)", example: "Haben Sie Zeit?", exampleEn: "Do you have time?" },
      { de: "die Person", en: "person", example: "Die Person ist nett.", exampleEn: "The person is nice." }
    ],
    modelSentences: [
      {
        de: "Ich komme aus Berlin und er kommt aus München.",
        en: "I come from Berlin and he comes from Munich.",
        breakdown: "Ich = I | komme = come | aus Berlin = from Berlin | und = and | er = he | kommt = comes | aus München = from Munich → Two subjects, two different verb forms."
      },
      {
        de: "Das ist das Kind. Es spielt.",
        en: "That is the child. It is playing.",
        breakdown: "Das = That | ist = is | das Kind = the child | Es = It (replaces 'das Kind') | spielt = plays → Any noun with 'das' is replaced by 'es'."
      },
      {
        de: "Hallo Kinder, was macht ihr?",
        en: "Hello children, what are you all doing?",
        breakdown: "Hallo Kinder = Hello children | was = what | macht = do | ihr = you all → 'ihr' is the informal word for addressing a group."
      },
      {
        de: "Herr Müller, wohnen Sie hier?",
        en: "Mr. Müller, do you live here?",
        breakdown: "Herr Müller = formal address | wohnen = live | Sie = you (formal, capitalized) | hier = here → Always capitalize 'Sie' when using it formally."
      }
    ],
    culturalNote: "When addressing a group of friends or children, Germans use 'ihr' (you all). English lacks a formal equivalent for this, often relying on 'you guys' or 'y'all'. However, if a German addresses a group of strangers or clients, they will use the plural formal 'Sie', not 'ihr'.",
    exercises: [
      {
        type: "choose",
        instruction: "Select the correct pronoun for the situation.",
        items: [
          { prompt: "Talking to your boss: (du / Sie / ihr)", answer: "Sie" },
          { prompt: "Talking to two of your best friends: (du / Sie / ihr)", answer: "ihr" },
          { prompt: "Talking about a woman: (er / sie / es)", answer: "sie" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the pronoun.",
        items: [
          { prompt: "We are learning German. -> ___ lernen Deutsch.", answer: "Wir" },
          { prompt: "It is cold. -> ___ ist kalt.", answer: "Es" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Die Lampe ist neu. Er ist schön.",
        right: "Die Lampe ist neu. Sie ist schön.",
        explanation: "In English, a lamp is an 'it'. In German, 'die Lampe' is a feminine noun, so you MUST use the feminine pronoun 'sie' (she) to refer back to it."
      },
      {
        wrong: "Hallo Maria und Tom, was macht Sie?",
        right: "Hallo Maria und Tom, was macht ihr?",
        explanation: "Learners often default to 'Sie' for groups. But Maria and Tom are friends (informal). The informal plural 'you all' is 'ihr'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 5 nouns with their articles (der, die, das) and I will tell you which pronoun (er, sie, es) replaces them.",
      "Ask Sky: How can I tell the difference between 'sie' (she) and 'sie' (they) if they are spelled exactly the same?",
      "Ask Sky: Can we practice a roleplay where I have to switch between talking to a group of friends ('ihr') and a single stranger ('Sie')?"
    ],
    examRelevance: "Lesen Teil 1: Exam reading texts frequently use pronouns to refer back to objects or people mentioned in previous sentences. If you don't know that 'er' can mean 'the table' (der Tisch), you will fail the comprehension questions.",
    lessonGoal: "Instantly recognize all German personal pronouns and use the correct pronoun to address different types of people or replace gendered nouns."
  },
  {
    lessonNo: 12,
    titleEn: "Verb Conjugation Part 1: haben & sein",
    titleDe: "Verbkonjugation Teil 1: haben & sein",
    introduction: "To speak any language, you must be able to express what you 'have' and what you 'are'. In German, the verbs 'haben' (to have) and 'sein' (to be) are the absolute core of daily communication. Unfortunately, they are highly irregular and do not follow normal grammar rules. You must memorize them by heart before moving forward.",
    theRule: [
      "'sein' (to be) is completely irregular. The form changes entirely depending on the pronoun — just memorize the table.",
      "'haben' (to have) is mostly regular, but it drops the 'b' for 'du' (hast) and 'er/sie/es' (hat).",
      "Use 'sein' + adjective to describe people or things: 'Er ist müde' (He is tired).",
      "Use 'haben' + noun to express possession or physical states: 'Ich habe Hunger' (I have hunger = I am hungry)."
    ],
    formula: [
      "Subject + form of 'sein' + Adjective/Noun (Er ist müde.)",
      "Subject + form of 'haben' + Noun (Ich habe Zeit.)"
    ],
    grammarTable: {
      headers: ["Pronoun", "sein (to be)", "haben (to have)"],
      rows: [
        ["ich", "bin", "habe"],
        ["du", "bist", "hast"],
        ["er/sie/es", "ist", "hat"],
        ["wir", "sind", "haben"],
        ["ihr", "seid", "habt"],
        ["sie/Sie", "sind", "haben"]
      ]
    },
    vocabulary: [
      { de: "sein", en: "to be", example: "Ich möchte hier sein.", exampleEn: "I want to be here." },
      { de: "haben", en: "to have", example: "Wir haben Hunger.", exampleEn: "We are hungry (We have hunger)." },
      { de: "die Zeit", en: "time", example: "Hast du Zeit?", exampleEn: "Do you have time?" },
      { de: "der Hunger", en: "hunger", example: "Er hat Hunger.", exampleEn: "He is hungry." },
      { de: "der Durst", en: "thirst", example: "Ich habe Durst.", exampleEn: "I am thirsty." },
      { de: "das Geld", en: "money", example: "Wir haben kein Geld.", exampleEn: "We have no money." },
      { de: "müde", en: "tired", example: "Bist du müde?", exampleEn: "Are you tired?" },
      { de: "glücklich", en: "happy", example: "Sie ist glücklich.", exampleEn: "She is happy." },
      { de: "krank", en: "sick", example: "Der Mann ist krank.", exampleEn: "The man is sick." },
      { de: "fertig", en: "finished / ready", example: "Seid ihr fertig?", exampleEn: "Are you all finished?" }
    ],
    modelSentences: [
      {
        de: "Ich bin krank und ich habe Hunger.",
        en: "I am sick and I am hungry (have hunger).",
        breakdown: "Ich = I | bin = am | krank = sick | und = and | ich = I | habe = have | Hunger = hunger → In German, hunger and thirst are things you 'have', not things you 'are'."
      },
      {
        de: "Er hat keine Zeit, denn er ist müde.",
        en: "He has no time, because he is tired.",
        breakdown: "Er = He | hat = has | keine Zeit = no time | denn = because | er = he | ist = is | müde = tired → 'keine' is the word for 'no/none'."
      },
      {
        de: "Wir sind hier. Wo seid ihr?",
        en: "We are here. Where are you all?",
        breakdown: "Wir = We | sind = are | hier = here | Wo = Where | seid = are (plural informal) | ihr = you all → 'seid' is the form of 'sein' for 'ihr'."
      },
      {
        de: "Haben Sie heute Zeit, Herr Meyer?",
        en: "Do you have time today, Mr. Meyer?",
        breakdown: "Haben = Have (verb moves to front for question) | Sie = you (formal) | heute = today | Zeit = time | Herr Meyer = Mr. Meyer → Putting the verb first turns a statement into a yes/no question."
      }
    ],
    culturalNote: "In German, physical states like being hungry, thirsty, or afraid are expressed using 'haben' (to have), not 'sein' (to be). You do not say 'I am hungry' (Ich bin hungrig); it sounds unnatural. You say 'Ich habe Hunger' (I have hunger).",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Fill in the correct form of 'sein'.",
        items: [
          { prompt: "Ich ___ sehr müde.", answer: "bin", hint: "I am" },
          { prompt: "Wo ___ du?", answer: "bist", hint: "are you (informal)" },
          { prompt: "Wir ___ glücklich.", answer: "sind", hint: "we are" }
        ]
      },
      {
        type: "fill_blank",
        instruction: "Fill in the correct form of 'haben'.",
        items: [
          { prompt: "Er ___ ein Auto.", answer: "hat", hint: "he has" },
          { prompt: "___ ihr Zeit?", answer: "Habt", hint: "do you all have" },
          { prompt: "Ich ___ Durst.", answer: "habe", hint: "I have" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Ich bin Hunger.",
        right: "Ich habe Hunger.",
        explanation: "Directly translating 'I am hungry' leads to using 'sein'. In German, hunger and thirst are nouns that you possess ('haben')."
      },
      {
        wrong: "Du habst Zeit.",
        right: "Du hast Zeit.",
        explanation: "Learners try to treat 'haben' as a regular verb (hab + st). But 'haben' drops the 'b' for 'du' and 'er/sie/es'. It is 'hast' and 'hat'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can you give me 10 fill-in-the-blank sentences where I have to choose between 'haben' and 'sein'?",
      "Ask Sky: What other physical states use 'haben' in German besides hunger and thirst?",
      "Ask Sky: Test my conjugation! Call out a pronoun, and I will give you the forms for both haben and sein."
    ],
    examRelevance: "Hören, Lesen, Schreiben, Sprechen: These two verbs make up roughly 30% of all verb usage in A1 German. You cannot pass any section of the Goethe exam without perfect mastery of their conjugations.",
    lessonGoal: "Flawlessly conjugate 'haben' and 'sein' for all pronouns and correctly use 'haben' for physical states like hunger and thirst."
  },
  {
    lessonNo: 13,
    titleEn: "Regular vs Irregular Verbs",
    titleDe: "Regelmäßige vs. unregelmäßige Verben",
    introduction: "In English, past tense verbs are often irregular (go -> went, catch -> caught). In German, verbs can be irregular even in the *present tense*. Knowing how to categorize a verb as 'regular' or 'irregular' immediately tells you how it behaves, saving you from making embarrassing mistakes when speaking to locals.",
    theRule: [
      "Every German verb in its dictionary form ends in '-en' or '-n' (e.g., mach-en, spiel-en).",
      "The core of the verb — what is left when you remove '-en' — is called the 'stem' (mach-, spiel-).",
      "Regular verbs NEVER change their stem. You just stick the ending on (mach-st, mach-t).",
      "Irregular verbs change their stem vowel, but ONLY for the 'du' and 'er/sie/es' forms. The endings themselves stay the same."
    ],
    formula: [
      "Regular Pattern: Stem stays the same + Ending (lernen -> du lernst)",
      "Irregular Pattern: Stem vowel changes + Ending (sprechen -> du sprichst)"
    ],
    vocabulary: [
      { de: "das Verb", en: "verb", example: "Das Verb steht auf Position zwei.", exampleEn: "The verb stands in position two." },
      { de: "regelmäßig", en: "regular", example: "Spielen ist ein regelmäßiges Verb.", exampleEn: "Spielen is a regular verb." },
      { de: "unregelmäßig", en: "irregular", example: "Essen ist unregelmäßig.", exampleEn: "Essen is irregular." },
      { de: "der Stamm", en: "stem", example: "Der Stamm von 'machen' ist 'mach'.", exampleEn: "The stem of 'machen' is 'mach'." },
      { de: "die Endung", en: "ending", example: "Die Endung für 'ich' ist 'e'.", exampleEn: "The ending for 'ich' is 'e'." },
      { de: "ändern", en: "to change", example: "Der Vokal ändert sich.", exampleEn: "The vowel changes." },
      { de: "bleiben", en: "to stay / remain", example: "Der Stamm bleibt gleich.", exampleEn: "The stem stays the same." },
      { de: "immer", en: "always", example: "Das ist immer so.", exampleEn: "That is always the case." },
      { de: "oft", en: "often", example: "Irreguläre Verben sind oft wichtig.", exampleEn: "Irregular verbs are often important." },
      { de: "gleich", en: "same / equal", example: "Das ist nicht gleich.", exampleEn: "That is not the same." }
    ],
    modelSentences: [
      {
        de: "Ich spiele, und du spielst. Das ist regelmäßig.",
        en: "I play, and you play. That is regular.",
        breakdown: "Ich = I | spiele = play (stem: spiel + e) | du = you | spielst = play (stem: spiel + st) | Das ist regelmäßig = That is regular → The stem 'spiel' never changes."
      },
      {
        de: "Ich spreche, aber du sprichst. Das ist unregelmäßig.",
        en: "I speak, but you speak. That is irregular.",
        breakdown: "Ich = I | spreche = speak (stem: sprech, vowel e) | aber = but | du = you | sprichst = speak (vowel changes to 'i') | Das ist unregelmäßig = That is irregular → Only 'du' and 'er/sie/es' trigger the vowel change."
      },
      {
        de: "Er lernt schnell.",
        en: "He learns fast.",
        breakdown: "Er = He | lernt = learns (stem: lern + t, no vowel change) | schnell = fast → A regular verb — the stem stays the same."
      },
      {
        de: "Sie schläft jetzt.",
        en: "She is sleeping now.",
        breakdown: "Sie = She | schläft = sleeps (stem: schlaf, 'a' changes to 'ä') | jetzt = now → An irregular verb — the vowel changes for 'er/sie/es'."
      }
    ],
    culturalNote: "When looking up verbs in a German dictionary, irregular verbs are clearly marked (usually with their stem changes in parentheses). Germans call regular verbs 'weak verbs' (schwache Verben) and irregular verbs 'strong verbs' (starke Verben) because strong verbs change their own vowels.",
    exercises: [
      {
        type: "choose",
        instruction: "Identify the stem of the given verb.",
        items: [
          { prompt: "kaufen (kauf / kauf-en / k-aufen)", answer: "kauf" },
          { prompt: "trinken (tri-nken / trink / trinken)", answer: "trink" },
          { prompt: "arbeiten (arbeit / ar-beiten / arbei)", answer: "arbeit" }
        ]
      },
      {
        type: "choose",
        instruction: "Based on the rule, which pronouns trigger a vowel change in irregular verbs?",
        items: [
          { prompt: "ich und du", answer: "No, incorrect." },
          { prompt: "du und er/sie/es", answer: "Yes, correct." },
          { prompt: "wir und sie", answer: "No, incorrect." }
        ],
        // The array logic uses standard prompt/answer matching
      }
    ],
    commonMistakes: [
      {
        wrong: "Wir sprechen, also sprichst wir.",
        right: "Wir sprechen.",
        explanation: "Students often panic and apply the vowel change to ALL pronouns. The plural pronouns (wir, ihr, sie) almost never undergo the vowel change in the present tense."
      },
      {
        wrong: "Der Stamm von 'lernen' ist 'lernen'.",
        right: "Der Stamm von 'lernen' ist 'lern'.",
        explanation: "Failing to remove the '-en' completely before conjugating results in terrible words like 'ich lernene'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Explain the difference between 'starke Verben' and 'schwache Verben' in simple terms.",
      "Ask Sky: Give me a list of 5 regular verbs and 5 irregular verbs from the A1 vocabulary.",
      "Ask Sky: How do I find out if a new verb I learn is regular or irregular?"
    ],
    examRelevance: "Grammatikverständnis: Understanding this categorization is the key to mastering Verb Conjugation Parts 2 and 3. Without this foundational logic, verb endings will feel like random chaos.",
    lessonGoal: "Understand the structural difference between regular and irregular verbs and correctly identify the stem of any German verb."
  },
  {
    lessonNo: 14,
    titleEn: "Verb Conjugation Part 2: Regular Verbs",
    titleDe: "Verbkonjugation Teil 2: Regelmäßige Verben",
    introduction: "Over 80% of German verbs are regular. This is fantastic news! It means once you learn this single, predictable pattern, you can instantly conjugate thousands of verbs without thinking. Mastering the regular verb endings is the mathematical code that unlocks the vast majority of German sentences.",
    theRule: [
      "Step 1: Take the infinitive verb (e.g., mach-en) and cut off the '-en'. What remains is your 'stem' (mach-).",
      "Step 2: Add the specific ending for your pronoun.",
      "ich -> -e, du -> -st, er/sie/es -> -t",
      "wir -> -en, ihr -> -t, sie/Sie -> -en",
      "Note: 'wir' and 'sie/Sie' always take the '-en' ending, which means they look exactly like the dictionary form!"
    ],
    formula: [
      "ich: stem + e (ich mache)",
      "du: stem + st (du machst)",
      "er/sie/es: stem + t (er macht)",
      "wir/sie/Sie: stem + en (wir machen)",
      "ihr: stem + t (ihr macht)"
    ],
    grammarTable: {
      headers: ["Pronoun", "Ending", "machen (to make/do)", "wohnen (to live)"],
      rows: [
        ["ich", "-e", "mache", "wohne"],
        ["du", "-st", "machst", "wohnst"],
        ["er/sie/es", "-t", "macht", "wohnt"],
        ["wir", "-en", "machen", "wohnen"],
        ["ihr", "-t", "macht", "wohnt"],
        ["sie/Sie", "-en", "machen", "wohnen"]
      ]
    },
    vocabulary: [
      { de: "machen", en: "to make / to do", example: "Was machst du?", exampleEn: "What are you doing?" },
      { de: "wohnen", en: "to live (reside)", example: "Wir wohnen in Berlin.", exampleEn: "We live in Berlin." },
      { de: "kaufen", en: "to buy", example: "Er kauft das Auto.", exampleEn: "He buys the car." },
      { de: "lernen", en: "to learn", example: "Sie lernen Deutsch.", exampleEn: "They are learning German." },
      { de: "spielen", en: "to play", example: "Ich spiele Gitarre.", exampleEn: "I play guitar." },
      { de: "hören", en: "to hear / listen", example: "Hörst du die Musik?", exampleEn: "Do you hear the music?" },
      { de: "suchen", en: "to search / look for", example: "Wir suchen den Bahnhof.", exampleEn: "We are looking for the train station." },
      { de: "brauchen", en: "to need", example: "Braucht ihr Hilfe?", exampleEn: "Do you all need help?" },
      { de: "kochen", en: "to cook", example: "Mein Vater kocht gut.", exampleEn: "My father cooks well." },
      { de: "fragen", en: "to ask", example: "Ich frage den Lehrer.", exampleEn: "I ask the teacher." }
    ],
    modelSentences: [
      {
        de: "Ich kaufe einen Kaffee.",
        en: "I buy a coffee.",
        breakdown: "Ich = I | kaufe = buy (stem: kauf + e) | einen Kaffee = a coffee → Regular verb, stem 'kauf' does not change."
      },
      {
        de: "Was kocht sie heute?",
        en: "What is she cooking today?",
        breakdown: "Was = What | kocht = cooks (stem: koch + t) | sie = she | heute = today → Regular ending '-t' for 'sie' (she)."
      },
      {
        de: "Wir suchen ein Haus und ihr sucht eine Wohnung.",
        en: "We are looking for a house and you all are looking for an apartment.",
        breakdown: "Wir = We | suchen = look for (stem: such + en) | ein Haus = a house | und = and | ihr = you all | sucht = look for (stem: such + t) | eine Wohnung = an apartment → Same stem, different endings."
      },
      {
        de: "Brauchen Sie Hilfe?",
        en: "Do you need help? (Formal)",
        breakdown: "Brauchen = Need (stem: brauch + en) | Sie = you (formal) | Hilfe = help → Formal 'Sie' always uses the '-en' ending, same as the dictionary form."
      }
    ],
    culturalNote: "A common memory trick used in German schools to remember the singular and plural endings is 'EST TEN TEN' (e, st, t - en, t, en). While native speakers don't think about these rules, failing to use the '-st' for 'du' sounds incredibly abrasive and uneducated in casual conversation.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Conjugate the regular verb in brackets.",
        items: [
          { prompt: "Du ___ (spielen) Fußball.", answer: "spielst", hint: "du ending is -st" },
          { prompt: "Er ___ (hören) Musik.", answer: "hört", hint: "er ending is -t" },
          { prompt: "Wir ___ (lernen) viel.", answer: "lernen", hint: "wir ending is -en" }
        ]
      },
      {
        type: "translate",
        instruction: "Translate the sentences to German using regular verbs.",
        items: [
          { prompt: "I am buying bread.", answer: "Ich kaufe Brot." },
          { prompt: "Do you (informal) need time?", answer: "Brauchst du Zeit?" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Er lernet Deutsch.",
        right: "Er lernt Deutsch.",
        explanation: "Adding an extra 'e' before the 't' ending. The stem is 'lern'. You just add 't'. It becomes 'lernt', not 'lernet'. (Exceptions exist for stems ending in d/t, but not for n)."
      },
      {
        wrong: "Sie macht Pizza. (meaning: They make pizza)",
        right: "Sie machen Pizza.",
        explanation: "Because 'sie' can mean 'she' or 'they', learners mix the endings. If you mean 'they', the ending MUST be '-en'."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Give me 10 regular German verbs. I will type the 'du' and 'er' forms for you to check.",
      "Ask Sky: Are there any spelling exceptions for regular verbs if the stem ends in 'd' or 't' (like 'arbeiten')?",
      "Ask Sky: Create a short story using only regular verbs in the present tense."
    ],
    examRelevance: "Schreiben Teil 1 & 2: Incorrect verb conjugation is heavily penalized in the writing section. Perfecting regular verb endings guarantees you pick up all the basic grammar points.",
    lessonGoal: "Accurately conjugate any regular verb in the present tense for all personal pronouns without hesitation."
  },
  {
    lessonNo: 15,
    titleEn: "Verb Conjugation Part 3: Irregular Verbs",
    titleDe: "Verbkonjugation Teil 3: Unregelmäßige Verben",
    introduction: "Some of the most common verbs in daily life (eating, speaking, reading) are irregular. If you invite someone to eat and use regular rules, you will say 'du esst' instead of the correct 'du isst'. These vowel changes only affect two pronouns, but getting them wrong can cause confusion and mark you as a beginner.",
    theRule: [
      "Irregular verbs change their stem vowel ONLY for 'du' (you) and 'er/sie/es' (he/she/it).",
      "The plural pronouns (wir, ihr, sie) and 'ich' behave completely normally — no vowel change.",
      "There are three main vowel shifts to memorize:",
      "1. 'e' shifts to 'i' (sprechen -> er spricht)",
      "2. 'e' shifts to 'ie' (lesen -> er liest)",
      "3. 'a' shifts to 'ä' (fahren -> er fährt)"
    ],
    formula: [
      "e -> i pattern: essen -> ich esse, du isst, er isst.",
      "e -> ie pattern: lesen -> ich lese, du liest, er liest.",
      "a -> ä pattern: schlafen -> ich schlafe, du schläfst, er schläft."
    ],
    grammarTable: {
      headers: ["Pronoun", "sprechen (e->i)", "lesen (e->ie)", "fahren (a->ä)"],
      rows: [
        ["ich", "spreche", "lese", "fahre"],
        ["du", "sprichst", "liest", "fährst"],
        ["er/sie/es", "spricht", "liest", "fährt"],
        ["wir", "sprechen", "lesen", "fahren"],
        ["ihr", "sprecht", "lest", "fahrt"],
        ["sie/Sie", "sprechen", "lesen", "fahren"]
      ]
    },
    vocabulary: [
      { de: "sprechen", en: "to speak", example: "Er spricht Deutsch.", exampleEn: "He speaks German." },
      { de: "essen", en: "to eat", example: "Sie isst Pizza.", exampleEn: "She is eating pizza." },
      { de: "helfen", en: "to help", example: "Du hilfst mir.", exampleEn: "You are helping me." },
      { de: "lesen", en: "to read", example: "Er liest ein Buch.", exampleEn: "He reads a book." },
      { de: "sehen", en: "to see", example: "Siehst du das?", exampleEn: "Do you see that?" },
      { de: "fahren", en: "to drive / travel", example: "Wir fahren nach Berlin.", exampleEn: "We are driving to Berlin." },
      { de: "schlafen", en: "to sleep", example: "Das Kind schläft.", exampleEn: "The child is sleeping." },
      { de: "laufen", en: "to run / walk", example: "Er läuft schnell.", exampleEn: "He runs fast." },
      { de: "treffen", en: "to meet", example: "Triffst du Tom heute?", exampleEn: "Are you meeting Tom today?" },
      { de: "nehmen", en: "to take", example: "Ich nehme den Bus.", exampleEn: "I take the bus." }
    ],
    modelSentences: [
      {
        de: "Ich spreche Englisch, aber er spricht Spanisch.",
        en: "I speak English, but he speaks Spanish.",
        breakdown: "Ich = I | spreche = speak (vowel stays 'e') | aber = but | er = he | spricht = speaks (vowel changes to 'i') → Only 'er' triggers the change, not 'ich'."
      },
      {
        de: "Liest du gern Bücher?",
        en: "Do you like reading books?",
        breakdown: "Liest = Read (vowel changes to 'ie', add 'st' for 'du') | du = you | gern = gladly | Bücher = books → 'e' becomes 'ie' for 'du'."
      },
      {
        de: "Wir schlafen lange, aber mein Vater schläft wenig.",
        en: "We sleep long, but my father sleeps little.",
        breakdown: "Wir = We | schlafen = sleep (vowel stays 'a' — plural pronouns never change) | aber = but | mein Vater = my father | schläft = sleeps (vowel changes to 'ä') | wenig = little → 'wir' keeps the original vowel; 'er/sie/es' changes it."
      },
      {
        de: "Nimmst du den Zug? Er nimmt das Auto.",
        en: "Are you taking the train? He takes the car.",
        breakdown: "Nimmst = Take (stem changes to 'nimm', add 'st') | du = you | den Zug = the train | Er = He | nimmt = takes (stem 'nimm' + t) | das Auto = the car → 'nehmen' is a special case — the vowel changes AND the 'm' doubles."
      }
    ],
    culturalNote: "There is no logical rule for WHY a verb is irregular; it is tied to ancient Germanic language history. However, these are the verbs you will use constantly when planning activities (eating, meeting, driving, seeing). German speakers are very forgiving of vocabulary mistakes, but saying 'du fahrst' instead of 'du fährst' sounds like nails on a chalkboard.",
    exercises: [
      {
        type: "fill_blank",
        instruction: "Apply the correct vowel change for the irregular verb.",
        items: [
          { prompt: "Tom ___ (essen) einen Apfel.", answer: "isst", hint: "e becomes i" },
          { prompt: "___ (fahren) du mit dem Zug?", answer: "Fährst", hint: "a becomes ä" },
          { prompt: "Maria ___ (sehen) den Film.", answer: "sieht", hint: "e becomes ie" }
        ]
      },
      {
        type: "choose",
        instruction: "Select the correctly conjugated form.",
        items: [
          { prompt: "Wir ( schlafen / schläfen ) hier.", answer: "schlafen" },
          { prompt: "Er ( lesen / liest / lest ) die Zeitung.", answer: "liest" }
        ]
      }
    ],
    commonMistakes: [
      {
        wrong: "Wir schläfen viel.",
        right: "Wir schlafen viel.",
        explanation: "Applying the vowel change to plural pronouns. Remember: 'wir', 'ihr', and 'sie' NEVER undergo these vowel changes."
      },
      {
        wrong: "Er nehmt das Buch.",
        right: "Er nimmt das Buch.",
        explanation: "'nehmen' (to take) is a special irregular verb. The vowel changes from 'e' to 'i', AND the 'm' doubles. It becomes 'nimmt', not 'nehmt' or 'niemt'. Just memorize this one as a fixed form."
      }
    ],
    skyPracticePrompts: [
      "Ask Sky: Can you give me a list of the 15 most important irregular verbs in A1 German and their vowel changes?",
      "Ask Sky: Give me a verb and a pronoun, and I will try to correctly conjugate it.",
      "Ask Sky: Why doesn't the verb 'gehen' (to go) have a vowel change? Is it regular?"
    ],
    examRelevance: "Sprechen Teil 2 & Hören: In the speaking test, you often have to formulate questions using irregular verbs (e.g., 'Fährst du mit dem Auto?'). If you use the wrong vowel, the examiner will note a lack of basic grammar control.",
    lessonGoal: "Correctly conjugate A1 irregular verbs by applying the e->i, e->ie, and a->ä vowel changes to the 2nd and 3rd person singular."
  }
];
