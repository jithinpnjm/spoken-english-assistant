import { useState, type ReactNode } from "react";
import { BookOpen, Mic, ChevronDown, ChevronUp, Zap, HelpCircle, PenLine, ListChecks, CheckCircle2, ArrowRight } from "lucide-react";
import type { VocabWord } from "../lib/vocabularyBank";
import type { VocabPracticeMode } from "../lib/dailyVocabulary";
import { totalVocabSets } from "../lib/dailyVocabulary";

interface VocabularyPanelProps {
  words: VocabWord[];
  level: "Beginner" | "Intermediate" | "Advanced";
  isLiveActive: boolean;
  setIndex: number;
  onStartPractice: (words: VocabWord[], mode: VocabPracticeMode) => void;
  onMarkComplete: () => void;
}

const MODES: { id: VocabPracticeMode; label: string; description: string; icon: ReactNode }[] = [
  { id: "fill_in_blank", label: "Fill in the blank", description: "Sky says a sentence with a missing word — you say it", icon: <PenLine className="h-4 w-4" /> },
  { id: "choose_right_word", label: "Choose the right word", description: "Pick the correct word from 3 options Sky gives you", icon: <ListChecks className="h-4 w-4" /> },
  { id: "use_in_sentence", label: "Use in a sentence", description: "Sky gives you the word — you make your own sentence", icon: <Zap className="h-4 w-4" /> },
  { id: "word_quiz", label: "Word quiz", description: "Sky gives the meaning — you recall the word", icon: <HelpCircle className="h-4 w-4" /> },
];

const TIER_COLORS: Record<string, string> = {
  basic: "text-emerald-300 bg-emerald-500/15 border-emerald-400/30",
  intermediate: "text-sky-300 bg-sky-500/15 border-sky-400/30",
  advanced: "text-violet-300 bg-violet-500/15 border-violet-400/30",
};

export default function VocabularyPanel({ words, level, isLiveActive, setIndex, onStartPractice, onMarkComplete }: VocabularyPanelProps) {
  const [selectedMode, setSelectedMode] = useState<VocabPracticeMode>("fill_in_blank");
  const [expandedWord, setExpandedWord] = useState<string | null>(null);

  return (
    <div className="space-y-4">

      {/* Header card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo-300" />
            <p className="text-xs uppercase tracking-widest text-indigo-300 font-bold">Today's Vocabulary</p>
          </div>
          <span className="text-xs text-slate-400">Set {setIndex + 1} of {totalVocabSets()} · Mixed levels</span>
        </div>
        <p className="text-[11px] text-slate-400">Learn these {words.length} words, then practice with Sky. Mark complete to unlock the next set.</p>
      </div>

      {/* Word cards */}
      <div className="space-y-2">
        {words.map((w, i) => {
          const isOpen = expandedWord === w.word;
          const tierColor = TIER_COLORS[w.tier] || TIER_COLORS.intermediate;
          return (
            <div key={w.word} className="rounded-2xl border border-white/10 bg-slate-900/70 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-3 text-left"
                onClick={() => setExpandedWord(isOpen ? null : w.word)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-5 shrink-0">{i + 1}.</span>
                  <div>
                    <span className="font-bold text-sm text-slate-100">{w.word}</span>
                    <span className={`ml-2 text-[10px] rounded-full border px-2 py-0.5 ${tierColor}`}>{w.type}</span>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="h-4 w-4 text-slate-500 shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-2">
                  <p className="text-xs text-slate-300"><span className="text-slate-500">Meaning: </span>{w.meaning}</p>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Use cases</p>
                    <ul className="text-xs text-slate-400 space-y-0.5">
                      {w.useCases.map((uc, j) => <li key={j} className="flex gap-1"><span className="text-slate-600">·</span>{uc}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Example sentences</p>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {w.sentences.map((s, j) => <li key={j} className="italic border-l border-indigo-500/30 pl-2">"{s}"</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Practice mode picker */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Practice Mode</p>
        <div className="grid grid-cols-1 gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMode(m.id)}
              className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                selectedMode === m.id
                  ? "border-indigo-400/60 bg-indigo-600/20"
                  : "border-white/10 bg-slate-900/60 hover:bg-slate-800/60"
              }`}
            >
              <span className={`mt-0.5 ${selectedMode === m.id ? "text-indigo-300" : "text-slate-500"}`}>{m.icon}</span>
              <div>
                <p className="text-sm font-semibold text-slate-100">{m.label}</p>
                <p className="text-[11px] text-slate-400">{m.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={() => onStartPractice(words, selectedMode)}
        disabled={isLiveActive}
        className={`w-full rounded-2xl py-4 font-bold text-base flex items-center justify-center gap-2 transition-colors ${
          isLiveActive
            ? "bg-slate-700 text-slate-500 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-500 text-white"
        }`}
      >
        <Mic className="h-5 w-5" />
        {isLiveActive ? "Live session active — stop first" : "Start Vocabulary Practice with Sky"}
      </button>

      {/* Mark complete */}
      <button
        onClick={onMarkComplete}
        disabled={isLiveActive}
        className={`w-full rounded-2xl py-3 font-semibold text-sm flex items-center justify-center gap-2 border transition-colors ${
          isLiveActive
            ? "border-white/5 bg-transparent text-slate-600 cursor-not-allowed"
            : "border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
        }`}
      >
        <CheckCircle2 className="h-4 w-4" />
        Mark set complete
        <ArrowRight className="h-4 w-4 ml-1" />
        Get next 10 words
      </button>
    </div>
  );
}
