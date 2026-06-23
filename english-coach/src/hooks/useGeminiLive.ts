import { useState } from "react";

// The previous prototype connected the browser directly to Gemini Live.
// That exposed the server credential in browser network traffic.
// Live practice is now handled inside InteractiveCoach using browser speech recognition
// plus the authenticated backend coach API. Keep this compatibility hook as a safe no-op.
export function useGeminiLiveAPI(_onMessage?: (msg: any) => void) {
  const [error] = useState<string | null>(null);
  return {
    isConnected: false,
    error,
    connect: async () => {},
    stopClient: () => {},
    sendText: (_text: string) => {},
  };
}
