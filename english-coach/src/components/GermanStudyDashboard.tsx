import type { GermanLevel } from "../lib/germanCurriculumRegistry";
import { buildGermanStudyRecommendations } from "../lib/germanStudyRecommendations";
import { useGermanLearningState } from "../hooks/useGermanLearningState";
import GermanLearningStatePanel from "./GermanLearningStatePanel";

interface GermanStudyDashboardProps {
  level: GermanLevel;
  selectedSubtopicId?: string;
}

export default function GermanStudyDashboard({ level, selectedSubtopicId }: GermanStudyDashboardProps) {
  const learning = useGermanLearningState();
  const recommendations = buildGermanStudyRecommendations(level, learning.state);

  return (
    <div className="space-y-4">
      <GermanLearningStatePanel level={level} selectedSubtopicId={selectedSubtopicId} />

      <div className="rounded-3xl border border-yellow-400/20 bg-yellow-500/10 p-5">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-yellow-200">Next study steps</p>
          <h3 className="font-bold text-slate-100">Recommended plan for {level}</h3>
        </div>

        <div className="space-y-3">
          {recommendations.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h4 className="font-bold text-slate-100">{item.title}</h4>
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${item.priority === "high" ? "bg-red-500/20 text-red-100" : item.priority === "medium" ? "bg-amber-500/20 text-amber-100" : "bg-white/10 text-slate-300"}`}>
                  {item.priority}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.reason}</p>
              <p className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-100">{item.action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
