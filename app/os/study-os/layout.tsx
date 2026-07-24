"use client";

import React from "react";
import OSLayout from "@/components/os-core/OSLayout";
import { LayoutDashboard, Book, GraduationCap, Clock, PieChart, FileText } from "lucide-react";


export default function StudyOSLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/os/study-os" },
    { icon: Book, label: "Courses", href: "/os/study-os/courses" },
    { icon: GraduationCap, label: "Exams", href: "/os/study-os/exams" },
    { icon: FileText, label: "Assignments", href: "/os/study-os/assignments" },
    { icon: Clock, label: "Focus Timer", href: "/os/study-os/focus" },
    { icon: PieChart, label: "Analytics", href: "/os/study-os/analytics" },
  ];

  return (
    <OSLayout
      osName="Study OS"
      osId="study-os"
      themeColor="#3B82F6" // Electric Blue theme for Study OS
      sidebarItems={sidebarItems}
    >
      {children}
    </OSLayout>
  );
}
