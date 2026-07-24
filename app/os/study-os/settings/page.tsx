"use client";

import React, { useState } from "react";
import { Settings as SettingsIcon, Bell, Shield, User, Globe, Moon, Monitor, Eye, Key, Save, Volume2, Cloud } from "lucide-react";
import { motion } from "framer-motion";

export default function StudyOSSettings() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Eye },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "sync", label: "Sync & Storage", icon: Cloud },
  ];

  return (
    <div className="p-8 pb-20 max-w-6xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-[#3B82F6]" /> Study OS Settings
        </h1>
        <p className="text-gray-400 text-sm">Manage your academic preferences and system configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 flex-1 min-h-0">
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id 
                  ? 'bg-[rgba(59,130,246,0.15)] text-[#3B82F6] shadow-[inset_4px_0_0_#3B82F6]' 
                  : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-[#3B82F6]' : 'text-gray-500'}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent p-8 overflow-y-auto custom-scrollbar">
          
          {activeTab === "general" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">General Preferences</h2>
                <p className="text-xs text-gray-500 mb-6">Configure basic settings for your study environment.</p>
                
                <div className="space-y-6">
                  {/* Default View */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Default Startup Page</label>
                    <select className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#3B82F6] transition-all">
                      <option>Dashboard</option>
                      <option>Courses</option>
                      <option>Focus Timer</option>
                      <option>Planner</option>
                    </select>
                  </div>
                  
                  {/* Focus Timer Defaults */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Default Pomodoro Length</label>
                    <div className="flex gap-4">
                      <input 
                        type="number" 
                        defaultValue={25}
                        className="w-24 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#3B82F6] transition-all"
                      />
                      <span className="flex items-center text-sm text-gray-500">minutes</span>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-[rgba(255,255,255,0.05)]" />

              <div>
                <h2 className="text-xl font-bold text-white mb-1">Academic Profile</h2>
                <p className="text-xs text-gray-500 mb-6">Your university and major details.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">University / Institution</label>
                    <input 
                      type="text" 
                      defaultValue="Massachusetts Institute of Technology"
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#3B82F6] transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Major</label>
                      <input 
                        type="text" 
                        defaultValue="Computer Science"
                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#3B82F6] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Target GPA</label>
                      <input 
                        type="text" 
                        defaultValue="4.0"
                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#3B82F6] transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center gap-2 transition-all">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab !== "general" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-4">
                <SettingsIcon className="w-8 h-8 text-gray-500" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Module Configuration</h2>
              <p className="text-sm text-gray-400 max-w-md">
                Settings for {activeTab} are inherited from the global Aura OS settings. Changes made here will only apply to the Study OS environment.
              </p>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
