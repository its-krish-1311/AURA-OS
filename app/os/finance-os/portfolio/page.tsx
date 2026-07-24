"use client";

import React from "react";
import { motion } from "framer-motion";
import { LineChart, Search, Filter, TrendingUp, TrendingDown, ArrowUpRight, Plus, Activity } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function FinanceOSPortfolio() {
  const { financeAssets } = useOSData();

  const totalValue = financeAssets.reduce((acc, a) => acc + (a.shares * a.currentPrice), 0);
  const totalCost = financeAssets.reduce((acc, a) => acc + (a.shares * a.avgPrice), 0);
  const totalProfit = totalValue - totalCost;
  const profitPercentage = (totalProfit / totalCost) * 100 || 0;

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <LineChart className="w-8 h-8 text-[#EAB308]" /> Investment Portfolio
          </h1>
          <p className="text-gray-400 text-sm">Track your stocks, crypto, and real estate assets.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group hidden sm:block">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#EAB308] transition-colors" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#EAB308] text-white text-sm rounded-xl pl-9 pr-4 py-2 outline-none transition-all w-[250px]"
            />
          </div>
          <button className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Manual Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Value</h3>
          <div className="text-4xl font-black text-white mb-2">${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          <div className={`flex items-center gap-2 text-sm font-bold ${totalProfit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {totalProfit >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            ${Math.abs(totalProfit).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ({profitPercentage.toFixed(2)}%)
          </div>
        </div>
        
        {/* Mock Chart Area */}
        <div className="lg:col-span-2 krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col justify-end relative overflow-hidden">
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#EAB308]" />
            <h3 className="text-white font-bold text-sm">Performance History</h3>
          </div>
          
          <svg className="w-full h-32 mt-8 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 30">
            <defs>
              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(234,179,8,0.3)" />
                <stop offset="100%" stopColor="rgba(234,179,8,0)" />
              </linearGradient>
            </defs>
            <path d="M0,30 L0,20 Q10,25 20,15 T40,10 T60,18 T80,5 L100,2 L100,30 Z" fill="url(#chartGlow)" />
            <path d="M0,20 Q10,25 20,15 T40,10 T60,18 T80,5 L100,2" fill="none" stroke="#EAB308" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>

      {/* Holdings List */}
      <div className="flex-1 krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent flex flex-col overflow-hidden min-h-0">
        <div className="grid grid-cols-12 gap-4 p-6 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)] text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-4">Asset</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Holdings</div>
          <div className="col-span-2">Total Value</div>
          <div className="col-span-2 text-right">Return</div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {financeAssets.map((asset) => {
            const val = asset.shares * asset.currentPrice;
            const cost = asset.shares * asset.avgPrice;
            const ret = val - cost;
            const retPct = (ret / cost) * 100;

            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                key={asset.id} 
                className="grid grid-cols-12 gap-4 p-4 rounded-2xl hover:bg-[rgba(255,255,255,0.03)] border border-transparent hover:border-[rgba(255,255,255,0.05)] transition-all items-center"
              >
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-[rgba(255,255,255,0.05)] bg-[rgba(234,179,8,0.1)] text-[#EAB308] font-black">
                    {asset.ticker[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{asset.ticker}</div>
                    <div className="text-xs text-gray-400">{asset.name}</div>
                  </div>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-200">${asset.currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                
                <div className="col-span-2 flex flex-col">
                  <span className="text-sm text-white">{asset.shares}</span>
                  <span className="text-[10px] text-gray-500">Avg: ${asset.avgPrice}</span>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <span className="text-sm font-bold text-white">${val.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                
                <div className={`col-span-2 flex flex-col items-end justify-center ${ret >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  <span className="text-sm font-bold">${Math.abs(ret).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                  <span className="text-xs font-semibold flex items-center gap-1">
                    {ret >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(retPct).toFixed(2)}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
