import React, {useEffect} from 'react';
import styles from './styles.module.css';

const GERMAN_MARKERS = new Set(
  (`aber ab acht abend abfahrtstafel abholen achte alex am an apfelsaft auch auf aus automat bahnhof bitte bin bis bist buch buchstabieren café das dass dein deine dem den der des deutsch deutschland die dies diese dieser doch drei du durch ein eine einen einer einem einfach es essen fahrkarte fahrkarten fahrkartenautomat fahren fährt falsch familie finde fünf für geben geht gern grüß grüezi guten haben habe hat hauptbahnhof heute heiße ich ihr im in ins ist ja jetzt kein keine keinen können kann komm komme kommen kommt krank langsam leben lernen macht machen mai mein meine mit moin morgen möchte möchten neunzehn nichts neun nur orangensaft oder salü schlafzimmer servus sie sind zehn tschüss um und uns unsere verabschiedung vielleicht von vom vor wann was weh wenig wer wie wiederholen wir wo woher wohin wohn wohnst wohnort wohne wohnt wartebereich zum zur zu zimmer`).split(/\s+/),
);

function looksGerman(text: string): boolean {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean || clean.length > 280) return false;

  const words = clean.toLocaleLowerCase('de-DE').match(/[a-zäöüß]+/g) ?? [];
  if (/^\+?\d[\d\s.:-]*(?:€|uhr)?$/i.test(clean)) return true;
  if (!words.length) return false;

  const markers = words.filter((word) =>
    GERMAN_MARKERS.has(word) || /(?:und)?(?:zehn|zig|hundert|tausend)$/.test(word),
  ).length;
  const hasGermanCharacter = /[äöüß]/i.test(clean);

  // Short examples such as “Guten Tag” or “Bitte” are useful to hear too.
  if (words.length <= 3) return markers > 0 || hasGermanCharacter;

  // Longer mixed English/German explanations should not be read aloud as German.
  return (markers >= 2 && markers / words.length >= 0.16) || (hasGermanCharacter && markers > 0);
}

function speakGerman(text: string) {
  if (!('speechSynthesis' in window)) return;

  const speech = window.speechSynthesis;
  speech.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  // A very slow rate can make otherwise good system voices sound choppy.
  utterance.rate = 0.94;

  const germanVoice = speech.getVoices()
    .filter((voice) => voice.lang.toLowerCase().startsWith('de'))
    .sort((left, right) => voiceQuality(right) - voiceQuality(left))[0];
  if (germanVoice) utterance.voice = germanVoice;

  speech.speak(utterance);
}

function voiceQuality(voice: SpeechSynthesisVoice) {
  const lang = voice.lang.toLowerCase();
  const name = voice.name.toLowerCase();
  let score = lang === 'de-de' ? 20 : 0;

  // Prefer enhanced/neural voices when the device exposes them. Voice names and
  // quality metadata vary by browser and operating system.
  if (/neural|natural|enhanced|premium|siri|google/i.test(name)) score += 30;
  if (!voice.localService) score += 2;
  if (voice.default) score += 1;
  return score;
}

function addButtons() {
  if (!window.location.pathname.startsWith('/docs/german')) return;

  const markdown = document.querySelector('article .markdown');
  if (!markdown) return;

  const candidates = Array.from(
    markdown.querySelectorAll<HTMLElement>(
      'em, strong, code, [lang^="de"], blockquote p, td, li, p',
    ),
  ).sort((left, right) => {
    // Mark the smallest German phrase first, so a whole paragraph containing an
    // English explanation and a German example does not get read as one block.
    if (left.contains(right)) return 1;
    if (right.contains(left)) return -1;
    return 0;
  });

  for (const element of candidates) {
    if (element.dataset.germanSpeechReady || element.querySelector('[data-german-speech-ready], [data-speech-manual]')) continue;
    if (element.closest('button, pre, .german-speech-button, [data-speech-manual]')) continue;

    const germanText = element.textContent?.replace(/\s+/g, ' ').trim() ?? '';
    if (!element.closest('[lang^="de"]') && !looksGerman(germanText)) continue;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = styles.speakerButton;
    button.dataset.germanSpeechReady = 'true';
    button.setAttribute('aria-label', `Listen to German: ${germanText}`);
    button.title = 'Listen to German pronunciation';
    button.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z"/></svg>';
    button.addEventListener('click', () => speakGerman(germanText));

    element.dataset.germanSpeechReady = 'true';
    if (element.matches('td, li, p')) {
      element.append(button);
    } else {
      element.insertAdjacentElement('afterend', button);
    }
  }
}

export default function GermanSpeechButtons() {
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    addButtons();
    const observer = new MutationObserver(() => addButtons());
    observer.observe(document.body, {childList: true, subtree: true});

    return () => {
      observer.disconnect();
      window.speechSynthesis.cancel();
    };
  }, []);

  return null;
}
