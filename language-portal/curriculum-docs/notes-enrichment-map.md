# Notes Enrichment Map (handwritten A1 notes + two books → portal)

Gap analysis done on branch `a1-notes-enrichment`. Sources:

- **Notes** – the learner's own handwritten A1 class notes (93 PDF pages, transcribed in three parts). Highest priority.
- **Lina** – "German by Lina", a third-party grammar guide (A1–B1). Only the A1-relevant parts were used, for facts
  and coverage; nothing copied.
- **Vocab** – a third-party frequency-ordered German–English word list. Used only to find missing A1 words; its
  glosses were not trusted (many are wrong, see §4).
- Scope reference: the official *Goethe-Zertifikat A1: Start Deutsch 1 Wortliste* (goethe.de, ~650 entries).

Classification: **COVERED** (portal as good or better – no action) · **WEAKER** (portal teaches it, but the source
adds something real) · **MISSING** · **NOTE WRONG** (error in the source – not imported; taught as a trap where useful) ·
**OUT OF SCOPE** (beyond A1 – not published, since the portal is A1-only).

Paths are relative to `language-portal/docs/german/`.

## Headline numbers

| Source | Items checked | COVERED | WEAKER → enriched | MISSING → added | NOTE WRONG | OUT OF SCOPE |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| Handwritten notes (topic index + distinctive content, pp. 1–93) | 78 | 21 | 24 | 12 | 19 (about half also taught as a "common trap") | 3 |
| Lina (A1-relevant sections) | 25 | 22 | 4 | 1 | 11 rows with book errors | – (Genitiv, Konjunktiv, Passiv, relative clauses, adjective endings skipped) |
| Vocab list + official A1 word list | ~680 official entries, ~900 book entries | ~88 % of the official list already in chapters | – | ~55 words added to the Vocabulary Vault | 19 wrong glosses listed as a warning table | many book words are A2+ |

(Counted from the tables below; a row can carry two labels, e.g. WEAKER + NOTE WRONG, so columns do not add up to the row count.)

## 1. Handwritten notes, pages 1–31

