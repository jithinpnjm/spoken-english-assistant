import React, { useState, useEffect, useRef, useCallback } from "react";
import { useGeminiLiveAPI } from "../hooks/useGeminiLive";
import {
  fetchUserSessions, saveSession, deleteSession,
  fetchSessionMessages, saveSessionMessage, updateUserProfile
} from "../lib/firebase";
import { CoachSession, CoachMessage, ProficiencyLevel, InteractionMode } from "../types";
import VoiceIndicator from "./VoiceIndicator";
import {
  Sparkles, Send, LogOut, Volume2, VolumeX,
  MessageSquare, Mic, MicOff, Plus, Trash2,
  CheckCircle, AlertTriangle, Sliders, Radio
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InteractiveCoachProps {
  user: any;
  userProfile: any;
  onSignOut: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  activeProfile: string;
}

export default function InteractiveCoach({
  user, userProfile, onSignOut,
  highContrast, onToggleHighContrast, activeProfile
}: InteractiveCoachProps) {

  // ─── Settings ─────────────────────────────────────────────────────────────────
  const [level, setLevel] = useState<ProficiencyLevel>(
    (userProfile?.level as ProficiencyLevel) || "Intermediate"
  );
  const dayTopics = ["food and cooking", "travel and holidays", "your daily job routine", "shopping", "movies and TV", "books", "fitness", "music", "pets", "morning routines"];
  const dailyTopic = dayTopics[Math.floor(Date.now() / 86400000) % dayTopics.length];

  // ─── Sessions & messages (single unified list) ────────────────────────────────
  const [sessions, setSessions]           = useState<CoachSession[]>([]);
  const [activeSession, setActiveSession] = useState<CoachSession | null>(null);
  const [messages, setMessages]           = useState<CoachMessage[]>([]);

  // ─── UI state ─────────────────────────────────────────────────────────────────
  const [inputText, setInputText]       = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [voiceState, setVoiceState]     = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const chatEndRef                       = useRef<HTMLDivElement | null>(null);
  const recognitionRef                   = useRef<any>(null);
  const cachedApiKeyRef                  = useRef<string | null>(null);
  const cachedLiveModelRef               = useRef<string | null>(null);
  const ttsCtxRef                        = useRef<AudioContext | null>(null);
  const ttsWsRef                         = useRef<WebSocket | null>(null);

  // ─── Gemini Live (handles ALL voice output — no browser TTS) ─────────────────
  const handleLiveMessage = useCallback((msg: any) => {
    if (!msg.text || !activeSession) return;
    const coachMsg: CoachMessage = {
      messageId: `msg_live_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      sessionId: activeSession.sessionId,
      userId: user.uid,
      sender: "coach",
      text: msg.text,
      grammarCorrection: null,
      identifiedMistakes: [],
      coachingTip: "",
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, coachMsg]);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
    try { saveSessionMessage(activeSession.sessionId, coachMsg); } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSession, user.uid]);
  const geminiLive = useGeminiLiveAPI(handleLiveMessage);

  // ─── Color tokens ─────────────────────────────────────────────────────────────
  const ui = {
    bg:             highContrast ? "bg-black text-white" : "bg-transparent text-slate-100",
    sidebar:        highContrast ? "bg-black border-2 border-white rounded-none" : "backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl",
    header:         highContrast ? "bg-black border-b-2 border-white rounded-none" : "backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl",
    card:           highContrast ? "bg-black border-2 border-white rounded-none" : "backdrop-blur-md bg-black/20 border border-white/10 rounded-3xl",
    bubbleUser:     highContrast ? "bg-zinc-800 border-2 border-white" : "bg-indigo-600/40 border border-indigo-400/30 rounded-2xl rounded-tr-none shadow-xl text-white",
    bubbleCoach:    highContrast ? "bg-zinc-900 border border-white" : "bg-white/10 border border-white/20 rounded-2xl rounded-tl-none text-slate-200",
    correction:     highContrast ? "bg-black border-2 border-white text-white" : "bg-emerald-950/30 border border-emerald-500/30 rounded-2xl",
    btnPrimary:     highContrast ? "bg-white text-black hover:bg-zinc-200" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg",
    btnVoice:       highContrast ? "bg-white text-black hover:bg-zinc-200" : "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/30",
    inputField:     highContrast ? "bg-black border-2 border-white text-white" : "bg-white/10 border border-white/20 text-slate-200 placeholder:text-slate-400",
    listItem:       highContrast ? "border border-zinc-700 hover:border-white text-white" : "bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300",
    listActive:     highContrast ? "bg-white text-black border-2 border-white font-bold" : "bg-white/20 border border-white/30 text-white font-medium shadow-lg",
  };

  // ─── Init ─────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (user?.uid && activeProfile) loadSessions();
  }, [user, activeProfile]);

  useEffect(() => {
    if (activeSession) loadMessages(activeSession.sessionId);
    else setMessages([]);
  }, [activeSession]);

  useEffect(() => {
    if (!geminiLive.isConnected) setVoiceState("idle");
  }, [geminiLive.isConnected]);

  // ─── Session loading ──────────────────────────────────────────────────────────
  const loadSessions = async () => {
    try {
      const all = (await fetchUserSessions(user.uid, activeProfile)) as CoachSession[];
      setSessions(all);
      if (all.length > 0) setActiveSession(all[0]);
      else await createNewSession();
    } catch {
      // Firestore unavailable — work in-memory
      await createNewSession();
    }
  };

  const loadMessages = async (sid: string) => {
    try {
      setMessages((await fetchSessionMessages(sid)) as CoachMessage[]);
      scrollToBottom();
    } catch {}
  };

  const createNewSession = async (): Promise<CoachSession> => {
    const sid = "sess_" + Date.now();
    const sess: CoachSession = {
      sessionId: sid, userId: user.uid, userName: activeProfile,
      title: `Session (${new Date().toLocaleDateString()})`,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      mode: "writing", profileId: activeProfile,
    };
    try { await saveSession(sess); } catch {}

    const intro: CoachMessage = {
      messageId: "msg_intro_" + Date.now(), sessionId: sid,
      userId: user.uid, sender: "coach",
      text: `Hello ${activeProfile}! I'm Coach Sky. Today's suggested topic is **${dailyTopic}**, but we can talk about anything! Type or press the mic to speak — I'll correct your English grammar and keep you practicing!`,
      grammarCorrection: null, identifiedMistakes: [], coachingTip: "Mistakes are your best learning opportunities!",
      createdAt: new Date().toISOString(),
    };
    try { await saveSessionMessage(sid, intro); } catch {}

    setSessions(prev => [sess, ...prev]);
    setActiveSession(sess);
    setMessages([intro]);
    return sess;
  };

  const deleteSessionItem = async (e: React.MouseEvent, sid: string) => {
    e.stopPropagation();
    if (!confirm("Delete this session?")) return;
    try { await deleteSession(sid); } catch {}
    const filtered = sessions.filter(s => s.sessionId !== sid);
    setSessions(filtered);
    if (activeSession?.sessionId === sid) setActiveSession(filtered[0] ?? null);
  };

  const scrollToBottom = () =>
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

  const handleLevelChange = async (newLevel: ProficiencyLevel) => {
    setLevel(newLevel);
    try { await updateUserProfile(user.uid, { level: newLevel }); } catch {}
  };

  // ─── Send typed message → backend coach API ───────────────────────────────────
  const handleSendMessage = async (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const text = (overrideText ?? inputText).trim();
    if (!text) return;

    let session = activeSession;
    if (!session) { session = await createNewSession(); }

    setInputText("");
    setIsLoading(true);
    setError(null);

    const userMsg: CoachMessage = {
      messageId: "msg_user_" + Date.now(), sessionId: session.sessionId,
      userId: user.uid, sender: "user", text,
      grammarCorrection: null, identifiedMistakes: [], coachingTip: "",
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    scrollToBottom();
    try { await saveSessionMessage(session.sessionId, userMsg); } catch {}

    try {
      const history = messages.map(m => ({ role: m.sender === "user" ? "user" : "model", text: m.text }));
      const res = await fetch("/api/coach-interaction", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageText: text, userLevel: level, userName: activeProfile || "Student", history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `API error ${res.status}`);

      const coachMsg: CoachMessage = {
        messageId: "msg_coach_" + Date.now(), sessionId: session.sessionId,
        userId: user.uid, sender: "coach", text: data.coachReply,
        grammarCorrection: data.inputCorrection,
        identifiedMistakes: data.identifiedMistakes || [],
        coachingTip: data.coachingTip || "",
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, coachMsg]);
      scrollToBottom();
      try { await saveSessionMessage(session.sessionId, coachMsg); } catch {}

      speakWithGeminiTTS(data.coachReply);

    } catch (err: any) {
      setError(err.message || "Could not reach Coach Sky. Check your GEMINI_API_KEY in .env");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Gemini TTS via Live WebSocket (Aoede voice, same as voice agent) ─────
  const getConfig = async (): Promise<{ apiKey: string; liveModel: string }> => {
    if (cachedApiKeyRef.current && cachedLiveModelRef.current) {
      return { apiKey: cachedApiKeyRef.current, liveModel: cachedLiveModelRef.current };
    }
    const res = await fetch("/api/config");
    const cfg = await res.json();
    cachedApiKeyRef.current = cfg.apiKey;
    cachedLiveModelRef.current = cfg.liveModel || "models/gemini-3.1-flash-live-preview";
    return { apiKey: cachedApiKeyRef.current!, liveModel: cachedLiveModelRef.current! };
  };

  const speakWithGeminiTTS = async (text: string): Promise<void> => {
    // Stop any previous TTS playback
    if (ttsCtxRef.current) {
      ttsCtxRef.current.close().catch(() => {});
      ttsCtxRef.current = null;
    }
    if (ttsWsRef.current) {
      try { ttsWsRef.current.close(); } catch {}
      ttsWsRef.current = null;
    }

    return new Promise(async (resolve) => {
      try {
        const { apiKey, liveModel } = await getConfig();
        const OUTPUT_RATE = 24000;
        const AudioCtxClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtxClass({ sampleRate: OUTPUT_RATE });
        ttsCtxRef.current = ctx;

        const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${apiKey}`;
        const ws = new WebSocket(wsUrl);
        ttsWsRef.current = ws;

        let nextStartTime = ctx.currentTime + 0.05;
        let setupDone = false;

        ws.onopen = () => {
          ws.send(JSON.stringify({
            setup: {
              model: liveModel,
              generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                  voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
                },
              },
            },
          }));
        };

        ws.onmessage = async (event) => {
          try {
            const raw = typeof event.data === "string" ? event.data : await (event.data as Blob).text();
            const msg = JSON.parse(raw);

            if (msg.setupComplete && !setupDone) {
              setupDone = true;
              ws.send(JSON.stringify({
                clientContent: {
                  turns: [{ role: "user", parts: [{ text }] }],
                  turnComplete: true,
                },
              }));
            }

            const sc = msg.serverContent;
            if (!sc) return;

            if (sc.modelTurn?.parts) {
              for (const part of sc.modelTurn.parts) {
                if (part.inlineData?.data) {
                  const binary = atob(part.inlineData.data);
                  const bytes = new Uint8Array(binary.length);
                  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
                  const int16 = new Int16Array(bytes.buffer);
                  const float32 = new Float32Array(int16.length);
                  for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768.0;

                  const buf = ctx.createBuffer(1, float32.length, OUTPUT_RATE);
                  buf.getChannelData(0).set(float32);
                  const src = ctx.createBufferSource();
                  src.buffer = buf;
                  src.connect(ctx.destination);
                  const startTime = Math.max(ctx.currentTime + 0.01, nextStartTime);
                  src.start(startTime);
                  nextStartTime = startTime + buf.duration;
                }
              }
            }

            if (sc.turnComplete) {
              ws.close();
              ttsWsRef.current = null;
              const remaining = Math.max(0, (nextStartTime - ctx.currentTime) * 1000 + 100);
              setTimeout(() => {
                ttsCtxRef.current = null;
                ctx.close().catch(() => {});
                resolve();
              }, remaining);
            }
          } catch {}
        };

        ws.onerror = () => {
          ttsWsRef.current = null;
          ttsCtxRef.current = null;
          ctx.close().catch(() => {});
          speakWithBrowserTTS(text);
          resolve();
        };

        ws.onclose = () => { ttsWsRef.current = null; };
      } catch {
        speakWithBrowserTTS(text);
        resolve();
      }
    });
  };

  const speakWithBrowserTTS = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text
      .replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "")
      .replace(/[.]+/g, ", ").replace(/["']/g, "").trim();
    const voices = window.speechSynthesis.getVoices();
    const preferred = ["Samantha", "Karen", "Daniel", "Moira", "Tessa", "Fiona", "Victoria", "Allison", "Ava"];
    let voice: SpeechSynthesisVoice | null = null;
    for (const name of preferred) {
      voice = voices.find(v => v.name.includes(name) && v.lang.startsWith("en")) ?? null;
      if (voice) break;
    }
    if (!voice) voice = voices.find(v => v.lang === "en-US" && !v.name.includes("Google")) ?? null;
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = "en-US";
    u.rate = 0.92;
    if (voice) u.voice = voice;
    window.speechSynthesis.speak(u);
  };

  // ─── Mic button: toggle Gemini Live voice session ─────────────────────────────
  const toggleMic = async () => {
    if (geminiLive.isConnected) {
      geminiLive.stopClient();
      setVoiceState("idle");
      try { recognitionRef.current?.stop(); } catch {}
    } else {
      setError(null);
      // Ensure we have an active session
      let session = activeSession;
      if (!session) session = await createNewSession();
      geminiLive.connect(activeProfile || "Student", level, dailyTopic);
      setVoiceState("listening");
      startSpeechRecognition(session);
    }
  };

  // Browser speech recognition — transcribes for the chat UI
  // The actual audio is also streamed to Gemini Live via the WebSocket PCM path
  const startSpeechRecognition = (session: CoachSession) => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    try { recognitionRef.current?.stop(); } catch {}
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = "en-US";

    rec.onresult = async (event: any) => {
      const last = event.results[event.results.length - 1];
      if (!last.isFinal) return;
      const transcript = last[0].transcript.trim();
      if (!transcript) return;

      // Only show transcript in chat — Gemini Live handles all coaching responses via audio
      const userMsg: CoachMessage = {
        messageId: "msg_user_" + Date.now(), sessionId: session.sessionId,
        userId: user.uid, sender: "user", text: transcript,
        grammarCorrection: null, identifiedMistakes: [], coachingTip: "",
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMsg]);
      scrollToBottom();
      try { await saveSessionMessage(session.sessionId, userMsg); } catch {}
    };

    rec.onerror = (e: any) => console.error("SR:", e);
    rec.onend = () => { if (geminiLive.isConnected) try { rec.start(); } catch {} };
    recognitionRef.current = rec;
    try { rec.start(); } catch (e) { console.error(e); }
  };

  const startPresetTopic = (topic: string) => {
    if (geminiLive.isConnected) {
      geminiLive.sendText(`Let's talk about: ${topic}. Could you start by asking me a simple prompt?`);
    } else {
      handleSendMessage(undefined, `Let's talk about: ${topic}. Could you start by asking me a simple prompt?`);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className={`h-screen flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-6 ${ui.bg} overflow-hidden`} id="main-panel">

      {/* ─── SIDEBAR ──────────────────────────────────────────────────────────── */}
      <aside className={`w-full md:w-64 flex-shrink-0 flex flex-col overflow-hidden ${ui.sidebar}`} id="sidebar">

        {/* Profile */}
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white text-lg ${activeProfile === "Sandra" ? "bg-rose-400" : "bg-emerald-400"}`}>
              {activeProfile?.charAt(0) ?? "U"}
            </div>
            <div className="flex-1">
              <h1 className="font-semibold text-xl tracking-tight leading-none">{activeProfile || "Student"}</h1>
              <p className="text-[10px] text-slate-300 mt-1">Active Profile</p>
            </div>
            <button onClick={onSignOut} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Sign out" id="sign-out-btn">
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* New session */}
        <div className="px-6 py-4">
          <button onClick={createNewSession} className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${ui.btnPrimary}`} id="new-session-btn">
            <Plus className="h-5 w-5" /><span>New Session</span>
          </button>
        </div>

        {/* Session history */}
        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-2">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold px-2 mb-2">Practice History</p>
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 px-4">No sessions yet. Create one above!</div>
          ) : sessions.map(sess => {
            const isActive = sess.sessionId === activeSession?.sessionId;
            return (
              <div
                key={sess.sessionId}
                onClick={() => setActiveSession(sess)}
                className={`w-full p-3 rounded-2xl flex items-center justify-between cursor-pointer group/item transition-all ${isActive ? ui.listActive : ui.listItem} ${!isActive && !highContrast ? "opacity-70 hover:opacity-100" : ""}`}
                id={`session-${sess.sessionId}`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${isActive ? "bg-indigo-500 text-white" : "bg-white/10 text-slate-400"}`}>
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="text-sm truncate text-left">
                    <p className="font-semibold truncate">{sess.title}</p>
                    <p className="text-[10px] text-slate-300">{new Date(sess.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <button onClick={e => deleteSessionItem(e, sess.sessionId)}
                  className="p-1 rounded opacity-0 group-hover/item:opacity-100 hover:bg-white/20 text-slate-400 hover:text-white transition-all ml-1">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Settings */}
        <div className="p-4 mt-auto">
          <div className="backdrop-blur-xl bg-indigo-900/40 border border-indigo-400/20 rounded-2xl p-4 cursor-pointer" onClick={onToggleHighContrast}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">High Contrast</span>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${highContrast ? "bg-emerald-400/80" : "bg-white/10"}`}>
                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${highContrast ? "right-1" : "left-1"}`}></div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">Enable for better visibility.</p>
          </div>
        </div>
      </aside>

      {/* ─── MAIN PANEL ───────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden gap-4 md:gap-6" id="conversation-stage">

        {/* Header */}
        <header className={`h-16 flex items-center justify-between px-6 flex-shrink-0 ${ui.header}`} id="header-controls">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {geminiLive.isConnected ? (
                <span className="flex items-center gap-2 text-xs font-bold text-violet-300 bg-violet-500/10 border border-violet-500/30 px-3 py-1.5 rounded-full">
                  <Radio className="h-3.5 w-3.5 animate-pulse" />
                  Live Voice Active
                </span>
              ) : (
                <span className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Coach Sky
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
              <span className="text-xs font-medium text-amber-200 hidden sm:inline">Sync Active</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 p-1.5 rounded-lg border border-white/10">
              <Sliders className="h-4 w-4 text-slate-300 ml-1.5" />
              <select
                value={level}
                onChange={e => handleLevelChange(e.target.value as ProficiencyLevel)}
                className="bg-transparent outline-none text-xs font-medium text-white pr-2 border-none cursor-pointer"
                id="level-selector"
              >
                <option value="Beginner" className="bg-slate-900">Beginner</option>
                <option value="Intermediate" className="bg-slate-900">Intermediate</option>
                <option value="Advanced" className="bg-slate-900">Advanced</option>
              </select>
            </div>
          </div>
        </header>

        {/* ─── CHAT PANEL ─────────────────────────────────────────────────────── */}
        <div className={`flex-1 flex flex-col overflow-hidden ${ui.card}`} id="chat-panel">

          {/* Voice status banner — only shown when Gemini Live is on */}
          <AnimatePresence>
            {geminiLive.isConnected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-violet-600/10 border-b border-violet-500/20 px-5 py-2 flex items-center gap-3 flex-shrink-0"
              >
                <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse flex-shrink-0"></div>
                <p className="text-xs text-violet-300">
                  <span className="font-semibold">Live Voice on</span> — speak freely · Sky hears you &amp; corrects grammar · Aoede voice replies
                </p>
                <VoiceIndicator state={voiceState} highContrast={highContrast} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message stream */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5" id="message-stream">

            {error && (
              <div className={`p-4 rounded-xl text-sm border flex items-start gap-3 ${highContrast ? "border-red-600 bg-red-950 text-red-200" : "border-red-500/20 bg-red-500/10 text-red-400"}`}>
                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Coach Module Alert</p>
                  <p className="text-xs mt-0.5">{error}</p>
                  <button onClick={() => setError(null)} className="text-xs font-bold mt-2 underline">Dismiss</button>
                </div>
              </div>
            )}

            {/* Empty state topic starters */}
            {messages.length <= 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto text-center">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-indigo-600/20 border border-indigo-500/30 mb-4">
                  <Sparkles className="h-6 w-6 text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold mb-2">Practice with Coach Sky</h2>
                <p className="text-sm text-slate-400 mb-6">
                  <strong>Type</strong> any English sentence below or press the <strong>🎤 mic</strong> to speak — Sky corrects grammar and replies in Aoede voice.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                  {(() => {
                    const allTopics = [
                      { e: "🍳", l: "Talk about cooking, meals, and dinner recipes.", t: "Food & Cooking recipes" },
                      { e: "✈️", l: "Describe your dream holiday and vacation plans.", t: "A travel plan to Paris" },
                      { e: "💼", l: "Tell me about your job and typical work day.", t: "Describe my daily job routine" },
                      { e: "🛍️", l: "Roleplay shopping scenarios or buying gifts.", t: "Shopping and bargaining" },
                      { e: "🎬", l: "Discuss your favorite movies and TV shows.", t: "Movies and TV shows" },
                      { e: "📚", l: "Talk about a book you recently read or loved.", t: "Books and literature" },
                      { e: "🏋️", l: "Describe your fitness routine and health habits.", t: "Health and fitness" },
                      { e: "🎵", l: "Share your taste in music and favorite artists.", t: "Music and concerts" },
                      { e: "🐶", l: "Talk about pets and your favorite animals.", t: "Pets and animals" },
                      { e: "☕", l: "Describe a typical morning routine for you.", t: "Morning routines" },
                      { e: "🍂", l: "Discuss your favorite season and activities.", t: "Seasons and weather" },
                      { e: "🎮", l: "Talk about video games or hobbies you enjoy.", t: "Hobbies and gaming" },
                      { e: "🍽️", l: "Pretend we are ordering food at a restaurant.", t: "Ordering at a restaurant" },
                      { e: "🏠", l: "Describe your dream house or current home.", t: "Home and living" }
                    ];
                    const dayOfYear = Math.floor(Date.now() / 86400000);
                    const startIndex = (dayOfYear * 4) % allTopics.length;
                    
                    const dailyTopics = [];
                    for(let i=0; i<4; i++) {
                      dailyTopics.push(allTopics[(startIndex + i) % allTopics.length]);
                    }
                    return dailyTopics;
                  })().map(({ e, l, t }) => (
                    <button key={t} onClick={() => startPresetTopic(t)}
                      className="p-3 text-left rounded-xl text-xs font-medium border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-slate-300 hover:text-white">
                      {e} {l}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Message bubbles */}
            <div className="space-y-5 max-w-3xl mx-auto">
              {messages.map(item => {
                const isCoach = item.sender === "coach";
                const prevUser = messages.find(m => m.createdAt < item.createdAt && m.sender === "user")?.text;
                const hasCorrection = isCoach && item.grammarCorrection &&
                  item.grammarCorrection !== "null" &&
                  item.grammarCorrection !== "None" &&
                  item.grammarCorrection !== "none" &&
                  item.grammarCorrection.trim().toLowerCase() !== prevUser?.trim().toLowerCase();

                return (
                  <div key={item.messageId} className={`flex flex-col ${isCoach ? "items-start" : "items-end"}`} id={`msg-${item.messageId}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-slate-500 font-bold capitalize">
                        {isCoach ? "Coach Sky" : (activeProfile || "You")}
                      </span>
                      <span className="text-[10px] text-slate-500/50">
                        {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed ${isCoach ? ui.bubbleCoach : ui.bubbleUser}`}>
                      <p>{item.text}</p>
                      {isCoach && (
                        <div className="mt-2 pt-2 border-t border-white/10 opacity-50 hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => speakWithGeminiTTS(item.text)}
                            className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                            title="Read aloud"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                            <span>Read aloud</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {hasCorrection && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className={`mt-2 w-full max-w-[88%] p-4 ${ui.correction}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">Correction System</span>
                          <div className="h-[1px] flex-1 bg-indigo-400/20"></div>
                        </div>
                        <p className="text-xs text-emerald-400 font-bold mb-1">Grammar Fix:</p>
                        <p className="text-sm text-slate-300 italic mb-2">"{prevUser}"</p>
                        <div className="bg-white/5 p-2 rounded-lg mb-2">
                          <p className="text-sm font-semibold text-emerald-300">"{item.grammarCorrection}"</p>
                        </div>
                        {item.identifiedMistakes && item.identifiedMistakes.length > 0 && (
                          <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-400 italic mt-1">
                            {item.identifiedMistakes.map((m, i) => <li key={i}>{m}</li>)}
                          </ul>
                        )}
                        {item.coachingTip && <p className="text-[11px] text-slate-400 mt-2">💡 {item.coachingTip}</p>}
                      </motion.div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-slate-500 font-bold block mb-1">Coach Sky</span>
                  <div className={`p-4 rounded-2xl ${ui.bubbleCoach} flex items-center space-x-2`}>
                    {[0, 150, 300].map(d => <div key={d} className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }}></div>)}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* ─── INPUT BAR: text + mic side by side ──────────────────────────── */}
          <div className="flex-shrink-0 p-4 md:p-5 pt-0" id="input-bar">

            {/* Mic status when active */}
            {geminiLive.isConnected && (
              <div className="mb-3 flex items-center justify-center gap-2 text-xs text-emerald-400">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span>{voiceState === "listening" ? "Listening — speak now..." : voiceState === "thinking" ? "Processing..." : "Live connected"}</span>
                <span className="text-slate-500">· Gemini Aoede voice is active</span>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex gap-2" id="chat-form">
              {/* Text input */}
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                disabled={isLoading || geminiLive.isConnected}
                placeholder={geminiLive.isConnected ? "🎙 Voice agent is active — stop mic to type..." : "Type an English sentence..."}
                className={`flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all ${ui.inputField} ${geminiLive.isConnected ? "opacity-40 cursor-not-allowed" : ""}`}
                id="sentence-input"
              />

              {/* Send button */}
              <button
                type="submit"
                disabled={isLoading || !inputText.trim() || geminiLive.isConnected}
                className={`px-4 py-3 rounded-xl flex items-center justify-center transition-all ${ui.btnPrimary} ${geminiLive.isConnected ? "opacity-40 cursor-not-allowed" : ""}`}
                id="send-btn"
                title="Send"
              >
                <Send className="h-5 w-5" />
              </button>

              {/* Mic button — toggles Gemini Live */}
              <button
                type="button"
                onClick={toggleMic}
                className={`px-4 py-3 rounded-xl flex items-center gap-2 font-semibold text-sm transition-all ${
                  geminiLive.isConnected
                    ? "bg-red-600 text-white animate-pulse"
                    : ui.btnVoice
                }`}
                id="mic-btn"
                title={geminiLive.isConnected ? "Stop voice session" : "Start live voice (Aoede)"}
              >
                {geminiLive.isConnected ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                <span className="hidden sm:inline">{geminiLive.isConnected ? "Stop" : "Speak"}</span>
              </button>
            </form>

            {geminiLive.error && (
              <p className="text-red-400 text-xs text-center mt-2">{geminiLive.error}</p>
            )}

            <p className="text-[10px] text-slate-500 text-center mt-2">
              {geminiLive.isConnected
                ? "🎙 Live voice active — stop mic to switch back to text"
                : "Press Speak for live voice · Or type and press Send"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
