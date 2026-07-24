"use client";

import React from "react";
import { motion } from "framer-motion";
import { PieChart, Plus, Target, AlertTriangle, TrendingDown, Coffee, Home, Car, Monitor, ShoppingBag, Shield } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function FinanceOSBudget() {
  const { financeTransactions } = useOSData();

  // Budgets configuration
  const budgets = [
    { category: "Housing", limit: 3000, icon: Home, color: "bg-blue-500" },
    { category: "Food", limit: 800, icon: Coffee, color: "bg-emerald-500" },
    { category: "Transportation", limit: 500, icon: Car, color: "bg-orange-500" },
    { category: "Software", limit: 200, icon: Monitor, color: "bg-purple-500" },
    { category: "Shopping", limit: 600, icon: ShoppingBag, color: "bg-pink-500" },
    { category: "Insurance", limit: 400, icon: Shield, color: "bg-amber-500" },
  ];

  // Calculate spent amounts from transactions
  const expenses = financeTransactions.filter(t => t.type === 'expense');
  
  const budgetProgress = budgets.map(b => {
    const spent = expenses.filter(e => e.category === b.category).reduce((acc, curr) => acc + curr.amount, 0);
    const percentage = Math.min((spent / b.limit) * 100, 100);
    return { ...b, spent, percentage };
  });

  const totalSpent = budgetProgress.reduce((acc, b) => acc + b.spent, 0);
  const totalLimit = budgetProgress.reduce((acc, b) => acc + b.limit, 0);

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <PieChart className="w-8 h-8 text-[#EAB308]" /> Budget Planner
          </h1>
          <p className="text-gray-400 text-sm">Track spending limits across your monthly categories.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#EAB308] hover:bg-[#CA8A04] text-black px-4 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(234,179,8,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> New Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Main Budget List */}
        <div className="lg:col-span-2 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col overflow-hidden">
          <div className="p-6 border-b border-[rgba(255,255,255,0.05)]">
            <h2 className="text-xl font-bold text-white">October Budget</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            {budgetProgress.map((budget, idx) => {
              const isOver = budget.spent > budget.limit;
              const isWarning = budget.percentage > 85 && !isOver;

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                  key={idx} className="space-y-3"
                >
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-[rgba(255,255,255,0.05)] ${budget.color.replace('bg-', 'text-')}`}>
                        <budget.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{budget.category}</h3>
                        <p className="text-xs text-gray-400">${budget.spent.toLocaleString()} / ${budget.limit.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-bold ${isOver ? 'text-red-500' : isWarning ? 'text-orange-500' : 'text-[#EAB308]'}`}>
                        {budget.percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${budget.percentage}%` }}
                      transition={{ duration: 1, delay: idx * 0.1, type: "spring" as const }}
                      className={`h-full rounded-full ${isOver ? 'bg-red-500' : isWarning ? 'bg-orange-500' : budget.color}`} 
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Overview */}
        <div className="space-y-6 flex flex-col">
          <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col items-center justify-center py-10 relative overflow-hidden">
            <h3 className="text-gray-400 font-semibold text-sm mb-6 uppercase tracking-widest z-10">Total Budget Spent</h3>
            
            <div className="relative w-48 h-48 flex items-center justify-center z-10 mb-2">
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <motion.circle 
                  cx="50" cy="50" r="46" fill="none" 
                  stroke="#EAB308" 
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray="289"
                  strokeDashoffset={289 - (289 * Math.min(totalSpent / totalLimit, 1))}
                  initial={{ strokeDashoffset: 289 }}
                  animate={{ strokeDashoffset: 289 - (289 * Math.min(totalSpent / totalLimit, 1)) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="text-center">
                <div className="text-3xl font-black text-white">${totalSpent.toLocaleString()}</div>
                <div className="text-xs text-gray-500 font-medium mt-1">of ${totalLimit.toLocaleString()}</div>
              </div>
            </div>
            
            <div className={`absolute bottom-0 w-full h-32 blur-[60px] opacity-20 ${totalSpent > totalLimit ? 'bg-red-500' : 'bg-[#EAB308]'}`} />
          </div>

          <div className="krish-glass p-6 rounded-3xl border border-[rgba(239,68,68,0.2)] bg-gradient-to-br from-[rgba(239,68,68,0.05)] to-transparent flex-1">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" /> Alerts
            </h3>
            {budgetProgress.some(b => b.percentage > 85) ? (
              <div className="space-y-3">
                {budgetProgress.filter(b => b.percentage > 85).map((b, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)]">
                    <p className="text-xs text-red-200">
                      <strong>{b.category}:</strong> You've used {b.percentage.toFixed(0)}% of your limit.
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <Target className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-xs font-medium">All budgets on track!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
