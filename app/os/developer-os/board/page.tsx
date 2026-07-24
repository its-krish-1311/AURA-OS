"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KanbanSquare, Plus, MoreHorizontal, Bug, Lightbulb, PenTool, X } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function DeveloperOSBoard() {
  const { devTasks, addDevTask, updateDevTaskStatus } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", priority: "Medium", type: "Feature" });

  const columns = ["Backlog", "In Progress", "In Review", "Done"];

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title) {
      addDevTask({
        id: Date.now().toString(),
        title: newTask.title,
        status: "Backlog",
        priority: newTask.priority as any,
        type: newTask.type as any,
      });
      setIsModalOpen(false);
      setNewTask({ title: "", priority: "Medium", type: "Feature" });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-rose-400 bg-[rgba(244,63,94,0.1)] border-[rgba(244,63,94,0.2)]";
      case "Medium": return "text-amber-400 bg-[rgba(245,158,11,0.1)] border-[rgba(245,158,11,0.2)]";
      case "Low": return "text-blue-400 bg-[rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.2)]";
      default: return "text-gray-400 bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.2)]";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Bug": return <Bug className="w-3 h-3" />;
      case "Feature": return <Lightbulb className="w-3 h-3" />;
      case "Tech Debt": return <PenTool className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="p-8 pb-20 max-w-[1600px] mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <KanbanSquare className="w-8 h-8 text-[#8B5CF6]" /> Project Board
          </h1>
          <p className="text-gray-400 text-sm">Agile sprint tracking and ticket management.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(139,92,246,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Create Ticket
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-6 overflow-x-auto custom-scrollbar pb-4 min-h-0">
        {columns.map((column) => {
          const colTasks = devTasks.filter(t => t.status === column);

          return (
            <div key={column} className="flex-1 min-w-[300px] max-w-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-white font-bold">{column}</h3>
                <span className="bg-[rgba(255,255,255,0.1)] text-gray-400 text-xs font-bold px-2 py-1 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              <div className="flex-1 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)] p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
                <AnimatePresence>
                  {colTasks.map((task) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={task.id}
                      className="krish-glass p-4 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-transparent hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(139,92,246,0.3)] transition-all cursor-grab group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            task.type === 'Bug' ? 'text-rose-400 bg-[rgba(244,63,94,0.1)] border-[rgba(244,63,94,0.2)]' :
                            task.type === 'Feature' ? 'text-emerald-400 bg-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.2)]' :
                            'text-indigo-400 bg-[rgba(99,102,241,0.1)] border-[rgba(99,102,241,0.2)]'
                          }`}>
                            {getTypeIcon(task.type)} {task.type}
                          </span>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <h4 className="text-sm font-bold text-white mb-4 leading-tight">{task.title}</h4>
                      
                      <div className="flex justify-between items-center border-t border-[rgba(255,255,255,0.05)] pt-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        
                        {/* Status Mover Dropdown (Mocking drag-and-drop for mobile/accessibility) */}
                        <select 
                          value={task.status}
                          onChange={(e) => updateDevTaskStatus(task.id, e.target.value)}
                          className="bg-transparent text-gray-500 text-xs outline-none cursor-pointer hover:text-[#8B5CF6] transition-colors"
                        >
                          {columns.map(c => <option key={c} value={c} className="bg-transparent text-white">{c}</option>)}
                        </select>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {colTasks.length === 0 && (
                  <div className="h-full flex items-center justify-center border-2 border-dashed border-[rgba(255,255,255,0.05)] rounded-2xl">
                    <p className="text-xs text-gray-600 font-medium text-center px-4">Drop tickets here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Ticket Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Create Ticket</h2>
              <form onSubmit={handleAddTask} className="space-y-4">
                <input required autoFocus type="text" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#8B5CF6] transition-all" placeholder="Ticket Title (e.g. Fix Auth Bug)" />
                <div className="grid grid-cols-2 gap-4">
                  <select value={newTask.type} onChange={e => setNewTask({...newTask, type: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#8B5CF6] transition-all">
                    <option>Feature</option>
                    <option>Bug</option>
                    <option>Tech Debt</option>
                  </select>
                  <select value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#8B5CF6] transition-all">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
                  Create Ticket
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
