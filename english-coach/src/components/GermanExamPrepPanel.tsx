import { useState } from "react";
import { Ear, PenLine, BookOpen, Mic, ClipboardCheck } from "lucide-react";
import type { GermanLevel } from "../lib/germanCurriculumRegistry";
import { findRelatedA1BookLessons } from "../lib/a1-book/germanA1BookLessons";
import { getGermanExamPrepMaterial, type GermanExamSection } from "../lib/germanExamPrepMaterials";
import { germanA1ExamRubrics, getWeakTopicMappingsForSection } from "../lib/germanExamScoring";
import GermanListeningPracticePanel from "./GermanListeningPracticePanel";
import GermanWritingReviewPanel from "./GermanWritingReviewPanel";
import GermanA1MiniMockPanel from "./GermanA1MiniMockPanel";
import GermanA2MiniMockPanel from "./GermanA2MiniMockPanel";
import GermanB1MockPanel from "./GermanB1MockPanel";

interface GermanExamPrepPanelProps {
  level: GermanLevel;
  learnerName: string;
  isLiveActive: boolean;
  onStartSpeakingPractice: (context: string) => void;
  onStopLive: () => void;
  onJumpToLesson?: (lessonNo: number) => void;
}

const SECTION_META: Record<GermanExamSection, { icon: any; label: string; labelDe: string; color: string }> = {
  hoeren: { icon: Ear, label: "Listening", labelDe: "Hören", color: "sky" },
  lesen: { icon: BookOpen, label: "Reading", labelDe: "Lesen", color: "emerald" },
  schreiben: { icon: PenLine, label: "Writing", labelDe: "Schreiben", color: "violet" },
  sprechen: { icon: Mic, label: "Speaking", labelDe: "Sprechen", color: "amber" },
  mock: { icon: ClipboardCheck, label: "Mock Exam", labelDe: "Probeprüfung", color: "rose" },
};

const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  sky: { border: "border-sky-400/30", bg: "bg-sky-500/10", text: "text-sky-200", badge: "bg-sky-500/20 text-sky-100 border-sky-400/20" },
  emerald: { border: "border-emerald-400/30", bg: "bg-emerald-500/10", text: "text-emerald-200", badge: "bg-emerald-500/20 text-emerald-100 border-emerald-400/20" },
  violet: { border: "border-violet-400/30", bg: "bg-violet-500/10", text: "text-violet-200", badge: "bg-violet-500/20 text-violet-100 border-violet-400/20" },
  amber: { border: "border-amber-400/30", bg: "bg-amber-500/10", text: "text-amber-200", badge: "bg-amber-500/20 text-amber-100 border-amber-400/20" },
  rose: { border: "border-rose-400/30", bg: "bg-rose-500/10", text: "text-rose-200", badge: "bg-rose-500/20 text-rose-100 border-rose-400/20" },
};

function buildSpeakingContext(learnerName: string, level: GermanLevel): string {
  return `You are running a Goethe ${level} Sprechen exam practice session for ${learnerName}.

Run the session strictly in exam-prep mode:
1. Ask the learner to introduce themselves in German.
2. Correct grammar, pronunciation, article, verb position, and word choice.
3. Give one A1 topic card and ask for 3 short sentences.
4. Ask the learner to form one question for the examiner.
5. Use simple German prompts and brief English explanation only when needed.
6. End with a score-style review: fluency, grammar, vocabulary, pronunciation, and next lesson to revise.`;
}

function queryForSection(section: GermanExamSection): string {
  if (section === "hoeren") return "numbers time appointments phone prices listening";
  if (section === "lesen") return "forms signs letters post bank train ticket reading";
  if (section === "schreiben") return "letter writing invitation hotel reservation form filling appointment";
  if (section === "sprechen") return "introducing yourself questions family restaurant directions speaking";
  return "Goethe exam A1 listening reading writing speaking";
}

