export interface CurriculumSubsectionView {
  id: string;
  title: string;
  order: number;
  prerequisiteIds: string[];
  phases: string[];
}

export interface CurriculumModuleView {
  id: string;
  title: string;
  order: number;
  courseId: string;
  levelBand: "Beginner" | "Intermediate" | "Advanced";
  subsections: CurriculumSubsectionView[];
}

export interface CurriculumCourseView {
  id: string;
  title: string;
  order: number;
  levelBand: "Beginner" | "Intermediate" | "Advanced";
  modules: CurriculumModuleView[];
}

export interface LessonCursorView {
  learnerId: string;
  courseId: string;
  moduleId: string;
  subsectionId: string;
  phase: string;
  turnsAtPhase: number;
  status: string;
  lastActiveAt: string;
  sessionDay: number;
  phaseSummary: string;
}

export interface CurriculumResponse {
  stats: { courses: number; modules: number; subsections: number; pilotModuleId: string };
  courses: CurriculumCourseView[];
}

export async function fetchCurriculum(): Promise<CurriculumResponse> {
  const res = await fetch("/api/curriculum");
  if (!res.ok) throw new Error(`Curriculum fetch failed: ${res.status}`);
  return res.json();
}

export async function startCurriculum(args: {
  learnerId: string;
  levelBand?: "Beginner" | "Intermediate" | "Advanced";
  moduleId?: string;
  subsectionId?: string;
  sessionDay?: number;
}): Promise<{ cursor: LessonCursorView }> {
  const res = await fetch("/api/curriculum/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Curriculum start failed: ${res.status}`);
  return data;
}

export function findCourse(courses: CurriculumCourseView[], courseId?: string) {
  return courses.find((course) => course.id === courseId) || null;
}

export function findModule(courses: CurriculumCourseView[], moduleId?: string) {
  for (const course of courses) {
    const module = course.modules.find((item) => item.id === moduleId);
    if (module) return module;
  }
  return null;
}

export function findSubsection(courses: CurriculumCourseView[], subsectionId?: string) {
  for (const course of courses) {
    for (const module of course.modules) {
      const subsection = module.subsections.find((item) => item.id === subsectionId);
      if (subsection) return subsection;
    }
  }
  return null;
}
