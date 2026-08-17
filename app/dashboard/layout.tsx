import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import { DashboardProvider } from "@/components/dashboard/DashboardContext";
import GlobalBackButton from "@/components/layout/GlobalBackButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="flex h-screen w-full bg-transparent overflow-hidden text-white selection:bg-accentPrimary/30 relative">

        <GlobalBackButton />
        {/* Sidebar - Fixed Left */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-transparent z-10">
          
          {/* Topbar - Fixed Top */}
          <Topbar />

          {/* Dynamic Page Content */}
          <main className="flex-1 overflow-auto relative">

            {/* Actual Page Content */}
            <div className="relative z-10 h-full">
              {children}
            </div>
          </main>

        </div>
      </div>
    </DashboardProvider>
  );
}
