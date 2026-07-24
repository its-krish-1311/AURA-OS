"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, Search, Folder, FileText, Video, Image as ImageIcon, UploadCloud, MoreVertical, Star, FolderPlus, FilePlus } from "lucide-react";

export default function StudyOSKnowledgeBase() {
  const folders = [
    { name: "MAT301 Notes", count: 12, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "CS201 Projects", count: 8, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Research Papers", count: 24, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { name: "Lecture Recordings", count: 5, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  const recentFiles = [
    { name: "Integration Cheat Sheet.pdf", type: "pdf", size: "2.4 MB", date: "Today", icon: FileText, color: "text-red-400" },
    { name: "Binary Tree Implementation.js", type: "code", size: "12 KB", date: "Yesterday", icon: FileText, color: "text-blue-400" },
    { name: "Week 4 Lecture - Quantum States.mp4", type: "video", size: "450 MB", date: "Oct 12", icon: Video, color: "text-purple-400" },
    { name: "Neural Network Architecture.png", type: "image", size: "1.1 MB", date: "Oct 10", icon: ImageIcon, color: "text-emerald-400" },
    { name: "Philosophy Essay Final.docx", type: "doc", size: "154 KB", date: "Oct 8", icon: FileText, color: "text-blue-500" },
  ];

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Database className="w-8 h-8 text-[#3B82F6]" /> Knowledge Base
          </h1>
          <p className="text-gray-400 text-sm">Centralized repository for all your academic resources and notes.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group hidden sm:block">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#3B82F6] transition-colors" />
            <input 
              type="text" 
              placeholder="Search files, contents..." 
              className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#3B82F6] text-white text-sm rounded-xl pl-9 pr-4 py-2 outline-none transition-all w-[300px]"
            />
          </div>
          <button className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <FolderPlus className="w-4 h-4" /> New Folder
          </button>
          <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center gap-2 transition-all">
            <UploadCloud className="w-4 h-4" /> Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Left Sidebar: Navigation & Quick Filters */}
        <div className="lg:col-span-1 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="krish-glass p-4 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="space-y-1">
              {['All Files', 'Recent', 'Starred', 'Shared with me'].map((item, i) => (
                <button key={i} className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all ${i === 0 ? 'bg-[rgba(59,130,246,0.1)] text-[#3B82F6] font-semibold' : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.03)]'}`}>
                  <div className="flex items-center gap-3 text-sm">
                    {i === 0 ? <Database className="w-4 h-4" /> : i === 1 ? <Search className="w-4 h-4" /> : i === 2 ? <Star className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                    {item}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="krish-glass p-4 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2 mb-3">Folders</h3>
            <div className="space-y-1">
              {folders.map((folder, i) => (
                <button key={i} className="w-full flex items-center justify-between p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.03)] transition-all group">
                  <div className="flex items-center gap-3 text-sm">
                    <Folder className={`w-4 h-4 ${folder.color} fill-current bg-opacity-20`} />
                    <span className="truncate max-w-[120px]">{folder.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded-md">{folder.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col overflow-hidden">
          
          <div className="p-6 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Files</h2>
            <button className="text-sm font-semibold text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
              View All
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
              {recentFiles.slice(0, 3).map((file, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(59,130,246,0.3)] transition-all cursor-pointer group flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl bg-[rgba(255,255,255,0.05)] ${file.color}`}>
                      <file.icon className="w-6 h-6" />
                    </div>
                    <button className="text-gray-500 hover:text-white p-1 rounded-md hover:bg-[rgba(255,255,255,0.1)] transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors truncate mb-1">{file.name}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                    <span>{file.size}</span>
                    <span>{file.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <h2 className="text-lg font-bold text-white mb-4">All Files</h2>
            
            <div className="bg-[rgba(0,0,0,0.2)] rounded-2xl border border-[rgba(255,255,255,0.03)] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.05)] text-xs text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold">Last Modified</th>
                    <th className="px-6 py-4 font-semibold">Size</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentFiles.map((file, i) => (
                    <tr key={i} className="border-b border-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.03)] transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <file.icon className={`w-5 h-5 ${file.color}`} />
                          <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">{file.date}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">{file.size}</td>
                      <td className="px-6 py-4 text-gray-500">
                        <button className="hover:text-white transition-colors p-1"><MoreVertical className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
