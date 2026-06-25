import type { GermanA1BookLesson } from "../lib/germanA1BookLessonTypes";

interface GermanLessonPracticePanelProps {
  lesson: GermanA1BookLesson;
}

function exerciseLabel(type: GermanA1BookLesson["exercises"][number]["type"]): string {
  if (type === "fill_blank") return "Fill in the blank";
  if (type === "reorder") return "Reorder the sentence";
  if (type === "translate") return "Translate";
  return "Choose the correct answer";
}

export default function GermanLessonPracticePanel({ lesson }: GermanLessonPracticePanelProps) {
  const exercises = lesson.exercises.slice(0, 4);
  const speakingPrompts = lesson.skyPracticePrompts.slice(0, 5);

  return (
    <div className="rounded-2xl border border-lime-400/20 bg-lime-500/10 p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-lime-200">Practice after understanding</p>
          <h3 className="mt-1 text-lg font-bold text-slate-100">Build, transform, correct, then speak</h3>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-slate-400">
          Do not jump to free speaking first. Use this order: understand the rule, complete controlled drills, then speak with Sky.
        </p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {exercises.map((exercise, index) => (
          <details key={`${exercise.type}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-4" open={index === 0}>
            <summary className="cursor-pointer text-sm font-bold text-slate-100">
              {exerciseLabel(exercise.type)}
              <span className="ml-2 text-xs font-normal text-lime-200">{exercise.instruction}</span>
            </summary>
            <div className="mt-3 space-y-3">
              {exercise.items.slice(0, 6).map((item, itemIndex) => (
                <div key={`${item.prompt}-${itemIndex}`} className="rounded-xl border border-lime-400/10 bg-lime-500/10 p-3">
                  <p className="text-sm font-semibold text-white">{item.prompt}</p>
                  {item.hint && <p className="mt-1 text-xs text-slate-400">Hint: {item.hint}</p>}
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs font-semibold text-lime-200">Show answer</summary>
                    <p className="mt-1 text-sm text-lime-100">{item.answer}</p>
                  </details>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>

      {speakingPrompts.length > 0 && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-lime-200 mb-3">Speak with Sky after the drills</p>
          <div className="grid gap-2 md:grid-cols-2">
            {speakingPrompts.map((prompt, index) => (
              <div key={`${prompt}-${index}`} className="rounded-xl border border-lime-400/10 bg-lime-500/10 p-3 text-sm leading-relaxed text-slate-100">
                {prompt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
