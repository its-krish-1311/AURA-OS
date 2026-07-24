"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Plus, Copy, CheckCircle2, Search, X } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function DeveloperOSSnippets() {
  const { devSnippets, addDevSnippet } = useOSData();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [newSnippet, setNewSnippet] = useState({ title: "", language: "TypeScript", description: "", code: "" });

  const filteredSnippets = devSnippets.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.language.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSnippet = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSnippet.title && newSnippet.code) {
      addDevSnippet({
        id: Date.now().toString(),
        title: newSnippet.title,
        language: newSnippet.language,
        description: newSnippet.description,
        code: newSnippet.code,
      });
      setIsModalOpen(false);
      setNewSnippet({ title: "", language: "TypeScript", description: "", code: "" });
    }
  };

  const copyToClipboard = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Code2 className="w-8 h-8 text-[#8B5CF6]" /> Code Snippets
          </h1>
          <p className="text-gray-400 text-sm">Your personal library of reusable functions and components.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group hidden sm:block">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#8B5CF6] transition-colors" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search snippets..." 
              className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#8B5CF6] text-white text-sm rounded-xl pl-9 pr-4 py-2 outline-none transition-all w-[250px]"
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(139,92,246,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> New Snippet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <AnimatePresence>
          {filteredSnippets.map((snippet) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              key={snippet.id} 
              className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col group h-fit"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{snippet.title}</h3>
                  <p className="text-xs text-gray-400">{snippet.description}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B5CF6] bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] px-2.5 py-1 rounded-lg">
                  {snippet.language}
                </span>
              </div>

              <div className="relative mt-4 group/code">
                <div className="absolute right-2 top-2 z-10 opacity-0 group-hover/code:opacity-100 transition-opacity">
                  <button 
                    onClick={() => copyToClipboard(snippet.id, snippet.code)}
                    className="p-2 rounded-lg bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-white backdrop-blur-md transition-colors"
                  >
                    {copiedId === snippet.id ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <pre className="bg-[#0D1117] border border-[rgba(255,255,255,0.05)] p-4 rounded-2xl overflow-x-auto text-sm text-gray-300 font-mono custom-scrollbar">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredSnippets.length === 0 && (
          <div className="col-span-full h-64 flex flex-col items-center justify-center text-gray-500">
            <Code2 className="w-12 h-12 mb-4 opacity-20" />
            <p>No snippets found. Save your first code block!</p>
          </div>
        )}
      </div>

      {/* Add Snippet Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-transparent/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-transparent border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 shadow-2xl relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-bold text-white mb-6">Save Snippet</h2>
              <form onSubmit={handleAddSnippet} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <input required autoFocus type="text" value={newSnippet.title} onChange={e => setNewSnippet({...newSnippet, title: e.target.value})} className="col-span-2 w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#8B5CF6] transition-all" placeholder="Title (e.g. Fetch Hook)" />
                  <select value={newSnippet.language} onChange={e => setNewSnippet({...newSnippet, language: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#8B5CF6] transition-all">
                    <option>TypeScript</option>
                    <option>JavaScript</option>
                    <option>Python</option>
                    <option>Rust</option>
                    <option>CSS</option>
                    <option>HTML</option>
                    <option>SQL</option>
                  </select>
                </div>
                <input type="text" value={newSnippet.description} onChange={e => setNewSnippet({...newSnippet, description: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#8B5CF6] transition-all" placeholder="Short description..." />
                
                <textarea 
                  required 
                  value={newSnippet.code} 
                  onChange={e => setNewSnippet({...newSnippet, code: e.target.value})} 
                  className="w-full h-48 bg-[#0D1117] border border-[rgba(255,255,255,0.1)] text-gray-300 font-mono text-sm rounded-xl px-4 py-3 outline-none focus:border-[#8B5CF6] transition-all custom-scrollbar resize-none" 
                  placeholder="Paste your code here..." 
                />

                <button type="submit" className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
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
