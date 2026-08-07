"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Send, Bot, User as UserIcon, Plus, Loader2, Code2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  hasArtifact?: boolean;
}

interface ChatInterfaceProps {
  onGenerateArtifact: (code: string, title: string) => void;
  mode?: 'normal' | 'builder';
  initialMessage?: string;
  onMessageCountChange?: (count: number) => void;
  isInline?: boolean;
}

export default function ChatInterface({ onGenerateArtifact, mode = 'builder', initialMessage, onMessageCountChange, isInline = false }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length === 0) {
      if (initialMessage) {
        setMessages([{ id: "1", role: "user", content: initialMessage }]);
        setIsProcessing(true);
        // Auto submit the initial message
        const submitInitial = async () => {
          try {
            const response = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ messages: [{ id: "1", role: "user", content: initialMessage }], mode })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            setMessages(prev => [...prev, { id: "2", role: "ai", content: data.text }]);
          } catch (error: any) {
            setMessages(prev => [...prev, { id: "2", role: "ai", content: `Error: ${error.message}` }]);
          } finally {
            setIsProcessing(false);
          }
        };
        submitInitial();
      } else {
        const greeting = mode === 'builder' 
          ? "I am Aura Code. I can build entire React applications for you. What would you like to create today?"
          : "Hello! I am Aura AI. How can I help you today?";
        setMessages([{ id: "1", role: "ai", content: greeting }]);
      }
    }
    scrollToBottom();
  }, [messages, initialMessage, mode]);

  useEffect(() => {
    if (onMessageCountChange) {
      onMessageCountChange(messages.length);
    }
  }, [messages.length, onMessageCountChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    
    const newMessages: Message[] = [...messages, { id: Date.now().toString(), role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsProcessing(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, mode })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      let aiContent = data.text || "";
      let hasArtifact = false;
      let extractedCode = "";

      if (mode === 'builder') {
        // Parse for ```javascript render ... ``` block, handling slight hallucinations
        const renderRegex = /```(?:javascript|jsx|tsx|ts|js)?\s*(?:render)?\s*\n([\s\S]*?)```/i;
        const match = aiContent.match(renderRegex);

        if (match && match[1]) {
          hasArtifact = true;
          extractedCode = match[1].trim();
          // Remove the code block from the message shown to the user to keep chat clean
          aiContent = aiContent.replace(match[0], "").trim();
          if (!aiContent) {
            aiContent = "I've created the requested application for you. You can preview it in the Artifact Viewer.";
          }
        }
      }

      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "ai", 
        content: aiContent,
        hasArtifact: hasArtifact 
      }]);

      if (hasArtifact && extractedCode) {
        onGenerateArtifact(extractedCode, "Generated App");
      }

    } catch (error: any) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "ai", 
        content: `Error: ${error.message || "Something went wrong connecting to the AI."}` 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative z-20">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]' 
                  : 'bg-gradient-to-tr from-[#7E22CE] to-[#A855F7] shadow-[0_0_15px_rgba(126,34,206,0.4)]'
              }`}>
                {msg.role === 'user' ? <UserIcon className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              
              <div className={`max-w-[80%] p-4 rounded-[26px] text-sm leading-relaxed overflow-hidden relative group ${
                msg.role === 'user'
                  ? 'krish-glass border-[rgba(255,255,255,0.1)] text-white rounded-br-sm'
                  : 'krish-glass border-[rgba(37,99,235,0.2)] text-white rounded-bl-sm shadow-[0_5px_25px_rgba(37,99,235,0.1)]'
              }`}>
                {/* Ambient glow mimicking the calendar block */}
                {msg.role !== 'user' && (
                  <>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#2563EB] blur-[50px] opacity-20 pointer-events-none"></div>
                    <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-[#7E22CE] blur-[50px] opacity-20 pointer-events-none"></div>
                  </>
                )}
                
                <div className="relative z-10">{msg.content}</div>
                {msg.hasArtifact && (
                  <div className="mt-3 p-3 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(126,34,206,0.3)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[rgba(126,34,206,0.2)] flex items-center justify-center text-[#A855F7]">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-white">App Generated</span>
                    </div>
                    <button className="text-[10px] font-bold tracking-wider uppercase text-[#A855F7] hover:text-white transition-colors">
                      View Artifact
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isProcessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7E22CE] to-[#A855F7] flex items-center justify-center shadow-[0_0_15px_rgba(126,34,206,0.4)]">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-gradient-to-br from-[rgba(126,34,206,0.15)] to-[rgba(126,34,206,0.05)] border border-[rgba(126,34,206,0.2)] p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area (Matches the original AIInput style) */}
      <div className="p-4 pt-2 shrink-0">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute -inset-1 rounded-full blur-xl bg-gradient-to-r from-[rgba(126,34,206,0.1)] via-[rgba(168,85,247,0.15)] to-[rgba(126,34,206,0.1)] opacity-40 group-focus-within:opacity-80 transition-opacity duration-700"></div>
          
          <div className="relative krish-glass rounded-full p-2 pl-4 flex items-center gap-3 bg-[rgba(10,10,10,0.6)] border-[rgba(255,255,255,0.1)] group-focus-within:border-[rgba(126,34,206,0.4)] group-focus-within:shadow-[0_0_30px_rgba(126,34,206,0.2)] transition-all duration-500">
            <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors">
              <Plus className="w-6 h-6" />
            </button>
            
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              placeholder="Ask me to create an app..."
              className="flex-1 bg-transparent border-none outline-none text-white px-2 py-3 text-sm sm:text-base font-medium tracking-wide placeholder:text-gray-500 resize-none h-11 custom-scrollbar leading-5"
              rows={1}
            />
            
            <button type="button" className="p-3 text-gray-400 hover:text-accentLight transition-colors hidden sm:block">
              <Mic className="w-5 h-5" />
            </button>
            
            <button 
              type="submit"
              disabled={isProcessing || !inputValue.trim()}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-[#7E22CE] to-[#A855F7] flex items-center justify-center text-white shadow-[0_0_15px_rgba(126,34,206,0.4)] disabled:opacity-50 disabled:grayscale hover:shadow-[0_0_25px_rgba(126,34,206,0.6)] hover:scale-105 transition-all mr-1 shrink-0"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
