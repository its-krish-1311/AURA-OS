"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Sparkles, Clock, Calendar, Mail, FileText, Code2, BriefcaseMedical, Scale, Stethoscope, Lightbulb, Zap, Globe, ArrowRight, Activity, Cpu } from "lucide-react";
const personas = [
  { id: "core", label: "Core Neural", icon: BrainCircuit, color: "#A855F7", dark: "#7E22CE", rgb: "168,85,247", rgbDark: "126,34,206", bg: "from-[#A855F7] to-[#7E22CE]" },
  { id: "coder", label: "AI Coder", icon: Code2, color: "#3B82F6", dark: "#2563EB", rgb: "59,130,246", rgbDark: "37,99,235", bg: "from-[#3B82F6] to-[#2563EB]" },
  { id: "doctor", label: "AI Doctor", icon: Stethoscope, color: "#EF4444", dark: "#DC2626", rgb: "239,68,68", rgbDark: "220,38,38", bg: "from-[#EF4444] to-[#DC2626]" },
  { id: "lawyer", label: "AI Lawyer", icon: Scale, color: "#F59E0B", dark: "#D97706", rgb: "245,158,11", rgbDark: "217,119,6", bg: "from-[#F59E0B] to-[#D97706]" },
];

const contextNodes = [
  { label: "Emails", icon: Mail, delay: 0 },
  { label: "Calendar", icon: Calendar, delay: 0.2 },
  { label: "Documents", icon: FileText, delay: 0.4 },
  { label: "Health Data", icon: Activity, delay: 0.6 },
  { label: "Global Web", icon: Globe, delay: 0.8 },
];

