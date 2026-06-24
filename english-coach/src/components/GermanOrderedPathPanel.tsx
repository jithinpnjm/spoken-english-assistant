import { Route } from "lucide-react";
import type { GermanLevel } from "../lib/germanCurriculumRegistry";
import { getOrderedPath, getOrderedPathGroupLabel } from "../lib/germanOrderedPath";

interface GermanOrderedPathPanelProps {
  level: GermanLevel;
  onSelectSubtopic?: (subtopicId: string) => void;
}

export default function GermanOrderedPathPanel({ level, onSelectSubtopic }: GermanOrderedPathPanelProps) {
  const path = getOrderedPath(level);

  return (
    <div className="rounded-3xl border border-indigo-400/20 bg-indigo-500/10 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Route className="h-5 w-5 text-indigo-200" />
        <div>
          <p className="text-xs uppercase tracking-widest text-indigo-200">Ordered learning path</p>
          <h3 className="font-bold text-slate-100">Recommended {level} topic sequence</h3>
        </div>
      </div>

      <div className="space-y-3">
        {path.map((item) => (
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
