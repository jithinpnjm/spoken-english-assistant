import { getCurriculumModule } from "./curriculumRegistry";
import type { CurriculumSubsectionContent } from "./pilotPastTenseContent";

const phases: CurriculumSubsectionContent["phases"] = ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"];

type GrammarModuleSpec = {
  moduleId: string;
  teachingFocus: string;
  learnerGoal: string;
  meaning: string;
  spokenPattern: string;
  situations: string[];
  examples: string[];
  mistakes: Array<{ wrong: string; right: string; why: string }>;
  drillFrame: string;
  roleplayScenario: string;
};

const grammarSpecs: GrammarModuleSpec[] = [
  {
    moduleId: "i01-tense-control",
    teachingFocus: "choosing and maintaining the correct tense while speaking",
    learnerGoal: "explain past, present, and future ideas without mixing tense forms in the same answer",
    meaning: "Tense control tells the listener when something happens and whether it is a habit, current action, completed event, or future plan.",
    spokenPattern: "time idea first -> correct tense -> consistent follow-up sentence",
    situations: ["project updates", "daily routines", "travel stories", "future plans", "interview examples"],
    examples: [
      "I usually work from home, but today I am working from the office.",
      "Yesterday I fixed the issue and updated the team.",
      "Next week I am going to prepare the release plan.",
      "I have worked on similar problems before.",
      "When the incident happened, we checked the logs first.",
    ],
    mistakes: [
      { wrong: "Yesterday I go office and check logs.", right: "Yesterday I went to the office and checked the logs.", why: "Use past forms when the time is finished." },
      { wrong: "Now I work on this issue.", right: "Now I am working on this issue.", why: "Use present continuous for an action happening now." },
      { wrong: "Tomorrow I will going.", right: "Tomorrow I will go.", why: "Use base verb after will." },
    ],
    drillFrame: "Choose the time first, then make one sentence: yesterday / now / usually / tomorrow.",
    roleplayScenario: "Learner gives a work or daily-life update using the correct tense for each time idea.",
  },
  {
    moduleId: "i02-questions-and-interaction",
    teachingFocus: "asking clear questions and keeping a conversation moving",
    learnerGoal: "ask grammatically correct questions and use follow-up questions naturally",
    meaning: "Questions help you get information, clarify meaning, continue conversation, and check understanding.",
    spokenPattern: "question word or auxiliary -> subject -> main verb -> detail",
    situations: ["clarifying tasks", "asking directions", "meetings", "interviews", "daily conversation"],
    examples: [
      "Could you explain the requirement again?",
      "What time does the meeting start?",
      "Did you check the latest logs?",
      "How long will this task take?",
      "What should I do next?",
    ],
    mistakes: [
      { wrong: "What you are doing?", right: "What are you doing?", why: "In questions, put are before the subject." },
      { wrong: "You checked the logs?", right: "Did you check the logs?", why: "Use did for simple past questions." },
      { wrong: "When meeting start?", right: "When does the meeting start?", why: "Use does for present simple questions with it/the meeting." },
    ],
    drillFrame: "Ask one clear question using: What / When / Did / Could / How long.",
    roleplayScenario: "Learner asks clarification questions in a meeting or everyday situation.",
  },
  {
    moduleId: "i03-sentence-expansion",
    teachingFocus: "expanding short answers into clear connected speech",
    learnerGoal: "speak beyond one short sentence using reasons, examples, and contrast",
    meaning: "Sentence expansion helps the listener understand not only what happened, but why it matters and what the result was.",
    spokenPattern: "main sentence -> reason -> example/result -> optional contrast",
    situations: ["status updates", "storytelling", "interviews", "opinions", "daily-life explanations"],
    examples: [
      "I prefer morning meetings because I can focus better early in the day.",
      "The task was difficult, but we finished it by simplifying the rollout.",
      "I learned a new tool, and it helped me automate repeated work.",
      "The train was delayed, so we changed our plan.",
      "I like this approach because it is simple and easier to maintain.",
    ],
    mistakes: [
      { wrong: "I like because good.", right: "I like it because it is good.", why: "Use a subject after because and complete the idea." },
      { wrong: "Task difficult but completed.", right: "The task was difficult, but we completed it.", why: "Use a subject and verb in both parts." },
      { wrong: "I explain this for understand.", right: "I will explain this so you can understand it.", why: "Use so + subject + can for purpose." },
    ],
    drillFrame: "Expand one sentence using because / so / but / and then.",
    roleplayScenario: "Learner gives a longer answer and Sky helps connect ideas naturally.",
  },
  {
    moduleId: "i04-articles-determiners-precision",
    teachingFocus: "using articles and determiners accurately in spoken English",
    learnerGoal: "sound clearer when talking about one item, specific items, general things, and quantities",
    meaning: "Articles and determiners tell the listener whether something is new, known, specific, general, singular, plural, or a quantity.",
    spokenPattern: "a/an for one new countable thing, the for a specific known thing, this/that/these/those for pointing, some/any for amount",
    situations: ["shopping", "work objects", "technical items", "daily conversation", "describing problems"],
    examples: [
      "I found an issue in the configuration.",
      "The issue started after the deployment.",
      "This approach is simpler than the previous one.",
      "We need some time to verify the fix.",
      "There are a few changes in the release.",
    ],
    mistakes: [
      { wrong: "I found issue.", right: "I found an issue.", why: "Use a/an with one countable noun introduced for the first time." },
      { wrong: "Deployment caused problem, problem is fixed.", right: "The deployment caused a problem, and the problem is fixed.", why: "Use a for first mention and the after the listener knows it." },
      { wrong: "I need some information?", right: "Do you have any information?", why: "Use any in many questions." },
    ],
    drillFrame: "Choose a/an/the/this/some/any and make one sentence.",
    roleplayScenario: "Learner explains an object, issue, or daily need using accurate articles and determiners.",
  },
  {
    moduleId: "i05-preposition-patterns",
    teachingFocus: "common preposition patterns for work, time, place, and communication",
    learnerGoal: "use natural preposition chunks instead of translating word-by-word",
    meaning: "Prepositions often work as fixed patterns. Learning chunks is more reliable than memorizing one-word translations.",
    spokenPattern: "verb/adjective/noun + common preposition chunk",
    situations: ["meetings", "status updates", "travel", "technical explanations", "daily scheduling"],
    examples: [
      "I am working on the task.",
      "We discussed the issue in the meeting.",
      "The service is running in production.",
      "I am responsible for the deployment.",
      "The meeting is at 3 p.m. on Friday.",
    ],
    mistakes: [
      { wrong: "I am working in this task.", right: "I am working on this task.", why: "Use work on a task." },
      { wrong: "We discussed about the issue.", right: "We discussed the issue.", why: "Discuss does not need about." },
      { wrong: "I am responsible of deployment.", right: "I am responsible for the deployment.", why: "Use responsible for." },
    ],
    drillFrame: "Complete one chunk: work on / responsible for / interested in / good at / depends on.",
    roleplayScenario: "Learner gives a work or daily-life update using natural preposition patterns.",
  },
  {
    moduleId: "i06-modals-and-obligation",
    teachingFocus: "modals for ability, possibility, obligation, advice, and polite requests",
    learnerGoal: "express what is possible, necessary, allowed, recommended, or requested without sounding too direct",
    meaning: "Modals change the force of a sentence: can for ability, could for polite possibility, should for advice, must/have to for obligation, may/might for uncertainty.",
    spokenPattern: "modal + base verb; have to + base verb; should + base verb",
    situations: ["requests", "advice", "rules", "planning", "risk discussion", "work coordination"],
    examples: [
      "Could you review this when you have time?",
      "We should test this before release.",
      "I have to finish this task today.",
      "The issue might happen again if we do not fix the root cause.",
      "Can I ask one question?",
    ],
    mistakes: [
      { wrong: "You should to check this.", right: "You should check this.", why: "Use base verb after should, without to." },
      { wrong: "I must to go.", right: "I must go.", why: "Use base verb after must." },
      { wrong: "Can you to help me?", right: "Can you help me?", why: "Use base verb after can." },
    ],
    drillFrame: "Make one sentence using can / could / should / have to / might.",
    roleplayScenario: "Learner gives advice, asks politely, or explains obligation in a work or daily-life situation.",
  },
];

