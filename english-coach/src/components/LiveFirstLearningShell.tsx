import { useMemo, useState } from "react";
import { ArrowLeft, BookOpen, ExternalLink, GraduationCap, LogOut, Mic, Radio, Search, StopCircle, Volume2 } from "lucide-react";
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
  isAgentSpeaking?: boolean;
  selectedLevel: "Beginner" | "Intermediate" | "Advanced";
  selectedTrackId: string;
  selectedModuleId: string;
  onSelectLevel: (level: "Beginner" | "Intermediate" | "Advanced") => void;
  onSelectTrack: (trackId: string) => void;
  onSelectModule: (moduleId: string) => void;
  onSelectTopic: (subsectionId: string) => void;
  onStartLive: () => void;
  onStopLive: () => void;
  onSignOut?: () => void;
  onBackToPortals?: () => void;
  dailyVocabWords: VocabWord[];
  vocabSetIndex: number;
  onStartVocabPractice: (words: VocabWord[], mode: VocabPracticeMode) => void;
  onMarkVocabComplete: () => void;
}

const LEVELS: Array<"Beginner" | "Intermediate" | "Advanced"> = ["Beginner", "Intermediate", "Advanced"];

const phaseLabels: Record<string, string> = {
  intro: "Intro", model: "Model", controlled_practice: "Practice",
  correction: "Correction", repeat: "Repeat", free_practice: "Free practice", summary: "Summary",
};
const phaseDescriptions: Record<string, string> = {
  intro:               "Sky introduces the topic, explains why it matters, and previews what you'll practise.",
  model:               "Sky demonstrates the language in context — listen carefully to the examples and rhythm.",
  controlled_practice: "Your turn — Sky gives guided prompts. Try to use the pattern; Sky will correct immediately.",
  correction:          "Sky focuses on the specific errors you made and drills the correct form with you.",
  repeat:              "Repeat key sentences aloud after Sky to build muscle memory and natural fluency.",
  free_practice:       "Open conversation — use the language naturally. Sky only corrects if you're stuck.",
  summary:             "Sky recaps what you learned, highlights progress, and suggests what to practise next.",
};
const PHASE_KEYS = ["intro", "model", "controlled_practice", "correction", "repeat", "free_practice", "summary"];

const TOPIC_DESCRIPTIONS: Record<string, { what: string; learn: string[]; tips: string[] }> = {
  default: {
    what: "Sky will teach this topic through conversation, models, and correction.",
    learn: [
      "Core vocabulary and phrases",
      "Natural sentence patterns",
      "Common mistakes to avoid",
      "How to use it in real conversation",
    ],
    tips: [
      "Press Live and speak naturally",
      "Sky will correct and model better phrasing",
      "Ask Sky to explain anything you don't understand",
      "Repeat after Sky to build muscle memory",
    ],
  },
};

const GRAMMAR_RESOURCES = [
  { label: "Tenses Guide",        href: "/en-grammar-tenses.html",     colour: "sky" },
  { label: "Articles (a/an/the)", href: "/en-grammar-articles.html",   colour: "violet" },
  { label: "Prepositions",        href: "/en-grammar-prepositions.html",colour: "amber" },
  { label: "Sentence Structure",  href: "/en-grammar-sentences.html",  colour: "indigo" },
  { label: "Daily Vocabulary",    href: "/en-vocabulary-daily.html",   colour: "cyan" },
  { label: "Work & Office",       href: "/en-vocabulary-work.html",    colour: "rose" },
];

const refColour: Record<string, string> = {
  sky:    "border-sky-500/60    bg-sky-500/10    text-sky-300    hover:bg-sky-500/20    hover:border-sky-400",
  violet: "border-violet-500/60 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 hover:border-violet-400",
  amber:  "border-amber-500/60  bg-amber-500/10  text-amber-300  hover:bg-amber-500/20  hover:border-amber-400",
  indigo: "border-indigo-500/60 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400",
  cyan:   "border-cyan-500/60   bg-cyan-500/10   text-cyan-300   hover:bg-cyan-500/20   hover:border-cyan-400",
  rose:   "border-rose-500/60   bg-rose-500/10   text-rose-300   hover:bg-rose-500/20   hover:border-rose-400",
};

// Phase pill colour when that phase is active
const phaseActiveColour: Record<string, string> = {
  intro:               "border-sky-400    bg-sky-500/30    text-sky-100",
  model:               "border-violet-400 bg-violet-500/30 text-violet-100",
  controlled_practice: "border-indigo-400 bg-indigo-500/30 text-indigo-100",
  correction:          "border-amber-400  bg-amber-500/30  text-amber-100",
  repeat:              "border-cyan-400   bg-cyan-500/30   text-cyan-100",
  free_practice:       "border-purple-400 bg-purple-500/30 text-purple-100",
  summary:             "border-rose-400   bg-rose-500/30   text-rose-100",
};

