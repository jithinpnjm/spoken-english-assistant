# Topic Sequencing Plan

## Purpose

German Coach already uses an exam-section-first model. That is still correct for Goethe preparation. However, the learner also needs a natural topic-by-topic learning path.

This document adds a second navigation model:

```text
1. Exam section view
2. Ordered learning path view
```

## Why add ordered learning path

A learner should not need to manually decide whether to study greetings, sentence structure, articles, cases, time, family, or daily-life topics first.

The app should recommend the next topic in a logical order:

```text
foundation phrase
  -> sentence building
  -> core grammar
  -> daily-life topics
  -> exam writing/speaking/listening/reading
```

## Navigation design

### Existing view: Exam section view

```text
A1
  Hören
  Lesen
  Schreiben
  Sprechen
  Wortschatz
  Grammatik
  Mini Mock Exam
```

### New view: Ordered path view

```text
A1 Ordered Path
  1. Greetings
  2. Common phrases
  3. Numbers
  4. Alphabet
  5. Introducing yourself
  6. Sentence structure
  7. Pronouns
  8. haben / sein
  9. articles
  10. time
  ...
```

## Data-model change required

Each German subtopic should gain optional sequencing metadata:

```ts
sequence?: number;
pathGroup?: "foundation" | "grammar" | "survival" | "exam" | "vocabulary";
sourceInspiredBy?: "learn-german-original" | "goethe" | "custom-survival";
```

## UI change required

German Coach should eventually add a toggle:

```text
View by:
[Exam Sections] [Ordered Path]
```

## A0 / early A1 ordered path

```text
1. Greetings
2. Common phrases
3. Alphabet and spelling
4. Numbers 1-20
5. Numbers 20-100
6. Numbers above 100
7. Introducing yourself
8. Getting to know someone
9. Wie geht's?
10. Sentence structure part 1
11. Sentence structure part 2
12. Pronouns
13. haben and sein
14. regular verbs
15. irregular verbs
16. definite articles
17. indefinite articles
18. negative articles
19. official time
20. informal time
21. family
22. W-questions
```

## A1 survival and Goethe ordered path

```text
1. Accusative articles
2. possessive pronouns accusative
3. modal verb möchten
4. restaurant/cafe ordering
5. personal pronouns accusative
6. dative articles introduction
7. ordinal numbers
8. questions of time
9. possessive pronouns dative
10. personal pronouns dative
11. separable verbs
12. daily routine
13. imperative sentences
14. giving directions
15. war / hatte
16. non-separable verbs
17. health
18. Perfekt sentence structure
19. Perfekt with haben/sein
20. Perfekt forms
21. vacation narration
22. supermarket
23. weather
24. fixing appointments
25. invitation writing
26. likes and dislikes
27. welch-
28. dies-
29. buying clothes
30. taxi conversation
31. adverbs of time
32. telephone conversation
33. doctor appointment
34. hotel reservation writing
35. form filling
36. post office
37. bank
38. apartment search
39. train/bus ticket
```

## A2 ordered path

```text
1. A2 self introduction
2. character traits
3. dass clauses
4. weil and da clauses
5. adjective endings nominative
6. adjective endings accusative
7. adjective endings dative
8. wenn clauses
9. genitive case exposure
10. adjective endings genitive exposure
11. comparison part 1
12. comparison part 2
13. obwohl clauses
14. deshalb and trotzdem
15. werden
16. indirect questions
17. während and bevor
18. relative clauses nominative
19. relative clauses accusative
20. relative clauses dative
21. relative clauses genitive exposure
22. relative pronouns wer/was
23. indefinite pronouns
24. Präteritum modal verbs
25. Präteritum regular verbs
26. Präteritum irregular verbs
27. als clauses
28. childhood narration
29. advantages and disadvantages
30. infinitive with zu
31. infinitive without zu
32. past perfect tense
33. nachdem and seitdem
34. two-way prepositions
35. expressing assumptions
36. polite requests / Konjunktiv II
37. picture description
38. adjectives as nouns
39. passive voice part 1
40. passive voice part 2
41. recipe/instruction writing
```

## B1 ordered path

```text
1. reflexive verbs part 1
2. reflexive verbs part 2
3. reciprocal verbs
4. noun-verb combinations
5. lassen
6. passive with sich lassen
7. lassen with prefixes
8. weak nouns / n-declension
9. genitive prepositions
10. da-compounds part 1
11. da-compounds part 2
12. wo-compounds
13. indem / dadurch, dass
14. final clauses: damit / um zu
15. final clauses: ohne zu / ohne dass
16. final clauses: anstatt zu / anstatt dass
17. brauchen + zu
18. B1 planning task
19. B1 presentation task
20. B1 discussion task
21. B1 email writing
22. B1 opinion/discussion post
23. B1 mock exam
```

## What to improve beyond the reference website

German Coach should improve the sequence with:

1. Goethe exam mapping under every topic.
2. Living-in-Germany mapping under every topic.
3. Generated practice tasks, not passive video watching.
4. Answer review after every task.
5. Mistake tracking.
6. Vocabulary bank.
7. Live speaking correction.
8. Writing review.
9. Mini mock exams.
10. A1-first study plan for the learner.

## Implementation PR after this plan

Next implementation PR should:

- add `sequence`, `pathGroup`, and `sourceInspiredBy` to `GermanSubtopic`
- populate current registry topics with sequence metadata
- add an Ordered Path view in GermanCoachShell
- keep Exam Sections as default for Goethe users
