import type http from "http";
import { attachAudioBridge } from "./audioBridge";

export function installRealtimeBridge(server: http.Server) {
  attachAudioBridge(server, {
    credential: process.env.GEMINI_API_KEY || "",
    defaultLiveModel: process.env.GEMINI_LIVE_MODEL || "models/gemini-3.1-flash-live-preview",
  });
}
