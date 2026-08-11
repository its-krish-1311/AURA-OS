"use client";

import React, { useState } from "react";
import { Search, Bell, Sun, BadgeCheck, LogIn, LogOut, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useActionModal } from "@/components/os-core/ActionModalContext";

interface HeaderProps {
  onSignIn?: () => void;
  onSignUp?: () => void;
}

export default function Header({ onSignIn, onSignUp }: HeaderProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { openModal } = useActionModal();
  const { data: session, status } = useSession();
  const userName = session?.user?.name?.trim() || session?.user?.email?.split("@")[0] || "Krish";
  const isAuthenticated = status === "authenticated";

  return (
    <header className="w-full relative flex items-center justify-between gap-4 py-4 sm:py-6 px-0 sm:px-4 z-50">
      <div className="flex min-w-0 flex-1 justify-start items-center">
        <div className="krish-glass px-3 sm:px-5 py-2.5 rounded-full border border-[rgba(168,85,247,0.3)] shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center gap-2.5 backdrop-blur-md cursor-default bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-[rgba(168,85,247,0.1)]">
          <div className="w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_8px_#A855F7] animate-pulse"></div>
          <span className="hidden sm:flex text-xs font-bold tracking-wide items-center gap-1.5">
            <span className="text-gray-300">Engineered by</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A855F7] drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">Krishna Kushwaha</span>
          </span>
        </div>
      </div>
      
      {/* Search Bar - Absolutely Centered */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-[480px]">
        <motion.div 
          animate={isFocused ? { scale: 1.02, y: -2 } : { scale: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
          className="relative w-full group"
        >
          {/* Animated Glow Backdrop */}
          <div className={`absolute -inset-1 rounded-full blur-md transition-all duration-500 ${isFocused ? 'bg-gradient-to-r from-[rgba(var(--theme-rgb-dark),0.05)] via-[rgba(var(--theme-rgb-dark),0.15)] to-[rgba(var(--theme-rgb-dark),0.05)] opacity-70' : 'opacity-0'}`}></div>
          
          <div 
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className={`relative w-full h-12 krish-glass rounded-full flex items-center px-4 gap-3 transition-all duration-300 cursor-pointer ${isFocused ? 'border-[rgba(var(--theme-rgb-dark),0.3)] bg-[rgba(255,255,255,0.05)] shadow-[0_0_20px_rgba(var(--theme-rgb-dark),0.15),0_0_40px_rgba(var(--theme-rgb-dark),0.08)]' : ''}`}
          >
            <Search className={`w-5 h-5 transition-all duration-300 ${isFocused ? 'text-accentLight drop-shadow-[0_0_8px_rgba(var(--theme-rgb),0.6)]' : 'text-gray-300'}`} />
            <input 
              type="text" 
              placeholder="Search or ask anything..." 
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-muted font-medium cursor-pointer"
              readOnly
            />
            <div className={`px-2 py-1 rounded text-xs font-semibold border transition-all duration-300 ${isFocused ? 'bg-[rgba(var(--theme-rgb-dark),0.15)] text-white border-[rgba(var(--theme-rgb-dark),0.3)] shadow-[0_0_10px_rgba(var(--theme-rgb-dark),0.1)]' : 'bg-[rgba(255,255,255,0.05)] text-gray-300 border-[rgba(255,255,255,0.05)]'}`}>
              ⌘ K
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Controls */}
      <div className="flex flex-1 items-center justify-end gap-3 sm:gap-5">
        {!isAuthenticated && status !== "loading" && (
          <div className="flex items-center gap-2">
            <button type="button" onClick={onSignIn} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-3 sm:px-4 text-xs font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A855F7]">
              <LogIn className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Log in</span>
            </button>
            <button type="button" onClick={onSignUp} className="inline-flex h-10 items-center gap-2 rounded-full bg-[#A855F7] px-3 sm:px-4 text-xs font-semibold text-white shadow-[0_0_18px_rgba(168,85,247,0.35)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Sign up</span>
            </button>
          </div>
        )}
        {isAuthenticated && <>
        <motion.button 
          onClick={() => {
            openModal({
              title: "Notifications",
              description: "You have 0 new alerts. Your ecosystem is fully optimized.",
              actionText: "Acknowledge"
            });
          }}
          whileHover={{ scale: 1.1, rotate: 10 }} 
          whileTap={{ scale: 0.9 }} 
          className="text-gray-300 hover:text-white transition-colors relative group"
        >
          <Bell className="w-5 h-5 drop-shadow-[0_0_5px_rgba(var(--theme-rgb-dark),0.3)] group-hover:drop-shadow-[0_0_10px_rgba(var(--theme-rgb-dark),0.6)]" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-accentSecondary rounded-full border border-primary shadow-[0_0_6px_rgba(var(--theme-rgb-dark),0.5)]"></div>
        </motion.button>
        <motion.button 
          onClick={() => {
            import('react-hot-toast').then(({ toast }) => toast("AuraOS is strictly Dark Mode 🌙", { icon: "✨" }));
          }}
          whileHover={{ scale: 1.1, rotate: 45 }} 
          whileTap={{ scale: 0.9 }} 
          className="text-gray-300 hover:text-white transition-colors group"
        >
          <Sun className="w-5 h-5 drop-shadow-[0_0_5px_rgba(var(--theme-rgb-dark),0.3)] group-hover:drop-shadow-[0_0_10px_rgba(var(--theme-rgb-dark),0.6)]" />
        </motion.button>
        <motion.button onClick={() => signOut({ callbackUrl: "/" })} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-gray-300 hover:text-red-400 transition-colors group" title="Sign Out" aria-label="Sign out">
          <LogOut className="w-5 h-5 drop-shadow-[0_0_5px_rgba(var(--theme-rgb-dark),0.3)] group-hover:drop-shadow-[0_0_10px_rgba(248,113,113,0.6)]" />
        </motion.button>
        
        <div 
          onClick={() => {
            openModal({
              title: "Profile & Settings",
              description: "Modify your digital persona and ecosystem preferences.",
              actionText: "Open Settings",
              onAction: () => {
                import('react-hot-toast').then(({ toast }) => toast.success("Routing to Settings..."));
              }
            });
          }}
          className="flex items-center gap-3 pl-4 border-l border-[rgba(255,255,255,0.1)] cursor-pointer group"
        >
          <motion.div whileHover={{ scale: 1.05 }} className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.1)] group-hover:border-[rgba(var(--theme-rgb-dark),0.4)] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(var(--theme-rgb-dark),0.2)]">
            <div className="w-full h-full bg-gradient-to-tr from-[#000000] to-[rgba(255,255,255,0.1)] flex items-center justify-center">
              <span className="text-white font-bold text-lg drop-shadow-md">K</span>
            </div>
          </motion.div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-white text-sm font-semibold tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accentLuxury transition-all duration-300">Hi, {userName}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-accentLuxury text-xs font-bold tracking-widest drop-shadow-[0_0_6px_rgba(255,213,74,0.5)]">Premium User</span>
              <BadgeCheck className="w-3.5 h-3.5 text-accentLuxury drop-shadow-[0_0_6px_rgba(255,213,74,0.5)]" />
            </div>
          </div>
        </div>
        </>}
      </div>
    </header>
  );
}
