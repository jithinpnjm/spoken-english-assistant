export interface GermanA1SourceLesson {
  lessonNo: number;
  titleEn: string;
  titleDe: string;
  goetheThemeAlignment: string[];
  coreContent: string[];
  goetheVocabulary: string[];
  examRelevance: string;
  dailyLifeExtension: string[];
  commonMistakes: string[];
  youtubeResources: Array<{ title: string; channel: string; url: string; note?: string }>;
}

export const germanA1SourceLessons: GermanA1SourceLesson[] = [
  {
    "lessonNo": 1,
    "titleEn": "Greetings",
    "titleDe": "Begrüßungen",
    "goetheThemeAlignment": [
      "Person",
      "Freizeit/Unterhaltung (social contact)"
    ],
    "coreContent": [
      "Formal greetings: Guten Morgen / Guten Tag / Guten Abend",
      "Informal greetings: Hallo / Hi / Na?",
      "Farewells: Auf Wiedersehen (formal), Tschüss (informal), Bis bald / Bis später",
      "Regional variants: Servus (Bavaria/Austria), Moin (North Germany), Grüß Gott (South Germany/Austria)"
    ],
    "goetheVocabulary": [
      "hallo",
      "Guten Morgen",
      "guten Tag",
      "Auf Wiedersehen",
      "tschüss",
      "willkommen"
    ],
    "examRelevance": "Sprechen Teil 1 (self-introduction opens with a greeting); Hören Teil 1 dialogues almost always open with a greeting — recognising the register (formal/informal) signals the relationship between speakers.",
    "dailyLifeExtension": [
      "Knowing when to use Sie vs. du-register greetings avoids social friction at work, with neighbours, or at the Bürgeramt.",
      "'Moin' is used all day (not just morning) in northern Germany — useful if relocating there."
    ],
    "commonMistakes": [
      "Using 'Hallo' with officials or in formal emails — prefer 'Guten Tag' or 'Sehr geehrte/r...'",
      "Confusing 'Tschüss' (casual) with 'Auf Wiedersehen' (formal) in professional settings"
    ],
    "youtubeResources": [
      {
        "title": "Hallo! – A1 German for beginners (Nicos Weg)",
        "channel": "DW Deutsch lernen",
        "url": "https://www.youtube.com/playlist?list=PLs7zUO7VPyJ5DV1iBRgSw2uDl832n0bLg",
        "note": "Episode covering greetings within Nico's story arc"
      },
      {
        "title": "A1 Lesson 1 — Greetings | Begrüßungen",
        "channel": "Learn German Original",
        "url": "https://www.youtube.com/watch?v=RuGmc662HDg",
        "note": "Source course lesson"
      }
    ]
  }
];

export function getA1SourceLessonByNo(lessonNo: number): GermanA1SourceLesson | undefined {
  return germanA1SourceLessons.find((lesson) => lesson.lessonNo === lessonNo);
}

export function getA1SourceLessonsForSkill(): GermanA1SourceLesson[] {
  return germanA1SourceLessons;
}
