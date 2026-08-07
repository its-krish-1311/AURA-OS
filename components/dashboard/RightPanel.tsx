"use client";

import React, { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";

const schedule = [
  { time: "09:00 AM", title: "DSA Class", sub: "College", color: "bg-[#7E22CE]", shadow: "shadow-[0_0_15px_rgba(126,34,206,0.6)]" },
  { time: "11:30 AM", title: "AI/ML Workshop", sub: "Online", color: "bg-[#A855F7]", shadow: "shadow-[0_0_15px_rgba(168,85,247,0.6)]" },
  { time: "02:00 PM", title: "Project Work", sub: "Personal", color: "bg-white", shadow: "shadow-[0_0_15px_rgba(255,255,255,0.5)]" },
  { time: "07:00 PM", title: "Gym & Fitness", sub: "Health", color: "bg-[#D8B4FE]", shadow: "shadow-[0_0_15px_rgba(216,180,254,0.5)]" },
];

const progressLegend = [
  { label: "Study", value: "6h", color: "bg-[var(--theme-color-dark)]", shadow: "shadow-[0_0_10px_rgba(var(--theme-rgb-dark),0.3)]" },
  { label: "Work", value: "3h", color: "bg-[var(--theme-color)]", shadow: "shadow-[0_0_10px_rgba(var(--theme-rgb-dark),0.3)]" },
  { label: "Health", value: "1h", color: "bg-[#64748B]", shadow: "shadow-[0_0_10px_rgba(255,255,255,0.1)]" },
  { label: "Other", value: "2h", color: "bg-[#CBD5E1]", shadow: "shadow-[0_0_10px_rgba(255,255,255,0.1)]" },
];

import { useActionModal } from "@/components/os-core/ActionModalContext";

export default function RightPanel() {
  const { openModal } = useActionModal();
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [dateInfo, setDateInfo] = useState<{ dateStr: string, days: {name: string, num: number, isToday: boolean}[], todayIndex: number }>({
    dateStr: "Loading...",
    days: Array(7).fill({ name: "-", num: 0, isToday: false }),
    todayIndex: -1
  });

  // Focus Mode State
  const [focusTimeLeft, setFocusTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isFocusRunning, setIsFocusRunning] = useState(false);

  useEffect(() => {
    // Generate live date data
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    
    const currentDay = today.getDay(); 
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - currentDay);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      days.push({
        name: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
        num: d.getDate(),
        isToday: i === currentDay
      });
    }

    setDateInfo({ dateStr, days, todayIndex: currentDay });

    // Live Clock Loop
    setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    // Animate progress on load
    const timer = setTimeout(() => setProgress(78), 500);
    return () => {
      clearTimeout(timer);
      clearInterval(clockInterval);
    };
  }, []);

  // Focus Timer Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFocusRunning && focusTimeLeft > 0) {
      interval = setInterval(() => {
        setFocusTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (focusTimeLeft === 0) {
      setIsFocusRunning(false);
    }
    return () => clearInterval(interval);
  }, [isFocusRunning, focusTimeLeft]);

  const formatFocusTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-[320px] flex-shrink-0 flex flex-col gap-6">
      
      {/* Calendar & Schedule Widget */}
      <motion.div whileHover={{ y: -2 }} className="krish-glass rounded-[26px] p-6 relative overflow-hidden group">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7E22CE] blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#A855F7] blur-[70px] opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500 pointer-events-none"></div>

        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="text-white font-bold text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{dateInfo.dateStr}</h3>
          <span className="text-accentLuxury text-[11px] font-light tracking-wider drop-shadow-[0_0_6px_rgba(255,213,74,0.4)]">{currentTime}</span>
        </div>
        
        {/* Horizontal Calendar */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          {dateInfo.days.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <span className="text-gray-300 text-xs font-semibold">{day.name}</span>
              <motion.div 
                whileHover={!day.isToday ? { scale: 1.1, backgroundColor: "rgba(168,85,247,0.15)" } : { scale: 1.05 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-all duration-300 ${
                day.isToday ? "bg-gradient-to-br from-[#7E22CE] to-[#A855F7] text-white shadow-[0_0_15px_rgba(168,85,247,0.8)] border border-[rgba(168,85,247,0.6)]" : "text-gray-100 border border-transparent hover:border-[rgba(168,85,247,0.4)]"
              }`}>
                {day.num}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4 relative z-10">
          <h3 className="text-white text-xs font-bold tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">TODAY&apos;S SCHEDULE</h3>
          <button 
            onClick={() => openModal({
              title: "Full Calendar",
              description: "The full calendar view is currently being generated by your AI twin and will sync with your events shortly.",
              actionText: "Acknowledge"
            })}
            className="text-[#A855F7] text-xs font-semibold hover:text-white hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all duration-300"
          >
            View All
          </button>
        </div>

        <div className="space-y-5 relative z-10">
          {schedule.map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 cursor-pointer group/item"
            >
              <span className="text-gray-300 text-xs font-semibold w-16 pt-0.5 transition-colors duration-300 group-hover/item:text-white">{item.time}</span>
              <div className="relative pl-4 border-l border-[rgba(168,85,247,0.2)] group-hover/item:border-[rgba(168,85,247,0.6)] transition-colors duration-300 flex-1 pb-1">
                <motion.div 
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.5 }}
                  className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${item.color} ${item.shadow}`} 
                />
                <h4 className="text-white text-sm font-bold group-hover/item:text-[#A855F7] group-hover/item:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-all duration-300">{item.title}</h4>
                <p className="text-gray-300 text-xs font-semibold">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Focus Mode Widget */}
      <motion.div whileHover={{ y: -2 }} className="krish-glass rounded-[26px] p-6 relative overflow-hidden group cursor-pointer transition-all">
        {/* Ambient blue glow at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[rgba(var(--theme-rgb-dark),0.12)] to-transparent pointer-events-none transition-opacity group-hover:opacity-80" />
        
        {/* Animated Blue Waves */}
        <div className="absolute -bottom-10 -left-10 right-0 h-32 opacity-25 pointer-events-none group-hover:animate-pulse-slow" style={{
          background: 'radial-gradient(ellipse at bottom, rgba(var(--theme-rgb-dark),0.5) 0%, transparent 60%)',
          filter: 'blur(15px)'
        }} />

        <h3 className="text-white text-xs font-bold tracking-[0.2em] mb-1 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          FOCUS <span className="text-accentLuxury drop-shadow-[0_0_5px_rgba(255,213,74,0.8)]">MODE</span>
        </h3>
        
        <div className="flex items-center justify-between mt-4 relative z-10">
          <div>
            <div className="text-4xl font-light text-white tracking-wider drop-shadow-[0_2px_8px_rgba(var(--theme-rgb-dark),0.3)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-accentLuxury transition-all duration-500">
              {formatFocusTime(focusTimeLeft)}
            </div>
            <p className="text-gray-300 text-xs mt-1 font-medium tracking-wide">Stay focused. Achieve more.</p>
          </div>
          <motion.button 
            onClick={() => setIsFocusRunning(!isFocusRunning)}
            whileHover={{ scale: 1.1, rotate: isFocusRunning ? 0 : 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-3xl flex items-center justify-center text-white border border-white/40 shadow-none hover:bg-white/40 hover:border-white/60 hover:scale-105 transition-all duration-300"
          >
            {isFocusRunning ? (
              <Pause className="w-5 h-5" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5 ml-1" fill="currentColor" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Today's Progress Widget */}
      <motion.div whileHover={{ y: -2 }} className="krish-glass rounded-[26px] p-6 relative overflow-hidden group">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[var(--theme-color-dark)] blur-[70px] opacity-[0.08] group-hover:opacity-[0.16] pointer-events-none rounded-full transition-opacity duration-500"></div>
        <h3 className="text-white text-xs font-bold tracking-[0.2em] mb-6 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">TODAY&apos;S PROGRESS</h3>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 flex-shrink-0 relative group-hover:scale-105 transition-transform duration-500">
            <CircularProgressbar
              value={progress}
              strokeWidth={8}
              styles={buildStyles({
                pathColor: "url(#blue-gradient)",
                trailColor: "rgba(var(--theme-rgb-dark),0.05)",
                strokeLinecap: "round",
                pathTransitionDuration: 1.5,
              })}
            />
            {/* SVG Gradient for progress bar */}
            <svg style={{ height: 0 }}>
              <defs>
                <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="var(--theme-color-dark)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white text-xl font-bold drop-shadow-[0_0_8px_rgba(var(--theme-rgb-dark),0.3)]">{progress}%</span>
              <span className="text-gray-300 text-xs uppercase tracking-wider font-semibold">Completed</span>
            </div>
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-full shadow-[0_0_25px_rgba(var(--theme-rgb-dark),0.08)] pointer-events-none group-hover:shadow-[0_0_35px_rgba(var(--theme-rgb-dark),0.15)] transition-shadow duration-500" />
          </div>

          <div className="flex-1 space-y-2.5">
            {progressLegend.map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 4 }}
                className="flex items-center justify-between cursor-default"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color} ${item.shadow}`} />
                  <span className="text-gray-100 text-xs font-semibold tracking-wide">{item.label}</span>
                </div>
                <span className="text-white text-xs font-bold">{item.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
}



