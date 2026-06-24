import { useEffect, useMemo, useState } from "react";
import { Mic, StopCircle } from "lucide-react";
import { germanA1BookLessons } from "../lib/a1-book/germanA1BookLessons";
import type { GermanA1BookLesson } from "../lib/germanA1BookLessonTypes";
import type { GermanLevel } from "../lib/germanCurriculumRegistry";

interface GermanStudyGuidePanelProps {
  level: GermanLevel;
  learnerName: string;
  isLiveActive: boolean;
  onPracticeWithSky: (context: string) => void;
  onStopLive: () => void;
  initialLessonNo?: number;
  onLessonViewed?: () => void;
}

function buildLessonContext(lesson: GermanA1BookLesson, learnerName: string): string {
  return `You are teaching ${learnerName} Lesson ${lesson.lessonNo}: "${lesson.titleEn}" (${lesson.titleDe}).

LESSON FOCUS:
${lesson.theRule.map((item) => `- ${item}`).join("\n")}

KEY VOCABULARY: ${lesson.vocabulary.slice(0, 10).map((item) => `${item.de} = ${item.en}`).join(", ")}

EXAM RELEVANCE: ${lesson.examRelevance}

MODEL SENTENCES:
${lesson.modelSentences.slice(0, 4).map((item) => `- ${item.de} (${item.en})`).join("\n")}

COMMON MISTAKES TO WATCH FOR: ${lesson.commonMistakes.map((item) => `${item.wrong} -> ${item.right}`).join("; ")}

Start by greeting the learner and giving a 1–2 sentence overview of this lesson. Then ask them to try using one of the key vocabulary words in a sentence. Correct all errors immediately and clearly.`;
}

export default function GermanStudyGuidePanel({ level, learnerName, isLiveActive, onPracticeWithSky, onStopLive, initialLessonNo, onLessonViewed }: GermanStudyGuidePanelProps) {
  const [selectedNo, setSelectedNo] = useState<number>(initialLessonNo ?? 1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (initialLessonNo && initialLessonNo !== selectedNo) {
      setSelectedNo(initialLessonNo);
      onLessonViewed?.();
    }
  }, [initialLessonNo]);

  const filtered = useMemo(() => {
    const t = search.toLowerCase().trim();
    if (!t) return germanA1BookLessons;
    return germanA1BookLessons.filter(
      (l) =>
        l.titleEn.toLowerCase().includes(t) ||
        l.titleDe.toLowerCase().includes(t) ||
        l.vocabulary.some((item) => item.de.toLowerCase().includes(t) || item.en.toLowerCase().includes(t)) ||
        String(l.lessonNo) === t
    );
  }, [search]);

  const selected = germanA1BookLessons.find((l) => l.lessonNo === selectedNo) ?? germanA1BookLessons[0];

  if (level !== "A1") {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-slate-400 text-sm">Numbered study guides (1–65) are for <strong className="text-white">A1</strong>.</p>
        <p className="mt-2 text-slate-500 text-xs">A2 and B1 structured guides are coming soon. Switch to A1 to start.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[260px,1fr]">

      {/* Lesson list */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-slate-400">65 Study Guides · A1</p>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by number or title…"
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs text-slate-100 outline-none placeholder:text-slate-500"
        />
        <div className="flex-1 overflow-y-auto max-h-[65vh] space-y-1 pr-1">
          {filtered.map((lesson) => (
            <button
              key={lesson.lessonNo}
              onClick={() => setSelectedNo(lesson.lessonNo)}
              className={`w-full rounded-xl border px-3 py-2 text-left transition-colors ${
                selectedNo === lesson.lessonNo
                  ? "border-amber-400/60 bg-amber-500/20 text-amber-100"
                  : "border-transparent text-slate-300 hover:bg-white/10 hover:text-slate-100"
              }`}
            >
              <span className="inline-block w-7 text-xs text-slate-500">#{lesson.lessonNo}</span>
              <span className="text-sm">{lesson.titleEn}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-xs text-slate-500 py-6">No lessons match your search.</p>
          )}
        </div>
      </div>

      {/* Lesson detail */}
      {selected && (
        <div className="space-y-4">

          {/* Header */}
          <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-300">Lesson {selected.lessonNo} of 65 · A1</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-100">{selected.titleEn}</h2>
                <p className="text-sm text-slate-400 mt-0.5">{selected.titleDe}</p>
              </div>
              <button
                onClick={isLiveActive ? onStopLive : () => onPracticeWithSky(buildLessonContext(selected, learnerName))}
                className={`shrink-0 flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-colors ${
                  isLiveActive
                    ? "bg-red-600 hover:bg-red-500 text-white"
                    : "bg-amber-500 hover:bg-amber-400 text-slate-950"
                }`}
              >
                {isLiveActive ? <><StopCircle className="h-4 w-4" /> Stop</> : <><Mic className="h-4 w-4" /> Practice with Sky</>}
              </button>
            </div>
          </div>

          {/* Content grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
              <p className="text-xs uppercase tracking-widest text-cyan-200 mb-3">Core content</p>
              <ul className="space-y-2">
                {selected.theRule.map((item, i) => (
                  <li key={i} className="text-sm text-slate-300 leading-relaxed flex gap-2">
                    <span className="shrink-0 text-cyan-400">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
              <p className="text-xs uppercase tracking-widest text-emerald-200 mb-3">Goethe vocabulary</p>
              <div className="space-y-2">
                {selected.vocabulary.slice(0, 10).map((word, i) => (
                  <div key={`${word.de}-${i}`} className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
                    <span className="font-semibold">{word.de}</span>
                    <span className="text-emerald-200/70"> = {word.en}</span>
                    <p className="mt-1 text-slate-300">{word.example}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
            <p className="text-xs uppercase tracking-widest text-amber-200 mb-3">Model sentences</p>
            <div className="grid gap-3 md:grid-cols-2">
              {selected.modelSentences.slice(0, 6).map((item, i) => (
                <div key={`${item.de}-${i}`} className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-sm font-semibold text-slate-100">{item.de}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.en}</p>
                  <p className="mt-2 text-xs leading-5 text-amber-100">{item.breakdown}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
              <p className="text-xs uppercase tracking-widest text-violet-200 mb-2">Exam relevance</p>
              <p className="text-sm leading-relaxed text-slate-300">{selected.examRelevance}</p>
            </div>

            <div className="rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4">
              <p className="text-xs uppercase tracking-widest text-sky-200 mb-2">Formula</p>
              <ul className="space-y-1.5">
                {selected.formula.map((item, i) => (
                  <li key={i} className="text-sm text-slate-300 leading-relaxed">• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
              <p className="text-xs uppercase tracking-widest text-red-200 mb-2">Common mistakes</p>
              <ul className="space-y-1.5">
                {selected.commonMistakes.map((item, i) => (
                  <li key={i} className="text-sm text-red-100 leading-relaxed">• {item.wrong} → {item.right}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
