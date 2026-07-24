"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Heart, Moon, Droplets, ArrowUpRight, Plus, Apple } from "lucide-react";
import Link from "next/link";
import { useOSData } from "@/context/OSDataContext";

export default function HealthOSDashboard() {
  const { healthWorkouts, healthMeals } = useOSData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-transparent p-8 pb-20 max-w-7xl mx-auto w-full relative" style={{'--theme-color': '#EF4444', '--theme-color-dark': '#DC2626', '--theme-rgb': '239,68,68', '--theme-rgb-dark': '220,38,38'} as React.CSSProperties}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
             <Heart className="w-8 h-8 text-[#F43F5E]" /> Health Hub
          </h1>
          <p className="text-gray-400 text-sm">Your medical vitals, sleep, and overall wellness.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/os/health-os/fitness/dashboard" className="bg-[#F43F5E] hover:bg-[#E11D48] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(244,63,94,0.5)] flex items-center gap-2 transition-all">
            Switch to Fitness Hub <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric Cards */}
        {[
          { title: "Resting Heart Rate", value: "58", sub: "bpm (Healthy)", icon: Heart, color: "text-[#F43F5E]", bg: "bg-[#F43F5E]" },
          { title: "Daily Steps", value: "8,432", sub: "Goal: 10,000", icon: Activity, color: "text-amber-500", bg: "bg-amber-500" },
          { title: "Sleep Score", value: "88", sub: "7h 42m total", icon: Moon, color: "text-blue-400", bg: "bg-blue-400" },
          { title: "Hydration", value: "1.2L", sub: "Goal: 3.0L", icon: Droplets, color: "text-emerald-500", bg: "bg-emerald-500" },
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
          
          {/* Medical Advisor */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(244,63,94,0.2)] bg-gradient-to-br from-[rgba(244,63,94,0.05)] to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F43F5E] blur-[100px] opacity-10" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F43F5E] to-[#BE123C] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  Aura Wellness Advisor
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(244,63,94,0.2)] text-[#F43F5E] border border-[rgba(244,63,94,0.3)]">
                    Recovery Alert
                  </span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Your sleep score has been consistently above 85 for the past week, resulting in a 5% drop in resting heart rate. However, your hydration is lagging behind today. Drink 2 glasses of water now to maintain optimal cognitive function.
                </p>
                <div className="flex gap-3">
                  <Link href="/os/health-os/sleep" className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all border border-[rgba(255,255,255,0.05)]">
                    View Sleep Analytics
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar: Health Vitals Summary */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex-1 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                Recent Vitals Check
              </h3>
            </div>
            
            <div className="space-y-4">
               <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] flex justify-between items-center">
                 <div>
                   <h4 className="text-sm font-bold text-white">Blood Pressure</h4>
                   <p className="text-xs text-gray-400 mt-0.5">Today, 8:00 AM</p>
                 </div>
                 <div className="text-right">
                   <div className="text-sm font-bold text-emerald-400">118/78</div>
                   <div className="text-[10px] text-gray-500">Normal</div>
                 </div>
               </div>
               
               <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] flex justify-between items-center">
                 <div>
                   <h4 className="text-sm font-bold text-white">Blood Oxygen</h4>
                   <p className="text-xs text-gray-400 mt-0.5">Today, 8:05 AM</p>
                 </div>
                 <div className="text-right">
                   <div className="text-sm font-bold text-emerald-400">99%</div>
                   <div className="text-[10px] text-gray-500">Normal</div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
