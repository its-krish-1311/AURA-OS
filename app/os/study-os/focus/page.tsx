"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Square, RotateCcw, Volume2, Maximize2, Settings, Brain, Clock, Plus, Flame } from "lucide-react";

export default function StudyOSFocusTimer() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [mode, setMode] = useState<"pomodoro" | "shortBreak" | "longBreak">("pomodoro");
  const [sessionCount, setSessionCount] = useState(0);

  // Formatting time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (mode === "pomodoro") setSessionCount(prev => prev + 1);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "pomodoro" ? 25 * 60 : mode === "shortBreak" ? 5 * 60 : 15 * 60);
  };

  const changeMode = (newMode: "pomodoro" | "shortBreak" | "longBreak", minutes: number) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(minutes * 60);
  };

  return (
    <div className="p-8 pb-20 max-w-5xl mx-auto w-full h-full flex flex-col items-center justify-center min-h-[80vh]">
      
      {/* Background Pulse Effect based on state */}
      <motion.div 
        animate={{ 
          scale: isActive ? [1, 1.02, 1] : 1,
          opacity: isActive ? [0.1, 0.15, 0.1] : 0.05
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute w-[60vw] h-[60vw] rounded-full blur-[100px] pointer-events-none z-0 ${
          mode === 'pomodoro' ? 'bg-[#3B82F6]' : mode === 'shortBreak' ? 'bg-[#10B981]' : 'bg-[#A855F7]'
        }`}
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Modes */}
        <div className="krish-glass p-2 rounded-full border border-[rgba(255,255,255,0.05)] bg-transparent flex gap-2 mb-12">
          <button 
            onClick={() => changeMode("pomodoro", 25)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              mode === "pomodoro" ? "bg-[#3B82F6] text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]" : "text-gray-400 hover:text-white"
            }`}
          >
            Pomodoro
          </button>
          <button 
            onClick={() => changeMode("shortBreak", 5)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              mode === "shortBreak" ? "bg-[#10B981] text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]" : "text-gray-400 hover:text-white"
            }`}
          >
            Short Break
          </button>
          <button 
            onClick={() => changeMode("longBreak", 15)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              mode === "longBreak" ? "bg-[#A855F7] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "text-gray-400 hover:text-white"
            }`}
          >
            Long Break
          </button>
        </div>

        {/* Timer Display */}
        <div className="krish-glass w-96 h-96 rounded-full border-[2px] border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-12 group">
          {/* Circular Progress (Fake for UI perfection) */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="2" />
            <motion.circle 
              cx="50" cy="50" r="48" fill="none" 
              stroke={mode === 'pomodoro' ? '#3B82F6' : mode === 'shortBreak' ? '#10B981' : '#A855F7'} 
              strokeWidth="2" strokeLinecap="round"
              strokeDasharray="301.59" // 2 * PI * 48
              strokeDashoffset={isActive ? 0 : 301.59}
              initial={{ strokeDashoffset: 301.59 }}
              animate={{ strokeDashoffset: 301.59 - (301.59 * (1 - timeLeft / (mode === "pomodoro" ? 25*60 : mode === "shortBreak" ? 5*60 : 15*60))) }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
          </svg>

          <h1 className="text-8xl font-black text-white tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" style={{ fontVariantNumeric: "tabular-nums" }}>
            {displayTime}
          </h1>
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-[0.2em] flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" /> {sessionCount} Sessions Today
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button onClick={resetTimer} className="p-4 rounded-full krish-glass border border-[rgba(255,255,255,0.1)] text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <RotateCcw className="w-6 h-6" />
          </button>
          
          <button 
            onClick={toggleTimer} 
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isActive 
                ? 'krish-glass bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-white' 
                : 'bg-white text-black hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]'
            }`}
          >
            {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-2" />}
          </button>

          <button className="p-4 rounded-full krish-glass border border-[rgba(255,255,255,0.1)] text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Square className="w-6 h-6" />
          </button>
        </div>

      </div>
    </div>
  );
}
