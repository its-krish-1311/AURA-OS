"use client";

import React, { useState } from "react";
import { Search, Bell, Sun, BadgeCheck, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

export default function Header() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="w-full relative flex items-center justify-between py-6 px-8 z-50">
      <div className="flex-1 flex justify-start items-center">
        <div className="-ml-4 krish-glass px-5 py-2.5 rounded-full border-[rgba(var(--theme-rgb-dark),0.3)] shadow-[0_0_15px_rgba(var(--theme-rgb-dark),0.1)] flex items-center gap-2.5 backdrop-blur-md hover:scale-105 transition-transform cursor-default">
          <div className="w-2 h-2 rounded-full bg-[var(--theme-color)] shadow-[0_0_8px_var(--theme-color)] animate-pulse"></div>
          <span className="text-xs font-bold tracking-widest flex items-center gap-1.5">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--theme-color)]">Engineered By</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--theme-color)]">Krishna Kushwaha</span>
          </span>
        </div>
      </div>
      
      {/* Search Bar - Absolutely Centered */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-[480px]">
        <motion.div 
          animate={isFocused ? { scale: 1.02, y: -2 } : { scale: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
          className="relative w-full group"
        >
          {/* Animated Glow Backdrop */}
          <div className={`absolute -inset-1 rounded-full blur-md transition-all duration-500 ${isFocused ? 'bg-gradient-to-r from-[rgba(var(--theme-rgb-dark),0.05)] via-[rgba(var(--theme-rgb-dark),0.15)] to-[rgba(var(--theme-rgb-dark),0.05)] opacity-70' : 'opacity-0'}`}></div>
          
          <div className={`relative w-full h-12 krish-glass rounded-full flex items-center px-4 gap-3 transition-all duration-300 ${isFocused ? 'border-[rgba(var(--theme-rgb-dark),0.3)] bg-[rgba(255,255,255,0.05)] shadow-[0_0_20px_rgba(var(--theme-rgb-dark),0.15),0_0_40px_rgba(var(--theme-rgb-dark),0.08)]' : ''}`}>
            <Search className={`w-5 h-5 transition-all duration-300 ${isFocused ? 'text-accentLight drop-shadow-[0_0_8px_rgba(var(--theme-rgb),0.6)]' : 'text-gray-300'}`} />
            <input 
              type="text" 
              placeholder="Search or ask anything..." 
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-muted font-medium"
            />
            <div className={`px-2 py-1 rounded text-xs font-semibold border transition-all duration-300 ${isFocused ? 'bg-[rgba(var(--theme-rgb-dark),0.15)] text-white border-[rgba(var(--theme-rgb-dark),0.3)] shadow-[0_0_10px_rgba(var(--theme-rgb-dark),0.1)]' : 'bg-[rgba(255,255,255,0.05)] text-gray-300 border-[rgba(255,255,255,0.05)]'}`}>
              ⌘ K
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Controls */}
      <div className="flex-1 flex items-center justify-end gap-6">
        <motion.button whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.9 }} className="text-gray-300 hover:text-white transition-colors relative group">
          <Bell className="w-5 h-5 drop-shadow-[0_0_5px_rgba(var(--theme-rgb-dark),0.3)] group-hover:drop-shadow-[0_0_10px_rgba(var(--theme-rgb-dark),0.6)]" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-accentSecondary rounded-full border border-primary shadow-[0_0_6px_rgba(var(--theme-rgb-dark),0.5)]"></div>
        </motion.button>
        <motion.button whileHover={{ scale: 1.1, rotate: 45 }} whileTap={{ scale: 0.9 }} className="text-gray-300 hover:text-white transition-colors group">
          <Sun className="w-5 h-5 drop-shadow-[0_0_5px_rgba(var(--theme-rgb-dark),0.3)] group-hover:drop-shadow-[0_0_10px_rgba(var(--theme-rgb-dark),0.6)]" />
        </motion.button>
        <motion.button onClick={() => signOut()} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-gray-300 hover:text-red-400 transition-colors group" title="Sign Out">
          <LogOut className="w-5 h-5 drop-shadow-[0_0_5px_rgba(var(--theme-rgb-dark),0.3)] group-hover:drop-shadow-[0_0_10px_rgba(248,113,113,0.6)]" />
        </motion.button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-[rgba(255,255,255,0.1)] cursor-pointer group">
          <motion.div whileHover={{ scale: 1.05 }} className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.1)] group-hover:border-[rgba(var(--theme-rgb-dark),0.4)] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(var(--theme-rgb-dark),0.2)]">
            <div className="w-full h-full bg-gradient-to-tr from-[#000000] to-[rgba(255,255,255,0.1)] flex items-center justify-center">
              <span className="text-white font-bold text-lg drop-shadow-md">K</span>
            </div>
          </motion.div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-white text-sm font-semibold tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accentLuxury transition-all duration-300">Hi, Krish</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-accentLuxury text-xs font-bold tracking-widest drop-shadow-[0_0_6px_rgba(255,213,74,0.5)]">Premium User</span>
              <BadgeCheck className="w-3.5 h-3.5 text-accentLuxury drop-shadow-[0_0_6px_rgba(255,213,74,0.5)]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


