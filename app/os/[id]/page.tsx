"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, LayoutDashboard, BrainCircuit, Activity, Clock, Zap, CheckCircle2,
  FileText, Code, Globe, Play, MonitorSmartphone, Settings, Shield
} from "lucide-react";
import LivingBackground from "@/components/background/LivingBackground";
import { ThemeEngine } from "@/lib/systems/ThemeEngine";
import { LogicEngine } from "@/lib/systems/LogicEngine";
import { TelemetryEngine } from "@/lib/systems/TelemetryEngine";
import StudyOSEngineView from "@/components/systems/views/StudyOSEngineView";

const osMap: Record<string, string> = {
  "study-os": "Study OS",
  "career-os": "Career OS",
  "health-os": "Health OS",
  "finance-os": "Finance OS",
  "travel-os": "Travel OS",
  "developer-os": "Developer OS",
};

export default function OsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const rawId = resolvedParams.id || "";
  const osName = osMap[rawId] || rawId.replace("-", " ");
  
  // Dynamic layout rendering using our Core Engines
  const theme = ThemeEngine.getGlassmorphism();
  const physics = ThemeEngine.getPhysics();
  const gradients = ThemeEngine.getCoreGradients();

  const [activeTasks] = useState([
    { id: 1, title: "Initialize Environment", status: "Done" },
    { id: 2, title: "Sync Data Sources", status: "In Progress" },
    { id: 3, title: "Load AI Models", status: "Pending" }
  ]);

  return (
    <div className="min-h-screen w-full bg-transparent relative flex flex-col overflow-hidden">
      <div className="fixed inset-0 z-0">
        <LivingBackground />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full p-6 flex justify-between items-center z-50 relative"
      >
        <button 
          onClick={() => router.push("/")}
          className={`${theme.premium} px-5 py-2.5 rounded-full flex items-center gap-2 hover:text-white text-gray-300 transition-all font-medium cursor-pointer`}
          {...physics}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-bold tracking-wide">Back to Home</span>
        </button>
        <div className={`${theme.premium} px-5 py-2.5 rounded-full flex items-center gap-3`}>
          <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse shadow-[0_0_10px_rgba(126,34,206,0.8)]"></span>
          <span className="text-white font-bold tracking-wide">{osName}</span>
        </div>
      </motion.div>

      {/* Dashboard Layout */}
      {rawId === 'study-os' ? (
        <StudyOSEngineView />
      ) : (
        <div className="flex-1 max-w-7xl mx-auto w-full p-6 z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
          
          {/* Left Column: Quick Access (Apps) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`${theme.base} p-6 rounded-[2rem] h-full`}>
              <h3 className="text-white font-bold mb-6 tracking-wide flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-[#A855F7]" /> Modules
              </h3>
              <div className="flex flex-col gap-4">
                {['Workspace', 'Analytics', 'Settings', 'Security'].map((item, i) => (
                  <motion.div key={i} {...physics} className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(168,85,247,0.3)] hover:bg-[rgba(168,85,247,0.05)] cursor-pointer transition-colors flex items-center gap-3 group">
                     <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center group-hover:bg-[#A855F7] transition-colors">
                       <Shield className="w-4 h-4 text-gray-400 group-hover:text-white" />
                     </div>
                     <span className="text-sm font-semibold text-gray-300 group-hover:text-white">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Center Column: Logic Engine / Active Workflows */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${theme.premium} p-8 rounded-[2.5rem] relative overflow-hidden flex-1`}>
              <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20 ${gradients.primary}`}></div>
              <h2 className="text-2xl text-white font-bold mb-2">Engine Orchestrator</h2>
              <p className="text-gray-400 text-sm mb-8">Processing tasks through the LogicEngine dynamically.</p>
              
              <div className="space-y-4">
                {activeTasks.map((task) => (
                  <motion.div key={task.id} {...physics} className="p-5 rounded-2xl bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.05)] flex justify-between items-center cursor-pointer hover:border-[#A855F7]">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${task.status === 'Done' ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#A855F7]/20 text-[#A855F7]'}`}>
                        {task.status === 'Done' ? <CheckCircle2 className="w-5 h-5" /> : <Zap className="w-5 h-5 animate-pulse" />}
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{task.title}</h4>
                        <p className="text-xs text-gray-400">{task.status}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Telemetry Engine / Metrics */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`${theme.base} p-6 rounded-[2rem] flex-1`}>
              <h3 className="text-white font-bold mb-6 tracking-wide flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#06B6D4]" /> Telemetry
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] relative overflow-hidden group">
                   <div className={`absolute top-0 right-0 w-20 h-20 blur-[30px] opacity-10 group-hover:opacity-20 ${gradients.secondary}`}></div>
                   <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-1">System Health</p>
                   <p className="text-2xl font-bold text-white">{TelemetryEngine.metrics.systemHealth}%</p>
                </div>
                
                <div className="p-4 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] relative overflow-hidden group">
                   <div className={`absolute top-0 right-0 w-20 h-20 blur-[30px] opacity-10 group-hover:opacity-20 ${gradients.primary}`}></div>
                   <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-1">Active Agents</p>
                   <p className="text-2xl font-bold text-white">{TelemetryEngine.metrics.activeAgents}</p>
                </div>

                <div className="p-4 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] relative overflow-hidden group">
                   <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-1">Memory Usage</p>
                   <p className="text-2xl font-bold text-[#A855F7] font-mono">{TelemetryEngine.metrics.memoryUsage}</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      )}
    </div>
  );
}
