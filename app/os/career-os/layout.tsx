"use client";

import React from "react";
import OSLayout from "@/components/os-core/OSLayout";
import { LayoutDashboard, Briefcase, FileText, Users, Mic, PieChart, Star, Bot, Calendar, Search } from "lucide-react";


export default function CareerOSLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/os/career-os" },
    { icon: Briefcase, label: "Job Tracker", href: "/os/career-os/jobs" },
    { icon: Search, label: "Job Discovery", href: "/os/career-os/search" },
    { icon: FileText, label: "Resume Builder", href: "/os/career-os/resume" },
    { icon: Mic, label: "Interviews", href: "/os/career-os/interviews" },
    { icon: Users, label: "Networking", href: "/os/career-os/networking" },
    { icon: Star, label: "Skills Radar", href: "/os/career-os/skills" },
    { icon: Calendar, label: "Planner", href: "/os/career-os/planner" },
    { icon: PieChart, label: "Analytics", href: "/os/career-os/analytics" },
    { icon: Bot, label: "Career Coach", href: "/os/career-os/ai" },
  ];

  return (
    <OSLayout
      osName="Career OS"
      osId="career-os"
      themeColor="#10B981" // Emerald theme for Career OS
      sidebarItems={sidebarItems}
    >
      {children}
    </OSLayout>
  );
}
