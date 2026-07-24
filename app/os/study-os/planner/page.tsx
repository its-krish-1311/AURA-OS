"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, List, Grid, CheckCircle2, AlertCircle } from "lucide-react";

export default function StudyOSPlanner() {
  const [view, setView] = useState<"calendar" | "list">("calendar");

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = Array.from({ length: 35 }, (_, i) => i - 2); // Mock month grid starting slightly before 1st

  const events = [
    { date: 15, title: "MAT301 Midterm", type: "exam", color: "bg-red-500" },
    { date: 15, title: "Study Group", type: "meeting", color: "bg-blue-500" },
    { date: 18, title: "CS201 Project Due", type: "deadline", color: "bg-orange-500" },
    { date: 22, title: "ML Quiz", type: "exam", color: "bg-emerald-500" },
  ];

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-[#3B82F6]" /> Study Planner
          </h1>
          <p className="text-gray-400 text-sm">Schedule study sessions, track exams, and manage deadlines.</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-xl p-1">
            <button 
              onClick={() => setView("calendar")}
              className={`p-2 rounded-lg transition-colors ${view === "calendar" ? "bg-[rgba(255,255,255,0.1)] text-white" : "text-gray-500 hover:text-white"}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-[rgba(255,255,255,0.1)] text-white" : "text-gray-500 hover:text-white"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> New Event
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* Main Calendar View */}
        <div className="flex-1 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col overflow-hidden">
          {/* Calendar Header */}
          <div className="p-6 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">October 2026</h2>
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:text-white rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors border border-[rgba(255,255,255,0.05)]">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors border border-[rgba(255,255,255,0.05)]">
                Today
              </button>
              <button className="p-2 text-gray-500 hover:text-white rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors border border-[rgba(255,255,255,0.05)]">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 flex flex-col p-4">
            <div className="grid grid-cols-7 gap-4 mb-4">
              {days.map(day => (
                <div key={day} className="text-center text-xs font-bold text-gray-500 uppercase tracking-wider">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2 lg:gap-4 flex-1">
              {dates.map((date, idx) => {
                const isCurrentMonth = date > 0 && date <= 31;
                const isToday = date === 15;
                const dayEvents = events.filter(e => e.date === date);

                return (
                  <div 
                    key={idx} 
                    className={`rounded-2xl p-2 lg:p-3 border transition-all ${
                      isCurrentMonth 
                        ? isToday 
                          ? 'border-[#3B82F6] bg-[rgba(59,130,246,0.1)]' 
                          : 'border-[rgba(255,255,255,0.03)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.1)]'
                        : 'border-transparent opacity-30'
                    }`}
                  >
                    <div className={`text-sm font-bold mb-2 ${isToday ? 'text-[#3B82F6]' : 'text-gray-400'}`}>
                      {isCurrentMonth ? date : (date <= 0 ? 30 + date : date - 31)}
                    </div>
                    
                    <div className="space-y-1">
                      {isCurrentMonth && dayEvents.map((e, i) => (
                        <div key={i} className={`text-[10px] px-2 py-1 rounded-md font-semibold truncate text-white ${e.color} bg-opacity-80`}>
                          {e.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar: AI Scheduling */}
        <div className="w-[320px] shrink-0 flex flex-col gap-6 hidden xl:flex">
          <div className="krish-glass p-6 rounded-3xl border border-[rgba(59,130,246,0.2)] bg-gradient-to-b from-[rgba(59,130,246,0.05)] to-transparent">
            <h2 className="text-white font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" /> AI Auto-Schedule
            </h2>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              I noticed you have a MAT301 midterm on the 15th. Would you like me to automatically block out 2 hours of study time every evening this week?
            </p>
            <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2.5 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all">
              Apply Schedule
            </button>
          </div>

          <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex-1 overflow-y-auto custom-scrollbar">
            <h2 className="text-white font-bold mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {[
                { title: "CS201 Project", days: "3 days left", priority: "High" },
                { title: "PHY350 Lab Report", days: "5 days left", priority: "Medium" },
              ].map((task, i) => (
                <div key={i} className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)]">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold text-gray-200">{task.title}</h3>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${task.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {task.days}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
