import { useMemo, useState } from "react";
import { PenLine, RotateCcw, Send } from "lucide-react";
import type { GermanLevel } from "../lib/germanCurriculumRegistry";
import { getWritingPrompt, reviewGermanWriting, type GermanWritingLevel, type GermanWritingReview } from "../lib/germanWritingReview";

interface GermanWritingReviewPanelProps {
  level: GermanLevel;
}

function asWritingLevel(level: GermanLevel): GermanWritingLevel {
  if (level === "B1") return "B1";
  if (level === "A2") return "A2";
  return "A1";
}

export default function GermanWritingReviewPanel({ level }: GermanWritingReviewPanelProps) {
  const writingLevel = asWritingLevel(level);
  const prompt = useMemo(() => getWritingPrompt(writingLevel), [writingLevel]);
  const [answer, setAnswer] = useState("");
  const [review, setReview] = useState<GermanWritingReview | null>(null);

  function submit() {
    setReview(reviewGermanWriting(prompt, answer));
  }

  function reset() {
    setAnswer("");
    setReview(null);
  }

  return (
    <div className="rounded-3xl border border-purple-400/20 bg-purple-500/10 p-5">
      <div className="mb-4 flex items-start gap-3">
        <PenLine className="mt-1 h-5 w-5 text-purple-200" />
        <div>
          <p className="text-xs uppercase tracking-widest text-purple-200">Writing review</p>
          <h3 className="mt-1 text-lg font-bold text-slate-100">{prompt.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{prompt.helper}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-widest text-slate-400">Task points</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
          {prompt.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
        </ul>
      </div>

      <textarea
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        placeholder="Write your German answer here..."
        className="mt-3 min-h-32 w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-purple-300/60"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={submit} className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2 text-sm font-bold text-white hover:bg-purple-400">
          <Send className="h-4 w-4" /> Review writing
        </button>
        <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/15">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      {review && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${review.passed ? "bg-emerald-500/20 text-emerald-100" : "bg-red-500/20 text-red-100"}`}>{review.passed ? "Pass-level" : "Needs work"}</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">Score: {review.score}/100</span>
          </div>

          {review.missingPoints.length > 0 && (
            <div className="mt-4">
              <p className="text-xs uppercase tracking-widest text-red-200">Missing points</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                {review.missingPoints.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}

          <div className="mt-4">
            <p className="text-xs uppercase tracking-widest text-cyan-200">Feedback</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
              {review.feedback.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
            <p className="text-xs uppercase tracking-widest text-emerald-200">Corrected version</p>
            <p className="mt-2 text-sm leading-6 text-slate-100">{review.correctedVersion}</p>
          </div>

          {review.mistakeFocus.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {review.mistakeFocus.map((focus) => <span key={focus} className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-slate-300">{focus}</span>)}
            </div>
          )}

          <p className="mt-4 text-xs font-semibold text-purple-100">{review.rewriteInstruction}</p>
        </div>
      )}
    </div>
  );
}
