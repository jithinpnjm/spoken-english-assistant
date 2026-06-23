import { useState, useRef, useCallback, useEffect } from 'react';

// PCM conversion and buffering helper functions
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
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return btoa(binary);
}

export function useGeminiLiveAPI(onMessage?: (msg: any) => void) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const captureCtxRef = useRef<AudioContext | null>(null);
  const playbackCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  
  // Audio playback queue
  const nextStartTimeRef = useRef<number>(0);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);

  const onMessageRef = useRef(onMessage);
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  const textBufferRef = useRef<string>("");

  const stopAllPlayback = useCallback(() => {
    audioQueueRef.current.forEach((s) => { try { s.stop(); } catch {} });
    audioQueueRef.current = [];
    if (playbackCtxRef.current) {
      nextStartTimeRef.current = playbackCtxRef.current.currentTime;
    }
  }, []);

  const stopClient = useCallback(() => {
    if (wsRef.current) {
      try { wsRef.current.close(); } catch {}
      wsRef.current = null;
    }
    if (processorRef.current && sourceRef.current && captureCtxRef.current) {
      try { sourceRef.current.disconnect(processorRef.current); } catch {}
      try { processorRef.current.disconnect(captureCtxRef.current.destination); } catch {}
    }
    processorRef.current = null;
    sourceRef.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (captureCtxRef.current) {
      captureCtxRef.current.close().catch(() => {});
      captureCtxRef.current = null;
    }
    if (playbackCtxRef.current) {
      playbackCtxRef.current.close().catch(() => {});
      playbackCtxRef.current = null;
    }
    stopAllPlayback();
    setIsConnected(false);
    nextStartTimeRef.current = 0;
  }, [stopAllPlayback]);

  const connect = useCallback(async (userName: string = "Student", userLevel: string = "Intermediate", dailyTopic?: string) => {
    try {
      setError(null);
      
      // Get API Key from the backend config
      const resConfig = await fetch("/api/config");
      if (!resConfig.ok) {
        throw new Error(`Failed to fetch API key configuration: status ${resConfig.status}`);
      }
      const config = await resConfig.json();
      const apiKey = config.apiKey;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in the backend environment.");
      }

      const INPUT_RATE = 16000;
      const OUTPUT_RATE = 24000;

      // Chrome/Safari suspends AudioContext created outside user gestures.
      // Calling connect directly inside a button handler ensures it works.
      const AudioCtxClass = (window as any).AudioContext || (window as any).webkitAudioContext;

      const captureCtx = new AudioCtxClass({ sampleRate: INPUT_RATE });
      await captureCtx.resume();
      captureCtxRef.current = captureCtx;

      const playbackCtx = new AudioCtxClass({ sampleRate: OUTPUT_RATE });
      await playbackCtx.resume();
      playbackCtxRef.current = playbackCtx;
      nextStartTimeRef.current = playbackCtx.currentTime + 0.1;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,   // prevents mic picking up the speaker output
          noiseSuppression: true,   // filters background noise
          autoGainControl: true,    // normalises mic level
          sampleRate: INPUT_RATE,
        }
      });
      streamRef.current = stream;

      const liveModel: string = config.liveModel || "models/gemini-3.1-flash-live-preview";

      const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${apiKey}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      const topicInstruction = dailyTopic ? `Today's conversation topic is: ${dailyTopic}. Try to steer the conversation towards this topic if the student doesn't have anything else to talk about.` : "";

      const systemInstructionText = `You are Sky, a strict and encouraging English grammar coach. Your student is ${userName} at ${userLevel} level. ${topicInstruction}

YOUR ONLY JOB IS TO IDENTIFY AND CORRECT EVERY ENGLISH MISTAKE IN THE STUDENT'S SENTENCE.

When the student speaks, follow this exact pattern every single time:

1. If there is ANY grammar, vocabulary, tense, or word-order mistake:
   a. First say "You said: [repeat exactly what they said]."
   b. Then say "Here is the fully corrected sentence: [corrected version with ALL mistakes fixed]."
   c. Then explain EVERY mistake you found, one by one. For each mistake say what was wrong and what the correct form is and why.
   d. Finally say "Now try saying the full corrected sentence: [corrected version again]."

2. If their sentence is perfectly correct: Say "Perfect sentence! Well done." Then ask ONE short follow-up question to keep practicing.

STRICT RULES:
- NEVER correct only one mistake and ignore the rest. Find and explain EVERY mistake in the sentence.
- NEVER ignore a grammar mistake to be polite. ALWAYS correct everything you find.
- NEVER just chat about the topic without correcting mistakes first.
- Speak in plain English only, no markdown, no bullet symbols, no special characters.
- You are a thorough teacher, not just a conversation partner. Mark every error like a teacher grading an essay.

Example: Student says "She don't went to school yesterday because she are sick."
You say: "You said: She don't went to school yesterday because she are sick. Here is the fully corrected sentence: She did not go to school yesterday because she was sick. There are three mistakes. First, don't went is wrong. For past tense negatives use did not, and the main verb stays in base form, so it should be did not go. Second, went cannot follow don't, so go is correct here. Third, she are is wrong because she is singular and needs was in past tense, not are. Now try saying the full corrected sentence: She did not go to school yesterday because she was sick."`;

      ws.onopen = () => {
        ws.send(JSON.stringify({
          setup: {
            model: liveModel,
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                // Aoede: warm, natural-sounding voice — best for conversational coaching
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Aoede' } },
              },
            },
            systemInstruction: { parts: [{ text: systemInstructionText }] },
          },
        }));
      };

      ws.onmessage = async (event) => {
        try {
          const text = typeof event.data === 'string' ? event.data : await (event.data as Blob).text();
          const msg = JSON.parse(text);

          if (msg.setupComplete) {
            // Setup media capture streaming
            const source = captureCtx.createMediaStreamSource(stream);
            sourceRef.current = source;

            const processor = captureCtx.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
              if (ws.readyState === WebSocket.OPEN) {
                const b64 = arrayBufferToBase64(floatTo16BitPCM(e.inputBuffer.getChannelData(0)));
                ws.send(JSON.stringify({
                  realtimeInput: {
                    audio: { data: b64, mimeType: `audio/pcm;rate=${INPUT_RATE}` },
                  },
                }));
              }
            };

            const silentGain = captureCtx.createGain();
            silentGain.gain.value = 0;
            source.connect(processor);
            processor.connect(silentGain);
            silentGain.connect(captureCtx.destination);

            setIsConnected(true);
            setError(null);

            // Initiate conversation if dailyTopic is provided
            if (dailyTopic && ws.readyState === WebSocket.OPEN) {
               ws.send(JSON.stringify({
                 clientContent: {
                   turns: [{ role: "user", parts: [{ text: `Let's practice English! Today's topic is ${dailyTopic}. Please start by asking me a simple question about it.` }] }],
                   turnComplete: true
                 }
               }));
            }
            return;
          }

          const sc = msg.serverContent;
          if (!sc) return;

          if (sc.interrupted) {
            stopAllPlayback();
            textBufferRef.current = "";
            if (onMessageRef.current) {
              onMessageRef.current({ interrupted: true });
            }
          }

          if (sc.modelTurn?.parts) {
            for (const part of sc.modelTurn.parts) {
              if (part.inlineData?.data) {
                const pb = playbackCtxRef.current;
                if (pb) {
                  const float32 = base64ToFloat32(part.inlineData.data);
                  const buf = pb.createBuffer(1, float32.length, OUTPUT_RATE);
                  buf.getChannelData(0).set(float32);

                  const src = pb.createBufferSource();
                  src.buffer = buf;
                  src.connect(pb.destination);

                  const JITTER = 0.01;
                  const startTime = Math.max(pb.currentTime + JITTER, nextStartTimeRef.current);
                  src.start(startTime);
                  nextStartTimeRef.current = startTime + buf.duration;
                  audioQueueRef.current.push(src);

                  src.onended = () => {
                    audioQueueRef.current = audioQueueRef.current.filter((s) => s !== src);
                  };
                }
              }
              if (part.text) {
                textBufferRef.current += part.text;
              }
            }
          }

          if (sc.turnComplete) {
            if (textBufferRef.current && onMessageRef.current) {
              onMessageRef.current({ text: textBufferRef.current });
            }
            textBufferRef.current = "";
          }
        } catch (err) {
          console.error("Error processing WS message:", err);
        }
      };

      ws.onerror = () => {
        setError("WebSocket connection to Gemini failed.");
        stopClient();
      };

      ws.onclose = (e) => {
        if (e.code !== 1000) {
          setError(`Disconnected (${e.code}): ${e.reason || 'unknown'}`);
        }
        stopClient();
      };

    } catch (e: any) {
      setError(e.message || "Failed to initialize Gemini Live Voice session");
      stopClient();
    }
  }, [stopClient, stopAllPlayback]);

  const sendText = useCallback((text: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        clientContent: {
          turns: [
            {
              role: "user",
              parts: [{ text }]
            }
          ],
          turnComplete: true
        }
      }));
    }
  }, []);

  const isModelSpeaking = useCallback(() => {
    if (!playbackCtxRef.current) return false;
    return playbackCtxRef.current.currentTime < nextStartTimeRef.current;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current || streamRef.current || captureCtxRef.current || playbackCtxRef.current) {
        if (wsRef.current) {
          try { wsRef.current.close(); } catch {}
        }
        if (processorRef.current && sourceRef.current && captureCtxRef.current) {
          try { sourceRef.current.disconnect(processorRef.current); } catch {}
          try { processorRef.current.disconnect(captureCtxRef.current.destination); } catch {}
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        if (captureCtxRef.current) {
          captureCtxRef.current.close().catch(() => {});
        }
        if (playbackCtxRef.current) {
          playbackCtxRef.current.close().catch(() => {});
        }
        audioQueueRef.current.forEach((s) => { try { s.stop(); } catch {} });
      }
    };
  }, []);

  return {
    isConnected,
    error,
    connect,
    stopClient,
    sendText,
    isModelSpeaking
  };
}
