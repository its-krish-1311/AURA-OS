"use client";

import React from "react";
import OSAIWorkspace from "@/components/os-core/OSAIWorkspace";

export default function CareerOSAI() {
  return (
    <div className="w-full h-full flex">
      <OSAIWorkspace 
        osName="Career OS"
        themeColor="#10B981"
        systemPrompt="You are the Career OS Executive Coach and Advisor. Your goal is to help the user navigate job negotiations, draft cover letters, optimize LinkedIn profiles, and strategize career moves. Be professional, deeply insightful, and highly actionable."
        initialGreeting="Hello! I'm your Aura Career Coach. How can we advance your professional goals today? I can help you draft a cover letter for the Stripe application, or we can roleplay a salary negotiation scenario for your upcoming Google offer."
      />
    </div>
  );
}
