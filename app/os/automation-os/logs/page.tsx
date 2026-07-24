"use client";

import React from "react";
import { motion } from "framer-motion";
import { ActivitySquare, CheckCircle2, XCircle, Search, Filter } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function AutomationOSLogs() {
  const { autoLogs } = useOSData();

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <ActivitySquare className="w-8 h-8 text-[#F97316]" /> Event Logs
          </h1>
          <p className="text-gray-400 text-sm">Real-time execution history of your pipelines.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search logs..." className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl pl-9 pr-4 py-2 outline-none focus:border-[#F97316] transition-all w-full md:w-64" />
          </div>
          <button className="bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-white px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.05)] transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <div className="krish-glass rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.05)] text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="p-4 pl-6 font-medium">Status</th>
                <th className="p-4 font-medium">Pipeline Name</th>
                <th className="p-4 font-medium">Details</th>
                <th className="p-4 pr-6 font-medium text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {autoLogs.map((log, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                  key={log.id} 
                  className="border-b border-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.02)] transition-colors group cursor-pointer"
                >
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-2">
                      {log.status === "Success" ? (
                        <div className="w-8 h-8 rounded-full bg-[rgba(16,185,129,0.1)] flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[rgba(239,68,68,0.1)] flex items-center justify-center">
                          <XCircle className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-white group-hover:text-[#F97316] transition-colors">{log.workflowName}</td>
                  <td className="p-4 text-sm text-gray-400">{log.details}</td>
                  <td className="p-4 pr-6 text-sm text-gray-500 font-medium text-right whitespace-nowrap">{log.timestamp}</td>
                </motion.tr>
              ))}

              {autoLogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    <ActivitySquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    No execution logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
