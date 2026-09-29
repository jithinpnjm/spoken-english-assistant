// Simple account login for the whole site: a fixed set of users (AUTH_USERS="name:password,name:password").
// POST /auth/login sets a signed, HttpOnly session cookie; everything except /healthz and the login
// endpoints then requires that cookie (pages, /api/* and the voice WebSocket).

import crypto from "crypto";
import type http from "http";
import express from "express";
import type { RuntimeConfig } from "./config";
import { FixedWindowRateLimiter, clientIp } from "./hardening";

const COOKIE_NAME = "lp_session";
const SESSION_SECONDS = 30 * 24 * 60 * 60;

export function authEnabled(config: RuntimeConfig) {
  return Object.keys(config.users).length > 0;
}

function sign(payload: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function checkCredentials(config: RuntimeConfig, username: string, password: string): string | null {
  const name = username.trim().toLowerCase();
  const expected = Object.prototype.hasOwnProperty.call(config.users, name) ? config.users[name] : undefined;
  // Compare against a dummy value for unknown users so timing does not reveal which names exist.
  const ok = safeEqual(password, expected ?? "\u0000no-such-user");
  return expected !== undefined && ok ? name : null;
}

export function createSessionValue(user: string, secret: string, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ u: user, x: Math.floor(now / 1000) + SESSION_SECONDS })).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function readSessionValue(value: string | undefined, config: RuntimeConfig, now = Date.now()): string | null {
  if (!value || !config.sessionSecret) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;
  if (!safeEqual(signature, sign(payload, config.sessionSecret))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.u !== "string" || typeof data.x !== "number" || data.x < now / 1000) return null;
    return Object.prototype.hasOwnProperty.call(config.users, data.u) ? data.u : null;
  } catch {
    return null;
  }
}

function cookieFrom(header: string | undefined) {
  for (const part of (header || "").split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === COOKIE_NAME) return rest.join("=");
  }
  return undefined;
}

export function requestUser(req: http.IncomingMessage, config: RuntimeConfig): string | null {
  return readSessionValue(cookieFrom(req.headers.cookie), config);
}

function loginPage() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sign in - Language Portal</title>
<style>
:root{--bg:#f6f7f9;--fg:#1c1e21;--card:#fff;--muted:#606770;--line:#c9ccd1}
@media (prefers-color-scheme:dark){:root{--bg:#18191a;--fg:#e4e6eb;--card:#242526;--muted:#b0b3b8;--line:#4a4c50}}
body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--bg);color:var(--fg);font:16px/1.5 system-ui,sans-serif}
main{background:var(--card);padding:2rem;border-radius:12px;width:min(22rem,calc(100vw - 2rem));box-shadow:0 2px 12px rgba(0,0,0,.12)}
label{display:block;margin:.75rem 0 .25rem}input{width:100%;box-sizing:border-box;padding:.6rem;font:inherit;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--fg)}
button{margin-top:1rem;width:100%;padding:.7rem;font:inherit;border:0;border-radius:8px;background:#2e8555;color:#fff;cursor:pointer}
#msg{color:#c0392b;min-height:1.5em;margin:.75rem 0 0}p{color:var(--muted)}
</style></head><body><main>
<h1>Language Portal</h1><p>Sign in to continue.</p>
<form id="f"><label for="u">Name</label><input id="u" name="u" autocomplete="username" autocapitalize="none" required>
<label for="p">Password</label><input id="p" name="p" type="password" autocomplete="current-password" required>
<button type="submit">Sign in</button><p id="msg" role="alert"></p></form>
<script>
document.getElementById('f').addEventListener('submit',function(e){
  e.preventDefault();var m=document.getElementById('msg');m.textContent='';
  fetch('/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',
    body:JSON.stringify({username:document.getElementById('u').value,password:document.getElementById('p').value})})
  .then(function(r){if(r.ok){location.reload();}else if(r.status===429){m.textContent='Too many attempts. Wait a minute.';}else{m.textContent='Wrong name or password.';}})
  .catch(function(){m.textContent='Could not sign in. Try again.';});
});
</script></main></body></html>`;
}

export function installAuth(app: express.Express, config: RuntimeConfig) {
  if (!authEnabled(config)) return;
  const attempts = new FixedWindowRateLimiter(8, 60_000);

  app.post("/auth/login", express.json({ limit: "4kb" }), (req, res) => {
    if (attempts.take(clientIp(req)) > 0) return res.status(429).json({ error: "Too many attempts" });
    const user = checkCredentials(config, String(req.body?.username ?? ""), String(req.body?.password ?? ""));
    if (!user) return res.status(401).json({ error: "Wrong name or password" });
    const secure = req.secure || req.headers["x-forwarded-proto"] === "https";
    res.setHeader(
      "Set-Cookie",
      `${COOKIE_NAME}=${createSessionValue(user, config.sessionSecret)}; Path=/; Max-Age=${SESSION_SECONDS}; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`,
    );
    return res.json({ ok: true, user });
  });

  app.post("/auth/logout", (_req, res) => {
    res.setHeader("Set-Cookie", `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`);
    res.json({ ok: true });
  });

  app.get("/auth/me", (req, res) => {
    const user = requestUser(req, config);
    return user ? res.json({ user }) : res.status(401).json({ error: "Sign in required" });
  });

  app.use((req, res, next) => {
    if (req.path === "/healthz") return next();
    if (requestUser(req, config)) return next();
    if (req.path.startsWith("/api/")) return res.status(401).json({ error: "Sign in required", signInRequired: true });
    res.setHeader("Cache-Control", "no-store");
    return res.status(401).type("html").send(loginPage());
  });
}
