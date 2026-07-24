"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Plus, Search, Filter, Play, Clock, Flame, Calendar, X } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function HealthOSFitness() {
  const { healthWorkouts, addWorkout } = useOSData();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({ title: "", type: "Strength", duration: "", calories: "" });

  const filteredWorkouts = healthWorkouts.filter(w => 
    w.title.toLowerCase().includes(search.toLowerCase()) || 
    w.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWorkout.title && newWorkout.duration) {
      addWorkout({
        id: Date.now().toString(),
        title: newWorkout.title,
        type: newWorkout.type as any,
        duration: parseInt(newWorkout.duration),
        calories: parseInt(newWorkout.calories) || Math.floor(parseInt(newWorkout.duration) * 8.5),
        date: new Date().toISOString().split('T')[0]
      });
      setIsModalOpen(false);
      setNewWorkout({ title: "", type: "Strength", duration: "", calories: "" });
    }
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Dumbbell className="w-8 h-8 text-[#F43F5E]" /> Fitness Tracker
          </h1>
          <p className="text-gray-400 text-sm">Your complete training history and performance analytics.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group hidden sm:block">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#F43F5E] transition-colors" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sessions..." 
              className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#F43F5E] text-white text-sm rounded-xl pl-9 pr-4 py-2 outline-none transition-all w-[250px]"
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#F43F5E] hover:bg-[#E11D48] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(244,63,94,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Log Session
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredWorkouts.map((workout, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={workout.id} 
                className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(244,63,94,0.3)] transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F43F5E] bg-[rgba(244,63,94,0.1)] px-2.5 py-1 rounded-lg border border-[rgba(244,63,94,0.2)]">
                      {workout.type}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-3 group-hover:text-[#F43F5E] transition-colors">{workout.title}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[rgba(255,255,255,0.05)] flex items-center justify-center border border-[rgba(255,255,255,0.05)] shadow-inner">
                    <Play className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] p-3 rounded-xl">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Duration</div>
                      <div className="text-sm font-bold text-white">{workout.duration}m</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] p-3 rounded-xl">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <div>
                      <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Burned</div>
                      <div className="text-sm font-bold text-white">{workout.calories} kcal</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.05)] flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <Calendar className="w-3 h-3" /> Logged on {workout.date}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredWorkouts.length === 0 && (
            <div className="col-span-full h-64 flex flex-col items-center justify-center text-gray-500">
              <Dumbbell className="w-12 h-12 mb-4 opacity-20" />
              <p>No workouts found. Time to hit the gym!</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Workout Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Log Session</h2>
              <form onSubmit={handleAddWorkout} className="space-y-4">
                <input required autoFocus type="text" value={newWorkout.title} onChange={e => setNewWorkout({...newWorkout, title: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F43F5E] transition-all" placeholder="Workout Title" />
                <div className="grid grid-cols-2 gap-4">
                  <select value={newWorkout.type} onChange={e => setNewWorkout({...newWorkout, type: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F43F5E] transition-all">
                    <option>Strength</option>
                    <option>Cardio</option>
                    <option>HIIT</option>
                    <option>Yoga</option>
                  </select>
                  <input required type="number" value={newWorkout.duration} onChange={e => setNewWorkout({...newWorkout, duration: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F43F5E] transition-all" placeholder="Minutes" />
                </div>
                <input type="number" value={newWorkout.calories} onChange={e => setNewWorkout({...newWorkout, calories: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F43F5E] transition-all" placeholder="Calories Burned" />
                <button type="submit" className="w-full bg-[#F43F5E] hover:bg-[#E11D48] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all">
                  Save Session
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
