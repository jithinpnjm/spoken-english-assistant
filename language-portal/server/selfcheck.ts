// Offline checks for the practice server (no network, no API key needed): `npm run check:server`.
// Replaces the relevant english-coach scripts (check-cursor-logic, check-teach-first,
// check-server-hardening, check-pronunciation-fluency) for the logic that survived the port.

import assert from "assert/strict";
import { getRuntimeConfig, validateRuntimeConfig } from "./config";
import { accessCodeMatches, clientIp, FixedWindowRateLimiter, isOriginAllowed } from "./hardening";
import { levelBand, primaryCefr, sanitizeLesson } from "./coach/lesson";
import { initialPracticeState, MAX_REPEAT_ATTEMPTS, nextPracticeState, sanitizeState, shouldSuggestSummary } from "./coach/lessonFlow";
import { buildTeacherPrompt } from "./coach/teacherPrompt";
import { analyseFluency } from "./coach/fluencySignal";
import { buildLiveSetup } from "./audioBridge";
import { checkCredentials, createSessionValue, readSessionValue } from "./auth";
import { applyUpdate, validLessonPath } from "./progress";

let passed = 0;
function check(name: string, fn: () => void) {
  fn();
  passed += 1;
  console.log(`ok - ${name}`);
}

check("level bands map CEFR labels", () => {
  assert.equal(levelBand("A1"), "Beginner");
  assert.equal(levelBand("B1-B2"), "Intermediate");
  assert.equal(levelBand("B2-C1"), "Advanced");
  assert.equal(levelBand("A1-A2"), "Beginner");
  assert.equal(levelBand("C1"), "Advanced");
  assert.equal(levelBand("Advanced"), "Advanced");
  assert.equal(levelBand(""), "Intermediate");
  assert.equal(primaryCefr("b1-b2"), "B1");
});

check("lesson context is sanitized and clipped", () => {
  const lesson = sanitizeLesson({ language: "German", topic: "x".repeat(500), level: "A1", taskType: "Speaking", prompt: "p".repeat(10_000) });
  assert.equal(lesson.language, "German");
  assert.equal(lesson.topic.length, 200);
  assert.equal(lesson.prompt.length, 6000);
  assert.equal(lesson.taskType, "speaking");
  assert.equal(sanitizeLesson(null).language, "English");
});

check("flow: opening -> practice -> repeat -> practice", () => {
  let state = initialPracticeState();
  state = nextPracticeState(state, { messageType: "on_topic_response", needsRepeat: false, scenarioComplete: false }, false);
  assert.equal(state.phase, "practice");
  state = nextPracticeState(state, { messageType: "learner_attempt", needsRepeat: true, scenarioComplete: false }, true);
  assert.equal(state.phase, "repeat");
  assert.equal(state.learnerTurns, 1);
  state = nextPracticeState(state, { messageType: "learner_attempt", needsRepeat: false, scenarioComplete: false }, true);
  assert.equal(state.phase, "practice");
});

check("flow: side questions do not advance the lesson", () => {
  const repeat = { phase: "repeat" as const, learnerTurns: 3, repeatAttempts: 0 };
  const after = nextPracticeState(repeat, { messageType: "learner_question", needsRepeat: false, scenarioComplete: false }, true);
  assert.equal(after.phase, "repeat");
});

check("flow: repeat loop is capped", () => {
  let state = { phase: "repeat" as const, learnerTurns: 2, repeatAttempts: 0 } as ReturnType<typeof initialPracticeState>;
  for (let i = 0; i < MAX_REPEAT_ATTEMPTS; i += 1) {
    state = nextPracticeState(state, { messageType: "learner_attempt", needsRepeat: true, scenarioComplete: false }, true);
  }
  assert.equal(state.phase, "practice");
});

check("flow: summary completes and is suggested when the scenario ends", () => {
  const summary = nextPracticeState({ phase: "summary", learnerTurns: 4, repeatAttempts: 0 }, { messageType: "on_topic_response", needsRepeat: false, scenarioComplete: true }, false);
  assert.equal(summary.phase, "complete");
  assert.equal(shouldSuggestSummary({ phase: "practice", learnerTurns: 2, repeatAttempts: 0 }, { messageType: "learner_attempt", needsRepeat: false, scenarioComplete: true }), true);
  assert.equal(sanitizeState({ phase: "bogus", learnerTurns: -4 }).phase, "opening");
});

