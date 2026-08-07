"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LivingBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#06070B]">
      
      {/* Base Dark Slate/Graphite Gradient (Brighter than black, darker than original) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0C13] via-[#0E1118] to-[#07090D] opacity-95" />

      {/* Floating Moody Slate Orbs using Framer Motion */}
      
      {/* Top Left Deep Blue/Grey Blob */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -80, 80, 0],
          scale: [1, 1.1, 0.95, 1],
          rotate: [0, 45, 90, 180],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ willChange: "transform" }}
        className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#181C26] blur-[120px] opacity-40 pointer-events-none"
      />

      {/* Center Right Dark Steel Blob */}
      <motion.div
        animate={{
          x: [0, -100, 40, 0],
          y: [0, 80, -100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: "transform" }}
        className="absolute top-[20%] -right-[15%] w-[70vw] h-[70vw] rounded-full bg-[#11141C] blur-[130px] opacity-50 pointer-events-none"
      />

      {/* Bottom Center Cool Graphite Liquid */}
      <motion.div
        animate={{
          x: [-40, 80, -80, -40],
          y: [40, -40, 80, 40],
          scale: [1, 1.1, 1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ willChange: "transform" }}
        className="absolute -bottom-[20%] left-[15%] w-[80vw] h-[50vw] rounded-full bg-[#151923] blur-[100px] opacity-50 pointer-events-none"
      />

      {/* Subtle Mist/Cloud Highlight Blob */}
      <motion.div
        animate={{
          x: [60, -60, 30, 60],
          y: [-30, 40, -30, -30],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: "transform" }}
        className="absolute top-[40%] left-[40%] w-[50vw] h-[50vw] rounded-full bg-[#1D212E] blur-[110px] opacity-30 pointer-events-none"
      />

      {/* Fine Noise Overlay for premium matte finish - Optimized */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          transform: 'translateZ(0)'
        }}
      />
    </div>
  );
}
