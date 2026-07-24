"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Plus, Heart, Search, CheckCircle2 } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

const FASHION_DISCOVERY_FEED = [
  { id: "fd1", name: "Cyberpunk Cargo Pants", category: "Bottom", brand: "NeoTokyo", color: "Black", price: "$120", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400" },
  { id: "fd2", name: "Minimalist Linen Shirt", category: "Top", brand: "Aura Basics", color: "Beige", price: "$45", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400" },
  { id: "fd3", name: "High-Top Runners", category: "Shoes", brand: "Velocity", color: "White/Red", price: "$160", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400" },
  { id: "fd4", name: "Vintage Denim Jacket", category: "Outerwear", brand: "Thrifted", color: "Blue", price: "$85", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=400" },
  { id: "fd5", name: "Titanium Cuff", category: "Accessory", brand: "Forge", color: "Silver", price: "$35", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400" },
  { id: "fd6", name: "Graphic Tech Tee", category: "Top", brand: "Syntax", color: "Black", price: "$30", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=400" },
];

export default function FashionOSDiscovery() {
  const { addFashionItem, fashionWardrobe } = useOSData();
  const [searchTerm, setSearchTerm] = useState("");
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const filteredFeed = FASHION_DISCOVERY_FEED.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToWardrobe = (item: typeof FASHION_DISCOVERY_FEED[0]) => {
    addFashionItem({
      id: `saved_${item.id}_${Date.now()}`,
      name: item.name,
      category: item.category as any,
      brand: item.brand,
      color: item.color,
      image: item.image,
    });
    
    setAddedIds(prev => [...prev, item.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== item.id));
    }, 2000);
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Compass className="w-8 h-8 text-[#D946EF]" /> Style Discovery
          </h1>
          <p className="text-gray-400 text-sm">Find inspiration and add trending pieces directly to your digital wardrobe.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search styles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border border-[rgba(255,255,255,0.05)] text-white text-sm rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-[#D946EF] transition-all krish-glass" 
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredFeed.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                key={item.id} 
                className="krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col group overflow-hidden break-inside-avoid"
              >
                <div className="relative w-full overflow-hidden bg-[rgba(0,0,0,0.3)] min-h-[250px]">
                  <img src={item.image} alt={item.name} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                  
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 rounded-full bg-transparent/50 hover:bg-transparent/80 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    <div className="px-3 py-1.5 rounded-lg bg-transparent/60 backdrop-blur-md text-xs font-bold text-white border border-[rgba(255,255,255,0.1)]">
                      {item.price}
                    </div>
                    
                    <button 
                      onClick={() => handleAddToWardrobe(item)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 transition-all ${
                        addedIds.includes(item.id) 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-[#D946EF] hover:bg-[#C026D3] text-white'
                      }`}
                    >
                      {addedIds.includes(item.id) ? (
                        <><CheckCircle2 className="w-4 h-4" /> Added</>
                      ) : (
                        <><Plus className="w-4 h-4" /> Add to Wardrobe</>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-[#D946EF] transition-colors">{item.name}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="text-[#D946EF] font-bold">{item.brand}</span>
                    <span>•</span>
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.color}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredFeed.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <Compass className="w-12 h-12 mb-4 opacity-20" />
            <p>No items found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
