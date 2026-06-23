export type InteractionMode = "chat" | "live";

export function interactionModeRule(mode: InteractionMode) {
  if (mode === "live") {
    return "LIVE VOICE MODE: It is okay to ask the learner to say, repeat, pause, stress, or pronounce short phrases aloud. Keep replies short and stay on the current lesson.";
  }
  return "CHAT TEXT MODE: Do not ask the learner to speak aloud, pronounce, or repeat verbally. Ask the learner to type, rewrite, correct, or answer in chat.";
}
