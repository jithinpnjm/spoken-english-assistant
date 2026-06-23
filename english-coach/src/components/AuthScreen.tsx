import React, { useState } from "react";
import { signInWithGoogle } from "../lib/firebase";
import { Languages, ShieldCheck } from "lucide-react";
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
      setError(err.message || "Failed to sign in. Only Jithin and Sandra are allowed.");
    } finally {
      setLoading(false);
    }
  };

  const card = highContrast ? "bg-zinc-900 border-2 border-white text-white" : "backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl";
  const button = highContrast ? "bg-white text-black hover:bg-zinc-200" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 mb-4">
            <Languages className="h-8 w-8 text-indigo-300" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Sky English Coach</h1>
          <p className="text-sm text-slate-300">Private spoken-English training for Jithin and Sandra</p>
        </div>

        {error && <div className="mb-6 p-4 rounded-xl text-sm border border-red-500/30 bg-red-500/10 text-red-300">{error}</div>}

        <div className={`p-6 md:p-8 rounded-3xl ${card}`}>
          <div className="flex items-start gap-3 mb-6 text-sm text-slate-300">
            <ShieldCheck className="h-5 w-5 text-emerald-300 mt-0.5" />
            <p>Guest login is disabled. Sign in using your approved Google account so progress, memory, and 60-day challenge data stay private.</p>
          </div>
          <button disabled={loading} onClick={handleGoogleAuth} className={`w-full py-4 px-6 rounded-2xl flex items-center justify-center text-center transition-all duration-300 font-semibold ${button}`} id="login-google-btn">
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>
          <p className="text-[11px] text-slate-500 mt-4 text-center">Allowed accounts: jithinpnjm23@gmail.com and sandrasibiss@gmail.com</p>
        </div>
      </motion.div>
    </div>
  );
}
