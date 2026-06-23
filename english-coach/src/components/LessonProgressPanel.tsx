import React from "react";
import { ActivityDefinition } from "../lib/curriculum";
import { CoachMessage } from "../types";

interface LessonProgressPanelProps {
  definition: ActivityDefinition;
  messages: CoachMessage[];
  currentPhase?: string;
  currentStep?: string;
  teacherAction?: string;
}

export default function LessonProgressPanel({ definition, messages, currentPhase, currentStep, teacherAction }: LessonProgressPanelProps) {
  const learnerTurns = messages.filter((message) => message.sender === "user").length;
  const progress = Math.min(100, Math.round((learnerTurns / Math.max(1, definition.minLearnerTurns)) * 100));
  const activeStep = currentStep || definition.steps[0]?.id || "intro";
  const activePhase = currentPhase || definition.steps[0]?.phase || "intro";
  const activeTeacherAction = teacherAction || definition.steps[0]?.teacherGoal || definition.openingPrompt;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold">Current lesson</p>
          <h3 className="font-bold text-white mt-1">{definition.title}</h3>
          <p className="text-xs text-slate-400 mt-1">{definition.objective}</p>
        </div>
        <div className="text-right text-xs text-slate-400">
          <p className="font-bold text-white">{learnerTurns}/{definition.minLearnerTurns}</p>
          <p>learner turns</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Activity progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-black/30 overflow-hidden">
          <div className="h-full bg-emerald-400 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
        {definition.steps.map((step) => {
          const active = step.id === activeStep || step.phase === activePhase;
          return (
            <div key={step.id} className={`rounded-xl border p-2 text-[11px] ${active ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-100" : "border-white/10 bg-black/10 text-slate-400"}`}>
              <p className="font-bold">{step.phase.replace("_", " ")}</p>
              <p className="truncate">{step.id}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl bg-black/20 border border-white/10 p-3">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Teacher action now</p>
        <p className="text-sm text-slate-200 mt-1">{activeTeacherAction}</p>
      </div>

      <div className="mt-3 rounded-xl bg-black/20 border border-white/10 p-3">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Success criteria</p>
        <ul className="list-disc pl-4 mt-1 space-y-1 text-xs text-slate-300">
          {definition.completionRubric.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>
  );
}
