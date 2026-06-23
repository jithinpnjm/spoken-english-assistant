import { createInitialLessonCursor, createPastTensePilotCursor } from "./lessonCursorLogic";
import type { LessonCursor } from "./lessonCursorTypes";

const memoryStore = new Map<string, LessonCursor>();

export async function getOrCreateLessonCursor(args: {
  learnerId: string;
  level: string | undefined;
  sessionDay?: number;
  preferPastTensePilot?: boolean;
}): Promise<LessonCursor> {
  const existing = memoryStore.get(args.learnerId);
  if (existing) return existing;
  const created = args.preferPastTensePilot
    ? createPastTensePilotCursor(args)
    : createInitialLessonCursor(args);
  memoryStore.set(args.learnerId, created);
  return created;
}

export async function saveLessonCursor(cursor: LessonCursor): Promise<LessonCursor> {
  memoryStore.set(cursor.learnerId, cursor);
  return cursor;
}

export async function resetLessonCursor(args: {
  learnerId: string;
  level: string | undefined;
  sessionDay?: number;
  preferPastTensePilot?: boolean;
}): Promise<LessonCursor> {
  const created = args.preferPastTensePilot
    ? createPastTensePilotCursor(args)
    : createInitialLessonCursor(args);
  memoryStore.set(args.learnerId, created);
  return created;
}

export function clearLessonCursorStoreForTests() {
  memoryStore.clear();
}
