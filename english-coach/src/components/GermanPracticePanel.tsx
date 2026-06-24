import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw, Send, Sparkles } from "lucide-react";
import type { GermanLevel, GermanSubtopic } from "../lib/germanCurriculumRegistry";
import { buildGermanPracticeTasks, reviewGermanAnswer, reviewLabel, type GermanPracticeReview } from "../lib/germanPracticeEngine";
import { buildRepairPracticeTasks } from "../lib/germanRepairPracticeAdapter";
import { useGermanLearningState } from "../hooks/useGermanLearningState";

interface GermanPracticePanelProps {
  level: GermanLevel;
  subtopic: GermanSubtopic;
}

export default function GermanPracticePanel({ level, subtopic }: GermanPracticePanelProps) {
  const learning = useGermanLearningState();
  const tasks = useMemo(() => {
    const baseTasks = buildGermanPracticeTasks(level, subtopic);
    const repairTasks = buildRepairPracticeTasks(level, subtopic);
    const seen = new Set<string>();
    return [...baseTasks, ...repairTasks].filter((task) => {
      if (seen.has(task.id)) return false;
      seen.add(task.id);
      return true;
    });
  }, [level, subtopic]);
  const [taskIndex, setTaskIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [review, setReview] = useState<GermanPracticeReview | null>(null);

  const task = tasks[taskIndex] || tasks[0];

  function submitAnswer() {
    if (!task || !answer.trim()) return;
    const nextReview = reviewGermanAnswer(task, answer);
    setReview(nextReview);
    const score = nextReview.result === "correct" ? 100 : nextReview.result === "almost" ? 70 : 40;
    learning.recordAttempt(task.id, score);
  }

  function nextTask() {
    setAnswer("");
    setReview(null);
    setTaskIndex((prev) => (prev + 1) % tasks.length);
  }

  function resetTask() {
    setAnswer("");
    setReview(null);
  }

  if (!task) return null;

  return (
    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-amber-200">Practice and review</p>
          <h4 className="mt-1 font-bold text-slate-100">{subtopic.title}</h4>
          <p className="mt-1 text-xs text-slate-400">Task {taskIndex + 1} of {tasks.length} · {task.type.replace(/_/g, " ")}</p>
        </div>
        <Sparkles className="h-5 w-5 text-amber-200" />
      </div>

      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="text-sm font-semibold text-slate-100">{task.prompt}</p>
        <p className="mt-2 text-xs leading-5 text-slate-400">Hint: {task.helper}</p>
      </div>

      <textarea
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        placeholder="Type your German answer here..."
        className="mt-3 min-h-24 w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-300/60"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={submitAnswer} className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-amber-400">
          <Send className="h-4 w-4" /> Check answer
        </button>
        <button onClick={resetTask} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/15">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        <button onClick={nextTask} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/15">
          Next task
        </button>
      </div>

      {review && (
        <div className={`mt-4 rounded-2xl border p-4 ${review.result === "correct" ? "border-emerald-400/30 bg-emerald-500/10" : "border-red-400/30 bg-red-500/10"}`}>
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-bold">{reviewLabel(review.result)}</p>
          </div>
          <p className="text-xs uppercase tracking-widest text-slate-400">Corrected German</p>
          <p className="mt-1 rounded-xl border border-white/10 bg-black/20 p-3 text-sm font-semibold text-slate-100">{review.correctedGerman}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">{review.explanation}</p>
          {review.mistakeFocus.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {review.mistakeFocus.map((focus) => (
                <span key={focus} className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-slate-300">{focus}</span>
              ))}
            </div>
          )}
          {review.rewriteRequired && (
            <p className="mt-3 text-xs font-semibold text-red-100">Rewrite or repeat the corrected German before moving on.</p>
          )}
        </div>
      )}
    </div>
  );
}
