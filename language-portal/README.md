# Language Portal

Docusaurus site with German (A1-C2) and English (A1-C1) lessons, plus a small Node server that powers the
AI practice coach (`<AIPracticeComponent>` blocks and the floating tutor) with Google Gemini.

```
language-portal/
├── docs/                 # lesson content (MDX)
├── src/components/       # AIPracticeComponent, GlobalAITeacher
├── src/lib/practice/     # browser side: chat session, Gemini Live voice hook
├── server/               # Express + ws server: /api/chat, /api/transcribe, /api/audio-bridge, static site
└── Dockerfile            # builds site + server bundle for Cloud Run
```

Deployment config (Terraform + deploy script) lives at the repo root in `infra/language-portal/`.

## Local development

```bash
npm install
npm start                      # docs only, http://localhost:3000 (AI practice will not work)
```

Full stack (docs + AI practice):

```bash
cp .env.example .env           # set GEMINI_API_KEY
npm run dev:server             # API on http://localhost:8080 (ALLOWED_ORIGINS=http://localhost:3000)
PRACTICE_API_BASE=http://localhost:8080 npm start
```

Production-like run:

```bash
npm run build                  # docusaurus build -> build/, esbuild server -> dist/server.js
GEMINI_API_KEY=... npm run start:server   # serves build/ and /api on http://localhost:8080
```

Checks: `npm run typecheck`, `npm run check:server` (offline server logic checks).

## Using the practice component in MDX

```mdx
import AIPracticeComponent from '@site/src/components/AIPracticeComponent';

<AIPracticeComponent
  topic="Ordering at a bakery"
  level="A1"
  taskType="speaking"          // speaking | roleplay | listening -> voice + text; writing | reading -> text
  prompt={`Persona, starting turn, flow, feedback rules...`}
/>
```

`language` is inferred from the URL (`/docs/german/...` → German, otherwise English) and can be set
explicitly with `language="German"`. The `prompt` is sent to the coach as the scenario; the server wraps it
in the teacher contract (correction → reason → natural version → rewrite/repeat before moving on).

## AI practice server

| Route | Purpose |
|---|---|
| `GET /healthz` | Liveness |
| `GET /api/config` | Public client config (no secrets) |
| `POST /api/chat` | Text practice turn (structured correction reply + lesson-flow state) |
| `POST /api/transcribe` | Audio → text fallback for voice transcripts |
| `WS /api/audio-bridge` | Gemini Live voice session (server holds the API key) |

There is no user login. Abuse protection: per-IP rate limits, same-origin checks, voice session caps
(per IP, total, max duration), input size limits, and an optional shared `PRACTICE_ACCESS_CODE`.
All knobs are listed in `.env.example`.
