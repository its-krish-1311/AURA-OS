import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020408] text-white">
      <h2 className="text-4xl font-bold text-[#A855F7] mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">404 - System Not Found</h2>
      <p className="text-gray-400 mb-8">The requested module or resource could not be located in AuraOS.</p>
      <Link 
        href="/" 
        className="px-6 py-2 bg-gradient-to-r from-[#7E22CE] to-[#A855F7] rounded-full text-white font-semibold hover:scale-105 transition-all shadow-[0_0_20px_rgba(126,34,206,0.5)]"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
