# Migration Map: `german-coach/docs/` → `language-portal`

Historical record of the migration that retired the planning folder `german-coach/docs/` (35 Markdown files,
~156 KB). All 35 files were read in full. Paths below are relative to `language-portal/`.

Actions: **KEEP** (knowledge preserved, possibly enriched) · **MERGE** · **REWRITE** · **EXPAND** · **SPLIT** ·
**CREATE** · **COVERED** (already present in the portal at equal/better quality) · **ARCHIVE** (intentionally not migrated).

## Top-level planning documents

| Old file / topic | New location | Action | Reason |
| :--- | :--- | :--- | :--- |
| 00-product-vision: learner profile, "teach in English, train in German", 10 non-negotiables, level language policy | `curriculum-docs/teaching-methodology.md` §1–2; `docs/german/course-guide/how-this-course-works.mdx` | MERGE | Core identity of the course; now written once for maintainers and once for learners. |
| 00-product-vision: product modes (Study, Drill, Listening, Reading, Writing, Speaking, Vocabulary Bank, Mock Exam, Mistake Repair) | Parallel Learning Systems pages (`docs/german/parallel-systems/*`) + `how-this-course-works.mdx` | MERGE | The portal's "Parallel Learning Systems" sidebar is the natural home for these modes. |
| 00-product-vision: login/portal selector, "PR 1 is docs-only" | — | ARCHIVE | App-routing plans for `english-coach`; not curriculum knowledge. |
| 01-source-bank: source priority, mandatory Goethe sources, textbooks as inspiration only, source-gate | `curriculum-docs/exam-source-policy.md` §1–2, §4 | MERGE | Source hierarchy and originality rule retained verbatim in spirit. |
| 02-goethe-exam-source-policy: what Goethe controls vs what the app controls, copyright rule, source record format | `curriculum-docs/exam-source-policy.md` §1–2; `chapter-authoring-standard.md` §7 | MERGE | Same policy; TypeScript source-record shape simplified to a traceability rule because the portal has no registry. |
| 02: "course must not begin with random grammar chapters" (level → section → task → grammar …) | `curriculum-docs/level-map-and-roadmap.md` §1, §3 (exam section → grammar support) | KEEP | Preserved as the second navigation view, balanced with the ordered path. |
| 03-a0-a1-a2-b1-level-map: A0 sections, A1 section subtopics, A2/B1 sections | `level-map-and-roadmap.md` §2–6; `course-guide/learning-path.mdx` | MERGE | Level map is now tied to real portal chapters. |
| 04-portal-and-learning-flow: lesson loop, live-teacher loop, task types, writing/listening flows, progress model | `teaching-methodology.md` §4–7; `parallel-systems/writing-practice.mdx`, `speaking-practice.mdx`, `listening-practice.mdx`, `reading-practice.mdx` | MERGE | Methodology kept; UI-card specifics (completion %, due dates) archived because the portal is static docs. |
| 05-implementation-roadmap: PR 1–16 plan | — (principles kept in `curriculum-docs/README.md`) | ARCHIVE | Plan for the `english-coach` app; its rules ("every answer reviewed", "mistakes become drills", "A2/B1 not placeholders") are kept as principles. |
| 06-a2-b1-detailed-exam-map: A2/B1 task families, grammar/vocab per section, practice flows, repair categories | `level-map-and-roadmap.md` §5–6; `exam-source-policy.md` §3; `docs/german/course-guide/a2-b1-roadmap.mdx` | MERGE + REWRITE | Task families kept; exam facts re-verified against the official Modellsätze (several corrections, see below). |

## curriculum/

