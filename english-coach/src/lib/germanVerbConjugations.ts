export interface GermanVerbConjugation {
  infinitive: string;
  meaning: string;
  notes: string[];
  forms: Array<{
    pronoun: string;
    form: string;
    example: string;
  }>;
}

const conjugations: GermanVerbConjugation[] = [
  {
    infinitive: "trinken",
    meaning: "to drink",
    notes: ["Regular -en verb.", "Remove -en to get the stem trink-.", "Add: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en."],
    forms: [
      { pronoun: "ich", form: "trinke", example: "Ich trinke Wasser." },
      { pronoun: "du", form: "trinkst", example: "Du trinkst Kaffee." },
      { pronoun: "er/sie/es", form: "trinkt", example: "Er trinkt Tee." },
      { pronoun: "wir", form: "trinken", example: "Wir trinken Wasser." },
      { pronoun: "ihr", form: "trinkt", example: "Ihr trinkt Saft." },
      { pronoun: "sie/Sie", form: "trinken", example: "Sie trinken Kaffee." }
    ]
  },
  {
    infinitive: "kommen",
    meaning: "to come",
    notes: ["Regular -en verb.", "Stem: komm-."],
    forms: [
      { pronoun: "ich", form: "komme", example: "Ich komme aus Indien." },
      { pronoun: "du", form: "kommst", example: "Du kommst aus Berlin." },
      { pronoun: "er/sie/es", form: "kommt", example: "Sie kommt heute." },
      { pronoun: "wir", form: "kommen", example: "Wir kommen morgen." },
      { pronoun: "ihr", form: "kommt", example: "Ihr kommt später." },
      { pronoun: "sie/Sie", form: "kommen", example: "Sie kommen aus Deutschland." }
    ]
  },
  {
    infinitive: "lernen",
    meaning: "to learn",
    notes: ["Regular -en verb.", "Stem: lern-."],
    forms: [
      { pronoun: "ich", form: "lerne", example: "Ich lerne Deutsch." },
      { pronoun: "du", form: "lernst", example: "Du lernst Deutsch." },
      { pronoun: "er/sie/es", form: "lernt", example: "Er lernt Deutsch." },
      { pronoun: "wir", form: "lernen", example: "Wir lernen Deutsch." },
      { pronoun: "ihr", form: "lernt", example: "Ihr lernt Deutsch." },
      { pronoun: "sie/Sie", form: "lernen", example: "Sie lernen Deutsch." }
    ]
  },
  {
    infinitive: "machen",
    meaning: "to do / make",
    notes: ["Regular -en verb.", "Useful for hobbies and daily routine."],
    forms: [
      { pronoun: "ich", form: "mache", example: "Ich mache Sport." },
      { pronoun: "du", form: "machst", example: "Du machst Yoga." },
      { pronoun: "er/sie/es", form: "macht", example: "Sie macht Hausaufgaben." },
      { pronoun: "wir", form: "machen", example: "Wir machen Pause." },
      { pronoun: "ihr", form: "macht", example: "Ihr macht Musik." },
      { pronoun: "sie/Sie", form: "machen", example: "Sie machen einen Termin." }
    ]
  },
  {
    infinitive: "arbeiten",
    meaning: "to work",
    notes: ["Stem ends in -t: arbeit-.", "For du/er/ihr, German adds an extra -e- to make pronunciation possible: du arbeitest, er arbeitet."],
    forms: [
      { pronoun: "ich", form: "arbeite", example: "Ich arbeite in Berlin." },
      { pronoun: "du", form: "arbeitest", example: "Du arbeitest heute." },
      { pronoun: "er/sie/es", form: "arbeitet", example: "Er arbeitet viel." },
      { pronoun: "wir", form: "arbeiten", example: "Wir arbeiten morgen." },
      { pronoun: "ihr", form: "arbeitet", example: "Ihr arbeitet zusammen." },
      { pronoun: "sie/Sie", form: "arbeiten", example: "Sie arbeiten in Deutschland." }
    ]
  },
  {
    infinitive: "haben",
    meaning: "to have",
    notes: ["Irregular high-frequency verb.", "Memorize it early because it is also used for Perfekt."],
    forms: [
      { pronoun: "ich", form: "habe", example: "Ich habe einen Termin." },
      { pronoun: "du", form: "hast", example: "Du hast Zeit." },
      { pronoun: "er/sie/es", form: "hat", example: "Sie hat ein Kind." },
      { pronoun: "wir", form: "haben", example: "Wir haben Deutschkurs." },
      { pronoun: "ihr", form: "habt", example: "Ihr habt Fragen." },
      { pronoun: "sie/Sie", form: "haben", example: "Sie haben einen Termin." }
    ]
  },
  {
    infinitive: "sein",
    meaning: "to be",
    notes: ["Very irregular high-frequency verb.", "Memorize as a fixed table."],
    forms: [
      { pronoun: "ich", form: "bin", example: "Ich bin Jithin." },
      { pronoun: "du", form: "bist", example: "Du bist müde." },
      { pronoun: "er/sie/es", form: "ist", example: "Er ist in Berlin." },
      { pronoun: "wir", form: "sind", example: "Wir sind zu Hause." },
      { pronoun: "ihr", form: "seid", example: "Ihr seid hier." },
      { pronoun: "sie/Sie", form: "sind", example: "Sie sind pünktlich." }
    ]
  },
  {
    infinitive: "möchten",
    meaning: "would like",
    notes: ["Polite A1 request form.", "Very useful in shops, restaurants, appointments, and travel."],
    forms: [
      { pronoun: "ich", form: "möchte", example: "Ich möchte einen Kaffee." },
      { pronoun: "du", form: "möchtest", example: "Du möchtest Tee." },
      { pronoun: "er/sie/es", form: "möchte", example: "Sie möchte zahlen." },
      { pronoun: "wir", form: "möchten", example: "Wir möchten bestellen." },
      { pronoun: "ihr", form: "möchtet", example: "Ihr möchtet essen." },
      { pronoun: "sie/Sie", form: "möchten", example: "Sie möchten eine Fahrkarte." }
    ]
  },
  {
    infinitive: "können",
    meaning: "can / to be able to",
    notes: ["Modal verb.", "Second verb goes to the end in infinitive: Ich kann Deutsch sprechen."],
    forms: [
      { pronoun: "ich", form: "kann", example: "Ich kann Deutsch sprechen." },
      { pronoun: "du", form: "kannst", example: "Du kannst kommen." },
      { pronoun: "er/sie/es", form: "kann", example: "Er kann helfen." },
      { pronoun: "wir", form: "können", example: "Wir können warten." },
      { pronoun: "ihr", form: "könnt", example: "Ihr könnt fragen." },
      { pronoun: "sie/Sie", form: "können", example: "Sie können bezahlen." }
    ]
  },
  {
    infinitive: "fahren",
    meaning: "to go / drive / travel",
    notes: ["Stem-changing verb: a -> ä for du and er/sie/es.", "Used for transport and travel."],
    forms: [
      { pronoun: "ich", form: "fahre", example: "Ich fahre nach Berlin." },
      { pronoun: "du", form: "fährst", example: "Du fährst mit dem Bus." },
      { pronoun: "er/sie/es", form: "fährt", example: "Er fährt mit dem Zug." },
      { pronoun: "wir", form: "fahren", example: "Wir fahren morgen." },
      { pronoun: "ihr", form: "fahrt", example: "Ihr fahrt heute." },
      { pronoun: "sie/Sie", form: "fahren", example: "Sie fahren nach Hause." }
    ]
  }
];

