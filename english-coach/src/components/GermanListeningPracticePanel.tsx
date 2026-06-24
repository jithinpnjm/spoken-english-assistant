import { useMemo, useState } from "react";
import { Ear, Eye, Send } from "lucide-react";
import type { GermanLevel } from "../lib/germanCurriculumRegistry";
import { getListeningTasks, reviewListeningAnswer, type GermanListeningReview } from "../lib/germanListeningPractice";

interface GermanListeningPracticePanelProps {
  level: GermanLevel;
}

export default function GermanListeningPracticePanel({ level }: GermanListeningPracticePanelProps) {
  const tasks = useMemo(() => getListeningTasks(level), [level]);
  const [taskIndex, setTaskIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showTranscript, setShowTranscript] = useState(false);
  const [review, setReview] = useState<GermanListeningReview | null>(null);
  const task = tasks[taskIndex] || tasks[0];

  if (!task) return null;

  function submit() {
    setReview(reviewListeningAnswer(task, answer));
    setShowTranscript(true);
  }

  function next() {
    setTaskIndex((prev) => (prev + 1) % tasks.length);
    setAnswer("");
    setShowTranscript(false);
    setReview(null);
  }

  return (
    <div className="rounded-3xl border border-sky-400/20 bg-sky-500/10 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Ear className="h-5 w-5 text-sky-200" />
        <div>
          <p className="text-xs uppercase tracking-widest text-sky-200">Listening practice</p>
          <h3 className="font-bold text-slate-100">{task.title}</h3>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-widest text-slate-400">Audio simulation</p>
        <p className="mt-2 text-sm text-slate-300">Teacher reads a short German text. Transcript stays hidden until you answer.</p>
        <button onClick={() => setShowTranscript(true)} className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/15">
          <Eye className="h-4 w-4" /> Reveal transcript for study
        </button>
      </div>

      {showTranscript && (
        <div className="mt-3 rounded-xl border border-white/10 bg-slate-950 p-3 text-sm text-slate-100">
          {task.hiddenTranscript}
        </div>
      )}

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-sm font-semibold text-slate-100">{task.question}</p>
        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          className="mt-3 min-h-20 w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-300/60"
          placeholder="Answer after listening..."
        />
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={submit} className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-sky-400">
          <Send className="h-4 w-4" /> Check listening answer
        </button>
        <button onClick={next} className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/15">
          Next
        </button>
      </div>

      {review && (
        <div className={`mt-4 rounded-2xl border p-4 ${review.correct ? "border-emerald-400/20 bg-emerald-500/10" : "border-red-400/20 bg-red-500/10"}`}>
          <p className="font-bold">{review.correct ? "Correct enough" : "Needs listening repair"}</p>
          <p className="mt-2 text-sm text-slate-300">{review.explanation}</p>
          <p className="mt-3 text-xs uppercase tracking-widest text-slate-400">Repeat sentence</p>
          <p className="mt-1 rounded-xl bg-black/20 p-3 text-sm text-slate-100">{review.repeatSentence}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {review.vocabulary.map((word) => <span key={word} className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-slate-300">{word}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}
