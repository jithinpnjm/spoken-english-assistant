import type { GermanLevel, GermanSkill } from "./germanCurriculumRegistry";

const STORAGE_KEY = "deutsch-coach-learning-state-v1";

export interface StoredGermanMistake {
  id: string;
  createdAt: string;
  level: GermanLevel;
  skill: GermanSkill;
  subtopicId: string;
  focus: string;
  originalAnswer: string;
  correctedAnswer: string;
}

export interface GermanLearningState {
  selectedLevel: GermanLevel;
  completedSubtopicIds: string[];
  practiceAttempts: Record<string, number>;
  bestScores: Record<string, number>;
  mistakes: StoredGermanMistake[];
  vocabularyDueIds: string[];
  updatedAt: string;
}

export const defaultGermanLearningState: GermanLearningState = {
  selectedLevel: "A1",
  completedSubtopicIds: [],
  practiceAttempts: {},
  bestScores: {},
  mistakes: [],
  vocabularyDueIds: [],
  updatedAt: new Date().toISOString(),
};

function numberRecord(value: unknown): Record<string, number> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .filter((entry): entry is [string, number] => typeof entry[1] === "number" && Number.isFinite(entry[1]))
  );
}

function safeParse(raw: string | null): GermanLearningState {
  if (!raw) return defaultGermanLearningState;
  try {
    const parsed = JSON.parse(raw) as Partial<GermanLearningState>;
    return {
      ...defaultGermanLearningState,
      ...parsed,
      completedSubtopicIds: Array.isArray(parsed.completedSubtopicIds) ? parsed.completedSubtopicIds.filter((id): id is string => typeof id === "string") : [],
      practiceAttempts: numberRecord(parsed.practiceAttempts),
      bestScores: numberRecord(parsed.bestScores),
      mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
      vocabularyDueIds: Array.isArray(parsed.vocabularyDueIds) ? parsed.vocabularyDueIds.filter((id): id is string => typeof id === "string") : [],
    };
  } catch {
    return defaultGermanLearningState;
  }
}

export function loadGermanLearningState(): GermanLearningState {
  if (typeof window === "undefined") return defaultGermanLearningState;
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

export function saveGermanLearningState(state: GermanLearningState): GermanLearningState {
  const next = { ...state, updatedAt: new Date().toISOString() };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export function markGermanSubtopicComplete(state: GermanLearningState, subtopicId: string): GermanLearningState {
  const completedSubtopicIds = state.completedSubtopicIds.includes(subtopicId)
    ? state.completedSubtopicIds
    : [...state.completedSubtopicIds, subtopicId];
  return saveGermanLearningState({ ...state, completedSubtopicIds });
}

export function recordGermanPracticeAttempt(state: GermanLearningState, taskId: string, score: number): GermanLearningState {
  const attempts = (state.practiceAttempts[taskId] || 0) + 1;
  const best = Math.max(state.bestScores[taskId] || 0, score);
  return saveGermanLearningState({
    ...state,
    practiceAttempts: { ...state.practiceAttempts, [taskId]: attempts },
    bestScores: { ...state.bestScores, [taskId]: best },
  });
}

export function recordGermanMistake(state: GermanLearningState, mistake: Omit<StoredGermanMistake, "id" | "createdAt">): GermanLearningState {
  const nextMistake: StoredGermanMistake = {
    ...mistake,
    id: `de-mistake-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  return saveGermanLearningState({
    ...state,
    mistakes: [nextMistake, ...state.mistakes].slice(0, 100),
  });
}

export function resetGermanLearningState(): GermanLearningState {
  if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  return defaultGermanLearningState;
}
