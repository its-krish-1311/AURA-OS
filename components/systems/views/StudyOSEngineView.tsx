"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, BookOpen, Activity, Play, CheckCircle2, TrendingUp, Calendar } from "lucide-react";
import { ThemeEngine } from "@/lib/systems/ThemeEngine";
import { TelemetryEngine } from "@/lib/systems/TelemetryEngine";

export default function StudyOSEngineView() {
  const theme = ThemeEngine.getGlassmorphism();
  const physics = ThemeEngine.getPhysics();
  const gradients = ThemeEngine.getCoreGradients();

  const activeCourses = [
    { title: "Advanced System Design", progress: 68, color: "from-blue-500 to-cyan-400" },
    { title: "Quantum Computing Basics", progress: 34, color: "from-purple-500 to-pink-500" },
    { title: "Neuroscience 101", progress: 89, color: "from-emerald-400 to-teal-500" },
  ];

  return (
    <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 p-6 max-w-[90rem] mx-auto">
      
      {/* Left Column: Aura AI Tutor */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`${theme.premium} p-8 rounded-[2rem] flex flex-col items-center text-center relative overflow-hidden h-full`}>
          <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-30 ${gradients.primary}`}></div>
          
          <div className="w-24 h-24 rounded-full bg-[rgba(168,85,247,0.1)] border border-[rgba(168,85,247,0.3)] flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 rounded-full border border-[#A855F7] animate-[spin_4s_linear_infinite] opacity-50"></div>
            <BrainCircuit className="w-12 h-12 text-[#A855F7] drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
          </div>
          
          <h2 className="text-2xl font-black text-white mb-2">Aura Tutor</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            I've analyzed your upcoming schedule. You have a System Design mock interview in 3 days. Shall we start a targeted review session?
          </p>
          
          <div className="w-full space-y-3 mt-auto">
            <motion.button {...physics} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7E22CE] to-[#A855F7] text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              Start Session
            </motion.button>
            <motion.button {...physics} className="w-full py-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] text-gray-300 font-bold hover:text-white hover:bg-[rgba(255,255,255,0.05)]">
              View Schedule
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Center Column: Active Courses & Learning Paths */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${theme.base} p-8 rounded-[2.5rem] relative overflow-hidden flex-1`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl text-white font-bold flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-[#06B6D4]" />
              Active Courses
            </h2>
            <button className="text-[#A855F7] text-sm font-bold hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {activeCourses.map((course, idx) => (
              <motion.div key={idx} {...physics} className="p-6 rounded-2xl bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)] cursor-pointer group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-10 group-hover:opacity-30 transition-opacity bg-gradient-to-br ${course.color}`}></div>
                <h3 className="text-white font-bold text-lg mb-4">{course.title}</h3>
                
                <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-2 mb-2">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${course.color} shadow-[0_0_10px_currentColor]`} style={{ width: `${course.progress}%` }}></div>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-500">
                  <span>Progress</span>
                  <span className="text-white">{course.progress}%</span>
                </div>
              </motion.div>
            ))}
            
            {/* Add New Course Button */}
            <motion.div {...physics} className="p-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-dashed border-[rgba(255,255,255,0.1)] hover:border-[#A855F7] cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:text-[#A855F7] transition-colors min-h-[160px]">
              <span className="text-4xl mb-2">+</span>
              <span className="font-bold">Add Course</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Study Telemetry & GPA */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`${theme.premium} p-6 rounded-[2rem] flex-1 flex flex-col`}>
          <h3 className="text-white font-bold mb-6 tracking-wide flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#10B981]" /> Study Metrics
          </h3>
          
          <div className="space-y-4 flex-1">
            <div className="p-5 rounded-2xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)]">
               <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-1">Today's Focus</p>
               <div className="flex items-end gap-2">
                 <p className="text-3xl font-black text-white">4.2<span className="text-lg text-gray-400">h</span></p>
                 <TrendingUp className="w-5 h-5 text-[#10B981] mb-1" />
               </div>
            </div>
            
            <div className="p-5 rounded-2xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] relative overflow-hidden group">
               <div className={`absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity bg-[#A855F7]`}></div>
               <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-1">Current GPA</p>
               <p className="text-4xl font-black text-white">3.94</p>
            </div>

            <div className="p-5 rounded-2xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] flex items-center gap-4 cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors">
               <div className="w-10 h-10 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center">
                 <Calendar className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-sm font-bold text-white">Upcoming Exam</p>
                 <p className="text-xs text-gray-400">Physics - Oct 12</p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
