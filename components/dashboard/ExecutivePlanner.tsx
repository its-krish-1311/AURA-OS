"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Calendar, Clock, ChevronRight, Activity, Plane, Briefcase, BookOpen, Dumbbell, Target } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";

interface TimelineEvent {
  id: string;
  title: string;
  module: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  time: string;
}

import { useActionModal } from "@/components/os-core/ActionModalContext";

export default function ExecutivePlanner() {
  const { 
    studyTasks, careerTasks, devTasks, 
    travelItinerary, healthWorkouts, bizMeetings, goalsOkrs 
  } = useOSData();
  const { openModal } = useActionModal();

  const [activeView, setActiveView] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Life'>('Daily');

  // Aggregate all events across modules
  const getTimelineEvents = () => {
    // This is a dynamic aggregation mimicking a 2032 predictive intent engine
    const events: TimelineEvent[] = [];

    // Study Tasks
    studyTasks.filter(t => !t.done).slice(0, 2).forEach(t => {
      events.push({ id: t.id, title: t.title, module: "Study OS", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10", time: "Morning" });
    });

    // Career/Dev Tasks
    devTasks.filter(t => t.status !== "Done").slice(0, 1).forEach(t => {
      events.push({ id: t.id, title: `Code: ${t.title}`, module: "Developer OS", icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10", time: "Afternoon" });
    });
    careerTasks.filter(t => !t.done).slice(0, 1).forEach(t => {
      events.push({ id: t.id, title: t.title, module: "Career OS", icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-500/10", time: "Afternoon" });
    });

    // Biz Meetings
    bizMeetings.slice(0, 1).forEach(m => {
      events.push({ id: m.id, title: `Meeting: ${m.title}`, module: "Business OS", icon: Calendar, color: "text-amber-500", bg: "bg-amber-500/10", time: m.time });
    });

    // Travel
    travelItinerary.slice(0, 1).forEach(i => {
      events.push({ id: i.id, title: i.title, module: "Travel OS", icon: Plane, color: "text-cyan-500", bg: "bg-cyan-500/10", time: i.time });
    });

    // Health
    healthWorkouts.slice(0, 1).forEach(w => {
      events.push({ id: w.id, title: w.type, module: "Fitness OS", icon: Dumbbell, color: "text-rose-500", bg: "bg-rose-500/10", time: "Evening" });
    });

    return events;
  };

  const timelineEvents = getTimelineEvents();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-base font-bold tracking-[0.2em] flex items-center gap-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
          <Brain className="w-5 h-5 text-accentLuxury drop-shadow-[0_0_10px_rgba(255,213,74,0.6)]" /> 
          AI EXECUTIVE PLANNER
        </h3>
        <div className="flex bg-[rgba(255,255,255,0.05)] rounded-lg p-1 border border-[rgba(255,255,255,0.05)]">
          {['Daily', 'Weekly', 'Monthly', 'Life'].map(view => (
            <button
              key={view}
              onClick={() => setActiveView(view as any)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                activeView === view 
                  ? 'bg-[rgba(255,255,255,0.1)] text-white shadow-md' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      <div className="krish-glass rounded-[28px] p-6 border border-[rgba(255,255,255,0.05)] relative overflow-hidden group">
        {/* Predictive AI Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accentLuxury blur-[100px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none rounded-full" />
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {activeView === 'Daily' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-400 font-medium mb-4">
                  Good morning. Your cross-app timeline is optimized for maximum deep work today.
                </p>
                {timelineEvents.map((ev, idx) => (
                  <div key={idx} className="flex items-stretch gap-4 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${ev.bg} border border-[rgba(255,255,255,0.05)]`}>
                        <ev.icon className={`w-4 h-4 ${ev.color}`} />
                      </div>
                      {idx !== timelineEvents.length - 1 && (
                        <div className="w-[1px] h-full bg-[rgba(255,255,255,0.05)] my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6 pt-1">
                      <div 
                        className="flex items-center justify-between group/item cursor-pointer"
                        onClick={() => openModal({
                          title: ev.title,
                          description: `This event is managed by the ${ev.module}. Redirecting you to ${ev.module} to view details.`,
                          actionText: `Open ${ev.module}`
                        })}
                      >
                        <div>
                          <h4 className="text-white text-sm font-bold group-hover/item:text-accentLuxury transition-colors">{ev.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded">
                              {ev.module}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {ev.time}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover/item:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}

                {timelineEvents.length === 0 && (
                  <div className="py-8 text-center text-gray-500">
                    <Calendar className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">No cross-app events scheduled.</p>
                  </div>
                )}
              </div>
            )}

            {activeView === 'Life' && (
              <div className="space-y-6">
                <p className="text-sm text-gray-400 font-medium mb-4">
                  Long-term vision derived from Goals OS.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {goalsOkrs.slice(0,2).map(okr => (
                    <div key={okr.id} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-rose-500" />
                        <h4 className="text-sm font-bold text-white">{okr.objective}</h4>
                      </div>
                      <div className="w-full h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden mt-3">
                        <div className="h-full bg-rose-500 rounded-full" style={{ width: `${okr.progress}%` }} />
                      </div>
                    </div>
                  ))}
                  {goalsOkrs.length === 0 && (
                    <div className="col-span-2 text-sm text-gray-500 text-center py-4">No Life Goals set yet. Open Goals OS to define your vision.</div>
                  )}
                </div>
              </div>
            )}

            {(activeView === 'Weekly' || activeView === 'Monthly') && (
              <div className="py-12 text-center text-gray-500">
                <Activity className="w-8 h-8 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Predictive AI is generating your {activeView.toLowerCase()} trajectory...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
