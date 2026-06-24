import type { GermanLevel } from "./germanCurriculumRegistry";
import type { GermanLearningState } from "./germanLocalLearningState";
import { getCatalogOrderedPath } from "./germanOrderedPath";

export interface GermanStudyRecommendation {
  id: string;
  level: GermanLevel;
  title: string;
  reason: string;
  action: string;
  priority: "low" | "medium" | "high";
}

function hasRecentMistake(state: GermanLearningState, focus: string): boolean {
  return state.mistakes.some((mistake) => mistake.focus.toLowerCase().includes(focus.toLowerCase()));
}

export function buildGermanStudyRecommendations(level: GermanLevel, state: GermanLearningState): GermanStudyRecommendation[] {
  const path = getCatalogOrderedPath(level);
  const nextPathItem = path.find((item) => !state.completedSubtopicIds.includes(item.catalogId || ""));
  const recommendations: GermanStudyRecommendation[] = [];

  if (nextPathItem) {
    recommendations.push({
      id: `next-${nextPathItem.catalogId || nextPathItem.sequence}`,
      level,
      title: `Continue: ${nextPathItem.title}`,
      reason: "This is the next topic in the enriched ordered learning path.",
      action: "Study the topic, complete one practice task, then mark it done.",
      priority: "high",
    });
  }

  if (level === "A1") {
    recommendations.push({
      id: "a1-writing-form-message",
      level,
      title: "Repair A1 writing basics",
      reason: "A1 Goethe writing depends heavily on forms and short personal messages.",
      action: "Practise form filling, sick message, appointment cancellation, and invitation reply.",
      priority: "high",
    });
  }

  if (level === "A2") {
    recommendations.push({
      id: "a2-clause-repair",
      level,
      title: "Repair A2 word order in subordinate clauses",
      reason: "A2 writing and speaking depend on dass, weil, wenn, obwohl, and indirect-question word order.",
      action: "Drill one sentence each for dass, weil, wenn, obwohl, and indirect questions.",
      priority: "high",
    });
  }

  if (level === "B1") {
    recommendations.push({
      id: "b1-redemittel-production",
      level,
      title: "Drill B1 Redemittel",
      reason: "B1 writing and speaking require structured opinion, suggestion, agreement, disagreement, and presentation phrases.",
      action: "Practise one opinion post and one planning answer using fixed phrases.",
      priority: "high",
    });
  }

  if (hasRecentMistake(state, "article") || hasRecentMistake(state, "case")) {
    recommendations.push({
      id: "repair-article-case",
      level,
      title: "Repair articles and cases",
      reason: "Your saved mistakes include article/case problems, which affect writing and speaking accuracy.",
      action: "Do 10 drills with der/die/das, accusative, and dative patterns.",
      priority: "high",
    });
  }

  if (hasRecentMistake(state, "word")) {
    recommendations.push({
      id: "repair-word-order",
      level,
      title: "Repair word order",
      reason: "Saved mistakes include word-order issues, which are important from A1 through B1.",
      action: "Repeat corrected model sentences aloud and rewrite them once.",
      priority: "medium",
    });
  }

  return recommendations.slice(0, 5);
}
