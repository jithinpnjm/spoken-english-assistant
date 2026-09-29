import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { useLocation } from '@docusaurus/router';

export default function GlobalAITeacher() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  const handleVoiceClick = () => {
    alert("🎤 Connecting to Gemini Live Audio Bridge... (Backend integration pending)");
  };

  if (!isOpen) {
    return (
      <button 
        className={styles.fab} 
        onClick={() => setIsOpen(true)}
        title="Ask your AI Teacher"
      >
        <span className={styles.fabIcon}>🤖</span>
        <span className={styles.fabPulse}></span>
      </button>
    );
  }

  const currentTopic = location.pathname.split('/').pop().replace(/-/g, ' ') || 'the home page';

  return (
    <div className={styles.teacherPanel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.avatar}>🤖</div>
          <div className={styles.titleText}>
            <h4>Gemini Tutor</h4>
            <span className={styles.status}>🟢 Online & Listening</span>
          </div>
        </div>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
      </div>
      
      {/* Context Banner */}
      <div className={styles.contextAwareness}>
        <span>📍 Reading: <strong>{currentTopic}</strong></span>
      </div>

      {/* Chat Area */}
      <div className={styles.chatArea}>
        <div className={styles.messageAi}>
          Hallo! I'm your personal German coach. I see you're looking at <strong>{currentTopic}</strong>.
        </div>
        
        <div className={styles.messageAi}>
          <p>Need help pronouncing a word? Just ask! For example, if you see the word <strong>Krankenwagen</strong>, I can break it down for you:</p>
          <div className={styles.phoneticCard}>
            <strong>Krankenwagen</strong> (Ambulance)<br/>
            🗣️ <em>Krahn-ken-vah-gen</em><br/>
            💡 <small>Kranken (sick) + Wagen (car)</small>
          </div>
        </div>

        {/* Dummy User Message for Visual */}
        <div className={styles.messageUser}>
          How do I pronounce "Entschuldigung"?
        </div>

        <div className={styles.messageAi}>
          <div className={styles.phoneticCard}>
            <strong>Entschuldigung</strong> (Excuse me)<br/>
            🗣️ <em>Ent-shool-dee-goong</em><br/>
            💡 <small>Focus on the "sch" (sh) and the ending "ung" (oong).</small>
          </div>
          <p>Click the 🎙️ button to try saying it, and I'll grade your accent!</p>
        </div>

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className={styles.inputArea}>
        <button 
          className={styles.micBtn} 
          onClick={handleVoiceClick}
          title="Start Live Voice Conversation"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
        </button>
        <input 
          type="text" 
          placeholder="Ask how to pronounce a word..." 
          className={styles.textInput}
        />
        <button className={styles.sendBtn}>
          <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
