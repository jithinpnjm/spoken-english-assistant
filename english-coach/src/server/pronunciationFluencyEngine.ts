export type SpeakingLevel = "Beginner" | "Intermediate" | "Advanced";

export interface FluencyAnalysis {
  fluencyScore: number;
  pacing: "too_short" | "developing" | "steady" | "strong";
  fillerCount: number;
  averageWordsPerSentence: number;
  chunkingAdvice: string;
  pronunciationFocus: string;
  repeatPractice: string;
  microDrill: {
    instruction: string;
    examples: string[];
  };
}

const fillers = ["um", "uh", "like", "actually", "basically", "you know", "i mean"];
const difficultSounds = [
  { pattern: /\b(v|w)/i, focus: "contrast /v/ and /w/ clearly in words like very, work, value, and window" },
  { pattern: /\b(th|think|this|that|there|three)/i, focus: "place the tongue gently for th in think, this, that, and there" },
  { pattern: /\b(r|release|risk|review|right)/i, focus: "keep /r/ clear in work words like release, risk, review, and right" },
  { pattern: /\b(ed|worked|fixed|checked|tested)\b/i, focus: "say past-tense endings clearly: worked, fixed, checked, tested" },
];

function sentenceSplit(text: string) {
  return text.split(/[.!?]+/).map((item) => item.trim()).filter(Boolean);
}

function words(text: string) {
  return text.toLowerCase().match(/[a-z']+/g) || [];
}

function countFillers(text: string) {
  const lower = text.toLowerCase();
  return fillers.reduce((sum, filler) => sum + (lower.match(new RegExp(`\\b${filler.replace(/ /g, "\\s+")}\\b`, "g"))?.length || 0), 0);
}

function pronunciationFocusFor(text: string, level: SpeakingLevel) {
  const match = difficultSounds.find((item) => item.pattern.test(text));
  if (match) return match.focus;
  if (level === "Beginner") return "say each short sentence slowly first, then repeat it naturally";
  if (level === "Advanced") return "use sentence stress to highlight the most important business words";
  return "pause between idea chunks and stress the main verb and noun";
}

function chunkingAdviceFor(avgWords: number, level: SpeakingLevel) {
  if (avgWords < 4) return "Add one reason or detail so the answer is not too short.";
  if (avgWords > 22) return "Break the answer into shorter idea chunks with a small pause after each key point.";
  if (level === "Advanced") return "Keep the answer concise, but add stress on the decision, risk, or result.";
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

function pacingFor(score: number, wordCount: number): FluencyAnalysis["pacing"] {
  if (wordCount < 5) return "too_short";
  if (score <= 5) return "developing";
  if (score >= 9) return "strong";
  return "steady";
}

function repeatPracticeFor(text: string, focus: string) {
  const first = sentenceSplit(text)[0] || text.trim();
  const clean = first.length > 140 ? first.slice(0, 137).trim() + "..." : first;
  return `Repeat this once slowly, then naturally: ${clean}. Focus: ${focus}.`;
}

export function analysePronunciationAndFluency(text: string, level: SpeakingLevel = "Intermediate"): FluencyAnalysis {
  const clean = text.trim();
  const tokenized = words(clean);
  const sentences = sentenceSplit(clean);
  const sentenceCount = Math.max(1, sentences.length);
  const avgWords = tokenized.length / sentenceCount;
  const fillerCount = countFillers(clean);
  const focus = pronunciationFocusFor(clean, level);
  const fluencyScore = scoreFor({ wordCount: tokenized.length, avgWords, fillerCount, sentenceCount });

  return {
    fluencyScore,
    pacing: pacingFor(fluencyScore, tokenized.length),
    fillerCount,
    averageWordsPerSentence: Math.round(avgWords * 10) / 10,
    chunkingAdvice: chunkingAdviceFor(avgWords, level),
    pronunciationFocus: focus,
    repeatPractice: repeatPracticeFor(clean || "I will speak clearly.", focus),
    microDrill: {
      instruction: fillerCount > 0
        ? "Say the same idea again without fillers, using one short pause instead."
        : "Say the sentence once slowly, then repeat it naturally with one clear pause.",
      examples: [
        "Slow version: I will explain the issue clearly.",
        "Natural version: I will explain the issue clearly, then share the next step.",
      ],
    },
  };
}

export function buildFluencyCoachInstruction(text: string, level: SpeakingLevel = "Intermediate") {
  const analysis = analysePronunciationAndFluency(text, level);
  return [
    `Fluency score estimate: ${analysis.fluencyScore}/10.`,
    `Pacing: ${analysis.pacing}.`,
    `Chunking advice: ${analysis.chunkingAdvice}`,
    `Pronunciation focus: ${analysis.pronunciationFocus}`,
    `Repeat practice: ${analysis.repeatPractice}`,
  ].join("\n");
}
