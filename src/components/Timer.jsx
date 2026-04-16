import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const POMODORO_TIME = 25 * 60;

  const [seconds, setSeconds] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const playBeep = () => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // pitch

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      audioContext.currentTime + 0.5
    );

    oscillator.stop(audioContext.currentTime + 0.5);
  };

  useEffect(() => {
    let interval = null;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (seconds === 0) {
      playBeep();
      setIsRunning(false);
      setSessions((prev) => prev + 1);
      setSeconds(POMODORO_TIME);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);
  const handleStartPause = () => {
    if (!isRunning) {
      playBeep(); // 🔔 Start beep
    }
    setIsRunning(!isRunning);
  };

  const progress = (seconds / POMODORO_TIME) * 360;

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
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
