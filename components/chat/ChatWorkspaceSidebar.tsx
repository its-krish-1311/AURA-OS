"use client";

import React from "react";
import { BrainCircuit, Cpu, Database, FileText, Zap, BookOpen, Key, Hash, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatWorkspaceSidebar() {
  return (
    <div className="w-[280px] h-full flex flex-col gap-6 shrink-0">
      
      {/* Upper Block: System Metrics */}
      <div className="flex-1 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-[#0B0B13]/80 backdrop-blur-3xl flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-5 border-b border-[rgba(255,255,255,0.05)] shrink-0">
          <h2 className="text-white font-bold tracking-widest text-xs uppercase flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-[#06B6D4]" />
            AI Workspace
          </h2>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          <h3 className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-3">System Status</h3>
          <div className="space-y-3">
            <motion.div 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center justify-between p-3 px-5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.6)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] transition-colors duration-150 cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#A855F7]" />
                <span className="text-xs font-medium text-gray-100">Current Model</span>
              </div>
              <span className="text-xs font-bold text-white">GPT 5.0</span>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center justify-between p-3 px-5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.6)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] transition-colors duration-150 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#06B6D4]" />
                <span className="text-xs font-medium text-gray-100">Memory Status</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-green-400">ACTIVE</span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center justify-between p-3 px-5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.6)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] transition-colors duration-150 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-medium text-gray-100">Context Length</span>
              </div>
              <span className="text-xs font-bold text-white">128k</span>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center justify-between p-3 px-5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.6)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] transition-colors duration-150 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-medium text-gray-100">Token Usage</span>
              </div>
              <span className="text-xs font-bold text-white">4,209 / 10k</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lower Block: Workspace Assets */}
      <div className="flex-1 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-[#0B0B13]/80 backdrop-blur-3xl flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-4 flex flex-col h-full justify-center">
          <h3 className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mb-6 shrink-0 text-center">Workspace Assets</h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.button 
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="aspect-square flex flex-col items-center justify-center gap-3 p-3 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.6)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.15)] transition-colors duration-150 group"
            >
              <FileText className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] group-hover:scale-110 transition-all duration-300" />
              <span className="text-xs font-semibold text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FFFFFF] group-hover:to-[#A855F7] transition-all duration-300">Recent Files</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="aspect-square flex flex-col items-center justify-center gap-3 p-3 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.6)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.15)] transition-colors duration-150 group"
            >
              <Key className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] group-hover:scale-110 transition-all duration-300" />
              <span className="text-xs font-semibold text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FFFFFF] group-hover:to-[#A855F7] transition-all duration-300">Saved Prompts</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="aspect-square flex flex-col items-center justify-center gap-3 p-3 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.6)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.15)] transition-colors duration-150 group"
            >
              <BookOpen className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] group-hover:scale-110 transition-all duration-300" />
              <span className="text-xs font-semibold text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FFFFFF] group-hover:to-[#A855F7] transition-all duration-300">Saved Replies</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="aspect-square flex flex-col items-center justify-center gap-3 p-3 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.6)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.15)] transition-colors duration-150 group"
            >
              <LayoutGrid className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] group-hover:scale-110 transition-all duration-300" />
              <span className="text-xs font-semibold text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FFFFFF] group-hover:to-[#A855F7] transition-all duration-300">Suggestions</span>
            </motion.button>
          </div>
        </div>
      </div>

    </div>
  );
}
