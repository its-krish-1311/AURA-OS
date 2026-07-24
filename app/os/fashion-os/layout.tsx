"use client";

import React from "react";
import OSLayout from "@/components/os-core/OSLayout";
import { Sparkles, Shirt, Palette, Compass } from "lucide-react";


export default function FashionOSLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = [
    { icon: Sparkles, label: "Stylist", href: "/os/fashion-os" },
    { icon: Shirt, label: "Wardrobe", href: "/os/fashion-os/wardrobe" },
    { icon: Palette, label: "Outfits", href: "/os/fashion-os/outfits" },
    { icon: Compass, label: "Discovery", href: "/os/fashion-os/discovery" },
  ];

  return (
    <OSLayout
      osName="Fashion OS"
      osId="fashion-os"
      themeColor="#D946EF" // Premium Magenta/Fuchsia theme for Fashion OS
      sidebarItems={sidebarItems}
    >
      {children}
    </OSLayout>
  );
}
