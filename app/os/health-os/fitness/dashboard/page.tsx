"use client";

import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, Activity, Flame, Trophy, Plus, ArrowUpRight, Target } from "lucide-react";
import Link from "next/link";
import { useOSData } from "@/context/OSDataContext";

export default function FitnessOSDashboard() {
  const { healthWorkouts, healthMeals } = useOSData();

  // Calculate volume (Mocked since we don't store individual sets in HealthWorkout)
  const totalVolume = healthWorkouts.length * 12500; // Mock volume based on workout count

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full relative">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
             <Activity className="w-8 h-8 text-[#F43F5E]" /> Fitness Hub
          </h1>
          <p className="text-gray-400 text-sm">Your dedicated gym and trainer command center.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/os/health-os/fitness" className="bg-[#F43F5E] hover:bg-[#E11D48] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(244,63,94,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Log Workout
          </Link>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric Cards */}
        {[
          { title: "Total Volume", value: `${(totalVolume / 1000).toFixed(1)}k`, sub: "lbs moved total", icon: Dumbbell, color: "text-[#F43F5E]", bg: "bg-[#F43F5E]" },
          { title: "Workout Streak", value: "4 Days", sub: "Keep it up!", icon: Flame, color: "text-amber-500", bg: "bg-amber-500" },
          { title: "Latest PR", value: "225 lbs", sub: "Bench Press", icon: Trophy, color: "text-amber-400", bg: "bg-amber-400" },
          { title: "Macro Goal", value: "2400", sub: "Calories Target", icon: Target, color: "text-emerald-500", bg: "bg-emerald-500" },
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
          
          {/* Trainer Advisor */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(244,63,94,0.2)] bg-gradient-to-br from-[rgba(244,63,94,0.05)] to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F43F5E] blur-[100px] opacity-10" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F43F5E] to-[#BE123C] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  AI Trainer Insights
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(244,63,94,0.2)] text-[#F43F5E] border border-[rgba(244,63,94,0.3)]">
                    Overload Required
                  </span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Based on your last 3 workouts, your chest volume has stagnated. I recommend increasing the weight on your Incline Dumbbell Press by 5 lbs today or adding a drop set to stimulate hypertrophy.
                </p>
                <div className="flex gap-3">
                  <Link href="/os/health-os/fitness" className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all border border-[rgba(255,255,255,0.05)]">
                    Adjust Routine
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Diet Overview */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Today's Macro Target</h3>
              <Link href="/os/health-os/diet" className="text-xs text-[#F43F5E] hover:text-[#E11D48] flex items-center gap-1 transition-colors">
                Log Meal <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
               {/* Mock macro trackers for the dashboard */}
               <div className="krish-glass p-4 rounded-2xl border border-[rgba(255,255,255,0.02)] bg-[rgba(255,255,255,0.02)] text-center">
                 <div className="text-2xl font-black text-rose-400 mb-1">160g</div>
                 <div className="text-xs text-gray-500 font-bold uppercase">Protein</div>
               </div>
               <div className="krish-glass p-4 rounded-2xl border border-[rgba(255,255,255,0.02)] bg-[rgba(255,255,255,0.02)] text-center">
                 <div className="text-2xl font-black text-amber-400 mb-1">280g</div>
                 <div className="text-xs text-gray-500 font-bold uppercase">Carbs</div>
               </div>
               <div className="krish-glass p-4 rounded-2xl border border-[rgba(255,255,255,0.02)] bg-[rgba(255,255,255,0.02)] text-center">
                 <div className="text-2xl font-black text-emerald-400 mb-1">65g</div>
                 <div className="text-xs text-gray-500 font-bold uppercase">Fats</div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar: Recent Workouts */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex-1 min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                Recent Training
              </h3>
            </div>
            
            <div className="space-y-4">
              {healthWorkouts.slice(0,4).map((workout) => (
                <div key={workout.id} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] group cursor-pointer hover:border-[rgba(244,63,94,0.3)] transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#F43F5E] transition-colors">{workout.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{workout.duration} mins • {workout.calories} kcal</p>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-rose-400 bg-[rgba(244,63,94,0.1)]`}>
                      {workout.date}
                    </span>
                  </div>
                </div>
              ))}
              
              {healthWorkouts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">No recent workouts logged.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
