import type { CurriculumSubsectionContent } from "./pilotPastTenseContent";

export const workplaceEnglishContent: CurriculumSubsectionContent[] = [
  {
    subsectionId: "i07-workplace-english-01",
    ruleSummary: "Give a daily standup update with yesterday, today, blockers, and next step.",
    explanation: {
      Beginner: "A standup update can be short: Yesterday I did X. Today I will do Y. I have one blocker. Keep it clear and complete.",
      Intermediate: "A good standup update separates completed work, current plan, blockers, and next action. Use past tense for yesterday and future/planned language for today.",
      Advanced: "A strong standup update is concise, outcome-focused, and specific. Mention progress, risk, dependency, and next action without unnecessary detail.",
    },
    examples: [
      "Yesterday, I fixed the login issue and tested the change in staging.",
      "Today, I will review the deployment logs and prepare the release checklist.",
      "My blocker is that I need access to the production dashboard.",
      "Next, I will confirm the fix with QA and update the ticket.",
      "I am on track, but I need clarification on the rollback plan.",
    ],
    commonMistakes: [
      { wrong: "Yesterday I am fixing one issue.", right: "Yesterday, I fixed one issue.", why: "Use past simple for completed work yesterday." },
      { wrong: "Today I do release.", right: "Today, I will work on the release.", why: "Use will or going to for today's planned work." },
      { wrong: "No blockers only confusion logs.", right: "I do not have blockers, but I need clarification on the logs.", why: "Use a complete sentence and separate blockers from clarification needs." },
    ],
    phases: ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"],
    activityTemplates: {
      drill: [
        "Give a standup update with yesterday, today, and blocker.",
        "Rewrite this: Yesterday I am fixing bug and today release.",
        "Say one update using: completed, planning, blocker.",
        "Repeat the corrected standup update naturally.",
      ],
      roleplay: {
        scenario: "Daily engineering standup.",
        learnerRole: "Give a clear update as a team member.",
        agentRole: "Act as the tech lead and ask one follow-up about progress or blocker.",
      },
    },
    successCriteria: [
      "Mentions yesterday, today, and blocker/none clearly.",
      "Uses past tense and future/planned language correctly.",
      "Keeps the update under five sentences.",
    ],
    homework: "Prepare a 30-second standup update for tomorrow using yesterday, today, blocker, and next step.",
  },
  {
    subsectionId: "i07-workplace-english-02",
    ruleSummary: "Explain blockers clearly by naming the issue, impact, owner, and requested help.",
    explanation: {
      Beginner: "A blocker means something is stopping your work. Say what is blocking you and what help you need.",
      Intermediate: "A clear blocker explanation includes the problem, impact, dependency, and the exact help or decision needed.",
      Advanced: "A professional blocker update avoids blame and focuses on impact, ownership, escalation path, and next decision.",
    },
    examples: [
      "I am blocked because I do not have access to the production logs.",
      "This blocks the validation step, so the release may be delayed.",
      "I need approval from the security team before I can continue.",
      "Could someone confirm who owns the API gateway configuration?",
      "If we cannot resolve this today, I suggest moving the release to tomorrow morning.",
    ],
    commonMistakes: [
      { wrong: "I have blocker with logs.", right: "I am blocked because I cannot access the logs.", why: "Use I am blocked because to explain the reason clearly." },
      { wrong: "Security team not giving access, so I can't do anything.", right: "I am waiting for security approval before I can continue the validation.", why: "Use neutral, professional language instead of blame." },
      { wrong: "It is blocked only.", right: "The release validation is blocked because the test credentials are missing.", why: "Name exactly what is blocked and why." },
    ],
    phases: ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"],
    activityTemplates: {
      drill: [
        "Explain one blocker using: I am blocked because...",
        "Add impact: This affects...",
        "Ask for help: Could someone...?",
        "Correct this: I have blocker with access.",
      ],
      roleplay: {
        scenario: "You are blocked during a release task.",
        learnerRole: "Explain the blocker and ask for specific help.",
        agentRole: "Act as a manager asking what is blocked and what help is needed.",
      },
    },
    successCriteria: [
      "States the blocker clearly.",
      "Explains impact or risk.",
      "Asks for specific help or decision.",
    ],
    homework: "Write and say three blocker updates using problem, impact, and help needed.",
  },
  {
    subsectionId: "i07-workplace-english-03",
    ruleSummary: "Give a status report with current state, progress, risk, and next action.",
    explanation: {
      Beginner: "A status report says where the work is now. Use simple words: completed, in progress, blocked, next.",
      Intermediate: "A useful status report gives the current state, what changed, risk, timeline, and next action.",
      Advanced: "A strong status report is executive-friendly: concise, specific, risk-aware, and action-oriented.",
    },
    examples: [
      "The deployment is in progress and the first validation passed.",
      "We completed the staging test, but production validation is still pending.",
      "The main risk is a possible delay in security approval.",
      "The next action is to run smoke tests after the access issue is resolved.",
      "I will send another update by 4 p.m. if the status changes.",
    ],
    commonMistakes: [
      { wrong: "Status is going good.", right: "The task is on track, and staging validation is complete.", why: "Use specific progress instead of vague language." },
      { wrong: "Everything completed but some pending.", right: "Most tasks are complete, but production validation is still pending.", why: "Avoid contradiction. Separate completed and pending work clearly." },
      { wrong: "I will update if anything.", right: "I will share another update if the status changes.", why: "Use a complete professional sentence." },
    ],
    phases: ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"],
    activityTemplates: {
      drill: [
        "Give a status report using: current state, progress, risk, next action.",
        "Rewrite: Status is going good.",
        "Say one risk in a professional way.",
        "Repeat the upgraded status report.",
      ],
      roleplay: {
        scenario: "Manager asks for a project status update.",
        learnerRole: "Give a concise status report.",
        agentRole: "Ask follow-up questions about risk and next action.",
      },
    },
    successCriteria: [
      "States current status specifically.",
      "Mentions progress and pending item.",
      "Includes next action or update time.",
    ],
    homework: "Prepare one project status report in four sentences.",
  },
  {
    subsectionId: "i07-workplace-english-04",
    ruleSummary: "Ask for clarification politely and specifically when something is unclear.",
    explanation: {
      Beginner: "If you do not understand, ask clearly: Could you please explain that again? What do you mean by...?",
      Intermediate: "Good clarification questions identify the unclear part and ask for a specific explanation, example, or decision.",
      Advanced: "Professional clarification avoids sounding confused or passive. It narrows ambiguity and moves the discussion toward action.",
    },
    examples: [
      "Could you clarify what you mean by rollback validation?",
      "Do you mean we should deploy today or prepare it for tomorrow?",
      "Can you give one example of the expected output?",
      "I want to confirm my understanding: we need to test this in staging first, correct?",
      "Which part should I prioritize first?",
    ],
    commonMistakes: [
      { wrong: "I didn't understood.", right: "I didn't understand. Could you please explain it again?", why: "After did not, use the base verb understand." },
      { wrong: "What you mean?", right: "What do you mean?", why: "Use do in the question form." },
      { wrong: "Explain me this.", right: "Could you explain this to me?", why: "Use explain something to someone." },
    ],
    phases: ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"],
    activityTemplates: {
      drill: [
        "Ask for clarification using: Could you clarify...?",
        "Confirm understanding using: So, do you mean...?",
        "Ask for an example politely.",
        "Correct this: Explain me this.",
      ],
      roleplay: {
        scenario: "A colleague gives an unclear task instruction.",
        learnerRole: "Ask clarification questions before starting the task.",
        agentRole: "Give a vague instruction first, then clarify after the learner asks.",
      },
    },
    successCriteria: [
      "Asks at least two polite clarification questions.",
      "Uses correct question structure.",
      "Confirms understanding before moving on.",
    ],
    homework: "Practise five clarification questions for unclear work instructions.",
  },
  {
    subsectionId: "i07-workplace-english-05",
    ruleSummary: "Disagree politely by acknowledging, stating concern, and offering an alternative.",
    explanation: {
      Beginner: "Polite disagreement is not rude. Start with I understand, then say your concern, then suggest another option.",
      Intermediate: "A professional disagreement should acknowledge the other view, explain the risk, and propose an alternative.",
      Advanced: "Strong disagreement at work uses diplomacy, evidence, and options. It challenges the idea without attacking the person.",
    },
    examples: [
      "I understand the urgency, but I am concerned about skipping the validation step.",
      "I see your point. My concern is that this could increase rollback risk.",
      "Could we deploy it tomorrow morning instead, after smoke testing?",
      "I would recommend testing this in staging first.",
      "I am not fully aligned with this approach because the dependency is still unresolved.",
    ],
    commonMistakes: [
      { wrong: "I don't agree this is wrong.", right: "I see your point, but I have a concern about this approach.", why: "Use softer language and focus on the approach, not the person." },
      { wrong: "This will not work only.", right: "I am concerned this may not work because the dependency is unresolved.", why: "Give a reason and use professional phrasing." },
      { wrong: "You are wrong.", right: "I understand your point, but I see it differently.", why: "Avoid direct personal criticism." },
    ],
    phases: ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"],
    activityTemplates: {
      drill: [
        "Disagree politely using: I see your point, but...",
        "Add a reason for your concern.",
        "Offer an alternative option.",
        "Correct this: You are wrong, this won't work.",
      ],
      roleplay: {
        scenario: "A teammate suggests skipping testing to save time.",
        learnerRole: "Disagree politely and suggest a safer alternative.",
        agentRole: "Act as the teammate and push back once.",
      },
    },
    successCriteria: [
      "Acknowledges the other person's point.",
      "States disagreement politely.",
      "Offers one alternative or recommendation.",
    ],
    homework: "Write three polite disagreement sentences for workplace situations.",
  },
  {
    subsectionId: "i07-workplace-english-06",
    ruleSummary: "Give estimates with confidence level, assumptions, and uncertainty.",
    explanation: {
      Beginner: "An estimate says how long something may take. Use: It may take..., I expect..., It depends on...",
      Intermediate: "A useful estimate includes time, confidence, assumptions, and risks. Avoid giving a number without context.",
      Advanced: "Professional estimates communicate confidence intervals, dependencies, and trade-offs without sounding evasive.",
    },
    examples: [
      "I expect this to take around two hours if the test environment is stable.",
      "My rough estimate is one day, but it depends on the API response issue.",
      "I am about 70% confident we can finish this by tomorrow afternoon.",
      "If we skip the optional cleanup, we can deliver it today.",
      "The estimate may change after I review the logs.",
    ],
    commonMistakes: [
      { wrong: "It will take two hours sure.", right: "I expect it to take around two hours, assuming the environment is stable.", why: "Add assumption and avoid overpromising." },
      { wrong: "Maybe tomorrow maybe not.", right: "It may be ready tomorrow, but it depends on the test result.", why: "State the dependency clearly." },
      { wrong: "I can't tell exact.", right: "I cannot give an exact estimate yet, but my rough estimate is one day.", why: "Use a professional alternative and still provide useful information." },
    ],
    phases: ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"],
    activityTemplates: {
      drill: [
        "Give an estimate with: around, assuming, depends on.",
        "Say your confidence level politely.",
        "Explain what could change the estimate.",
        "Correct this: It will finish today sure.",
      ],
      roleplay: {
        scenario: "Manager asks when a task will be done.",
        learnerRole: "Give an estimate with assumptions and uncertainty.",
        agentRole: "Ask for confidence level and risk.",
      },
    },
    successCriteria: [
      "Gives a time estimate.",
      "Mentions at least one assumption or dependency.",
      "Avoids overpromising.",
    ],
    homework: "Prepare three estimates for work tasks using around, assuming, and depends on.",
  },
  {
    subsectionId: "i07-workplace-english-07",
    ruleSummary: "Explain delays with reason, impact, mitigation, and updated timeline.",
    explanation: {
      Beginner: "If something is late, say why, what is affected, and when you expect to finish.",
      Intermediate: "A professional delay update includes reason, impact, mitigation, and revised timeline.",
      Advanced: "A strong delay explanation is transparent, non-defensive, and action-oriented. It gives stakeholders enough information to decide.",
    },
    examples: [
      "The task is delayed because the test environment was unavailable this morning.",
      "This affects the release validation, but not the code freeze.",
      "I am working with the platform team to restore access.",
      "The revised timeline is tomorrow morning.",
      "I will share another update by end of day.",
    ],
    commonMistakes: [
      { wrong: "Task delayed because environment issue only.", right: "The task is delayed because the test environment is unavailable.", why: "Use a complete sentence with a clear reason." },
      { wrong: "I will finish maybe later.", right: "I expect to finish it by tomorrow morning.", why: "Give a clearer revised timeline." },
      { wrong: "Not my mistake, platform team issue.", right: "The delay is caused by an environment issue, and I am coordinating with the platform team.", why: "Avoid blame and explain the action you are taking." },
    ],
    phases: ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"],
    activityTemplates: {
      drill: [
        "Explain a delay using: reason, impact, action, new timeline.",
        "Rewrite: It is delayed due to issue only.",
        "Say one mitigation action.",
        "Repeat the improved delay update.",
      ],
      roleplay: {
        scenario: "You need to tell your manager a release task is delayed.",
        learnerRole: "Explain the delay professionally.",
        agentRole: "Ask about impact and revised timeline.",
      },
    },
    successCriteria: [
      "Explains the reason for delay.",
      "Mentions impact and mitigation.",
      "Gives an updated timeline.",
    ],
    homework: "Record a short delay update using reason, impact, action, and timeline.",
  },
  {
    subsectionId: "i07-workplace-english-08",
    ruleSummary: "Request support clearly by giving context, need, urgency, and expected outcome.",
    explanation: {
      Beginner: "When you need help, say what you are doing and what help you need.",
      Intermediate: "A good support request gives context, the exact request, urgency, and what will happen after support is provided.",
      Advanced: "A strong support request reduces back-and-forth by including evidence, priority, deadline, and ownership.",
    },
    examples: [
      "Could you help me review the deployment logs?",
      "I need support with the API timeout issue before the release validation.",
      "This is urgent because the release window closes at 5 p.m.",
      "If you can confirm the error pattern, I can proceed with the rollback decision.",
      "I have attached the relevant logs and timestamps.",
    ],
    commonMistakes: [
      { wrong: "Please help this issue.", right: "Could you help me investigate this issue?", why: "Use help me + verb to make the request complete." },
      { wrong: "Need support urgent.", right: "I need urgent support with the deployment validation.", why: "Use a complete sentence and name the task." },
      { wrong: "Can you check?", right: "Could you check the error logs from 10:15 to 10:30?", why: "Be specific about what needs checking." },
    ],
    phases: ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"],
    activityTemplates: {
      drill: [
        "Request support using: Could you help me...?",
        "Add context and urgency.",
        "Say what outcome you need.",
        "Correct this: Please help this issue.",
      ],
      roleplay: {
        scenario: "You need help from another team during a production issue.",
        learnerRole: "Request support with context and urgency.",
        agentRole: "Ask what exactly needs help and by when.",
      },
    },
    successCriteria: [
      "States the exact support needed.",
      "Provides context and urgency.",
      "Explains expected outcome.",
    ],
    homework: "Write three support requests: normal, urgent, and follow-up.",
  },
  {
    subsectionId: "i07-workplace-english-09",
    ruleSummary: "Summarize a meeting with decisions, action items, owners, and deadlines.",
    explanation: {
      Beginner: "A meeting summary says what was decided and who will do what next.",
      Intermediate: "A useful meeting summary includes decisions, action items, owners, deadlines, and open questions.",
      Advanced: "A professional summary is concise, structured, and unambiguous so people can act without re-reading the whole discussion.",
    },
    examples: [
      "Here is a quick summary of the meeting.",
      "We decided to proceed with the staging deployment today.",
      "Jithin will prepare the rollback checklist by 3 p.m.",
      "Sandra will confirm the test results by tomorrow morning.",
      "The open question is whether we need security approval before production.",
    ],
    commonMistakes: [
      { wrong: "Meeting discussed deployment and testing.", right: "In the meeting, we discussed deployment and testing.", why: "Use a complete sentence with a clear subject." },
      { wrong: "I will do rollback checklist until 3 p.m.", right: "I will prepare the rollback checklist by 3 p.m.", why: "Use by for deadlines and a precise verb like prepare." },
      { wrong: "Decision is we are going deployment.", right: "The decision is that we will proceed with the deployment.", why: "Use a correct noun clause after the decision is." },
    ],
    phases: ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"],
    activityTemplates: {
      drill: [
        "Summarize a meeting with decision, action, owner, deadline.",
        "Say one open question.",
        "Rewrite: Meeting discussed release.",
        "Repeat a concise meeting summary.",
      ],
      roleplay: {
        scenario: "You are summarizing a release planning meeting.",
        learnerRole: "Give a structured meeting summary.",
        agentRole: "Ask for owners, deadlines, and open questions.",
      },
    },
    successCriteria: [
      "Mentions at least one decision.",
      "Mentions action item, owner, and deadline.",
      "Keeps the summary concise and structured.",
    ],
    homework: "Summarize your next meeting in four lines: decision, action, owner, deadline.",
  },
  {
    subsectionId: "i07-workplace-english-10",
    ruleSummary: "Complete a workplace speaking checkpoint using standup, blocker, status, estimate, and summary skills.",
    explanation: {
      Beginner: "This checkpoint checks whether you can speak clearly about work using complete sentences.",
      Intermediate: "This checkpoint combines standup updates, blockers, status reporting, estimates, delays, support requests, and meeting summaries.",
      Advanced: "This checkpoint tests professional clarity, concision, register, and action-oriented communication across realistic workplace situations.",
    },
    examples: [
      "Yesterday, I completed the staging validation. Today, I will prepare the production checklist.",
      "I am blocked because I need access to the deployment dashboard.",
      "The task is on track, but the main risk is delayed approval.",
      "My estimate is around two hours, assuming the environment is stable.",
      "We decided to proceed tomorrow morning, and I will share the checklist by 5 p.m.",
    ],
    commonMistakes: [
      { wrong: "Yesterday I am working and today I did release.", right: "Yesterday I worked on validation, and today I will work on the release.", why: "Use past tense for yesterday and future/planned language for today." },
      { wrong: "I have blocker, please check.", right: "I am blocked because I need access. Could you help me check the permissions?", why: "Explain the blocker and make the support request specific." },
      { wrong: "It will finish sure today.", right: "I expect it to finish today if the environment remains stable.", why: "Avoid overpromising and include an assumption." },
    ],
    phases: ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"],
    activityTemplates: {
      drill: [
        "Give a 60-second workplace update.",
        "Explain one blocker and one support request.",
        "Give one estimate with assumption.",
        "Summarize one meeting decision and action item.",
      ],
      roleplay: {
        scenario: "Final workplace English simulation with manager and teammate questions.",
        learnerRole: "Respond professionally across multiple workplace prompts.",
        agentRole: "Assess clarity, grammar, register, concision, and correction ability.",
      },
    },
    successCriteria: [
      "Gives a clear standup update.",
      "Explains a blocker professionally.",
      "Gives an estimate with assumption.",
      "Summarizes a decision and action item.",
      "Repeats corrected sentences naturally.",
    ],
    homework: "Record a 90-second workplace update and repeat it once after correction.",
  },
];

export function getWorkplaceEnglishContent(subsectionId: string): CurriculumSubsectionContent | undefined {
  return workplaceEnglishContent.find((item) => item.subsectionId === subsectionId);
}
