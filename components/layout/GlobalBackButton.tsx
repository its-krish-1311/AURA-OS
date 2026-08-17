"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalBackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show the back button on the root dashboard page or main landing page if desired
  // For this requirement ("add back key every page"), we will show it everywhere except maybe root.
  const isRoot = pathname === "/" || pathname === "/dashboard";

  return (
    <AnimatePresence>
      {!isRoot && (
        <motion.button
          initial={{ opacity: 0, x: -10, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -10, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={() => router.back()}
          className="absolute top-6 left-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-md transition-all group"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
