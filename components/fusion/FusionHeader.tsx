"use client";

import React, { useState } from "react";
import { Search, Bell, Sun, BadgeCheck, LogOut, Mic, Image as ImageIcon, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";

export default function FusionHeader() {
  const { data: session } = useSession();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="w-full relative flex items-center justify-between py-6 px-8 z-50">
      {/* Left section spacer (empty on large screens, holds logo on mobile) */}
      <div className="w-[120px] flex items-center">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2">
           <h2 className="text-white font-bold tracking-widest text-lg">FUSION<span className="text-[#A855F7]">OS</span></h2>
        </div>
      </div>
      
      {/* Center: Pill & Search Bar */}
      <div className="flex-1 flex items-center justify-center gap-4 px-2">
        
        {/* Engineered By Badge */}
        <div className="hidden lg:flex krish-glass px-5 py-2.5 rounded-full border-[rgba(168,85,247,0.3)] shadow-[0_0_15px_rgba(168,85,247,0.1)] items-center gap-2.5 backdrop-blur-md hover:scale-105 transition-transform cursor-default whitespace-nowrap">
          <div className="w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_8px_#A855F7] animate-pulse"></div>
          <span className="text-xs font-bold tracking-widest flex items-center gap-1.5">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#A855F7]">Engineered By</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#A855F7]">Krishna Kushwaha</span>
          </span>
        </div>

        <motion.div 
          animate={isFocused ? { scale: 1.02, y: -2 } : { scale: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
          className="relative w-full max-w-[450px] group"
        >
          {/* Animated Glow Backdrop */}
          <div className={`absolute -inset-1 rounded-full blur-md transition-all duration-500 ${isFocused ? 'bg-gradient-to-r from-[rgba(168,85,247,0.1)] via-[rgba(168,85,247,0.2)] to-[rgba(168,85,247,0.1)] opacity-70' : 'opacity-0'}`}></div>
          
          <div className={`relative w-full h-12 krish-glass rounded-full flex items-center px-4 gap-3 transition-all duration-300 ${isFocused ? 'border-[rgba(168,85,247,0.4)] bg-[rgba(255,255,255,0.05)] shadow-[0_0_20px_rgba(168,85,247,0.2),0_0_40px_rgba(168,85,247,0.1)]' : ''}`}>
            <Search className={`w-5 h-5 transition-all duration-300 ${isFocused ? 'text-[#A855F7] drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : 'text-gray-400'}`} />
            <input 
              type="text" 
              placeholder="Search or ask anything..." 
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-gray-500 font-medium min-w-0"
            />
            <div className={`px-2 py-1 rounded text-xs font-semibold border shrink-0 transition-all duration-300 ${isFocused ? 'bg-[rgba(168,85,247,0.15)] text-white border-[rgba(168,85,247,0.3)] shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'bg-[rgba(255,255,255,0.05)] text-gray-400 border-[rgba(255,255,255,0.05)]'}`}>
              ⌘ K
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Controls */}
      <div className="flex-1 flex items-center justify-end gap-6">
        <motion.button whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.9 }} className="text-gray-400 hover:text-white transition-colors relative group">
          <Bell className="w-5 h-5 drop-shadow-[0_0_5px_rgba(168,85,247,0.2)] group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#A855F7] rounded-full border border-black shadow-[0_0_6px_rgba(168,85,247,0.5)]"></div>
        </motion.button>
        <motion.button whileHover={{ scale: 1.1, rotate: 45 }} whileTap={{ scale: 0.9 }} className="text-gray-400 hover:text-white transition-colors group">
          <Sun className="w-5 h-5 drop-shadow-[0_0_5px_rgba(168,85,247,0.2)] group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
        </motion.button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-[rgba(255,255,255,0.1)] cursor-pointer group">
          <motion.div whileHover={{ scale: 1.05 }} className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.1)] group-hover:border-[#A855F7] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-[#000000] to-[rgba(255,255,255,0.1)] flex items-center justify-center">
                <span className="text-white font-bold text-lg drop-shadow-md">K</span>
              </div>
            )}
          </motion.div>
          <div className="hidden xl:flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-white text-sm font-semibold tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#FCD34D] transition-all duration-300">{session?.user?.name ? `Hi, ${session.user.name.split(' ')[0]}` : 'Hi, Krish'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#FCD34D] text-xs font-bold tracking-widest drop-shadow-[0_0_6px_rgba(252,211,77,0.5)]">Premium User</span>
              <BadgeCheck className="w-3.5 h-3.5 text-[#FCD34D] drop-shadow-[0_0_6px_rgba(252,211,77,0.5)]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
