"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, MessageSquare, BookOpen, Briefcase, Shirt, Plane, Heart, 
  Wallet, Zap, Target, Bot, Library, Settings, Shield, User, Bell, ChevronLeft, Hexagon, Command, Search,
  Gamepad2, Palette, Music, Lightbulb, Globe, Dna, Users, Fingerprint, Layers, BrainCircuit, Wifi
} from "lucide-react";
import Image from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useOS } from "@/context/OSContext";

import { useRouter, usePathname } from "next/navigation";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Home, label: "Home", id: "home", href: "/" },
  { icon: MessageSquare, label: "AI Chat", id: "chat", href: "/chat" },
  { icon: BookOpen, label: "Study OS", id: "study", href: "/os/study-os" },
  { icon: Briefcase, label: "Career OS", id: "career", href: "/os/career-os" },
  { icon: Wallet, label: "Finance OS", id: "finance", href: "/os/finance-os" },
  { icon: Heart, label: "Health OS", id: "health", href: "/os/health-os" },
  { icon: Plane, label: "Travel OS", id: "travel", href: "/os/travel-os" },
  { icon: Shirt, label: "Fashion OS", id: "fashion", href: "/os/fashion-os" },
  { icon: Globe, label: "Goals OS", id: "goals", href: "/os/goals-os" },
];

export default function Sidebar() {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);
  const router = useRouter();

  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
      className="w-[260px] flex-shrink-0 flex flex-col py-6 px-4 sticky top-[20px] rounded-[32px] krish-glass z-40 border border-[rgba(255,255,255,0.05)] bg-[rgba(10,10,10,0.4)] hover:bg-[rgba(255,255,255,0.02)] hover:backdrop-blur-3xl hover:border-[rgba(255,255,255,0.1)] transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
    >
      {/* Corner Reflection — Top Right — Black Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.4),transparent_70%)] pointer-events-none mix-blend-multiply rounded-tr-[32px]"></div>
      
      {/* Corner Reflection — Bottom Left — Black Glow */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.3),transparent_70%)] pointer-events-none mix-blend-multiply rounded-bl-[32px]"></div>

      {/* Logo Area */}
      <div className="flex items-center gap-3 px-4 mb-8 relative z-10 cursor-pointer group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7E22CE] to-[#A855F7] flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all">
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-extrabold text-[15px] tracking-widest leading-none text-white transition-all duration-300 uppercase">AURA OS</h1>
          <p className="text-gray-400 text-[9px] font-medium tracking-wider mt-1">AI Operating System</p>
        </div>
      </div>

      {/* Nav Items */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden space-y-1 relative z-10 custom-scrollbar mb-4"
        onMouseLeave={() => setHovered(null)}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          const isHovered = hovered === item.id;

          return (
              <motion.div
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  router.push(item.href || "/");
                }}
                onMouseEnter={() => setHovered(item.id)}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-sm font-medium tracking-wide relative group outline-none cursor-pointer",
                  isActive 
                    ? "text-white" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                {/* Active Purple Pill Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 rounded-2xl bg-[rgba(168,85,247,0.15)] border border-[rgba(168,85,247,0.2)]"
                    initial={false}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Hover highlight */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex items-center gap-3 flex-1">
                  <Icon 
                    className={cn(
                      "w-4 h-4 transition-all duration-300",
                      isActive 
                        ? "text-white" 
                        : "text-gray-400 group-hover:text-white"
                    )} 
                  />
                  <span className="relative transition-all duration-300">
                    {item.label}
                  </span>
                </div>

                {/* Right Dot Indicator for Active */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavDot"
                    className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_8px_rgba(168,85,247,1)] relative z-10"
                    initial={false}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
          );
        })}
      </div>

      {/* Bottom Profile / Upgrade Card */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="krish-glass rounded-[24px] p-4 relative overflow-hidden group border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]"
      >
        <div className="flex items-center gap-3 relative z-10 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[rgba(255,213,74,0.3)] shadow-[0_0_10px_rgba(255,213,74,0.1)]">
            <img src="https://ui-avatars.com/api/?name=Krish+Sharma&background=FFD54A&color=000&bold=true" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-white text-xs font-bold tracking-wide">Krish Sharma</h3>
            <p className="text-[#FFD54A] text-[10px] font-bold tracking-wider uppercase mt-0.5" style={{ textShadow: '0 0 8px rgba(255,213,74,0.3)' }}>
              Elite Member
            </p>
          </div>
        </div>
        
        <button 
          className="w-full relative overflow-hidden text-black text-xs font-bold py-2.5 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(255,213,74,0.3)] hover:shadow-[0_0_20px_rgba(255,213,74,0.5)] bg-gradient-to-r from-[#FFD54A] to-[#FBBF24] hover:scale-[1.02]"
        >
          <span className="relative z-10 tracking-wide text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">Upgrade to Aura Pro</span>
        </button>
      </motion.div>
    </motion.div>
  );
}


