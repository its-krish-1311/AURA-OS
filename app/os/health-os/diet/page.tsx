"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Plus, Target, Flame, CheckCircle, PlusCircle, X } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function HealthOSDiet() {
  const { healthMeals, addMeal } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: "", type: "Lunch", calories: "", protein: "", carbs: "", fat: "" });

  const totalCals = healthMeals.reduce((acc, m) => acc + m.calories, 0);
  const totalProtein = healthMeals.reduce((acc, m) => acc + m.protein, 0);
  const totalCarbs = healthMeals.reduce((acc, m) => acc + m.carbs, 0);
  const totalFat = healthMeals.reduce((acc, m) => acc + m.fat, 0);

  const calGoal = 2500;
  const proGoal = 180;
  const carbGoal = 250;
  const fatGoal = 80;

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMeal.name && newMeal.calories) {
      addMeal({
        id: Date.now().toString(),
        name: newMeal.name,
        type: newMeal.type as any,
        calories: parseInt(newMeal.calories),
        protein: parseInt(newMeal.protein) || 0,
        carbs: parseInt(newMeal.carbs) || 0,
        fat: parseInt(newMeal.fat) || 0,
        date: new Date().toISOString().split('T')[0]
      });
      setIsModalOpen(false);
      setNewMeal({ name: "", type: "Lunch", calories: "", protein: "", carbs: "", fat: "" });
    }
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Utensils className="w-8 h-8 text-[#10B981]" /> Diet & Nutrition
          </h1>
          <p className="text-gray-400 text-sm">Track your macros and daily calorie intake.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Log Meal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex items-center justify-between">
          <div>
            <h3 className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Calories</h3>
            <div className="text-4xl font-black text-white">{totalCals} <span className="text-lg text-gray-500 font-medium">/ {calGoal}</span></div>
          </div>
          <Flame className={`w-12 h-12 ${totalCals > calGoal ? 'text-red-500' : 'text-[#10B981]'}`} />
        </div>
        
        <div className="lg:col-span-2 krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
          <h3 className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-4">Macronutrients</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-blue-400">Protein</span>
                <span className="text-white">{totalProtein}g / {proGoal}g</span>
              </div>
              <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((totalProtein/proGoal)*100, 100)}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-amber-400">Carbs</span>
                <span className="text-white">{totalCarbs}g / {carbGoal}g</span>
              </div>
              <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min((totalCarbs/carbGoal)*100, 100)}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-rose-400">Fat</span>
                <span className="text-white">{totalFat}g / {fatGoal}g</span>
              </div>
              <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${Math.min((totalFat/fatGoal)*100, 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col overflow-hidden min-h-0">
        <div className="p-6 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)]">
          <h2 className="text-lg font-bold text-white">Today's Meals</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
          {healthMeals.map((meal) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              key={meal.id} 
              className="flex items-center justify-between p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-transparent hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(16,185,129,0.3)] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[rgba(16,185,129,0.1)] flex items-center justify-center text-[#10B981]">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{meal.type}</span>
                  <h4 className="text-sm font-bold text-white leading-tight">{meal.name}</h4>
                </div>
              </div>
              
              <div className="flex gap-6 items-center text-sm font-bold">
                <div className="text-gray-400 hidden sm:flex gap-4">
                  <span className="text-blue-400">{meal.protein}g P</span>
                  <span className="text-amber-400">{meal.carbs}g C</span>
                  <span className="text-rose-400">{meal.fat}g F</span>
                </div>
                <div className="text-white text-lg">{meal.calories} <span className="text-xs text-gray-500">kcal</span></div>
              </div>
            </motion.div>
          ))}

          {healthMeals.length === 0 && (
            <div className="h-48 flex flex-col items-center justify-center text-gray-500">
              <Utensils className="w-12 h-12 mb-4 opacity-20" />
              <p>No meals logged today.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Meal Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Log Meal</h2>
              <form onSubmit={handleAddMeal} className="space-y-4">
                <input required autoFocus type="text" value={newMeal.name} onChange={e => setNewMeal({...newMeal, name: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#10B981] transition-all" placeholder="Food Name (e.g. Grilled Chicken)" />
                <div className="grid grid-cols-2 gap-4">
                  <select value={newMeal.type} onChange={e => setNewMeal({...newMeal, type: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#10B981] transition-all">
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Snack</option>
                  </select>
                  <input required type="number" value={newMeal.calories} onChange={e => setNewMeal({...newMeal, calories: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#10B981] transition-all" placeholder="Calories" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input type="number" value={newMeal.protein} onChange={e => setNewMeal({...newMeal, protein: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all" placeholder="Protein (g)" />
                  <input type="number" value={newMeal.carbs} onChange={e => setNewMeal({...newMeal, carbs: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-all" placeholder="Carbs (g)" />
                  <input type="number" value={newMeal.fat} onChange={e => setNewMeal({...newMeal, fat: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-rose-500 transition-all" placeholder="Fat (g)" />
                </div>
                <button type="submit" className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                  Save Meal
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
