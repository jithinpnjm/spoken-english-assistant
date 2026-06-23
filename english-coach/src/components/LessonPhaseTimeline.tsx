import { CheckCircle2, Circle, PlayCircle } from "lucide-react";

interface LessonPhaseTimelineProps {
  currentPhase?: string;
}

const phases = [
  { id: "intro", label: "Intro", description: "Teacher explains the concept." },
  { id: "model", label: "Model", description: "Examples and pattern breakdown." },
  { id: "controlled_practice", label: "Guided", description: "Small supported exercise." },
  { id: "correction", label: "Correction", description: "Fix mistakes and explain why." },
  { id: "repeat", label: "Rewrite", description: "Rewrite or repeat the correction." },
  { id: "free_practice", label: "Practice", description: "Short conversation or roleplay." },
  { id: "summary", label: "Summary", description: "Recap and homework." },
];

export default function LessonPhaseTimeline({ currentPhase }: LessonPhaseTimelineProps) {
  const currentIndex = Math.max(0, phases.findIndex((phase) => phase.id === currentPhase));

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-3">
        <h3 className="text-xs uppercase tracking-widest text-slate-300 font-bold">Lesson timeline</h3>
        <p className="text-[11px] text-slate-500">Sky teaches first, then guides practice, correction, and conversation.</p>
      </div>
      <div className="space-y-2">
        {phases.map((phase, index) => {
          const active = phase.id === currentPhase;
          const done = index < currentIndex;
          const Icon = done ? CheckCircle2 : active ? PlayCircle : Circle;
          return (
            <div key={phase.id} className={`flex gap-3 rounded-xl border p-3 ${active ? "border-cyan-300/40 bg-cyan-500/10" : done ? "border-emerald-300/20 bg-emerald-500/5" : "border-white/10 bg-black/10"}`}>
              <Icon className={`mt-0.5 h-4 w-4 flex-shrink-0 ${active ? "text-cyan-300" : done ? "text-emerald-300" : "text-slate-500"}`} />
              <div>
                <p className="text-sm font-semibold text-slate-100">{phase.label}</p>
                <p className="text-[11px] text-slate-400">{phase.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
