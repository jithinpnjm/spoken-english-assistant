import { getCurriculumModule } from "./curriculumRegistry";
import type { CurriculumSubsectionContent } from "./pilotPastTenseContent";

const phases: CurriculumSubsectionContent["phases"] = ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"];

type AdvancedWorkplaceSpec = {
  moduleId: string;
  teachingFocus: string;
  learnerGoal: string;
  meaning: string;
  communicationPattern: string;
  situations: string[];
  examples: string[];
  mistakes: Array<{ wrong: string; right: string; why: string }>;
  drillFrame: string;
  roleplayScenario: string;
};

const advancedWorkplaceSpecs: AdvancedWorkplaceSpec[] = [
  {
    moduleId: "a04-meeting-and-discussion-skills",
    teachingFocus: "participating in senior meetings with clarity, diplomacy, and action orientation",
    learnerGoal: "contribute to meetings by opening points clearly, challenging ideas politely, clarifying assumptions, and closing with decisions or actions",
    meaning: "Advanced meeting English is about controlling discussion flow: enter the conversation, clarify ambiguity, challenge safely, summarize decisions, and move the group to action.",
    communicationPattern: "position -> reason -> evidence or concern -> suggested action -> check alignment",
    situations: ["design review", "roadmap discussion", "incident follow-up", "planning meeting", "stakeholder sync", "architecture review"],
    examples: [
      "I would like to add one concern before we decide.",
      "My understanding is that the main risk is the dependency on the release window.",
      "Could we clarify the assumption behind that timeline?",
      "I agree with the direction, but I think we should validate the rollback path first.",
      "To summarize, we have agreed to test this in staging and review the results tomorrow.",
    ],
    mistakes: [
      { wrong: "I want to say something, this is wrong.", right: "I would like to add one concern about this approach.", why: "Open the contribution diplomatically and focus on the approach." },
      { wrong: "We discussed many things, so okay.", right: "To summarize, we agreed on the rollout plan and the next action is staging validation.", why: "A meeting summary should state decision and next action." },
      { wrong: "What is assumption?", right: "Could we clarify the assumption behind this estimate?", why: "Use a complete, specific clarification question." },
    ],
    drillFrame: "Make one meeting contribution using: I agree with ___, but my concern is ___.",
    roleplayScenario: "Learner joins a technical planning meeting and must contribute one clear point, one concern, and one next action.",
  },
  {
    moduleId: "a09-negotiation-and-influence",
    teachingFocus: "influencing decisions, negotiating scope or timeline, and pushing back professionally",
    learnerGoal: "negotiate without sounding aggressive or passive by framing trade-offs, constraints, and alternatives clearly",
    meaning: "Negotiation English helps you protect quality, timeline, and scope while keeping collaboration professional. The goal is not to win an argument; it is to reach a workable agreement.",
    communicationPattern: "proposal -> trade-off -> constraint -> alternative -> alignment question",
    situations: ["timeline negotiation", "scope negotiation", "resource constraint", "release risk", "senior stakeholder pushback", "priority conflict"],
    examples: [
      "I can support that timeline if we reduce the scope of the first release.",
      "The trade-off is that moving faster may increase validation risk.",
      "Given the current dependency, I would recommend a phased rollout instead.",
      "Could we agree on the minimum scope for this week and move the rest to the next iteration?",
      "I understand the priority, but I do not think we can commit to both speed and full scope safely.",
    ],
    mistakes: [
      { wrong: "This deadline is impossible.", right: "I am concerned that this deadline is not realistic with the current scope.", why: "State the concern professionally and connect it to scope." },
      { wrong: "We cannot do this, no resources.", right: "With the current capacity, we can either reduce scope or extend the timeline.", why: "Offer options instead of only refusing." },
      { wrong: "You decide, I don't know.", right: "My recommendation is a phased rollout because it reduces risk.", why: "Use a clear recommendation instead of avoiding ownership." },
    ],
    drillFrame: "Negotiate using: We can do X if we adjust Y.",
    roleplayScenario: "Learner negotiates scope or timeline with a manager while protecting quality and keeping a collaborative tone.",
  },
  {
    moduleId: "a10-cultural-and-social-fluency",
    teachingFocus: "handling workplace social moments, cross-cultural directness, empathy, and natural reactions",
    learnerGoal: "sound natural and respectful in informal workplace conversations, networking, awkward moments, and polite invitations or declines",
    meaning: "Social fluency at work is not small talk only. It helps build trust, reduce awkwardness, show empathy, and adjust directness across cultures.",
    communicationPattern: "acknowledge -> respond naturally -> add small detail -> invite or close politely",
    situations: ["small talk", "networking", "team lunch", "declining an invite", "showing empathy", "cross-cultural directness", "repairing awkward moments"],
    examples: [
      "That sounds challenging. I hope it gets easier soon.",
      "Thanks for inviting me. I cannot join today, but I would be happy to join next time.",
      "Nice to meet you. I work on platform reliability and cloud infrastructure.",
      "I might have said that too directly. Let me rephrase it.",
      "That is interesting. How did you get into that area?",
    ],
    mistakes: [
      { wrong: "I cannot come. Bye.", right: "Thanks for inviting me. I cannot join today, but I hope you have a good time.", why: "Decline politely with appreciation and a soft close." },
      { wrong: "This is not good, why you did like this?", right: "I may be missing some context. Could you explain the reason behind this approach?", why: "Soften direct criticism and ask for context." },
      { wrong: "I don't know what to tell.", right: "I am not sure how to respond, but I appreciate you sharing that.", why: "Use a natural repair phrase for awkward moments." },
    ],
    drillFrame: "Respond naturally using: That sounds ___. I hope ___.",
    roleplayScenario: "Learner handles a workplace social interaction, invitation, networking moment, or awkward exchange with natural phrasing.",
  },
];

