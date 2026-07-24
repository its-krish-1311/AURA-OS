"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Blocks, Link2, CheckCircle2, XCircle } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";
import * as Icons from "lucide-react";

export default function AutomationOSIntegrations() {
  const { autoIntegrations, connectAutoIntegration } = useOSData();

  // Mapping string to Lucide icon
  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent className="w-8 h-8" /> : <Blocks className="w-8 h-8" />;
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Blocks className="w-8 h-8 text-[#F97316]" /> App Integrations
          </h1>
          <p className="text-gray-400 text-sm">Connect third-party apps to power your pipelines.</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {autoIntegrations.map((integration) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                key={integration.id} 
                className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col group relative overflow-hidden"
              >
                {integration.status === "Connected" && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 blur-[80px] opacity-10" />
                )}
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className={`p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] ${integration.status === 'Connected' ? 'text-white' : 'text-gray-500'}`}>
                    {getIcon(integration.icon)}
                  </div>
                  
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                    integration.status === "Connected" ? 'bg-[rgba(16,185,129,0.1)] text-emerald-500 border border-[rgba(16,185,129,0.2)]' : 
                    integration.status === "Error" ? 'bg-[rgba(239,68,68,0.1)] text-red-500 border border-[rgba(239,68,68,0.2)]' : 
                    'bg-[rgba(255,255,255,0.05)] text-gray-400'
                  }`}>
                    {integration.status === "Connected" && <CheckCircle2 className="w-3 h-3" />}
                    {integration.status === "Error" && <XCircle className="w-3 h-3" />}
                    {integration.status}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-1">{integration.name}</h3>
                  <p className="text-xs text-gray-500 mb-6">Last synced: {integration.lastSync}</p>
                  
                  {integration.status !== "Connected" ? (
                    <button onClick={() => connectAutoIntegration(integration.id)} className="w-full py-2.5 rounded-xl bg-[rgba(249,115,22,0.1)] hover:bg-[rgba(249,115,22,0.2)] text-[#F97316] text-sm font-bold border border-[rgba(249,115,22,0.3)] transition-colors flex items-center justify-center gap-2">
                      <Link2 className="w-4 h-4" /> Connect App
                    </button>
                  ) : (
                    <button className="w-full py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-white text-sm font-bold border border-[rgba(255,255,255,0.05)] transition-colors flex items-center justify-center gap-2">
                      <Settings className="w-4 h-4" /> Configure
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Just importing Settings to make the icon work
import { Settings } from "lucide-react";
