# A2 and B1 Detailed Exam Map

## Purpose

This document ensures A2 and B1 are not treated as shallow future placeholders. The German Coach must support the full path from A0 survival through A1, A2, and B1. A1 is the first active exam target, but A2 and B1 must already have enough structure to drive future implementation.

The app should eventually expose the same navigation model for all exam levels:

```text
Level
  -> Exam section
       -> Task family
            -> Grammar / vocabulary / strategy / practice subtopic
```

For example:

```text
B1
  Schreiben
    Opinion email
      connectors
      argument structure
      polite tone
      subordinate clauses
      rewrite practice
      timed exam task
```

## Source policy

Before implementing A2 or B1 exam simulators, the project must confirm the corresponding Goethe source map:

- official Goethe exam page
- Modellsatz
- Übungssatz / practice set
- Durchführungsbestimmungen if available
- writing/speaking scoring guidance if available
- audio/sample materials if available

The items below are an implementation blueprint. They must be cross-checked against official Goethe sources before being marked production-ready.

---

# A2 Goethe Bridge — Detailed Map

## A2 learner outcome

At A2, the learner should move from basic A1 survival to handling common daily situations with more independence. The learner should understand and produce connected but simple German about familiar topics: appointments, family, shopping, work, travel, housing, health, past experiences, plans, and simple problems.

A2 should prepare the learner for:

- A2-style reading and listening tasks
- longer but still simple writing tasks
- more spontaneous speaking
- the grammar foundation needed for B1

## A2 app sections

```text
A2
  Hören
  Lesen
  Schreiben
  Sprechen
  Wortschatz
  Grammatik
  Mini Mock Exam
  Mistake Repair
```

---

## A2 Hören

Goal:

- understand short to medium everyday audio
- identify key information, changes, reasons, times, places, and simple opinions
- handle phone messages, appointments, announcements, and short conversations

Task families:

1. Short announcements
2. Phone messages
3. Appointment changes
4. Simple conversations
5. Public transport / station announcements
6. Shopping / service conversations
7. Doctor / pharmacy conversations
8. Workplace basics
9. Listening for main idea
10. Listening for details

Subtopics:

- understanding time and date changes
- recognizing places and directions
- identifying speaker intention
- extracting names, numbers, prices, and appointments
- distinguishing past, present, and future references
- understanding polite requests
- recognizing problem and solution
- identifying who does what
- listening for reasons with weil / denn
- transcript review after attempt

Grammar attached to A2 Hören:

- Perfekt recognition
- modal verbs in context
- dative prepositions
- two-way prepositions in location contexts
- subordinate clauses with weil / dass / wenn
- separable verbs in spoken German
- time expressions

Vocabulary attached to A2 Hören:

- appointments
- transport
- doctor/pharmacy
- shopping and service
- workplace basics
- housing
- travel
- complaints and problems

Practice flow:

```text
1. Play audio without transcript.
2. Ask one or more questions.
3. Learner answers.
4. Review answer.
5. Reveal transcript.
6. Highlight useful phrases.
7. Add new words to vocabulary bank.
8. Replay key sentence and ask learner to repeat.
```

---

## A2 Lesen

Goal:

- understand short everyday texts and notices
- identify relevant information quickly
- read simple instructions, advertisements, emails, and public information

Task families:

1. Short emails
2. Notices and signs
3. Apartment ads
4. Travel information
5. Workplace messages
6. Simple articles
7. Instructions
8. Matching tasks
9. True/false tasks
10. Multiple-choice reading

Subtopics:

- reading for gist
- reading for detail
- matching need to advertisement
- understanding instructions
- identifying dates and deadlines
- recognizing formal vs informal tone
- understanding reason and consequence
- extracting key information from longer text
- identifying opinion vs fact

Grammar attached to A2 Lesen:

- Perfekt in written text
- dative and accusative objects
- prepositions with place and movement
- subordinate clauses
- comparatives and superlatives
- reflexive verbs
- adjective endings introduction

Vocabulary attached to A2 Lesen:

- housing
- work
- travel
- education
- appointments
- public services
- family and daily life
- health

Practice flow:

```text
1. Show short text.
2. Ask exam-style question.
3. Learner answers.
4. Review keywords.
5. Explain distractors.
6. Extract vocabulary.
7. Ask learner to summarize one sentence in simple German.
```

---

## A2 Schreiben

Goal:

- write short connected messages and emails
- explain simple problems
- request information
- reschedule or cancel appointments
- use polite but simple language

Task families:

1. Semi-formal email
2. Request information
3. Appointment reschedule
4. Explain a problem
5. Thank-you message
6. Invitation / reply
7. Complaint basics
8. Travel or accommodation message
9. Work absence / appointment message
10. Simple opinion paragraph

