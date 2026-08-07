"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useActionModal } from "@/components/os-core/ActionModalContext";
import { BookOpen, Briefcase, Heart, Wallet, Plane, Shirt, Zap, Target, Dumbbell, Music, Library, Bot, Building2, Sun, Code2, Gamepad2, Palette, Shield, Lightbulb, Globe, Dna, Users, Fingerprint, Layers, BrainCircuit, Wifi } from "lucide-react";

const modules = [
  { icon: Layers, label: "Fusion OS", sub: "Ecosystem Connector", href: "/os/fusion-os" },
  { icon: BrainCircuit, label: "Neural OS", sub: "Intent Engine", href: "/os/neural-os" },
  { icon: Wifi, label: "Home OS", sub: "IoT Ecosystem", href: "/os/home-os" },
  { icon: BookOpen, label: "Study OS", sub: "Smart Learning", href: "/os/study-os" },
  { icon: Briefcase, label: "Career OS", sub: "Grow Future", href: "/os/career-os" },
  { icon: Heart, label: "Health OS", sub: "Be Healthy", href: "/os/health-os" },
  { icon: Wallet, label: "Finance OS", sub: "Manage Money", href: "/os/finance-os" },
  { icon: Plane, label: "Travel OS", sub: "Explore World", href: "/os/travel-os" },
  { icon: Shirt, label: "Fashion OS", sub: "Look Unique", href: "/os/fashion-os" },
  { icon: Target, label: "Goals OS", sub: "Achieve More", href: "/os/goals-os" },
  { icon: Gamepad2, label: "Gaming OS", sub: "Play & Stream", href: "/os/gaming-os" },
  { icon: Palette, label: "Creator OS", sub: "Design & Art", href: "/os/creator-os" },
  { icon: Music, label: "Music OS", sub: "Listen & Create", href: "/os/music-os" },
  { icon: Shield, label: "Security OS", sub: "Protect Data", href: "/os/security-os" },
  { icon: Lightbulb, label: "Innovation", sub: "Ideas & Tech", href: "/os/innovation-os" },
  { icon: Globe, label: "Planet OS", sub: "World Monitor", href: "/os/planet-os" },
  { icon: Dna, label: "Bio OS", sub: "Life Sciences", href: "/os/bio-os" },
  { icon: Users, label: "Social OS", sub: "Network & Connect", href: "/os/social-os" },
  { icon: Fingerprint, label: "Identity OS", sub: "Digital Persona", href: "/os/identity-os" },
  { icon: Dumbbell, label: "Fitness", sub: "Gym Trainer", href: "/os/health-os/fitness/dashboard" },
  { icon: Library, label: "Library OS", sub: "Books & Media", href: "/os/library-os" },
  { icon: Bot, label: "Automation OS", sub: "AI Workflows", href: "/os/automation-os" },
  { icon: Building2, label: "Business OS", sub: "Manage Enterprise", href: "/os/business-os" },
  { icon: Code2, label: "Developer OS", sub: "Build & Ship", href: "/os/developer-os" },
];

export default function QuickAccess() {
  const { openModal } = useActionModal();

  return (
    <div>
      <h2 className="text-white text-sm font-bold tracking-[0.2em] mb-6 drop-shadow-[0_0_8px_rgba(126,34,206,0.3)]">QUICK ACCESS MODULES</h2>
      <div className="grid grid-cols-3 gap-4">
        {modules.map((mod, index) => {
          const Icon = mod.icon;
          return (
            <motion.div 
              key={index} 
              onClick={() => openModal({
                title: mod.label,
                description: `The ${mod.label} module (${mod.sub}) is currently being provisioned by your AI twin. It will be available shortly.`,
                actionText: "Acknowledge"
              })}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className={`krish-glass rounded-full p-5 flex items-center gap-4 cursor-pointer group relative overflow-hidden z-10 transition-all`}
            >
              {/* Animated glass glare sweep */}
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.12)] to-transparent skew-x-[-25deg] group-hover:animate-[sweep_1s_ease-in-out] z-20 pointer-events-none" />

              <div className="relative flex-shrink-0">
                {/* Glowing background blur */}
                <div className="absolute inset-0 bg-white blur-[15px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full"></div>
                
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] group-hover:border-[rgba(255,255,255,0.6)] transition-all duration-300 z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden group-hover:shadow-[0_4px_20px_rgba(255,255,255,0.2),0_0_30px_rgba(255,255,255,0.15)]`}>
                  <Icon className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] group-hover:scale-110 transition-all duration-300" />
                </div>
              </div>
              
              <div className="z-10 flex flex-col">
                <span className="text-white font-semibold text-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FFFFFF] group-hover:to-[#A855F7] transition-all duration-300">{mod.label}</span>
                <span className="text-[#CBD5E1] text-xs font-medium opacity-70 group-hover:opacity-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FFFFFF] group-hover:to-[#A855F7] transition-all duration-300">{mod.sub}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes sweep {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
    </div>
  );
}


