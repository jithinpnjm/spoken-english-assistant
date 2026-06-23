import { getCurriculumModule } from "./curriculumRegistry";
import type { CurriculumSubsectionContent } from "./pilotPastTenseContent";

const phases: CurriculumSubsectionContent["phases"] = ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"];

type FoundationModuleSpec = {
  moduleId: string;
  teachingFocus: string;
  learnerGoal: string;
  meaning: string;
  pattern: string;
  situations: string[];
  examples: string[];
  mistakes: Array<{ wrong: string; right: string; why: string }>;
  drillFrame: string;
  roleplayScenario: string;
};

const foundationSpecs: FoundationModuleSpec[] = [
  {
    moduleId: "b01-sound-pronunciation-core",
    teachingFocus: "clear English sounds, stress, rhythm, and listening-repeat confidence",
    learnerGoal: "hear and produce short English chunks clearly enough for daily conversation",
    meaning: "Pronunciation is not about sounding native. It is about being understandable, using clear sounds, stress, pauses, and question melody.",
    pattern: "Listen -> notice one sound/stress point -> say a short chunk -> repeat the improved version.",
    situations: ["spelling your name", "asking questions", "repeating a sentence", "saying common daily words clearly"],
    examples: ["My name is Sandra.", "Could you repeat that, please?", "I live in Berlin.", "Where is the station?", "I need a little time."],
    mistakes: [
      { wrong: "I speak fast for fluent.", right: "I speak clearly to sound fluent.", why: "Fluency is clarity plus rhythm, not speed." },
      { wrong: "I no pause.", right: "I need to pause between ideas.", why: "Use need to and practise natural pauses." },
      { wrong: "All words same strong.", right: "Important words should be stronger.", why: "English uses sentence stress to show meaning." },
    ],
    drillFrame: "Say the sentence slowly first, then naturally: ___",
    roleplayScenario: "Teacher helps the learner repeat short chunks with better sound, stress, and rhythm.",
  },
  {
    moduleId: "b02-classroom-and-learning-language",
    teachingFocus: "language for learning, asking the teacher, and repairing confusion",
    learnerGoal: "ask for help during lessons instead of getting stuck silently",
    meaning: "Learning language helps you control the class: ask for repetition, examples, pronunciation help, and more time.",
    pattern: "Polite starter + exact learning need. Example: Could you repeat that, please?",
    situations: ["not understanding", "asking for examples", "checking pronunciation", "asking for more time"],
    examples: ["I don't understand this word.", "Could you repeat that, please?", "How do I say this in English?", "Can you give me one example?", "I need a little more time."],
    mistakes: [
      { wrong: "I didn't understood.", right: "I didn't understand.", why: "After didn't, use the base verb understand." },
      { wrong: "Repeat me please.", right: "Could you repeat that, please?", why: "Use repeat that, not repeat me, when asking to hear again." },
      { wrong: "Explain me this.", right: "Could you explain this to me?", why: "Use explain something to someone." },
    ],
    drillFrame: "Ask Sky for help using: Could you ___, please?",
    roleplayScenario: "Learner is in class and needs help understanding or repeating something.",
  },
  {
    moduleId: "b03-be-verbs-and-identity",
    teachingFocus: "be verbs for identity, personal details, places, and simple descriptions",
    learnerGoal: "introduce yourself and describe people/things with am, is, and are",
    meaning: "The be verb connects a person or thing to identity, place, feeling, age, job, or description.",
    pattern: "I am / You are / He is / She is / It is / We are / They are + information.",
    situations: ["self-introduction", "family details", "jobs", "nationality", "where someone is"],
    examples: ["I am Sandra.", "She is my daughter.", "We are from India.", "He is an engineer.", "They are at home."],
    mistakes: [
      { wrong: "I Sandra.", right: "I am Sandra.", why: "English needs a verb. Use am after I." },
      { wrong: "She are my wife.", right: "She is my wife.", why: "Use is with she." },
      { wrong: "They is at home.", right: "They are at home.", why: "Use are with they." },
    ],
    drillFrame: "Complete the sentence: I am ___ / She is ___ / They are ___.",
    roleplayScenario: "Learner introduces herself and family using be verbs correctly.",
  },
  {
    moduleId: "b04-basic-sentence-order",
    teachingFocus: "simple English word order and complete spoken sentences",
    learnerGoal: "make short complete sentences without missing verbs or translating word-by-word",
    meaning: "English sentences usually need a clear subject, verb, and sometimes object or extra information.",
    pattern: "Subject + verb + object/place/time. Example: I eat breakfast at home.",
    situations: ["daily actions", "describing things", "simple opinions", "repairing broken sentences"],
    examples: ["I drink coffee.", "She likes music.", "We live in Berlin.", "The baby is sleeping.", "I need help today."],
    mistakes: [
      { wrong: "I coffee drink.", right: "I drink coffee.", why: "English usually uses subject + verb + object." },
      { wrong: "Very good this food.", right: "This food is very good.", why: "Use subject + be verb + adjective." },
      { wrong: "My husband working.", right: "My husband is working.", why: "Present continuous needs is/are/am + verb-ing." },
    ],
    drillFrame: "Make one sentence with: subject + verb + object/place/time.",
    roleplayScenario: "Teacher gives broken sentences and learner repairs them into natural English order.",
  },
  {
    moduleId: "b05-present-simple-daily-life",
    teachingFocus: "present simple for habits, routines, facts, and regular activities",
    learnerGoal: "talk about daily life, family routines, and work routines clearly",
    meaning: "Present simple talks about things that happen regularly or are generally true.",
    pattern: "I/you/we/they + base verb. He/she/it + verb-s. Questions use do/does.",
    situations: ["morning routine", "family routine", "workday", "likes/dislikes", "frequency"],
    examples: ["I wake up at seven.", "She works from home.", "We eat dinner together.", "Do you drink tea?", "He does not eat meat."],
    mistakes: [
      { wrong: "She work from home.", right: "She works from home.", why: "Use verb-s with he/she/it in present simple." },
      { wrong: "Do she cook?", right: "Does she cook?", why: "Use does with he/she/it questions." },
      { wrong: "I am go every day.", right: "I go every day.", why: "Use base verb for present simple, not am + verb." },
    ],
    drillFrame: "Use this frame: I usually ___ / She usually ___.",
    roleplayScenario: "Learner explains a normal day and teacher asks simple routine questions.",
  },
  {
    moduleId: "b06-present-continuous",
    teachingFocus: "present continuous for actions happening now and temporary situations",
    learnerGoal: "describe what people are doing now and contrast today with usually",
    meaning: "Present continuous talks about an action happening now, around now, or temporarily.",
    pattern: "am/is/are + verb-ing. Example: I am cooking. She is working.",
    situations: ["what is happening now", "temporary work", "describing family actions", "today vs usually"],
    examples: ["I am cooking now.", "She is sleeping.", "We are waiting for the bus.", "He is working from home today.", "They are watching TV."],
    mistakes: [
      { wrong: "I cooking now.", right: "I am cooking now.", why: "Present continuous needs am/is/are before verb-ing." },
      { wrong: "She is cook dinner.", right: "She is cooking dinner.", why: "Use verb-ing after is." },
      { wrong: "I am usually drink tea.", right: "I usually drink tea.", why: "Use present simple for habits with usually." },
    ],
    drillFrame: "Describe now: I am ___ing / She is ___ing / They are ___ing.",
    roleplayScenario: "Teacher asks what people are doing in a picture or at home now.",
  },
  {
    moduleId: "b07-nouns-articles-quantity",
    teachingFocus: "nouns, a/an/the, plurals, and quantity words for daily speech",
    learnerGoal: "use articles and quantities naturally when talking about things, food, shopping, and home",
    meaning: "Articles and quantity words help listeners know whether you mean one thing, a specific thing, or an amount.",
    pattern: "a/an + one general singular thing; the + specific thing; plural -s for more than one; some/any/much/many for quantity.",
    situations: ["shopping", "food", "home objects", "asking for things", "describing quantity"],
    examples: ["I need a bag.", "The bag is on the table.", "We have two apples.", "Do you have any milk?", "There is some rice."],
    mistakes: [
      { wrong: "I need apple.", right: "I need an apple.", why: "Use a/an with one singular countable noun." },
      { wrong: "I bought two book.", right: "I bought two books.", why: "Use plural -s after numbers above one." },
      { wrong: "How many water?", right: "How much water?", why: "Use much with uncountable nouns like water." },
    ],
    drillFrame: "Choose a/an/the/some/any: I need ___ ___.",
    roleplayScenario: "Learner asks for items in a shop or kitchen using correct articles and quantity words.",
  },
  {
    moduleId: "b08-basic-prepositions",
    teachingFocus: "basic prepositions for place, time, movement, travel, and work speech",
    learnerGoal: "say where something is, when something happens, and where someone goes",
    meaning: "Prepositions are small words that show place, time, direction, connection, or purpose.",
    pattern: "in/on/at for place and time; to/from for direction; with/without for connection.",
    situations: ["home location", "meeting times", "travel", "work location", "appointments"],
    examples: ["I am in the kitchen.", "The keys are on the table.", "I have a meeting at 10.", "I go to the office.", "I came from India."],
    mistakes: [
      { wrong: "I am in home.", right: "I am at home.", why: "Use at home, not in home." },
      { wrong: "Meeting is on 10 o'clock.", right: "The meeting is at 10 o'clock.", why: "Use at for clock time." },
      { wrong: "I go in office.", right: "I go to the office.", why: "Use to for direction/movement." },
    ],
    drillFrame: "Choose the preposition: in / on / at / to / from / with.",
    roleplayScenario: "Learner gives directions, appointment times, or travel information using prepositions.",
  },
  {
    moduleId: "b10-future-basics",
    teachingFocus: "simple future language for plans, quick decisions, needs, and appointments",
    learnerGoal: "talk about tomorrow, next week, plans, appointments, and simple future decisions",
    meaning: "Future language helps you talk about things after now: plans, decisions, needs, and appointments.",
    pattern: "going to + verb for plans; will + verb for quick decisions; want/need/have to + verb for intentions and obligations.",
    situations: ["weekend plans", "appointments", "travel plans", "shopping plans", "family plans"],
    examples: ["I am going to visit my friend tomorrow.", "I will call you later.", "I need to book an appointment.", "We are going to travel next week.", "Will you come tomorrow?"],
    mistakes: [
      { wrong: "I going to market tomorrow.", right: "I am going to the market tomorrow.", why: "Use am/is/are before going to." },
      { wrong: "I will to call you.", right: "I will call you.", why: "Use base verb after will, without to." },
      { wrong: "Tomorrow I go doctor.", right: "Tomorrow I am going to the doctor.", why: "Use going to for a planned appointment." },
    ],
    drillFrame: "Make a future sentence: Tomorrow, I am going to ___.",
    roleplayScenario: "Learner talks about plans and appointments for tomorrow or next week.",
  },
  {
    moduleId: "b11-everyday-functions",
    teachingFocus: "useful everyday speaking functions for help, directions, food, shopping, health, and small talk",
    learnerGoal: "handle simple real-life situations politely and clearly",
    meaning: "Everyday functions are sentence patterns we use to do something: greet, ask, order, book, explain, or respond.",
    pattern: "Polite starter + clear request/information. Example: Could I have...? / I would like... / Can you help me...?",
    situations: ["introductions", "asking for help", "directions", "ordering food", "shopping", "appointments", "doctor visit"],
    examples: ["Could you help me, please?", "I would like a coffee.", "How much is this?", "I need an appointment.", "I have a stomach pain."],
    mistakes: [
      { wrong: "Give me coffee.", right: "Could I have a coffee, please?", why: "Use polite request language in service situations." },
      { wrong: "Where station?", right: "Where is the station?", why: "Use a complete question with is." },
      { wrong: "I want doctor.", right: "I need to see a doctor.", why: "Use a natural phrase for health needs." },
    ],
    drillFrame: "Use a polite request: Could I have ___, please? / Could you help me with ___?",
    roleplayScenario: "Learner handles a daily-life situation such as ordering food, shopping, asking directions, or booking an appointment.",
  },
  {
    moduleId: "b12-beginner-fluency",
    teachingFocus: "beginner fluency for short personal answers and one-minute speaking",
    learnerGoal: "speak about family, home, work, food, travel, and weather in simple connected sentences",
    meaning: "Beginner fluency means speaking in short, clear chunks without stopping after every word.",
    pattern: "Main idea -> one detail -> one example. Use simple connectors: and, but, because, then.",
    situations: ["self-introduction", "family", "home", "work", "food", "travel", "weather"],
    examples: ["My name is Sandra, and I live in Berlin.", "I have one child, and she is small.", "I like Indian food because it is tasty.", "I work at home today.", "The weather is cold, but I like walking."],
    mistakes: [
      { wrong: "Myself Sandra.", right: "My name is Sandra.", why: "Use My name is for self-introduction." },
      { wrong: "I am having one child.", right: "I have one child.", why: "Use have for family relationships." },
      { wrong: "I no words.", right: "I cannot find the right words.", why: "Use a natural sentence for speaking difficulty." },
    ],
    drillFrame: "Speak/type three connected sentences: main idea + detail + example.",
    roleplayScenario: "Learner gives a short personal answer, then improves it after correction.",
  },
];

