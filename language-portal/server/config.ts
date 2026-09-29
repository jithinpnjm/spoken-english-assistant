// Runtime configuration for the language-portal server.
// Ported from english-coach/src/server/serverHardening.ts (getRuntimeConfig / validateRuntimeConfig)
// and extended with the abuse-protection knobs the public practice API needs.

export interface RuntimeConfig {
  nodeEnv: string;
  port: number;
  staticDir: string;
  geminiApiKey: string;
  geminiModel: string;
  geminiLiveModel: string;
  geminiLiveVoice: string;
  /** Accounts allowed to sign in: lower-case username -> password (AUTH_USERS="name:password,..."). Empty = no login gate (local dev only). */
  users: Record<string, string>;
  /** HMAC key for the signed session cookie. */
  sessionSecret: string;
  /** Optional shared access code. When set, /api/chat, /api/transcribe and the audio bridge require it. */
  practiceAccessCode: string;
  /** Extra browser origins allowed to call the API / open the WebSocket (same-origin is always allowed). */
  allowedOrigins: string[];
  maxAudioBase64Bytes: number;
  chatRequestsPerMinute: number;
  transcribeRequestsPerMinute: number;
  liveSessionsPerHour: number;
  liveMaxConcurrentPerIp: number;
  liveMaxConcurrentTotal: number;
  liveMaxSessionSeconds: number;
}

function num(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && value !== undefined && value !== "" ? parsed : fallback;
}

function parseUsers(raw: string | undefined) {
  const users: Record<string, string> = {};
  for (const entry of (raw || "").split(",")) {
    const at = entry.indexOf(":");
    if (at < 1) continue;
    users[entry.slice(0, at).trim().toLowerCase()] = entry.slice(at + 1).trim();
  }
  return users;
}

export function getRuntimeConfig(env: NodeJS.ProcessEnv = process.env): RuntimeConfig {
  return {
    nodeEnv: env.NODE_ENV || "development",
    port: num(env.PORT, 8080),
    staticDir: env.STATIC_DIR || "build",
    geminiApiKey: env.GEMINI_API_KEY || "",
    geminiModel: env.GEMINI_MODEL || "gemini-3.1-flash-lite",
    geminiLiveModel: env.GEMINI_LIVE_MODEL || "models/gemini-3.1-flash-live-preview",
    geminiLiveVoice: env.GEMINI_LIVE_VOICE || "Aoede",
    users: parseUsers(env.AUTH_USERS),
    sessionSecret: env.SESSION_SECRET || "",
    practiceAccessCode: (env.PRACTICE_ACCESS_CODE || "").trim(),
    allowedOrigins: (env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((item) => item.trim().replace(/\/$/, ""))
      .filter(Boolean),
    maxAudioBase64Bytes: num(env.MAX_AUDIO_BASE64_BYTES, 8_000_000),
    chatRequestsPerMinute: num(env.CHAT_REQUESTS_PER_MINUTE, 20),
    transcribeRequestsPerMinute: num(env.TRANSCRIBE_REQUESTS_PER_MINUTE, 20),
    liveSessionsPerHour: num(env.LIVE_SESSIONS_PER_HOUR, 12),
    liveMaxConcurrentPerIp: num(env.LIVE_MAX_CONCURRENT_PER_IP, 2),
    liveMaxConcurrentTotal: num(env.LIVE_MAX_CONCURRENT_TOTAL, 20),
    liveMaxSessionSeconds: num(env.LIVE_MAX_SESSION_SECONDS, 600),
  };
}

export function validateRuntimeConfig(config: RuntimeConfig) {
  const warnings: string[] = [];
  const errors: string[] = [];

  if (!Number.isFinite(config.port) || config.port <= 0) errors.push("PORT must be a positive number.");
  if (!config.geminiApiKey) warnings.push("GEMINI_API_KEY is not defined. AI practice (chat + voice) will fail.");
  if (config.nodeEnv === "production" && !config.geminiApiKey) errors.push("GEMINI_API_KEY is required in production.");
  if (config.maxAudioBase64Bytes < 100_000) errors.push("MAX_AUDIO_BASE64_BYTES must be at least 100000.");
  if (config.liveMaxSessionSeconds < 30) errors.push("LIVE_MAX_SESSION_SECONDS must be at least 30.");
  if (Object.keys(config.users).length && config.sessionSecret.length < 32) errors.push("SESSION_SECRET (at least 32 characters) is required when AUTH_USERS is set.");
  if (config.nodeEnv === "production" && !Object.keys(config.users).length) warnings.push("AUTH_USERS is not set: the whole site is open without sign-in.");
  if (config.nodeEnv === "production" && !config.practiceAccessCode) {
    warnings.push("PRACTICE_ACCESS_CODE is not set: the AI practice API is open to anyone who can reach the site (rate limits still apply).");
  }

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
