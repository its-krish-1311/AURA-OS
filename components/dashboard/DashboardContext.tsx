"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface DashboardContextType {
  activeChatMode: string;
  setActiveChatMode: (mode: string) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeChatMode, setActiveChatMode] = useState("Siya Reasoning");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <DashboardContext.Provider value={{ 
      activeChatMode, setActiveChatMode,
      isMobileSidebarOpen, setIsMobileSidebarOpen 
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within a DashboardProvider");
  }
  return context;
}
