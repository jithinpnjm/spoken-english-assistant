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

// Build a WAV file from raw 16-bit PCM samples at the given sample rate
function pcmToWav(samples: Int16Array, sampleRate: number): ArrayBuffer {
  const dataLen = samples.byteLength;
  const buf = new ArrayBuffer(44 + dataLen);
  const view = new DataView(buf);
  const write = (offset: number, str: string) => { for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i)); };
  write(0, "RIFF");
  view.setUint32(4, 36 + dataLen, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);        // chunk size
  view.setUint16(20, 1, true);         // PCM
  view.setUint16(22, 1, true);         // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate
  view.setUint16(32, 2, true);         // block align
  view.setUint16(34, 16, true);        // bits per sample
  write(36, "data");
  view.setUint32(40, dataLen, true);
  new Int16Array(buf, 44).set(samples);
  return buf;
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
  // Accumulate agent PCM samples (Int16) to transcribe after turnComplete
  const agentPCMRef = useRef<Int16Array[]>([]);

  const onMessageRef = useRef(onMessage);
  useEffect(() => { onMessageRef.current = onMessage; }, [onMessage]);

  const stopAllPlayback = useCallback(() => {
    audioQueueRef.current.forEach((s) => { try { s.stop(); } catch {} });
    audioQueueRef.current = [];
    if (playbackCtxRef.current) {
      nextStartTimeRef.current = playbackCtxRef.current.currentTime;
    }
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
      const apiKey = config.apiKey;
      if (!apiKey) throw new Error("GEMINI_API_KEY not set on server");

      const liveModel: string = config.liveModel || "models/gemini-3.1-flash-live-preview";
      dbg.live.log("connect: using model", liveModel);

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

      const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${apiKey}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      const topicLine = dailyTopic ? `Today's activity or topic: ${dailyTopic}.` : "";

      const modeInstructions: Record<string, string> = {
        gentle_conversation: `Be warm and encouraging. Gently point out ONE key mistake after responding naturally to what the student said. Keep corrections brief and positive. Focus on keeping the conversation flowing.`,
        balanced: `Correct ALL grammar, tense, and vocabulary mistakes clearly but warmly. After correcting, continue the conversation naturally. Balance correction with encouragement.`,
        strict_correction: `Correct EVERY single mistake ruthlessly and thoroughly. For each mistake: state what was wrong, the correct form, and the grammar rule. Repeat the corrected sentence. Do not move on until every error is addressed.`,
        roleplay: `Stay in character for the roleplay scenario. Correct mistakes naturally within the scene — for example, as a customer who politely repeats the correct phrase. Break character only for serious grammar issues.`,
        workplace: `Focus on professional business English. Correct grammar, vocabulary, and tone for workplace communication. Flag informal language and suggest formal alternatives. Use realistic workplace scenarios.`,
      };

      const levelContext: Record<string, string> = {
        Beginner: `The student is a beginner. Use very simple vocabulary. Explain mistakes in the simplest terms possible. Be very patient and encouraging.`,
        Intermediate: `The student is at intermediate level. They understand basic grammar. Focus on tense consistency, prepositions, articles, and natural phrasing.`,
        Advanced: `The student is advanced. Focus on subtle mistakes — word choice, idioms, sentence rhythm, register, and nuance. Push them to sound like a native speaker.`,
      };

      const systemInstructionText = `You are Sky, a private English speaking coach for ${userName}.
${levelContext[userLevel] || levelContext["Intermediate"]}
${topicLine}

COACHING MODE: ${coachMode}
${modeInstructions[coachMode] || modeInstructions["balanced"]}

ALWAYS:
- Speak in plain English only. No markdown, no bullet symbols, no special characters.
- Keep your response concise and spoken-friendly.
- End every response with one short question to keep the student speaking.
- Never skip a mistake to be polite.`;

      ws.onopen = () => {
        dbg.live.log("ws.onopen: sending setup (AUDIO only)");
        ws.send(JSON.stringify({
          setup: {
            model: liveModel,
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } } },
            },
            systemInstruction: { parts: [{ text: systemInstructionText }] },
          },
        }));
      };

      ws.onmessage = async (event) => {
        try {
          const raw = typeof event.data === "string" ? event.data : await (event.data as Blob).text();
          const msg = JSON.parse(raw);

          if (msg.setupComplete) {
            dbg.live.log("ws: setupComplete — starting audio capture");
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
            dbg.live.log("ws: interrupted");
            stopAllPlayback();
            agentPCMRef.current = [];
            onMessageRef.current?.({ interrupted: true });
          }

          if (sc.modelTurn?.parts) {
            for (const part of sc.modelTurn.parts) {
              if (part.inlineData?.data) {
                // Collect PCM for transcription after turn ends
                const binary = atob(part.inlineData.data);
                const bytes = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
                const int16chunk = new Int16Array(bytes.buffer);
                agentPCMRef.current.push(int16chunk);

                // Play audio
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
            dbg.live.log("ws: turnComplete — transcribing agent audio");
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
                  dbg.live.log("transcribe result:", transcript?.slice(0, 80));
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
          dbg.live.error("ws.onmessage error:", err);
        }
      };

      ws.onerror = (e) => {
        dbg.live.error("ws.onerror:", e);
        setError("Live agent connection failed.");
        stopClient();
      };

      ws.onclose = (e) => {
        dbg.live.log("ws.onclose code:", e.code, "reason:", e.reason);
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
