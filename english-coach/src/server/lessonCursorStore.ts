import { cert, getApps, initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { createInitialLessonCursor, createPastTensePilotCursor } from "./lessonCursorLogic";
import type { LessonCursor } from "./lessonCursorTypes";

const memoryStore = new Map<string, LessonCursor>();
let adminDb: ReturnType<typeof getFirestore> | null | undefined;

function createCursor(args: {
  learnerId: string;
  level: string | undefined;
  sessionDay?: number;
  preferPastTensePilot?: boolean;
}) {
  return args.preferPastTensePilot ? createPastTensePilotCursor(args) : createInitialLessonCursor(args);
}

function getAdminDb() {
  if (adminDb !== undefined) return adminDb;
  try {
    if (!getApps().length) {
      const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
      if (serviceAccountJson) {
        initializeApp({ credential: cert(JSON.parse(serviceAccountJson)) });
      } else {
        initializeApp({ credential: applicationDefault() });
      }
    }
    adminDb = getFirestore();
    return adminDb;
  } catch (err: any) {
    console.warn("[lessonCursorStore] Firestore Admin unavailable; using in-memory cursor store:", err?.message || err);
    adminDb = null;
    return null;
  }
}

function cursorRef(learnerId: string) {
  const db = getAdminDb();
  return db?.collection("lessonCursors").doc(learnerId) || null;
}

export async function getOrCreateLessonCursor(args: {
  learnerId: string;
  level: string | undefined;
  sessionDay?: number;
  preferPastTensePilot?: boolean;
}): Promise<LessonCursor> {
  const existingMemory = memoryStore.get(args.learnerId);
  if (existingMemory) return existingMemory;

  const ref = cursorRef(args.learnerId);
  if (ref) {
    const snap = await ref.get();
    if (snap.exists) {
      const cursor = snap.data() as LessonCursor;
      memoryStore.set(args.learnerId, cursor);
      return cursor;
    }
  }

  const created = createCursor(args);
  memoryStore.set(args.learnerId, created);
  if (ref) await ref.set(created, { merge: true });
  return created;
}

export async function saveLessonCursor(cursor: LessonCursor): Promise<LessonCursor> {
  memoryStore.set(cursor.learnerId, cursor);
  const ref = cursorRef(cursor.learnerId);
  if (ref) await ref.set(cursor, { merge: true });
  return cursor;
}

export async function resetLessonCursor(args: {
  learnerId: string;
  level: string | undefined;
  sessionDay?: number;
  preferPastTensePilot?: boolean;
}): Promise<LessonCursor> {
  const created = createCursor(args);
  memoryStore.set(args.learnerId, created);
  const ref = cursorRef(args.learnerId);
  if (ref) await ref.set(created, { merge: true });
  return created;
}

export function clearLessonCursorStoreForTests() {
  memoryStore.clear();
}
