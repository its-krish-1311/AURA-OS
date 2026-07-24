"use client";

import React, { useState } from "react";
import { 
  Paperclip, Mic, Camera, Send, ChevronDown, 
  BrainCircuit, Globe, Sparkles
} from "lucide-react";

interface WorkspaceInputProps {
  onSendMessage: (msg: string) => void;
}

export default function WorkspaceInput({ onSendMessage }: WorkspaceInputProps) {
  const [message, setMessage] = useState("");
  const [thinking, setThinking] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const [model, setModel] = useState("GPT-4 Omni");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-6 relative z-50">
      
      {/* Floating Input Container */}
      <div className="relative krish-glass bg-[rgba(10,12,16,0.6)] backdrop-blur-2xl rounded-3xl border border-[rgba(255,255,255,0.08)] shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col p-2 transition-all focus-within:border-[rgba(37,99,235,0.3)] focus-within:shadow-[0_0_50px_rgba(37,99,235,0.15)]">
        
        {/* Glow underneath */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(147,51,234,0.02)] via-transparent to-[rgba(37,99,235,0.02)] rounded-3xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col">
          {/* Text Area */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Ask Aura anything..."
            className="w-full bg-transparent text-white placeholder-gray-500 px-4 pt-4 pb-2 resize-none outline-none min-h-[60px] max-h-[200px] text-[15px] custom-scrollbar"
            rows={1}
          />

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between px-2 pb-1 pt-2">
            
            {/* Left Actions (Attachments, Modifiers) */}
            <div className="flex items-center gap-1.5">
              <button type="button" className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all">
                <Paperclip className="w-4 h-4" />
              </button>
              
              <div className="h-4 w-[1px] bg-[rgba(255,255,255,0.1)] mx-1" />
              
              {/* Model Selector */}
              <button type="button" className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] transition-all">
                <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
                {model}
                <ChevronDown className="w-3.5 h-3.5 opacity-50" />
              </button>

              <div className="h-4 w-[1px] bg-[rgba(255,255,255,0.1)] mx-1" />

              {/* Thinking Toggle */}
              <button 
                type="button" 
                onClick={() => setThinking(!thinking)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  thinking 
                    ? 'bg-[rgba(147,51,234,0.15)] text-white border-[rgba(147,51,234,0.3)] shadow-[0_0_10px_rgba(147,51,234,0.2)]' 
                    : 'bg-[rgba(255,255,255,0.03)] text-gray-400 border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)]'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                Thinking
              </button>

              {/* Web Search Toggle */}
              <button 
                type="button" 
                onClick={() => setWebSearch(!webSearch)}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  webSearch 
                    ? 'bg-[rgba(37,99,235,0.15)] text-white border-[rgba(37,99,235,0.3)] shadow-[0_0_10px_rgba(37,99,235,0.2)]' 
                    : 'bg-[rgba(255,255,255,0.03)] text-gray-400 border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)]'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                Web Search
              </button>
            </div>

            {/* Right Actions (Mic, Camera, Send) */}
            <div className="flex items-center gap-1.5">
              <button type="button" className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all">
                <Mic className="w-4 h-4" />
              </button>
              <button type="button" className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all">
                <Camera className="w-4 h-4" />
              </button>
              
              <button 
                type="submit" 
                disabled={!message.trim()}
                className={`p-2.5 ml-1 rounded-full transition-all flex items-center justify-center ${
                  message.trim() 
                    ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:scale-105' 
                    : 'bg-[rgba(255,255,255,0.05)] text-gray-500'
                }`}
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="text-center mt-3">
        <p className="text-[10px] text-gray-600 font-medium tracking-wide">
          AuraOS AI can make mistakes. Consider verifying critical information.
        </p>
      </div>
    </div>
  );
}