Subtopics:

- email greeting and closing
- formal vs informal address: du / Sie
- saying why you write
- giving a reason
- asking for information
- asking for a new appointment
- explaining a problem
- using polite modal verbs
- ordering sentences logically
- checking word order
- correcting article/case errors

Grammar attached to A2 Schreiben:

- Perfekt for past events
- modal verbs
- weil / dass clauses
- dative after helfen, danken, gefallen
- accusative after haben, brauchen, kaufen, suchen
- prepositions: mit, zu, bei, nach, in, an, auf
- word order in main and subordinate clauses
- separable verbs
- comparative structures

Vocabulary attached to A2 Schreiben:

- appointment and rescheduling
- problem explanation
- work and absence
- health
- travel and hotel
- housing
- services and support
- polite phrases

Writing review criteria:

- task completion
- clarity
- grammar correctness
- verb position
- case/article correctness
- vocabulary fit
- politeness/register
- spelling and capitalization
- naturalness

Practice flow:

```text
1. Show writing prompt.
2. Learner writes answer.
3. Score out of 100.
4. Show corrected version.
5. Explain mistakes in English.
6. Require rewrite.
7. Store repeated mistakes.
```

---

## A2 Sprechen

Goal:

- answer everyday questions with more detail than A1
- describe past events
- explain problems
- make plans
- compare options
- ask follow-up questions

Task families:

1. Personal interview
2. Describe daily routine
3. Describe past event
4. Explain a problem
5. Make plans
6. Compare two options
7. Roleplay appointment/service situation
8. Ask and answer follow-up questions
9. Picture or situation description
10. Short opinion

Subtopics:

- answering in full sentences
- using Perfekt when talking about yesterday/last week
- using weil to give reasons
- asking polite questions
- agreeing and disagreeing simply
- asking for repetition or clarification
- using time markers
- describing sequence: zuerst, dann, danach
- repairing mistakes while speaking

Grammar attached to A2 Sprechen:

- Perfekt speaking patterns
- modal verbs
- weil word order
- dative/accusative basics
- separable verbs
- comparative forms
- reflexive verbs

Vocabulary attached to A2 Sprechen:

- family and work
- daily life
- appointments
- travel
- shopping
- health
- problems and solutions
- opinions

Live teacher flow:

```text
Teacher asks one German question.
Learner answers by voice.
System transcribes answer.
Teacher corrects in English.
Teacher gives corrected German model.
Learner repeats.
Teacher asks next question only after repeat.
```

---

## A2 Wortschatz

Vocabulary groups:

- daily routine
- work and office
- housing
- travel
- doctor and health
- shopping and services
- appointments
- family and relationships
- education and learning
- weather and environment
- problems and solutions
- opinions and preferences

Each word should store:

- German word
- article/gender if noun
- plural
- English meaning
- level
- topic
- example sentence
- case pattern if relevant
- exam sections where useful
- mistake count
- review due date

---

## A2 Grammatik

Required grammar groups:

1. Perfekt
   - haben / sein auxiliary
   - regular participles
   - irregular participles
   - separable verb participles

2. Präteritum basics
   - war
   - hatte
   - es gab

3. Dative basics
   - dem / der / dem / den
   - mit, zu, bei, nach, aus, von
   - common dative verbs

4. Two-way prepositions
   - in, an, auf, unter, über, vor, hinter, neben, zwischen
   - location vs movement

5. Subordinate clauses
   - weil
   - dass
   - wenn

6. Word order
   - verb second
   - verb final in subordinate clause
   - time-manner-place introduction

7. Comparative/superlative
   - größer, kleiner, besser
   - am besten

8. Reflexive verbs
   - sich interessieren
   - sich freuen
   - sich treffen

9. Adjective endings introduction
   - basic recognition
   - simple production in common phrases

---

## A2 Mini Mock Exam

Sections:

- Hören
- Lesen
- Schreiben
- Sprechen

Output:

- section score
- overall readiness estimate
- weak grammar points
- weak vocabulary areas
- next 7-day repair plan

---

# B1 Goethe Zertifikat — Detailed Map

## B1 learner outcome

At B1, the learner should handle independent everyday German, express opinions, narrate experiences, understand common public/work/social texts, write connected emails or opinion texts, and speak in structured tasks.

B1 should prepare for:

- full Goethe B1 exam simulation
- daily life in Germany with independence
- work, apartment, appointments, school/Kita, administration, and social communication

## B1 app sections

```text
B1
  Lesen
  Hören
  Schreiben
  Sprechen
  Wortschatz
  Grammatik
  Full Mock Exam
  Weakness Repair
```

---

## B1 Lesen

Goal:

- understand longer everyday texts
- identify main idea, details, opinions, and purpose
- scan for relevant information under time pressure

