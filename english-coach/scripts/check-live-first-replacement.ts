import fs from "node:fs";
import path from "node:path";

function fail(message: string): never {
  console.error(`[live-first-replacement] FAIL: ${message}`);
  process.exit(1);
}

const root = process.cwd();
const appPath = path.join(root, "src", "App.tsx");
const coachPath = path.join(root, "src", "components", "LiveFirstCoach.tsx");
const shellPath = path.join(root, "src", "components", "LiveFirstLearningShell.tsx");
const topicPath = path.join(root, "src", "lib", "topicProgress.ts");

for (const file of [appPath, coachPath, shellPath, topicPath]) {
  if (!fs.existsSync(file)) fail(`Missing file: ${file}`);
}

const app = fs.readFileSync(appPath, "utf8");
if (!app.includes("LiveFirstCoach")) fail("App should import/render LiveFirstCoach");
if (app.includes("./components/InteractiveCoach")) fail("App should not import InteractiveCoach in live-first mode");

const coach = fs.readFileSync(coachPath, "utf8");
for (const expected of ["LiveFirstLearningShell", "useGeminiLiveAPI", "buildLiveLessonContext", "fetchCurriculum", "startCurriculum"]) {
  if (!coach.includes(expected)) fail(`LiveFirstCoach missing ${expected}`);
}

const shell = fs.readFileSync(shellPath, "utf8");
for (const expected of ["Start Live with Sky", "Topic time", "Simple topic coverage", "Change topic"]) {
  if (!shell.includes(expected)) fail(`LiveFirstLearningShell missing ${expected}`);
}

console.log("[live-first-replacement] OK: App renders LiveFirstCoach and simplified live-first shell is present.");
