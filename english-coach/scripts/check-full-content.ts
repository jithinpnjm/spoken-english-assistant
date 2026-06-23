import { curriculumSubsections } from "../src/server/curriculumRegistry";
import { getTeachingContent, isHandAuthoredContent } from "../src/server/curriculumContentRegistry";

function fail(message: string): never {
  console.error(`[full-content] FAIL: ${message}`);
  process.exit(1);
}

let handAuthored = 0;
let generated = 0;

for (const subsection of curriculumSubsections) {
  const content = getTeachingContent(subsection.id);
  if (!content.ruleSummary.trim()) fail(`${subsection.id} has empty ruleSummary`);
  if (!content.explanation.Beginner || !content.explanation.Intermediate || !content.explanation.Advanced) {
    fail(`${subsection.id} is missing level explanations`);
  }
  if (content.examples.length < 3) fail(`${subsection.id} needs at least three examples`);
  if (content.commonMistakes.length < 2) fail(`${subsection.id} needs at least two common mistakes`);
  if (content.activityTemplates.drill.length < 3) fail(`${subsection.id} needs at least three drills`);
  if (isHandAuthoredContent(subsection.id)) handAuthored += 1;
  else generated += 1;
}

console.log(`[full-content] OK: ${curriculumSubsections.length} subsections resolved (${handAuthored} hand-authored, ${generated} generated scaffold).`);
