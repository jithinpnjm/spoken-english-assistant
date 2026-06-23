import { Mic, PlayCircle, RefreshCw } from "lucide-react";
import type { CoachMessage, CoachSession } from "../types";
import type { CurriculumCourseView, LessonCursorView, ProductTrackView } from "../lib/curriculumClient";
import { buildTopicProgress, topicProgressSummary } from "../lib/topicProgress";

interface LiveFirstLearningShellProps {
  learnerName: string;
  courses: CurriculumCourseView[];
  cursor: LessonCursorView | null;
  selectedTrack: ProductTrackView | null;
  sessions: CoachSession[];
  messages: CoachMessage[];
  isLiveActive: boolean;
  isBusy: boolean;
  onStartLive: () => void;
  onStopLive: () => void;
  onChangeTopic: () => void;
}

export default function LiveFirstLearningShell(props: LiveFirstLearningShellProps) {
  const topicItems = buildTopicProgress({ courses: props.courses, cursor: props.cursor, sessions: props.sessions, messages: props.messages }).slice(0, 12);
  const summary = topicProgressSummary(topicItems);
  const current = topicItems.find((item) => item.id === props.cursor?.subsectionId) || topicItems[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Sky Live Teacher</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">Speak with Sky, {props.learnerName}</h1>
            <p className="text-sm text-slate-400 mt-2">Use voice as the main teacher. Chat stays as transcript, explanation, and formatted notes only.</p>
          </div>
          <button
            disabled={props.isBusy}
            onClick={props.isLiveActive ? props.onStopLive : props.onStartLive}
            className={`px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 ${props.isLiveActive ? "bg-red-600 hover:bg-red-500" : "bg-emerald-600 hover:bg-emerald-500"}`}
          >
            {props.isLiveActive ? <RefreshCw className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            {props.isLiveActive ? "Stop Live" : "Start Live with Sky"}
          </button>
        </header>

        <section className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Current topic</p>
            <h2 className="text-xl font-bold mt-2">{current?.title || "Choose a topic"}</h2>
            <p className="text-sm text-slate-400 mt-1">{current?.moduleTitle || props.selectedTrack?.title || "No active module"}</p>
            <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Topic time</span>
                <span className="font-semibold">{current?.minutesSpent || 0}/{current?.targetMinutes || 20} min</span>
              </div>
              <div className="h-3 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: `${current?.percent || 0}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-3">Green fill means you spent enough useful time on this topic. Target: 20 minutes.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Coverage</p>
            <div className="mt-4 space-y-3 text-sm">
              <p><span className="text-slate-400">Started:</span> {summary.startedTopics}/{summary.totalTopics}</p>
              <p><span className="text-slate-400">Good coverage:</span> {summary.goodTopics}</p>
              <p><span className="text-slate-400">Strong coverage:</span> {summary.strongTopics}</p>
            </div>
            <button onClick={props.onChangeTopic} className="mt-5 w-full rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2">
              <PlayCircle className="h-4 w-4" /> Change topic
            </button>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Topics</p>
              <h2 className="text-lg font-bold">Simple topic coverage</h2>
            </div>
          </div>
          <div className="space-y-3">
            {topicItems.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.moduleTitle}</p>
                  </div>
                  <span className="text-xs text-slate-300 whitespace-nowrap">{item.minutesSpent}/{item.targetMinutes} min</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
