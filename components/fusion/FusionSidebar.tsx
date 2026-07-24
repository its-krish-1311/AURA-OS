"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Combine, BrainCircuit, Workflow, Brain, 
  Folder, FolderKanban, ShoppingBag, Zap, BarChart2, 
  Unplug, Shield, Settings, LifeBuoy 
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/os/fusion-os" },
  { label: "Fusion", icon: Combine, href: "/os/fusion-os", active: true },
  { label: "Agents", icon: BrainCircuit, href: "/os/fusion-os" },
  { label: "Workflows", icon: Workflow, href: "/os/fusion-os" },
  { label: "Memory", icon: Brain, href: "/os/fusion-os" },
  { label: "Files", icon: Folder, href: "/os/fusion-os" },
  { label: "Projects", icon: FolderKanban, href: "/os/fusion-os" },
  { label: "Marketplace", icon: ShoppingBag, href: "/os/fusion-os" },
  { label: "Automation", icon: Zap, href: "/os/fusion-os" },
  { label: "Analytics", icon: BarChart2, href: "/os/fusion-os" },
  { label: "Integrations", icon: Unplug, href: "/os/fusion-os" },
  { label: "Security", icon: Shield, href: "/os/fusion-os" },
  { label: "Settings", icon: Settings, href: "/os/fusion-os" },
  { label: "Support", icon: LifeBuoy, href: "/os/fusion-os" }
];

export default function FusionSidebar() {
  return (
    <div className="w-[280px] h-full hidden lg:flex flex-col gap-2 p-4 pt-0 border-r border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)] backdrop-blur-3xl overflow-y-auto custom-scrollbar">
      
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-8 sticky top-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-3xl z-10 rounded-b-3xl mb-4 border-b border-[rgba(255,255,255,0.02)]">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#A855F7] to-[#06B6D4] p-[1px] relative group overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
           <div className="w-full h-full bg-[#04060B] rounded-[15px] flex items-center justify-center relative z-10">
              <Combine className="w-5 h-5 text-transparent bg-clip-text bg-gradient-to-br from-white to-[#A855F7] drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" color="white" />
           </div>
        </div>
        <div>
          <h2 className="text-white font-bold tracking-widest text-lg drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">FUSION<span className="text-[#A855F7]">OS</span></h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Aura Intelligence</p>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 flex flex-col gap-1.5 px-2">
        {menuItems.map((item, idx) => (
          <Link href={item.href} key={idx} className="group outline-none">
            <motion.div 
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                item.active 
                  ? "bg-[rgba(168,85,247,0.15)] border border-[rgba(168,85,247,0.3)] shadow-[0_0_20px_rgba(168,85,247,0.1)]" 
                  : "hover:bg-[rgba(255,255,255,0.03)] border border-transparent"
              }`}
            >
              {item.active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#A855F7] rounded-r-full shadow-[0_0_10px_#A855F7]"></div>
              )}
              
              <item.icon className={`w-5 h-5 transition-colors duration-300 ${item.active ? "text-[#A855F7]" : "text-gray-400 group-hover:text-white"}`} />
              
              <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${item.active ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                {item.label}
              </span>

              {item.active && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.05)] to-transparent skew-x-[-20deg] animate-[sweep_2s_ease-in-out_infinite]"></div>
              )}
            </motion.div>
          </Link>
        ))}
      </nav>

      {/* Storage/Health Mini Widget */}
      <div className="mt-8 mb-4 px-6 p-5 rounded-3xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-24 h-24 bg-[#06B6D4] blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
         <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Core Health</h4>
         <div className="flex items-center justify-between text-xs text-white mb-2">
            <span>Neural Sync</span>
            <span className="text-[#06B6D4]">99.8%</span>
         </div>
         <div className="w-full h-1 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
            <div className="w-[99.8%] h-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] shadow-[0_0_10px_#06B6D4]"></div>
         </div>
      </div>
    </div>
  );
}
