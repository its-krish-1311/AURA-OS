"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, MonitorPlay, X, Copy, Check, Maximize2, Download } from "lucide-react";

interface ArtifactViewerProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  title?: string;
}

export default function ArtifactViewer({ isOpen, onClose, code, title = "Generated Component" }: ArtifactViewerProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.95 }}
          transition={{ type: "spring" as const, damping: 25, stiffness: 200 }}
          className="w-full h-full flex flex-col bg-[#04060B] border border-[rgba(255,255,255,0.08)] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(147,51,234,0.15)] relative z-40"
        >
          {/* Header */}
          <div className="h-14 px-4 flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]">
            <div className="flex items-center gap-3">
              <div className="flex bg-[rgba(255,255,255,0.05)] rounded-lg p-1">
                <button 
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === 'preview' ? 'bg-[rgba(147,51,234,0.2)] text-white shadow-[0_0_10px_rgba(147,51,234,0.2)]' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  <MonitorPlay className="w-3.5 h-3.5" />
                  Preview
                </button>
                <button 
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === 'code' ? 'bg-[rgba(147,51,234,0.2)] text-white shadow-[0_0_10px_rgba(147,51,234,0.2)]' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Code
                </button>
              </div>
              <div className="w-[1px] h-4 bg-[rgba(255,255,255,0.1)] mx-1"></div>
              <span className="text-xs font-medium text-gray-300 tracking-wide">{title}</span>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={handleCopy} className="p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-all" title="Copy Code">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-all" title="Download">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-all" title="Fullscreen">
                <Maximize2 className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-[rgba(255,255,255,0.1)] mx-1"></div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-400 hover:bg-[rgba(239,68,68,0.1)] rounded-lg transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-hidden relative bg-[#09090b]">
            <AnimatePresence mode="wait">
              {activeTab === "preview" ? (
                <motion.div 
                  key="preview"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="w-full h-full p-4 overflow-auto flex items-center justify-center"
                >
                  {/* MOCK PREVIEW UI */}
                  <div className="w-full max-w-sm krish-glass p-6 rounded-2xl border border-[rgba(255,255,255,0.1)] shadow-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(147,51,234,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9333EA] to-[#A855F7] p-[1px] shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                        <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A855F7] font-bold text-lg">AI</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-bold tracking-wide">Generated App</h4>
                        <p className="text-gray-400 text-xs">React Component</p>
                      </div>
                    </div>
                    <div className="space-y-4 relative z-10">
                      <div className="w-full h-24 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center group-hover:border-[rgba(147,51,234,0.2)] transition-all">
                         <span className="text-gray-500 text-sm">App UI Elements</span>
                      </div>
                      <div className="w-3/4 h-8 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]"></div>
                      <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white font-bold text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-[1.02] transition-all">
                        Interact
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="code"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="w-full h-full overflow-auto p-4 bg-[#04060B]"
                >
                  <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
                    <code>{code || `// Wait for AI to generate code...`}</code>
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
