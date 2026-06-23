import React from "react";
import { motion } from "motion/react";
import { Users, LogOut } from "lucide-react";

interface ProfileSelectorProps {
  onSelect: (profileId: string) => void;
  highContrast: boolean;
  onSignOut: () => void;
}

export default function ProfileSelector({ onSelect, highContrast, onSignOut }: ProfileSelectorProps) {
  const themes = {
    bg: highContrast ? "bg-black text-white" : "bg-transparent text-slate-100",
    card: highContrast ? "bg-zinc-900 border-2 border-white text-white" : "backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl",
    btn: highContrast ? "bg-zinc-800 border-2 border-white hover:bg-zinc-700 text-white" : "bg-white/10 hover:bg-white/20 border border-white/20 text-slate-100 shadow-md",
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden transition-colors duration-300 ${themes.bg}`}>
      
      <div className="absolute top-6 right-6">
        <button 
          onClick={onSignOut}
          className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-transparent hover:border-white/20"
          title="Sign out setup"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 mb-4 shadow-inner">
            <Users className={`h-8 w-8 ${highContrast ? "text-white" : "text-indigo-400"}`} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Who's practicing?
          </h1>
          <p className={`text-sm ${highContrast ? "text-zinc-400" : "text-slate-300"}`}>
            Select a profile to continue your lessons
          </p>
        </div>

        <div className={`p-6 md:p-8 rounded-3xl ${themes.card}`}>
          <div className="space-y-4">
            <button
              onClick={() => onSelect("Jithin")}
              className={`w-full py-4 px-6 rounded-2xl flex items-center gap-4 transition-all duration-300 font-semibold ${themes.btn}`}
            >
              <div className="h-10 w-10 bg-emerald-400 rounded-full flex items-center justify-center font-bold text-white text-lg">
                J
              </div>
              <span className="text-lg">Jithin</span>
            </button>
            <button
              onClick={() => onSelect("Sandra")}
              className={`w-full py-4 px-6 rounded-2xl flex items-center gap-4 transition-all duration-300 font-semibold ${themes.btn}`}
            >
              <div className="h-10 w-10 bg-rose-400 rounded-full flex items-center justify-center font-bold text-white text-lg">
                S
              </div>
              <span className="text-lg">Sandra</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
