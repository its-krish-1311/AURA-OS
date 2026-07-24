"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import OSSidebar from "./OSSidebar";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface OSLayoutProps {
  osName: string;
  osId: string;
  themeColor: string;
  sidebarItems: SidebarItem[];
  children: ReactNode;
}

export default function OSLayout({ osName, osId, themeColor, sidebarItems, children }: OSLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-[#04060B] overflow-hidden selection:bg-[#A855F7]/30 selection:text-white font-sans text-gray-200">
      
      {/* Universal OS Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base dark noise */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
        
        {/* Subtle glowing orbs matching OS theme */}
        <motion.div
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-[0.08]"
          style={{ background: themeColor }}
        />
        <motion.div
          animate={{ x: [0, -60, 40, 0], y: [0, 50, -50, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-[0.06]"
          style={{ background: themeColor }}
        />
      </div>

      {/* Main OS Interface */}
      <div className="flex w-full h-full relative z-10">
        
        {/* Persistent OS Sidebar */}
        <OSSidebar 
          osName={osName}
          osId={osId}
          themeColor={themeColor}
          items={sidebarItems}
        />

        {/* Dynamic Content Area */}
        <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-[rgba(10,12,16,0.3)]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 h-full w-full overflow-y-auto custom-scrollbar"
          >
            {children}
          </motion.div>
        </main>

      </div>
    </div>
  );
}
