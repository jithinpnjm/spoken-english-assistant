import { useState } from "react";
import { Ear, PenLine, BookOpen, Mic, ClipboardCheck } from "lucide-react";
import type { GermanLevel } from "../lib/germanCurriculumRegistry";
import { getA1SourceLessonsForSkill } from "../lib/germanA1SourceLessons";
import GermanListeningPracticePanel from "./GermanListeningPracticePanel";
import GermanWritingReviewPanel from "./GermanWritingReviewPanel";
import GermanA1MiniMockPanel from "./GermanA1MiniMockPanel";
import GermanA2MiniMockPanel from "./GermanA2MiniMockPanel";
import GermanB1MockPanel from "./GermanB1MockPanel";

type ExamSection = "hoeren" | "lesen" | "schreiben" | "sprechen" | "mock";

interface GermanExamPrepPanelProps {
  level: GermanLevel;
  learnerName: string;
  isLiveActive: boolean;
  onStartSpeakingPractice: (context: string) => void;
  onStopLive: () => void;
  onJumpToLesson?: (lessonNo: number) => void;
}

const SECTION_META: Record<ExamSection, { icon: any; label: string; labelDe: string; color: string; what: string; tip: string }> = {
  hoeren: {
    icon: Ear,
    label: "Listening",
    labelDe: "Hören",
    color: "sky",
    what: "You hear short dialogues or announcements. Pick the right answer or fill in a key detail (time, name, number, place).",
    tip: "Don't try to understand every word. Listen for the ONE key detail the question asks for.",
  },
  lesen: {
    icon: BookOpen,
    label: "Reading",
    labelDe: "Lesen",
    color: "emerald",
    what: "Read signs, notices, short messages, or a short text. Match information or answer true/false questions.",
    tip: "Skim for the key word in the question first, then scan the text to find it. Don't read word by word.",
  },
  schreiben: {
    icon: PenLine,
    label: "Writing",
    labelDe: "Schreiben",
    color: "violet",
    what: "Fill in a form with personal details, or write a short message (invitation, reply, complaint) in 3–5 sentences.",
    tip: "Short correct German beats long incorrect German. Use model sentences from your study lessons.",
  },
  sprechen: {
    icon: Mic,
    label: "Speaking",
    labelDe: "Sprechen",
    color: "amber",
    what: "Introduce yourself, ask a question about a given topic, and react to a partner's question. Pronunciation matters.",
    tip: "Prepare 3–4 sentences about yourself. If you don't know a word, use a simpler one — don't go silent.",
  },
  mock: {
    icon: ClipboardCheck,
    label: "Mock Exam",
    labelDe: "Probeprüfung",
    color: "rose",
    what: "A mini practice run covering all 4 exam sections under exam-like conditions.",
    tip: "Do the full mock without stopping. Time yourself. Review your mistakes afterwards.",
  },
};

const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  sky: { border: "border-sky-400/30", bg: "bg-sky-500/10", text: "text-sky-200", badge: "bg-sky-500/20 text-sky-100 border-sky-400/20" },
  emerald: { border: "border-emerald-400/30", bg: "bg-emerald-500/10", text: "text-emerald-200", badge: "bg-emerald-500/20 text-emerald-100 border-emerald-400/20" },
  violet: { border: "border-violet-400/30", bg: "bg-violet-500/10", text: "text-violet-200", badge: "bg-violet-500/20 text-violet-100 border-violet-400/20" },
  amber: { border: "border-amber-400/30", bg: "bg-amber-500/10", text: "text-amber-200", badge: "bg-amber-500/20 text-amber-100 border-amber-400/20" },
  rose: { border: "border-rose-400/30", bg: "bg-rose-500/10", text: "text-rose-200", badge: "bg-rose-500/20 text-rose-100 border-rose-400/20" },
};

function buildSpeakingContext(learnerName: string, level: GermanLevel): string {
  return `You are running a Goethe ${level} Sprechen (Speaking) exam practice session for ${learnerName}.

EXAM FORMAT — SPRECHEN has 3 parts:
1. Introduce yourself: name, where you're from, what you do, family, hobbies, language level.
2. You are given a topic card (e.g. "Sport", "Essen", "Familie") — say 3–4 sentences about it.
3. Ask your partner (the examiner) one question related to their topic.

HOW TO RUN THIS SESSION:
- First, ask the learner to introduce themselves in German. Correct every mistake clearly.
- Then give them a topic (start with "Schule / Arbeit") — ask for 3 sentences.
- Then ask them to form a question for you about your topic.
- Keep corrections firm but supportive. At this level, accuracy matters.`;
}

