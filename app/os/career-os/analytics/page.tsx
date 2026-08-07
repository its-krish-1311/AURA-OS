"use client";

import React from "react";
import { motion } from "framer-motion";
import { PieChart as PieChartIcon, TrendingUp, Target, Briefcase, Filter, ArrowRight, BarChart2 } from "lucide-react";

export default function CareerOSAnalytics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  const funnelData = [
    { stage: "Applications", count: 124, percentage: 100 },
    { stage: "Assessments", count: 45, percentage: 36 },
    { stage: "Interviews", count: 12, percentage: 9.6 },
    { stage: "Offers", count: 2, percentage: 1.6 },
  ];

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <PieChartIcon className="w-8 h-8 text-[#10B981]" /> Career Analytics
          </h1>
          <p className="text-gray-400 text-sm">Track your application conversion rates and market value.</p>
        </div>
        <div className="flex gap-3">
          <button className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Filter className="w-4 h-4" /> Last 90 Days
          </button>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          { title: "Total Applications", value: "124", trend: "+12", icon: Briefcase, color: "text-blue-500" },
          { title: "Response Rate", value: "36%", trend: "+5%", icon: Target, color: "text-emerald-500" },
          { title: "Avg Interview Score", value: "8.5/10", trend: "+1.2", icon: TrendingUp, color: "text-purple-500" },
          { title: "Profile Views", value: "450", trend: "+20%", icon: BarChart2, color: "text-amber-500" },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="krish-glass p-5 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-[rgba(255,255,255,0.03)] ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : stat.trend.startsWith('-') ? 'text-red-500' : 'text-emerald-500'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-400 text-xs font-medium mb-1">{stat.title}</h3>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart: Application Funnel */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-2 krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-white font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#10B981]" /> Application Funnel
            </h3>
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-6 py-4">
            {funnelData.map((stage, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-24 shrink-0 text-right">
                  <h4 className="text-sm font-semibold text-gray-300">{stage.stage}</h4>
                  <p className="text-xs text-gray-500">{stage.count} roles</p>
                </div>
                <div className="flex-1 h-12 bg-[rgba(255,255,255,0.02)] rounded-r-xl border-l-2 border-[rgba(255,255,255,0.05)] overflow-hidden relative group">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.percentage}%` }}
                    transition={{ duration: 1, delay: i * 0.1, type: "spring" as const }}
                    className={`h-full absolute top-0 left-0 bg-gradient-to-r ${
                      i === 0 ? 'from-blue-600/20 to-blue-500' :
                      i === 1 ? 'from-purple-700/20 to-purple-500' :
                      i === 2 ? 'from-emerald-600/20 to-emerald-500' :
                      'from-amber-600/20 to-amber-500'
                    } rounded-r-xl`}
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <span className="text-white font-bold text-sm shadow-sm">{stage.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#3B82F6]" /> Salary Expectations
          </h3>
          
          <div className="flex items-center justify-center p-6 border-4 border-[rgba(255,255,255,0.02)] rounded-full w-48 h-48 mx-auto relative mb-6">
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="8" />
              <motion.circle 
                cx="50" cy="50" r="46" fill="none" 
                stroke="#10B981" 
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray="289"
                strokeDashoffset={289 - (289 * 0.8)} // 80% market match
                initial={{ strokeDashoffset: 289 }}
                animate={{ strokeDashoffset: 289 - (289 * 0.8) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="text-center">
              <div className="text-2xl font-black text-white">$145k</div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-1">Market Avg</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)]">
            <h4 className="text-xs font-bold text-[#10B981] uppercase tracking-wider mb-1">Market Insight</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Based on your 92% interview score average and React skills, you are positioned 15% above the market average. Consider negotiating higher equity.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