| Old file / topic | New location | Action | Reason |
| :--- | :--- | :--- | :--- |
| 00-curriculum-index: level→section→subtopic model, practice types, review loop | `teaching-methodology.md` §4–7 | MERGE | |
| 01-a0-survival-german: greetings, introductions, **repair phrases**, numbers/time, supermarket/bakery, doctor/pharmacy, transport, **Kita basics**, sounds, "30 survival sentences" target | **`docs/german/a1/vol1-foundations/survival-kit.mdx` (new)**; existing 1.1, 1.3, 1.5, 1.6, 9.6, 9.7 | CREATE + COVERED | The portal had the pieces spread over Volumes 1, 4–9 but no first-weeks survival lesson. The new chapter delivers the A0 target (30 sentences, with correction) and points onward. |
| 02-a1-goethe-start-deutsch-1: Hören/Lesen/Schreiben/Sprechen task families, grammar, writing checklist, example correction | Exam Center 10.1–10.6 (corrected); `a1/vol6-work/email-messages.mdx` (rewritten); `teaching-methodology.md` §5 | MERGE + REWRITE | Writing checklist and "Ich habe ein Termin" correction became the backbone of the rewritten short-message chapter. |
| 03-a2-goethe-bridge | `level-map-and-roadmap.md` §5; `course-guide/a2-b1-roadmap.mdx` | MERGE | A2 pages in the portal are stubs; the blueprint is kept so A2 can be built without the old folder. |
| 04-b1-goethe-zertifikat (incl. Teil 1–3 patterns) | `level-map-and-roadmap.md` §6; `course-guide/a2-b1-roadmap.mdx`; `parallel-systems/redemittel-phrases.mdx` | MERGE | B1 not built; blueprint + Redemittel preserved. |
| 05-grammar-map-a0-b1 + mistake categories + repair strategy | `level-map-and-roadmap.md` §3, §5–6; `parallel-systems/grammar-reference.mdx`; `parallel-systems/progress-dashboard.mdx` (Mistake Log & Repair) | MERGE | Grammar map now points to real chapters. |
| 06-vocabulary-map-a0-b1: vocabulary record shape, groups per level, review views, drill types, survival-priority rule | `chapter-authoring-standard.md` §4; `parallel-systems/vocabulary-vault.mdx`; `parallel-systems/flashcards.mdx` | MERGE | Metadata standard (article, plural, example, case pattern, common mistake) applied to new chapters. |
| 07-exam-section-to-grammar-map | `level-map-and-roadmap.md` §3; `parallel-systems/grammar-reference.mdx` | MERGE | |
| 08-topic-sequencing-plan: ordered path view vs exam-section view; A0/A1/A2/B1 ordered lists | **`docs/german/course-guide/learning-path.mdx` (new)**; `level-map-and-roadmap.md` §1, §7 | CREATE | Solves a real progression problem: the portal's volumes are topic-based (e.g. Volume 2 uses separable verbs and possessives before Volume 3 teaches them). |

## source-bank/

| Old file / topic | New location | Action | Reason |
| :--- | :--- | :--- | :--- |
| a1-modellsatz-analysis | `exam-source-policy.md` §3 (A1); Exam Center pages | REWRITE | Re-verified against the official A1 Modellsatz (02/2024 edition): part contents, heard once/twice, 30-word message scoring (3-3-3-1). |
| a2-modellsatz-analysis | `exam-source-policy.md` §3 (A2) | REWRITE | Verified. |
| b1-modellsatz-analysis | `exam-source-policy.md` §3 (B1) | REWRITE | Verified (module times, parts, word counts, per-module pass mark). |
| goethe-a1-a2-b1-source-map | `exam-source-policy.md` §1, §4 | MERGE | |
| claude-a1-enrichment-package: 65-lesson order, survival modules S1–S5, official word groups, common-mistake drills | `learning-path.mdx`; `level-map-and-roadmap.md` §4, §7; survival content in Volumes 4/7; `progress-dashboard.mdx` | MERGE | **Correction:** the package's "15 points per module" for Goethe A1 is wrong – official is 100 points (75 written/25 oral), pass at 60. Deep bureaucracy modules (tax ID/Finanzamt payslips, renting deep-dive, Kündigung) are A2+ and kept on the A2 roadmap, not forced into A1. |
| claude-a2-enrichment-package | `exam-source-policy.md` §3 (A2); `level-map-and-roadmap.md` §5 | MERGE | **Corrections:** Hören Teil 1 has five texts (not three); Teil 4 is heard twice. |
| claude-b1-enrichment-package: modular exam, Redemittel, citizenship context | `exam-source-policy.md` §3 (B1); `redemittel-phrases.mdx`; `level-map-and-roadmap.md` §6 | MERGE | Citizenship/residence claims kept only as "verify before publishing". |
| learn-german-original-topic-map | `learning-path.mdx`; `level-map-and-roadmap.md` §7 | MERGE | Used for sequencing only; no third-party content copied. Basic vocabulary category list informed the Vocabulary Vault groups. |

