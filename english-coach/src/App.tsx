import React, { useState, useEffect } from "react";
import { auth, fetchUserProfile, updateUserProfile } from "./lib/firebase";
import { onAuthStateChanged, User as FirebaseUser, signOut } from "firebase/auth";
import AuthScreen from "./components/AuthScreen";
import ProfileSelector from "./components/ProfileSelector";
import InteractiveCoach from "./components/InteractiveCoach";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  // Monitor Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setCurrentUser(user);
        // Fetch detailed profile configurations
        try {
          const profile = await fetchUserProfile(user.uid);
          if (profile) {
            setUserProfile(profile);
            setHighContrast(!!(profile as any).highContrast);
          }
        } catch (err) {
          console.error("Failed to fetch user profile", err);
        }
      } else {
        // Fallback to guest user in localStorage if present
        const cachedGuest = localStorage.getItem("guest_user");
        if (cachedGuest) {
          const parsed = JSON.parse(cachedGuest);
          setCurrentUser(parsed);
          try {
            const profile = await fetchUserProfile(parsed.uid);
            if (profile) {
              setUserProfile(profile);
              setHighContrast(!!(profile as any).highContrast);
            }
          } catch (err) {
            console.error("Failed to fetch guest profile", err);
          }
        } else {
          setCurrentUser(null);
          setUserProfile(null);
          setActiveProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthSuccess = async (user: any) => {
    if (user && user.isGuest) {
      localStorage.setItem("guest_user", JSON.stringify(user));
    }
    setCurrentUser(user);
    setLoading(true);
    try {
      const profile = await fetchUserProfile(user.uid);
      if (profile) {
        setUserProfile(profile);
        setHighContrast(!!(profile as any).highContrast);
      }
    } catch (err) {
      console.error("Failed to fetch user profile", err);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    try {
      localStorage.removeItem("guest_user");
      await signOut(auth);
      setCurrentUser(null);
      setUserProfile(null);
      setActiveProfile(null);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const handleToggleHighContrast = async () => {
    const nextVal = !highContrast;
    setHighContrast(nextVal);
    if (currentUser?.uid) {
      try {
        await updateUserProfile(currentUser.uid, { highContrast: nextVal });
        setUserProfile((prev: any) => prev ? { ...prev, highContrast: nextVal } : null);
      } catch (err) {
        console.error("Failed saving high-contrast configuration:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] flex flex-col items-center justify-center text-indigo-400 gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        <p className="text-sm font-medium tracking-wide">Syncing learning sandbox environment...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${highContrast ? "bg-black text-white" : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-slate-100"} transition-colors duration-300 font-sans`}>
      <AnimatePresence mode="wait">
        {!currentUser ? (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AuthScreen 
              onAuthSuccess={handleAuthSuccess} 
              highContrast={highContrast} 
            />
          </motion.div>
        ) : !activeProfile ? (
          <motion.div
            key="profile-selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProfileSelector 
              onSelect={setActiveProfile} 
              highContrast={highContrast}
              onSignOut={handleSignOut}
            />
          </motion.div>
        ) : (
          <motion.div
            key="coach"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <InteractiveCoach
              user={currentUser}
              userProfile={userProfile}
              onSignOut={() => setActiveProfile(null)}
              highContrast={highContrast}
              onToggleHighContrast={handleToggleHighContrast}
              activeProfile={activeProfile}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
