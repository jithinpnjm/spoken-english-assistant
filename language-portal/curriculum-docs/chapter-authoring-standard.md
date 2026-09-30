# Chapter Authoring Standard

Quality floor: `docs/german/a1/vol3-grammar/modal-verbs.mdx`. It is a **quality benchmark, not a
mandatory template**. Different topics need different shapes:

- alphabet → light and practical; numbers → example-heavy, listening-oriented
- nominative → conceptual + sentence formation; modal verbs → deep concept + contrasts + production
- doctor → scenario-driven; email → pattern + examples + production + correction
- apartment search → vocabulary + documents + phrases + roleplay

**Completeness, not uniformity.** Do not measure quality by file size or section count.

## 1. Building blocks (use what the topic needs)

1. Goal ("I can …" statements)
2. Why it matters for living in Germany
3. Why it matters for the exam – only when there is a real, verifiable link
4. English explanation – including *why* the rule exists
5. German pattern (a reusable frame, e.g. `[Subject] [modal, pos. 2] … [infinitive, end]`)
6. Examples with English meaning
7. Common mistakes (❌ → ✅ → why)
8. Guided practice: recognition → guided choice → controlled production
9. Independent production (write/say your own sentences)
10. Real-life application (a scenario)
11. One meaningful AI practice near the end
12. Review checklist ("✅ I can …")

A study guide is not complete if it only explains grammar. It must make the learner produce German.

## 2. Quality checklist (answer "yes" to all before merging)

- Can a genuine beginner understand the explanation?
- Does it explain **why** the rule exists?
- Is there a reusable sentence pattern?
- Does the learner **produce** new German (not only recognise)?
- Can the language be used in Germany?
- Are grammar, usage, exam and real-life claims defensible?
- Does the chapter make sense at this point of the learning path (no dependence on five unseen concepts)?
- Does it anticipate typical English-speaker errors?
- Is there enough guided practice, and does it end with production/application?
- For A1, does every task use grammar already taught in the A1 path, or clearly present a useful expression as a memorized chunk?
- Are later-level patterns kept out of A1 objectives, answer keys, and AI learner-output requirements? If a learner may hear one, label it recognition-only; do not ask them to produce or explain its grammar.

## 3. Wording rules (accuracy)

Avoid unjustified absolutes: *always, never, exactly, all Germans, everyone, must, only, the only way,
100 %, guaranteed*. Use them only when literally true (e.g. "every German noun is capitalised" is true;
"Germans always answer the phone with their surname" is not). Prefer "usually", "in most cases",
"in many cities", "often".

Things that change over time are written as examples with a hint to check: ticket prices (e.g. the
Deutschlandticket price has changed several times), postage, administrative fees, residence rules,
exam regulations.

Things that vary by place are marked as such: bin colours and recycling rules, quiet hours in the
Hausordnung, ticket validation, school-system details.

## 4. Vocabulary record standard

Nouns are never taught as bare English→German pairs when article/plural matter.

| Field | Example |
| :--- | :--- |
| German | Termin |
| Article | der |
| Plural | die Termine |
| English | appointment |
| Level | A1 |
| Topic | appointments |
| Example | Ich habe morgen einen Termin. |
| Case/preposition pattern | haben + accusative → *einen* Termin; *am* Montag, *um* 10 Uhr |
| Common mistake | ❌ *ein Termin* as object → ✅ *einen Termin* |

In chapters, a vocabulary table uses at least: **word with article · plural · English · example**.
Verbs list the pattern they need (e.g. *helfen + Dativ*, *warten auf + Akk.*, separable *an|rufen*).

Survival words may be introduced earlier than their exam level if they are needed in daily life.

## 5. Exam ("Goethe/telc connection") notes

- Only write an exam note if the link is real and matches the official format in `exam-source-policy.md`.
- Name the correct part. A1 Sprechen Teil 3 is **requests** (Bitten formulieren und darauf reagieren), not planning.
  Planning together is **A2 Sprechen Teil 3** and **B1 Sprechen Teil 1**.
- Never claim what "appears in every exam", "guarantees points", or "causes immediate deductions".
- Separate daily-life relevance from exam relevance. If a topic has no specific exam link, say nothing or say
  it is useful vocabulary for listening/reading texts in general.
- telc Deutsch A1 is the same *Start Deutsch 1* format (developed jointly by Goethe-Institut and telc);
  pass rules are set by each provider – check their current handbooks.

## 6. AI practice blocks

Use the existing component:

```mdx
import AIPracticeComponent from '@site/src/components/AIPracticeComponent';

<AIPracticeComponent topic="…" level="A1" taskType="roleplay|speaking|writing|reading|listening" prompt={`…`} />
```

Rules:
- Normally **one** AI practice per chapter, placed after the guided practice.
- The prompt states: persona/scenario, opening line, the **learning objective**, the expected learner
  language, the correction rules (feedback shape + mandatory repeat), and A1 constraints (short German turns,
  English explanations).
- Medical/administrative prompts follow the safety rules in `teaching-methodology.md` §8.
- Do not ask the AI to predict exam scores.

## 7. Copyright and originality

Allowed: exam-like structure, original texts, original prompts, source-alignment notes.
Not allowed: copying official Goethe/telc task texts or transcripts, redistributing official audio, copying
textbook exercises or third-party lesson scripts/worksheets. Third-party courses (e.g. Learn German Original,
DW Nicos Weg, Menschen, Netzwerk) may inspire sequencing only.
