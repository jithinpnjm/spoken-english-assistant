import { useState } from "react";
import { ClipboardCheck, Send } from "lucide-react";
import { a2MiniMockTasks, scoreA2MiniMock, type A2MiniMockResult } from "../lib/germanA2MiniMock";

export default function GermanA2MiniMockPanel() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<A2MiniMockResult | null>(null);

  function setAnswer(taskId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [taskId]: value }));
  }

  function submit() {
    setResult(scoreA2MiniMock(answers));
  }

  return (
    <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5">
      <div className="mb-4 flex items-center gap-2">
        <ClipboardCheck className="h-5 w-5 text-amber-200" />
        <div>
          <p className="text-xs uppercase tracking-widest text-amber-200">A2 mini mock</p>
          <h3 className="font-bold text-slate-100">Goethe A2 readiness check</h3>
        </div>
      </div>

      <div className="space-y-4">
        {a2MiniMockTasks.map((task) => (
          <div key={task.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-400">{task.section} · Teil {task.teil}</p>
            <p className="mt-2 text-sm leading-6 text-slate-100">{task.prompt}</p>
            <textarea
              value={answers[task.id] || ""}
              onChange={(event) => setAnswer(task.id, event.target.value)}
              className="mt-3 min-h-24 w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-300/60"
              placeholder="Type your A2 answer here..."
            />
          </div>
        ))}
      </div>

      <button onClick={submit} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-amber-400">
        <Send className="h-4 w-4" /> Score A2 mock
      </button>

      {result && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100">Score: {result.totalScore}/{result.maxScore}</span>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${result.passEstimate ? "bg-emerald-500/20 text-emerald-100" : "bg-red-500/20 text-red-100"}`}>
              {result.percentage}% · {result.passEstimate ? "A2 pass-level" : "needs A2 repair"}
            </span>
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-4">
            {Object.entries(result.sectionScores).map(([section, score]) => (
              <div key={section} className="rounded-xl bg-white/5 p-3 text-xs text-slate-300">{section}: {score}/25</div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">Written block: {result.writtenBlockScore}/75 · Speaking: {result.speakingScore}/25</p>
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
