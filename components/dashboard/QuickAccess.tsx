"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BookOpen, Briefcase, Heart, Wallet, Plane, Shirt, Target, Dumbbell, Music, Library, Bot, Building2, Code2, Gamepad2, Palette, Shield, Lightbulb, Globe, Dna, Users, Fingerprint, Layers, BrainCircuit, Wifi, ArrowUpRight } from "lucide-react";

const modules = [
  { icon: Layers, label: "Fusion OS", sub: "Ecosystem Connector", href: "/os/fusion-os", metric: "3 Systems", metricDesc: "Active", color: "#A855F7" },
  { icon: BrainCircuit, label: "Neural OS", sub: "Intent Engine", href: "/os/neural-os", metric: "99.9%", metricDesc: "Accuracy", color: "#10B981" },
  { icon: Wifi, label: "Home OS", sub: "IoT Ecosystem", href: "/os/home-os", metric: "12 Devices", metricDesc: "Connected", color: "#F59E0B" },
  { icon: BookOpen, label: "Study OS", sub: "Smart Learning", href: "/os/study-os", metric: "4 Courses", metricDesc: "In Progress", color: "#3B82F6" },
  { icon: Briefcase, label: "Career OS", sub: "Grow Future", href: "/os/career-os", metric: "2 Offers", metricDesc: "Pending", color: "#EC4899" },
  { icon: Heart, label: "Health OS", sub: "Be Healthy", href: "/os/health-os", metric: "8.2h", metricDesc: "Avg Sleep", color: "#EF4444" },
  { icon: Wallet, label: "Finance OS", sub: "Manage Money", href: "/os/finance-os", metric: "+$1.2k", metricDesc: "This Week", color: "#10B981" },
  { icon: Plane, label: "Travel OS", sub: "Explore World", href: "/os/travel-os", metric: "1 Trip", metricDesc: "Upcoming", color: "#06B6D4" },
  { icon: Shirt, label: "Fashion OS", sub: "Look Unique", href: "/os/fashion-os", metric: "3 Outfits", metricDesc: "Saved", color: "#D946EF" },
  { icon: Target, label: "Goals OS", sub: "Achieve More", href: "/os/goals-os", metric: "8/10", metricDesc: "Completed", color: "#F59E0B" },
  { icon: Gamepad2, label: "Gaming OS", sub: "Play & Stream", href: "/os/gaming-os", metric: "2h", metricDesc: "Played Today", color: "#8B5CF6" },
  { icon: Palette, label: "Creator OS", sub: "Design & Art", href: "/os/creator-os", metric: "5 Assets", metricDesc: "Exported", color: "#F43F5E" }
];

export default function QuickAccess() {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-white text-sm font-bold tracking-[0.2em] mb-6 drop-shadow-[0_0_8px_rgba(126,34,206,0.3)]">QUICK ACCESS MODULES</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {modules.map((mod, index) => {
          const Icon = mod.icon;
          return (
              <motion.div
                key={index}
                onClick={() => router.push(mod.href)}
                whileHover={{ scale: 1.03, y: -6 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                className="krish-glass rounded-3xl p-5 flex flex-col justify-between cursor-pointer group relative overflow-hidden z-10 transition-all duration-300 w-full h-[180px] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)] bg-[rgba(10,10,10,0.4)] hover:bg-[rgba(255,255,255,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              >
                {/* Top Row: Icon & Arrow */}
                <div className="flex justify-between items-start w-full">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: `${mod.color}15`, border: `1px solid ${mod.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: mod.color }} />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                </div>
                
                {/* Middle: Titles */}
                <div className="mt-4 mb-2">
                  <h3 className="text-white font-bold text-sm tracking-wide">{mod.label}</h3>
                  <p className="text-gray-400 text-xs font-medium mt-0.5">{mod.sub}</p>
                </div>

                {/* Bottom: Metric */}
                <div className="mt-auto pt-3 border-t border-[rgba(255,255,255,0.05)]">
                  <p className="text-xs font-medium">
                    <span style={{ color: mod.color }} className="font-bold mr-1">{mod.metric}</span>
                    <span className="text-gray-500">{mod.metricDesc}</span>
                  </p>
                </div>
              </motion.div>
          );
        })}
      </div>
    </div>
  );
}


