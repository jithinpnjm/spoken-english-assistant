import { getCurriculumSubsection, findModuleForSubsection, type CurriculumSubsection } from "./curriculumRegistry";
import { getPilotPastTenseContent, type CurriculumSubsectionContent, type ContentLevel } from "./pilotPastTenseContent";

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
    `Let me say that more naturally using ${moduleTitle.toLowerCase()} language.`,
    `A better version is clear, complete, and easy to say aloud.`,
    `I will answer in one full sentence and then repeat the corrected version.`,
  ];
}

function generatedMistakes(title: string) {
  return [
    {
      wrong: `I speaking about ${title.toLowerCase()}.`,
      right: `I am speaking about ${title.toLowerCase()}.`,
      why: "The sentence needs a correct verb structure so it sounds complete.",
    },
    {
      wrong: `I don't know explain this clearly.`,
      right: `I don't know how to explain this clearly.`,
      why: "Use how to after don't know when talking about ability to explain something.",
    },
    {
      wrong: `Please correct my sentence and I repeat again.`,
      right: `Please correct my sentence, and I will repeat it again.`,
      why: "Use will for the next action and include the object it.",
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
      Beginner: `In this lesson, you will practise ${title.toLowerCase()} using short, complete sentences. Sky should correct one important mistake at a time and ask you to repeat the better version.`,
      Intermediate: `In this lesson, you will practise ${title.toLowerCase()} with more natural sentence structure, clearer vocabulary, and better spoken flow. Sky should correct mistakes and keep the lesson on this exact skill.`,
      Advanced: `In this lesson, you will practise ${title.toLowerCase()} with precision, professional tone, concise phrasing, and natural spoken rhythm. Sky should push for stronger wording and clearer structure.`,
    },
    examples: generatedExamples(title, moduleTitle),
    commonMistakes: generatedMistakes(title),
    phases: subsection.phases,
    activityTemplates: {
      drill: [
        `Say one sentence using ${title.toLowerCase()}.`,
        `Repeat the corrected version naturally.`,
        `Make your sentence clearer and more complete.`,
        `Answer one follow-up question about ${title.toLowerCase()}.`,
      ],
      roleplay: {
        scenario: `A focused speaking practice for ${title}.`,
        learnerRole: `Answer in complete spoken sentences using ${title.toLowerCase()}.`,
        agentRole: "Stay inside the lesson, correct mistakes, ask for repetition, and advance only when the learner is ready.",
      },
    },
    successCriteria: [
      `Learner produces at least two complete sentences related to ${title.toLowerCase()}.`,
      "Learner repeats one corrected sentence naturally.",
      "Learner shows improvement after correction.",
    ],
    homework: `Practise three spoken sentences using ${title.toLowerCase()} and repeat the corrected version aloud.`,
  };
}

export function getTeachingContent(subsectionId: string): CurriculumSubsectionContent {
  return getPilotPastTenseContent(subsectionId) || buildGeneratedSubsectionContent(subsectionId);
}

export function isHandAuthoredContent(subsectionId: string) {
  return Boolean(getPilotPastTenseContent(subsectionId));
}

export function contentLevel(level: string): ContentLevel {
  if (level === "Beginner" || level === "Advanced") return level;
  return "Intermediate";
}
