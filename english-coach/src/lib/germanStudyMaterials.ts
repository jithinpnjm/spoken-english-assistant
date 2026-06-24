import type { GermanLevel, GermanSubtopic } from "./germanCurriculumRegistry";
import { findRelatedA1BookLessons, germanA1BookLessons } from "./germanA1BookLessons";

export interface GermanStudyExample { de: string; en: string; note?: string }
export interface GermanVocabularyItem { de: string; en: string; example?: string }
export interface GermanStudyMaterial {
  id: string;
  level: GermanLevel;
  subtopicId: string;
  lessonGoal: string;
  simpleExplanation: string[];
  germanPattern: string[];
  wordByWord: GermanStudyExample[];
  vocabulary: GermanVocabularyItem[];
  modelExamples: GermanStudyExample[];
  commonMistakes: string[];
  miniDrills: string[];
  speakingPrompts: string[];
  writingOrListeningTask: string;
  repeatWithLiveAgent: string[];
}

function unique<T>(items: T[]): T[] { return Array.from(new Set(items)); }

function genericSentence(seed: string): string {
  const lower = seed.toLowerCase();
  if (lower.includes("termin") || lower.includes("appointment")) return "Der Termin ist um 10 Uhr.";
  if (lower.includes("frage") || lower.includes("question")) return "Wann ist der Termin?";
  if (lower.includes("brief") || lower.includes("email")) return "Viele Grüße";
  return "Ich lerne Deutsch.";
}

function buildGenericMaterial(level: GermanLevel, subtopic: GermanSubtopic): GermanStudyMaterial {
  const vocab = subtopic.vocabularyFocus.length ? subtopic.vocabularyFocus : [subtopic.title];
  const grammar = subtopic.grammarFocus.length ? subtopic.grammarFocus : ["basic A1 sentence structure"];
  const model = genericSentence(subtopic.title);
  return {
    id: `study-${subtopic.id}`,
    level,
    subtopicId: subtopic.id,
    lessonGoal: `Learn ${subtopic.title} for daily life and Goethe-style tasks.`,
    simpleExplanation: [
      subtopic.description,
      "Understand the idea in English first. Then memorize a safe German model sentence.",
      "At beginner level, short correct sentences are better than long translated sentences."
    ],
    germanPattern: grammar.map((item) => `${item}: learn the pattern, then make one short sentence.`),
    wordByWord: [{ de: model, en: "Safe model sentence for this lesson.", note: "Repeat it aloud before changing it." }],
    vocabulary: vocab.map((item) => ({ de: item, en: "core word or phrase for this lesson", example: genericSentence(item) })),
    modelExamples: [
      { de: model, en: "Safe model sentence." },
      { de: "Können Sie das bitte wiederholen?", en: "Can you please repeat that?" }
    ],
    commonMistakes: ["Translating English word order directly.", "Skipping articles and verb position.", "Writing too much before the basic pattern is stable."],
    miniDrills: ["Say the first model sentence three times.", "Change one word in the model sentence.", "Write one short sentence from memory."],
    speakingPrompts: ["Say one sentence about yourself.", "Ask one simple question.", "Ask the Live Coach to correct pronunciation."],
    writingOrListeningTask: subtopic.goetheUse,
    repeatWithLiveAgent: [model, "Bitte langsam.", "Können Sie das bitte wiederholen?"]
  };
}

function enrichA1WithBookLessons(subtopic: GermanSubtopic, material: GermanStudyMaterial): GermanStudyMaterial {
  const related = findRelatedA1BookLessons([subtopic.title, subtopic.description, subtopic.grammarFocus.join(" "), subtopic.vocabularyFocus.join(" "), subtopic.goetheUse, subtopic.survivalUse].join(" "), 5);
  const primary = related[0];
  if (!primary) return material;

  const relatedLessonLines = related.map((lesson) => `Lesson ${lesson.lessonNo}: ${lesson.titleEn} / ${lesson.titleDe}`);
  const bookVocabulary = related.flatMap((lesson) => lesson.vocabulary).map((item) => ({ de: item.de, en: item.en, example: `${item.example} — ${item.exampleEn}` })).slice(0, 18);
  const bookModels = related.flatMap((lesson) => lesson.modelSentences).map((item) => ({ de: item.de, en: item.en, note: item.breakdown })).slice(0, 10);
  const bookMistakes = related.flatMap((lesson) => lesson.commonMistakes).map((item) => `${item.wrong} -> ${item.right}: ${item.explanation}`).slice(0, 8);
  const bookDrills = related.flatMap((lesson) => lesson.exercises).flatMap((exercise) => exercise.items.map((item) => `${exercise.instruction} ${item.prompt}`)).slice(0, 10);

  return {
    ...material,
    lessonGoal: primary.lessonGoal,
    simpleExplanation: [
      `This A1 lesson is enriched from the full A1 book bank (${germanA1BookLessons.length} lessons).`,
      `Primary source chapter: Lesson ${primary.lessonNo} — ${primary.titleEn} / ${primary.titleDe}.`,
      primary.introduction,
      "My simplified route: read the rule, memorize two safe model sentences, repeat aloud, then write one short answer.",
      ...material.simpleExplanation
    ],
    germanPattern: unique(["Related A1 book chapters:", ...relatedLessonLines, "Core book rules:", ...primary.theRule, "Formula / safe pattern:", ...primary.formula, ...material.germanPattern]),
    wordByWord: [...bookModels.slice(0, 3), ...material.wordByWord],
    vocabulary: unique([...bookVocabulary, ...material.vocabulary].map((item) => JSON.stringify(item))).map((item) => JSON.parse(item) as GermanVocabularyItem).slice(0, 24),
    modelExamples: [...bookModels, ...material.modelExamples].slice(0, 12),
    commonMistakes: unique([...bookMistakes, ...material.commonMistakes]).slice(0, 12),
    miniDrills: unique(["Memorize the first two model sentences.", "Change one noun, one time expression, and one person.", ...bookDrills, ...material.miniDrills]).slice(0, 14),
    speakingPrompts: unique([...primary.skyPracticePrompts.map((item) => item.replace("Ask Sky:", "Ask the German Live Coach:")), "Explain the rule in English, then say one German sentence.", ...material.speakingPrompts]).slice(0, 10),
    writingOrListeningTask: `${primary.examRelevance} Practice task: ${material.writingOrListeningTask}`,
    repeatWithLiveAgent: unique([...primary.modelSentences.slice(0, 4).map((item) => item.de), ...material.repeatWithLiveAgent, "Bitte korrigieren Sie meinen Satz."]).slice(0, 12)
  };
}

export function buildGermanStudyMaterial(level: GermanLevel, subtopic: GermanSubtopic): GermanStudyMaterial {
  const material = buildGenericMaterial(level, subtopic);
  return level === "A1" ? enrichA1WithBookLessons(subtopic, material) : material;
}

export const germanA1StudyLessonCount = germanA1BookLessons.length;
