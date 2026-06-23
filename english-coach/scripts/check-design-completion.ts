import fs from "fs";
import path from "path";

function fail(message: string): never {
  console.error(`[design-completion] FAIL: ${message}`);
  process.exit(1);
}

const root = process.cwd();
const files = [
  "docs/production-design-completion.md",
  "src/components/ContinueLessonCard.tsx",
  "src/components/LessonPhaseTimeline.tsx",
  "src/components/LessonEmptyState.tsx",
  "src/components/InteractiveCoach.tsx",
];

for (const file of files) {
  if (!fs.existsSync(path.join(root, file))) fail(`Missing file: ${file}`);
}

const coach = fs.readFileSync(path.join(root, "src/components/InteractiveCoach.tsx"), "utf8");
const required = [
  "ContinueLessonCard",
  "LessonPhaseTimeline",
  "LessonEmptyState",
  "continueCurrentLesson",
  "hasConversationMessages",
  "Ready to continue your lesson",
];

for (const phrase of required) {
  if (!coach.includes(phrase)) fail(`InteractiveCoach missing: ${phrase}`);
}

const timeline = fs.readFileSync(path.join(root, "src/components/LessonPhaseTimeline.tsx"), "utf8");
for (const phase of ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"]) {
  if (!timeline.includes(phase)) fail(`Timeline missing phase: ${phase}`);
}

console.log("[design-completion] OK: continue lesson, empty state, and lesson timeline UI are wired.");
