import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

const POMODORO_TIME = 24 * 60 * 60;

const Timer = () => {
  const [seconds, setSeconds] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const startTimeRef = useRef(null);
  const startSecsRef = useRef(null);

  const playBeep = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.5);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  useEffect(() => {
    if (!isRunning) return;

    startTimeRef.current = Date.now(); // ✅ fixed
    startSecsRef.current = seconds;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000); // ✅ fixed
      const remaining = startSecsRef.current - elapsed;

      if (remaining <= 0) {
        clearInterval(interval);
        setSeconds(POMODORO_TIME);
        setIsRunning(false);
        setSessions((s) => s + 1);
        playBeep();
      } else {
        setSeconds(remaining);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const formatTime = () => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60); // ✅ fixed: remainder after hours
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (seconds / POMODORO_TIME) * 360;

  return (
    <div className="timer-container">
      <div className="progress-wrapper">
        <div
          className="progress-ring"
          style={{
            background: `conic-gradient(#ff4e50 ${progress}deg, rgba(255,255,255,0.1) ${progress}deg)`,
          }}
        >
          <div className="timer-display">{formatTime()}</div>
        </div>
      </div>

      <button className="start-btn" onClick={handleStartPause}>
        {isRunning ? 'PAUSE' : 'START'}
      </button>

      <div className="session-counter">
        🔥 Sessions Today: <span>{sessions}</span>
      </div>
    </div>
  );
};

export default Timer;
