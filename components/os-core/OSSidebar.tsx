import React from "react";
import { 
  Home, LayoutDashboard, Settings, Bell, Clock, BarChart2, 
  User, Bot, Database, Search, Star, Pin, ListTodo, Calendar, 
  Activity, HelpCircle, Command, Layers
} from "lucide-react";
import Link from "next/link";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface OSSidebarProps {
  osName: string;
  osId: string;
  themeColor: string;
  items: SidebarItem[];
}

export default function OSSidebar({ osName, osId, themeColor, items }: OSSidebarProps) {
  return (
    <div className="w-[260px] h-full flex flex-col krish-glass !rounded-none !border-t-0 !border-b-0 !border-l-0 border-r border-[rgba(255,255,255,0.05)] shrink-0 z-40 relative">
      {/* Background ambient glow matching the OS theme */}
      <div 
        className="absolute top-0 -left-[50%] w-[200%] h-[300px] pointer-events-none opacity-20"
        style={{ background: `radial-gradient(circle at 50% 0%, ${themeColor}, transparent 70%)` }}
      />

      {/* OS Branding */}
      <div className="p-6 pb-4 border-b border-[rgba(255,255,255,0.05)] flex items-center gap-3 relative z-10">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: `linear-gradient(135deg, ${themeColor}40, ${themeColor}10)`, border: `1px solid ${themeColor}40` }}
        >
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-white font-bold text-sm tracking-wide">{osName}</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.15em]">Aura OS</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1 relative z-10">
        <div className="mb-6">
          <h4 className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">Main</h4>
          <div className="space-y-1">
            {items.map((item, idx) => (
              <Link 
                key={idx} 
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all group"
              >
                <item.icon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                <span className="text-xs font-semibold tracking-wide">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">Workspace</h4>
          <div className="space-y-1">
            <Link href={`/os/${osId}/ai`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all group">
              <Bot className="w-4 h-4 text-[#A855F7] group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all" />
              <span className="text-xs font-semibold tracking-wide">AI Assistant</span>
            </Link>
            <Link href={`/os/${osId}/planner`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all group">
              <Calendar className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              <span className="text-xs font-semibold tracking-wide">Planner</span>
            </Link>
            <Link href={`/os/${osId}/knowledge`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all group">
              <Database className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              <span className="text-xs font-semibold tracking-wide">Knowledge Base</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.05)] space-y-1 relative z-10">
        <Link href={`/os/${osId}/settings`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all group">
          <Settings className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
          <span className="text-xs font-semibold tracking-wide">Settings</span>
        </Link>
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all group mt-2 bg-[rgba(239,68,68,0.05)] hover:bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.1)]">
          <Home className="w-4 h-4 text-[#EF4444]" />
          <span className="text-xs font-semibold tracking-wide text-[#EF4444]">Exit to Aura OS</span>
        </Link>
      </div>
    </div>
  );
}
