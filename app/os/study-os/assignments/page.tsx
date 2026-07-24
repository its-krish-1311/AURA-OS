"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle2, Circle, AlertCircle, Plus, Filter, MoreHorizontal, Link as LinkIcon, Paperclip } from "lucide-react";

export default function StudyOSAssignments() {
  const [activeFilter, setActiveFilter] = useState("pending");

  const assignments = [
    {
      id: 1,
      course: "CS201",
      title: "Binary Search Tree Implementation",
      dueDate: "Tomorrow, 11:59 PM",
      status: "pending",
      priority: "high",
      progress: 40,
    },
    {
      id: 2,
      course: "MAT301",
      title: "Problem Set 4: Multiple Integrals",
      dueDate: "Oct 22, 11:59 PM",
      status: "pending",
      priority: "medium",
      progress: 0,
    },
    {
      id: 3,
      course: "AI400",
      title: "Neural Network from Scratch",
      dueDate: "Oct 25, 08:00 AM",
      status: "in-progress",
      priority: "high",
      progress: 75,
    },
    {
      id: 4,
      course: "PHY350",
      title: "Lab Report: Wave Function",
      dueDate: "Oct 18, 05:00 PM",
      status: "completed",
      priority: "low",
      progress: 100,
    },
  ];

  const filteredAssignments = assignments.filter(a => {
    if (activeFilter === "all") return true;
    if (activeFilter === "pending") return a.status !== "completed";
    return a.status === activeFilter;
  });

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FileText className="w-8 h-8 text-[#3B82F6]" /> Assignments
          </h1>
          <p className="text-gray-400 text-sm">Track your homework, projects, and lab reports.</p>
        </div>
        <div className="flex gap-3">
          <button className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[rgba(255,255,255,0.05)] mb-8">
        {["Pending", "In-Progress", "Completed", "All"].map((tab) => {
          const id = tab.toLowerCase();
          const isActive = activeFilter === id;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(id)}
              className={`pb-4 text-sm font-medium transition-colors relative ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tab}
              {isActive && (
                <motion.div layoutId="assignmentTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredAssignments.map((assignment, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={assignment.id} 
            className="krish-glass p-5 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-transparent hover:bg-[rgba(255,255,255,0.02)] transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <button className="mt-1 flex-shrink-0">
                {assignment.status === "completed" ? (
                  <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                ) : assignment.status === "in-progress" ? (
                  <Clock className="w-6 h-6 text-[#3B82F6]" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-500 hover:text-gray-400 transition-colors" />
                )}
              </button>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[rgba(255,255,255,0.05)] text-gray-400 tracking-wider">
                    {assignment.course}
                  </span>
                  {assignment.priority === "high" && assignment.status !== "completed" && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-400 bg-[rgba(239,68,68,0.1)] px-2 py-0.5 rounded border border-[rgba(239,68,68,0.2)]">
                      <AlertCircle className="w-3 h-3" /> Urgent
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#3B82F6] transition-colors">{assignment.title}</h3>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Due: {assignment.dueDate}</span>
                  <span className="flex items-center gap-1"><Paperclip className="w-3.5 h-3.5" /> 2 Attachments</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto">
              {/* Progress Bar */}
              {assignment.status !== "completed" && (
                <div className="flex-1 md:w-32">
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{assignment.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: `${assignment.progress}%` }} />
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2 shrink-0 ml-auto md:ml-0">
                <button className="bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all border border-[rgba(255,255,255,0.05)] flex items-center gap-2">
                  <LinkIcon className="w-3.5 h-3.5" /> Submit
                </button>
                <button className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
