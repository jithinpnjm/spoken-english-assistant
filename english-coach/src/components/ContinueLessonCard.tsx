import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { findModule, findSubsection, type CurriculumCourseView, type LessonCursorView, type ProductTrackView } from "../lib/curriculumClient";

interface ContinueLessonCardProps {
  courses: CurriculumCourseView[];
  cursor: LessonCursorView | null;
  selectedTrack: ProductTrackView | null;
  onContinue: () => void;
  isBusy?: boolean;
}

const nextActionByPhase: Record<string, string> = {
  intro: "Continue the concept explanation and mini check.",
  model: "Review examples and notice the pattern.",
  controlled_practice: "Try one guided sentence or answer.",
  correction: "Review correction and understand the rule.",
  repeat: "Rewrite or repeat the corrected sentence.",
  free_practice: "Use the skill in a short conversation.",
  summary: "Finish recap and homework.",
};

export default function ContinueLessonCard({ courses, cursor, selectedTrack, onContinue, isBusy }: ContinueLessonCardProps) {
  const module = findModule(courses, cursor?.moduleId);
  const lesson = findSubsection(courses, cursor?.subsectionId);

  return (
    <section className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-emerald-200 font-bold">Continue lesson</h2>
          <p className="text-[11px] text-slate-400">Resume exactly from your saved study cursor.</p>
        </div>
        <Clock3 className="h-5 w-5 text-emerald-300" />
      </div>

      {cursor ? (
        <div className="mt-3 space-y-3">
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Track</p>
            <p className="font-semibold text-slate-100">{selectedTrack?.title || "Study track"}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Module</p>
            <p className="font-semibold text-slate-100">{module?.title || cursor.moduleId}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1"><BookOpen className="h-3 w-3" /> Lesson</p>
            <p className="font-semibold text-slate-100">{lesson?.title || cursor.subsectionId}</p>
            <p className="mt-1 text-[11px] text-slate-400">Phase: {cursor.phase}</p>
            <p className="mt-1 text-[11px] text-emerald-200">Next: {nextActionByPhase[cursor.phase] || "Continue the lesson."}</p>
          </div>
          <button disabled={isBusy} onClick={onContinue} className="w-full rounded-xl bg-emerald-600/80 hover:bg-emerald-500 border border-emerald-300/20 px-3 py-2 text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
            Continue lesson <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-slate-400">
          No active lesson yet. Choose a Study track and start a module.
        </div>
      )}
    </section>
  );
}
