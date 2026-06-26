import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CheckCircle2, Layers, Mic, Search, StopCircle } from "lucide-react";
import { germanA1BookLessons } from "../lib/a1-book/germanA1BookLessons";
import type { GermanA1BookLesson } from "../lib/germanA1BookLessonTypes";
import type { GermanLevel } from "../lib/germanCurriculumRegistry";
import GermanLessonPracticePanel from "./GermanLessonPracticePanel";
import GermanMistakeTrainerPanel from "./GermanMistakeTrainerPanel";
import GermanLessonMasteryChecklist from "./GermanLessonMasteryChecklist";
import GermanLessonRevisionPlan from "./GermanLessonRevisionPlan";

interface GermanStudyGuidePanelProps {
  level: GermanLevel;
  learnerName: string;
  isLiveActive: boolean;
  onPracticeWithSky: (context: string) => void;
  onStopLive: () => void;
  initialLessonNo?: number;
  onLessonViewed?: () => void;
}

type StudyTab = "learn" | "speak" | "practice";

interface A1CourseModule {
  id: string;
  phase: string;
  title: string;
  subtitle: string;
  lessonRange: [number, number];
}

const a1CourseModules: A1CourseModule[] = [
  { id: "first-contact", phase: "Start", title: "First contact", subtitle: "greetings, politeness, yes/no responses", lessonRange: [1, 2] },
  { id: "sounds-numbers", phase: "Start", title: "Sounds, spelling and numbers", subtitle: "1-100, spelling names, alphabet sounds", lessonRange: [3, 5] },
  { id: "personal-details", phase: "Start", title: "About me", subtitle: "name, age, hobby, country, short answers", lessonRange: [6, 8] },
  { id: "sentence-engine", phase: "Build", title: "Sentence engine", subtitle: "word order, pronouns, sein/haben, core verbs", lessonRange: [9, 15] },
  { id: "describe-world", phase: "Build", title: "People, places and things", subtitle: "large numbers, jobs, city places, articles", lessonRange: [16, 21] },
  { id: "time-family", phase: "Build", title: "Time, dates and family", subtitle: "clock time, days, months, family ownership", lessonRange: [22, 25] },
  { id: "objects-questions", phase: "Use", title: "Objects, questions and food", subtitle: "accusative, möchten, W-questions, restaurant", lessonRange: [26, 30] },
  { id: "dative-location", phase: "Use", title: "Dative and location", subtitle: "dative pronouns, places, dates, duration", lessonRange: [31, 36] },
  { id: "movement-directions", phase: "Use", title: "Movement and directions", subtitle: "routine, separable verbs, commands, directions", lessonRange: [37, 40] },
  { id: "past-health", phase: "Use", title: "Past, body and health", subtitle: "war/hatte, Perfekt, body parts, symptoms", lessonRange: [41, 46] },
  { id: "daily-tasks", phase: "Life", title: "Daily tasks", subtitle: "vacation, supermarket, weather, appointments", lessonRange: [47, 50] },
  { id: "writing-shopping", phase: "Life", title: "Writing and shopping", subtitle: "invitation, likes, welcher/dieser, clothes", lessonRange: [51, 55] },
  { id: "travel-care", phase: "Life", title: "Travel, phone and care", subtitle: "taxi, time adverbs, phone calls, doctor", lessonRange: [56, 59] },
  { id: "paperwork", phase: "Life", title: "Forms and services", subtitle: "hotel, registration, post office, bank", lessonRange: [60, 63] },
  { id: "housing-train", phase: "Life", title: "Housing and trains", subtitle: "apartment search and train tickets", lessonRange: [64, 65] },
];

function tabsForLesson(lessonNo: number): Array<{ id: StudyTab; label: string }> {
  const speakLabel = lessonNo <= 5 ? "Listen & repeat" : lessonNo <= 8 ? "Answer aloud" : "Speak";
  return [
    { id: "learn", label: "Learn" },
    { id: "speak", label: speakLabel },
    { id: "practice", label: "Practice" },
  ];
}

