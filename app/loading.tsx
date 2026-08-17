'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06070B]/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        {/* Glowing Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#A855F7] rounded-full blur-[60px] opacity-40 animate-pulse" />
        
        {/* Spinner Ring */}
        <div className="relative z-10 w-12 h-12">
          <motion.div
            className="absolute inset-0 border-t-2 border-r-2 border-[#D8B4FE] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 border-b-2 border-l-2 border-[#A855F7]/30 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Loading Text */}
        <motion.div 
          className="mt-6 text-[10px] uppercase tracking-[0.3em] font-semibold text-gray-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Initializing OS
        </motion.div>
      </div>
    </div>
  );
}
