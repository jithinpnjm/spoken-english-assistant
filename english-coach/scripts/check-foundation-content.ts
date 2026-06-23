import { foundationEnglishContent, foundationEnglishModuleIds } from "../src/server/foundationEnglishContent";
import { getCurriculumModule } from "../src/server/curriculumRegistry";
import { getTeachingContent, isHandAuthoredContent } from "../src/server/curriculumContentRegistry";

function fail(message: string): never {
  console.error(`[foundation-content] FAIL: ${message}`);
  process.exit(1);
}

if (!foundationEnglishModuleIds.length) fail("No Foundation English module IDs configured");
if (!foundationEnglishContent.length) fail("No Foundation English content generated");

const expectedIds: string[] = [];
for (const moduleId of foundationEnglishModuleIds) {
  const module = getCurriculumModule(moduleId);
  if (!module) fail(`Missing curriculum module ${moduleId}`);
  expectedIds.push(...module.subsections.map((item) => item.id));
}

const contentIds = foundationEnglishContent.map((item) => item.subsectionId);
for (const id of expectedIds) {
  if (!contentIds.includes(id)) fail(`Missing Foundation English content for ${id}`);
  if (!isHandAuthoredContent(id)) fail(`${id} is not marked as hand-authored/common authored content`);
  const content = getTeachingContent(id);
  if (!content.ruleSummary.trim()) fail(`${id} has empty ruleSummary`);
  if (!content.explanation.Beginner.includes("Goal:")) fail(`${id} beginner explanation must include Goal`);
  if (!content.explanation.Beginner.includes("Meaning:")) fail(`${id} beginner explanation must include Meaning`);
  if (!content.explanation.Beginner.includes("Pattern:")) fail(`${id} beginner explanation must include Pattern`);
  if (content.examples.length < 5) fail(`${id} should have at least five examples`);
  if (content.commonMistakes.length < 3) fail(`${id} should have at least three common mistakes`);
  if (content.activityTemplates.drill.length < 4) fail(`${id} should have at least four drills`);
  if (content.successCriteria.length < 4) fail(`${id} should have at least four success criteria`);
}

for (const id of contentIds) {
  if (!expectedIds.includes(id)) fail(`Unknown Foundation English content subsection ${id}`);
}

console.log(`[foundation-content] OK: ${foundationEnglishContent.length} common authored lessons across ${foundationEnglishModuleIds.length} Foundation English modules.`);
