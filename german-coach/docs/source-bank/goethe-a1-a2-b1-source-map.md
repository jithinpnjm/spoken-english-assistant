# Goethe A1-A2-B1 Source Map

## Purpose

This file records the source policy for Goethe-aligned exam preparation. It does not copy official tasks. It maps official Goethe source families to app design responsibilities.

## Primary Goethe policy source

Source:

- Goethe-Institut Exam Guidelines / Prüfungsordnung
- URL: https://www.goethe.de/pro/relaunch/prf/en/Pruefungsordnung.pdf
- Version seen in planning: Last updated September 1, 2025

Key implications for German Coach:

- Goethe exams provide evidence of German as a foreign/second language.
- They are administered and graded under uniform criteria.
- Terms and Conditions for Exam Administration describe individual exam components, procedure, grading, and result calculation.
- Goethe publishes a sample exam booklet and one or more practice exam booklets for each exam.
- Those sample/practice booklets provide the structure, content, and grading overview for each individual exam.
- Adult exam path includes Goethe-Zertifikat A1: Start Deutsch 1, Goethe-Zertifikat A2, and Goethe-Zertifikat B1.

## A1 Goethe-Zertifikat A1: Start Deutsch 1

Collected sources:

- Goethe A1 Modellsatz PDF: https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_modellsatz.pdf
- Goethe A1 practice material page: https://www.goethe.de/ins/mm/en/spr/prf/gzsd1/ueb.html
- LearnOutLive A1 preparation article: https://learnoutlive.com/how-to-prepare-for-the-goethe-german-a1-test/
- EAQUALS German samples / Goethe Institute PDF: https://www.eaquals.org/wp-content/uploads/German-samples-Goethe-Institute.pdf

Primary official sources:

- Goethe A1 Modellsatz
- Goethe A1 practice material page

Supplementary sources:

- LearnOutLive article
- EAQUALS PDF

App sections:

- Hören
- Lesen
- Schreiben
- Sprechen
- Wortschatz
- Grammatik
- Mini Mock Exam

Source alignment tasks:

- map official A1 task families to app-generated task types
- identify timing and scoring assumptions
- identify writing task style
- identify speaking task style
- create original A1-style tasks without copying source text
- use supplementary sources only for preparation strategy and difficulty calibration

Implementation notes:

- A1 is the first active exam target.
- Before creating A1 mock-exam tasks, analyze the A1 Modellsatz section by section.
- Practice content must be original and generated in an A1 style.

## A2 Goethe-Zertifikat A2

Collected sources:

- Goethe A2 Modellsatz Erwachsene PDF: https://www.goethe.de/pro/relaunch/prf/materialien/A2/A2_Modellsatz_Erwachsene.pdf

Primary official source:

- Goethe A2 Modellsatz Erwachsene

App sections:

- Hören
- Lesen
- Schreiben
- Sprechen
- Wortschatz
- Grammatik
- Mini Mock Exam
- Mistake Repair

Source alignment tasks:

- map A2 listening/reading/writing/speaking task families
- confirm writing length and scoring model
- confirm speaking format
- generate original A2-style practice items
- identify A2-to-B1 bridge grammar from observed task demand

Implementation notes:

- A2 must not be a placeholder.
- A2 should prepare the learner for independent daily German and B1 entry.
- The A2 Modellsatz must be analyzed before A2 mini mock exam implementation.

## B1 Goethe-Zertifikat B1

Collected sources:

- Goethe B1 Modellsatz Erwachsene PDF: https://www.goethe.de/pro/relaunch/prf/materialien/B1/b1_modellsatz_erwachsene.pdf

Primary official source:

- Goethe B1 Modellsatz Erwachsene

App sections:

- Lesen
- Hören
- Schreiben
- Sprechen
- Wortschatz
- Grammatik
- Full Mock Exam
- Weakness Repair

Source alignment tasks:

- map B1 Lesen/Hören/Schreiben/Sprechen task families
- confirm modular exam structure
- confirm writing/speaking rubrics
- build original B1-style simulations
- store score and weakness report
- identify B1 weakness repair categories from task requirements

Implementation notes:

- B1 remains the long-term certification target.
- B1 mock exams must be source-aligned before implementation.
- The app must support B1 speaking practice for planning, presentation, and discussion tasks if those appear in the official source analysis.

## Content copyright rule

Allowed:

- source alignment notes
- original practice tasks
- original reading/listening texts
- original writing prompts
- original speaking prompts
- exam-like structure
- short excerpts only when legally safe and necessary for internal analysis notes

Not allowed:

- copying official Goethe task text into the app
- copying official listening transcript into the app
- redistributing official audio
- copying textbook exercises
- storing full official model tests in the app

## Implementation gate

A German exam simulator is not production-ready until the matching source map is completed:

```text
A1 mock exam requires A1 Goethe source analysis completion.
A2 mock exam requires A2 Goethe source analysis completion.
B1 mock exam requires B1 Goethe source analysis completion.
```

## Required next source-analysis notes

Create these before coding exam simulations:

```text
german-coach/docs/source-bank/a1-modellsatz-analysis.md
german-coach/docs/source-bank/a2-modellsatz-analysis.md
german-coach/docs/source-bank/b1-modellsatz-analysis.md
```

Each analysis should summarize:

- source URL
- exam sections observed
- task family
- learner output type
- timing/scoring notes if available
- app task design implication
- copyright-safe generation rule
