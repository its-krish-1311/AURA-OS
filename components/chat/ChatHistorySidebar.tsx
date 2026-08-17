"use client";

import React, { useEffect, useState } from "react";
import { Search, Edit3, Trash2, Folder, Pin, Star, MessageSquare } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChatHistorySidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentConvId = searchParams.get("c");

  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/conversations")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setConversations(data);
        }
      })
      .catch(e => console.error("Error fetching conversations:", e));
  }, [currentConvId]); // Re-fetch if conversation changes

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`/api/conversations/${id}`, { method: 'DELETE' });
      setConversations(prev => prev.filter(c => c.id !== id));
      if (currentConvId === id) {
        router.push("/dashboard/chat");
      }
      import('react-hot-toast').then(({ toast }) => toast.success("Chat deleted"));
    } catch (err) {}
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleRenameStart = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const handleRenameSubmit = async (id: string, e?: React.FormEvent | React.FocusEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!editingTitle.trim() || !editingId) {
      setEditingId(null);
      return;
    }

    try {
      const res = await fetch(`/api/conversations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editingTitle })
      });
      
      if (res.ok) {
        setConversations(prev => prev.map(c => c.id === id ? { ...c, title: editingTitle } : c));
        import('react-hot-toast').then(({ toast }) => toast.success("Chat renamed"));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEditingId(null);
    }
  };

  return (
    <div className="w-[280px] h-full krish-glass bg-[rgba(18,18,20,0.6)] rounded-[32px] border border-[rgba(255,255,255,0.35)] shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden shrink-0 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.04%22/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex flex-col h-full w-full">
      
      {/* Header & Search */}
      <div className="p-5 border-b border-borderSubtle">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold tracking-widest text-xs uppercase flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-accentPrimary" />
            Chat History
          </h2>
          <button onClick={() => router.push("/dashboard/chat")} className="w-8 h-8 rounded-full bg-white/[0.02] border border-borderSubtle flex items-center justify-center hover:bg-borderSubtle transition-colors">
            <Edit3 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search chats..." 
            className="w-full bg-base border border-borderSubtle rounded-xl py-2 pl-9 pr-3 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-accentPrimary/50 transition-all"
          />
        </div>
      </div>

      {/* Folders / Quick Filters */}
      <div className="flex gap-2 p-4 border-b border-borderSubtle overflow-x-auto scrollbar-hide">
        <button onClick={() => import('react-hot-toast').then(({ toast }) => toast.success("Filtering by Pinned..."))} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accentPrimary/10 text-accentPrimary border border-accentPrimary/20 text-xs font-semibold shrink-0">
          <Pin className="w-3 h-3" /> Pinned
        </button>
        <button onClick={() => import('react-hot-toast').then(({ toast }) => toast.success("Filtering by Favorites..."))} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-base text-gray-400 hover:text-gray-200 border border-borderSubtle text-xs font-semibold shrink-0 transition-all">
          <Star className="w-3 h-3" /> Favorites
        </button>
        <button onClick={() => import('react-hot-toast').then(({ toast }) => toast.success("Filtering by Projects..."))} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-base text-gray-400 hover:text-gray-200 border border-borderSubtle text-xs font-semibold shrink-0 transition-all">
          <Folder className="w-3 h-3" /> Projects
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar bg-transparent">
        {conversations.length === 0 ? (
           <div className="text-center text-xs text-gray-500 mt-10">No recent conversations</div>
        ) : (
          conversations.map((chat: any) => (
            <div 
              key={chat.id} 
              onClick={() => { if (editingId !== chat.id) router.push(`/dashboard/chat?c=${chat.id}`) }} 
              className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all border border-transparent ${currentConvId === chat.id ? 'bg-elevated border-white/[0.05]' : 'hover:bg-elevated hover:border-white/[0.02]'}`}
            >
              {editingId === chat.id ? (
                <form onSubmit={(e) => handleRenameSubmit(chat.id, e)} className="flex-1 flex items-center mr-2">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onBlur={(e) => handleRenameSubmit(chat.id, e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    autoFocus
                    className="w-full bg-black/30 border border-borderSubtle rounded px-2 py-1 text-sm text-white outline-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                </form>
              ) : (
                <span className={`text-sm font-medium truncate pr-2 ${currentConvId === chat.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                  {chat.title}
                </span>
              )}
              
              {editingId !== chat.id && (
                <div className="hidden group-hover:flex items-center gap-1 shrink-0">
                  <button onClick={(e) => handleRenameStart(chat.id, chat.title, e)} className="text-gray-500 hover:text-gray-300 p-1"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button onClick={(e) => handleDelete(chat.id, e)} className="text-gray-500 hover:text-red-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      </div>
    </div>
  );
}
