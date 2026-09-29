// Browser side of the Gemini Live voice session, via the server's /api/audio-bridge WebSocket.
// Ported from english-coach/src/hooks/useGeminiLive.ts (mic capture at 16 kHz PCM, 24 kHz playback,
// mic auto-mute while the teacher speaks, reconnect with backoff, idle timeout, /api/transcribe fallback).
// Differences: the browser sends lesson context instead of a system prompt, transcripts come from Gemini's
// input/output transcription when available, and server-side bridge errors are surfaced without retrying.

import {useCallback, useEffect, useRef, useState} from 'react';
import {bridgeWebSocketUrl, postJson} from './api';
import type {LessonContext} from './types';

const INPUT_RATE = 16000;
const OUTPUT_RATE = 24000;
const RECONNECT_DELAY_MS = 2500;
const MAX_RECONNECT_ATTEMPTS = 3;
const IDLE_TIMEOUT_MS = 3 * 60 * 1000;
const BRIDGE_PATH = '/api/audio-bridge';
const NO_RETRY_CLOSE_CODES = new Set([1000, 1008, 1011, 1013, 4000]);

export interface VoiceTranscript {
  role: 'learner' | 'teacher';
  text: string;
}

export interface LiveVoiceOptions {
  apiBase: string;
  accessCode: string;
  onTranscript: (entry: VoiceTranscript) => void;
  onAccessCodeRequired?: () => void;
}

function floatTo16BitPCM(input: Float32Array): ArrayBuffer {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return output.buffer;
}

function base64ToInt16(base64: string): Int16Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Int16Array(bytes.buffer);
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return btoa(binary);
}

function pcmToWav(samples: Int16Array, sampleRate: number): ArrayBuffer {
  const dataLen = samples.byteLength;
  const buf = new ArrayBuffer(44 + dataLen);
  const view = new DataView(buf);
  const write = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  write(0, 'RIFF');
  view.setUint32(4, 36 + dataLen, true);
  write(8, 'WAVE');
  write(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, 'data');
  view.setUint32(40, dataLen, true);
  new Int16Array(buf, 44).set(samples);
  return buf;
}

