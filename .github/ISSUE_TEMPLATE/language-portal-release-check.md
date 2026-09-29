---
name: Language Portal release check
about: Track release validation for the language-portal site and AI practice server
labels: language-portal, release-check
---

# Language Portal Release Check

## Build checks

- [ ] `cd language-portal`
- [ ] `npm run typecheck`
- [ ] `npm run check:server`
- [ ] `npm run build` (Docusaurus site + server bundle)
- [ ] `GEMINI_API_KEY=... npm run eval:teacher` (live teacher-quality evals)
- [ ] `docker build .` succeeds

## Site checks

- [ ] Home page, German A1 and English course pages load
- [ ] English sidebar: courses, Grammar Reference, Vocabulary and Phrases, Practice Arena
- [ ] No broken links in the build output

## AI practice — text

- [ ] "Start text practice" opens with the scenario's starting turn (German and English page)
- [ ] A wrong answer shows a correction card and asks for a rewrite
- [ ] The rewrite is checked before the scenario continues
- [ ] "Finish & get summary" returns a recap and homework
- [ ] Floating tutor (?) answers a question about the current page

## AI practice — voice

- [ ] Mic permission prompt appears; "Listening" state shows
- [ ] The coach speaks first and the transcript appears
- [ ] A spoken mistake is corrected and a repeat is requested
- [ ] "Stop voice" ends the session; navigating away ends the tutor session

## Production environment checks

- [ ] HTTPS deployed URL works
- [ ] `/healthz` and `/api/config` respond
- [ ] `/api/chat` works; `/api/audio-bridge` WebSocket connects; `/api/transcribe` works
- [ ] Access code prompt appears if `PRACTICE_ACCESS_CODE` is set
- [ ] Rate limiting returns 429 after repeated requests
- [ ] No blocking console errors; mobile layout checked

## Release decision

- [ ] All checks pass
- [ ] Known limitations documented
