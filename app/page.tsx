"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { Brain, Plus, MessageSquare, Send, Bot, Settings } from "lucide-react";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import AIInput from "@/components/dashboard/AIInput";
import QuickAccess from "@/components/dashboard/QuickAccess";
import RightPanel from "@/components/dashboard/RightPanel";
import ExecutivePlanner from "@/components/dashboard/ExecutivePlanner";
import AiOrb from "@/components/orb/AiOrb";
import MobilePanels from "@/components/mobile/MobilePanels";
import FeatureCards from "@/components/features/FeatureCards";
import Footer from "@/components/footer/Footer";
import WelcomeScreen from "@/components/auth/WelcomeScreen";
import AuthScreen from "@/components/auth/AuthScreen";
import SetupScreen from "@/components/setup/SetupScreen";
import ChatInterface from "@/components/chat/ChatInterface";
import ArtifactViewer from "@/components/chat/ArtifactViewer";
import AIWorkspace from "@/components/workspace/AIWorkspace";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

import { toast } from "react-hot-toast";

const ComplaintBox = () => {
  const [complaint, setComplaint] = React.useState("");

  const handleSend = () => {
    if (!complaint.trim()) {
      toast.error("Please enter a bug description.");
      return;
    }
    toast.success("Bug report sent to engineering team!");
    setComplaint("");
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="krish-glass rounded-[26px] p-6 relative overflow-hidden group w-[280px] h-[178px] flex flex-col justify-between"
    >
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgba(239,68,68,0.08)] to-transparent pointer-events-none transition-opacity group-hover:opacity-80" />
      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.05)] to-transparent skew-x-[-20deg] group-hover:animate-[sweep_1.5s_ease-in-out] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h3 className="text-white text-xs font-bold tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            COMPLAINT <span className="text-[#EF4444] drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]">BOX</span>
          </h3>
          <p className="text-gray-400 text-[9px] mt-0.5 font-medium tracking-wide uppercase">Report an issue</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] flex items-center justify-center text-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.1)]">
          <MessageSquare className="w-4 h-4" />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="relative z-10 w-full mt-2 group/input">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(239,68,68,0.1)] to-transparent rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity blur-md"></div>
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-xl overflow-hidden focus-within:border-[rgba(239,68,68,0.5)] focus-within:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all"
        >
          <input 
            type="text"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Describe the bug..."
            className="w-full bg-transparent text-white text-xs pl-3 pr-2 py-2.5 outline-none placeholder:text-gray-500"
          />
          <button type="submit" className="w-6 h-6 mr-1.5 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:scale-110 hover:bg-gray-200 transition-all">
            <Send className="w-3 h-3 ml-0.5" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

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
        timeoutId = setTimeout(type, 40); // Fast independent typing speed
      } else {
        timeoutId = setTimeout(() => {
          setTypedText("");
          i = 0;
          messageIndex = (messageIndex + 1) % messages.length;
          setTargetText(messages[messageIndex]);
          type();
        }, 3000); // Wait 3s before next message
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
            <span className="absolute inset-0 bg-[#7E22CE] blur-[15px] opacity-30"></span>
          </span>
          <span>{afterWord}</span>
        </>
      );
      break;
    }
  }

  return (
    <h2 className="text-4xl font-light text-white mb-1 drop-shadow-lg min-h-[40px]">
      {content}
    </h2>
  );
};

