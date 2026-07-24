"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Users, FileText, CalendarRange, TrendingUp, Brain, Briefcase, Plus, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useOSData } from "@/context/OSDataContext";

export default function BusinessOSDashboard() {
  const { bizClients, bizInvoices, bizMeetings } = useOSData();
  
  const mrr = bizClients.filter(c => c.status === "Active").reduce((acc, c) => acc + c.value, 0);
  const outstanding = bizInvoices.filter(i => i.status === "Sent" || i.status === "Overdue").reduce((acc, i) => acc + i.amount, 0);
  const activeClients = bizClients.filter(c => c.status === "Active").length;
  
  const upcomingMeetings = bizMeetings.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-transparent p-8 pb-20 max-w-7xl mx-auto w-full relative" style={{'--theme-color': '#F59E0B', '--theme-color-dark': '#D97706', '--theme-rgb': '245,158,11', '--theme-rgb-dark': '217,119,6'} as React.CSSProperties}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Business Operations</h1>
          <p className="text-gray-400 text-sm">Your enterprise command center.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/os/business-os/clients" className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Client
          </Link>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric Cards */}
        {[
          { title: "Monthly Recurring", value: `$${mrr.toLocaleString()}`, sub: "+12% from last month", icon: TrendingUp, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]" },
          { title: "Outstanding", value: `$${outstanding.toLocaleString()}`, sub: "3 invoices pending", icon: DollarSign, color: "text-rose-500", bg: "bg-rose-500" },
          { title: "Active Clients", value: activeClients.toString(), sub: "2 new leads this week", icon: Users, color: "text-blue-500", bg: "bg-blue-500" },
          { title: "Next Meeting", value: upcomingMeetings[0]?.time || "--:--", sub: upcomingMeetings[0]?.title || "No upcoming meetings", icon: CalendarRange, color: "text-emerald-500", bg: "bg-emerald-500" },
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
          {/* AI Advisor */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(245,158,11,0.2)] bg-gradient-to-br from-[rgba(245,158,11,0.05)] to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B] blur-[100px] opacity-10" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#B45309] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  Aura Business Advisor
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(245,158,11,0.2)] text-[#F59E0B] border border-[rgba(245,158,11,0.3)]">
                    Revenue Alert
                  </span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Invoice INV-2026-003 for Michael Chen is currently in Draft state. Sending it today will help improve this month's cash flow. You also have a Pitch meeting with him tomorrow at 2:00 PM.
                </p>
                <div className="flex gap-3">
                  <Link href="/os/business-os/invoices" className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all border border-[rgba(255,255,255,0.05)]">
                    Review Invoice
                  </Link>
                  <Link href="/os/business-os/meetings" className="bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-gray-300 px-4 py-2 rounded-lg text-xs font-semibold transition-all">
                    Prep for Pitch
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Client Overview */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Top Clients (MRR)</h3>
              <Link href="/os/business-os/clients" className="text-xs text-[#F59E0B] hover:text-[#D97706] flex items-center gap-1 transition-colors">
                View CRM <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {bizClients.filter(c => c.status === "Active").sort((a,b) => b.value - a.value).map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.04)] transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[rgba(245,158,11,0.1)] flex items-center justify-center text-[#F59E0B] font-bold">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{client.company}</div>
                      <div className="text-xs text-gray-500">{client.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#F59E0B]">${client.value.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">/mo</div>
                  </div>
                </div>
              ))}
              {bizClients.filter(c => c.status === "Active").length === 0 && (
                <div className="text-sm text-gray-500 text-center py-4">No active clients yet.</div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar: Quick Actions & Meetings */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex-1 min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                Upcoming Meetings
              </h3>
            </div>
            
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#F59E0B] transition-colors">{meeting.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{meeting.client}</p>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      meeting.type === 'Pitch' ? 'text-rose-400 bg-[rgba(244,63,94,0.1)]' :
                      meeting.type === 'Sync' ? 'text-blue-400 bg-[rgba(59,130,246,0.1)]' :
                      'text-emerald-400 bg-[rgba(16,185,129,0.1)]'
                    }`}>
                      {meeting.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-xs font-bold text-gray-500 bg-[rgba(0,0,0,0.2)] px-3 py-2 rounded-lg">
                    <CalendarRange className="w-3.5 h-3.5 text-[#F59E0B]" />
                    {meeting.date} • {meeting.time}
                  </div>
                </div>
              ))}
              
              {upcomingMeetings.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">Your calendar is clear.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
