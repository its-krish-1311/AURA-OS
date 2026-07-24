"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Search, Filter, ArrowUpRight, ArrowDownRight, Trash2, Download } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function FinanceOSTransactions() {
  const { financeTransactions, deleteTransaction } = useOSData();
  const [search, setSearch] = useState("");

  const filteredTransactions = financeTransactions.filter(t => 
    t.description.toLowerCase().includes(search.toLowerCase()) || 
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Wallet className="w-8 h-8 text-[#EAB308]" /> Transaction Ledger
          </h1>
          <p className="text-gray-400 text-sm">A complete history of your income and expenses.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group hidden sm:block">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#EAB308] transition-colors" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..." 
              className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#EAB308] text-white text-sm rounded-xl pl-9 pr-4 py-2 outline-none transition-all w-[250px]"
            />
          </div>
          <button className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center gap-2 transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="flex-1 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col overflow-hidden min-h-0">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-6 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)] text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-5 md:col-span-4">Description</div>
          <div className="col-span-3 hidden md:block">Category</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-4 md:col-span-2 text-right">Amount</div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          <AnimatePresence>
            {filteredTransactions.map((tx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                key={tx.id} 
                className="grid grid-cols-12 gap-4 p-4 rounded-2xl hover:bg-[rgba(255,255,255,0.03)] border border-transparent hover:border-[rgba(255,255,255,0.05)] transition-all items-center group"
              >
                <div className="col-span-5 md:col-span-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-[rgba(255,255,255,0.05)] ${tx.type === 'income' ? 'bg-[rgba(16,185,129,0.1)] text-[#10B981]' : 'bg-[rgba(255,255,255,0.03)] text-gray-400'}`}>
                    {tx.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  </div>
                  <span className="text-sm font-bold text-gray-200 truncate">{tx.description}</span>
                </div>
                
                <div className="col-span-3 hidden md:flex items-center">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[rgba(255,255,255,0.05)] text-gray-400">
                    {tx.category}
                  </span>
                </div>
                
                <div className="col-span-3 flex items-center">
                  <span className="text-sm text-gray-400">{tx.date}</span>
                </div>
                
                <div className="col-span-4 md:col-span-2 flex items-center justify-end gap-4">
                  <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-[#10B981]' : 'text-white'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </span>
                  <button 
                    onClick={() => deleteTransaction(tx.id)}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredTransactions.length === 0 && (
            <div className="h-64 flex flex-col items-center justify-center text-gray-500">
              <Wallet className="w-12 h-12 mb-4 opacity-20" />
              <p>No transactions found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
