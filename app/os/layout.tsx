"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OSLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link
        href="/"
        className="fixed top-6 left-6 z-[9999] krish-glass w-12 h-12 rounded-2xl flex items-center justify-center text-white border border-[rgba(255,255,255,0.1)] shadow-2xl hover:bg-[rgba(255,255,255,0.05)] hover:scale-105 hover:-translate-x-1 active:scale-95 transition-all group backdrop-blur-3xl cursor-pointer"
        title="Back to Home"
      >
        <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors pointer-events-none" />
      </Link>
      {children}
    </>
  );
}
