"use client";

import React from "react";
import OSLayout from "@/components/os-core/OSLayout";
import { BookOpen, Book, Film, Headphones } from "lucide-react";


export default function LibraryOSLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = [
    { icon: BookOpen, label: "Library Shelf", href: "/os/library-os" },
    { icon: Book, label: "Reading Tracker", href: "/os/library-os/books" },
    { icon: Film, label: "Movies & Shows", href: "/os/library-os/movies" },
    { icon: Headphones, label: "Podcasts", href: "/os/library-os/podcasts" },
  ];

  return (
    <OSLayout
      osName="Library OS"
      osId="library-os"
      themeColor="#4F46E5" // Deep Indigo theme for knowledge
      sidebarItems={sidebarItems}
    >
      {children}
    </OSLayout>
  );
}
