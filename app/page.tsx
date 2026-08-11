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
import Footer from "@/components/footer/Footer";
import LandingHero from "@/components/landing/LandingHero";
import AuthScreen from "@/components/auth/AuthScreen";
import SetupScreen from "@/components/setup/SetupScreen";
import ChatInterface from "@/components/chat/ChatInterface";
import ArtifactViewer from "@/components/chat/ArtifactViewer";
import AIWorkspace from "@/components/workspace/AIWorkspace";
import { toast } from "react-hot-toast";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

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

const DashboardHeader = () => {
  const [greeting, setGreeting] = React.useState("Good Morning");
  const [dateStr, setDateStr] = React.useState("Wednesday, June 16");

  React.useEffect(() => {
    setGreeting(getGreeting());
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    setDateStr(now.toLocaleDateString('en-US', options));
    
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 w-full">
      <div className="flex flex-col items-start">
        <p className="text-gray-400 text-sm font-medium tracking-wide mb-1 ml-1">{dateStr}</p>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-4xl font-bold text-white tracking-tight">
            {greeting}, Krish
          </h2>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7E22CE] to-[#A855F7] flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <Bot className="w-5 h-5 text-white" />
          </div>
        </div>
        <p className="text-gray-400 text-sm tracking-wide ml-1">
          Your Digital Twin is ready. Let's build something legendary.
        </p>
      </div>

      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <button className="krish-glass h-10 px-5 rounded-full text-xs font-bold text-[#10B981] border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.05)] hover:bg-[rgba(16,185,129,0.1)] transition-all flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
          AI Twin Active
        </button>
        <button className="krish-glass h-10 px-5 rounded-full text-xs font-bold text-white border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition-all flex items-center justify-center gap-2 group">
          <Brain className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
          Train AI
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const [appState, setAppState] = useState<'landing' | 'auth' | 'setup' | 'os'>('landing');
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
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
        {appState === 'landing' && (
          <LandingHero 
            key="landing" 
            onLogin={() => setAppState('os')}
          />
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
      <div className="flex w-full max-w-[1600px] mx-auto relative pt-4 px-3 sm:px-5">
        
        {/* Left Column (Sidebar + Complaint Box) */}
        <motion.div variants={itemVariants} animate={{ y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="hidden xl:flex flex-col gap-12">
          <Sidebar />
          <ComplaintBox />
        </motion.div>

        {/* Main Content Area */}
        <div className="min-w-0 flex-1 flex flex-col px-0 sm:px-4 lg:px-8">
          <motion.div variants={itemVariants} animate={{ y: [0, -8, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
            <Header onSignIn={() => { setAuthMode("login"); setAppState("auth"); }} onSignUp={() => { setAuthMode("signup"); setAppState("auth"); }} />
          </motion.div>
          
          {/* Bento-Grid OS Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 pb-12 w-full max-w-7xl mx-auto">
            
            {/* Tile 1: Greeting & Main AI Input (Col Span 8) */}
            <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col gap-6 h-full">
              <div className="krish-glass p-8 rounded-[2.5rem] bg-[rgba(10,10,10,0.4)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] hover:backdrop-blur-3xl hover:border-[rgba(255,255,255,0.1)] transition-all duration-300 flex-1 flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10 group-hover:opacity-20 bg-gradient-to-br from-[#7E22CE] to-[#A855F7] transition-opacity duration-500 pointer-events-none"></div>
                <DashboardHeader />
              </div>
              
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
                        setNormalChatMessageCount(1);
                      }}
                      onAuraCodeClick={() => {
                        setInitialChatMessage("");
                        setChatMode('builder');
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Tile 2: Global Telemetry / Right Panel (Col Span 4) */}
            <motion.div variants={itemVariants} className="lg:col-span-4 h-full">
              <div className="krish-glass p-6 rounded-[2.5rem] bg-[rgba(10,10,10,0.4)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] hover:backdrop-blur-3xl hover:border-[rgba(255,255,255,0.1)] transition-all duration-300 h-full relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 w-40 h-40 blur-[80px] opacity-10 group-hover:opacity-20 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] transition-opacity duration-500 pointer-events-none"></div>
                <RightPanel />
              </div>
            </motion.div>

            {/* Tile 3: Quick Access Apps (Full Width - Col Span 12) */}
            <motion.div variants={itemVariants} className="lg:col-span-12 mt-2">
              <div className="krish-glass p-8 rounded-[2.5rem] bg-[rgba(10,10,10,0.4)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] hover:backdrop-blur-3xl hover:border-[rgba(255,255,255,0.1)] transition-all duration-300">
                <QuickAccess />
              </div>
            </motion.div>

            {/* Tile 4: Executive Planner (Col Span 8) */}
            <motion.div variants={itemVariants} className="lg:col-span-8 mt-2">
              <div className="krish-glass p-8 rounded-[2.5rem] bg-[rgba(10,10,10,0.4)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] hover:backdrop-blur-3xl hover:border-[rgba(255,255,255,0.1)] transition-all duration-300 relative overflow-hidden group">
                 <div className="absolute top-[20%] right-[-10%] w-48 h-48 blur-[80px] opacity-10 group-hover:opacity-20 bg-gradient-to-br from-[#F59E0B] to-[#F97316] transition-opacity duration-500 pointer-events-none"></div>
                 <ExecutivePlanner />
              </div>
            </motion.div>

            {/* Tile 5: Active Stats (Col Span 4) */}
            <motion.div variants={itemVariants} className="lg:col-span-4 mt-2 flex flex-col gap-6">
                <div className="krish-glass flex flex-col justify-center px-6 py-8 rounded-[2.5rem] flex-1 bg-[rgba(10,10,10,0.4)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] hover:backdrop-blur-3xl hover:border-[rgba(255,255,255,0.1)] transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-20 bg-[#10B981] transition-opacity duration-500 pointer-events-none"></div>
                  <div className="w-12 h-12 rounded-xl bg-[rgba(16,185,129,0.1)] flex items-center justify-center border border-[rgba(16,185,129,0.2)] mb-4">
                    <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Portfolio Value</p>
                  <p className="text-white text-3xl font-black">$124,500 <span className="text-[#10B981] text-sm font-semibold ml-2 tracking-normal">+12.5%</span></p>
                </div>
                
                <div className="krish-glass flex flex-col justify-center px-6 py-8 rounded-[2.5rem] flex-1 bg-[rgba(10,10,10,0.4)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] hover:backdrop-blur-3xl hover:border-[rgba(255,255,255,0.1)] transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-20 bg-[#A855F7] transition-opacity duration-500 pointer-events-none"></div>
                  <div className="w-12 h-12 rounded-xl bg-[rgba(168,85,247,0.1)] flex items-center justify-center border border-[rgba(168,85,247,0.2)] mb-4">
                    <svg className="w-6 h-6 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Deep Work</p>
                  <p className="text-white text-3xl font-black">4h 20m <span className="text-[#A855F7] text-sm font-semibold ml-2 tracking-normal">Today</span></p>
                </div>
            </motion.div>

          </div>
        </div>
      </div>
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
              <div className={`flex-1 w-full h-full relative ${mobileView === 'artifact' && artifactData ? 'flex' : 'hidden lg:flex'} ${!artifactData ? 'items-center justify-center krish-glass rounded-3xl border border-dashed border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,10,0.2)]' : ''}`}>
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

