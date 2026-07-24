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

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Home, label: "HOME", id: "home" },
  { icon: MessageSquare, label: "AI CHAT", id: "chat" },
  { icon: Layers, label: "FUSION OS", id: "fusion" },
  { icon: BrainCircuit, label: "NEURAL OS", id: "neural" },
  { icon: Wifi, label: "HOME OS", id: "home-os" },
  { icon: BookOpen, label: "STUDY OS", id: "study" },
  { icon: Briefcase, label: "CAREER", id: "career" },
  { icon: Shirt, label: "FASHION OS", id: "fashion" },
  { icon: Plane, label: "TRAVEL OS", id: "travel" },
  { icon: Heart, label: "HEALTH OS", id: "health" },
  { icon: Gamepad2, label: "GAMING OS", id: "gaming" },
  { icon: Palette, label: "CREATOR OS", id: "creator" },
  { icon: Music, label: "MUSIC OS", id: "music" },
  { icon: Shield, label: "SECURITY OS", id: "security" },
  { icon: Lightbulb, label: "INNOVATION", id: "innovation" },
  { icon: Globe, label: "PLANET OS", id: "planet" },
  { icon: Dna, label: "BIO OS", id: "bio" },
  { icon: Users, label: "SOCIAL OS", id: "social" },
  { icon: Fingerprint, label: "IDENTITY OS", id: "identity" },
  { icon: Wallet, label: "FINANCE", id: "finance" },
  { icon: Zap, label: "PRODUCTIVITY", id: "productivity" },
  { icon: Target, label: "GOALS", id: "goals" },
  { icon: Bot, label: "AUTOMATION", id: "automation" },
  { icon: Library, label: "LIBRARY", id: "library" },
  { icon: Settings, label: "SETTINGS", id: "settings" },
];

export default function Sidebar() {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);
  const { osName } = useOS();

  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
      className="w-[280px] flex-shrink-0 flex flex-col py-6 px-4 sticky top-[20px] rounded-[32px] krish-glass z-40"
    >
      {/* Corner Reflection — Top Right — Black Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.4),transparent_70%)] pointer-events-none mix-blend-multiply rounded-tr-[32px]"></div>
      
      {/* Corner Reflection — Bottom Left — Black Glow */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.3),transparent_70%)] pointer-events-none mix-blend-multiply rounded-bl-[32px]"></div>

      {/* Logo Area */}
      <div className="flex items-center gap-3 px-4 mb-8 relative z-10 group cursor-pointer">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, type: "spring" as const }}
          className="relative flex items-center justify-center"
        >
          <Image src="/logo.png" alt="Aura OS Logo" width={64} height={64} className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(var(--theme-rgb),0.5)]" />
        </motion.div>
        <div className="flex flex-col justify-center">
          <h1 className="font-extrabold text-[22px] tracking-tight leading-none text-[var(--theme-color)] drop-shadow-[0_0_12px_rgba(var(--theme-rgb),0.8)] transition-all duration-300 uppercase truncate max-w-[150px]">{osName}</h1>
          <p className="text-gray-300 text-xs font-bold tracking-[0.2em] mt-1 opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_5px_rgba(var(--theme-rgb-dark),0.3)]">AI OPERATING SYSTEM</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-2 mb-6 relative group z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(var(--theme-rgb-dark),0.1)] to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-md pointer-events-none"></div>
        <div className="relative flex items-center w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden focus-within:border-[rgba(var(--theme-rgb-dark),0.4)] focus-within:bg-[rgba(var(--theme-rgb-dark),0.05)] focus-within:shadow-[0_0_15px_rgba(var(--theme-rgb-dark),0.15)] transition-all">
          <Search className="w-4 h-4 text-gray-500 ml-3 group-focus-within:text-[var(--theme-color)] transition-colors" />
          <input 
            type="text"
            placeholder="Search OS..."
            className="w-full bg-transparent text-white text-xs px-3 py-2.5 outline-none placeholder:text-gray-400 font-medium"
          />
        </div>
      </div>

      {/* Nav Items */}
      <div 
        className="h-[350px] overflow-y-auto overflow-x-hidden pr-2 space-y-1 relative z-10 custom-scrollbar"
        onMouseLeave={() => setHovered(null)}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          const isHovered = hovered === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => setActive(item.id)}
              onMouseEnter={() => setHovered(item.id)}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-2.5 rounded-2xl transition-all duration-300 text-sm font-semibold tracking-wide relative group outline-none",
                isActive 
                  ? "text-accentLuxury" 
                  : "text-gray-400 hover:text-white"
              )}
            >
              {/* Active Morphing Background — Blue tint gradient */}
              {isActive && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 rounded-2xl border-l-[3px] border-accentLuxury"
                  style={{
                    background: 'linear-gradient(to right, rgba(var(--theme-rgb-dark),0.08), transparent)',
                    boxShadow: 'inset 20px 0 40px rgba(var(--theme-rgb-dark),0.03)',
                  }}
                  initial={false}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover highlight — Subtle blue wash */}
              <AnimatePresence>
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: 'rgba(var(--theme-rgb-dark),0.04)' }}
                  />
                )}
              </AnimatePresence>

              {/* Active Gold Indicator Light */}
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accentLuxury rounded-r-md shadow-goldGlow"
                  initial={false}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex items-center gap-4">
                <Icon 
                  className={cn(
                    "w-5 h-5 transition-all duration-500",
                    isActive 
                      ? "drop-shadow-goldGlow scale-110" 
                      : "group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] text-gray-400 group-hover:text-white"
                  )} 
                />
                <span className={cn(
                  "relative transition-all duration-300",
                  isActive && "drop-shadow-[0_0_8px_rgba(255,213,74,0.6)]"
                )}>
                  {item.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Profile/AI */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="mt-4 krish-glass rounded-[24px] p-4 relative overflow-hidden group"
      >
        {/* Hover overlay — Blue wash */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(to bottom, rgba(var(--theme-rgb-dark),0.08), transparent)' }}
        />
        
        {/* Animated gradient sweep */}
        <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent skew-x-[-20deg] group-hover:animate-[sweep_1.5s_ease-in-out]" />

        <div className="flex items-center gap-3 relative z-10">
          <div 
            className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] flex items-center justify-center overflow-hidden shadow-goldGlow"
          >
            <Bot 
              className="w-5 h-5 text-accentLuxury" 
              style={{ filter: 'drop-shadow(0 0 8px rgba(255,213,74,0.5))' }}
            />
          </div>
          <div>
            <h3 className="text-white text-sm font-bold tracking-wide group-hover:text-accentLuxury transition-colors">KRISH AI</h3>
            <p className="text-gray-300 text-xs uppercase tracking-wider">Powered by</p>
            <p 
              className="text-accentLuxury text-xs font-bold tracking-wider"
              style={{ textShadow: '0 0 8px rgba(255,213,74,0.3)' }}
            >Advanced GPT 5.0</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 relative overflow-hidden text-white text-xs font-bold py-2.5 rounded-full transition-all duration-300 backdrop-blur-3xl"
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.4)',
            boxShadow: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.4)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
          }}
        >
          <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.1\"/%3E%3C/svg%3E')] opacity-30 mix-blend-overlay"}></div>
          <span className="relative z-10 uppercase tracking-widest drop-shadow-md">Upgrade Plan</span>
        </motion.button>
      </motion.div>



      <style jsx>{`
        @keyframes sweep {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
    </motion.div>
  );
}


