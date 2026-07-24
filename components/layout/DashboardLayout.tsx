"use client";

import React from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import RightPanel from "@/components/dashboard/RightPanel";

interface DashboardLayoutProps {
  children: React.ReactNode;
  themeColor?: string;
  themeColorDark?: string;
  themeRgb?: string;
  themeRgbDark?: string;
}

export default function DashboardLayout({ 
  children, 
  themeColor = "#A855F7", 
  themeColorDark = "#9333EA", 
  themeRgb = "168,85,247", 
  themeRgbDark = "147,51,234" 
}: DashboardLayoutProps) {
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 } 
    }
  };

  return (
    <div 
      style={{
        '--theme-color': themeColor,
        '--theme-color-dark': themeColorDark,
        '--theme-rgb': themeRgb,
        '--theme-rgb-dark': themeRgbDark,
      } as React.CSSProperties}
      className="min-h-screen bg-[#04060B] overflow-x-hidden relative flex flex-col pb-16 transition-colors duration-1000"
    >
      <div className="flex w-full max-w-[1600px] mx-auto relative pt-4 px-2">
        
        {/* Left Column (Sidebar) */}
        <motion.div 
          variants={itemVariants} 
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-12"
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
            <Sidebar />
          </motion.div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col px-8">
          
          <motion.div 
            variants={itemVariants} 
            initial="hidden"
            animate="visible"
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
              <Header />
            </motion.div>
          </motion.div>
          
          {/* Top Dashboard Section */}
          <div className="flex gap-10 mt-6">
            
            {/* Center Area (Specific OS Content) */}
            <div className="flex-1 relative z-10 w-full min-w-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full relative"
              >
                {/* Adding a subtle background glow based on the theme color */}
                <div 
                  className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[200px] opacity-[0.15] pointer-events-none transition-colors duration-1000"
                  style={{ backgroundColor: themeColor }}
                ></div>
                {children}
              </motion.div>
            </div>

            {/* Right Panel */}
            <motion.div 
              variants={itemVariants} 
              initial="hidden"
              animate="visible"
            >
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                <RightPanel />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
