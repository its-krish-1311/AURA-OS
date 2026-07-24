"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Plus, X, GitCommit, Settings, Power, Bot } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function AutomationOSWorkflows() {
  const { autoWorkflows, addAutoWorkflow, toggleAutoWorkflow } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({ name: "", description: "", trigger: "", action: "" });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWorkflow.name && newWorkflow.trigger && newWorkflow.action) {
      addAutoWorkflow({
        id: Date.now().toString(),
        name: newWorkflow.name,
        description: newWorkflow.description,
        trigger: newWorkflow.trigger,
        action: newWorkflow.action,
        active: true,
        lastRun: "Never"
      });
      setIsModalOpen(false);
      setNewWorkflow({ name: "", description: "", trigger: "", action: "" });
    }
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Activity className="w-8 h-8 text-[#F97316]" /> Pipelines
          </h1>
          <p className="text-gray-400 text-sm">Design and manage your automated workflows.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(249,115,22,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> New Pipeline
          </button>
        </div>
      </div>

      {/* NLP Automation Builder */}
      <div className="mb-8 shrink-0 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] to-purple-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        <div className="relative krish-glass rounded-2xl p-2 flex items-center border border-[rgba(255,255,255,0.1)]">
          <div className="p-3 bg-[rgba(255,255,255,0.05)] rounded-xl mr-3">
            <Bot className="w-5 h-5 text-[#F97316]" />
          </div>
          <input 
            type="text" 
            placeholder="E.g. 'Every morning at 8am summarize my emails and send to study OS...'" 
            className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-gray-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = e.currentTarget.value;
                if (val) {
                  addAutoWorkflow({
                    id: Date.now().toString(),
                    name: "AI Generated Pipeline",
                    description: val,
                    trigger: "Schedule: 08:00 AM",
                    action: "AI Email Summarizer",
                    active: true,
                    lastRun: "Pending"
                  });
                  e.currentTarget.value = "";
                }
              }
            }}
          />
          <button className="px-4 py-2 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-white rounded-xl text-sm font-semibold transition-all">
            Generate
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2 space-y-4">
        <AnimatePresence>
          {autoWorkflows.map((workflow) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              key={workflow.id} 
              className={`krish-glass p-6 rounded-3xl border transition-all ${
                workflow.active 
                  ? 'border-[rgba(249,115,22,0.3)] bg-gradient-to-r from-[rgba(249,115,22,0.05)] to-[rgba(10,12,16,0.6)] shadow-[0_0_20px_rgba(249,115,22,0.1)]' 
                  : 'border-[rgba(255,255,255,0.05)] bg-transparent'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                
                {/* Meta info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{workflow.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${workflow.active ? 'bg-[rgba(249,115,22,0.2)] text-[#F97316]' : 'bg-[rgba(255,255,255,0.1)] text-gray-400'}`}>
                      {workflow.active ? 'Active' : 'Paused'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{workflow.description}</p>
                  
                  {/* Visual Node Graph */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                    <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] px-3 py-1.5 rounded-lg shrink-0">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-xs font-semibold text-gray-300">Trigger: {workflow.trigger}</span>
                    </div>
                    
                    <div className="w-8 h-[1px] bg-[rgba(255,255,255,0.2)] shrink-0" />
                    
                    <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] px-3 py-1.5 rounded-lg shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#F97316]" />
                      <span className="text-xs font-semibold text-gray-300">Action: {workflow.action}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block mr-4">
                    <div className="text-xs text-gray-500">Last run</div>
                    <div className="text-sm font-medium text-gray-300">{workflow.lastRun}</div>
                  </div>
                  
                  <button className="p-3 rounded-xl bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-gray-400 hover:text-white transition-colors border border-[rgba(255,255,255,0.05)]">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button onClick={() => toggleAutoWorkflow(workflow.id)} className={`p-3 rounded-xl border transition-all ${workflow.active ? 'bg-[rgba(249,115,22,0.1)] hover:bg-[rgba(249,115,22,0.2)] text-[#F97316] border-[rgba(249,115,22,0.3)]' : 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-gray-400 border-[rgba(255,255,255,0.05)]'}`}>
                    <Power className="w-5 h-5" />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {autoWorkflows.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <GitCommit className="w-12 h-12 mb-4 opacity-20" />
            <p>No pipelines created yet.</p>
          </div>
        )}
      </div>

      {/* Create Pipeline Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Build New Pipeline</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">General</label>
                  <input required autoFocus type="text" value={newWorkflow.name} onChange={e => setNewWorkflow({...newWorkflow, name: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F97316] transition-all mb-3" placeholder="Pipeline Name" />
                  <input required type="text" value={newWorkflow.description} onChange={e => setNewWorkflow({...newWorkflow, description: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F97316] transition-all" placeholder="Short Description" />
                </div>
                
                <div className="pt-2 border-t border-[rgba(255,255,255,0.05)]">
                  <label className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 block flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"/> Node 1: Trigger</label>
                  <input required type="text" value={newWorkflow.trigger} onChange={e => setNewWorkflow({...newWorkflow, trigger: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all" placeholder="e.g. Schedule: 08:00 AM, Event: File Saved" />
                </div>

                <div className="pt-2 border-t border-[rgba(255,255,255,0.05)]">
                  <label className="text-xs font-bold text-[#F97316] uppercase tracking-wider mb-2 block flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#F97316]"/> Node 2: Action</label>
                  <input required type="text" value={newWorkflow.action} onChange={e => setNewWorkflow({...newWorkflow, action: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F97316] transition-all" placeholder="e.g. Run Script: Sync.js, Send Email" />
                </div>

                <button type="submit" className="w-full mt-6 bg-[#F97316] hover:bg-[#EA580C] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all">
                  Deploy Pipeline
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
