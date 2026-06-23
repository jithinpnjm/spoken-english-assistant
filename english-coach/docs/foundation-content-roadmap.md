# Foundation English Content Roadmap

Foundation English is common shared curriculum for all learners.

It is not Sandra-only and not Jithin-only. Each learner gets personalized behavior through:

- active profile
- selected level
- active cursor
- correction strictness
- mistake memory
- session history
- practice/review mode

## What this content pack covers

This PR authors the common Foundation English core modules:

1. Sound Pronunciation Core
2. Classroom and Learning Language
3. Be Verbs and Identity
4. Basic Sentence Order
5. Present Simple Daily Life
6. Present Continuous
7. Nouns, Articles, and Quantity
8. Basic Prepositions
9. Future Basics
10. Everyday Functions
11. Beginner Fluency

The Past Tense module already has separate authored content and remains part of the Foundation path.

## Content design

Each lesson in this content pack provides:

- rule summary
- beginner/intermediate/advanced explanation
- goal, meaning, pattern, and usage situations
- examples
- common mistakes
- drills
- roleplay template
- success criteria
- homework

The teacher prompt contract still controls the live teaching flow:

```text
intro -> model -> controlled practice -> correction -> rewrite/repeat -> free practice -> summary
```

## Why a builder is used

The Foundation path has many beginner lessons. A typed content builder keeps the content consistent and maintainable while avoiding a huge repeated manual dump.

The module specs define the real teaching substance:

- teaching focus
- learner goal
- meaning
- pattern
- situations
- examples
- common mistakes
- drill frame
- roleplay scenario

Each subsection then receives a consistent teacher-ready lesson object generated from its module spec and lesson title.

## Future content PRs

Upcoming production content work:

1. Interview English authored content
2. Technical Communication authored content
3. Grammar for Speaking intermediate modules
4. Review and Mistake Repair content
5. Live Mode voice-specific content policies

## Personalization policy

Do not hardcode learner-specific names into common curriculum content.

Use profile data only at runtime in prompts and UI, not inside the common curriculum module content.
