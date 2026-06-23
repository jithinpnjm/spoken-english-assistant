import { getCurriculumModule } from "./curriculumRegistry";
import type { CurriculumSubsectionContent } from "./pilotPastTenseContent";

const phases: CurriculumSubsectionContent["phases"] = ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"];

type ProfessionalModuleSpec = {
  moduleId: string;
  trackName: string;
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

const professionalSpecs: ProfessionalModuleSpec[] = [
  {
    moduleId: "a08-interview-speaking",
    trackName: "Interview English",
    teachingFocus: "clear, confident interview answers with structure, evidence, and natural professional tone",
    learnerGoal: "answer interview questions with context, action, result, and learning instead of vague or memorized responses",
    meaning: "Interview English is not only grammar. It is the skill of explaining experience, decisions, impact, strengths, and learning in a clear professional story.",
    pattern: "Answer shape: direct answer -> context -> action -> result -> reflection or relevance to the role.",
    situations: ["self-introduction", "project explanation", "behavioral questions", "leadership examples", "conflict stories", "failure and learning", "role motivation"],
    examples: [
      "I have experience building reliable cloud platforms and improving deployment workflows.",
      "One challenging project involved reducing operational risk during a production migration.",
      "My role was to coordinate the rollout, automate the validation steps, and communicate status clearly.",
      "The result was a safer release with fewer manual steps and faster troubleshooting.",
      "What I learned is that technical success also depends on clear communication and stakeholder alignment.",
    ],
    mistakes: [
      { wrong: "Myself I am working as engineer.", right: "I am an engineer with experience in cloud platforms and reliability.", why: "Use I am for introductions, not Myself I am." },
      { wrong: "I did many things in that project.", right: "I owned the deployment automation and improved the release validation process.", why: "Avoid vague phrases. State the specific responsibility and impact." },
      { wrong: "It was very challenging but somehow completed.", right: "It was challenging because of dependency risk, so I created a safer rollout plan and completed it successfully.", why: "Explain challenge, action, and outcome instead of saying somehow." },
    ],
    drillFrame: "Answer using: direct answer -> context -> action -> result -> learning.",
    roleplayScenario: "Interviewer asks a professional question; learner answers with a structured, natural interview response.",
  },
  {
    moduleId: "a03-technical-communication",
    trackName: "Technical Communication",
    teachingFocus: "explaining technical systems, incidents, trade-offs, and decisions in clear English",
    learnerGoal: "explain technical topics so both technical and non-technical listeners can understand the problem, impact, and action",
    meaning: "Technical communication means turning complex work into clear explanation: what happened, why it matters, what was done, and what comes next.",
    pattern: "Explanation shape: context -> problem -> impact -> analysis -> action -> result -> next step.",
    situations: ["incident explanation", "architecture discussion", "design review", "root cause analysis", "release risk", "stakeholder update", "technical interview"],
    examples: [
      "The service became unstable after a configuration change increased memory pressure.",
      "The impact was limited to one environment, but it delayed validation for the release.",
      "We checked logs, metrics, and recent deployments to isolate the root cause.",
      "The immediate mitigation was to roll back the configuration while preparing a safer fix.",
      "The long-term improvement was to add alerts and pre-release validation for the same condition.",
    ],
    mistakes: [
      { wrong: "System got issue and we checked logs.", right: "The system had an issue, so we checked the logs and recent deployment changes.", why: "Use precise nouns and clear sequence." },
      { wrong: "Root cause was because config wrong.", right: "The root cause was an incorrect configuration value.", why: "Avoid double cause wording and use a precise noun phrase." },
      { wrong: "We fixed temporary and permanent later.", right: "We applied a temporary mitigation first and planned a permanent fix later.", why: "Use clear action verbs and timeline." },
    ],
    drillFrame: "Explain using: context -> problem -> impact -> action -> result.",
    roleplayScenario: "Learner explains a technical issue to a manager, teammate, or interviewer with clear structure.",
  },
  {
    moduleId: "a02-professional-register",
    trackName: "Professional Communication",
    teachingFocus: "professional tone, concise wording, diplomacy, and clarity at work",
    learnerGoal: "upgrade casual or unclear wording into professional, respectful, action-oriented English",
    meaning: "Professional register is the tone and word choice used at work. It should be clear, respectful, concise, and appropriate for the audience.",
    pattern: "Professional message shape: context -> point -> reason -> request or next action.",
    situations: ["email tone", "Slack/Teams message", "manager update", "disagreement", "clarification", "delay update", "request for help"],
    examples: [
      "Could you clarify the expected timeline for this task?",
      "I understand the urgency, but I am concerned about the release risk.",
      "The task is on track, and I will share another update by 4 p.m.",
      "I recommend validating this in staging before production.",
      "Could you review the logs when you have a moment?",
    ],
    mistakes: [
      { wrong: "You are wrong, this won't work.", right: "I see your point, but I have a concern about this approach.", why: "Disagree with the idea, not the person." },
      { wrong: "Send it fast.", right: "Could you send it when you have a chance?", why: "Use polite request language in professional settings." },
      { wrong: "I can't do, too much dependency.", right: "I cannot complete it yet because there are unresolved dependencies.", why: "Use a complete sentence and explain the reason clearly." },
    ],
    drillFrame: "Upgrade this message professionally: context -> point -> next action.",
    roleplayScenario: "Learner rewrites casual workplace messages into professional, clear communication.",
  },
  {
    moduleId: "a07-presentations-and-storytelling",
    trackName: "Professional Communication",
    teachingFocus: "structured speaking for presentations, project stories, and clear narratives",
    learnerGoal: "present an idea or project story with opening, structure, evidence, and conclusion",
    meaning: "Presentation English helps the speaker guide the listener through a clear journey instead of giving disconnected details.",
    pattern: "Presentation shape: opening -> agenda/main point -> details/examples -> takeaway -> next step.",
    situations: ["project presentation", "demo explanation", "status presentation", "interview project story", "stakeholder update"],
    examples: [
      "Today I will explain the problem, the solution, and the result.",
      "The main challenge was reducing risk while keeping the delivery timeline realistic.",
      "There were three key steps: analysis, implementation, and validation.",
      "The most important result was improved reliability and easier operations.",
      "The takeaway is that simple automation can reduce repeated manual work significantly.",
    ],
    mistakes: [
      { wrong: "I will tell about my project.", right: "I will explain my project and the impact it created.", why: "Use explain plus a clear object and purpose." },
      { wrong: "First point is problem, second solution, like that.", right: "I will cover three points: the problem, the solution, and the result.", why: "Use a clean agenda sentence." },
      { wrong: "That's all only.", right: "To summarize, the project improved reliability and reduced manual effort.", why: "End with a meaningful conclusion." },
    ],
    drillFrame: "Present using: opening -> three points -> takeaway.",
    roleplayScenario: "Learner gives a short project presentation and improves structure after feedback.",
  },
];

function buildContentForSpec(spec: ProfessionalModuleSpec): CurriculumSubsectionContent[] {
  const module = getCurriculumModule(spec.moduleId);
  if (!module) throw new Error(`Missing professional module ${spec.moduleId}`);
  return module.subsections.map((subsection) => {
    const lessonTitle = subsection.title;
    return {
      subsectionId: subsection.id,
      ruleSummary: `Learn ${lessonTitle.toLowerCase()} as part of ${spec.trackName}: ${spec.teachingFocus}.`,
      explanation: {
        Beginner: `Today we are learning ${lessonTitle}. Goal: ${spec.learnerGoal}. Meaning: ${spec.meaning} Use this simple structure: ${spec.pattern}`,
        Intermediate: `${lessonTitle} helps you communicate professionally. Goal: ${spec.learnerGoal}. Use the structure: ${spec.pattern}. Practise it in situations like ${spec.situations.slice(0, 4).join(", ")}.`,
        Advanced: `${lessonTitle} should be taught with professional precision, concise structure, audience awareness, and natural spoken delivery. Core pattern: ${spec.pattern}.`,
      },
      examples: [
        ...spec.examples,
        `Teacher model for this lesson: ${lessonTitle} becomes stronger when the answer is structured, specific, and natural.`,
      ],
      commonMistakes: spec.mistakes,
      phases,
      activityTemplates: {
        drill: [
          `Mini check: identify the strongest professional version for ${lessonTitle}.`,
          spec.drillFrame,
          `Upgrade one vague answer connected to ${lessonTitle}.`,
          `Rewrite the corrected answer in a concise professional style.`,
        ],
        roleplay: {
          scenario: spec.roleplayScenario,
          learnerRole: `Practise ${lessonTitle} with a structured professional answer first, then answer one follow-up question.`,
          agentRole: "Teach first, model a strong answer, show one weak answer, guide one structured attempt, then give precise correction.",
        },
      },
      successCriteria: [
        `Understands the purpose of ${lessonTitle}.`,
        "Can recognise a stronger professional version before producing a full answer.",
        "Can produce one structured guided answer using the lesson pattern.",
        "Can rewrite one vague answer into a more specific and professional version.",
      ],
      homework: `Prepare one short professional answer for ${lessonTitle.toLowerCase()} using the structure: ${spec.pattern}`,
    };
  });
}

export const professionalEnglishContent: CurriculumSubsectionContent[] = professionalSpecs.flatMap(buildContentForSpec);

export const professionalEnglishModuleIds = professionalSpecs.map((spec) => spec.moduleId);

export function getProfessionalEnglishContent(subsectionId: string): CurriculumSubsectionContent | undefined {
  return professionalEnglishContent.find((item) => item.subsectionId === subsectionId);
}
