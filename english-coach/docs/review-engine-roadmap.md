# Review Mode and Mistake Repair Roadmap

Review Mode turns mistake memory into actionable learning.

The goal is not only to list mistakes. The app should help the learner repair recurring mistakes through short, targeted review drills.

## Current implementation in this PR

This PR adds the first Review Mode engine:

- review priority calculation
- due-date calculation
- review status
- drill prompt generation
- review summary
- Review Mode UI cards
- Start Review Drill action

## Review lifecycle

1. Mistake captured during chat or study mode.
2. Mistake is stored in the learner's mistake memory.
3. Review engine calculates priority and due status.
4. Review Mode displays the top mistakes.
5. Learner starts a focused review drill.
6. Sky asks the learner to repair one sentence using the same rule.

## Priority model

High priority:

- count >= 5
- recurring mistakes

Medium priority:

- count >= 2
- repeated but not severe yet

Low priority:

- new mistakes
- mastered mistakes

## Due-date model

The first simple due-date model is:

- high recurrence: review after 1 day
- medium recurrence: review after 2 days
- new/low recurrence: review after 3 days
- mastered: review after 14 days

This is intentionally simple. A later PR can implement a more complete spaced repetition model.

## Review drill format

Each review item produces a prompt like:

```text
Review this recurring mistake: article_usage.
First read the correction, then rewrite one improved sentence using the same rule.
Example/correction: I need apple -> I need an apple.
```

## Future improvements

Upcoming Review Mode work:

1. Add explicit review attempts collection.
2. Mark review result as fixed / needs more work.
3. Update mistake status automatically after successful reviews.
4. Add due review notifications.
5. Add a Review Mode main screen.
6. Add mistake categories by grammar/vocabulary/pronunciation/naturalness.
7. Add spaced repetition scheduling.
8. Add per-profile mastery trends.

## Common curriculum policy

Review Mode is profile-specific because mistakes belong to a learner.

Curriculum content remains common; mistake repair is personalized at runtime.
