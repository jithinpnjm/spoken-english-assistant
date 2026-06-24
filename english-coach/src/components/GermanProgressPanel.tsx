import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react";
import { calculateCompletionPercent, getWeakestSkill, mistakeTypeLabel, seedGermanProgress } from "../lib/germanProgressTracker";

export default function GermanProgressPanel() {
  const weakest = getWeakestSkill(seedGermanProgress);

  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-cyan-200" />
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-200">Progress and mistake repair</p>
          <h3 className="font-bold text-slate-100">Current goal: Goethe {seedGermanProgress.currentGoal}</h3>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          {seedGermanProgress.skillProgress.map((item) => (
            <div key={`${item.level}-${item.skill}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-100">{item.level} · {item.skill}</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">{calculateCompletionPercent(item)}%</span>
              </div>
              <p className="mt-2 text-xs text-slate-400">Score {item.averageScore}/100 · {item.minutesSpent} min spent</p>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${calculateCompletionPercent(item)}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {weakest && (
            <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
              <div className="flex items-center gap-2 text-amber-100">
                <AlertTriangle className="h-5 w-5" />
                <p className="font-bold">Weakest area</p>
              </div>
              <p className="mt-2 text-sm text-slate-300">{weakest.level} · {weakest.skill} · score {weakest.averageScore}/100</p>
            </div>
          )}

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-400">Priority repairs</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {seedGermanProgress.priorityRepairs.map((repair) => (
                <span key={repair} className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-100">{mistakeTypeLabel(repair)}</span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
            <div className="flex items-center gap-2 text-emerald-100">
              <CheckCircle2 className="h-5 w-5" />
              <p className="font-bold">Recommended next</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{seedGermanProgress.recommendedNext}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
