"use client";

import React from "react";
import OSLayout from "@/components/os-core/OSLayout";
import { LayoutDashboard, KanbanSquare, Code2, TerminalSquare } from "lucide-react";


export default function DeveloperOSLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/os/developer-os" },
    { icon: KanbanSquare, label: "Project Board", href: "/os/developer-os/board" },
    { icon: Code2, label: "Snippets", href: "/os/developer-os/snippets" },
    { icon: TerminalSquare, label: "API Tester", href: "/os/developer-os/api" },
  ];

  return (
    <OSLayout
      osName="Developer OS"
      osId="developer-os"
      themeColor="#8B5CF6" // Premium Violet/Purple theme for Developer OS
      sidebarItems={sidebarItems}
    >
      {children}
    </OSLayout>
  );
}