check("chat prompt keeps the correction contract and chat-mode wording", () => {
  const prompt = buildTeacherPrompt({
    lesson: sanitizeLesson({ topic: "Past simple", level: "A2", taskType: "speaking", prompt: "Ask about yesterday." }),
    mode: "chat",
    state: { phase: "practice", learnerTurns: 1, repeatAttempts: 0 },
  });
  assert.match(prompt, /rewrite in chat/);
  assert.match(prompt, /Do not let a high-value error pass/);
  assert.match(prompt, /<scenario>\nAsk about yesterday\.\n<\/scenario>/);
  assert.match(prompt, /CHAT TEXT MODE/);
  assert.doesNotMatch(prompt, /repeat aloud/);
});

check("opening prompt teaches before testing", () => {
  const prompt = buildTeacherPrompt({ lesson: sanitizeLesson({ topic: "Articles" }), mode: "chat", state: initialPracticeState() });
  assert.match(prompt, /Do not test anything that the lesson has not taught/);
});

check("live setup is built server-side with the German policy", () => {
  const setup = buildLiveSetup({ language: "German", topic: "Bakery", level: "A1", taskType: "speaking", prompt: "Persona: baker" }, { geminiLiveModel: "gemini-live-x", geminiLiveVoice: "Aoede" });
  assert.equal(setup.setup.model, "models/gemini-live-x");
  const text = setup.setup.systemInstruction.parts[0].text;
  assert.match(text, /repeat aloud/);
  assert.match(text, /Language policy \(A1\)/);
  assert.match(text, /Persona: baker/);
});

