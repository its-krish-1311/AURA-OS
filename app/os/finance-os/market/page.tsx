"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Activity, TrendingUp, TrendingDown, Plus, CheckCircle2, ChevronRight, BarChart2 } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";
import { useRouter } from "next/navigation";

export default function FinanceOSMarket() {
  const { addAsset, financeAssets } = useOSData();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [savedAssetId, setSavedAssetId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("Top Gainers");

  // Mock Market Data
  const marketData = [
    { id: "m1", ticker: "NVDA", name: "NVIDIA Corp.", price: 850.20, change: 4.2, volume: "45.2M", marketCap: "2.1T" },
    { id: "m2", ticker: "TSLA", name: "Tesla Inc.", price: 175.40, change: -2.1, volume: "112M", marketCap: "550B" },
    { id: "m3", ticker: "AMD", name: "Advanced Micro Devices", price: 165.90, change: 3.5, volume: "38M", marketCap: "260B" },
    { id: "m4", ticker: "ETH", name: "Ethereum", price: 3400.50, change: 5.1, volume: "12B", marketCap: "410B" },
    { id: "m5", ticker: "PLTR", name: "Palantir Technologies", price: 24.50, change: 8.4, volume: "65M", marketCap: "55B" },
  ];

  const handleSaveToPortfolio = (asset: typeof marketData[0]) => {
    if (!financeAssets.some(a => a.ticker === asset.ticker)) {
      addAsset({
        id: Date.now().toString(),
        ticker: asset.ticker,
        name: asset.name,
        shares: 10, // Default mock shares added
        avgPrice: asset.price,
        currentPrice: asset.price,
      });
    }
    setSavedAssetId(asset.id);
    setTimeout(() => setSavedAssetId(null), 3000);
  };

  return (
    <div className="p-8 pb-20 max-w-[1600px] mx-auto w-full h-full flex flex-col">
      {/* Header & Global Search Bar */}
      <div className="flex flex-col mb-8 gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Activity className="w-8 h-8 text-[#EAB308]" /> Market Discovery
          </h1>
          <p className="text-gray-400 text-sm">Research stocks and crypto, and add them directly to your portfolio.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 krish-glass rounded-2xl p-2 border border-[rgba(255,255,255,0.05)] bg-transparent flex items-center">
            <Search className="w-5 h-5 text-gray-500 ml-3 mr-2 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ticker, company name, or ETF..." 
              className="flex-1 bg-transparent border-none outline-none text-white text-base py-2 placeholder-gray-500"
            />
            <button className="bg-[#EAB308] hover:bg-[#CA8A04] text-black px-8 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all ml-3">
              Lookup
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-6 border-b border-[rgba(255,255,255,0.05)] pb-2">
          {["Top Gainers", "Most Active", "Crypto", "Tech Sector"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeFilter === tab ? "bg-[rgba(255,255,255,0.1)] text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar pb-4 pr-2">
          {marketData.map((asset) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              key={asset.id} 
              className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(234,179,8,0.3)] transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(234,179,8,0.1)] text-[#EAB308] font-black flex items-center justify-center border border-[rgba(255,255,255,0.1)] text-lg">
                    {asset.ticker[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{asset.ticker}</h3>
                    <p className="text-xs text-gray-400 font-medium">{asset.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-white">${asset.price.toFixed(2)}</div>
                  <div className={`flex items-center justify-end gap-1 text-sm font-bold mt-1 ${asset.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {asset.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(asset.change)}%
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] p-3 rounded-xl text-center">
                  <div className="text-xs text-gray-500 mb-1">Vol</div>
                  <div className="text-sm font-bold text-gray-200">{asset.volume}</div>
                </div>
                <div className="flex-1 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] p-3 rounded-xl text-center">
                  <div className="text-xs text-gray-500 mb-1">Mkt Cap</div>
                  <div className="text-sm font-bold text-gray-200">{asset.marketCap}</div>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)] flex justify-between items-center">
                <button className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-semibold transition-colors">
                  <BarChart2 className="w-4 h-4" /> View Chart
                </button>
                <button 
                  onClick={() => handleSaveToPortfolio(asset)}
                  disabled={financeAssets.some(a => a.ticker === asset.ticker)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 ${
                    savedAssetId === asset.id 
                      ? "bg-white text-black" 
                      : financeAssets.some(a => a.ticker === asset.ticker)
                        ? "bg-[rgba(255,255,255,0.1)] text-gray-300 border border-[rgba(255,255,255,0.1)] cursor-not-allowed"
                        : "bg-[#EAB308] hover:bg-[#CA8A04] text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                  }`}
                >
                  {savedAssetId === asset.id ? (
                    <><CheckCircle2 className="w-4 h-4" /> Added</>
                  ) : financeAssets.some(a => a.ticker === asset.ticker) ? (
                    <><CheckCircle2 className="w-4 h-4" /> In Portfolio</>
                  ) : (
                    <><Plus className="w-4 h-4" /> Add to Portfolio</>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Alert */}
      <AnimatePresence>
        {savedAssetId && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#EAB308] text-black px-6 py-3 rounded-full font-bold shadow-[0_10px_30px_rgba(234,179,8,0.5)] flex items-center gap-3 cursor-pointer"
            onClick={() => router.push('/os/finance-os/portfolio')}
          >
            <CheckCircle2 className="w-5 h-5" />
            Asset secured in your Portfolio! Click to view.
            <ChevronRight className="w-4 h-4 opacity-50" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
