import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

interface GermanAudioProps {
  /** Exact German text sent to the browser voice. */
  text: string;
  /** Visible button label; may deliberately hide the answer in a listening exercise. */
  label: string;
}

/** Explicit audio for lesson examples, independent of automatic language detection. */
export default function GermanAudio({text, label}: GermanAudioProps) {
  const [error, setError] = useState('');

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  function play() {
    setError('');
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      setError('Audio is not supported in this browser. Use a German dictionary recording instead.');
      return;
    }

    const speech = window.speechSynthesis;
    const voices = speech.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith('de'));
    const voice = voices.find((item) => item.lang.toLowerCase() === 'de-de') ?? voices[0];
    if (!voice) {
      setError('No German voice is available yet. Try again, enable a German system voice, or use a German dictionary recording.');
      return;
    }

    speech.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voice.lang;
    utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.onerror = (event) => {
      // Starting another example deliberately cancels the previous utterance.
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        setError('Audio could not play. Try again or use a German dictionary recording.');
      }
    };
    speech.speak(utterance);
  }

  return (
    <span className={styles.audio} data-speech-manual>
      <button type="button" className={styles.button} onClick={play}>{label}</button>
      {error && <span className={styles.error} role="status"> {error}</span>}
    </span>
  );
}
