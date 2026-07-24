"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Book, Film, Headphones, ArrowUpRight, Award, Clock } from "lucide-react";
import Link from "next/link";
import { useOSData } from "@/context/OSDataContext";

export default function LibraryOSDashboard() {
  const { libraryBooks, libraryMovies, libraryPodcasts } = useOSData();

  const totalBooksRead = libraryBooks.filter(b => b.status === "Completed").length;
  const totalPagesRead = libraryBooks.reduce((acc, b) => acc + b.pagesRead, 0);
  const totalMoviesWatched = libraryMovies.filter(m => m.status === "Completed").length;
  const totalEpisodes = libraryPodcasts.reduce((acc, p) => acc + p.episodesListened, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-transparent p-8 pb-20 max-w-7xl mx-auto w-full relative" style={{'--theme-color': '#14B8A6', '--theme-color-dark': '#0D9488', '--theme-rgb': '20,184,166', '--theme-rgb-dark': '13,148,136'} as React.CSSProperties}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
             <BookOpen className="w-8 h-8 text-[#4F46E5]" /> Digital Library
          </h1>
          <p className="text-gray-400 text-sm">Your personal repository of knowledge and media.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/os/library-os/books" className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(79,70,229,0.5)] flex items-center gap-2 transition-all">
            <Book className="w-4 h-4" /> Open Bookshelf
          </Link>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric Cards */}
        {[
          { title: "Books Finished", value: totalBooksRead.toString(), sub: `${totalPagesRead} pages read`, icon: Book, color: "text-[#4F46E5]", bg: "bg-[#4F46E5]" },
          { title: "Movies Watched", value: totalMoviesWatched.toString(), sub: "Total media consumed", icon: Film, color: "text-amber-500", bg: "bg-amber-500" },
          { title: "Podcast Episodes", value: totalEpisodes.toString(), sub: "Audio knowledge", icon: Headphones, color: "text-emerald-500", bg: "bg-emerald-500" },
          { title: "Knowledge Level", value: "Scholar", sub: "Top 5% reader", icon: Award, color: "text-rose-500", bg: "bg-rose-500" },
        ].map((metric, i) => (
          <motion.div key={i} variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 ${metric.bg} blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-gray-400 text-sm font-medium mb-1">{metric.title}</h3>
              <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
              <p className="text-xs text-gray-500">{metric.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Curator */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(79,70,229,0.2)] bg-gradient-to-br from-[rgba(79,70,229,0.05)] to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5] blur-[100px] opacity-10" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#3730A3] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  Aura Librarian
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(79,70,229,0.2)] text-[#4F46E5] border border-[rgba(79,70,229,0.3)]">
                    Curated Pick
                  </span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Based on your recent completion of "Atomic Habits", I highly recommend reading "Deep Work" by Cal Newport. It expands on the concepts of focus and productivity that you seem to enjoy.
                </p>
                <div className="flex gap-3">
                  <button className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all border border-[rgba(255,255,255,0.05)]">
                    Add to Want to Read
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Currently Reading / Watching */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2"><Clock className="w-5 h-5 text-[#4F46E5]" /> Continue Consuming</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {/* Show currently reading book if any */}
               {libraryBooks.filter(b => b.status === "Reading").slice(0,1).map(book => (
                 <div key={book.id} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] flex gap-4">
                   <div className="w-16 h-24 bg-gray-800 rounded-lg shrink-0 overflow-hidden">
                     <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex flex-col justify-center flex-1">
                     <h4 className="text-sm font-bold text-white line-clamp-1">{book.title}</h4>
                     <p className="text-xs text-gray-400 mb-3 line-clamp-1">{book.author}</p>
                     
                     <div className="w-full h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                       <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: `${(book.pagesRead / book.totalPages) * 100}%` }} />
                     </div>
                     <div className="text-[10px] text-gray-500 mt-1 text-right">{book.pagesRead} / {book.totalPages} p</div>
                   </div>
                 </div>
               ))}

               {/* Show currently watching movie/show if any */}
               {libraryMovies.filter(m => m.status === "Watching").slice(0,1).map(movie => (
                 <div key={movie.id} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] flex gap-4">
                   <div className="w-16 h-24 bg-gray-800 rounded-lg shrink-0 overflow-hidden">
                     <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex flex-col justify-center flex-1">
                     <span className="text-[10px] font-bold text-amber-500 bg-[rgba(245,158,11,0.1)] px-2 py-0.5 rounded w-max mb-1">{movie.type}</span>
                     <h4 className="text-sm font-bold text-white line-clamp-2">{movie.title}</h4>
                     <p className="text-xs text-gray-400 mt-1">Watching</p>
                   </div>
                 </div>
               ))}

               {libraryBooks.filter(b => b.status === "Reading").length === 0 && libraryMovies.filter(m => m.status === "Watching").length === 0 && (
                 <p className="text-sm text-gray-500 col-span-2 py-4">No active media. Pick a book or movie to start!</p>
               )}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar: Recent Podcasts */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex-1 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Headphones className="w-4 h-4 text-[#4F46E5]" /> Top Podcasts
              </h3>
              <Link href="/os/library-os/podcasts" className="text-xs text-gray-400 hover:text-white transition-colors">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
               {libraryPodcasts.map((podcast) => (
                 <div key={podcast.id} className="flex items-center gap-4 p-3 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] group hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer">
                   <img src={podcast.coverUrl} className="w-12 h-12 rounded-xl object-cover" alt="cover" />
                   <div>
                     <h4 className="text-sm font-bold text-white group-hover:text-[#4F46E5] transition-colors line-clamp-1">{podcast.title}</h4>
                     <p className="text-xs text-gray-400 mt-0.5">{podcast.host}</p>
                   </div>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
