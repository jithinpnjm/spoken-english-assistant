// Lightweight, deterministic fluency signal for English learner turns.
// Ported from english-coach/src/server/pronunciationFluencyEngine.ts. Fixed: the old sound detectors
// matched any word starting with v/w/r (e.g. "we", "was"), so almost every answer got the same /v/-/w/
// tip. Detectors now look for the actual target words. The signal is a hint for the model, not a grade.

import type { LevelBand } from "./lesson";

export interface FluencySignal {
  fluencyScore: number;
  pacing: "too_short" | "developing" | "steady" | "strong";
  fillerCount: number;
  averageWordsPerSentence: number;
  chunkingAdvice: string;
  pronunciationFocus: string;
}

const FILLERS = ["um", "uh", "erm", "like", "actually", "basically", "you know", "i mean"];

const SOUND_TARGETS: Array<{ words: RegExp; focus: string }> = [
  { words: /\b(very|video|value|van|vote|visit|view|wait|work|window|week|west|wine)\b/i, focus: "contrast /v/ (teeth on lip: very, value) and /w/ (rounded lips: work, window)" },
  { words: /\b(think|thought|thanks|three|third|through|thursday|these|those|there|other|mother|father|brother|weather)\b/i, focus: "put the tongue lightly between the teeth for th in think, three, there, and other" },
  { words: /\b(worked|called|tested|finished|started|checked|fixed|asked|wanted|needed|visited|watched|cleaned|joined|reached|missed|booked|played|stayed|decided|updated)\b/i, focus: "say past-tense endings clearly: worked /t/, called /d/, tested /ɪd/" },
];

function sentences(text: string) {
  return text.split(/[.!?]+/).map((item) => item.trim()).filter(Boolean);
}

function words(text: string) {
  return text.toLowerCase().match(/[a-z']+/g) || [];
}

function countFillers(text: string) {
  const lower = text.toLowerCase();
  return FILLERS.reduce(
    (sum, filler) => sum + (lower.match(new RegExp(`\\b${filler.replace(/ /g, "\\s+")}\\b`, "g"))?.length || 0),
    0,
  );
}

function pronunciationFocusFor(text: string, level: LevelBand) {
  const match = SOUND_TARGETS.find((item) => item.words.test(text));
  if (match) return match.focus;
  if (level === "Beginner") return "say each short sentence slowly first, then repeat it naturally";
  if (level === "Advanced") return "use sentence stress to highlight the key decision, risk, or result words";
  return "pause between idea chunks and stress the main verb and noun";
}

function chunkingAdviceFor(avgWords: number, level: LevelBand) {
  if (avgWords < 4) return "Add one reason or detail so the answer is not too short.";
  if (avgWords > 22) return "Break the answer into shorter idea chunks with a small pause after each key point.";
  if (level === "Advanced") return "Keep it concise, but stress the decision, risk, or result.";
  return "Use one clear pause between the main idea and the reason.";
}

function scoreFor(args: { wordCount: number; avgWords: number; fillerCount: number; sentenceCount: number }) {
  let score = 7;
  if (args.wordCount < 6) score -= 2;
  if (args.wordCount >= 12) score += 1;
  if (args.avgWords > 24) score -= 1;
  if (args.fillerCount >= 2) score -= 1;
  if (args.sentenceCount >= 2 && args.wordCount >= 14) score += 1;
  return Math.max(1, Math.min(10, score));
}

export function analyseFluency(text: string, level: LevelBand = "Intermediate"): FluencySignal {
  const clean = text.trim();
  const tokens = words(clean);
  const sentenceCount = Math.max(1, sentences(clean).length);
  const avgWords = tokens.length / sentenceCount;
  const fillerCount = countFillers(clean);
  const fluencyScore = scoreFor({ wordCount: tokens.length, avgWords, fillerCount, sentenceCount });
  const pacing: FluencySignal["pacing"] =
    tokens.length < 5 ? "too_short" : fluencyScore <= 5 ? "developing" : fluencyScore >= 9 ? "strong" : "steady";

  return {
    fluencyScore,
    pacing,
    fillerCount,
    averageWordsPerSentence: Math.round(avgWords * 10) / 10,
    chunkingAdvice: chunkingAdviceFor(avgWords, level),
    pronunciationFocus: pronunciationFocusFor(clean, level),
  };
}

export function fluencyInstruction(signal: FluencySignal) {
  return `FLUENCY SIGNAL (heuristic, use lightly — never let it override grammar correction):
- Estimated fluency: ${signal.fluencyScore}/10, pacing ${signal.pacing}, fillers ${signal.fillerCount}.
- Chunking advice: ${signal.chunkingAdvice}
- Pronunciation focus (only relevant if the learner will say the sentence aloud): ${signal.pronunciationFocus}
Mention at most one of these, and only if it genuinely helps.`;
}
