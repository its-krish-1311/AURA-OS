"use client";

import React from "react";
import OSLayout from "@/components/os-core/OSLayout";
import { Zap, Network, Blocks, ActivitySquare } from "lucide-react";

export default function AutomationOSLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = [
    { icon: Zap, label: "System Core", href: "/os/automation-os" },
    { icon: Network, label: "Pipelines", href: "/os/automation-os/workflows" },
    { icon: Blocks, label: "Connections", href: "/os/automation-os/integrations" },
    { icon: ActivitySquare, label: "Event Logs", href: "/os/automation-os/logs" },
  ];

  return (
    <OSLayout
      osName="Automation OS"
      osId="automation-os"
      themeColor="#F97316" // Neon Orange theme for energy and processes
      sidebarItems={sidebarItems}
    >
      {children}
    </OSLayout>
  );
}
