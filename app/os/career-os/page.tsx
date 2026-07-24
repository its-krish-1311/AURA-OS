"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, TrendingUp, CheckCircle, Brain, Calendar, ArrowRight, Target, Plus, X } from "lucide-react";
import Link from "next/link";
import { useOSData } from "@/context/OSDataContext";

export default function CareerOSDashboard() {
  const { careerTasks, toggleCareerTask, addCareerTask } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addCareerTask({ id: Date.now().toString(), title: newTaskTitle, done: false });
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
    <div className="min-h-screen bg-transparent p-8 pb-20 max-w-7xl mx-auto w-full relative" style={{'--theme-color': '#3B82F6', '--theme-color-dark': '#2563EB', '--theme-rgb': '59,130,246', '--theme-rgb-dark': '37,99,235'} as React.CSSProperties}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Career Dashboard</h1>
          <p className="text-gray-400 text-sm">You have 2 interviews this week and 5 active applications.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Plus className="w-4 h-4" /> Add Action
          </button>
          <Link href="/os/career-os/jobs" className="bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-2 transition-all">
            <Briefcase className="w-4 h-4" /> View Job Tracker
          </Link>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Metric Cards */}
        {[
          { title: "Active Applications", value: "12", sub: "+3 this week", icon: Briefcase, color: "text-[#3B82F6]", bg: "bg-[#3B82F6]" },
          { title: "Interview Rate", value: "42%", sub: "Top 10% of candidates", icon: Target, color: "text-[#10B981]", bg: "bg-[#10B981]" },
          { title: "Market Value", value: "$145k", sub: "+$20k vs current", icon: TrendingUp, color: "text-[#A855F7]", bg: "bg-[#A855F7]" },
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
        {/* Main Content Area: AI Insights & Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Career Coach Insight */}
          <motion.div variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(16,185,129,0.2)] bg-gradient-to-br from-[rgba(16,185,129,0.05)] to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981] blur-[100px] opacity-10" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  Career Coach Insight
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(16,185,129,0.2)] text-[#10B981] border border-[rgba(16,185,129,0.3)]">
                    Actionable
                  </span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  You have a final round interview with Stripe in 3 days. Based on your previous mock interviews, you should focus on practicing System Design scalability concepts.
                </p>
                <div className="flex gap-3">
                  <Link href="/os/career-os/interviews" className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all border border-[rgba(255,255,255,0.05)]">
                    Start Mock Interview
                  </Link>
                  <Link href="/os/career-os/ai" className="bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-gray-300 px-4 py-2 rounded-lg text-xs font-semibold transition-all">
                    Ask For Advice
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Active Pipeline */}
          <motion.div variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Active Pipeline</h3>
              <Link href="/os/career-os/jobs" className="text-sm text-[#10B981] hover:text-[#34D399] flex items-center gap-1 font-medium transition-colors">
                View Kanban <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {[
                { company: "Google", role: "Frontend Engineer", status: "Interviewing", date: "Oct 22", color: "text-blue-400", bg: "bg-[rgba(59,130,246,0.1)]" },
                { company: "Stripe", role: "Full Stack Developer", status: "Final Round", date: "Oct 15", color: "text-purple-400", bg: "bg-[rgba(168,85,247,0.1)]" },
                { company: "Vercel", role: "UI/UX Engineer", status: "Applied", date: "Oct 18", color: "text-gray-400", bg: "bg-[rgba(255,255,255,0.05)]" },
              ].map((job, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.05)] flex items-center justify-center font-bold text-white border border-[rgba(255,255,255,0.1)]">
                      {job.company[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">{job.company}</h4>
                      <p className="text-xs text-[#10B981] font-semibold">{job.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${job.bg} ${job.color}`}>
                      {job.status}
                    </span>
                    <p className="text-[10px] text-gray-500 mt-2">Updated {job.date}</p>
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
              <Calendar className="w-4 h-4 text-[#10B981]" /> Up Next
            </h3>
            <div className="space-y-4">
              {[
                { time: "Today, 2:00 PM", title: "Mock Interview Prep", type: "Prep", color: "border-emerald-500" },
                { time: "Tomorrow, 10:00 AM", title: "Recruiter Call (Meta)", type: "Call", color: "border-blue-500" },
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
                <CheckCircle className="w-4 h-4 text-[#10B981]" /> Action Items
              </h3>
              <button onClick={() => setIsModalOpen(true)} className="text-[#10B981] hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {careerTasks.map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => toggleCareerTask(task.id)}
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

      {/* Add Action Item Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">New Action Item</h2>
              <form onSubmit={handleAddTask}>
                <input 
                  autoFocus required type="text" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} 
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#10B981] transition-all mb-4" 
                  placeholder="e.g. Update Resume for Stripe" 
                />
                <button type="submit" className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                  Save Action
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
