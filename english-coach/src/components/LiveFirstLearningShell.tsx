import { useMemo, useState } from "react";
import { Mic, Radio, StopCircle, Volume2, BookOpen, GraduationCap } from "lucide-react";
import type { CoachMessage, CoachSession } from "../types";
import type { CurriculumCourseView, LessonCursorView, ProductTrackView } from "../lib/curriculumClient";
import { buildTopicProgress, topicProgressSummary } from "../lib/topicProgress";
import type { VocabWord } from "../lib/vocabularyBank";
import type { VocabPracticeMode } from "../lib/dailyVocabulary";
import VocabularyPanel from "./VocabularyPanel";

type ShellTab = "lesson" | "vocabulary";

interface LiveFirstLearningShellProps {
  learnerName: string;
  courses: CurriculumCourseView[];
  tracks: ProductTrackView[];
  cursor: LessonCursorView | null;
  sessions: CoachSession[];
  messages: CoachMessage[];
  isLiveActive: boolean;
  selectedLevel: "Beginner" | "Intermediate" | "Advanced";
  selectedTrackId: string;
  selectedModuleId: string;
  onSelectLevel: (level: "Beginner" | "Intermediate" | "Advanced") => void;
  onSelectTrack: (trackId: string) => void;
  onSelectModule: (moduleId: string) => void;
  onSelectTopic: (subsectionId: string) => void;
  onStartLive: () => void;
  onStopLive: () => void;
  dailyVocabWords: VocabWord[];
  vocabSetIndex: number;
  onStartVocabPractice: (words: VocabWord[], mode: VocabPracticeMode) => void;
  onMarkVocabComplete: () => void;
}

const LEVELS: Array<"Beginner" | "Intermediate" | "Advanced"> = ["Beginner", "Intermediate", "Advanced"];

const phaseLabels: Record<string, string> = {
  intro: "Intro",
  model: "Model",
  controlled_practice: "Practice",
  correction: "Correction",
  repeat: "Repeat",
  free_practice: "Free practice",
  summary: "Summary",
};

