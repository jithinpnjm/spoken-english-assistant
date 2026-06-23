# Sky English Coach Comprehensive Curriculum Skeleton

This review artifact expands the Sky curriculum from a shallow activity list into a granular course -> module -> subsection map suitable for backend-owned lesson cursors.

This skeleton is source-informed, not source-copied. It uses CEFR/Cambridge/English Profile-style sequencing and public exam/speaking-domain patterns as references, but all subsection names and future teaching content should be authored in original wording for Sky.

## Sources and design references

- CEFR level progression: A1/A2 basic user, B1/B2 independent user, C1/C2 proficient user.
- CEFR Companion Volume concept: language as social action, spoken production, spoken interaction, mediation, online interaction.
- Cambridge English progression: A2 Key -> B1 Preliminary -> B2 First -> C1 Advanced -> C2 Proficiency.
- English Profile / English Grammar Profile concept: grammar and vocabulary features mapped to CEFR levels.
- IELTS Life Skills-style everyday speaking domains: personal details, family, shopping, work, health, leisure, transport, housing, weather.
- Existing Sky product constraints: private spoken-English coach, Jithin/Sandra use case, workplace and daily-life focus, Gemini free tier, Cloud Run min-instances=0, no vector DB.

## Curriculum engineering rules

- Static version-controlled curriculum first; no runtime database editing.
- Stable IDs are mandatory because Firestore `LessonCursor` will point to `courseId/moduleId/subsectionId/phase`.
- Each subsection should be teachable in 5-15 minutes.
- Every subsection uses the default phase sequence unless overridden.
- The LLM must not choose the next topic; backend cursor logic does.
- Full teaching content should be authored module-by-module after this skeleton is reviewed.
- Pilot module for full content remains `b09-past-tense-pilot`.

## Default phases

```text
intro -> model -> controlled_practice -> correction -> repeat -> free_practice -> summary
```

## Curriculum statistics

- Courses: 3
- Modules: 36
- Subsections: 338

---

## Course `beginner-a1-a2-spoken-foundations` — Beginner Spoken Foundations (A1-A2)

Level band: `Beginner`

### Module `b01-sound-pronunciation-core` — Sound Pronunciation Core

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `b01-sound-pronunciation-core-01` | English alphabet and spelling aloud | none |
| 2 | `b01-sound-pronunciation-core-02` | Vowel sounds that change meaning | `b01-sound-pronunciation-core-01` |
| 3 | `b01-sound-pronunciation-core-03` | Consonant sounds: v/w, p/f, t/d | `b01-sound-pronunciation-core-02` |
| 4 | `b01-sound-pronunciation-core-04` | Word stress in common words | `b01-sound-pronunciation-core-03` |
| 5 | `b01-sound-pronunciation-core-05` | Sentence stress basics | `b01-sound-pronunciation-core-04` |
| 6 | `b01-sound-pronunciation-core-06` | Intonation for yes/no questions | `b01-sound-pronunciation-core-05` |
| 7 | `b01-sound-pronunciation-core-07` | Intonation for wh- questions | `b01-sound-pronunciation-core-06` |
| 8 | `b01-sound-pronunciation-core-08` | Listening and repeating short chunks | `b01-sound-pronunciation-core-07` |

### Module `b02-classroom-and-learning-language` — Classroom And Learning Language

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `b02-classroom-and-learning-language-01` | Saying you don't understand | none |
| 2 | `b02-classroom-and-learning-language-02` | Asking the teacher to repeat | `b02-classroom-and-learning-language-01` |
| 3 | `b02-classroom-and-learning-language-03` | Asking how to say a word | `b02-classroom-and-learning-language-02` |
| 4 | `b02-classroom-and-learning-language-04` | Asking for examples | `b02-classroom-and-learning-language-03` |
| 5 | `b02-classroom-and-learning-language-05` | Checking pronunciation | `b02-classroom-and-learning-language-04` |
| 6 | `b02-classroom-and-learning-language-06` | Saying you need more time | `b02-classroom-and-learning-language-05` |
| 7 | `b02-classroom-and-learning-language-07` | Giving a simple self-evaluation | `b02-classroom-and-learning-language-06` |
| 8 | `b02-classroom-and-learning-language-08` | Repeating and correcting yourself | `b02-classroom-and-learning-language-07` |

### Module `b03-be-verbs-and-identity` — Be Verbs And Identity

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `b03-be-verbs-and-identity-01` | I am / you are / he is | none |
| 2 | `b03-be-verbs-and-identity-02` | Names, jobs, and nationalities | `b03-be-verbs-and-identity-01` |
| 3 | `b03-be-verbs-and-identity-03` | Age and basic personal details | `b03-be-verbs-and-identity-02` |
| 4 | `b03-be-verbs-and-identity-04` | This is / these are | `b03-be-verbs-and-identity-03` |
| 5 | `b03-be-verbs-and-identity-05` | There is / there are | `b03-be-verbs-and-identity-04` |
| 6 | `b03-be-verbs-and-identity-06` | Be-verb negatives | `b03-be-verbs-and-identity-05` |
| 7 | `b03-be-verbs-and-identity-07` | Be-verb questions | `b03-be-verbs-and-identity-06` |
| 8 | `b03-be-verbs-and-identity-08` | Short answers with be | `b03-be-verbs-and-identity-07` |

