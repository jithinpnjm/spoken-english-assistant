import { BarChart3, CheckCircle, Clock, Flame, MessageSquare, Target } from "lucide-react";
import type { CoachMessage, CoachSession, LearnerProfile, MistakeMemory } from "../types";
import type { CurriculumCourseView, LessonCursorView, ProductTrackView } from "../lib/curriculumClient";
import { buildProgressSummary } from "../lib/progressAnalytics";

interface ProgressDashboardProps {
  learnerProfile: LearnerProfile | null;
  sessions: CoachSession[];
  messages: CoachMessage[];
  mistakes: MistakeMemory[];
  courses: CurriculumCourseView[];
  cursor: LessonCursorView | null;
  selectedTrack: ProductTrackView | null;
}

function ScorePill({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-2">
      <p className="text-[10px] uppercase tracking-wide text-slate-400">{label}</p>
      <p className="text-sm font-bold">{value === null ? "—" : `${value}/10`}</p>
    </div>
  );
}

export default function ProgressDashboard(props: ProgressDashboardProps) {
  const summary = buildProgressSummary(props);
  const challengePercent = Math.min(100, Math.round((summary.challengeDay / 60) * 100));

  return (
    <section className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-bold flex items-center gap-2"><BarChart3 className="h-4 w-4 text-cyan-300" /> Progress Dashboard</h2>
          <p className="text-[11px] text-slate-400">Current profile analytics</p>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-200">Day {summary.challengeDay}/60</span>
      </div>

      <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-4">
        <div className="h-full bg-cyan-300/80" style={{ width: `${challengePercent}%` }} />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="rounded-xl bg-white/5 border border-white/10 p-2"><Flame className="h-4 w-4 text-orange-300" /><p className="text-[10px] text-slate-400 mt-1">Streak</p><p className="text-sm font-bold">{summary.streak}</p></div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-2"><Clock className="h-4 w-4 text-emerald-300" /><p className="text-[10px] text-slate-400 mt-1">Minutes</p><p className="text-sm font-bold">{summary.totalPracticeMinutes}</p></div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-2"><MessageSquare className="h-4 w-4 text-indigo-300" /><p className="text-[10px] text-slate-400 mt-1">Turns</p><p className="text-sm font-bold">{summary.learnerMessages}</p></div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <ScorePill label="Fluency" value={summary.averageScores.fluency} />
        <ScorePill label="Grammar" value={summary.averageScores.grammar} />
        <ScorePill label="Vocab" value={summary.averageScores.vocabulary} />
      </div>

      <div className="space-y-2 text-xs text-slate-300">
        <p><span className="text-slate-500">Track:</span> {summary.currentTrackLabel}</p>
        <p><span className="text-slate-500">Lesson:</span> {summary.currentLessonLabel}</p>
        <p><span className="text-slate-500">Sessions:</span> {summary.totalSessions} · <span className="text-slate-500">Messages:</span> {summary.totalMessages}</p>
        <p><span className="text-slate-500">Mistakes:</span> {summary.activeMistakes} active · {summary.recurringMistakes} recurring · {summary.masteredMistakes} mastered</p>
      </div>

      <div className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-xs text-emerald-100">
        <p className="font-semibold flex items-center gap-2"><Target className="h-3 w-3" /> Next best action</p>
        <p className="mt-1 text-emerald-50/90">{summary.nextBestAction}</p>
      </div>

      {summary.masteredMistakes > 0 && <p className="mt-3 text-[11px] text-slate-400 flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-300" /> Review progress is improving.</p>}
    </section>
  );
}
