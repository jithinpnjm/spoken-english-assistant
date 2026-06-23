# Vocabulary Map A0-B1

## Purpose

German vocabulary must be stored with grammar metadata. A flat word list is not enough because German nouns need articles/plurals and many verbs require cases or prepositions.

## Vocabulary record shape

```ts
GermanVocabularyItem {
  german: string;
  article?: "der" | "die" | "das";
  plural?: string;
  english: string;
  level: "A0" | "A1" | "A2" | "B1";
  topic: string;
  examSections: GermanSkill[];
  example: string;
  casePattern?: string;
  prepositionPattern?: string;
  mistakeCount: number;
  dueForReview: boolean;
}
```

Example:

```ts
{
  german: "Termin",
  article: "der",
  plural: "Termine",
  english: "appointment",
  level: "A1",
  topic: "appointments",
  examSections: ["hoeren", "schreiben", "sprechen"],
  example: "Ich habe morgen einen Termin.",
  casePattern: "haben + accusative: einen Termin",
  mistakeCount: 0,
  dueForReview: true
}
```

## A0 vocabulary groups

- greetings
- polite phrases
- repair phrases
- numbers
- time
- days/months
- shopping
- bakery
- transport
- doctor/pharmacy
- Kita/family basics
- emergency phrases

## A1 vocabulary groups

- personal information
- family
- countries/cities
- address and phone
- work/profession
- home
- food and drink
- shopping
- appointments
- transport
- health basics
- time and date
- hobbies
- simple classroom/learning words

## A2 vocabulary groups

- daily routine
- work and office
- housing
- travel
- doctor and health
- shopping and services
- appointments and rescheduling
- family and relationships
- education and learning
- weather and environment
- problems and solutions
- opinions and preferences

## B1 vocabulary groups

- work and profession
- job applications/interviews
- housing and moving
- public administration
- insurance and appointments
- health and doctor
- family and school/Kita
- travel and transport
- environment
- technology and media
- education and learning
- opinions and arguments
- complaints and requests
- social relationships

## Review views

The app should allow vocabulary review by:

- level
- exam section
- topic
- article/gender
- due today
- high mistake count
- high-frequency exam words
- survival priority

## Drill types

- article drill: der/die/das
- plural drill
- English to German
- German to English
- fill blank in sentence
- case transformation
- preposition pattern
- speak and repeat
- dictation from audio

## Priority rule

Words used in real German survival situations should be promoted earlier even if they are not strictly exam-first.

Examples:

- Termin
- krank
- Apotheke
- Anmeldung
- Ausweis
- Versicherung
- Kita
- Rechnung
- Haltestelle
