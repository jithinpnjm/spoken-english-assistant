import { AlertCircle, CheckCircle2, RotateCcw, TrendingUp } from "lucide-react";
import type { MistakeMemory } from "../types";
import { buildReviewQueue, reviewSummary, type ReviewItem } from "../lib/reviewEngine";

interface ReviewModePanelProps {
  mistakes: MistakeMemory[];
  onStartReview: (item: ReviewItem) => void;
}

function badgeClass(priority: string) {
  if (priority === "high") return "bg-red-500/20 text-red-200 border-red-300/20";
  if (priority === "medium") return "bg-amber-500/20 text-amber-200 border-amber-300/20";
  return "bg-slate-500/20 text-slate-200 border-slate-300/20";
}

export default function ReviewModePanel({ mistakes, onStartReview }: ReviewModePanelProps) {
  const queue = buildReviewQueue(mistakes);
  const summary = reviewSummary(mistakes);
  const top = queue.slice(0, 5);

  return (
    <section className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-amber-200 font-bold">Review Mode</h2>
          <p className="text-[11px] text-slate-400">Mistake repair, due reviews, and correction drills.</p>
        </div>
        <RotateCcw className="h-5 w-5 text-amber-300" />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="rounded-xl border border-white/10 bg-black/20 p-2">
          <p className="text-[10px] text-slate-500">Due</p>
          <p className="font-bold text-slate-100">{summary.due}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-2">
          <p className="text-[10px] text-slate-500">Recurring</p>
          <p className="font-bold text-slate-100">{summary.recurring}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-2">
          <p className="text-[10px] text-slate-500">Mastered</p>
          <p className="font-bold text-slate-100">{summary.mastered}</p>
        </div>
      </div>

      {top.length ? (
        <div className="space-y-2">
          {top.map((item) => (
            <div key={item.mistakeId} className="rounded-xl border border-white/10 bg-black/20 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-100">{item.mistakeType.replace(/_/g, " ")}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{item.nextAction}</p>
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] ${badgeClass(item.priority)}`}>{item.priority}</span>
              </div>
              <p className="mt-2 text-[11px] text-slate-500 line-clamp-2">{item.modelCorrection}</p>
              <button onClick={() => onStartReview(item)} className="mt-3 w-full rounded-lg bg-amber-600/80 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-500 inline-flex items-center justify-center gap-2">
                <TrendingUp className="h-3 w-3" /> Start review drill
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-slate-300"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> No recurring mistakes yet.</div>
          <p className="mt-2">After a few lessons, Sky will collect mistakes here and convert them into review drills.</p>
        </div>
      )}

      {summary.highPriority > 0 && (
        <p className="mt-3 flex items-center gap-2 text-[11px] text-red-200"><AlertCircle className="h-3 w-3" /> {summary.highPriority} high-priority mistake type(s) need review.</p>
      )}
    </section>
  );
}
