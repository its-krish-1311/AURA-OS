"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Plus, X, Star, Tv } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function LibraryOSMovies() {
  const { libraryMovies, addLibraryMovie, updateLibraryMovieStatus } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMovie, setNewMovie] = useState({ title: "", type: "Movie", posterUrl: "" });

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMovie.title) {
      addLibraryMovie({
        id: Date.now().toString(),
        title: newMovie.title,
        type: newMovie.type as any,
        posterUrl: newMovie.posterUrl || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=400",
        status: "Plan to Watch",
        rating: 0
      });
      setIsModalOpen(false);
      setNewMovie({ title: "", type: "Movie", posterUrl: "" });
    }
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Film className="w-8 h-8 text-[#4F46E5]" /> Movies & Shows
          </h1>
          <p className="text-gray-400 text-sm">Your personal cinema watchlist.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(79,70,229,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Media
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <AnimatePresence>
            {libraryMovies.map((movie) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                key={movie.id} 
                className="krish-glass rounded-2xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col group overflow-hidden relative"
              >
                <div className="relative aspect-[2/3] w-full bg-transparent shrink-0 overflow-hidden">
                  <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
                  
                  <div className="absolute top-2 left-2 bg-transparent/60 backdrop-blur-md rounded-lg px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                    {movie.type === "TV Show" ? <Tv className="w-3 h-3 text-amber-500" /> : <Film className="w-3 h-3 text-emerald-500" />}
                    {movie.type}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-[#4F46E5] transition-colors">{movie.title}</h3>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      movie.status === "Completed" ? 'text-emerald-500' : 
                      movie.status === "Watching" ? 'text-amber-500' : 'text-gray-400'
                    }`}>
                      {movie.status}
                    </span>
                    
                    {movie.status === "Plan to Watch" && (
                      <button onClick={() => updateLibraryMovieStatus(movie.id, "Watching")} className="text-xs font-bold text-[#4F46E5] hover:text-white transition-colors bg-[rgba(79,70,229,0.1)] hover:bg-[#4F46E5] px-2 py-1 rounded">
                        Start
                      </button>
                    )}
                    {movie.status === "Watching" && (
                      <button onClick={() => updateLibraryMovieStatus(movie.id, "Completed")} className="text-xs font-bold text-emerald-500 hover:text-white transition-colors bg-[rgba(16,185,129,0.1)] hover:bg-emerald-500 px-2 py-1 rounded">
                        Done
                      </button>
                    )}
                    {movie.status === "Completed" && (
                      <div className="flex text-amber-400">
                        {[...Array(movie.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {libraryMovies.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <Film className="w-12 h-12 mb-4 opacity-20" />
            <p>Your watchlist is empty.</p>
          </div>
        )}
      </div>

      {/* Add Movie Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Add to Watchlist</h2>
              <form onSubmit={handleAddMovie} className="space-y-4">
                <input required autoFocus type="text" value={newMovie.title} onChange={e => setNewMovie({...newMovie, title: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#4F46E5] transition-all" placeholder="Title" />
                
                <select value={newMovie.type} onChange={e => setNewMovie({...newMovie, type: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#4F46E5] transition-all">
                  <option>Movie</option>
                  <option>TV Show</option>
                </select>

                <input type="url" value={newMovie.posterUrl} onChange={e => setNewMovie({...newMovie, posterUrl: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#4F46E5] transition-all" placeholder="Poster Image URL (Optional)" />

                <button type="submit" className="w-full mt-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all">
                  Save to Watchlist
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
