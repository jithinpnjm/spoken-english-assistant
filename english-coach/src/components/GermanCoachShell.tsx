import { useCallback, useMemo, useState } from "react";
import { ArrowLeft, BookOpen, CheckCircle2, GraduationCap, Languages, Mic, PenLine, Radio, ShieldCheck, StopCircle, Volume2 } from "lucide-react";
import { germanCurriculum, getGermanLevel, getGermanSubtopicCount, type GermanLevel, type GermanSection, type GermanSubtopic } from "../lib/germanCurriculumRegistry";
import { useLiveCoachSession } from "../hooks/useLiveCoachSession";
import GermanPracticePanel from "./GermanPracticePanel";
import GermanWritingReviewPanel from "./GermanWritingReviewPanel";
import GermanVocabularyBankPanel from "./GermanVocabularyBankPanel";
import GermanProgressPanel from "./GermanProgressPanel";
import GermanStudyDashboard from "./GermanStudyDashboard";
import GermanA1MiniMockPanel from "./GermanA1MiniMockPanel";
import GermanA2MiniMockPanel from "./GermanA2MiniMockPanel";
import GermanB1MockPanel from "./GermanB1MockPanel";
import GermanListeningPracticePanel from "./GermanListeningPracticePanel";
import GermanOrderedPathPanel from "./GermanOrderedPathPanel";

interface GermanCoachShellProps {
  learnerName: string;
  onBackToPortals: () => void;
}

type GermanViewMode = "exam" | "ordered";

const levelStyles: Record<GermanLevel, string> = {
  A0: "border-sky-400/40 bg-sky-500/10 text-sky-100",
  A1: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
  A2: "border-amber-400/40 bg-amber-500/10 text-amber-100",
  B1: "border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-100",
};

const sectionIcons: Partial<Record<GermanSection["skill"], any>> = {
  survival: ShieldCheck,
  hoeren: Radio,
  lesen: BookOpen,
  schreiben: PenLine,
  sprechen: Mic,
  wortschatz: Languages,
  grammatik: GraduationCap,
  mock_exam: CheckCircle2,
};

function SectionCard({ section, selected, onSelect }: { section: GermanSection; selected: boolean; onSelect: () => void }) {
  const Icon = sectionIcons[section.skill] || BookOpen;
  return (
    <button onClick={onSelect} className={`rounded-2xl border p-4 text-left transition ${selected ? "border-cyan-300/70 bg-cyan-500/15" : "border-white/10 bg-white/5 hover:bg-white/10"}`}>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-5 w-5 text-cyan-200" />
        <h3 className="font-bold text-slate-100">{section.title}</h3>
      </div>
      <p className="text-xs leading-5 text-slate-400">{section.description}</p>
      <p className="mt-3 text-[11px] uppercase tracking-wider text-slate-500">{section.subtopics.length} subtopics</p>
    </button>
  );
}

