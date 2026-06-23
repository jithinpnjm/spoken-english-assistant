import { findModuleForSubsection, getCurriculumSubsection } from "./curriculumRegistry";
import type { CurriculumSubsectionContent } from "./pilotPastTenseContent";

const phases: CurriculumSubsectionContent["phases"] = ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"];

type ModuleFamily = "pronunciation" | "grammar" | "workplace" | "roleplay" | "fluency" | "interview" | "technical" | "social" | "general";

function familyFor(moduleId: string): ModuleFamily {
  if (moduleId.includes("pronunciation") || moduleId.includes("sound")) return "pronunciation";
  if (moduleId.includes("workplace") || moduleId.includes("meeting") || moduleId.includes("professional-register")) return "workplace";
  if (moduleId.includes("interview")) return "interview";
  if (moduleId.includes("technical")) return "technical";
  if (moduleId.includes("roleplay") || moduleId.includes("real-life") || moduleId.includes("everyday")) return "roleplay";
  if (moduleId.includes("fluency") || moduleId.includes("storytelling") || moduleId.includes("presentation")) return "fluency";
  if (moduleId.includes("social") || moduleId.includes("discussion") || moduleId.includes("negotiation")) return "social";
  if (moduleId.includes("grammar") || moduleId.includes("tense") || moduleId.includes("articles") || moduleId.includes("preposition") || moduleId.includes("modals") || moduleId.includes("sentence")) return "grammar";
  return "general";
}

function lower(text: string) {
  return text.trim().toLowerCase();
}

function baseExamples(title: string, family: ModuleFamily) {
  const t = lower(title);
  switch (family) {
    case "pronunciation":
      return [
        `I will say the word slowly, then repeat it naturally in a sentence about ${t}.`,
        `The important part is clear stress, not speaking fast.`,
        `I will pause, listen to the correction, and repeat the improved version.`,
        `My sentence should be short enough to say clearly in one breath.`,
        `Sky should correct one sound or stress problem at a time.`,
      ];
    case "workplace":
      return [
        `I want to give a clear update about ${t}.`,
        `The current status is clear, but I need to explain the next action more precisely.`,
        `I can make this more professional by adding impact, owner, and timeline.`,
        `The main risk is clear, and the next step is specific.`,
        `I will keep the message concise and action-oriented.`,
      ];
    case "interview":
      return [
        `In this answer, I will give context, action, and outcome clearly.`,
        `The strongest version should show ownership and measurable impact.`,
        `I will avoid vague language and give one concrete example.`,
        `My answer should sound confident but not memorized.`,
        `I will close with what I learned or how it connects to the role.`,
      ];
    case "technical":
      return [
        `The issue started when one dependency changed, and the impact was visible in the service metrics.`,
        `The root cause was isolated after checking logs, alerts, and recent deployment changes.`,
        `The mitigation reduced customer impact while we worked on the permanent fix.`,
        `The trade-off is between faster delivery and lower operational risk.`,
        `I will explain the system in simple layers so non-specialists can follow it.`,
      ];
    case "roleplay":
      return [
        `I would like to ask for help with ${t}.`,
        `Could you please explain the options available?`,
        `I need to clarify one detail before I decide.`,
        `That works for me, thank you.`,
        `Could you repeat that more slowly, please?`,
      ];
    case "fluency":
      return [
        `First, I will give the main idea. Then I will add one example. Finally, I will finish with a short conclusion.`,
        `I will speak in chunks instead of translating word by word.`,
        `If I make a mistake, I will correct myself and continue.`,
        `The goal is clear flow, not perfect speed.`,
        `I will use linking words to make the answer easier to follow.`,
      ];
    case "social":
      return [
        `I see your point, and I would like to add one thought.`,
        `That sounds interesting. Could you tell me a bit more?`,
        `I agree with the main idea, but I see one possible risk.`,
        `Let me clarify what I mean before I continue.`,
        `I want to respond naturally and keep the conversation moving.`,
      ];
    case "grammar":
      return [
        `I will make one clear sentence using ${t}.`,
        `The sentence needs the correct verb form, article, preposition, or word order.`,
        `A natural version should sound like something people say in daily conversation.`,
        `I will correct the mistake, then repeat the improved sentence.`,
        `The rule should help me speak, not just pass a grammar test.`,
      ];
    default:
      return [
        `I will practise ${t} with one clear spoken sentence.`,
        `The better sentence should be complete, natural, and easy to repeat.`,
        `Sky should correct the biggest mistake first.`,
        `I will answer one follow-up question inside this topic.`,
        `The lesson should end with one small homework task.`,
      ];
  }
}

