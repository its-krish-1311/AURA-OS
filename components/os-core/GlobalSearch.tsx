"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, Brain, FileText, Settings, Video, Target, Music } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Toggle with Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const searchResults = [
    { title: "Ask Aura Tutor about 'Quantum States'", category: "AI Assistant", icon: Brain, action: () => router.push("/os/study-os/ai"), color: "text-[#3B82F6]" },
    { title: "Start Mock Interview for 'Google'", category: "Career OS", icon: Video, action: () => router.push("/os/career-os/interviews"), color: "text-[#10B981]" },
    { title: "Resume: 'Aura_Template_Professional.pdf'", category: "Files", icon: FileText, action: () => router.push("/os/career-os/resume"), color: "text-[#A855F7]" },
    { title: "Configure Study Timer", category: "Settings", icon: Settings, action: () => router.push("/os/study-os/settings"), color: "text-gray-400" },
    { title: "Daily Goal: Complete System Design", category: "Tasks", icon: Target, action: () => router.push("/os/career-os"), color: "text-rose-500" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
            className="fixed z-[101] top-[15vh] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-[rgba(10,12,16,0.85)] border border-[rgba(255,255,255,0.1)] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_20px_rgba(147,51,234,0.1)] overflow-hidden backdrop-blur-xl"
          >
            {/* Search Input */}
            <div className="flex items-center px-6 py-4 border-b border-[rgba(255,255,255,0.05)] relative">
              <Search className="w-6 h-6 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search Aura OS or ask AI..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white text-xl px-4 py-2 placeholder-gray-500"
              />
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded-md">
                <Command className="w-3 h-3" /> ESC
              </div>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
              {query === "" ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  <Command className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-sm font-medium">Type anything to search across all OS modules, files, and AI agents.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Quick Actions
                  </div>
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        result.action();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-[rgba(255,255,255,0.05)] transition-colors group text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl bg-[rgba(255,255,255,0.05)] ${result.color}`}>
                          <result.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">{result.title}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{result.category}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)] flex justify-between items-center text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">↵</kbd>
                Select
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
