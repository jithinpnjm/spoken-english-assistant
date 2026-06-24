# Post-v1 Roadmap

## Purpose

This roadmap captures the next improvements after German Coach v1 is released.

## Phase 1: Persistence and real progress

Goal: make progress useful across sessions and devices.

Tasks:

- Persist learning state outside local browser storage.
- Save completed topics.
- Save practice attempts and scores.
- Save repeated mistakes.
- Save vocabulary due-review state.
- Add user-level dashboard.

Recommended backend:

- Firestore if Firebase Auth is the active identity system.
- Existing app backend if profiles already live there.

## Phase 2: AI examiner review

Goal: improve writing and speaking scoring beyond deterministic checks.

Tasks:

- Add AI writing review endpoint.
- Add A1/A2/B1 Goethe-style rubric prompts.
- Return structured JSON:
  - score
  - task completion
  - grammar mistakes
  - vocabulary mistakes
  - corrected version
  - rewrite task
- Keep deterministic checks as fallback.

## Phase 3: Full mock exams

Goal: support real timed exam preparation.

Tasks:

- Full A1 timed mock.
- Full A2 timed mock.
- Full B1 module-by-module mocks.
- Save mock results.
- Generate study plan from weak modules.

## Phase 4: Listening audio mode

Goal: make listening practice closer to real exam behaviour.

Tasks:

- Add generated audio or TTS for listening prompts.
- Hide transcript until after attempt.
- Add replay limits by exam level.
- Add answer timing.
- Add vocabulary extraction after review.

## Phase 5: Live teacher improvements

Goal: make German Live more reliable and lesson-aware.

Tasks:

- Pass current lesson and mistake history into live teacher context.
- Add German teacher mode presets:
  - survival mode
  - grammar repair mode
  - exam speaking mode
  - writing correction mode
- Add session summary after stop.
- Save live-session mistakes.

## Phase 6: Content tooling

Goal: make adding lessons and tasks easier.

Tasks:

- Move task banks to JSON/content files.
- Add content validation.
- Add a small internal content editor later.
- Add duplicate-task detection.
- Add topic coverage report.

## Phase 7: Production observability

Goal: debug production issues faster.

Tasks:

- Add frontend error reporting.
- Add audio bridge connection metrics.
- Add live-session start/stop/failure logs.
- Track model and endpoint errors.
- Add privacy-safe usage metrics for feature adoption.

## Priority recommendation

Recommended sequence after v1:

```text
1. Backend persistence
2. AI writing examiner endpoint
3. Full A1 mock
4. Listening audio mode
5. Live teacher session summaries
6. Full A2/B1 mocks
7. Observability and analytics
```