export default function Home() {
  const [appState, setAppState] = useState<'welcome' | 'auth' | 'setup' | 'os'>('os');
  const [chatMode, setChatMode] = useState<'none' | 'builder' | 'workspace'>('none');
  const [initialChatMessage, setInitialChatMessage] = useState("");
  const [normalChatMessageCount, setNormalChatMessageCount] = useState(0);
  const [artifactData, setArtifactData] = useState<{code: string, title: string} | null>(null);
  const [mobileView, setMobileView] = useState<'chat' | 'artifact'>('chat');
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && appState === 'auth') {
      // If user is already authenticated and lands on auth screen, skip setup/auth
      setAppState('os');
    }
  }, [status, appState]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const, 
        stiffness: 100, 
        damping: 20, 
        mass: 1 
      } 
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <WelcomeScreen key="welcome" onComplete={() => setAppState('auth')} />
        )}
        
        {appState === 'auth' && (
          <AuthScreen key="auth" onLogin={() => setAppState('setup')} />
        )}

        {appState === 'setup' && (
          <SetupScreen key="setup" onComplete={() => setAppState('os')} />
        )}
      </AnimatePresence>

      <motion.main 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`min-h-screen relative overflow-hidden pb-16 transition-all duration-1000 ${
          appState !== 'os' ? 'opacity-0 hidden' : 'opacity-100 scale-100'
        }`}
      >
      <div className="flex w-full max-w-[1600px] mx-auto relative pt-4 px-2">
        
        {/* Left Column (Sidebar + Complaint Box) */}
        <motion.div variants={itemVariants} animate={{ y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="flex flex-col gap-12">
          <Sidebar />
          <ComplaintBox />
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col px-8">
          <motion.div variants={itemVariants} animate={{ y: [0, -8, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
            <Header />
          </motion.div>
          
          {/* Top Dashboard Section */}
          <div className="flex gap-10 mt-6">
            
            {/* Center Area */}
            <div className="flex-1">
              <motion.div variants={itemVariants} className="mb-10 relative w-full max-w-4xl mx-auto px-4" animate={{ y: [0, -6, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}>
                <div className="absolute -inset-4 bg-gradient-to-r from-[rgba(126,34,206,0.06)] to-transparent blur-2xl -z-10 rounded-full"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col items-start mt-2">
                    <TypewriterGreeting />
                    <p className="text-sm tracking-wide font-semibold ml-1">
                      <span className="text-white inline-block drop-shadow-sm opacity-90">
                        I Am Your Digital Twin...
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 -mt-2">
                    <button className="krish-glass h-11 px-6 rounded-full text-sm font-semibold text-white border border-[rgba(126,34,206,0.3)] hover:bg-[rgba(126,34,206,0.1)] hover:border-[rgba(126,34,206,0.5)] transition-all shadow-[0_0_15px_rgba(126,34,206,0.1)] flex items-center justify-center gap-2 group">
                      <Brain className="w-4 h-4 text-[#A855F7] group-hover:scale-110 transition-transform" />
                      Train
                    </button>
                    <button className="bg-gradient-to-r from-[#7E22CE] to-[#A855F7] h-11 px-6 rounded-full text-sm font-semibold text-white shadow-[0_0_20px_rgba(126,34,206,0.4)] hover:shadow-[0_0_30px_rgba(126,34,206,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-2 group">
                      <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                      New
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} animate={{ y: [0, -12, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
                <div className="w-full flex flex-col items-center">
                  <AnimatePresence>
                    {chatMode === 'none' && (
                      <motion.div 
                        initial={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        className="w-full relative z-10"
                      >
                        <AIInput 
                          onNormalChatSubmit={(msg) => {
                            setInitialChatMessage(msg);
                            setChatMode('workspace');
                            setNormalChatMessageCount(1); // 1 User message
                          }}
                          onAuraCodeClick={() => {
                            setInitialChatMessage("");
                            setChatMode('builder');
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* FULLSCREEN CHAT CONTAINER (Removed normal pop-up mode) */}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} animate={{ y: [0, -10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
                <QuickAccess />
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-8">
                <ExecutivePlanner />
              </motion.div>
            </div>

            {/* Right Panel */}
            <motion.div variants={itemVariants} animate={{ y: [0, -15, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
              <RightPanel />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Full Page Divider */}
      <motion.div 
        variants={itemVariants}
        className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.8)] to-transparent my-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      />

      {/* Bottom Feature Cards (Moved above the Orb) */}
      <motion.div variants={itemVariants} animate={{ y: [0, -10, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="px-8">
        <h3 className="text-white text-base font-bold tracking-[0.2em] mb-8 text-center drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">Elite Intelligence</h3>
        <FeatureCards />
      </motion.div>

      {/* Atlas Heading */}
      <motion.div variants={itemVariants} className="px-8">
        <h3 className="text-white text-base font-bold tracking-[0.2em] mb-8 text-center drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">Atlas</h3>
      </motion.div>

      {/* Mobile Mockup Row */}
      <motion.div variants={itemVariants} animate={{ y: [0, -12, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
        <MobilePanels />
      </motion.div>

      {/* Footer */}
      <motion.div variants={itemVariants}>
        <Footer />
      </motion.div>
    </motion.main>



      {/* Phase 2: Full Screen Premium AI Workspace */}
      <AnimatePresence>
        {chatMode === 'workspace' && (
          <AIWorkspace 
            onBackToOS={() => {
              setChatMode('none');
              setNormalChatMessageCount(0);
            }} 
            initialMessages={initialChatMessage ? [{ id: "1", role: "user", content: initialChatMessage }] : []}
          />
        )}
      </AnimatePresence>

      {/* Builder Mode Full Screen Overlay */}
      <AnimatePresence>
        {chatMode === 'builder' && appState === 'os' && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring" as const, damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#04060B]/90 backdrop-blur-3xl flex flex-col pt-4 px-2 sm:px-6 pb-6 overflow-hidden"
          >
            {/* Top Nav for Builder */}
            <div className="flex items-center justify-between px-4 mb-4 shrink-0">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setChatMode('none')}
                  className="px-4 py-2 rounded-full krish-glass border border-[rgba(255,255,255,0.1)] text-white text-sm font-semibold hover:bg-[rgba(255,255,255,0.05)] transition-all"
                >
                  ← Back to OS
                </button>
                <div className="hidden sm:flex krish-glass px-5 py-2 rounded-full border-2 border-[rgba(168,85,247,0.4)] bg-gradient-to-r from-[rgba(0,0,0,0.4)] to-[rgba(126,34,206,0.3)] backdrop-blur-2xl items-center gap-3 shadow-[0_0_20px_rgba(168,85,247,0.3),inset_0_2px_5px_rgba(255,255,255,0.2)]">
                  <div className="w-3 h-3 rounded-full bg-[#A855F7] animate-pulse shadow-[0_0_15px_rgba(168,85,247,1)]"></div>
                  <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D8B4FE] to-[#A855F7] uppercase tracking-widest drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">SIYA!</span>
                </div>
              </div>
              
              {/* Mobile View Toggle */}
              {artifactData && (
                <div className="flex lg:hidden bg-[rgba(255,255,255,0.05)] p-1 rounded-lg border border-[rgba(255,255,255,0.1)]">
                  <button 
                    onClick={() => setMobileView('chat')}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${mobileView === 'chat' ? 'bg-[rgba(126,34,206,0.2)] text-white' : 'text-gray-400'}`}
                  >
                    Chat
                  </button>
                  <button 
                    onClick={() => setMobileView('artifact')}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${mobileView === 'artifact' ? 'bg-[rgba(126,34,206,0.2)] text-white' : 'text-gray-400'}`}
                  >
                    Preview
                  </button>
                </div>
              )}
            </div>

            {/* Split Pane Layout */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
              {/* Left Pane - Chat */}
              <div className={`${mobileView === 'chat' || !artifactData ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-[400px] xl:w-[500px] shrink-0 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden bg-[rgba(10,10,10,0.4)]`}>
                <ChatInterface 
                  mode="builder"
                  initialMessage={initialChatMessage}
                  onGenerateArtifact={(code, title) => {
                    setArtifactData({ code, title });
                    setMobileView('artifact');
                  }} 
                />
              </div>

              {/* Right Pane - Artifacts */}
              <div className={`flex-1 w-full h-full relative \${mobileView === 'artifact' && artifactData ? 'flex' : 'hidden lg:flex'} \${!artifactData ? 'items-center justify-center krish-glass rounded-3xl border border-dashed border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,10,0.2)]' : ''}`}>
                {!artifactData ? (
                  <div className="text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-[rgba(126,34,206,0.1)] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(126,34,206,0.2)]">
                      <Brain className="w-8 h-8 text-[#A855F7]" />
                    </div>
                    <h3 className="text-white text-lg font-bold mb-2">Artifacts Engine Ready</h3>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                      Ask the AI to "create an app" or "build a component" and watch it render here in real-time.
                    </p>
                  </div>
                ) : (
                  <ArtifactViewer 
                    isOpen={true} 
                    code={artifactData.code} 
                    title={artifactData.title}
                    onClose={() => {
                      setArtifactData(null);
                      setMobileView('chat');
                    }} 
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

