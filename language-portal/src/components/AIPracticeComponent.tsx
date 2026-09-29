import React, {useEffect, useMemo, useRef, useState, type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import {usePracticeSession} from '../lib/practice/usePracticeSession';
import type {ChatReply, LessonContext, PracticeLanguage, TranscriptEntry} from '../lib/practice/types';
import styles from './AIPracticeComponent.module.css';

export interface AIPracticeComponentProps {
  /** What is practised, e.g. "Bakery Greetings & Survival Phrases". */
  topic: string;
  /** CEFR level, e.g. "A1" or "B2-C1". */
  level: string;
  /** speaking | writing | reading | listening | roleplay */
  taskType: string;
  /** Scenario / teacher behaviour for this block. Sent to the AI coach; not shown to the learner. */
  prompt?: string;
  /** Target language. Defaults from the URL (/docs/german/... -> German, otherwise English). */
  language?: PracticeLanguage;
}

const VOICE_TASKS = new Set(['speaking', 'roleplay', 'listening', 'pronunciation', 'conversation']);

export function languageFromPath(pathname: string): PracticeLanguage {
  return /\/german(\/|$)/i.test(pathname) ? 'German' : 'English';
}

/** Minimal, safe rendering of the teacher's text: paragraphs, line breaks and **bold**. */
export function RichText({text}: {text: string}) {
  const paragraphs = text.split(/\n{2,}/);
  return (
    <>
      {paragraphs.map((para, p) => (
        <p key={p}>
          {para.split('\n').map((line, l) => (
            <React.Fragment key={l}>
              {l > 0 && <br />}
              {line.split(/(\*\*[^*]+\*\*)/g).map((chunk, c): ReactNode =>
                chunk.startsWith('**') && chunk.endsWith('**') && chunk.length > 4 ? <strong key={c}>{chunk.slice(2, -2)}</strong> : chunk,
              )}
            </React.Fragment>
          ))}
        </p>
      ))}
    </>
  );
}

function CorrectionCard({reply}: {reply: ChatReply}) {
  if (!reply.correctedSentence && !reply.naturalVersion && !reply.homework) return null;
  return (
    <div className={styles.correction}>
      {reply.correctedSentence && (
        <div>
          <span className={styles.correctionLabel}>Corrected</span> {reply.correctedSentence}
        </div>
      )}
      {reply.naturalVersion && reply.naturalVersion !== reply.correctedSentence && (
        <div>
          <span className={styles.correctionLabel}>More natural</span> {reply.naturalVersion}
        </div>
      )}
      {reply.ruleApplied && reply.correctedSentence && (
        <div>
          <span className={styles.correctionLabel}>Rule</span> {reply.ruleApplied}
        </div>
      )}
      {reply.homework && (
        <div>
          <span className={styles.correctionLabel}>Homework</span> {reply.homework}
        </div>
      )}
      {reply.score && (reply.score.grammar || reply.score.vocabulary || reply.score.fluency) && (
        <div className={styles.scores}>
          {reply.score.grammar != null && <span>Grammar {reply.score.grammar}/10</span>}
          {reply.score.vocabulary != null && <span>Vocabulary {reply.score.vocabulary}/10</span>}
          {reply.score.fluency != null && <span>Fluency {reply.score.fluency}/10</span>}
        </div>
      )}
    </div>
  );
}

export function TranscriptItem({entry}: {entry: TranscriptEntry}) {
  const isTeacher = entry.role === 'teacher';
  return (
    <div className={isTeacher ? styles.messageTeacher : styles.messageLearner}>
      {entry.source === 'voice' && <span className={styles.voiceTag}>voice</span>}
      <RichText text={entry.text} />
      {isTeacher && entry.reply && <CorrectionCard reply={entry.reply} />}
    </div>
  );
}

export function AccessCodeForm({onSubmit}: {onSubmit: (code: string) => void}) {
  const [code, setCode] = useState('');
  return (
    <form
      className={styles.accessForm}
      onSubmit={(e) => {
        e.preventDefault();
        if (code.trim()) onSubmit(code.trim());
      }}>
      <label htmlFor="practice-access-code">This site requires an access code for AI practice.</label>
      <div className={styles.row}>
        <input
          id="practice-access-code"
          type="password"
          autoComplete="off"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={styles.textInput}
          placeholder="Access code"
        />
        <button type="submit" className={styles.primaryBtn}>
          Save
        </button>
      </div>
    </form>
  );
}

export default function AIPracticeComponent({topic, level, taskType, prompt = '', language}: AIPracticeComponentProps) {
  const {pathname} = useLocation();
  const lesson: LessonContext = useMemo(
    () => ({
      language: language || languageFromPath(pathname),
      topic: String(topic || 'Practice'),
      level: String(level || ''),
      taskType: String(taskType || 'speaking').toLowerCase(),
      prompt: String(prompt || ''),
    }),
    [language, pathname, topic, level, taskType, prompt],
  );
  const session = usePracticeSession(lesson);
  const [draft, setDraft] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const voiceAllowed = VOICE_TASKS.has(lesson.taskType);
  const {voice} = session;

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [session.entries.length, session.busy]);

  const phase = session.state.phase;
  const finished = phase === 'complete';
  const placeholder =
    phase === 'repeat'
      ? 'Rewrite the corrected sentence here...'
      : `Type your ${lesson.language} answer here...`;

  const submit = async () => {
    const text = draft.trim();
    if (!text || session.busy) return;
    setDraft('');
    const ok = await session.send(text);
    if (!ok) setDraft(text);
  };

  return (
    <section className={styles.practiceContainer} aria-label={`AI practice: ${lesson.topic}`}>
      <div className={styles.header}>
        <h3>AI Practice: {lesson.topic}</h3>
        <span className={styles.badge}>{lesson.level}</span>
        <span className={styles.badge}>{lesson.taskType}</span>
      </div>

      {!session.started && (
        <div className={styles.intro}>
          <p>
            Practise this lesson with Sky, your AI {lesson.language} coach. Every mistake gets a correction, a short reason, and a
            rewrite{voiceAllowed ? ' (or spoken repeat)' : ''} before you move on.
          </p>
          <div className={styles.row}>
            <button type="button" className={styles.primaryBtn} onClick={() => void session.start()} disabled={session.busy}>
              {session.busy ? 'Starting...' : 'Start text practice'}
            </button>
            {voiceAllowed && (
              <button type="button" className={styles.secondaryBtn} onClick={voice.start}>
                Start voice practice
              </button>
            )}
          </div>
        </div>
      )}

      {session.started && (
        <div className={styles.chatArea} ref={listRef} aria-live="polite">
          {session.entries.map((entry) => (
            <TranscriptItem key={entry.id} entry={entry} />
          ))}
          {session.busy && <div className={styles.typing}>Sky is thinking...</div>}
        </div>
      )}

      {(voice.isConnecting || voice.isConnected) && (
        <div className={styles.voiceBar}>
          <span className={voice.isTeacherSpeaking ? styles.dotSpeaking : styles.dotListening} aria-hidden="true" />
          <span>{voice.isConnecting ? 'Connecting voice session...' : voice.isTeacherSpeaking ? 'Sky is speaking...' : 'Listening — speak now'}</span>
          <button type="button" className={styles.stopBtn} onClick={voice.stop}>
            Stop voice
          </button>
        </div>
      )}

      {session.notice && <div className={styles.notice}>{session.notice}</div>}
      {session.error && <div className={styles.error}>{session.error}</div>}
      {session.needsAccessCode && <AccessCodeForm onSubmit={session.setAccessCode} />}

      {session.started && !finished && (
        <>
          {phase === 'repeat' && <div className={styles.hint}>Rewrite the corrected sentence before we move on.</div>}
          <form
            className={styles.inputArea}
            onSubmit={(e) => {
              e.preventDefault();
              void submit();
            }}>
            <textarea
              className={styles.textInput}
              rows={2}
              value={draft}
              placeholder={placeholder}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void submit();
                }
              }}
              maxLength={2000}
              aria-label="Your answer"
            />
            <button type="submit" className={styles.primaryBtn} disabled={session.busy || !draft.trim()}>
              Send
            </button>
          </form>
        </>
      )}

      {session.started && (
        <div className={styles.toolbar}>
          {session.entries.some((e) => e.source === 'chat') && session.state.learnerTurns > 0 && !finished && (
            <button
              type="button"
              className={session.suggestSummary ? styles.primaryBtn : styles.linkBtn}
              onClick={() => void session.finish()}
              disabled={session.busy}>
              Finish &amp; get summary
            </button>
          )}
          {!session.entries.some((e) => e.source === 'chat') && (
            <button type="button" className={styles.linkBtn} onClick={() => void session.start()} disabled={session.busy}>
              Start text practice
            </button>
          )}
          {voiceAllowed && !voice.isConnected && !voice.isConnecting && (
            <button type="button" className={styles.linkBtn} onClick={voice.start}>
              {session.entries.some((e) => e.source === 'voice') ? 'Resume voice practice' : 'Switch to voice'}
            </button>
          )}
          <button type="button" className={styles.linkBtn} onClick={session.reset}>
            Start over
          </button>
          {session.mistakes.length > 0 && (
            <details className={styles.mistakes}>
              <summary>Corrections this session ({session.mistakes.length})</summary>
              <ul>
                {session.mistakes.map((m, i) => (
                  <li key={i}>
                    <s>{m.original}</s> &rarr; {m.corrected}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </section>
  );
}
