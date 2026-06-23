import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, query, where, orderBy, getDocs, updateDoc, deleteDoc, writeBatch, increment } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { CoachMessage, CoachSession, LearnerProfile, MistakeDetail, MistakeMemory } from "../types";
import { dbg } from "./debug";

const ALLOWED_EMAILS = ["jithinpnjm23@gmail.com", "sandrasibiss@gmail.com"];

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

let db: ReturnType<typeof getFirestore>;
try {
  const customId = (firebaseConfig as any).firestoreDatabaseId;
  dbg.db.info("firestoreDatabaseId from config:", customId);
  db = customId ? getFirestore(app, customId) : getFirestore(app);
  dbg.db.info("Firestore initialized with database:", customId || "(default)");
} catch (e) {
  dbg.db.error("Firestore init failed, falling back to default:", e);
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
  dbg.auth.log("assertAllowedEmail →", normalized, "| allowed list:", ALLOWED_EMAILS);
  if (!ALLOWED_EMAILS.includes(normalized)) throw new Error(`Email not in allow-list: ${normalized}`);
}

export async function signInWithGoogle() {
  dbg.auth.log("signInWithGoogle: opening popup...");
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  dbg.auth.log("Popup success — uid:", userCredential.user.uid, "email:", userCredential.user.email);
  assertAllowedEmail(userCredential.user.email);
  dbg.auth.log("Email allowed — ensuring user + learner profiles...");
  await ensureUserProfile(userCredential.user.uid, userCredential.user.email || "", userCredential.user.displayName || profileNameForEmail(userCredential.user.email) || "Student");
  await ensureLearnerProfile(userCredential.user.uid, userCredential.user.email || "");
  dbg.auth.log("signInWithGoogle: complete");
  return userCredential.user;
}

export async function doSignOut() {
  dbg.auth.log("doSignOut called");
  await signOut(auth);
  dbg.auth.log("Signed out");
}

async function ensureUserProfile(uid: string, email: string, defaultName: string) {
  dbg.db.log("ensureUserProfile uid:", uid, "email:", email);
  const userDocRef = doc(db, "users", uid);
  const snap = await getDoc(userDocRef);
  const now = new Date().toISOString();
  if (!snap.exists()) {
    dbg.db.log("ensureUserProfile: no doc found — creating");
    await setDoc(userDocRef, { uid, email: email.toLowerCase(), name: defaultName, level: "Intermediate", highContrast: false, createdAt: now, updatedAt: now });
    dbg.db.log("ensureUserProfile: created");
  } else {
    dbg.db.log("ensureUserProfile: doc exists — updating email/updatedAt");
    await updateDoc(userDocRef, { email: email.toLowerCase(), updatedAt: now });
  }
}

export async function ensureLearnerProfile(uid: string, email: string) {
  dbg.db.log("ensureLearnerProfile uid:", uid, "email:", email);
  const profileId = profileIdForEmail(email);
  const displayName = profileNameForEmail(email);
  dbg.db.log("ensureLearnerProfile → profileId:", profileId, "displayName:", displayName);
  if (!profileId || !displayName) throw new Error(`Unsupported learner email: ${email}`);
  const ref = doc(db, "profiles", profileId);
  const snap = await getDoc(ref);
  const now = new Date().toISOString();
  if (!snap.exists()) {
    dbg.db.log("ensureLearnerProfile: no profile doc — creating for", profileId);
    const profile: LearnerProfile = {
      profileId, ownerUid: uid, ownerEmail: email.toLowerCase(), displayName,
      targetLanguage: "english", level: "Intermediate", goal: "spoken_fluency",
      correctionStyle: "balanced", challengeStartDate: now.slice(0, 10),
      challengeDay: 1, streak: 0, totalPracticeMinutes: 0, createdAt: now, updatedAt: now,
    };
    await setDoc(ref, profile);
    dbg.db.log("ensureLearnerProfile: created profile for", profileId);
  } else {
    dbg.db.log("ensureLearnerProfile: profile exists — updating ownerUid/email");
    await updateDoc(ref, { ownerUid: uid, ownerEmail: email.toLowerCase(), updatedAt: now });
  }
  return profileId;
}

export async function fetchUserProfile(uid: string) {
  dbg.db.log("fetchUserProfile uid:", uid);
  const snap = await getDoc(doc(db, "users", uid));
  const result = snap.exists() ? snap.data() : null;
  dbg.db.log("fetchUserProfile result:", result ? "found" : "null");
  return result;
}

