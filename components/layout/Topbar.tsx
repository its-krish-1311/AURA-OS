"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  Settings, 
  Bell, 
  Search, 
  Sparkles,
  Plus,
  Menu,
  Brain
} from "lucide-react";
import { useDashboardContext } from "@/components/dashboard/DashboardContext";

export default function Topbar() {
  const { activeChatMode, setIsMobileSidebarOpen } = useDashboardContext();

  return (
    <header className="h-16 mx-4 sm:mx-6 mt-4 krish-glass !overflow-visible bg-[rgba(18,18,20,0.6)] rounded-full flex items-center justify-between px-6 shrink-0 relative z-20 border border-[rgba(255,255,255,0.05)] shadow-2xl">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 mix-blend-overlay pointer-events-none z-0 rounded-full overflow-hidden"></div>
      
      <div className="relative z-10 w-full flex items-center justify-between">
        
        {/* Left Area - Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:shadow-[0_0_25px_rgba(147,51,234,0.7)] transition-all duration-300">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              SIYA
            </span>
          </div>

          <div className="hidden md:block w-px h-6 bg-white/10 mx-2 shrink-0"></div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:flex items-center gap-2 bg-white text-black rounded-full px-6 py-2 cursor-pointer transition-all justify-center shrink-0"
          >
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="text-sm font-bold text-black text-center whitespace-nowrap">{activeChatMode}</span>
          </motion.div>
        </div>



      {/* Right Area - Actions & Profile */}
      <div className="flex items-center gap-4">
        
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-surface border border-borderSubtle flex items-center justify-center text-gray-400 hover:text-white hover:bg-borderSubtle transition-all relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="w-10 h-10 rounded-full bg-surface border border-borderSubtle flex items-center justify-center text-gray-400 hover:text-white hover:bg-borderSubtle transition-all">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-white/[0.1]"></div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-borderSubtle group-hover:border-accentPrimary/50 transition-colors">
            <img src="https://i.pravatar.cc/150?u=krishna" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white leading-tight font-ethno tracking-wide">Krishna Kushwaha</p>
            <p className="text-[10px] text-accentPrimary font-medium flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Premium
            </p>
          </div>
        </div>

        {/* Quick Create Button */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="ml-2 bg-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-black text-white font-bold border-none rounded-full py-2 px-4 flex items-center gap-2 transition-all shadow-none"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-bold">Quick Create</span>
        </motion.button>

      </div>
      </div>
    </header>
  );
}
