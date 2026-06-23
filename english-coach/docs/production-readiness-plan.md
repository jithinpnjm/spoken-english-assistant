# Sky English Coach — Production Readiness Plan

This document defines the move from prototype/pilot terminology to a production-ready English learning product.

## Product direction

Sky is not a generic chatbot. Sky is a structured English teacher with four product modes:

1. Study Mode
   - Structured curriculum lessons.
   - Backend-owned cursor: track -> module -> lesson -> phase.
   - Teacher explains first, then guides practice, then corrects, then moves to conversation.

2. Practice Mode
   - General free-talk, daily warm-up, roleplay, workplace quick practice, and flexible conversation.
   - Useful after study sessions or whenever the learner wants casual practice.

3. Review Mode
   - Mistake memory, recurring error review, spaced repetition, correction drills.
   - Turns stored mistakes into focused mini lessons.

4. Live Mode
   - Voice version of study/practice/review.
   - Should stay bound to the selected lesson or practice goal.
   - Should not become generic voice chat.

## Production naming rules

Remove or hide prototype language from user-facing and core production paths.

Avoid:

- pilot
- generated fallback
- scaffold, when shown to the user
- activity engine
- daily activities, as the primary study UX

Prefer:

- track
- module
- lesson
- phase
- study mode
- practice mode
- review mode
- general practice
- authored lesson
- guided lesson

Internal implementation may keep compatibility aliases temporarily, but production-facing UI and docs should use production language.

## Curriculum taxonomy

The curriculum should be grouped into stable product tracks:

### Foundation English

For beginner learners and basic confidence.

- sounds and pronunciation basics
- classroom/learning language
- be verbs and identity
- sentence order
- present simple
- present continuous
- nouns, articles, and quantity
- prepositions
- past simple
- future basics
- everyday functions
- beginner fluency

### Daily Life English

For practical daily situations.

- shopping
- travel
- appointments
- health
- family
- directions
- phone calls
- service interactions

### Grammar for Speaking

Grammar taught for spoken production, not academic grammar memorization.

- tense control
- questions
- articles
- prepositions
- modals
- sentence expansion
- conditionals
- correction lab

### Workplace English

For workplace communication.

- standup updates
- blockers
- status reports
- clarification
- polite disagreement
- estimates
- delays
- support requests
- meeting summaries

### Interview English

For job-search and professional interviews.

- self introduction
- experience summary
- project explanation
- STAR answers
- conflict stories
- failure/learning stories
- leadership stories
- system/design explanations
- salary/notice discussion
- final interview checkpoint

### Professional Communication

For advanced work and senior communication.

- register control
- concise updates
- stakeholder communication
- technical explanation
- negotiation
- influence
- presentations
- executive summaries

### Fluency and Pronunciation

For confidence, rhythm, clarity, and natural speech.

- sentence stress
- intonation
- pausing
- connected speech
- storytelling
- 60-second answers
- fluency repair

### Review and Mistake Repair

For personalized correction.

- recurring grammar mistakes
- recurring vocabulary mistakes
- unnatural phrasing
- pronunciation focus
- review drills
- progress checkpoints

## Production lesson lifecycle

Every Study Mode lesson should follow this lifecycle:

1. Intro
   - lesson title
   - goal
   - meaning
   - when to use it
   - structure/pattern
   - teacher examples
   - common mistake preview
   - mini recognition check

2. Model
   - example set
   - pattern breakdown
   - natural spoken version
   - non-example and correction
   - noticing task

3. Controlled Practice
   - word bank or sentence frame
   - one small learner attempt
   - constrained task

4. Correction
   - what was good
   - corrected sentence
   - why it changed
   - natural version
   - micro rule

5. Repeat / Rewrite
   - chat mode: rewrite corrected sentence
   - live mode: repeat aloud
   - one naturalness tip

6. Free Practice
   - short conversation or roleplay inside the same topic
   - one follow-up question
   - correction stays active

7. Summary
   - rule recap
   - two correct examples
   - one common mistake to avoid
   - homework
   - next lesson preview

## UI structure target

The app should have a cleaner navigation model:

- Profile and learner switcher
- Study Mode
  - Continue lesson
  - Track/module/lesson picker
  - Current phase/progress
- Practice Mode
  - Free conversation
  - Daily warm-up
  - Roleplay
  - Workplace quick practice
- Review Mode
  - Mistake memory
  - Due reviews
  - Correction drills
- Live Mode
  - Start live lesson/practice
  - Voice state

## Upcoming big PR sequence

### PR A — Production structure and UI organization

- Rename user-facing labels.
- Introduce product modes.
- Clean sidebar hierarchy.
- Add production taxonomy metadata.
- Keep backward-compatible internal IDs where needed.

### PR B — Foundation English authored content

- Hand-author beginner foundation modules.
- Focus on Sandra's learning path.

### PR C — Workplace and Interview authored content

- Expand professional track for Jithin.
- Add interview speaking and technical communication.

### PR D — Review engine and mistake repair

- Store structured mistake records.
- Add review due dates.
- Add personalized correction drills.

### PR E — Live mode curriculum binding

- Make live mode continue the active study/practice/review path.
- Add live-specific prompt policies.

### PR F — Production hardening

- Auth guard backend endpoints.
- Error handling.
- Cloud Run readiness.
- Firestore indexes/rules review.
- Observability and deployment checks.
