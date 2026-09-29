// Live teacher-quality eval against Gemini: `GEMINI_API_KEY=... npm run eval:teacher`.
// Ported from english-coach/scripts/evaluate-teacher.ts + src/lib/teacherEvalCases.ts, now exercising
// the real /api/chat prompt (buildTeacherPrompt) instead of the retired activity engine.
// Checks that the coach corrects instead of chatting, and asks for a rewrite (needsRepeat).

import { GoogleGenAI } from "@google/genai";
import { createChatHandler } from "./coach/chatHandler";

interface EvalCase {
  id: string;
  lesson: { topic: string; level: string; taskType: string; prompt: string };
  learnerInput: string;
  mustContainAny: string[];
  mustNotContainAny: string[];
}

const cases: EvalCase[] = [
  {
    id: "beginner-past-simple",
    lesson: { topic: "Past simple", level: "A1-A2", taskType: "speaking", prompt: "Ask the learner about yesterday." },
    learnerInput: "Yesterday I go to office and I eat lunch there.",
    mustContainAny: ["went", "ate", "the office"],
    mustNotContainAny: ["tell me more about your office"],
  },
  {
    id: "intermediate-present-perfect",
    lesson: { topic: "Present perfect vs past simple", level: "B1-B2", taskType: "speaking", prompt: "Ask about travel experiences." },
    learnerInput: "I have visited Switzerland last year.",
    mustContainAny: ["visited switzerland last year", "past simple", "last year"],
    mustNotContainAny: ["nice trip"],
  },
  {
    id: "advanced-conditionals",
    lesson: { topic: "Conditionals for risk", level: "B2-C1", taskType: "speaking", prompt: "Discuss release risks." },
    learnerInput: "If the release has a problem, we rollback immediately.",
    mustContainAny: ["will roll back", "we'll roll back"],
    mustNotContainAny: ["cool"],
  },
  {
    id: "workplace-standup",
    lesson: { topic: "Daily standup", level: "B1-B2", taskType: "roleplay", prompt: "You are the tech lead in a standup." },
    learnerInput: "Yesterday I was fixing one issue and today I will do release, no blockers only some confusion with logs.",
    mustContainAny: ["yesterday, i", "today, i", "blocker", "clarification"],
    mustNotContainAny: ["weekend"],
  },
  {
    id: "restaurant-roleplay",
    lesson: { topic: "Ordering food", level: "A1-A2", taskType: "roleplay", prompt: "You are a waiter." },
    learnerInput: "I want one water and one rice please.",
    mustContainAny: ["i'd like", "i would like", "could i have", "a glass of water"],
    mustNotContainAny: ["office"],
  },
];

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is required to run teacher evals.");
    process.exit(1);
  }
  const handler = createChatHandler(new GoogleGenAI({ apiKey }), process.env.GEMINI_MODEL || "gemini-3.1-flash-lite");
  let passed = 0;

  for (const testCase of cases) {
    let payload: any = null;
    const res: any = { status: () => res, json: (body: unknown) => (payload = body) };
    await handler(
      { body: { action: "message", message: testCase.learnerInput, lesson: testCase.lesson, state: { phase: "practice", learnerTurns: 1, repeatAttempts: 0 } } } as any,
      res,
    );
    const text = `${payload?.teacherMessage || ""} ${payload?.correctedSentence || ""} ${payload?.naturalVersion || ""}`.toLowerCase();
    const ok =
      testCase.mustContainAny.some((term) => text.includes(term.toLowerCase())) &&
      !testCase.mustNotContainAny.some((term) => text.includes(term.toLowerCase())) &&
      payload?.state?.phase === "repeat";
    if (ok) passed += 1;
    console.log(`${ok ? "PASS" : "FAIL"} ${testCase.id}`);
    if (!ok) console.log(JSON.stringify(payload, null, 2));
  }

  console.log(`\n${passed}/${cases.length} teacher evals passed.`);
  process.exit(passed === cases.length ? 0 : 1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
