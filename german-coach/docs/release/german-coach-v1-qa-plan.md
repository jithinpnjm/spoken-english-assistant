# German Coach v1 QA Plan

## Goal

This document defines the QA plan for moving German Coach from release candidate to production.

## Release scope

German Coach v1 should include:

- English/German portal selector
- A0/A1/A2/B1 curriculum navigation
- Exam Sections view
- Ordered Path view
- practice and repair tasks
- writing review
- vocabulary bank
- progress/state dashboard
- A1/A2/B1 mini mocks
- German Live teacher
- English Coach regression safety

## Non-goals for v1

These are useful later but should not block v1:

- backend persistence across devices
- full timed Goethe exams
- AI examiner scoring for all writing/speaking tasks
- real audio/TTS listening exam mode
- admin content editor
- analytics dashboard

## QA stages

### Stage 1: Static checks

```bash
cd english-coach
npm run lint
npm run build
```

Required result:

- no TypeScript errors
- production bundle builds
- no missing imports

### Stage 2: Local manual flow

Test locally with `npm run dev`.

Required flows:

1. Login / portal selection.
2. English Coach open.
3. German Coach open.
4. Level switch A0/A1/A2/B1.
5. Exam Sections / Ordered Path toggle.
6. Practice panel.
7. Writing review.
8. Vocabulary panel.
9. Progress/state panel.
10. A1/A2/B1 mocks.
11. German Live.
12. English Live.

### Stage 3: Voice regression

Voice is the highest-risk area because English and German share the same live infrastructure.

Required tests:

| Test | Expected |
|---|---|
| English Live starts | English teacher persona responds. |
| German Live starts | Deutsch Coach persona responds. |
| Stop Live | audio and mic stop. |
| Change German level while live | live session stops. |
| Mic permission denied | user sees understandable error. |
| Network disconnect | session stops gracefully. |

### Stage 4: German learning behaviour

For A0/A1:

- explanation mostly English
- practice in German
- correction in English + German model
- repeat request before moving on

For A2:

- mixed English/German
- longer German answers
- strict word-order and clause correction

For B1:

- German-first where reasonable
- Redemittel usage
- opinion, planning, presentation, and semi-formal writing support

### Stage 5: Deployed environment

Confirm production has:

- HTTPS
- mic permission allowed
- `/api/config`
- `/api/audio-bridge`
- `/api/transcribe`
- live model configured
- no mixed-content errors
- WebSocket connects with `wss://`

## Acceptance criteria

German Coach v1 can be released only when:

```text
Static checks pass
English Coach works
English Live works
German Coach works
German Live works
A1/A2/B1 mocks work
Practice correction works
Writing review works
State dashboard works
Mobile layout is acceptable
Production audio bridge works
```

## Known limitations to communicate

- Progress is local to one browser.
- Mock exams are mini mocks, not full official exams.
- Rule-based writing review is not a certified examiner score.
- Listening practice is not a full official audio simulation yet.
- Legal/citizenship/residency content must be verified with current official sources before being treated as current legal advice.

## Release note draft

```text
German Coach is available as a Goethe-aligned German learning portal with A0/A1/A2/B1 curriculum, topic-wise ordered path, practice correction, writing review, vocabulary support, progress dashboard, mini mocks, and a German Live teacher. This first version is designed for guided self-study and internal use; full official exam simulation and backend persistence will be added later.
```
