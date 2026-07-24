"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Plus, Filter, MessageSquare, Mail, Phone, ExternalLink, Star, Building2, MapPin } from "lucide-react";

export default function CareerOSNetworking() {
  const contacts = [
    { name: "Sarah Jenkins", role: "Senior Recruiter", company: "Google", status: "Warm", lastContact: "2 days ago", image: "S", color: "bg-blue-500", priority: true },
    { name: "Michael Chen", role: "Frontend Lead", company: "Vercel", status: "Connected", lastContact: "1 week ago", image: "M", color: "bg-purple-500", priority: true },
    { name: "Emily Davis", role: "Product Manager", company: "Stripe", status: "Cold", lastContact: "Never", image: "E", color: "bg-emerald-500", priority: false },
    { name: "David Kim", role: "Engineering Manager", company: "Netflix", status: "Warm", lastContact: "3 days ago", image: "D", color: "bg-red-500", priority: true },
    { name: "Alex Thompson", role: "CEO", company: "StartupX", status: "Meeting Scheduled", lastContact: "Today", image: "A", color: "bg-orange-500", priority: true },
  ];

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-[#10B981]" /> Professional Network
          </h1>
          <p className="text-gray-400 text-sm">Manage relationships, recruiters, and referrals.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group hidden sm:block">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#10B981] transition-colors" />
            <input 
              type="text" 
              placeholder="Search contacts..." 
              className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#10B981] text-white text-sm rounded-xl pl-9 pr-4 py-2 outline-none transition-all w-[250px]"
            />
          </div>
          <button className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Contact
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Left Sidebar: CRM Stats */}
        <div className="lg:col-span-1 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <h3 className="text-white font-bold mb-4">Network Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Connection Strength</span>
                  <span className="text-[#10B981]">Good</span>
                </div>
                <div className="w-full h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981] rounded-full w-[75%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Outreach Reply Rate</span>
                  <span className="text-[#3B82F6]">42%</span>
                </div>
                <div className="w-full h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3B82F6] rounded-full w-[42%]" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="krish-glass p-6 rounded-3xl border border-[rgba(16,185,129,0.2)] bg-gradient-to-br from-[rgba(16,185,129,0.05)] to-transparent">
            <h3 className="text-white font-bold mb-2 text-sm flex items-center gap-2">
              <Star className="w-4 h-4 text-[#F59E0B]" /> AI Networking Suggestion
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              You haven't reached out to Michael Chen at Vercel in a week. Sending a quick update about your recent Next.js project might boost your referral chances.
            </p>
            <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2 rounded-xl text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
              Draft LinkedIn Message
            </button>
          </div>
        </div>

        {/* Main Content Area: Contact List */}
        <div className="lg:col-span-3 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col overflow-hidden">
          
          <div className="bg-[rgba(0,0,0,0.2)] flex-1 overflow-y-auto custom-scrollbar p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contacts.map((contact, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={idx} 
                  className="p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(16,185,129,0.3)] transition-all cursor-pointer group relative"
                >
                  {contact.priority && (
                    <div className="absolute top-4 right-4">
                      <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full ${contact.color} bg-opacity-20 flex items-center justify-center font-bold text-white border border-[rgba(255,255,255,0.1)]`}>
                      {contact.image}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-200 group-hover:text-white transition-colors">{contact.name}</h3>
                      <p className="text-xs text-[#10B981] font-semibold">{contact.role}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Building2 className="w-3.5 h-3.5 text-gray-500" /> {contact.company}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MessageSquare className="w-3.5 h-3.5 text-gray-500" /> Last contacted: {contact.lastContact}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      contact.status === 'Warm' ? 'bg-[rgba(16,185,129,0.1)] text-[#10B981]' :
                      contact.status === 'Connected' ? 'bg-[rgba(59,130,246,0.1)] text-[#3B82F6]' :
                      contact.status === 'Meeting Scheduled' ? 'bg-[rgba(245,158,11,0.1)] text-[#F59E0B]' :
                      'bg-[rgba(255,255,255,0.05)] text-gray-400'
                    }`}>
                      {contact.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[#3B82F6] flex items-center justify-center text-gray-400 hover:text-white transition-all">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[#10B981] flex items-center justify-center text-gray-400 hover:text-white transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
