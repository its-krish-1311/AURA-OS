"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Plus, MessageSquare, Pin, Search, Cpu, Key, 
  Workflow, Database, Brain, BookOpen, FolderOpen, 
  Briefcase, Wrench, Puzzle, Zap, Settings, User, 
  ChevronLeft
} from "lucide-react";

interface WorkspaceSidebarProps {
  onBackToOS: () => void;
}

export default function WorkspaceSidebar({ onBackToOS }: WorkspaceSidebarProps) {
  const sections = [
    {
      title: "Chat",
      items: [
        { icon: MessageSquare, label: "Chat History" },
        { icon: Pin, label: "Pinned Chats" },
        { icon: Search, label: "Search Chats" },
      ]
    },
    {
      title: "Intelligence",
      items: [
        { icon: Cpu, label: "Models" },
        { icon: Brain, label: "Memory" },
        { icon: BookOpen, label: "Knowledge Base" },
      ]
    },
    {
      title: "Integrations",
      items: [
        { icon: Key, label: "API Keys" },
        { icon: Database, label: "MCP Servers" },
        { icon: Workflow, label: "Integrations" },
        { icon: Puzzle, label: "Extensions" },
      ]
    },
    {
      title: "Workspace",
      items: [
        { icon: FolderOpen, label: "Files" },
        { icon: Briefcase, label: "Projects" },
        { icon: Wrench, label: "Tools" },
        { icon: Zap, label: "Automations" },
      ]
    }
  ];

  return (
    <div className="w-[280px] h-full flex flex-col bg-[#020408] border-r border-[rgba(255,255,255,0.05)] relative z-50 shrink-0">
      {/* Background ambient glow */}
      <div className="absolute top-0 -left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(147,51,234,0.03),transparent_50%)] pointer-events-none" />

      {/* Header / New Chat */}
      <div className="p-4 border-b border-[rgba(255,255,255,0.03)] space-y-4">
        <button 
          onClick={onBackToOS}
          className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold tracking-widest uppercase text-gray-500 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to AuraOS
        </button>

        <button className="w-full h-11 flex items-center justify-center gap-2 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.05)] rounded-xl text-sm font-semibold text-white transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6 relative z-10">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h4 className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">
              {section.title}
            </h4>
            <div className="space-y-0.5">
              {section.items.map((item, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)] transition-all group"
                >
                  <item.icon className="w-4 h-4 text-gray-500 group-hover:text-[#3B82F6] transition-colors" />
                  <span className="text-xs font-medium tracking-wide">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / User & Settings */}
      <div className="p-3 border-t border-[rgba(255,255,255,0.03)] space-y-0.5 relative z-10">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)] transition-all group">
          <Settings className="w-4 h-4 text-gray-500 group-hover:text-[#A855F7] transition-colors" />
          <span className="text-xs font-medium tracking-wide">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)] transition-all group">
          <User className="w-4 h-4 text-gray-500 group-hover:text-[#3B82F6] transition-colors" />
          <span className="text-xs font-medium tracking-wide">Profile</span>
        </button>
      </div>
    </div>
  );
}
