// HTTP hardening helpers. asyncHandler / apiRequestLogger / validateAudioPayload / errorHandler are
// ported from english-coach/src/server/serverHardening.ts. Rate limiting, origin checks and the
// optional access code are new: the old app relied on a Firebase login gate in the browser, which the
// docs-driven portal does not have, so the API needs its own abuse protection.

import crypto from "crypto";
import type http from "http";
import type express from "express";
import type { RuntimeConfig } from "./config";

export function asyncHandler(
  handler: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<unknown>,
) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

export function apiRequestLogger(req: express.Request, _res: express.Response, next: express.NextFunction) {
  if (req.path.startsWith("/api/")) {
    console.log(`[Server] ${req.method} ${req.path} — ${new Date().toISOString()}`);
  }
  next();
}

export function validateAudioPayload(maxBytes: number) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const audioBase64 = req.body?.audioBase64;
    if (!audioBase64) return res.status(400).json({ error: "audioBase64 is required" });
    if (typeof audioBase64 !== "string") return res.status(400).json({ error: "audioBase64 must be a string" });
    if (audioBase64.length > maxBytes) return res.status(413).json({ error: "Audio payload is too large" });
    next();
  };
}

export function errorHandler(err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) {
  const status = Number(err?.status || err?.statusCode || 500);
  const safeStatus = status >= 400 && status < 600 ? status : 500;
  const message = safeStatus >= 500 ? "Internal server error" : err?.message || "Request failed";
  console.error("[Server] Request failed:", err?.message || err);
  res.status(safeStatus).json({ error: message });
}

/**
 * Client IP for rate limiting. Cloud Run's front end *appends* the real client address to
 * X-Forwarded-For, so the rightmost entry is the trustworthy one (leftmost entries can be forged by the
 * client). Set TRUSTED_PROXY_HOPS=2 if a Google HTTPS load balancer sits in front of Cloud Run.
 */
export function clientIp(req: http.IncomingMessage): string {
  const hops = Math.max(1, Number(process.env.TRUSTED_PROXY_HOPS || 1));
  const forwarded = req.headers["x-forwarded-for"];
  const list = (Array.isArray(forwarded) ? forwarded.join(",") : forwarded || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return list[list.length - hops] || list[0] || req.socket.remoteAddress || "unknown";
}

/**
 * Fixed-window, in-memory rate limiter. State is per server instance: with Cloud Run scaled to
 * N instances the effective limit is up to N times higher. Good enough as a cost guard for a
 * small personal deployment; use Cloud Armor or a shared store if this ever needs to be strict.
 */
export class FixedWindowRateLimiter {
  private readonly hits = new Map<string, { count: number; resetAt: number }>();

  constructor(private readonly limit: number, private readonly windowMs: number) {}

  /** Returns seconds until retry when the key is over its limit, otherwise 0 (and records the hit). */
  take(key: string, now = Date.now()): number {
    const entry = this.hits.get(key);
    if (!entry || entry.resetAt <= now) {
      this.hits.set(key, { count: 1, resetAt: now + this.windowMs });
      this.prune(now);
      return 0;
    }
    if (entry.count >= this.limit) return Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    entry.count += 1;
    return 0;
  }

  private prune(now: number) {
    if (this.hits.size < 5000) return;
    for (const [key, value] of this.hits) if (value.resetAt <= now) this.hits.delete(key);
  }
}

export function rateLimit(limiter: FixedWindowRateLimiter, bucket: string) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const retryAfter = limiter.take(`${bucket}:${clientIp(req)}`);
    if (retryAfter > 0) {
      res.setHeader("Retry-After", String(retryAfter));
      return res.status(429).json({ error: "Too many requests. Please slow down and try again shortly." });
    }
    next();
  };
}

/**
 * Same-origin requests are always allowed. Requests without an Origin header (curl, server-to-server)
 * are allowed too — origin checks are a browser-abuse guard, not authentication.
 */
export function isOriginAllowed(req: http.IncomingMessage, config: RuntimeConfig): boolean {
  const origin = req.headers.origin;
  if (!origin) return true;
  const normalized = origin.replace(/\/$/, "");
  if (config.allowedOrigins.includes(normalized)) return true;
  try {
    return new URL(normalized).host === req.headers.host;
  } catch {
    return false;
  }
}

/** Minimal CORS for ALLOWED_ORIGINS (used for local dev: Docusaurus on :3000 calling the API on :8080). */
export function corsForAllowedOrigins(config: RuntimeConfig) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const origin = req.headers.origin?.replace(/\/$/, "");
    if (origin && config.allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Practice-Code");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      if (req.method === "OPTIONS") return res.status(204).end();
    }
    next();
  };
}

export function rejectForeignOrigins(config: RuntimeConfig) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!isOriginAllowed(req, config)) return res.status(403).json({ error: "Origin not allowed" });
    next();
  };
}

export function accessCodeMatches(config: RuntimeConfig, provided: string | undefined | null): boolean {
  if (!config.practiceAccessCode) return true;
  if (!provided) return false;
  const a = crypto.createHash("sha256").update(provided).digest();
  const b = crypto.createHash("sha256").update(config.practiceAccessCode).digest();
  return crypto.timingSafeEqual(a, b);
}

export function requireAccessCode(config: RuntimeConfig) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const header = req.headers["x-practice-code"];
    const provided = Array.isArray(header) ? header[0] : header;
    if (!accessCodeMatches(config, provided)) {
      return res.status(401).json({ error: "An access code is required for AI practice.", accessCodeRequired: true });
    }
    next();
  };
}
