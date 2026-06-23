# Sky English Coach Curriculum Skeleton

This is a review artifact for the next curriculum engine iteration. It defines the course/module/subsection map before authoring full teaching content.

Principles:

- Static, version-controlled authored curriculum.
- Backend-owned lesson cursor points to course -> module -> subsection -> phase.
- Gemini teaches only the active subsection content supplied by the backend.
- No copied book content; explanations/examples will be original and learner-specific.
- Full content should be authored first for the pilot module: `b4-past-tense`.

Default phases for every subsection:

```text
intro -> model -> controlled_practice -> correction -> repeat -> free_practice -> summary
```

---

## Course 1: Grammar Foundations — Beginner Track

Course ID: `beginner-spoken-english-track`
Level: `beginner`

### Module `b1-sentence-foundations` — Sentence Foundations

1. `b1-sentence-foundations-be-verbs` — Be verbs: am/is/are
2. `b1-sentence-foundations-subject-pronouns` — Subject pronouns: I/you/he/she/it/we/they
3. `b1-sentence-foundations-simple-sentences` — Simple complete sentences
4. `b1-sentence-foundations-yes-no-questions` — Basic yes/no questions

### Module `b2-present-simple` — Present Simple

1. `b2-present-simple-daily-routines` — Daily routines
2. `b2-present-simple-third-person-s` — He/she/it + verb-s
3. `b2-present-simple-negatives` — Do not / does not
4. `b2-present-simple-frequency-adverbs` — Always, usually, sometimes, never

### Module `b3-present-continuous` — Present Continuous

1. `b3-present-continuous-now-actions` — Actions happening now
2. `b3-present-continuous-temporary-actions` — Temporary actions
3. `b3-present-continuous-questions` — Present continuous questions
4. `b3-present-continuous-present-simple-vs-continuous` — Present simple vs present continuous

### Module `b4-past-tense` — Past Tense Pilot Module

1. `b4-past-tense-was-were` — Was/were for past states
2. `b4-past-tense-regular-verbs` — Simple past regular verbs
3. `b4-past-tense-irregular-verbs` — Common irregular verbs
4. `b4-past-tense-past-negative` — Did not + base verb
5. `b4-past-tense-past-questions` — Did questions
6. `b4-past-tense-time-expressions` — Yesterday, last week, ago
7. `b4-past-tense-work-and-travel` — Past tense for work/travel stories
8. `b4-past-tense-yesterday-story` — Short yesterday story
9. `b4-past-tense-correction-lab` — Fix common past-tense mistakes
10. `b4-past-tense-speaking-checkpoint` — Past-tense speaking checkpoint

### Module `b5-articles-nouns` — Articles and Nouns

1. `b5-articles-nouns-a-an` — A/an
2. `b5-articles-nouns-the-specific` — The for specific nouns
3. `b5-articles-nouns-countable-uncountable` — Countable and uncountable nouns
4. `b5-articles-nouns-plural-nouns` — Plural nouns

### Module `b6-prepositions` — Basic Prepositions

1. `b6-prepositions-time-in-on-at` — Time: in/on/at
2. `b6-prepositions-place-in-on-at` — Place: in/on/at
3. `b6-prepositions-to-from-for` — To/from/for
4. `b6-prepositions-common-mistakes` — Common preposition mistakes

### Module `b7-real-life-speaking` — Real-life Speaking

1. `b7-real-life-speaking-ordering-food` — Ordering food
2. `b7-real-life-speaking-shopping` — Shopping
3. `b7-real-life-speaking-directions` — Asking for directions
4. `b7-real-life-speaking-appointments` — Appointments

### Module `b8-fluency-basics` — Fluency Basics

1. `b8-fluency-basics-linking-ideas` — Linking ideas with and/but/because
2. `b8-fluency-basics-short-story` — Short personal story
3. `b8-fluency-basics-describe-picture` — Describe a picture
4. `b8-fluency-basics-simple-opinion` — Give a simple opinion

---

## Course 2: Confident Speaking — Intermediate Track

Course ID: `intermediate-spoken-english-track`
Level: `intermediate`

### Module `i1-tense-control` — Tense Control

1. `i1-tense-control-past-simple-review` — Past simple review
2. `i1-tense-control-present-perfect-experience` — Present perfect for experience
3. `i1-tense-control-present-perfect-vs-past` — Present perfect vs past simple
4. `i1-tense-control-future-plans` — Future plans: going to / planning to
5. `i1-tense-control-future-predictions` — Future predictions: will / might

### Module `i2-sentence-expansion` — Sentence Expansion

1. `i2-sentence-expansion-because-so-but` — Because, so, but
2. `i2-sentence-expansion-relative-clauses` — Who/which/that clauses
3. `i2-sentence-expansion-although-however` — Although and however
4. `i2-sentence-expansion-compound-sentences` — Longer natural sentences

### Module `i3-articles-determiners` — Articles and Determiners

1. `i3-articles-determiners-specific-vs-general` — Specific vs general nouns
2. `i3-articles-determiners-zero-article` — Zero article
3. `i3-articles-determiners-this-that-these-those` — This/that/these/those
4. `i3-articles-determiners-quantifiers` — Some, any, much, many, a few

### Module `i4-preposition-patterns` — Preposition Patterns