### Module `b04-basic-sentence-order` — Basic Sentence Order

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `b04-basic-sentence-order-01` | Subject + verb + object | none |
| 2 | `b04-basic-sentence-order-02` | Adjectives before nouns | `b04-basic-sentence-order-01` |
| 3 | `b04-basic-sentence-order-03` | Adverbs in simple sentences | `b04-basic-sentence-order-02` |
| 4 | `b04-basic-sentence-order-04` | Making complete spoken sentences | `b04-basic-sentence-order-03` |
| 5 | `b04-basic-sentence-order-05` | Avoiding missing verbs | `b04-basic-sentence-order-04` |
| 6 | `b04-basic-sentence-order-06` | Avoiding word-by-word translation | `b04-basic-sentence-order-05` |
| 7 | `b04-basic-sentence-order-07` | Simple connectors: and, but | `b04-basic-sentence-order-06` |
| 8 | `b04-basic-sentence-order-08` | Basic sentence repair | `b04-basic-sentence-order-07` |

### Module `b05-present-simple-daily-life` — Present Simple Daily Life

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `b05-present-simple-daily-life-01` | Daily routines | none |
| 2 | `b05-present-simple-daily-life-02` | I/you/we/they present simple | `b05-present-simple-daily-life-01` |
| 3 | `b05-present-simple-daily-life-03` | He/she/it + s | `b05-present-simple-daily-life-02` |
| 4 | `b05-present-simple-daily-life-04` | Do/does questions | `b05-present-simple-daily-life-03` |
| 5 | `b05-present-simple-daily-life-05` | Do not / does not | `b05-present-simple-daily-life-04` |
| 6 | `b05-present-simple-daily-life-06` | Frequency adverbs | `b05-present-simple-daily-life-05` |
| 7 | `b05-present-simple-daily-life-07` | Workday routines | `b05-present-simple-daily-life-06` |
| 8 | `b05-present-simple-daily-life-08` | Family routines | `b05-present-simple-daily-life-07` |

### Module `b06-present-continuous` — Present Continuous

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `b06-present-continuous-01` | Actions happening now | none |
| 2 | `b06-present-continuous-02` | Am/is/are + verb-ing | `b06-present-continuous-01` |
| 3 | `b06-present-continuous-03` | Present continuous questions | `b06-present-continuous-02` |
| 4 | `b06-present-continuous-04` | Temporary actions | `b06-present-continuous-03` |
| 5 | `b06-present-continuous-05` | Today vs usually | `b06-present-continuous-04` |
| 6 | `b06-present-continuous-06` | Present simple vs present continuous | `b06-present-continuous-05` |
| 7 | `b06-present-continuous-07` | Describing what people are doing | `b06-present-continuous-06` |
| 8 | `b06-present-continuous-08` | Correction lab for -ing forms | `b06-present-continuous-07` |

### Module `b07-nouns-articles-quantity` — Nouns Articles Quantity

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `b07-nouns-articles-quantity-01` | A/an with singular nouns | none |
| 2 | `b07-nouns-articles-quantity-02` | The for specific things | `b07-nouns-articles-quantity-01` |
| 3 | `b07-nouns-articles-quantity-03` | Plural -s and -es | `b07-nouns-articles-quantity-02` |
| 4 | `b07-nouns-articles-quantity-04` | Countable vs uncountable nouns | `b07-nouns-articles-quantity-03` |
| 5 | `b07-nouns-articles-quantity-05` | Some and any | `b07-nouns-articles-quantity-04` |
| 6 | `b07-nouns-articles-quantity-06` | Much and many | `b07-nouns-articles-quantity-05` |
| 7 | `b07-nouns-articles-quantity-07` | This/that/these/those | `b07-nouns-articles-quantity-06` |
| 8 | `b07-nouns-articles-quantity-08` | Common article mistakes | `b07-nouns-articles-quantity-07` |

### Module `b08-basic-prepositions` — Basic Prepositions

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `b08-basic-prepositions-01` | In/on/at for place | none |
| 2 | `b08-basic-prepositions-02` | In/on/at for time | `b08-basic-prepositions-01` |
| 3 | `b08-basic-prepositions-03` | To/from/for | `b08-basic-prepositions-02` |
| 4 | `b08-basic-prepositions-04` | With/without | `b08-basic-prepositions-03` |
| 5 | `b08-basic-prepositions-05` | Near/next to/between | `b08-basic-prepositions-04` |
| 6 | `b08-basic-prepositions-06` | Prepositions in travel speech | `b08-basic-prepositions-05` |
| 7 | `b08-basic-prepositions-07` | Prepositions in work speech | `b08-basic-prepositions-06` |
| 8 | `b08-basic-prepositions-08` | Preposition correction lab | `b08-basic-prepositions-07` |

### Module `b09-past-tense-pilot` — Past Tense Pilot

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `b09-past-tense-pilot-01` | Was/were for past states | none |
| 2 | `b09-past-tense-pilot-02` | Regular past verbs | `b09-past-tense-pilot-01` |
| 3 | `b09-past-tense-pilot-03` | Common irregular past verbs | `b09-past-tense-pilot-02` |
| 4 | `b09-past-tense-pilot-04` | Past negative: did not + base verb | `b09-past-tense-pilot-03` |
| 5 | `b09-past-tense-pilot-05` | Past questions with did | `b09-past-tense-pilot-04` |
| 6 | `b09-past-tense-pilot-06` | Past time expressions | `b09-past-tense-pilot-05` |
| 7 | `b09-past-tense-pilot-07` | Past tense for work and travel | `b09-past-tense-pilot-06` |
| 8 | `b09-past-tense-pilot-08` | Yesterday story | `b09-past-tense-pilot-07` |
| 9 | `b09-past-tense-pilot-09` | Past-tense correction lab | `b09-past-tense-pilot-08` |
| 10 | `b09-past-tense-pilot-10` | Past-tense speaking checkpoint | `b09-past-tense-pilot-09` |

