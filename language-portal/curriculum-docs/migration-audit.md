# German Curriculum Migration – Audit Report (September 2026)

Branch: `german-migration`. Companion documents: `migration-map.md` (old → new, per topic).

## A. Files reviewed

- **`german-coach/docs/`: 35 of 35 files read in full** (6 top-level planning docs, 9 curriculum, 8 source-bank,
  3 teaching, 8 release, 1 `06-a2-b1-detailed-exam-map.md`) – ≈156 KB.
- **Official sources checked:** Goethe A1 (Start Deutsch 1, edition 02/2024), A2 (Erwachsene) and B1 (Erwachsene)
  Modellsätze downloaded from goethe.de and read for structure/scoring; Goethe A1 pass rule confirmed via Goethe's
  results information.
- **New portal:** all A1 files inventoried (96 chapters + 6 exam pages). Read in full: Volume 1 (6), Volume 3 (17
  non-stub grammar chapters incl. the benchmark), Volume 7 (9), Exam Center (6), plus 2.1–2.3, 4.3–4.5, 4.8,
  6.3, 6.5–6.8, 9.6, 9.7, 9.12, 9.14. Remaining A1 chapters (rest of Vols 2, 4, 5, 6, 8, 9): every exam footer and
  every AI prompt was reviewed, and the text was searched for absolute/legal/price claims, which were then read in
  context. A2: all ~150 files inventoried – **all are title-only stubs**. B1: one empty placeholder.

## B. Migration map

See `migration-map.md` (every old file/topic → new location → action → reason).

## C. New chapters / pages created

Learner-facing:
- `docs/german/course-guide/how-this-course-works.mdx`
- `docs/german/course-guide/learning-path.mdx` (ordered A0→A1 path across volumes + study-by-exam-section table)
- `docs/german/course-guide/a2-b1-roadmap.mdx`
- `docs/german/a1/vol1-foundations/survival-kit.mdx` (1.0, the A0 survival layer)
- Former empty stubs now written: `a1/vol1-foundations/ordinal-numbers.mdx` (1.7 Numbers above 100, Ordinals & Dates),
  `a1/vol3-grammar/perfekt-spoken-past.mdx`, `adjectives-opposites.mdx`, `adverbs-of-time.mdx`, `welch-and-dies.mdx`,
  `non-separable-verbs.mdx`, `a1/vol4-home/taxi-transport.mdx`
- Former empty stubs now written (Parallel Learning Systems): `vocabulary-vault`, `grammar-reference`,
  `redemittel-phrases`, `pronunciation-coach`, `reading-practice`, `listening-practice`, `writing-practice`,
  `speaking-practice`, `ai-roleplay`, `flashcards`, `progress-dashboard` (now "Mistake Log & Repair")
- `a2/vol10-exam/goethe-a2-overview.mdx` (verified exam overview)

Maintainer docs (not published): `curriculum-docs/README.md`, `teaching-methodology.md`,
`chapter-authoring-standard.md`, `exam-source-policy.md`, `level-map-and-roadmap.md`, `migration-map.md`, this file.

## D. Chapters substantially rewritten

- `a1/vol6-work/email-messages.mdx` → "6.8 Short Messages & Emails" (built from the old study-guide template and
  A1 writing checklist; official Teil 2 scoring; five model messages; correct-and-rewrite drills).
- `a1/vol3-grammar/present-tense-verbs.mdx` (goals, s/ß/z rule, A1 vowel-change table, *wissen*, mistakes, production).
- Exam Center: `goethe-schreiben.mdx`, `goethe-sprechen.mdx`, `mock-exams.mdx`, `telc-overview.mdx` (facts corrected,
  scoring replaced), `goethe-hoeren.mdx`, `goethe-lesen.mdx` (item structure, distractor claims).
- AI prompts rewritten for safety: `vol7-health/doctor.mdx`, `pharmacy.mdx`, `body-symptoms.mdx`,
  `official-letters-notices.mdx`; admin prompts fixed in `anmeldung-forms`, `buergeramt-rathaus`, `post-office`,
  `work-schedule-urlaub`.
- Cross-cutting: 87 "Goethe/telc connection" footers rewritten (54) or removed (33); correction-loop instruction added to
  86 AI prompts that lacked a repeat step.