function buildContentForSpec(spec: FoundationModuleSpec): CurriculumSubsectionContent[] {
  const module = getCurriculumModule(spec.moduleId);
  if (!module) throw new Error(`Missing foundation module ${spec.moduleId}`);
  return module.subsections.map((subsection) => {
    const lessonTitle = subsection.title;
    return {
      subsectionId: subsection.id,
      ruleSummary: `Learn ${lessonTitle.toLowerCase()} as part of ${spec.teachingFocus}.`,
      explanation: {
        Beginner: `Today we are learning ${lessonTitle}. Goal: ${spec.learnerGoal}. Meaning: ${spec.meaning} Pattern: ${spec.pattern} Use it in situations like ${spec.situations.slice(0, 3).join(", ")}.`,
        Intermediate: `${lessonTitle} helps you speak more accurately and naturally. Focus on the pattern: ${spec.pattern} Use it in real situations such as ${spec.situations.join(", ")}.`,
        Advanced: `Teach ${lessonTitle} with precise but simple spoken-English control. Keep the pattern practical: ${spec.pattern} Push for natural spoken phrasing and self-correction.`,
      },
      examples: [
        ...spec.examples,
        `Teacher model for this lesson: ${lessonTitle} helps me speak more clearly in daily life.`,
      ],
      commonMistakes: spec.mistakes,
      phases,
      activityTemplates: {
        drill: [
          `Mini check: choose the better sentence for ${lessonTitle}.`,
          spec.drillFrame,
          `Correct one mistake connected to ${lessonTitle}.`,
          `Rewrite the corrected sentence in chat or repeat it in live mode.`,
        ],
        roleplay: {
          scenario: spec.roleplayScenario,
          learnerRole: `Practise ${lessonTitle} with one short answer first, then one natural follow-up.`,
          agentRole: "Teach first, model the pattern, give a mini check, then guide one small learner attempt before conversation.",
        },
      },
      successCriteria: [
        `Understands the purpose of ${lessonTitle}.`,
        "Can recognise the correct model sentence before producing a sentence.",
        "Can produce one short guided answer using the lesson pattern.",
        "Can rewrite one corrected sentence naturally.",
      ],
      homework: `Practise three short sentences using ${lessonTitle.toLowerCase()}. Save the best corrected version as your model sentence.`,
    };
  });
}

export const foundationEnglishContent: CurriculumSubsectionContent[] = foundationSpecs.flatMap(buildContentForSpec);

export const foundationEnglishModuleIds = foundationSpecs.map((spec) => spec.moduleId);

export function getFoundationEnglishContent(subsectionId: string): CurriculumSubsectionContent | undefined {
  return foundationEnglishContent.find((item) => item.subsectionId === subsectionId);
}
