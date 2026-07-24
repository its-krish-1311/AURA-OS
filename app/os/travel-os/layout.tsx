"use client";

import React from "react";
import OSLayout from "@/components/os-core/OSLayout";
import { LayoutDashboard, Calendar, Compass, Briefcase, MapPin } from "lucide-react";


export default function TravelOSLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/os/travel-os" },
    { icon: Calendar, label: "Planner", href: "/os/travel-os/planner" },
    { icon: Briefcase, label: "Packing List", href: "/os/travel-os/packing" },
    { icon: Compass, label: "Discovery", href: "/os/travel-os/discovery" },
  ];

  return (
    <OSLayout
      osName="Travel OS"
      osId="travel-os"
      themeColor="#06B6D4" // Premium Cyan theme for Travel OS
      sidebarItems={sidebarItems}
    >
      {children}
    </OSLayout>
  );
}