export async function fetchLearnerProfile(profileId: string) {
  dbg.db.log("fetchLearnerProfile profileId:", profileId);
  const snap = await getDoc(doc(db, "profiles", profileId));
  const result = snap.exists() ? (snap.data() as LearnerProfile) : null;
  dbg.db.log("fetchLearnerProfile result:", result ? `challengeDay=${result.challengeDay} level=${result.level}` : "null");
  return result;
}

export async function updateUserProfile(uid: string, data: Partial<{ name: string; level: string; highContrast: boolean }>) {
  dbg.db.log("updateUserProfile uid:", uid, "data:", data);
  await updateDoc(doc(db, "users", uid), { ...data, updatedAt: new Date().toISOString() });
}

export async function updateLearnerProfile(profileId: string, data: Partial<LearnerProfile>) {
  dbg.db.log("updateLearnerProfile profileId:", profileId, "data:", data);
  await updateDoc(doc(db, "profiles", profileId), { ...data, updatedAt: new Date().toISOString() });
}

export async function fetchUserSessions(uid: string, profileId: string) {
  dbg.session.log("fetchUserSessions uid:", uid, "profileId:", profileId);
  const q = query(collection(db, "sessions"), where("userId", "==", uid), where("profileId", "==", profileId));
  const snap = await getDocs(q);
  const sessions: CoachSession[] = [];
  snap.forEach((d) => sessions.push(d.data() as CoachSession));
  sessions.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  dbg.session.log("fetchUserSessions: found", sessions.length, "sessions");
  return sessions;
}

export async function saveSession(session: CoachSession) {
  dbg.session.log("saveSession:", session.sessionId, "title:", session.title);
  await setDoc(doc(db, "sessions", session.sessionId), session);
}

export async function deleteSession(sessionId: string) {
  dbg.session.log("deleteSession:", sessionId);
  await deleteDoc(doc(db, "sessions", sessionId));
}

export async function fetchSessionMessages(sessionId: string) {
  dbg.session.log("fetchSessionMessages:", sessionId);
  const q = query(collection(db, "sessions", sessionId, "messages"), orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  const messages: CoachMessage[] = [];
  snap.forEach((d) => messages.push(d.data() as CoachMessage));
  dbg.session.log("fetchSessionMessages: loaded", messages.length, "messages");
  return messages;
}

export async function saveSessionMessage(sessionId: string, message: CoachMessage) {
  dbg.session.log("saveSessionMessage:", message.messageId, "sender:", message.sender, "kind:", message.kind);
  const batch = writeBatch(db);
  batch.set(doc(db, "sessions", sessionId, "messages", message.messageId), message);
  batch.update(doc(db, "sessions", sessionId), { updatedAt: new Date().toISOString() });
  await batch.commit();
}

export async function fetchMistakeMemory(profileId: string) {
  dbg.db.log("fetchMistakeMemory profileId:", profileId);
  const snap = await getDocs(collection(db, "profiles", profileId, "mistakeMemory"));
  const rows: MistakeMemory[] = [];
  snap.forEach((d) => rows.push(d.data() as MistakeMemory));
  rows.sort((a, b) => b.count - a.count);
  dbg.db.log("fetchMistakeMemory: found", rows.length, "mistake types");
  return rows;
}

export async function upsertMistakeMemory(profileId: string, mistakes: MistakeDetail[], sourceText: string) {
  if (!mistakes.length) return;
  dbg.db.log("upsertMistakeMemory: profileId:", profileId, "mistakes:", mistakes.length, "types:", mistakes.map(m => m.type).join(", "));
  const now = new Date().toISOString();
  const batch = writeBatch(db);
  for (const mistake of mistakes) {
    const mistakeType = (mistake.type || "general").toLowerCase().replace(/[^a-z0-9_-]/g, "_");
    const ref = doc(db, "profiles", profileId, "mistakeMemory", mistakeType);
    batch.set(ref, { mistakeId: mistakeType, profileId, mistakeType, count: increment(1), examples: [sourceText, `${mistake.original} → ${mistake.corrected}`].slice(0, 6), lastSeenAt: now, status: "recurring" }, { merge: true });
  }
  await batch.commit();
  dbg.db.log("upsertMistakeMemory: batch committed");
}

export async function markDailyPractice(profileId: string, day: number, activityType: string) {
  const today = new Date().toISOString().slice(0, 10);
  dbg.db.log("markDailyPractice profileId:", profileId, "day:", day, "activity:", activityType, "date:", today);
  await setDoc(doc(db, "profiles", profileId, "dailyPlans", today), { date: today, day, activityType, completed: true, completedAt: new Date().toISOString() }, { merge: true });
  await updateDoc(doc(db, "profiles", profileId), { challengeDay: Math.max(day + 1, 1), totalPracticeMinutes: increment(10), updatedAt: new Date().toISOString() });
  dbg.db.log("markDailyPractice: done");
}
