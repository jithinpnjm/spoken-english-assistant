import { useMemo, useState } from "react";
import { BookOpen, Layers, MapPinned, PlayCircle, Search } from "lucide-react";
import { findCourse, findModule, findSubsection, type CurriculumCourseView, type LessonCursorView } from "../lib/curriculumClient";

interface CurriculumProgressPanelProps {
  courses: CurriculumCourseView[];
  cursor: LessonCursorView | null;
  selectedLevel: "Beginner" | "Intermediate" | "Advanced";
  selectedModuleId: string;
  onSelectedModuleChange: (moduleId: string) => void;
  onStartLevel: () => void;
  onStartModule: () => void;
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

export default function CurriculumProgressPanel({ courses, cursor, selectedLevel, selectedModuleId, onSelectedModuleChange, onStartLevel, onStartModule, isBusy }: CurriculumProgressPanelProps) {
  const [searchDraft, setSearchDraft] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const course = findCourse(courses, cursor?.courseId);
  const module = findModule(courses, cursor?.moduleId);
  const subsection = findSubsection(courses, cursor?.subsectionId);
  const phase = cursor?.phase || "not_started";

  const filteredModules = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return courses
      .filter((item) => item.levelBand === selectedLevel)
      .flatMap((item) => item.modules)
      .filter((item) => {
        if (!term) return true;
        const moduleText = `${item.title} ${item.id}`.toLowerCase();
        const subsectionText = item.subsections.map((s) => `${s.title} ${s.id}`).join(" ").toLowerCase();
        return moduleText.includes(term) || subsectionText.includes(term);
      });
  }, [courses, selectedLevel, searchTerm]);

  return (
    <section className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-cyan-200 font-bold">Curriculum engine</h2>
          <p className="text-[11px] text-slate-400">Showing {selectedLevel} modules only</p>
        </div>
        <MapPinned className="h-5 w-5 text-cyan-300" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="rounded-xl bg-black/20 border border-white/10 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1"><BookOpen className="h-3 w-3" /> Course</p>
          <p className="font-semibold text-slate-100">{course?.title || `${selectedLevel} track not started`}</p>
        </div>
        <div className="rounded-xl bg-black/20 border border-white/10 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1"><Layers className="h-3 w-3" /> Module</p>
          <p className="font-semibold text-slate-100">{module?.title || "Not selected"}</p>
        </div>
        <div className="rounded-xl bg-black/20 border border-white/10 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Subsection</p>
          <p className="font-semibold text-slate-100">{subsection?.title || cursor?.subsectionId || "Not started"}</p>
          {cursor?.phaseSummary && <p className="text-[11px] text-slate-400 mt-1">{cursor.phaseSummary}</p>}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
          <span>Phase</span>
          <span>{phaseLabels[phase] || phase}</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"].map((item) => (
            <div key={item} title={phaseLabels[item]} className={`h-2 rounded-full ${item === phase ? "bg-cyan-300" : "bg-white/15"}`} />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <input value={searchDraft} onChange={(e) => setSearchDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") setSearchTerm(searchDraft); }} placeholder="Search module/subsection..." className="min-w-0 flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none" />
          <button type="button" onClick={() => setSearchTerm(searchDraft)} className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 text-xs flex items-center gap-1"><Search className="h-3 w-3" /> Search</button>
        </div>
        <select value={selectedModuleId} onChange={(e) => onSelectedModuleChange(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-xs">
          <option value="">Choose a {selectedLevel} module...</option>
          {filteredModules.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
        <p className="text-[10px] text-slate-400">{filteredModules.length} module(s) visible for {selectedLevel}{searchTerm ? ` matching “${searchTerm}”` : ""}.</p>
        <div className="grid grid-cols-2 gap-2">
          <button disabled={isBusy} onClick={onStartLevel} className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 text-xs flex items-center justify-center gap-1 disabled:opacity-50"><PlayCircle className="h-3 w-3" /> Start level</button>
          <button disabled={isBusy || !selectedModuleId} onClick={onStartModule} className="rounded-xl bg-cyan-600/80 hover:bg-cyan-500 border border-cyan-300/20 px-3 py-2 text-xs flex items-center justify-center gap-1 disabled:opacity-50"><PlayCircle className="h-3 w-3" /> Start module</button>
        </div>
      </div>
    </section>
  );
}
