import React, { useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { fetchLearnerProfile, fetchMistakeMemory, fetchSessionMessages, fetchUserSessions, markDailyPractice, saveSession, saveSessionMessage, updateLearnerProfile, updateUserProfile, upsertMistakeMemory } from "../lib/firebase";
import { CoachMessage, CoachMode, CoachSession, LearnerProfile, MistakeMemory, ProficiencyLevel } from "../types";
import { AlertTriangle, BookOpen, CheckCircle, Flame, LogOut, Mic, MicOff, Plus, Send, Sparkles, Target, Trash2, Volume2 } from "lucide-react";

interface InteractiveCoachProps {
  user: any;
  userProfile: any;
  onSignOut: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  activeProfile: string;
  profileDisplayName: string;
}

const dailyActivities = [
  { type: "warmup", title: "Daily warm-up", prompt: "Tell me three things you did today. I will help you speak naturally." },
  { type: "grammar", title: "Grammar focus", prompt: "Let's practice past tense in daily conversation. Ask me one simple question first." },
  { type: "scenario", title: "Real-life scenario", prompt: "Roleplay ordering food at a restaurant. You are the waiter and I am the customer." },
  { type: "workplace", title: "Workplace English", prompt: "Practice a daily standup update. Ask me what I worked on, blockers, and next steps." },
  { type: "fluency", title: "60-second fluency", prompt: "Ask me to speak for 60 seconds about my family, work, or travel. Then evaluate my fluency." },
  { type: "review", title: "Mistake review", prompt: "Review my recurring mistakes and give me a short speaking drill." },
];

export default function InteractiveCoach({ user, userProfile, onSignOut, highContrast, onToggleHighContrast, activeProfile, profileDisplayName }: InteractiveCoachProps) {
  const [level, setLevel] = useState<ProficiencyLevel>((userProfile?.level as ProficiencyLevel) || "Intermediate");
  const [mode, setMode] = useState<CoachMode>("balanced");
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [mistakeMemory, setMistakeMemory] = useState<MistakeMemory[]>([]);
  const [sessions, setSessions] = useState<CoachSession[]>([]);
  const [activeSession, setActiveSession] = useState<CoachSession | null>(null);
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const dayIndex = Math.floor(Date.now() / 86400000) % dailyActivities.length;
  const todayActivity = dailyActivities[dayIndex];

  const ui = {
    bg: highContrast ? "bg-black text-white" : "bg-transparent text-slate-100",
    card: highContrast ? "bg-black border-2 border-white rounded-none" : "backdrop-blur-md bg-black/20 border border-white/10 rounded-3xl",
    panel: highContrast ? "bg-black border-2 border-white rounded-none" : "backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl",
    user: highContrast ? "bg-zinc-800 border-2 border-white" : "bg-indigo-600/50 border border-indigo-400/30 rounded-2xl rounded-tr-none",
    coach: highContrast ? "bg-zinc-900 border border-white" : "bg-white/10 border border-white/20 rounded-2xl rounded-tl-none",
    input: highContrast ? "bg-black border-2 border-white text-white" : "bg-white/10 border border-white/20 text-slate-200 placeholder:text-slate-400",
    btn: highContrast ? "bg-white text-black hover:bg-zinc-200" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg",
  };

  useEffect(() => { bootstrapProfile(); }, [user?.uid, activeProfile]);
  useEffect(() => { if (activeSession) loadMessages(activeSession.sessionId); }, [activeSession?.sessionId]);
  useEffect(() => { scrollToBottom(); }, [messages.length]);

  async function bootstrapProfile() {
    if (!user?.uid || !activeProfile) return;
    const lp = await fetchLearnerProfile(activeProfile);
    setLearnerProfile(lp);
    setLevel((lp?.level as ProficiencyLevel) || level);
    setMistakeMemory(await fetchMistakeMemory(activeProfile));
    const all = await fetchUserSessions(user.uid, activeProfile);
    setSessions(all);
    if (all.length > 0) setActiveSession(all[0]);
    else await createNewSession("Daily English Practice", todayActivity.type);
  }

  async function loadMessages(sessionId: string) {
    setMessages(await fetchSessionMessages(sessionId));
  }

  function scrollToBottom() {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  }

  async function createNewSession(title = `Session (${new Date().toLocaleDateString()})`, activityType = "free") {
    const now = new Date().toISOString();
    const sess: CoachSession = { sessionId: `sess_${Date.now()}`, userId: user.uid, userName: profileDisplayName, title, createdAt: now, updatedAt: now, mode: "writing", profileId: activeProfile, activityType, challengeDay: learnerProfile?.challengeDay || 1 };
    await saveSession(sess);
    const intro: CoachMessage = { messageId: `msg_intro_${Date.now()}`, sessionId: sess.sessionId, userId: user.uid, sender: "system", source: "system", kind: "lesson_instruction", text: `Welcome ${profileDisplayName}. Today is Day ${learnerProfile?.challengeDay || 1} of your 60-day English challenge. Today's activity: ${todayActivity.title}.`, shouldTriggerCoachResponse: false, grammarCorrection: null, createdAt: now };
    await saveSessionMessage(sess.sessionId, intro);
    setSessions((prev) => [sess, ...prev]);
    setActiveSession(sess);
    setMessages([intro]);
    return sess;
  }

  async function handleLevelChange(newLevel: ProficiencyLevel) {
    setLevel(newLevel);
    await updateUserProfile(user.uid, { level: newLevel });
    await updateLearnerProfile(activeProfile, { level: newLevel });
  }

  async function sendToCoach(text: string, source: "chat" | "live" = "chat", activity = todayActivity) {
    const clean = text.trim();
    if (!clean) return;
    let session = activeSession;
    if (!session) session = await createNewSession();

    setInputText("");
    setIsLoading(true);
    setError(null);

    const now = new Date().toISOString();
    const userMsg: CoachMessage = { messageId: `msg_user_${Date.now()}`, sessionId: session.sessionId, userId: user.uid, sender: "user", source, kind: source === "live" ? "user_transcript" : "coach_reply", text: clean, shouldTriggerCoachResponse: source === "chat", grammarCorrection: null, createdAt: now };
    setMessages((prev) => [...prev, userMsg]);
    await saveSessionMessage(session.sessionId, userMsg);

    try {
      const token = await getAuth().currentUser?.getIdToken();
      const history = messages.filter((m) => m.kind !== "suggestion" && m.kind !== "evaluation_summary").map((m) => ({ role: m.sender === "user" ? "user" : "model", text: m.text }));
      const res = await fetch("/api/coach-interaction", { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ messageText: clean, userLevel: level, userName: profileDisplayName, history, mode, dailyActivity: activity, mistakeMemory, challengeDay: learnerProfile?.challengeDay || 1 }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `API error ${res.status}`);

      const coachMsg: CoachMessage = { messageId: `msg_coach_${Date.now()}`, sessionId: session.sessionId, userId: user.uid, sender: "coach", source, kind: "coach_reply", text: data.coachReply || "Good. Continue speaking.", shouldTriggerCoachResponse: false, grammarCorrection: data.correctedSentence || null, naturalVersion: data.naturalVersion || null, mistakes: data.mistakes || [], identifiedMistakes: (data.mistakes || []).map((m: any) => `${m.type}: ${m.explanation}`), coachingTip: data.microDrill?.instruction || "", fluencyScore: data.fluencyScore, grammarScore: data.grammarScore, vocabularyScore: data.vocabularyScore, pronunciationFocus: data.pronunciationFocus, repeatPractice: data.repeatPractice, microDrill: data.microDrill, createdAt: new Date().toISOString() };
      setMessages((prev) => [...prev, coachMsg]);
      await saveSessionMessage(session.sessionId, coachMsg);
      if (data.mistakes?.length) {
        await upsertMistakeMemory(activeProfile, data.mistakes, clean);
        setMistakeMemory(await fetchMistakeMemory(activeProfile));
      }
      if (data.challengeUpdate?.completedActivity) {
        await markDailyPractice(activeProfile, learnerProfile?.challengeDay || 1, activity.type);
        setLearnerProfile(await fetchLearnerProfile(activeProfile));
      }
      speak(data.coachReply);
    } catch (err: any) {
      setError(err.message || "Coach request failed.");
    } finally {
      setIsLoading(false);
    }
  }

  function speak(text: string) {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, ""));
    u.lang = "en-US";
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
  }

  function toggleMic() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setError("Speech recognition is not supported in this browser. Use Chrome for voice practice."); return; }
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";
    rec.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      sendToCoach(transcript, "live");
    };
    rec.onerror = (e: any) => setError(`Speech recognition error: ${e.error || "unknown"}`);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  }

  function startActivity(activity: typeof dailyActivities[number]) {
    createNewSession(activity.title, activity.type).then(() => sendToCoach(activity.prompt, "chat", activity));
  }

  return (
    <div className={`h-screen flex flex-col lg:flex-row p-4 gap-4 ${ui.bg} overflow-hidden`}>
      <aside className={`w-full lg:w-80 flex-shrink-0 overflow-y-auto p-4 ${ui.panel}`}>
        <div className="flex items-center justify-between mb-5">
          <div><h1 className="text-2xl font-bold">{profileDisplayName}</h1><p className="text-xs text-slate-400">Private English Coach</p></div>
          <button onClick={onSignOut} className="p-2 rounded-lg hover:bg-white/10"><LogOut className="h-5 w-5" /></button>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="p-3 rounded-2xl bg-white/10 border border-white/10"><Flame className="h-4 w-4 text-orange-300" /><p className="text-xs mt-1">Day</p><p className="font-bold">{learnerProfile?.challengeDay || 1}/60</p></div>
          <div className="p-3 rounded-2xl bg-white/10 border border-white/10"><Target className="h-4 w-4 text-emerald-300" /><p className="text-xs mt-1">Minutes</p><p className="font-bold">{learnerProfile?.totalPracticeMinutes || 0}</p></div>
          <div className="p-3 rounded-2xl bg-white/10 border border-white/10"><BookOpen className="h-4 w-4 text-indigo-300" /><p className="text-xs mt-1">Weak</p><p className="font-bold">{mistakeMemory.length}</p></div>
        </div>

        <div className="space-y-3 mb-5">
          <select value={level} onChange={(e) => handleLevelChange(e.target.value as ProficiencyLevel)} className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
          <select value={mode} onChange={(e) => setMode(e.target.value as CoachMode)} className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm"><option value="gentle_conversation">Gentle conversation</option><option value="balanced">Balanced coaching</option><option value="strict_correction">Strict correction</option><option value="roleplay">Roleplay</option><option value="workplace">Workplace</option></select>
          <button onClick={onToggleHighContrast} className="w-full text-left bg-white/5 border border-white/10 rounded-xl p-3 text-sm">High contrast: {highContrast ? "On" : "Off"}</button>
        </div>

        <button onClick={() => createNewSession()} className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${ui.btn}`}><Plus className="h-5 w-5" /> New Session</button>

        <h2 className="mt-6 mb-2 text-xs uppercase tracking-widest text-slate-400 font-bold">Daily activities</h2>
        <div className="space-y-2">{dailyActivities.map((a, i) => <button key={a.type} onClick={() => startActivity(a)} className={`w-full text-left p-3 rounded-xl border text-sm ${i === dayIndex ? "border-emerald-400/50 bg-emerald-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}><span className="font-semibold">{a.title}</span><span className="block text-xs text-slate-400">{a.type}</span></button>)}</div>

        <h2 className="mt-6 mb-2 text-xs uppercase tracking-widest text-slate-400 font-bold">Mistake memory</h2>
        <div className="space-y-2">{mistakeMemory.slice(0, 6).map((m) => <div key={m.mistakeId} className="p-2 rounded-xl bg-white/5 border border-white/10 text-xs"><span className="font-semibold">{m.mistakeType}</span><span className="float-right text-slate-400">{m.count}</span></div>)}{mistakeMemory.length === 0 && <p className="text-xs text-slate-500">No recurring mistakes yet.</p>}</div>
      </aside>

      <main className={`flex-1 flex flex-col overflow-hidden ${ui.card}`}>
        <header className="p-4 border-b border-white/10 flex items-center justify-between"><div><h2 className="font-bold">{todayActivity.title}</h2><p className="text-xs text-slate-400">Mode: {mode.replace("_", " ")} · Messages are stored for progress tracking</p></div><Sparkles className="h-5 w-5 text-indigo-300" /></header>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
          {error && <div className="p-4 rounded-xl text-sm border border-red-500/20 bg-red-500/10 text-red-300 flex gap-2"><AlertTriangle className="h-5 w-5" />{error}</div>}
          <div className="space-y-5 max-w-4xl mx-auto">
            {messages.map((item) => {
              const isCoach = item.sender === "coach" || item.sender === "system";
              return <div key={item.messageId} className={`flex flex-col ${isCoach ? "items-start" : "items-end"}`}><div className={`p-4 max-w-[86%] text-sm leading-relaxed ${isCoach ? ui.coach : ui.user}`}><p>{item.text}</p>{isCoach && item.sender === "coach" && <button onClick={() => speak(item.text)} className="mt-2 pt-2 border-t border-white/10 text-xs text-indigo-300 flex gap-1"><Volume2 className="h-3 w-3" /> Read aloud</button>}</div>{item.grammarCorrection && item.grammarCorrection.trim() && <div className="mt-2 max-w-[86%] p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-sm"><p className="font-bold text-emerald-300 mb-1">Better sentence</p><p>{item.grammarCorrection}</p>{item.naturalVersion && <p className="mt-2 text-slate-300"><b>Natural:</b> {item.naturalVersion}</p>}{item.mistakes?.length ? <ul className="list-disc pl-5 mt-2 text-xs text-slate-300">{item.mistakes.map((m, i) => <li key={i}>{m.type}: {m.explanation}</li>)}</ul> : null}{item.microDrill?.instruction && <p className="mt-2 text-xs text-indigo-200">Drill: {item.microDrill.instruction}</p>}{typeof item.fluencyScore === "number" && <p className="mt-2 text-xs text-slate-400">Scores: Fluency {item.fluencyScore} · Grammar {item.grammarScore} · Vocabulary {item.vocabularyScore}</p>}</div>}</div>;
            })}
            {isLoading && <div className="text-sm text-slate-400">Sky is analysing your English...</div>}
            <div ref={chatEndRef} />
          </div>
        </div>
        <div className="p-4 border-t border-white/10">
          {listening && <div className="mb-2 text-xs text-emerald-300 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Listening now. Speak one sentence clearly.</div>}
          <form onSubmit={(e) => { e.preventDefault(); sendToCoach(inputText, "chat"); }} className="flex gap-2">
            <input value={inputText} onChange={(e) => setInputText(e.target.value)} disabled={isLoading} placeholder="Type an English sentence or answer today's activity..." className={`flex-1 px-4 py-3 rounded-xl text-sm outline-none ${ui.input}`} />
            <button type="submit" disabled={isLoading || !inputText.trim()} className={`px-4 py-3 rounded-xl ${ui.btn}`}><Send className="h-5 w-5" /></button>
            <button type="button" onClick={toggleMic} disabled={isLoading} className={`px-4 py-3 rounded-xl ${listening ? "bg-red-600 text-white" : ui.btn}`}>{listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}</button>
          </form>
          <p className="text-[10px] text-slate-500 text-center mt-2">Voice mode uses browser speech recognition and backend coaching, so your Gemini credential is never sent to the browser.</p>
        </div>
      </main>
    </div>
  );
}
