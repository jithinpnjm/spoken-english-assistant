import { CheckCircle2, RotateCcw, Save } from "lucide-react";
import type { GermanLevel } from "../lib/germanCurriculumRegistry";
import { useGermanLearningState } from "../hooks/useGermanLearningState";

interface GermanLearningStatePanelProps {
  level: GermanLevel;
  selectedSubtopicId?: string;
}

export default function GermanLearningStatePanel({ level, selectedSubtopicId }: GermanLearningStatePanelProps) {
  const learning = useGermanLearningState();
  const completedForLevel = learning.state.completedSubtopicIds.filter((id) => id.startsWith(level.toLowerCase())).length;
  const attemptCounts = Object.values(learning.state.practiceAttempts) as number[];
  const attempts = attemptCounts.reduce((sum, count) => sum + count, 0);
  const bestScores = Object.values(learning.state.bestScores) as number[];
  const bestAverage = bestScores.length ? Math.round(bestScores.reduce((sum, score) => sum + score, 0) / bestScores.length) : 0;

  function markSelectedDone() {
    if (!selectedSubtopicId) return;
    learning.completeSubtopic(selectedSubtopicId);
  }

  function recordQuickAttempt() {
    if (!selectedSubtopicId) return;
    learning.recordAttempt(`${selectedSubtopicId}-manual`, 70);
  }

  return (
    <div className="rounded-3xl border border-lime-400/20 bg-lime-500/10 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Save className="h-5 w-5 text-lime-200" />
        <div>
          <p className="text-xs uppercase tracking-widest text-lime-200">Local learning state</p>
          <h3 className="font-bold text-slate-100">Saved on this browser</h3>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-slate-400">Level</p>
          <p className="mt-1 text-xl font-bold text-slate-100">{level}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-slate-400">Completed topics</p>
          <p className="mt-1 text-xl font-bold text-slate-100">{completedForLevel}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-slate-400">Practice attempts</p>
          <p className="mt-1 text-xl font-bold text-slate-100">{attempts}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-slate-400">Best-score average</p>
          <p className="mt-1 text-xl font-bold text-slate-100">{bestAverage}/100</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={markSelectedDone} disabled={!selectedSubtopicId} className="inline-flex items-center gap-2 rounded-xl bg-lime-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-50">
          <CheckCircle2 className="h-4 w-4" /> Mark selected topic done
        </button>
        <button onClick={recordQuickAttempt} disabled={!selectedSubtopicId} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50">
          Record quick practice
        </button>
        <button onClick={learning.reset} className="inline-flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-500/20">
          <RotateCcw className="h-4 w-4" /> Reset local state
        </button>
      </div>

      {learning.state.mistakes.length > 0 && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-400">Recent saved mistakes</p>
          <div className="mt-3 space-y-2">
            {learning.state.mistakes.slice(0, 3).map((mistake) => (
              <div key={mistake.id} className="rounded-xl bg-white/5 p-3 text-xs text-slate-300">
                <p className="font-semibold text-slate-100">{mistake.focus}</p>
                <p className="mt-1">{mistake.originalAnswer} → {mistake.correctedAnswer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
