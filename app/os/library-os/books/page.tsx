"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Plus, X, Search, MoreVertical, CheckCircle2 } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function LibraryOSBooks() {
  const { libraryBooks, addLibraryBook, updateLibraryBookProgress } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: "", author: "", coverUrl: "", totalPages: "" });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBook.title && newBook.totalPages) {
      addLibraryBook({
        id: Date.now().toString(),
        title: newBook.title,
        author: newBook.author,
        coverUrl: newBook.coverUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
        totalPages: parseInt(newBook.totalPages),
        pagesRead: 0,
        status: "Want to Read",
        rating: 0
      });
      setIsModalOpen(false);
      setNewBook({ title: "", author: "", coverUrl: "", totalPages: "" });
    }
  };

  const updateProgress = (id: string, current: number, total: number) => {
    const next = Math.min(current + 50, total);
    updateLibraryBookProgress(id, next);
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Book className="w-8 h-8 text-[#4F46E5]" /> Reading Tracker
          </h1>
          <p className="text-gray-400 text-sm">Your digital bookshelf.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(79,70,229,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Book
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <AnimatePresence>
            {libraryBooks.map((book) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                key={book.id} 
                className="krish-glass rounded-2xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col group overflow-hidden"
              >
                <div className="relative aspect-[2/3] w-full bg-transparent shrink-0 overflow-hidden">
                  <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
                  
                  {book.status === "Completed" && (
                    <div className="absolute top-2 right-2 bg-transparent/60 backdrop-blur-md rounded-full p-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                  )}
                  
                  {book.status === "Reading" && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[rgba(255,255,255,0.2)]">
                      <div className="h-full bg-[#4F46E5]" style={{ width: `${(book.pagesRead / book.totalPages) * 100}%` }} />
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#4F46E5] transition-colors">{book.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{book.author}</p>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {book.status === "Completed" ? "Read" : `${book.pagesRead}/${book.totalPages}p`}
                    </span>
                    
                    {book.status !== "Completed" && (
                      <button onClick={() => updateProgress(book.id, book.pagesRead, book.totalPages)} className="text-xs font-bold text-[#4F46E5] hover:text-white transition-colors bg-[rgba(79,70,229,0.1)] hover:bg-[#4F46E5] px-2 py-1 rounded">
                        +50p
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {libraryBooks.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <Book className="w-12 h-12 mb-4 opacity-20" />
            <p>Your bookshelf is empty.</p>
          </div>
        )}
      </div>

      {/* Add Book Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Add to Shelf</h2>
              <form onSubmit={handleAddBook} className="space-y-4">
                <input required autoFocus type="text" value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#4F46E5] transition-all" placeholder="Book Title" />
                <input required type="text" value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#4F46E5] transition-all" placeholder="Author" />
                
                <div className="grid grid-cols-2 gap-4">
                  <input required type="number" value={newBook.totalPages} onChange={e => setNewBook({...newBook, totalPages: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#4F46E5] transition-all" placeholder="Total Pages" />
                </div>
                
                <input type="url" value={newBook.coverUrl} onChange={e => setNewBook({...newBook, coverUrl: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#4F46E5] transition-all" placeholder="Cover Image URL (Optional)" />

                <button type="submit" className="w-full mt-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all">
                  Save to Library
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