### Module `b10-future-basics` — Future Basics

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `b10-future-basics-01` | Going to for plans | none |
| 2 | `b10-future-basics-02` | Will for quick decisions | `b10-future-basics-01` |
| 3 | `b10-future-basics-03` | Want to / need to / have to | `b10-future-basics-02` |
| 4 | `b10-future-basics-04` | Tomorrow and next week | `b10-future-basics-03` |
| 5 | `b10-future-basics-05` | Future questions | `b10-future-basics-04` |
| 6 | `b10-future-basics-06` | Making simple appointments | `b10-future-basics-05` |
| 7 | `b10-future-basics-07` | Talking about weekend plans | `b10-future-basics-06` |
| 8 | `b10-future-basics-08` | Future tense correction lab | `b10-future-basics-07` |

### Module `b11-everyday-functions` — Everyday Functions

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `b11-everyday-functions-01` | Greetings and introductions | none |
| 2 | `b11-everyday-functions-02` | Asking for help | `b11-everyday-functions-01` |
| 3 | `b11-everyday-functions-03` | Asking for directions | `b11-everyday-functions-02` |
| 4 | `b11-everyday-functions-04` | Ordering food | `b11-everyday-functions-03` |
| 5 | `b11-everyday-functions-05` | Shopping and prices | `b11-everyday-functions-04` |
| 6 | `b11-everyday-functions-06` | Booking appointments | `b11-everyday-functions-05` |
| 7 | `b11-everyday-functions-07` | Talking to a doctor | `b11-everyday-functions-06` |
| 8 | `b11-everyday-functions-08` | Small talk basics | `b11-everyday-functions-07` |

### Module `b12-beginner-fluency` — Beginner Fluency

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `b12-beginner-fluency-01` | One-minute self-introduction | none |
| 2 | `b12-beginner-fluency-02` | Talking about family | `b12-beginner-fluency-01` |
| 3 | `b12-beginner-fluency-03` | Talking about home | `b12-beginner-fluency-02` |
| 4 | `b12-beginner-fluency-04` | Talking about work | `b12-beginner-fluency-03` |
| 5 | `b12-beginner-fluency-05` | Talking about food | `b12-beginner-fluency-04` |
| 6 | `b12-beginner-fluency-06` | Talking about travel | `b12-beginner-fluency-05` |
| 7 | `b12-beginner-fluency-07` | Talking about weather | `b12-beginner-fluency-06` |
| 8 | `b12-beginner-fluency-08` | Beginner fluency checkpoint | `b12-beginner-fluency-07` |

## Course `intermediate-b1-b2-confident-communication` — Confident Communication (B1-B2)

Level band: `Intermediate`

### Module `i01-tense-control` — Tense Control

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `i01-tense-control-01` | Past simple review | none |
| 2 | `i01-tense-control-02` | Past continuous for background | `i01-tense-control-01` |
| 3 | `i01-tense-control-03` | Present perfect for experience | `i01-tense-control-02` |
| 4 | `i01-tense-control-04` | Present perfect vs past simple | `i01-tense-control-03` |
| 5 | `i01-tense-control-05` | Present perfect with for/since | `i01-tense-control-04` |
| 6 | `i01-tense-control-06` | Past perfect basics | `i01-tense-control-05` |
| 7 | `i01-tense-control-07` | Future plans: going to/planning to | `i01-tense-control-06` |
| 8 | `i01-tense-control-08` | Future predictions: will/might | `i01-tense-control-07` |
| 9 | `i01-tense-control-09` | Mixed tense storytelling | `i01-tense-control-08` |
| 10 | `i01-tense-control-10` | Tense consistency checkpoint | `i01-tense-control-09` |

### Module `i02-questions-and-interaction` — Questions And Interaction

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `i02-questions-and-interaction-01` | Open-ended questions | none |
| 2 | `i02-questions-and-interaction-02` | Follow-up questions | `i02-questions-and-interaction-01` |
| 3 | `i02-questions-and-interaction-03` | Clarifying questions | `i02-questions-and-interaction-02` |
| 4 | `i02-questions-and-interaction-04` | Indirect questions | `i02-questions-and-interaction-03` |
| 5 | `i02-questions-and-interaction-05` | Question tags | `i02-questions-and-interaction-04` |
| 6 | `i02-questions-and-interaction-06` | Polite requests | `i02-questions-and-interaction-05` |
| 7 | `i02-questions-and-interaction-07` | Confirming understanding | `i02-questions-and-interaction-06` |
| 8 | `i02-questions-and-interaction-08` | Interrupting politely | `i02-questions-and-interaction-07` |
| 9 | `i02-questions-and-interaction-09` | Repairing misunderstanding | `i02-questions-and-interaction-08` |
| 10 | `i02-questions-and-interaction-10` | Conversation turn-taking | `i02-questions-and-interaction-09` |

