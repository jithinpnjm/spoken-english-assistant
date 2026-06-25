import type { GermanA1BookLesson } from "../lib/germanA1BookLessonTypes";

interface GermanLessonRevisionPlanProps {
  lesson: GermanA1BookLesson;
}

const revisionSteps = [
  {
    when: "Same day",
    title: "Repeat the model sentences aloud",
    action: "Read each model sentence, cover it, and say it again from memory."
  },
  {
    when: "Tomorrow",
    title: "Rebuild without looking",
    action: "Use the sentence-building path and rebuild one sentence with a new noun or place."
  },
  {
    when: "After 3 days",
    title: "Correct the common mistake",
    action: "Look only at the wrong sentence first, then explain why the correction is right."
  },
  {
    when: "After 7 days",
    title: "Speak with Sky",
    action: "Use the first speaking prompt and answer naturally without reading the lesson."
  }
];

export default function GermanLessonRevisionPlan({ lesson }: GermanLessonRevisionPlanProps) {
  const firstPrompt = lesson.skyPracticePrompts[0] ?? "Create one new A1 sentence from this lesson.";
  const firstSentence = lesson.modelSentences[0]?.de ?? lesson.titleDe;
  const firstMistake = lesson.commonMistakes[0];

  return (
    <div className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-purple-200">Revision plan</p>
          <h3 className="mt-1 text-lg font-bold text-slate-100">Do not forget this lesson after today</h3>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-slate-400">
          Use this light spaced-practice plan to move the lesson from reading memory into speaking memory.
        </p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-4">
        {revisionSteps.map((step, index) => (
          <div key={step.when} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-widest text-purple-200">{step.when}</p>
            <p className="mt-2 text-sm font-bold text-white">{index + 1}. {step.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{step.action}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-purple-400/10 bg-purple-500/10 p-3">
          <p className="text-xs uppercase tracking-wider text-purple-200">Memory sentence</p>
          <p className="mt-1 text-sm font-semibold text-white">{firstSentence}</p>
        </div>
        <div className="rounded-xl border border-purple-400/10 bg-purple-500/10 p-3">
          <p className="text-xs uppercase tracking-wider text-purple-200">Mistake to retest</p>
          <p className="mt-1 text-sm font-semibold text-white">{firstMistake ? `${firstMistake.wrong} → ${firstMistake.right}` : "No common mistake listed."}</p>
        </div>
        <div className="rounded-xl border border-purple-400/10 bg-purple-500/10 p-3">
          <p className="text-xs uppercase tracking-wider text-purple-200">Speaking retest</p>
          <p className="mt-1 text-sm font-semibold text-white">{firstPrompt}</p>
        </div>
      </div>
    </div>
  );
}
