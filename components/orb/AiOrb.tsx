"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AiOrb() {
  return (
    <div className="relative w-full h-80 flex items-center justify-center my-16 overflow-visible">
      
      {/* Immersive Volumetric Light Bloom Behind Orb */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-transparent via-[rgba(126,34,206,0.25)] to-transparent blur-[100px] rounded-full pointer-events-none"
      />

      {/* Gold warmth layer — very subtle */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-gradient-to-r from-transparent via-[rgba(255,213,74,0.08)] to-transparent blur-[80px] rounded-full pointer-events-none"
      />
      
      {/* Soft Blue Horizontal Energy Wave */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(126,34,206,0.25)] to-transparent drop-shadow-[0_0_10px_rgba(126,34,206,0.4)]" />
      
      {/* Wavy glowing lines connecting to orb */}
      <svg className="absolute w-[1000px] h-[200px] opacity-80 z-0 pointer-events-none" viewBox="0 0 1000 200">
        <motion.path 
          animate={{ d: ["M 0 100 Q 250 150 500 100 T 1000 100", "M 0 100 Q 250 50 500 100 T 1000 100", "M 0 100 Q 250 150 500 100 T 1000 100"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          fill="none" stroke="url(#blue-grad-bright)" strokeWidth="3" filter="blur(3px)" 
        />
        <motion.path 
          animate={{ d: ["M 0 100 Q 250 50 500 100 T 1000 100", "M 0 100 Q 250 150 500 100 T 1000 100", "M 0 100 Q 250 50 500 100 T 1000 100"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          fill="none" stroke="url(#blue-grad-dim)" strokeWidth="1" opacity="0.6" 
        />
        <defs>
          <linearGradient id="blue-grad-bright" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="rgba(126,34,206,0.1)" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="rgba(126,34,206,0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="blue-grad-dim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="rgba(126,34,206,0.05)" />
            <stop offset="50%" stopColor="#7E22CE" />
            <stop offset="70%" stopColor="rgba(126,34,206,0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Orb Container */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="relative flex items-center justify-center z-10 cursor-pointer group"
      >
        {/* Core Blue Aura Pulse */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-72 h-72 rounded-full bg-[#FFFFFF] blur-[100px] mix-blend-screen"
        />
        
        {/* Deep Royal Blue Secondary Pulse */}
        <motion.div
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute w-80 h-80 rounded-full bg-[#7E22CE] blur-[120px] mix-blend-screen"
        />

        {/* Subtle Gold Warmth Pulse */}
        <motion.div
          animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute w-60 h-60 rounded-full bg-[#FFD54A] blur-[100px] mix-blend-screen"
        />

        {/* Dynamic Soundwave Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            animate={{ scale: [1, 2.5], opacity: [0.2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: i * 1 }}
            className="absolute w-36 h-36 rounded-full border border-[rgba(126,34,206,0.15)] pointer-events-none"
            style={{ boxShadow: "0 0 20px rgba(126,34,206,0.08), inset 0 0 20px rgba(126,34,206,0.05)" }}
          />
        ))}

        {/* The Solid Luxury Glass Orb */}
        <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-[rgba(12,15,25,0.9)] via-[#04060B] to-[#081B33] border border-[rgba(126,34,206,0.15)] shadow-[inset_0_0_40px_rgba(126,34,206,0.1),0_0_80px_rgba(126,34,206,0.12),0_0_120px_rgba(126,34,206,0.05)] flex items-center justify-center overflow-hidden z-20 backdrop-blur-3xl">
          
          {/* Inner Blue Light Core (The "Brain") */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-[#4DA6FF] via-[#7E22CE] to-[#FFFFFF] blur-[25px] mix-blend-screen"
          />

          {/* Holographic Stardust Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 mix-blend-overlay" />
          
          {/* AI Face Eyes / Glowing nodes */}
          <motion.div 
            animate={{ height: [4, 2, 4], opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[40%] w-2 h-4 rounded-full bg-white shadow-[0_0_15px_#fff,0_0_25px_rgba(126,34,206,0.8)] left-10" 
          />
          <motion.div 
            animate={{ height: [4, 2, 4], opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="absolute top-[40%] w-2 h-4 rounded-full bg-white shadow-[0_0_15px_#fff,0_0_25px_rgba(126,34,206,0.8)] right-10" 
          />
          
          {/* Voice/Mouth Energy Line */}
          <motion.div 
            animate={{ width: [30, 45, 30], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[30%] h-1.5 rounded-full bg-gradient-to-r from-transparent via-[#FFFFFF] to-transparent shadow-[0_0_15px_rgba(126,34,206,0.4)]" 
          />

          {/* Premium Glass Spherical Highlight (Rim Lighting) */}
          <div className="absolute top-1 left-3 w-20 h-8 rounded-full bg-gradient-to-b from-[rgba(255,255,255,0.6)] to-transparent -rotate-[20deg] blur-[2px]" />
          <div className="absolute bottom-2 right-2 w-16 h-4 rounded-full bg-gradient-to-t from-[rgba(126,34,206,0.2)] to-transparent rotate-[20deg] blur-[3px]" />
        </div>

        {/* Orbiting Particle System — Blue + Gold mix */}
        <div className="absolute inset-0 w-[400px] h-[400px] -left-[140px] -top-[140px] pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{
                duration: 5 + Math.random() * 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-1/2 left-1/2 w-full h-full -ml-[50%] -mt-[50%]"
            >
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: 1 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
                className={`absolute rounded-full shadow-[0_0_10px_currentColor] ${i % 4 === 0 ? 'bg-accentLuxury text-accentLuxury w-[3px] h-[3px]' : i % 3 === 0 ? 'bg-accentLight text-accentLight w-[3px] h-[3px]' : 'bg-accent text-accent w-1.5 h-1.5'}`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 30}%`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}


