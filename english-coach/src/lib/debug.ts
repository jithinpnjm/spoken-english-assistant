// Debug logger — always on in dev, togglable in prod via localStorage
// Enable in prod: localStorage.setItem('EC_DEBUG', 'true')  then refresh
// Disable:        localStorage.removeItem('EC_DEBUG')        then refresh

function isEnabled(): boolean {
  return true; // always on — disable per-namespace or set to false when app is production-ready
}

type Level = "log" | "warn" | "error" | "info";

function emit(ns: string, level: Level, ...args: any[]) {
  if (!isEnabled()) return;
  const ts = new Date().toISOString().slice(11, 23); // HH:MM:SS.mmm
  const tag = `%c[${ns}] ${ts}`;
  const style = level === "error" ? "color:#f87171;font-weight:bold"
              : level === "warn"  ? "color:#fbbf24;font-weight:bold"
              : level === "info"  ? "color:#60a5fa"
              :                     "color:#a78bfa";
  console[level](tag, style, ...args);
}

function makeNs(ns: string) {
  return {
    log:   (...a: any[]) => emit(ns, "log",   ...a),
    info:  (...a: any[]) => emit(ns, "info",  ...a),
    warn:  (...a: any[]) => emit(ns, "warn",  ...a),
    error: (...a: any[]) => emit(ns, "error", ...a),
  };
}

export const dbg = {
  auth:    makeNs("Auth"),
  db:      makeNs("Firebase"),
  session: makeNs("Session"),
  coach:   makeNs("Coach"),
  tts:     makeNs("TTS"),
  live:    makeNs("Live"),
  speech:  makeNs("Speech"),
  ui:      makeNs("UI"),
};
