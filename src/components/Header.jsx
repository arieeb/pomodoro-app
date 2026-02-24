import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="title">
        <div className="clock-icon"></div>
        <h1>Pomodoro Timer</h1>
      </div>
      <h3>
        Boost your productivity with the Pomodoro Technique. 
        Focus for 25 minutes, then take a short break.
      </h3>
    </header>
  );
};

export default Header;