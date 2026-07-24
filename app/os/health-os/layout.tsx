"use client";

import React from "react";
import OSLayout from "@/components/os-core/OSLayout";
import { LayoutDashboard, Activity, Utensils, Moon, Dumbbell, Compass } from "lucide-react";


export default function HealthOSLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = [
    { icon: Activity, label: "[FITNESS] Hub", href: "/os/health-os/fitness/dashboard" },
    { icon: Dumbbell, label: "Workouts", href: "/os/health-os/fitness" },
    { icon: Utensils, label: "Diet Tracker", href: "/os/health-os/diet" },
    
    { icon: LayoutDashboard, label: "[HEALTH] Hub", href: "/os/health-os" },
    { icon: Moon, label: "Sleep & Vitals", href: "/os/health-os/sleep" },
    
    { icon: Compass, label: "Discovery", href: "/os/health-os/discovery" },
  ];

  return (
    <OSLayout
      osName="Health OS"
      osId="health-os"
      themeColor="#F43F5E" // Premium Coral/Rose theme for Health OS
      sidebarItems={sidebarItems}
    >
      {children}
    </OSLayout>
  );
}
