"use client";

import React from "react";
import OSLayout from "@/components/os-core/OSLayout";
import { Target, Eye, LineChart, ActivitySquare } from "lucide-react";


export default function GoalsOSLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = [
    { icon: Target, label: "Dashboard", href: "/os/goals-os" },
    { icon: Eye, label: "Vision Board", href: "/os/goals-os/vision" },
    { icon: LineChart, label: "Yearly OKRs", href: "/os/goals-os/okrs" },
    { icon: ActivitySquare, label: "Micro Habits", href: "/os/goals-os/habits" },
  ];

  return (
    <OSLayout
      osName="Goals OS"
      osId="goals-os"
      themeColor="#E11D48" // Intense Ruby Red theme for ambition
      sidebarItems={sidebarItems}
    >
      {children}
    </OSLayout>
  );
}
