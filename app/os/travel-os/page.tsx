"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, CloudRain, Sun, Compass, Brain, Plane, Hotel, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useOSData } from "@/context/OSDataContext";

export default function TravelOSDashboard() {
  const { travelItinerary, travelPacking } = useOSData();
  
  const upcomingTrip = {
    destination: "Tokyo, Japan",
    date: "Nov 15 - Nov 25, 2026",
    daysLeft: 26,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1994&auto=format&fit=crop"
  };

  const packedItems = travelPacking.filter(i => i.packed).length;
  const totalItems = travelPacking.length;
  const packingProgress = totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-transparent p-8 pb-20 max-w-7xl mx-auto w-full relative" style={{'--theme-color': '#0EA5E9', '--theme-color-dark': '#0284C7', '--theme-rgb': '14,165,233', '--theme-rgb-dark': '2,132,199'} as React.CSSProperties}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Travel Dashboard</h1>
          <p className="text-gray-400 text-sm">Your AI travel agent and itinerary manager.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/os/travel-os/discovery" className="bg-[#06B6D4] hover:bg-[#0891B2] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center gap-2 transition-all">
            <Compass className="w-4 h-4" /> Discover Destinations
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Next Trip Hero Card */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-2 relative krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] overflow-hidden h-[340px] group">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
            <img src={upcomingTrip.image} alt="Destination" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
          </div>
          
          <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 rounded-full bg-[rgba(6,182,212,0.2)] border border-[rgba(6,182,212,0.3)] text-[#06B6D4] text-xs font-bold tracking-widest uppercase backdrop-blur-md">
                Next Adventure
              </span>
              <div className="text-right">
                <div className="text-4xl font-black text-white">{upcomingTrip.daysLeft}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-300">Days Left</div>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-black text-white mb-2 flex items-center gap-2">
                <MapPin className="w-8 h-8 text-[#06B6D4]" /> {upcomingTrip.destination}
              </h2>
              <p className="text-lg text-gray-300 flex items-center gap-2 font-medium">
                <Calendar className="w-5 h-5" /> {upcomingTrip.date}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" /> Weather Forecast
              </h3>
              <span className="text-xs text-gray-500">Tokyo</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-black text-white">62°F</div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-300">Partly Cloudy</div>
                <div className="text-xs text-gray-500">H: 65° L: 52°</div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold flex items-center gap-2">Packing Progress</h3>
              <Link href="/os/travel-os/packing" className="text-xs text-[#06B6D4] hover:text-white transition-colors">Open List</Link>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-300 mb-2">
              <span>{packingProgress}% Packed</span>
              <span>{packedItems} / {totalItems}</span>
            </div>
            <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
              <div className="h-full bg-[#06B6D4] rounded-full" style={{ width: `${packingProgress}%` }} />
            </div>
          </motion.div>
        </div>

        {/* AI Travel Guide Insights */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-2 krish-glass p-6 rounded-3xl border border-[rgba(6,182,212,0.2)] bg-gradient-to-br from-[rgba(6,182,212,0.05)] to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#06B6D4] blur-[100px] opacity-10" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#0891B2] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                Aura Travel Guide
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(6,182,212,0.2)] text-[#06B6D4] border border-[rgba(6,182,212,0.3)]">
                  Actionable
                </span>
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                You haven't booked your return flight from Tokyo yet! Prices are expected to rise by 15% in the next 48 hours. I recommend checking the discovery portal now. Also, remember to pack a Universal Adapter (Type A/B).
              </p>
              <div className="flex gap-3">
                <Link href="/os/travel-os/discovery" className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all border border-[rgba(255,255,255,0.05)]">
                  Find Return Flight
                </Link>
                <Link href="/os/travel-os/packing" className="bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-gray-300 px-4 py-2 rounded-lg text-xs font-semibold transition-all">
                  Add Adapter to List
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Itinerary Glance */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-bold">Upcoming Agenda</h3>
            <Link href="/os/travel-os/planner" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              Full Itinerary <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {travelItinerary.slice(0, 3).map((item) => (
              <div key={item.id} className="flex gap-3 group">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[rgba(6,182,212,0.1)] text-[#06B6D4] flex items-center justify-center shrink-0 border border-[rgba(6,182,212,0.2)]">
                    {item.type === 'Flight' ? <Plane className="w-4 h-4" /> : <Hotel className="w-4 h-4" />}
                  </div>
                  <div className="w-px h-full bg-[rgba(255,255,255,0.05)] my-1 group-last:hidden" />
                </div>
                <div className="pb-4">
                  <div className="text-sm font-bold text-white mb-1 group-hover:text-[#06B6D4] transition-colors">{item.title}</div>
                  <div className="text-xs text-gray-400 font-medium">{item.date} • {item.time}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.location}</div>
                </div>
              </div>
            ))}
            {travelItinerary.length === 0 && (
              <div className="text-sm text-gray-500 text-center py-4">No agenda items yet.</div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
