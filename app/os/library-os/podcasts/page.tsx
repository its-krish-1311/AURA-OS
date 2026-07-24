"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Plus, X, PlayCircle } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function LibraryOSPodcasts() {
  const { libraryPodcasts, addLibraryPodcast } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPodcast, setNewPodcast] = useState({ title: "", host: "", coverUrl: "" });

  const handleAddPodcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPodcast.title) {
      addLibraryPodcast({
        id: Date.now().toString(),
        title: newPodcast.title,
        host: newPodcast.host,
        coverUrl: newPodcast.coverUrl || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400",
        episodesListened: 0
      });
      setIsModalOpen(false);
      setNewPodcast({ title: "", host: "", coverUrl: "" });
    }
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Headphones className="w-8 h-8 text-[#4F46E5]" /> Podcasts & Audio
          </h1>
          <p className="text-gray-400 text-sm">Your audio learning library.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(79,70,229,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Podcast
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {libraryPodcasts.map((podcast) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                key={podcast.id} 
                className="krish-glass p-5 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex items-center gap-5 group cursor-pointer hover:border-[rgba(79,70,229,0.3)] transition-colors"
              >
                <div className="w-20 h-20 rounded-2xl bg-transparent shrink-0 overflow-hidden relative shadow-lg">
                  <img src={podcast.coverUrl} alt={podcast.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center bg-transparent/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="flex flex-col flex-1 overflow-hidden">
                  <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#4F46E5] transition-colors">{podcast.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{podcast.host}</p>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded">
                      {podcast.episodesListened} eps
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {libraryPodcasts.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <Headphones className="w-12 h-12 mb-4 opacity-20" />
            <p>You haven't subscribed to any podcasts yet.</p>
          </div>
        )}
      </div>

      {/* Add Podcast Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Add Podcast</h2>
              <form onSubmit={handleAddPodcast} className="space-y-4">
                <input required autoFocus type="text" value={newPodcast.title} onChange={e => setNewPodcast({...newPodcast, title: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#4F46E5] transition-all" placeholder="Podcast Title" />
                <input required type="text" value={newPodcast.host} onChange={e => setNewPodcast({...newPodcast, host: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#4F46E5] transition-all" placeholder="Host / Creator" />
                
                <input type="url" value={newPodcast.coverUrl} onChange={e => setNewPodcast({...newPodcast, coverUrl: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#4F46E5] transition-all" placeholder="Cover Image URL (Optional)" />

                <button type="submit" className="w-full mt-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all">
                  Subscribe
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