function buildContentForSpec(spec: AdvancedWorkplaceSpec): CurriculumSubsectionContent[] {
  const module = getCurriculumModule(spec.moduleId);
  if (!module) throw new Error(`Missing advanced workplace module ${spec.moduleId}`);
  return module.subsections.map((subsection) => {
    const lessonTitle = subsection.title;
    return {
      subsectionId: subsection.id,
      ruleSummary: `Practise ${lessonTitle.toLowerCase()} for advanced workplace communication: ${spec.teachingFocus}.`,
      explanation: {
        Beginner: `Today we are learning ${lessonTitle}. Goal: ${spec.learnerGoal}. Meaning: ${spec.meaning} Communication pattern: ${spec.communicationPattern}.`,
        Intermediate: `${lessonTitle} helps you participate more confidently at work. Goal: ${spec.learnerGoal}. Use this communication pattern: ${spec.communicationPattern}. Practise in situations like ${spec.situations.slice(0, 4).join(", ")}.`,
        Advanced: `${lessonTitle} should be taught with executive clarity, diplomacy, influence, and concise spoken structure. Core communication pattern: ${spec.communicationPattern}.`,
      },
      examples: [
        ...spec.examples,
        `Teacher model for this lesson: ${lessonTitle} becomes stronger when the speaker frames the point, reason, trade-off, and next action clearly.`,
      ],
      commonMistakes: spec.mistakes,
      phases,
      activityTemplates: {
        drill: [
          `Mini check: choose the strongest workplace version for ${lessonTitle}.`,
          spec.drillFrame,
          `Upgrade one direct or vague sentence connected to ${lessonTitle}.`,
          `Repeat the improved professional version naturally.`,
        ],
        roleplay: {
          scenario: spec.roleplayScenario,
          learnerRole: `Practise ${lessonTitle} with one structured workplace response, then answer one pushback or follow-up.`,
          agentRole: "Teach first, model a strong workplace phrase, show a weak version, guide one attempt, then run a short realistic work scenario.",
        },
      },
      successCriteria: [
        `Understands the workplace purpose of ${lessonTitle}.`,
        "Can recognise a more diplomatic or influential version.",
        "Can produce one structured workplace response using the target pattern.",
        "Can handle one realistic follow-up without becoming too direct or vague.",
      ],
      homework: `Prepare three workplace responses for ${lessonTitle.toLowerCase()} using the pattern: ${spec.communicationPattern}`,
    };
  });
}

export const advancedWorkplaceContent: CurriculumSubsectionContent[] = advancedWorkplaceSpecs.flatMap(buildContentForSpec);

export const advancedWorkplaceModuleIds = advancedWorkplaceSpecs.map((spec) => spec.moduleId);

export function getAdvancedWorkplaceContent(subsectionId: string): CurriculumSubsectionContent | undefined {
  return advancedWorkplaceContent.find((item) => item.subsectionId === subsectionId);
}
