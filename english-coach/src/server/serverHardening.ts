import type express from "express";

export interface RuntimeConfig {
  nodeEnv: string;
  port: number;
  hasGeminiApiKey: boolean;
  requireApiAuth: boolean;
  maxAudioBase64Bytes: number;
}

export function getRuntimeConfig(env = process.env): RuntimeConfig {
  return {
    nodeEnv: env.NODE_ENV || "development",
    port: Number(env.PORT || 3000),
    hasGeminiApiKey: Boolean(env.GEMINI_API_KEY),
    requireApiAuth: env.REQUIRE_API_AUTH === "true",
    maxAudioBase64Bytes: Number(env.MAX_AUDIO_BASE64_BYTES || 8_000_000),
  };
}

export function validateRuntimeConfig(config: RuntimeConfig) {
  const warnings: string[] = [];
  const errors: string[] = [];

  if (!Number.isFinite(config.port) || config.port <= 0) errors.push("PORT must be a positive number.");
  if (!config.hasGeminiApiKey) warnings.push("GEMINI_API_KEY is not defined. Gemini features will fail.");
  if (config.nodeEnv === "production" && !config.hasGeminiApiKey) errors.push("GEMINI_API_KEY is required in production.");
  if (!Number.isFinite(config.maxAudioBase64Bytes) || config.maxAudioBase64Bytes < 100_000) errors.push("MAX_AUDIO_BASE64_BYTES must be at least 100000.");

  return { warnings, errors };
}

export function logRuntimeValidation(config: RuntimeConfig) {
  const result = validateRuntimeConfig(config);
  for (const warning of result.warnings) console.warn(`[Config] WARNING: ${warning}`);
  for (const error of result.errors) console.error(`[Config] ERROR: ${error}`);
  if (result.errors.length && config.nodeEnv === "production") {
    throw new Error(`Invalid production configuration: ${result.errors.join(" ")}`);
  }
}

export function asyncHandler(handler: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<any>) {
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

export function requireApiAuth(config: RuntimeConfig) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!config.requireApiAuth) return next();
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
    return next();
  };
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