### Module `i03-sentence-expansion` — Sentence Expansion

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `i03-sentence-expansion-01` | Because/so/but | none |
| 2 | `i03-sentence-expansion-02` | Although/however | `i03-sentence-expansion-01` |
| 3 | `i03-sentence-expansion-03` | Relative clauses: who/which/that | `i03-sentence-expansion-02` |
| 4 | `i03-sentence-expansion-04` | Giving reasons and examples | `i03-sentence-expansion-03` |
| 5 | `i03-sentence-expansion-05` | Comparing options | `i03-sentence-expansion-04` |
| 6 | `i03-sentence-expansion-06` | Adding contrast | `i03-sentence-expansion-05` |
| 7 | `i03-sentence-expansion-07` | Condition with if | `i03-sentence-expansion-06` |
| 8 | `i03-sentence-expansion-08` | Longer natural sentences | `i03-sentence-expansion-07` |
| 9 | `i03-sentence-expansion-09` | Avoiding run-on sentences | `i03-sentence-expansion-08` |
| 10 | `i03-sentence-expansion-10` | Sentence expansion checkpoint | `i03-sentence-expansion-09` |

### Module `i04-articles-determiners-precision` — Articles Determiners Precision

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `i04-articles-determiners-precision-01` | Specific vs general nouns | none |
| 2 | `i04-articles-determiners-precision-02` | Zero article | `i04-articles-determiners-precision-01` |
| 3 | `i04-articles-determiners-precision-03` | The with places | `i04-articles-determiners-precision-02` |
| 4 | `i04-articles-determiners-precision-04` | The with work and institutions | `i04-articles-determiners-precision-03` |
| 5 | `i04-articles-determiners-precision-05` | This/that/these/those | `i04-articles-determiners-precision-04` |
| 6 | `i04-articles-determiners-precision-06` | Each/every/all | `i04-articles-determiners-precision-05` |
| 7 | `i04-articles-determiners-precision-07` | Some/any/no | `i04-articles-determiners-precision-06` |
| 8 | `i04-articles-determiners-precision-08` | A few/few/a little/little | `i04-articles-determiners-precision-07` |
| 9 | `i04-articles-determiners-precision-09` | Article mistakes for Indian-English speakers | `i04-articles-determiners-precision-08` |
| 10 | `i04-articles-determiners-precision-10` | Article checkpoint | `i04-articles-determiners-precision-09` |

### Module `i05-preposition-patterns` — Preposition Patterns

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `i05-preposition-patterns-01` | Work prepositions | none |
| 2 | `i05-preposition-patterns-02` | Travel prepositions | `i05-preposition-patterns-01` |
| 3 | `i05-preposition-patterns-03` | Time prepositions in detail | `i05-preposition-patterns-02` |
| 4 | `i05-preposition-patterns-04` | Verb + preposition patterns | `i05-preposition-patterns-03` |
| 5 | `i05-preposition-patterns-05` | Adjective + preposition patterns | `i05-preposition-patterns-04` |
| 6 | `i05-preposition-patterns-06` | Noun + preposition patterns | `i05-preposition-patterns-05` |
| 7 | `i05-preposition-patterns-07` | Phrasal verbs: basic meaning | `i05-preposition-patterns-06` |
| 8 | `i05-preposition-patterns-08` | Phrasal verbs in work speech | `i05-preposition-patterns-07` |
| 9 | `i05-preposition-patterns-09` | Preposition correction lab | `i05-preposition-patterns-08` |
| 10 | `i05-preposition-patterns-10` | Preposition checkpoint | `i05-preposition-patterns-09` |

### Module `i06-modals-and-obligation` — Modals And Obligation

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `i06-modals-and-obligation-01` | Can/could for ability and permission | none |
| 2 | `i06-modals-and-obligation-02` | Should for advice | `i06-modals-and-obligation-01` |
| 3 | `i06-modals-and-obligation-03` | Must vs have to | `i06-modals-and-obligation-02` |
| 4 | `i06-modals-and-obligation-04` | Need to vs have to | `i06-modals-and-obligation-03` |
| 5 | `i06-modals-and-obligation-05` | May/might for possibility | `i06-modals-and-obligation-04` |
| 6 | `i06-modals-and-obligation-06` | Would for polite speech | `i06-modals-and-obligation-05` |
| 7 | `i06-modals-and-obligation-07` | Could you / Would you mind | `i06-modals-and-obligation-06` |
| 8 | `i06-modals-and-obligation-08` | Modals in workplace requests | `i06-modals-and-obligation-07` |
| 9 | `i06-modals-and-obligation-09` | Softening direct language | `i06-modals-and-obligation-08` |
| 10 | `i06-modals-and-obligation-10` | Modal checkpoint | `i06-modals-and-obligation-09` |

### Module `i07-workplace-english` — Workplace English

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `i07-workplace-english-01` | Daily standup update | none |
| 2 | `i07-workplace-english-02` | Explaining blockers | `i07-workplace-english-01` |
| 3 | `i07-workplace-english-03` | Status report | `i07-workplace-english-02` |
| 4 | `i07-workplace-english-04` | Asking for clarification | `i07-workplace-english-03` |
| 5 | `i07-workplace-english-05` | Polite disagreement | `i07-workplace-english-04` |
| 6 | `i07-workplace-english-06` | Giving an estimate | `i07-workplace-english-05` |
| 7 | `i07-workplace-english-07` | Explaining delay | `i07-workplace-english-06` |
| 8 | `i07-workplace-english-08` | Requesting support | `i07-workplace-english-07` |
| 9 | `i07-workplace-english-09` | Summarizing a meeting | `i07-workplace-english-08` |
| 10 | `i07-workplace-english-10` | Workplace speaking checkpoint | `i07-workplace-english-09` |