export default function GermanExamPrepPanel({ level, learnerName, isLiveActive, onStartSpeakingPractice, onStopLive, onJumpToLesson }: GermanExamPrepPanelProps) {
  const [active, setActive] = useState<ExamSection>("hoeren");
  const meta = SECTION_META[active];
  const c = colorMap[meta.color];

  const relatedLessons = level === "A1"
    ? getA1SourceLessonsForSkill(active === "mock" ? "" : active, 8)
    : [];

  return (
    <div className="space-y-5">

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.entries(SECTION_META) as [ExamSection, typeof SECTION_META[ExamSection]][]).map(([key, s]) => {
          const Icon = s.icon;
          const cl = colorMap[s.color];
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? `${cl.border} ${cl.bg} ${cl.text}`
                  : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              <Icon className="h-4 w-4" />
              {s.labelDe}
              <span className="text-xs opacity-70">({s.label})</span>
            </button>
          );
        })}
      </div>

      {/* Section info */}
      <div className={`rounded-3xl border ${c.border} ${c.bg} p-5`}>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
          <div className="flex-1">
            <p className={`text-xs uppercase tracking-widest ${c.text}`}>{meta.labelDe} — {meta.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{meta.what}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 md:w-64 shrink-0">
            <p className="text-xs uppercase tracking-widest text-yellow-300 mb-1">Exam tip</p>
            <p className="text-sm leading-relaxed text-slate-200">{meta.tip}</p>
          </div>
        </div>
      </div>

      {/* Related study lessons (for A1) */}
      {relatedLessons.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">
            Study guides relevant to {meta.labelDe}
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedLessons.map((lesson) => (
              <button
                key={lesson.lessonNo}
                onClick={() => onJumpToLesson?.(lesson.lessonNo)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors ${c.badge} border hover:opacity-80`}
              >
                #{lesson.lessonNo} {lesson.titleEn}
              </button>
            ))}
          </div>
          {onJumpToLesson && (
            <p className="mt-2 text-[11px] text-slate-500">Click any guide to open it in Study mode.</p>
          )}
        </div>
      )}

      {/* Practice panel */}
      {active === "hoeren" && <GermanListeningPracticePanel level={level} />}

      {active === "lesen" && (
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5">
          <p className="text-xs uppercase tracking-widest text-emerald-200 mb-3">Reading practice strategy</p>
          <div className="space-y-3">
            {[
              { step: "1", title: "Read the question first", body: "Know exactly what detail you're looking for before you read the text." },
              { step: "2", title: "Scan for key words", body: "Find the German equivalent of the key noun or number in the question, then read just that sentence." },
              { step: "3", title: "Check your answer", body: "Re-read the question and your chosen answer. Does it match exactly? Avoid answers that are 'almost' right." },
              { step: "4", title: "Common Goethe A1 text types", body: "Shop signs, timetables, notices, short messages, email replies, advertisements." },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-white/10 bg-black/20 p-4 flex gap-4">
                <span className="shrink-0 rounded-full bg-emerald-500/30 text-emerald-200 font-bold text-sm h-7 w-7 flex items-center justify-center">{item.step}</span>
                <div>
                  <p className="font-semibold text-slate-100 text-sm">{item.title}</p>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">Use the Study Guides for lessons on signs, forms, messages (e.g. Lessons 51, 60, 61).</p>
        </div>
      )}

      {active === "schreiben" && <GermanWritingReviewPanel level={level} />}

      {active === "sprechen" && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-300 mb-2">Practice with Sky — Sprechen</p>
                <p className="text-sm text-slate-300 leading-relaxed">Sky will run a structured Sprechen session: self-introduction → topic sentences → asking a question. All corrections in real time.</p>
              </div>
              <button
                onClick={isLiveActive ? onStopLive : () => onStartSpeakingPractice(buildSpeakingContext(learnerName, level))}
                className={`shrink-0 flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-colors ${
                  isLiveActive
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-amber-500 hover:bg-amber-400 text-slate-950"
                }`}
              >
                <Mic className="h-4 w-4" />
                {isLiveActive ? "Stop" : "Start Sprechen with Sky"}
              </button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                { label: "Part 1", title: "Sich vorstellen", body: "Name, Herkunft, Beruf, Familie, Hobbys" },
                { label: "Part 2", title: "Thema beschreiben", body: "3–4 Sätze über ein Thema (z.B. Sport, Essen)" },
                { label: "Part 3", title: "Frage stellen", body: "Eine Frage an den Prüfer/die Prüferin" },
              ].map((p) => (
                <div key={p.label} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                  <p className="text-[11px] text-amber-300 uppercase tracking-wider">{p.label}</p>
                  <p className="font-semibold text-slate-100 text-sm mt-1">{p.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{p.body}</p>
                </div>
              ))}
            </div>
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
