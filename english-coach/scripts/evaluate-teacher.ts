import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { teacherEvalCases } from "../src/lib/teacherEvalCases";
import { buildLessonStatePrompt, getActivityDefinition } from "../src/lib/curriculum";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is required to run teacher evals.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

function buildSystemPrompt(testCase: typeof teacherEvalCases[number]) {
  const definition = getActivityDefinition(testCase.activityType, testCase.level);
  const lessonState = buildLessonStatePrompt({
    definition,
    stepIndex: 1,
    learnerTurns: 1,
    mistakeMemoryText: "No stored recurring mistakes yet.",
    mode: testCase.mode,
  });

  return `You are Sky, a professional spoken-English teacher. You are not a general chatbot.

${lessonState}

Expected teacher action for this eval: ${testCase.expectedTeacherAction}

Return JSON only. The answer must correct the learner, explain the useful rule, give a natural version, and ask one targeted practice instruction.`;
}

async function runCase(testCase: typeof teacherEvalCases[number]) {
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-3.1-flash-lite",
    contents: [{ role: "user", parts: [{ text: testCase.learnerInput }] }],
    config: {
      systemInstruction: buildSystemPrompt(testCase),
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          coachReply: { type: Type.STRING },
          correctedSentence: { type: Type.STRING },
          naturalVersion: { type: Type.STRING },
          mistakes: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { type: { type: Type.STRING }, explanation: { type: Type.STRING } }, required: ["type", "explanation"] } },
          nextQuestion: { type: Type.STRING },
        },
        required: ["coachReply", "correctedSentence", "naturalVersion", "mistakes", "nextQuestion"],
      },
    },
  });

  const payload = JSON.parse((response.text || "{}").trim());
  const combined = `${payload.coachReply || ""} ${payload.correctedSentence || ""} ${payload.naturalVersion || ""} ${payload.nextQuestion || ""}`.toLowerCase();
  const mistakeTypes = Array.isArray(payload.mistakes) ? payload.mistakes.map((m: any) => String(m.type || "").toLowerCase()) : [];

  const containsRequired = testCase.mustContainAny.some((term) => combined.includes(term.toLowerCase()));
  const containsForbidden = testCase.mustNotContainAny.some((term) => combined.includes(term.toLowerCase()));
  const containsExpectedMistake = testCase.expectedMistakeTypes.some((term) => mistakeTypes.includes(term.toLowerCase()));
  const passed = containsRequired && !containsForbidden && containsExpectedMistake;

  return { id: testCase.id, passed, containsRequired, containsForbidden, containsExpectedMistake, payload };
}

async function main() {
  const results = [];
  for (const testCase of teacherEvalCases) {
    process.stdout.write(`Running ${testCase.id}... `);
    const result = await runCase(testCase);
    results.push(result);
    console.log(result.passed ? "PASS" : "FAIL");
    if (!result.passed) {
      console.log(JSON.stringify(result, null, 2));
    }
  }
  const passed = results.filter((r) => r.passed).length;
  console.log(`\nTeacher eval score: ${passed}/${results.length}`);
  if (passed !== results.length) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