export default function LiveFirstLearningShell(props: LiveFirstLearningShellProps) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<ShellTab>("lesson");

  const selectedTrack = props.tracks.find((t) => t.id === props.selectedTrackId) || props.tracks[0] || null;

  // All modules allowed by selected track
  const trackModuleIds = useMemo(() => new Set(selectedTrack?.moduleIds || []), [selectedTrack]);

  // Modules filtered by level and track
  const filteredModules = useMemo(() => {
    return props.courses
      .filter((c) => c.levelBand === props.selectedLevel)
      .flatMap((c) => c.modules)
      .filter((m) => trackModuleIds.size === 0 || trackModuleIds.has(m.id));
  }, [props.courses, props.selectedLevel, trackModuleIds]);

  const selectedModule = filteredModules.find((m) => m.id === props.selectedModuleId) || null;

  // Subtopics with optional search
  const subtopics = useMemo(() => {
    const base = selectedModule?.subsections || filteredModules.flatMap((m) => m.subsections);
    if (!search.trim()) return base;
    const term = search.toLowerCase();
    return base.filter((s) => s.title.toLowerCase().includes(term));
  }, [selectedModule, filteredModules, search]);

  const allTopics = buildTopicProgress({ courses: props.courses, cursor: props.cursor, sessions: props.sessions, messages: props.messages });
  const summary = topicProgressSummary(allTopics);
  const currentTopic = allTopics.find((t) => t.id === props.cursor?.subsectionId);

  const liveMessages = props.messages.filter((m) => m.sender === "coach" && m.source === "live" && m.text?.trim());

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-5">

        {/* Header */}
        <header className="rounded-3xl border border-white/10 bg-white/5 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Sky Live Teacher</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">Speak with Sky, {props.learnerName}</h1>
            <p className="text-sm text-slate-400 mt-1">Choose a topic below, then start Live. Sky will teach and correct you in real time.</p>
          </div>
          <button
            onClick={props.isLiveActive ? props.onStopLive : props.onStartLive}
            className={`px-6 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-colors ${
              props.isLiveActive
                ? "bg-red-600 hover:bg-red-500"
                : "bg-emerald-600 hover:bg-emerald-500"
            }`}
          >
            {props.isLiveActive ? <><StopCircle className="h-5 w-5" /> Stop Live</> : <><Mic className="h-5 w-5" /> Start Live with Sky</>}
          </button>
        </header>

        {/* Tab bar */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("lesson")}
            className={`flex items-center gap-2 rounded-2xl border px-5 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "lesson"
                ? "border-cyan-400/60 bg-cyan-600/20 text-cyan-200"
                : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            <GraduationCap className="h-4 w-4" /> Lesson
          </button>
          <button
            onClick={() => setActiveTab("vocabulary")}
            className={`flex items-center gap-2 rounded-2xl border px-5 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "vocabulary"
                ? "border-indigo-400/60 bg-indigo-600/20 text-indigo-200"
                : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            <BookOpen className="h-4 w-4" /> Vocabulary
            <span className="ml-1 rounded-full bg-indigo-500/30 px-2 py-0.5 text-[10px] text-indigo-300">{props.dailyVocabWords.length} words</span>
          </button>
        </div>

        {/* Current lesson status */}
        {activeTab === "lesson" && props.cursor && (
          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-4 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-cyan-300">Now teaching</p>
              <p className="font-bold text-lg mt-1">{currentTopic?.title || props.cursor.subsectionId}</p>
              <p className="text-xs text-slate-400">{currentTopic?.moduleTitle || props.cursor.moduleId}</p>
            </div>
            <div className="flex flex-col gap-2 min-w-[200px]">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Phase: {phaseLabels[props.cursor.phase] || props.cursor.phase}</span>
                <span>{currentTopic?.minutesSpent || 0}/{currentTopic?.targetMinutes || 20} min</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"].map((p) => (
                  <div key={p} title={phaseLabels[p]} className={`h-2 rounded-full ${p === props.cursor!.phase ? "bg-cyan-300" : "bg-white/15"}`} />
                ))}
              </div>
              {props.cursor.phaseSummary && <p className="text-xs text-slate-400 italic">{props.cursor.phaseSummary}</p>}
            </div>
          </div>
        )}

        {/* Vocabulary tab */}
        {activeTab === "vocabulary" && (
          <div className="grid md:grid-cols-2 gap-5">
            <VocabularyPanel
              words={props.dailyVocabWords}
              level={props.selectedLevel}
              isLiveActive={props.isLiveActive}
              setIndex={props.vocabSetIndex}
              onStartPractice={props.onStartVocabPractice}
              onMarkComplete={props.onMarkVocabComplete}
            />
            {/* Right: live transcript during vocab practice */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-emerald-200 font-bold">Live transcript</p>
                    <p className="text-[11px] text-slate-400">What Sky says during vocabulary practice.</p>
                  </div>
                  <Radio className={`h-5 w-5 ${props.isLiveActive ? "text-emerald-300 animate-pulse" : "text-slate-500"}`} />
                </div>
                <div className="max-h-96 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-3 space-y-2">
                  {liveMessages.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">
                      {props.isLiveActive ? "Listening — Sky's replies will appear here." : "Choose a practice mode and start. Sky's spoken replies will appear here."}
                    </p>
                  ) : (
                    liveMessages.slice(-15).map((m) => (
                      <div key={m.messageId} className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-200 mb-1">
                          <Volume2 className="h-3 w-3" /> Sky said
                        </p>
                        <p className="text-xs leading-relaxed text-slate-100">{m.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "lesson" && <div className="grid md:grid-cols-2 gap-5">

          {/* Left: pickers */}
          <div className="space-y-4">

            {/* Level selector */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Level</p>
              <div className="flex gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => props.onSelectLevel(l)}
                    className={`flex-1 rounded-xl py-2 text-sm font-semibold border transition-colors ${
                      props.selectedLevel === l
                        ? "bg-indigo-600 border-indigo-400 text-white"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Track selector */}
            {props.tracks.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Track</p>
                <select
                  value={props.selectedTrackId}
                  onChange={(e) => props.onSelectTrack(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none"
                >
                  {props.tracks.map((t) => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
                {selectedTrack?.description && (
                  <p className="mt-2 text-xs text-slate-400">{selectedTrack.description}</p>
                )}
              </div>
            )}

            {/* Module selector */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Module</p>
              {filteredModules.length === 0 ? (
                <p className="text-xs text-slate-500">No modules for this level / track combination.</p>
              ) : (
                <select
                  value={props.selectedModuleId}
                  onChange={(e) => props.onSelectModule(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none"
                >
                  <option value="">All modules</option>
                  {filteredModules.map((m) => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Subtopic search + clickable list */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs uppercase tracking-widest text-slate-400">Topics / subtopics</p>
                <span className="text-xs text-slate-500">{subtopics.length} shown</span>
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search subtopic..."
                className="w-full mb-3 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none placeholder:text-slate-500"
              />
              <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                {subtopics.length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-4">No subtopics found.</p>
                )}
                {subtopics.map((s) => {
                  const progress = allTopics.find((t) => t.id === s.id);
                  const isActive = props.cursor?.subsectionId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => props.onSelectTopic(s.id)}
                      className={`w-full rounded-2xl border p-3 text-left transition-colors ${
                        isActive
                          ? "border-cyan-400/60 bg-cyan-500/20"
                          : "border-white/10 bg-slate-900/60 hover:bg-slate-800/80"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-semibold text-sm text-slate-100">{s.order}. {s.title}</span>
                        <span className="shrink-0 text-xs text-slate-400 whitespace-nowrap">
                          {progress?.minutesSpent || 0}/{progress?.targetMinutes || 20} min
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isActive ? "bg-cyan-400" : "bg-emerald-500"}`}
                          style={{ width: `${progress?.percent || 0}%` }}
                        />
                      </div>
                      {isActive && <p className="mt-1 text-[10px] text-cyan-300">Currently active</p>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: coverage summary + live transcript */}
          <div className="space-y-4">

            {/* Coverage */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Coverage</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-black/20 border border-white/10 p-3">
                  <p className="text-xs text-slate-400">Topics started</p>
                  <p className="text-2xl font-bold mt-1">{summary.startedTopics}<span className="text-sm text-slate-500">/{summary.totalTopics}</span></p>
                </div>
                <div className="rounded-xl bg-black/20 border border-white/10 p-3">
                  <p className="text-xs text-slate-400">Good coverage</p>
                  <p className="text-2xl font-bold mt-1 text-emerald-400">{summary.goodTopics}</p>
                </div>
              </div>
            </div>

            {/* Live transcript */}
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs uppercase tracking-widest text-emerald-200 font-bold">Live transcript</p>
                  <p className="text-[11px] text-slate-400">What Sky says during your voice session.</p>
                </div>
                <Radio className={`h-5 w-5 ${props.isLiveActive ? "text-emerald-300 animate-pulse" : "text-slate-500"}`} />
              </div>
              <div className="max-h-64 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-3 space-y-2">
                {liveMessages.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">
                    {props.isLiveActive ? "Listening — Sky's replies will appear here after each turn." : "Start Live. Sky's spoken replies will appear here."}
                  </p>
                ) : (
                  liveMessages.slice(-10).map((m) => (
                    <div key={m.messageId} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-200 mb-1">
                        <Volume2 className="h-3 w-3" /> Sky said
                      </p>
                      <p className="text-xs leading-relaxed text-slate-100">{m.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>}

      </div>
    </div>
  );
}
