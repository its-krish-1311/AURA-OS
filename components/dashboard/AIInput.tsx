"use client";

import React, { useState } from "react";
import { Mic, Send, MessageSquare, Eye, Upload, CheckSquare, Loader2, Plus, Paperclip } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useActionModal } from "@/components/os-core/ActionModalContext";

import { Code2 } from "lucide-react"; // Added Code2

interface AIInputProps {
  onNormalChatSubmit?: (message: string) => void;
  onAuraCodeClick?: () => void;
}

export default function AIInput({ onNormalChatSubmit, onAuraCodeClick }: AIInputProps) {
  const router = useRouter();
  const { openModal } = useActionModal();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = React.useRef<any>(null);
  const latestInputRef = React.useRef("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const visionInputRef = React.useRef<HTMLInputElement>(null);

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

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    submitQuery(inputValue);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-4">
      <div className="relative group mx-4">
        {/* Premium Glass Input Container */}
        <form onSubmit={handleSubmit} className="relative z-10">
          <motion.div 
            animate={isFocused ? { scale: 1.02, y: -2 } : { scale: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
            className={`relative krish-glass rounded-full p-2 pl-6 flex items-center gap-3 transition-all duration-300 bg-[rgba(10,10,10,0.6)] shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${isFocused ? 'border border-[rgba(255,255,255,0.2)] shadow-[0_15px_60px_rgba(255,255,255,0.05)]' : 'border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)]'}`}
          >
            {/* Purple Dot */}
            <div className="w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse"></div>

            <div className="relative flex-1 flex items-center ml-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask me anything..."
                className="w-full bg-transparent border-none outline-none text-white px-2 py-3 text-[15px] font-medium tracking-wide placeholder:text-gray-500"
              />
            </div>

            {/* Inline Action Icons */}
            <div className="flex items-center gap-1 mr-2">
              <motion.button 
                type="button" 
                onClick={toggleListening}
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                className={`p-2.5 rounded-full hover:bg-[rgba(255,255,255,0.05)] transition-colors ${isListening ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
              >
                <Mic className="w-[18px] h-[18px]" />
              </motion.button>
              
              <motion.button 
                type="button" 
                onClick={() => visionInputRef.current?.click()}
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                <Eye className="w-[18px] h-[18px]" />
              </motion.button>

              <motion.button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                <Paperclip className="w-[18px] h-[18px]" />
              </motion.button>
            </div>

            {/* Ask Aura Button */}
            <motion.button 
              type="submit"
              disabled={isProcessing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-[#7E22CE] to-[#A855F7] h-12 px-6 rounded-full text-sm font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all flex items-center justify-center gap-2 group shrink-0"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Ask Siya
                  <Send className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>

      {/* Hidden File Inputs */}
      <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => {
        if(e.target.files && e.target.files.length > 0) {
          import('react-hot-toast').then(({ toast }) => toast.success(`File selected: ${e.target.files![0].name}`));
        }
      }} />
      <input type="file" ref={visionInputRef} accept="image/*" capture="environment" className="hidden" onChange={(e) => {
        if(e.target.files && e.target.files.length > 0) {
          import('react-hot-toast').then(({ toast }) => toast.success(`Image selected for AI Vision!`));
        }
      }} />
    </div>
  );
}
