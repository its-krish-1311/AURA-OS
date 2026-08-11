"use client";

import React, { useEffect, useState } from "react";
import { Play, Pause, Calendar } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";

const schedule = [
  { time: "09:00", title: "DSA Class", sub: "College", color: "bg-[#7E22CE]", shadow: "shadow-[0_0_15px_rgba(126,34,206,0.6)]" },
  { time: "11:30", title: "AI/ML Workshop", sub: "Online", color: "bg-[#A855F7]", shadow: "shadow-[0_0_15px_rgba(168,85,247,0.6)]" },
  { time: "14:00", title: "Project Work", sub: "Personal", color: "bg-white", shadow: "shadow-[0_0_15px_rgba(255,255,255,0.5)]" },
  { time: "19:00", title: "Gym & Fitness", sub: "Health", color: "bg-[#D8B4FE]", shadow: "shadow-[0_0_15px_rgba(216,180,254,0.5)]" },
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
  const [currentHour, setCurrentHour] = useState("11:42");
  const [currentPeriod, setCurrentPeriod] = useState("AM");
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
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      days.push({
        name: dayNames[i],
        num: d.getDate(),
        isToday: i === currentDay
      });
    }

    setDateInfo({ dateStr, days, todayIndex: currentDay });

    // Live Clock Loop
    const updateTime = () => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, '0');
      const p = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      setCurrentHour(`${h}:${m}`);
      setCurrentPeriod(p);
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

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
    <div className="w-[340px] flex-shrink-0 flex flex-col gap-6">
      
      {/* Calendar & Schedule Widget */}
      <motion.div whileHover={{ y: -2 }} className="krish-glass rounded-3xl p-8 relative overflow-hidden group border border-[rgba(255,255,255,0.05)] bg-[rgba(10,10,10,0.4)] shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7E22CE] blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>

        {/* Massive Clock */}
        <div className="flex items-baseline gap-2 mb-6 relative z-10">
          <h2 className="text-6xl font-light text-white tracking-tight">{currentHour}</h2>
          <span className="text-[#A855F7] text-lg font-bold">{currentPeriod}</span>
        </div>
        
        {/* Horizontal Calendar */}
        <div className="flex justify-between items-center mb-8 relative z-10 px-1">
          {dateInfo.days.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className={`text-[10px] font-bold ${day.isToday ? 'text-[#A855F7]' : 'text-gray-500'}`}>{day.name}</span>
              <motion.div 
                onClick={() => {
                  if (day.isToday) return;
                  openModal({
                    title: "Change Date",
                    description: `Switch view to ${day.num}?`,
                    actionText: "Acknowledge"
                  });
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-all duration-300 ${
                day.isToday ? "bg-[#A855F7] text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]" : "text-gray-300 hover:bg-[rgba(255,255,255,0.05)]"
              }`}>
                {day.num}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-5 relative z-10">
          <h3 className="text-white text-xs font-bold tracking-[0.2em]">TODAY'S SCHEDULE</h3>
          <button 
            onClick={() => window.location.href = '/os/study-os'}
            className="text-gray-400 text-xs font-semibold hover:text-white transition-all duration-300"
          >
            View All
          </button>
        </div>

        <div className="space-y-4 relative z-10">
          {schedule.length > 0 ? (
            schedule.map((item, i) => (
              <motion.div 
                key={i} 
                onClick={() => openModal({
                  title: "Event Details",
                  description: `${item.title} at ${item.time}. Category: ${item.sub}.`,
                  actionText: "Close"
                })}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between cursor-pointer group/item p-3 rounded-2xl hover:bg-[rgba(255,255,255,0.03)] border border-transparent hover:border-[rgba(255,255,255,0.05)] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color} ${item.shadow}`} />
                  <div>
                    <h4 className="text-white text-sm font-bold transition-all duration-300">{item.title}</h4>
                    <p className="text-gray-400 text-xs font-medium">{item.sub}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-xs font-bold group-hover/item:text-white transition-colors duration-300">{item.time}</span>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center bg-[rgba(255,255,255,0.02)] rounded-2xl border border-dashed border-[rgba(255,255,255,0.1)]">
              <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-3">
                <Calendar className="w-4 h-4 text-gray-500" />
              </div>
              <p className="text-gray-400 text-xs font-semibold">No events scheduled</p>
              <p className="text-gray-500 text-[10px] mt-1 tracking-wider uppercase">Enjoy your free time</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Focus Mode Widget */}
      <motion.div whileHover={{ y: -2 }} className="krish-glass rounded-3xl p-6 relative overflow-hidden group cursor-pointer transition-all border border-[rgba(255,255,255,0.05)] bg-[rgba(10,10,10,0.4)] shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center min-h-[220px]">
        {/* Ambient purple glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.1),transparent_70%)] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
        
        <h3 className="text-gray-400 text-xs font-bold tracking-[0.2em] mb-4 relative z-10 w-full text-left">
          FOCUS MODE
        </h3>
        
        <div className="text-[64px] font-light text-white tracking-tight leading-none mb-6 relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          {formatFocusTime(focusTimeLeft)}
        </div>

        <motion.button 
          onClick={() => setIsFocusRunning(!isFocusRunning)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#7E22CE] to-[#A855F7] flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 relative z-10"
        >
          {isFocusRunning ? (
            <Pause className="w-6 h-6" fill="currentColor" />
          ) : (
            <Play className="w-6 h-6 ml-1" fill="currentColor" />
          )}
        </motion.button>
      </motion.div>

      {/* Today's Progress Widget */}
      <motion.div whileHover={{ y: -2 }} className="krish-glass rounded-3xl p-6 relative overflow-hidden group border border-[rgba(255,255,255,0.05)] bg-[rgba(10,10,10,0.4)] shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <h3 className="text-gray-400 text-xs font-bold tracking-[0.2em] mb-6 relative z-10">TODAY'S PROGRESS</h3>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 flex-shrink-0 relative group-hover:scale-105 transition-transform duration-500">
            <CircularProgressbar
              value={progress}
              strokeWidth={8}
              styles={buildStyles({
                pathColor: "#A855F7",
                trailColor: "rgba(255,255,255,0.05)",
                strokeLinecap: "round",
                pathTransitionDuration: 1.5,
              })}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white text-xl font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">{progress}%</span>
              <span className="text-gray-500 text-[9px] uppercase tracking-wider font-bold">Done</span>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            {progressLegend.map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 4 }}
                className="flex items-center justify-between cursor-default"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color} ${item.shadow}`} />
                  <span className="text-gray-300 text-xs font-semibold tracking-wide">{item.label}</span>
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



