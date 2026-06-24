import { useCallback, useState } from "react";
import { ArrowLeft, BookOpen, ClipboardCheck, GraduationCap, Mic, StopCircle, Volume2 } from "lucide-react";
import { germanCurriculum, type GermanLevel } from "../lib/germanCurriculumRegistry";
import { useLiveCoachSession } from "../hooks/useLiveCoachSession";
import GermanProgressPanel from "./GermanProgressPanel";
import GermanStudyGuidePanel from "./GermanStudyGuidePanel";
import GermanExamPrepPanel from "./GermanExamPrepPanel";

interface GermanCoachShellProps {
  learnerName: string;
  onBackToPortals: () => void;
}

type MainTab = "study" | "exam";

const levelStyles: Record<GermanLevel, string> = {
  A0: "border-sky-400 bg-sky-500/15 text-sky-100",
  A1: "border-emerald-400 bg-emerald-500/15 text-emerald-100",
  A2: "border-amber-400 bg-amber-500/15 text-amber-100",
  B1: "border-fuchsia-400 bg-fuchsia-500/15 text-fuchsia-100",
};

export default function GermanCoachShell({ learnerName, onBackToPortals }: GermanCoachShellProps) {
  const [selectedLevel, setSelectedLevel] = useState<GermanLevel>("A1");
  const [activeTab, setActiveTab] = useState<MainTab>("study");
  const [liveTranscript, setLiveTranscript] = useState<string[]>([]);
  const [jumpToLesson, setJumpToLesson] = useState<number | null>(null);

  const handleLiveMessage = useCallback((msg: { text?: string }) => {
    if (!msg.text?.trim()) return;
    setLiveTranscript((prev) => [...prev.slice(-9), msg.text!.trim()]);
  }, []);

  const live = useLiveCoachSession(handleLiveMessage);

  function stopLive() {
    setLiveTranscript([]);
    live.stop();
  }

  function chooseLevel(level: GermanLevel) {
    stopLive();
    setSelectedLevel(level);
  }

  async function startLiveWithContext(customContext: string) {
    setLiveTranscript([]);
    await live.startGermanSession({
      learnerName,
      level: selectedLevel,
      section: null,
      subtopic: null,
      customSystemInstructionText: customContext,
    });
  }

  function handleJumpToLesson(lessonNo: number) {
    setJumpToLesson(lessonNo);
    setActiveTab("study");
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-slate-100 md:p-6">
      <div className="mx-auto max-w-6xl space-y-5">

        {/* Header */}
        <header className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <button
            onClick={onBackToPortals}
            className="mb-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/15"
          >
            <ArrowLeft className="h-4 w-4" /> Back to portals
          </button>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Deutsch Coach</p>
              <h1 className="mt-1 text-2xl font-bold md:text-3xl">German with Sky</h1>
              <p className="mt-1 max-w-xl text-sm text-slate-400">Study lessons 1–65, then practise for the Goethe exam — all in one place.</p>
            </div>
            <button
              onClick={live.isConnected ? stopLive : () => live.startGermanSession({ learnerName, level: selectedLevel, section: null, subtopic: null })}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                live.isConnected ? "bg-red-600 hover:bg-red-500 text-white" : "bg-amber-500 hover:bg-amber-400 text-slate-950"
              }`}
            >
              {live.isConnected ? <><StopCircle className="h-4 w-4" /> Stop</> : <><Mic className="h-4 w-4" /> Start German Live</>}
            </button>
          </div>

          {live.error && (
            <p className="mt-3 rounded-xl border border-red-500/30 bg-red-950/70 px-3 py-2 text-xs text-red-100">{live.error}</p>
          )}
        </header>

        {/* Level selector */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="mb-4 text-xs uppercase tracking-widest text-slate-400">Select your level</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {germanCurriculum.map((lvl) => (
              <button
                key={lvl.level}
                onClick={() => chooseLevel(lvl.level)}
                className={`rounded-2xl border p-4 text-left transition-colors ${
                  selectedLevel === lvl.level ? levelStyles[lvl.level] : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <p className="text-xs uppercase tracking-wider text-slate-400">{lvl.level}</p>
                <p className="mt-1 font-bold text-slate-100">{lvl.title}</p>
                <p className="mt-1 text-xs text-slate-400 leading-5">{lvl.subtitle}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Progress panel */}
        <GermanProgressPanel level={selectedLevel} />

        {/* Live transcript */}
        {liveTranscript.length > 0 && (
          <section className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5">
            <div className="mb-3 flex items-center gap-2 text-amber-100">
              <Volume2 className="h-5 w-5" />
              <h2 className="font-bold">Live transcript</h2>
            </div>
            <div className="space-y-2">
              {liveTranscript.map((line, i) => (
                <p key={`${i}-${line}`} className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm leading-relaxed text-slate-100">
                  {line}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Main tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("study")}
            className={`flex items-center gap-2 rounded-2xl border px-5 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "study"
                ? "border-amber-400/60 bg-amber-600/20 text-amber-200"
                : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            Study Guide
            <span className="ml-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] text-amber-300">1–65</span>
          </button>
          <button
            onClick={() => setActiveTab("exam")}
            className={`flex items-center gap-2 rounded-2xl border px-5 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "exam"
                ? "border-emerald-400/60 bg-emerald-600/20 text-emerald-200"
                : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            <ClipboardCheck className="h-4 w-4" />
            Exam Prep
            <span className="ml-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">4 sections</span>
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "study" && (
          <GermanStudyGuidePanel
            level={selectedLevel}
            learnerName={learnerName}
            isLiveActive={live.isConnected}
            onPracticeWithSky={startLiveWithContext}
            onStopLive={stopLive}
            initialLessonNo={jumpToLesson ?? undefined}
            onLessonViewed={() => setJumpToLesson(null)}
          />
        )}

        {activeTab === "exam" && (
          <GermanExamPrepPanel
            level={selectedLevel}
            learnerName={learnerName}
            isLiveActive={live.isConnected}
            onStartSpeakingPractice={startLiveWithContext}
            onStopLive={stopLive}
            onJumpToLesson={handleJumpToLesson}
          />
        )}

      </div>
    </div>
  );
}
