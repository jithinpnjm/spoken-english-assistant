import { useCallback, useState } from "react";
import type { GermanLevel } from "../lib/germanCurriculumRegistry";
import { useLiveCoachSession } from "../hooks/useLiveCoachSession";
import GermanStudyGuidePanel from "./GermanStudyGuidePanel";

interface GermanCoachShellProps {
  learnerName: string;
  onBackToPortals: () => void;
}

export default function GermanCoachShell({ learnerName, onBackToPortals }: GermanCoachShellProps) {
  const [selectedLevel, setSelectedLevel] = useState<GermanLevel>("A1");
  const [jumpToLesson, setJumpToLesson] = useState<number | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<string[]>([]);

  const handleLiveMessage = useCallback((msg: { text?: string }) => {
    if (!msg.text?.trim()) return;
    setLiveTranscript((prev) => [...prev.slice(-14), msg.text!.trim()]);
  }, []);
  const live = useLiveCoachSession(handleLiveMessage);

  function stopLive() {
    setLiveTranscript([]);
    live.stop();
  }

  function chooseLevel(level: GermanLevel) {
    stopLive();
    setSelectedLevel(level);
  }

  async function startLiveWithContext(customContext: string) {
    await live.startGermanSession({
      learnerName,
      level: selectedLevel,
      section: null,
      subtopic: null,
      customSystemInstructionText: customContext,
    });
  }

  async function startLive() {
    await live.startGermanSession({
      learnerName,
      level: selectedLevel,
      section: null,
      subtopic: null,
    });
  }

  return (
    <GermanStudyGuidePanel
      level={selectedLevel}
      onLevelChange={chooseLevel}
      learnerName={learnerName}
      isLiveActive={live.isConnected}
      isAgentSpeaking={live.isAgentSpeaking}
      liveError={live.error ?? null}
      liveTranscript={liveTranscript}
      onPracticeWithSky={startLiveWithContext}
      onStartLive={startLive}
      onStopLive={stopLive}
      onBackToPortals={onBackToPortals}
      initialLessonNo={jumpToLesson ?? undefined}
      onLessonViewed={() => setJumpToLesson(null)}
    />
  );
}
