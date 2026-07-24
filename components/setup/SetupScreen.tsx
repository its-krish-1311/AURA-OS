"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Settings, Loader2 } from "lucide-react";
import { useOS } from "@/context/OSContext";

interface SetupScreenProps {
  onComplete: () => void;
}

export default function SetupScreen({ onComplete }: SetupScreenProps) {
  const { osName, setOsName } = useOS();
  const [inputValue, setInputValue] = useState(osName === "Aura OS" ? "" : osName);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Save the new OS name, default to Aura OS if empty
    const finalName = inputValue.trim() || "Aura OS";
    setOsName(finalName);

    // Simulate system initialization
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent overflow-hidden"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: 0.2 }}
        className="w-full max-w-[420px] mx-4 relative"
      >
        <div className="p-8 rounded-[32px] border border-[rgba(168,85,247,0.2)] shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1)] relative overflow-hidden w-full max-w-md">
          
          {/* Top Icon */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-6 flex items-center justify-center bg-[rgba(168,85,247,0.1)] w-20 h-20 rounded-full border border-[rgba(168,85,247,0.3)] shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <Settings className="w-10 h-10 text-[#A855F7] drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            </div>
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A855F7] tracking-tight text-center">
              Configure Your Twin
            </h2>
            <p className="text-gray-400 text-sm mt-2 text-center leading-relaxed">
              Do you want to change your OS name? <br/> Enter a custom name for your environment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative group">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. KRISH OS" 
                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.2)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] rounded-full py-4 px-6 text-center text-lg font-bold tracking-wider text-white outline-none focus:border-[rgba(168,85,247,0.4)] focus:bg-[rgba(168,85,247,0.05)] focus:shadow-[0_0_15px_rgba(168,85,247,0.15),inset_0_1px_2px_rgba(255,255,255,0.1)] transition-all uppercase"
              />
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-[#9333EA] to-[#A855F7] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white font-bold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Initializing...</span>
                </>
              ) : (
                <>
                  <span>Enter Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => { setOsName("Aura OS"); onComplete(); }}
              className="text-gray-500 text-xs hover:text-white transition-colors"
            >
              Skip, keep as Aura OS
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
