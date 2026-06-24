import { useEffect, useState } from "react";
import {
  defaultGermanLearningState,
  loadGermanLearningState,
  markGermanSubtopicComplete,
  recordGermanMistake,
  recordGermanPracticeAttempt,
  resetGermanLearningState,
  type GermanLearningState,
  type StoredGermanMistake,
} from "../lib/germanLocalLearningState";

export function useGermanLearningState() {
  const [state, setState] = useState<GermanLearningState>(defaultGermanLearningState);

  useEffect(() => {
    setState(loadGermanLearningState());
  }, []);

  function completeSubtopic(subtopicId: string) {
    setState((current) => markGermanSubtopicComplete(current, subtopicId));
  }

  function recordAttempt(taskId: string, score: number) {
    setState((current) => recordGermanPracticeAttempt(current, taskId, score));
  }

  function addMistake(mistake: Omit<StoredGermanMistake, "id" | "createdAt">) {
    setState((current) => recordGermanMistake(current, mistake));
  }

  function reset() {
    setState(resetGermanLearningState());
  }

  return {
    state,
    completeSubtopic,
    recordAttempt,
    addMistake,
    reset,
  };
}
