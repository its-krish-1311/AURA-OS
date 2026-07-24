"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Plus, Target, CheckCircle2, Circle, Trash2, X } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function GoalsOSOkrs() {
  const { goalsOkrs, addGoalsOkr, toggleGoalsKr, updateGoalsOkrProgress } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOkr, setNewOkr] = useState({ objective: "", quarter: "Q4", kr1: "", kr2: "", kr3: "" });

  const handleAddOkr = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOkr.objective && newOkr.kr1) {
      const krs = [];
      if (newOkr.kr1) krs.push({ id: `kr_${Date.now()}_1`, text: newOkr.kr1, done: false });
      if (newOkr.kr2) krs.push({ id: `kr_${Date.now()}_2`, text: newOkr.kr2, done: false });
      if (newOkr.kr3) krs.push({ id: `kr_${Date.now()}_3`, text: newOkr.kr3, done: false });
      
      addGoalsOkr({
        id: Date.now().toString(),
        objective: newOkr.objective,
        quarter: newOkr.quarter as any,
        progress: 0,
        keyResults: krs
      });
      
      setIsModalOpen(false);
      setNewOkr({ objective: "", quarter: "Q4", kr1: "", kr2: "", kr3: "" });
    }
  };

  const handleToggleKr = (okrId: string, krId: string) => {
    toggleGoalsKr(okrId, krId);
    
    // Recalculate progress based on new state. We need to do this manually 
    // because toggleGoalsKr updates context async, but we want the UI progress bar 
    // to update correctly. The context handles the actual save.
    const okr = goalsOkrs.find(o => o.id === okrId);
    if (okr) {
      const totalKrs = okr.keyResults.length;
      const completedKrs = okr.keyResults.filter(kr => kr.id === krId ? !kr.done : kr.done).length;
      const newProgress = Math.round((completedKrs / totalKrs) * 100);
      updateGoalsOkrProgress(okrId, newProgress);
    }
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <LineChart className="w-8 h-8 text-[#E11D48]" /> OKR Tracker
          </h1>
          <p className="text-gray-400 text-sm">Objectives and Key Results for structured ambition.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#E11D48] hover:bg-[#BE123C] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(225,29,72,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> New OKR
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2 space-y-6">
        <AnimatePresence>
          {goalsOkrs.map((okr) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              key={okr.id} 
              className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E11D48] blur-[80px] opacity-5 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[rgba(225,29,72,0.1)] text-[#E11D48] border border-[rgba(225,29,72,0.2)] tracking-wider">
                      {okr.quarter}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{okr.objective}</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-[#E11D48]">{okr.progress}%</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Progress</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden mb-6 relative z-10">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${okr.progress}%` }} transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#E11D48] to-[#F43F5E] rounded-full" 
                />
              </div>

              {/* Key Results */}
              <div className="space-y-3 relative z-10">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Key Results</h4>
                {okr.keyResults.map(kr => (
                  <div 
                    key={kr.id} 
                    onClick={() => handleToggleKr(okr.id, kr.id)}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(225,29,72,0.3)] cursor-pointer group transition-colors"
                  >
                    {kr.done ? (
                      <CheckCircle2 className="w-6 h-6 text-[#E11D48]" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-600 group-hover:text-[#E11D48] transition-colors" />
                    )}
                    <span className={`text-sm font-medium ${kr.done ? 'text-gray-400 line-through' : 'text-gray-200'}`}>
                      {kr.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {goalsOkrs.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <Target className="w-12 h-12 mb-4 opacity-20" />
            <p>No OKRs set. Aim high and create one.</p>
          </div>
        )}
      </div>

      {/* Add OKR Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-transparent/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-transparent border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 shadow-2xl relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Target className="w-5 h-5 text-[#E11D48]" /> Define Objective</h2>
              <form onSubmit={handleAddOkr} className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <input required autoFocus type="text" value={newOkr.objective} onChange={e => setNewOkr({...newOkr, objective: e.target.value})} className="col-span-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#E11D48] transition-all" placeholder="Ambitious Objective (e.g. Launch SaaS)" />
                  <select value={newOkr.quarter} onChange={e => setNewOkr({...newOkr, quarter: e.target.value})} className="col-span-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#E11D48] transition-all">
                    <option>Q1</option>
                    <option>Q2</option>
                    <option>Q3</option>
                    <option>Q4</option>
                  </select>
                </div>

                <div className="pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Measurable Key Results</h4>
                  <input required type="text" value={newOkr.kr1} onChange={e => setNewOkr({...newOkr, kr1: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#E11D48] transition-all" placeholder="Key Result 1 (e.g. Reach $5k MRR)" />
                  <input type="text" value={newOkr.kr2} onChange={e => setNewOkr({...newOkr, kr2: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#E11D48] transition-all" placeholder="Key Result 2 (Optional)" />
                  <input type="text" value={newOkr.kr3} onChange={e => setNewOkr({...newOkr, kr3: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#E11D48] transition-all" placeholder="Key Result 3 (Optional)" />
                </div>

                <button type="submit" className="w-full mt-4 bg-[#E11D48] hover:bg-[#BE123C] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all">
                  Commit OKR
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
