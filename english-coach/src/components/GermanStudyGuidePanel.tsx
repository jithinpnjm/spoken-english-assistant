import { useEffect, useMemo, useState } from "react";
import { Mic, StopCircle } from "lucide-react";
import { germanA1BookLessons } from "../lib/a1-book/germanA1BookLessons";
import { buildPdfStudyNoteQueryForLesson, findRelatedPdfStudyNotes } from "../lib/a1-pdf-notes/germanA1PdfStudyNotes";
import type { GermanA1BookLesson } from "../lib/germanA1BookLessonTypes";
import type { GermanLevel } from "../lib/germanCurriculumRegistry";
import { getVerbConjugationsForLesson } from "../lib/germanVerbConjugations";
import { getArticleTransformationsForLesson, getSentencePatternsForLesson } from "../lib/germanSentenceMechanics";
import GermanLessonPracticePanel from "./GermanLessonPracticePanel";
import GermanMistakeTrainerPanel from "./GermanMistakeTrainerPanel";

interface GermanStudyGuidePanelProps {
  level: GermanLevel;
  learnerName: string;
  isLiveActive: boolean;
  onPracticeWithSky: (context: string) => void;
  onStopLive: () => void;
  initialLessonNo?: number;
  onLessonViewed?: () => void;
}

function buildLessonSearchText(lesson: GermanA1BookLesson): string {
  return [
    lesson.titleEn,
    lesson.titleDe,
    lesson.introduction,
    lesson.theRule.join(" "),
    lesson.formula.join(" "),
    lesson.vocabulary.map((item) => `${item.de} ${item.en} ${item.example}`).join(" "),
    lesson.modelSentences.map((item) => `${item.de} ${item.en} ${item.breakdown}`).join(" "),
    lesson.commonMistakes.map((item) => `${item.wrong} ${item.right} ${item.explanation}`).join(" ")
  ].join(" ");
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

Teaching order:
1. Explain the sentence-building pattern: subject/person -> conjugated verb -> object/time/place.
2. If the lesson contains a verb, show how the infinitive transforms into ich/du/er/wir/ihr/sie forms before asking the learner to make a sentence.
3. If articles or cases appear, explain nominative -> accusative -> dative transformation with one concrete noun.
4. Run controlled drills before free speaking.
5. Use the mistake trainer to correct common errors before final speaking.
6. Only then ask the learner to build one short sentence.

Start by greeting the learner and giving a 1–2 sentence overview of this lesson. Then teach the mechanics before asking for production. Correct all errors immediately and clearly.`;
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
  const selectedSearchText = selected ? buildLessonSearchText(selected) : "";
  const relatedPdfNotes = useMemo(() => {
    if (!selected) return [];
    return findRelatedPdfStudyNotes(buildPdfStudyNoteQueryForLesson(selected), 4);
  }, [selected]);
  const verbConjugations = selected ? getVerbConjugationsForLesson(selectedSearchText, 3) : [];
  const sentencePatterns = selected ? getSentencePatternsForLesson(selectedSearchText) : [];
  const articleTransformations = selected ? getArticleTransformationsForLesson(selectedSearchText) : [];

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
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-slate-400">65 Study Guides · A1</p>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by number or title…" className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs text-slate-100 outline-none placeholder:text-slate-500" />
        <div className="flex-1 overflow-y-auto max-h-[65vh] space-y-1 pr-1">
          {filtered.map((lesson) => (
            <button key={lesson.lessonNo} onClick={() => setSelectedNo(lesson.lessonNo)} className={`w-full rounded-xl border px-3 py-2 text-left transition-colors ${selectedNo === lesson.lessonNo ? "border-amber-400/60 bg-amber-500/20 text-amber-100" : "border-transparent text-slate-300 hover:bg-white/10 hover:text-slate-100"}`}>
              <span className="inline-block w-7 text-xs text-slate-500">#{lesson.lessonNo}</span>
              <span className="text-sm">{lesson.titleEn}</span>
            </button>
          ))}
          {filtered.length === 0 && <p className="text-center text-xs text-slate-500 py-6">No lessons match your search.</p>}
        </div>
      </div>

      {selected && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-300">Lesson {selected.lessonNo} of 65 · A1</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-100">{selected.titleEn}</h2>
                <p className="text-sm text-slate-400 mt-0.5">{selected.titleDe}</p>
              </div>
              <button onClick={isLiveActive ? onStopLive : () => onPracticeWithSky(buildLessonContext(selected, learnerName))} className={`shrink-0 flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-colors ${isLiveActive ? "bg-red-600 hover:bg-red-500 text-white" : "bg-amber-500 hover:bg-amber-400 text-slate-950"}`}>
                {isLiveActive ? <><StopCircle className="h-4 w-4" /> Stop</> : <><Mic className="h-4 w-4" /> Practice with Sky</>}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4">
            <p className="text-xs uppercase tracking-widest text-indigo-200 mb-3">Teacher sentence-building path</p>
            <div className="grid gap-3 md:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs uppercase tracking-widest text-slate-400">1. Meaning</p><p className="mt-1 text-sm text-slate-100">What do I want to say?</p></div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs uppercase tracking-widest text-slate-400">2. Person + verb</p><p className="mt-1 text-sm text-slate-100">ich + trinken → ich trinke</p></div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs uppercase tracking-widest text-slate-400">3. Article/case</p><p className="mt-1 text-sm text-slate-100">ein Termin → einen Termin</p></div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-xs uppercase tracking-widest text-slate-400">4. Full sentence</p><p className="mt-1 text-sm text-slate-100">Ich habe einen Termin.</p></div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">This is the production path: choose the person, transform the verb, choose the article/case, then add object, time, place, or reason.</p>
          </div>

          {sentencePatterns.length > 0 && (
            <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
              <p className="text-xs uppercase tracking-widest text-blue-200 mb-3">Sentence patterns / Satzmuster</p>
              <div className="space-y-3">
                {sentencePatterns.map((pattern) => (
                  <details key={pattern.id} className="rounded-2xl border border-white/10 bg-black/20 p-4" open={pattern.id === "statement-v2"}>
                    <summary className="cursor-pointer font-bold text-slate-100">{pattern.title}</summary>
                    <p className="mt-3 rounded-xl bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-100">{pattern.formula}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{pattern.teacherNote}</p>
                    <div className="mt-3 grid gap-2 md:grid-cols-3">{pattern.examples.map((example) => <div key={example.de} className="rounded-xl border border-blue-400/10 bg-blue-500/10 p-3"><p className="text-sm font-semibold text-white">{example.de}</p><p className="mt-1 text-xs text-slate-400">{example.en}</p><p className="mt-2 text-xs leading-relaxed text-blue-100">{example.breakdown}</p></div>)}</div>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4"><p className="text-xs uppercase tracking-widest text-cyan-200 mb-3">Core content</p><ul className="space-y-2">{selected.theRule.map((item, i) => <li key={i} className="text-sm text-slate-300 leading-relaxed flex gap-2"><span className="shrink-0 text-cyan-400">•</span>{item}</li>)}</ul></div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4"><p className="text-xs uppercase tracking-widest text-emerald-200 mb-3">Goethe vocabulary</p><div className="space-y-2">{selected.vocabulary.slice(0, 10).map((word, i) => <div key={`${word.de}-${i}`} className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100"><span className="font-semibold">{word.de}</span><span className="text-emerald-200/70"> = {word.en}</span><p className="mt-1 text-slate-300">{word.example}</p></div>)}</div></div>
          </div>

          {verbConjugations.length > 0 && <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 p-4"><p className="text-xs uppercase tracking-widest text-fuchsia-200 mb-3">Verb transformation / Konjugation</p><div className="space-y-4">{verbConjugations.map((verb) => <details key={verb.infinitive} className="rounded-2xl border border-white/10 bg-black/20 p-4" open={verb.infinitive === "trinken" || verb.infinitive === "haben" || verb.infinitive === "sein"}><summary className="cursor-pointer text-lg font-bold text-slate-100">{verb.infinitive}<span className="ml-2 text-sm font-normal text-slate-400">{verb.meaning}</span></summary><div className="mt-3 grid gap-2 md:grid-cols-3">{verb.forms.map((form) => <div key={`${verb.infinitive}-${form.pronoun}`} className="rounded-xl border border-fuchsia-400/10 bg-fuchsia-500/10 p-3"><p className="text-xs uppercase tracking-wider text-fuchsia-200">{form.pronoun}</p><p className="mt-1 text-base font-bold text-white">{form.form}</p><p className="mt-1 text-xs leading-relaxed text-slate-300">{form.example}</p></div>)}</div><ul className="mt-3 space-y-1">{verb.notes.map((note) => <li key={note} className="text-xs leading-relaxed text-fuchsia-100">• {note}</li>)}</ul></details>)}</div></div>}

          {articleTransformations.length > 0 && <div className="rounded-2xl border border-orange-400/20 bg-orange-500/10 p-4"><p className="text-xs uppercase tracking-widest text-orange-200 mb-3">Article + case transformation</p><div className="space-y-4">{articleTransformations.map((item) => <details key={item.noun} className="rounded-2xl border border-white/10 bg-black/20 p-4" open><summary className="cursor-pointer text-lg font-bold text-slate-100">{item.noun}<span className="ml-2 text-sm font-normal text-slate-400">{item.gender}</span></summary><div className="mt-3 grid gap-2 md:grid-cols-3"><div className="rounded-xl border border-orange-400/10 bg-orange-500/10 p-3"><p className="text-xs uppercase tracking-wider text-orange-200">Nominativ</p><p className="mt-1 text-sm font-bold text-white">{item.nominative}</p></div><div className="rounded-xl border border-orange-400/10 bg-orange-500/10 p-3"><p className="text-xs uppercase tracking-wider text-orange-200">Akkusativ</p><p className="mt-1 text-sm font-bold text-white">{item.accusative}</p></div><div className="rounded-xl border border-orange-400/10 bg-orange-500/10 p-3"><p className="text-xs uppercase tracking-wider text-orange-200">Dativ</p><p className="mt-1 text-sm font-bold text-white">{item.dative}</p></div></div><div className="mt-3 grid gap-2 md:grid-cols-3">{item.examples.map((example) => <div key={example.de} className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-sm font-semibold text-white">{example.de}</p><p className="mt-1 text-xs text-slate-400">{example.en}</p><p className="mt-2 text-xs leading-relaxed text-orange-100">{example.why}</p></div>)}</div></details>)}</div></div>}

          <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4"><p className="text-xs uppercase tracking-widest text-amber-200 mb-3">Model sentences</p><div className="grid gap-3 md:grid-cols-2">{selected.modelSentences.slice(0, 6).map((item, i) => <div key={`${item.de}-${i}`} className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-sm font-semibold text-slate-100">{item.de}</p><p className="mt-1 text-xs text-slate-400">{item.en}</p><p className="mt-2 text-xs leading-5 text-amber-100">{item.breakdown}</p></div>)}</div></div>

          <GermanLessonPracticePanel lesson={selected} />
          <GermanMistakeTrainerPanel lesson={selected} />

          {relatedPdfNotes.length > 0 && <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Related PDF notes</p><div className="space-y-2">{relatedPdfNotes.map((note) => <details key={`${note.batch}-${note.page}`} className="rounded-xl border border-white/10 bg-black/20 p-3"><summary className="cursor-pointer text-sm font-semibold text-slate-100">{note.heading}<span className="ml-2 text-xs font-normal text-slate-500">{note.batch}, page {note.page} · {note.sourcePages}</span></summary><p className="mt-3 whitespace-pre-wrap text-xs leading-5 text-slate-300">{note.text}</p></details>)}</div></div>}

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4"><p className="text-xs uppercase tracking-widest text-violet-200 mb-2">Exam relevance</p><p className="text-sm leading-relaxed text-slate-300">{selected.examRelevance}</p></div>
            <div className="rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4"><p className="text-xs uppercase tracking-widest text-sky-200 mb-2">Formula</p><ul className="space-y-1.5">{selected.formula.map((item, i) => <li key={i} className="text-sm text-slate-300 leading-relaxed">• {item}</li>)}</ul></div>
            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4"><p className="text-xs uppercase tracking-widest text-red-200 mb-2">Common mistakes</p><ul className="space-y-1.5">{selected.commonMistakes.map((item, i) => <li key={i} className="text-sm text-red-100 leading-relaxed">• {item.wrong} → {item.right}</li>)}</ul></div>
          </div>
        </div>
      )}
    </div>
  );
}