Task families:

1. Matching notices/ads to situations
2. Reading short articles
3. Understanding forum posts
4. Recognizing opinions
5. Multiple-choice detail questions
6. True/false style comprehension
7. Headline or title matching
8. Selective reading for practical information
9. Reading for argument structure
10. Exam timing practice

Subtopics:

- global reading
- selective reading
- detailed reading
- identifying topic and purpose
- separating fact from opinion
- recognizing connectors
- handling unknown words
- scanning ads and notices
- comparing options
- avoiding distractors

Grammar attached to B1 Lesen:

- relative clauses recognition
- passive recognition
- Konjunktiv II recognition
- subordinate clauses
- connectors: obwohl, trotzdem, deshalb, deswegen, außerdem
- adjective endings recognition
- nominalization recognition

Vocabulary attached to B1 Lesen:

- work and career
- housing and moving
- education
- health
- insurance/appointments/administration
- environment
- technology
- travel
- social life
- opinions and arguments

Practice flow:

```text
1. Show text.
2. Ask exam-style question.
3. Learner answers.
4. Review correct keywords.
5. Explain distractors.
6. Extract useful vocabulary.
7. Ask learner for a one-sentence German summary.
```

---

## B1 Hören

Goal:

- understand natural but clear spoken German in everyday contexts
- identify detailed information, opinions, and intent
- handle announcements, conversations, and radio-style information

Task families:

1. Public announcements
2. Service conversations
3. Workplace conversations
4. Phone calls
5. Radio-style information
6. Opinion listening
7. Detail extraction
8. Matching statements to speakers
9. True/false or multiple choice
10. Timed listening practice

Subtopics:

- listening for main idea
- listening for detail
- identifying opinion
- recognizing speaker attitude
- understanding changes of plan
- extracting dates, numbers, prices, places
- dealing with speed
- note-taking
- transcript review
- replay and repeat

Grammar attached to B1 Hören:

- subordinate clause recognition
- Konjunktiv II for polite suggestions
- passive recognition
- connectors in spoken German
- modal particles exposure
- prepositional verbs

Vocabulary attached to B1 Hören:

- public services
- appointments
- workplace
- housing
- travel
- health
- consumer complaints
- social plans
- opinions and preferences

Practice flow:

```text
1. Play audio without transcript.
2. Learner answers.
3. Review answer.
4. Replay important part.
5. Reveal transcript.
6. Highlight useful phrases.
7. Ask learner to repeat key sentence.
```

---

## B1 Schreiben

Goal:

- write connected messages and emails
- explain a situation clearly
- make requests or complaints
- express opinions with reasons
- use appropriate tone and structure

Task families:

1. Informal email
2. Semi-formal email
3. Request
4. Complaint
5. Opinion text
6. Experience report
7. Advice or recommendation
8. Apology and explanation
9. Invitation / reply
10. Argument paragraph

Subtopics:

- planning before writing
- opening and closing
- formal vs informal register
- stating the reason for writing
- giving background
- explaining a problem
- requesting action
- giving opinion
- adding reasons and examples
- using connectors
- paragraph structure
- final check checklist

Grammar attached to B1 Schreiben:

- subordinate clauses with weil / dass / obwohl / wenn / als
- connectors: deshalb, deswegen, trotzdem, außerdem, zuerst, danach, zum Schluss
- Konjunktiv II: ich würde, könnten Sie, ich hätte gern
- relative clauses basics
- passive basics
- adjective endings
- prepositional verbs
- formal register with Sie

Vocabulary attached to B1 Schreiben:

- complaint language
- request language
- opinion phrases
- agreement/disagreement
- work
- housing
- health
- public administration
- school/Kita/family
- travel and service problems

Writing review criteria:

- task completion
- structure
- clarity
- grammar
- word order
- article/case
- vocabulary
- connectors
- register
- spelling/capitalization
- exam suitability

Practice flow:

```text
1. Show B1-style prompt.
2. Learner writes answer.
3. Score answer.
4. Show corrected version.
5. Show mistake table.
6. Show better natural version.
7. Require rewrite.
8. Store weak points.
```

---

## B1 Sprechen

Goal:

- speak independently in structured exam tasks
- plan something with a partner/agent
- present a topic
- answer follow-up questions
- give opinions and reasons

Task families:

1. Teil 1: Gemeinsam etwas planen
2. Teil 2: Presentation / short talk
3. Teil 3: Questions and discussion
4. Warm-up personal questions
5. Describe experience
6. Give opinion
7. Compare options
8. Agree/disagree politely
9. Repair communication breakdown
10. Fluency and pronunciation drills

### B1 Sprechen Teil 1: Gemeinsam etwas planen

Subtopics:

