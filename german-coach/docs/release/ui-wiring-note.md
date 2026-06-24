# German Coach UI Wiring Note

## Purpose

This note records the final dashboard placement for German Coach.

## Dashboard placement

Place the study dashboard after the progress/vocabulary row and before the main lesson area.

Recommended order:

```text
Header
Level cards
Progress and vocabulary
Study dashboard
Main lesson area
```

## Component usage

```tsx
<GermanStudyDashboard level={selectedLevel} selectedSubtopicId={selectedSubtopic?.id} />
```

## Manual checks

- Select A1, A2, and B1 and confirm recommendations change.
- Select a subtopic and mark it done.
- Refresh the browser and confirm local state persists.
- Reset local state and confirm counts clear.
