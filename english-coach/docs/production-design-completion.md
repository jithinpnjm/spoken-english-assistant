# Production Design Completion

This document defines the production learner experience after the first structure/progression work.

## Goal

Sky should feel like a connected English learning product, not a chat page with side panels.

The learner should always know:

- what mode they are in
- what track they selected
- what module they are studying
- what lesson they are in
- what phase the lesson is in
- what to do next
- how to continue from the previous state

## Primary product areas

### Study Mode

Structured learning path.

Primary actions:

- Continue lesson
- Start level path
- Start selected module
- Search/select module
- See lesson phase timeline
- Understand next action

### Practice Mode

Flexible general practice.

Primary actions:

- Daily warm-up
- Free conversation
- Real-life roleplay
- Workplace quick practice
- Fluency builder

### Review Mode

Personalized mistake repair.

Primary actions:

- See recurring mistakes
- Review due mistakes
- Start correction drill
- Track improvement

### Live Mode

Voice-based study/practice.

Primary actions:

- Continue current lesson by voice
- Speak/repeat corrected sentence
- Roleplay by voice

## Target screen hierarchy

Sidebar:

1. Learner profile summary
2. Learning Modes
3. Continue Lesson card
4. Study Mode panel
5. General Practice
6. Review Mode

Main content:

1. Mode + track header
2. Current lesson banner
3. Empty state / next action if no conversation yet
4. Conversation
5. Correction cards
6. Input bar

## Lesson phase timeline

Every study lesson has seven phases:

1. Intro
2. Model
3. Guided Practice
4. Correction
5. Rewrite / Repeat
6. Free Practice
7. Summary

The UI should show these as a readable timeline, not only small bars.

## Continue lesson behavior

When a cursor exists, the learner should see:

- Continue Lesson button
- Current lesson title
- Current phase
- Last progress summary
- Next action text

Clicking Continue Lesson should create/open a session and send a `continue` instruction to the backend.

## Empty state behavior

If the current session has no learner/coach exchange yet, the main panel should not be a blank chat area.

It should show:

- current mode
- selected track
- current lesson
- phase
- suggested action

## Design constraints

- Keep the app simple and dark-themed for now.
- Do not add heavy navigation or route complexity yet.
- Keep current single-screen layout.
- Preserve old practice cards as General Practice.
- Avoid user-facing terms like pilot, scaffold, generated, subsection.

## Later UI PRs

- Full lesson browser page
- Detailed progress dashboard
- Review calendar
- Settings page
- Admin/curriculum authoring interface
