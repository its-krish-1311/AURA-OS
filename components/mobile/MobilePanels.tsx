"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, MoreHorizontal, ArrowLeft, Mic, Send, Book, Code, Database, Server, Image as ImageIcon, Briefcase, MapPin, Search as SearchIcon, Plane, Hotel, Car, Package, Bot, Shirt, Music, Headphones, PlayCircle, Speaker } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full relative">
        {children}
      </div>
    </motion.div>
  );
}

export default function MobilePanels() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [messages, setMessages] = useState<{sender: 'user'|'ai', text: string}[]>([]);
  const [chatInput, setChatInput] = useState("");

  const handleChatSubmit = async (e?: React.FormEvent, presetMsg?: string) => {
    if (e) e.preventDefault();
    const msg = presetMsg || chatInput;
    if (!msg.trim()) return;
    
    const newMessages = [...messages, { sender: 'user' as const, text: msg }];
    setMessages(newMessages);
    setChatInput("");
    
    // Show loading state
    setMessages(prev => [...prev, { sender: 'ai', text: "..." }]);

    // Simulated Intelligent AI Response Engine
    setTimeout(() => {
      setMessages(prev => {
        const withoutLoading = [...prev];
        withoutLoading.pop(); // remove "..."
        
        let aiResponse = "";
        const lowerMsg = msg.toLowerCase();
        
        if (lowerMsg.includes("schedule") || lowerMsg.includes("email")) {
          aiResponse = "I've fetched your latest updates. You have 3 unread emails from the team and a strategy sync at 2 PM. Shall I prepare a brief for you?";
        } else if (lowerMsg.includes("music") || lowerMsg.includes("play")) {
          aiResponse = "Initializing Deep Focus Lo-Fi playlist in Music OS. Audio spatialization is active.";
        } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
          aiResponse = "Hello Krish! All systems are running optimally. What's our primary objective for today?";
        } else if (lowerMsg.includes("weather")) {
          aiResponse = "It's currently 22°C with clear skies. Optimal conditions for both outdoor activities and focused indoor work.";
        } else if (lowerMsg.includes("code") || lowerMsg.includes("build") || lowerMsg.includes("dev")) {
          aiResponse = "Developer OS is ready. I've spun up your local environment and pre-compiled the latest dependencies. Ready to write some code?";
        } else {
           const genericResponses = [
             "Analyzing request... Task executed successfully across all OS modules.",
             "I've updated the system protocols and optimized the workflow based on your command.",
             "Done. I've also allocated extra system resources to ensure maximum performance for this task.",
             "Understood. I've integrated this parameter into your global AuraOS preferences."
           ];
           aiResponse = genericResponses[Math.floor(Math.random() * genericResponses.length)];
        }
        
        return [...withoutLoading, { sender: 'ai', text: aiResponse }];
      });
    }, 800); // 800ms quick response time
  };


  // Music OS State
  const [tracks, setTracks] = useState([
    { title: "Neon Nights", stat: "Playing", perc: 70, icon: Headphones, color: "text-[#9333EA]", bg: "bg-[rgba(147,51,234,0.15)]", border: "border-[rgba(147,51,234,0.3)]", done: false },
    { title: "Cyberpunk City", stat: "Next", perc: 0, icon: Music, color: "text-gray-300", bg: "bg-[rgba(255,255,255,0.03)]", border: "border-[rgba(255,255,255,0.05)]", done: false },
    { title: "Deep Focus Lo-Fi", stat: "Queue", perc: 0, icon: PlayCircle, color: "text-gray-300", bg: "bg-[rgba(255,255,255,0.03)]", border: "border-[rgba(255,255,255,0.05)]", done: false },
    { title: "Synthwave Beats", stat: "Queue", perc: 0, icon: Speaker, color: "text-gray-300", bg: "bg-[rgba(255,255,255,0.03)]", border: "border-[rgba(255,255,255,0.05)]", done: false },
  ]);

  const toggleTrack = (index: number) => {
    setTracks(prev => prev.map((t, i) => {
      if (i === index) {
        return { ...t, done: !t.done, stat: !t.done ? "Played" : "Queue", perc: !t.done ? 100 : (i === 0 ? 70 : 0) };
      }
      return t;
    }));
  };

  const totalProgress = Math.round(tracks.reduce((acc, curr) => acc + curr.perc, 0) / tracks.length);

  // Travel OS State
  const [travelSearch, setTravelSearch] = useState("");
  const allDestinations = [
    { name: "Bali", location: "Indonesia", price: "₹45,999", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=300" },
    { name: "Switzerland", location: "Europe", price: "₹99,999", img: "https://images.unsplash.com/photo-1527668752968-14ce70a2a7e6?auto=format&fit=crop&q=80&w=300" },
    { name: "Paris", location: "France", price: "₹85,000", img: "https://images.unsplash.com/photo-1502602881462-f2243e1176b6?auto=format&fit=crop&q=80&w=300" }
  ];
  
  const filteredDestinations = allDestinations.filter(d => 
    d.name.toLowerCase().includes(travelSearch.toLowerCase()) || 
    d.location.toLowerCase().includes(travelSearch.toLowerCase())
  );

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="w-full max-w-[1600px] mx-auto my-16 px-8 pb-12 perspective-1000">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full">
      
      {/* Panel 1: AI CHAT */}
      <TiltCard className="w-full h-[620px] flex-shrink-0 bg-gradient-to-b from-[#162038] to-[#0D1322] border border-[#253350] shadow-[0_20px_40px_rgba(0,0,0,0.7)] rounded-[36px] p-6 flex flex-col relative transition-shadow duration-500 group">
        <div className="flex justify-between items-center mb-6 relative z-10">
          <ArrowLeft className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
          <span className="text-white text-xs font-bold tracking-[0.2em] drop-shadow-md">AI CHAT</span>
          <MoreHorizontal className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
        </div>
        
        <div className="relative z-10 mb-4">
          <h2 className="text-white text-3xl font-light drop-shadow-lg">
            Hello, <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-[#FFFFFF] relative inline-block">
              Krish!
              <span className="absolute inset-0 bg-[#9333EA] blur-[15px] opacity-30 pointer-events-none"></span>
            </span> 👋
          </h2>
          <p className="text-gray-300 text-sm mt-2 font-medium">How can I help you today?</p>
        </div>

        <div className="flex-1 flex flex-col justify-end overflow-hidden mb-2 relative z-10">
          {messages.length === 0 ? (
            <>
              {/* The Solid Luxury Glass Orb */}
              <div className="flex-1 flex flex-col items-center justify-center py-4 relative">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-36 h-36 rounded-full bg-gradient-to-br from-[rgba(12,15,25,0.9)] via-[#04060B] to-[#081B33] border-none shadow-[inset_0_0_40px_rgba(147,51,234,0.2),0_0_60px_rgba(147,51,234,0.3)] flex items-center justify-center overflow-hidden z-20 group-hover:scale-105 transition-transform duration-500"
                >
                  {/* Inner Blue Light Core (The "Brain") */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-[#4DA6FF] via-[#9333EA] to-[#FFFFFF] blur-[25px] mix-blend-screen"
                  />

                  {/* Holographic Stardust Texture */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 mix-blend-overlay" />
                  
                  {/* AI Face Eyes / Glowing nodes */}
                  <motion.div 
                    animate={{ height: [4, 2, 4], opacity: [0.8, 0.3, 0.8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[40%] w-2 h-4 rounded-full bg-white shadow-[0_0_15px_#fff,0_0_25px_rgba(147,51,234,0.8)] left-10" 
                  />
                  <motion.div 
                    animate={{ height: [4, 2, 4], opacity: [0.8, 0.3, 0.8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="absolute top-[40%] w-2 h-4 rounded-full bg-white shadow-[0_0_15px_#fff,0_0_25px_rgba(147,51,234,0.8)] right-10" 
                  />
                  
                  {/* Voice/Mouth Energy Line */}
                  <motion.div 
                    animate={{ width: [30, 45, 30], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[30%] h-1.5 rounded-full bg-gradient-to-r from-transparent via-[#FFFFFF] to-transparent shadow-[0_0_15px_rgba(147,51,234,0.4)]" 
                  />

                  {/* Premium Glass Spherical Highlight (Rim Lighting) */}
                  <div className="absolute top-1 left-3 w-20 h-8 rounded-full bg-gradient-to-b from-[rgba(255,255,255,0.6)] to-transparent -rotate-[20deg] blur-[2px]" />
                  <div className="absolute bottom-2 right-2 w-16 h-4 rounded-full bg-gradient-to-t from-[rgba(147,51,234,0.2)] to-transparent rotate-[20deg] blur-[3px]" />
                </motion.div>
                
                <h3 className="text-white text-xs font-bold tracking-[0.4em] mt-6 opacity-60 animate-pulse">LISTENING...</h3>
                
                {/* 3 Quick Questions */}
                <div className="mt-6 flex flex-col gap-2 w-full max-w-[90%]">
                  {["What's my schedule today?", "Summarize my latest emails", "Play focus music"].map((q, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setChatInput(q); }}
                      className="w-full py-2 px-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] text-gray-300 text-xs font-medium cursor-pointer hover:bg-[rgba(147,51,234,0.1)] hover:border-[rgba(147,51,234,0.3)] hover:text-white transition-all text-center shadow-sm"
                    >
                      {q}
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide flex flex-col justify-end">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3 text-xs tracking-wide shadow-md ${msg.sender === 'user' ? 'bg-gradient-to-br from-[#9333EA] to-[#A855F7] text-white rounded-br-sm' : 'krish-glass border border-[rgba(255,255,255,0.1)] text-gray-100 rounded-bl-sm'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleChatSubmit} className="mt-auto bg-[rgba(0,0,0,0.5)] rounded-full p-2 border border-[rgba(147,51,234,0.5)] flex items-center gap-2 relative z-10 shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_0_10px_rgba(147,51,234,0.1)] focus-within:bg-[rgba(0,0,0,0.8)] focus-within:border-[#9333EA] focus-within:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all">
          <input 
            type="text" 
            placeholder="Ask anything..." 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white text-sm px-3 placeholder-muted font-medium" 
          />
          <Mic className="w-4 h-4 text-gray-300 hover:text-white transition-colors cursor-pointer mr-1" />
          <motion.button type="submit" whileTap={{ scale: 0.9 }} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:scale-105 transition-all mr-1">
            <Send className="w-3.5 h-3.5 text-black -ml-0.5" />
          </motion.button>
        </form>
      </TiltCard>

      {/* Panel 2: MUSIC OS */}
      <TiltCard className="w-full h-[620px] flex-shrink-0 bg-gradient-to-b from-[#162038] to-[#0D1322] border border-[#253350] shadow-[0_20px_40px_rgba(0,0,0,0.7)] rounded-[36px] p-6 flex flex-col relative transition-all duration-500">
        <div className="flex justify-between items-center mb-6 relative z-10">
          <ArrowLeft className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
          <span className="text-white text-xs font-bold tracking-[0.2em] drop-shadow-md">MUSIC OS</span>
          <MoreHorizontal className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
        </div>

        <div className="mb-6 relative z-10">
          <p className="text-gray-300 text-xs font-bold tracking-widest mb-1">Now Playing</p>
          <h3 className="text-white text-sm font-bold mb-3 tracking-wide drop-shadow-md">Cyberpunk Synth Mix</h3>
          <div className="w-full bg-[rgba(255,255,255,0.05)] h-2.5 rounded-full overflow-hidden shadow-inner border border-[rgba(255,255,255,0.02)] relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-gradient-to-r from-[#9333EA] to-[#FFFFFF] h-full shadow-[0_0_10px_rgba(255,255,255,0.5)] rounded-full relative overflow-hidden" 
            >
               <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.4)] to-transparent animate-[sweep_2s_ease-in-out_infinite]" />
            </motion.div>
          </div>
          <div className="text-right mt-1.5"><span className="text-white text-xs font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{totalProgress}%</span></div>
        </div>

        <div className="flex justify-between items-center mb-4 relative z-10">
          <h3 className="text-white text-xs font-bold tracking-[0.2em]">TRACKS</h3>
          <button className="text-accentLuxury text-xs font-bold tracking-wider">View All</button>
        </div>

        <div className="space-y-4 flex-1 relative z-10">
          {tracks.map((track, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 5 }} 
              onClick={() => toggleTrack(i)}
              className="flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${track.done ? 'bg-[#9333EA] shadow-[0_0_15px_rgba(147,51,234,0.5)]' : track.bg} border ${track.border} flex items-center justify-center group-hover:shadow-[0_0_15px_currentColor] transition-all`}>
                  <track.icon className={`w-5 h-5 ${track.done ? 'text-white' : track.color}`} />
                </div>
                <div>
                  <h4 className={`text-sm font-bold tracking-wide transition-all ${track.done ? 'text-accent line-through' : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent'}`}>{track.title}</h4>
                  <p className="text-gray-300 text-xs font-semibold tracking-wide">{track.stat}</p>
                </div>
              </div>
              <span className={`text-xs font-bold ${track.done ? 'text-accent' : 'text-white'}`}>{track.perc}%</span>
            </motion.div>
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.02 }} className="mt-4 bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:shadow-goldGlow rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
              <Bot className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold tracking-wide">AI DJ</h4>
              <p className="text-gray-300 text-xs font-semibold tracking-wide">Generate a custom mix</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
        </motion.div>

        <div className="mt-6 flex justify-between items-center px-2 relative z-10">
          {["Home", "Lib", "Play", "Radio", "Stats"].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1 cursor-pointer group">
              {item === "Play" ? (
                <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} className="w-12 h-12 rounded-full bg-gradient-to-br from-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0.05)] flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-shadow border border-[rgba(255,255,255,0.3)] text-white z-20 relative backdrop-blur-md">
                  <PlayCircle className="w-6 h-6 fill-white drop-shadow-md" />
                </motion.div>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] group-hover:bg-[rgba(255,255,255,0.1)] transition-colors mb-1 shadow-inner flex items-center justify-center" />
                  <span className="text-gray-300 text-xs font-semibold tracking-wide group-hover:text-white transition-colors">{item}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </TiltCard>

      {/* Similar structural updates applied to Fashion & Travel cards for deep glass effects */}
      {/* Panel 3: FASHION OS */}
      <TiltCard className="w-full h-[620px] flex-shrink-0 bg-gradient-to-b from-[#162038] to-[#0D1322] border border-[#253350] shadow-[0_20px_40px_rgba(0,0,0,0.7)] rounded-[36px] p-6 flex flex-col relative transition-all duration-500">
        <div className="flex justify-between items-center mb-6 relative z-10">
          <ArrowLeft className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
          <span className="text-white text-xs font-bold tracking-[0.2em] drop-shadow-md">FASHION OS</span>
          <MoreHorizontal className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
        </div>

        <div className="mb-4 relative z-10">
          <h3 className="text-white text-sm font-bold mb-1 tracking-wide">Today's Outfit</h3>
          <p className="text-gray-300 text-xs font-semibold tracking-wide">Minimal & Classy</p>
        </div>

        <div className="w-full h-64 bg-gradient-to-b from-[#000000] to-[#000000] rounded-[24px] mb-6 relative overflow-hidden flex items-center justify-center border border-[rgba(255,255,255,0.1)] shadow-[0_10px_30px_rgba(0,0,0,0.5)] group z-10">
          <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay"}></div>
          <ImageIcon className="w-12 h-12 text-[rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_#fff]" />
             <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
             <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>
        </div>

        <div className="flex justify-between items-center px-2 mb-6 relative z-10">
          {[
            { icon: Shirt, label: "Minimal", active: true },
            { icon: Briefcase, label: "Streetwear" },
            { icon: Package, label: "Formal" },
            { icon: Briefcase, label: "Luxury" },
          ].map((cat, i) => (
             <motion.div whileHover={{ y: -2 }} key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center transition-all duration-300 border ${cat.active ? 'bg-gradient-to-br from-[#9333EA] to-[#1e40af] border-[#A855F7] text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]' : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.05)] text-gray-300 group-hover:bg-[rgba(255,255,255,0.1)] group-hover:border-[rgba(255,255,255,0.2)] group-hover:text-white shadow-inner'}`}>
                  <cat.icon className="w-5 h-5 drop-shadow-md" />
                </div>
                <span className={`text-xs tracking-wide transition-colors ${cat.active ? 'text-white font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-gray-300 group-hover:text-white'}`}>{cat.label}</span>
             </motion.div>
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.02 }} className="mt-auto bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.3)] hover:border-[rgba(255,255,255,0.6)] hover:shadow-goldGlow rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.4)] flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]">
              <Bot className="w-5 h-5 text-accentLuxury drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold tracking-wide">AI TRY-ON</h4>
              <p className="text-accentLuxury text-xs font-semibold tracking-wide">See how it looks on you</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-accentLuxury drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
        </motion.div>
      </TiltCard>

      {/* Panel 4: TRAVEL OS */}
      <TiltCard className="w-full h-[620px] flex-shrink-0 bg-gradient-to-b from-[#162038] to-[#0D1322] border border-[#253350] shadow-[0_20px_40px_rgba(0,0,0,0.7)] rounded-[36px] p-6 flex flex-col relative transition-all duration-500">
        <div className="flex justify-between items-center mb-6 relative z-10">
          <ArrowLeft className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
          <span className="text-white text-xs font-bold tracking-[0.2em] drop-shadow-md">TRAVEL OS</span>
          <MoreHorizontal className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
        </div>

        <h2 className="text-white text-xl font-bold mb-4 tracking-wide relative z-10">Explore The World</h2>

        <div className="w-full bg-[rgba(10,10,10,0.8)] rounded-2xl p-3 flex items-center gap-3 mb-6 border border-[rgba(255,255,255,0.1)] shadow-inner focus-within:border-[rgba(147,51,234,0.4)] focus-within:shadow-cyanGlow transition-all relative z-10">
           <SearchIcon className="w-4 h-4 text-gray-300" />
           <input 
             type="text" 
             placeholder="Where do you want to go?" 
             value={travelSearch}
             onChange={(e) => setTravelSearch(e.target.value)}
             className="bg-transparent border-none outline-none text-white text-sm placeholder-muted font-medium w-full" 
           />
        </div>

        <div className="flex justify-between items-center mb-8 px-2 relative z-10">
           {[
             { icon: Plane, label: "Flights", active: true },
             { icon: Hotel, label: "Hotels" },
             { icon: Car, label: "Cars" },
             { icon: Package, label: "Packages" },
           ].map((item, i) => (
             <motion.div whileHover={{ y: -2 }} key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center transition-all duration-300 border ${item.active ? 'bg-gradient-to-br from-[#9333EA] to-[#1e40af] border-[#A855F7] text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]' : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.05)] text-gray-300 group-hover:bg-[rgba(255,255,255,0.1)] group-hover:border-[rgba(255,255,255,0.2)] group-hover:text-white shadow-inner'}`}>
                   <item.icon className="w-5 h-5 drop-shadow-md" />
                </div>
                <span className={`text-xs tracking-wide transition-colors ${item.active ? 'text-white font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-gray-300 group-hover:text-white'}`}>{item.label}</span>
             </motion.div>
           ))}
        </div>

        <div className="flex justify-between items-center mb-4 relative z-10">
          <h3 className="text-white text-xs font-bold tracking-[0.2em]">POPULAR DESTINATIONS</h3>
          <button className="text-accent text-xs font-bold tracking-wider hover:text-white transition-colors">View All</button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-6 relative z-10">
           {filteredDestinations.map((dest, i) => (
             <motion.div key={i} whileHover={{ scale: 1.05 }} className="w-32 h-40 rounded-[20px] relative overflow-hidden flex-shrink-0 bg-[#000000] border border-[rgba(255,255,255,0.1)] shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-pointer group">
                <img src={dest.img} className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500" alt={dest.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] via-[rgba(0,0,0,0.2)] to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3">
                   <h4 className="text-white text-sm font-bold tracking-wide">{dest.name}</h4>
                   <p className="text-gray-300 text-xs tracking-wider font-semibold">{dest.location}</p>
                   <p className="text-white text-xs font-bold mt-1 tracking-wide">{dest.price}</p>
                </div>
             </motion.div>
           ))}
           {filteredDestinations.length === 0 && (
             <div className="w-full h-40 flex items-center justify-center border border-dashed border-[rgba(255,255,255,0.1)] rounded-[20px]">
               <span className="text-gray-300 text-xs font-semibold">No destinations found</span>
             </div>
           )}
        </div>

        <motion.div whileHover={{ scale: 1.02 }} className="mt-auto bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:shadow-goldGlow rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
              <Bot className="w-5 h-5 text-[#9333EA] drop-shadow-[0_0_8px_rgba(147,51,234,0.5)]" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold tracking-wide">TRIP PLANNER</h4>
              <p className="text-[#9333EA] text-xs font-semibold tracking-wide">AI will plan everything for you</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-[#9333EA] drop-shadow-[0_0_5px_rgba(147,51,234,0.5)]" />
        </motion.div>
      </TiltCard>
      </div>
    </div>
  );
}



