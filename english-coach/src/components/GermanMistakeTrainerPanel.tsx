import type { GermanA1BookLesson } from "../lib/germanA1BookLessonTypes";

interface GermanMistakeTrainerPanelProps {
  lesson: GermanA1BookLesson;
}

export default function GermanMistakeTrainerPanel({ lesson }: GermanMistakeTrainerPanelProps) {
  const mistakes = lesson.commonMistakes.slice(0, 5);

  if (mistakes.length === 0) return null;

  return (
    <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-rose-200">Mistake trainer</p>
          <h3 className="mt-1 text-lg font-bold text-slate-100">Correct the sentence before you speak</h3>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-slate-400">
          A1 errors usually come from verb position, verb endings, article/case, negation, or word order. Correct the mistake first, then say the sentence aloud.
        </p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {mistakes.map((item, index) => (
          <details key={`${item.wrong}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-4" open={index === 0}>
            <summary className="cursor-pointer text-sm font-bold text-slate-100">
              Fix #{index + 1}
              <span className="ml-2 text-xs font-normal text-rose-200">Find the error</span>
            </summary>
            <div className="mt-3 space-y-3">
              <div className="rounded-xl border border-rose-400/10 bg-rose-500/10 p-3">
                <p className="text-xs uppercase tracking-wider text-rose-200">Wrong</p>
                <p className="mt-1 text-sm font-semibold text-white">{item.wrong}</p>
              </div>
              <details>
                <summary className="cursor-pointer text-xs font-semibold text-rose-200">Show correction</summary>
                <div className="mt-2 rounded-xl border border-emerald-400/10 bg-emerald-500/10 p-3">
                  <p className="text-xs uppercase tracking-wider text-emerald-200">Correct</p>
                  <p className="mt-1 text-sm font-semibold text-white">{item.right}</p>
                  <p className="mt-2 text-xs leading-relaxed text-emerald-100">{item.explanation}</p>
                </div>
              </details>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
