import { getCurriculumModule } from "./curriculumRegistry";
import type { CurriculumSubsectionContent } from "./pilotPastTenseContent";

const phases: CurriculumSubsectionContent["phases"] = ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"];

type DailyLifeModuleSpec = {
  moduleId: string;
  teachingFocus: string;
  learnerGoal: string;
  meaning: string;
  speakingPattern: string;
  situations: string[];
  examples: string[];
  mistakes: Array<{ wrong: string; right: string; why: string }>;
  drillFrame: string;
  roleplayScenario: string;
};

const dailyLifeSpecs: DailyLifeModuleSpec[] = [
  {
    moduleId: "i08-real-life-roleplay",
    teachingFocus: "handling everyday situations through practical roleplay",
    learnerGoal: "speak clearly in real-life situations such as shops, travel, appointments, restaurants, and service counters",
    meaning: "Real-life English is functional English: you use it to ask, request, explain, confirm, solve a small problem, or respond politely.",
    speakingPattern: "greeting or context -> clear request/problem -> useful detail -> polite closing or confirmation",
    situations: ["shopping", "restaurants", "travel", "hotel/check-in", "doctor appointment", "school/daycare", "customer support", "directions"],
    examples: [
      "Excuse me, could you help me find this address?",
      "I would like to book an appointment for tomorrow morning.",
      "Could I have a table for two, please?",
      "I am looking for a pharmacy near the station.",
      "There is a problem with my booking. Could you check it, please?",
    ],
    mistakes: [
      { wrong: "I want appointment tomorrow.", right: "I would like to book an appointment for tomorrow.", why: "Use would like to book for a polite appointment request." },
      { wrong: "Where is going train station?", right: "How can I get to the train station?", why: "Use How can I get to...? for directions." },
      { wrong: "Give me bill.", right: "Could I have the bill, please?", why: "Use polite request language in service situations." },
    ],
    drillFrame: "Make one request using: Excuse me, could you ___, please?",
    roleplayScenario: "Learner handles a practical daily-life situation with one clear request, one detail, and one polite follow-up.",
  },
  {
    moduleId: "b11-everyday-functions",
    teachingFocus: "core everyday functions: greeting, requesting, asking for help, ordering, booking, and explaining simple needs",
    learnerGoal: "use ready-to-speak sentence patterns for daily situations without translating from another language",
    meaning: "Everyday functions are sentence patterns that help you do something: ask, request, order, explain, apologize, thank, or confirm.",
    speakingPattern: "polite phrase -> simple request/information -> detail if needed",
    situations: ["greeting", "asking for help", "ordering food", "booking appointments", "shopping", "directions", "health needs"],
    examples: [
      "Could you help me, please?",
      "I would like a coffee, please.",
      "Can you repeat that, please?",
      "I need an appointment with a doctor.",
      "How much does this cost?",
    ],
    mistakes: [
      { wrong: "I want coffee.", right: "I would like a coffee, please.", why: "Would like is more polite in service situations." },
      { wrong: "How much this?", right: "How much is this?", why: "Use is in the question." },
      { wrong: "Help me this.", right: "Could you help me with this?", why: "Use help me with this." },
    ],
    drillFrame: "Use one everyday function: Could you ___? / I would like ___ / I need ___.",
    roleplayScenario: "Learner practises a practical everyday function in a short service or social situation.",
  },
  {
    moduleId: "i09-storytelling-and-fluency",
    teachingFocus: "telling simple daily stories with sequence, reason, and feeling",
    learnerGoal: "tell a short story about yesterday, travel, family, work, or a small problem in connected sentences",
    meaning: "Storytelling helps you speak beyond one sentence. A clear story has time, place, action, result, and feeling.",
    speakingPattern: "time/place -> what happened -> what you did -> result -> feeling or learning",
    situations: ["yesterday story", "travel story", "family event", "work incident", "shopping problem", "weekend story"],
    examples: [
      "Yesterday I went to the supermarket because we needed some groceries.",
      "At first, I could not find the item, so I asked a staff member for help.",
      "Then I found it near the checkout area.",
      "It took more time than expected, but I was happy to finish it.",
      "Next time, I will check the store map first.",
    ],
    mistakes: [
      { wrong: "Yesterday I go supermarket and buy things.", right: "Yesterday I went to the supermarket and bought some things.", why: "Use past forms for finished time: went, bought." },
      { wrong: "Then after I ask help.", right: "Then I asked for help.", why: "Use asked for help as a natural phrase." },
      { wrong: "I was happy because finished.", right: "I was happy because I finished it.", why: "Use a subject after because." },
    ],
    drillFrame: "Tell a short story using: Yesterday / First / Then / Finally / I felt ___.",
    roleplayScenario: "Learner tells a short daily-life story and Sky helps improve sequence, tense, and natural phrasing.",
  },
  {
    moduleId: "i10-opinions-discussion",
    teachingFocus: "giving simple opinions, reasons, agreement, disagreement, and follow-up questions",
    learnerGoal: "share opinions politely and continue a discussion without stopping after one sentence",
    meaning: "Opinion English helps you say what you think, why you think it, and how you respond to another person respectfully.",
    speakingPattern: "opinion phrase -> reason -> example -> follow-up question or soft contrast",
    situations: ["food preferences", "travel plans", "family choices", "work preferences", "shopping decisions", "social discussion"],
    examples: [
      "I think public transport is convenient because it is cheaper than driving.",
      "In my opinion, morning practice is better because I can focus more.",
      "I agree with you, but I also think we need more time.",
      "I prefer simple food because it is easier for daily life.",
      "What do you think about this option?",
    ],
    mistakes: [
      { wrong: "According to me, this is good.", right: "In my opinion, this is good.", why: "Use In my opinion for personal views." },
      { wrong: "I am agree.", right: "I agree.", why: "Agree is a verb; do not use am." },
      { wrong: "I like because cheap.", right: "I like it because it is cheap.", why: "Use a complete reason after because." },
    ],
    drillFrame: "Give one opinion using: I think ___ because ___.",
    roleplayScenario: "Learner discusses a daily-life choice and gives reasons, agreement, or polite disagreement.",
  },
  {
    moduleId: "b12-beginner-fluency",
    teachingFocus: "basic connected speaking for daily topics",
    learnerGoal: "speak for 30-60 seconds about common topics using short connected sentences",
    meaning: "Beginner fluency means clear, connected speech. It does not mean speaking fast. It means using small sentence chunks with simple connectors.",
    speakingPattern: "main idea -> detail -> reason/example -> closing sentence",
    situations: ["self-introduction", "family", "home", "food", "weather", "travel", "daily routine"],
    examples: [
      "I live in Berlin, and I like my neighborhood.",
      "My home is quiet, so I can relax there.",
      "I usually drink tea in the morning because it helps me start the day.",
      "The weather is cold today, but I still want to go outside.",
      "On weekends, I like spending time with my family.",
    ],
    mistakes: [
      { wrong: "I no speak long.", right: "I cannot speak for a long time yet.", why: "Use cannot + base verb for ability." },
      { wrong: "I like food because tasty.", right: "I like this food because it is tasty.", why: "Use a complete clause after because." },
      { wrong: "My home very good.", right: "My home is very nice.", why: "Use is before an adjective." },
    ],
    drillFrame: "Speak/type four short sentences: main idea + detail + reason + closing.",
    roleplayScenario: "Learner speaks about one daily topic for 30-60 seconds and improves it after correction.",
  },
];

