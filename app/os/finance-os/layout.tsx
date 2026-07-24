"use client";

import React from "react";
import OSLayout from "@/components/os-core/OSLayout";
import { LayoutDashboard, Wallet, LineChart, PieChart, Activity, Building2, TrendingUp, DollarSign } from "lucide-react";


export default function FinanceOSLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Net Worth", href: "/os/finance-os" },
    { icon: Wallet, label: "Transactions", href: "/os/finance-os/transactions" },
    { icon: PieChart, label: "Budget Planner", href: "/os/finance-os/budget" },
    { icon: LineChart, label: "Portfolio", href: "/os/finance-os/portfolio" },
    { icon: Activity, label: "Market Discovery", href: "/os/finance-os/market" },
  ];

  return (
    <OSLayout
      osName="Finance OS"
      osId="finance-os"
      themeColor="#EAB308" // Premium Gold theme for Finance OS
      sidebarItems={sidebarItems}
    >
      {children}
    </OSLayout>
  );
}
