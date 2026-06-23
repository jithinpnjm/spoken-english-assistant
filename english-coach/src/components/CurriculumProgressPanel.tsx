import { useMemo, useState } from "react";
import { BookOpen, Clock3, GraduationCap, Layers, ListChecks, MapPinned, PlayCircle, Search } from "lucide-react";
import { findCourse, findModule, findSubsection, type CurriculumCourseView, type LessonCursorView } from "../lib/curriculumClient";

interface CurriculumProgressPanelProps {
  courses: CurriculumCourseView[];
  cursor: LessonCursorView | null;
  selectedLevel: "Beginner" | "Intermediate" | "Advanced";
  onSelectedLevelChange: (level: "Beginner" | "Intermediate" | "Advanced") => void;
  selectedModuleId: string;
  selectedSubsectionId: string;
  onSelectedModuleChange: (moduleId: string) => void;
  onSelectedSubsectionChange: (subsectionId: string) => void;
  onStartLevel: () => void;
  onStartModule: () => void;
  onStartSubsection: (subsectionId?: string) => void;
  selectedTrackTitle?: string;
  allowedModuleIds?: string[];
  isBusy?: boolean;
}

const phaseLabels: Record<string, string> = {
  intro: "Intro",
  model: "Model",
  controlled_practice: "Practice",
  correction: "Correction",
  repeat: "Repeat",
  free_practice: "Free practice",
  summary: "Summary",
};

function lessonTimeLabel(subsectionId: string, cursor: LessonCursorView | null) {
  if (cursor?.subsectionId === subsectionId) return "In progress";
  return "0 min";
}

