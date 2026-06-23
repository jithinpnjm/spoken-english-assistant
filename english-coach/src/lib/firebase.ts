import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, query, where, orderBy, getDocs, updateDoc, deleteDoc, writeBatch, increment } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { CoachMessage, CoachSession, LearnerProfile, MistakeDetail, MistakeMemory } from "../types";

const ALLOWED_EMAILS = ["jithinpnjm23@gmail.com", "sandrasibiss@gmail.com"];

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
let db: ReturnType<typeof getFirestore>;
try {
  const customId = (firebaseConfig as any).firestoreDatabaseId;
  db = customId && customId !== "remixed-firestore-database-id" ? getFirestore(app, customId) : getFirestore(app);
} catch {
  db = getFirestore(app);
}
export { db };

export function profileNameForEmail(email?: string | null) {
  const normalized = (email || "").toLowerCase();
  if (normalized === "jithinpnjm23@gmail.com") return "Jithin";
  if (normalized === "sandrasibiss@gmail.com") return "Sandra";
  return null;
}

export function profileIdForEmail(email?: string | null) {
  const name = profileNameForEmail(email);
  return name ? name.toLowerCase() : null;
}

function assertAllowedEmail(email?: string | null) {
  const normalized = (email || "").toLowerCase();
  if (!ALLOWED_EMAILS.includes(normalized)) throw new Error("This English Coach is restricted to Jithin and Sandra only.");
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  assertAllowedEmail(userCredential.user.email);
  await ensureUserProfile(userCredential.user.uid, userCredential.user.email || "", userCredential.user.displayName || profileNameForEmail(userCredential.user.email) || "Student");
  await ensureLearnerProfile(userCredential.user.uid, userCredential.user.email || "");
  return userCredential.user;
}

export async function doSignOut() {
  await signOut(auth);
}

async function ensureUserProfile(uid: string, email: string, defaultName: string) {
  const userDocRef = doc(db, "users", uid);
  const snap = await getDoc(userDocRef);
  const now = new Date().toISOString();
  if (!snap.exists()) {
    await setDoc(userDocRef, { uid, email: email.toLowerCase(), name: defaultName, level: "Intermediate", highContrast: false, createdAt: now, updatedAt: now });
  } else {
    await updateDoc(userDocRef, { email: email.toLowerCase(), updatedAt: now });
  }
}

export async function ensureLearnerProfile(uid: string, email: string) {
  const profileId = profileIdForEmail(email);
  const displayName = profileNameForEmail(email);
  if (!profileId || !displayName) throw new Error("Unsupported learner email.");
  const ref = doc(db, "profiles", profileId);
  const snap = await getDoc(ref);
  const now = new Date().toISOString();
  if (!snap.exists()) {
    const profile: LearnerProfile = {
      profileId,
      ownerUid: uid,
      ownerEmail: email.toLowerCase(),
      displayName,
      targetLanguage: "english",
      level: "Intermediate",
      goal: "spoken_fluency",
      correctionStyle: "balanced",
      challengeStartDate: now.slice(0, 10),
      challengeDay: 1,
      streak: 0,
      totalPracticeMinutes: 0,
      createdAt: now,
      updatedAt: now,
    };
    await setDoc(ref, profile);
  } else {
    await updateDoc(ref, { ownerUid: uid, ownerEmail: email.toLowerCase(), updatedAt: now });
  }
  return profileId;
}

export async function fetchUserProfile(uid: string) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

export async function fetchLearnerProfile(profileId: string) {
  const snap = await getDoc(doc(db, "profiles", profileId));
  return snap.exists() ? (snap.data() as LearnerProfile) : null;
}

export async function updateUserProfile(uid: string, data: Partial<{ name: string; level: string; highContrast: boolean }>) {
  await updateDoc(doc(db, "users", uid), { ...data, updatedAt: new Date().toISOString() });
}

export async function updateLearnerProfile(profileId: string, data: Partial<LearnerProfile>) {
  await updateDoc(doc(db, "profiles", profileId), { ...data, updatedAt: new Date().toISOString() });
}

export async function fetchUserSessions(uid: string, profileId: string) {
  const q = query(collection(db, "sessions"), where("userId", "==", uid), where("profileId", "==", profileId));
  const snap = await getDocs(q);
  const sessions: CoachSession[] = [];
  snap.forEach((d) => sessions.push(d.data() as CoachSession));
  return sessions.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export async function saveSession(session: CoachSession) {
  await setDoc(doc(db, "sessions", session.sessionId), session);
}

export async function deleteSession(sessionId: string) {
  await deleteDoc(doc(db, "sessions", sessionId));
}

export async function fetchSessionMessages(sessionId: string) {
  const q = query(collection(db, "sessions", sessionId, "messages"), orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  const messages: CoachMessage[] = [];
  snap.forEach((d) => messages.push(d.data() as CoachMessage));
  return messages;
}

export async function saveSessionMessage(sessionId: string, message: CoachMessage) {
  const batch = writeBatch(db);
  batch.set(doc(db, "sessions", sessionId, "messages", message.messageId), message);
  batch.update(doc(db, "sessions", sessionId), { updatedAt: new Date().toISOString() });
  await batch.commit();
}

export async function fetchMistakeMemory(profileId: string) {
  const snap = await getDocs(collection(db, "profiles", profileId, "mistakeMemory"));
  const rows: MistakeMemory[] = [];
  snap.forEach((d) => rows.push(d.data() as MistakeMemory));
  return rows.sort((a, b) => b.count - a.count);
}

export async function upsertMistakeMemory(profileId: string, mistakes: MistakeDetail[], sourceText: string) {
  if (!mistakes.length) return;
  const now = new Date().toISOString();
  const batch = writeBatch(db);
  for (const mistake of mistakes) {
    const mistakeType = (mistake.type || "general").toLowerCase().replace(/[^a-z0-9_-]/g, "_");
    const ref = doc(db, "profiles", profileId, "mistakeMemory", mistakeType);
    batch.set(ref, { mistakeId: mistakeType, profileId, mistakeType, count: increment(1), examples: [sourceText, `${mistake.original} → ${mistake.corrected}`].slice(0, 6), lastSeenAt: now, status: "recurring" }, { merge: true });
  }
  await batch.commit();
}

export async function markDailyPractice(profileId: string, day: number, activityType: string) {
  const today = new Date().toISOString().slice(0, 10);
  await setDoc(doc(db, "profiles", profileId, "dailyPlans", today), { date: today, day, activityType, completed: true, completedAt: new Date().toISOString() }, { merge: true });
  await updateDoc(doc(db, "profiles", profileId), { challengeDay: Math.max(day + 1, 1), totalPracticeMinutes: increment(10), updatedAt: new Date().toISOString() });
}
