"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Shirt, CloudRain, Sun, Thermometer, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { useOSData } from "@/context/OSDataContext";

export default function FashionOSDashboard() {
  const { fashionWardrobe, fashionOutfits } = useOSData();
  
  const topsCount = fashionWardrobe.filter(i => i.category === "Top").length;
  const bottomsCount = fashionWardrobe.filter(i => i.category === "Bottom").length;
  const shoesCount = fashionWardrobe.filter(i => i.category === "Shoes").length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-transparent p-8 pb-20 max-w-7xl mx-auto w-full relative" style={{'--theme-color': '#EC4899', '--theme-color-dark': '#DB2777', '--theme-rgb': '236,72,153', '--theme-rgb-dark': '219,39,119'} as React.CSSProperties}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Stylist</h1>
          <p className="text-gray-400 text-sm">Your intelligent wardrobe and aesthetic guide.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/os/fashion-os/wardrobe" className="bg-[#D946EF] hover:bg-[#C026D3] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(217,70,239,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Item
          </Link>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric Cards */}
        {[
          { title: "Total Wardrobe", value: fashionWardrobe.length.toString(), sub: "Items digitized", icon: Shirt, color: "text-[#D946EF]", bg: "bg-[#D946EF]" },
          { title: "Saved Outfits", value: fashionOutfits.length.toString(), sub: "Mixed and matched", icon: Sparkles, color: "text-amber-400", bg: "bg-amber-400" },
          { title: "Today's Weather", value: "68°F", sub: "Partly Cloudy", icon: Sun, color: "text-sky-400", bg: "bg-sky-400" },
          { title: "Aesthetic", value: "Streetwear", sub: "Most worn style", icon: Sparkles, color: "text-emerald-400", bg: "bg-emerald-400" },
        ].map((metric, i) => (
          <motion.div key={i} variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 ${metric.bg} blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-gray-400 text-sm font-medium mb-1">{metric.title}</h3>
              <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
              <p className="text-xs text-gray-500">{metric.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Advisor */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(217,70,239,0.2)] bg-gradient-to-br from-[rgba(217,70,239,0.05)] to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D946EF] blur-[100px] opacity-10" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D946EF] to-[#A21CAF] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(217,70,239,0.4)]">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  Aura Outfit Recommendation
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(217,70,239,0.2)] text-[#D946EF] border border-[rgba(217,70,239,0.3)]">
                    Weather Matched
                  </span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  It's going to be around 68°F and partly cloudy today. Based on your wardrobe, I recommend the "City Explorer" streetwear fit. The Oversized Vintage Tee combined with Wide Leg Cargo Pants is perfect for this climate.
                </p>
                <div className="flex gap-3">
                  <Link href="/os/fashion-os/outfits" className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all border border-[rgba(255,255,255,0.05)]">
                    View Outfit
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Wardrobe Overview */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {["Top", "Bottom", "Outerwear", "Shoes"].map((cat) => {
               const count = fashionWardrobe.filter(i => i.category === cat).length;
               return (
                <div key={cat} className="krish-glass p-4 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col items-center justify-center text-center hover:bg-[rgba(255,255,255,0.03)] transition-colors cursor-pointer">
                  <Shirt className={`w-6 h-6 mb-2 ${count > 0 ? 'text-[#D946EF]' : 'text-gray-600'}`} />
                  <div className="text-xs text-gray-400 font-medium mb-1">{cat}s</div>
                  <div className="text-lg font-bold text-white">{count}</div>
                </div>
               );
             })}
          </motion.div>
        </div>

        {/* Right Sidebar: Recent Outfits */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex-1 min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                Recent Outfits
              </h3>
              <Link href="/os/fashion-os/outfits" className="text-xs text-[#D946EF] hover:text-[#C026D3] flex items-center gap-1 transition-colors">
                View All <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {fashionOutfits.slice(0,4).map((outfit) => (
                <div key={outfit.id} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#D946EF] transition-colors">{outfit.name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{outfit.itemIds.length} items</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[#D946EF] bg-[rgba(217,70,239,0.1)]">
                      {outfit.style}
                    </span>
                  </div>
                </div>
              ))}
              
              {fashionOutfits.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">No outfits saved yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