## teaching/

| Old file / topic | New location | Action | Reason |
| :--- | :--- | :--- | :--- |
| 00-study-guide-template (14-part structure + appointment-cancellation example) | `chapter-authoring-standard.md` §1–2; example realised in `a1/vol6-work/email-messages.mdx` | MERGE | Used as a completeness guide, not a rigid template. |
| 01-live-teacher-and-review-contract (language policy, speaking loop, correction format, drill/writing/listening/exam contracts, forbidden behaviour, persona) | `teaching-methodology.md` §2, §5, §8; `parallel-systems/ai-roleplay.mdx`; `speaking-practice.mdx` | MERGE | Also applied to the AI practice prompts that were rewritten. |
| 02-answer-feedback-guide (labels, checks, feedback shape) | `teaching-methodology.md` §5; `course-guide/how-this-course-works.mdx` | MERGE | |

## release/

| Old file | New location | Action | Reason |
| :--- | :--- | :--- | :--- |
| german-coach-v1-qa-plan, manual-production-cutover, production-smoke-test, readiness-matrix, post-v1-roadmap, state-and-recommendation-wiring, ui-wiring-note, real-progress | — | ARCHIVE | QA/deployment notes for the German Coach **app inside `english-coach/`** (voice bridge, local storage, mock panels). Not curriculum knowledge. One principle kept: "legal/citizenship/residency content must be verified with current official sources" → `teaching-methodology.md` §8. |

## Corrections of old material (do not reintroduce)

- Goethe A1 scoring: 100 points (75 written + 25 oral), pass ≥ 60 – not "15 points per module".
- Goethe A2 Hören: Teil 1 = five texts heard twice; Teil 4 radio interview heard twice.
- Goethe A1 Sprechen Teil 3 = requests (Bitten), not "planning together" (planning is A2 T3 / B1 T1).
- Tax ID, renting deep-dive, Kündigung/Widerruf: A2+ language topics, never legal advice.


---

# Part 2: German content inside `english-coach/` (read-only mining)

The German Coach **app** lives in `english-coach/src/components/German*.tsx` (18 components) and
`english-coach/src/lib/` (about 1.2 MB). It was mined read-only; `english-coach/` itself was not modified (another owner
retires it). No server-side German logic exists (`english-coach/src/server/` is English-only; the German live prompt is
built client-side in `germanLiveTeacherContext.ts`).

