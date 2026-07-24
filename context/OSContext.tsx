"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface OSContextType {
  osName: string;
  setOsName: (name: string) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [osName, setOsNameState] = useState("Aura OS");

  // On mount, load from localStorage if available
  useEffect(() => {
    const savedName = localStorage.getItem("krish_os_name");
    if (savedName) {
      setOsNameState(savedName);
    }
  }, []);

  const setOsName = (name: string) => {
    setOsNameState(name);
    localStorage.setItem("krish_os_name", name);
  };

  return (
    <OSContext.Provider value={{ osName, setOsName }}>
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (context === undefined) {
    throw new Error("useOS must be used within an OSProvider");
  }
  return context;
}
