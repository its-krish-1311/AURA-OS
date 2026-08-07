"use client";

import React, { useState, useEffect } from "react";
import { Mic, Send, Globe, Brain, Zap, FileText, Image as ImageIcon, BarChart2, Video, Loader2, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface AdvancedChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing?: boolean;
}

const PROMPTS = [
  "Ask Aura AI anything...",
  "Analyze my code...",
  "Write an email...",
  "Search the web...",
  "Generate an image..."
];

export default function AdvancedChatInput({ onSendMessage, isProcessing }: AdvancedChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [activeToggles, setActiveToggles] = useState<string[]>([]);
  
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = React.useRef<any>(null);
  const latestInputRef = React.useRef("");

  const submitQuery = (query: string) => {
    if (!query.trim() || isProcessing) return;
    onSendMessage(query);
    setInputValue("");
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      setInputValue(transcript);
      latestInputRef.current = transcript;
    };
    
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
      if (latestInputRef.current.trim()) {
        submitQuery(latestInputRef.current);
        latestInputRef.current = "";
      }
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const toggleAction = (action: string) => {
    setActiveToggles(prev => 
      prev.includes(action) ? prev.filter(a => a !== action) : [...prev, action]
    );
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    submitQuery(inputValue);
  };

  useEffect(() => {
    if (isFocused) {
      setPlaceholderText("Ask Aura AI anything...");
      return;
    }

    const currentPrompt = PROMPTS[placeholderIndex];
    if (charIndex < currentPrompt.length) {
      const timeout = setTimeout(() => {
        setPlaceholderText((prev) => prev + currentPrompt[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPlaceholderText("");
        setCharIndex(0);
        setPlaceholderIndex((prev) => (prev + 1) % PROMPTS.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, isFocused, placeholderIndex]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 px-4">

      {/* Main Input Area (Home Screen Style) */}
      <div className="relative group">
        {/* Animated Background Glow */}
        <div className={`absolute -inset-1 rounded-full blur-xl transition-all duration-700 ${isFocused ? 'bg-gradient-to-r from-[#7E22CE] via-[#A855F7] to-[#7E22CE] opacity-50 scale-[1.02]' : 'bg-gradient-to-r from-[#7E22CE] to-transparent opacity-30'}`}></div>
        
        <form onSubmit={handleSubmit}>
          <motion.div 
            animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className={`relative krish-glass rounded-full p-2 pl-4 flex items-center gap-3 transition-all duration-300 ${isFocused ? 'bg-[rgba(255,255,255,0.06)] border-[#A855F7] shadow-[0_0_30px_rgba(168,85,247,0.4),0_0_60px_rgba(168,85,247,0.2)]' : 'border border-[rgba(168,85,247,0.3)] shadow-[0_0_15px_rgba(168,85,247,0.1)]'}`}
          >
            {/* Add Attachment Button */}
            <motion.button 
              type="button" 
              whileHover={{ scale: 1.1, rotate: 90 }} 
              whileTap={{ scale: 0.9 }} 
              className="p-2 ml-1 text-gray-400 hover:text-white transition-colors"
            >
              <Plus className="w-6 h-6" />
            </motion.button>

            <div className="relative flex-1 flex items-center">
              {!inputValue && (
                <span className="absolute left-2 pointer-events-none text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#A855F7] text-lg font-medium tracking-wide opacity-50 whitespace-nowrap overflow-hidden">
                  {placeholderText}
                </span>
              )}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-transparent border-none outline-none text-white px-2 py-3 text-lg font-medium tracking-wide relative z-10"
              />
            </div>
            
            <motion.button 
              type="button" 
              onClick={toggleListening}
              whileHover={{ scale: 1.1, rotate: 10 }} 
              whileTap={{ scale: 0.9 }} 
              className={`p-3 transition-colors ${isListening ? 'text-red-500 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]' : 'text-gray-300 hover:text-[#A855F7]'}`}
            >
              <Mic className={`w-6 h-6 transition-all duration-300 ${!isListening && isFocused ? 'drop-shadow-[0_0_10px_rgba(126,34,206,0.5)] text-[#A855F7]' : ''}`} />
            </motion.button>
            
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isProcessing}
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] disabled:opacity-50 hover:bg-gray-200 transition-colors mr-2 shrink-0"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin relative z-10" />
              ) : (
                <Send className="w-5 h-5 relative z-10 ml-0.5" />
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>

      {/* Quick Actions (Home Screen Style) */}
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mt-5 px-4">
        {[
          { id: 'web', icon: Globe, label: "Web Search" },
          { id: 'think', icon: Brain, label: "Deep Think" },
          { id: 'doc', icon: FileText, label: "Doc Analysis" },
          { id: 'img', icon: ImageIcon, label: "Image Gen" },
        ].map((btn) => {
          const isActive = activeToggles.includes(btn.id);
          return (
            <motion.button 
              key={btn.id}
              onClick={() => toggleAction(btn.id)}
              type="button"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-gray-100 font-semibold tracking-wide hover:text-white transition-colors group"
            >
              <btn.icon className={`w-4 h-4 transition-all ${isActive ? 'text-[#A855F7] drop-shadow-[0_0_10px_rgba(126,34,206,0.5)]' : 'text-gray-300 group-hover:text-[#A855F7] drop-shadow-[0_0_5px_rgba(126,34,206,0)] group-hover:drop-shadow-[0_0_10px_rgba(126,34,206,0.5)]'}`} /> 
              <span className={`transition-all duration-300 ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A855F7]' : 'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#A855F7]'}`}>{btn.label}</span>
            </motion.button>
          );
        })}
      </div>
      
      <div className="flex justify-center mt-3">
        <p className="text-[10px] font-medium text-gray-500">
          Aura AI can make mistakes. Consider verifying important information.
        </p>
      </div>
    </div>
  );
}