| Source in english-coach | New location | Action | Reason |
| :--- | :--- | :--- | :--- |
| `germanA2TopicCatalog.ts` (24 A2 topics: core content, exam relevance, common mistakes) | A2 Vol 2/3 chapters (Perfekt, participles, Präteritum, connectors, weil/dass/wenn, connector families/obwohl/als/ob, reflexive, adjective endings, comparatives, superlatives, Wechselpräpositionen, zu-infinitive, Konjunktiv II) | REWRITE / CREATE | The catalog is an outline (one line per field); used as topic checklist and source of per-topic common mistakes. Full chapters written. |
| `germanA2RepairTasks.ts` (10 repair tasks) | `docs/german/a2/vol10-exam/error-analysis.mdx` | MIGRATE + EXPAND | All 10 kept (rewritten), 3 added (Perfekt auxiliary, als/wenn, reflexive), each linked to its chapter. |
| `germanA2FrameworkSurvival.ts` survival modules (Bewerbung, health advanced, contracts) | A2 `vol6-work/job-advertisements.mdx`, `vol7-health/doctor-instructions.mdx`, `vol5-shopping/contracts-subscriptions.mdx` | CREATE | Real-life gaps; written as language practice with legal/medical caveats. |
| `germanA2FrameworkSurvival.ts` exam framework | — (see `exam-source-policy.md`) | ARCHIVE | **Contains errors**: Hören Teil 1 "3 texts" (official: 5), Teil 4 "heard once" (official: twice), invented Sprechen point split (4/8/8/5). |
| `germanA2FrameworkSurvival.ts` word groups (Berufe, Familienstand, Schulfächer, Feiertage, Maße) | A1/A2 vocabulary chapters | COVERED | |
| `germanA1MiniMock.ts`, `germanA2MiniMock.ts`, `germanB1MockExam.ts` | Task ideas reused in A2/B1 exam AI prompts | ARCHIVE (logic) | 4 tasks each, scored by keyword matching – not a meaningful mock. |
| `germanB1TopicCatalog.ts` (18 B1 topics) | `docs/german/b1/` grammar chapters (purpose clauses, Konjunktiv II, da-/wo-compounds) + roadmap + B1 Repair Bank | CREATE (partial) | Remaining topics (reflexive part 2, noun-verb combinations, lassen, n-declension, genitive prepositions, indem, brauchen zu, Zustandspassiv) are on the roadmap; several appear in the repair bank. |
| `germanB1FrameworkRedemittel.ts` (exam framework, Redemittel, exam-day tips) | `b1/start-here.mdx`, `b1/exam/b1-speaking.mdx`, `b1/exam/b1-writing.mdx`, `parallel-systems/redemittel-phrases.mdx` | MERGE | Framework matches the official Modellsatz; Redemittel merged. |
| `germanB1RepairTasks.ts` (12 tasks) | `docs/german/b1/exam/b1-repair-bank.mdx` | MIGRATE | Rewritten; genitive-preposition item added. |
| `germanWritingReview.ts` (prompts + keyword scoring) | A1 6.8, A2 10.4, B1 writing pages | ARCHIVE (logic) | Prompts covered; rule-based scoring weaker than the AI review loop. |
| `germanExamScoring.ts` (A1 rubrics, weak-topic mapping) | — | ARCHIVE | Rubric points are invented (e.g. Schreiben 20, Sprechen 20) and conflict with official scoring; weak-topic mapping already in A1 10.6. |
| `germanExamPrepMaterials.ts`, `germanListeningPractice.ts`, `germanStudyMaterials.ts`, `germanSentenceMechanics.ts`, `germanVerbConjugations.ts`, `germanVocabularyBank.ts`, `germanSurvivalAndWordGroups.ts`, `germanA1TopicCatalog.ts`, `germanA1SourceLessons.ts`, `germanCurriculumRegistry.ts`, `germanOrderedPath.ts`, `germanPracticeEngine.ts` | A1 chapters, Exam Center, Parallel Systems, learning path | COVERED | All A1-level; the portal has equal or deeper content. Useful extras (Übergabeprotokoll, Hausarzt/Facharzt, brutto/netto, Steuer-ID) went into the new A2 chapters. |
| `germanProgressTracker.ts`, `germanRepairPracticeAdapter.ts`, `GermanMistakeTrainerPanel.tsx`, `GermanLessonMasteryChecklist.tsx`, `GermanLessonRevisionPlan.tsx` | `parallel-systems/progress-dashboard.mdx` (Mistake Log & Repair) | MERGE | Added mistake types *connector* and *task completion*, the wrong-first technique, the 5-point mastery check and the same-day/1/3/7-day revision plan. |
| `germanLiveTeacherContext.ts` | `teaching-methodology.md` §2, §8 | COVERED | Same per-level policy and teaching loop. |
| `germanLocalLearningState.ts`, `germanStudyRecommendations.ts`, other UI components | — | ARCHIVE | App state/UI; the portal is static docs. |
| `a1-book/` (65 AI-written A1 lessons: rules, vocabulary, exercises, common mistakes, letter samples) | — | COVERED / ARCHIVE | A1 only; all 65 topics covered by portal Vols 1–10 (spot-checked). Contains some doubtful claims (e.g. taxis "almost exclusively cream-coloured", "tipping ~10% is standard"). |
| `a1-pdf-notes/`, `a1-study-book-notes/` (transcriptions of a private person's handwritten A1 class notes, incl. names and home towns) | — | ARCHIVE | Third-party personal data and derivative of class material; all topics A1 and covered. Used only as a coverage checklist. |