### Module `i08-real-life-roleplay` — Real Life Roleplay

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `i08-real-life-roleplay-01` | Restaurant problem | none |
| 2 | `i08-real-life-roleplay-02` | Hotel check-in | `i08-real-life-roleplay-01` |
| 3 | `i08-real-life-roleplay-03` | Doctor visit | `i08-real-life-roleplay-02` |
| 4 | `i08-real-life-roleplay-04` | Customer support call | `i08-real-life-roleplay-03` |
| 5 | `i08-real-life-roleplay-05` | Bank or official appointment | `i08-real-life-roleplay-04` |
| 6 | `i08-real-life-roleplay-06` | Apartment viewing | `i08-real-life-roleplay-05` |
| 7 | `i08-real-life-roleplay-07` | School/daycare conversation | `i08-real-life-roleplay-06` |
| 8 | `i08-real-life-roleplay-08` | Travel disruption | `i08-real-life-roleplay-07` |
| 9 | `i08-real-life-roleplay-09` | Complaint and resolution | `i08-real-life-roleplay-08` |
| 10 | `i08-real-life-roleplay-10` | Roleplay checkpoint | `i08-real-life-roleplay-09` |

### Module `i09-storytelling-and-fluency` — Storytelling And Fluency

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `i09-storytelling-and-fluency-01` | Sequence markers | none |
| 2 | `i09-storytelling-and-fluency-02` | Background vs main event | `i09-storytelling-and-fluency-01` |
| 3 | `i09-storytelling-and-fluency-03` | Explaining a problem | `i09-storytelling-and-fluency-02` |
| 4 | `i09-storytelling-and-fluency-04` | Describing a trip | `i09-storytelling-and-fluency-03` |
| 5 | `i09-storytelling-and-fluency-05` | Narrating a work incident | `i09-storytelling-and-fluency-04` |
| 6 | `i09-storytelling-and-fluency-06` | Using fillers less | `i09-storytelling-and-fluency-05` |
| 7 | `i09-storytelling-and-fluency-07` | Speaking in chunks | `i09-storytelling-and-fluency-06` |
| 8 | `i09-storytelling-and-fluency-08` | One-minute story | `i09-storytelling-and-fluency-07` |
| 9 | `i09-storytelling-and-fluency-09` | Two-minute personal experience | `i09-storytelling-and-fluency-08` |
| 10 | `i09-storytelling-and-fluency-10` | Fluency checkpoint | `i09-storytelling-and-fluency-09` |

### Module `i10-opinions-discussion` — Opinions Discussion

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `i10-opinions-discussion-01` | Giving simple opinions | none |
| 2 | `i10-opinions-discussion-02` | Agreeing and disagreeing | `i10-opinions-discussion-01` |
| 3 | `i10-opinions-discussion-03` | Giving pros and cons | `i10-opinions-discussion-02` |
| 4 | `i10-opinions-discussion-04` | Comparing choices | `i10-opinions-discussion-03` |
| 5 | `i10-opinions-discussion-05` | Explaining preferences | `i10-opinions-discussion-04` |
| 6 | `i10-opinions-discussion-06` | Making suggestions | `i10-opinions-discussion-05` |
| 7 | `i10-opinions-discussion-07` | Negotiating plans | `i10-opinions-discussion-06` |
| 8 | `i10-opinions-discussion-08` | Discussing news lightly | `i10-opinions-discussion-07` |
| 9 | `i10-opinions-discussion-09` | Defending an opinion | `i10-opinions-discussion-08` |
| 10 | `i10-opinions-discussion-10` | Discussion checkpoint | `i10-opinions-discussion-09` |

### Module `i11-vocabulary-collocations` — Vocabulary Collocations

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `i11-vocabulary-collocations-01` | Common verb-noun collocations | none |
| 2 | `i11-vocabulary-collocations-02` | Work collocations | `i11-vocabulary-collocations-01` |
| 3 | `i11-vocabulary-collocations-03` | Travel collocations | `i11-vocabulary-collocations-02` |
| 4 | `i11-vocabulary-collocations-04` | Health collocations | `i11-vocabulary-collocations-03` |
| 5 | `i11-vocabulary-collocations-05` | Money and shopping collocations | `i11-vocabulary-collocations-04` |
| 6 | `i11-vocabulary-collocations-06` | Make vs do | `i11-vocabulary-collocations-05` |
| 7 | `i11-vocabulary-collocations-07` | Say/tell/speak/talk | `i11-vocabulary-collocations-06` |
| 8 | `i11-vocabulary-collocations-08` | Get/take/have common uses | `i11-vocabulary-collocations-07` |
| 9 | `i11-vocabulary-collocations-09` | Vocabulary upgrade lab | `i11-vocabulary-collocations-08` |
| 10 | `i11-vocabulary-collocations-10` | Collocation checkpoint | `i11-vocabulary-collocations-09` |

