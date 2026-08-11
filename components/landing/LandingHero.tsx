"use client";

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Play, Users, Zap, Clock, Trophy, Sun, Menu, CheckCircle2, Calendar, FileText, Activity, BrainCircuit } from "lucide-react";
import Image from "next/image";
import Spline from '@splinetool/react-spline/next';
import { ThemeEngine } from "@/lib/systems/ThemeEngine";
import AuthScreen from "@/components/auth/AuthScreen";

interface LandingHeroProps {
  onLogin: () => void;
}

export default function LandingHero({ onLogin }: LandingHeroProps) {
  const theme = ThemeEngine.getGlassmorphism();
  const physics = ThemeEngine.getPhysics();
  const gradients = ThemeEngine.getCoreGradients();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col bg-transparent font-sans pt-6 pb-12">
      
      {/* Top Navbar */}
      <nav className="relative z-40 w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image src="/logo.png" alt="Aura OS Logo" width={40} height={40} className="relative z-10 w-10 h-10 object-contain" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight leading-none">AURA OS</h1>
            <p className="text-gray-400 text-[10px]">AI Operating System</p>
          </div>
        </div>

        {/* Nav Links (Hidden on small screens) */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#" className="relative text-white font-semibold">
            Home
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-gradient-to-r from-[#7E22CE] to-[#06B6D4] shadow-[0_0_10px_rgba(126,34,206,0.6)]"></span>
          </a>
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Modules</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
          <a href="#" className="hover:text-white transition-colors">Community</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
            <Sun className="w-5 h-5" />
          </button>
          <button 
            onClick={() => openAuth('login')}
            className={`hidden sm:block px-6 py-2.5 rounded-full text-white text-sm font-semibold border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition-all`}
          >
            Sign In
          </button>
          <button 
            onClick={() => openAuth('signup')}
            className={`px-6 py-2.5 rounded-full text-white text-sm font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:scale-105 ${gradients.primary}`}
          >
            Get Started <ArrowRight className="inline w-4 h-4 ml-1" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-1">
        
        {/* Left Column - Hero Text */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-start text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`mb-6 px-4 py-1.5 rounded-full flex items-center gap-2 border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-300">
              AI-Powered Everything
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[1.1]"
          >
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#7E22CE] drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Aura OS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 font-medium leading-relaxed"
          >
            The all-in-one AI Operating System that helps you plan, create, code, analyze and achieve more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
          >
            <button
              onClick={() => openAuth('signup')}
              className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-2 ${gradients.primary}`}
            >
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </button>
            <button
              className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition-all flex items-center justify-center gap-2`}
            >
              Explore Features <Play className="w-4 h-4 fill-white" />
            </button>
          </motion.div>

          {/* Trust Avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#121212] bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden">
                  <UserAvatar seed={i} />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-yellow-500 text-sm">
                ★★★★★
              </div>
              <span className="text-gray-400 text-xs mt-0.5">Trusted by 10,000+ users worldwide</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column - 3D Model */}
        <div className="col-span-1 lg:col-span-7 flex justify-center lg:justify-end h-[500px] lg:h-[600px] relative pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7E22CE] to-[#06B6D4] blur-[100px] opacity-10 pointer-events-none rounded-full"></div>
            <div className="w-full h-full relative z-10" style={{ transform: "scale(1.2)" }}>
              {/* Working Public Spline Model */}
              <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Stats Bar */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className={`w-full rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-[rgba(255,255,255,0.05)] bg-[rgba(10,10,10,0.4)] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
        >
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center border border-[rgba(255,255,255,0.1)]">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white leading-tight">10K+</div>
              <div className="text-sm text-gray-400">Active Users</div>
              <div className="text-xs text-gray-500">Growing community</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.1)] to-transparent"></div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[rgba(6,182,212,0.1)] flex items-center justify-center border border-[rgba(6,182,212,0.2)]">
              <Zap className="w-6 h-6 text-[#06B6D4]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white leading-tight">50K+</div>
              <div className="text-sm text-gray-400">Tasks Completed</div>
              <div className="text-xs text-gray-500">Across all modules</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.1)] to-transparent"></div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[rgba(126,34,206,0.1)] flex items-center justify-center border border-[rgba(126,34,206,0.2)]">
              <Clock className="w-6 h-6 text-[#A855F7]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white leading-tight">1M+</div>
              <div className="text-sm text-gray-400">Hours Saved</div>
              <div className="text-xs text-gray-500">By our users</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.1)] to-transparent"></div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[rgba(234,179,8,0.1)] flex items-center justify-center border border-[rgba(234,179,8,0.2)]">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white leading-tight">99.9%</div>
              <div className="text-sm text-gray-400">System Uptime</div>
              <div className="text-xs text-gray-500">Reliable & Secure</div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showAuthModal && (
          <AuthScreen 
            initialMode={authMode} 
            onLogin={onLogin} 
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// Helper component for abstract avatars
function UserAvatar({ seed }: { seed: number }) {
  const colors = [
    ['from-pink-500', 'to-orange-400'],
    ['from-blue-500', 'to-cyan-400'],
    ['from-purple-500', 'to-indigo-500'],
    ['from-emerald-400', 'to-cyan-500'],
  ];
  const [from, to] = colors[seed % colors.length];
  return <div className={`w-full h-full bg-gradient-to-br ${from} ${to} opacity-80`}></div>;
}