function moduleForLesson(lessonNo: number): A1CourseModule {
  return a1CourseModules.find((item) => lessonNo >= item.lessonRange[0] && lessonNo <= item.lessonRange[1]) || a1CourseModules[0];
}

function lessonsForModule(module: A1CourseModule): GermanA1BookLesson[] {
  return germanA1BookLessons.filter((lesson) => lesson.lessonNo >= module.lessonRange[0] && lesson.lessonNo <= module.lessonRange[1]);
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
    lesson.commonMistakes.map((item) => `${item.wrong} ${item.right} ${item.explanation}`).join(" "),
  ].join(" ");
}

function buildLessonContext(lesson: GermanA1BookLesson, learnerName: string): string {
  const foundationOrder = lesson.lessonNo <= 5
    ? `Teaching order:
1. Do not teach sentence grammar yet.
2. Teach pronunciation, meaning, and when to use each phrase.
3. Ask the learner to repeat short chunks.
4. Correct pronunciation and article/greeting form only.
5. End with one tiny role-play.`
    : lesson.lessonNo <= 8
      ? `Teaching order:
1. Keep answers short and formulaic.
2. Drill question -> answer patterns.
3. Correct pronunciation and word choice.
4. Avoid explaining full sentence grammar unless needed.`
      : `Teaching order:
1. Explain the meaning.
2. Teach the sentence pattern.
3. Drill two model sentences.
4. Correct grammar immediately.
5. Ask the learner to produce one short German sentence.`;

  return `You are teaching ${learnerName} Lesson ${lesson.lessonNo}: "${lesson.titleEn}" (${lesson.titleDe}).

LESSON GOAL:
${lesson.lessonGoal}

LESSON FOCUS:
${lesson.theRule.map((item) => `- ${item}`).join("\n")}

KEY VOCABULARY:
${lesson.vocabulary.slice(0, 10).map((item) => `- ${item.de} = ${item.en}`).join("\n")}

MODEL SENTENCES:
${lesson.modelSentences.slice(0, 4).map((item) => `- ${item.de} (${item.en})`).join("\n")}

COMMON MISTAKES:
${lesson.commonMistakes.map((item) => `- ${item.wrong} -> ${item.right}: ${item.explanation}`).join("\n")}

${foundationOrder}`;
}

function SmallSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-100">{title}</h3>
      {children}
    </section>
  );
}

