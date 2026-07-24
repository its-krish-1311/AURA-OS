"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus, Download, CheckCircle2, Clock, FileWarning, X } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function BusinessOSInvoices() {
  const { bizInvoices, bizClients, addBizInvoice, updateBizInvoiceStatus } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [newInvoice, setNewInvoice] = useState({ clientId: "", amount: "", dueDate: "", status: "Draft" });

  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInvoice.clientId && newInvoice.amount && newInvoice.dueDate) {
      addBizInvoice({
        id: Date.now().toString(),
        number: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        clientId: newInvoice.clientId,
        amount: Number(newInvoice.amount),
        dueDate: newInvoice.dueDate,
        status: newInvoice.status as any,
      });
      setIsModalOpen(false);
      setNewInvoice({ clientId: "", amount: "", dueDate: "", status: "Draft" });
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Paid": return { color: "text-emerald-400 bg-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.2)]", icon: CheckCircle2 };
      case "Sent": return { color: "text-blue-400 bg-[rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.2)]", icon: Clock };
      case "Overdue": return { color: "text-rose-400 bg-[rgba(244,63,94,0.1)] border-[rgba(244,63,94,0.2)]", icon: FileWarning };
      default: return { color: "text-gray-400 bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.2)]", icon: FileText };
    }
  };

  return (
    <div className="p-8 pb-20 max-w-[1600px] mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FileText className="w-8 h-8 text-[#F59E0B]" /> Invoices
          </h1>
          <p className="text-gray-400 text-sm">Track billing, send invoices, and monitor cash flow.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Create Invoice
          </button>
        </div>
      </div>

      <div className="flex-1 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0 z-10">
          <div className="col-span-1">Invoice #</div>
          <div className="col-span-2">Client</div>
          <div className="col-span-1 text-right">Amount</div>
          <div className="col-span-1 text-right">Due Date</div>
          <div className="col-span-1 text-right">Status</div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          <AnimatePresence>
            {bizInvoices.map((invoice) => {
              const client = bizClients.find(c => c.id === invoice.clientId);
              const statusConfig = getStatusConfig(invoice.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                  key={invoice.id}
                  className="grid grid-cols-6 gap-4 p-4 items-center rounded-2xl hover:bg-[rgba(255,255,255,0.03)] transition-colors group cursor-pointer"
                >
                  <div className="col-span-1 flex items-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(invoice.number); setCopiedId(invoice.id); setTimeout(() => setCopiedId(null), 2000); }}
                      className="p-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      {copiedId === invoice.id ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Download className="w-3 h-3" />}
                    </button>
                    <span className="text-sm font-mono text-gray-300">{invoice.number}</span>
                  </div>

                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[rgba(245,158,11,0.1)] flex items-center justify-center text-[#F59E0B] font-bold text-xs border border-[rgba(245,158,11,0.2)]">
                      {client?.company.charAt(0) || '?'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{client?.company || 'Unknown Client'}</div>
                      <div className="text-xs text-gray-500">{client?.name || 'N/A'}</div>
                    </div>
                  </div>

                  <div className="col-span-1 text-right text-sm font-black text-white">
                    ${invoice.amount.toLocaleString()}
                  </div>

                  <div className="col-span-1 text-right text-xs font-medium text-gray-400">
                    {invoice.dueDate}
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <select 
                      value={invoice.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateBizInvoiceStatus(invoice.id, e.target.value)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border flex items-center gap-1 outline-none cursor-pointer appearance-none text-right ${statusConfig.color}`}
                    >
                      <option value="Draft" className="bg-transparent text-white">DRAFT</option>
                      <option value="Sent" className="bg-transparent text-white">SENT</option>
                      <option value="Paid" className="bg-transparent text-white">PAID</option>
                      <option value="Overdue" className="bg-transparent text-white">OVERDUE</option>
                    </select>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {bizInvoices.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 py-20">
              <FileText className="w-12 h-12 mb-4 opacity-20" />
              <p>No invoices found. Generate one to get paid!</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Invoice Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Create Invoice</h2>
              <form onSubmit={handleAddInvoice} className="space-y-4">
                
                {bizClients.length === 0 ? (
                  <div className="text-sm text-amber-500 bg-[rgba(245,158,11,0.1)] p-3 rounded-xl border border-[rgba(245,158,11,0.2)]">
                    Please add a client in the CRM before creating an invoice.
                  </div>
                ) : (
                  <>
                    <select required value={newInvoice.clientId} onChange={e => setNewInvoice({...newInvoice, clientId: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] transition-all">
                      <option value="" disabled>Select Client...</option>
                      {bizClients.map(c => (
                        <option key={c.id} value={c.id}>{c.company}</option>
                      ))}
                    </select>

                    <input required type="number" min="0" value={newInvoice.amount} onChange={e => setNewInvoice({...newInvoice, amount: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] transition-all" placeholder="Amount (e.g. 5000)" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input required type="date" value={newInvoice.dueDate} onChange={e => setNewInvoice({...newInvoice, dueDate: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-gray-400 text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] transition-all" />
                      <select value={newInvoice.status} onChange={e => setNewInvoice({...newInvoice, status: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] transition-all">
                        <option>Draft</option>
                        <option>Sent</option>
                        <option>Paid</option>
                      </select>
                    </div>

                    <button type="submit" className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
                      Generate Invoice
                    </button>
                  </>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
