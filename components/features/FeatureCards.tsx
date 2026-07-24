"use client";

import React, { useRef, useState, useEffect } from "react";
import { Bot, Mic, Eye, Zap, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI AGENT MODE",
    desc: "Let AI handle tasks for you",
    icon: Bot,
    hasRobot: true,
    glow: "shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    color: "text-white",
  },
  {
    title: "VOICE COMMAND",
    desc: "Talk to your OS",
    icon: Mic,
    hasWave: true,
    glow: "shadow-[0_0_20px_rgba(147,51,234,0.15)]",
    color: "text-[#9333EA]",
  },
  {
    title: "AI VISION",
    desc: "See, Scan & Understand",
    icon: Eye,
    hasEye: true,
    glow: "shadow-[0_0_20px_rgba(147,51,234,0.15)]",
    color: "text-[#4DA6FF]",
  },
  {
    title: "AUTOMATION",
    desc: "Automate repetitive tasks",
    icon: Zap,
    hasLightning: true,
    glow: "shadow-[0_0_20px_rgba(147,51,234,0.15)]",
    color: "text-[#9333EA]",
  },
  {
    title: "FOCUS MUSIC",
    desc: "Beats to boost your focus",
    icon: Headphones,
    hasHeadphones: true,
    glow: "shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    color: "text-[#FFFFFF]",
  }
];

export default function FeatureCards() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto mb-16 overflow-hidden px-8 pt-6 pb-8" ref={carouselRef}>
      <motion.div 
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        whileTap={{ cursor: "grabbing" }}
        className="flex gap-6 cursor-grab"
      >
        {features.map((feat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
            className={`min-w-[210px] h-[130px] krish-glass rounded-[28px] p-5 relative overflow-hidden group pointer-events-auto
              hover:border hover:border-[rgba(255,255,255,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300`}
          >
          {/* Subtle Hover Glow Injection */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[rgba(255,255,255,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[28px] pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-white text-xs font-bold tracking-[0.18em] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">{feat.title}</h3>
            <p className="text-gray-300 text-xs mt-1.5 pr-10 tracking-wide font-medium group-hover:text-gray-100 transition-colors">{feat.desc}</p>
          </div>

          {feat.hasRobot && (
            <motion.div 
              className="absolute -bottom-2 -right-2 opacity-70 group-hover:opacity-100 transition-opacity"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-16 h-16 bg-[#9333EA] rounded-full blur-[20px] absolute opacity-60" />
              <Bot className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(147,51,234,0.8)] relative z-10" />
            </motion.div>
          )}

          {feat.hasWave && (
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
              {[...Array(12)].map((_, j) => (
                <motion.div 
                  key={j} 
                  animate={{ height: ["10px", `${Math.random() * 20 + 10}px`, "10px"] }}
                  transition={{ duration: 1 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 bg-[#9333EA] rounded-full shadow-[0_0_10px_rgba(147,51,234,0.6)]" 
                />
              ))}
            </div>
          )}

          {feat.hasEye && (
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-5 opacity-40 group-hover:opacity-100 transition-opacity"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
               <div className="w-20 h-20 bg-[#A855F7] rounded-full blur-[40px] absolute -left-2 -top-2" />
               <Eye className="w-16 h-16 text-[#4DA6FF] drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] relative z-10" />
            </motion.div>
          )}

          {feat.hasLightning && (
             <motion.div 
              className="absolute -bottom-2 -right-2 opacity-80 group-hover:opacity-100 transition-opacity"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             >
               <div className="w-16 h-16 bg-[#9333EA] rounded-full blur-[30px] absolute" />
               <Zap className="w-14 h-14 text-white drop-shadow-[0_0_20px_rgba(147,51,234,0.8)] fill-[#9333EA] relative z-10" />
             </motion.div>
          )}

          {feat.hasHeadphones && (
             <motion.div 
              className="absolute -bottom-2 -right-2 opacity-80 group-hover:opacity-100 transition-opacity"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             >
                 <div className="w-16 h-16 bg-[#9333EA] rounded-full blur-[30px] absolute" />
                 <Headphones className="w-14 h-14 text-white drop-shadow-[0_0_20px_rgba(147,51,234,0.8)] relative z-10" />
             </motion.div>
          )}
        </motion.div>
        ))}
      </motion.div>
    </div>
  );
}



