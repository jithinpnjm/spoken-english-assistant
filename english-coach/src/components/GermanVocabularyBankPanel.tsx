import { BookMarked } from "lucide-react";
import type { GermanLevel } from "../lib/germanCurriculumRegistry";
import { getDueVocabulary, getHighSurvivalVocabulary, getVocabularyByLevel } from "../lib/germanVocabularyBank";

interface GermanVocabularyBankPanelProps {
  level: GermanLevel;
}

export default function GermanVocabularyBankPanel({ level }: GermanVocabularyBankPanelProps) {
  const levelItems = getVocabularyByLevel(level);
  const dueItems = getDueVocabulary().slice(0, 6);
  const survivalItems = getHighSurvivalVocabulary().slice(0, 6);

  return (
    <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5">
      <div className="mb-4 flex items-center gap-2">
        <BookMarked className="h-5 w-5 text-emerald-200" />
        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-200">Vocabulary bank</p>
          <h3 className="font-bold text-slate-100">{level} vocabulary and review</h3>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-400">Current level</p>
          <div className="mt-3 space-y-3">
            {levelItems.slice(0, 6).map((item) => (
              <div key={item.id} className="rounded-xl bg-white/5 p-3">
                <p className="font-semibold text-slate-100">{item.article ? `${item.article} ` : ""}{item.german}</p>
                <p className="text-xs text-slate-400">{item.english}</p>
                <p className="mt-1 text-[11px] text-slate-500">{item.example}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-amber-300">Due for review</p>
          <div className="mt-3 space-y-3">
            {dueItems.map((item) => (
              <div key={item.id} className="rounded-xl bg-white/5 p-3">
                <p className="font-semibold text-slate-100">{item.german}</p>
                <p className="text-xs text-slate-400">{item.topic} · {item.level}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-300">Survival priority</p>
          <div className="mt-3 space-y-3">
            {survivalItems.map((item) => (
              <div key={item.id} className="rounded-xl bg-white/5 p-3">
                <p className="font-semibold text-slate-100">{item.article ? `${item.article} ` : ""}{item.german}</p>
                <p className="text-xs text-slate-400">{item.english}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
