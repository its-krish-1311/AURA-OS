"use client";

import React from "react";
import { motion } from "framer-motion";
import { TerminalSquare, Activity, GitCommit, Server, Brain, Code2, PlayCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useOSData } from "@/context/OSDataContext";

export default function DeveloperOSDashboard() {
  const { devTasks } = useOSData();
  
  const inProgress = devTasks.filter(t => t.status === "In Progress").length;
  const done = devTasks.filter(t => t.status === "Done").length;
  const total = devTasks.length;
  const velocity = total === 0 ? 0 : Math.round((done / total) * 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-transparent p-8 pb-20 max-w-7xl mx-auto w-full relative" style={{'--theme-color': '#06B6D4', '--theme-color-dark': '#0891B2', '--theme-rgb': '6,182,212', '--theme-rgb-dark': '8,145,178'} as React.CSSProperties}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Developer Workspace</h1>
          <p className="text-gray-400 text-sm">Your engineering command center.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/os/developer-os/board" className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Plus className="w-4 h-4" /> New Ticket
          </Link>
          <Link href="/os/developer-os/api" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(139,92,246,0.5)] flex items-center gap-2 transition-all">
            <PlayCircle className="w-4 h-4" /> Test API
          </Link>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric Cards */}
        {[
          { title: "Sprint Velocity", value: `${velocity}%`, sub: `${done} of ${total} tasks`, icon: Activity, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]" },
          { title: "Active PRs", value: "3", sub: "1 needs review", icon: GitCommit, color: "text-blue-500", bg: "bg-blue-500" },
          { title: "API Health", value: "99.9%", sub: "All systems operational", icon: Server, color: "text-emerald-500", bg: "bg-emerald-500" },
          { title: "Saved Snippets", value: "12", sub: "Most used: Fetch Hook", icon: Code2, color: "text-rose-500", bg: "bg-rose-500" },
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
          {/* AI Code Reviewer Insights */}
          <motion.div variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(139,92,246,0.2)] bg-gradient-to-br from-[rgba(139,92,246,0.05)] to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6] blur-[100px] opacity-10" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  Aura Code Reviewer
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(139,92,246,0.2)] text-[#8B5CF6] border border-[rgba(139,92,246,0.3)]">
                    Action Required
                  </span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  I detected a potential memory leak in your `useLocalStorage` hook regarding the `useEffect` cleanup. I've drafted a fix in your Snippets library. Additionally, your latest API endpoints lack rate-limiting middleware.
                </p>
                <div className="flex gap-3">
                  <Link href="/os/developer-os/snippets" className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all border border-[rgba(255,255,255,0.05)]">
                    View Hook Fix
                  </Link>
                  <Link href="/os/developer-os/board" className="bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-gray-300 px-4 py-2 rounded-lg text-xs font-semibold transition-all">
                    Create Ticket
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Service Status */}
          <motion.div variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <h3 className="text-lg font-bold text-white mb-6">Service Health</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Frontend Cluster", status: "Operational", ping: "42ms" },
                { name: "API Gateway", status: "Operational", ping: "28ms" },
                { name: "PostgreSQL DB", status: "Operational", ping: "14ms" },
                { name: "Redis Cache", status: "Operational", ping: "8ms" },
              ].map((svc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute top-0 left-0 animate-ping opacity-75" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative z-10" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{svc.name}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">{svc.status}</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-gray-400 bg-[rgba(0,0,0,0.3)] px-2 py-1 rounded">
                    {svc.ping}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar: Quick Actions */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex-1 min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                Active Tickets
              </h3>
              <Link href="/os/developer-os/board" className="text-xs text-gray-400 hover:text-white transition-colors">
                View Board
              </Link>
            </div>
            
            <div className="space-y-3">
              {devTasks.filter(t => t.status !== "Done").map((task) => (
                <div key={task.id} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#8B5CF6] transition-colors">{task.title}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      task.type === 'Bug' ? 'text-rose-400 bg-[rgba(244,63,94,0.1)]' :
                      task.type === 'Feature' ? 'text-emerald-400 bg-[rgba(16,185,129,0.1)]' :
                      'text-amber-400 bg-[rgba(245,158,11,0.1)]'
                    }`}>
                      {task.type}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded">
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
              
              {devTasks.filter(t => t.status !== "Done").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500 mb-4">Inbox zero! No active tasks.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
