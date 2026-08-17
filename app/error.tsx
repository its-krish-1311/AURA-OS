'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#06070B] text-white p-6 relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-ethno tracking-wider mb-3">System Malfunction</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Aura OS encountered an unexpected error. Our automated systems have logged the incident. 
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-semibold tracking-wide transition-all active:scale-95 flex items-center gap-2"
          >
            Restart Module
          </button>
          
          <Link href="/">
            <button className="px-6 py-2.5 rounded-full bg-[#A855F7]/10 hover:bg-[#A855F7]/20 border border-[#A855F7]/20 text-[#D8B4FE] text-sm font-semibold tracking-wide transition-all active:scale-95 flex items-center gap-2">
              Return Home
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
