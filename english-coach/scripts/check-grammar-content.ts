import { grammarForSpeakingContent, grammarForSpeakingModuleIds } from "../src/server/grammarForSpeakingContent";
import { getCurriculumModule } from "../src/server/curriculumRegistry";
import { getTeachingContent, isHandAuthoredContent } from "../src/server/curriculumContentRegistry";

function fail(message: string): never {
  console.error(`[grammar-content] FAIL: ${message}`);
  process.exit(1);
}

if (!grammarForSpeakingModuleIds.length) fail("No Grammar for Speaking module IDs configured");
if (!grammarForSpeakingContent.length) fail("No Grammar for Speaking content generated");

const expectedIds: string[] = [];
for (const moduleId of grammarForSpeakingModuleIds) {
  const module = getCurriculumModule(moduleId);
  if (!module) fail(`Missing curriculum module ${moduleId}`);
  expectedIds.push(...module.subsections.map((item) => item.id));
}

const contentIds = grammarForSpeakingContent.map((item) => item.subsectionId);
for (const id of expectedIds) {
  if (!contentIds.includes(id)) fail(`Missing Grammar for Speaking content for ${id}`);
  if (!isHandAuthoredContent(id)) fail(`${id} is not marked as authored content`);
  const content = getTeachingContent(id);
  if (!content.ruleSummary.trim()) fail(`${id} has empty ruleSummary`);
  if (!content.explanation.Intermediate.includes("Goal:")) fail(`${id} intermediate explanation must include Goal`);
  if (!content.explanation.Intermediate.includes("spoken pattern")) fail(`${id} intermediate explanation must include spoken pattern`);
  if (content.examples.length < 5) fail(`${id} should have at least five examples`);
  if (content.commonMistakes.length < 3) fail(`${id} should have at least three common mistakes`);
  if (content.activityTemplates.drill.length < 4) fail(`${id} should have at least four drills`);
  if (content.successCriteria.length < 4) fail(`${id} should have at least four success criteria`);
}

for (const id of contentIds) {
  if (!expectedIds.includes(id)) fail(`Unknown Grammar for Speaking content subsection ${id}`);
}

console.log(`[grammar-content] OK: ${grammarForSpeakingContent.length} common authored lessons across ${grammarForSpeakingModuleIds.length} Grammar for Speaking modules.`);
