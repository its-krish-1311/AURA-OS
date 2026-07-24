"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Plus, CheckCircle2, Circle, Trash2, X } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function TravelOSPacking() {
  const { travelPacking, addPackingItem, togglePackingItem } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Clothing");

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName) {
      addPackingItem({
        id: Date.now().toString(),
        name: newItemName,
        category: newItemCategory as any,
        packed: false,
      });
      setIsModalOpen(false);
      setNewItemName("");
    }
  };

  const categories = ["Clothing", "Electronics", "Documents", "Toiletries"];

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-[#06B6D4]" /> Packing List
          </h1>
          <p className="text-gray-400 text-sm">Ensure you never forget an essential item again.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#06B6D4] hover:bg-[#0891B2] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        {categories.map((category) => {
          const items = travelPacking.filter(i => i.category === category);
          if (items.length === 0) return null;
          
          const packedCount = items.filter(i => i.packed).length;
          const isComplete = packedCount === items.length;

          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              key={category} 
              className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent h-fit"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">{category}</h3>
                <div className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  isComplete ? 'bg-[rgba(16,185,129,0.1)] text-[#10B981] border-[rgba(16,185,129,0.2)]' : 'bg-[rgba(255,255,255,0.05)] text-gray-400 border-[rgba(255,255,255,0.05)]'
                }`}>
                  {packedCount} / {items.length}
                </div>
              </div>

              <div className="space-y-3">
                {items.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => togglePackingItem(item.id)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.03)] cursor-pointer transition-colors group"
                  >
                    {item.packed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#06B6D4] shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-500 group-hover:text-gray-300 shrink-0" />
                    )}
                    <span className={`text-sm flex-1 transition-all ${item.packed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Item Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Add Packing Item</h2>
              <form onSubmit={handleAddItem} className="space-y-4">
                <input required autoFocus type="text" value={newItemName} onChange={e => setNewItemName(e.target.value)} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#06B6D4] transition-all" placeholder="Item Name (e.g. Sunglasses)" />
                <select value={newItemCategory} onChange={e => setNewItemCategory(e.target.value)} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#06B6D4] transition-all">
                  <option>Clothing</option>
                  <option>Electronics</option>
                  <option>Documents</option>
                  <option>Toiletries</option>
                </select>
                <button type="submit" className="w-full bg-[#06B6D4] hover:bg-[#0891B2] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                  Save Item
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
