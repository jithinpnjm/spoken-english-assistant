# Professional English Content Roadmap

Professional English is common shared curriculum for all learners.

It is not hardcoded for one person. A learner profile can personalize examples, correction strictness, mistake review, and active cursor at runtime, but the curriculum content stays reusable.

## What this content pack covers

This PR authors common professional content for:

1. Interview Speaking
2. Technical Communication
3. Professional Register
4. Presentations and Storytelling

These modules support:

- job interviews
- project explanations
- technical discussions
- architecture/design explanations
- incident and root cause explanations
- professional disagreement
- concise stakeholder updates
- project storytelling and presentations

## Content design

Each lesson receives:

- rule summary
- beginner/intermediate/advanced explanation
- goal and meaning
- professional answer pattern
- usage situations
- examples
- common mistakes
- drills
- roleplay template
- success criteria
- homework

The teacher prompt still controls delivery:

```text
intro -> model -> controlled practice -> correction -> rewrite/repeat -> free practice -> summary
```

## Common professional answer patterns

### Interview answer

```text
direct answer -> context -> action -> result -> reflection/relevance
```

### Technical explanation

```text
context -> problem -> impact -> analysis -> action -> result -> next step
```

### Professional message

```text
context -> point -> reason -> request or next action
```

### Presentation/story

```text
opening -> agenda/main point -> details/examples -> takeaway -> next step
```

## Future professional content PRs

1. Negotiation and Influence
2. Meeting and Discussion Skills
3. Advanced Fluency
4. Nuance and Vocabulary
5. Advanced Pronunciation
6. Role-specific interview drills
7. Technical design/system design speaking practice

## Personalization policy

Do not hardcode the learner's current employer, family, or personal history inside common curriculum content.

Use runtime profile/memory only in the prompt layer if a learner wants a personalized answer.
