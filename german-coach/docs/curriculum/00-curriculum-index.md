# German Coach Curriculum Index

## Purpose

This curriculum is designed for an English-speaking learner living in Germany who needs German for both everyday survival and Goethe exam progression.

The full learning path is:

```text
A0 Survival German
  -> A1 Goethe Start Deutsch 1
  -> A2 Goethe bridge
  -> B1 Goethe Zertifikat
```

The first active exam target is A1. A2 and B1 are included from the beginning so the app can grow without redesign.

## Curriculum design rule

The app should not present grammar as an isolated textbook list first. It should present exam/life sections first, then attach grammar and vocabulary as tools needed for that section.

Correct structure:

```text
Level
  -> Section
       -> Topic group
            -> Subtopic
                 -> grammar focus
                 -> vocabulary focus
                 -> survival use
                 -> Goethe exam use
                 -> practice modes
```

Example:

```text
A1
  Schreiben
    Appointment cancellation
      Grammar: modal verbs, word order, time expressions, accusative basics
      Vocabulary: Termin, krank, kommen, heute, verschieben
      Survival use: doctor, Kita, Ausländerbehörde, class appointment
      Exam use: short message / email
      Practice: write, review, rewrite, speak corrected version
```

## Level files

- `01-a0-survival-german.md`
- `02-a1-goethe-start-deutsch-1.md`
- `03-a2-goethe-bridge.md`
- `04-b1-goethe-zertifikat.md`
- `05-grammar-map-a0-b1.md`
- `06-vocabulary-map-a0-b1.md`
- `07-exam-section-to-grammar-map.md`

## Practice types

Every important subtopic should support several of these task types:

- learn explanation
- fill blank
- sentence building
- translate to German
- answer one German question
- write short answer
- write email/message
- listen and answer
- speak and repeat
- rewrite corrected answer
- timed exam-style task
- mistake repair drill

## Review loop

Every practice task should follow this loop:

```text
Question
  -> learner answer
  -> review
  -> corrected model
  -> English explanation
  -> rewrite or repeat
  -> mistake saved
  -> next question
```

## Source rule

Exam task formats must be cross-checked against Goethe sources before implementation. The course can generate original Goethe-style practice tasks, but must not copy official Goethe or textbook exercises verbatim.
