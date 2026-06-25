import type { GermanA1BookLesson } from "../lib/germanA1BookLessonTypes";

interface GermanLessonMasteryChecklistProps {
  lesson: GermanA1BookLesson;
}

function firstVocabularyItems(lesson: GermanA1BookLesson): string {
  return lesson.vocabulary.slice(0, 5).map((item) => item.de).join(", ");
}

export default function GermanLessonMasteryChecklist({ lesson }: GermanLessonMasteryChecklistProps) {
  const hasGrammarTable = Boolean(lesson.grammarTable?.rows.length);

  const checks = [
    {
      title: "Explain the rule in simple English",
      detail: lesson.lessonGoal || lesson.theRule[0]
    },
    {
      title: "Say 3 model sentences aloud",
      detail: lesson.modelSentences.slice(0, 3).map((item) => item.de).join(" · ")
    },
    {
      title: "Use the key vocabulary without looking",
      detail: firstVocabularyItems(lesson)
    },
    {
      title: "Correct the common mistake",
      detail: lesson.commonMistakes[0] ? `${lesson.commonMistakes[0].wrong} → ${lesson.commonMistakes[0].right}` : "No common mistake listed."
    },
    {
      title: "Speak one new sentence with Sky",
      detail: lesson.skyPracticePrompts[0] || "Create one sentence using this lesson."
    }
  ];

  return (
    <div className="rounded-2xl border border-teal-400/20 bg-teal-500/10 p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-teal-200">Before moving on</p>
          <h3 className="mt-1 text-lg font-bold text-slate-100">Lesson mastery checklist</h3>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-slate-400">
          Move to the next lesson only when you can complete these tasks without reading the answer first.
        </p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {checks.map((check, index) => (
          <label key={check.title} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900" />
            <span>
              <span className="block text-sm font-bold text-slate-100">{index + 1}. {check.title}</span>
              <span className="mt-1 block text-xs leading-relaxed text-teal-100">{check.detail}</span>
            </span>
          </label>
        ))}
      </div>

      {hasGrammarTable && (
        <details className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
          <summary className="cursor-pointer text-sm font-bold text-slate-100">Grammar table quick check</summary>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr>{lesson.grammarTable?.headers.map((header) => <th key={header} className="border-b border-white/10 px-2 py-2 text-teal-100">{header}</th>)}</tr>
              </thead>
              <tbody>
                {lesson.grammarTable?.rows.slice(0, 6).map((row, rowIndex) => (
                  <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className="border-b border-white/5 px-2 py-2">{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </div>
  );
}