function commonMistakes(title: string, family: ModuleFamily) {
  const t = lower(title);
  const generic = [
    { wrong: `I speaking about ${t}.`, right: `I am speaking about ${t}.`, why: "Use a complete verb structure." },
    { wrong: "I don't know explain this clearly.", right: "I don't know how to explain this clearly.", why: "Use how to after don't know." },
  ];
  switch (family) {
    case "workplace":
      return [
        { wrong: "Status is going good.", right: "The task is on track, and the next step is clear.", why: "Use specific professional status language instead of vague wording." },
        { wrong: "I have blocker with this.", right: "I am blocked because I need clarification on this item.", why: "Explain the blocker and the needed action." },
        { wrong: "I will update if anything.", right: "I will share another update if the status changes.", why: "Use a complete professional sentence." },
      ];
    case "interview":
      return [
        { wrong: "Myself I am working as engineer.", right: "I am a cloud/platform engineer with experience in reliability and automation.", why: "Use I am, not myself, for introductions." },
        { wrong: "I did many things in project.", right: "I led the implementation of a platform improvement that reduced operational effort.", why: "Use specific action and outcome." },
        { wrong: "It was challenging but somehow done.", right: "It was challenging because of the dependency risk, so I coordinated with stakeholders and delivered a safer rollout.", why: "Explain challenge, action, and result." },
      ];
    case "technical":
      return [
        { wrong: "System got issue and we checked logs.", right: "The service had an issue, so we checked the logs and recent deployment changes.", why: "Use precise nouns and clear sequence." },
        { wrong: "Root cause was because config wrong.", right: "The root cause was an incorrect configuration value.", why: "Avoid double cause wording and use a precise noun phrase." },
        { wrong: "We fixed temporary and permanent later.", right: "We applied a temporary mitigation first and planned a permanent fix later.", why: "Use clear action verbs and timeline." },
      ];
    case "roleplay":
      return [
        { wrong: "I want one water.", right: "I would like a glass of water, please.", why: "Use polite request language and a natural quantity expression." },
        { wrong: "Tell me where is station.", right: "Could you tell me where the station is?", why: "Use polite indirect question order." },
        { wrong: "I have problem, you fix.", right: "I have a problem. Could you help me fix it?", why: "Use polite complete sentences." },
      ];
    case "fluency":
      return [
        { wrong: "And then and then and then I did.", right: "First, I did the main task. Then, I checked the result. Finally, I shared an update.", why: "Use sequence markers instead of repeating and then." },
        { wrong: "I am not getting words.", right: "I am struggling to find the right words.", why: "Use a natural phrase for hesitation." },
        { wrong: "Actually basically I mean it was like good.", right: "It was useful because it helped me understand the problem clearly.", why: "Reduce fillers and add a reason." },
      ];
    case "pronunciation":
      return [
        { wrong: "I will speak fast to sound fluent.", right: "I will speak clearly with correct stress and pauses.", why: "Fluency is clarity plus rhythm, not speed." },
        { wrong: "I no need pause.", right: "I need to pause naturally between ideas.", why: "Use need to and practise pausing." },
        { wrong: "I pronounce all same stress.", right: "I should stress the important word in the sentence.", why: "Sentence stress changes meaning and clarity." },
      ];
    default:
      return [...generic, { wrong: "Please correct and I repeat.", right: "Please correct it, and I will repeat the improved version.", why: "Use a complete sentence with a clear object." }];
  }
}

function drills(title: string, family: ModuleFamily) {
  const t = lower(title);
  switch (family) {
    case "pronunciation":
      return [`Say one short sentence about ${t} slowly.`, "Repeat after correction with one clear pause.", "Mark the stressed word in the sentence.", "Say the sentence once more naturally." ];
    case "workplace":
      return [`Give a work update using ${t}.`, "Add impact, owner, or next action.", "Rewrite the update in a more professional tone.", "Repeat the concise version." ];
    case "interview":
      return [`Answer an interview question about ${t}.`, "Add one concrete example.", "Make the answer more concise.", "End with result or learning." ];
    case "technical":
      return [`Explain ${t} to a non-specialist.`, "Add cause, impact, and action.", "Remove one unnecessary detail.", "Summarize the explanation in one sentence." ];
    case "roleplay":
      return [`Make a polite request related to ${t}.`, "Ask one clarification question.", "Respond to the answer naturally.", "Repeat the corrected polite version." ];
    case "fluency":
      return [`Speak for 30 seconds about ${t}.`, "Use first/then/finally or however/because.", "Reduce one filler phrase.", "Give a clearer second version." ];
    case "social":
      return [`Give an opinion about ${t}.`, "Agree or disagree politely.", "Ask one follow-up question.", "Summarize your point in one sentence." ];
    default:
      return [`Make one sentence using ${t}.`, "Correct the main grammar/vocabulary mistake.", "Repeat or rewrite the improved version.", "Answer one follow-up question." ];
  }
}

export function buildDetailedScaffoldContent(subsectionId: string): CurriculumSubsectionContent {
  const subsection = getCurriculumSubsection(subsectionId);
  if (!subsection) throw new Error(`Unknown curriculum subsection: ${subsectionId}`);
  const module = findModuleForSubsection(subsectionId);
  const moduleTitle = module?.title || "Spoken English";
  const family = familyFor(module?.id || "");
  const title = subsection.title.trim();
  const t = lower(title);

  return {
    subsectionId,
    ruleSummary: `Practise ${t} as a focused ${moduleTitle} speaking skill. The learner should produce clear, corrected, repeatable English, not just chat generally.`,
    explanation: {
      Beginner: `This lesson teaches ${t} with short, safe sentences. Sky should use simple words, correct one high-value mistake, and ask the learner to type or say one improved version depending on the mode.`,
      Intermediate: `This lesson teaches ${t} for practical communication. Sky should correct grammar, vocabulary, sentence order, and naturalness, then give one small drill inside the same topic.`,
      Advanced: `This lesson teaches ${t} with precision, register control, concision, and fluency. Sky should upgrade the learner's wording and push for a more natural or professional version.`,
    },
    examples: baseExamples(title, family),
    commonMistakes: commonMistakes(title, family),
    phases,
    activityTemplates: {
      drill: drills(title, family),
      roleplay: {
        scenario: `${moduleTitle}: focused practice for ${title}.`,
        learnerRole: `Respond using ${t} in a complete, natural sentence.`,
        agentRole: "Stay inside the current subsection, correct precisely, ask one follow-up, and advance only when the phase goal is met.",
      },
    },
    successCriteria: [
      `Learner produces at least two complete responses related to ${t}.`,
      "Learner accepts and applies one correction.",
      "Learner produces a more natural or professional version after feedback.",
      "Learner stays on topic or returns after a brief digression.",
    ],
    homework: `Practise three sentences for ${t}. Keep the best corrected version as your model answer.`,
  };
}
