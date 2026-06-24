import type { GermanLevel, GermanSubtopic } from "./germanCurriculumRegistry";
import type { GermanPracticeTask } from "./germanPracticeEngine";
import { germanA2RepairTasks } from "./germanA2RepairTasks";
import { germanB1RepairTasks } from "./germanB1RepairTasks";

function repairToPracticeTask(repair: {
  id: string;
  level: GermanLevel;
  title: string;
  prompt: string;
  expectedAnswer: string;
  correctedModel: string;
  explanation: string;
  dailyLifeUse?: string;
  goetheUse?: string;
  examUse?: string;
}): GermanPracticeTask {
  return {
    id: repair.id,
    level: repair.level,
    subtopicId: `${repair.level.toLowerCase()}-repair-bank`,
    type: "rewrite",
    prompt: repair.prompt,
    helper: [repair.title, repair.goetheUse || repair.examUse, repair.dailyLifeUse].filter(Boolean).join(" · "),
    expectedAnswers: [repair.expectedAnswer],
    correctedModel: repair.correctedModel,
    explanation: repair.explanation,
    mistakeFocus: [repair.title],
  };
}

function subtopicText(subtopic: GermanSubtopic): string {
  return [
    subtopic.id,
    subtopic.title,
    subtopic.description,
    ...subtopic.grammarFocus,
    ...subtopic.vocabularyFocus,
    ...subtopic.practiceModes,
  ].join(" ").toLowerCase();
}

export function buildRepairPracticeTasks(level: GermanLevel, subtopic: GermanSubtopic): GermanPracticeTask[] {
  const text = subtopicText(subtopic);

  if (level === "A2") {
    return germanA2RepairTasks
      .filter((task) => {
        const focus = task.focus.replace(/_/g, " ").toLowerCase();
        return text.includes("a2") || text.includes(focus) || task.explanation.toLowerCase().split(" ").some((word) => word.length > 6 && text.includes(word));
      })
      .slice(0, 4)
      .map(repairToPracticeTask);
  }

  if (level === "B1") {
    return germanB1RepairTasks
      .filter((task) => {
        const focus = task.focus.replace(/_/g, " ").toLowerCase();
        return text.includes("b1") || text.includes(focus) || task.explanation.toLowerCase().split(" ").some((word) => word.length > 6 && text.includes(word));
      })
      .slice(0, 4)
      .map(repairToPracticeTask);
  }

  return [];
}

export function getLevelRepairPracticeTasks(level: GermanLevel): GermanPracticeTask[] {
  if (level === "A2") return germanA2RepairTasks.map(repairToPracticeTask);
  if (level === "B1") return germanB1RepairTasks.map(repairToPracticeTask);
  return [];
}
