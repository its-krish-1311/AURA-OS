"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles, Zap, Shield, Crown, Loader2 } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <div className="absolute inset-0" onClick={onClose} />
          
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl krish-glass rounded-3xl p-8 overflow-hidden"
          >
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#9333EA] blur-[120px] opacity-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#3B82F6] blur-[120px] opacity-20 pointer-events-none" />

            <div className="flex justify-between items-center mb-8 relative z-10">
              <div>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A855F7] flex items-center gap-2">
                  Upgrade to Premium <Crown className="w-6 h-6 text-[#FFD54A]" />
                </h2>
                <p className="text-gray-400 mt-2">Unlock the full potential of your AI digital twin.</p>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              
              {/* Free Plan */}
              <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] p-6">
                <h3 className="text-xl font-bold text-white mb-2">Basic OS</h3>
                <p className="text-3xl font-black text-white mb-6">$0<span className="text-lg text-gray-500 font-medium">/month</span></p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-300"><Check className="w-5 h-5 text-gray-500" /> Standard UI Access</li>
                  <li className="flex items-center gap-3 text-gray-300"><Check className="w-5 h-5 text-gray-500" /> Local Database</li>
                  <li className="flex items-center gap-3 text-gray-500"><X className="w-5 h-5" /> No Advanced AI</li>
                  <li className="flex items-center gap-3 text-gray-500"><X className="w-5 h-5" /> No Cloud Sync</li>
                </ul>
                <button disabled className="w-full py-3 rounded-full bg-[rgba(255,255,255,0.05)] text-gray-400 font-semibold cursor-not-allowed">
                  Current Plan
                </button>
              </div>

              {/* Premium Plan */}
              <div className="rounded-2xl border-2 border-[#A855F7] bg-[rgba(168,85,247,0.1)] p-6 relative overflow-hidden group">
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent skew-x-[-25deg] group-hover:animate-[sweep_2s_ease-in-out_infinite]" />
                
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  MOST POPULAR
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  Pro OS <Sparkles className="w-5 h-5 text-[#A855F7]" />
                </h3>
                <p className="text-3xl font-black text-white mb-6">$19<span className="text-lg text-[#A855F7] font-medium">/month</span></p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-white"><Check className="w-5 h-5 text-[#A855F7]" /> Premium Glassmorphism UI</li>
                  <li className="flex items-center gap-3 text-white"><Check className="w-5 h-5 text-[#A855F7]" /> Cloud Database Sync</li>
                  <li className="flex items-center gap-3 text-white"><Check className="w-5 h-5 text-[#A855F7]" /> Unlimited Advanced AI Models</li>
                  <li className="flex items-center gap-3 text-white"><Check className="w-5 h-5 text-[#A855F7]" /> Priority Support</li>
                </ul>
                <button 
                  onClick={handleSubscribe}
                  disabled={isProcessing}
                  className="relative w-full py-3 rounded-full bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2 hover:-translate-y-1 hover:scale-[1.02]"
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Upgrade to Pro"}
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
