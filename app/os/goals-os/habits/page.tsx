"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ActivitySquare, Plus, Flame, Check, Circle, Trash2, X } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function GoalsOSHabits() {
  const { goalsHabits, addGoalsHabit, completeGoalsHabit } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: "" });

  const today = new Date().toISOString().split('T')[0];

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabit.name) {
      addGoalsHabit({
        id: Date.now().toString(),
        name: newHabit.name,
        streak: 0,
        lastCompletedDate: "",
      });
      setIsModalOpen(false);
      setNewHabit({ name: "" });
    }
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <ActivitySquare className="w-8 h-8 text-[#E11D48]" /> Micro Habits
          </h1>
          <p className="text-gray-400 text-sm">Small daily actions that compound into massive results.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#E11D48] hover:bg-[#BE123C] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(225,29,72,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Habit
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {goalsHabits.map((habit) => {
              const isCompletedToday = habit.lastCompletedDate === today;
              
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  key={habit.id} 
                  className={`p-6 rounded-3xl border transition-all ${
                    isCompletedToday 
                      ? 'bg-[rgba(16,185,129,0.05)] border-[rgba(16,185,129,0.2)]' 
                      : 'krish-glass border-[rgba(255,255,255,0.05)] bg-transparent'
                  } flex flex-col group relative overflow-hidden`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className={`text-xl font-bold ${isCompletedToday ? 'text-emerald-400' : 'text-white'}`}>{habit.name}</h3>
                    <div className="flex items-center gap-1 bg-[rgba(0,0,0,0.3)] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.05)]">
                      <Flame className={`w-4 h-4 ${habit.streak > 0 ? 'text-amber-500' : 'text-gray-600'}`} />
                      <span className="text-sm font-bold text-white">{habit.streak}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                      {isCompletedToday ? 'Completed Today' : 'Pending for Today'}
                    </span>
                    <button 
                      onClick={() => !isCompletedToday && completeGoalsHabit(habit.id)}
                      disabled={isCompletedToday}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        isCompletedToday 
                          ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-default' 
                          : 'bg-[rgba(255,255,255,0.05)] hover:bg-[#E11D48] text-gray-400 hover:text-white cursor-pointer'
                      }`}
                    >
                      {isCompletedToday ? <Check className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        {goalsHabits.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <ActivitySquare className="w-12 h-12 mb-4 opacity-20" />
            <p>You haven't added any daily habits yet.</p>
          </div>
        )}
      </div>

      {/* Add Habit Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">New Habit</h2>
              <form onSubmit={handleAddHabit} className="space-y-4">
                <input required autoFocus type="text" value={newHabit.name} onChange={e => setNewHabit({...newHabit, name: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#E11D48] transition-all" placeholder="Habit Name (e.g. Meditate 10m)" />

                <button type="submit" className="w-full mt-4 bg-[#E11D48] hover:bg-[#BE123C] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all">
                  Start Tracking
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
