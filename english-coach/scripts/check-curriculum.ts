import { curriculumCourses, curriculumModules, curriculumStats, curriculumSubsections } from "../src/server/curriculumRegistry";

const expected = {
  courses: 3,
  modules: 36,
  minimumSubsections: 330,
};

function fail(message: string): never {
  console.error(`[curriculum] FAIL: ${message}`);
  process.exit(1);
}

if (curriculumStats.courses !== expected.courses) {
  fail(`Expected ${expected.courses} courses, found ${curriculumStats.courses}`);
}

if (curriculumStats.modules !== expected.modules) {
  fail(`Expected ${expected.modules} modules, found ${curriculumStats.modules}`);
}

if (curriculumStats.subsections < expected.minimumSubsections) {
  fail(`Expected at least ${expected.minimumSubsections} subsections, found ${curriculumStats.subsections}`);
}

const duplicateIds = curriculumSubsections
  .map((item) => item.id)
  .filter((id, index, all) => all.indexOf(id) !== index);

if (duplicateIds.length) {
  fail(`Duplicate subsection IDs: ${[...new Set(duplicateIds)].join(", ")}`);
}

for (const course of curriculumCourses) {
  if (!course.modules.length) fail(`Course ${course.id} has no modules`);
}

for (const module of curriculumModules) {
  if (!module.subsections.length) fail(`Module ${module.id} has no subsections`);
  for (const subsection of module.subsections) {
    for (const prerequisiteId of subsection.prerequisiteIds) {
      if (!curriculumSubsections.some((candidate) => candidate.id === prerequisiteId)) {
        fail(`Subsection ${subsection.id} references missing prerequisite ${prerequisiteId}`);
      }
    }
  }
}

console.log(`[curriculum] OK: ${curriculumStats.courses} courses, ${curriculumStats.modules} modules, ${curriculumStats.subsections} subsections.`);
