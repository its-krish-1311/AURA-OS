"use client";

import React from "react";
import { motion } from "framer-motion";
import { Moon, Sunrise, Sunset, Clock, Activity, Brain } from "lucide-react";

export default function HealthOSSleep() {
  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Moon className="w-8 h-8 text-blue-500" /> Sleep & Recovery
          </h1>
          <p className="text-gray-400 text-sm">Analyze your sleep cycles and optimize your circadian rhythm.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Main Analytics */}
        <div className="lg:col-span-2 space-y-6 overflow-y-auto custom-scrollbar pr-2">
          
          {/* Last Night's Sleep */}
          <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-xl font-bold text-white">Last Night</h2>
                <p className="text-gray-400 text-sm">Oct 20, 2026</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-blue-400">85</div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Sleep Score</div>
              </div>
            </div>

            <div className="relative h-32 w-full mb-6 flex items-end gap-1">
              {/* Mock Sleep Cycle Graph */}
              {[4,2,3,1,4,2,3,1,4,2,3,4,3,2,1,4,3,2,3,4].map((stage, i) => (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${stage * 25}%` }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className={`flex-1 rounded-t-sm ${
                    stage === 4 ? 'bg-[rgba(59,130,246,0.2)]' : // Awake/Light
                    stage === 3 ? 'bg-[rgba(59,130,246,0.5)]' : // REM
                    'bg-blue-500' // Deep
                  }`}
                />
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1"><Sunset className="w-3 h-3" /> 11:30 PM</span>
              <span className="flex items-center gap-1"><Sunrise className="w-3 h-3" /> 6:45 AM</span>
            </div>
          </div>

          {/* Sleep Stages */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Deep Sleep", value: "1h 45m", pct: "24%", color: "text-blue-500" },
              { label: "REM Sleep", value: "2h 10m", pct: "30%", color: "text-indigo-400" },
              { label: "Light Sleep", value: "3h 05m", pct: "42%", color: "text-blue-300" },
              { label: "Awake", value: "0h 15m", pct: "4%", color: "text-gray-400" },
            ].map((stage, i) => (
              <div key={i} className="krish-glass p-4 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-transparent">
                <div className="text-xs text-gray-400 mb-1">{stage.label}</div>
                <div className={`text-lg font-bold ${stage.color}`}>{stage.value}</div>
                <div className="text-[10px] text-gray-500">{stage.pct} of total</div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Sidebar: AI Recovery Coach */}
        <div className="space-y-6">
          <div className="krish-glass p-6 rounded-3xl border border-[rgba(59,130,246,0.2)] bg-gradient-to-b from-[rgba(59,130,246,0.05)] to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold">Recovery Insights</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Your Deep Sleep increased by 15% compared to yesterday. However, you woke up 3 times during the REM cycle.
              <br/><br/>
              <strong>Recommendation:</strong> Avoid blue light screens 1 hour before bed tonight to improve REM continuity.
            </p>
          </div>

          <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <h3 className="text-white font-bold mb-4">Weekly Trend</h3>
            <div className="space-y-3">
              {[
                { day: "Mon", score: 85 },
                { day: "Tue", score: 92 },
                { day: "Wed", score: 78 },
                { day: "Thu", score: 88 },
                { day: "Fri", score: 75 },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-xs text-gray-400 w-8">{d.day}</div>
                  <div className="flex-1 h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${d.score}%` }} />
                  </div>
                  <div className="text-xs font-bold text-white w-6">{d.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
