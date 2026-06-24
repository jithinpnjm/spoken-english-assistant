import { Activity, CheckCircle2, RotateCcw } from "lucide-react";
import { getGermanLevel, type GermanLevel } from "../lib/germanCurriculumRegistry";
import { useGermanLearningState } from "../hooks/useGermanLearningState";

interface GermanProgressPanelProps {
  level?: GermanLevel;
  selectedSubtopicId?: string;
}

export default function GermanProgressPanel({ level = "A1", selectedSubtopicId }: GermanProgressPanelProps) {
  const learning = useGermanLearningState();
  const pathItems = getGermanLevel(level).sections.flatMap((section) => section.subtopics);
  const completedIds = new Set(learning.state.completedSubtopicIds);
  const completedCount = pathItems.filter((item) => completedIds.has(item.id)).length;
  const totalCount = pathItems.length;
  const percent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  const attemptCounts = Object.values(learning.state.practiceAttempts) as number[];
  const attempts = attemptCounts.reduce((sum, count) => sum + count, 0);
  const bestScores = Object.values(learning.state.bestScores) as number[];
  const bestAverage = bestScores.length ? Math.round(bestScores.reduce((sum, score) => sum + score, 0) / bestScores.length) : 0;

  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-cyan-200" />
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-200">Your progress</p>
          <h3 className="font-bold text-slate-100">Goethe {level}</h3>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-slate-100">Completed</p>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">{percent}%</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">{completedCount} of {totalCount} topics done</p>
          <div className="mt-3 h-2 rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Practice attempts</p>
          <p className="mt-2 text-2xl font-bold text-slate-100">{attempts}</p>
          <p className="mt-1 text-xs text-slate-400">Starts at 0 and grows only when you practise.</p>
        </div>

        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
          <div className="flex items-center gap-2 text-emerald-100">
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-bold">Best average</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-100">{bestAverage}/100</p>
          <p className="mt-1 text-xs text-slate-400">No demo scores are shown.</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => selectedSubtopicId && learning.completeSubtopic(selectedSubtopicId)} disabled={!selectedSubtopicId} className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50">
          <CheckCircle2 className="h-4 w-4" /> Mark selected topic done
        </button>
        <button onClick={learning.reset} className="inline-flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-500/20">
          <RotateCcw className="h-4 w-4" /> Reset German progress
        </button>
      </div>
    </div>
  );
}
