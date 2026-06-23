import { Radio, Volume2 } from "lucide-react";
import type { CoachMessage } from "../types";

interface LiveTranscriptPanelProps {
  messages: CoachMessage[];
  isListening: boolean;
}

export default function LiveTranscriptPanel({ messages, isListening }: LiveTranscriptPanelProps) {
  const liveMessages = messages.filter((item) => item.source === "live" && item.sender === "coach" && item.text.trim());

  return (
    <section className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-emerald-200 font-bold">Live transcript</h2>
          <p className="text-[11px] text-slate-400">Read what Sky says during voice practice.</p>
        </div>
        <Radio className={`h-5 w-5 ${isListening ? "text-emerald-300" : "text-slate-500"}`} />
      </div>

      <div className="max-h-56 overflow-y-auto space-y-2 rounded-xl border border-white/10 bg-black/20 p-3">
        {!liveMessages.length ? (
          <p className="text-xs text-slate-400">
            {isListening ? "Listening. Sky's spoken replies will appear here after each turn." : "Start Live mode to see Sky's voice transcript here."}
          </p>
        ) : (
          liveMessages.slice(-8).map((item) => (
            <div key={item.messageId} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-200"><Volume2 className="h-3 w-3" /> Sky said</p>
              <p className="text-xs leading-relaxed text-slate-100">{item.text}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
