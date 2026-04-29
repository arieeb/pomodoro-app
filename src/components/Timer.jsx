import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

const POMODORO_TIME = 25 * 60;

const Timer = () => {
  const [seconds, setSeconds] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const startTimeRef = useRef(null);   // wall-clock start time
  const startSecsRef = useRef(null);   // seconds value when timer started

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

    // Snapshot wall clock and current seconds when timer starts/resumes
    startTimeRef.current = Date.now();
    startSecsRef.current = seconds;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = startSecsRef.current - elapsed;

      if (remaining <= 0) {
        clearInterval(interval);
        setSeconds(POMODORO_TIME);
        setIsRunning(false);
        setSessions((s) => s + 1);
        playBeep(); // 🔔 completion beep
      } else {
        setSeconds(remaining);
      }
    }, 500); // poll every 500ms for accuracy

    return () => clearInterval(interval);
  }, [isRunning]); // ✅ only re-runs on start/pause, not every tick

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(POMODORO_TIME);
  };

  const progress = (seconds / POMODORO_TIME) * 360;

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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

      <div className="btn-group">
        <button className="start-btn" onClick={handleStartPause}>
          {isRunning ? 'PAUSE' : 'START'}
        </button>
        <button className="reset-btn" onClick={handleReset}>
          RESET
        </button>
      </div>

      <div className="session-counter">
        🔥 Sessions Today: <span>{sessions}</span>
      </div>
    </div>
  );
};

export default Timer;
