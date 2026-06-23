import React, { useState } from "react";
import { signInWithGoogle, signInAsGuest } from "../lib/firebase";
import { Languages, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void;
  highContrast: boolean;
}

export default function AuthScreen({ onAuthSuccess, highContrast }: AuthScreenProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithGoogle();
      onAuthSuccess(user);
    } catch (err: any) {
      console.error(err);
      setError(`Failed to sign in: ${err.message || err.code}. Please ensure popups are allowed.`);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInAsGuest();
      onAuthSuccess(user);
    } catch (err: any) {
      console.error(err);
      setError(`Failed to sign in as guest: ${err.message || err.code}`);
    } finally {
      setLoading(false);
    }
  };

  const themes = {
    bg: highContrast ? "bg-black text-white" : "bg-transparent text-slate-100", // inherited from App
    card: highContrast ? "bg-zinc-900 border-2 border-white text-white" : "backdrop-blur-xl bg-white/10 border border-white/20 shadow-[-10px_20px_30px_rgba(0,0,0,0.3)]",
    buttonPreset: highContrast ? "bg-zinc-800 border-2 border-white hover:bg-zinc-700 text-white" : "bg-white/20 hover:bg-white/30 border border-white/30 text-slate-100 shadow-lg",
    textMuted: highContrast ? "text-zinc-400" : "text-slate-300",
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden ${themes.bg} transition-colors duration-300`} id="auth-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 mb-4 shadow-inner">
            <Languages className={`h-8 w-8 ${highContrast ? "text-white" : "text-indigo-400"}`} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Sky Coach
          </h1>
          <p className={`text-sm ${themes.textMuted}`}>
            Your interactive AI English companion for daily conversation practice
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`mb-6 p-4 rounded-xl text-sm border ${highContrast ? "border-red-600 bg-red-950 text-red-200" : "border-red-500/20 bg-red-500/10 text-red-400"}`}
          >
            {error}
          </motion.div>
        )}

        <div className={`p-6 md:p-8 rounded-3xl ${themes.card} shadow-2xl relative group`}>
          <div>
            <h2 className="text-xl font-bold mb-1 text-center">Get started</h2>
            <p className={`text-xs text-center mb-6 block ${themes.textMuted}`}>
              Sign in to track your learning progress
            </p>

            <div className="space-y-4">
              <button
                disabled={loading}
                onClick={handleGoogleAuth}
                className={`w-full py-4 px-6 rounded-2xl flex items-center justify-center text-center transition-all duration-300 font-semibold ${themes.buttonPreset}`}
                id="login-google-btn"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Sign in with Google</span>
                )}
              </button>

              <button
                disabled={loading}
                onClick={handleGuestAuth}
                className={`w-full py-4 px-6 rounded-2xl flex items-center justify-center text-center transition-all duration-300 font-semibold ${
                  highContrast 
                    ? "bg-zinc-700 border-2 border-white hover:bg-zinc-600 text-white" 
                    : "bg-indigo-600/40 hover:bg-indigo-600/60 border border-indigo-500/30 text-indigo-200 hover:text-white shadow-lg"
                }`}
                id="login-guest-btn"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Continue as Guest (Local Test)</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
