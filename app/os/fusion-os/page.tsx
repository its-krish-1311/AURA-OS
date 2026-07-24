"use client";

import React from "react";
import FusionSidebar from "@/components/fusion/FusionSidebar";
import FusionHeader from "@/components/fusion/FusionHeader";
import FusionRightPanel from "@/components/fusion/FusionRightPanel";
import FusionWorkspace from "@/components/fusion/FusionWorkspace";

export default function FusionOSMaster() {
  return (
    <div className="h-screen w-full bg-transparent flex flex-col font-sans overflow-hidden text-white" style={{'--theme-color': '#A855F7', '--theme-color-dark': '#7C3AED', '--theme-rgb': '168,85,247', '--theme-rgb-dark': '124,58,237'} as React.CSSProperties}>
      
      {/* Universal Top Header */}
      <FusionHeader />

      {/* 3-Column Orchestration Layout */}
      <div className="flex-1 flex overflow-hidden w-full relative z-10">
        
        {/* Left Sidebar */}
        <FusionSidebar />

        {/* Center Workspace (Dynamic AI Workspace) */}
        <FusionWorkspace />

        {/* Right Sidebar (Live AI Activity) */}
        <FusionRightPanel />

      </div>

    </div>
  );
}
