"use client";

import React from "react";
import OSLayout from "@/components/os-core/OSLayout";
import { LayoutDashboard, Users, FileText, CalendarRange } from "lucide-react";


export default function BusinessOSLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/os/business-os" },
    { icon: Users, label: "Clients", href: "/os/business-os/clients" },
    { icon: FileText, label: "Invoices", href: "/os/business-os/invoices" },
    { icon: CalendarRange, label: "Meetings", href: "/os/business-os/meetings" },
  ];

  return (
    <OSLayout
      osName="Business OS"
      osId="business-os"
      themeColor="#F59E0B" // Premium Amber theme for Business OS
      sidebarItems={sidebarItems}
    >
      {children}
    </OSLayout>
  );
}
