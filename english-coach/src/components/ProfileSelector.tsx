import React from "react";
import { motion } from "motion/react";
import { UserCheck, LogOut } from "lucide-react";

interface ProfileSelectorProps {
  activeProfile: string;
  email?: string | null;
  onSelect: (profileId: string) => void;
  highContrast: boolean;
  onSignOut: () => void;
}

export default function ProfileSelector({ activeProfile, email, onSelect, highContrast, onSignOut }: ProfileSelectorProps) {
  const profileId = activeProfile.toLowerCase();
  const card = highContrast ? "bg-zinc-900 border-2 border-white text-white" : "backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl";
  const btn = highContrast ? "bg-zinc-800 border-2 border-white hover:bg-zinc-700 text-white" : "bg-white/10 hover:bg-white/20 border border-white/20 text-slate-100 shadow-md";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute top-6 right-6">
        <button onClick={onSignOut} className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Sign out"><LogOut className="h-5 w-5" /></button>
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="w-full max-w-sm z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 mb-4"><UserCheck className="h-8 w-8 text-indigo-300" /></div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Ready to practice?</h1>
          <p className="text-sm text-slate-300">Your profile is linked to {email}</p>
        </div>
        <div className={`p-6 md:p-8 rounded-3xl ${card}`}>
          <button onClick={() => onSelect(profileId)} className={`w-full py-4 px-6 rounded-2xl flex items-center gap-4 transition-all duration-300 font-semibold ${btn}`}>
            <div className="h-10 w-10 bg-emerald-400 rounded-full flex items-center justify-center font-bold text-white text-lg">{activeProfile.charAt(0)}</div>
            <div className="text-left"><span className="text-lg block">{activeProfile}</span><span className="text-xs text-slate-400">60-day English challenge profile</span></div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
