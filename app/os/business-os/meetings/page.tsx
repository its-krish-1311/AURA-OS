"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarRange, Plus, Clock, Video, Users, X } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

export default function BusinessOSMeetings() {
  const { bizMeetings, bizClients, addBizMeeting } = useOSData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newMeeting, setNewMeeting] = useState({ title: "", date: "", time: "", client: "", type: "Sync" });

  const handleAddMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMeeting.title && newMeeting.date && newMeeting.time) {
      addBizMeeting({
        id: Date.now().toString(),
        title: newMeeting.title,
        date: newMeeting.date,
        time: newMeeting.time,
        client: newMeeting.client || "Internal",
        type: newMeeting.type as any,
      });
      setIsModalOpen(false);
      setNewMeeting({ title: "", date: "", time: "", client: "", type: "Sync" });
    }
  };

  // Group by date
  const groupedMeetings = bizMeetings.reduce((acc, mtg) => {
    if (!acc[mtg.date]) acc[mtg.date] = [];
    acc[mtg.date].push(mtg);
    return acc;
  }, {} as Record<string, typeof bizMeetings>);

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <CalendarRange className="w-8 h-8 text-[#F59E0B]" /> Schedule & Meetings
          </h1>
          <p className="text-gray-400 text-sm">Organize your client pitches, syncs, and project reviews.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Schedule Call
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-0">
        {Object.keys(groupedMeetings).length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <CalendarRange className="w-12 h-12 mb-4 opacity-20" />
            <p>Your schedule is clear. Book some client calls!</p>
          </div>
        ) : (
          Object.keys(groupedMeetings).sort().map((date, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              key={date} className="mb-10"
            >
              <div className="sticky top-0 z-10 bg-[rgba(4,6,11,0.9)] backdrop-blur-md py-4 mb-4 border-b border-[rgba(255,255,255,0.05)]">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h2>
              </div>
              
              <div className="space-y-4 pl-4 border-l border-[rgba(255,255,255,0.05)] ml-1">
                {groupedMeetings[date].map((mtg) => (
                  <div key={mtg.id} className="relative pl-6">
                    <div className="absolute left-[-5px] top-4 w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <div className="krish-glass p-5 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-transparent hover:bg-[rgba(255,255,255,0.03)] transition-all group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-[rgba(245,158,11,0.1)] text-[#F59E0B]`}>
                            <Video className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-[#F59E0B] transition-colors">{mtg.title}</h3>
                            <div className="flex items-center gap-1.5 text-sm text-gray-400 mt-0.5">
                              <Users className="w-4 h-4" /> {mtg.client}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2 text-sm font-bold text-gray-300 bg-[rgba(255,255,255,0.05)] px-3 py-1.5 rounded-lg">
                            <Clock className="w-3.5 h-3.5 text-[#F59E0B]" /> {mtg.time}
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            mtg.type === 'Pitch' ? 'text-rose-400 bg-[rgba(244,63,94,0.1)]' :
                            mtg.type === 'Sync' ? 'text-blue-400 bg-[rgba(59,130,246,0.1)]' :
                            'text-emerald-400 bg-[rgba(16,185,129,0.1)]'
                          }`}>
                            {mtg.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Meeting Modal */}
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
              
              <h2 className="text-xl font-bold text-white mb-6">Schedule Call</h2>
              <form onSubmit={handleAddMeeting} className="space-y-4">
                <input required autoFocus type="text" value={newMeeting.title} onChange={e => setNewMeeting({...newMeeting, title: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] transition-all" placeholder="Meeting Title (e.g. Q3 Review)" />
                
                <div className="grid grid-cols-2 gap-4">
                  <select value={newMeeting.type} onChange={e => setNewMeeting({...newMeeting, type: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] transition-all">
                    <option>Pitch</option>
                    <option>Sync</option>
                    <option>Review</option>
                  </select>
                  <select value={newMeeting.client} onChange={e => setNewMeeting({...newMeeting, client: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] transition-all">
                    <option value="">Internal</option>
                    {bizClients.map(c => (
                      <option key={c.id} value={c.company}>{c.company}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input required type="date" value={newMeeting.date} onChange={e => setNewMeeting({...newMeeting, date: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-gray-400 text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] transition-all" />
                  <input required type="time" value={newMeeting.time} onChange={e => setNewMeeting({...newMeeting, time: e.target.value})} className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#F59E0B] transition-all" />
                </div>
                
                <button type="submit" className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
                  Book Meeting
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
