# Final Curriculum Engine State

This document describes the current implemented state after the final curriculum-engine PR.

## What is complete

Sky now has a complete backend-owned curriculum engine path:

```text
course -> module -> subsection -> phase -> prompt content -> structured model output -> cursor update
```

The app no longer depends on the model to choose the lesson location. The backend owns the cursor.

## Curriculum coverage

The curriculum skeleton contains:

- 3 courses
- 36 modules
- 338 subsections

Every subsection is now resolvable to teachable content:

- `b09-past-tense-pilot`: hand-authored, high-quality content
- all other subsections: generated structured scaffold content

This means all modules can now run without server errors. Hand-authored content can be added over time module-by-module.

## Cursor persistence

Lesson cursors are saved through `lessonCursorStore`.

The store uses:

1. Firestore Admin when available through either:
   - `FIREBASE_SERVICE_ACCOUNT_JSON`, or
   - Google application default credentials on Cloud Run
2. In-memory fallback for local/dev environments

This keeps local development easy while allowing Cloud Run scale-to-zero resume behavior when server credentials are configured.

## New APIs

### `GET /api/curriculum`

Returns curriculum stats and the full course/module/subsection tree.

### `POST /api/curriculum/start`

Starts or moves a learner cursor.

Request can include one of:

```json
{ "learnerId": "jithin", "levelBand": "Intermediate" }
```

```json
{ "learnerId": "jithin", "moduleId": "i07-workplace-english" }
```

```json
{ "learnerId": "jithin", "subsectionId": "b09-past-tense-pilot-01" }
```

## Important limitation

Only the Past Tense pilot module is hand-authored. The other modules are usable through generated scaffold content, not final human-quality authored content.

That is intentional: it gives the app full curriculum coverage now, while allowing gradual quality upgrades without blocking the product.

## Next best improvements

1. Wire curriculum picker/progress UI into `InteractiveCoach.tsx`.
2. Show current course/module/subsection/phase in the UI.
3. Author the next full module, likely `i07-workplace-english` or `b07-nouns-articles-quantity`.
4. Add explicit next-day welcome-back copy in the UI using the persisted cursor.
5. Add small in-memory retrieval for mistake review and roleplay correction only.