| Source item | Portal location | Classification | Action |
| :--- | :--- | :--- | :--- |
| p.2–3 Alphabet 26+4, letter names | `a1/vol1-foundations/alphabet-pronunciation.mdx` §2 | COVERED | – |
| p.2–3 "ß – estset" | same, §3 (Eszett / scharfes S) | NOTE WRONG | Not imported; portal already spells *Eszett*. |
| p.3 letter names as English sound-alikes (e = "a", i = "e", j = "yot", v = "fow") | alphabet §2 | WEAKER | Added "Letter names that trip up English speakers on the phone" table (E/I, A, J/G, V/W, Z). |
| p.4 j = य/ज (y or English j) | alphabet §2 table | NOTE WRONG (partly) + portal absolute | j = y in German words, English j only in loanwords (*Job, Jeans*). Fixed the portal's "Always sounds like Y" to include loanwords; sound-alike table in `parallel-systems/pronunciation-coach.mdx` §2b. |
| p.4 ch = kh / sh / च (English "ch") | alphabet §4C; pronunciation coach §1 | NOTE WRONG (English ch) | ich-/ach-Laut already taught; added "not the English *ch*" note (loanwords *Chip/Chef/Chor*, English ch = *tsch*). |
| p.4 ei = "I", ie = "e" | alphabet §4A | COVERED | – (also confirmed in §2b table). |
| p.4 ü = "you", ö = "eo" | alphabet §3; coach §1 | NOTE WRONG (rough) | §2b: ü has no y-glide; ö = rounded "eh". |
| p.4 d/t with Hindi dental/retroflex hints | – | MISSING (as English help) | §2b: German t/d position + aspiration (no Devanagari). |
| p.4 -ig = "ich" | alphabet §4C; coach §2 | COVERED | – |
| p.4 z = ts, v = f, w = v | alphabet §4C | COVERED | Added v/w merger drill (*Wein – fein*, *wir – vier*) in §2b. |
| p.5 A-P-V-P / G-N-P framing; definition of 1st/2nd/3rd person | `a1/vol1-foundations/personal-pronouns.mdx` | MISSING (person concept) | Added "The same pronouns as a grid (1st, 2nd, 3rd person)". |
| p.6–7 Article types (bestimmt / unbestimmt / Negativartikel); "ein = one, so no plural" | `a1/vol3-grammar/nouns-gender.mdx`, `negation.mdx` | COVERED | – ("Bestimmt Artikel" spelling: correct term *bestimmter Artikel*; not imported.) |
| p.7 "Frau = lady" | – | NOTE WRONG (loose gloss) | Not imported (*Frau* = woman / Mrs; lady = *Dame*). |
| p.8 One table: der/ein/kein/mein/sein/dieser per noun | nouns-gender, negation, family, welch-and-dies | COVERED | – (spread over 4 chapters, each with a table). |
| p.10–12 Personal pronoun grid + **idseeswiss** | personal-pronouns §2 | WEAKER | Grid + decoded hook i-d-S-e-e-s · w-i-S-s (verified against the grid). Hindi glosses for du/ihr/Sie not imported. |
| p.13–17 Possessives + **mdssiueiI**; euer → eure | `a1/vol2-people/family.mdx` §2 | COVERED | Mnemonic decoded (mein, dein, sein, sein, ihr, unser, euer, ihr, Ihr) and true, but the portal table already lists them in that order; not added (no gain). euer/eure trap already taught. |
| p.17 "Unser" capital in neuter column | – | NOTE WRONG (typo) | Not imported. |
| p.19 dieser = "this/that" | `a1/vol3-grammar/welch-and-dies.mdx` | NOTE WRONG | *dies-* = this/these only. Added warning + "that one = *der/die/das da*; *jen-* rare". |
| p.20 *das* without noun is invariable (*Was ist das? Das ist …*) vs *dieses* + noun | welch-and-dies §2 | WEAKER | Added "Pointing without a noun: *das* never changes". |
| p.22 Verb = root + ending (Hindi parallel) | `a1/vol3-grammar/present-tense-verbs.mdx` §2 | COVERED | Hindi parallel not imported (no Devanagari; English stem explanation already clear). |
| p.25–26 "I request you to write it ten ten times" → e st t en t en | present-tense §2 | WEAKER | Decoded (requ**est** · **ten** · **ten** = e\|st, t\|en, t\|en) and added as memory hook. |
| p.27 One present form = simple / continuous / future | present-tense §4 | WEAKER | Added "One German form, three English forms" table. |
| p.27 Present for future ("Ich lese ein Buch" = I will read) | present-tense §4 | NOTE WRONG (without time word) | Kept the portal rule (needs a time word/context); added explicit sentence that without one it means now/usually. |
| p.27 Every subject except ich/du/wir/ihr/Sie is 3rd person | personal-pronouns; present-tense §2 | MISSING | Added "Every noun is 3rd person" + cross-link. |
| p.27 "Ich werde ein Buch lesen" (werden future) | present-tense | MISSING | Added *werden* box (become + future, recognition level; *werden* is on the Goethe A1 list). |
| p.28–31 Conjugation, extra -e after d/t, du -t after s/ß/z | present-tense §3 | COVERED | – |
| p.30–31 extra -e for "other hard-to-say stems" (öffnen) | present-tense §3 | WEAKER | Added consonant + m/n rule (*öffnest, regnet, rechnet*) with the limit (*wohnst, lernt*), practice item and mistake row. |
| p.29 "heißst → ssst" | present-tense §3 | COVERED | – |

## 2. Handwritten notes, pages 32–62

