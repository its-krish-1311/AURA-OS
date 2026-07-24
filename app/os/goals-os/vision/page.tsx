"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Plus, Trash2, X, Image as ImageIcon } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function GoalsOSVision() {
  const { goalsVision, addGoalsVision, deleteGoalsVision } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newItem, setNewItem] = useState({ title: "", category: "Career", imageUrl: "" });

  const categories = ["Career", "Lifestyle", "Health", "Wealth"];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.title && newItem.imageUrl) {
      addGoalsVision({
        id: Date.now().toString(),
        title: newItem.title,
        category: newItem.category as any,
        imageUrl: newItem.imageUrl,
      });
      setIsModalOpen(false);
      setNewItem({ title: "", category: "Career", imageUrl: "" });
    }
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Eye className="w-8 h-8 text-[#E11D48]" /> Vision Board
          </h1>
          <p className="text-gray-400 text-sm">A visual representation of your future state.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#E11D48] hover:bg-[#BE123C] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(225,29,72,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Vision
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {goalsVision.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                key={item.id} 
                className="krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col group overflow-hidden break-inside-avoid relative"
              >
                <div className="w-full relative bg-[rgba(0,0,0,0.3)]">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  <button 
                    onClick={() => deleteGoalsVision(item.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-transparent/50 hover:bg-rose-600 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold text-white bg-[#E11D48] px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block shadow-lg">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-white drop-shadow-md">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {goalsVision.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <Eye className="w-12 h-12 mb-4 opacity-20" />
            <p>Your vision board is empty. Add a picture of your goals.</p>
          </div>
        )}
      </div>

      {/* Add Vision Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Manifest Goal</h2>
              <form onSubmit={handleAddItem} className="space-y-4">
                <input required autoFocus type="text" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#E11D48] transition-all" placeholder="Goal Title (e.g. Seaside Villa)" />
                
                <select required value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#E11D48] transition-all">
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <div className="relative">
                  <ImageIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input required type="url" value={newItem.imageUrl} onChange={e => setNewItem({...newItem, imageUrl: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl pl-9 pr-4 py-3 outline-none focus:border-[#E11D48] transition-all" placeholder="Image URL (Unsplash works best)" />
                </div>

                {newItem.imageUrl && (
                  <div className="w-full h-32 rounded-xl border border-[rgba(255,255,255,0.1)] overflow-hidden mt-4 bg-transparent">
                    <img src={newItem.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-80" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  </div>
                )}

                <button type="submit" className="w-full mt-4 bg-[#E11D48] hover:bg-[#BE123C] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all">
                  Add to Vision Board
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
