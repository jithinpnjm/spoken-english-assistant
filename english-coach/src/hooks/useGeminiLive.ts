import { useState, useRef, useCallback, useEffect } from "react";
import { dbg } from "../lib/debug";

function floatTo16BitPCM(input: Float32Array): ArrayBuffer {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return output.buffer;
}

function base64ToFloat32(base64: string): Float32Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const int16 = new Int16Array(bytes.buffer);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768.0;
  return float32;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return btoa(binary);
}

function pcmToWav(samples: Int16Array, sampleRate: number): ArrayBuffer {
  const dataLen = samples.byteLength;
  const buf = new ArrayBuffer(44 + dataLen);
  const view = new DataView(buf);
  const write = (offset: number, str: string) => { for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i)); };
  write(0, "RIFF");
  view.setUint32(4, 36 + dataLen, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, dataLen, true);
  new Int16Array(buf, 44).set(samples);
  return buf;
}

function bridgeWebSocketUrl(path: string) {
  const scheme = window.location.protocol === "https:" ? "wss" : "ws";
  return `${scheme}://${window.location.host}${path}`;
}

export interface LiveMessage {
  text?: string;
  interrupted?: boolean;
}

export function useGeminiLiveAPI(onMessage?: (msg: LiveMessage) => void) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const captureCtxRef = useRef<AudioContext | null>(null);
  const playbackCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);
  const agentPCMRef = useRef<Int16Array[]>([]);

  const onMessageRef = useRef(onMessage);
  useEffect(() => { onMessageRef.current = onMessage; }, [onMessage]);

  const stopAllPlayback = useCallback(() => {
    audioQueueRef.current.forEach((s) => { try { s.stop(); } catch {} });
    audioQueueRef.current = [];
    if (playbackCtxRef.current) nextStartTimeRef.current = playbackCtxRef.current.currentTime;
  }, []);

  const stopClient = useCallback(() => {
    dbg.live.log("stopClient called");
    if (wsRef.current) { try { wsRef.current.close(); } catch {} wsRef.current = null; }
    if (processorRef.current && sourceRef.current) {
      try { sourceRef.current.disconnect(processorRef.current); } catch {}
      try { processorRef.current.disconnect(); } catch {}
    }
    processorRef.current = null;
    sourceRef.current = null;
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (captureCtxRef.current) { captureCtxRef.current.close().catch(() => {}); captureCtxRef.current = null; }
    if (playbackCtxRef.current) { playbackCtxRef.current.close().catch(() => {}); playbackCtxRef.current = null; }
    stopAllPlayback();
    agentPCMRef.current = [];
    setIsConnected(false);
    nextStartTimeRef.current = 0;
    dbg.live.log("stopClient: done");
  }, [stopAllPlayback]);

  const connect = useCallback(async (
    userName = "Student",
    userLevel = "Intermediate",
    dailyTopic?: string,
    coachMode = "balanced"
  ) => {
    try {
      setError(null);
      dbg.live.log("connect: fetching config...");

      const resConfig = await fetch("/api/config");
      if (!resConfig.ok) throw new Error(`Config fetch failed: ${resConfig.status}`);
      const config = await resConfig.json();
      const liveModel: string = config.liveModel || "models/gemini-3.1-flash-live-preview";
      const bridgePath: string = config.audioBridgePath || "/api/audio-bridge";
      dbg.live.log("connect: using server audio bridge", bridgePath);

      const INPUT_RATE = 16000;
      const OUTPUT_RATE = 24000;
      const AudioCtxClass = (window as any).AudioContext || (window as any).webkitAudioContext;

      const captureCtx = new AudioCtxClass({ sampleRate: INPUT_RATE });
      await captureCtx.resume();
      captureCtxRef.current = captureCtx;

      const playbackCtx = new AudioCtxClass({ sampleRate: OUTPUT_RATE });
      await playbackCtx.resume();
      playbackCtxRef.current = playbackCtx;
      nextStartTimeRef.current = playbackCtx.currentTime + 0.1;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, sampleRate: INPUT_RATE },
      });
      streamRef.current = stream;
      dbg.live.log("connect: mic stream acquired");

      const ws = new WebSocket(bridgeWebSocketUrl(bridgePath));
      wsRef.current = ws;

      const topicLine = dailyTopic ? `Today's topic: ${dailyTopic}.` : "";

      const levelProfile: Record<string, string> = {
        Beginner: `LEVEL: Beginner.
TONE: Warm but corrective. You are a patient teacher, not a cheerleader. Still correct every grammar and tense mistake, but explain it simply and kindly. Use short sentences. One rule at a time. After correcting, ask the learner to say the fixed sentence once before continuing.`,

        Intermediate: `LEVEL: Intermediate.
TONE: Moderately strict. You do not let mistakes pass. When the learner uses the wrong tense, wrong preposition, poor word choice, or weak sentence structure — stop them immediately. Name the exact error. Explain the rule in one sentence. Show the correct version. Ask them to repeat it naturally. Only then continue. Push for better vocabulary: if a common or weak word is used where a more precise one fits, suggest the upgrade. Example: "I did the work" → "I completed / handled / executed the work". Fluency gaps such as hesitations and filler words should be noted and drilled.`,

        Advanced: `LEVEL: Advanced — C1 standard.
TONE: Precise and constructive — the tone of a good coach, not an examiner. Correct every mistake clearly without being harsh. When the learner uses the wrong tense, imprecise vocabulary, or weak structure — point it out calmly, name exactly what went wrong, give the better version, and ask them to repeat it. Acknowledge genuinely when they do well.
Watch for:
- Wrong tense (especially past perfect, conditionals, passive voice)
- Imprecise or informal vocabulary where a stronger word fits
- Weak sentence structure where a more natural version exists
- Repetition of the same words across sentences
- Fillers (um, uh, like, basically) — note them once and move on
After each correction, ask the learner to say the corrected sentence once. Stay encouraging — the goal is confident, accurate speech, not intimidation.`,
      };

      const systemInstructionText = `You are Sky, a spoken-English teacher for ${userName}.
${levelProfile[userLevel] || levelProfile.Intermediate}
${topicLine}

CORRECTION RULES (apply at every level, strictness scales with level above):
1. NEVER ignore a mistake to keep the conversation comfortable. That is the opposite of teaching.
2. When a wrong tense is used — stop, name it ("You used present tense here, but the action is finished — use past simple"), give the correct sentence, ask the learner to repeat.
3. When a weak or wrong word is used — suggest the better word and explain why it is stronger.
4. When sentence structure is too simple for the level — show a more natural or complex version.
5. When the learner hesitates, uses fillers, or restarts — note it and offer a clean repeat drill.
6. After any correction, always ask the learner to say the corrected sentence once before moving on.
7. Keep each turn focused: one correction, one upgraded sentence, one follow-up speaking task.
8. Do not become a chatbot. Every reply must contain a teaching action.`;

      ws.onopen = () => {
        dbg.live.log("bridge ws.onopen: sending setup");
        ws.send(JSON.stringify({
          setupClient: {
            model: liveModel,
            responseModalities: ["AUDIO"],
            voiceName: "Aoede",
            systemInstructionText,
          },
        }));
      };

      ws.onmessage = async (event) => {
        try {
          const raw = typeof event.data === "string" ? event.data : await (event.data as Blob).text();
          const msg = JSON.parse(raw);

          if (msg.setupComplete) {
            dbg.live.log("bridge ws: setupComplete — starting audio capture");
            const source = captureCtx.createMediaStreamSource(stream);
            sourceRef.current = source;
            const processor = captureCtx.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;
            processor.onaudioprocess = (e) => {
              if (ws.readyState === WebSocket.OPEN) {
                const b64 = arrayBufferToBase64(floatTo16BitPCM(e.inputBuffer.getChannelData(0)));
                ws.send(JSON.stringify({ realtimeInput: { audio: { data: b64, mimeType: `audio/pcm;rate=${INPUT_RATE}` } } }));
              }
            };
            const silentGain = captureCtx.createGain();
            silentGain.gain.value = 0;
            source.connect(processor);
            processor.connect(silentGain);
            silentGain.connect(captureCtx.destination);
            setIsConnected(true);
            setError(null);
            return;
          }

          const sc = msg.serverContent;
          if (!sc) return;

          if (sc.interrupted) {
            dbg.live.log("bridge ws: interrupted");
            stopAllPlayback();
            agentPCMRef.current = [];
            onMessageRef.current?.({ interrupted: true });
          }

          if (sc.modelTurn?.parts) {
            for (const part of sc.modelTurn.parts) {
              if (part.inlineData?.data) {
                const binary = atob(part.inlineData.data);
                const bytes = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
                const int16chunk = new Int16Array(bytes.buffer);
                agentPCMRef.current.push(int16chunk);

                const pb = playbackCtxRef.current;
                if (pb) {
                  const float32 = base64ToFloat32(part.inlineData.data);
                  const buf = pb.createBuffer(1, float32.length, OUTPUT_RATE);
                  buf.getChannelData(0).set(float32);
                  const src = pb.createBufferSource();
                  src.buffer = buf;
                  src.connect(pb.destination);
                  const startTime = Math.max(pb.currentTime + 0.01, nextStartTimeRef.current);
                  src.start(startTime);
                  nextStartTimeRef.current = startTime + buf.duration;
                  audioQueueRef.current.push(src);
                  src.onended = () => { audioQueueRef.current = audioQueueRef.current.filter(s => s !== src); };
                }
              }
            }
          }

          if (sc.turnComplete) {
            dbg.live.log("bridge ws: turnComplete — transcribing agent audio");
            const chunks = agentPCMRef.current;
            agentPCMRef.current = [];
            if (chunks.length > 0) {
              const totalLen = chunks.reduce((n, c) => n + c.length, 0);
              const merged = new Int16Array(totalLen);
              let offset = 0;
              for (const c of chunks) { merged.set(c, offset); offset += c.length; }
              const wavBuffer = pcmToWav(merged, OUTPUT_RATE);
              const audioBase64 = arrayBufferToBase64(wavBuffer);

              try {
                const res = await fetch("/api/transcribe", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ audioBase64, mimeType: "audio/wav" }),
                });
                if (res.ok) {
                  const { transcript } = await res.json();
                  if (transcript) onMessageRef.current?.({ text: transcript });
                } else {
                  dbg.live.warn("transcribe failed:", res.status);
                }
              } catch (e) {
                dbg.live.error("transcribe error:", e);
              }
            }
          }
        } catch (err) {
          dbg.live.error("bridge ws.onmessage error:", err);
        }
      };

      ws.onerror = (e) => {
        dbg.live.error("bridge ws.onerror:", e);
        setError("Live agent connection failed.");
        stopClient();
      };

      ws.onclose = (e) => {
        dbg.live.log("bridge ws.onclose code:", e.code, "reason:", e.reason);
        if (e.code !== 1000) setError(`Disconnected (${e.code}): ${e.reason || "unknown"}`);
        stopClient();
      };
    } catch (e: any) {
      dbg.live.error("connect failed:", e.message);
      setError(e.message || "Failed to start live session");
      stopClient();
    }
  }, [stopClient, stopAllPlayback]);

  useEffect(() => {
    return () => { if (wsRef.current || streamRef.current) stopClient(); };
  }, [stopClient]);

  return { isConnected, error, connect, stopClient };
}
