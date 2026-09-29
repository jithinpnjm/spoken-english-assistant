// Shared practice-session state for <AIPracticeComponent> and the global tutor panel:
// text chat against /api/chat (correction -> rewrite loop), voice via the Gemini Live bridge,
// one merged transcript, and per-session mistake memory (the successor of english-coach's
// Firestore mistakeMemory, kept in memory for the page view).

import {useCallback, useEffect, useMemo, useState} from 'react';
import {PracticeApiError, postJson, readAccessCode, saveAccessCode, usePracticeApiBase} from './api';
import {useLiveVoice, type VoiceTranscript} from './useLiveVoice';
import type {ChatReply, LessonContext, MistakeMemoryItem, PracticeState, TranscriptEntry} from './types';

const INITIAL_STATE: PracticeState = {phase: 'opening', learnerTurns: 0, repeatAttempts: 0};
let idCounter = 0;
const nextId = () => `t${Date.now().toString(36)}${(idCounter++).toString(36)}`;

export function usePracticeSession(lesson: LessonContext) {
  const apiBase = usePracticeApiBase();
  const [entries, setEntries] = useState<TranscriptEntry[]>([]);
  const [state, setState] = useState<PracticeState>(INITIAL_STATE);
  const [mistakes, setMistakes] = useState<MistakeMemoryItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestSummary, setSuggestSummary] = useState(false);
  const [needsAccessCode, setNeedsAccessCode] = useState(false);
  const [accessCode, setAccessCodeState] = useState('');

  useEffect(() => {
    const stored = readAccessCode();
    if (stored) setAccessCodeState(stored);
  }, []);

  const setAccessCode = useCallback((code: string) => {
    setAccessCodeState(code);
    saveAccessCode(code);
    setNeedsAccessCode(false);
    setError(null);
  }, []);

  const append = useCallback((entry: Omit<TranscriptEntry, 'id'>) => {
    setEntries((prev) => [...prev, {...entry, id: nextId()}]);
  }, []);

  const onVoiceTranscript = useCallback((entry: VoiceTranscript) => append({...entry, source: 'voice'}), [append]);
  const voice = useLiveVoice({
    apiBase,
    accessCode,
    onTranscript: onVoiceTranscript,
    onAccessCodeRequired: () => setNeedsAccessCode(true),
  });

  const request = useCallback(
    async (action: 'start' | 'message' | 'summary', message = '') => {
      setBusy(true);
      setError(null);
      const history = entries
        .filter((e) => e.source === 'chat' && e.role !== 'system')
        .map((e) => ({role: e.role, text: e.text}));
      if (action === 'message') append({role: 'learner', text: message, source: 'chat'});
      try {
        const reply = await postJson<ChatReply>(
          apiBase,
          '/api/chat',
          {action, message, lesson, history, state, mistakeMemory: mistakes},
          accessCode,
        );
        append({role: 'teacher', text: reply.teacherMessage, source: 'chat', reply});
        setState(reply.state);
        setSuggestSummary(reply.suggestSummary);
        if (reply.mistake) setMistakes((prev) => [...prev, reply.mistake!].slice(-12));
        return true;
      } catch (e) {
        const err = e as PracticeApiError;
        if (err.accessCodeRequired) setNeedsAccessCode(true);
        setError(err.message || 'Something went wrong.');
        if (action === 'message') {
          // Put the learner's text back so it can be re-sent.
          setEntries((prev) => (prev.length && prev[prev.length - 1].role === 'learner' ? prev.slice(0, -1) : prev));
        }
        return false;
      } finally {
        setBusy(false);
      }
    },
    [append, apiBase, accessCode, entries, lesson, mistakes, state],
  );

  const start = useCallback(() => request('start'), [request]);
  const send = useCallback((text: string) => request('message', text.trim()), [request]);
  const finish = useCallback(() => request('summary'), [request]);

  const reset = useCallback(() => {
    voice.stop();
    setEntries([]);
    setState(INITIAL_STATE);
    setMistakes([]);
    setError(null);
    setSuggestSummary(false);
  }, [voice]);

  const startVoice = useCallback(() => {
    void voice.connect(lesson);
  }, [lesson, voice]);

  const started = entries.length > 0 || voice.isConnected || voice.isConnecting;

  return useMemo(
    () => ({
      entries,
      state,
      mistakes,
      busy,
      error: error || voice.error,
      notice: voice.notice,
      suggestSummary,
      needsAccessCode,
      setAccessCode,
      started,
      start,
      send,
      finish,
      reset,
      voice: {...voice, start: startVoice},
    }),
    [entries, state, mistakes, busy, error, suggestSummary, needsAccessCode, setAccessCode, started, start, send, finish, reset, voice, startVoice],
  );
}
