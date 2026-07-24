"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Activity, Clock, Server, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useOSData } from "@/context/OSDataContext";

export default function AutomationOSDashboard() {
  const { autoWorkflows, autoLogs, autoIntegrations } = useOSData();

  const activePipelines = autoWorkflows.filter(w => w.active).length;
  const connectedApps = autoIntegrations.filter(i => i.status === "Connected").length;
  const successRate = autoLogs.length > 0 
    ? Math.round((autoLogs.filter(l => l.status === "Success").length / autoLogs.length) * 100) 
    : 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-transparent p-8 pb-20 max-w-7xl mx-auto w-full relative" style={{'--theme-color': '#8B5CF6', '--theme-color-dark': '#7C3AED', '--theme-rgb': '139,92,246', '--theme-rgb-dark': '124,58,237'} as React.CSSProperties}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
             <Zap className="w-8 h-8 text-[#F97316]" /> System Core
          </h1>
          <p className="text-gray-400 text-sm">Central nervous system of your digital ecosystem.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/os/automation-os/workflows" className="bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(249,115,22,0.5)] flex items-center gap-2 transition-all">
            <Activity className="w-4 h-4" /> New Pipeline
          </Link>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric Cards */}
        {[
          { title: "Active Pipelines", value: activePipelines.toString(), sub: `${autoWorkflows.length} total workflows`, icon: Activity, color: "text-[#F97316]", bg: "bg-[#F97316]" },
          { title: "Execution Rate", value: `${successRate}%`, sub: "Last 24 hours", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500" },
          { title: "Connected Apps", value: connectedApps.toString(), sub: "Out of 12 available", icon: Server, color: "text-blue-500", bg: "bg-blue-500" },
          { title: "System Load", value: "Low", sub: "12ms average latency", icon: Zap, color: "text-purple-500", bg: "bg-purple-500" },
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
          
          {/* AI Optimizer */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(249,115,22,0.2)] bg-gradient-to-br from-[rgba(249,115,22,0.05)] to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F97316] blur-[100px] opacity-10" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#C2410C] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  Aura System Optimizer
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(249,115,22,0.2)] text-[#F97316] border border-[rgba(249,115,22,0.3)]">
                    Suggestion
                  </span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  The "Backup Data" workflow is currently disabled. Since your system data size has grown by 15% this week, I highly recommend enabling it to ensure no data loss occurs.
                </p>
                <div className="flex gap-3">
                  <Link href="/os/automation-os/workflows" className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all border border-[rgba(255,255,255,0.05)]">
                    Manage Workflows
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Active Workflows */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#F97316]" /> Live Pipelines
              </h3>
              <Link href="/os/automation-os/workflows" className="text-xs text-[#F97316] hover:text-white transition-colors flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            
            <div className="space-y-4">
               {autoWorkflows.filter(w => w.active).map(workflow => (
                 <div key={workflow.id} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] flex items-center justify-between gap-4">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-[rgba(249,115,22,0.1)] flex items-center justify-center">
                       <div className="w-3 h-3 bg-[#F97316] rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                     </div>
                     <div>
                       <h4 className="text-sm font-bold text-white">{workflow.name}</h4>
                       <p className="text-xs text-gray-400 mt-0.5">{workflow.trigger} → {workflow.action}</p>
                     </div>
                   </div>
                   <div className="text-right hidden sm:block">
                     <div className="text-xs text-gray-500">Last run</div>
                     <div className="text-xs font-medium text-gray-300">{workflow.lastRun}</div>
                   </div>
                 </div>
               ))}

               {autoWorkflows.filter(w => w.active).length === 0 && (
                 <p className="text-sm text-gray-500 py-4">No active pipelines running.</p>
               )}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar: Recent Event Logs */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex-1 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F97316]" /> Recent Events
              </h3>
              <Link href="/os/automation-os/logs" className="text-xs text-gray-400 hover:text-white transition-colors">
                All Logs
              </Link>
            </div>
            
            <div className="space-y-4">
               {autoLogs.slice(0,5).map((log) => (
                 <div key={log.id} className="relative pl-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-[-16px] before:w-[2px] before:bg-[rgba(255,255,255,0.05)] last:before:hidden">
                   <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center ${log.status === "Success" ? 'bg-[rgba(16,185,129,0.2)]' : 'bg-[rgba(239,68,68,0.2)]'}`}>
                     <div className={`w-2 h-2 rounded-full ${log.status === "Success" ? 'bg-emerald-500' : 'bg-red-500'}`} />
                   </div>
                   <div>
                     <h4 className="text-sm font-bold text-gray-200">{log.workflowName}</h4>
                     <p className="text-xs text-gray-500 mt-0.5">{log.timestamp}</p>
                   </div>
                 </div>
               ))}
               
               {autoLogs.length === 0 && (
                 <p className="text-sm text-gray-500">No events recorded yet.</p>
               )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
