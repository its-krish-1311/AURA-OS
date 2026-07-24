"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, Play, Plus, Save, Activity, CheckCircle2, X } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function DeveloperOSApiTester() {
  const { devApis, addDevApi } = useOSData();
  const [method, setMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("https://jsonplaceholder.typicode.com/todos/1");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiName, setApiName] = useState("");

  const handleSend = async () => {
    setLoading(true);
    setResponse(null);
    setStatus(null);
    setLatency(null);
    
    const start = Date.now();
    try {
      // Basic fetch without headers for testing open APIs
      const res = await fetch(endpoint, { method });
      const data = await res.json().catch(() => null) || await res.text();
      setStatus(res.status);
      setResponse(data);
    } catch (err: any) {
      setStatus(500);
      setResponse({ error: err.message || "Failed to fetch. CORS or Network Error." });
    } finally {
      setLatency(Date.now() - start);
      setLoading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiName && endpoint) {
      addDevApi({
        id: Date.now().toString(),
        name: apiName,
        method: method as any,
        endpoint: endpoint,
        status: status || 0,
      });
      setIsModalOpen(false);
      setApiName("");
    }
  };

  const getMethodColor = (m: string) => {
    switch (m) {
      case "GET": return "text-emerald-400 bg-[rgba(16,185,129,0.1)]";
      case "POST": return "text-amber-400 bg-[rgba(245,158,11,0.1)]";
      case "PUT": return "text-blue-400 bg-[rgba(59,130,246,0.1)]";
      case "DELETE": return "text-rose-400 bg-[rgba(244,63,94,0.1)]";
      default: return "text-gray-400 bg-[rgba(255,255,255,0.1)]";
    }
  };

  const getStatusColor = (s: number | null) => {
    if (!s) return "text-gray-500";
    if (s >= 200 && s < 300) return "text-emerald-400";
    if (s >= 400 && s < 500) return "text-amber-400";
    if (s >= 500) return "text-rose-400";
    return "text-gray-400";
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <TerminalSquare className="w-8 h-8 text-[#8B5CF6]" /> API Tester
          </h1>
          <p className="text-gray-400 text-sm">Test, debug, and save your API endpoints directly in your OS.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Main Tester */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex gap-2 mb-4">
              <select 
                value={method} 
                onChange={e => setMethod(e.target.value)}
                className={`w-28 font-bold text-center rounded-xl border border-[rgba(255,255,255,0.1)] outline-none cursor-pointer appearance-none ${getMethodColor(method)}`}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              <input 
                type="text" 
                value={endpoint} 
                onChange={e => setEndpoint(e.target.value)}
                placeholder="https://api.example.com/v1/resource" 
                className="flex-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#8B5CF6] transition-all font-mono" 
              />
              <button 
                onClick={handleSend}
                disabled={loading || !endpoint}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all flex items-center gap-2"
              >
                {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                Send
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
              <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1 hover:text-[#8B5CF6] transition-colors"><Save className="w-3 h-3" /> Save to Workspace</button>
            </div>
          </div>

          <div className="flex-1 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.4)] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
              <h3 className="text-sm font-bold text-white">Response Payload</h3>
              <div className="flex gap-4 text-xs font-bold">
                <span className="text-gray-500">Status: <span className={getStatusColor(status)}>{status || '---'}</span></span>
                <span className="text-gray-500">Time: <span className="text-blue-400">{latency ? `${latency}ms` : '---'}</span></span>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-auto custom-scrollbar">
              {response ? (
                <pre className="text-xs text-gray-300 font-mono">
                  {typeof response === 'object' ? JSON.stringify(response, null, 2) : response}
                </pre>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-600 text-sm font-medium">
                  Hit Send to get a response.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Saved APIs */}
        <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent overflow-y-auto custom-scrollbar">
          <h3 className="text-lg font-bold text-white mb-6">Saved Endpoints</h3>
          <div className="space-y-4">
            {devApis.map(api => (
              <div 
                key={api.id}
                onClick={() => {
                  setMethod(api.method);
                  setEndpoint(api.endpoint);
                }}
                className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[#8B5CF6] transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#8B5CF6] transition-colors line-clamp-1">{api.name}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getMethodColor(api.method)}`}>{api.method}</span>
                  <span className="text-[10px] text-gray-500 font-mono truncate">{api.endpoint}</span>
                </div>
              </div>
            ))}
            {devApis.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No saved endpoints.</p>
            )}
          </div>
        </div>
      </div>

      {/* Save API Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-transparent/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-transparent border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 shadow-2xl relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-bold text-white mb-6">Save Endpoint</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <input required autoFocus type="text" value={apiName} onChange={e => setApiName(e.target.value)} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#8B5CF6] transition-all" placeholder="Endpoint Name (e.g. Fetch Users)" />
                <div className="flex items-center gap-2 p-3 bg-[rgba(0,0,0,0.3)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getMethodColor(method)}`}>{method}</span>
                  <span className="text-xs text-gray-400 font-mono truncate">{endpoint}</span>
                </div>
                <button type="submit" className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
                  Save to Workspace
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