| Source item | Portal location | Classification | Action |
| :--- | :--- | :--- | :--- |
| p.32–33 Four verb types; e→i/ie, a→ä only du + er | present-tense §3 | COVERED | – |
| p.35 Modal verbs **W-S-K-D-M-M-M** | `a1/vol3-grammar/modal-verbs.mdx` §5 | WEAKER | Hook added (decoded, true); points *mögen* to 2.6. |
| p.36 Helping verbs sein/haben/werden (SHW); werden = will / become | present-tense §4 (new *werden* box) | MISSING (werden) | See above. |
| p.37–38 Modal tables; rule "ich = er, du = ich + st" | modal-verbs §5 | WEAKER | Added the *du* = *ich* form + *-st* shortcut (true for all modals incl. *möchte → möchtest*). |
| p.38 "sein (2 bis 3)" | – | unclear in source | Ignored. |
| p.39–40 Golden rule V2; modal + infinitive at end | modal-verbs §4; sentence-structure-v2 | COVERED | – |
| p.41–45 Trennbare Verben rules 1–3 | `a1/vol3-grammar/separable-verbs.mdx` | WEAKER | Added "splits even with nothing in between" (*Ich rufe an*) + mistake rows. |
| p.42 Rule 4: rejoins in verb-final clause | `conjunctions.mdx` (weil, recognition) | WEAKER | One line: *…, weil ich mein Zimmer aufräume.* |
| p.44 Separable vs "not separated" prefix lists | separable-verbs; `non-separable-verbs.mdx` §2 | NOTE WRONG (partly) | *früh* is not a prefix (probably from *frühstücken*, which comes from the noun *Frühstück* and never splits); *um/durch* listed only as separable, *über/unter* only as inseparable – all four (and *wieder-*) can be either. Added "The 'it depends' prefixes" table (*umsteigen, umziehen* vs *übernachten, überweisen, unterschreiben, wiederholen*) + *frühstücken* trap. *miß-* = old spelling of *miss-* (portal already uses *miss-*). |
| p.46–47 "Double-Infinitive Verb" (spazieren gehen, schlafen gehen, einkaufen gehen, kennen lernen) | separable-verbs; hobbies | MISSING (as a pattern) | Added §3b "*gehen* + infinitive" + *kennenlernen* + Perfekt forms. Not called "double infinitive" (that grammar term means something else, e.g. *hat kommen können*). *kennenlernen* written as one word (current standard; *kennen lernen* also allowed). |
| p.48 kennen / wissen / können; "Ich kann Deutsch" | give-information (wissen/kennen only) | WEAKER / MISSING (können) | Added three-way table + *Ich kann Deutsch* section + practice item in modal-verbs. |
| p.49 weiß = weiss; weiß = know / white | – | NOTE WRONG (partly) | *weiss* only Swiss / no-ß keyboard; added a spelling note. |
| p.50–51 Case: Nom/Akk/Dat table; table numbering BA/UA/NA/PP/DP | nominative, accusative, dative | COVERED | Private numbering system not imported (portal tables are self-explanatory). |
| p.51 "decisive factor for Akk/Dat: VERB" | `accusative.mdx` | WEAKER | Added "Who decides the case? The main verb" (incl. modal/haben don't decide – p.61 arrows). |
| p.52–53, 60 **D 2 % / A 97 % / W 1 %** | accusative | NOTE WRONG (numbers unverifiable) | Not imported as percentages. Restated as: most verbs → accusative; a smaller, very common group → dative; giving verbs → both. |
| p.52, 56 **PDTA** (Person Dativ, Thing Akkusativ) + 8 two-object sentences | `dative.mdx` | MISSING | Added "Verbs with two objects" table + word-order note + practice + mistake row. |
| p.54 Dative verbs (helfen, antworten, gehören, gefallen, danken, gratulieren, schaden, passen) | dative §3 | COVERED | *schaden* not added (not A1 list). |
| p.55 Accusative verbs | accusative §3 | COVERED | – |
| p.56 "sendet" | – | style | Portal uses *schicken*. |
| p.57–58 Preposition decides case too ("family" diagram); simple vs prepositional object | `prepositions.mdx` §1 | WEAKER | Added verb-vs-preposition paragraph (*frage meinen / spreche mit meinem / einen Kuli für meinen*). |
| p.59 **SDMA** (Static Dativ, Movement Akkusativ); legen/liegen | prepositions §4 | WEAKER | Hook added with the refinement "movement *to a new place*" (*im Park laufen* vs *in den Park*). |
| p.60 Counts D(9) A(7) W(9) | prepositions | COVERED | Portal lists the A1 sets; counts depend on the list, not imported. Full two-way system stays A2 (OUT OF SCOPE). |
| p.59 "I keep the book on the table" (= *legen*) | – | NOTE WRONG (Indian-English gloss) | Not imported; portal glosses *legen* = put/lay. |
| p.62–63 "Der Kuli … Es ist neu / Er kauft es" → corrected to er/ihn | personal-pronouns §4 (Nom only); dative | WEAKER + learner trap | Added "Things are *er, sie, es* – in every case" table (er/ihn/ihm …) with the ❌ *Es ist neu. Er kauft es.* trap. |

## 3. Handwritten notes, pages 63–93

| Source item | Portal location | Classification | Action |
| :--- | :--- | :--- | :--- |
| p.63–64 Pronoun table Nom/Akk/Dat per gender | dative §4 | WEAKER | Covered by the new "things" table. |
| p.65–66 "10 times sie" + **4 C** (Case, Capital, Context, Conjugation) | personal-pronouns §5 (3 readings only) | WEAKER | Added "Decoding *sie/Sie* and *ihr/Ihr*" (4 clues) in dative. |
| p.65 "All objects here are only Akk" | – | NOTE WRONG (partly) | Dative forms differ (*Ihnen, ihr, ihnen*) – shown in the decoder. |
| p.67 ihr / ihr / ihr / Ihr | family §2 traps; dative §4 | COVERED + WEAKER | Decoder adds "ihr + noun vs ihr alone". |
| p.68–71 es gibt / es geht / es tut; "Ich bin gut ✗" | accusative (es gibt), dative (Wie geht es), apologize | WEAKER | Added *es geht* + dative for third persons (*deinem Bruder – ihm*) + ❌ *Ich bin gut* trap + practice. |
| p.69 "es at 1st or 3rd position" | – | simplification | Not imported (V2 rules cover it). |
| p.72 Subordinating conjunctions **WWWOODA** (wenn, weil, wie, ob, obwohl, dass, als) | conjunctions (weil recognised) | OUT OF SCOPE + NOTE WRONG | weil/dass/wenn/ob/obwohl/als are not on the Goethe A1 list; portal keeps *weil* as recognition. "wie = if" is wrong (if = *wenn/ob*; as if = *als ob*). Not imported. |
| p.73–74 weil in first half → "verb, verb"; comma rules | conjunctions | OUT OF SCOPE | Only the separable-rejoining line was added. |
| p.75 Coordinating **OSUDA**; "null position" | conjunctions §2–3 | WEAKER | Hook added (the five match the portal's five Position-0 connectors). "sondern = rather" refined in portal already ("but rather", after *nicht/kein*). |
| p.76 weil/denn "your choice" | conjunctions §3 | COVERED | Portal explains same meaning, different word order. |
| p.76 wenn/als table | – | OUT OF SCOPE | A2. |
| p.77 Golden rules: V2, subject next to verb, time before place, flexibility | `sentence-structure-v2.mdx` | COVERED | – |
| p.78 "Der Frau hilft der Mann"; das Kind / das Mädchen pair | sentence-structure-v2 Step 4 | WEAKER | Added warning: reordering is safe only when the endings show the case. |
| p.78 is/am/are/do/does not translated as helpers | present-tense §4; questions §3 | WEAKER | Covered by the new "three English forms" table (questions already covers "do"). |
| p.78 Imperativ as a type of Aussagesatz | – | NOTE WRONG (classification) | Not imported. |
| p.79, 83 "Er kommt nicht heute", "Nicht er kommt heute", "Wir haben nicht den Unterricht am Samstag" | `negation.mdx` §4 | NOTE WRONG as neutral sentences; WEAKER | Added "Moving *nicht* earlier = not THIS, but that" (contrastive + *sondern*), and *keinen Unterricht*. |
| p.80–81 Future: present + time word or werden | present-tense §4 | WEAKER | Covered by the *werden* box and time-word rule. |
| p.82 W-Frage / Satzfrage | `questions.mdx` | COVERED | – |
| p.83 will vs wird | modal-verbs; present-tense | MISSING (false friend) | Added "*ich will* ≠ I will" section, mistake 4, and mistake row in present-tense. |
| p.85 Weak/strong participles | `perfekt-spoken-past.mdx` §3 | COVERED | *kennengelernt, spazieren gegangen* (current spelling) added to §3D. "ge" of *gewonnen* marked as prefix in notes – wrong (stem); portal/vault say no extra *ge-*. |
| p.86 **haben 99 % / sein 1 %** | perfekt §4 | NOTE WRONG (as a figure) | Not imported. Added: "most verbs use haben" is true for the dictionary, but many everyday verbs take *sein*. |
| p.88–89 Learner's "hat gekommen / hat gegangen / haben geblieben" | perfekt §5 | MISSING (as mistake row) | Added mistake row. |
| p.89 "ONLY FOR PERFECT: sein = have/has" | perfekt §4 | MISSING | Added "*ist* here = has" box (*ist Arzt* vs *ist gekommen* vs *ist … gewesen*). |
| p.89, 91–92 "woken up" → *aufgestanden* | perfekt §5 | NOTE WRONG | Added mistake row *aufwachen* (wake up) vs *aufstehen* (get up). |
| p.92 "the medicine" → *die Medikamente* | – | NOTE WRONG (minor) | Not imported (singular = *das Medikament*). |
| p.93 English "have been" vs *ist … gewesen* | perfekt §4 | MISSING | In the "*ist* = has" box. |

## 4. Book: German by Lina (A1-relevant parts)

| Section | Portal location | Classification | Action / error handled |
| :--- | :--- | :--- | :--- |
| 1.1 Present tense, *man* = er-form | present-tense; grammar-reference | COVERED | – |
| 1.3 Modal verbs; "Möchten is conjugated like a regular verb" | modal-verbs | COVERED; **book wrong** | *ich/er möchte* has no *-t* → not imported. "Sollen = ought to", "Wollen & Möchten = to want" – portal's glosses (should / want / would like) are more precise. |
| 1.4 Separable verbs | separable-verbs | COVERED | – |
| 1.5 Impersonal *es* (es regnet) | weather chapter | COVERED | – |
| 2.1 Gender by ending | nouns-gender §4 | COVERED; **book too absolute** | Book: "-en = der" (but *das Essen, das Zeichen*), "-ment = das" (*der Moment*), "plurals always take die" (nominative/accusative only; dative plural = *den*). Portal already marks tendencies. |
| 2.2–2.3 ein / kein | nouns-gender; negation | COVERED | – |
| 2.4 Possessives | family | COVERED | – |
| 3.2 Accusative; "eueren" | accusative | COVERED; **book wrong** | Standard form is *euren* (not imported). |
| 3.3 Dative; plural "Einen"; "euerer/eueren" | dative | COVERED; **book wrong** | *ein* has no plural; *eurer/euren*. Not imported. |
| 3.3 "the majority of verbs take accusative" | accusative | WEAKER | Used for the new "who decides the case" paragraph (without percentages). |
| 4.1–4.3 Prepositions (Wechsel, Akk, Dat) | prepositions | COVERED; **book examples wrong** | "Meine Katze stellt sich über den Tisch" (nonsense), "Ich arbeite bei einer kleiner Firma", "in die Gegend" – not imported. |
| 4.5 Contractions | prepositions §5 | COVERED | – |
| 5.2 Perfekt: "movement → sein, any other verb → haben"; "eingekaufen" | perfekt §4 | COVERED; **book incomplete** | Missing change of state, *bleiben, sein, passieren*; typo *eingekauft*. Portal list is fuller. |
| 5.5 Futur I (werden) | present-tense (new box) | MISSING → added at recognition level | – |
| 6.3 Coordinating conjunctions | conjunctions | COVERED | Subordinating list = OUT OF SCOPE. |
| 6.4 TeKaMoLo, object order | sentence-structure-v2 (time before place); dative (new two-object order note) | COVERED / WEAKER | Only the A1-relevant part (dative-noun before accusative-noun; pronoun first) added. TeKaMoLo itself = A2. |
| 7.1 Negation; "kein … not preceded by any article" | negation | COVERED | Portal's decision rule is clearer. |
| 7.2 Questions | questions | COVERED | – |
| 7.3 Imperative ("lesen sie" with small s) | imperative | COVERED; **book typo** | *Lesen Sie*. |
| 8.1–8.2 Adverbs of time/place; *vorne = in front of*, *irgendwo = anywhere* | adverbs-of-time; directions | COVERED; **book glosses loose** | *vorne* = at the front, *irgendwo* = somewhere. |
| 8.4 Intensifiers (sehr, ziemlich, zu …) | adjectives-opposites | COVERED | – |
| 9.1 Ordinals; "Ich wohne in der (3.) dritte Stock" | ordinal-numbers | COVERED; **book wrong** | Correct: *im dritten Stock*. |
| 9.3 Dates; "22. August werde ich …" | ordinal-numbers | COVERED | Needs *am*. |
| 9.4 Time; "13:20 zwanzig nach dreizehn"; "Wie spät ist es = How late is it" | numbers-dates-time §2 | WEAKER; **book wrong** | Added "don't mix the systems: informal clock uses 1–12". |
| 9.5 seit / vor / für; "Ich habe seit drei Jahren … Sport getrieben"; "für 5 Tage gearbeitet" | prepositions §2 | WEAKER; **book wrong** | *seit* + present (portal already teaches it). Added "English *for* + time span: usually no preposition; *für* for planned periods". |
| 9.5 der Morgen vs morgen | adverbs-of-time §2 | COVERED | – |

## 5. Vocabulary

| Check | Result | Action |
| :--- | :--- | :--- |
| Official Goethe A1 list (~680 headwords) vs all A1 + Parallel Systems pages | ~88 % found by a naive string check; after removing false positives (*dein-, jed-, letzt-*, compounds) about 40 genuinely missing: *übernachten, Sehenswürdigkeit, Reisebüro, Reiseführer, Prospekt, Halbpension, Durchsage/Ansage, Autobahn, Lkw, Blick, verdienen, Praktikum, Studium, Beamte, Papiere, Vorwahl, Gespräch, Ergebnis, Mensch, Verwandte, Jugendliche, Hausfrau/-mann, Heimat, Geburtsjahr, heiraten, gestorben, riechen, sich kümmern, mitmachen, erlauben, gewinnen, kriegen, zufrieden, böse, bitter, an/aus/auf/zu sein, daneben, circa, Baum, Lokal, Schinken, Zigarette* | MISSING → added to `parallel-systems/vocabulary-vault.mdx` "A1 words the chapters don't teach yet", grouped by topic with article · plural · English · example · pattern. *CD, Fax* skipped (dated). |
| Book word list vs portal | Most everyday A1 textbook words (food, clothes, body, home, transport, colours, weather) are already in the topic chapters. Gaps: animals (*Tier, Vogel, Katze*), nature (*Wald, See/Meer*), hobbies (*singen, malen*), *fleißig* | Added a small "Nature, animals" group and hobby verbs. Many book entries are A2+ (e.g. *Abholzung, Klimawandel, befördert werden*) – OUT OF SCOPE. |
| A new standalone word-list page? | Not justified: the official list is ~88 % covered in context; a separate page would duplicate chapters. | Enriched the existing Vault instead (no sidebar change). |
| Wrong / loose glosses in the book | *Schwer/Schwierig* swapped; *Spannend = relaxed*; *Kürzlich = shortly*; *Beliebt = loved*; *Laut = "Lous"*; *Trocken = Trocken*; *Eingang/Ausgang = input/output*; *zahlen = counting*; *schließen = conclude*; *Geschäft = business*; *Note = note*; *Geschichte = story* only; *Heft = issue*; *Stock = stick*; *satt sein = be fed up*; *heißen = mean*; *bestehen/durchfallen = consist/fall through*; *Pflaster = pavement*; *Tor = gate*; *Kamm = crest*; *Schloss = lock* only; *gierig = stingy*; *rund = around*; *umsonst = in vain* only; *Joga, Schach (m), schencken, setidem, spat* typos | Not imported. The learner-relevant ones became the "glosses to double-check" table in the Vault. |

## 6. Verification notes

- Settled from standard grammar knowledge and checked where noted: inseparable prefixes *be-, emp-, ent-, er-, ge-,
  miss-, ver-, zer-*; two-way *durch-, über-, um-, unter-, wieder-* (gfds.de, lingolia). *weil, dass, wenn, ob* are
  not on the Goethe A1 Wortliste; *werden* ("Mein Sohn will Arzt werden"), *kennenlernen*, *können* ("Ich kann
  Deutsch und Russisch") are.
- PDF p.44 re-read: "früh" is really written in the "not separated" column.
- Not verifiable and not imported: the teacher's percentages (D 2 %/A 97 %/W 1 %, haben 99 %/sein 1 %), "sein (2 bis 3)".
