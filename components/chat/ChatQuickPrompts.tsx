"use client";

import React from "react";
import { Mail, Code2, Book, Plane, FileText, Briefcase, HeartPulse, Languages, FileSearch, Bug, Lightbulb, Presentation } from "lucide-react";
import { motion } from "framer-motion";

interface ChatQuickPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export default function ChatQuickPrompts({ onSelectPrompt }: ChatQuickPromptsProps) {
  const prompts = [
    { icon: Mail, title: "Write Email", desc: "Draft a professional email" },
    { icon: Code2, title: "Generate Code", desc: "Write a React component" },
    { icon: Book, title: "Study Notes", desc: "Summarize a complex topic" },
    { icon: Plane, title: "Travel Planner", desc: "Plan a 3-day itinerary" },
    { icon: FileText, title: "Resume Builder", desc: "Format my CV" },
    { icon: Briefcase, title: "Business Ideas", desc: "Brainstorm startups" },
    { icon: HeartPulse, title: "Health Advice", desc: "Daily workout routine" },
    { icon: Languages, title: "Translate", desc: "English to Spanish" },
    { icon: Bug, title: "Debug Code", desc: "Find errors in my script" },
    { icon: Lightbulb, title: "Explain Topic", desc: "Like I'm 5 years old" },
    { icon: Presentation, title: "Presentation", desc: "Create slide outlines" },
    { icon: FileSearch, title: "Summarize", desc: "Extract key points" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-auto mb-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-4">
        {prompts.map((item, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onSelectPrompt(item.desc)}
            className="flex flex-col items-start p-4 rounded-2xl krish-glass border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(126,34,206,0.3)] hover:shadow-[0_0_20px_rgba(126,34,206,0.15)] transition-all group text-left"
          >
            <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-3 group-hover:bg-[rgba(126,34,206,0.2)] transition-colors">
              <item.icon className="w-4 h-4 text-gray-400 group-hover:text-[#A855F7] transition-colors" />
            </div>
            <span className="text-sm font-semibold text-gray-200 group-hover:text-white mb-1">{item.title}</span>
            <span className="text-[10px] text-gray-500 group-hover:text-gray-300 line-clamp-1">{item.desc}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