- making suggestions
- accepting suggestions
- rejecting politely
- asking for opinion
- agreeing on time/place
- dividing tasks
- summarizing the plan

Useful patterns:

- Was hältst du davon?
- Ich schlage vor, dass ...
- Wir könnten ...
- Das ist eine gute Idee.
- Ich bin nicht sicher, ob ...
- Dann machen wir es so.

Grammar support:

- Konjunktiv II: könnten, würden
- dass clauses
- modal verbs
- word order in suggestions

### B1 Sprechen Teil 2: Presentation / short talk

Subtopics:

- introduction
- describe situation
- give personal experience
- advantages/disadvantages
- opinion with reasons
- conclusion

Useful patterns:

- Ich möchte über ... sprechen.
- Zuerst möchte ich sagen, dass ...
- Ein Vorteil ist ...
- Ein Nachteil ist ...
- Meiner Meinung nach ...
- Zusammenfassend kann man sagen, dass ...

Grammar support:

- connectors
- subordinate clauses
- adjective endings
- comparative forms

### B1 Sprechen Teil 3: Questions and discussion

Subtopics:

- answering follow-up questions
- asking clarification
- giving examples
- defending opinion
- softening disagreement
- repairing grammar while speaking

Useful patterns:

- Könnten Sie die Frage bitte wiederholen?
- Ich meine, dass ...
- Zum Beispiel ...
- Das sehe ich anders, weil ...
- Ich bin teilweise einverstanden.

Live teacher flow:

```text
Teacher gives task.
Learner answers by voice.
System transcribes.
Teacher reviews grammar, vocabulary, word order, pronunciation, and fluency.
Teacher gives corrected model.
Learner repeats.
Teacher asks exam-style follow-up.
```

---

## B1 Wortschatz

Vocabulary groups:

- work and profession
- applications and interviews
- housing and moving
- public administration
- insurance and appointments
- health and doctor
- family and school/Kita
- travel and transport
- environment
- technology and media
- education and learning
- opinions and arguments
- complaints and requests
- social relationships

Each vocabulary item should include:

- German word
- article/gender
- plural
- English meaning
- B1 example sentence
- useful collocations
- case/preposition pattern
- exam sections where useful
- mistake count
- review schedule

---

## B1 Grammatik

Required grammar groups:

1. Subordinate clauses
   - weil
   - dass
   - wenn
   - als
   - obwohl
   - damit exposure

2. Connectors
   - deshalb
   - deswegen
   - trotzdem
   - außerdem
   - zuerst / dann / danach / schließlich

3. Konjunktiv II basics
   - würde + infinitive
   - könnte
   - sollte
   - hätte
   - wäre

4. Relative clauses
   - der / die / das recognition and basic production

5. Passive basics
   - wird + Partizip II
   - common public/service contexts

6. Adjective endings
   - after definite article
   - after indefinite article
   - common high-frequency patterns

7. Prepositional verbs
   - warten auf
   - sich interessieren für
   - sprechen über
   - teilnehmen an

8. Nominalization exposure
   - Anmeldung
   - Bewerbung
   - Entscheidung
   - Erfahrung

9. Register
   - formal Sie
   - informal du
   - polite requests
   - complaint tone

10. Error repair
   - article/case repair
   - word order repair
   - connector repair
   - verb tense repair

---

## B1 Full Mock Exam

Sections:

- Lesen
- Hören
- Schreiben
- Sprechen

Output:

- score by section
- pass/fail readiness estimate
- grammar weakness report
- vocabulary weakness report
- speaking fluency notes
- writing structure notes
- next 14-day repair plan

---

## B1 Weakness Repair

Weakness categories:

- articles and gender
- accusative/dative
- word order
- subordinate clauses
- connectors
- verb conjugation
- Perfekt/Präteritum
- adjective endings
- prepositions
- vocabulary precision
- formal/informal register
- speaking fluency
- pronunciation

Repair flow:

```text
1. Identify repeated mistake.
2. Explain rule in English.
3. Show German pattern.
4. Ask 10 targeted questions.
5. Require rewrite/repeat.
6. Retest after delay.
```

---

# Implementation implication

A2 and B1 must not be placeholder levels. They should be implemented with the same lesson object structure as A1:

```ts
GermanLesson {
  level,
  section,
  moduleId,
  subtopicId,
  survivalRelevance,
  goetheRelevance,
  grammarFocus,
  vocabularyTags,
  taskFamilies,
  studyGuide,
  drills,
  writingPrompt,
  speakingPrompt,
  listeningPrompt,
  reviewRubric,
  examSimulationMode
}
```

The app should be able to render A2 and B1 exactly like A1:

```text
Select level
  -> select section
       -> select subtopic
            -> learn
            -> drill
            -> write
            -> speak
            -> mock exam
            -> review mistakes
```