function buildContentForSpec(spec: DailyLifeModuleSpec): CurriculumSubsectionContent[] {
  const module = getCurriculumModule(spec.moduleId);
  if (!module) throw new Error(`Missing Daily Life module ${spec.moduleId}`);
  return module.subsections.map((subsection) => {
    const lessonTitle = subsection.title;
    return {
      subsectionId: subsection.id,
      ruleSummary: `Practise ${lessonTitle.toLowerCase()} for practical daily-life communication: ${spec.teachingFocus}.`,
      explanation: {
        Beginner: `Today we are learning ${lessonTitle}. Goal: ${spec.learnerGoal}. Meaning: ${spec.meaning} Speaking pattern: ${spec.speakingPattern}.`,
        Intermediate: `${lessonTitle} helps you handle real situations more naturally. Goal: ${spec.learnerGoal}. Use this speaking pattern: ${spec.speakingPattern}. Practise in situations like ${spec.situations.slice(0, 4).join(", ")}.`,
        Advanced: `${lessonTitle} should be taught with natural phrasing, concise detail, polite tone, and flexible follow-up. Core speaking pattern: ${spec.speakingPattern}.`,
      },
      examples: [
        ...spec.examples,
        `Teacher model for this lesson: ${lessonTitle} becomes easier when the learner uses a clear request, detail, and follow-up.`,
      ],
      commonMistakes: spec.mistakes,
      phases,
      activityTemplates: {
        drill: [
          `Mini check: choose the most natural sentence for ${lessonTitle}.`,
          spec.drillFrame,
          `Repair one daily-life mistake connected to ${lessonTitle}.`,
          `Rewrite or repeat the improved sentence naturally.`,
        ],
        roleplay: {
          scenario: spec.roleplayScenario,
          learnerRole: `Practise ${lessonTitle} with one practical sentence first, then respond to one realistic follow-up.`,
          agentRole: "Teach first, model the situation, give one useful phrase, guide one small attempt, then run a short roleplay.",
        },
      },
      successCriteria: [
        `Understands when to use ${lessonTitle}.`,
        "Can recognise a polite/natural daily-life sentence.",
        "Can produce one practical sentence using the target pattern.",
        "Can handle one follow-up question in the same situation.",
      ],
      homework: `Prepare three practical sentences for ${lessonTitle.toLowerCase()} using the pattern: ${spec.speakingPattern}`,
    };
  });
}

export const dailyLifeEnglishContent: CurriculumSubsectionContent[] = dailyLifeSpecs.flatMap(buildContentForSpec);

export const dailyLifeEnglishModuleIds = dailyLifeSpecs.map((spec) => spec.moduleId);

export function getDailyLifeEnglishContent(subsectionId: string): CurriculumSubsectionContent | undefined {
  return dailyLifeEnglishContent.find((item) => item.subsectionId === subsectionId);
}