check("fluency signal targets real words only", () => {
  assert.equal(analyseFluency("We was at home.", "Beginner").pronunciationFocus.includes("/v/"), false);
  assert.match(analyseFluency("I worked very hard.", "Intermediate").pronunciationFocus, /\/v\//);
  assert.equal(analyseFluency("um I uh think like yes", "Intermediate").fillerCount, 3);
});

check("rate limiter blocks after the limit and resets", () => {
  const limiter = new FixedWindowRateLimiter(2, 1000);
  assert.equal(limiter.take("a", 0), 0);
  assert.equal(limiter.take("a", 10), 0);
  assert.ok(limiter.take("a", 20) > 0);
  assert.equal(limiter.take("a", 1001), 0);
});

check("client IP uses the rightmost forwarded hop", () => {
  const req = { headers: { "x-forwarded-for": "1.1.1.1, 9.9.9.9" }, socket: { remoteAddress: "10.0.0.1" } } as any;
  assert.equal(clientIp(req), "9.9.9.9");
});

check("origin and access code checks", () => {
  const config = { ...getRuntimeConfig({}), allowedOrigins: ["http://localhost:3000"], practiceAccessCode: "s3cret" };
  assert.equal(isOriginAllowed({ headers: { origin: "https://portal.example", host: "portal.example" } } as any, config), true);
  assert.equal(isOriginAllowed({ headers: { origin: "https://evil.example", host: "portal.example" } } as any, config), false);
  assert.equal(isOriginAllowed({ headers: { origin: "http://localhost:3000", host: "localhost:8080" } } as any, config), true);
  assert.equal(accessCodeMatches(config, "s3cret"), true);
  assert.equal(accessCodeMatches(config, "nope"), false);
  assert.equal(accessCodeMatches({ ...config, practiceAccessCode: "" }, undefined), true);
});

check("production config requires a Gemini key", () => {
  const result = validateRuntimeConfig(getRuntimeConfig({ NODE_ENV: "production" }));
  assert.ok(result.errors.some((item) => item.includes("GEMINI_API_KEY")));
});


const authConfig = getRuntimeConfig({
  AUTH_USERS: "Jithin:password123, sandra:password123",
  SESSION_SECRET: "s".repeat(40),
});

check("login: known users only, exact password, case-insensitive name", () => {
  assert.equal(checkCredentials(authConfig, "Jithin", "password123"), "jithin");
  assert.equal(checkCredentials(authConfig, " sandra ", "password123"), "sandra");
  assert.equal(checkCredentials(authConfig, "jithin", "wrong"), null);
  assert.equal(checkCredentials(authConfig, "someone", "password123"), null);
  assert.equal(checkCredentials(authConfig, "__proto__", "x"), null);
});

check("session cookie: valid, tampered, expired and unknown user", () => {
  const good = createSessionValue("jithin", authConfig.sessionSecret);
  assert.equal(readSessionValue(good, authConfig), "jithin");
  assert.equal(readSessionValue(good.slice(0, -2) + "xx", authConfig), null);
  assert.equal(readSessionValue(createSessionValue("jithin", authConfig.sessionSecret, Date.now() - 31 * 86400_000), authConfig), null);
  assert.equal(readSessionValue(createSessionValue("evil", authConfig.sessionSecret), authConfig), null);
  assert.equal(readSessionValue(undefined, authConfig), null);
});

check("login gate needs a session secret", () => {
  const result = validateRuntimeConfig(getRuntimeConfig({ NODE_ENV: "production", GEMINI_API_KEY: "k", AUTH_USERS: "a:b" }));
  assert.ok(result.errors.some((item) => item.includes("SESSION_SECRET")));
});

check("progress updates: visit, done, undone and validation", () => {
  const empty = { done: {}, visited: {} };
  const visited = applyUpdate(empty, "/docs/german/a1/vol3-grammar/modal-verbs", "visit", "t1");
  assert.equal(visited.visited["/docs/german/a1/vol3-grammar/modal-verbs"], "t1");
  const done = applyUpdate(visited, "/docs/german/a1/vol3-grammar/modal-verbs", "done", "t2");
  assert.equal(done.done["/docs/german/a1/vol3-grammar/modal-verbs"], "t2");
  assert.deepEqual(applyUpdate(done, "/docs/german/a1/vol3-grammar/modal-verbs", "undone").done, {});
  assert.equal(validLessonPath("/docs/german/a1/x"), true);
  assert.equal(validLessonPath("/etc/passwd"), false);
  assert.equal(validLessonPath("/docs/../secret"), false);
});

check("tutor adapts to the learner's level without setting native speech as a goal", () => {
  const a1 = buildTeacherPrompt({ lesson: sanitizeLesson({ language: "German", topic: "t", level: "A1", taskType: "roleplay", prompt: "" }), mode: "chat" });
  assert.match(a1, /C2-level mastery/);
  assert.match(a1, /teach at the learner's level/);
  assert.match(a1, /about 8 words/);
  const b2 = buildTeacherPrompt({ lesson: sanitizeLesson({ language: "English", topic: "t", level: "B2-C1", taskType: "tutor", prompt: "" }), mode: "chat" });
  assert.match(b2, /C2-level mastery/);
  assert.match(b2, /highly proficient English speaker/);
  assert.match(b2, /do not need to sound native/i);
  assert.match(b2, /B2: speak fluently/);
  assert.doesNotMatch(b2, /about 8 words/);
});

check("English speaking coach builds confidence without native-speaker scoring", () => {
  const c1 = buildTeacherPrompt({ lesson: sanitizeLesson({ language: "English", topic: "Storytelling", level: "C1", taskType: "speaking", prompt: "Tell a story." }), mode: "live" });
  assert.match(c1, /do not need to sound native/i);
  assert.match(c1, /let the learner finish their story/i);
  assert.match(c1, /numeric scores only when the authored activity explicitly calls for a checkpoint/i);
  assert.match(c1, /C1: communicate flexibly and effectively/i);
  const german = buildTeacherPrompt({ lesson: sanitizeLesson({ language: "German", topic: "Modal verbs", level: "A1", taskType: "speaking", prompt: "Practise modal verbs." }), mode: "live" });
  assert.doesNotMatch(german, /SPOKEN-ENGLISH CONFIDENCE POLICY/);
});

console.log(`\n${passed} checks passed.`);
