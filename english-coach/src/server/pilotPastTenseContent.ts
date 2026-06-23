import type { CurriculumPhase } from "./curriculumRegistry";

export type ContentLevel = "Beginner" | "Intermediate" | "Advanced";

export interface CurriculumCommonMistake {
  wrong: string;
  right: string;
  why: string;
}

export interface CurriculumRoleplayTemplate {
  scenario: string;
  learnerRole: string;
  agentRole: string;
}

export interface CurriculumSubsectionContent {
  subsectionId: string;
  ruleSummary: string;
  explanation: Record<ContentLevel, string>;
  examples: string[];
  commonMistakes: CurriculumCommonMistake[];
  phases: CurriculumPhase[];
  activityTemplates: {
    drill: string[];
    roleplay: CurriculumRoleplayTemplate;
  };
  successCriteria: string[];
  homework: string;
}

const phases: CurriculumPhase[] = [
  "intro",
  "model",
  "controlled_practice",
  "correction",
  "repeat",
  "free_practice",
  "summary",
];

export const pilotPastTenseContent: CurriculumSubsectionContent[] = [
  {
    subsectionId: "b09-past-tense-pilot-01",
    ruleSummary: "Use was/were to talk about past states, places, feelings, and situations.",
    explanation: {
      Beginner: "Use was with I, he, she, and it. Use were with you, we, and they. Use it when you talk about a situation in the past, not an action.",
      Intermediate: "Was/were are the past forms of be. They describe past states such as location, condition, emotion, identity, or availability.",
      Advanced: "Was/were mark past-state framing. They are useful when setting context before a story or explaining a past condition before an action.",
    },
    examples: [
      "I was at home yesterday.",
      "She was tired after work.",
      "We were in Berlin last weekend.",
      "The meeting was useful.",
      "They were late because the train was delayed.",
    ],
    commonMistakes: [
      { wrong: "I am at home yesterday.", right: "I was at home yesterday.", why: "Yesterday is a past time, so use was instead of am." },
      { wrong: "We was late.", right: "We were late.", why: "Use were with we." },
      { wrong: "She were tired.", right: "She was tired.", why: "Use was with she." },
    ],
    phases,
    activityTemplates: {
      drill: [
        "Change to past: I am busy today.",
        "Make a sentence with: yesterday / tired.",
        "Answer: Where were you last Saturday?",
        "Correct this sentence: We was at the station.",
      ],
      roleplay: {
        scenario: "You are explaining why you missed a call yesterday.",
        learnerRole: "Explain where you were and how you felt.",
        agentRole: "Ask simple follow-up questions about the past situation.",
      },
    },
    successCriteria: [
      "Uses was/were with the correct subject at least three times.",
      "Can answer one where/when question about the past.",
      "Corrects one was/were mistake after feedback.",
    ],
    homework: "Say five sentences about where you were yesterday and how you felt.",
  },
  {
    subsectionId: "b09-past-tense-pilot-02",
    ruleSummary: "Use regular past verbs ending in -ed for finished past actions.",
    explanation: {
      Beginner: "For many verbs, add -ed to talk about the past: work becomes worked, watch becomes watched, clean becomes cleaned.",
      Intermediate: "Regular past verbs use the -ed form for finished actions. The verb form does not change for I, you, he, she, we, or they.",
      Advanced: "Regular past forms are simple, but spoken accuracy depends on consistent tense control and natural pronunciation of -ed endings.",
    },
    examples: [
      "I worked from home yesterday.",
      "She cleaned the kitchen in the morning.",
      "We watched a movie last night.",
      "He called his friend after lunch.",
      "They visited us last weekend.",
    ],
    commonMistakes: [
      { wrong: "Yesterday I work from home.", right: "Yesterday I worked from home.", why: "Use the past form worked for a finished action yesterday." },
      { wrong: "She cleaneded the room.", right: "She cleaned the room.", why: "Do not add -ed twice." },
      { wrong: "He call me yesterday.", right: "He called me yesterday.", why: "Call is a regular verb, so the past form is called." },
    ],
    phases,
    activityTemplates: {
      drill: [
        "Change to past: I work late.",
        "Change to past: She calls me.",
        "Make a sentence with: yesterday / watched.",
        "Correct this sentence: He clean the room yesterday.",
      ],
      roleplay: {
        scenario: "You are telling Sky what you did after work yesterday.",
        learnerRole: "Use three regular past verbs.",
        agentRole: "Ask what happened first, next, and finally.",
      },
    },
    successCriteria: [
      "Uses at least three regular past verbs correctly.",
      "Keeps the same past tense across a short answer.",
      "Repeats one corrected -ed sentence naturally.",
    ],
    homework: "Write and say five sentences with regular past verbs: worked, watched, cleaned, called, visited.",
  },
  {
    subsectionId: "b09-past-tense-pilot-03",
    ruleSummary: "Use common irregular past verb forms like went, ate, came, saw, took, and bought.",
    explanation: {
      Beginner: "Some past verbs do not use -ed. Go becomes went. Eat becomes ate. Come becomes came. You need to remember these common forms.",
      Intermediate: "Irregular verbs have special past forms. They are common in daily speech, so practise them as chunks, not as theory.",
      Advanced: "Accurate irregular verb control keeps narratives fluent. The goal is automatic retrieval during speech, especially for common daily verbs.",
    },
    examples: [
      "I went to the office yesterday.",
      "We ate dinner at home.",
      "She came late because of traffic.",
      "He bought groceries after work.",
      "They saw a doctor in the morning.",
    ],
    commonMistakes: [
      { wrong: "I goed to office.", right: "I went to the office.", why: "Go is irregular. The past form is went. Use the office when you mean your workplace." },
      { wrong: "We eated dinner.", right: "We ate dinner.", why: "Eat is irregular. The past form is ate." },
      { wrong: "She buyed groceries.", right: "She bought groceries.", why: "Buy is irregular. The past form is bought." },
    ],
    phases,
    activityTemplates: {
      drill: [
        "Change to past: I go to the shop.",
        "Change to past: We eat lunch.",
        "Answer: What did you buy yesterday?",
        "Correct this sentence: I goed to the station.",
      ],
      roleplay: {
        scenario: "You are describing yesterday's errands.",
        learnerRole: "Use went, bought, ate, and came in a short story.",
        agentRole: "Ask follow-up questions about where, what, and when.",
      },
    },
    successCriteria: [
      "Uses at least four common irregular past verbs correctly.",
      "Avoids adding -ed to irregular verbs.",
      "Can correct one irregular verb mistake after feedback.",
    ],
    homework: "Say a six-sentence story using went, ate, came, saw, took, and bought.",
  },
  {
    subsectionId: "b09-past-tense-pilot-04",
    ruleSummary: "Use did not plus the base verb for negative past actions.",
    explanation: {
      Beginner: "For negative past actions, say did not or didn't, then use the normal verb: I didn't go, not I didn't went.",
      Intermediate: "Did carries the past tense in negative sentences. The main verb returns to the base form after did not or didn't.",
      Advanced: "Past negative accuracy depends on avoiding double past marking. Use didn't + base verb even when the positive form is irregular.",
    },
    examples: [
      "I didn't go to the office yesterday.",
      "She did not call me last night.",
      "We didn't eat outside.",
      "He didn't finish the task.",
      "They didn't take the train.",
    ],
    commonMistakes: [
      { wrong: "I didn't went to work.", right: "I didn't go to work.", why: "After didn't, use the base verb go." },
      { wrong: "She didn't called me.", right: "She didn't call me.", why: "After didn't, use call, not called." },
      { wrong: "We no ate dinner.", right: "We didn't eat dinner.", why: "Use didn't + base verb for past negatives." },
    ],
    phases,
    activityTemplates: {
      drill: [
        "Change to negative: I went to the office.",
        "Change to negative: She called me.",
        "Answer: What didn't you do yesterday?",
        "Correct this sentence: We didn't ate lunch.",
      ],
      roleplay: {
        scenario: "You are explaining why you could not complete your plan yesterday.",
        learnerRole: "Use three didn't + base verb sentences.",
        agentRole: "Ask what the learner did not do and why.",
      },
    },
    successCriteria: [
      "Uses didn't + base verb correctly at least three times.",
      "Avoids double past marking after didn't.",
      "Can convert one positive past sentence into a negative sentence.",
    ],
    homework: "Say five things you didn't do yesterday using didn't + base verb.",
  },
  {
    subsectionId: "b09-past-tense-pilot-05",
    ruleSummary: "Use did plus the base verb to ask past questions.",
    explanation: {
      Beginner: "For past questions, start with did and use the normal verb: Did you go? Did she call?",
      Intermediate: "In past questions, did carries the past tense, so the main verb stays in base form.",
      Advanced: "Past-question accuracy helps conversation flow because it lets you ask clear follow-up questions about completed events.",
    },
    examples: [
      "Did you go to work yesterday?",
      "Did she call you last night?",
      "Did they finish the task?",
      "Where did you eat lunch?",
      "What did you buy at the shop?",
    ],
    commonMistakes: [
      { wrong: "Did you went to work?", right: "Did you go to work?", why: "After did, use the base verb go." },
      { wrong: "Where you went yesterday?", right: "Where did you go yesterday?", why: "Use did before the subject in past questions." },
      { wrong: "What did you bought?", right: "What did you buy?", why: "After did, use buy, not bought." },
    ],
    phases,
    activityTemplates: {
      drill: [
        "Make a question: you / go / yesterday.",
        "Make a question: she / call / last night.",
        "Ask Sky a past question with where.",
        "Correct this sentence: Did they finished it?",
      ],
      roleplay: {
        scenario: "You are asking a friend about their day yesterday.",
        learnerRole: "Ask five did questions.",
        agentRole: "Answer briefly and ask the learner to correct any question errors.",
      },
    },
    successCriteria: [
      "Forms did questions with base verbs.",
      "Asks at least one yes/no question and one wh- question.",
      "Corrects one did-question mistake after feedback.",
    ],
    homework: "Ask and answer five past questions starting with did, where did, or what did.",
  },
  {
    subsectionId: "b09-past-tense-pilot-06",
    ruleSummary: "Use past time expressions like yesterday, last week, last night, and two days ago with past tense.",
    explanation: {
      Beginner: "Words like yesterday, last night, and two days ago show past time. Use past verbs with them.",
      Intermediate: "Past time expressions anchor the event in finished time, so they usually require past simple, not present perfect or present simple.",
      Advanced: "Clear time anchoring makes narratives easier to follow and prevents tense drift in longer answers.",
    },
    examples: [
      "I worked late yesterday.",
      "We visited our friends last weekend.",
      "She called me two days ago.",
      "I went shopping last night.",
      "They moved here three years ago.",
    ],
    commonMistakes: [
      { wrong: "I have visited them last week.", right: "I visited them last week.", why: "Last week is a finished past time, so use past simple." },
      { wrong: "Yesterday I go shopping.", right: "Yesterday I went shopping.", why: "Yesterday needs a past verb." },
      { wrong: "I came here before two years.", right: "I came here two years ago.", why: "Use ago to count back from now." },
    ],
    phases,
    activityTemplates: {
      drill: [
        "Make a sentence with yesterday.",
        "Make a sentence with last weekend.",
        "Make a sentence with two days ago.",
        "Correct this sentence: I have called him yesterday.",
      ],
      roleplay: {
        scenario: "You are explaining your week to a teacher.",
        learnerRole: "Use yesterday, last weekend, and two days ago.",
        agentRole: "Ask when each event happened.",
      },
    },
    successCriteria: [
      "Uses three past time expressions naturally.",
      "Matches each past time expression with past simple.",
      "Avoids present perfect with finished-time expressions.",
    ],
    homework: "Say six past-tense sentences using yesterday, last night, last week, and ago.",
  },
  {
    subsectionId: "b09-past-tense-pilot-07",
    ruleSummary: "Use past tense to describe completed work and travel events clearly.",
    explanation: {
      Beginner: "When you talk about a finished work or travel event, use past verbs: I joined, I reached, I booked, I missed.",
      Intermediate: "Work and travel stories need clear past-tense sequencing: what happened, when it happened, and what happened next.",
      Advanced: "Even simple past-tense stories sound more professional when actions are sequenced clearly and unnecessary details are removed.",
    },
    examples: [
      "I joined the meeting at ten.",
      "I reached the station late.",
      "We booked the tickets online.",
      "The train arrived fifteen minutes late.",
      "I missed the connection, so I took the next train.",
    ],
    commonMistakes: [
      { wrong: "I reach office late yesterday.", right: "I reached the office late yesterday.", why: "Use reached for the past and the office for a specific workplace." },
      { wrong: "Train was delay.", right: "The train was delayed.", why: "Use the train and was delayed to describe the past situation." },
      { wrong: "I miss the meeting yesterday.", right: "I missed the meeting yesterday.", why: "Yesterday needs past tense: missed." },
    ],
    phases,
    activityTemplates: {
      drill: [
        "Describe one work event from yesterday.",
        "Describe one travel problem from the past.",
        "Use first, then, and finally in a past story.",
        "Correct this sentence: I reach station late yesterday.",
      ],
      roleplay: {
        scenario: "You are explaining a delayed journey or missed meeting.",
        learnerRole: "Give a clear past-tense explanation with three events.",
        agentRole: "Ask clarifying questions and correct tense/story order.",
      },
    },
    successCriteria: [
      "Describes at least three completed events in past tense.",
      "Uses time/order words to make the story clear.",
      "Can upgrade one unclear work/travel sentence.",
    ],
    homework: "Prepare a short story about one work or travel problem using five past verbs.",
  },
  {
    subsectionId: "b09-past-tense-pilot-08",
    ruleSummary: "Tell a short yesterday story using a clear sequence of past actions.",
    explanation: {
      Beginner: "A simple story can use three parts: first, then, and finally. Use past verbs in each part.",
      Intermediate: "A natural past story has sequence, time markers, and consistent tense. Avoid switching back to present tense by accident.",
      Advanced: "A concise past narrative should include context, action sequence, and result without overexplaining.",
    },
    examples: [
      "First, I went to work. Then, I finished two tasks. Finally, I came home and cooked dinner.",
      "Yesterday morning, I took the train. It was crowded, but I reached the office on time.",
      "After work, I called my friend and we talked for ten minutes.",
      "I planned to study English, but I felt tired, so I slept early.",
      "I had a busy day, but I completed the important work.",
    ],
    commonMistakes: [
      { wrong: "Yesterday I go office then I came home.", right: "Yesterday I went to the office, then I came home.", why: "Keep both actions in past tense and use to the office." },
      { wrong: "First I went, then I am cooking.", right: "First I went out, then I cooked.", why: "Keep the story in past tense." },
      { wrong: "I was sleep early.", right: "I slept early.", why: "Use slept for the action, not was sleep." },
    ],
    phases,
    activityTemplates: {
      drill: [
        "Tell a three-sentence story about yesterday.",
        "Use first, then, and finally.",
        "Add one reason with because.",
        "Correct this sentence: Yesterday I go office and I eat lunch there.",
      ],
      roleplay: {
        scenario: "Sky asks about your day yesterday.",
        learnerRole: "Tell a short, clear story with at least five past verbs.",
        agentRole: "Correct tense consistency and ask for one repeated improved version.",
      },
    },
    successCriteria: [
      "Tells a three-to-five sentence past story.",
      "Uses at least five past verbs.",
      "Keeps tense consistent across the story.",
    ],
    homework: "Record yourself telling yesterday's story in five sentences. Repeat after correcting tense mistakes.",
  },
  {
    subsectionId: "b09-past-tense-pilot-09",
    ruleSummary: "Find and fix common past-tense mistakes in real learner sentences.",
    explanation: {
      Beginner: "In this lesson, your job is to notice the mistake and say the better sentence. We will fix one mistake at a time.",
      Intermediate: "Correction practice builds automatic accuracy. Focus on verb form, time expression, articles, and word order.",
      Advanced: "Fast correction helps fluency because the learner starts hearing tense errors before finishing the sentence.",
    },
    examples: [
      "Wrong: I go to office yesterday. Right: I went to the office yesterday.",
      "Wrong: Did you went there? Right: Did you go there?",
      "Wrong: I didn't ate lunch. Right: I didn't eat lunch.",
      "Wrong: We was late. Right: We were late.",
      "Wrong: She buyed it. Right: She bought it.",
    ],
    commonMistakes: [
      { wrong: "I go yesterday.", right: "I went yesterday.", why: "Use past form went with yesterday." },
      { wrong: "Did he called?", right: "Did he call?", why: "After did, use the base verb call." },
      { wrong: "They was happy.", right: "They were happy.", why: "Use were with they." },
    ],
    phases,
    activityTemplates: {
      drill: [
        "Fix: I go to the shop yesterday.",
        "Fix: Did you bought anything?",
        "Fix: We didn't went outside.",
        "Fix: They was tired after work.",
      ],
      roleplay: {
        scenario: "Sky gives incorrect sentences and the learner repairs them.",
        learnerRole: "Correct each sentence and explain the rule in simple words.",
        agentRole: "Give one mistake at a time and confirm the corrected version.",
      },
    },
    successCriteria: [
      "Corrects at least four past-tense errors.",
      "Explains one rule in simple words.",
      "Repeats corrected sentences naturally.",
    ],
    homework: "Fix five past-tense mistakes from your own old sentences or from today's chat.",
  },
  {
    subsectionId: "b09-past-tense-pilot-10",
    ruleSummary: "Use past tense independently in a short speaking assessment.",
    explanation: {
      Beginner: "This is your checkpoint. Speak about the past using was/were, regular verbs, irregular verbs, didn't, did questions, and time words.",
      Intermediate: "The checkpoint tests whether you can use the full past-tense module in connected speech, not only in single drills.",
      Advanced: "The goal is controlled fluency: accurate past-tense narration with clear sequence, concise phrasing, and self-correction.",
    },
    examples: [
      "Yesterday I was busy. I worked in the morning, joined a meeting, and finished one task.",
      "I didn't go outside because it was raining.",
      "After work, I ate dinner and watched a short video.",
      "Did you do anything interesting yesterday?",
      "Last weekend, we visited a friend and came home late.",
    ],
    commonMistakes: [
      { wrong: "Yesterday I am busy and I work late.", right: "Yesterday I was busy and I worked late.", why: "Both state and action need past forms." },
      { wrong: "I didn't completed it.", right: "I didn't complete it.", why: "After didn't, use the base verb." },
      { wrong: "Where you went last weekend?", right: "Where did you go last weekend?", why: "Use did to form past questions." },
    ],
    phases,
    activityTemplates: {
      drill: [
        "Speak for 45 seconds about yesterday.",
        "Ask Sky two past questions.",
        "Say two things you did and one thing you didn't do.",
        "Correct your own sentence after feedback.",
      ],
      roleplay: {
        scenario: "Final speaking test for the Past Tense Pilot module.",
        learnerRole: "Speak about yesterday or last weekend for 45-60 seconds.",
        agentRole: "Assess grammar, fluency, vocabulary, correction ability, and module readiness.",
      },
    },
    successCriteria: [
      "Speaks for at least 45 seconds about the past.",
      "Uses was/were, regular past, irregular past, negative past, and past questions.",
      "Corrects at least one own mistake after feedback.",
      "Receives a pass/follow-up recommendation from Sky.",
    ],
    homework: "Repeat the same story once more after correction and save the improved version.",
  },
];

export function getPilotPastTenseContent(subsectionId: string): CurriculumSubsectionContent | undefined {
  return pilotPastTenseContent.find((item) => item.subsectionId === subsectionId);
}
