import React, { useState, useEffect } from "react";
import { auth, fetchUserProfile, updateUserProfile, profileNameForEmail, profileIdForEmail, ensureLearnerProfile, doSignOut } from "./lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import AuthScreen from "./components/AuthScreen";
import ProfileSelector from "./components/ProfileSelector";
import InteractiveCoach from "./components/InteractiveCoach";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  const [profileDisplayName, setProfileDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      try {
        if (user) {
          const displayName = profileNameForEmail(user.email);
          const profileId = profileIdForEmail(user.email);
          if (!displayName || !profileId) throw new Error("Unauthorized learner email.");
          await ensureLearnerProfile(user.uid, user.email || "");
          setCurrentUser(user);
          setProfileDisplayName(displayName);
          setActiveProfile(profileId);
          const profile = await fetchUserProfile(user.uid);
          setUserProfile(profile);
          setHighContrast(!!(profile as any)?.highContrast);
        } else {
          setCurrentUser(null);
          setUserProfile(null);
          setActiveProfile(null);
          setProfileDisplayName(null);
        }
      } catch (err) {
        console.error(err);
        await doSignOut().catch(() => {});
        setCurrentUser(null);
        setUserProfile(null);
        setActiveProfile(null);
        setProfileDisplayName(null);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAuthSuccess = async (user: FirebaseUser) => {
    setCurrentUser(user);
    const displayName = profileNameForEmail(user.email);
    const profileId = profileIdForEmail(user.email);
    setProfileDisplayName(displayName);
    setActiveProfile(profileId);
    const profile = await fetchUserProfile(user.uid);
    setUserProfile(profile);
    setHighContrast(!!(profile as any)?.highContrast);
  };

  const handleSignOut = async () => {
    await doSignOut();
    setCurrentUser(null);
    setUserProfile(null);
    setActiveProfile(null);
    setProfileDisplayName(null);
  };

  const handleToggleHighContrast = async () => {
    const nextVal = !highContrast;
    setHighContrast(nextVal);
    if (currentUser?.uid) {
      await updateUserProfile(currentUser.uid, { highContrast: nextVal });
      setUserProfile((prev: any) => prev ? { ...prev, highContrast: nextVal } : null);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] flex flex-col items-center justify-center text-indigo-400 gap-3"><Loader2 className="h-10 w-10 animate-spin text-indigo-500" /><p className="text-sm font-medium tracking-wide">Loading your private learning profile...</p></div>;
  }

  return (
    <div className={`min-h-screen ${highContrast ? "bg-black text-white" : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-slate-100"} transition-colors duration-300 font-sans`}>
      <AnimatePresence mode="wait">
        {!currentUser ? (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><AuthScreen onAuthSuccess={handleAuthSuccess} highContrast={highContrast} /></motion.div>
        ) : !activeProfile || !profileDisplayName ? (
          <motion.div key="profile-selector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProfileSelector activeProfile={profileDisplayName || "Student"} email={currentUser.email} onSelect={setActiveProfile} highContrast={highContrast} onSignOut={handleSignOut} />
          </motion.div>
        ) : (
          <motion.div key="coach" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <InteractiveCoach user={currentUser} userProfile={userProfile} onSignOut={handleSignOut} highContrast={highContrast} onToggleHighContrast={handleToggleHighContrast} activeProfile={activeProfile} profileDisplayName={profileDisplayName} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
