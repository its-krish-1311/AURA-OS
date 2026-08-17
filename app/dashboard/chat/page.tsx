"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import ChatHistorySidebar from "@/components/chat/ChatHistorySidebar";
import PremiumMessageArea from "@/components/chat/PremiumMessageArea";
import AIInput from "@/components/dashboard/AIInput";
import dynamic from 'next/dynamic';

const SplineScene = dynamic(() => import('@/components/ui/splite').then(mod => mod.SplineScene), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 border-[3px] border-white/10 border-t-accentPrimary rounded-full animate-spin"></div>
    </div>
  )
});

interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "data";
  content: string;
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
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentText = messages[messageIndex];
      
      if (isDeleting) {
        setTypedText(currentText.substring(0, i - 1));
        i--;
        if (i === 0) {
          isDeleting = false;
          messageIndex = (messageIndex + 1) % messages.length;
          setTargetText(messages[messageIndex]);
          timeoutId = setTimeout(type, 500);
        } else {
          timeoutId = setTimeout(type, 20);
        }
      } else {
        if (i < currentText.length) {
          setTypedText(currentText.substring(0, i + 1));
          i++;
          timeoutId = setTimeout(type, 40);
        } else {
          isDeleting = true;
          timeoutId = setTimeout(type, 3000);
        }
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
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-accentPrimary relative inline-block" style={{ filter: 'drop-shadow(0 0 10px var(--accent-glow))' }}>
            {typedWordPart}
          </span>
          <span>{afterWord}</span>
        </>
      );
      break;
    }
  }

  return (
    <h2 className="text-4xl sm:text-5xl font-ethno font-bold text-white mb-2 drop-shadow-2xl min-h-[60px] text-left tracking-wide uppercase">
      {content}
    </h2>
  );
};

import { useDashboardContext } from "@/components/dashboard/DashboardContext";

function AiChatContent() {
  const searchParams = useSearchParams();
  const router = import("next/navigation").then(m => m.useRouter); // Lazy hook
  const initialQuery = searchParams.get("q");
  const urlConvId = searchParams.get("c");
  const { activeChatMode } = useDashboardContext();

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentModel, setCurrentModel] = useState("GPT 5.0");
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(urlConvId);
  const abortControllerRef = React.useRef<AbortController | null>(null);
  
  const hasProcessedInitialQuery = React.useRef(false);

  // Fetch chat history if loading an existing conversation
  useEffect(() => {
    if (urlConvId && urlConvId !== conversationId) {
      setConversationId(urlConvId);
    }
  }, [urlConvId]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!conversationId) return;
      try {
        const res = await fetch(`/api/conversations/${conversationId}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages || []);
        }
      } catch (e) {
        console.error("Failed to load history", e);
      }
    };
    if (conversationId && messages.length === 0) {
      fetchHistory();
    }
  }, [conversationId]);

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsProcessing(false);
      import('react-hot-toast').then(({ toast }) => toast("Generation stopped.", { icon: '🛑' }));
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, newUserMsg]);
    setIsProcessing(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: activeChatMode || 'normal',
          conversationId,
          messages: [...messages, newUserMsg].map(m => ({ role: m.role, content: m.content })),
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) throw new Error("Failed to fetch response");
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let textContent = "";
      let newConvId = conversationId;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          
          // Check for meta tag injected by backend for new conversation IDs
          if (chunk.includes('[META:')) {
            const metaMatch = chunk.match(/\[META:(.*?)\]/);
            if (metaMatch) {
              try {
                const meta = JSON.parse(metaMatch[1]);
                if (meta.conversationId && !conversationId) {
                  newConvId = meta.conversationId;
                  setConversationId(meta.conversationId);
                  // Update URL silently
                  window.history.replaceState({}, '', `/dashboard/chat?c=${meta.conversationId}`);
                }
              } catch (e) {}
            }
            textContent += chunk.replace(/\[META:.*?\]/g, '').trim();
          } else {
             textContent += chunk;
          }
          
          setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: textContent } : m));
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
         console.log("Aborted");
      } else {
         console.error("Chat Error:", error);
         setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: "Sorry, I encountered an error while processing your request. Please try again." } : m));
      }
    } finally {
      setIsProcessing(false);
      abortControllerRef.current = null;
    }
  };

  useEffect(() => {
    if (initialQuery && !hasProcessedInitialQuery.current && !conversationId) {
      hasProcessedInitialQuery.current = true;
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  return (
    <div className="flex-1 flex gap-6 overflow-hidden">
      
      {/* Center Chat Interface */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-transparent rounded-[32px]">
        
        {/* Simple Header */}
        <div className="absolute top-6 left-8 z-30">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-accentPrimary animate-pulse"></div>
            <span className="text-sm font-bold text-gray-300 uppercase tracking-widest">SIYA AI</span>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col md:flex-row items-center justify-between p-8 sm:p-16 overflow-y-auto custom-scrollbar relative z-10 pointer-events-none gap-8">
            
            {/* Left Side: Greeting Text */}
            <div className="pointer-events-auto flex-1 flex flex-col items-start justify-center max-w-xl">
              <TypewriterGreeting />
              <p className="text-base tracking-widest font-semibold mt-2 text-left font-ethno uppercase">
                <span className="text-gray-400 inline-block drop-shadow-md opacity-80">
                  I'm Siya, Your Digital Aura
                </span>
              </p>
            </div>

            {/* Right Side: 3D Black Robot Spline */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="flex-1 w-full h-[350px] sm:h-[450px] max-w-[500px] relative flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
            >
              <div className="absolute inset-0 bg-black/40 blur-[100px] rounded-full pointer-events-none -z-10"></div>
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full z-10"
              />
            </motion.div>
            
          </div>
        ) : (
          <PremiumMessageArea 
            messages={messages as any} 
            currentModel={currentModel} 
            onModelChange={setCurrentModel} 
            isTyping={isProcessing}
          />
        )}

        {/* Chat Input Pinned at Bottom */}
        <div className="p-6 sm:p-8 shrink-0 mt-auto relative z-20 bg-transparent w-full flex justify-center">
          <AIInput 
            onNormalChatSubmit={handleSendMessage} 
            isProcessing={isProcessing}
            onStopClick={handleStopGeneration}
          />
        </div>
      </div>

      {/* Right Chat History Sidebar - Hidden on small screens */}
      <div className="hidden xl:block">
        <ChatHistorySidebar />
      </div>

    </div>
  );
}

export default function AiChatPage() {
  return (
    <div className="h-full w-full p-4 sm:p-6 overflow-hidden theme-chat-bot">
      <div className="flex h-full w-full max-w-[1920px] mx-auto overflow-hidden">
        <React.Suspense fallback={<div className="flex-1 flex items-center justify-center text-accentPrimary text-2xl font-bold animate-pulse tracking-widest uppercase">Initializing AI Environment...</div>}>
          <AiChatContent />
        </React.Suspense>
      </div>
    </div>
  );
}
