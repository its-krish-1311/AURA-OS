"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home, 
  MessageSquare, 
  FolderKanban, 
  Bot, 
  Database, 
  Brain, 
  LayoutTemplate, 
  Wrench, 
  Blocks,
  Plus,
  ChevronRight,
  Zap,
  Sparkles,
  Code2,
  X,
  ChevronLeft
} from "lucide-react";
import { useDashboardContext } from "@/components/dashboard/DashboardContext";

const mainLinks = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Chats", href: "/dashboard/chat", icon: MessageSquare },
  { name: "Code IDE", href: "/dashboard/code", icon: Code2 },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Agents", href: "/dashboard/agents", icon: Bot },
  { name: "Knowledge Base", href: "/dashboard/knowledge", icon: Database },
  { name: "Memory", href: "/dashboard/memory", icon: Brain },
  { name: "Templates", href: "/dashboard/templates", icon: LayoutTemplate },
  { name: "Tools", href: "/dashboard/tools", icon: Wrench },
  { name: "Integrations", href: "/dashboard/integrations", icon: Blocks },
];

const projects = [
  { name: "Krish OS", href: "/dashboard/code", color: "bg-blue-500" },
  { name: "Aura OS", href: "/dashboard/code", color: "bg-purple-500" },
  { name: "AI Research", href: "/dashboard/code", color: "bg-pink-500" },
  { name: "College Work", href: "/dashboard/code", color: "bg-orange-500" },
  { name: "Personal", href: "/dashboard/code", color: "bg-green-500" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobileSidebarOpen, setIsMobileSidebarOpen } = useDashboardContext();

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 
        w-[280px] h-full flex flex-col shrink-0 bg-transparent
        transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
      
      {/* Aura OS Logo Pill */}
      <div className="h-16 mt-4 mx-4 krish-glass bg-[rgba(18,18,20,0.6)] rounded-full border border-[rgba(255,255,255,0.05)] shadow-2xl flex items-center px-4 shrink-0 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.04%22/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay pointer-events-none z-0 rounded-full"></div>
        <div className="relative z-10 flex items-center gap-3 w-full pl-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accentSecondary to-accentPrimary p-[1px] shrink-0">
            <div className="w-full h-full bg-base rounded-full flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-accentPrimary/20 border border-accentPrimary/50"></div>
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1">
            <h1 className="text-white font-bold tracking-wide text-sm leading-tight font-ethno">AURA OS</h1>
            <p className="text-[9px] text-gray-500 font-medium">Your AI Operating System</p>
          </div>
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Sidebar Content Floating Panel */}
      <div className="flex-1 krish-glass bg-[rgba(18,18,20,0.6)] mt-4 mb-4 mx-4 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-2xl flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.04%22/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay pointer-events-none z-0 rounded-3xl"></div>
        
        <div className="relative z-10 flex flex-col h-full w-full">
      {/* Navigation Links (Home Block) */}
      <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar space-y-1">
        
        {/* Primary Actions (Moved here) */}
        <div className="mb-6 space-y-2">
          <motion.button 
            onClick={() => import('react-hot-toast').then(({ toast }) => toast.success("Creating new AI chat instance..."))}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-black text-white font-bold border-none rounded-full py-2.5 px-4 flex items-center justify-between transition-all shadow-none relative z-10 group"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-semibold text-sm">New Chat</span>
            </div>
            <div className="flex items-center gap-1 opacity-70">
              <kbd className="text-[10px] font-sans bg-black/20 px-1.5 py-0.5 rounded-full">⌘</kbd>
              <kbd className="text-[10px] font-sans bg-black/20 px-1.5 py-0.5 rounded-full">N</kbd>
            </div>
          </motion.button>

          <motion.button 
            onClick={() => router.push('/dashboard/train-siya')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] rounded-full py-2.5 px-4 flex items-center gap-2 transition-all relative z-10 group"
          >
            <Sparkles className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">Train Siya AI</span>
          </motion.button>
        </div>

        {mainLinks.map((link) => {
          const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={(e) => {
                if (link.href === "/dashboard/projects" || link.href === "/dashboard/agents" || link.href === "/dashboard/knowledge" || link.href === "/dashboard/templates" || link.href === "/dashboard/tools" || link.href === "/dashboard/integrations") {
                  e.preventDefault();
                  import('react-hot-toast').then(({ toast }) => toast.success(`${link.name} module coming soon!`));
                }
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive 
                  ? "bg-elevated text-white" 
                  : "text-gray-400 hover:bg-white/[0.03] hover:text-gray-200"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-accentPrimary" : ""}`} />
              <span className="text-sm font-medium">{link.name}</span>
            </Link>
          );
        })}

        {/* Projects Section */}
        <div className="mt-8 mb-2 px-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</span>
          <Plus onClick={() => import('react-hot-toast').then(({ toast }) => toast.success("Creating new project..."))} className="w-3.5 h-3.5 text-gray-500 hover:text-white cursor-pointer" />
        </div>
        
        {projects.map((project) => (
          <Link href={project.href} key={project.name} onClick={() => import('react-hot-toast').then(({ toast }) => toast.success(`Opening project: ${project.name}`))} className="flex items-center justify-between px-3 py-2 text-gray-400 hover:bg-white/[0.03] hover:text-gray-200 rounded-lg cursor-pointer transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${project.color}`}></div>
              <span className="text-sm font-medium">{project.name}</span>
            </div>
          </Link>
        ))}
        
        <div onClick={() => import('react-hot-toast').then(({ toast }) => toast.success("Loading all projects..."))} className="px-3 py-2 text-xs font-medium text-purple-400 hover:text-purple-300 cursor-pointer mt-1">
          View all
        </div>
      </div>

      {/* Bottom Widgets */}
      <div className="p-4 space-y-4 border-t border-borderSubtle bg-base">
        
        {/* System Status */}
        <div onClick={() => import('react-hot-toast').then(({ toast }) => toast.success("All systems are operational and performing optimally."))} className="bg-surface border border-borderSubtle rounded-xl p-3 flex items-center justify-between cursor-pointer group hover:border-green-500/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-elevated flex items-center justify-center relative overflow-hidden group-hover:bg-green-500/10 transition-colors">
              <div className="w-3 h-3 border border-green-500/50 rounded-sm absolute opacity-30"></div>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white">Siya AI Online</p>
              <p className="text-[10px] text-green-500 font-medium">All systems operational</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-green-500 transition-colors" />
        </div>

        {/* Usage Stats */}
        <div className="px-2">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-400 font-medium">Usage This Month</span>
            <span className="text-white font-bold">76%</span>
          </div>
          <div className="h-1.5 w-full bg-elevated rounded-full overflow-hidden">
            <div className="h-full bg-accentPrimary rounded-full" style={{ width: '76%' }}></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-500 mt-2 font-medium">
            <span>Tokens Used</span>
            <span>2.45M / 3.2M</span>
          </div>
          <button onClick={() => import('react-hot-toast').then(({ toast }) => toast.success("Redirecting to billing portal..."))} className="w-full mt-3 bg-elevated hover:bg-surfaceHover text-accentPrimary text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Upgrade Now
          </button>
        </div>

      </div>
      </div>
      </div>
    </aside>
    </>
  );
}
