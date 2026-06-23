import { curriculumCourses, curriculumModules, type CurriculumLevelBand } from "./curriculumRegistry";

export type ProductMode = "study" | "practice" | "review" | "live";

export type ProductTrackId =
  | "foundation-english"
  | "daily-life-english"
  | "grammar-for-speaking"
  | "workplace-english"
  | "interview-english"
  | "professional-communication"
  | "fluency-pronunciation"
  | "review-mistake-repair";

export interface ProductTrack {
  id: ProductTrackId;
  title: string;
  description: string;
  primaryLevel: CurriculumLevelBand | "Mixed";
  moduleIds: string[];
}

const moduleIds = curriculumModules.map((module) => module.id);

function existing(ids: string[]) {
  return ids.filter((id) => moduleIds.includes(id));
}

export const productModes: Array<{ id: ProductMode; title: string; description: string }> = [
  {
    id: "study",
    title: "Study Mode",
    description: "Structured lessons with teaching, guided practice, correction, and progress tracking.",
  },
  {
    id: "practice",
    title: "Practice Mode",
    description: "Flexible free talk, roleplay, daily warm-ups, and general conversation practice.",
  },
  {
    id: "review",
    title: "Review Mode",
    description: "Mistake memory, recurring error repair, correction drills, and spaced review.",
  },
  {
    id: "live",
    title: "Live Mode",
    description: "Voice-based study or practice connected to the active lesson or practice goal.",
  },
];

export const productTracks: ProductTrack[] = [
  {
    id: "foundation-english",
    title: "Foundation English",
    description: "Beginner grammar, basic sentences, everyday functions, and confidence building.",
    primaryLevel: "Beginner",
    moduleIds: existing([
      "b01-sound-pronunciation-core",
      "b02-classroom-and-learning-language",
      "b03-be-verbs-and-identity",
      "b04-basic-sentence-order",
      "b05-present-simple-daily-life",
      "b06-present-continuous",
      "b07-nouns-articles-quantity",
      "b08-basic-prepositions",
      "b09-past-tense-pilot",
      "b10-future-basics",
      "b11-everyday-functions",
      "b12-beginner-fluency",
    ]),
  },
  {
    id: "daily-life-english",
    title: "Daily Life English",
    description: "Practical English for travel, shopping, appointments, family, health, and service situations.",
    primaryLevel: "Mixed",
    moduleIds: existing([
      "b11-everyday-functions",
      "i08-real-life-roleplay",
      "b12-beginner-fluency",
      "i09-storytelling-and-fluency",
      "a10-cultural-and-social-fluency",
    ]),
  },
  {
    id: "grammar-for-speaking",
    title: "Grammar for Speaking",
    description: "Grammar taught for real spoken output: tenses, questions, articles, prepositions, modals, and sentence control.",
    primaryLevel: "Mixed",
    moduleIds: existing([
      "b03-be-verbs-and-identity",
      "b04-basic-sentence-order",
      "b05-present-simple-daily-life",
      "b06-present-continuous",
      "b07-nouns-articles-quantity",
      "b08-basic-prepositions",
      "b09-past-tense-pilot",
      "b10-future-basics",
      "i01-tense-control",
      "i02-questions-and-interaction",
      "i03-sentence-expansion",
      "i04-articles-determiners-precision",
      "i05-preposition-patterns",
      "i06-modals-and-obligation",
      "a01-advanced-grammar-precision",
    ]),
  },
  {
    id: "workplace-english",
    title: "Workplace English",
    description: "Standups, blockers, status reports, clarification, disagreement, estimates, delays, and meeting summaries.",
    primaryLevel: "Intermediate",
    moduleIds: existing([
      "i07-workplace-english",
      "a02-professional-register",
      "a04-meeting-and-discussion-skills",
      "a09-negotiation-and-influence",
    ]),
  },
  {
    id: "interview-english",
    title: "Interview English",
    description: "Self-introduction, experience stories, STAR answers, system/project explanations, and senior interview communication.",
    primaryLevel: "Advanced",
    moduleIds: existing([
      "a08-interview-speaking",
      "a03-technical-communication",
      "a07-presentations-and-storytelling",
      "a05-advanced-fluency",
    ]),
  },
  {
    id: "professional-communication",
    title: "Professional Communication",
    description: "Advanced clarity, register, technical explanation, presentation, negotiation, and stakeholder communication.",
    primaryLevel: "Advanced",
    moduleIds: existing([
      "a02-professional-register",
      "a03-technical-communication",
      "a04-meeting-and-discussion-skills",
      "a06-nuance-and-vocabulary",
      "a07-presentations-and-storytelling",
      "a09-negotiation-and-influence",
    ]),
  },
  {
    id: "fluency-pronunciation",
    title: "Fluency and Pronunciation",
    description: "Sound clarity, rhythm, stress, pausing, storytelling, and spoken confidence.",
    primaryLevel: "Mixed",
    moduleIds: existing([
      "b01-sound-pronunciation-core",
      "b12-beginner-fluency",
      "i09-storytelling-and-fluency",
      "i10-opinions-discussion",
      "a05-advanced-fluency",
      "a11-advanced-pronunciation",
      "a12-mastery-review",
    ]),
  },
  {
    id: "review-mistake-repair",
    title: "Review and Mistake Repair",
    description: "Personalized mistake memory, recurring correction drills, and review checkpoints.",
    primaryLevel: "Mixed",
    moduleIds: existing([
      "i12-intermediate-review",
      "a12-mastery-review",
    ]),
  },
];

export function getProductTrackForModule(moduleId: string) {
  return productTracks.find((track) => track.moduleIds.includes(moduleId)) || null;
}

export function getModulesForTrack(trackId: ProductTrackId) {
  const track = productTracks.find((item) => item.id === trackId);
  if (!track) return [];
  return track.moduleIds.map((id) => curriculumModules.find((module) => module.id === id)).filter(Boolean);
}

export const productionCurriculumSummary = {
  modes: productModes.length,
  tracks: productTracks.length,
  legacyCourses: curriculumCourses.length,
  legacyModules: curriculumModules.length,
};
