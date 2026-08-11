"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  actionText?: string;
  requireInput?: boolean;
  inputPlaceholder?: string;
  onAction?: (inputValue?: string) => void;
}

export default function ActionModal({ 
  isOpen, onClose, title, description, actionText = "Proceed", 
  requireInput, inputPlaceholder, onAction 
}: ActionModalProps) {
  const [inputValue, setInputValue] = useState("");

  const handleClose = () => {
    setInputValue("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-full max-w-md krish-glass rounded-3xl p-6 border border-[rgba(255,255,255,0.1)] shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Ambient Background */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#7E22CE] blur-[60px] opacity-30 rounded-full pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-[rgba(126,34,206,0.2)] flex items-center justify-center border border-[rgba(126,34,206,0.3)]">
                <Sparkles className="w-5 h-5 text-[#A855F7]" />
              </div>
              <button onClick={handleClose} className="p-2 rounded-full hover:bg-[rgba(255,255,255,0.05)] text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative z-10">
              <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                {description || "This feature is currently being provisioned by your AI twin. It will be available shortly."}
              </p>

              {requireInput && (
                <div className="mb-6">
                  <input 
                    type="text" 
                    autoFocus
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={inputPlaceholder || "Enter details..."}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#A855F7] transition-colors"
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button 
                  onClick={handleClose}
                  className="flex-1 py-2.5 rounded-xl border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] text-white text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (onAction) onAction(requireInput ? inputValue : undefined);
                    handleClose();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#7E22CE] to-[#A855F7] text-white text-sm font-bold shadow-[0_0_15px_rgba(126,34,206,0.4)] hover:shadow-[0_0_25px_rgba(126,34,206,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  disabled={requireInput && !inputValue.trim()}
                >
                  {actionText} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
