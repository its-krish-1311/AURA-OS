"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Activity, Zap, BrainCircuit, Target, Clock, ShieldCheck, Database, CheckCircle2 
} from "lucide-react";

interface FusionEnginePanelProps {
  isProcessing: boolean;
  progress: number;
  activeModules: string[];
}

export default function FusionEnginePanel({ isProcessing, progress, activeModules }: FusionEnginePanelProps) {
  
  if (!isProcessing && progress === 0) {
    return (
      <div className="w-full h-[400px] border border-[rgba(255,255,255,0.02)] bg-[rgba(255,255,255,0.01)] rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(168,85,247,0.02)]"></div>
        <BrainCircuit className="w-16 h-16 text-gray-800 mb-4" />
        <h3 className="text-gray-500 font-medium tracking-widest uppercase text-sm">Fusion Engine Standby</h3>
        <p className="text-gray-600 text-xs mt-2">Awaiting your command to orchestrate the intelligence layer.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="krish-glass w-full rounded-3xl p-8 relative overflow-hidden"
    >
      {/* Background glow when processing */}
      {isProcessing && (
         <div className="absolute inset-0 bg-gradient-to-r from-[rgba(168,85,247,0.05)] via-[rgba(59,130,246,0.05)] to-[rgba(6,182,212,0.05)] animate-[pulse_3s_ease-in-out_infinite]"></div>
      )}

      {/* Top Status Bar */}
      <div className="flex items-center justify-between mb-8 relative z-10">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[rgba(168,85,247,0.1)] border border-[rgba(168,85,247,0.3)] flex items-center justify-center">
               <Zap className={`w-5 h-5 text-[#A855F7] ${isProcessing ? 'animate-pulse' : ''}`} />
            </div>
            <div>
               <h3 className="text-white font-bold text-lg">Fusion Engine Orchestrator</h3>
               <p className="text-gray-400 text-xs font-medium tracking-wide">
                 {isProcessing ? "Synthesizing Intent & Assigning Agents..." : "Orchestration Complete"}
               </p>
            </div>
         </div>
         <div className="flex gap-6">
            <div className="text-right">
               <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Confidence</p>
               <p className="text-[#10B981] font-mono font-bold">99.8%</p>
            </div>
            <div className="text-right">
               <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Est. Time</p>
               <p className="text-white font-mono font-bold">1.2s</p>
            </div>
         </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* Left Col: Detected Intent */}
        <motion.div 
           whileHover={{ scale: 1.02 }}
           className="col-span-1 p-5 rounded-2xl krish-glass relative overflow-hidden group"
        >
           {/* Ambient glow */}
           <div className="absolute top-0 right-0 w-24 h-24 bg-[#A855F7] blur-[40px] opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none"></div>
           <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent skew-x-[-25deg] group-hover:animate-[sweep_1s_ease-in-out] z-20 pointer-events-none" />
           <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
              <Target className="w-3 h-3 text-[#A855F7]" /> Detected Intent
           </h4>
           <div className="space-y-4 relative z-10">
              <div>
                 <p className="text-xs text-gray-400 mb-1">Primary Objective</p>
                 <p className="text-white text-sm font-medium">Launch AI Startup & Portfolio</p>
              </div>
              <div className="flex flex-wrap gap-2">
                 {["Business Strategy", "Financial Modeling", "Web Development"].map((tag, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-[rgba(168,85,247,0.15)] border border-[rgba(168,85,247,0.3)] text-white text-[10px] font-bold tracking-wider shadow-[0_2px_10px_rgba(168,85,247,0.2)]">
                       {tag}
                    </span>
                 ))}
              </div>
           </div>
        </motion.div>

        {/* Center Col: Activated Modules */}
        <motion.div 
           whileHover={{ scale: 1.02 }}
           className="col-span-1 p-5 rounded-2xl krish-glass relative overflow-hidden group"
        >
           {/* Ambient glow */}
           <div className="absolute top-0 right-0 w-24 h-24 bg-[#06B6D4] blur-[40px] opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none"></div>
           <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent skew-x-[-25deg] group-hover:animate-[sweep_1s_ease-in-out] z-20 pointer-events-none" />
           <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
              <Database className="w-3 h-3 text-[#06B6D4]" /> Activated Modules
           </h4>
           <div className="flex flex-col gap-2 relative z-10">
              {['Business OS', 'Finance OS', 'Developer OS', 'Marketing OS'].map((mod, i) => {
                 const isActive = activeModules.includes(mod) || !isProcessing;
                 return (
                    <div key={i} className={`flex items-center justify-between p-2 rounded-xl border transition-all ${isActive ? 'bg-[rgba(6,182,212,0.15)] border-[rgba(6,182,212,0.4)] shadow-[0_2px_10px_rgba(6,182,212,0.2)]' : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.05)] opacity-50'}`}>
                       <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>{mod}</span>
                       {isActive ? <CheckCircle2 className="w-3 h-3 text-[#06B6D4]" /> : <Activity className="w-3 h-3 text-gray-600" />}
                    </div>
                 );
              })}
           </div>
        </motion.div>

        {/* Right Col: Live Progress */}
        <motion.div 
           whileHover={{ scale: 1.02 }}
           className="col-span-1 p-5 rounded-2xl krish-glass flex flex-col justify-between relative overflow-hidden group"
        >
           {/* Ambient glow */}
           <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#3B82F6] blur-[50px] opacity-[0.05] group-hover:opacity-[0.2] transition-opacity duration-500 pointer-events-none"></div>
           <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent skew-x-[-25deg] group-hover:animate-[sweep_1s_ease-in-out] z-20 pointer-events-none" />
           <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
              <Clock className="w-3 h-3 text-[#3B82F6]" /> Execution Timeline
           </h4>
           <div className="flex-1 flex items-center justify-center relative z-10">
              <div className="relative w-32 h-32 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                    <circle cx="64" cy="64" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                    <circle cx="64" cy="64" r="60" fill="none" stroke="#A855F7" strokeWidth="4" strokeDasharray="377" strokeDashoffset={377 - (377 * progress) / 100} className="transition-all duration-300 ease-out" />
                 </svg>
                 <div className="absolute text-center">
                    <span className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{Math.round(progress)}%</span>
                 </div>
              </div>
           </div>
        </motion.div>

      </div>

    </motion.div>
  );
}
