# German Coach Production Smoke Test

## Purpose

This checklist defines the minimum validation required before calling German Coach production-ready.

Current target status:

```text
German Coach v0.9 release candidate
```

The app should not be treated as production until every required check below passes locally and in the deployed environment.

## Required local commands

Run from the app package:

```bash
cd english-coach
npm run lint
npm run build
npm run dev
```

Required result:

- TypeScript passes with no errors.
- Production build succeeds.
- Local dev server starts.
- Browser console has no blocking runtime errors during the flows below.

## Portal and auth smoke test

1. Open the app.
2. Sign in.
3. Confirm the portal selector appears.
4. Open English Coach.
5. Return to portal selector.
6. Open German Coach.
7. Confirm refresh keeps the app usable.

Pass criteria:

- User can access both portals.
- German Coach does not break English Coach.
- No blank screen after login/refresh.

## English Coach regression test

1. Open English Coach.
2. Start English Live.
3. Speak one sentence.
4. Confirm the English teacher responds using the English teacher persona.
5. Stop English Live.

Pass criteria:

- Voice connection starts.
- Mic permission works.
- Audio playback works.
- English-specific correction behaviour is unchanged.

## German Coach core UI test

1. Open German Coach.
2. Switch levels: A0, A1, A2, B1.
3. Switch between Exam Sections and Ordered Path.
4. Click several sections and subtopics.
5. Confirm practice panels render.

Pass criteria:

- No runtime errors.
- Ordered Path renders enriched catalog entries.
- Exam Sections render subtopics and practice panels.

## German practice test

For each level:

```text
A0: Greetings / repair phrases
A1: appointment or form task
A2: clause/repair task
B1: opinion/planning/repair task
```

Pass criteria:

- Correct answers are accepted where exact answers exist.
- Wrong answers show corrected German.
- Rewrite/repeat instruction appears.
- A2/B1 repair tasks are included where relevant.

## Writing review test

1. Open A1 -> Schreiben.
2. Submit an empty answer.
3. Submit a partially correct answer.
4. Submit a strong answer.
5. Repeat for A2 and B1 writing prompts.

Pass criteria:

- Score appears.
- Missing points appear.
- Corrected German appears.
- Rewrite instruction appears.

## Mock exam test

1. A1 -> Mini Mock Exam.
2. A2 -> Mini Mock Exam.
3. B1 -> Mini Mock Exam.

Pass criteria:

- Each mock renders.
- Score calculation works.
- Pass/needs-repair estimate appears.
- Next study plan appears.

## German Live voice test

Run for A1, A2, and B1.

1. Select a level and relevant subtopic.
2. Click Start German Live.
3. Confirm the agent speaks as Deutsch Coach, not Sky English teacher.
4. Answer with a deliberate German mistake.
5. Confirm correction happens.
6. Confirm the agent asks for repetition or rewrite before moving on.
7. Stop German Live.
8. Change level/section and confirm live session stops if active.

Pass criteria:

- German system prompt is used.
- Agent teaches in English and trains in German for A0/A1.
- Agent becomes more German-first at B1.
- Audio does not continue after Stop.

## Local state test

1. Mark a selected topic done.
2. Record a quick practice attempt.
3. Refresh the browser.
4. Confirm values persist.
5. Reset local state.
6. Confirm values clear.

Pass criteria:

- Local storage state persists between refreshes.
- Reset works.

## Mobile layout test

Test at widths:

```text
390px
768px
1280px
```

Pass criteria:

- No horizontal overflow.
- Cards remain readable.
- Buttons are tappable.
- Live controls remain visible.

## Deployment environment test

Confirm deployed environment has:

```text
/api/config
/api/audio-bridge
/api/transcribe
Gemini Live model configuration
microphone HTTPS permission
```

Pass criteria:

- `wss://` connection works in production.
- `/api/transcribe` returns transcript.
- No mixed-content issue.

## Release decision

Only mark German Coach production-ready when:

```text
lint: pass
build: pass
English live: pass
German live: pass
German UI: pass
Mocks: pass
Practice review: pass
Local state: pass
Mobile: pass
Deployment: pass
```

Until then, label it:

```text
German Coach beta / release candidate
```
