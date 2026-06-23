# German Coach Implementation Roadmap

## Guiding principle

Build slowly and source-first. Do not code the learning engine until the source bank, curriculum map, and teaching prompt contracts are documented.

## PR 1: Source bank and product architecture

Branch:

```text
german-coach-source-bank
```

Scope:

- create german-coach/docs
- add product vision
- add Goethe source bank
- add source policy
- add A0-A1-A2-B1 level map
- add portal and learning flow
- add implementation roadmap

No existing English coach UI files should be modified.

## PR 2: Detailed curriculum blueprint

Branch:

```text
german-coach-curriculum-blueprint
```

Planned files:

```text
german-coach/docs/curriculum/00-curriculum-index.md
german-coach/docs/curriculum/01-a0-survival-german.md
german-coach/docs/curriculum/02-a1-goethe-start-deutsch-1.md
german-coach/docs/curriculum/03-a2-goethe-bridge.md
german-coach/docs/curriculum/04-b1-goethe-zertifikat.md
german-coach/docs/curriculum/05-grammar-map-a0-b1.md
german-coach/docs/curriculum/06-vocabulary-map-a0-b1.md
```

Exit criteria:

- every level has sections
- every section has topic groups
- grammar and vocabulary are mapped to exam and survival use cases

## PR 3: Study guide and prompt contracts

Branch:

```text
german-coach-teaching-contracts
```

Planned files:

```text
german-coach/docs/teaching/00-study-guide-template.md
german-coach/docs/teaching/01-study-teacher-prompt.md
german-coach/docs/teaching/02-drill-teacher-prompt.md
german-coach/docs/teaching/03-writing-review-prompt.md
german-coach/docs/teaching/04-speaking-live-agent-prompt.md
german-coach/docs/teaching/05-exam-simulation-prompt.md
german-coach/docs/teaching/06-language-policy-by-level.md
```

Exit criteria:

- detailed English-speaking German teacher behavior is defined
- strict correction/rewrite/repeat loop is defined
- no generic chat behavior is allowed

## PR 4: Portal selector

Branch:

```text
portal-selector-english-german
```

Scope:

- after login, show English Coach / German Coach selector
- do this only after the latest local English UI fixes are pushed

Exit criteria:

- learner can select English or German portal
- no German engine required yet

## PR 5: German coach app shell

Branch:

```text
german-coach-shell
```

Scope:

- German dashboard
- current goal: Goethe A1
- long-term path: A1 -> A2 -> B1
- A0 survival option
- skill cards: Hören, Lesen, Schreiben, Sprechen, Wortschatz, Grammatik, Mock Exam, Mistake Repair

Exit criteria:

- German portal is visible and navigable
- no real lesson engine required yet

## PR 6: German curriculum registry

Branch:

```text
german-curriculum-registry
```

Scope:

- typed A0/A1/A2/B1 registry
- levels, sections, modules, subtopics
- Goethe relevance and survival relevance metadata
- validation script

Expected model:

```ts
GermanLevel = "A0" | "A1" | "A2" | "B1";
GermanSkill = "hoeren" | "lesen" | "schreiben" | "sprechen" | "wortschatz" | "grammatik" | "mock_exam";
```

Exit criteria:

- all planned sections and subtopics exist as typed data
- validation script passes

## PR 7: A0/A1 authored content

Branch:

```text
german-a0-a1-authored-content
```

Scope:

- A0 survival lessons
- A1 Goethe-first lessons
- English explanations
- German examples
- common mistakes
- drills
- speaking prompts
- writing prompts
- mini exam tasks

Exit criteria:

- A0/A1 can be used for actual study

## PR 8: Practice and drill engine

Branch:

```text
german-practice-engine
```

Scope:

- fill blank
- sentence building
- translate to German
- answer simple question
- rewrite corrected sentence
- article/gender drill
- case drill
- word order drill

Exit criteria:

- the app asks many questions and reviews answers one by one

## PR 9: Vocabulary bank

Branch:

```text
german-vocabulary-bank
```

Scope:

- German word metadata
- article
- plural
- English meaning
- level
- topic
- exam section
- example sentence
- case pattern
- due review
- mistake count

Exit criteria:

- vocabulary is structured for German grammar and exam use

## PR 10: Writing review engine

Branch:

```text
german-writing-review
```

Scope:

- A1 short message and form filling
- A2 semi-formal email
- B1 email, complaint, request, opinion
- scoring and correction
- rewrite required

Exit criteria:

- learner can write and receive detailed Goethe-style review

## PR 11: Live speaking teacher

Branch:

```text
german-live-speaking-teacher
```

Scope:

- live German teacher asks one question
- learner answers by voice
- system transcribes
- teacher reviews in English
- teacher provides corrected German model
- learner repeats
- mistakes saved

Exit criteria:

- live agent behaves like an English-speaking German teacher, not a generic chat agent

## PR 12: Listening practice engine

Branch:

```text
german-listening-engine
```

Scope:

- generated German audio
- answer before transcript reveal
- review
- vocabulary extraction
- replay and repeat

Exit criteria:

- A1 listening can be practiced properly

## PR 13: Goethe A1 mini mock exam

Branch:

```text
german-a1-mock-exam
```

Scope:

- Hören
- Lesen
- Schreiben
- Sprechen
- section score
- overall readiness report
- next 7-day study plan

Exit criteria:

- A1 readiness can be measured

## PR 14: A2 content and practice

Branch:

```text
german-a2-content
```

Scope:

- A2 curriculum content
- A2 grammar
- A2 listening/reading/writing/speaking drills
- A2 mini mock exam

## PR 15: B1 Goethe content and exam engine

Branch:

```text
german-b1-goethe-content
```

Scope:

- B1 Lesen
- B1 Hören
- B1 Schreiben
- B1 Sprechen
- B1 full mock exam
- weakness repair

## PR 16: Progress analytics and study planner

Branch:

```text
german-progress-analytics
```

Scope:

- time per level
- time per skill
- completion percentage
- mistake types
- vocabulary mastered
- writing score trend
- speaking score trend
- mock exam history
- recommended next lesson

## Build order

Recommended sequence:

1. PR 1 source bank and product architecture
2. PR 2 curriculum blueprint
3. PR 3 study guide and prompt contracts
4. PR 4 portal selector
5. PR 5 German coach shell
6. PR 6 curriculum registry
7. PR 7 A0/A1 authored content
8. PR 8 practice engine
9. PR 9 vocabulary bank
10. PR 10 writing review
11. PR 11 live speaking
12. PR 12 listening
13. PR 13 A1 mock exam
14. PR 14 A2
15. PR 15 B1
16. PR 16 analytics

## Non-negotiable implementation rules

- Goethe source alignment first.
- A1 is first active exam target.
- B1 remains in the long-term path.
- Do not copy official or textbook exercises.
- Teach in English; train in German.
- Every answer gets reviewed.
- Mistakes must become future drills.
- German coach must help daily life in Germany, not only exam scoring.
