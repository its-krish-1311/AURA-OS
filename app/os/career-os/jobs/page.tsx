"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Plus, Search, Filter, MoreHorizontal, Calendar, Building2, ExternalLink, X } from "lucide-react";
import { useOSData, CareerJob } from "@/context/OSDataContext";

export default function CareerOSJobs() {
  const { careerJobs, updateJobStatus, addCareerJob } = useOSData();
  const columns = ["Wishlist", "Applied", "Interview", "Offer", "Rejected"];
  
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJob, setNewJob] = useState<Partial<CareerJob>>({ status: "Wishlist" });

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("jobId", id);
    setIsDragging(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, column: string) => {
    e.preventDefault();
    const jobId = e.dataTransfer.getData("jobId");
    if (jobId) {
      updateJobStatus(jobId, column);
    }
    setIsDragging(null);
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (newJob.company && newJob.role) {
      addCareerJob({
        id: Date.now().toString(),
        company: newJob.company,
        role: newJob.role,
        status: newJob.status || "Wishlist",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        salary: newJob.salary || "TBD",
        location: newJob.location || "Remote",
      });
      setIsModalOpen(false);
      setNewJob({ status: "Wishlist" });
    }
  };

  return (
    <div className="p-8 pb-20 max-w-[1600px] mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-[#10B981]" /> Job Tracker
          </h1>
          <p className="text-gray-400 text-sm">Manage your applications through a Kanban pipeline.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group hidden sm:block">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#10B981] transition-colors" />
            <input 
              type="text" 
              placeholder="Search roles or companies..." 
              className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#10B981] text-white text-sm rounded-xl pl-9 pr-4 py-2 outline-none transition-all w-[250px]"
            />
          </div>
          <button className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Job
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 custom-scrollbar items-start">
        {columns.map((column) => (
          <div 
            key={column} 
            className="w-[320px] shrink-0 flex flex-col h-full max-h-full"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column)}
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  column === "Wishlist" ? "bg-gray-400" : 
                  column === "Applied" ? "bg-blue-400" : 
                  column === "Interview" ? "bg-purple-400" : 
                  column === "Offer" ? "bg-emerald-400" : "bg-red-400"
                }`} />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">{column}</h3>
                <span className="text-xs text-gray-500 bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded-full">
                  {careerJobs.filter(j => j.status === column).length}
                </span>
              </div>
              <button onClick={() => { setNewJob({ status: column }); setIsModalOpen(true); }} className="text-gray-500 hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className={`flex-1 overflow-y-auto custom-scrollbar space-y-4 krish-glass p-3 rounded-3xl border ${isDragging ? 'border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)]' : 'border-[rgba(255,255,255,0.05)] bg-transparent'} transition-colors min-h-[200px]`}>
              <AnimatePresence>
                {careerJobs.filter(job => job.status === column).map((job) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={job.id}
                    draggable
                    onDragStart={(e: any) => handleDragStart(e, job.id)}
                    onDragEnd={() => setIsDragging(null)}
                    className={`p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-grab active:cursor-grabbing group ${isDragging === job.id ? 'opacity-50' : 'opacity-100'}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center font-bold text-white text-xs border border-[rgba(255,255,255,0.1)]">
                          {job.company[0]}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">{job.company}</h4>
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className="text-xs font-semibold text-[#10B981] mb-4">{job.role}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Building2 className="w-3.5 h-3.5 text-gray-500" /> {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Briefcase className="w-3.5 h-3.5 text-gray-500" /> {job.salary}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {job.date}</span>
                      <button className="hover:text-white flex items-center gap-1 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" /> Link
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Drop target placeholder if empty */}
              {careerJobs.filter(job => job.status === column).length === 0 && (
                <div className="h-24 rounded-2xl border-2 border-dashed border-[rgba(255,255,255,0.05)] flex items-center justify-center pointer-events-none">
                  <p className="text-xs text-gray-500 font-medium">Drag jobs here</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Job Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-transparent/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-transparent border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 shadow-2xl relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#10B981]" /> Add New Job
              </h2>

              <form onSubmit={handleAddJob} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Company Name</label>
                  <input required type="text" value={newJob.company || ""} onChange={e => setNewJob({...newJob, company: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#10B981] transition-all" placeholder="e.g. Google" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Role</label>
                  <input required type="text" value={newJob.role || ""} onChange={e => setNewJob({...newJob, role: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#10B981] transition-all" placeholder="e.g. Frontend Engineer" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Location</label>
                    <input type="text" value={newJob.location || ""} onChange={e => setNewJob({...newJob, location: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#10B981] transition-all" placeholder="e.g. Remote" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Expected Salary</label>
                    <input type="text" value={newJob.salary || ""} onChange={e => setNewJob({...newJob, salary: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#10B981] transition-all" placeholder="e.g. $150k" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Initial Status</label>
                  <select value={newJob.status} onChange={e => setNewJob({...newJob, status: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#10B981] transition-all cursor-pointer">
                    {columns.map(col => <option key={col} value={col}>{col}</option>)}
                  </select>
                </div>
                
                <button type="submit" className="w-full mt-4 bg-[#10B981] hover:bg-[#059669] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                  Save Job Application
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