export default function GermanStudyGuidePanel({ level, learnerName, isLiveActive, onPracticeWithSky, onStopLive, initialLessonNo, onLessonViewed }: GermanStudyGuidePanelProps) {
  const [selectedNo, setSelectedNo] = useState<number>(initialLessonNo ?? 1);
  const [activeModuleId, setActiveModuleId] = useState(moduleForLesson(initialLessonNo ?? 1).id);
  const [activeTab, setActiveTab] = useState<StudyTab>("learn");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (initialLessonNo && initialLessonNo !== selectedNo) {
      setSelectedNo(initialLessonNo);
      setActiveModuleId(moduleForLesson(initialLessonNo).id);
      setActiveTab("learn");
      onLessonViewed?.();
    }
  }, [initialLessonNo]);

  const selected = germanA1BookLessons.find((lesson) => lesson.lessonNo === selectedNo) ?? germanA1BookLessons[0];
  const selectedModule = moduleForLesson(selected.lessonNo);
  const activeModule = a1CourseModules.find((item) => item.id === activeModuleId) || selectedModule;
  const selectedSearchText = buildLessonSearchText(selected);

  const visibleLessons = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (term) {
      return germanA1BookLessons.filter((lesson) =>
        lesson.titleEn.toLowerCase().includes(term) ||
        lesson.titleDe.toLowerCase().includes(term) ||
        String(lesson.lessonNo) === term ||
        lesson.vocabulary.some((item) => item.de.toLowerCase().includes(term) || item.en.toLowerCase().includes(term))
      );
    }
    return lessonsForModule(activeModule);
  }, [activeModule, search]);

  const availableTabs = tabsForLesson(selected.lessonNo);

  useEffect(() => {
    if (!availableTabs.some((tab) => tab.id === activeTab)) setActiveTab("learn");
  }, [availableTabs, activeTab]);

  function chooseLesson(lessonNo: number) {
    setSelectedNo(lessonNo);
    setActiveModuleId(moduleForLesson(lessonNo).id);
    setActiveTab("learn");
  }

  if (level !== "A1") {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-8 text-center">
        <p className="text-sm text-slate-300">The redesigned 65-lesson study book is available for <strong className="text-white">A1</strong>.</p>
        <p className="mt-2 text-xs text-slate-500">Switch to A1 to use the structured study route.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[320px,minmax(0,1fr)]">
      <aside className="space-y-4">
        <section className="rounded-lg border border-slate-800 bg-slate-900/80 p-4">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-amber-300" />
            <h2 className="text-sm font-semibold text-slate-100">A1 topic packs</h2>
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-400">15 beginner packs keep all 65 lessons, grouped by what a new learner should master next.</p>
          <div className="mt-3 max-h-[44vh] space-y-1 overflow-y-auto pr-1">
            {a1CourseModules.map((module) => {
              const isActive = module.id === activeModule.id;
              const isSelectedModule = module.id === selectedModule.id;
              return (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModuleId(module.id);
                    setSearch("");
                  }}
                  className={`w-full rounded-lg border px-3 py-2.5 text-left transition ${
                    isActive ? "border-amber-400 bg-amber-500/10" : "border-slate-800 bg-slate-950 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-100 truncate">{module.title}</p>
                      <p className="mt-0.5 text-[11px] text-slate-500 truncate">
                        <span className="text-amber-400">{module.phase}</span> · L{module.lessonRange[0]}–{module.lessonRange[1]}
                      </p>
                    </div>
                    {isSelectedModule && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900/80 p-4">
          <label className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search lesson or word"
              className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
            />
          </label>
          <div className="mt-3 max-h-[52vh] space-y-2 overflow-y-auto pr-1">
            {visibleLessons.map((lesson) => (
              <button
                key={lesson.lessonNo}
                onClick={() => chooseLesson(lesson.lessonNo)}
                className={`w-full rounded-lg border p-3 text-left transition ${
                  selected.lessonNo === lesson.lessonNo
                    ? "border-sky-400 bg-sky-500/10"
                    : "border-slate-800 bg-slate-950 hover:border-slate-600"
                }`}
              >
                <p className="text-xs text-slate-500">Lesson {lesson.lessonNo}</p>
                <p className="mt-1 text-sm font-semibold text-slate-100">{lesson.titleEn}</p>
                <p className="mt-1 text-xs text-slate-400">{lesson.titleDe}</p>
              </button>
            ))}
            {visibleLessons.length === 0 && <p className="py-5 text-center text-xs text-slate-500">No lessons found.</p>}
          </div>
        </section>
      </aside>

      <main className="min-w-0 space-y-4">
        <section className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                {selectedModule.title} · Lesson {selected.lessonNo} of 65
              </p>
              <h1 className="mt-2 text-2xl font-bold text-white">{selected.titleEn}</h1>
              <p className="mt-1 text-sm text-slate-400">{selected.titleDe}</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{selected.lessonGoal}</p>
            </div>
            <button
              onClick={isLiveActive ? onStopLive : () => onPracticeWithSky(buildLessonContext(selected, learnerName))}
              className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold ${
                isLiveActive ? "bg-red-600 text-white hover:bg-red-500" : "bg-amber-400 text-slate-950 hover:bg-amber-300"
              }`}
            >
              {isLiveActive ? <><StopCircle className="h-4 w-4" /> Stop</> : <><Mic className="h-4 w-4" /> Practice with Sky</>}
            </button>
          </div>
        </section>

        <nav className="flex flex-wrap gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 p-1.5">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === "learn" && (
          <div className="space-y-4">
            <SmallSection title="What to understand first">
              <p className="text-sm leading-6 text-slate-300">{selected.introduction}</p>
            </SmallSection>

            <div className="grid gap-4 lg:grid-cols-2">
              <SmallSection title="Rules">
                <ul className="space-y-2">
                  {selected.theRule.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-6 text-slate-300">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SmallSection>

              <SmallSection title="Vocabulary">
                <div className="grid gap-2">
                  {selected.vocabulary.slice(0, 10).map((word) => (
                    <div key={`${word.de}-${word.en}`} className="rounded-md border border-slate-800 bg-slate-950 p-3">
                      <p className="text-sm font-semibold text-white">{word.de}<span className="font-normal text-slate-500"> = {word.en}</span></p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{word.example}</p>
                    </div>
                  ))}
                </div>
              </SmallSection>
            </div>

            <SmallSection title="Model sentences">
              <div className="grid gap-3 md:grid-cols-2">
                {selected.modelSentences.slice(0, 6).map((item) => (
                  <div key={item.de} className="rounded-md border border-slate-800 bg-slate-950 p-3">
                    <p className="text-sm font-semibold text-white">{item.de}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.en}</p>
                    <p className="mt-2 text-xs leading-5 text-amber-100">{item.breakdown}</p>
                  </div>
                ))}
              </div>
            </SmallSection>

            <div className="grid gap-4 md:grid-cols-2">
              <SmallSection title="Exam relevance">
                <p className="text-sm leading-6 text-slate-300">{selected.examRelevance}</p>
              </SmallSection>
              <SmallSection title="Formula">
                <ul className="space-y-1.5">
                  {selected.formula.map((item, i) => (
                    <li key={i} className="text-sm leading-6 text-slate-300">• {item}</li>
                  ))}
                </ul>
              </SmallSection>
            </div>
          </div>
        )}

        {activeTab === "speak" && (
          <div className="space-y-4">
            <SmallSection title={selected.lessonNo <= 5 ? "Hear it, say it, recognise it" : "Question and answer patterns"}>
              <div className="grid gap-3 md:grid-cols-2">
                {selected.modelSentences.slice(0, 8).map((item) => (
                  <div key={item.de} className="rounded-md border border-slate-800 bg-slate-950 p-3">
                    <p className="text-base font-semibold text-white">{item.de}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.en}</p>
                    <p className="mt-2 text-xs leading-5 text-amber-100">{item.breakdown}</p>
                  </div>
                ))}
              </div>
            </SmallSection>

            <SmallSection title="Beginner drill">
              <div className="grid gap-2 md:grid-cols-3">
                <div className="rounded-md border border-slate-800 bg-slate-950 p-3">
                  <p className="text-xs uppercase tracking-widest text-slate-500">Step 1</p>
                  <p className="mt-1 text-sm text-slate-100">Listen to the phrase once.</p>
                </div>
                <div className="rounded-md border border-slate-800 bg-slate-950 p-3">
                  <p className="text-xs uppercase tracking-widest text-slate-500">Step 2</p>
                  <p className="mt-1 text-sm text-slate-100">Repeat only the German chunk.</p>
                </div>
                <div className="rounded-md border border-slate-800 bg-slate-950 p-3">
                  <p className="text-xs uppercase tracking-widest text-slate-500">Step 3</p>
                  <p className="mt-1 text-sm text-slate-100">Use it in a tiny real-life situation.</p>
                </div>
              </div>
            </SmallSection>
          </div>
        )}

        {activeTab === "practice" && (
          <div className="space-y-4">
            <GermanLessonPracticePanel lesson={selected} />
            <GermanMistakeTrainerPanel lesson={selected} />
            <GermanLessonMasteryChecklist lesson={selected} />
            <GermanLessonRevisionPlan lesson={selected} />
            <SmallSection title="Mistakes to avoid">
              <div className="grid gap-2">
                {selected.commonMistakes.map((item) => (
                  <div key={`${item.wrong}-${item.right}`} className="rounded-md border border-slate-800 bg-slate-950 p-3">
                    <p className="text-sm text-red-100">{item.wrong} <span className="text-slate-500">-&gt;</span> <span className="text-emerald-100">{item.right}</span></p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </SmallSection>
          </div>
        )}

      </main>
    </div>
  );
}
