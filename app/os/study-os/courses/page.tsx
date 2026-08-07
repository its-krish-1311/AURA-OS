"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Book, Plus, Search, FolderOpen, Filter, ArrowRight, MoreHorizontal, Video, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function StudyOSCourses() {
  const [activeTab, setActiveTab] = useState("all");

  const courses = [
    { 
      id: 1, title: "Advanced Calculus", code: "MAT301", instructor: "Dr. Alan Turing", 
      progress: 65, credits: 4, nextLecture: "Tomorrow, 10:00 AM", 
      color: "from-blue-600 to-blue-400", tags: ["Math", "Core"]
    },
    { 
      id: 2, title: "Data Structures", code: "CS201", instructor: "Prof. Grace Hopper", 
      progress: 42, credits: 3, nextLecture: "Today, 02:00 PM", 
      color: "from-purple-700 to-purple-400", tags: ["CS", "Core"]
    },
    { 
      id: 3, title: "Machine Learning", code: "AI400", instructor: "Dr. Andrew Ng", 
      progress: 88, credits: 4, nextLecture: "Thursday, 11:30 AM", 
      color: "from-emerald-600 to-emerald-400", tags: ["AI", "Elective"]
    },
    { 
      id: 4, title: "Quantum Physics", code: "PHY350", instructor: "Dr. Richard Feynman", 
      progress: 25, credits: 3, nextLecture: "Friday, 09:00 AM", 
      color: "from-amber-600 to-amber-400", tags: ["Physics", "Core"]
    },
    { 
      id: 5, title: "Philosophy of Mind", code: "PHI200", instructor: "Dr. Daniel Dennett", 
      progress: 100, credits: 3, nextLecture: "Completed", 
      color: "from-rose-600 to-rose-400", tags: ["Humanities", "Elective"]
    },
  ];

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Book className="w-8 h-8 text-[#3B82F6]" /> My Courses
          </h1>
          <p className="text-gray-400 text-sm">Manage your enrolled courses, syllabus, and resources.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#3B82F6] transition-colors" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#3B82F6] text-white text-sm rounded-xl pl-9 pr-4 py-2 outline-none transition-all w-[250px]"
            />
          </div>
          <button className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Course
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[rgba(255,255,255,0.05)] mb-8">
        {["All Courses", "In Progress", "Completed", "Archived"].map((tab) => {
          const id = tab.toLowerCase().replace(" ", "-");
          const isActive = activeTab === (id === "all-courses" ? "all" : id);
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(id === "all-courses" ? "all" : id)}
              className={`pb-4 text-sm font-medium transition-colors relative ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tab}
              {isActive && (
                <motion.div layoutId="courseTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={course.id} 
            className="krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent overflow-hidden group hover:border-[rgba(255,255,255,0.1)] transition-all flex flex-col"
          >
            {/* Top Color Bar */}
            <div className={`h-2 w-full bg-gradient-to-r ${course.color}`} />
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.05)] text-[10px] font-bold text-gray-400 tracking-wider">
                      {course.code}
                    </span>
                    {course.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] text-[10px] font-bold text-[#3B82F6] tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#3B82F6] transition-colors">{course.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{course.instructor} • {course.credits} Credits</p>
                </div>
                <button className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-auto pt-6">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400">Course Progress</span>
                  <span className="text-white font-semibold">{course.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden mb-6">
                  <div className={`h-full bg-gradient-to-r ${course.color} rounded-full`} style={{ width: `${course.progress}%` }} />
                </div>

                <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.05)] pt-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    {course.progress === 100 ? (
                      <><CheckCircle className="w-4 h-4 text-[#10B981]" /> Completed</>
                    ) : (
                      <><Video className="w-4 h-4 text-[#3B82F6]" /> Next: {course.nextLecture}</>
                    )}
                  </div>
                  <Link href={`/os/study-os/courses/${course.id}`} className="text-xs font-semibold text-white bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.05)] px-3 py-1.5 rounded-lg transition-all flex items-center gap-1">
                    Open <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
