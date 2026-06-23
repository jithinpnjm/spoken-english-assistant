import { allowedEmailsFromEnv, defaultAllowedEmails, getBearerToken } from "../src/server/serverAuth";

function fail(message: string): never {
  console.error(`[server-auth] FAIL: ${message}`);
  process.exit(1);
}

const defaults = allowedEmailsFromEnv({} as any);
if (defaults.length !== defaultAllowedEmails.length) fail("Default allowed email count mismatch");
for (const email of defaultAllowedEmails) {
  if (!defaults.includes(email)) fail(`Missing default allowed email ${email}`);
}

const custom = allowedEmailsFromEnv({ ALLOWED_USER_EMAILS: " One@Example.com, two@example.com " } as any);
if (custom.length !== 2) fail("Custom allowed email count mismatch");
if (!custom.includes("one@example.com")) fail("Custom emails should be normalized to lowercase");
if (!custom.includes("two@example.com")) fail("Second custom email missing");

const reqWithToken: any = { headers: { authorization: "Bearer abc.def.ghi" } };
if (getBearerToken(reqWithToken) !== "abc.def.ghi") fail("Bearer token parsing failed");

const reqWithoutToken: any = { headers: { authorization: "Basic abc" } };
if (getBearerToken(reqWithoutToken) !== "") fail("Non-bearer auth should return empty token");

console.log("[server-auth] OK: allowed email config and bearer-token parsing work.");
