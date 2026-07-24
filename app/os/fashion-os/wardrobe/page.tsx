"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shirt, Plus, Trash2, Tag, Image as ImageIcon, X } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function FashionOSWardrobe() {
  const { fashionWardrobe, addFashionItem, deleteFashionItem } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const [newItem, setNewItem] = useState({ name: "", category: "Top", brand: "", color: "", image: "" });

  const categories = ["All", "Top", "Bottom", "Outerwear", "Shoes", "Accessory"];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.category) {
      addFashionItem({
        id: Date.now().toString(),
        name: newItem.name,
        category: newItem.category as any,
        brand: newItem.brand || "Unbranded",
        color: newItem.color || "Unknown",
        image: newItem.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=200&h=200", // generic fallback
      });
      setIsModalOpen(false);
      setNewItem({ name: "", category: "Top", brand: "", color: "", image: "" });
    }
  };

  const filteredWardrobe = activeCategory === "All" 
    ? fashionWardrobe 
    : fashionWardrobe.filter(item => item.category === activeCategory);

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Shirt className="w-8 h-8 text-[#D946EF]" /> Digital Wardrobe
          </h1>
          <p className="text-gray-400 text-sm">Manage your personal clothing inventory.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#D946EF] hover:bg-[#C026D3] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(217,70,239,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto custom-scrollbar pb-2 shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap border ${
              activeCategory === cat 
                ? "bg-[rgba(217,70,239,0.1)] border-[rgba(217,70,239,0.3)] text-[#D946EF]" 
                : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)] text-gray-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence>
            {filteredWardrobe.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                key={item.id} 
                className="krish-glass rounded-2xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col group overflow-hidden"
              >
                <div className="aspect-square relative overflow-hidden bg-[rgba(0,0,0,0.3)]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <button 
                    onClick={() => deleteFashionItem(item.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-transparent/50 hover:bg-rose-500 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-transparent/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-[rgba(255,255,255,0.1)]">
                    {item.category}
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="text-sm font-bold text-white mb-1 truncate group-hover:text-[#D946EF] transition-colors" title={item.name}>{item.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400 truncate">
                    <Tag className="w-3 h-3 shrink-0" /> <span className="truncate">{item.brand}</span>
                  </div>
                  <div className="mt-2 text-[10px] text-gray-500 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full border border-gray-600" style={{ backgroundColor: item.color.toLowerCase().includes('black') ? '#222' : item.color.toLowerCase().includes('white') ? '#fff' : item.color.toLowerCase() }} />
                    {item.color}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredWardrobe.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <Shirt className="w-12 h-12 mb-4 opacity-20" />
            <p>No items found in this category.</p>
          </div>
        )}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Add to Wardrobe</h2>
              <form onSubmit={handleAddItem} className="space-y-4">
                <input required autoFocus type="text" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#D946EF] transition-all" placeholder="Item Name (e.g. Leather Jacket)" />
                
                <div className="grid grid-cols-2 gap-4">
                  <select required value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#D946EF] transition-all">
                    {categories.filter(c => c !== "All").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <input type="text" value={newItem.color} onChange={e => setNewItem({...newItem, color: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#D946EF] transition-all" placeholder="Color" />
                </div>

                <input type="text" value={newItem.brand} onChange={e => setNewItem({...newItem, brand: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#D946EF] transition-all" placeholder="Brand / Designer" />
                
                <div className="relative">
                  <ImageIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="url" value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl pl-9 pr-4 py-3 outline-none focus:border-[#D946EF] transition-all" placeholder="Image URL (optional)" />
                </div>

                <button type="submit" className="w-full bg-[#D946EF] hover:bg-[#C026D3] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all">
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
