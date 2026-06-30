import { useCallback, useEffect, useRef, useState } from "react";
import { fetchLearnerProfile, fetchSessionMessages, fetchUserSessions, saveSession, saveSessionMessage } from "../lib/firebase";
import { useLiveCoachSession } from "../hooks/useLiveCoachSession";
import { fetchCurriculum, startCurriculum, type CurriculumCourseView, type LessonCursorView, type ProductTrackView } from "../lib/curriculumClient";
import { buildLiveLessonContext } from "../lib/liveLessonContext";
import { getDailyWords, buildVocabLiveContext, totalVocabSets, type VocabPracticeMode } from "../lib/dailyVocabulary";
import type { VocabWord } from "../lib/vocabularyBank";
import type { CoachMessage, CoachMode, CoachSession, LearnerProfile, ProficiencyLevel } from "../types";
import LiveFirstLearningShell from "./LiveFirstLearningShell";

interface LiveFirstCoachProps {
  user: any;
  userProfile: any;
  onSignOut: () => void;
  onBackToPortals: () => void;
  activeProfile: string;
  profileDisplayName: string;
}

function levelToBand(level: ProficiencyLevel): "Beginner" | "Intermediate" | "Advanced" {
  if (level === "Beginner" || level === "Advanced") return level;
  return "Intermediate";
}

