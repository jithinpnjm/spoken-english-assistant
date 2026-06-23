# Goethe Exam Source Policy

## Why this policy exists

The learner will rely on German Coach for living in Germany and for Goethe exam preparation. The course must therefore be source-aligned, not improvised from generic grammar lists.

Goethe official sources are mandatory for exam-path design.

## What Goethe sources control

Goethe sources control:

- exam names
- level scope
- exam section names
- task formats
- exam flow
- scoring and grading assumptions
- model/practice task patterns
- exam conduct and source hierarchy

## What the app controls

The app controls:

- original lesson explanations
- original practice questions
- original reading/listening texts
- original writing prompts
- original speaking prompts
- mistake repair tasks
- vocabulary scheduling
- user-specific progress and feedback

## Important Goethe Exam Guidelines facts for architecture

The Goethe Exam Guidelines state that Goethe examinations are designed to provide evidence of language proficiency in German as a foreign language and German as a second language. They are administered and graded according to uniform criteria at exam centres around the world and, under certain conditions, online.

The guidelines also state that the Terms and Conditions for Exam Administration describe the components of individual examinations, their organization, procedure, grading, and result calculation.

The guidelines further state that Goethe publishes a sample exam booklet and one or more practice exam booklets for each exam, and those booklets provide an overview of the structure, content, and grading process of the individual exams.

The adult exam path listed in the guidelines includes:

- Goethe-Zertifikat A1: Start Deutsch 1
- Goethe-Zertifikat A2
- Goethe-Zertifikat B1
- Goethe-Zertifikat B2
- Goethe-Zertifikat C1

German Coach will focus on A0 survival, A1, A2, and B1.

## Course design implication

The German Coach should not begin with random grammar chapters.

Correct order:

1. Level
2. Exam section
3. Goethe-style task type
4. Required grammar
5. Required vocabulary
6. Survival scenario
7. Practice task
8. Correction and repeat/rewrite

Example:

```text
A1
  Schreiben
    Short message: sick / cannot attend
      grammar: modal verbs, word order, time expressions
      vocabulary: krank, kommen, heute, Termin
      survival use: doctor, German class, Kita, appointment
      task: write a short message
      review: task completion, word order, verb form, article/case
```

## Copyright and originality rule

German Coach must not copy official Goethe tasks or book exercises verbatim.

Allowed:

- use Goethe task formats as design references
- create original questions with similar skill goals
- create original simulated exams
- cite source alignment in docs

Not allowed:

- copy official reading texts
- copy official listening transcripts
- copy copyrighted book exercises
- redistribute official audio
- paste full official model tests into the app

## Source record format

Every exam-aligned lesson should eventually record:

```ts
{
  sourceFamily: "Goethe",
  sourceType: "Modellsatz" | "Übungssatz" | "Prüfungsordnung" | "Durchführungsbestimmungen" | "CEFR" | "Supplementary",
  exam: "A1" | "A2" | "B1",
  section: "Hören" | "Lesen" | "Schreiben" | "Sprechen" | "Wortschatz" | "Grammatik" | "Mock Exam",
  taskType: string,
  sourceUrl: string,
  copiedContent: false,
  originalPracticeContent: true
}
```

## Implementation gate

Before implementing a level-specific exam simulator, the corresponding source map must exist:

- A1 source map before A1 mock exam
- A2 source map before A2 mock exam
- B1 source map before B1 mock exam

This is stricter than the English coach because the German coach is intended for exam preparation and survival usage.
