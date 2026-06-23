# Curriculum Source-Informed Design

Sky's curriculum is source-informed, not source-copied.

The app should not copy explanations, examples, exercises, or lesson text from books, blogs, or commercial grammar websites. Instead, it uses established public frameworks to decide sequencing, skill coverage, and assessment shape, then authors original lesson content for the private Sky coach.

## Design references

The curriculum design is aligned with:

1. CEFR A1-C2 progression
   - A1/A2: basic user, simple everyday communication
   - B1/B2: independent user, practical daily/work/study communication
   - C1/C2: proficient user, nuance, precision, register, fluency

2. CEFR Companion Volume concepts
   - Spoken production
   - Spoken interaction
   - Mediation
   - Online interaction
   - Language as social action

3. English Profile / Grammar Profile approach
   - Map grammar and vocabulary features to learner levels
   - Use learner-level progression for curriculum planning
   - Focus on what learners can actually produce

4. Cambridge-style progression
   - A2 Key: basic communication
   - B1 Preliminary: practical everyday use
   - B2 First: confident independent use
   - C1 Advanced: professional/academic fluency

5. Practical speaking domains
   - Family and daily life
   - Travel and appointments
   - Shopping and health
   - Work and meetings
   - Technical/professional communication
   - Interviews and presentations

## Sky-specific curriculum rules

- Backend owns the cursor: course -> module -> subsection -> phase.
- Gemini teaches only the current subsection content supplied by backend.
- Chat mode must be text-aware. It should say "type/rewrite this sentence", not "speak aloud".
- Live mode must be voice-aware. It may ask the learner to speak, repeat, pause, stress, or pronounce.
- Every lesson must contain correction, natural version, micro drill, and next action.
- Digressions are allowed briefly, but Sky must return to the lesson.
- Old Daily Activities remain available for later general/free-talk practice.

## Content quality levels

Sky supports two content quality levels:

1. Hand-authored modules
   - Detailed module-specific explanations, mistakes, drills, roleplay, success criteria.
   - Best quality.
   - Added progressively module by module.

2. Detailed generated scaffold
   - Source-informed original content generated from the curriculum topic, module type, level, and common learner needs.
   - Covers every unauthored subsection so the app is complete and usable now.
   - Should be replaced by hand-authored content over time.

## Current hand-authored modules

- `b09-past-tense-pilot`
- `i07-workplace-english`

## Next modules to hand-author

Suggested order:

1. `b07-nouns-articles-quantity`
2. `a08-interview-speaking`
3. `i05-preposition-patterns`
4. `a03-technical-communication`
5. `b11-everyday-functions`

## Why not manually dump 338 long lessons now?

A huge hand-written-looking dump would be hard to review and likely lower quality. The better architecture is:

1. Complete every subsection with detailed scaffold content.
2. Make the engine stable.
3. Hand-author the highest-value modules one by one.
4. Use evaluation scripts and real usage to decide which modules need premium authoring next.