export default function CurriculumProgressPanel({
  courses,
  cursor,
  selectedLevel,
  onSelectedLevelChange,
  selectedModuleId,
  selectedSubsectionId,
  onSelectedModuleChange,
  onSelectedSubsectionChange,
  onStartLevel,
  onStartModule,
  onStartSubsection,
  selectedTrackTitle,
  allowedModuleIds,
  isBusy,
}: CurriculumProgressPanelProps) {
  const [searchDraft, setSearchDraft] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const course = findCourse(courses, cursor?.courseId);
  const module = findModule(courses, cursor?.moduleId);
  const subsection = findSubsection(courses, cursor?.subsectionId);
  const selectedModule = findModule(courses, selectedModuleId);
  const phase = cursor?.phase || "not_started";

  const filteredModules = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const allowed = allowedModuleIds?.length ? new Set(allowedModuleIds) : null;
    return courses
      .filter((item) => item.levelBand === selectedLevel || Boolean(allowed))
      .flatMap((item) => item.modules)
      .filter((item) => !allowed || allowed.has(item.id))
      .filter((item) => {
        if (!term) return true;
        const moduleText = `${item.title} ${item.id}`.toLowerCase();
        const subsectionText = item.subsections.map((s) => `${s.title} ${s.id}`).join(" ").toLowerCase();
        return moduleText.includes(term) || subsectionText.includes(term);
      });
  }, [courses, selectedLevel, searchTerm, allowedModuleIds]);

  const visibleSubsections = selectedModule?.subsections || [];

  function chooseAndStartSubsection(subsectionId: string) {
    onSelectedSubsectionChange(subsectionId);
    onStartSubsection(subsectionId);
  }

  return (
    <section className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-cyan-200 font-bold">Study Mode</h2>
          <p className="text-[11px] text-slate-400">Choose level, track, module, or click any subtopic directly.</p>
        </div>
        <MapPinned className="h-5 w-5 text-cyan-300" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="rounded-xl bg-black/20 border border-white/10 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1"><BookOpen className="h-3 w-3" /> Current course</p>
          <p className="font-semibold text-slate-100">{course?.title || `${selectedLevel} study path not started`}</p>
        </div>
        <div className="rounded-xl bg-black/20 border border-white/10 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1"><Layers className="h-3 w-3" /> Current module</p>
          <p className="font-semibold text-slate-100">{module?.title || "Not selected"}</p>
        </div>
        <div className="rounded-xl bg-black/20 border border-white/10 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Current lesson</p>
          <p className="font-semibold text-slate-100">{subsection?.title || cursor?.subsectionId || "Not started"}</p>
          {cursor?.phaseSummary && <p className="text-[11px] text-slate-400 mt-1">{cursor.phaseSummary}</p>}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
          <span>Lesson phase</span>
          <span>{phaseLabels[phase] || phase}</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"].map((item) => (
            <div key={item} title={phaseLabels[item]} className={`h-2 rounded-full ${item === phase ? "bg-cyan-300" : "bg-white/15"}`} />
          ))}
        </div>
      </div>

      <div className="space-y-2 rounded-2xl border border-white/10 bg-black/20 p-3">
        <p className="text-[10px] uppercase tracking-widest text-cyan-200 font-bold">Lesson picker</p>

        <label className="block">
          <span className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-400"><GraduationCap className="h-3 w-3" /> Level</span>
          <select value={selectedLevel} onChange={(e) => onSelectedLevelChange(e.target.value as "Beginner" | "Intermediate" | "Advanced")} className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-xs">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label>

        <div className="flex gap-2">
          <input value={searchDraft} onChange={(e) => setSearchDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") setSearchTerm(searchDraft); }} placeholder="Search module/topic..." className="min-w-0 flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none" />
          <button type="button" onClick={() => setSearchTerm(searchDraft)} className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 text-xs flex items-center gap-1"><Search className="h-3 w-3" /> Search</button>
        </div>

        <label className="block">
          <span className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-400"><Layers className="h-3 w-3" /> Module</span>
          <select value={selectedModuleId} onChange={(e) => { onSelectedModuleChange(e.target.value); onSelectedSubsectionChange(""); }} className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-xs">
            <option value="">Choose a module...</option>
            {filteredModules.map((item) => <option key={item.id} value={item.id}>{item.levelBand}: {item.title}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-400"><ListChecks className="h-3 w-3" /> Topic / lesson</span>
          <select value={selectedSubsectionId} onChange={(e) => onSelectedSubsectionChange(e.target.value)} disabled={!selectedModuleId} className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-xs disabled:opacity-50">
            <option value="">Choose a topic...</option>
            {visibleSubsections.map((item) => <option key={item.id} value={item.id}>{item.order}. {item.title}</option>)}
          </select>
        </label>

        {visibleSubsections.length > 0 && (
          <div className="space-y-2 rounded-xl border border-white/10 bg-slate-950/40 p-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] uppercase tracking-wider text-cyan-200 font-bold">Clickable subtopics</p>
              <p className="text-[10px] text-slate-500">time spent</p>
            </div>
            <div className="max-h-56 overflow-y-auto space-y-1">
              {visibleSubsections.map((item) => {
                const active = cursor?.subsectionId === item.id;
                const selected = selectedSubsectionId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={isBusy}
                    onClick={() => chooseAndStartSubsection(item.id)}
                    className={`w-full rounded-xl border px-3 py-2 text-left text-xs transition disabled:opacity-50 ${active ? "border-cyan-300/70 bg-cyan-500/20" : selected ? "border-cyan-400/40 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-slate-100">{item.order}. {item.title}</span>
                      <span className="shrink-0 rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] text-slate-300 flex items-center gap-1"><Clock3 className="h-3 w-3" /> {lessonTimeLabel(item.id, cursor)}</span>
                    </span>
                    <span className="mt-1 block text-[10px] text-slate-500">Click to start/resume this subtopic directly</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <p className="text-[10px] text-slate-400">
          {selectedTrackTitle ? `Track: ${selectedTrackTitle}. ` : ""}{filteredModules.length} module(s) visible{searchTerm ? ` matching “${searchTerm}”` : ""}.
        </p>

        <div className="grid grid-cols-3 gap-2">
          <button disabled={isBusy} onClick={onStartLevel} className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-2 py-2 text-xs flex items-center justify-center gap-1 disabled:opacity-50"><PlayCircle className="h-3 w-3" /> Level</button>
          <button disabled={isBusy || !selectedModuleId} onClick={onStartModule} className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-2 py-2 text-xs flex items-center justify-center gap-1 disabled:opacity-50"><PlayCircle className="h-3 w-3" /> Module</button>
          <button disabled={isBusy || !selectedSubsectionId} onClick={() => onStartSubsection()} className="rounded-xl bg-cyan-600/80 hover:bg-cyan-500 border border-cyan-300/20 px-2 py-2 text-xs flex items-center justify-center gap-1 disabled:opacity-50"><PlayCircle className="h-3 w-3" /> Topic</button>
        </div>
      </div>
    </section>
  );
}
