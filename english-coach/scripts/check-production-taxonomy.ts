import { curriculumModules } from "../src/server/curriculumRegistry";
import { productModes, productTracks, productionCurriculumSummary } from "../src/server/productionTaxonomy";

function fail(message: string): never {
  console.error(`[production-taxonomy] FAIL: ${message}`);
  process.exit(1);
}

const expectedModes = ["study", "practice", "review", "live"];
for (const mode of expectedModes) {
  if (!productModes.some((item) => item.id === mode)) fail(`Missing product mode: ${mode}`);
}

const expectedTracks = [
  "foundation-english",
  "daily-life-english",
  "grammar-for-speaking",
  "workplace-english",
  "interview-english",
  "professional-communication",
  "fluency-pronunciation",
  "review-mistake-repair",
];

for (const track of expectedTracks) {
  const item = productTracks.find((candidate) => candidate.id === track);
  if (!item) fail(`Missing product track: ${track}`);
  if (!item.title.trim()) fail(`Track ${track} is missing title`);
  if (!item.description.trim()) fail(`Track ${track} is missing description`);
  if (!item.moduleIds.length) fail(`Track ${track} has no mapped modules`);
}

const moduleIds = new Set(curriculumModules.map((module) => module.id));
for (const track of productTracks) {
  for (const moduleId of track.moduleIds) {
    if (!moduleIds.has(moduleId)) fail(`Track ${track.id} references missing module ${moduleId}`);
  }
}

if (productionCurriculumSummary.modes !== productModes.length) fail("Mode summary mismatch");
if (productionCurriculumSummary.tracks !== productTracks.length) fail("Track summary mismatch");

console.log(`[production-taxonomy] OK: ${productModes.length} modes, ${productTracks.length} tracks, ${curriculumModules.length} legacy modules mapped into production taxonomy.`);
