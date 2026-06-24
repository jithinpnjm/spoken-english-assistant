# German Coach Readiness Matrix

## Current label

```text
German Coach v0.9 release candidate
```

The app is now stronger than a prototype because it includes:

- German portal
- A0/A1/A2/B1 curriculum paths
- ordered path
- writing review
- vocabulary bank
- progress panel
- mini mocks
- German Live teacher foundation

It should become production only after the smoke checklist passes.

## Feature readiness

| Area | Status | Notes |
|---|---|---|
| Portal selector | Candidate | English/German portal split exists. |
| English Coach regression | Needs check | Shared live hook was extended for German. |
| German curriculum | Candidate | A0/A1/A2/B1 catalog data exists. |
| Ordered Path | Candidate | Catalog data is shown in ordered path view. |
| Practice tasks | Beta | A0/A1 tasks plus A2/B1 repair tasks. |
| Writing review | Beta | Rule-based scoring; not full examiner mode. |
| Vocabulary bank | Beta | Seed data exists; needs expansion. |
| Progress state | Beta | Local browser state exists; no backend persistence yet. |
| A1 mock | Beta | Mini mock only. |
| A2 mock | Beta | Mini mock only. |
| B1 mock | Beta | Mini mock only. |
| German Live voice | Candidate | Uses shared live pipeline with German teacher prompt. |
| Mobile UX | Needs check | Must be checked manually. |
| Deployment | Needs check | Requires audio bridge, transcribe endpoint, and HTTPS mic permission. |

## Production blockers

1. Local build and lint must pass.
2. English Live must be regression-tested.
3. German Live must be tested for A1/A2/B1 behaviour.
4. Local state UX must be verified.
5. Mocks and scoring need runtime checks.
6. Deployed environment must be validated with WSS and mic permission.

## Production checklist

```text
Build passes
English Coach works
English Live works
German Coach UI works
German Live works
A1/A2/B1 mocks work
Practice review works
Local state works
Deployed app works over HTTPS
```

## Later improvements

- Backend persistence for progress and mistakes.
- AI-assisted writing examiner mode.
- Real audio or TTS listening practice.
- Full timed Goethe mock exams.
- Admin/content editor for adding tasks.
- Analytics and error monitoring.
