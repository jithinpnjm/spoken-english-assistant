import { BookOpen, MessageCircle, PlayCircle } from "lucide-react";
import { findModule, findSubsection, type CurriculumCourseView, type LessonCursorView, type ProductTrackView } from "../lib/curriculumClient";

interface LessonEmptyStateProps {
  courses: CurriculumCourseView[];
  cursor: LessonCursorView | null;
  selectedModeTitle?: string;
  selectedTrack: ProductTrackView | null;
  onContinue: () => void;
}

const actionByPhase: Record<string, string> = {
  intro: "Start with a teacher explanation and a small recognition check.",
  model: "Look at examples and notice the pattern.",
  controlled_practice: "Try one guided answer using a frame or word bank.",
  correction: "Review your correction and understand the rule.",
  repeat: "Rewrite or repeat the corrected sentence.",
  free_practice: "Use the skill in a short conversation.",
  summary: "Finish with recap and homework.",
};

export default function LessonEmptyState({ courses, cursor, selectedModeTitle, selectedTrack, onContinue }: LessonEmptyStateProps) {
  const module = findModule(courses, cursor?.moduleId);
  const lesson = findSubsection(courses, cursor?.subsectionId);

  return (
    <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-200">
        {cursor ? <BookOpen className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </div>
      <h2 className="text-xl font-bold text-slate-100">{cursor ? "Ready to continue your lesson" : "Choose how you want to learn today"}</h2>
      <p className="mt-2 text-sm text-slate-400">
        {cursor
          ? "Sky will continue from your saved lesson phase. You will not lose progress."
          : "Pick a Study track, start a module, or use General Practice for flexible conversation."}
      </p>

      <div className="mt-5 grid gap-3 text-left md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Mode</p>
          <p className="mt-1 font-semibold text-slate-100">{selectedModeTitle || "Study Mode"}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Track</p>
          <p className="mt-1 font-semibold text-slate-100">{selectedTrack?.title || "Not selected"}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Next action</p>
          <p className="mt-1 text-sm font-semibold text-slate-100">{cursor ? actionByPhase[cursor.phase] || "Continue the lesson." : "Select a track or module."}</p>
        </div>
      </div>

      {cursor && (
        <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-500/10 p-4 text-left">
          <p className="text-[10px] uppercase tracking-wider text-cyan-200">Current study lesson</p>
          <p className="mt-1 font-bold text-slate-100">{lesson?.title || cursor.subsectionId}</p>
          <p className="mt-1 text-sm text-slate-400">Module: {module?.title || cursor.moduleId}</p>
          <p className="mt-1 text-sm text-slate-400">Phase: {cursor.phase}</p>
          <button onClick={onContinue} className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 inline-flex items-center gap-2">
            Continue with Sky <PlayCircle className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
