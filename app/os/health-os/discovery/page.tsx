"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Search, Dumbbell, Utensils, Star, Clock, CheckCircle2, ChevronRight, Activity, Flame, Plus } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";
import { useRouter } from "next/navigation";

export default function HealthOSDiscovery() {
  const { addWorkout, addMeal, healthWorkouts, healthMeals } = useOSData();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Workout Plans");
  const [savedItemId, setSavedItemId] = useState<string | null>(null);

  const workoutPlans = [
    { id: "wp1", title: "Hypertrophy Push Day", duration: 60, calories: 450, type: "Strength", level: "Advanced", rating: 4.9 },
    { id: "wp2", title: "HIIT Fat Burner", duration: 30, calories: 500, type: "HIIT", level: "Intermediate", rating: 4.8 },
    { id: "wp3", title: "Morning Mobility Yoga", duration: 20, calories: 120, type: "Yoga", level: "Beginner", rating: 4.7 },
    { id: "wp4", title: "5K Runner Prep", duration: 45, calories: 600, type: "Cardio", level: "Intermediate", rating: 4.9 },
  ];

  const mealPlans = [
    { id: "mp1", name: "High-Protein Chicken Bowl", calories: 650, protein: 55, carbs: 45, fat: 15, type: "Lunch", rating: 4.9 },
    { id: "mp2", name: "Keto Salmon Avocado", calories: 580, protein: 42, carbs: 12, fat: 40, type: "Dinner", rating: 4.8 },
    { id: "mp3", name: "Berry Protein Smoothie", calories: 320, protein: 30, carbs: 40, fat: 5, type: "Breakfast", rating: 4.7 },
    { id: "mp4", name: "Greek Yogurt Parfait", calories: 250, protein: 20, carbs: 35, fat: 2, type: "Snack", rating: 4.6 },
  ];

  const handleAddWorkout = (plan: typeof workoutPlans[0]) => {
    addWorkout({
      id: Date.now().toString(),
      title: plan.title,
      duration: plan.duration,
      calories: plan.calories,
      type: plan.type as any,
      date: new Date().toISOString().split('T')[0]
    });
    setSavedItemId(plan.id);
    setTimeout(() => setSavedItemId(null), 3000);
  };

  const handleAddMeal = (plan: typeof mealPlans[0]) => {
    addMeal({
      id: Date.now().toString(),
      name: plan.name,
      calories: plan.calories,
      protein: plan.protein,
      carbs: plan.carbs,
      fat: plan.fat,
      type: plan.type as any,
      date: new Date().toISOString().split('T')[0]
    });
    setSavedItemId(plan.id);
    setTimeout(() => setSavedItemId(null), 3000);
  };

  return (
    <div className="p-8 pb-20 max-w-[1600px] mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col mb-8 gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Compass className="w-8 h-8 text-[#F43F5E]" /> Health Discovery
          </h1>
          <p className="text-gray-400 text-sm">Find premium AI-generated workout routines and meal plans.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 krish-glass rounded-2xl p-2 border border-[rgba(255,255,255,0.05)] bg-transparent flex items-center">
            <Search className="w-5 h-5 text-gray-500 ml-3 mr-2 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab.toLowerCase()}...`} 
              className="flex-1 bg-transparent border-none outline-none text-white text-base py-2 placeholder-gray-500"
            />
            <button className="bg-[#F43F5E] hover:bg-[#E11D48] text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all ml-3">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-6 border-b border-[rgba(255,255,255,0.05)] pb-2">
          {["Workout Plans", "Diet Plans"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === tab ? "bg-[rgba(255,255,255,0.1)] text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab === "Workout Plans" ? <Dumbbell className="w-4 h-4" /> : <Utensils className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar pb-4 pr-2">
          {activeTab === "Workout Plans" && workoutPlans.map((plan) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              key={plan.id} 
              className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(244,63,94,0.3)] transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F43F5E] bg-[rgba(244,63,94,0.1)] px-2 py-0.5 rounded border border-[rgba(244,63,94,0.2)]">{plan.type}</span>
                  <h3 className="text-xl font-black text-white mt-3 group-hover:text-[#F43F5E] transition-colors">{plan.title}</h3>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-[#EAB308]">
                  <Star className="w-4 h-4 fill-[#EAB308]" /> {plan.rating}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6 text-sm font-semibold text-gray-300">
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-400" /> {plan.duration}m</div>
                <div className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-orange-400" /> {plan.calories} kcal</div>
                <div className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-emerald-400" /> {plan.level}</div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)] flex justify-end">
                <button 
                  onClick={() => handleAddWorkout(plan)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 ${
                    savedItemId === plan.id 
                      ? "bg-white text-black" 
                      : "bg-[#F43F5E] hover:bg-[#E11D48] text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                  }`}
                >
                  {savedItemId === plan.id ? <><CheckCircle2 className="w-4 h-4" /> Added</> : <><Plus className="w-4 h-4" /> Add to Routine</>}
                </button>
              </div>
            </motion.div>
          ))}

          {activeTab === "Diet Plans" && mealPlans.map((plan) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              key={plan.id} 
              className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(16,185,129,0.3)] transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] bg-[rgba(16,185,129,0.1)] px-2 py-0.5 rounded border border-[rgba(16,185,129,0.2)]">{plan.type}</span>
                  <h3 className="text-xl font-black text-white mt-3 group-hover:text-[#10B981] transition-colors">{plan.name}</h3>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-[#EAB308]">
                  <Star className="w-4 h-4 fill-[#EAB308]" /> {plan.rating}
                </div>
              </div>

              <div className="mb-6">
                <div className="text-2xl font-black text-white mb-2">{plan.calories} <span className="text-sm text-gray-500 font-medium">kcal</span></div>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <div className="text-blue-400">{plan.protein}g Protein</div>
                  <div className="text-amber-400">{plan.carbs}g Carbs</div>
                  <div className="text-rose-400">{plan.fat}g Fat</div>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)] flex justify-end">
                <button 
                  onClick={() => handleAddMeal(plan)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 ${
                    savedItemId === plan.id 
                      ? "bg-white text-black" 
                      : "bg-[#10B981] hover:bg-[#059669] text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  }`}
                >
                  {savedItemId === plan.id ? <><CheckCircle2 className="w-4 h-4" /> Added</> : <><Plus className="w-4 h-4" /> Add to Diet</>}
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
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 text-white px-6 py-3 rounded-full font-bold flex items-center gap-3 cursor-pointer ${
              activeTab === "Workout Plans" ? "bg-[#F43F5E] shadow-[0_10px_30px_rgba(244,63,94,0.5)]" : "bg-[#10B981] shadow-[0_10px_30px_rgba(16,185,129,0.5)]"
            }`}
            onClick={() => router.push(activeTab === "Workout Plans" ? '/os/health-os/fitness' : '/os/health-os/diet')}
          >
            <CheckCircle2 className="w-5 h-5" />
            {activeTab === "Workout Plans" ? "Workout added to Routine!" : "Meal added to Diet Tracker!"}
            <ChevronRight className="w-4 h-4 opacity-50" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
