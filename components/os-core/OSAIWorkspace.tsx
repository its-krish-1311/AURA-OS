"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, User, Loader2, Maximize2, MoreVertical } from "lucide-react";
import WorkspaceInput from "@/components/workspace/WorkspaceInput";

interface Message {
  id: string;
  role: "user" | "ai" | "system";
  content: string;
}

interface OSAIWorkspaceProps {
  osName: string;
  themeColor: string;
  systemPrompt: string;
  initialGreeting: string;
}

export default function OSAIWorkspace({ osName, themeColor, systemPrompt, initialGreeting }: OSAIWorkspaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "ai", content: initialGreeting }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSendMessage = async (userMessage: string) => {
    const newMessages: Message[] = [...messages, { id: Date.now().toString(), role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsProcessing(true);

    try {
      // In a real app, we would send the systemPrompt along with the history.
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: newMessages, 
          mode: 'normal', // Fallback to normal mode for now, would ideally have an OS mode
          systemPrompt 
        })
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
    <div className="flex-1 flex flex-col relative h-full w-full overflow-hidden bg-transparent">
      
      {/* Background glow tied to OS theme */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"
        style={{ background: themeColor }}
      />

      {/* Top Header */}
      <div className="h-14 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between px-6 shrink-0 relative z-20 bg-[rgba(10,12,16,0.5)] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-wide text-white">{osName} Assistant</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.05)] text-gray-300 border border-[rgba(255,255,255,0.1)]">
            GPT-4 Omni
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
      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 pb-32">
        <div className="max-w-4xl mx-auto w-full px-4 pt-10 space-y-8">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg mt-1" style={{ background: `linear-gradient(135deg, ${themeColor}, #000000)` }}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'krish-glass bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] px-5 py-3.5 rounded-2xl rounded-tr-sm' : 'pt-1'}`}>
                {msg.role === 'user' ? (
                  <p className="text-white text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-[#0D1117] prose-pre:border prose-pre:border-[rgba(255,255,255,0.1)] prose-pre:rounded-xl">
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
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg mt-1 animate-pulse" style={{ background: `linear-gradient(135deg, ${themeColor}, #000000)` }}>
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-2" style={{ color: themeColor }}>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs font-medium tracking-widest uppercase animate-pulse">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-[rgba(10,12,16,1)] via-[rgba(10,12,16,0.8)] to-transparent pt-10">
        <WorkspaceInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
