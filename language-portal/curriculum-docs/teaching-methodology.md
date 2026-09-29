# Teaching Methodology

## 1. Who we teach

An English-speaking adult who **lives in Germany** and needs German now (appointments, shopping,
transport, doctor, Kita, work, housing, offices) and who also wants to pass Goethe exams:

- first real exam target: **Goethe-Zertifikat A1: Start Deutsch 1**
- then Goethe-Zertifikat A2 (daily independence)
- long-term: Goethe-Zertifikat B1 (the level commonly asked for in work and residence contexts – always check current official requirements before giving any legal/residence statement)

The course is **not** a generic chatbot and not an encyclopedia. It behaves like a structured,
patient, strict-but-kind teacher: explains, drills, reviews, corrects, and makes the learner try again.

## 2. Teach in English, train in German

| Level | Explanations | Practice prompts | Corrections | Learner output |
| :--- | :--- | :--- | :--- | :--- |
| A0 (survival layer) | English | Very short German phrases | English reason + German model | Memorised phrases, simple answers |
| A1 | English | German | English reason + German model | Short sentences; repeat/rewrite in German |
| A2 | English/German mix | German | English for grammar, German model answers | Longer answers, connected sentences |
| B1 | Mostly German, English fallback for hard grammar | German-first, exam-style | German model + short English grammar note | Structured speaking and writing |

A0 is not an exam level. It is the "first weeks in Germany" layer: phrase-first, grammar only when needed.
In the portal it is delivered as the Survival Kit chapter plus the early chapters of Volume 1 and the
repair-phrase chapters of Volume 9 (see `docs/german/course-guide/learning-path.mdx`).

## 3. What one lesson must answer

1. What is this?
2. Why do I need it (in Germany)?
3. How does it work – and **why** does the rule exist?
4. What is the reusable pattern?
5. What does it look like in real German (with English meaning)?
6. How do I produce it myself?
7. Where will I use it in Germany?
8. How might it appear in an exam? (only where genuinely relevant)

Practice moves through: **recognition → guided choice → controlled production → independent production → real-life application.**

## 4. The lesson loop

```text
Learn        English explanation with German examples
Guided drill one question at a time
Answer       learner writes or speaks German
Review       check the answer
Rewrite      learner produces the corrected German (mandatory)
Save mistake the mistake type is noted for later repair
Progress     move on only after the corrected version is produced
```

## 5. The correction loop (core product behaviour, not decoration)

```text
learner answer → identify error → explain simply (English at A0/A1) → corrected German
→ learner rewrites / repeats the corrected sentence → only then continue
```

Feedback shape used by every AI practice block and every "check your answer" explanation:

```text
Result: Correct / Almost correct / Needs correction
Corrected German:
English explanation:          (one or two sentences, beginner vocabulary)
Mistake focus:                (see categories below)
Now repeat / rewrite:         (the full corrected sentence)
```

Canonical example:

```text
Learner: Ich habe ein Termin.
Result: Almost correct.
Corrected German: Ich habe einen Termin.
English explanation: Termin is masculine (der Termin). After "haben" the object is accusative, so "ein" becomes "einen".
Mistake focus: article + accusative.
Now repeat: Ich habe einen Termin.
```

A task is **not complete** until the learner has produced the corrected version.

### Writing feedback adds
- were all task points answered? (content points first – this is also how Goethe scores short texts)
- corrected version, main mistakes, a more natural version, rewrite instruction, one exam tip

### Speaking feedback adds
- corrected sentence, one pronunciation cue, one grammar note, "repeat the full sentence"

## 6. Mistake categories (for tracking and repair)

article/gender · case (nominative/accusative/dative; genitive exposure) · verb conjugation · tense ·
modal verb · word order (V2, verb bracket, verb-final) · subordinate clause · preposition ·
adjective ending · vocabulary choice · spelling · capitalisation · register (du/Sie) · pronunciation.

### Repair loop for a repeated mistake

```text
explain the rule in English → show the German pattern → 5–10 targeted drills
→ require rewrite/repeat → retest later (spaced)
```

The most frequent A1 repairs are collected in `docs/german/parallel-systems/progress-dashboard.mdx`
("Mistake Log & Repair").

## 7. Practice formats we use

fill the blank · choose the form · build the sentence (scrambled words) · translate to German ·
answer one German question · correct the sentence · rewrite the corrected sentence · write a short
message (with task points) · listen/read and answer (transcript/solution revealed only after the attempt) ·
speak and repeat · timed exam-style task · mistake-repair drill.

Listening flow: prompt without transcript → answer → review → transcript reveal → extract useful phrases →
repeat one key sentence. Reading flow: short text → exam-style question → review keywords → explain distractors →
extract vocabulary → one-sentence summary in simple German.

## 8. AI teacher contract

The AI in `AIPracticeComponent` and the global AI teacher act as **a teacher with a lesson objective**, not an open chat.

The AI must:
- state (or follow) one clear objective per practice block
- ask one question at a time and wait
- keep German turns short at A1 (1–2 sentences)
- review every learner turn using the feedback shape above
- require a repeat/rewrite after a correction before moving on
- explain in English at A0/A1

The AI must not:
- run open-ended chat by default or skip corrections
- overload a beginner with several rules at once
- explain only in German at A1
- mark a task complete without learner production
- copy official Goethe or textbook tasks
- predict exam scores or promise results (it may give a rough, clearly-labelled readiness indication)

### Safety: medical roleplays
The AI practises **communication**, not medicine. It may: ask about symptoms and duration, ask clarifying
questions, say it will examine the patient, give generic process language ("Ich schreibe Sie krank",
"Sie bekommen ein Rezept", "Die Dosierung steht auf der Packung / fragen Sie in der Apotheke").
It must not name a diagnosis, choose a drug or dose, or tell the learner what treatment they need.
If the learner describes an emergency, the AI steps out of the roleplay and points to 112.

### Safety: administrative / legal roleplays
Teach the language of the process (Termin, Formular, Nachweis, Frist, Aktenzeichen). Do not state
deadlines, fees, or legal consequences as current fact unless the chapter has verified them; phrase them as
"check the letter / ask the office". Rules that change (ticket prices, postage, fees, residence rules) are
described as examples, not as fixed facts.

## 9. Real-life Germany first, exam second

Every topic is anchored in a situation the learner will meet: bakery, supermarket, restaurant, doctor,
pharmacy, transport, station, appointment, phone call, Kita/school, work, Hausmeister/neighbours, apartment
search, rental problems, Anmeldung, Bürgeramt, bank, post office, insurance, forms, official letters.
Level-appropriateness: A0/A1 survival phrases and simple structured interaction; A2 explaining problems;
B1 nuanced/formal communication. Survival words may be promoted early even if they are not "exam-first"
(Termin, krank, Apotheke, Anmeldung, Ausweis, Versicherung, Kita, Rechnung, Haltestelle).
