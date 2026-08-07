"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ChatHistorySidebar from "@/components/chat/ChatHistorySidebar";
import ChatWorkspaceSidebar from "@/components/chat/ChatWorkspaceSidebar";
import ChatMessageArea from "@/components/chat/ChatMessageArea";
import AdvancedChatInput from "@/components/chat/AdvancedChatInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

const TypewriterGreeting = () => {
  const [greeting, setGreeting] = React.useState("Good Evening");
  const [typedText, setTypedText] = React.useState("");
  const [targetText, setTargetText] = React.useState("");

  React.useEffect(() => {
    const currentGreeting = getGreeting();
    setGreeting(currentGreeting);
    
    const messages = [
      `${currentGreeting}, Krish!`,
      "How's Your Day Going?"
    ];
    setTargetText(messages[0]);
    
    let messageIndex = 0;
    let i = 0;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentText = messages[messageIndex];
      
      if (i < currentText.length) {
        setTypedText(currentText.substring(0, i + 1));
        i++;
        timeoutId = setTimeout(type, 40);
      } else {
        timeoutId = setTimeout(() => {
          setTypedText("");
          i = 0;
          messageIndex = (messageIndex + 1) % messages.length;
          setTargetText(messages[messageIndex]);
          type();
        }, 3000);
      }
    };

    timeoutId = setTimeout(type, 500);
    const timeInterval = setInterval(() => setGreeting(getGreeting()), 60000);
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(timeInterval);
    };
  }, []);

  const highlights = ["Krish", "How's"];
  let content: React.ReactNode = <span>{typedText}</span>;
  
  for (const word of highlights) {
    const wordIndex = targetText.indexOf(word);
    if (wordIndex !== -1 && typedText.length > wordIndex) {
      const beforeWord = typedText.substring(0, wordIndex);
      const typedWordPart = typedText.substring(wordIndex, wordIndex + word.length);
      const afterWord = typedText.substring(wordIndex + word.length);
      
      content = (
        <>
          <span>{beforeWord}</span>
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#A855F7] relative inline-block">
            {typedWordPart}
            <span className="absolute inset-0 bg-[#9333EA] blur-[15px] opacity-30"></span>
          </span>
          <span>{afterWord}</span>
        </>
      );
      break;
    }
  }

  return (
    <h2 className="text-3xl sm:text-4xl font-light text-white mb-2 drop-shadow-lg min-h-[40px] text-center">
      {content}
    </h2>
  );
};

export default function AiChatPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentModel, setCurrentModel] = useState("GPT 5.0");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const hasProcessedInitialQuery = React.useRef(false);

  useEffect(() => {
    if (initialQuery && !hasProcessedInitialQuery.current) {
      hasProcessedInitialQuery.current = true;
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsProcessing(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: 'normal',
          messages: [...messages, newUserMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      const aiContent = data.text || "Sorry, I couldn't process that.";

      setMessages(prev => [
        ...prev, 
        { 
          id: (Date.now() + 1).toString(), 
          role: "assistant", 
          content: aiContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now().toString(), 
          role: "assistant", 
          content: "Sorry, I encountered an error while processing your request. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-transparent text-white flex flex-col h-screen overflow-hidden">
      <div className="flex flex-1 w-full max-w-[1800px] mx-auto pt-2 px-4 pb-2 overflow-hidden">
        
        {/* Inner Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          <div className="flex-1 flex gap-6 py-2 overflow-hidden">
            
            {/* Left Chat History Sidebar */}
            <div className="hidden xl:block">
              <ChatHistorySidebar />
            </div>

            {/* Center Chat Interface */}
            <div className="flex-1 flex flex-col h-full relative overflow-hidden">
              
              {/* Floating Header Pill */}
              <div className="absolute top-6 left-6 z-20">
                <div className="krish-glass px-5 py-2 rounded-full border border-[rgba(255,255,255,0.2)] bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-[rgba(168,85,247,0.15)] backdrop-blur-xl flex items-center gap-2.5 shadow-[0_0_15px_rgba(168,85,247,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)] cursor-pointer hover:border-[rgba(168,85,247,0.6)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300 group">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#A855F7] animate-pulse shadow-[0_0_12px_rgba(168,85,247,0.9)] group-hover:scale-110 transition-transform"></div>
                  <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A855F7] uppercase tracking-tight drop-shadow-[0_0_8px_rgba(168,85,247,0.3)] transition-all duration-300">SIYA AI</span>
                </div>
              </div>

              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto custom-scrollbar relative">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none"></div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="krish-glass px-8 py-4 rounded-full border-2 border-[rgba(168,85,247,0.4)] bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(126,34,206,0.4)] backdrop-blur-3xl flex items-center gap-4 shadow-[0_0_40px_rgba(168,85,247,0.4),inset_0_2px_10px_rgba(255,255,255,0.2)] mb-8 hover:scale-105 transition-transform duration-300 cursor-default"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#A855F7] animate-pulse shadow-[0_0_20px_rgba(168,85,247,1)]"></div>
                    <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D8B4FE] to-[#A855F7] uppercase tracking-widest drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">SIYA!</span>
                  </motion.div>
                  
                  <TypewriterGreeting />
                  <p className="text-sm tracking-wide font-semibold mb-12 text-center">
                    <span className="text-gray-300 inline-block drop-shadow-sm opacity-90">
                      I Am Your Digital Twin...
                    </span>
                  </p>
                </div>
              ) : (
                <ChatMessageArea 
                  messages={messages} 
                  currentModel={currentModel} 
                  onModelChange={setCurrentModel} 
                  isTyping={isProcessing}
                />
              )}

              {/* Chat Input Pinned at Bottom */}
              <div className="p-4 shrink-0 mt-auto">
                <AdvancedChatInput 
                  onSendMessage={handleSendMessage} 
                  isProcessing={isProcessing} 
                />
              </div>
            </div>

            {/* Right Workspace Sidebar */}
            <div className="hidden 2xl:block">
              <ChatWorkspaceSidebar />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