1. `i4-preposition-patterns-work-prepositions` — Work prepositions
2. `i4-preposition-patterns-travel-prepositions` — Travel prepositions
3. `i4-preposition-patterns-verb-preposition-patterns` — Verb + preposition patterns
4. `i4-preposition-patterns-adjective-preposition-patterns` — Adjective + preposition patterns

### Module `i5-workplace-english` — Workplace English

1. `i5-workplace-english-standup-update` — Daily standup update
2. `i5-workplace-english-blockers` — Explaining blockers
3. `i5-workplace-english-status-report` — Status report
4. `i5-workplace-english-asking-clarification` — Asking for clarification
5. `i5-workplace-english-polite-disagreement` — Polite disagreement

### Module `i6-storytelling` — Storytelling and Flow

1. `i6-storytelling-sequence-markers` — First, then, after that, finally
2. `i6-storytelling-background-vs-event` — Background vs event
3. `i6-storytelling-summarizing-experience` — Summarizing an experience
4. `i6-storytelling-one-minute-story` — One-minute story

### Module `i7-roleplay` — Roleplay Scenarios

1. `i7-roleplay-restaurant-problems` — Restaurant problem
2. `i7-roleplay-doctor-visit` — Doctor visit
3. `i7-roleplay-hotel-checkin` — Hotel check-in
4. `i7-roleplay-customer-support` — Customer support

### Module `i8-error-repair` — Error Repair

1. `i8-error-repair-self-correction` — Self-correction phrases
2. `i8-error-repair-asking-for-rephrase` — Asking someone to rephrase
3. `i8-error-repair-repairing-grammar` — Repairing grammar mid-speech
4. `i8-error-repair-repairing-vocabulary` — Repairing vocabulary mid-speech

---

## Course 3: Professional Fluency — Advanced Track

Course ID: `advanced-spoken-english-track`
Level: `advanced`

### Module `a1-precision-grammar` — Precision Grammar

1. `a1-precision-grammar-conditionals-risk` — Conditionals for risk
2. `a1-precision-grammar-modals-certainty` — Modals for certainty
3. `a1-precision-grammar-passive-for-process` — Passive voice for process
4. `a1-precision-grammar-reported-speech` — Reported speech

### Module `a2-professional-register` — Professional Register

1. `a2-professional-register-concise-updates` — Concise updates
2. `a2-professional-register-executive-summary` — Executive summary
3. `a2-professional-register-diplomatic-language` — Diplomatic language
4. `a2-professional-register-assertive-vs-rude` — Assertive vs rude

### Module `a3-technical-communication` — Technical Communication

1. `a3-technical-communication-incident-explanation` — Incident explanation
2. `a3-technical-communication-root-cause-summary` — Root-cause summary
3. `a3-technical-communication-tradeoff-discussion` — Trade-off discussion
4. `a3-technical-communication-architecture-explanation` — Architecture explanation
5. `a3-technical-communication-risk-mitigation` — Risk mitigation

### Module `a4-discussion-skills` — Discussion Skills

1. `a4-discussion-skills-interrupting-politely` — Interrupting politely
2. `a4-discussion-skills-challenging-ideas` — Challenging ideas
3. `a4-discussion-skills-clarifying-assumptions` — Clarifying assumptions
4. `a4-discussion-skills-summarizing-decisions` — Summarizing decisions

### Module `a5-advanced-fluency` — Advanced Fluency

1. `a5-advanced-fluency-pace-and-pauses` — Pace and pauses
2. `a5-advanced-fluency-sentence-rhythm` — Sentence rhythm
3. `a5-advanced-fluency-reducing-fillers` — Reducing fillers
4. `a5-advanced-fluency-structured-monologue` — Structured monologue

### Module `a6-nuance-vocabulary` — Nuance and Vocabulary

1. `a6-nuance-vocabulary-strong-vs-weak-verbs` — Strong vs weak verbs
2. `a6-nuance-vocabulary-collocations` — Collocations
3. `a6-nuance-vocabulary-idiomatic-workplace-phrases` — Idiomatic workplace phrases
4. `a6-nuance-vocabulary-hedging` — Hedging language

### Module `a7-interview-speaking` — Interview Speaking

1. `a7-interview-speaking-achievement-stories` — Achievement stories
2. `a7-interview-speaking-complex-projects` — Complex project explanation
3. `a7-interview-speaking-conflict-examples` — Conflict examples
4. `a7-interview-speaking-strengths-and-gaps` — Strengths and gaps

### Module `a8-review-mastery` — Review and Mastery

1. `a8-review-mastery-personal-error-map` — Personal error map
2. `a8-review-mastery-mixed-tense-review` — Mixed tense review
3. `a8-review-mastery-advanced-roleplay` — Advanced roleplay
4. `a8-review-mastery-final-speaking-assessment` — Final speaking assessment

---

## Skeleton statistics

- Courses: 3
- Modules: 24
- Subsections: 101
- Pilot module for full content: `b4-past-tense`

---

## Review questions

1. Is the Beginner track practical enough for daily life speaking?
2. Is the Intermediate track strong enough for workplace and travel needs?
3. Is the Advanced track aligned with Jithin's professional communication goals?
4. Should Sandra's path start with the Beginner track or a lighter version of Intermediate?
5. Should any module be reordered before full content authoring?
