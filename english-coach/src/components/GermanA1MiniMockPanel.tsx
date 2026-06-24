import { useState } from "react";
import { ClipboardCheck, Send } from "lucide-react";
import { a1MiniMockTasks, scoreA1MiniMock, type A1MockResult } from "../lib/germanA1MiniMock";

export default function GermanA1MiniMockPanel() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<A1MockResult | null>(null);

  function setAnswer(taskId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [taskId]: value }));
  }

  function submit() {
    setResult(scoreA1MiniMock(answers));
  }

  return (
    <div className="rounded-3xl border border-fuchsia-400/20 bg-fuchsia-500/10 p-5">
      <div className="mb-4 flex items-center gap-2">
        <ClipboardCheck className="h-5 w-5 text-fuchsia-200" />
        <div>
          <p className="text-xs uppercase tracking-widest text-fuchsia-200">A1 mini mock</p>
          <h3 className="font-bold text-slate-100">Goethe A1 readiness check</h3>
        </div>
      </div>

      <div className="space-y-4">
        {a1MiniMockTasks.map((task) => (
          <div key={task.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-400">{task.section}</p>
            <p className="mt-2 text-sm leading-6 text-slate-100">{task.prompt}</p>
            <textarea
              value={answers[task.id] || ""}
              onChange={(event) => setAnswer(task.id, event.target.value)}
              className="mt-3 min-h-20 w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-fuchsia-300/60"
              placeholder="Type your answer here..."
            />
          </div>
        ))}
      </div>

      <button onClick={submit} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-fuchsia-500 px-4 py-2 text-sm font-bold text-white hover:bg-fuchsia-400">
        <Send className="h-4 w-4" /> Score mini mock
      </button>

      {result && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100">Score: {result.totalScore}/{result.maxScore}</span>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${result.passEstimate ? "bg-emerald-500/20 text-emerald-100" : "bg-red-500/20 text-red-100"}`}>{result.percentage}% · {result.passEstimate ? "pass-level" : "needs repair"}</span>
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-4">
            {Object.entries(result.sectionScores).map(([section, score]) => (
              <div key={section} className="rounded-xl bg-white/5 p-3 text-xs text-slate-300">{section}: {score}</div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-xs uppercase tracking-widest text-slate-400">Feedback</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
              {result.feedback.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="mt-4">
            <p className="text-xs uppercase tracking-widest text-slate-400">Next study plan</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
              {result.nextStudyPlan.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