export default function GermanExamPrepPanel({ level, learnerName, isLiveActive, onStartSpeakingPractice, onStopLive, onJumpToLesson }: GermanExamPrepPanelProps) {
  const [active, setActive] = useState<GermanExamSection>("hoeren");
  const meta = SECTION_META[active];
  const material = getGermanExamPrepMaterial(level, active);
  const rubric = germanA1ExamRubrics[active];
  const weakTopics = getWeakTopicMappingsForSection(active);
  const c = colorMap[meta.color];

  const relatedLessons = level === "A1" ? findRelatedA1BookLessons(queryForSection(active), 10) : [];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(Object.entries(SECTION_META) as [GermanExamSection, typeof SECTION_META[GermanExamSection]][]).map(([key, s]) => {
          const Icon = s.icon;
          const cl = colorMap[s.color];
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                isActive ? `${cl.border} ${cl.bg} ${cl.text}` : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              <Icon className="h-4 w-4" />
              {s.labelDe}
              <span className="text-xs opacity-70">({s.label})</span>
            </button>
          );
        })}
      </div>

      <div className={`rounded-3xl border ${c.border} ${c.bg} p-5`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="flex-1">
            <p className={`text-xs uppercase tracking-widest ${c.text}`}>{meta.labelDe} — {meta.label}</p>
            <h2 className="mt-2 text-xl font-bold text-slate-100">Goethe {level} exam preparation</h2>
            <ul className="mt-3 space-y-2">
              {material.examFormat.map((item, i) => (
                <li key={i} className="text-sm leading-relaxed text-slate-300">• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 lg:w-80 shrink-0">
            <p className="text-xs uppercase tracking-widest text-yellow-300 mb-2">Exam strategy</p>
            <ul className="space-y-2">
              {material.strategy.map((item, i) => (
                <li key={i} className="text-sm leading-relaxed text-slate-200">{i + 1}. {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {relatedLessons.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Full-book lessons relevant to {meta.labelDe}</p>
          <div className="flex flex-wrap gap-2">
            {relatedLessons.map((lesson) => (
              <button
                key={lesson.lessonNo}
                onClick={() => onJumpToLesson?.(lesson.lessonNo)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors ${c.badge} hover:opacity-80`}
              >
                #{lesson.lessonNo} {lesson.titleEn}
              </button>
            ))}
          </div>
          {onJumpToLesson && <p className="mt-2 text-[11px] text-slate-500">Click any lesson to open the exact full-book chapter in Study mode.</p>}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Redemittel to memorize</p>
          <div className="space-y-2">
            {material.redemittel.map((item, i) => (
              <p key={i} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-100">{item}</p>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Exam-style tasks</p>
          <div className="grid gap-3 md:grid-cols-2">
            {material.tasks.map((task) => (
              <div key={task.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="font-semibold text-slate-100">{task.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{task.instruction}</p>
                <p className="mt-3 rounded-xl bg-white/5 p-3 text-sm text-slate-200">{task.sample}</p>
                <p className="mt-2 text-xs text-emerald-200">Hint: {task.answerHint}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Goethe-style scoring rubric</p>
            <h3 className="mt-1 text-lg font-bold text-slate-100">{rubric.totalPoints} points — what Sky should evaluate</h3>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-slate-400">{rubric.passGuidance}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {rubric.criteria.map((criterion) => (
            <div key={criterion.name} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-100">{criterion.name}</p>
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-bold text-emerald-200">{criterion.maxPoints} pts</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{criterion.whatGoodLooksLike}</p>
              <p className="mt-3 text-xs uppercase tracking-widest text-red-200">Common losses</p>
              <ul className="mt-1 space-y-1">
                {criterion.commonLosses.map((loss) => (
                  <li key={loss} className="text-xs text-red-100">• {loss}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-5">
        <p className="text-xs uppercase tracking-widest text-cyan-200 mb-3">Weak-topic revision map</p>
        <div className="grid gap-3 md:grid-cols-2">
          {weakTopics.map((topic) => (
            <div key={topic.issue} className="rounded-2xl border border-cyan-400/20 bg-black/20 p-4">
              <p className="font-semibold text-slate-100">{topic.issue}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{topic.correctionStrategy}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {topic.reviseLessons.map((lessonNo) => (
                  <button key={lessonNo} onClick={() => onJumpToLesson?.(lessonNo)} className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-100 hover:bg-cyan-500/20">
                    Lesson {lessonNo}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-red-400/20 bg-red-500/10 p-5">
        <p className="text-xs uppercase tracking-widest text-red-200 mb-3">Mistake checklist before the exam</p>
        <div className="grid gap-2 md:grid-cols-3">
          {material.mistakeChecklist.map((item, i) => (
            <div key={i} className="rounded-xl border border-red-400/20 bg-black/20 p-3 text-sm text-red-100">{item}</div>
          ))}
        </div>
      </section>

      {active === "hoeren" && <GermanListeningPracticePanel level={level} />}
      {active === "schreiben" && <GermanWritingReviewPanel level={level} />}

      {active === "sprechen" && (
        <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-300 mb-2">Live Sprechen practice</p>
              <p className="text-sm text-slate-300 leading-relaxed">Sky will run a structured Goethe speaking practice: self-introduction, topic card, question formation, correction, and score-style feedback.</p>
            </div>
            <button
              onClick={isLiveActive ? onStopLive : () => onStartSpeakingPractice(buildSpeakingContext(learnerName, level))}
              className={`shrink-0 flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-colors ${isLiveActive ? "bg-red-600 hover:bg-red-500 text-white" : "bg-amber-500 hover:bg-amber-400 text-slate-950"}`}
            >
              <Mic className="h-4 w-4" />
              {isLiveActive ? "Stop" : "Start Sprechen with Sky"}
            </button>
          </div>
        </div>
      )}

      {active === "mock" && (
        <div>
          {level === "A1" && <GermanA1MiniMockPanel />}
          {level === "A2" && <GermanA2MiniMockPanel />}
          {level === "B1" && <GermanB1MockPanel />}
          {level === "A0" && (
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 text-center text-sm text-slate-400">
              Mock exams start from A1. Complete A0 Study and Practice first, then move to A1.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
