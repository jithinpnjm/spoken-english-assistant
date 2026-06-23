import { dailyLifeEnglishContent, dailyLifeEnglishModuleIds } from "../src/server/dailyLifeEnglishContent";
import { getCurriculumModule } from "../src/server/curriculumRegistry";
import { getTeachingContent, isHandAuthoredContent } from "../src/server/curriculumContentRegistry";

function fail(message: string): never {
  console.error(`[daily-life-content] FAIL: ${message}`);
  process.exit(1);
}

if (!dailyLifeEnglishModuleIds.length) fail("No Daily Life module IDs configured");
if (!dailyLifeEnglishContent.length) fail("No Daily Life content generated");

const expectedIds: string[] = [];
for (const moduleId of dailyLifeEnglishModuleIds) {
  const module = getCurriculumModule(moduleId);
  if (!module) fail(`Missing curriculum module ${moduleId}`);
  expectedIds.push(...module.subsections.map((item) => item.id));
}

const contentIds = dailyLifeEnglishContent.map((item) => item.subsectionId);
for (const id of expectedIds) {
  if (!contentIds.includes(id)) fail(`Missing Daily Life content for ${id}`);
  if (!isHandAuthoredContent(id)) fail(`${id} is not marked as authored content`);
  const content = getTeachingContent(id);
  if (!content.ruleSummary.trim()) fail(`${id} has empty ruleSummary`);
  if (!content.explanation.Intermediate.includes("Goal:")) fail(`${id} intermediate explanation must include Goal`);
  if (!content.explanation.Intermediate.includes("speaking pattern")) fail(`${id} intermediate explanation must include speaking pattern`);
  if (content.examples.length < 5) fail(`${id} should have at least five examples`);
  if (content.commonMistakes.length < 3) fail(`${id} should have at least three common mistakes`);
  if (content.activityTemplates.drill.length < 4) fail(`${id} should have at least four drills`);
  if (content.successCriteria.length < 4) fail(`${id} should have at least four success criteria`);
}

for (const id of contentIds) {
  if (!expectedIds.includes(id)) fail(`Unknown Daily Life content subsection ${id}`);
}

console.log(`[daily-life-content] OK: ${dailyLifeEnglishContent.length} common authored lessons across ${dailyLifeEnglishModuleIds.length} Daily Life modules.`);