function normalize(value: string): string {
  return value.toLowerCase();
}

export function getVerbConjugationsForLesson(input: string, limit = 3): GermanVerbConjugation[] {
  const haystack = normalize(input);
  const direct = conjugations.filter((verb) => haystack.includes(verb.infinitive) || haystack.includes(verb.meaning));

  if (direct.length > 0) return direct.slice(0, limit);

  if (haystack.includes("restaurant") || haystack.includes("trinken") || haystack.includes("essen")) return conjugations.filter((verb) => ["trinken", "möchten", "haben"].includes(verb.infinitive)).slice(0, limit);
  if (haystack.includes("taxi") || haystack.includes("train") || haystack.includes("ticket") || haystack.includes("fahr")) return conjugations.filter((verb) => ["fahren", "möchten", "können"].includes(verb.infinitive)).slice(0, limit);
  if (haystack.includes("routine") || haystack.includes("daily") || haystack.includes("tagesablauf")) return conjugations.filter((verb) => ["machen", "arbeiten", "trinken"].includes(verb.infinitive)).slice(0, limit);
  if (haystack.includes("introduc") || haystack.includes("vorstellen")) return conjugations.filter((verb) => ["sein", "kommen", "haben"].includes(verb.infinitive)).slice(0, limit);
  if (haystack.includes("modal") || haystack.includes("möchten") || haystack.includes("können")) return conjugations.filter((verb) => ["möchten", "können", "haben"].includes(verb.infinitive)).slice(0, limit);
  if (haystack.includes("verb") || haystack.includes("conjugation") || haystack.includes("konjugation")) return conjugations.filter((verb) => ["trinken", "lernen", "haben", "sein"].includes(verb.infinitive)).slice(0, limit);

  return [];
}
