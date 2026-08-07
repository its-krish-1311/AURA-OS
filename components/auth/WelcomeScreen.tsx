"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [displayText, setDisplayText] = React.useState("");
  const fullText = "Welcome to Aura OS";
  useEffect(() => {
    // Auto-advance to auth screen after 4.5 seconds (giving time for the typewriter)
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);

    // Typewriter effect logic
    let i = 0;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) clearInterval(interval);
      }, 70);
      return () => clearInterval(interval);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(startDelay);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Background Ambient Glow Removed */}
      
      {/* Main Text */}
      <motion.div
        initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="mb-4 flex items-center justify-center"
        >
          <Image src="/logo.png" alt="Aura OS Logo" width={200} height={200} className="w-48 h-48 object-contain" />
        </motion.div>

        <div className="relative flex justify-center text-4xl md:text-6xl font-black tracking-tighter pr-2">
          {/* Invisible placeholder for size */}
          <span className="opacity-0 pointer-events-none">{fullText}</span>
          {/* Actual typewriter text */}
          <span className="absolute inset-0 text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#A855F7] pr-2">
            {displayText}
          </span>
        </div>
        
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#A855F7] to-transparent mt-6 w-48"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-8 krish-glass px-6 py-3 rounded-full border-[rgba(126,34,206,0.3)] shadow-[0_0_20px_rgba(126,34,206,0.15)] flex items-center gap-3 cursor-default"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#A855F7] shadow-[0_0_10px_#A855F7] animate-pulse"></div>
          <span className="text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#A855F7]">Engineered By</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#A855F7]">Krishna Kushwaha</span>
          </span>
        </motion.div>
        
      </motion.div>
    </motion.div>
  );
}
