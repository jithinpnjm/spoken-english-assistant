import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";

interface VoiceIndicatorProps {
  state: "idle" | "listening" | "thinking" | "speaking";
  highContrast: boolean;
}

export default function VoiceIndicator({ state, highContrast }: VoiceIndicatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 240);
    const height = (canvas.height = 100);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
      }
    };
    window.addEventListener("resize", handleResize);

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      phase += 0.08;

      // Color scheme selector
      let colors: string[] = [];
      if (highContrast) {
        colors = ["#FFFFFF", "#CCCCCC", "#999999"];
      } else {
        if (state === "listening") {
          colors = ["rgba(139, 92, 246, 0.7)", "rgba(99, 102, 241, 0.5)", "rgba(168, 85, 247, 0.3)"];
        } else if (state === "speaking") {
          colors = ["rgba(236, 72, 153, 0.7)", "rgba(217, 70, 239, 0.5)", "rgba(139, 92, 246, 0.3)"];
        } else if (state === "thinking") {
          colors = ["rgba(16, 185, 129, 0.7)", "rgba(5, 150, 105, 0.5)", "rgba(110, 231, 183, 0.3)"];
        } else {
          // idle
          colors = ["rgba(100, 116, 139, 0.4)", "rgba(148, 163, 184, 0.2)"];
        }
      }

      ctx.lineWidth = highContrast ? 3 : 2;

      // Draw multi-layered waves based on the state variable
      let waveCount = state === "idle" ? 1 : 3;
      let amplitude = 0;
      let frequency = 0.02;

      if (state === "listening") {
        amplitude = 25;
        frequency = 0.035;
      } else if (state === "speaking") {
        amplitude = 35;
        frequency = 0.05;
      } else if (state === "thinking") {
        amplitude = 12;
        frequency = 0.02;
        phase -= 0.02; // slower
      } else {
        amplitude = 3;
        frequency = 0.01;
      }

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        const offsetPhase = phase + i * Math.PI * 0.3;
        const currentAmplitude = amplitude * (1 - i * 0.25);

        ctx.strokeStyle = colors[i % colors.length];

        for (let x = 0; x < width; x++) {
          const y =
            height / 2 +
            Math.sin(x * frequency + offsetPhase) *
              currentAmplitude *
              Math.sin((x / width) * Math.PI); // restrict wave to center
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [state, highContrast]);

  const getStatusText = () => {
    switch (state) {
      case "listening":
        return "Listening to your voice - Speak whenever you are ready";
      case "speaking":
        return "Sky Coach is speaking... (Interrupt anytime by talking)";
      case "thinking":
        return "Sky is analyzing grammar and spelling rules...";
      default:
        return "Voice channel open and idle";
    }
  };

  const getStatusBadgeColor = () => {
    if (highContrast) return "border-white bg-black text-white";
    switch (state) {
      case "listening":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      case "speaking":
        return "border-indigo-500/30 bg-indigo-500/10 text-indigo-400";
      case "thinking":
        return "border-amber-500/30 bg-amber-500/10 text-amber-400";
      default:
        return "border-white/10 bg-white/5 text-slate-400";
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl relative overflow-hidden">
      {/* Waveform visual stage */}
      <div className="w-full h-24 flex items-center justify-center">
        <canvas ref={canvasRef} className="opacity-90 w-full h-full" id="voice-canvas" />
      </div>

      {/* Decorative center voice node bubble */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${
        state === "listening" 
          ? "bg-violet-600 animate-ping opacity-25" 
          : state === "speaking" 
          ? "bg-pink-600 animate-ping opacity-25" 
          : "scale-0"
      }`}></div>

      <div className={`mt-4 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide transition-all uppercase duration-300 ${getStatusBadgeColor()}`}>
        {state}
      </div>

      <p className="mt-3 text-sm text-center font-medium opacity-80 min-h-6 transition-all">
        {getStatusText()}
      </p>
    </div>
  );
}
