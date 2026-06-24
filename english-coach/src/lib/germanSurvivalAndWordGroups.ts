export interface GermanSurvivalModule {
  id: string;
  titleEn: string;
  titleDe: string;
  whyNeeded: string;
  coreContent: string[];
  keyVocabulary: string[];
  practicalTips: string[];
  priority: "medium" | "high";
}

export interface GoetheWordGroup {
  id: string;
  titleDe: string;
  titleEn: string;
  examples: string[];
  examUse: string;
  dailyLifeUse: string;
}

export const germanSurvivalModules: GermanSurvivalModule[] = [
  {
    id: "survival-anmeldung",
    titleEn: "Anmeldung — Registering Your Address",
    titleDe: "Anmeldung beim Bürgeramt",
    whyNeeded: "Standard A1 courses teach housing vocabulary, but they rarely cover the actual bureaucratic Anmeldung flow that new residents need immediately.",
    coreContent: [
      "Key phrase: Ich möchte mich anmelden.",
      "Required documents: passport/ID, lease, Wohnungsgeberbestätigung.",
      "Result: Anmeldebestätigung, needed for bank account, Tax ID, and other registrations.",
    ],
    keyVocabulary: ["sich anmelden", "das Bürgeramt", "die Anmeldebestätigung", "der Mietvertrag", "die Wohnungsgeberbestätigung"],
    practicalTips: [
      "Book the Bürgeramt appointment as early as possible after signing a lease.",
      "Bring printed copies because many offices still expect paper documents.",
      "Understand Religionszugehörigkeit because it may affect church tax declarations.",
    ],
    priority: "high",
  },
  {
    id: "survival-tax-id-finanzamt",
    titleEn: "Tax ID, Tax Office and Payslips",
    titleDe: "Steuer-ID, Finanzamt und Gehaltsabrechnung",
    whyNeeded: "Tax and payroll vocabulary is usually missing from tourist-style A1 material but is essential for working residents.",
    coreContent: [
      "Steuer-ID / Steueridentifikationsnummer is issued after Anmeldung.",
      "Lohnsteuerklasse affects payroll and take-home pay.",
      "Gehaltsabrechnung includes Brutto, Netto, Lohnsteuer, Sozialversicherung.",
    ],
    keyVocabulary: ["die Steuer-ID", "das Finanzamt", "brutto", "netto", "die Lohnsteuer", "die Sozialversicherung", "die Steuererklärung"],
    practicalTips: [
      "Give your Steuer-ID to your employer as soon as you receive it.",
      "Learn Brutto vs Netto early because it appears in contracts, payslips, and salary discussions.",
    ],
    priority: "high",
  },
  {
    id: "survival-health-insurance",
    titleEn: "Health Insurance and Doctor System",
    titleDe: "Krankenversicherung und Arztbesuch",
    whyNeeded: "Health insurance is mandatory and doctor/pharmacy German is high-priority for families living in Germany.",
    coreContent: [
      "gesetzliche Krankenversicherung vs private Krankenversicherung.",
      "Bring your Gesundheitskarte to every doctor visit.",
      "Hausarzt is usually the first point of contact before a Facharzt.",
    ],
    keyVocabulary: ["die Krankenversicherung", "die Gesundheitskarte", "der Hausarzt", "der Facharzt", "die Krankenkasse"],
    practicalTips: [
      "Always bring your insurance card to medical appointments.",
      "Learn how to say symptoms simply: Ich habe Schmerzen, Mein Kind ist krank.",
    ],
    priority: "high",
  },
  {
    id: "survival-renting",
    titleEn: "Renting Deep-Dive: Kaltmiete, Nebenkosten, Kündigung",
    titleDe: "Mietrecht-Grundlagen",
    whyNeeded: "A1 apartment vocabulary is not enough to understand real German rental listings and lease terms.",
    coreContent: [
      "Kaltmiete is base rent; Nebenkosten are utility/service costs; Warmmiete is total monthly cost.",
      "Kaution is the security deposit.",
      "Kündigungsfrist is the notice period.",
    ],
    keyVocabulary: ["die Kaltmiete", "die Nebenkosten", "die Warmmiete", "die Kaution", "die Kündigung", "der Mietvertrag"],
    practicalTips: [
      "Always ask whether an advertised price is Kaltmiete or Warmmiete.",
      "Photograph the apartment condition during handover and keep an Übergabeprotokoll.",
    ],
    priority: "high",
  },
  {
    id: "survival-recycling-household",
    titleEn: "Recycling and Household Systems",
    titleDe: "Mülltrennung und Hausordnung",
    whyNeeded: "This is not an exam topic, but it is one of the first practical systems new residents encounter.",
    coreContent: [
      "Gelbe Tonne / Gelber Sack for packaging.",
      "Blaue Tonne for paper; Bio for organic waste; Restmüll for residual waste.",
      "Pfand is the bottle/can deposit-return system.",
      "Hausordnung and Ruhezeiten are important apartment-building norms.",
    ],
    keyVocabulary: ["der Müll", "die Mülltrennung", "der Pfand", "die Hausordnung", "die Ruhezeit"],
    practicalTips: [
      "Incorrect sorting can cause problems with building management or the municipality.",
      "Quiet hours and Sunday quiet norms matter socially in many buildings.",
    ],
    priority: "medium",
  },
];

