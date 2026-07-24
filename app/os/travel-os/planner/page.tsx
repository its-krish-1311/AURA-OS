"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, MapPin, Plane, Hotel, Clock, Compass, X } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function TravelOSPlanner() {
  const { travelItinerary, addItineraryItem } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", type: "Flight", date: "", time: "", location: "", details: "" });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.title && newItem.date && newItem.time) {
      addItineraryItem({
        id: Date.now().toString(),
        title: newItem.title,
        type: newItem.type as any,
        date: newItem.date,
        time: newItem.time,
        location: newItem.location,
        details: newItem.details,
      });
      setIsModalOpen(false);
      setNewItem({ title: "", type: "Flight", date: "", time: "", location: "", details: "" });
    }
  };

  // Group by date
  const groupedItinerary = travelItinerary.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, typeof travelItinerary>);

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[#06B6D4]" /> Itinerary Planner
          </h1>
          <p className="text-gray-400 text-sm">Organize your trip day-by-day with precision.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#06B6D4] hover:bg-[#0891B2] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-0">
        {Object.keys(groupedItinerary).length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <Compass className="w-12 h-12 mb-4 opacity-20" />
            <p>Your itinerary is empty. Add a flight or hotel to get started.</p>
          </div>
        ) : (
          Object.keys(groupedItinerary).sort().map((date, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              key={date} className="mb-10"
            >
              <div className="sticky top-0 z-10 bg-[rgba(4,6,11,0.9)] backdrop-blur-md py-4 mb-4 border-b border-[rgba(255,255,255,0.05)]">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h2>
              </div>
              
              <div className="space-y-4 pl-4 border-l border-[rgba(255,255,255,0.05)] ml-1">
                {groupedItinerary[date].map((item) => (
                  <div key={item.id} className="relative pl-6">
                    <div className="absolute left-[-5px] top-4 w-2.5 h-2.5 rounded-full bg-[#06B6D4]" />
                    <div className="krish-glass p-5 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-transparent hover:bg-[rgba(255,255,255,0.03)] transition-all group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-[rgba(6,182,212,0.1)] text-[#06B6D4]`}>
                            {item.type === 'Flight' ? <Plane className="w-4 h-4" /> : item.type === 'Hotel' ? <Hotel className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
                          </div>
                          <h3 className="text-lg font-bold text-white group-hover:text-[#06B6D4] transition-colors">{item.title}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-300 bg-[rgba(255,255,255,0.05)] px-3 py-1.5 rounded-lg">
                          <Clock className="w-3.5 h-3.5 text-[#06B6D4]" /> {item.time}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-sm">
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <MapPin className="w-4 h-4" /> {item.location}
                        </div>
                        {item.details && (
                          <>
                            <span className="hidden sm:inline text-gray-600">•</span>
                            <div className="text-gray-500 font-medium">{item.details}</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Itinerary Item Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-transparent/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-transparent border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 shadow-2xl relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-bold text-white mb-6">Add to Itinerary</h2>
              <form onSubmit={handleAddItem} className="space-y-4">
                <input required autoFocus type="text" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#06B6D4] transition-all" placeholder="Event Title (e.g. Flight to JFK)" />
                <div className="grid grid-cols-2 gap-4">
                  <select value={newItem.type} onChange={e => setNewItem({...newItem, type: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#06B6D4] transition-all">
                    <option>Flight</option>
                    <option>Hotel</option>
                    <option>Activity</option>
                    <option>Restaurant</option>
                  </select>
                  <input required type="time" value={newItem.time} onChange={e => setNewItem({...newItem, time: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#06B6D4] transition-all" />
                </div>
                <input required type="date" value={newItem.date} onChange={e => setNewItem({...newItem, date: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-gray-400 text-sm rounded-xl px-4 py-3 outline-none focus:border-[#06B6D4] transition-all" />
                <input required type="text" value={newItem.location} onChange={e => setNewItem({...newItem, location: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#06B6D4] transition-all" placeholder="Location / Address" />
                <input type="text" value={newItem.details} onChange={e => setNewItem({...newItem, details: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#06B6D4] transition-all" placeholder="Confirmation # / Notes (Optional)" />
                
                <button type="submit" className="w-full bg-[#06B6D4] hover:bg-[#0891B2] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                  Save Event
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
