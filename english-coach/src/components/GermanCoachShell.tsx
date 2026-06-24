import { useCallback, useMemo, useState } from "react";
import { ArrowLeft, BookOpen, CheckCircle2, GraduationCap, Mic, PenLine, Radio, ShieldCheck, StopCircle, Volume2 } from "lucide-react";
import { germanCurriculum, getGermanLevel, getGermanSubtopicCount, type GermanLevel, type GermanSection, type GermanSubtopic } from "../lib/germanCurriculumRegistry";
import { buildGermanStudyMaterial } from "../lib/germanStudyMaterials";
import { useLiveCoachSession } from "../hooks/useLiveCoachSession";
import GermanPracticePanel from "./GermanPracticePanel";
import GermanWritingReviewPanel from "./GermanWritingReviewPanel";
import GermanA1MiniMockPanel from "./GermanA1MiniMockPanel";
import GermanA2MiniMockPanel from "./GermanA2MiniMockPanel";
import GermanB1MockPanel from "./GermanB1MockPanel";
import GermanListeningPracticePanel from "./GermanListeningPracticePanel";
import GermanProgressPanel from "./GermanProgressPanel";
import GermanOrderedPathPanel from "./GermanOrderedPathPanel";

interface GermanCoachShellProps {
  learnerName: string;
  onBackToPortals: () => void;
}

type GermanWorkMode = "study" | "practice" | "exam" | "mock";

type TopicCardProps = {
  key?: string;
  section: GermanSection;
  selected: boolean;
  onSelect: () => void;
};

type SubtopicCardProps = {
  key?: string;
  subtopic: GermanSubtopic;
  selected: boolean;
  onSelect: () => void;
};

const levelStyles: Record<GermanLevel, string> = {
  A0: "border-sky-400 bg-sky-500/15 text-sky-100",
  A1: "border-emerald-400 bg-emerald-500/15 text-emerald-100",
  A2: "border-amber-400 bg-amber-500/15 text-amber-100",
  B1: "border-fuchsia-400 bg-fuchsia-500/15 text-fuchsia-100",
};

const modeLabels: Record<GermanWorkMode, string> = {
  study: "Study",
  practice: "Practice",
  exam: "Exam prep",
  mock: "Mock exam",
};

const sectionIcons: Partial<Record<GermanSection["skill"], any>> = {
  survival: ShieldCheck,
  hoeren: Radio,
  lesen: BookOpen,
  schreiben: PenLine,
  sprechen: Mic,
  wortschatz: BookOpen,
  grammatik: GraduationCap,
  mock_exam: CheckCircle2,
};

function TopicCard({ section, selected, onSelect }: TopicCardProps) {
  const Icon = sectionIcons[section.skill] || BookOpen;
  return (
    <button
      onClick={onSelect}
      className={`w-full rounded-2xl border p-4 text-left transition ${selected ? "border-cyan-300 bg-cyan-500/20 shadow-lg shadow-cyan-950/30" : "border-white/10 bg-white/5 hover:border-cyan-300/60 hover:bg-white/10"}`}
    >
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-black/30 p-2"><Icon className="h-5 w-5 text-cyan-200" /></span>
        <div>
          <h3 className="font-bold text-slate-100">{section.title}</h3>
          <p className="text-xs text-slate-400">{section.subtopics.length} subtopics</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">{section.description}</p>
    </button>
  );
}

function SubtopicCard({ subtopic, selected, onSelect }: SubtopicCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full rounded-2xl border p-4 text-left transition ${selected ? "border-amber-300 bg-amber-500/20 shadow-lg shadow-amber-950/30" : "border-white/10 bg-slate-900/70 hover:border-amber-300/60 hover:bg-slate-900"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-bold text-slate-100">{subtopic.title}</h4>
          <p className="mt-1 text-sm leading-6 text-slate-400">{subtopic.description}</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{subtopic.targetMinutes} min</span>
      </div>
    </button>
  );
}

