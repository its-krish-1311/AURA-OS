"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Sparkles, Plus, CheckCircle2, ChevronRight, Wand2, Search, Share2, Layers } from "lucide-react";

export default function CareerOSResume() {
  const [activeSection, setActiveSection] = useState("Experience");

  const sections = ["Personal Details", "Summary", "Experience", "Education", "Skills", "Projects"];

  return (
    <div className="p-8 pb-20 max-w-[1600px] mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FileText className="w-8 h-8 text-[#10B981]" /> Resume Builder
          </h1>
          <p className="text-gray-400 text-sm">AI-powered resume generation optimized for ATS.</p>
        </div>
        <div className="flex gap-3">
          <button className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-[#10B981] border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)] flex items-center gap-2 hover:bg-[rgba(16,185,129,0.2)] transition-all">
            <Sparkles className="w-4 h-4" /> Auto-Optimize ATS
          </button>
          <button className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center gap-2 transition-all">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        
        {/* Left Panel: Editor */}
        <div className="w-[450px] shrink-0 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col overflow-hidden">
          
          <div className="p-4 border-b border-[rgba(255,255,255,0.05)] flex gap-2 overflow-x-auto custom-scrollbar">
            {sections.map(sec => (
              <button 
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeSection === sec ? 'bg-[rgba(255,255,255,0.1)] text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-white">Work Experience</h2>
              <button className="text-[#10B981] hover:text-[#34D399] text-xs font-bold flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Role
              </button>
            </div>

            {/* Experience Block 1 */}
            <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] space-y-4 relative group">
              <div className="absolute top-2 right-2 flex opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-gray-500 hover:text-[#10B981] transition-colors"><Wand2 className="w-4 h-4" /></button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Company</label>
                  <input type="text" defaultValue="Vercel" className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-[#10B981] transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Job Title</label>
                  <input type="text" defaultValue="Frontend Engineer" className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-[#10B981] transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Start Date</label>
                  <input type="text" defaultValue="Jan 2024" className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-[#10B981] transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">End Date</label>
                  <input type="text" defaultValue="Present" className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-[#10B981] transition-all" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-gray-400">Description</label>
                  <button className="text-[10px] text-[#10B981] flex items-center gap-1 font-bold"><Sparkles className="w-3 h-3" /> AI Enhance</button>
                </div>
                <textarea 
                  rows={4}
                  defaultValue="• Spearheaded the migration of the legacy codebase to Next.js 14 App Router, improving LCP by 40%.&#10;• Designed and implemented a responsive glassmorphic UI library used across 15 internal modules.&#10;• Mentored 2 junior developers and conducted weekly code reviews."
                  className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-[#10B981] transition-all resize-none custom-scrollbar" 
                />
              </div>
            </div>

            {/* Experience Block 2 */}
            <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] space-y-4 opacity-50 hover:opacity-100 transition-opacity">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-white">Google</h3>
                  <p className="text-xs text-gray-400">Software Engineering Intern</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Live Preview */}
        <div className="flex-1 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.95)] flex flex-col overflow-hidden relative shadow-[inset_0_0_50px_rgba(0,0,0,0.1)]">
          {/* Mock Document Toolbar */}
          <div className="h-12 bg-[#F3F4F6] border-b border-gray-200 flex items-center px-4 gap-4 text-gray-600 justify-center">
            <button className="p-1.5 rounded hover:bg-gray-200 transition-colors"><Layers className="w-4 h-4" /></button>
            <div className="w-px h-4 bg-gray-300" />
            <span className="text-xs font-semibold">100%</span>
            <div className="w-px h-4 bg-gray-300" />
            <span className="text-xs font-medium">Aura_Template_Professional.pdf</span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-12 bg-gray-100 flex justify-center">
            {/* The Resume Page */}
            <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-12 shrink-0 text-black">
              <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">Krishna Kushwaha</h1>
              <p className="text-sm text-gray-500 mb-8 border-b pb-4">krish@auraos.dev • github.com/krish • San Francisco, CA</p>
              
              <div className="space-y-6">
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#10B981] mb-4">Experience</h2>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-end mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">Frontend Engineer</h3>
                      <span className="text-xs font-medium text-gray-500">Jan 2024 - Present</span>
                    </div>
                    <div className="text-sm font-medium text-gray-600 mb-2">Vercel</div>
                    <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1.5 leading-relaxed">
                      <li>Spearheaded the migration of the legacy codebase to Next.js 14 App Router, improving LCP by 40%.</li>
                      <li>Designed and implemented a responsive glassmorphic UI library used across 15 internal modules.</li>
                      <li>Mentored 2 junior developers and conducted weekly code reviews.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">Software Engineering Intern</h3>
                      <span className="text-xs font-medium text-gray-500">May 2023 - Aug 2023</span>
                    </div>
                    <div className="text-sm font-medium text-gray-600 mb-2">Google</div>
                    <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1.5 leading-relaxed">
                      <li>Developed a microservice using Go and gRPC that processed 1M+ daily analytics events.</li>
                      <li>Collaborated with the design team to rebuild the internal dashboard using React and Material UI.</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#10B981] mb-4">Education</h2>
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">B.S. in Computer Science</h3>
                      <span className="text-xs font-medium text-gray-500">Expected May 2025</span>
                    </div>
                    <div className="text-sm font-medium text-gray-600">Massachusetts Institute of Technology (MIT)</div>
                    <p className="text-sm text-gray-600 mt-1">GPA: 4.0/4.0 • Relevant Coursework: Data Structures, Algorithms, Machine Learning</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
