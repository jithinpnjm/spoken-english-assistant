import { getRuntimeConfig, validateRuntimeConfig } from "../src/server/serverHardening";

function fail(message: string): never {
  console.error(`[server-hardening] FAIL: ${message}`);
  process.exit(1);
}

const dev = getRuntimeConfig({ NODE_ENV: "development", PORT: "3000", MAX_AUDIO_BASE64_BYTES: "8000000" } as any);
const devResult = validateRuntimeConfig(dev);
if (devResult.errors.length) fail(`Development config should not fail without API key: ${devResult.errors.join(", ")}`);
if (!devResult.warnings.some((item) => item.includes("GEMINI_API_KEY"))) fail("Development config should warn when Gemini key is missing");

const prodMissingKey = getRuntimeConfig({ NODE_ENV: "production", PORT: "8080", MAX_AUDIO_BASE64_BYTES: "8000000" } as any);
const prodMissingResult = validateRuntimeConfig(prodMissingKey);
if (!prodMissingResult.errors.some((item) => item.includes("GEMINI_API_KEY"))) fail("Production config should require Gemini key");

const prodOk = getRuntimeConfig({ NODE_ENV: "production", PORT: "8080", GEMINI_API_KEY: "set", REQUIRE_API_AUTH: "true", MAX_AUDIO_BASE64_BYTES: "8000000" } as any);
const prodOkResult = validateRuntimeConfig(prodOk);
if (prodOkResult.errors.length) fail(`Production config should be valid: ${prodOkResult.errors.join(", ")}`);
if (!prodOk.requireApiAuth) fail("REQUIRE_API_AUTH=true should enable API auth flag");
if (prodOk.port !== 8080) fail("PORT should be parsed as 8080");

const invalidPort = getRuntimeConfig({ NODE_ENV: "production", PORT: "0", GEMINI_API_KEY: "set", MAX_AUDIO_BASE64_BYTES: "8000000" } as any);
const invalidPortResult = validateRuntimeConfig(invalidPort);
if (!invalidPortResult.errors.some((item) => item.includes("PORT"))) fail("Invalid PORT should be rejected");

console.log("[server-hardening] OK: runtime config validation and auth flags behave as expected.");
