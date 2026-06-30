import React, { useCallback, useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { fetchLearnerProfile, fetchMistakeMemory, fetchSessionMessages, fetchUserSessions, markDailyPractice, saveSession, saveSessionMessage, updateLearnerProfile, updateUserProfile, upsertMistakeMemory } from "../lib/firebase";
import { CoachMessage, CoachMode, CoachSession, LearnerProfile, MistakeMemory, ProficiencyLevel } from "../types";
import { AlertTriangle, BookOpen, CheckCircle, Flame, LogOut, Mic, MicOff, Plus, Send, Sparkles, Target, Volume2 } from "lucide-react";
import { dbg } from "../lib/debug";
import { useGeminiLiveAPI } from "../hooks/useGeminiLive";
import CurriculumProgressPanel from "./CurriculumProgressPanel";
import ProductModePanel from "./ProductModePanel";
import ContinueLessonCard from "./ContinueLessonCard";
import LessonPhaseTimeline from "./LessonPhaseTimeline";
import LessonEmptyState from "./LessonEmptyState";
import ReviewModePanel from "./ReviewModePanel";
import LiveTranscriptPanel from "./LiveTranscriptPanel";
import { buildReviewPrompt, type ReviewItem } from "../lib/reviewEngine";
import { buildLiveLessonContext } from "../lib/liveLessonContext";
import { fetchCurriculum, startCurriculum, type CurriculumCourseView, type LessonCursorView, type ProductModeView, type ProductTrackView } from "../lib/curriculumClient";

interface InteractiveCoachProps {
  user: any;
  userProfile: any;
  onSignOut: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  activeProfile: string;
  profileDisplayName: string;
}

const generalPracticeActivities = [
  { type: "warmup", title: "Daily warm-up", prompt: "Tell me three things you did today. I will help you speak naturally." },
  { type: "grammar", title: "Quick grammar practice", prompt: "Let's practice one useful grammar point from your current level." },
  { type: "scenario", title: "Real-life roleplay", prompt: "Start a simple real-life roleplay and correct my English naturally." },
  { type: "workplace", title: "Workplace quick practice", prompt: "Practice a daily standup update. Ask me what I worked on, blockers, and next steps." },
  { type: "fluency", title: "Fluency builder", prompt: "Give me a short fluency drill and help me improve one answer." },
  { type: "review", title: "Mistake review", prompt: "Review my recurring mistakes and give me a short correction drill." },
];

function levelToBand(level: ProficiencyLevel): "Beginner" | "Intermediate" | "Advanced" {
  if (level === "Beginner" || level === "Advanced") return level;
  return "Intermediate";
}

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
  const [courses, setCourses] = useState<CurriculumCourseView[]>([]);
  const [productModes, setProductModes] = useState<ProductModeView[]>([]);
  const [productTracks, setProductTracks] = useState<ProductTrackView[]>([]);
  const [selectedProductMode, setSelectedProductMode] = useState("study");
  const [selectedTrackId, setSelectedTrackId] = useState("");
  const [cursor, setCursor] = useState<LessonCursorView | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [selectedSubsectionId, setSelectedSubsectionId] = useState("");
  const [curriculumBusy, setCurriculumBusy] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const activeSessionRef = useRef<CoachSession | null>(null);

  useEffect(() => { activeSessionRef.current = activeSession; }, [activeSession]);
  useEffect(() => { setSelectedModuleId(""); setSelectedSubsectionId(""); }, [level, selectedTrackId]);

  const handleLiveMessage = useCallback((msg: { text?: string; interrupted?: boolean }) => {
    if (!msg.text) return;
    const session = activeSessionRef.current;
    if (!session) { dbg.live.warn("handleLiveMessage: no active session"); return; }
    const coachMsg: CoachMessage = {
      messageId: `msg_live_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      sessionId: session.sessionId,
      userId: user.uid,
      sender: "coach",
      source: "live",
      kind: "coach_reply",
      text: msg.text,
      shouldTriggerCoachResponse: false,
      grammarCorrection: null,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, coachMsg]);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
    saveSessionMessage(session.sessionId, coachMsg).catch(() => {});
  }, [user.uid]);

  const geminiLive = useGeminiLiveAPI(handleLiveMessage);
  const dayIndex = Math.floor(Date.now() / 86400000) % generalPracticeActivities.length;
  const todayActivity = generalPracticeActivities[dayIndex];
  const selectedTrack = productTracks.find((track) => track.id === selectedTrackId) || null;
  const selectedMode = productModes.find((item) => item.id === selectedProductMode) || null;
  const hasConversationMessages = messages.some((item) => item.sender === "user" || item.sender === "coach");
  const hasLiveTranscript = messages.some((item) => item.source === "live" && item.sender === "coach");

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
  useEffect(() => { loadCurriculum(); }, []);
  useEffect(() => { if (activeSession) loadMessages(activeSession.sessionId); }, [activeSession?.sessionId]);
  useEffect(() => { setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80); }, [messages.length]);
  useEffect(() => { if (!geminiLive.isConnected) setListening(false); }, [geminiLive.isConnected]);
  useEffect(() => { if (geminiLive.error) setError(geminiLive.error); }, [geminiLive.error]);
  useEffect(() => () => { window.speechSynthesis?.cancel(); }, []);

  async function loadCurriculum() {
    try {
      const data = await fetchCurriculum();
      setCourses(data.courses);
      setProductModes(data.production?.modes || []);
      setProductTracks(data.production?.tracks || []);
      if (!selectedTrackId && data.production?.tracks?.length) setSelectedTrackId(data.production.tracks[0].id);
    } catch (err: any) {
      dbg.coach.error("loadCurriculum failed:", err?.message || err);
      setError(err.message || "Failed to load curriculum.");
    }
  }

  async function bootstrapProfile() {
    if (!user?.uid || !activeProfile) return;
    const lp = await fetchLearnerProfile(activeProfile);
    setLearnerProfile(lp);
    setLevel((lp?.level as ProficiencyLevel) || level);
    setMistakeMemory(await fetchMistakeMemory(activeProfile));
    const all = await fetchUserSessions(user.uid, activeProfile);
    setSessions(all);
    if (all.length > 0) setActiveSession(all[0]);
    else await createNewSession("General English Practice", todayActivity.type);
  }

  async function loadMessages(sessionId: string) {
    setMessages(await fetchSessionMessages(sessionId));
  }

  async function createNewSession(title = `Session (${new Date().toLocaleDateString()})`, activityType = "free") {
    const now = new Date().toISOString();
    const sess: CoachSession = { sessionId: `sess_${Date.now()}`, userId: user.uid, userName: profileDisplayName, title, createdAt: now, updatedAt: now, mode: "writing", profileId: activeProfile, activityType, challengeDay: learnerProfile?.challengeDay || 1 };
    await saveSession(sess);
    const intro: CoachMessage = { messageId: `msg_intro_${Date.now()}`, sessionId: sess.sessionId, userId: user.uid, sender: "system", source: "system", kind: "lesson_instruction", text: `Welcome ${profileDisplayName}. Today is Day ${learnerProfile?.challengeDay || 1}. Mode: ${selectedMode?.title || "Practice"}. Session: ${title}.`, shouldTriggerCoachResponse: false, grammarCorrection: null, createdAt: now };
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

  async function startCurrentLevel() {
    setCurriculumBusy(true);
    setError(null);
    setSelectedProductMode("study");
    try {
      const result = await startCurriculum({ learnerId: activeProfile, levelBand: levelToBand(level), sessionDay: learnerProfile?.challengeDay || 1 });
      setCursor(result.cursor);
      await createNewSession(`Study: ${levelToBand(level)} track`, "study");
    } catch (err: any) {
      setError(err.message || "Failed to start study level.");
    } finally {
      setCurriculumBusy(false);
    }
  }

  async function startSelectedModule() {
    if (!selectedModuleId) return;
    setCurriculumBusy(true);
    setError(null);
    setSelectedProductMode("study");
    try {
      const result = await startCurriculum({ learnerId: activeProfile, moduleId: selectedModuleId, sessionDay: learnerProfile?.challengeDay || 1 });
      setCursor(result.cursor);
      const selected = courses.flatMap((c) => c.modules).find((m) => m.id === selectedModuleId);
      await createNewSession(`Study: ${selected?.title || selectedModuleId}`, "study");
    } catch (err: any) {
      setError(err.message || "Failed to start study module.");
    } finally {
      setCurriculumBusy(false);
    }
  }

  async function startSelectedSubsection(explicitSubsectionId?: string) {
    const subsectionId = explicitSubsectionId || selectedSubsectionId;
    if (!subsectionId) return;
    setCurriculumBusy(true);
    setError(null);
    setSelectedProductMode("study");
    setSelectedSubsectionId(subsectionId);
    try {
      const result = await startCurriculum({ learnerId: activeProfile, subsectionId, sessionDay: learnerProfile?.challengeDay || 1 });
      setCursor(result.cursor);
      const selectedModule = courses.flatMap((c) => c.modules).find((m) => m.subsections.some((s) => s.id === subsectionId));
      if (selectedModule) setSelectedModuleId(selectedModule.id);
      const selectedSubsection = selectedModule?.subsections.find((s) => s.id === subsectionId);
      await createNewSession(`Study: ${selectedSubsection?.title || subsectionId}`, "study");
    } catch (err: any) {
      setError(err.message || "Failed to start study topic.");
    } finally {
      setCurriculumBusy(false);
    }
  }

  async function continueCurrentLesson() {
    setSelectedProductMode("study");
    await sendToCoach("continue", "chat", { type: "study", title: "Continue lesson", prompt: "continue" });
  }

  async function startReviewDrill(item: ReviewItem) {
    setSelectedProductMode("review");
    await createNewSession(`Review: ${item.mistakeType.replace(/_/g, " ")}`, "review");
    await sendToCoach(buildReviewPrompt(item), "chat", { type: "review", title: "Review drill", prompt: buildReviewPrompt(item) });
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
      const res = await fetch("/api/coach-interaction", { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ messageText: clean, userLevel: level, userName: profileDisplayName, history, mode, dailyActivity: activity, mistakeMemory, challengeDay: learnerProfile?.challengeDay || 1, profileId: activeProfile, interactionMode: source, productMode: selectedProductMode, productTrackId: selectedTrackId }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `API error ${res.status}`);
      if (data.cursor) setCursor(data.cursor);

      const coachMsg: CoachMessage = { messageId: `msg_coach_${Date.now()}`, sessionId: session.sessionId, userId: user.uid, sender: "coach", source, kind: "coach_reply", text: data.coachReply || "Good. Continue with one complete sentence.", shouldTriggerCoachResponse: false, grammarCorrection: data.correctedSentence || null, naturalVersion: data.naturalVersion || null, mistakes: data.mistakes || [], identifiedMistakes: (data.mistakes || []).map((m: any) => `${m.type}: ${m.explanation}`), coachingTip: data.microDrill?.instruction || "", fluencyScore: data.fluencyScore, grammarScore: data.grammarScore, vocabularyScore: data.vocabularyScore, pronunciationFocus: data.pronunciationFocus, repeatPractice: data.repeatPractice, microDrill: data.microDrill, lessonStep: data.lessonStep, teachingPhase: data.teachingPhase, teacherAction: data.teacherAction, createdAt: new Date().toISOString() };
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
      dbg.coach.error("sendToCoach failed:", err?.message, err);
      setError(err.message || "Coach request failed.");
    } finally {
      setIsLoading(false);
    }
  }

  function speak(text: string) {
    if (!text) { dbg.tts.warn("speak skipped: empty text"); return; }
    const speech = window.speechSynthesis;
    if (!speech) {
      dbg.tts.warn("Browser speech synthesis is not available.");
      return;
    }
    try {
      speech.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.92;
      utterance.pitch = 1;
      speech.speak(utterance);
    } catch (err: any) {
      dbg.tts.error("browser read-aloud failed:", err?.message || err);
    }
  }

  async function toggleMic() {
    if (geminiLive.isConnected) {
      geminiLive.stopClient();
      setListening(false);
      return;
    }
    let session = activeSession;
    if (!session) session = await createNewSession();
    setSelectedProductMode("live");
    setListening(true);
    setError(null);
    const liveContext = buildLiveLessonContext({ courses, cursor, selectedTrack, fallbackTopic: todayActivity.title });
    await geminiLive.connect(profileDisplayName, level, liveContext, mode);
  }

  function startActivity(activity: typeof generalPracticeActivities[number]) {
    setSelectedProductMode(activity.type === "review" ? "review" : "practice");
    createNewSession(`Practice: ${activity.title}`, activity.type).then(() => sendToCoach(activity.prompt, "chat", activity));
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0a1628" }}>

      {/* ── Sidebar ── */}
      <aside className="w-72 flex-shrink-0 flex flex-col overflow-hidden border-r border-emerald-900/40" style={{ background: "#0c1e2e" }}>

        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-emerald-900/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-semibold">English Coach</p>
              <h1 className="text-sm font-bold text-white mt-0.5">{profileDisplayName}</h1>
            </div>
            <button onClick={onSignOut} className="p-1.5 rounded-lg text-emerald-800 hover:text-emerald-500 hover:bg-emerald-900/30 transition">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { icon: <Flame className="h-3.5 w-3.5 text-orange-400 mx-auto" />, label: "Day", value: `${learnerProfile?.challengeDay || 1}/60` },
              { icon: <Target className="h-3.5 w-3.5 text-emerald-400 mx-auto" />, label: "Mins", value: String(learnerProfile?.totalPracticeMinutes || 0) },
              { icon: <BookOpen className="h-3.5 w-3.5 text-violet-400 mx-auto" />, label: "Weak", value: String(mistakeMemory.length) },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-emerald-900/20 border border-emerald-900/30 p-2 text-center">
                {s.icon}
                <p className="text-[10px] text-emerald-700 mt-0.5">{s.label}</p>
                <p className="text-xs font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">

          {/* Level */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold mb-2">Level</p>
            <div className="flex gap-1">
              {(["Beginner", "Intermediate", "Advanced"] as ProficiencyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleLevelChange(lvl)}
                  className={`flex-1 rounded-md py-1.5 text-[11px] font-bold transition ${
                    level === lvl ? "bg-emerald-600 text-white" : "bg-emerald-900/30 text-emerald-700 hover:bg-emerald-800/40 hover:text-emerald-400"
                  }`}
                >
                  {lvl[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Mode */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold mb-2">Coaching mode</p>
            <div className="space-y-0.5">
              {([
                { value: "gentle_conversation", label: "Gentle conversation" },
                { value: "balanced",            label: "Balanced" },
                { value: "strict_correction",   label: "Strict correction" },
                { value: "roleplay",            label: "Roleplay" },
                { value: "workplace",           label: "Workplace" },
              ] as { value: CoachMode; label: string }[]).map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMode(m.value)}
                  className={`w-full text-left rounded-lg px-3 py-2 text-xs font-medium transition ${
                    mode === m.value
                      ? "bg-emerald-700/40 text-emerald-200 border border-emerald-700/50"
                      : "text-emerald-700 hover:bg-emerald-900/20 hover:text-emerald-400"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Track */}
          {productTracks.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold mb-2">Track</p>
              <div className="space-y-0.5">
                {productTracks.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => setSelectedTrackId(track.id)}
                    className={`w-full text-left rounded-lg px-3 py-2 text-xs font-medium transition ${
                      selectedTrackId === track.id
                        ? "bg-emerald-700/40 text-emerald-200 border border-emerald-700/50"
                        : "text-emerald-700 hover:bg-emerald-900/20 hover:text-emerald-400"
                    }`}
                  >
                    {track.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Curriculum */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold mb-2">Curriculum</p>
            {cursor && (
              <button
                onClick={continueCurrentLesson}
                disabled={isLoading}
                className="w-full mb-2 flex items-center gap-2 rounded-lg border border-emerald-700/50 bg-emerald-700/20 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-700/30 disabled:opacity-50 transition"
              >
                <Sparkles className="h-3 w-3" /> Continue: {cursor.subsectionId}
              </button>
            )}
            <div className="space-y-0.5">
              {courses
                .flatMap((c) => c.modules)
                .filter((m) => !selectedTrack?.moduleIds || selectedTrack.moduleIds.includes(m.id))
                .map((module) => {
                  const isActive = selectedModuleId === module.id;
                  return (
                    <div key={module.id}>
                      <button
                        onClick={() => setSelectedModuleId(isActive ? "" : module.id)}
                        className={`w-full text-left rounded-lg px-3 py-2 text-xs font-medium transition ${
                          isActive
                            ? "bg-emerald-800/40 text-emerald-200 border border-emerald-800/50"
                            : "text-emerald-700 hover:text-emerald-400 hover:bg-emerald-900/20"
                        }`}
                      >
                        {module.title}
                      </button>
                      {isActive && module.subsections.length > 0 && (
                        <div className="ml-3 mt-0.5 mb-1 space-y-0.5 border-l border-emerald-900/50 pl-2">
                          {module.subsections.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => startSelectedSubsection(sub.id)}
                              className={`w-full text-left rounded px-2 py-1.5 text-[11px] transition ${
                                cursor?.subsectionId === sub.id
                                  ? "bg-emerald-600/30 text-emerald-200 font-semibold"
                                  : "text-emerald-700 hover:text-emerald-400 hover:bg-emerald-900/20"
                              }`}
                            >
                              {sub.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* General Practice */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold mb-2">Practice</p>
            <div className="space-y-0.5">
              {generalPracticeActivities.map((a, i) => (
                <button
                  key={a.type}
                  onClick={() => startActivity(a)}
                  className={`w-full text-left rounded-lg px-3 py-2 text-xs font-medium transition ${
                    i === dayIndex
                      ? "border border-emerald-700/50 bg-emerald-900/30 text-emerald-300"
                      : "text-emerald-700 hover:bg-emerald-900/20 hover:text-emerald-400"
                  }`}
                >
                  {a.title}
                </button>
              ))}
            </div>
          </div>

          {/* Mistake Review */}
          {mistakeMemory.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold mb-2">Mistake Review</p>
              <ReviewModePanel mistakes={mistakeMemory} onStartReview={startReviewDrill} />
            </div>
          )}

          {/* Actions */}
          <div className="space-y-1.5 pb-2">
            <button
              onClick={() => createNewSession()}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-700 text-white px-3 py-2.5 text-xs font-bold hover:bg-emerald-600 transition"
            >
              <Plus className="h-3.5 w-3.5" /> New Session
            </button>
            <button onClick={onToggleHighContrast} className="w-full text-emerald-800 hover:text-emerald-600 px-3 py-1.5 text-[11px] transition">
              High contrast: {highContrast ? "On" : "Off"}
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col overflow-hidden" style={{ background: "#0a1628" }}>

        {/* Header */}
        <div className="flex-shrink-0 border-b border-emerald-900/30 px-6 py-4 flex items-center justify-between gap-4" style={{ background: "#0c1e2e" }}>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-white truncate">{selectedMode?.title || (cursor ? "Study Mode" : todayActivity.title)}</h2>
            <p className="text-xs text-emerald-700 truncate">
              {selectedTrack?.title || "No track"} · {levelToBand(level)} · {cursor ? `${cursor.subsectionId} · ${cursor.phase}` : "General practice"}
            </p>
          </div>
          <button
            type="button"
            onClick={toggleMic}
            disabled={isLoading}
            className={`flex-shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
              listening || geminiLive.isConnected
                ? "bg-red-800/70 text-red-100 hover:bg-red-800"
                : "bg-emerald-700 text-white hover:bg-emerald-600"
            }`}
          >
            {listening || geminiLive.isConnected
              ? <><MicOff className="h-3.5 w-3.5" /> Stop</>
              : <><Mic className="h-3.5 w-3.5" /> Live</>}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {error && (
            <div className="flex gap-2 p-4 rounded-xl text-sm border border-red-500/20 bg-red-950/30 text-red-300">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" /> {error}
            </div>
          )}
          {(listening || selectedProductMode === "live" || hasLiveTranscript) && (
            <LiveTranscriptPanel messages={messages} isListening={listening} />
          )}
          {!hasConversationMessages && (
            <LessonEmptyState courses={courses} cursor={cursor} selectedModeTitle={selectedMode?.title} selectedTrack={selectedTrack} onContinue={continueCurrentLesson} />
          )}
          {messages.map((item) => {
            const isCoach = item.sender === "coach" || item.sender === "system";
            return (
              <div key={item.messageId} className={`flex flex-col ${isCoach ? "items-start" : "items-end"}`}>
                <div className={`p-4 max-w-[86%] text-sm leading-relaxed rounded-2xl ${
                  isCoach
                    ? "bg-emerald-950/50 border border-emerald-900/40 text-emerald-100 rounded-tl-none"
                    : "bg-emerald-700/30 border border-emerald-700/40 text-emerald-50 rounded-tr-none"
                }`}>
                  <p>{item.text}</p>
                  {item.lessonStep && (
                    <p className="mt-2 text-[10px] text-emerald-700 border-t border-emerald-900/50 pt-2">
                      Lesson: {item.lessonStep} · Phase: {item.teachingPhase}
                    </p>
                  )}
                  {isCoach && item.sender === "coach" && (
                    <button onClick={() => speak(item.text)} className="mt-2 pt-2 border-t border-emerald-900/50 text-xs text-emerald-700 hover:text-emerald-400 flex gap-1 transition">
                      <Volume2 className="h-3 w-3" /> Read aloud
                    </button>
                  )}
                </div>
                {item.grammarCorrection && item.grammarCorrection.trim() && (
                  <div className="mt-2 max-w-[86%] p-4 rounded-2xl border border-emerald-700/40 bg-emerald-900/20 text-sm">
                    <p className="font-bold text-emerald-400 mb-1 text-xs uppercase tracking-wide">Better sentence</p>
                    <p className="text-emerald-100">{item.grammarCorrection}</p>
                    {item.naturalVersion && <p className="mt-2 text-emerald-200"><b>Natural:</b> {item.naturalVersion}</p>}
                    {item.mistakes?.length ? (
                      <ul className="list-disc pl-5 mt-2 text-xs text-emerald-600">
                        {item.mistakes.map((m, i) => <li key={i}>{m.type}: {m.explanation}</li>)}
                      </ul>
                    ) : null}
                    {item.microDrill?.instruction && <p className="mt-2 text-xs text-emerald-500">Drill: {item.microDrill.instruction}</p>}
                    {typeof item.fluencyScore === "number" && (
                      <p className="mt-2 text-xs text-emerald-700">
                        Fluency {item.fluencyScore} · Grammar {item.grammarScore} · Vocabulary {item.vocabularyScore}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {isLoading && <p className="text-sm text-emerald-700">Sky is analysing your English…</p>}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="flex-shrink-0 border-t border-emerald-900/30 p-4" style={{ background: "#0c1e2e" }}>
          {listening && (
            <div className="mb-2 text-xs text-emerald-400 flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5" /> Listening — speak one sentence clearly.
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); sendToCoach(inputText, "chat"); }} className="flex gap-2">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
              placeholder={cursor ? "Answer the current study lesson…" : "Type an English sentence…"}
              className="flex-1 rounded-xl border border-emerald-900/40 bg-emerald-900/20 px-4 py-3 text-sm text-emerald-100 placeholder:text-emerald-800 outline-none focus:border-emerald-700/60 transition"
            />
            <button type="submit" disabled={isLoading || !inputText.trim()}
              className="px-4 py-3 rounded-xl bg-emerald-700 text-white hover:bg-emerald-600 disabled:opacity-40 transition">
              <Send className="h-4 w-4" />
            </button>
            <button type="button" onClick={toggleMic} disabled={isLoading}
              className={`px-4 py-3 rounded-xl transition ${listening ? "bg-red-700 text-white" : "bg-emerald-700 text-white hover:bg-emerald-600"}`}>
              {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
