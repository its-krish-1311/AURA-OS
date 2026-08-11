"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Calendar, Clock, CheckCircle2, Circle, Trash2, Plus, Loader2 } from "lucide-react";
import { useActionModal } from "@/components/os-core/ActionModalContext";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  createdAt: string;
}

export default function ExecutivePlanner() {
  const { openModal } = useActionModal();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Life'>('Daily');

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks || []);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      setIsCreating(true);
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTaskTitle, priority: "MEDIUM" })
      });
      if (res.ok) {
        setNewTaskTitle("");
        fetchTasks();
      } else {
        openModal({
          title: "Error Creating Task",
          description: "There was a problem saving your task to the cloud.",
          actionText: "Acknowledge"
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleTask = async (task: Task) => {
    const newStatus = task.status === "DONE" ? "TODO" : "DONE";
    // Optimistic UI update
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
    
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      console.error("Failed to update task", error);
      fetchTasks(); // Revert on failure
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    // Optimistic UI update
    setTasks(prev => prev.filter(t => t.id !== taskId));

    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE"
      });
    } catch (error) {
      console.error("Failed to delete task", error);
      fetchTasks(); // Revert on failure
    }
  };

  const pendingTasks = tasks.filter(t => t.status !== "DONE");
  const completedTasks = tasks.filter(t => t.status === "DONE");

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-base font-bold tracking-[0.2em] flex items-center gap-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
          <Brain className="w-5 h-5 text-accentLuxury drop-shadow-[0_0_10px_rgba(255,213,74,0.6)]" /> 
          EXECUTIVE PLANNER
        </h3>
        <div className="flex bg-[rgba(255,255,255,0.05)] rounded-lg p-1 border border-[rgba(255,255,255,0.05)]">
          {['Daily', 'Weekly', 'Monthly', 'Life'].map(view => (
            <button
              key={view}
              onClick={() => {
                setActiveView(view as any);
                if (view !== 'Daily') {
                  openModal({
                    title: `Unlock ${view} Planner`,
                    description: `The ${view} planning module requires an active Premium subscription for Predictive AI routing.`,
                    actionText: "Upgrade Now",
                    onAction: () => {
                      import('react-hot-toast').then(({ toast }) => toast.success("Routing to billing portal..."));
                    }
                  });
                }
              }}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                activeView === view 
                  ? 'bg-[rgba(255,255,255,0.1)] text-white shadow-md' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      <div className="krish-glass rounded-[28px] p-6 border border-[rgba(255,255,255,0.05)] relative overflow-hidden group min-h-[400px]">
        {/* Predictive AI Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accentLuxury blur-[100px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none rounded-full" />
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex flex-col h-full"
          >
            {activeView === 'Daily' && (
              <div className="flex flex-col h-full space-y-6">
                
                {/* Create Task Form */}
                <form onSubmit={handleCreateTask} className="flex items-center gap-2 relative">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Add a new priority task..."
                      className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-xl py-3 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accentLuxury transition-colors"
                      disabled={isCreating}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isCreating || !newTaskTitle.trim()}
                    className="bg-accentLuxury hover:bg-[#E5C142] text-black font-bold p-3 rounded-xl disabled:opacity-50 transition-colors flex items-center justify-center min-w-[48px]"
                  >
                    {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  </button>
                </form>

                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12 text-accentLuxury">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                  ) : tasks.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                      <Calendar className="w-8 h-8 mx-auto mb-3 opacity-20" />
                      <p className="text-sm">Your planner is clear. Add a task to begin.</p>
                    </div>
                  ) : (
                    <>
                      {/* Pending Tasks */}
                      <div className="space-y-2">
                        {pendingTasks.map(task => (
                          <TaskRow 
                            key={task.id} 
                            task={task} 
                            onToggle={() => handleToggleTask(task)} 
                            onDelete={() => handleDeleteTask(task.id)} 
                          />
                        ))}
                      </div>

                      {/* Completed Tasks */}
                      {completedTasks.length > 0 && (
                        <div className="mt-8 space-y-2">
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Completed</h4>
                          {completedTasks.map(task => (
                            <TaskRow 
                              key={task.id} 
                              task={task} 
                              onToggle={() => handleToggleTask(task)} 
                              onDelete={() => handleDeleteTask(task.id)} 
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

              </div>
            )}

            {activeView !== 'Daily' && (
              <div className="py-12 text-center text-gray-500 flex flex-col items-center justify-center h-full">
                <Brain className="w-8 h-8 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Predictive AI is generating your {activeView.toLowerCase()} trajectory...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TaskRow({ task, onToggle, onDelete }: { task: Task, onToggle: () => void, onDelete: () => void }) {
  const isDone = task.status === "DONE";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 ${isDone ? 'bg-[rgba(255,255,255,0.02)] border-transparent opacity-60' : 'bg-[rgba(0,0,0,0.2)] border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,213,74,0.3)] hover:bg-[rgba(255,213,74,0.02)]'}`}
    >
      <button onClick={onToggle} className="shrink-0 transition-transform hover:scale-110">
        {isDone ? (
          <CheckCircle2 className="w-6 h-6 text-accentLuxury" />
        ) : (
          <Circle className="w-6 h-6 text-gray-500 hover:text-accentLuxury transition-colors" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-bold truncate transition-colors ${isDone ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
          {task.title}
        </h4>
        <div className="flex items-center gap-3 mt-1">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${task.priority === 'HIGH' ? 'bg-red-500/10 text-red-400' : task.priority === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-blue-500/10 text-blue-400'}`}>
            {task.priority}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      <button 
        onClick={onDelete}
        className="shrink-0 opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all"
        title="Delete Task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
