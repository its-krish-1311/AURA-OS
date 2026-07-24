"use client";

import React from "react";
import { motion } from "framer-motion";
import { PieChart as PieChartIcon, TrendingUp, Clock, Target, Calendar, Award, BarChart2 } from "lucide-react";

export default function StudyOSAnalytics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  // Mock data for weekly study hours
  const weeklyData = [
    { day: "Mon", hours: 4.5, max: 8 },
    { day: "Tue", hours: 6.2, max: 8 },
    { day: "Wed", hours: 5.0, max: 8 },
    { day: "Thu", hours: 7.5, max: 8 },
    { day: "Fri", hours: 3.5, max: 8 },
    { day: "Sat", hours: 2.0, max: 8 },
    { day: "Sun", hours: 5.5, max: 8 },
  ];

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <PieChartIcon className="w-8 h-8 text-[#3B82F6]" /> Analytics & Insights
          </h1>
          <p className="text-gray-400 text-sm">Visualize your academic performance and study habits.</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-2 outline-none focus:border-[#3B82F6] transition-all cursor-pointer">
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
            <option>This Semester</option>
          </select>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          { title: "Total Study Time", value: "34h 15m", trend: "+12%", icon: Clock, color: "text-blue-500" },
          { title: "Tasks Completed", value: "42", trend: "+5", icon: Target, color: "text-emerald-500" },
          { title: "Average Focus", value: "85%", trend: "-2%", icon: Target, color: "text-purple-500" },
          { title: "Current Streak", value: "14 Days", trend: "Personal Best", icon: Award, color: "text-amber-500" },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="krish-glass p-5 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-[rgba(255,255,255,0.03)] ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : stat.trend.startsWith('-') ? 'text-red-500' : 'text-amber-500'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-400 text-xs font-medium mb-1">{stat.title}</h3>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Study Hours */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-2 krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-white font-bold flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#3B82F6]" /> Study Hours Over Time
            </h3>
            <span className="text-xs text-gray-500 font-medium">Goal: 40h / week</span>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-2 pt-10 relative">
            {/* Background Grid Lines (Fake) */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="w-full border-b border-[rgba(255,255,255,0.02)]" />
              ))}
            </div>

            {/* Bars */}
            {weeklyData.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-3 w-full group z-10">
                <div className="w-full flex justify-center h-[200px] items-end relative">
                  {/* Tooltip */}
                  <div className="absolute -top-10 bg-[rgba(255,255,255,0.1)] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.hours}h
                  </div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.hours / d.max) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.1, type: "spring" as const }}
                    className="w-1/2 max-w-[40px] bg-gradient-to-t from-[#3B82F6]/20 to-[#3B82F6] rounded-t-lg border border-[rgba(59,130,246,0.5)] border-b-0 group-hover:from-[#3B82F6]/40 group-hover:to-[#60A5FA] transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent" />
                  </motion.div>
                </div>
                <span className="text-xs text-gray-500 font-medium group-hover:text-white transition-colors">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Sidebar: Subject Breakdown */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-[#A855F7]" /> Subject Breakdown
          </h3>
          
          <div className="space-y-6">
            {[
              { subject: "Advanced Calculus", hours: 12.5, percent: 36, color: "bg-blue-500" },
              { subject: "Machine Learning", hours: 10.2, percent: 30, color: "bg-emerald-500" },
              { subject: "Data Structures", hours: 8.0, percent: 23, color: "bg-purple-500" },
              { subject: "Philosophy", hours: 3.5, percent: 11, color: "bg-rose-500" },
            ].map((sub, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">{sub.subject}</h4>
                    <p className="text-xs text-gray-500">{sub.hours} hours</p>
                  </div>
                  <span className="text-sm font-bold text-white">{sub.percent}%</span>
                </div>
                <div className="w-full h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${sub.percent}%` }}
                    transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                    className={`h-full ${sub.color} rounded-full`} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-[rgba(168,85,247,0.1)] border border-[rgba(168,85,247,0.2)]">
            <h4 className="text-xs font-bold text-[#A855F7] uppercase tracking-wider mb-1">Aura Insight</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              You've spent 15% more time on Calculus this week compared to last week. Your mock exam scores predict an A grade! Keep it up.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
