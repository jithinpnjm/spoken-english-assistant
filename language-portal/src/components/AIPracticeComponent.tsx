import React from 'react';
import styles from './AIPracticeComponent.module.css';

export default function AIPracticeComponent({ topic, level, taskType, prompt }) {
  // This is a placeholder for the actual Gemini integration
  // In the real implementation, this will connect to your Node.js backend or via WebSocket
  return (
    <div className={styles.practiceContainer}>
      <div className={styles.header}>
        <h3>🤖 Practice Arena: {topic}</h3>
        <span className={styles.badge}>{level}</span>
        <span className={styles.badge}>{taskType}</span>
      </div>
      
      <div className={styles.chatArea}>
        <div className={styles.messageAi}>
          Hallo! Let's practice {topic}. Are you ready?
        </div>
        {/* Messages will render here */}
      </div>

      <div className={styles.inputArea}>
        <input 
          type="text" 
          placeholder="Type your German answer here..." 
          className={styles.textInput}
        />
        <button className={styles.submitBtn}>Send</button>
        {taskType === 'speaking' && (
          <button className={styles.micBtn}>🎤</button>
        )}
      </div>
      
      <div className={styles.debugInfo}>
        <small>System Prompt (Hidden in production): {prompt}</small>
      </div>
    </div>
  );
}
