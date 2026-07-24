"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Clock, Target, TrendingUp, CheckCircle, Brain, Calendar, ArrowRight, Play, Plus, X } from "lucide-react";
import Link from "next/link";
import { useOSData } from "@/context/OSDataContext";

export default function StudyOSDashboard() {
  const { studyTasks, toggleStudyTask, addStudyTask } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addStudyTask({ id: Date.now().toString(), title: newTaskTitle, done: false });
      setNewTaskTitle("");
      setIsModalOpen(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-transparent p-8 pb-20 max-w-7xl mx-auto w-full relative" style={{'--theme-color': '#F97316', '--theme-color-dark': '#EA580C', '--theme-rgb': '249,115,22', '--theme-rgb-dark': '234,88,12'} as React.CSSProperties}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Krish</h1>
          <p className="text-gray-400 text-sm">You have 2 assignments due this week and 1 upcoming exam.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Plus className="w-4 h-4" /> Add Task
          </button>
          <Link href="/os/study-os/focus" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center gap-2 transition-all">
            <Play className="w-4 h-4 fill-white" /> Start Focus Session
          </Link>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Metric Cards */}
        {[
          { title: "Study Time", value: "14h 30m", sub: "+2h from last week", icon: Clock, color: "text-[#3B82F6]", bg: "bg-[#3B82F6]" },
          { title: "Completion", value: "85%", sub: "12 tasks completed", icon: Target, color: "text-[#10B981]", bg: "bg-[#10B981]" },
          { title: "Current GPA", value: "3.8", sub: "Top 5% of class", icon: TrendingUp, color: "text-[#A855F7]", bg: "bg-[#A855F7]" },
        ].map((metric, i) => (
          <motion.div key={i} variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 ${metric.bg} blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-gray-400 text-sm font-medium mb-1">{metric.title}</h3>
              <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
              <p className="text-xs text-gray-500">{metric.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area: AI Insights & Upcoming */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Tutor Insight */}
          <motion.div variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(59,130,246,0.2)] bg-gradient-to-br from-[rgba(59,130,246,0.05)] to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6] blur-[100px] opacity-10" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#A855F7] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  Aura Tutor Insight
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(59,130,246,0.2)] text-[#3B82F6] border border-[rgba(59,130,246,0.3)]">
                    Smart Analysis
                  </span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Based on your recent performance in Advanced Calculus, I recommend spending 45 minutes on Integration techniques today. Your retention rate drops after 3 days without review.
                </p>
                <div className="flex gap-3">
                  <button className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all border border-[rgba(255,255,255,0.05)]">
                    Generate Quiz
                  </button>
                  <button className="bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-gray-300 px-4 py-2 rounded-lg text-xs font-semibold transition-all">
                    Review Notes
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Active Courses */}
          <motion.div variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Active Courses</h3>
              <Link href="/os/study-os/courses" className="text-sm text-[#3B82F6] hover:text-[#60A5FA] flex items-center gap-1 font-medium transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Advanced Calculus", code: "MAT301", progress: 65, color: "bg-blue-500", grade: "A-" },
                { title: "Data Structures", code: "CS201", progress: 42, color: "bg-purple-500", grade: "B+" },
                { title: "Machine Learning", code: "AI400", progress: 88, color: "bg-emerald-500", grade: "A" },
                { title: "Quantum Physics", code: "PHY350", progress: 25, color: "bg-amber-500", grade: "B" },
              ].map((course, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[10px] font-bold text-gray-500 mb-1 block">{course.code}</span>
                      <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{course.title}</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center text-xs font-bold text-white border border-[rgba(255,255,255,0.05)]">
                      {course.grade}
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                    <div className={`h-full ${course.color} rounded-full`} style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#3B82F6]" /> Up Next
            </h3>
            <div className="space-y-4">
              {[
                { time: "10:00 AM", title: "Calculus Lecture", type: "Class", color: "border-blue-500" },
                { time: "02:00 PM", title: "ML Group Project", type: "Meeting", color: "border-purple-500" },
              ].map((item, idx) => (
                <div key={idx} className={`pl-4 border-l-2 ${item.color} relative`}>
                  <div className="absolute w-2 h-2 rounded-full bg-white -left-[5px] top-1.5" />
                  <p className="text-xs text-gray-400 mb-0.5">{item.time}</p>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#10B981]" /> Daily Goals
              </h3>
              <button onClick={() => setIsModalOpen(true)} className="text-[#3B82F6] hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {studyTasks.map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => toggleStudyTask(task.id)}
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 border transition-all ${task.done ? 'bg-[#10B981] border-[#10B981]' : 'border-[rgba(255,255,255,0.2)] group-hover:border-[#10B981]'}`}>
                    {task.done && <CheckCircle className="w-3 h-3 text-black" />}
                  </div>
                  <p className={`text-sm transition-all ${task.done ? 'text-gray-500 line-through' : 'text-gray-300 group-hover:text-white'}`}>
                    {task.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-transparent/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-transparent border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 shadow-2xl relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-bold text-white mb-6">New Study Task</h2>
              <form onSubmit={handleAddTask}>
                <input 
                  autoFocus required type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} 
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#3B82F6] transition-all mb-4" 
                  placeholder="e.g. Finish Calculus Homework" 
                />
                <button type="submit" className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                  Save Task
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
