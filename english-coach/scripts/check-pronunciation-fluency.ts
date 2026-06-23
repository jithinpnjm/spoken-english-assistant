import { analysePronunciationAndFluency, buildFluencyCoachInstruction } from "../src/server/pronunciationFluencyEngine";

function fail(message: string): never {
  console.error(`[pronunciation-fluency] FAIL: ${message}`);
  process.exit(1);
}

const short = analysePronunciationAndFluency("I fixed it.", "Intermediate");
if (short.pacing !== "too_short") fail("Short answer should be marked too_short");
if (!short.chunkingAdvice.includes("reason") && !short.chunkingAdvice.includes("detail")) fail("Short answer should ask for reason/detail");

const filler = analysePronunciationAndFluency("Actually I mean I fixed the issue and basically I checked the logs.", "Intermediate");
if (filler.fillerCount < 2) fail("Filler count should detect repeated fillers");
if (!filler.microDrill.instruction.includes("without fillers")) fail("Filler drill should ask to remove fillers");

const sound = analysePronunciationAndFluency("We reviewed the release risk and fixed the tested workflow.", "Advanced");
if (!sound.pronunciationFocus.length) fail("Pronunciation focus should be populated");
if (!sound.repeatPractice.includes("Repeat this once slowly")) fail("Repeat practice should be populated");
if (sound.fluencyScore < 1 || sound.fluencyScore > 10) fail("Fluency score must be within 1-10");

const instruction = buildFluencyCoachInstruction("I reviewed the release risk today.", "Advanced");
for (const marker of ["Fluency score estimate", "Pacing", "Chunking advice", "Pronunciation focus", "Repeat practice"]) {
  if (!instruction.includes(marker)) fail(`Instruction missing ${marker}`);
}

console.log("[pronunciation-fluency] OK: fluency scoring, filler detection, focus, repeat practice, and instruction generation work.");
