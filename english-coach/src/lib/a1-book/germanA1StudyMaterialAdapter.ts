import type { GermanSubtopic } from "../germanCurriculumRegistry";
import type { GermanStudyMaterial, GermanVocabularyItem } from "../germanStudyMaterials";
import { findRelatedA1BookLessons, germanA1BookLessons } from "./germanA1BookLessons";

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

export function enrichA1StudyMaterialWithBook(subtopic: GermanSubtopic, material: GermanStudyMaterial): GermanStudyMaterial {
  const related = findRelatedA1BookLessons([
    subtopic.title,
    subtopic.description,
    subtopic.grammarFocus.join(" "),
    subtopic.vocabularyFocus.join(" "),
    subtopic.goetheUse,
    subtopic.survivalUse
  ].join(" "), 5);
  const primary = related[0];
  if (!primary) return material;

  const bookVocabulary: GermanVocabularyItem[] = related
    .flatMap((lesson) => lesson.vocabulary)
    .map((item) => ({ de: item.de, en: item.en, example: `${item.example} — ${item.exampleEn}` }))
    .slice(0, 18);

  const bookModels = related
    .flatMap((lesson) => lesson.modelSentences)
    .map((item) => ({ de: item.de, en: item.en, note: item.breakdown }))
    .slice(0, 10);

  const bookMistakes = related
    .flatMap((lesson) => lesson.commonMistakes)
    .map((item) => `${item.wrong} -> ${item.right}: ${item.explanation}`)
    .slice(0, 8);

  const bookDrills = related
    .flatMap((lesson) => lesson.exercises)
    .flatMap((exercise) => exercise.items.map((item) => `${exercise.instruction} ${item.prompt}`))
    .slice(0, 10);

  const relatedLessonLines = related.map((lesson) => `Lesson ${lesson.lessonNo}: ${lesson.titleEn} / ${lesson.titleDe}`);

  return {
    ...material,
    lessonGoal: primary.lessonGoal,
    simpleExplanation: [
      `This Study tab is using the full A1 book bank (${germanA1BookLessons.length} lessons).`,
      `Primary source chapter: Lesson ${primary.lessonNo} — ${primary.titleEn} / ${primary.titleDe}.`,
      primary.introduction,
      "My learning route: read the rule, memorize two model sentences, repeat aloud, then write one short answer.",
      ...material.simpleExplanation
    ],
    germanPattern: unique([
      "Related A1 book chapters:",
      ...relatedLessonLines,
      "Core book rules:",
      ...primary.theRule,
      "Formula / safe pattern:",
      ...primary.formula,
      ...material.germanPattern
    ]),
    wordByWord: [...bookModels.slice(0, 3), ...material.wordByWord],
    vocabulary: unique([...bookVocabulary, ...material.vocabulary].map((item) => JSON.stringify(item))).map((item) => JSON.parse(item) as GermanVocabularyItem).slice(0, 24),
    modelExamples: [...bookModels, ...material.modelExamples].slice(0, 12),
    commonMistakes: unique([...bookMistakes, ...material.commonMistakes]).slice(0, 12),
    miniDrills: unique([
      "Memorize the first two model sentences and say them without looking.",
      "Change one noun, one time expression, and one person in the model sentence.",
      ...bookDrills,
      ...material.miniDrills
    ]).slice(0, 14),
    speakingPrompts: unique([
      ...primary.skyPracticePrompts.map((item) => item.replace("Ask Sky:", "Ask the German Live Coach:")),
      "Explain the rule back in your own English words, then say one German sentence.",
      ...material.speakingPrompts
    ]).slice(0, 10),
    writingOrListeningTask: `${primary.examRelevance} Practice task: ${material.writingOrListeningTask}`,
    repeatWithLiveAgent: unique([
      ...primary.modelSentences.slice(0, 4).map((item) => item.de),
      ...material.repeatWithLiveAgent,
      "Bitte korrigieren Sie meinen Satz.",
      "Ich möchte diese Lektion noch einmal üben."
    ]).slice(0, 12)
  };
}
