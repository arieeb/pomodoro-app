# ⏳ Pomodoro Timer App

A modern and minimal Pomodoro Timer built with React.  
Designed to improve productivity using the Pomodoro Technique.

---

## 🚀 Features

- ⏱ 25-minute focus timer
- ▶ Start / Pause functionality
- 🔄 Circular animated progress ring
- 🔥 Session counter
- 🔔 Beep sound on start and completion (Web Audio API)
- 🎨 Clean glassmorphism UI

---

## 🛠 Tech Stack

- React
- JavaScript (ES6+)
- CSS (Glassmorphism + Conic Gradient)
- Web Audio API

---

## 📸 Preview

(Add screenshot here)

---

## 📂 Project Structure
src/
│
├── components/
│ ├── Header.jsx
│ ├── Timer.jsx
│ └── Timer.css
│
├── App.js
└── index.js


---

## 🧠 How It Works

- Uses `useState` to manage timer state
- Uses `useEffect` for countdown logic
- Uses `setInterval` for real-time updates
- Uses `conic-gradient` for circular progress animation
- Uses Web Audio API for beep sound generation

---

## 📦 Installation

```bash
git clone https://github.com/your-username/pomodoro-timer.git
cd pomodoro-timer
npm install
npm start
