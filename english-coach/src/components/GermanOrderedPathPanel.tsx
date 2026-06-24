import { Route } from "lucide-react";
import type { GermanLevel } from "../lib/germanCurriculumRegistry";
import { getCatalogOrderedPath, getOrderedPath, getOrderedPathGroupLabel } from "../lib/germanOrderedPath";

interface GermanOrderedPathPanelProps {
  level: GermanLevel;
  onSelectSubtopic?: (subtopicId: string) => void;
  variant?: "registry" | "catalog";
}

export default function GermanOrderedPathPanel({ level, onSelectSubtopic, variant = "catalog" }: GermanOrderedPathPanelProps) {
  const registryPath = getOrderedPath(level);
  const catalogPath = getCatalogOrderedPath(level);
  const isCatalog = variant === "catalog";

  return (
    <div className="rounded-3xl border border-indigo-400/20 bg-indigo-500/10 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Route className="h-5 w-5 text-indigo-200" />
        <div>
          <p className="text-xs uppercase tracking-widest text-indigo-200">Ordered learning path</p>
          <h3 className="font-bold text-slate-100">Recommended {level} topic sequence</h3>
          <p className="mt-1 text-xs text-slate-400">{isCatalog ? "Enriched catalog path from A1/A2/B1 curriculum packages" : "Registry-linked app path"}</p>
        </div>
      </div>

      <div className="space-y-3">
        {isCatalog ? catalogPath.map((item) => (
          <div key={item.catalogId || item.sequence} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Step {item.sequence}</p>
                <h4 className="font-bold text-slate-100">{item.title}</h4>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-slate-300">
                {getOrderedPathGroupLabel(item.pathGroup)}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[11px] uppercase tracking-wider text-cyan-200">Exam relevance</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">{item.examRelevance}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[11px] uppercase tracking-wider text-emerald-200">Daily life</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">{item.dailyLifeUse}</p>
              </div>
            </div>
            {item.commonMistakes.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.commonMistakes.slice(0, 2).map((mistake) => (
                  <span key={mistake} className="rounded-full bg-red-500/15 px-3 py-1 text-[11px] text-red-100">{mistake}</span>
                ))}
              </div>
            )}
            <p className="mt-2 text-[11px] text-slate-500">Source inspiration: {item.sourceInspiredBy}</p>
          </div>
        )) : registryPath.map((item) => (
          <button
            key={item.subtopicId}
            onClick={() => onSelectSubtopic?.(item.subtopicId)}
            className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/10"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Step {item.sequence}</p>
                <h4 className="font-bold text-slate-100">{item.subtopic.title}</h4>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-slate-300">
                {getOrderedPathGroupLabel(item.pathGroup)}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{item.subtopic.description}</p>
            <p className="mt-2 text-[11px] text-slate-500">Source inspiration: {item.sourceInspiredBy}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
