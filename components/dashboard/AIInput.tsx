"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, Send, MessageSquare, Eye, Upload, CheckSquare, Loader2, Plus, Paperclip, Brain, BarChart2, Palette, Image as ImageIcon, Camera, Terminal, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useActionModal } from "@/components/os-core/ActionModalContext";
import { useDashboardContext } from "@/components/dashboard/DashboardContext";
import toast from "react-hot-toast";

import { Code2 } from "lucide-react";

interface AIInputProps {
  onNormalChatSubmit?: (message: string) => void;
  onAuraCodeClick?: () => void;
  isProcessing?: boolean;
  onStopClick?: () => void;
}

export default function AIInput({ onNormalChatSubmit, onAuraCodeClick, isProcessing = false, onStopClick }: AIInputProps) {
  const router = useRouter();
  const { openModal } = useActionModal();
  const { setActiveChatMode } = useDashboardContext();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const isListeningRef = useRef(false);
  const [activeToggles, setActiveToggles] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);
  const latestInputRef = useRef("");
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const visionInputRef = useRef<HTMLInputElement>(null);

  const [isPlusDropdownOpen, setIsPlusDropdownOpen] = useState(false);
  const plusDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (plusDropdownRef.current && !plusDropdownRef.current.contains(event.target as Node)) {
        setIsPlusDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup timers and recognition on unmount
  useEffect(() => {
    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleAction = (actionId: string, label: string) => {
    setActiveToggles(prev => 
      prev.includes(actionId) ? prev.filter(a => a !== actionId) : [...prev, actionId]
    );
    setActiveChatMode(label);
  };

  const submitQuery = (query: string) => {
    if (!query.trim()) return;
    
    // Stop listening before submitting
    if (isListeningRef.current && recognitionRef.current) {
       recognitionRef.current.stop();
       setIsListening(false);
       isListeningRef.current = false;
    }

    if (onNormalChatSubmit) {
      onNormalChatSubmit(query);
      setInputValue("");
      latestInputRef.current = "";
    } else {
      router.push(`/dashboard/chat?q=${encodeURIComponent(query)}`);
    }
  };

  const toggleListening = () => {
    if (isListeningRef.current) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      isListeningRef.current = false;
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Your browser does not support Speech Recognition. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true; // Allow continuous listening so it doesn't stop randomly
    
    recognition.onstart = () => {
      setIsListening(true);
      isListeningRef.current = true;
    };
    
    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      // Progressively update input field
      const currentFullText = (latestInputRef.current + " " + finalTranscript + " " + interimTranscript).replace(/\s+/g, ' ').trim();
      setInputValue(currentFullText);

      // Reset silence timer on every new word
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

      silenceTimerRef.current = setTimeout(() => {
        // Detect 1.5 seconds of silence
        if (isListeningRef.current && currentFullText.trim()) {
           submitQuery(currentFullText);
        }
      }, 1500);
    };
    
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      if (event.error !== 'no-speech') {
        toast.error(`Microphone error: ${event.error}`);
        setIsListening(false);
        isListeningRef.current = false;
      }
    };
    
    recognition.onend = () => {
      // If manually stopped or unexpectedly dropped
      if (isListeningRef.current) {
         // Auto-restart if it was unexpectedly dropped (Edge case fix)
         try { recognition.start(); } catch(e) { 
           setIsListening(false); 
           isListeningRef.current = false; 
         }
      }
    };

    try {
      recognition.start();
    } catch (e: any) {
      console.error(e);
      toast.error("Could not start microphone.");
      setIsListening(false);
      isListeningRef.current = false;
    }
  };

  const [attachments, setAttachments] = useState<{name: string, content: string}[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      import('react-hot-toast').then(({ toast }) => toast.error("Image processing requires multimodal setup."));
      return;
    }

    try {
      const text = await file.text();
      setAttachments(prev => [...prev, { name: file.name, content: text }]);
      import('react-hot-toast').then(({ toast }) => toast.success(`File attached: ${file.name}`));
    } catch (err) {
      import('react-hot-toast').then(({ toast }) => toast.error("Could not read file"));
    }
    
    if (e.target) e.target.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isProcessing && onStopClick) {
      onStopClick();
    } else {
      let finalQuery = inputValue;
      if (attachments.length > 0) {
        const attachmentsText = attachments.map(a => `\n\n[Attached File: ${a.name}]\n${a.content}\n[/Attached File]`).join("");
        finalQuery += attachmentsText;
      }
      submitQuery(finalQuery);
      setAttachments([]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-4">
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 px-6">
          {attachments.map((att, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-gray-200 border border-white/20">
              <Paperclip className="w-3 h-3 text-accentPrimary" />
              <span className="truncate max-w-[150px]">{att.name}</span>
              <button type="button" onClick={() => removeAttachment(i)} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-0.5">
                <Plus className="w-3 h-3 rotate-45" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="relative group mx-4" ref={plusDropdownRef}>
        {/* Animated Background Glow */}
        <div className={`absolute -inset-2 rounded-full blur-2xl transition-all duration-700 ${isFocused ? 'bg-[rgba(255,255,255,0.1)] opacity-30 scale-[1.03]' : 'bg-[rgba(255,255,255,0.05)] opacity-10'}`}></div>
        
        {/* Premium Glass Input Container */}
        <form onSubmit={handleSubmit} className="relative z-10">
          <motion.div 
            layout
            animate={isFocused ? { scale: 1.02, y: -2 } : { scale: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
            className={`relative krish-glass rounded-[32px] p-2 pl-6 flex items-center gap-3 transition-all duration-300 bg-[rgba(10,10,10,0.6)] shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${isFocused ? 'border border-[rgba(255,255,255,0.3)] shadow-[0_15px_60px_rgba(255,255,255,0.1)]' : 'border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)]'}`}
          >
            {/* Plus Action Button */}
            <button 
              type="button"
              onClick={() => setIsPlusDropdownOpen(!isPlusDropdownOpen)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] shrink-0 ${isPlusDropdownOpen ? 'bg-white text-black rotate-45' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <Plus className="w-5 h-5" />
            </button>
            <div className="relative flex-1 flex items-center ml-2 min-h-[48px]">
              <textarea
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask me anything..."
                rows={1}
                className="w-full bg-transparent border-none outline-none text-white py-3 text-[15px] font-medium tracking-wide placeholder:text-gray-500 resize-none custom-scrollbar"
                style={{ height: '48px' }}
              />
            </div>

            {/* Inline Action Icons */}
            <div className="flex items-center gap-1 mr-2 self-end pb-2">
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white h-12 px-6 rounded-full text-sm font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center gap-2 group shrink-0 self-end mb-1 mr-1"
            >
              {isProcessing ? (
                <>
                  Stop
                  <Square className="w-4 h-4 fill-black text-black ml-1" />
                </>
              ) : (
                <>
                  Ask Siya
                  <Send className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </motion.div>
        </form>

        <AnimatePresence>
          {isPlusDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full mb-4 left-0 bg-[rgba(20,20,22,0.95)] border border-white/10 shadow-2xl rounded-2xl p-2 w-56 z-50 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-1">
                <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors text-left text-sm text-gray-200 hover:text-white" onClick={() => { fileInputRef.current?.click(); setIsPlusDropdownOpen(false); }}>
                  <Paperclip className="w-4 h-4 text-blue-400" />
                  Upload File
                </button>
                <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors text-left text-sm text-gray-200 hover:text-white" onClick={() => { visionInputRef.current?.click(); setIsPlusDropdownOpen(false); }}>
                  <ImageIcon className="w-4 h-4 text-purple-400" />
                  Photos
                </button>
                <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors text-left text-sm text-gray-200 hover:text-white" onClick={() => { setIsPlusDropdownOpen(false); }}>
                  <Camera className="w-4 h-4 text-green-400" />
                  Camera
                </button>
                <div className="h-px w-full bg-white/10 my-1"></div>
                <button type="button" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-purple-600/20 hover:border-purple-500/30 border border-transparent transition-all text-left text-sm text-purple-200 hover:text-purple-100" onClick={() => { 
                    setIsPlusDropdownOpen(false); 
                    if(onAuraCodeClick) onAuraCodeClick(); 
                    else setActiveChatMode("AI Engineer Mode"); 
                }}>
                  <Terminal className="w-4 h-4 text-purple-400" />
                  AI Engineer Mode
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Actions / Options */}
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mt-5 px-4">
        {[
          { id: 'dev', icon: Code2, label: "Developer Siya" },
          { id: 'designer', icon: Palette, label: "Designer Siya" },
          { id: 'think', icon: Brain, label: "Siya Think" },
          { id: 'personal', icon: MessageSquare, label: "Siya Personal" },
          { id: 'business', icon: BarChart2, label: "Startup Siya" },
        ].map((btn) => {
          const isActive = activeToggles.includes(btn.id);
          return (
            <motion.button 
              key={btn.id}
              onClick={() => toggleAction(btn.id, btn.label)}
              type="button"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm font-semibold tracking-wide hover:text-white transition-colors group"
            >
              <btn.icon className={`w-4 h-4 transition-all ${isActive ? 'text-[#A855F7] drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'text-gray-400 group-hover:text-[#A855F7] drop-shadow-[0_0_5px_rgba(168,85,247,0)] group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]'}`} /> 
              <span className={`transition-all duration-300 ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A855F7]' : 'text-gray-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#A855F7]'}`}>{btn.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Hidden File Inputs */}
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
      <input type="file" ref={visionInputRef} accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
    </div>
  );
}