Targeted factual repairs (not full rewrites) in: alphabet-pronunciation, reading-compound-words, greetings,
personal-pronouns, first-sentences, personal-information, family, describing-people, daily-routine, likes-preferences,
hobbies, nouns-gender, plurals, nominative, sein-and-haben, questions, dative, negation, separable-verbs, prepositions,
imperative, basic-past, polite-requests, modal-verbs, hausmeister-neighbors, apartment-search, public-transport,
food-drinks, returns-complaints, payment, kita-school, telephone, office-conversations, doctor, pharmacy, post-office,
bank, phone-internet-services, buergeramt-rathaus, anmeldung-forms, official-letters-notices, speak-slowly, ask-information.

## E. Existing chapters preserved (strong; only accuracy fixes)

Benchmark-level or close: 3.6 modal verbs, 3.9 accusative, 3.7 V2, 3.8 questions, 3.11 negation, 3.12 separable verbs,
3.14 conjunctions, 3.15 imperative, 3.16 war/hatte, 3.17 polite requests, 3.10 dative, 3.13 prepositions, 3.1 nouns,
3.2 plurals, 3.5 sein/haben, 1.1 alphabet, 1.5 numbers & time, 1.3 greetings, 1.4 pronouns, 1.2 compounds,
1.6 introductions, 2.1–2.3, 4.3 apartment problems, 4.5 apartment search, 4.8 public transport, 7.2 doctor,
7.3 pharmacy, 7.8 Anmeldung, 7.9 official letters, 9.14 emergencies.

"Needs refinement" (usable, retained, not rewritten): most scenario chapters in Vols 4–9 (≈5 KB each) – good
vocabulary and Germany context, but practice is mostly 2–5 recognition/translation items and little independent
production; vocabulary tables don't consistently show plurals.

## F. Most valuable knowledge rescued from the old portal