export function useLiveVoice(options: LiveVoiceOptions) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isTeacherSpeaking, setIsTeacherSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const wsRef = useRef<WebSocket | null>(null);
  const captureCtxRef = useRef<AudioContext | null>(null);
  const playbackCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef(0);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);
  const teacherPcmRef = useRef<Int16Array[]>([]);
  const sessionIdRef = useRef(0);
  const speakingRef = useRef(false);
  const activeAudioRef = useRef(0);
  const turnCompleteRef = useRef(false);
  const learnerTextRef = useRef('');
  const teacherTextRef = useRef('');
  const lessonRef = useRef<LessonContext | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const intentionalStopRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noRetryRef = useRef(false);

  const setTeacherSpeaking = useCallback((speaking: boolean) => {
    speakingRef.current = speaking;
    setIsTeacherSpeaking(speaking);
  }, []);

  const flushLearnerText = useCallback(() => {
    const text = learnerTextRef.current.trim();
    learnerTextRef.current = '';
    if (text) optionsRef.current.onTranscript({role: 'learner', text});
  }, []);

  const stopAllPlayback = useCallback(() => {
    audioQueueRef.current.forEach((s) => {
      try {
        s.stop();
      } catch {}
    });
    audioQueueRef.current = [];
    activeAudioRef.current = 0;
    if (playbackCtxRef.current) nextStartTimeRef.current = playbackCtxRef.current.currentTime;
  }, []);

  const releaseMedia = useCallback(() => {
    if (processorRef.current && sourceRef.current) {
      try {
        sourceRef.current.disconnect(processorRef.current);
      } catch {}
      try {
        processorRef.current.disconnect();
      } catch {}
    }
    processorRef.current = null;
    sourceRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    captureCtxRef.current?.close().catch(() => {});
    captureCtxRef.current = null;
    playbackCtxRef.current?.close().catch(() => {});
    playbackCtxRef.current = null;
    teacherPcmRef.current = [];
    nextStartTimeRef.current = 0;
  }, []);

  const clearTimers = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = null;
    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
    reconnectTimerRef.current = null;
  }, []);

  /** Tears down socket + audio without touching reconnect bookkeeping. */
  const teardown = useCallback(() => {
    clearTimers();
    sessionIdRef.current += 1;
    flushLearnerText();
    stopAllPlayback();
    setTeacherSpeaking(false);
    turnCompleteRef.current = false;
    const ws = wsRef.current;
    wsRef.current = null;
    if (ws) {
      ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
      try {
        ws.close(1000, 'client stopped');
      } catch {}
    }
    releaseMedia();
    setIsConnected(false);
    setIsConnecting(false);
  }, [clearTimers, flushLearnerText, releaseMedia, setTeacherSpeaking, stopAllPlayback]);

  /** User-intended stop: no reconnect afterwards. */
  const stop = useCallback(() => {
    intentionalStopRef.current = true;
    reconnectAttemptsRef.current = 0;
    teardown();
  }, [teardown]);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setNotice('Voice session ended after 3 minutes without activity.');
      stop();
    }, IDLE_TIMEOUT_MS);
  }, [stop]);

  const transcribeFallback = useCallback(async (chunks: Int16Array[], isCurrent: () => boolean) => {
    const totalLen = chunks.reduce((n, c) => n + c.length, 0);
    const merged = new Int16Array(totalLen);
    let offset = 0;
    for (const c of chunks) {
      merged.set(c, offset);
      offset += c.length;
    }
    try {
      const {apiBase, accessCode} = optionsRef.current;
      const {transcript} = await postJson<{transcript: string}>(
        apiBase,
        '/api/transcribe',
        {audioBase64: arrayBufferToBase64(pcmToWav(merged, OUTPUT_RATE)), mimeType: 'audio/wav'},
        accessCode,
      );
      if (isCurrent() && transcript) optionsRef.current.onTranscript({role: 'teacher', text: transcript});
    } catch {
      // The transcript is a convenience; audio already played.
    }
  }, []);

  const connect = useCallback(
    async (lesson: LessonContext, isReconnect = false) => {
      teardown();
      if (!isReconnect) reconnectAttemptsRef.current = 0;
      intentionalStopRef.current = false;
      noRetryRef.current = false;
      lessonRef.current = lesson;
      const sessionId = sessionIdRef.current + 1;
      sessionIdRef.current = sessionId;
      const isCurrent = () => sessionIdRef.current === sessionId;
      setError(null);
      setNotice(null);
      setIsConnecting(true);

      try {
        const AudioCtx: typeof AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx || !navigator.mediaDevices?.getUserMedia) throw new Error('This browser does not support microphone audio.');

        const captureCtx = new AudioCtx({sampleRate: INPUT_RATE});
        captureCtxRef.current = captureCtx;
        await captureCtx.resume();
        const playbackCtx = new AudioCtx({sampleRate: OUTPUT_RATE});
        playbackCtxRef.current = playbackCtx;
        await playbackCtx.resume();
        nextStartTimeRef.current = playbackCtx.currentTime + 0.1;

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {echoCancellation: true, noiseSuppression: true, autoGainControl: true, sampleRate: INPUT_RATE},
        });
        if (!isCurrent()) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;

        const {apiBase, accessCode} = optionsRef.current;
        const ws = new WebSocket(bridgeWebSocketUrl(apiBase, BRIDGE_PATH, accessCode));
        wsRef.current = ws;

        ws.onopen = () => {
          if (!isCurrent()) return;
          ws.send(JSON.stringify({setupClient: {lesson}}));
        };

        ws.onmessage = async (event) => {
          if (!isCurrent()) return;
          let msg: any;
          try {
            msg = JSON.parse(typeof event.data === 'string' ? event.data : await (event.data as Blob).text());
          } catch {
            return;
          }

          if (msg.bridgeError) {
            noRetryRef.current = true;
            if (msg.bridgeError.code === 'access_code_required') optionsRef.current.onAccessCodeRequired?.();
            setError(msg.bridgeError.message || 'Voice session was rejected by the server.');
            return;
          }
          if (msg.bridgeNotice) {
            noRetryRef.current = true;
            setNotice(msg.bridgeNotice.message);
            return;
          }

          if (msg.setupComplete) {
            reconnectAttemptsRef.current = 0;
            const source = captureCtx.createMediaStreamSource(stream);
            sourceRef.current = source;
            const processor = captureCtx.createScriptProcessor(2048, 1, 1);
            processorRef.current = processor;
            processor.onaudioprocess = (e) => {
              // Half-duplex: do not send mic audio while the teacher is speaking (prevents echo loops).
              if (ws.readyState === WebSocket.OPEN && !speakingRef.current) {
                const data = arrayBufferToBase64(floatTo16BitPCM(e.inputBuffer.getChannelData(0)));
                ws.send(JSON.stringify({realtimeInput: {audio: {data, mimeType: `audio/pcm;rate=${INPUT_RATE}`}}}));
              }
            };
            const silent = captureCtx.createGain();
            silent.gain.value = 0;
            source.connect(processor);
            processor.connect(silent);
            silent.connect(captureCtx.destination);
            setIsConnecting(false);
            setIsConnected(true);
            resetIdleTimer();
            // Let the teacher open the session (scenario starting turn / recap + first task).
            ws.send(
              JSON.stringify({
                clientContent: {turns: [{role: 'user', parts: [{text: 'Start the practice now with your opening turn.'}]}], turnComplete: true},
              }),
            );
            return;
          }

          const sc = msg.serverContent;
          if (!sc) return;

          if (sc.inputTranscription?.text) {
            learnerTextRef.current += sc.inputTranscription.text;
            resetIdleTimer();
          }
          if (sc.outputTranscription?.text) {
            flushLearnerText();
            teacherTextRef.current += sc.outputTranscription.text;
          }

          if (sc.interrupted) {
            stopAllPlayback();
            teacherPcmRef.current = [];
            turnCompleteRef.current = true;
            setTeacherSpeaking(false);
          }

          for (const part of sc.modelTurn?.parts || []) {
            if (!part.inlineData?.data) continue;
            resetIdleTimer();
            flushLearnerText();
            if (!speakingRef.current) {
              turnCompleteRef.current = false;
              setTeacherSpeaking(true);
            }
            const pcm = base64ToInt16(part.inlineData.data);
            teacherPcmRef.current.push(pcm);
            const pb = playbackCtxRef.current;
            if (!pb) continue;
            const float32 = new Float32Array(pcm.length);
            for (let i = 0; i < pcm.length; i++) float32[i] = pcm[i] / 32768;
            const buf = pb.createBuffer(1, float32.length, OUTPUT_RATE);
            buf.getChannelData(0).set(float32);
            const src = pb.createBufferSource();
            src.buffer = buf;
            src.connect(pb.destination);
            const startTime = Math.max(pb.currentTime + 0.01, nextStartTimeRef.current);
            src.start(startTime);
            nextStartTimeRef.current = startTime + buf.duration;
            audioQueueRef.current.push(src);
            activeAudioRef.current++;
            src.onended = () => {
              audioQueueRef.current = audioQueueRef.current.filter((s) => s !== src);
              activeAudioRef.current = Math.max(0, activeAudioRef.current - 1);
              if (activeAudioRef.current === 0 && turnCompleteRef.current) setTeacherSpeaking(false);
            };
          }

          if (sc.turnComplete) {
            turnCompleteRef.current = true;
            if (activeAudioRef.current === 0) setTeacherSpeaking(false);
            const teacherText = teacherTextRef.current.trim();
            teacherTextRef.current = '';
            const chunks = teacherPcmRef.current;
            teacherPcmRef.current = [];
            if (teacherText) optionsRef.current.onTranscript({role: 'teacher', text: teacherText});
            else if (chunks.length) void transcribeFallback(chunks, isCurrent);
          }
        };

        ws.onerror = () => {
          // onclose follows and decides whether to reconnect.
        };

        ws.onclose = (e) => {
          if (!isCurrent()) return;
          const canRetry =
            !intentionalStopRef.current &&
            !noRetryRef.current &&
            !NO_RETRY_CLOSE_CODES.has(e.code) &&
            reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS &&
            lessonRef.current;
          if (canRetry) {
            reconnectAttemptsRef.current++;
            const attempt = reconnectAttemptsRef.current;
            const savedLesson = lessonRef.current!;
            sessionIdRef.current += 1;
            stopAllPlayback();
            setTeacherSpeaking(false);
            releaseMedia();
            wsRef.current = null;
            setIsConnected(false);
            setIsConnecting(true);
            setNotice(`Connection dropped — reconnecting (attempt ${attempt}/${MAX_RECONNECT_ATTEMPTS})...`);
            reconnectTimerRef.current = setTimeout(() => void connect(savedLesson, true), RECONNECT_DELAY_MS * attempt);
            return;
          }
          if (e.code !== 1000 && !intentionalStopRef.current && !noRetryRef.current) {
            setError(`Voice session ended (${e.code || 'network error'}). Please start again.`);
          }
          const hadServerMessage = noRetryRef.current;
          stop();
          noRetryRef.current = hadServerMessage;
        };
      } catch (e: any) {
        if (!isCurrent()) return;
        const denied = e?.name === 'NotAllowedError' || e?.name === 'SecurityError';
        setError(denied ? 'Microphone permission was denied. Allow microphone access for this site and try again.' : e?.message || 'Could not start the voice session.');
        stop();
      }
    },
    [flushLearnerText, releaseMedia, resetIdleTimer, setTeacherSpeaking, stop, stopAllPlayback, transcribeFallback],
  );

  useEffect(() => () => stop(), [stop]);

  return {isConnecting, isConnected, isTeacherSpeaking, error, notice, connect, stop};
}
