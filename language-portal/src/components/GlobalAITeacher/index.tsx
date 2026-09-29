import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import {usePracticeSession} from '../../lib/practice/usePracticeSession';
import type {LessonContext} from '../../lib/practice/types';
import {AccessCodeForm, TranscriptItem, languageFromPath} from '../AIPracticeComponent';
import styles from './styles.module.css';

function topicFromPath(pathname: string) {
  const last = pathname.replace(/\/$/, '').split('/').pop() || '';
  const words = last.replace(/^[a-z]\d{2}-/i, '').replace(/-/g, ' ').trim();
  return words || 'the home page';
}

function TutorPanel({onClose}: {onClose: () => void}) {
  const {pathname} = useLocation();
  const [pageTitle, setPageTitle] = useState('');
  useEffect(() => {
    setPageTitle(document.title.split('|')[0].trim());
  }, [pathname]);

  const language = languageFromPath(pathname);
  const topic = topicFromPath(pathname);
  const lesson: LessonContext = useMemo(
    () => ({language, topic, level: language === 'German' ? 'A1-B1' : 'B1-C1', taskType: 'tutor', prompt: '', pageTitle: pageTitle || topic}),
    [language, topic, pageTitle],
  );
  const session = usePracticeSession(lesson);
  const {voice} = session;
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [session.entries.length, session.busy]);

  // A new page is a new context: close any live session when navigating.
  useEffect(() => () => voice.stop(), [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async () => {
    const text = draft.trim();
    if (!text || session.busy) return;
    setDraft('');
    const ok = await session.send(text);
    if (!ok) setDraft(text);
  };

  const status = voice.isConnecting
    ? 'Connecting voice...'
    : voice.isConnected
      ? voice.isTeacherSpeaking
        ? 'Speaking...'
        : 'Listening'
      : 'Ask anything about this page';

  return (
    <div className={styles.teacherPanel} role="dialog" aria-label="AI tutor">
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.avatar} aria-hidden="true">
            S
          </div>
          <div className={styles.titleText}>
            <h4>Sky — {language} tutor</h4>
            <span className={styles.status}>{status}</span>
          </div>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close tutor">
          ×
        </button>
      </div>

      <div className={styles.contextAwareness}>
        <span>
          Reading: <strong>{pageTitle || topic}</strong>
        </span>
      </div>

      <div className={styles.chatArea}>
        {session.entries.length === 0 && (
          <div className={styles.messageAi}>
            Ask me about anything on this page — a word, a grammar rule, pronunciation, or whether your own sentence is correct. You
            can type, or press the microphone to talk.
          </div>
        )}
        {session.entries.map((entry) => (
          <TranscriptItem key={entry.id} entry={entry} />
        ))}
        {session.busy && <div className={styles.messageAi}>Thinking...</div>}
        {session.notice && <div className={styles.messageAi}>{session.notice}</div>}
        {session.error && <div className={styles.errorText}>{session.error}</div>}
        {session.needsAccessCode && <AccessCodeForm onSubmit={session.setAccessCode} />}
        <div ref={endRef} />
      </div>

      <form
        className={styles.inputArea}
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}>
        <button
          type="button"
          className={voice.isConnected || voice.isConnecting ? `${styles.micBtn} ${styles.micBtnActive}` : styles.micBtn}
          onClick={voice.isConnected || voice.isConnecting ? voice.stop : voice.start}
          title={voice.isConnected ? 'Stop voice conversation' : 'Start voice conversation'}
          aria-label={voice.isConnected ? 'Stop voice conversation' : 'Start voice conversation'}>
          <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20" aria-hidden="true">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </button>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={language === 'German' ? 'Ask about a word or write in German...' : 'Ask about English or write a sentence...'}
          className={styles.textInput}
          maxLength={2000}
          aria-label="Message to tutor"
        />
        <button type="submit" className={styles.sendBtn} disabled={session.busy || !draft.trim()} aria-label="Send">
          <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20" aria-hidden="true">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default function GlobalAITeacher() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button className={styles.fab} onClick={() => setIsOpen(true)} title="Ask your AI tutor" aria-label="Open AI tutor">
        <span className={styles.fabIcon} aria-hidden="true">
          ?
        </span>
        <span className={styles.fabPulse}></span>
      </button>
    );
  }

  // Mounted only when open, so closing the panel also tears down any voice session.
  return <TutorPanel onClose={() => setIsOpen(false)} />;
}
