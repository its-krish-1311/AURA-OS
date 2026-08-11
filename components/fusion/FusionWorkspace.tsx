"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FusionEnginePanel from "./FusionEnginePanel";
import { 
  Database, Shield, Wallet, BrainCircuit, Activity, Settings, Power, 
  BarChart2, Server, Heart, ShoppingCart
} from "lucide-react";

export default function FusionWorkspace() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeModules, setActiveModules] = useState<string[]>([]);

  // Simulation effect for demo purposes when "Command" triggers.
  // In a real scenario, this state would be lifted to a context or passed from the header's command bar.
  // For now, we simulate an active state by default to show off the UI.
  useEffect(() => {
    setIsProcessing(true);
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress === 20) setActiveModules(prev => [...prev, "Neural OS"]);
      if (currentProgress === 40) setActiveModules(prev => [...prev, "Business OS"]);
      if (currentProgress === 60) setActiveModules(prev => [...prev, "Finance OS"]);
      if (currentProgress === 80) setActiveModules(prev => [...prev, "Developer OS"]);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const agents = [
    { name: "Researcher", task: "Market Analysis", priority: "High", mem: "1.2GB", status: "Active" },
    { name: "Designer", task: "UI Mockups", priority: "Medium", mem: "800MB", status: "Active" },
    { name: "Coder", task: "API Integration", priority: "High", mem: "2.4GB", status: "Active" },
    { name: "Analyst", task: "Risk Assessment", priority: "Low", mem: "500MB", status: "Paused" }
  ];

  const modules = [
    { name: "Business OS", icon: BarChart2, health: "100%", status: "Connected", color: "text-[#3B82F6]" },
    { name: "Finance OS", icon: Wallet, health: "98%", status: "Connected", color: "text-[#10B981]" },
    { name: "Developer OS", icon: Server, health: "100%", status: "Connected", color: "text-[#F59E0B]" },
    { name: "Security OS", icon: Shield, health: "100%", status: "Guarding", color: "text-[#EF4444]" },
    { name: "Health OS", icon: Heart, health: "95%", status: "Standby", color: "text-[#F43F5E]" },
    { name: "Marketing OS", icon: ShoppingCart, health: "99%", status: "Standby", color: "text-[#8B5CF6]" },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8 relative">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A855F7] rounded-full blur-[250px] opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Top: Orchestration Engine Panel */}
        <section>
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-white font-bold text-xl tracking-wide">Dynamic AI Workspace</h2>
             <span className="px-3 py-1 bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.3)] rounded-full text-[#06B6D4] text-[10px] uppercase font-bold tracking-widest">
               Sync: Optimal
             </span>
          </div>
          <FusionEnginePanel isProcessing={isProcessing} progress={progress} activeModules={activeModules} />
        </section>

        {/* Middle: Connected Modules Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 font-bold text-sm tracking-widest uppercase">Module Activation</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {modules.map((mod, i) => (
              <motion.div 
                 key={i} 
                 whileHover={{ scale: 1.03, y: -5 }}
                 whileTap={{ scale: 0.98 }}
                 className="krish-glass rounded-full p-4 flex items-center gap-4 transition-all cursor-pointer group relative overflow-hidden z-10"
              >
                 <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.12)] to-transparent skew-x-[-25deg] group-hover:animate-[sweep_1s_ease-in-out] z-20 pointer-events-none" />
                 
                 <div className="relative flex-shrink-0">
                   <div className="absolute inset-0 bg-white blur-[15px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full"></div>
                   <div className={`relative w-12 h-12 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] group-hover:border-[rgba(255,255,255,0.6)] transition-all duration-300 z-10 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] ${mod.color}`}>
                      <mod.icon className="w-5 h-5" />
                   </div>
                 </div>
                 
                 <div className="flex-1 z-10">
                    <h3 className="text-white text-sm font-bold tracking-wide group-hover:text-[#A855F7] transition-colors">{mod.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-400 font-medium">{mod.status}</span>
                      <span className="text-gray-600 text-[10px]">•</span>
                      <span className="text-[10px] text-[#10B981] font-bold">{mod.health}</span>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bottom: Active AI Agents */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 font-bold text-sm tracking-widest uppercase">Deployed AI Agents</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {agents.map((agent, i) => (
              <motion.div 
                 key={i} 
                 whileHover={{ scale: 1.02, y: -5 }}
                 whileTap={{ scale: 0.98 }}
                 className={`krish-glass rounded-[26px] p-5 transition-all group relative overflow-hidden z-10 border ${agent.status === 'Active' ? 'border-[rgba(168,85,247,0.2)] hover:border-[rgba(168,85,247,0.4)] shadow-[0_0_15px_rgba(168,85,247,0.05)] hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]' : 'border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)]'}`}
              >
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.12)] to-transparent skew-x-[-25deg] group-hover:animate-[sweep_1s_ease-in-out] z-20 pointer-events-none" />
                
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] overflow-hidden">
                      <BrainCircuit className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold tracking-wide">{agent.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Active' ? 'bg-[#10B981] animate-pulse' : 'bg-amber-500'}`}></span>
                        <p className="text-[10px] text-gray-400 font-medium tracking-wider">{agent.status}</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center transition-colors">
                    <Settings className="w-4 h-4 text-gray-300" />
                  </button>
                </div>
                
                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between items-center bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.05)] p-2.5 rounded-xl">
                    <span className="text-[11px] text-gray-400 font-medium tracking-wide">Current Task</span>
                    <span className="text-xs text-white font-bold">{agent.task}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.05)] p-2.5 rounded-xl">
                    <span className="text-[11px] text-gray-400 font-medium tracking-wide">Priority</span>
                    <span className={`text-xs font-bold ${agent.priority === 'High' ? 'text-[#EF4444]' : agent.priority === 'Medium' ? 'text-[#F59E0B]' : 'text-[#A855F7]'}`}>{agent.priority}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.05)] p-2.5 rounded-xl">
                    <span className="text-[11px] text-gray-400 font-medium tracking-wide">Memory Usage</span>
                    <span className="text-xs text-white font-mono font-medium">{agent.mem}</span>
                  </div>
                </div>

                <div className="mt-5 flex gap-3 relative z-10">
                  <button className="flex-1 py-2.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white text-xs font-bold tracking-wider hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all">
                    Assign Task
                  </button>
                  <button className="w-11 flex items-center justify-center rounded-full krish-glass text-gray-300 hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.1)] hover:border-[rgba(239,68,68,0.2)] hover:shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all">
                    <Power className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
