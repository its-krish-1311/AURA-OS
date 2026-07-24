"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Lightbulb, Camera, Lock, Unlock, ThermometerSnowflake, Fan, Zap, Mic, ShieldCheck, Activity, Power, Settings, Home, AlertCircle } from "lucide-react";
const rooms = ["Living Room", "Bedroom", "Kitchen", "Garage"];

export default function HomeOS() {
  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const [isListening, setIsListening] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Device States
  const [lightsOn, setLightsOn] = useState(true);
  const [locked, setLocked] = useState(true);
  const [acTemp, setAcTemp] = useState(22);
  const [fanSpeed, setFanSpeed] = useState(2); // 0-3

  return (
    <div className="min-h-screen bg-transparent p-8 font-sans overflow-x-hidden relative flex flex-col" style={{'--theme-color': '#3B82F6', '--theme-color-dark': '#2563EB', '--theme-rgb': '59,130,246', '--theme-rgb-dark': '37,99,235'} as React.CSSProperties}>

      {/* Header Area */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <Wifi className="w-8 h-8 text-[#3B82F6]" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#3B82F6] tracking-tight">HOME OS</h1>
            <p className="text-[#3B82F6] text-sm font-semibold tracking-[0.2em] uppercase mt-1">Your Home. One AI Brain.</p>
          </div>
        </motion.div>

        {/* Voice Automation Trigger */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsListening(!isListening)}
          className={`px-6 py-3 rounded-full flex items-center gap-3 font-bold text-sm tracking-wide transition-all border ${
            isListening 
            ? "bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.5)] text-[#EF4444] shadow-[0_0_20px_rgba(239,68,68,0.2)]" 
            : "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.1)]"
          }`}
        >
          <div className="relative flex items-center justify-center">
            {isListening && <span className="absolute w-full h-full rounded-full bg-[#EF4444] animate-ping opacity-40"></span>}
            <Mic className="w-4 h-4 relative z-10" />
          </div>
          {isListening ? "Listening..." : "Voice Assistant"}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 relative z-10 flex-1">
        
        {/* Left Column: AI Core & Security */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          {/* Security AI Panel */}
          <div className="krish-glass rounded-3xl p-6 border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.03)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(16,185,129,0.1)] blur-3xl rounded-full"></div>
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-[#10B981]" />
              <h3 className="text-sm font-bold tracking-widest text-[#10B981] uppercase">Security AI</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-4 border-b border-[rgba(255,255,255,0.05)]">
                <span className="text-gray-400 text-sm font-medium">System Status</span>
                <span className="px-3 py-1 bg-[rgba(16,185,129,0.1)] text-[#10B981] text-xs font-bold rounded-full">ARMED</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-[rgba(255,255,255,0.05)]">
                <span className="text-gray-400 text-sm font-medium">Front Door</span>
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  {locked ? <Lock className="w-4 h-4 text-gray-400" /> : <Unlock className="w-4 h-4 text-yellow-500" />}
                  {locked ? "Locked" : "Unlocked"}
                </div>
              </div>
              <button 
                onClick={() => setLocked(!locked)}
                className="w-full mt-2 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors text-white text-sm font-bold flex items-center justify-center gap-2 border border-[rgba(255,255,255,0.1)]"
              >
                {locked ? "Unlock Main Door" : "Lock Main Door"}
              </button>
            </div>
          </div>

          {/* Energy Analytics */}
          <div className="krish-glass rounded-3xl p-6 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-[#F59E0B]" />
              <h3 className="text-sm font-bold tracking-widest text-white uppercase">Energy Usage</h3>
            </div>
            <div className="flex items-end gap-2 mb-8">
              <span className="text-4xl font-light text-white">4.2</span>
              <span className="text-gray-400 text-sm font-bold mb-1">kW/h</span>
            </div>
            
            {/* Simulated Chart */}
            <div className="flex-1 flex items-end justify-between gap-2 h-24 mb-4">
              {[40, 65, 30, 80, 50, 45, 90].map((height, i) => (
                <div key={i} className="w-full bg-[rgba(255,255,255,0.05)] rounded-t-sm relative group overflow-hidden h-full flex items-end">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-gradient-to-t from-[#3B82F6] to-[#60A5FA] rounded-t-sm"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
          
          {/* Device Health */}
          <div className="krish-glass rounded-3xl p-6">
             <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-gray-400" />
              <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Device Health</h3>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                <span className="text-sm text-gray-300">24 Devices Online</span>
              </div>
              <Settings className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Right Column: Room Controls & CCTV */}
        <div className="xl:col-span-3 flex flex-col gap-6">
          
          {/* Room Selector */}
          <div className="krish-glass p-2 rounded-2xl flex gap-2 overflow-x-auto w-full">
            {rooms.map(room => (
              <button
                key={room}
                onClick={() => setActiveRoom(room)}
                className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all whitespace-nowrap flex-1 ${activeRoom === room ? 'bg-[rgba(59,130,246,0.15)] text-[#60A5FA] border border-[rgba(59,130,246,0.3)] shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] border border-transparent'}`}
              >
                {room}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Lighting Control */}
            <div className="krish-glass rounded-3xl p-6 lg:col-span-1">
               <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center gap-3">
                   <Lightbulb className={`w-6 h-6 ${lightsOn ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]' : 'text-gray-600'}`} />
                   <h3 className="text-sm font-bold tracking-widest text-white uppercase">Lighting</h3>
                 </div>
                 <button 
                  onClick={() => setLightsOn(!lightsOn)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${lightsOn ? 'bg-[#3B82F6]' : 'bg-gray-700'}`}
                 >
                   <motion.div 
                    animate={{ x: lightsOn ? 24 : 2 }}
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-md"
                   />
                 </button>
               </div>
               
               <div className={`transition-opacity duration-500 ${lightsOn ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Brightness</p>
                 <input type="range" min="10" max="100" defaultValue="75" className="w-full accent-[#3B82F6] mb-8" />
                 
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Color Temp</p>
                 <div className="flex gap-2 h-10 w-full rounded-xl overflow-hidden mb-2">
                   <div className="flex-1 bg-amber-200 cursor-pointer hover:opacity-80"></div>
                   <div className="flex-1 bg-yellow-100 cursor-pointer hover:opacity-80"></div>
                   <div className="flex-1 bg-white cursor-pointer hover:opacity-80"></div>
                   <div className="flex-1 bg-blue-100 cursor-pointer hover:opacity-80"></div>
                 </div>
               </div>
            </div>

            {/* Climate Control */}
            <div className="krish-glass rounded-3xl p-6 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AC Control */}
              <div className="flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ThermometerSnowflake className="w-5 h-5 text-blue-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Air Con</span>
                  </div>
                  <Power className="w-4 h-4 text-[#10B981] cursor-pointer" />
                </div>
                
                {/* Circular Temp Dial (Visual simulation) */}
                <div className="w-36 h-36 rounded-full border-4 border-[rgba(255,255,255,0.05)] relative flex items-center justify-center mt-4">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="50%" cy="50%" r="48%" fill="transparent" stroke="rgba(59,130,246,0.2)" strokeWidth="6" />
                    <circle cx="50%" cy="50%" r="48%" fill="transparent" stroke="#3B82F6" strokeWidth="6" strokeDasharray="300" strokeDashoffset={300 - (acTemp - 16) * (300/14)} className="transition-all duration-300" />
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-light text-white flex items-start">{acTemp}<span className="text-lg">°</span></span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Cooling</span>
                  </div>
                </div>

                <div className="flex justify-between w-full mt-6 px-4">
                  <button onClick={() => setAcTemp(Math.max(16, acTemp - 1))} className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-white text-xl flex items-center justify-center transition-colors">-</button>
                  <button onClick={() => setAcTemp(Math.min(30, acTemp + 1))} className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-white text-xl flex items-center justify-center transition-colors">+</button>
                </div>
              </div>

              {/* Fan Control */}
              <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-[rgba(255,255,255,0.05)] pt-6 md:pt-0 md:pl-8">
                <div>
                  <div className="w-full flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Fan className={`w-5 h-5 ${fanSpeed > 0 ? 'text-white animate-spin' : 'text-gray-600'}`} style={{ animationDuration: `${3 / Math.max(fanSpeed, 1)}s` }} />
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Smart Fan</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {[3, 2, 1, 0].map(speed => (
                      <button 
                        key={speed}
                        onClick={() => setFanSpeed(speed)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors flex justify-between items-center border ${
                          fanSpeed === speed 
                          ? 'bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.2)] text-white' 
                          : 'bg-transparent border-transparent text-gray-500 hover:bg-[rgba(255,255,255,0.02)]'
                        }`}
                      >
                        {speed === 0 ? "Off" : `Speed ${speed}`}
                        {fanSpeed === speed && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* CCTV Simulation Area */}
            <div className="krish-glass rounded-3xl p-6 lg:col-span-3 min-h-[300px] flex flex-col relative overflow-hidden group">
              <div className="flex justify-between items-center mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-gray-300" />
                  <h3 className="text-sm font-bold tracking-widest text-white uppercase">Live Feeds - {activeRoom}</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-500 text-[10px] font-bold tracking-widest uppercase rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div> Live
                </div>
              </div>

              {/* Simulated Camera Feed Layout */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <div className="bg-[rgba(0,0,0,0.6)] rounded-2xl border border-[rgba(255,255,255,0.05)] relative overflow-hidden flex items-center justify-center min-h-[150px]">
                  {/* Fake Grid lines for CCTV effect */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBoMjBWMEgwem0xOSAxOUgxVjFoMTh2MTh6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')]"></div>
                  <p className="text-gray-500 text-xs font-mono tracking-widest relative z-10 opacity-50">CAM_01 / NO MOVEMENT DETECTED</p>
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono text-gray-400 bg-black/50 px-2 py-1 rounded">{currentTime || "12:00:00"}</span>
                </div>
                <div className="bg-[rgba(0,0,0,0.6)] rounded-2xl border border-[rgba(255,255,255,0.05)] relative overflow-hidden flex items-center justify-center min-h-[150px]">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBoMjBWMEgwem0xOSAxOUgxVjFoMTh2MTh6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')]"></div>
                  <p className="text-gray-500 text-xs font-mono tracking-widest relative z-10 opacity-50">CAM_02 / STANDBY</p>
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono text-gray-400 bg-black/50 px-2 py-1 rounded">{currentTime || "12:00:00"}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
