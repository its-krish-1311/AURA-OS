"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Video, Settings, Play, Square, Settings2, Sparkles, Building2, User, Bot, Loader2 } from "lucide-react";

export default function CareerOSInterviews() {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Mic className="w-8 h-8 text-[#10B981]" /> Mock Interviews
          </h1>
          <p className="text-gray-400 text-sm">Practice with an AI interviewer tailored to your target company.</p>
        </div>
        <div className="flex gap-3">
          <button className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Settings2 className="w-4 h-4" /> Setup Profile
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* Main Stage (Video / Audio Area) */}
        <div className="lg:col-span-2 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col overflow-hidden relative">
          
          {/* AI Interviewer Visualization */}
          <div className="flex-1 flex flex-col items-center justify-center relative">
            
            {/* Ambient Aura representing the AI */}
            <motion.div 
              animate={{ 
                scale: isInterviewActive ? (isSpeaking ? [1, 1.2, 1] : [1, 1.05, 1]) : 1,
                opacity: isInterviewActive ? (isSpeaking ? [0.2, 0.4, 0.2] : 0.15) : 0.05
              }}
              transition={{ duration: isSpeaking ? 2 : 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[400px] h-[400px] rounded-full bg-[#10B981] blur-[120px] pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border-2 border-[rgba(16,185,129,0.3)] bg-gradient-to-br from-[rgba(16,185,129,0.1)] to-[rgba(16,185,129,0.02)] flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)] mb-8">
                <Bot className="w-12 h-12 text-[#10B981]" />
              </div>

              <AnimatePresence mode="wait">
                {!isInterviewActive ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Ready to start?</h2>
                    <p className="text-gray-400 max-w-sm mx-auto">Your AI interviewer will conduct a 30-minute technical screen for the Frontend Engineer role at Google.</p>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      {isSpeaking ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-bounce" style={{ animationDelay: '300ms' }} />
                        </>
                      ) : (
                        <div className="text-[#10B981] flex items-center gap-2">
                          <Mic className="w-4 h-4 animate-pulse" /> Listening to you...
                        </div>
                      )}
                    </div>
                    <p className="text-xl text-white font-medium max-w-lg mx-auto leading-relaxed">
                      "Could you explain the difference between client-side rendering and server-side rendering in the context of Next.js?"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Controls Dock */}
          <div className="h-24 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)] flex items-center justify-center gap-6">
            {!isInterviewActive ? (
              <button 
                onClick={() => { setIsInterviewActive(true); setTimeout(() => setIsSpeaking(true), 1000); setTimeout(() => setIsSpeaking(false), 4000); }}
                className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-3 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-2 transition-all hover:scale-105"
              >
                <Play className="w-5 h-5 fill-white" /> Start Interview
              </button>
            ) : (
              <>
                <button className="w-14 h-14 rounded-full krish-glass border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-gray-400 hover:text-white transition-all hover:bg-[rgba(255,255,255,0.1)]">
                  <Mic className="w-6 h-6" />
                </button>
                <button className="w-14 h-14 rounded-full krish-glass border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-gray-400 hover:text-white transition-all hover:bg-[rgba(255,255,255,0.1)]">
                  <Video className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setIsInterviewActive(false)}
                  className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all hover:scale-105"
                >
                  <Square className="w-5 h-5 fill-white" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Panel (Settings & Feedback) */}
        <div className="flex flex-col gap-6">
          {/* Configuration */}
          <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#10B981]" /> Interview Setup
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Target Company</label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center text-white font-bold">G</div>
                  <div>
                    <p className="text-sm font-semibold text-white">Google</p>
                    <p className="text-xs text-gray-400">Technical Screen</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Role Focus</label>
                <select className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-2 outline-none focus:border-[#10B981] transition-all">
                  <option>Frontend Engineer</option>
                  <option>Full Stack Developer</option>
                  <option>System Design</option>
                  <option>Behavioral</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Difficulty</label>
                <div className="flex gap-2">
                  {['Standard', 'Hard', 'Expert'].map(level => (
                    <button key={level} className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${level === 'Hard' ? 'bg-[rgba(16,185,129,0.1)] text-[#10B981] border-[#10B981]' : 'bg-[rgba(255,255,255,0.03)] text-gray-400 border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)]'}`}>
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Feedback */}
          <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex-1 overflow-hidden flex flex-col">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#10B981]" /> AI Feedback
            </h3>
            
            {isInterviewActive ? (
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                <div className="p-3 rounded-xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)]">
                  <p className="text-xs text-gray-300">
                    <strong className="text-[#10B981]">Good Start:</strong> Your explanation of SSR was clear. Remember to mention hydration when discussing Next.js.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)]">
                  <p className="text-xs text-gray-300">
                    <strong className="text-[#F59E0B]">Pacing:</strong> You're speaking a bit quickly. Take a breath before answering the next technical question.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <Bot className="w-8 h-8 text-gray-500 mb-3" />
                <p className="text-sm text-gray-400">Real-time feedback will appear here during the interview.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
