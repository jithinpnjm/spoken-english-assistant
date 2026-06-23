# German Coach Portal and Learning Flow

## Login flow

Future routing should be:

```text
Login
  -> Portal selector
       English Coach
       German Coach
  -> Selected learning portal
```

PR 1 does not implement routing. It only defines the target behavior so future PRs can add the selector safely after local English UI fixes are pushed.

## German portal home

The German portal should show:

```text
Deutsch Coach
Current goal: Goethe A1
Long-term path: A1 -> A2 -> B1
Survival goal: Living in Germany
```

Main cards:

- Continue lesson
- Today's drill
- Vocabulary due
- Writing practice
- Listening practice
- Speaking live session
- Mock exam
- Mistake repair

## Level-first navigation

The learner chooses:

```text
A0 Survival
A1 Goethe
A2 Bridge
B1 Goethe
```

After selecting a level, the first visible categories should be sections:

```text
Hören
Lesen
Schreiben
Sprechen
Wortschatz
Grammatik
Mock Exam
```

For A0, the sections are survival-oriented:

```text
Survival Speaking
Numbers and Daily Basics
Public Life
German Sounds
```

## Section-to-subtopic navigation

Example:

```text
A1
  Schreiben
    Fill form
    Short message
    Appointment cancellation
    Invitation reply
    Sick message
    Time expressions
    Days/months/dates
    Word order
    Accusative basics
    Modal verbs
```

Every subtopic card should show:

- time spent
- completion percentage
- last score
- weak points
- next due review
- buttons: Continue, Practice again, Mock exam task

## Lesson flow

Each subtopic should support this loop:

```text
1. Learn
   English explanation with German examples.

2. Guided drill
   One question at a time.

3. Answer
   Learner writes or speaks German.

4. Review
   System checks answer.

5. Rewrite or repeat
   Learner must produce corrected German.

6. Save mistake
   Mistakes go to the vocabulary/grammar repair bank.

7. Progress
   Completion and time spent update.
```

## Live teacher flow

The live assistant should not run open-ended chat by default. It should act like a teacher.

Flow:

```text
Teacher asks one German question.
Learner answers by voice.
System transcribes learner answer.
Teacher reviews in English.
Teacher gives corrected German model.
Learner repeats corrected sentence.
Only then teacher continues.
```

A0/A1 live policy:

- slow German
- English explanations
- one question at a time
- strict repeat after correction

A2 live policy:

- more German prompts
- English grammar explanations when needed
- longer answers

B1 live policy:

- Goethe-style speaking tasks
- German-first simulation
- English fallback only for hard grammar explanation

## Chat/task window behavior

The German portal should show many structured questions, not only a blank chat input.

Task examples:

- Fill the blank
- Build the sentence
- Translate to German
- Answer the German question
- Rewrite corrected sentence
- Write a short message
- Listen and answer
- Speak and repeat

Every task should have:

- prompt
- answer input
- review output
- corrected version
- rewrite/repeat requirement

## Writing practice flow

For writing:

```text
Prompt
  -> learner writes answer
  -> review task completion
  -> corrected version
  -> mistake table
  -> natural version
  -> rewrite required
```

A1 writing examples:

- fill personal form
- short message to teacher
- sick message
- appointment cancellation
- invitation reply

A2 writing examples:

- request information
- reschedule appointment
- explain a problem
- short semi-formal email

B1 writing examples:

- informal email
- semi-formal email
- complaint
- request
- opinion text

## Listening practice flow

For listening:

```text
Audio prompt
  -> learner answers
  -> review
  -> transcript reveal
  -> vocabulary extraction
  -> replay and repeat
```

At A1, audio should be short and slow. At B1, it should become more natural and timed.

## Progress model

Track:

- level progress
- section progress
- subtopic progress
- time spent
- scores
- mistake frequency
- vocabulary due
- mock exam history

## Implementation caution

Do not modify the active English coach UI in PR 1. The user has local Claude changes that may be pushed later. German PR 1 stays docs-only and conflict-safe.
