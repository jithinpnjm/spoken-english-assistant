import type express from "express";
import admin from "firebase-admin";
import type { RuntimeConfig } from "./serverHardening";

export interface AuthenticatedUser {
  uid: string;
  email: string;
  name?: string;
}

export const defaultAllowedEmails = ["jithinpnjm23@gmail.com", "sandrasibiss@gmail.com"];

export function allowedEmailsFromEnv(env = process.env) {
  const raw = env.ALLOWED_USER_EMAILS || defaultAllowedEmails.join(",");
  return raw.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
}

export function getBearerToken(req: express.Request) {
  const header = req.headers.authorization || "";
  if (Array.isArray(header)) return "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
}

export function ensureFirebaseAdmin() {
  if (admin.apps.length) return admin.app();
  return admin.initializeApp();
}

export async function verifyFirebaseUser(token: string, allowedEmails: string[]): Promise<AuthenticatedUser> {
  ensureFirebaseAdmin();
  const decoded = await admin.auth().verifyIdToken(token);
  const email = String(decoded.email || "").toLowerCase();
  if (!email || !allowedEmails.includes(email)) {
    const err: any = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  return { uid: decoded.uid, email, name: typeof decoded.name === "string" ? decoded.name : undefined };
}

export function firebaseAuthMiddleware(config: RuntimeConfig, allowedEmails = allowedEmailsFromEnv()) {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!config.requireApiAuth) {
      (req as any).authenticatedUser = { uid: "dev-user", email: "dev@example.local", name: "Local Dev" };
      return next();
    }

    const token = getBearerToken(req);
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
      (req as any).authenticatedUser = await verifyFirebaseUser(token, allowedEmails);
      return next();
    } catch (err: any) {
      const status = err?.status === 403 ? 403 : 401;
      console.warn("[Auth] Request rejected:", err?.message || err);
      return res.status(status).json({ error: status === 403 ? "Forbidden" : "Unauthorized" });
    }
  };
}

export function getAuthenticatedUser(req: express.Request): AuthenticatedUser | undefined {
  return (req as any).authenticatedUser;
}
