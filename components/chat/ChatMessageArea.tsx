"use client";

import React, { useRef, useEffect } from "react";
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Volume2, Share, Bookmark, Download, Bot, User, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

interface ChatMessageAreaProps {
  messages: Message[];
  currentModel: string;
  onModelChange: (model: string) => void;
  isTyping?: boolean;
}

export default function ChatMessageArea({ messages, currentModel, onModelChange, isTyping }: ChatMessageAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const models = ["GPT 5.0", "Claude", "Gemini", "DeepSeek", "Mistral", "Local AI"];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      
      {/* Header - Model Selector */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-center z-10 pb-10">
        <div className="krish-glass rounded-full px-4 py-1.5 flex items-center gap-2 border border-[rgba(255,255,255,0.05)] shadow-lg">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Model</span>
          <select 
            value={currentModel}
            onChange={(e) => onModelChange(e.target.value)}
            className="bg-transparent text-white text-sm font-bold outline-none cursor-pointer appearance-none"
          >
            {models.map(m => <option key={m} value={m} className="bg-[#0B0B13] text-white">{m}</option>)}
          </select>
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse ml-2"></div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-10 pt-20 pb-4 custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {messages.map((msg, idx) => (
            <motion.div 
              key={msg.id || idx}
              initial={{ opacity: 0, x: msg.role === 'user' ? 50 : -50, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'user' ? (
                // USER MESSAGE
                <div className="group max-w-[85%] sm:max-w-[70%]">
                  <div className="bg-gradient-to-br from-[#7E22CE] to-[#6B21A8] border border-[rgba(255,255,255,0.15)] px-7 py-4 rounded-[40px] rounded-tr-[10px] shadow-[0_5px_30px_rgba(126,34,206,0.4)] relative backdrop-blur-3xl">
                    <p className="text-white text-sm font-semibold tracking-wide leading-relaxed whitespace-pre-wrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{msg.content}</p>
                    
                    {/* Floating Actions */}
                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                      <button className="p-1.5 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-gray-400 hover:text-white transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-gray-400 hover:text-white transition-all"><Copy className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="text-right mt-1.5 mr-2 text-[10px] text-gray-500 font-medium">{msg.timestamp || 'Just now'}</div>
                </div>
              ) : (
                // AI MESSAGE
                <div className="group max-w-[95%] sm:max-w-[85%] flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 mt-2 rounded-full bg-gradient-to-br from-[#A855F7] to-[#06B6D4] p-[1px] shadow-[0_0_15px_rgba(126,34,206,0.3)]">
                    <div className="w-full h-full rounded-full bg-[#0B0B13] flex items-center justify-center overflow-hidden">
                      <img src="/logo.png" alt="Aura OS" className="w-full h-full object-cover p-1.5" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.08)] px-7 py-4 rounded-[40px] rounded-tl-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-3xl">
                      <div className="text-gray-100 text-sm font-medium tracking-wide leading-relaxed whitespace-pre-wrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                        {msg.content}
                      </div>
                    </div>
                    
                    {/* Action Bar */}
                    <div className="flex items-center gap-2 mt-2 ml-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-white transition-colors" title="Copy"><Copy className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-green-400 transition-colors" title="Good"><ThumbsUp className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400 transition-colors" title="Bad"><ThumbsDown className="w-4 h-4" /></button>
                      <div className="w-px h-4 bg-[rgba(255,255,255,0.1)] mx-1"></div>
                      <button className="p-1.5 text-gray-400 hover:text-white transition-colors" title="Speak"><Volume2 className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-white transition-colors" title="Regenerate"><RotateCcw className="w-4 h-4" /></button>
                      <div className="w-px h-4 bg-[rgba(255,255,255,0.1)] mx-1"></div>
                      <button className="p-1.5 text-gray-400 hover:text-white transition-colors" title="Share"><Share className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-[#06B6D4] transition-colors" title="Bookmark"><Bookmark className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, x: -50, y: 10 }} 
              animate={{ opacity: 1, x: 0, y: 0 }} 
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex gap-4 max-w-[85%] justify-start"
            >
              <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-[#A855F7] to-[#06B6D4] p-[1px] shadow-[0_0_15px_rgba(126,34,206,0.3)]">
                <div className="w-full h-full rounded-full bg-[#0B0B13] flex items-center justify-center overflow-hidden">
                  <img src="/logo.png" alt="Aura OS" className="w-full h-full object-cover p-1.5" />
                </div>
              </div>
              <div className="krish-glass px-5 py-3 rounded-3xl rounded-tl-sm border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                <span className="text-sm font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 animate-pulse">
                  Engineering Intelligence...
                </span>
              </div>
            </motion.div>
          )}
          
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>
    </div>
  );
}