### Module `i12-intermediate-review` — Intermediate Review

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `i12-intermediate-review-01` | Personal mistake map | none |
| 2 | `i12-intermediate-review-02` | Mixed grammar review | `i12-intermediate-review-01` |
| 3 | `i12-intermediate-review-03` | Mixed roleplay review | `i12-intermediate-review-02` |
| 4 | `i12-intermediate-review-04` | Listening and response practice | `i12-intermediate-review-03` |
| 5 | `i12-intermediate-review-05` | Pronunciation review | `i12-intermediate-review-04` |
| 6 | `i12-intermediate-review-06` | Fluency under time pressure | `i12-intermediate-review-05` |
| 7 | `i12-intermediate-review-07` | Workplace simulation | `i12-intermediate-review-06` |
| 8 | `i12-intermediate-review-08` | Real-life simulation | `i12-intermediate-review-07` |
| 9 | `i12-intermediate-review-09` | Self-correction test | `i12-intermediate-review-08` |
| 10 | `i12-intermediate-review-10` | Intermediate final assessment | `i12-intermediate-review-09` |

## Course `advanced-b2-c1-professional-fluency` — Professional Fluency and Precision (B2-C1/C2)

Level band: `Advanced`

### Module `a01-advanced-grammar-precision` — Advanced Grammar Precision

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `a01-advanced-grammar-precision-01` | Conditionals for risk | none |
| 2 | `a01-advanced-grammar-precision-02` | Mixed conditionals | `a01-advanced-grammar-precision-01` |
| 3 | `a01-advanced-grammar-precision-03` | Unless/provided that/as long as | `a01-advanced-grammar-precision-02` |
| 4 | `a01-advanced-grammar-precision-04` | Modals for certainty | `a01-advanced-grammar-precision-03` |
| 5 | `a01-advanced-grammar-precision-05` | Modals for obligation nuance | `a01-advanced-grammar-precision-04` |
| 6 | `a01-advanced-grammar-precision-06` | Passive voice for process | `a01-advanced-grammar-precision-05` |
| 7 | `a01-advanced-grammar-precision-07` | Causative structures | `a01-advanced-grammar-precision-06` |
| 8 | `a01-advanced-grammar-precision-08` | Reported speech | `a01-advanced-grammar-precision-07` |
| 9 | `a01-advanced-grammar-precision-09` | Subjunctive and formal patterns | `a01-advanced-grammar-precision-08` |
| 10 | `a01-advanced-grammar-precision-10` | Grammar precision checkpoint | `a01-advanced-grammar-precision-09` |

### Module `a02-professional-register` — Professional Register

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `a02-professional-register-01` | Concise updates | none |
| 2 | `a02-professional-register-02` | Executive summary | `a02-professional-register-01` |
| 3 | `a02-professional-register-03` | Diplomatic language | `a02-professional-register-02` |
| 4 | `a02-professional-register-04` | Assertive vs rude | `a02-professional-register-03` |
| 5 | `a02-professional-register-05` | Softening bad news | `a02-professional-register-04` |
| 6 | `a02-professional-register-06` | Escalation language | `a02-professional-register-05` |
| 7 | `a02-professional-register-07` | Decision framing | `a02-professional-register-06` |
| 8 | `a02-professional-register-08` | Risk framing | `a02-professional-register-07` |
| 9 | `a02-professional-register-09` | Expectation management | `a02-professional-register-08` |
| 10 | `a02-professional-register-10` | Register checkpoint | `a02-professional-register-09` |

### Module `a03-technical-communication` — Technical Communication

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `a03-technical-communication-01` | Explaining an incident | none |
| 2 | `a03-technical-communication-02` | Root-cause summary | `a03-technical-communication-01` |
| 3 | `a03-technical-communication-03` | Trade-off discussion | `a03-technical-communication-02` |
| 4 | `a03-technical-communication-04` | Architecture explanation | `a03-technical-communication-03` |
| 5 | `a03-technical-communication-05` | Risk mitigation | `a03-technical-communication-04` |
| 6 | `a03-technical-communication-06` | Rollout plan explanation | `a03-technical-communication-05` |
| 7 | `a03-technical-communication-07` | Monitoring and alert explanation | `a03-technical-communication-06` |
| 8 | `a03-technical-communication-08` | Explaining constraints | `a03-technical-communication-07` |
| 9 | `a03-technical-communication-09` | Postmortem summary | `a03-technical-communication-08` |
| 10 | `a03-technical-communication-10` | Technical communication checkpoint | `a03-technical-communication-09` |

### Module `a04-meeting-and-discussion-skills` — Meeting And Discussion Skills

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `a04-meeting-and-discussion-skills-01` | Opening a meeting contribution | none |
| 2 | `a04-meeting-and-discussion-skills-02` | Interrupting politely | `a04-meeting-and-discussion-skills-01` |
| 3 | `a04-meeting-and-discussion-skills-03` | Challenging an idea | `a04-meeting-and-discussion-skills-02` |
| 4 | `a04-meeting-and-discussion-skills-04` | Clarifying assumptions | `a04-meeting-and-discussion-skills-03` |
| 5 | `a04-meeting-and-discussion-skills-05` | Summarizing decisions | `a04-meeting-and-discussion-skills-04` |
| 6 | `a04-meeting-and-discussion-skills-06` | Aligning stakeholders | `a04-meeting-and-discussion-skills-05` |
| 7 | `a04-meeting-and-discussion-skills-07` | Handling objections | `a04-meeting-and-discussion-skills-06` |
| 8 | `a04-meeting-and-discussion-skills-08` | Parking a topic | `a04-meeting-and-discussion-skills-07` |
| 9 | `a04-meeting-and-discussion-skills-09` | Closing with action items | `a04-meeting-and-discussion-skills-08` |
| 10 | `a04-meeting-and-discussion-skills-10` | Meeting checkpoint | `a04-meeting-and-discussion-skills-09` |

