import { VOCABULARY_BANK, type VocabWord } from "./vocabularyBank";

export type VocabPracticeMode = "fill_in_blank" | "choose_right_word" | "use_in_sentence" | "word_quiz";

export interface DailyVocabSession {
  words: VocabWord[];
  day: number;
  level: "Beginner" | "Intermediate" | "Advanced";
}

function dayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

function pickN(pool: VocabWord[], n: number, seed: number): VocabWord[] {
  if (pool.length === 0) return [];
  const result: VocabWord[] = [];
  const offset = (seed * 7) % pool.length;
  for (let i = 0; i < n; i++) {
    result.push(pool[(offset + i) % pool.length]);
  }
  return result;
}

export function getDailyWords(_level: "Beginner" | "Intermediate" | "Advanced", _challengeDay: number, setIndex = 0): VocabWord[] {
  // Always mix all 3 tiers: 3 basic + 4 intermediate + 3 advanced
  // Rotates by calendar day; setIndex lets the learner advance to the next set manually
  const seed = dayOfYear() + setIndex * 37;
  const basic = pickN(VOCABULARY_BANK.filter((w) => w.tier === "basic"), 3, seed);
  const intermediate = pickN(VOCABULARY_BANK.filter((w) => w.tier === "intermediate"), 4, seed + 11);
  const advanced = pickN(VOCABULARY_BANK.filter((w) => w.tier === "advanced"), 3, seed + 23);
  return [...basic, ...intermediate, ...advanced];
}

export function totalVocabSets(): number {
  const basicSets = Math.floor(VOCABULARY_BANK.filter((w) => w.tier === "basic").length / 3);
  return Math.min(basicSets, 10); // cap at 10 sets per day
}

export function buildVocabLiveContext(
  words: VocabWord[],
  mode: VocabPracticeMode,
  level: "Beginner" | "Intermediate" | "Advanced"
): string {
  const wordList = words.map((w, i) => `${i + 1}. "${w.word}" (${w.type}) — ${w.meaning}`).join("\n");
  const sentenceBank = words.map((w) => `"${w.word}": ${w.sentences[0]}`).join("\n");

  const modeInstructions: Record<VocabPracticeMode, string> = {
    fill_in_blank: `PRACTICE MODE: Fill in the blank.
For each word, say a sentence with the word removed, replacing it with "blank". Ask the learner to say the correct word. Example: "She worked hard to _____ her goal." → learner says "achieve". After each correct answer, confirm and move to the next word. If wrong, give a hint (the first letter or the meaning) and try again.`,

    choose_right_word: `PRACTICE MODE: Choose the right word.
For each word, give three options (the correct word + two plausible distractors from the word list). Read all three options aloud. Ask the learner to say the correct one. After each answer, confirm or correct and explain why the others don't fit.`,

    use_in_sentence: `PRACTICE MODE: Use in a sentence.
Say each word and its meaning. Ask the learner to make their own sentence using it. Listen carefully. If their sentence is grammatically wrong, correct it. If the word is misused, explain why and give the right example. Encourage creativity but insist on accuracy.`,

    word_quiz: `PRACTICE MODE: Word quiz.
For each word, give only the meaning and ask the learner to recall the word. Example: "What word means to carefully examine every detail?" → learner says "scrutinize". If they're stuck after 5 seconds, give the first letter as a hint. Track how many they get right.`,
  };

  const levelStrictness: Record<string, string> = {
    Beginner: "Keep your tone warm and encouraging. Celebrate correct answers. Gently correct mistakes with a simple explanation.",
    Intermediate: "Be supportive but precise. Correct every wrong answer clearly — name the mistake, explain the rule in one sentence, give the correct version. Push for good word choice and proper sentences.",
    Advanced: "Be precise and constructive — the tone of a good coach, not an examiner. Correct mistakes clearly and name what went wrong, but stay encouraging. Push for strong word choice, accurate grammar, and natural sentences. Acknowledge good answers genuinely.",
  };

  return `You are Sky, a vocabulary coach for a ${level}-level English learner.

${levelStrictness[level]}

TODAY'S 10 WORDS:
${wordList}

EXAMPLE SENTENCES:
${sentenceBank}

${modeInstructions[mode]}

RULES:
1. Go through all 10 words in order.
2. After completing all 10, give a short summary: how many correct, which words to review.
3. Do not skip a word — every word must be practiced.
4. After the summary, offer to replay the missed words or try a different mode.
5. Keep it conversational and spoken — this is a voice session, not a written test.`;
}