export default function NeuralOS() {
  const [activePersona, setActivePersona] = useState(personas[0]);
  const [currentTime, setCurrentTime] = useState("");
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-transparent p-8 font-sans overflow-x-hidden relative flex flex-col transition-colors duration-1000" style={{
      '--theme-color': activePersona.color, 
      '--theme-color-dark': activePersona.dark, 
      '--theme-rgb': activePersona.rgb, 
      '--theme-rgb-dark': activePersona.rgbDark
    } as React.CSSProperties}>
        {/* Header & Persona Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <motion.div 
            animate={{ boxShadow: `0 0 30px ${activePersona.color}40`, borderColor: `${activePersona.color}80` }}
            className="w-16 h-16 rounded-2xl bg-[rgba(255,255,255,0.02)] border flex items-center justify-center transition-colors duration-1000"
          >
            <activePersona.icon className="w-8 h-8" style={{ color: activePersona.color }} />
          </motion.div>
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">
              NEURAL <span style={{ color: activePersona.color }}>OS</span>
            </h1>
            <p className="text-gray-400 text-sm font-semibold tracking-[0.2em] uppercase mt-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: activePersona.color }} />
              Computing That Thinks With You
            </p>
          </div>
        </motion.div>

        {/* AI Skill Engine Selector */}
        <div className="krish-glass p-2 rounded-2xl flex gap-2 overflow-x-auto w-full md:w-auto">
          {personas.map(persona => (
            <button
              key={persona.id}
              onClick={() => setActivePersona(persona)}
              className={`px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 ${activePersona.id === persona.id ? 'bg-[rgba(255,255,255,0.1)] text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-[rgba(255,255,255,0.05)]'}`}
            >
              <persona.icon className={`w-4 h-4 ${activePersona.id === persona.id ? '' : 'opacity-50'}`} style={{ color: activePersona.id === persona.id ? persona.color : undefined }} />
              {persona.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 relative z-10 flex-1">
        
        {/* Left Column: Predictive Computing */}
        <div className="xl:col-span-2 flex flex-col gap-8">
          
          {/* Main Predictive Banner */}
          <motion.div 
            key={activePersona.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="krish-glass rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col justify-end min-h-[350px]"
          >
            {/* Animated Mesh / Glow Background inside banner */}
            <div className={`absolute inset-0 bg-gradient-to-br ${activePersona.bg} opacity-10`} />
            <motion.div 
              animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {currentTime || "Live"}
                </div>
                <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                  <Zap className="w-3 h-3 text-yellow-400" /> High Priority
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-light text-white leading-tight tracking-tight mb-4">
                Good morning. <br />
                <span className="font-bold">I've prepared for your 10 AM Board Meeting.</span>
              </h2>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <button className="px-6 py-3 rounded-2xl bg-white text-black font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                  Open Presentation <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-6 py-3 rounded-2xl bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-white font-bold text-sm hover:bg-[rgba(255,255,255,0.2)] transition-colors">
                  Book Cab to Office
                </button>
                <button className="px-6 py-3 rounded-2xl bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-white font-bold text-sm hover:bg-[rgba(255,255,255,0.2)] transition-colors">
                  Review Financials
                </button>
              </div>
            </div>
          </motion.div>

          {/* Context Engine Visualizer */}
          <div className="krish-glass rounded-3xl p-8 flex flex-col gap-6">
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Context Engine Active
            </h3>
            <p className="text-sm text-gray-500 font-medium max-w-2xl">
              Neural OS doesn't just respond; it remembers. It is continuously syncing with your entire digital life to understand your underlying intent before you even type.
            </p>
            
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent -translate-y-1/2 hidden md:block"></div>
              
              {contextNodes.map((node, i) => {
                const Icon = node.icon;
                return (
                  <motion.div 
                    key={node.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: node.delay, duration: 0.8 }}
                    className="flex flex-col items-center gap-3 relative z-10 w-[100px]"
                  >
                    <div className="w-12 h-12 rounded-full bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center relative overflow-hidden group">
                      <motion.div 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, delay: node.delay, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-t from-transparent"
                        style={{ backgroundImage: `linear-gradient(to top, ${activePersona.color}40, transparent)` }}
                      />
                      <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors relative z-10" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">{node.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Persona Active Workspace */}
        <motion.div 
          key={`sidebar-${activePersona.id}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="krish-glass rounded-3xl p-6 relative overflow-hidden flex flex-col"
        >
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${activePersona.bg}`}></div>
          
          <div className="flex items-center gap-3 mb-8">
            <activePersona.icon className="w-6 h-6" style={{ color: activePersona.color }} />
            <h3 className="text-sm font-bold tracking-widest text-white uppercase">{activePersona.label} Mode</h3>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {activePersona.id === "core" && (
              <>
                <PersonaTask 
                  title="Universal OS Update" 
                  desc="Neural OS is running seamlessly over Windows, macOS, and Linux subsystems." 
                  color={activePersona.color} 
                />
                <PersonaTask 
                  title="Intent Captured" 
                  desc="Noticed you reading about Japan. Started drafting an itinerary in the background." 
                  color={activePersona.color} 
                />
              </>
            )}
            
            {activePersona.id === "coder" && (
              <>
                <PersonaTask 
                  title="Auto-Debugging" 
                  desc="Found a memory leak in background worker. Fixed and pushed to branch 'neural-fix'." 
                  color={activePersona.color} 
                />
                <PersonaTask 
                  title="Deployment Ready" 
                  desc="Staging environment passes all CI/CD checks. Ready for production rollout." 
                  color={activePersona.color} 
                />
              </>
            )}

            {activePersona.id === "doctor" && (
              <>
                <PersonaTask 
                  title="Health Sync" 
                  desc="Heart rate variability indicates high stress. Adjusted schedule to include 15m meditation." 
                  color={activePersona.color} 
                />
                <PersonaTask 
                  title="Dietary Plan" 
                  desc="Ordered groceries prioritizing Omega-3 rich foods based on recent bloodwork." 
                  color={activePersona.color} 
                />
              </>
            )}

            {activePersona.id === "lawyer" && (
              <>
                <PersonaTask 
                  title="Contract Review" 
                  desc="Analyzed NDA from TechCorp. Flagged clause 4.2 as non-standard. Drafted revision." 
                  color={activePersona.color} 
                />
                <PersonaTask 
                  title="IP Monitoring" 
                  desc="Scanned recent patent filings. No conflicts found with current proprietary tech." 
                  color={activePersona.color} 
                />
              </>
            )}
          </div>
          
          <div className="mt-8 p-4 rounded-2xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] text-center">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Status</p>
            <p className="text-sm font-bold text-white flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activePersona.color }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: activePersona.color }}></span>
              </span>
              Neural Network Active
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PersonaTask({ title, desc, color }: { title: string, desc: string, color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors group cursor-default"
    >
      <h4 className="text-sm font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text transition-all" style={{ backgroundImage: `linear-gradient(to right, #FFF, ${color})` }}>
        {title}
      </h4>
      <p className="text-xs text-gray-400 font-medium leading-relaxed">{desc}</p>
    </motion.div>
  );
}