function StudyPanel({ level, subtopic }: { level: GermanLevel; subtopic: GermanSubtopic }) {
  const material = buildGermanStudyMaterial(level, subtopic);

  return (
    <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5">
      <p className="text-xs uppercase tracking-widest text-emerald-200">Study lesson</p>
      <h3 className="mt-1 text-2xl font-bold text-slate-100">{subtopic.title}</h3>
      <p className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold leading-6 text-slate-100">Goal: {material.lessonGoal}</p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-widest text-emerald-200">1. Simple English explanation</p>
        <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
          {material.simpleExplanation.map((item) => <p key={item}>{item}</p>)}
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-200">2. German pattern</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
            {material.germanPattern.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-amber-200">3. Word-by-word meaning</p>
          <div className="mt-3 space-y-3">
            {material.wordByWord.map((example) => (
              <div key={`${example.de}-${example.en}`} className="rounded-xl bg-white/5 p-3">
                <p className="font-semibold text-slate-100">{example.de}</p>
                <p className="text-sm text-slate-300">{example.en}</p>
                {example.note && <p className="mt-1 text-xs text-slate-400">{example.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-widest text-yellow-200">4. Mini vocabulary table</p>
        <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10 text-xs uppercase tracking-wider text-slate-300">
              <tr><th className="p-3">German</th><th className="p-3">Meaning</th><th className="p-3">Example</th></tr>
            </thead>
            <tbody>
              {material.vocabulary.map((item) => (
                <tr key={`${item.de}-${item.en}`} className="border-t border-white/10">
                  <td className="p-3 font-semibold text-slate-100">{item.de}</td>
                  <td className="p-3 text-slate-300">{item.en}</td>
                  <td className="p-3 text-slate-400">{item.example || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-purple-200">5. Model examples</p>
          <div className="mt-3 space-y-3">
            {material.modelExamples.map((example) => (
              <div key={`${example.de}-${example.en}`} className="rounded-xl bg-white/5 p-3">
                <p className="font-semibold text-slate-100">{example.de}</p>
                <p className="text-sm text-slate-300">{example.en}</p>
                {example.note && <p className="mt-1 text-xs text-slate-400">{example.note}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
          <p className="text-xs uppercase tracking-widest text-red-100">6. Common mistakes</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
            {material.commonMistakes.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-200">7. Mini drills</p>
          <ul className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300">
            {material.miniDrills.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-emerald-200">8. Speaking prompts</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
            {material.speakingPrompts.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-amber-200">9. Repeat with Live</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
            {material.repeatWithLiveAgent.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-widest text-fuchsia-200">10. Writing or listening task</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">{material.writingOrListeningTask}</p>
      </div>
    </div>
  );
}

export default function GermanCoachShell({ learnerName, onBackToPortals }: GermanCoachShellProps) {
  const [selectedLevel, setSelectedLevel] = useState<GermanLevel>("A1");
  const [selectedSectionId, setSelectedSectionId] = useState(getGermanLevel("A1").sections[0]?.id || "");
  const [selectedSubtopicId, setSelectedSubtopicId] = useState("");
  const [workMode, setWorkMode] = useState<GermanWorkMode>("study");
  const [showStudyPath, setShowStudyPath] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<string[]>([]);

  const plan = getGermanLevel(selectedLevel);
  const selectedSection = useMemo(() => plan.sections.find((section) => section.id === selectedSectionId) || plan.sections[0], [plan, selectedSectionId]);
  const selectedSubtopic = useMemo(() => selectedSection?.subtopics.find((subtopic) => subtopic.id === selectedSubtopicId) || selectedSection?.subtopics[0] || null, [selectedSection, selectedSubtopicId]);

  const handleLiveMessage = useCallback((msg: { text?: string }) => {
    if (!msg.text?.trim()) return;
    setLiveTranscript((prev) => [...prev.slice(-9), msg.text!.trim()]);
  }, []);

  const live = useLiveCoachSession(handleLiveMessage);

  function stopLiveIfNeeded() {
    setLiveTranscript([]);
    live.stop();
  }

  function chooseLevel(level: GermanLevel) {
    const next = getGermanLevel(level);
    stopLiveIfNeeded();
    setSelectedLevel(level);
    setSelectedSectionId(next.sections[0]?.id || "");
    setSelectedSubtopicId(next.sections[0]?.subtopics[0]?.id || "");
    setWorkMode("study");
    setShowStudyPath(false);
  }

  function chooseTopic(section: GermanSection) {
    stopLiveIfNeeded();
    setSelectedSectionId(section.id);
    setSelectedSubtopicId(section.subtopics[0]?.id || "");
    setWorkMode("study");
    setShowStudyPath(false);
  }

  function chooseSubtopic(subtopic: GermanSubtopic) {
    stopLiveIfNeeded();
    setSelectedSubtopicId(subtopic.id);
    setWorkMode("study");
  }

  async function startGermanLive() {
    stopLiveIfNeeded();
    setLiveTranscript([]);
    await live.startGermanSession({ learnerName, level: selectedLevel, section: selectedSection || null, subtopic: selectedSubtopic || null });
  }

  const showMock = workMode === "mock";

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
              <h1 className="mt-2 text-2xl font-bold md:text-3xl">Pick level → topic → subtopic</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Simple German learning for Goethe exam prep and life in Germany. Start with Study, then Practice, then Exam Prep or Mock.</p>
            </div>
            <button onClick={live.isConnected ? live.stop : startGermanLive} className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${live.isConnected ? "bg-red-600 hover:bg-red-500" : "bg-amber-500 text-slate-950 hover:bg-amber-400"}`}>
              {live.isConnected ? <><StopCircle className="h-4 w-4" /> Stop German Live</> : <><Mic className="h-4 w-4" /> Start German Live</>}
            </button>
          </div>
          {live.error && <p className="mt-3 rounded-xl border border-red-500/30 bg-red-950/70 px-3 py-2 text-xs text-red-100">{live.error}</p>}
        </header>

        {liveTranscript.length > 0 && (
          <section className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5">
            <div className="mb-3 flex items-center gap-2 text-amber-100"><Volume2 className="h-5 w-5" /><h2 className="font-bold">German live transcript</h2></div>
            <div className="space-y-2">{liveTranscript.map((line, index) => <p key={`${line}-${index}`} className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-100">{line}</p>)}</div>
          </section>
        )}

        <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-widest text-slate-400">1. Select level</p>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {germanCurriculum.map((level) => (
              <button key={level.level} onClick={() => chooseLevel(level.level)} className={`rounded-2xl border p-4 text-left transition ${selectedLevel === level.level ? levelStyles[level.level] : "border-white/10 bg-white/5 hover:bg-white/10"}`}>
                <p className="text-xs uppercase tracking-wider text-slate-400">{level.level}</p>
                <h2 className="mt-1 font-bold">{level.title}</h2>
                <p className="mt-2 text-xs leading-5 text-slate-400">{level.subtitle}</p>
                <p className="mt-3 text-[11px] text-slate-500">{getGermanSubtopicCount(level.level)} mapped subtopics</p>
              </button>
            ))}
          </div>
        </section>

        <GermanProgressPanel level={selectedLevel} selectedSubtopicId={selectedSubtopic?.id} />

        <section className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-400">2. Select topic</p>
            <div className="mt-4 space-y-3">
              {plan.sections.map((section) => <TopicCard key={section.id} section={section} selected={section.id === selectedSection?.id} onSelect={() => chooseTopic(section)} />)}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400">3. Select subtopic</p>
                <h2 className="mt-1 text-xl font-bold">{selectedSection?.title}</h2>
              </div>
              <button onClick={() => setShowStudyPath((value) => !value)} className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/15">
                {showStudyPath ? "Hide study path" : "Show study path"}
              </button>
            </div>

            {showStudyPath ? (
              <div className="mt-4"><GermanOrderedPathPanel level={selectedLevel} variant="catalog" /></div>
            ) : (
              <div className="mt-4 space-y-3">
                {selectedSection?.subtopics.map((subtopic) => <SubtopicCard key={subtopic.id} subtopic={subtopic} selected={subtopic.id === selectedSubtopic?.id} onSelect={() => chooseSubtopic(subtopic)} />)}
              </div>
            )}
          </div>
        </section>

        {selectedSubtopic && !showStudyPath && (
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400">4. Choose action</p>
                <h2 className="mt-1 text-xl font-bold">{selectedSubtopic.title}</h2>
              </div>
              <div className="flex flex-wrap rounded-2xl border border-white/10 bg-black/20 p-1 text-xs text-slate-300">
                {(Object.keys(modeLabels) as GermanWorkMode[]).map((mode) => (
                  <button key={mode} onClick={() => setWorkMode(mode)} className={`rounded-xl px-4 py-2 font-semibold ${workMode === mode ? "bg-cyan-500 text-slate-950" : "hover:bg-white/10"}`}>{modeLabels[mode]}</button>
                ))}
              </div>
            </div>

            {workMode === "study" && <StudyPanel level={selectedLevel} subtopic={selectedSubtopic} />}
            {workMode === "practice" && <GermanPracticePanel level={selectedLevel} subtopic={selectedSubtopic} />}
            {workMode === "exam" && (
              <div className="space-y-4">
                {selectedSection?.skill === "hoeren" && <GermanListeningPracticePanel level={selectedLevel} />}
                <GermanWritingReviewPanel level={selectedLevel} />
              </div>
            )}
            {showMock && selectedLevel === "A1" && <GermanA1MiniMockPanel />}
            {showMock && selectedLevel === "A2" && <GermanA2MiniMockPanel />}
            {showMock && selectedLevel === "B1" && <GermanB1MockPanel />}
            {showMock && selectedLevel === "A0" && <p className="rounded-2xl border border-white/10 bg-slate-900 p-4 text-sm text-slate-400">Mock exams start from A1. Use Study and Practice for A0 survival German.</p>}
          </section>
        )}
      </div>
    </div>
  );
}
