"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Zap, TrendingUp, AlertTriangle, Target, Briefcase, Plus, Shield } from "lucide-react";

export default function CareerOSSkills() {
  const skills = [
    { name: "React / Next.js", level: 95, category: "Frontend", color: "bg-blue-500" },
    { name: "TypeScript", level: 90, category: "Languages", color: "bg-blue-500" },
    { name: "System Design", level: 65, category: "Architecture", color: "bg-purple-500" },
    { name: "UI/UX Design", level: 85, category: "Design", color: "bg-pink-500" },
    { name: "Node.js", level: 75, category: "Backend", color: "bg-emerald-500" },
    { name: "AWS / Cloud", level: 40, category: "DevOps", color: "bg-orange-500" },
  ];

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Star className="w-8 h-8 text-[#10B981]" /> Skills Radar
          </h1>
          <p className="text-gray-400 text-sm">Analyze your skill gaps against target job requirements.</p>
        </div>
        <div className="flex gap-3">
          <button className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Target className="w-4 h-4" /> Change Target Role
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Radar Chart Area */}
        <div className="lg:col-span-2 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col items-center justify-center relative overflow-hidden p-8">
          
          <div className="absolute top-6 left-6">
            <h2 className="text-xl font-bold text-white mb-1">Skill Distribution</h2>
            <p className="text-xs text-gray-500">Target: Senior Frontend Engineer</p>
          </div>

          {/* Fake Radar Chart Construction using CSS/SVG */}
          <div className="relative w-80 h-80 mt-12 flex items-center justify-center">
            {/* Hexagon Grids */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
              {[20, 40, 60, 80, 100].map((radius, i) => (
                <polygon 
                  key={i}
                  points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                  fill="none" 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth="0.5"
                  style={{ transformOrigin: '50% 50%', transform: `scale(${radius/100})` }}
                />
              ))}
              {/* Axes */}
              <line x1="50" y1="50" x2="50" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="93.3" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="93.3" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="50" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="6.7" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="6.7" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              
              {/* Data Polygon */}
              <motion.polygon 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ duration: 1, type: "spring" as const }}
                // Points calculated based on skills array values mapped to hexagon coordinates
                points="50,5 88.9,28 79.2,65 50,80 20.8,65 11.1,28"
                fill="rgba(16, 185, 129, 0.2)"
                stroke="#10B981"
                strokeWidth="1.5"
                style={{ transformOrigin: '50% 50%' }}
              />
            </svg>

            {/* Labels */}
            <div className="absolute -top-6 text-xs font-bold text-white">Frontend</div>
            <div className="absolute top-1/4 -right-12 text-xs font-bold text-white">Design</div>
            <div className="absolute bottom-1/4 -right-12 text-xs font-bold text-gray-500">Backend</div>
            <div className="absolute -bottom-6 text-xs font-bold text-gray-500">DevOps</div>
            <div className="absolute bottom-1/4 -left-16 text-xs font-bold text-white">Architecture</div>
            <div className="absolute top-1/4 -left-12 text-xs font-bold text-white">Languages</div>
          </div>
        </div>

        {/* Right Sidebar: Skill Gaps & Resources */}
        <div className="space-y-6">
          <div className="krish-glass p-6 rounded-3xl border border-[rgba(245,158,11,0.2)] bg-gradient-to-br from-[rgba(245,158,11,0.05)] to-transparent">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" /> Critical Gaps
            </h3>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Your target role requires strong knowledge of Cloud Deployment, but your AWS/Cloud skill is currently at 40%.
            </p>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#3B82F6]" />
                  <span className="text-sm font-semibold text-white">AWS Practitioner Course</span>
                </div>
                <Plus className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex-1">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#10B981]" /> Strengths
            </h3>
            <div className="space-y-4">
              {skills.filter(s => s.level > 80).map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-gray-200">{skill.name}</span>
                    <span className="text-xs font-bold text-[#10B981]">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div className={`h-full ${skill.color} rounded-full`} style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
