import type { GermanLevel, GermanSection, GermanSubtopic } from "../lib/germanCurriculumRegistry";
import { buildGermanLiveTeacherContext } from "../lib/germanLiveTeacherContext";
import { useGeminiLiveAPI, type LiveMessage } from "./useGeminiLive";

export type LiveCoachKind = "english" | "german";

export interface StartEnglishLiveSessionArgs {
  learnerName: string;
  userLevel?: string;
  dailyTopic?: string;
  coachMode?: string;
}

export interface StartGermanLiveSessionArgs {
  learnerName: string;
  level: GermanLevel;
  section: GermanSection | null;
  subtopic: GermanSubtopic | null;
  customSystemInstructionText?: string;
}

export function useLiveCoachSession(onMessage?: (msg: LiveMessage) => void) {
  const live = useGeminiLiveAPI(onMessage);

  async function startEnglishSession(args: StartEnglishLiveSessionArgs) {
    await live.connect(
      args.learnerName,
      args.userLevel || "Intermediate",
      args.dailyTopic,
      args.coachMode || "balanced"
    );
  }

  async function startGermanSession(args: StartGermanLiveSessionArgs) {
    const systemInstructionText = args.customSystemInstructionText ?? buildGermanLiveTeacherContext({
      learnerName: args.learnerName,
      level: args.level,
      section: args.section,
      subtopic: args.subtopic,
    });

    await live.connect(
      args.learnerName,
      args.level,
      args.subtopic?.title || args.section?.title,
      "german",
      systemInstructionText
    );
  }

  return {
    isConnected: live.isConnected,
    error: live.error,
    stop: live.stopClient,
    startEnglishSession,
    startGermanSession,
  };
}
