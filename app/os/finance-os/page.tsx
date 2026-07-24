"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Activity, Brain, Plus, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useOSData } from "@/context/OSDataContext";

export default function FinanceOSDashboard() {
  const { financeTransactions, financeAssets, addTransaction } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({ amount: "", category: "Food", type: "expense", desc: "" });

  // Calculate totals
  const totalIncome = financeTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = financeTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const cashBalance = totalIncome - totalExpense;
  const portfolioValue = financeAssets.reduce((acc, a) => acc + (a.shares * a.currentPrice), 0);
  const netWorth = cashBalance + portfolioValue;

  const handleAddTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTx.amount && newTx.desc) {
      addTransaction({
        id: Date.now().toString(),
        type: newTx.type as "income" | "expense",
        amount: parseFloat(newTx.amount),
        category: newTx.category,
        date: new Date().toISOString().split('T')[0],
        description: newTx.desc
      });
      setIsModalOpen(false);
      setNewTx({ amount: "", category: "Food", type: "expense", desc: "" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-transparent p-8 pb-20 max-w-7xl mx-auto w-full relative" style={{'--theme-color': '#10B981', '--theme-color-dark': '#059669', '--theme-rgb': '16,185,129', '--theme-rgb-dark': '5,150,105'} as React.CSSProperties}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Net Worth Overview</h1>
          <p className="text-gray-400 text-sm">Your wealth matrix, updated in real-time.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="krish-glass px-4 py-2 rounded-xl text-sm font-semibold text-white border border-[rgba(255,255,255,0.1)] flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] transition-all">
            <Plus className="w-4 h-4" /> Add Transaction
          </button>
          <Link href="/os/finance-os/market" className="bg-[#EAB308] hover:bg-[#CA8A04] text-black px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(234,179,8,0.5)] flex items-center gap-2 transition-all">
            <Activity className="w-4 h-4" /> Discover Assets
          </Link>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Metric Cards */}
        {[
          { title: "Total Net Worth", value: `$${netWorth.toLocaleString()}`, sub: "+5.2% this month", icon: DollarSign, color: "text-[#EAB308]", bg: "bg-[#EAB308]" },
          { title: "Cash Balance", value: `$${cashBalance.toLocaleString()}`, sub: "Available liquidity", icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-500" },
          { title: "Monthly Income", value: `$${totalIncome.toLocaleString()}`, sub: "+$500 from side hustle", icon: ArrowUpRight, color: "text-blue-500", bg: "bg-blue-500" },
          { title: "Monthly Spend", value: `$${totalExpense.toLocaleString()}`, sub: "Trending 10% lower", icon: ArrowDownRight, color: "text-rose-500", bg: "bg-rose-500" },
        ].map((metric, i) => (
          <motion.div key={i} variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 ${metric.bg} blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-gray-400 text-sm font-medium mb-1">{metric.title}</h3>
              <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
              <p className="text-xs text-gray-500">{metric.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Financial Advisor */}
          <motion.div variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(234,179,8,0.2)] bg-gradient-to-br from-[rgba(234,179,8,0.05)] to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAB308] blur-[100px] opacity-10" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EAB308] to-[#CA8A04] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                <Brain className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  Aura Wealth Advisor
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[rgba(234,179,8,0.2)] text-[#EAB308] border border-[rgba(234,179,8,0.3)]">
                    Smart Analysis
                  </span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Based on your recent transactions, your "Software" spending is up 15% this month. Also, AAPL has dropped 2% today — it might be a good time to deploy $500 of your cash balance to increase your position.
                </p>
                <div className="flex gap-3">
                  <button className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all border border-[rgba(255,255,255,0.05)]">
                    Analyze Portfolio
                  </button>
                  <button className="bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-gray-300 px-4 py-2 rounded-lg text-xs font-semibold transition-all">
                    View Subscriptions
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Portfolio Snapshot */}
          <motion.div variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Portfolio Snapshot</h3>
              <Link href="/os/finance-os/portfolio" className="text-sm text-[#EAB308] hover:text-[#CA8A04] flex items-center gap-1 font-medium transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {financeAssets.slice(0,3).map((asset, idx) => {
                const profit = (asset.currentPrice - asset.avgPrice) / asset.avgPrice * 100;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-bold text-gray-400 block">{asset.name}</span>
                        <h4 className="text-lg font-black text-white">{asset.ticker}</h4>
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-bold ${profit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {profit >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(profit).toFixed(2)}%
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-semibold text-gray-300">{asset.shares} shs</span>
                      <span className="text-base font-bold text-white">${(asset.shares * asset.currentPrice).toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar: Recent Transactions */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex-1 min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#EAB308]" /> Recent Ledger
              </h3>
              <Link href="/os/finance-os/transactions" className="text-xs text-gray-400 hover:text-white transition-colors">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {financeTransactions.slice(0, 6).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-[rgba(255,255,255,0.05)] ${tx.type === 'income' ? 'bg-[rgba(16,185,129,0.1)] text-[#10B981]' : 'bg-[rgba(255,255,255,0.03)] text-gray-400'}`}>
                      {tx.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{tx.description}</p>
                      <p className="text-[10px] text-gray-500">{tx.category} • {tx.date}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${tx.type === 'income' ? 'text-[#10B981]' : 'text-white'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add Transaction Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Log Transaction</h2>
              <form onSubmit={handleAddTx} className="space-y-4">
                <div className="flex gap-2 mb-2">
                  <button type="button" onClick={() => setNewTx({...newTx, type: 'expense'})} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${newTx.type === 'expense' ? 'bg-rose-500/20 text-rose-400 border-rose-500/50' : 'bg-[rgba(255,255,255,0.05)] text-gray-400 border-transparent'}`}>Expense</button>
                  <button type="button" onClick={() => setNewTx({...newTx, type: 'income'})} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${newTx.type === 'income' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-[rgba(255,255,255,0.05)] text-gray-400 border-transparent'}`}>Income</button>
                </div>
                <input required type="number" step="0.01" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-lg font-bold rounded-xl px-4 py-3 outline-none focus:border-[#EAB308] transition-all" placeholder="$0.00" />
                <input required type="text" value={newTx.desc} onChange={e => setNewTx({...newTx, desc: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#EAB308] transition-all" placeholder="e.g. Whole Foods Groceries" />
                <select value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#EAB308] transition-all">
                  <option>Food</option>
                  <option>Housing</option>
                  <option>Transportation</option>
                  <option>Software</option>
                  <option>Salary</option>
                  <option>Investment</option>
                </select>
                <button type="submit" className="w-full bg-[#EAB308] hover:bg-[#CA8A04] text-black py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all">
                  Save Transaction
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
