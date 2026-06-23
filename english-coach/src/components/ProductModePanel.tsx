import { BookOpen, MessageCircle, Mic, RotateCcw } from "lucide-react";
import type { ProductModeView, ProductTrackView } from "../lib/curriculumClient";

interface ProductModePanelProps {
  modes: ProductModeView[];
  tracks: ProductTrackView[];
  selectedMode: string;
  selectedTrackId: string;
  onModeChange: (mode: string) => void;
  onTrackChange: (trackId: string) => void;
}

const iconMap = {
  study: BookOpen,
  practice: MessageCircle,
  review: RotateCcw,
  live: Mic,
};

export default function ProductModePanel({ modes, tracks, selectedMode, selectedTrackId, onModeChange, onTrackChange }: ProductModePanelProps) {
  const visibleTracks = selectedMode === "study"
    ? tracks.filter((track) => track.id !== "review-mistake-repair")
    : selectedMode === "review"
      ? tracks.filter((track) => track.id === "review-mistake-repair")
      : tracks;

  return (
    <section className="mt-5 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4 text-sm">
      <div className="mb-3">
        <h2 className="text-xs uppercase tracking-widest text-indigo-200 font-bold">Learning modes</h2>
        <p className="text-[11px] text-slate-400">Study first, then practice, review, or live voice.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {modes.map((mode) => {
          const Icon = iconMap[mode.id as keyof typeof iconMap] || BookOpen;
          const active = selectedMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onModeChange(mode.id)}
              className={`rounded-xl border px-3 py-2 text-left transition ${active ? "border-indigo-300 bg-indigo-500/30" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold"><Icon className="h-3 w-3" /> {mode.title}</div>
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-wider text-slate-400">Production track</label>
        <select value={selectedTrackId} onChange={(e) => onTrackChange(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-xl p-2 text-xs">
          <option value="">Choose a track...</option>
          {visibleTracks.map((track) => <option key={track.id} value={track.id}>{track.title}</option>)}
        </select>
        {selectedTrackId && (
          <p className="text-[11px] text-slate-400">
            {tracks.find((track) => track.id === selectedTrackId)?.description}
          </p>
        )}
      </div>
    </section>
  );
}
