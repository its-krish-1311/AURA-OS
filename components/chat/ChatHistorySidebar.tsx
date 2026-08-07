"use client";

import React from "react";
import { Search, Edit3, Trash2, Archive, Download, Folder, Pin, Star, MessageSquare } from "lucide-react";

export default function ChatHistorySidebar() {
  const categories = [
    { name: "Today", chats: ["React Next.js Debugging", "Quantum Computing Basics"] },
    { name: "Yesterday", chats: ["Plan my travel to Japan", "Fix API Route bug"] },
    { name: "Last 7 Days", chats: ["Tailwind CSS Grid layout", "Write an email to boss"] },
  ];

  return (
    <div className="w-[280px] h-full krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-[#0B0B13]/80 backdrop-blur-3xl flex flex-col overflow-hidden shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      
      {/* Header & Search */}
      <div className="p-5 border-b border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold tracking-widest text-xs uppercase flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#A855F7]" />
            Chat History
          </h2>
          <button className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center hover:bg-[rgba(126,34,206,0.2)] transition-colors">
            <Edit3 className="w-4 h-4 text-gray-300" />
          </button>
        </div>
        
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search chats..." 
            className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-xl py-2 pl-9 pr-3 text-sm text-white placeholder-gray-400 outline-none focus:border-[#A855F7] transition-all"
          />
        </div>
      </div>

      {/* Folders / Quick Filters */}
      <div className="flex gap-2 p-4 border-b border-[rgba(255,255,255,0.05)] overflow-x-auto scrollbar-hide">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(126,34,206,0.15)] text-[#A855F7] border border-[rgba(126,34,206,0.3)] text-xs font-semibold shrink-0">
          <Pin className="w-3 h-3" /> Pinned
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] text-gray-100 hover:text-white border border-[rgba(255,255,255,0.1)] text-xs font-semibold shrink-0 transition-all">
          <Star className="w-3 h-3" /> Favorites
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] text-gray-100 hover:text-white border border-[rgba(255,255,255,0.1)] text-xs font-semibold shrink-0 transition-all">
          <Folder className="w-3 h-3" /> Projects
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6 custom-scrollbar">
        {categories.map((cat, idx) => (
          <div key={idx}>
            <h3 className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-2 px-2">{cat.name}</h3>
            <div className="space-y-1">
              {cat.chats.map((chat, i) => (
                <div key={i} className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[rgba(255,255,255,0.05)] cursor-pointer transition-all">
                  <span className="text-sm font-medium text-gray-100 group-hover:text-white truncate pr-2">{chat}</span>
                  <div className="hidden group-hover:flex items-center gap-1">
                    <button className="text-gray-200 hover:text-white"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button className="text-gray-200 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