export const goetheA1WordGroups: GoetheWordGroup[] = [
  {
    id: "zahlen",
    titleDe: "Zahlen",
    titleEn: "Numbers",
    examples: ["eins", "zwei", "zehn", "zwanzig", "hundert"],
    examUse: "Sprechen Teil 1, Hören prices/numbers, Lesen forms and notices.",
    dailyLifeUse: "Phone numbers, addresses, prices, appointments, and public transport.",
  },
  {
    id: "datum",
    titleDe: "Datum",
    titleEn: "Date",
    examples: ["der erste März", "Geburtsdatum", "heute", "morgen"],
    examUse: "Schreiben form filling and Hören appointment details.",
    dailyLifeUse: "Appointments, forms, deadlines, Kita/school communication.",
  },
  {
    id: "uhrzeit",
    titleDe: "Uhrzeit",
    titleEn: "Time",
    examples: ["um zehn Uhr", "halb drei", "Viertel nach zwei"],
    examUse: "Hören appointment/time questions and Sprechen scheduling.",
    dailyLifeUse: "Doctor appointments, trains, work meetings, school/Kita pickup.",
  },
  {
    id: "wochentage",
    titleDe: "Woche/Wochentage",
    titleEn: "Week/weekdays",
    examples: ["Montag", "Dienstag", "Wochenende"],
    examUse: "Listening and reading appointment/schedule tasks.",
    dailyLifeUse: "Appointments, work schedules, school/Kita messages.",
  },
  {
    id: "monate",
    titleDe: "Monat/Monatsnamen",
    titleEn: "Months",
    examples: ["Januar", "Februar", "März", "Dezember"],
    examUse: "Form filling and date comprehension.",
    dailyLifeUse: "Contracts, appointments, birthdays, official forms.",
  },
  {
    id: "waehrungen",
    titleDe: "Währungen",
    titleEn: "Currency",
    examples: ["Euro", "Cent", "bezahlen", "kosten"],
    examUse: "Hören/Lesen prices and shopping tasks.",
    dailyLifeUse: "Shops, rent, invoices, public transport tickets.",
  },
  {
    id: "laender-nationalitaeten",
    titleDe: "Länder/Ländernamen/Nationalitäten",
    titleEn: "Countries and nationalities",
    examples: ["Indien", "Deutschland", "indisch", "deutsch"],
    examUse: "Sprechen Teil 1 self-introduction and Schreiben forms.",
    dailyLifeUse: "Anmeldung, school/Kita forms, work introductions.",
  },
  {
    id: "farben",
    titleDe: "Farben",
    titleEn: "Colors",
    examples: ["rot", "blau", "grün", "schwarz", "weiß"],
    examUse: "Reading/vocabulary support for everyday item descriptions.",
    dailyLifeUse: "Shopping, clothes, signs, recycling bins.",
  },
  {
    id: "himmelsrichtungen",
    titleDe: "Himmelsrichtungen",
    titleEn: "Compass directions",
    examples: ["Norden", "Süden", "Osten", "Westen"],
    examUse: "Transport/directions vocabulary support.",
    dailyLifeUse: "Maps, travel, directions, local orientation.",
  },
];

export function getHighPrioritySurvivalModules(): GermanSurvivalModule[] {
  return germanSurvivalModules.filter((module) => module.priority === "high");
}

export function getGoetheWordGroupById(id: string): GoetheWordGroup | undefined {
  return goetheA1WordGroups.find((group) => group.id === id);
}
