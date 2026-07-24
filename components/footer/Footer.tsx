"use client";

import React from "react";
import { Wifi, Cloud, Bluetooth, BatteryFull, Command } from "lucide-react";
import Image from "next/image";
import { useOS } from "@/context/OSContext";

export default function Footer() {
  const { osName } = useOS();
  return (
    <footer className="w-full h-16 border-t border-[rgba(147,51,234,0.08)] bg-[rgba(4,6,11,0.85)] backdrop-blur-md flex items-center justify-between px-8 absolute bottom-0">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center">
          <Image src="/logo.png" alt="Aura OS Logo" width={32} height={32} className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
        </div>
        <div>
          <h3 className="text-white text-xs font-bold tracking-widest uppercase">{osName}</h3>
          <p className="text-gray-300 text-xs">Version 2.0.0</p>
        </div>
      </div>

      {/* Center */}
      <div className="text-gray-300 text-xs font-semibold">
        &quot;Discipline today, Success tomorrow.&quot;
      </div>

      {/* Right */}
      <div className="flex items-center gap-6 text-gray-300">
        <Wifi className="w-4 h-4 hover:text-white hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.6)] transition-all cursor-pointer" />
        <Cloud className="w-4 h-4 hover:text-white hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.6)] transition-all cursor-pointer" />
        <Bluetooth className="w-4 h-4 hover:text-white hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.6)] transition-all cursor-pointer" />
        <div className="flex items-center gap-2 text-xs font-bold">
          <BatteryFull className="w-5 h-5 text-white drop-shadow-[0_0_6px_rgba(147,51,234,0.5)]" />
          <span>100%</span>
        </div>
      </div>
    </footer>
  );
}


