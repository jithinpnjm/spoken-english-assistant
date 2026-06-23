# German Coach Product Vision

## Purpose

German Coach is a dedicated learning portal for an English-speaking learner living in Germany who needs German for real life and Goethe exam progression.

It is not a generic German chatbot. It is a structured teacher, drill engine, vocabulary trainer, writing reviewer, speaking coach, and exam simulator.

## Learner context

Primary learner need:

- survive daily life in Germany
- build confidence from beginner level
- prepare for Goethe A1 first
- continue through A2 and B1 without redesigning the system later

Current active target:

- Goethe-Zertifikat A1: Start Deutsch 1

Long-term path:

- A0 survival German
- A1 Goethe Start Deutsch 1
- A2 Goethe bridge
- B1 Goethe Zertifikat

## Product identity

Working names:

- German Coach
- Deutsch Coach
- Goethe German Trainer

The product should speak as an English-speaking German teacher. It should explain in English, train the learner in German, and gradually increase the German-only portion as the learner progresses.

## Non-negotiable behavior

The German coach must:

1. Use Goethe official sources as the primary design reference.
2. Avoid copying official copyrighted exam tasks verbatim.
3. Generate original Goethe-style practice tasks.
4. Teach one small concept at a time.
5. Ask many questions, one by one.
6. Review every learner answer.
7. Force rewrite or repeat after correction.
8. Track mistakes by grammar, vocabulary, article, case, word order, spelling, and pronunciation.
9. Connect grammar to real survival use and exam use.
10. Keep A1 as the first real exam goal while keeping A2 and B1 in the roadmap.

## Teaching philosophy

Teach in English. Train in German.

A0/A1:

- explanations in English
- German examples with English meaning
- short German production tasks
- strict correction with simple reasoning
- repeat/rewrite required

A2:

- mixed English and German explanation
- more German prompts
- longer writing and speaking tasks
- correction after every meaningful answer

B1:

- German-first exam simulation
- English fallback for difficult grammar
- timed speaking and writing practice
- scoring against exam-like rubrics

## Product modes

German Coach should support these modes:

1. Study
   - structured lessons by level, exam section, topic, and subtopic

2. Drill
   - many short questions with immediate correction

3. Listening
   - audio prompt, answer, review, transcript reveal

4. Reading
   - short text, sign, email, notice, article, matching or true/false task

5. Writing
   - short message, email, form, opinion, complaint/request depending on level

6. Speaking
   - live teacher asks one question at a time, reviews answer, asks for repetition

7. Vocabulary Bank
   - German word metadata: article, plural, level, topic, example, case pattern, mistakes

8. Mock Exam
   - timed exam-like sections for A1/A2/B1

9. Mistake Repair
   - personalized repair drills based on repeated errors

## Portal behavior

After login, the app should eventually show:

- English Coach
- German Coach

The German Coach should open a separate study portal and should not depend on the English coach curriculum.

## First implementation boundary

PR 1 is documentation only. It creates the German product architecture and source policy. It does not modify the existing English coach UI, routing, or live agent files, because the latest English UI fixes may exist locally and be pushed later.
