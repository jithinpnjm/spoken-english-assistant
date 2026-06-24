# Claude A2 Enrichment Package

## Purpose

This document records the Claude-prepared A2 enrichment package shared by Jithin on 2026-06-24.

The package should be used as an enrichment layer for German Coach. It builds on the A1 package and covers Goethe-Zertifikat A2 exam structure, Learn German Original A2 sequencing, curated learning resources, daily-life modules, and official A2 word groups.

## Package scope

The uploaded package includes:

```text
metadata
exam_framework
curated_resources
a2_course_topics
supplementary_daily_life_survival_modules
official_goethe_a2_word_groups_new_vs_a1
```

## Metadata summary

Title:

```text
German A2 Coach Curriculum — Goethe-Zertifikat Aligned
```

Purpose:

- enrich an AI German-learning coach agent
- build on A1 curriculum
- cover Learn German Original A2 course content
- cross-reference official Goethe-Zertifikat A2 exam framework
- include real daily-life and bureaucratic German needed to live in Germany at A2 level
- include curated free learning resources

## Source summary

The package lists these source families:

- Goethe-Institut A2 Wortliste
- Goethe-Institut A2 exam training / Modellsatz
- Goethe-Institut A2 practice materials
- Learn German Original A2 course
- DW Nicos Weg A2
- Olesen Tuition Goethe A2 exam guide

## Exam framework summary

The main focus is Goethe-Zertifikat A2.

Important exam points:

- Goethe-Zertifikat A2 replaced the older Start Deutsch 2 exam.
- Same CEFR A2 level, redesigned task types since 2016.
- Recommended age: 16+.
- Overall passing score: 60 of 100.
- Additional threshold: at least 45 of 75 points across combined written sections: Lesen + Hören + Schreiben.
- Additional threshold: at least 15 of 25 points in Sprechen.
- Failing either threshold fails the whole exam even if total percentage is met.

## Module structure

```text
Lesen      30 minutes  25 points
Hören      30 minutes  25 points
Schreiben  30 minutes  25 points
Sprechen   15 minutes  25 points
```

Scoring note:

- Lesen, Hören, and Schreiben raw scores are out of 20 measurement points each.
- These raw scores are multiplied by 1.25 to convert to 25 points.
- Sprechen is scored directly out of 25.

## Lesen structure

```text
Teil 1: text + 5 statements with 3 options
Teil 2: information table; match wishes/purposes to correct info
Teil 3: informal email/letter; complete statements with 3 options
Teil 4: match statements to advertisements
```

## Hören structure

```text
Teil 1: 3 short texts, multiple choice, heard twice
Teil 2: one longer dialogue; match named people to pictures, heard once
Teil 3: 5 short conversations, multiple choice, heard once
Teil 4: radio interview; true/false statements, heard once
```

## Schreiben structure

```text
Teil 1: short informal SMS/message, about 20-30 words
Teil 2: short formal/semi-formal email, about 30-40 words
```

## Sprechen structure

```text
Teil 1: question-answer exchange using cards
Teil 2: short monologue on a familiar personal topic
Teil 3: joint planning task with partner
Pronunciation: 5 of 25 points across the module
```

## A2 progression from A1

The package identifies these expanded/new A2 themes:

- Familienmitglieder and Familienstand expanded
- Berufe
- Schule and Schulfächer
- Reisen/Verkehr expanded
- Wohnen expanded
- Gesundheit expanded
- Arbeit/Beruf expanded
- Freizeit/Unterhaltung expanded

## New A2 word groups

The package identifies new A2 word groups:

- Berufe
- Familienmitglieder expanded
- Familienstand
- Schule und Schulfächer
- Feiertage
- Abkürzungen

## Curated resources summary

Trusted channels/resources:

- DW Nicos Weg A2
- Goethe-Institut official resources and YouTube
- Your German Teacher
- Learn German with Anja
- lingoni German
- Learn German Original
- Easy German

Official exam-prep resources:

- Goethe A2 exam training
- Goethe A2 Wortliste
- Goethe A2 practice materials

## A2 course topic summary

The package documents 49 verified A2 lessons from a 1-50 sequence. Lesson 46 is explicitly marked as undocumented/unverified rather than invented.

Major topic groups:

- A2 self-introduction
- character traits
- subordinate clauses: dass, weil/da/denn, wenn, obwohl, als
- adjective endings: nominative, accusative, dative, genitive
- genitive case recognition
- comparatives and superlatives
- connectors: deshalb, trotzdem
- werden
- indirect questions
- während, bevor
- relative clauses
- indefinite pronouns
- Präteritum for modal/regular/irregular verbs
- childhood narration
- city vs countryside advantages/disadvantages
- infinitive with/without zu
- past perfect
- nachdem and seitdem
- two-way prepositions
- assumptions
- polite requests / Konjunktiv II
- picture description
- adjectives as nouns
- passive voice
- recipe/instruction writing
- authentic dialogues

## A2 survival modules summary

The package includes three supplementary modules:

```text
S1 Job Applications — Bewerbung Basics
S2 Health System Advanced — Referrals, Prescriptions, Sick Notes
S3 Contracts and Notices — Kündigung, Widerruf, Fristen
```

These should become A2-level living-in-Germany modules.

## Integration rules

Use this package as follows:

1. Keep Goethe exam sections as the primary exam navigation.
2. Use the A2 lessons as ordered-path enrichment.
3. Use the A2 exam framework for A2 mini mock/full mock scoring.
4. Use the survival modules as practical Germany-life content.
5. Use A2 word groups to expand vocabulary bank categories.
6. Use common mistakes to generate A2 targeted repair drills.
7. Do not copy third-party lesson text, scripts, worksheets, or official Goethe tasks verbatim.
8. Keep generated tasks original and Goethe-style.

## Planned follow-up implementation

```text
PR 62: A2 enriched topic catalog data
PR 63: A2 survival modules + word groups + exam framework data
PR 64: A2 practice/mistake repair task bank
PR 65: A2 mini mock exam foundation
```
