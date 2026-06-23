import { getCurriculumModule } from "../src/server/curriculumRegistry";
import { pilotPastTenseContent } from "../src/server/pilotPastTenseContent";

function fail(message: string): never {
  console.error(`[pilot-content] FAIL: ${message}`);
  process.exit(1);
}

const pilotModule = getCurriculumModule("b09-past-tense-pilot");
if (!pilotModule) fail("Missing pilot module b09-past-tense-pilot in curriculum registry");

const expectedIds = pilotModule.subsections.map((item) => item.id);
const contentIds = pilotPastTenseContent.map((item) => item.subsectionId);

for (const id of expectedIds) {
  if (!contentIds.includes(id)) fail(`Missing authored content for ${id}`);
}

for (const item of pilotPastTenseContent) {
  if (!expectedIds.includes(item.subsectionId)) fail(`Authored content references unknown subsection ${item.subsectionId}`);
  if (!item.ruleSummary.trim()) fail(`${item.subsectionId} has empty ruleSummary`);
  if (item.examples.length < 3) fail(`${item.subsectionId} needs at least three examples`);
  if (item.commonMistakes.length < 2) fail(`${item.subsectionId} needs at least two common mistakes`);
  if (item.activityTemplates.drill.length < 3) fail(`${item.subsectionId} needs at least three drill prompts`);
  if (item.successCriteria.length < 2) fail(`${item.subsectionId} needs at least two success criteria`);
}

console.log(`[pilot-content] OK: ${pilotPastTenseContent.length} authored subsections for b09-past-tense-pilot.`);