### Module `a05-advanced-fluency` — Advanced Fluency

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `a05-advanced-fluency-01` | Pace and pauses | none |
| 2 | `a05-advanced-fluency-02` | Sentence rhythm | `a05-advanced-fluency-01` |
| 3 | `a05-advanced-fluency-03` | Reducing fillers | `a05-advanced-fluency-02` |
| 4 | `a05-advanced-fluency-04` | Structured monologue | `a05-advanced-fluency-03` |
| 5 | `a05-advanced-fluency-05` | Thinking aloud clearly | `a05-advanced-fluency-04` |
| 6 | `a05-advanced-fluency-06` | Rephrasing under pressure | `a05-advanced-fluency-05` |
| 7 | `a05-advanced-fluency-07` | Maintaining flow during correction | `a05-advanced-fluency-06` |
| 8 | `a05-advanced-fluency-08` | Emphasis and contrast | `a05-advanced-fluency-07` |
| 9 | `a05-advanced-fluency-09` | Natural transitions | `a05-advanced-fluency-08` |
| 10 | `a05-advanced-fluency-10` | Fluency checkpoint | `a05-advanced-fluency-09` |

### Module `a06-nuance-and-vocabulary` — Nuance And Vocabulary

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `a06-nuance-and-vocabulary-01` | Strong vs weak verbs | none |
| 2 | `a06-nuance-and-vocabulary-02` | Precise adjectives | `a06-nuance-and-vocabulary-01` |
| 3 | `a06-nuance-and-vocabulary-03` | Collocations for leadership | `a06-nuance-and-vocabulary-02` |
| 4 | `a06-nuance-and-vocabulary-04` | Idiomatic workplace phrases | `a06-nuance-and-vocabulary-03` |
| 5 | `a06-nuance-and-vocabulary-05` | Hedging language | `a06-nuance-and-vocabulary-04` |
| 6 | `a06-nuance-and-vocabulary-06` | Diplomatic disagreement vocabulary | `a06-nuance-and-vocabulary-05` |
| 7 | `a06-nuance-and-vocabulary-07` | Cause-effect language | `a06-nuance-and-vocabulary-06` |
| 8 | `a06-nuance-and-vocabulary-08` | Priority and urgency language | `a06-nuance-and-vocabulary-07` |
| 9 | `a06-nuance-and-vocabulary-09` | Concise alternatives | `a06-nuance-and-vocabulary-08` |
| 10 | `a06-nuance-and-vocabulary-10` | Vocabulary nuance checkpoint | `a06-nuance-and-vocabulary-09` |

### Module `a07-presentations-and-storytelling` — Presentations And Storytelling

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `a07-presentations-and-storytelling-01` | Opening a presentation | none |
| 2 | `a07-presentations-and-storytelling-02` | Explaining agenda | `a07-presentations-and-storytelling-01` |
| 3 | `a07-presentations-and-storytelling-03` | Signposting | `a07-presentations-and-storytelling-02` |
| 4 | `a07-presentations-and-storytelling-04` | Handling questions | `a07-presentations-and-storytelling-03` |
| 5 | `a07-presentations-and-storytelling-05` | Explaining charts verbally | `a07-presentations-and-storytelling-04` |
| 6 | `a07-presentations-and-storytelling-06` | Telling impact stories | `a07-presentations-and-storytelling-05` |
| 7 | `a07-presentations-and-storytelling-07` | STAR method for achievements | `a07-presentations-and-storytelling-06` |
| 8 | `a07-presentations-and-storytelling-08` | Closing strongly | `a07-presentations-and-storytelling-07` |
| 9 | `a07-presentations-and-storytelling-09` | Q&A recovery phrases | `a07-presentations-and-storytelling-08` |
| 10 | `a07-presentations-and-storytelling-10` | Presentation checkpoint | `a07-presentations-and-storytelling-09` |

### Module `a08-interview-speaking` — Interview Speaking

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `a08-interview-speaking-01` | Tell me about yourself | none |
| 2 | `a08-interview-speaking-02` | Complex project explanation | `a08-interview-speaking-01` |
| 3 | `a08-interview-speaking-03` | Conflict example | `a08-interview-speaking-02` |
| 4 | `a08-interview-speaking-04` | Failure and learning story | `a08-interview-speaking-03` |
| 5 | `a08-interview-speaking-05` | Strengths and gaps | `a08-interview-speaking-04` |
| 6 | `a08-interview-speaking-06` | Leadership example | `a08-interview-speaking-05` |
| 7 | `a08-interview-speaking-07` | Cross-functional collaboration | `a08-interview-speaking-06` |
| 8 | `a08-interview-speaking-08` | System design explanation | `a08-interview-speaking-07` |
| 9 | `a08-interview-speaking-09` | Salary and expectation discussion | `a08-interview-speaking-08` |
| 10 | `a08-interview-speaking-10` | Interview checkpoint | `a08-interview-speaking-09` |

