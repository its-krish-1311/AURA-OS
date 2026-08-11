"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, CornerDownLeft, X, LayoutDashboard, BrainCircuit, Database, Clock, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOSData } from "@/context/OSDataContext";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const { 
    studyTasks, careerTasks, devTasks, devSnippets, 
    goalsOkrs, libraryBooks, bizClients, autoWorkflows 
  } = useOSData();

  // Handle Keyboard Shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Aggregate and Filter Data
  const getResults = () => {
    const q = query.toLowerCase();
    
    // Default system actions
    const systemActions = [
      { id: 'sys1', type: 'System', title: 'Go to Main Dashboard', action: () => router.push('/'), icon: LayoutDashboard, color: 'text-white' },
      { id: 'sys2', type: 'System', title: 'Open AI Assistant', action: () => router.push('/os/career-os/ai'), icon: BrainCircuit, color: 'text-purple-500' },
      { id: 'sys3', type: 'System', title: 'View Execution Logs', action: () => router.push('/os/automation-os/logs'), icon: Zap, color: 'text-orange-500' },
    ].filter(i => i.title.toLowerCase().includes(q) || i.type.toLowerCase().includes(q));

    if (!q) return systemActions;

    // Search across modules
    const tasks = [
      ...studyTasks.map(t => ({ ...t, source: 'Study OS', route: '/os/study-os' })),
      ...careerTasks.map(t => ({ ...t, source: 'Career OS', route: '/os/career-os' })),
      ...devTasks.map(t => ({ ...t, source: 'Developer OS', route: '/os/developer-os' }))
    ].filter(t => t.title.toLowerCase().includes(q))
     .map(t => ({ id: t.id, type: t.source, title: t.title, action: () => router.push(t.route), icon: Database, color: 'text-blue-500' }));

    const snippets = devSnippets.filter(s => s.title.toLowerCase().includes(q) || s.language.toLowerCase().includes(q))
      .map(s => ({ id: s.id, type: 'Developer OS', title: `Snippet: ${s.title}`, action: () => router.push('/os/developer-os/snippets'), icon: Database, color: 'text-indigo-500' }));

    const books = libraryBooks.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
      .map(b => ({ id: b.id, type: 'Library OS', title: `Book: ${b.title}`, action: () => router.push('/os/library-os/books'), icon: Database, color: 'text-indigo-400' }));

    const clients = bizClients.filter(c => c.name.toLowerCase().includes(q))
      .map(c => ({ id: c.id, type: 'Business OS', title: `Client: ${c.name}`, action: () => router.push('/os/business-os/clients'), icon: Database, color: 'text-amber-500' }));

    const workflows = autoWorkflows.filter(w => w.name.toLowerCase().includes(q))
      .map(w => ({ id: w.id, type: 'Automation OS', title: `Pipeline: ${w.name}`, action: () => router.push('/os/automation-os/workflows'), icon: Zap, color: 'text-orange-500' }));

    const results = [...systemActions, ...tasks, ...snippets, ...books, ...clients, ...workflows].slice(0, 8);
    return results;
  };

  const results = getResults();

  // Handle Keyboard Navigation within modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results[selectedIndex]) {
          results[selectedIndex].action();
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[101] w-[90%] max-w-[600px] krish-glass rounded-2xl overflow-hidden border border-[#A855F7] shadow-[0_20px_60px_rgba(168,85,247,0.25)]"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-4 border-b border-[rgba(255,255,255,0.05)]">
              <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search across Aura OS or type a command..."
                className="w-full bg-transparent border-none outline-none text-white text-lg placeholder-gray-500 font-medium"
              />
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-[rgba(255,255,255,0.1)] text-gray-500 hover:text-white transition-colors ml-2 shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-2">
              {results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((result, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={result.id}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        onClick={() => {
                          result.action();
                          setIsOpen(false);
                        }}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                          isSelected ? 'bg-[rgba(255,255,255,0.1)]' : 'hover:bg-[rgba(255,255,255,0.05)]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-[rgba(255,255,255,0.05)] ${result.color}`}>
                            <result.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{result.title}</div>
                            <div className="text-xs text-gray-500">{result.type}</div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="text-gray-400 flex items-center gap-1 text-[10px] font-medium tracking-widest uppercase">
                            <CornerDownLeft className="w-3 h-3" />
                            Jump
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center">
                  <Command className="w-12 h-12 text-gray-600 mb-3" />
                  <p className="text-gray-400 text-sm">No results found across the ecosystem.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-[rgba(0,0,0,0.3)] border-t border-[rgba(255,255,255,0.05)] px-4 py-3 flex items-center justify-between">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 tracking-wider">
                  <kbd className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.1)] text-gray-300">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.1)] text-gray-300">↓</kbd>
                  Navigate
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 tracking-wider">
                  <kbd className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.1)] text-gray-300">↵</kbd>
                  Execute
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                <Command className="w-3 h-3" /> Aura OS Core
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