function buildContentForSpec(spec: GrammarModuleSpec): CurriculumSubsectionContent[] {
  const module = getCurriculumModule(spec.moduleId);
  if (!module) throw new Error(`Missing Grammar for Speaking module ${spec.moduleId}`);
  return module.subsections.map((subsection) => {
    const lessonTitle = subsection.title;
    return {
      subsectionId: subsection.id,
      ruleSummary: `Use ${lessonTitle.toLowerCase()} for spoken accuracy: ${spec.teachingFocus}.`,
      explanation: {
        Beginner: `Today we are learning ${lessonTitle}. Goal: ${spec.learnerGoal}. Meaning: ${spec.meaning} Spoken pattern: ${spec.spokenPattern}.`,
        Intermediate: `${lessonTitle} helps you speak more accurately and naturally. Goal: ${spec.learnerGoal}. Use this spoken pattern: ${spec.spokenPattern}. Practise in situations like ${spec.situations.slice(0, 4).join(", ")}.`,
        Advanced: `${lessonTitle} should be taught for precision, natural spoken rhythm, self-correction, and register control. Core spoken pattern: ${spec.spokenPattern}.`,
      },
      examples: [
        ...spec.examples,
        `Teacher model for this lesson: ${lessonTitle} becomes easier when the speaker chooses the pattern before speaking.`,
      ],
      commonMistakes: spec.mistakes,
      phases,
      activityTemplates: {
        drill: [
          `Mini check: choose the correct sentence for ${lessonTitle}.`,
          spec.drillFrame,
          `Repair one mistake connected to ${lessonTitle}.`,
          `Rewrite the improved version naturally in chat or repeat it in live mode.`,
        ],
        roleplay: {
          scenario: spec.roleplayScenario,
          learnerRole: `Practise ${lessonTitle} with one guided sentence, then one natural follow-up answer.`,
          agentRole: "Teach first, model the pattern, show one common mistake, guide one small attempt, then correct precisely.",
        },
      },
      successCriteria: [
        `Understands the spoken purpose of ${lessonTitle}.`,
        "Can recognise the correct grammar pattern before producing a sentence.",
        "Can produce one guided answer using the target pattern.",
        "Can rewrite one corrected sentence naturally and explain the rule briefly.",
      ],
      homework: `Prepare three spoken sentences using ${lessonTitle.toLowerCase()} and the pattern: ${spec.spokenPattern}`,
    };
  });
}

export const grammarForSpeakingContent: CurriculumSubsectionContent[] = grammarSpecs.flatMap(buildContentForSpec);

export const grammarForSpeakingModuleIds = grammarSpecs.map((spec) => spec.moduleId);

export function getGrammarForSpeakingContent(subsectionId: string): CurriculumSubsectionContent | undefined {
  return grammarForSpeakingContent.find((item) => item.subsectionId === subsectionId);
}
