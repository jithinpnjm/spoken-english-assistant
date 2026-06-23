import { advancedWorkplaceContent, advancedWorkplaceModuleIds } from "../src/server/advancedWorkplaceContent";
import { getCurriculumModule } from "../src/server/curriculumRegistry";
import { getTeachingContent, isHandAuthoredContent } from "../src/server/curriculumContentRegistry";

function fail(message: string): never {
  console.error(`[advanced-workplace-content] FAIL: ${message}`);
  process.exit(1);
}

if (!advancedWorkplaceModuleIds.length) fail("No advanced workplace module IDs configured");
if (!advancedWorkplaceContent.length) fail("No advanced workplace content generated");

const expectedIds: string[] = [];
for (const moduleId of advancedWorkplaceModuleIds) {
  const module = getCurriculumModule(moduleId);
  if (!module) fail(`Missing curriculum module ${moduleId}`);
  expectedIds.push(...module.subsections.map((item) => item.id));
}

const contentIds = advancedWorkplaceContent.map((item) => item.subsectionId);
for (const id of expectedIds) {
  if (!contentIds.includes(id)) fail(`Missing advanced workplace content for ${id}`);
  if (!isHandAuthoredContent(id)) fail(`${id} is not marked as authored content`);
  const content = getTeachingContent(id);
  if (!content.ruleSummary.trim()) fail(`${id} has empty ruleSummary`);
  if (!content.explanation.Advanced.includes("Core communication pattern")) fail(`${id} advanced explanation must include Core communication pattern`);
  if (content.examples.length < 5) fail(`${id} should have at least five examples`);
  if (content.commonMistakes.length < 3) fail(`${id} should have at least three common mistakes`);
  if (content.activityTemplates.drill.length < 4) fail(`${id} should have at least four drills`);
  if (content.successCriteria.length < 4) fail(`${id} should have at least four success criteria`);
}

for (const id of contentIds) {
  if (!expectedIds.includes(id)) fail(`Unknown advanced workplace content subsection ${id}`);
}

console.log(`[advanced-workplace-content] OK: ${advancedWorkplaceContent.length} common authored lessons across ${advancedWorkplaceModuleIds.length} advanced workplace modules.`);