function SubtopicCard({ subtopic, selected, onSelect }: { subtopic: GermanSubtopic; selected: boolean; onSelect: () => void }) {
  return (
    <button onClick={onSelect} className={`w-full rounded-2xl border p-4 text-left transition ${selected ? "border-amber-300/70 bg-amber-500/10" : "border-white/10 bg-slate-900/70 hover:bg-slate-900"}`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h4 className="font-bold text-slate-100">{subtopic.title}</h4>
          <p className="mt-1 text-sm leading-6 text-slate-400">{subtopic.description}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{subtopic.targetMinutes} min</span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="text-[11px] uppercase tracking-wider text-cyan-300">Grammar</p>
          <p className="mt-2 text-xs text-slate-300">{subtopic.grammarFocus.join(" · ")}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="text-[11px] uppercase tracking-wider text-amber-300">Vocabulary</p>
          <p className="mt-2 text-xs text-slate-300">{subtopic.vocabularyFocus.join(" · ")}</p>
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3">
          <p className="text-[11px] uppercase tracking-wider text-emerald-200">Living in Germany</p>
          <p className="mt-2 text-xs leading-5 text-slate-300">{subtopic.survivalUse}</p>
        </div>
        <div className="rounded-xl border border-purple-400/20 bg-purple-500/10 p-3">
          <p className="text-[11px] uppercase tracking-wider text-purple-200">Goethe use</p>
          <p className="mt-2 text-xs leading-5 text-slate-300">{subtopic.goetheUse}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {subtopic.practiceModes.map((mode) => (
          <span key={mode} className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-slate-300">{mode}</span>
        ))}
      </div>
    </button>
  );
}

export default function GermanCoachShell({ learnerName, onBackToPortals }: GermanCoachShellProps) {
  const [selectedLevel, setSelectedLevel] = useState<GermanLevel>("A1");
  const [viewMode, setViewMode] = useState<GermanViewMode>("exam");
  const plan = getGermanLevel(selectedLevel);
  const [selectedSectionId, setSelectedSectionId] = useState(plan.sections[0]?.id || "");
  const [selectedSubtopicId, setSelectedSubtopicId] = useState("");
  const [liveTranscript, setLiveTranscript] = useState<string[]>([]);

  const selectedSection = useMemo(() => plan.sections.find((section) => section.id === selectedSectionId) || plan.sections[0], [plan, selectedSectionId]);
  const selectedSubtopic = useMemo(() => selectedSection?.subtopics.find((subtopic) => subtopic.id === selectedSubtopicId) || selectedSection?.subtopics[0] || null, [selectedSection, selectedSubtopicId]);

  const handleLiveMessage = useCallback((msg: { text?: string }) => {
    if (!msg.text?.trim()) return;
    setLiveTranscript((prev) => [...prev.slice(-9), msg.text!.trim()]);
  }, []);

  const live = useLiveCoachSession(handleLiveMessage);

  function chooseLevel(level: GermanLevel) {
    const next = getGermanLevel(level);
    setSelectedLevel(level);
    setSelectedSectionId(next.sections[0]?.id || "");
    setSelectedSubtopicId(next.sections[0]?.subtopics[0]?.id || "");
    setLiveTranscript([]);
    if (live.isConnected) live.stop();
  }

  function chooseSection(section: GermanSection) {
    setSelectedSectionId(section.id);
    setSelectedSubtopicId(section.subtopics[0]?.id || "");
    setLiveTranscript([]);
    if (live.isConnected) live.stop();
  }

  async function startGermanLive() {
    setLiveTranscript([]);
    await live.startGermanSession({
      learnerName,
      level: selectedLevel,
      section: selectedSection || null,
      subtopic: selectedSubtopic || null,
    });
  }

  function stopGermanLive() {
    live.stop();
  }

  const showWritingReview = selectedSection?.skill === "schreiben" || selectedSection?.skill === "mock_exam";
  const showAudioPractice = selectedSection?.skill === "hoeren";
  const showA1Mock = selectedLevel === "A1" && selectedSection?.skill === "mock_exam";
  const showA2Mock = selectedLevel === "A2" && selectedSection?.skill === "mock_exam";
  const showB1Mock = selectedLevel === "B1" && selectedSection?.skill === "mock_exam";

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-slate-100 md:p-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <button onClick={onBackToPortals} className="mb-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/15">
            <ArrowLeft className="h-4 w-4" /> Back to portals
          </button>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Deutsch Coach</p>
              <h1 className="mt-2 text-2xl font-bold md:text-3xl">German for Goethe exams and life in Germany, {learnerName}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">A1 is your first active exam goal. A0 survival, A2 bridge, and B1 Goethe preparation are already mapped so the portal can grow step by step.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                Current goal: <span className="font-bold">Goethe A1</span>
                <p className="mt-1 text-xs text-emerald-200/80">Path: A0 → A1 → A2 → B1</p>
              </div>
              <button onClick={live.isConnected ? stopGermanLive : startGermanLive} className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${live.isConnected ? "bg-red-600 hover:bg-red-500" : "bg-amber-500 text-slate-950 hover:bg-amber-400"}`}>
                {live.isConnected ? <><StopCircle className="h-4 w-4" /> Stop German Live</> : <><Mic className="h-4 w-4" /> Start German Live</>}
              </button>
            </div>
          </div>
          {live.error && <p className="mt-3 rounded-xl border border-red-500/30 bg-red-950/70 px-3 py-2 text-xs text-red-100">{live.error}</p>}
        </header>

        {liveTranscript.length > 0 && (
          <section className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5">
            <div className="mb-3 flex items-center gap-2 text-amber-100">
              <Volume2 className="h-5 w-5" />
              <h2 className="font-bold">German live transcript</h2>
            </div>
            <div className="space-y-2">
              {liveTranscript.map((line, index) => <p key={`${line}-${index}`} className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-100">{line}</p>)}
            </div>
          </section>
        )}

        <section className="grid gap-3 md:grid-cols-4">
          {germanCurriculum.map((level) => (
            <button key={level.level} onClick={() => chooseLevel(level.level)} className={`rounded-2xl border p-4 text-left transition ${selectedLevel === level.level ? levelStyles[level.level] : "border-white/10 bg-white/5 hover:bg-white/10"}`}>
              <p className="text-xs uppercase tracking-wider text-slate-400">{level.level}</p>
              <h2 className="mt-1 font-bold">{level.title}</h2>
              <p className="mt-2 text-xs leading-5 text-slate-400">{level.subtitle}</p>
              <p className="mt-3 text-[11px] text-slate-500">{getGermanSubtopicCount(level.level)} mapped subtopics</p>
            </button>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <GermanProgressPanel />
          <GermanVocabularyBankPanel level={selectedLevel} />
        </section>

        <GermanStudyDashboard level={selectedLevel} selectedSubtopicId={selectedSubtopic?.id} />

        <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Selected level</p>
              <h2 className="mt-1 text-2xl font-bold">{plan.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{plan.goal}</p>
            </div>
            <div className="flex rounded-2xl border border-white/10 bg-black/20 p-1 text-xs text-slate-300">
              <button onClick={() => setViewMode("exam")} className={`rounded-xl px-4 py-2 font-semibold ${viewMode === "exam" ? "bg-cyan-500 text-slate-950" : "hover:bg-white/10"}`}>Exam Sections</button>
              <button onClick={() => setViewMode("ordered")} className={`rounded-xl px-4 py-2 font-semibold ${viewMode === "ordered" ? "bg-cyan-500 text-slate-950" : "hover:bg-white/10"}`}>Ordered Path</button>
            </div>
          </div>

          {viewMode === "ordered" ? (
            <GermanOrderedPathPanel level={selectedLevel} variant="catalog" />
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-3">
                {plan.sections.map((section) => <SectionCard key={section.id} section={section} selected={section.id === selectedSection?.id} onSelect={() => chooseSection(section)} />)}
              </div>
              <div className="md:col-span-2 space-y-4">
                {selectedSection ? (
                  <>
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                      <p className="text-xs uppercase tracking-widest text-cyan-300">{selectedLevel} section</p>
                      <h3 className="mt-1 text-xl font-bold">{selectedSection.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{selectedSection.description}</p>
                    </div>
                    {selectedSection.subtopics.map((subtopic) => <SubtopicCard key={subtopic.id} subtopic={subtopic} selected={subtopic.id === selectedSubtopic?.id} onSelect={() => setSelectedSubtopicId(subtopic.id)} />)}
                    {selectedSubtopic && <GermanPracticePanel level={selectedLevel} subtopic={selectedSubtopic} />}
                    {showWritingReview && <GermanWritingReviewPanel level={selectedLevel} />}
                    {showAudioPractice && <GermanListeningPracticePanel level={selectedLevel} />}
                    {showA1Mock && <GermanA1MiniMockPanel />}
                    {showA2Mock && <GermanA2MiniMockPanel />}
                    {showB1Mock && <GermanB1MockPanel />}
                  </>
                ) : (
                  <p className="rounded-2xl border border-white/10 bg-slate-900 p-4 text-sm text-slate-400">Choose a section to view subtopics.</p>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
