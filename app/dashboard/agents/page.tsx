"use client";

import React from "react";
import { 
  Bot, 
  Settings, 
  Code2, 
  Database, 
  PenTool, 
  Palette,
  Search,
  Plus,
  Wrench,
  AlignLeft,
  Languages,
  Image as ImageIcon,
  BarChart,
  MessageSquareCode,
  Lightbulb,
  FileText,
  MoreHorizontal,
  Brain,
  ToggleRight,
  ToggleLeft
} from "lucide-react";

export default function AgentsPage() {
  return (
    <div className="h-full flex flex-col p-4 sm:p-6 sm:px-10 lg:px-20 text-gray-300 max-w-[1200px] mx-auto overflow-y-auto custom-scrollbar">
      
      {/* AGENTS SECTION */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-400" />
            <h2 className="text-white font-bold tracking-widest text-sm uppercase">Agents</h2>
          </div>
          <button className="text-purple-400 text-xs font-semibold hover:text-purple-300 transition-colors">View all</button>
        </div>

        {/* Featured Agent */}
        <div className="bg-gradient-to-r from-purple-900/40 via-purple-800/20 to-[#111116] border border-purple-500/30 rounded-2xl p-5 mb-4 shadow-[0_0_30px_rgba(168,85,247,0.15)] flex items-center justify-between group cursor-pointer hover:border-purple-500/50 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <img src="https://i.pravatar.cc/150?img=47" alt="Siya Dev" className="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Siya Dev</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400 text-xs">Code Agent</span>
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
            <Code2 className="w-6 h-6" />
          </div>
        </div>

        {/* Other Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          
          <div className="bg-[#111116] border border-white/[0.05] rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:bg-[#16161D] hover:border-white/[0.1] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-gray-200 font-semibold text-sm">Data Sage</h4>
                <p className="text-gray-500 text-xs">Data Analyst</p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-gray-500 hover:text-white"><Settings className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="bg-[#111116] border border-white/[0.05] rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:bg-[#16161D] hover:border-white/[0.1] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-gray-200 font-semibold text-sm">Content Wiz</h4>
                <p className="text-gray-500 text-xs">Content Creator</p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-gray-500 hover:text-white"><Settings className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="bg-[#111116] border border-white/[0.05] rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:bg-[#16161D] hover:border-white/[0.1] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-gray-200 font-semibold text-sm">Design Mind</h4>
                <p className="text-gray-500 text-xs">UI/UX Designer</p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-gray-500 hover:text-white"><Settings className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="bg-[#111116] border border-white/[0.05] rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:bg-[#16161D] hover:border-white/[0.1] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-gray-200 font-semibold text-sm">Research Pro</h4>
                <p className="text-gray-500 text-xs">Research Agent</p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-gray-500 hover:text-white"><Settings className="w-4 h-4" /></button>
            </div>
          </div>

        </div>

        <button className="w-full py-3 border border-dashed border-white/[0.1] rounded-xl text-gray-400 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.02] flex items-center justify-center gap-2 transition-all font-medium text-sm">
          <Plus className="w-4 h-4" /> Create Custom Agent
        </button>
      </section>

      {/* TOOLS & ACTIONS SECTION */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-400" />
            <h2 className="text-white font-bold tracking-widest text-sm uppercase">Tools & Actions</h2>
          </div>
          <button className="text-blue-400 text-xs font-semibold hover:text-blue-300 transition-colors">View all</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#111116] border border-white/[0.05] hover:border-blue-500/30 rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all">
            <AlignLeft className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-gray-300">Summarize</span>
          </div>
          <div className="bg-[#111116] border border-white/[0.05] hover:border-purple-500/30 rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all">
            <Languages className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-gray-300">Translate</span>
          </div>
          <div className="bg-[#111116] border border-white/[0.05] hover:border-orange-500/30 rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all">
            <ImageIcon className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-gray-300">Generate Image</span>
          </div>
          <div className="bg-[#111116] border border-white/[0.05] hover:border-green-500/30 rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all">
            <BarChart className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-gray-300">Analyze Data</span>
          </div>
          <div className="bg-[#111116] border border-white/[0.05] hover:border-pink-500/30 rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all">
            <MessageSquareCode className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-gray-300">Code Assistant</span>
          </div>
          <div className="bg-[#111116] border border-white/[0.05] hover:border-yellow-500/30 rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all">
            <Lightbulb className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-gray-300">Explain Like I'm 5</span>
          </div>
          <div className="bg-[#111116] border border-white/[0.05] hover:border-red-500/30 rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all">
            <FileText className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-gray-300">PDF Chat</span>
          </div>
          <div className="bg-[#111116] border border-white/[0.05] hover:border-white/[0.2] rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all">
            <MoreHorizontal className="w-6 h-6 text-gray-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-gray-300">More Tools</span>
          </div>
        </div>
      </section>

      {/* MEMORY & CONTEXT SECTION */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-pink-400" />
            <h2 className="text-white font-bold tracking-widest text-sm uppercase">Memory & Context</h2>
          </div>
          <button className="text-pink-400 text-xs font-semibold hover:text-pink-300 transition-colors">Manage</button>
        </div>

        <div className="bg-[#111116] border border-white/[0.05] rounded-2xl p-6 flex items-center justify-between relative overflow-hidden">
          
          <div className="absolute right-0 top-0 bottom-0 w-[300px] pointer-events-none flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-pink-500/30 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-pink-500/10 rounded-full blur-xl"></div>
              <Brain className="w-12 h-12 text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
              <div className="absolute -inset-4 border border-pink-500/10 rounded-full border-dashed animate-[spin_10s_linear_infinite]"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#111116] via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-md space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">Siya remembers your preferences</span>
              </div>
              <span className="text-xs font-semibold text-purple-400">Active</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">Long term memory</span>
              </div>
              <ToggleRight className="w-7 h-7 text-green-400 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquareCode className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">Chat context</span>
              </div>
              <ToggleRight className="w-7 h-7 text-green-400 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">Personal Instructions</span>
              </div>
              <button className="text-xs font-semibold text-blue-400 hover:text-blue-300">Set</button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