1. The **teaching identity**: teach in English/train in German, per-level language policy, one concept at a time.
2. The **correction loop** and feedback format (Result / Corrected German / Why / Repeat) – now enforced in every AI prompt.
3. The **A0 survival layer** and its "30 sentences with correction" target → Survival Kit.
4. The **ordered learning path** vs exam-section view → learning path page (fixes the portal's topic-volume ordering problem).
5. **Vocabulary with grammar metadata** (article, plural, example, case pattern, common mistake) and the survival-priority rule.
6. **Mistake categories + repair loop** → Mistake Log & Repair.
7. **Study-guide template** (completeness checklist) → authoring standard and the rewritten short-message chapter.
8. **Source policy** (Goethe primary, originality, no copying) + A1/A2/B1 exam maps – re-verified.
9. **A2/B1 blueprints** (grammar sequences, task families, Redemittel) → roadmap docs and pages.

## G. Removed / archived content

- Release/QA/deployment docs (8 files): describe the German Coach **app inside `english-coach/`**, not curriculum.
- Implementation PR roadmaps (PR 1–16, PR 59–69), UI card/progress-widget specs, TypeScript data shapes for a registry
  that the static portal doesn't have (principles kept, shapes dropped).
- Old exam facts that were wrong: "15 points per module" (A1), A2 Hören "3 texts / Teil 4 once".
- Deep bureaucracy survival modules (tax ID/payslips, renting deep-dive, Kündigung/Widerruf, citizenship) – not
  forced into A1; kept on the A2/B1 roadmap as language topics requiring fact-checking before publication.
- 11 empty orphan files in the portal (a1/parallel-systems duplicates, a2/b1 placeholders).

## H. Old portal retirement

All knowledge listed in `migration-map.md` exists in `language-portal/` (curriculum docs + pages). No page in the
portal links to `german-coach/`. **`german-coach/` is deleted in a separate commit** after this report.

**Update:** the German content in `english-coach/` was mined read-only in a follow-up pass – see Part 2 of `migration-map.md` and the addendum below. **Original caveat:** `german-coach/` was only the *planning docs*. The German Coach **application** still lives in
`english-coach/src/components/German*.tsx` (18 components) and `english-coach/src/lib/` (≈1.2 MB of German content:
`a1-book/` 65 lessons, `a1-study-book-notes/`, `a1-pdf-notes/`, topic catalogs A1/A2/B1, practice engine, study
materials) and is imported by `english-coach/src/App.tsx`. That is outside this migration's scope and remains a
**second German source of truth** until it is migrated or removed.

## I. Validation

- `npm run build` (Docusaurus, `onBrokenLinks: 'throw'`): passes after every batch; no warnings in the log.
- New pages use file-based `.mdx` links, which the build resolves and validates.
- `npm run typecheck`: 8 errors, all **pre-existing** in files not touched by this migration
  (`AIPracticeComponent.tsx`, `GlobalAITeacher/index.tsx`, `pages/index.tsx` JSX namespace, `theme/Root.tsx`).
- Sidebar: every sidebar id resolves to a file; every German doc is in the sidebar; no A1 page is a stub any more.
- References to the old portal: only historical mentions inside `curriculum-docs/`.
- Duplicate topics: overlapping pairs remain by design (topic vs communication function): 6.9 Invitations ↔ 9.11 Invite
  / 9.12 Make Plans; 5.9 Returns & Complaints ↔ 9.13 Complaints; 4.7 Directions ↔ 9.2 Give Information.

## J. Remaining weaknesses (honest)

1. **A2 is empty** (~150 title-only pages in the sidebar, now labelled "in development"); **B1 does not exist.**
   The blueprints are ready, the content is not.
2. **German Coach app in `english-coach/`** still holds a large body of German content (see H) that was not audited
   or migrated; some of it (`a1-pdf-notes`, `a1-study-book-notes`) appears derived from third-party material and should
   be checked for copyright before any reuse.
3. Many Volume 4–9 scenario chapters need a refinement pass: more controlled/independent production, plurals in
   vocabulary tables, a written task, and a clearer grammar link. Only ~45 of 96 A1 chapters were read line-by-line.
4. The volume order still isn't a learning order (e.g. Volume 2 uses separable verbs and possessives taught in Volume 3);
   the learning-path page solves this for learners, but chapter numbers still suggest otherwise.
5. `AIPracticeComponent` is a static placeholder (it even renders the hidden prompt in a debug line); the correction
   loop exists only as prompt text until a real backend is wired.
6. Facts that change (Deutschlandticket price, postage, co-payment rules, exam editions) need periodic re-checks;
   they are now phrased as examples or dated.
7. No audio: listening practice relies on transcripts/AI; real recordings would help most for A1 Hören.

---

## Addendum – follow-up pass on `english-coach/` German content

**Reviewed (read-only):** all 29 `english-coach/src/lib/german*.ts` files read in full; `a1-book/` structure and samples
(lessons 1–3, 56–57) read and all 65 titles checked against the portal; `a1-pdf-notes/` and `a1-study-book-notes/`
headings of all batches plus samples read; the 18 `German*.tsx` components inventoried and the mistake-trainer,
mastery-checklist and revision-plan components read. `english-coach/src/server/` contains no German logic.

**Created from it:**
- A2 (previously title-only): `vol2-past/perfekt`, `common-irregular-participles`, `praeteritum-sein-haben-modals`;
  `vol3-grammar/main-clause-connectors`, `subordinate-clauses`, `verb-position-nebensaetze`, `reflexive-verbs`, `adjectives`,
  `comparatives`, `superlatives`, `wechselpraepositionen`, `infinitive-mit-zu`, `polite-requests-wishes`;
  `vol4-home/apartment-search-advanced`, `vol5-shopping/contracts-subscriptions`, `vol6-work/job-advertisements`,
  `vol7-health/doctor-instructions`; `vol10-exam/goethe-writing`, `goethe-speaking`, `error-analysis`.
- B1 (new section, 7 pages): `b1/start-here`, `b1/grammar/purpose-clauses`, `konjunktiv-ii`, `da-wo-compounds`,
  `b1/exam/b1-writing`, `b1-speaking`, `b1-repair-bank`.
- Mistake Log & Repair reconciled with the app's mistake trainer.

**Not migrated and why:** see ARCHIVE rows in Part 2 of `migration-map.md`.

**Status after this pass:**
- **A2:** 21 of about 150 pages are real chapters; the grammar spine and exam writing/speaking are usable. Still stubs:
  most topic chapters in Vols 1, 4–9 and the exam pages for reading, listening, telc and mocks.
- **B1:** a usable starter set. Still missing: passive/Zustandspassiv, relative clauses, lassen, n-declension, genitive
  prepositions, noun-verb combinations, Lesen/Hören pages, life topics.
- The english-coach content alone could not fill A2/B1: its A2/B1 material is outline-level (catalog entries, 10–12 repair
  items, 4-task mocks). The chapters were authored for this portal, using that material as a checklist.
