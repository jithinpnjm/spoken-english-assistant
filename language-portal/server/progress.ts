// Per-account study progress: which lessons a user finished and which they opened.
// Stored in Firestore (collection "lp_progress", one document per username). Without Firestore
// credentials (local dev) it falls back to memory so the feature still works, just not persistently.

import express from "express";
import { Firestore } from "@google-cloud/firestore";
import type { RuntimeConfig } from "./config";
import { requestUser } from "./auth";

export interface ProgressDoc {
  done: Record<string, string>;
  visited: Record<string, string>;
}

const MAX_VISITED = 800;
const PATH_RE = /^\/docs\/[a-z0-9\-_/]+$/i;

export function validLessonPath(value: unknown): value is string {
  return typeof value === "string" && value.length <= 200 && PATH_RE.test(value);
}

export interface ProgressStore {
  get(user: string): Promise<ProgressDoc>;
  save(user: string, doc: ProgressDoc): Promise<void>;
}

export class MemoryStore implements ProgressStore {
  private data = new Map<string, ProgressDoc>();
  async get(user: string) {
    return structuredClone(this.data.get(user) ?? { done: {}, visited: {} });
  }
  async save(user: string, doc: ProgressDoc) {
    this.data.set(user, structuredClone(doc));
  }
}

class FirestoreStore implements ProgressStore {
  private db = new Firestore();
  async get(user: string) {
    const snap = await this.db.collection("lp_progress").doc(user).get();
    const data = snap.data() || {};
    // Paths are stored with "/" swapped for "|" because Firestore field names cannot contain "/".
    const fromStored = (m: Record<string, string> | undefined) =>
      Object.fromEntries(Object.entries(m || {}).map(([k, v]) => [k.replace(/\|/g, "/"), v]));
    return { done: fromStored(data.done), visited: fromStored(data.visited) };
  }
  async save(user: string, doc: ProgressDoc) {
    const toStored = (m: Record<string, string>) => Object.fromEntries(Object.entries(m).map(([k, v]) => [k.replace(/\//g, "|"), v]));
    await this.db.collection("lp_progress").doc(user).set({ done: toStored(doc.done), visited: toStored(doc.visited), updatedAt: new Date().toISOString() });
  }
}

export function applyUpdate(doc: ProgressDoc, path: string, action: "visit" | "done" | "undone", now = new Date().toISOString()): ProgressDoc {
  const next: ProgressDoc = { done: { ...doc.done }, visited: { ...doc.visited } };
  if (action === "visit") {
    next.visited[path] = now;
    const keys = Object.keys(next.visited);
    if (keys.length > MAX_VISITED) {
      keys.sort((a, b) => next.visited[a].localeCompare(next.visited[b]));
      for (const key of keys.slice(0, keys.length - MAX_VISITED)) delete next.visited[key];
    }
  } else if (action === "done") {
    next.done[path] = now;
    next.visited[path] = next.visited[path] || now;
  } else {
    delete next.done[path];
  }
  return next;
}

export function installProgress(app: express.Express, config: RuntimeConfig, store?: ProgressStore) {
  const backend = store ?? (config.nodeEnv === "production" ? new FirestoreStore() : new MemoryStore());

  app.get("/api/progress", async (req, res, next) => {
    try {
      const user = requestUser(req, config);
      if (!user) return res.status(401).json({ error: "Sign in required" });
      res.json({ user, ...(await backend.get(user)) });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/progress", express.json({ limit: "4kb" }), async (req, res, next) => {
    try {
      const user = requestUser(req, config);
      if (!user) return res.status(401).json({ error: "Sign in required" });
      const { path, action } = req.body || {};
      if (!validLessonPath(path) || !["visit", "done", "undone"].includes(action)) return res.status(400).json({ error: "Invalid progress update" });
      const next_ = applyUpdate(await backend.get(user), path, action);
      await backend.save(user, next_);
      res.json({ user, ...next_ });
    } catch (err) {
      next(err);
    }
  });
}
