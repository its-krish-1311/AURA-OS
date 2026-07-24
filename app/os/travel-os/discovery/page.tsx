"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Search, Plane, Hotel, Star, MapPin, Clock, Plus, CheckCircle2, ChevronRight, DollarSign } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";
import { useRouter } from "next/navigation";

export default function TravelOSDiscovery() {
  const { addItineraryItem } = useOSData();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Flights");
  const [savedItemId, setSavedItemId] = useState<string | null>(null);

  const mockFlights = [
    { id: "f1", airline: "Emirates", route: "JFK → NRT", date: "2026-11-15", time: "10:30 AM", duration: "14h 20m", price: 1250, type: "Non-stop" },
    { id: "f2", airline: "JAL", route: "SFO → HND", date: "2026-11-15", time: "01:15 PM", duration: "11h 10m", price: 980, type: "Non-stop" },
    { id: "f3", airline: "Singapore Airlines", route: "LAX → NRT", date: "2026-11-16", time: "11:45 PM", duration: "11h 55m", price: 1050, type: "Non-stop" },
  ];

  const mockHotels = [
    { id: "h1", name: "Aman Tokyo", location: "Otemachi, Tokyo", rating: 4.9, price: 950, type: "Luxury", date: "2026-11-16", time: "03:00 PM" },
    { id: "h2", name: "The Ritz-Carlton", location: "Roppongi, Tokyo", rating: 4.8, price: 820, type: "Luxury", date: "2026-11-16", time: "03:00 PM" },
    { id: "h3", name: "Park Hyatt Tokyo", location: "Shinjuku, Tokyo", rating: 4.7, price: 750, type: "Premium", date: "2026-11-16", time: "03:00 PM" },
  ];

  const handleSaveFlight = (flight: typeof mockFlights[0]) => {
    addItineraryItem({
      id: Date.now().toString(),
      title: `Flight: ${flight.route} (${flight.airline})`,
      type: "Flight",
      date: flight.date,
      time: flight.time,
      location: "Departure Terminal",
      details: `${flight.type} • ${flight.duration} • $${flight.price}`
    });
    setSavedItemId(flight.id);
    setTimeout(() => setSavedItemId(null), 3000);
  };

  const handleSaveHotel = (hotel: typeof mockHotels[0]) => {
    addItineraryItem({
      id: Date.now().toString(),
      title: `Check-in: ${hotel.name}`,
      type: "Hotel",
      date: hotel.date,
      time: hotel.time,
      location: hotel.location,
      details: `${hotel.type} Resort • $${hotel.price}/night`
    });
    setSavedItemId(hotel.id);
    setTimeout(() => setSavedItemId(null), 3000);
  };

  return (
    <div className="p-8 pb-20 max-w-[1600px] mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col mb-8 gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Compass className="w-8 h-8 text-[#06B6D4]" /> Travel Discovery
          </h1>
          <p className="text-gray-400 text-sm">Find flights, hotels, and activities, and add them instantly to your itinerary.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 krish-glass rounded-2xl p-2 border border-[rgba(255,255,255,0.05)] bg-transparent flex items-center">
            <Search className="w-5 h-5 text-gray-500 ml-3 mr-2 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab.toLowerCase()} (e.g. Tokyo)...`} 
              className="flex-1 bg-transparent border-none outline-none text-white text-base py-2 placeholder-gray-500"
            />
            <button className="bg-[#06B6D4] hover:bg-[#0891B2] text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all ml-3">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-6 border-b border-[rgba(255,255,255,0.05)] pb-2">
          {["Flights", "Hotels", "Activities"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === tab ? "bg-[rgba(255,255,255,0.1)] text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab === "Flights" ? <Plane className="w-4 h-4" /> : tab === "Hotels" ? <Hotel className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar pb-4 pr-2">
          {activeTab === "Flights" && mockFlights.map((flight) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              key={flight.id} 
              className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(6,182,212,0.3)] transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.05)] flex items-center justify-center">
                    <Plane className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400">{flight.airline}</h3>
                    <h2 className="text-xl font-black text-white group-hover:text-[#06B6D4] transition-colors">{flight.route}</h2>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">${flight.price}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6 text-sm font-semibold text-gray-300">
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-400" /> {flight.duration}</div>
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-emerald-400" /> {flight.type}</div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)] flex justify-end">
                <button 
                  onClick={() => handleSaveFlight(flight)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 ${
                    savedItemId === flight.id 
                      ? "bg-white text-black" 
                      : "bg-[#06B6D4] hover:bg-[#0891B2] text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  }`}
                >
                  {savedItemId === flight.id ? <><CheckCircle2 className="w-4 h-4" /> Added to Itinerary</> : <><Plus className="w-4 h-4" /> Save Booking</>}
                </button>
              </div>
            </motion.div>
          ))}

          {activeTab === "Hotels" && mockHotels.map((hotel) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              key={hotel.id} 
              className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(6,182,212,0.3)] transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-[#06B6D4] transition-colors">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                    <MapPin className="w-4 h-4" /> {hotel.location}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-[#EAB308]">
                  <Star className="w-4 h-4 fill-[#EAB308]" /> {hotel.rating}
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="text-sm font-bold text-[#06B6D4] uppercase tracking-wider">{hotel.type}</div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">${hotel.price}</div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Per Night</div>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)] flex justify-end">
                <button 
                  onClick={() => handleSaveHotel(hotel)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 ${
                    savedItemId === hotel.id 
                      ? "bg-white text-black" 
                      : "bg-[#06B6D4] hover:bg-[#0891B2] text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  }`}
                >
                  {savedItemId === hotel.id ? <><CheckCircle2 className="w-4 h-4" /> Added to Itinerary</> : <><Plus className="w-4 h-4" /> Book Room</>}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Alert */}
      <AnimatePresence>
        {savedItemId && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#06B6D4] text-white px-6 py-3 rounded-full font-bold shadow-[0_10px_30px_rgba(6,182,212,0.5)] flex items-center gap-3 cursor-pointer"
            onClick={() => router.push('/os/travel-os/planner')}
          >
            <CheckCircle2 className="w-5 h-5" />
            Booking saved to your Itinerary! Click to view.
            <ChevronRight className="w-4 h-4 opacity-50" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
