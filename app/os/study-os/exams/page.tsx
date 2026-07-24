"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Clock, AlertCircle, FileText, ChevronRight, CheckCircle2 } from "lucide-react";

export default function StudyOSExams() {
  const exams = [
    {
      course: "MAT301",
      title: "Midterm: Advanced Integration",
      date: "Oct 24, 2026",
      time: "10:00 AM - 12:00 PM",
      type: "Midterm",
      status: "upcoming",
      daysLeft: 4,
      weight: "25%",
      color: "border-blue-500",
      bg: "bg-blue-500"
    },
    {
      course: "CS201",
      title: "Practical: Trees & Graphs",
      date: "Oct 28, 2026",
      time: "02:00 PM - 04:00 PM",
      type: "Practical",
      status: "upcoming",
      daysLeft: 8,
      weight: "15%",
      color: "border-purple-500",
      bg: "bg-purple-500"
    },
    {
      course: "AI400",
      title: "Final Project Presentation",
      date: "Nov 15, 2026",
      time: "09:00 AM - 01:00 PM",
      type: "Final",
      status: "upcoming",
      daysLeft: 26,
      weight: "40%",
      color: "border-emerald-500",
      bg: "bg-emerald-500"
    },
    {
      course: "PHY350",
      title: "Quiz 1: Quantum States",
      date: "Sep 10, 2026",
      time: "11:00 AM",
      type: "Quiz",
      status: "completed",
      score: "92/100",
      weight: "10%",
      color: "border-gray-600",
      bg: "bg-gray-600"
    }
  ];

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-[#3B82F6]" /> Exams & Assessments
          </h1>
          <p className="text-gray-400 text-sm">Track upcoming exams, quizzes, and past performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Upcoming Exams */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#3B82F6]" /> Upcoming Schedule
          </h2>
          
          <div className="space-y-4">
            {exams.filter(e => e.status === "upcoming").map((exam, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className={`krish-glass p-6 rounded-2xl border-l-4 ${exam.color} border-y border-r border-y-[rgba(255,255,255,0.05)] border-r-[rgba(255,255,255,0.05)] bg-transparent hover:bg-[rgba(255,255,255,0.03)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer`}
              >
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] shrink-0">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{exam.date.split(" ")[0]}</span>
                    <span className="text-2xl font-bold text-white">{exam.date.split(" ")[1].replace(",", "")}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[rgba(255,255,255,0.05)] text-gray-300 tracking-wider">
                        {exam.course}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white tracking-wider ${exam.bg} bg-opacity-20 border border-current`}>
                        {exam.type}
                      </span>
                      {exam.daysLeft !== undefined && exam.daysLeft <= 7 && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-red-400 bg-[rgba(239,68,68,0.1)] px-2 py-0.5 rounded border border-[rgba(239,68,68,0.2)]">
                          <AlertCircle className="w-3 h-3" /> In {exam.daysLeft} days
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#3B82F6] transition-colors">{exam.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {exam.time}</span>
                      <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> Weight: {exam.weight}</span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0">
                  <button className="bg-[rgba(255,255,255,0.05)] hover:bg-[#3B82F6] text-white p-3 rounded-xl transition-colors border border-[rgba(255,255,255,0.05)]">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Past Results & Prep */}
        <div className="space-y-6">
          <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" /> Recent Results
            </h2>
            <div className="space-y-3">
              {exams.filter(e => e.status === "completed").map((exam, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)]">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold">{exam.course}</span>
                      <h4 className="text-sm font-semibold text-gray-200">{exam.title}</h4>
                    </div>
                    <span className="text-lg font-bold text-[#10B981]">{exam.score}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 text-right">{exam.date}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="krish-glass p-6 rounded-3xl border border-[rgba(59,130,246,0.2)] bg-gradient-to-b from-[rgba(59,130,246,0.05)] to-transparent">
            <h2 className="text-white font-bold mb-2">AI Prep Assistant</h2>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Your MAT301 Midterm is in 4 days. Would you like me to generate a mock exam based on your syllabus?
            </p>
            <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2.5 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all">
              Generate Mock Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
