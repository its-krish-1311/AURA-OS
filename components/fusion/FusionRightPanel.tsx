"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, Radio, Zap, Calendar, Pin, History, 
  ArrowRight, ShieldCheck, Database, CheckCircle2 
} from "lucide-react";

const quickActions = [
  "Create", "Analyze", "Design", "Deploy", "Summarize"
];

const runningTasks = [
  { name: "Scraping Market Data", agent: "Researcher", progress: 85 },
  { name: "Compiling Assets", agent: "Designer", progress: 40 }
];

export default function FusionRightPanel() {
  return (
    <div className="w-[320px] h-full hidden 2xl:flex flex-col gap-6 p-6 border-l border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)] backdrop-blur-3xl overflow-y-auto custom-scrollbar">
      
      {/* Live AI Activity Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold tracking-widest text-sm flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#06B6D4]" />
          LIVE ACTIVITY
        </h3>
        <span className="w-2 h-2 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4] animate-pulse"></span>
      </div>

      {/* Connected Modules Grid */}
      <div>
        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Core Modules</h4>
        <div className="grid grid-cols-3 gap-2">
           {['Business', 'Finance', 'Design', 'Marketing', 'Dev', 'Security'].map((mod, i) => (
             <motion.div 
               key={i} 
               whileHover={{ scale: 1.05, y: -3 }}
               className="krish-glass p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer group relative overflow-hidden"
             >
               {/* Ambient glow */}
               <div className="absolute top-0 right-0 w-16 h-16 bg-[#A855F7] blur-[30px] opacity-[0.05] group-hover:opacity-[0.2] transition-opacity duration-500 pointer-events-none"></div>
               <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.12)] to-transparent skew-x-[-25deg] group-hover:animate-[sweep_1s_ease-in-out] z-20 pointer-events-none" />
               <Database className="w-4 h-4 text-gray-400 group-hover:text-[#A855F7] mb-1 transition-colors relative z-10" />
               <span className="text-[9px] text-gray-400 font-bold uppercase relative z-10">{mod}</span>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Running Tasks */}
      <div>
        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Running Tasks (2)</h4>
        <div className="flex flex-col gap-3">
          {runningTasks.map((task, i) => (
            <motion.div 
               key={i} 
               whileHover={{ scale: 1.02, x: 2 }}
               className="krish-glass p-4 rounded-2xl relative overflow-hidden group"
            >
               {/* Ambient glow */}
               <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#06B6D4] blur-[30px] opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none"></div>
               <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent skew-x-[-25deg] group-hover:animate-[sweep_1s_ease-in-out] z-20 pointer-events-none" />
               <div className="flex justify-between items-start mb-2 relative z-10">
                 <div>
                   <p className="text-white text-xs font-bold">{task.name}</p>
                   <p className="text-[#A855F7] text-[10px] font-bold tracking-wide">{task.agent}</p>
                 </div>
                 <span className="text-white text-xs font-bold">{task.progress}%</span>
               </div>
               <div className="w-full h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden relative z-10">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${task.progress}%` }}
                    className="h-full bg-gradient-to-r from-[#A855F7] to-[#06B6D4]"
                 />
               </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions Matrix */}
      <div>
        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Quick Inject</h4>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, i) => (
            <motion.button 
              key={i} 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="krish-glass px-4 py-1.5 rounded-full text-xs font-bold text-gray-300 hover:text-white transition-all"
            >
              {action}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Decisions */}
      <div className="mt-auto pt-6 border-t border-[rgba(255,255,255,0.05)]">
        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">AI Decisions Log</h4>
        <div className="flex flex-col gap-3 relative">
          <div className="absolute left-3 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-transparent"></div>
          
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-6 h-6 rounded-full bg-[rgba(16,185,129,0.2)] border border-[rgba(16,185,129,0.5)] flex items-center justify-center shrink-0 mt-0.5">
               <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
            </div>
            <div>
              <p className="text-gray-300 text-xs leading-relaxed">Budget finalized at $25,000 for Q3 Marketing.</p>
              <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-widest">Finance OS • 2m ago</p>
            </div>
          </div>

          <div className="flex items-start gap-4 relative z-10">
            <div className="w-6 h-6 rounded-full bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.5)] flex items-center justify-center shrink-0 mt-0.5">
               <ShieldCheck className="w-3 h-3 text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-gray-300 text-xs leading-relaxed">System scan completed. Zero vulnerabilities.</p>
              <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-widest">Security OS • 15m ago</p>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
