"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Mail, Building, DollarSign, X } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function BusinessOSCRM() {
  const { bizClients, addBizClient, updateBizClientStatus } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newClient, setNewClient] = useState({ name: "", company: "", email: "", value: "", status: "Lead" });

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newClient.name && newClient.company) {
      addBizClient({
        id: Date.now().toString(),
        name: newClient.name,
        company: newClient.company,
        email: newClient.email,
        value: Number(newClient.value) || 0,
        status: newClient.status as any,
      });
      setIsModalOpen(false);
      setNewClient({ name: "", company: "", email: "", value: "", status: "Lead" });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-emerald-400 bg-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.2)]";
      case "Lead": return "text-blue-400 bg-[rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.2)]";
      case "Completed": return "text-gray-400 bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.2)]";
      default: return "text-gray-400 bg-[rgba(255,255,255,0.1)]";
    }
  };

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-[#F59E0B]" /> Client CRM
          </h1>
          <p className="text-gray-400 text-sm">Manage your leads, active clients, and contract values.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> New Contact
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {bizClients.map((client) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                key={client.id} 
                className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col group h-fit relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${client.status === 'Active' ? 'bg-emerald-500' : client.status === 'Lead' ? 'bg-blue-500' : 'bg-gray-500'} blur-[60px] opacity-10 transition-opacity`} />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[rgba(245,158,11,0.1)] flex items-center justify-center text-[#F59E0B] font-bold text-xl border border-[rgba(245,158,11,0.2)]">
                      {client.company.charAt(0)}
                    </div>
                  </div>
                  
                  <select 
                    value={client.status}
                    onChange={(e) => updateBizClientStatus(client.id, e.target.value)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border outline-none cursor-pointer appearance-none ${getStatusColor(client.status)}`}
                  >
                    <option value="Lead" className="bg-transparent text-white">LEAD</option>
                    <option value="Active" className="bg-transparent text-white">ACTIVE</option>
                    <option value="Completed" className="bg-transparent text-white">COMPLETED</option>
                  </select>
                </div>

                <div className="mb-6 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#F59E0B] transition-colors">{client.company}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" /> {client.name}
                  </div>
                </div>

                <div className="space-y-3 relative z-10 mt-auto">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Mail className="w-4 h-4 text-gray-500" /> Email
                    </div>
                    <span className="text-xs font-medium text-white truncate max-w-[150px]">{client.email}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.1)]">
                    <div className="flex items-center gap-2 text-xs text-[#F59E0B] font-bold">
                      <DollarSign className="w-4 h-4" /> MRR Value
                    </div>
                    <span className="text-sm font-black text-white">${client.value.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {bizClients.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <Building className="w-12 h-12 mb-4 opacity-20" />
            <p>Your CRM is empty. Add a lead to get started.</p>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Add New Contact</h2>
              <form onSubmit={handleAddClient} className="space-y-4">
                <input required autoFocus type="text" value={newClient.company} onChange={e => setNewClient({...newClient, company: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] transition-all" placeholder="Company Name (e.g. Acme Corp)" />
                <input required type="text" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] transition-all" placeholder="Contact Person (e.g. Sarah Jenkins)" />
                <input required type="email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] transition-all" placeholder="Email Address" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input required type="number" min="0" value={newClient.value} onChange={e => setNewClient({...newClient, value: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl pl-9 pr-4 py-3 outline-none focus:border-[#F59E0B] transition-all" placeholder="MRR Value" />
                  </div>
                  <select value={newClient.status} onChange={e => setNewClient({...newClient, status: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] transition-all">
                    <option>Lead</option>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
                  Save Contact
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
