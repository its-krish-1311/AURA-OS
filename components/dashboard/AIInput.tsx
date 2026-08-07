"use client";

import React, { useState } from "react";
import { Mic, Send, MessageSquare, Eye, Upload, CheckSquare, Loader2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const PROMPTS = [
  "Ask me anything...",
  "Plan my trip to Bali...",
  "Write a Python script...",
  "Analyze my expenses...",
  "Generate a new outfit..."
];

import { Code2 } from "lucide-react"; // Added Code2

interface AIInputProps {
  onNormalChatSubmit?: (message: string) => void;
  onAuraCodeClick?: () => void;
}

export default function AIInput({ onNormalChatSubmit, onAuraCodeClick }: AIInputProps) {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  
  // Real input state
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = React.useRef<any>(null);
  const latestInputRef = React.useRef("");

  const submitQuery = (query: string) => {
    if (!query.trim()) return;
    setIsProcessing(true);
    router.push(`/ai-chat?q=${encodeURIComponent(query)}`);
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
        latestInputRef.current = ""; // Reset after submitting
      }
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    submitQuery(inputValue);
  };

  React.useEffect(() => {
    if (isFocused) {
      setPlaceholderText("Ask me anything...");
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
    <div className="w-full max-w-4xl mx-auto mb-10">
      <div className="relative group mx-4">
        {/* Animated Background Glow */}
        <div className={`absolute -inset-1 rounded-full blur-xl transition-all duration-700 ${isFocused ? 'bg-gradient-to-r from-[rgba(126,34,206,0.1)] via-[rgba(168,85,247,0.15)] to-[rgba(126,34,206,0.1)] opacity-60 scale-[1.02]' : 'bg-gradient-to-r from-[rgba(126,34,206,0.03)] to-transparent opacity-30'}`}></div>
        
        {/* Premium Glass Input Container */}
        <form onSubmit={handleSubmit}>
          <motion.div 
            animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className={`relative krish-glass rounded-full p-2 pl-4 flex items-center gap-3 transition-all duration-300 ${isFocused ? 'bg-[rgba(255,255,255,0.06)] border-[rgba(126,34,206,0.25)] shadow-[0_0_30px_rgba(126,34,206,0.1),0_0_60px_rgba(126,34,206,0.05)]' : ''}`}
          >
            {/* Add Attachment / Options Button */}
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
                <span className="absolute left-2 pointer-events-none text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#A855F7] text-lg font-medium tracking-wide opacity-50">
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
              className={`p-3 transition-colors ${isListening ? 'text-red-500 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]' : 'text-gray-300 hover:text-accentLight'}`}
            >
              <Mic className={`w-6 h-6 transition-all duration-300 ${!isListening && isFocused ? 'drop-shadow-[0_0_10px_rgba(126,34,206,0.5)] text-accentLight' : ''}`} />
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
                <Send className="w-5 h-5 relative z-10" />
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center items-center gap-8 mt-6 px-4">
        {[
          { icon: MessageSquare, label: "Voice Chat", action: () => {} },
          { icon: Eye, label: "AI Vision", action: () => {} },
          { icon: Upload, label: "Upload File", action: () => {} },
          { icon: Code2, label: "Aura Code", action: onAuraCodeClick },
        ].map((item, idx) => (
          <motion.button 
            key={idx}
            onClick={item.action}
            type="button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-sm text-gray-100 font-semibold tracking-wide hover:text-white transition-colors group"
          >
            <item.icon className="w-4 h-4 text-gray-300 group-hover:text-accentLight drop-shadow-[0_0_5px_rgba(126,34,206,0)] group-hover:drop-shadow-[0_0_10px_rgba(126,34,206,0.5)] transition-all" /> 
            <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accentLight transition-all duration-300">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
