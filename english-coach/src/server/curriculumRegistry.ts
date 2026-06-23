import fs from "fs";
import path from "path";
import type { TeachingPhase } from "../lib/curriculum";

export type CurriculumLevelBand = "Beginner" | "Intermediate" | "Advanced";
export type CurriculumPhase = TeachingPhase;

export interface CurriculumSubsection {
  id: string;
  title: string;
  order: number;
  levels: CurriculumLevelBand[];
  prerequisiteIds: string[];
  phases: CurriculumPhase[];
}

export interface CurriculumModule {
  id: string;
  title: string;
  order: number;
  courseId: string;
  levelBand: CurriculumLevelBand;
  subsections: CurriculumSubsection[];
}

export interface CurriculumCourse {
  id: string;
  title: string;
  order: number;
  levelBand: CurriculumLevelBand;
  modules: CurriculumModule[];
}

export const DEFAULT_CURRICULUM_PHASES: CurriculumPhase[] = [
  "intro",
  "model",
  "controlled_practice",
  "correction",
  "repeat",
  "free_practice",
  "summary",
];

const COURSE_RE = /^## Course `([^`]+)` — (.+)$/;
const MODULE_RE = /^### Module `([^`]+)` — (.+)$/;
const ROW_RE = /^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/;

function inferLevelBand(courseId: string): CurriculumLevelBand {
  if (courseId.startsWith("beginner-")) return "Beginner";
  if (courseId.startsWith("advanced-")) return "Advanced";
  return "Intermediate";
}

function curriculumMarkdownPath() {
  return path.resolve(process.cwd(), "docs", "curriculum-skeleton.md");
}

function parsePrerequisites(raw: string): string[] {
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "none") return [];
  return trimmed.split(",").map((item) => item.trim().replace(/^`|`$/g, "")).filter(Boolean);
}

export function parseCurriculumMarkdown(markdown: string): CurriculumCourse[] {
  const courses: CurriculumCourse[] = [];
  let currentCourse: CurriculumCourse | null = null;
  let currentModule: CurriculumModule | null = null;

  for (const line of markdown.split(/\r?\n/)) {
    const courseMatch = line.match(COURSE_RE);
    if (courseMatch) {
      currentCourse = {
        id: courseMatch[1],
        title: courseMatch[2].trim(),
        order: courses.length + 1,
        levelBand: inferLevelBand(courseMatch[1]),
        modules: [],
      };
      courses.push(currentCourse);
      currentModule = null;
      continue;
    }

    const moduleMatch = line.match(MODULE_RE);
    if (moduleMatch && currentCourse) {
      currentModule = {
        id: moduleMatch[1],
        title: moduleMatch[2].trim(),
        order: currentCourse.modules.length + 1,
        courseId: currentCourse.id,
        levelBand: currentCourse.levelBand,
        subsections: [],
      };
      currentCourse.modules.push(currentModule);
      continue;
    }

    const rowMatch = line.match(ROW_RE);
    if (rowMatch && currentModule) {
      currentModule.subsections.push({
        order: Number(rowMatch[1]),
        id: rowMatch[2],
        title: rowMatch[3].trim(),
        prerequisiteIds: parsePrerequisites(rowMatch[4]),
        levels: [currentModule.levelBand],
        phases: DEFAULT_CURRICULUM_PHASES,
      });
    }
  }

  return courses;
}

export function loadCurriculumCourses(): CurriculumCourse[] {
  const filePath = curriculumMarkdownPath();
  const markdown = fs.readFileSync(filePath, "utf8");
  const courses = parseCurriculumMarkdown(markdown);
  if (courses.length === 0) throw new Error(`No curriculum courses parsed from ${filePath}`);
  return courses;
}

export const curriculumCourses: CurriculumCourse[] = loadCurriculumCourses();
export const curriculumModules: CurriculumModule[] = curriculumCourses.flatMap((course) => course.modules);
export const curriculumSubsections: CurriculumSubsection[] = curriculumModules.flatMap((module) => module.subsections);

export function getCurriculumCourse(courseId: string): CurriculumCourse | undefined {
  return curriculumCourses.find((course) => course.id === courseId);
}

export function getCurriculumModule(moduleId: string): CurriculumModule | undefined {
  return curriculumModules.find((module) => module.id === moduleId);
}

export function getCurriculumSubsection(subsectionId: string): CurriculumSubsection | undefined {
  return curriculumSubsections.find((subsection) => subsection.id === subsectionId);
}

export function findModuleForSubsection(subsectionId: string): CurriculumModule | undefined {
  return curriculumModules.find((module) => module.subsections.some((subsection) => subsection.id === subsectionId));
}

export function findCourseForSubsection(subsectionId: string): CurriculumCourse | undefined {
  const module = findModuleForSubsection(subsectionId);
  return module ? getCurriculumCourse(module.courseId) : undefined;
}

export function getFirstCourseForLevel(levelBand: CurriculumLevelBand): CurriculumCourse {
  const course = curriculumCourses.find((item) => item.levelBand === levelBand);
  if (!course) throw new Error(`No curriculum course found for level ${levelBand}`);
  return course;
}

export function getInitialSubsectionForLevel(levelBand: CurriculumLevelBand): CurriculumSubsection {
  const course = getFirstCourseForLevel(levelBand);
  const first = course.modules[0]?.subsections[0];
  if (!first) throw new Error(`No initial subsection found for level ${levelBand}`);
  return first;
}

export function getNextSubsection(subsectionId: string): CurriculumSubsection | undefined {
  const module = findModuleForSubsection(subsectionId);
  if (!module) return undefined;

  const currentIndex = module.subsections.findIndex((item) => item.id === subsectionId);
  if (currentIndex >= 0 && currentIndex < module.subsections.length - 1) {
    return module.subsections[currentIndex + 1];
  }

  const course = getCurriculumCourse(module.courseId);
  const nextModule = course?.modules[module.order];
  return nextModule?.subsections[0];
}

export const curriculumStats = {
  courses: curriculumCourses.length,
  modules: curriculumModules.length,
  subsections: curriculumSubsections.length,
  pilotModuleId: "b09-past-tense-pilot",
};