export default function LiveFirstLearningShell(props: LiveFirstLearningShellProps) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<ShellTab>("lesson");
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const selectedTrack = props.tracks.find((t) => t.id === props.selectedTrackId) || props.tracks[0] || null;
  const trackModuleIds = useMemo(() => new Set(selectedTrack?.moduleIds || []), [selectedTrack]);

  const filteredModules = useMemo(() => {
    return props.courses
      .filter((c) => c.levelBand === props.selectedLevel)
      .flatMap((c) => c.modules)
      .filter((m) => trackModuleIds.size === 0 || trackModuleIds.has(m.id));
  }, [props.courses, props.selectedLevel, trackModuleIds]);

  const selectedModule = filteredModules.find((m) => m.id === props.selectedModuleId) || null;

  const subtopics = useMemo(() => {
    const base = selectedModule?.subsections || filteredModules.flatMap((m) => m.subsections);
    if (!search.trim()) return base;
    const term = search.toLowerCase();
    return base.filter((s) => s.title.toLowerCase().includes(term));
  }, [selectedModule, filteredModules, search]);

  const allTopics = buildTopicProgress({ courses: props.courses, cursor: props.cursor, sessions: props.sessions, messages: props.messages });
  const summary = topicProgressSummary(allTopics);
  const currentTopic = allTopics.find((t) => t.id === props.cursor?.subsectionId);
  const currentModule = props.cursor ? filteredModules.find((m) => m.id === props.cursor!.moduleId) : null;
  const liveMessages = props.messages.filter((m) => m.sender === "coach" && m.source === "live" && m.text?.trim());
  const topicDesc = TOPIC_DESCRIPTIONS.default;

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0d1a]">

      {/* ── Sidebar ── */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-700/60 overflow-hidden bg-[#0f1120]">

        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-slate-700/50 space-y-3">
          <div className="flex items-center justify-between">
            {props.onBackToPortals && (
              <button
                onClick={props.onBackToPortals}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}
            {props.onSignOut && (
              <button
                onClick={props.onSignOut}
                className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-300 transition ml-auto"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-widest font-bold text-indigo-400">Sky Live Teacher</p>
              <p className="text-lg font-bold text-white mt-0.5">{props.learnerName}</p>
            </div>
            <button
              onClick={props.isLiveActive ? props.onStopLive : props.onStartLive}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition shadow-lg ${
                props.isLiveActive
                  ? "bg-red-600 text-white hover:bg-red-500 shadow-red-900/50"
                  : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-900/60"
              }`}
            >
              {props.isLiveActive
                ? <><StopCircle className="h-4 w-4" /> Stop</>
                : <><Mic className="h-4 w-4" /> Live</>}
            </button>
          </div>

          {props.isLiveActive && (
            <p className="flex items-center gap-2 text-sm">
              <span className={`h-2.5 w-2.5 rounded-full animate-pulse ${props.isAgentSpeaking ? "bg-amber-400" : "bg-sky-400"}`} />
              <span className={`font-semibold ${props.isAgentSpeaking ? "text-amber-300" : "text-sky-300"}`}>
                {props.isAgentSpeaking ? "Sky is speaking…" : "Listening to you"}
              </span>
            </p>
          )}

          <div className="flex gap-1.5">
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => props.onSelectLevel(l)}
                className={`flex-1 rounded-lg py-2 text-sm font-bold transition ${
                  props.selectedLevel === l
                    ? "bg-indigo-600 text-white shadow shadow-indigo-900/60"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {l[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex-shrink-0 flex border-b border-slate-700/50">
          {(["lesson", "vocabulary"] as ShellTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold border-b-2 transition ${
                activeTab === tab
                  ? "border-indigo-400 text-indigo-200"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {tab === "lesson" ? <GraduationCap className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
              {tab === "lesson" ? "Lesson" : "Vocab"}
              {tab === "vocabulary" && (
                <span className="rounded-full bg-indigo-600/50 px-2 py-0.5 text-xs font-bold text-indigo-200">
                  {props.dailyVocabWords.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {activeTab === "lesson" && (
            <>
              {props.tracks.length > 0 && (
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-bold text-slate-500 mb-2">Track</p>
                  <div className="space-y-1">
                    {props.tracks.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => props.onSelectTrack(t.id)}
                        className={`w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                          props.selectedTrackId === t.id
                            ? "bg-indigo-600/30 text-indigo-100 border border-indigo-500/50"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {t.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredModules.length > 0 && (
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-bold text-slate-500 mb-2">Module</p>
                  <div className="space-y-1">
                    <button
                      onClick={() => props.onSelectModule("")}
                      className={`w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        !props.selectedModuleId
                          ? "bg-indigo-600/30 text-indigo-100 border border-indigo-500/50"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      All modules
                    </button>
                    {filteredModules.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => props.onSelectModule(m.id)}
                        className={`w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                          props.selectedModuleId === m.id
                            ? "bg-indigo-600/30 text-indigo-100 border border-indigo-500/50"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {m.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] uppercase tracking-widest font-bold text-slate-500">Topics</p>
                  <span className="text-xs font-bold text-slate-500">{subtopics.length}</span>
                </div>
                <label className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 mb-2">
                  <Search className="h-4 w-4 text-slate-500 flex-shrink-0" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search topics…"
                    className="w-full bg-transparent text-sm text-white placeholder:text-slate-600 outline-none"
                  />
                </label>
                <div className="space-y-1">
                  {subtopics.length === 0 ? (
                    <p className="text-sm text-slate-600 text-center py-6">No topics found</p>
                  ) : (
                    subtopics.map((s) => {
                      const progress = allTopics.find((t) => t.id === s.id);
                      const isActive = props.cursor?.subsectionId === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => props.onSelectTopic(s.id)}
                          className={`w-full rounded-lg px-3 py-2.5 text-left transition ${
                            isActive
                              ? "bg-indigo-600/30 text-indigo-100 border border-indigo-500/50"
                              : "text-slate-400 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium">{s.order}. {s.title}</span>
                            <span className="text-xs font-bold flex-shrink-0 text-slate-500 ml-1">{progress?.percent || 0}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${isActive ? "bg-indigo-400" : "bg-slate-600"}`}
                              style={{ width: `${progress?.percent || 0}%` }}
                            />
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === "vocabulary" && (
            <VocabularyPanel
              words={props.dailyVocabWords}
              level={props.selectedLevel}
              isLiveActive={props.isLiveActive}
              setIndex={props.vocabSetIndex}
              onStartPractice={props.onStartVocabPractice}
              onMarkComplete={props.onMarkVocabComplete}
            />
          )}
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 min-w-0 overflow-y-auto bg-[#0b0d1a]">

        {/* Sticky lesson header */}
        {props.cursor && activeTab === "lesson" && (
          <div className="sticky top-0 z-10 border-b border-slate-700/60 px-7 py-4 bg-[#0f1120]">
            <p className="text-xs uppercase tracking-widest font-bold text-indigo-400">
              {currentModule?.title || "Now Teaching"}
            </p>
            <h2 className="text-2xl font-extrabold text-white mt-1 tracking-tight">
              {currentTopic?.title || props.cursor.subsectionId}
            </h2>
            <div className="mt-2.5 flex items-center gap-3">
              <span className="text-sm font-bold text-sky-400">{phaseLabels[props.cursor.phase] || props.cursor.phase}</span>
              <div className="flex-1 flex gap-1">
                {PHASE_KEYS.map((p) => (
                  <div
                    key={p}
                    title={phaseLabels[p]}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      p === props.cursor!.phase ? "bg-sky-400" : "bg-slate-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-400">
                {currentTopic?.minutesSpent || 0}/{currentTopic?.targetMinutes || 20} min
              </span>
            </div>
            {props.cursor.phaseSummary && (
              <p className="mt-1.5 text-sm text-slate-500 italic">{props.cursor.phaseSummary}</p>
            )}
          </div>
        )}

        <div className="p-7 space-y-5">

          {/* Topic detail card */}
          {props.cursor && activeTab === "lesson" && (
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-6"
              style={{ boxShadow: "0 0 40px rgba(99,102,241,0.08)" }}>
              <h3 className="text-xl font-bold text-indigo-200 mb-1">
                {currentTopic?.title || props.cursor.subsectionId}
              </h3>
              <p className="text-base text-slate-400 mb-5">{topicDesc.what}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-4">
                  <p className="text-xs uppercase tracking-widest font-bold text-sky-400 mb-3">What you'll learn</p>
                  <ul className="space-y-2.5">
                    {topicDesc.learn.map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-base text-slate-200">
                        <span className="mt-2 h-2 w-2 rounded-full bg-sky-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
                  <p className="text-xs uppercase tracking-widest font-bold text-violet-400 mb-3">How to get the most</p>
                  <ul className="space-y-2.5">
                    {topicDesc.tips.map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-base text-slate-200">
                        <span className="mt-2 h-2 w-2 rounded-full bg-violet-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-slate-700/50">
                <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-3">Teaching Phases</p>
                <div className="flex flex-wrap gap-2">
                  {PHASE_KEYS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPhase(selectedPhase === p ? null : p)}
                      className={`rounded-full px-4 py-1.5 text-sm font-semibold border transition-all ${
                        p === props.cursor!.phase
                          ? phaseActiveColour[p] ?? "border-indigo-400 bg-indigo-500/30 text-indigo-100"
                          : selectedPhase === p
                          ? "border-slate-500 bg-slate-700/50 text-slate-200"
                          : "border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {p === props.cursor!.phase && <span className="mr-1.5">▶</span>}
                      {phaseLabels[p]}
                    </button>
                  ))}
                </div>
                {selectedPhase && (
                  <div className="mt-4 rounded-xl border border-slate-700/60 bg-slate-800/40 px-5 py-4">
                    <p className="text-sm font-bold text-sky-400 uppercase tracking-wide mb-1.5">
                      {phaseLabels[selectedPhase]}
                    </p>
                    <p className="text-base text-slate-200 leading-relaxed">{phaseDescriptions[selectedPhase]}</p>
                    {selectedPhase === props.cursor!.phase && (
                      <p className="mt-2.5 text-sm text-slate-500 italic">Sky is currently in this phase with you.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Grammar & Vocabulary Reference */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-800/30 p-6">
            <div className="flex items-center gap-2.5 mb-1.5">
              <BookOpen className="h-5 w-5 text-amber-400" />
              <p className="text-base font-bold text-amber-300 uppercase tracking-wide">Grammar &amp; Vocabulary Reference</p>
            </div>
            <p className="text-sm text-slate-500 mb-4">Open these guides in a new tab to study while Sky teaches you.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {GRAMMAR_RESOURCES.map((res) => (
                <a
                  key={res.href}
                  href={res.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${refColour[res.colour]}`}
                >
                  <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                  {res.label}
                </a>
              ))}
            </div>
          </div>

          {/* Live transcript */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-800/30">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
              <div>
                <p className="text-base font-bold text-amber-300 uppercase tracking-wide">Live Transcript</p>
                <p className="text-sm text-slate-500 mt-0.5">Sky's spoken replies appear here during Live sessions</p>
              </div>
              <Radio className={`h-5 w-5 ${props.isLiveActive ? "text-sky-400 animate-pulse" : "text-slate-700"}`} />
            </div>
            <div className="min-h-[80px] max-h-72 overflow-y-auto p-5 space-y-3">
              {liveMessages.length === 0 ? (
                <p className="text-base text-slate-600 text-center py-6">
                  {props.isLiveActive
                    ? "Listening — Sky's replies will appear here."
                    : "Choose a topic and press Live. Sky will teach and correct you in real time."}
                </p>
              ) : (
                liveMessages.slice(-10).map((m) => (
                  <div key={m.messageId} className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
                    <p className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-indigo-400 font-bold mb-2">
                      <Volume2 className="h-3.5 w-3.5" /> Sky said
                    </p>
                    <p className="text-base leading-relaxed text-slate-100">{m.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Progress */}
          {activeTab === "lesson" && (
            <div className="rounded-2xl border border-slate-700/60 bg-slate-800/30 p-6">
              <p className="text-base font-bold text-amber-300 uppercase tracking-wide mb-4">Your Progress</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-5">
                  <p className="text-sm text-slate-400">Topics started</p>
                  <p className="text-4xl font-extrabold text-white mt-1">
                    {summary.startedTopics}
                    <span className="text-lg font-normal text-slate-600">/{summary.totalTopics}</span>
                  </p>
                </div>
                <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-5">
                  <p className="text-sm text-sky-400">Good coverage</p>
                  <p className="text-4xl font-extrabold text-sky-300 mt-1">{summary.goodTopics}</p>
                </div>
              </div>
            </div>
          )}

          {/* Vocabulary panel */}
          {activeTab === "vocabulary" && (
            <VocabularyPanel
              words={props.dailyVocabWords}
              level={props.selectedLevel}
              isLiveActive={props.isLiveActive}
              setIndex={props.vocabSetIndex}
              onStartPractice={props.onStartVocabPractice}
              onMarkComplete={props.onMarkVocabComplete}
            />
          )}
        </div>
      </main>
    </div>
  );
}
