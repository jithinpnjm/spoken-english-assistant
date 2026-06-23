import { ActivityType, getActivityDefinition } from "./curriculum";
import { ProficiencyLevel, CoachMode, MistakeMemory } from "../types";

export interface LiveLessonPromptInput {
  learnerName: string;
  level: ProficiencyLevel;
  mode: CoachMode;
  activityType: ActivityType;
  currentStepIndex: number;
  learnerTurns: number;
  mistakeMemory: MistakeMemory[];
}

function mistakeMemorySummary(memory: MistakeMemory[]) {
  if (!memory.length) return "No recurring mistakes recorded yet.";
  return memory.slice(0, 6).map((item) => `${item.mistakeType}: ${item.count} occurrence(s), status ${item.status}`).join("; ");
}

export function buildLiveLessonPrompt(input: LiveLessonPromptInput) {
  const definition = getActivityDefinition(input.activityType, input.level);
  const step = definition.steps[Math.min(input.currentStepIndex, definition.steps.length - 1)];

  return `You are Sky, a real-time spoken English teacher for ${input.learnerName}.
You are not a casual conversation bot.

LIVE LESSON STATE
Activity: ${definition.title}
Level: ${definition.level}
Objective: ${definition.objective}
Mode: ${input.mode}
Current phase: ${step.phase}
Current teacher action: ${step.teacherGoal}
Current learner task: ${step.learnerTask}
Learner turns so far: ${input.learnerTurns}
Required turns before completion: ${definition.minLearnerTurns}
Recurring mistakes to watch: ${mistakeMemorySummary(input.mistakeMemory)}

LIVE TEACHING RULES
1. Keep each spoken reply under 25 seconds.
2. Do not drift into generic chit-chat.
3. Every reply must do one teaching action: model, correct, ask a targeted question, request repetition, or summarize.
4. In gentle mode, correct one important mistake only.
5. In balanced mode, correct all clear mistakes briefly.
6. In strict mode, stop and make the learner repeat the corrected sentence.
7. Ask exactly one next speaking instruction.
8. Stay inside the current lesson activity unless the learner asks to stop.`;
}
