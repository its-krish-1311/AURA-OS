"use client";

import React from "react";
import OSAIWorkspace from "@/components/os-core/OSAIWorkspace";

export default function StudyOSAI() {
  return (
    <div className="w-full h-full flex">
      <OSAIWorkspace 
        osName="Study OS"
        themeColor="#3B82F6"
        systemPrompt="You are the Study OS AI Tutor. Your goal is to help the user learn, summarize notes, create quizzes, and explain complex academic topics clearly. Be encouraging and use the Socratic method when appropriate."
        initialGreeting="Hello! I'm your Aura Study Tutor. How can I help you prepare today? We can review your recent Calculus notes, or I can generate a practice quiz for your upcoming Machine Learning midterm."
      />
    </div>
  );
}
