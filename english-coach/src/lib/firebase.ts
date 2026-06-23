import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  getDocFromServer,
  setDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  Timestamp,
  writeBatch
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize the Firebase structures
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
let db: ReturnType<typeof getFirestore>;
try {
  const customId = (firebaseConfig as any).firestoreDatabaseId;
  // Fall back to default if it's the placeholder "remixed-firestore-database-id"
  if (customId && customId !== "remixed-firestore-database-id") {
    db = getFirestore(app, customId);
  } else {
    db = getFirestore(app);
  }
} catch {
  db = getFirestore(app);
}
export { db };

// Google Sign In
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await ensureUserProfile(userCredential.user, userCredential.user.displayName || "User");
    return userCredential.user;
  } catch (error: any) {
    console.error("Google login failed:", error);
    throw error;
  }
}

// Sign in as Guest (Bypasses Google Auth popup for local development/testing)
export async function signInAsGuest() {
  const mockUser = {
    uid: "guest_user_123",
    displayName: "Guest Student",
    email: "guest@example.com",
    isGuest: true
  } as any;
  try {
    await ensureUserProfile(mockUser, "Guest Student");
  } catch (error: any) {
    console.warn("Guest profile creation on Firestore failed (running locally in-memory):", error);
  }
  return mockUser;
}

// Ensure the profile schema exists in Firestore
async function ensureUserProfile(user: FirebaseUser, defaultName: string) {
  const userDocRef = doc(db, "users", user.uid);
  const snap = await getDoc(userDocRef);
  if (!snap.exists()) {
    await setDoc(userDocRef, {
      uid: user.uid,
      name: defaultName,
      level: "Intermediate",
      highContrast: false,
      createdAt: new Date().toISOString()
    });
  }
}

// Fetch general profile
export async function fetchUserProfile(uid: string) {
  const userDocRef = doc(db, "users", uid);
  const snap = await getDoc(userDocRef);
  if (snap.exists()) {
    return snap.data();
  }
  return null;
}

// Update profile properties (like proficiency level, contrast)
export async function updateUserProfile(uid: string, data: Partial<{ name: string; level: string; highContrast: boolean }>) {
  const userDocRef = doc(db, "users", uid);
  await updateDoc(userDocRef, data);
}

// Get user learning sessions (ordered by updatedAt desc)
export async function fetchUserSessions(uid: string, profileId: string) {
  const colRef = collection(db, "sessions");
  const q = query(colRef, where("userId", "==", uid));
  const snap = await getDocs(q);
  const sessions: any[] = [];
  snap.forEach((d) => {
    const data = d.data();
    if (data.profileId === profileId) {
      sessions.push(data);
    }
  });
  // Sort in JS to avoid requiring Firestore composite indexes
  sessions.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  return sessions;
}

// Write/Save a new user session
export async function saveSession(session: any) {
  const docRef = doc(db, "sessions", session.sessionId);
  await setDoc(docRef, session);
}

// Delete a learning session
export async function deleteSession(sessionId: string) {
  const docRef = doc(db, "sessions", sessionId);
  await deleteDoc(docRef);
}

// Fetch all messages belonging to a study session (ordered by createdAt asc)
export async function fetchSessionMessages(sessionId: string) {
  const colRef = collection(db, "sessions", sessionId, "messages");
  const q = query(colRef, orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  const messages: any[] = [];
  snap.forEach((d) => {
    messages.push(d.data());
  });
  return messages;
}

// Save message within a study session
export async function saveSessionMessage(sessionId: string, message: any) {
  const docRef = doc(db, "sessions", sessionId, "messages", message.messageId);
  await setDoc(docRef, message);
}
