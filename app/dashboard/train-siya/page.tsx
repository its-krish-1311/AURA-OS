"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Settings, 
  Database,
  Search,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  FileText,
  Clock,
  Sparkles,
  Lock,
  UploadCloud,
  ChevronDown,
  Activity,
  Zap,
  Info
} from "lucide-react";
import toast from "react-hot-toast";

// Types
interface Memory {
  id: string;
  content: string;
  category: string;
  importance: string;
  confidence: number;
  isActive: boolean;
  source: string;
  createdAt: string;
  updatedAt: string;
}

interface KnowledgeSource {
  id: string;
  name: string;
  type: string;
  size: number;
  status: string;
  createdAt: string;
}

interface SiyaSettings {
  memoryEnabled: boolean;
  autoMemory: boolean;
  askBeforeRemembering: boolean;
  useMemoriesInChat: boolean;
  responseStyle: string;
}

export default function MemoryTrainingPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "memories" | "knowledge" | "settings">("overview");
  
  // Data State
  const [memories, setMemories] = useState<Memory[]>([]);
  const [sources, setSources] = useState<KnowledgeSource[]>([]);
  const [settings, setSettings] = useState<SiyaSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Forms
  const [isTeachModalOpen, setIsTeachModalOpen] = useState(false);
  const [newMemory, setNewMemory] = useState({ content: "", category: "Personal", importance: "Medium" });
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [memRes, srcRes, setRes] = await Promise.all([
        fetch("/api/memories"),
        fetch("/api/knowledge"),
        fetch("/api/siya/settings")
      ]);
      if (memRes.ok) setMemories(await memRes.json());
      if (srcRes.ok) setSources(await srcRes.json());
      if (setRes.ok) setSettings(await setRes.json());
    } catch (err) {
      toast.error("Failed to load memory engine data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleTeachSiya = async () => {
    if (!newMemory.content.trim()) return toast.error("Memory content cannot be empty.");
    
    const toastId = toast.loading("Embedding memory...");
    try {
      const res = await fetch("/api/memories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMemory)
      });
      if (!res.ok) throw new Error();
      const added = await res.json();
      setMemories([added, ...memories]);
      setIsTeachModalOpen(false);
      setNewMemory({ content: "", category: "Personal", importance: "Medium" });
      toast.success("Memory successfully embedded!", { id: toastId });
    } catch (err) {
      toast.error("Failed to save memory.", { id: toastId });
    }
  };

  const handleDeleteMemory = async (id: string) => {
    try {
      const res = await fetch(`/api/memories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setMemories(memories.filter(m => m.id !== id));
      toast.success("Memory erased.");
    } catch (err) {
      toast.error("Failed to erase memory.");
    }
  };

  const toggleMemoryActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/memories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current })
      });
      if (!res.ok) throw new Error();
      setMemories(memories.map(m => m.id === id ? { ...m, isActive: !current } : m));
    } catch (err) {
      toast.error("Failed to update memory state.");
    }
  };

  const updateSettings = async (updates: Partial<SiyaSettings>) => {
    try {
      const newSettings = { ...settings, ...updates } as SiyaSettings;
      setSettings(newSettings);
      await fetch("/api/siya/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      toast.success("Settings saved.");
    } catch (err) {
      toast.error("Failed to save settings.");
    }
  };

  const filteredMemories = memories.filter(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()) || m.category.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="h-full w-full flex flex-col pt-24 px-6 lg:px-12 relative z-10 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-bold font-ethno text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-500" />
            SIYA Training Center
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Teach SIYA. Manage her memory. Shape how she understands you.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsTeachModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-full flex items-center gap-2 font-semibold shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Teach SIYA
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 shrink-0 border-b border-white/5 pb-2">
        {(["overview", "memories", "knowledge", "settings"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab 
                ? "bg-white/10 text-white shadow-inner" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-12 relative">
        <AnimatePresence mode="wait">
          
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="krish-glass p-6 rounded-2xl border border-white/5">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">{memories.length}</h3>
                <p className="text-gray-400 text-sm font-medium">Total Memories</p>
              </div>
              <div className="krish-glass p-6 rounded-2xl border border-white/5">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">{sources.length}</h3>
                <p className="text-gray-400 text-sm font-medium">Knowledge Sources</p>
              </div>
              <div className="krish-glass p-6 rounded-2xl border border-white/5">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">{memories.filter(m => m.isActive).length}</h3>
                <p className="text-gray-400 text-sm font-medium">Active Memories</p>
              </div>

              <div className="md:col-span-3 krish-glass p-6 rounded-2xl border border-white/5 mt-4">
                <h3 className="text-lg font-bold text-white mb-4">Memory Distribution</h3>
                <div className="flex gap-2 flex-wrap">
                  {['Personal', 'Preference', 'Goal', 'Instruction', 'Project', 'Knowledge'].map(cat => {
                    const count = memories.filter(m => m.category === cat).length;
                    if (count === 0) return null;
                    return (
                      <div key={cat} className="bg-black/40 px-4 py-2 rounded-lg border border-white/5 flex items-center gap-3">
                        <span className="text-sm text-gray-300">{cat}</span>
                        <span className="text-xs font-bold bg-white/10 px-2 py-0.5 rounded-full">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* MEMORIES TAB */}
          {activeTab === "memories" && (
            <motion.div
              key="memories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search SIYA's memory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {isLoading ? (
                  <p className="text-gray-500 text-center py-8">Loading memories...</p>
                ) : filteredMemories.length === 0 ? (
                  <div className="text-center py-12 krish-glass rounded-2xl border border-white/5">
                    <Brain className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No memories found.</p>
                  </div>
                ) : (
                  filteredMemories.map((memory) => (
                    <div key={memory.id} className={`krish-glass p-5 rounded-xl border transition-all ${memory.isActive ? 'border-white/10' : 'border-red-500/20 opacity-60'}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] uppercase tracking-wider font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-sm">{memory.category}</span>
                            <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-sm">{memory.importance}</span>
                            <span className="text-[10px] text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3"/> {new Date(memory.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-white text-sm leading-relaxed">{memory.content}</p>
                          <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-500">
                            <Zap className="w-3 h-3 text-yellow-500" /> Confidence: {memory.confidence.toFixed(2)}
                            <span className="mx-2">•</span>
                            Source: {memory.source}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button onClick={() => toggleMemoryActive(memory.id, memory.isActive)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" title={memory.isActive ? "Disable Memory" : "Enable Memory"}>
                            {memory.isActive ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                          </button>
                          <button onClick={() => handleDeleteMemory(memory.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* KNOWLEDGE TAB */}
          {activeTab === "knowledge" && (
            <motion.div
              key="knowledge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div 
                className="border-2 border-dashed border-white/20 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-purple-500/50 hover:bg-purple-500/5 transition-all cursor-pointer"
                onClick={() => toast.success("Document ingestion pipeline initializing... (Mocked for now)")}
              >
                <div className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center mb-4">
                  <UploadCloud className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Upload Knowledge Document</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto">Upload PDFs, text, or markdown files to automatically extract, chunk, and embed them into SIYA's deep knowledge base.</p>
                <button className="mt-6 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">Select Files</button>
              </div>

              <div className="space-y-3">
                <h3 className="text-white font-semibold flex items-center gap-2"><Database className="w-4 h-4" /> Indexed Sources</h3>
                {sources.length === 0 ? (
                  <p className="text-gray-500 text-sm">No external knowledge sources uploaded yet.</p>
                ) : (
                  sources.map(src => (
                    <div key={src.id} className="krish-glass p-4 rounded-xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <FileText className="w-8 h-8 text-blue-400" />
                        <div>
                          <p className="text-white font-medium text-sm">{src.name}</p>
                          <p className="text-xs text-gray-500">{src.type} • {(src.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">{src.status}</span>
                        <button className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && settings && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl space-y-6"
            >
              <div className="krish-glass p-6 rounded-2xl border border-white/5 space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4"><Settings className="w-5 h-5"/> Memory Configuration</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Memory Engine Enabled</p>
                    <p className="text-sm text-gray-400">Allow SIYA to access and utilize stored memories.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.memoryEnabled} onChange={(e) => updateSettings({ memoryEnabled: e.target.checked })} />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Auto-Extract Memories</p>
                    <p className="text-sm text-gray-400">SIYA will automatically detect and save preferences during chats.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.autoMemory} onChange={(e) => updateSettings({ autoMemory: e.target.checked })} />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Ask Before Remembering</p>
                    <p className="text-sm text-gray-400">SIYA will ask for permission before saving a new auto-memory.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.askBeforeRemembering} onChange={(e) => updateSettings({ askBeforeRemembering: e.target.checked })} />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-white font-medium mb-2">Base Response Style</p>
                  <select 
                    value={settings.responseStyle} 
                    onChange={(e) => updateSettings({ responseStyle: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-purple-500"
                  >
                    <option value="Balanced">Balanced & Helpful</option>
                    <option value="Concise">Concise & Direct</option>
                    <option value="Creative">Creative & Expressive</option>
                    <option value="Technical">Technical & Detailed</option>
                  </select>
                </div>
              </div>

              <div className="krish-glass p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
                <h3 className="text-lg font-bold text-red-400 flex items-center gap-2 mb-2"><Lock className="w-5 h-5"/> Privacy & Security</h3>
                <p className="text-sm text-gray-400 mb-4">Memories are strictly scoped to your user ID and stored securely in the local SQLite database. External knowledge processing runs entirely locally where possible.</p>
                <button className="text-red-400 border border-red-500/30 hover:bg-red-500/10 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  Wipe All Memories
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Teach Modal */}
      <AnimatePresence>
        {isTeachModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsTeachModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#121214] border border-white/10 shadow-2xl rounded-2xl p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-400"/> Teach SIYA</h2>
                <button onClick={() => setIsTeachModalOpen(false)} className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"><X className="w-5 h-5"/></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">What should SIYA remember?</label>
                  <textarea 
                    value={newMemory.content}
                    onChange={(e) => setNewMemory({...newMemory, content: e.target.value})}
                    placeholder="e.g. I prefer code examples in TypeScript instead of JavaScript."
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500 min-h-[100px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <div className="relative">
                      <select 
                        value={newMemory.category}
                        onChange={(e) => setNewMemory({...newMemory, category: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white text-sm appearance-none focus:outline-none focus:border-purple-500"
                      >
                        <option>Personal</option>
                        <option>Preference</option>
                        <option>Goal</option>
                        <option>Instruction</option>
                        <option>Project</option>
                        <option>Knowledge</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Importance</label>
                    <div className="relative">
                      <select 
                        value={newMemory.importance}
                        onChange={(e) => setNewMemory({...newMemory, importance: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white text-sm appearance-none focus:outline-none focus:border-purple-500"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Permanent</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 flex gap-3 mt-4">
                  <Info className="w-5 h-5 text-purple-400 shrink-0" />
                  <p className="text-xs text-purple-200/70">When you save this memory, an embedding vector will be generated automatically, allowing SIYA to retrieve it contextually during your conversations.</p>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => setIsTeachModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
                  <button onClick={handleTeachSiya} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg transition-colors">Save Memory</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