### Module `a09-negotiation-and-influence` — Negotiation And Influence

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `a09-negotiation-and-influence-01` | Making a proposal | none |
| 2 | `a09-negotiation-and-influence-02` | Explaining trade-offs | `a09-negotiation-and-influence-01` |
| 3 | `a09-negotiation-and-influence-03` | Pushing back politely | `a09-negotiation-and-influence-02` |
| 4 | `a09-negotiation-and-influence-04` | Building consensus | `a09-negotiation-and-influence-03` |
| 5 | `a09-negotiation-and-influence-05` | Negotiating timeline | `a09-negotiation-and-influence-04` |
| 6 | `a09-negotiation-and-influence-06` | Negotiating scope | `a09-negotiation-and-influence-05` |
| 7 | `a09-negotiation-and-influence-07` | Disagreeing with senior stakeholders | `a09-negotiation-and-influence-06` |
| 8 | `a09-negotiation-and-influence-08` | Offering alternatives | `a09-negotiation-and-influence-07` |
| 9 | `a09-negotiation-and-influence-09` | Summarizing agreement | `a09-negotiation-and-influence-08` |
| 10 | `a09-negotiation-and-influence-10` | Negotiation checkpoint | `a09-negotiation-and-influence-09` |

### Module `a10-cultural-and-social-fluency` — Cultural And Social Fluency

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `a10-cultural-and-social-fluency-01` | Small talk at work | none |
| 2 | `a10-cultural-and-social-fluency-02` | Networking introduction | `a10-cultural-and-social-fluency-01` |
| 3 | `a10-cultural-and-social-fluency-03` | Humour and light comments | `a10-cultural-and-social-fluency-02` |
| 4 | `a10-cultural-and-social-fluency-04` | Showing empathy | `a10-cultural-and-social-fluency-03` |
| 5 | `a10-cultural-and-social-fluency-05` | Reacting naturally | `a10-cultural-and-social-fluency-04` |
| 6 | `a10-cultural-and-social-fluency-06` | Inviting and declining politely | `a10-cultural-and-social-fluency-05` |
| 7 | `a10-cultural-and-social-fluency-07` | Handling silence | `a10-cultural-and-social-fluency-06` |
| 8 | `a10-cultural-and-social-fluency-08` | Cross-cultural directness | `a10-cultural-and-social-fluency-07` |
| 9 | `a10-cultural-and-social-fluency-09` | Repairing awkward moments | `a10-cultural-and-social-fluency-08` |
| 10 | `a10-cultural-and-social-fluency-10` | Social fluency checkpoint | `a10-cultural-and-social-fluency-09` |

### Module `a11-advanced-pronunciation` — Advanced Pronunciation

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `a11-advanced-pronunciation-01` | Word stress in technical vocabulary | none |
| 2 | `a11-advanced-pronunciation-02` | Sentence stress for contrast | `a11-advanced-pronunciation-01` |
| 3 | `a11-advanced-pronunciation-03` | Intonation for confidence | `a11-advanced-pronunciation-02` |
| 4 | `a11-advanced-pronunciation-04` | Linking and connected speech | `a11-advanced-pronunciation-03` |
| 5 | `a11-advanced-pronunciation-05` | Weak forms | `a11-advanced-pronunciation-04` |
| 6 | `a11-advanced-pronunciation-06` | Pausing for clarity | `a11-advanced-pronunciation-05` |
| 7 | `a11-advanced-pronunciation-07` | Pronunciation of difficult consonants | `a11-advanced-pronunciation-06` |
| 8 | `a11-advanced-pronunciation-08` | Indian-English pronunciation repair | `a11-advanced-pronunciation-07` |
| 9 | `a11-advanced-pronunciation-09` | German-context names and places | `a11-advanced-pronunciation-08` |
| 10 | `a11-advanced-pronunciation-10` | Pronunciation checkpoint | `a11-advanced-pronunciation-09` |

### Module `a12-mastery-review` — Mastery Review

| Order | Subsection ID | Title | Prerequisites |
|---:|---|---|---|
| 1 | `a12-mastery-review-01` | Personal advanced error map | none |
| 2 | `a12-mastery-review-02` | Mixed tense precision | `a12-mastery-review-01` |
| 3 | `a12-mastery-review-03` | Advanced roleplay | `a12-mastery-review-02` |
| 4 | `a12-mastery-review-04` | Professional simulation | `a12-mastery-review-03` |
| 5 | `a12-mastery-review-05` | Live incident simulation | `a12-mastery-review-04` |
| 6 | `a12-mastery-review-06` | Presentation simulation | `a12-mastery-review-05` |
| 7 | `a12-mastery-review-07` | Interview simulation | `a12-mastery-review-06` |
| 8 | `a12-mastery-review-08` | Fast correction challenge | `a12-mastery-review-07` |
| 9 | `a12-mastery-review-09` | Final speaking assessment | `a12-mastery-review-08` |
| 10 | `a12-mastery-review-10` | Next 60-day plan | `a12-mastery-review-09` |

---
## Suggested implementation sequence

1. Review and approve this skeleton.
2. Convert this skeleton into a typed TS curriculum registry.
3. Author full content for pilot module `b09-past-tense-pilot`.
4. Add Firestore `LessonCursor`.
5. Rework `/api/coach-interaction` so it reads cursor + subsection content and only lets backend advance phases.
6. Add digression stack handling.
7. Add next-day resume prompt.
8. Add small in-memory retrieval only for mistake review and roleplay correction.

## Open review questions

1. Should Beginner be split into `absolute-beginner` and `beginner`, or is one Beginner track enough?
2. Should Sandra start at Beginner A1/A2 or Intermediate B1 with extra article/preposition review?
3. Should Jithin's default path start at Intermediate Workplace English or Advanced Professional Fluency?
4. Should the app expose all 338 subsections to the user, or keep the UI as daily lessons while the backend uses the full map?
5. Which module should become the second fully-authored module after Past Tense?
