"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Plus, Trash2, X, Shirt } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function FashionOSOutfits() {
  const { fashionOutfits, fashionWardrobe, addFashionOutfit, deleteFashionOutfit } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newOutfit, setNewOutfit] = useState<{name: string, season: string, style: string, itemIds: string[]}>({ 
    name: "", season: "Fall", style: "Streetwear", itemIds: [] 
  });

  const handleAddOutfit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOutfit.name && newOutfit.itemIds.length > 0) {
      addFashionOutfit({
        id: Date.now().toString(),
        name: newOutfit.name,
        season: newOutfit.season as any,
        style: newOutfit.style as any,
        itemIds: newOutfit.itemIds,
      });
      setIsModalOpen(false);
      setNewOutfit({ name: "", season: "Fall", style: "Streetwear", itemIds: [] });
    }
  };

  const toggleItemSelection = (id: string) => {
    setNewOutfit(prev => ({
      ...prev,
      itemIds: prev.itemIds.includes(id) 
        ? prev.itemIds.filter(i => i !== id)
        : [...prev.itemIds, id]
    }));
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Palette className="w-8 h-8 text-[#D946EF]" /> Outfit Canvas
          </h1>
          <p className="text-gray-400 text-sm">Mix and match items to create your daily looks.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#D946EF] hover:bg-[#C026D3] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(217,70,239,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Create Outfit
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {fashionOutfits.map((outfit) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                key={outfit.id} 
                className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D946EF] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D946EF] transition-colors">{outfit.name}</h3>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                      <span className="text-[#D946EF]">{outfit.style}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">{outfit.season}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteFashionOutfit(outfit.id)}
                    className="p-2 rounded-xl bg-[rgba(255,255,255,0.05)] hover:bg-rose-500 text-gray-400 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 relative z-10 mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  {outfit.itemIds.map(itemId => {
                    const item = fashionWardrobe.find(w => w.id === itemId);
                    if (!item) return null;
                    return (
                      <div key={itemId} className="w-12 h-12 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] overflow-hidden relative group/item" title={item.name}>
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {fashionOutfits.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <Palette className="w-12 h-12 mb-4 opacity-20" />
            <p>You haven't created any outfits yet.</p>
          </div>
        )}
      </div>

      {/* Create Outfit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-transparent/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-transparent border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 shadow-2xl relative flex flex-col max-h-[85vh]"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-bold text-white mb-6">Create New Outfit</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 shrink-0">
                <input required autoFocus type="text" value={newOutfit.name} onChange={e => setNewOutfit({...newOutfit, name: e.target.value})} className="col-span-1 md:col-span-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#D946EF] transition-all" placeholder="Outfit Name (e.g. Midnight Run)" />
                <select value={newOutfit.season} onChange={e => setNewOutfit({...newOutfit, season: e.target.value})} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#D946EF] transition-all">
                  <option>Spring</option>
                  <option>Summer</option>
                  <option>Fall</option>
                  <option>Winter</option>
                </select>
                <select value={newOutfit.style} onChange={e => setNewOutfit({...newOutfit, style: e.target.value})} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#D946EF] transition-all">
                  <option>Casual</option>
                  <option>Formal</option>
                  <option>Streetwear</option>
                  <option>Athleisure</option>
                </select>
              </div>

              <div className="flex-1 overflow-y-auto mb-6">
                <h3 className="text-sm font-bold text-gray-400 mb-3">Select Items from Wardrobe</h3>
                {fashionWardrobe.length === 0 ? (
                  <div className="text-sm text-[#D946EF] bg-[rgba(217,70,239,0.1)] p-3 rounded-xl border border-[rgba(217,70,239,0.2)]">
                    Your wardrobe is empty. Please add items first.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {fashionWardrobe.map(item => {
                      const isSelected = newOutfit.itemIds.includes(item.id);
                      return (
                        <div 
                          key={item.id} 
                          onClick={() => toggleItemSelection(item.id)}
                          className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${isSelected ? 'border-[#D946EF] scale-95 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <button 
                onClick={handleAddOutfit}
                disabled={!newOutfit.name || newOutfit.itemIds.length === 0}
                className="w-full bg-[#D946EF] hover:bg-[#C026D3] disabled:opacity-50 disabled:hover:bg-[#D946EF] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all shrink-0"
              >
                Save Outfit ({newOutfit.itemIds.length} items)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