export default function LiveFirstCoach({ user, userProfile, onSignOut, onBackToPortals, activeProfile, profileDisplayName }: LiveFirstCoachProps) {
  const [level, setLevel] = useState<ProficiencyLevel>((userProfile?.level as ProficiencyLevel) || "Intermediate");
  const [mode] = useState<CoachMode>("balanced");
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [courses, setCourses] = useState<CurriculumCourseView[]>([]);
  const [tracks, setTracks] = useState<ProductTrackView[]>([]);
  const [selectedTrackId, setSelectedTrackId] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [cursor, setCursor] = useState<LessonCursorView | null>(null);
  const [sessions, setSessions] = useState<CoachSession[]>([]);
  const [activeSession, setActiveSession] = useState<CoachSession | null>(null);
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [vocabSetIndex, setVocabSetIndex] = useState(0);
  const activeSessionRef = useRef<CoachSession | null>(null);

  useEffect(() => { activeSessionRef.current = activeSession; }, [activeSession]);

  const handleLiveMessage = useCallback((msg: { text?: string; interrupted?: boolean }) => {
    if (!msg.text) return;
    const session = activeSessionRef.current;
    if (!session) return;
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
    setMessages((prev) => [...prev, coachMsg]);
    saveSessionMessage(session.sessionId, coachMsg).catch(() => {});
  }, [user.uid]);

  const live = useLiveCoachSession(handleLiveMessage);
  const selectedTrack = tracks.find((item) => item.id === selectedTrackId) || tracks[0] || null;

  useEffect(() => { bootstrap(); }, [user?.uid, activeProfile]);

  function stopLiveIfActive() {
    live.stop();
  }

  async function bootstrap() {
    if (!user?.uid || !activeProfile) return;
    setError(null);
    try {
      const [profile, curriculum, existingSessions] = await Promise.all([
        fetchLearnerProfile(activeProfile),
        fetchCurriculum(),
        fetchUserSessions(user.uid, activeProfile),
      ]);
      setLearnerProfile(profile);
      setCourses(curriculum.courses);
      setTracks(curriculum.production?.tracks || []);
      setSelectedTrackId(curriculum.production?.tracks?.[0]?.id || "");
      setSessions(existingSessions);
      if (existingSessions[0]) {
        setActiveSession(existingSessions[0]);
        setMessages(await fetchSessionMessages(existingSessions[0].sessionId));
      }
      const started = await startCurriculum({ learnerId: activeProfile, levelBand: levelToBand(level), sessionDay: profile?.challengeDay || 1 });
      setCursor(started.cursor);
    } catch (err: any) {
      setError(err.message || "Failed to load. Please refresh.");
    }
  }

  async function createLiveSession() {
    const now = new Date().toISOString();
    const title = cursor ? `Live: ${cursor.subsectionId}` : "Live English lesson";
    const sess: CoachSession = {
      sessionId: `sess_${Date.now()}`,
      userId: user.uid,
      userName: profileDisplayName,
      title,
      createdAt: now,
      updatedAt: now,
      mode: "live_voice",
      profileId: activeProfile,
      activityType: "live_lesson",
      challengeDay: learnerProfile?.challengeDay || 1,
    };
    await saveSession(sess);
    setSessions((prev) => [sess, ...prev]);
    setActiveSession(sess);
    setMessages([]);
    return sess;
  }

  async function startLive() {
    setError(null);
    stopLiveIfActive();
    if (!activeSessionRef.current) await createLiveSession();
    const context = buildLiveLessonContext({ courses, cursor, selectedTrack, fallbackTopic: selectedTrack?.title || "English speaking practice" });
    await live.startEnglishSession({ learnerName: profileDisplayName, userLevel: level, dailyTopic: context, coachMode: mode });
  }

  function stopLive() { live.stop(); }

  async function startVocabPractice(words: VocabWord[], practiceMode: VocabPracticeMode) {
    setError(null);
    stopLiveIfActive();
    const band = levelToBand(level);
    const sess: CoachSession = {
      sessionId: `sess_vocab_${Date.now()}`,
      userId: user.uid,
      userName: profileDisplayName,
      title: `Vocabulary: ${practiceMode.replace(/_/g, " ")} · ${band}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mode: "live_voice",
      profileId: activeProfile,
      activityType: "live_lesson",
      challengeDay: learnerProfile?.challengeDay || 1,
    };
    await saveSession(sess);
    setSessions((prev) => [sess, ...prev]);
    setActiveSession(sess);
    setMessages([]);
    const context = buildVocabLiveContext(words, practiceMode, band);
    await live.startEnglishSession({ learnerName: profileDisplayName, userLevel: level, dailyTopic: context, coachMode: mode });
  }

  function markVocabComplete() {
    const maxSets = totalVocabSets();
    setVocabSetIndex((prev) => (prev + 1) % maxSets);
  }

  function changeLevel(nextLevel: ProficiencyLevel) {
    stopLiveIfActive();
    setLevel(nextLevel);
  }

  function changeTrack(trackId: string) {
    stopLiveIfActive();
    setSelectedTrackId(trackId);
  }

  function changeModule(moduleId: string) {
    stopLiveIfActive();
    setSelectedModuleId(moduleId);
  }

  async function selectTopic(subsectionId: string) {
    setError(null);
    stopLiveIfActive();
    try {
      const next = await startCurriculum({
        learnerId: activeProfile,
        subsectionId,
        sessionDay: learnerProfile?.challengeDay || 1,
      });
      setCursor(next.cursor);
      await createLiveSession();
    } catch (err: any) {
      setError(err.message || "Failed to open topic.");
    }
  }

  return (
    <>
      {(error || live.error) && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {error && <span className="block max-w-xs rounded-xl border border-red-500/30 bg-red-950/90 px-3 py-2 text-xs text-red-100">{error}</span>}
          {live.error && <span className="block max-w-xs rounded-xl border border-red-500/30 bg-red-950/90 px-3 py-2 text-xs text-red-100">{live.error}</span>}
        </div>
      )}
      <LiveFirstLearningShell
        learnerName={profileDisplayName}
        courses={courses}
        tracks={tracks}
        cursor={cursor}
        sessions={sessions}
        messages={messages}
        isLiveActive={live.isConnected}
        isAgentSpeaking={live.isAgentSpeaking}
        selectedLevel={levelToBand(level)}
        selectedTrackId={selectedTrackId}
        selectedModuleId={selectedModuleId}
        onSelectLevel={changeLevel}
        onSelectTrack={changeTrack}
        onSelectModule={changeModule}
        onSelectTopic={selectTopic}
        onStartLive={startLive}
        onStopLive={stopLive}
        onSignOut={onSignOut}
        onBackToPortals={onBackToPortals}
        dailyVocabWords={getDailyWords(levelToBand(level), learnerProfile?.challengeDay || 1, vocabSetIndex)}
        vocabSetIndex={vocabSetIndex}
        onStartVocabPractice={startVocabPractice}
        onMarkVocabComplete={markVocabComplete}
      />
    </>
  );
}
