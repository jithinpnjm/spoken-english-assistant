import { getCurriculumModule } from "../src/server/curriculumRegistry";
import { workplaceEnglishContent } from "../src/server/workplaceEnglishContent";
import { getTeachingContent, isHandAuthoredContent } from "../src/server/curriculumContentRegistry";

function fail(message: string): never {
  console.error(`[workplace-content] FAIL: ${message}`);
  process.exit(1);
}

const module = getCurriculumModule("i07-workplace-english");
if (!module) fail("Missing i07-workplace-english module");

const expectedIds = module.subsections.map((item) => item.id);
const authoredIds = workplaceEnglishContent.map((item) => item.subsectionId);

for (const id of expectedIds) {
  if (!authoredIds.includes(id)) fail(`Missing authored workplace content for ${id}`);
  if (!isHandAuthoredContent(id)) fail(`${id} is not marked as hand-authored`);
  const content = getTeachingContent(id);
  if (content.examples.length < 5) fail(`${id} should have at least five examples`);
  if (content.commonMistakes.length < 3) fail(`${id} should have at least three common mistakes`);
  if (content.successCriteria.length < 3) fail(`${id} should have at least three success criteria`);
}

for (const id of authoredIds) {
  if (!expectedIds.includes(id)) fail(`Unknown workplace content subsection ${id}`);
}

console.log(`[workplace-content] OK: ${workplaceEnglishContent.length} authored subsections for i07-workplace-english.`);
