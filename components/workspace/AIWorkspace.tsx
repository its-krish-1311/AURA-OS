"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Loader2, Maximize2, MoreVertical } from "lucide-react";
import WorkspaceSidebar from "./WorkspaceSidebar";
import WorkspaceInput from "./WorkspaceInput";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

interface AIWorkspaceProps {
  onBackToOS: () => void;
  initialMessages: Message[];
}

export default function AIWorkspace({ onBackToOS, initialMessages }: AIWorkspaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  // Auto-submit initial message if it came from the dashboard
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'user') {
      const submitInitial = async () => {
        setIsProcessing(true);
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages, mode: 'normal' })
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Failed to fetch response");
          setMessages(prev => [...prev, { id: Date.now().toString(), role: "ai", content: data.text }]);
        } catch (error: any) {
          setMessages(prev => [...prev, { id: Date.now().toString(), role: "ai", content: `Error: ${error.message}` }]);
        } finally {
          setIsProcessing(false);
        }
      };
      submitInitial();
    }
  }, []); // Run only once on mount

  const handleSendMessage = async (userMessage: string) => {
    const newMessages: Message[] = [...messages, { id: Date.now().toString(), role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsProcessing(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, mode: 'normal' })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), role: "ai", content: data.text }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "ai", content: `Error: ${error.message}` }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Apple-like spring
      className="fixed inset-0 z-[200] flex bg-[#020408] overflow-hidden text-gray-200"
    >
      {/* Sidebar */}
      <WorkspaceSidebar onBackToOS={onBackToOS} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Top Header */}
        <div className="h-14 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between px-6 shrink-0 relative z-20 bg-[rgba(2,4,8,0.8)] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-wide text-white">GPT-4 Omni</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(147,51,234,0.15)] text-[#A855F7] border border-[rgba(147,51,234,0.3)]">
              Beta
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-[rgba(255,255,255,0.05)]">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-[rgba(255,255,255,0.05)]">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 pb-4">
          <div className="max-w-4xl mx-auto w-full px-4 pt-10 pb-20 space-y-8">
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#A855F7] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.3)] mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'krish-glass bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] px-5 py-3.5 rounded-2xl rounded-tr-sm' : 'pt-1'}`}>
                  {msg.role === 'user' ? (
                    <p className="text-white text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-[#0D1117] prose-pre:border prose-pre:border-[rgba(255,255,255,0.1)] prose-pre:rounded-xl">
                      {/* Simple rendering for now, full markdown support can be added later */}
                      <p className="text-gray-200 text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}

            {isProcessing && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#A855F7] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.3)] mt-1 animate-pulse">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-[#A855F7]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-xs font-medium tracking-widest uppercase animate-pulse">Aura is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-[#020408] via-[#020408]/80 to-transparent pt-10">
          <WorkspaceInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </motion.div>
  );
}
