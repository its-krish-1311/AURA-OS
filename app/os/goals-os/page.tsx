"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Zap, ActivitySquare, ArrowUpRight, Flame, Trophy } from "lucide-react";
import Link from "next/link";
import { useOSData } from "@/context/OSDataContext";

export default function GoalsOSDashboard() {
  const { goalsOkrs, goalsHabits } = useOSData();

  const totalOkrs = goalsOkrs.length;
  const avgOkrProgress = totalOkrs > 0 ? Math.round(goalsOkrs.reduce((acc, okr) => acc + okr.progress, 0) / totalOkrs) : 0;
  
  const activeHabits = goalsHabits.filter(h => h.streak > 0).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-transparent p-8 pb-20 max-w-7xl mx-auto w-full relative" style={{'--theme-color': '#22C55E', '--theme-color-dark': '#16A34A', '--theme-rgb': '34,197,94', '--theme-rgb-dark': '22,163,74'} as React.CSSProperties}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
             <Target className="w-8 h-8 text-[#E11D48]" /> Mission Control
          </h1>
          <p className="text-gray-400 text-sm">Your command center for ambition and long-term vision.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/os/goals-os/vision" className="bg-[#E11D48] hover:bg-[#BE123C] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(225,29,72,0.5)] flex items-center gap-2 transition-all">
            View Vision Board <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric Cards */}
        {[
          { title: "Overall Progress", value: `${avgOkrProgress}%`, sub: "Across all OKRs", icon: ActivitySquare, color: "text-[#E11D48]", bg: "bg-[#E11D48]" },
          { title: "Active OKRs", value: totalOkrs.toString(), sub: "Goals in motion", icon: Target, color: "text-amber-500", bg: "bg-amber-500" },
          { title: "Habits Tracked", value: activeHabits.toString(), sub: "Consistent daily actions", icon: Flame, color: "text-emerald-500", bg: "bg-emerald-500" },
          { title: "Focus Quarter", value: "Q4", sub: "Oct - Dec 2026", icon: Zap, color: "text-blue-500", bg: "bg-blue-500" },
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
              <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
              <p className="text-xs text-gray-500">{metric.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Advisor */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(225,29,72,0.2)] bg-gradient-to-br from-[rgba(225,29,72,0.05)] to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E11D48] blur-[100px] opacity-10" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E11D48] to-[#9F1239] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(225,29,72,0.4)]">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  Aura Executive Coach
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(225,29,72,0.2)] text-[#E11D48] border border-[rgba(225,29,72,0.3)]">
                    Momentum Warning
                  </span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  You are tracking well against your Q4 objective "Achieve Peak Physical Fitness", but your key result "Track macros 6 days/week" is falling behind. Let's refocus on that specific micro-habit today to maintain overall momentum.
                </p>
                <div className="flex gap-3">
                  <Link href="/os/goals-os/okrs" className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all border border-[rgba(255,255,255,0.05)]">
                    Review OKRs
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Active OKRs */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2"><Trophy className="w-5 h-5 text-[#E11D48]" /> Active Objectives</h3>
              <Link href="/os/goals-os/okrs" className="text-xs text-[#E11D48] hover:text-[#BE123C] flex items-center gap-1 transition-colors">
                Manage <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            
            <div className="space-y-4">
               {goalsOkrs.map(okr => (
                 <div key={okr.id} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-sm font-bold text-white">{okr.objective}</span>
                     <span className="text-xs font-bold text-[#E11D48]">{okr.progress}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                     <div className="h-full bg-[#E11D48] rounded-full transition-all duration-1000" style={{ width: `${okr.progress}%` }} />
                   </div>
                 </div>
               ))}
               {goalsOkrs.length === 0 && (
                 <p className="text-sm text-gray-500">No active OKRs set for this quarter.</p>
               )}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar: Micro Habits */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex-1 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                Daily Habits
              </h3>
              <Link href="/os/goals-os/habits" className="text-xs text-gray-400 hover:text-white transition-colors">
                View All
              </Link>
            </div>
            
            <div className="space-y-3">
               {goalsHabits.map((habit) => (
                 <div key={habit.id} className="p-3 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] flex justify-between items-center">
                   <div>
                     <h4 className="text-sm font-bold text-white">{habit.name}</h4>
                     <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                       <Flame className="w-3 h-3 text-amber-500" /> {habit.streak} day streak
                     </p>
                   </div>
                   <div className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
                     {habit.lastCompletedDate === new Date().toISOString().split('T')[0] ? (
                       <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                     ) : null}
                   </div>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
