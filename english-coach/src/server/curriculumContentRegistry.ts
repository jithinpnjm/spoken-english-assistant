import { getCurriculumSubsection, findModuleForSubsection, type CurriculumSubsection } from "./curriculumRegistry";
import { getPilotPastTenseContent, type CurriculumSubsectionContent, type ContentLevel } from "./pilotPastTenseContent";
import { getWorkplaceEnglishContent } from "./workplaceEnglishContent";
import { getFoundationEnglishContent } from "./foundationEnglishContent";
import { getProfessionalEnglishContent } from "./professionalEnglishContent";
import { getGrammarForSpeakingContent } from "./grammarForSpeakingContent";
import { getDailyLifeEnglishContent } from "./dailyLifeEnglishContent";
import { buildDetailedScaffoldContent } from "./detailedScaffoldContent";

function friendlyTitle(subsection: CurriculumSubsection) {
  return subsection.title.trim();
}

function moduleContext(subsectionId: string) {
  const module = findModuleForSubsection(subsectionId);
  return module?.title || "Spoken English";
}

function generatedExamples(title: string, moduleTitle: string): string[] {
  return [
    `I can practise ${title.toLowerCase()} in a short spoken sentence.`,
    `I can make this clearer using ${moduleTitle.toLowerCase()} language.`,
    `A strong version is clear, complete, and easy to say aloud.`,
    `I will answer in one full sentence and improve the corrected version.`,
  ];
}

function generatedMistakes(title: string) {
  return [
    {
      wrong: `I speaking about ${title.toLowerCase()}.`,
      right: `I am speaking about ${title.toLowerCase()}.`,
      why: "The sentence needs a complete verb structure.",
    },
    {
      wrong: "I don't know explain this clearly.",
      right: "I don't know how to explain this clearly.",
      why: "Use how to after don't know when talking about ability.",
    },
    {
      wrong: "I will correct sentence.",
      right: "I will correct the sentence.",
      why: "Use the before a specific known noun.",
    },
  ];
}

export function buildGeneratedSubsectionContent(subsectionId: string): CurriculumSubsectionContent {
  const subsection = getCurriculumSubsection(subsectionId);
  if (!subsection) throw new Error(`Unknown curriculum subsection: ${subsectionId}`);

  const title = friendlyTitle(subsection);
  const moduleTitle = moduleContext(subsectionId);

  return {
    subsectionId,
    ruleSummary: `Practise ${title.toLowerCase()} for clear spoken English in the ${moduleTitle} module.`,
    explanation: {
      Beginner: `Practise ${title.toLowerCase()} using short, complete sentences. Sky should correct one important mistake at a time.`,
      Intermediate: `Practise ${title.toLowerCase()} with natural sentence structure, clearer vocabulary, and better spoken flow.`,
      Advanced: `Practise ${title.toLowerCase()} with precision, professional tone, concise phrasing, and natural rhythm.`,
    },
    examples: generatedExamples(title, moduleTitle),
    commonMistakes: generatedMistakes(title),
    phases: subsection.phases,
    activityTemplates: {
      drill: [
        `Make one sentence using ${title.toLowerCase()}.`,
        "Rewrite the corrected version naturally.",
        "Make the sentence clearer and more complete.",
        `Answer one follow-up question about ${title.toLowerCase()}.`,
      ],
      roleplay: {
        scenario: `A focused practice for ${title}.`,
        learnerRole: `Answer in complete sentences using ${title.toLowerCase()}.`,
        agentRole: "Stay inside the lesson, correct mistakes, and guide one small practice step at a time.",
      },
    },
    successCriteria: [
      `Learner produces at least two complete sentences related to ${title.toLowerCase()}.`,
      "Learner improves one corrected sentence naturally.",
      "Learner shows improvement after correction.",
    ],
    homework: `Practise three sentences using ${title.toLowerCase()} and save the best corrected version.`,
  };
}

export function getTeachingContent(subsectionId: string): CurriculumSubsectionContent {
  return getPilotPastTenseContent(subsectionId) || getFoundationEnglishContent(subsectionId) || getWorkplaceEnglishContent(subsectionId) || getProfessionalEnglishContent(subsectionId) || getGrammarForSpeakingContent(subsectionId) || getDailyLifeEnglishContent(subsectionId) || buildDetailedScaffoldContent(subsectionId) || buildGeneratedSubsectionContent(subsectionId);
}

export function isHandAuthoredContent(subsectionId: string) {
  return Boolean(getPilotPastTenseContent(subsectionId) || getFoundationEnglishContent(subsectionId) || getWorkplaceEnglishContent(subsectionId) || getProfessionalEnglishContent(subsectionId) || getGrammarForSpeakingContent(subsectionId) || getDailyLifeEnglishContent(subsectionId));
}

export function contentLevel(level: string): ContentLevel {
  if (level === "Beginner" || level === "Advanced") return level;
  return "Intermediate";
}
