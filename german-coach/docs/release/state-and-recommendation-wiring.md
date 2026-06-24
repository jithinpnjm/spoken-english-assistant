# State and Recommendation Wiring

## Purpose

This note describes how the German study state and recommendation components should be used in the UI.

## Components

```text
GermanLearningStatePanel
GermanStudyDashboard
```

## Recommended UI placement

Place `GermanStudyDashboard` near the top of GermanCoachShell, after the level cards and before the main lesson content.

Recommended props:

```tsx
<GermanStudyDashboard
  level={selectedLevel}
  selectedSubtopicId={selectedSubtopic?.id}
/>
```

## Behaviour

The dashboard combines:

- local learning state
- completed topic count
- practice attempts
- best-score average
- reset action
- level-specific study recommendations
- next ordered-path recommendation
- mistake-based repair recommendations

## Production note

Current storage is local browser storage. That is acceptable for beta/release-candidate testing, but production multi-device learning should eventually use backend persistence.

## Future backend persistence

Future data model should persist:

```text
userId
selectedLevel
completedSubtopicIds
practiceAttempts
bestScores
mistakes
vocabularyDueIds
updatedAt
```

Possible backend options:

- Firestore if using Firebase user auth.
- Existing app backend if user profiles already exist there.
- A lightweight `/api/german-progress` endpoint later.
