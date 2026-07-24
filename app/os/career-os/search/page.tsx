"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, DollarSign, Briefcase, Filter, Star, Clock, CheckCircle2, ChevronRight, X, Building2, ExternalLink } from "lucide-react";
import { useOSData } from "@/context/OSDataContext";
import { useRouter } from "next/navigation";

export default function JobDiscovery() {
  const { addCareerJob, careerJobs } = useOSData();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Recommended");
  const [savedJobId, setSavedJobId] = useState<string | null>(null);

  // Mock global job listings
  const jobsFeed = [
    { id: "j1", company: "OpenAI", role: "Frontend Engineer", location: "San Francisco, CA (Hybrid)", salary: "$160k - $210k", type: "Full-time", posted: "2 hours ago", match: 94, logo: "O", color: "bg-emerald-500" },
    { id: "j2", company: "Vercel", role: "Design Engineer", location: "Remote", salary: "$140k - $180k", type: "Full-time", posted: "5 hours ago", match: 91, logo: "V", color: "bg-blue-500" },
    { id: "j3", company: "Stripe", role: "Product Engineer", location: "New York, NY", salary: "$150k - $190k", type: "Full-time", posted: "1 day ago", match: 88, logo: "S", color: "bg-purple-500" },
    { id: "j4", company: "Netflix", role: "UI Engineer", location: "Los Gatos, CA", salary: "$180k - $240k", type: "Full-time", posted: "2 days ago", match: 85, logo: "N", color: "bg-red-500" },
    { id: "j5", company: "Linear", role: "Software Engineer, Frontend", location: "Remote", salary: "Competitive", type: "Full-time", posted: "3 days ago", match: 82, logo: "L", color: "bg-indigo-500" },
  ];

  const handleSaveToTracker = (job: typeof jobsFeed[0]) => {
    // Check if already saved to avoid duplicates
    if (!careerJobs.some(j => j.company === job.company && j.role === job.role)) {
      addCareerJob({
        id: Date.now().toString(),
        company: job.company,
        role: job.role,
        status: "Wishlist",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        salary: job.salary,
        location: job.location,
      });
    }
    setSavedJobId(job.id);
    setTimeout(() => setSavedJobId(null), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-8 pb-20 max-w-[1600px] mx-auto w-full h-full flex flex-col">
      {/* Header & Global Search Bar */}
      <div className="flex flex-col mb-8 gap-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Search className="w-8 h-8 text-[#10B981]" /> Job Discovery
          </h1>
          <p className="text-gray-400 text-sm">Find and aggregate jobs across all major platforms directly inside Aura OS.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 krish-glass rounded-2xl p-2 border border-[rgba(255,255,255,0.05)] bg-transparent flex items-center">
            <Search className="w-5 h-5 text-gray-500 ml-3 mr-2 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, company, or keywords..." 
              className="flex-1 bg-transparent border-none outline-none text-white text-base py-2 placeholder-gray-500"
            />
            <div className="h-8 w-px bg-[rgba(255,255,255,0.1)] mx-3" />
            <MapPin className="w-5 h-5 text-gray-500 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="City, state, or Remote" 
              className="w-48 bg-transparent border-none outline-none text-white text-base py-2 placeholder-gray-500"
            />
            <button className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all ml-3">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Sidebar: Filters */}
        <div className="w-[280px] shrink-0 hidden xl:flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
          <div className="krish-glass p-6 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#10B981]" /> Filters
              </h3>
              <button className="text-xs text-[#10B981] font-semibold hover:text-white transition-colors">Clear All</button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Job Type</h4>
                <div className="space-y-2">
                  {["Full-time", "Contract", "Internship", "Freelance"].map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border ${type === "Full-time" ? "bg-[#10B981] border-[#10B981]" : "border-[rgba(255,255,255,0.2)] group-hover:border-[#10B981]"} flex items-center justify-center transition-all`}>
                        {type === "Full-time" && <CheckCircle2 className="w-3 h-3 text-black" />}
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Work Model</h4>
                <div className="space-y-2">
                  {["Remote", "Hybrid", "On-site"].map(model => (
                    <label key={model} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border ${model === "Remote" ? "bg-[#10B981] border-[#10B981]" : "border-[rgba(255,255,255,0.2)] group-hover:border-[#10B981]"} flex items-center justify-center transition-all`}>
                        {model === "Remote" && <CheckCircle2 className="w-3 h-3 text-black" />}
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{model}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Experience Level</h4>
                <div className="space-y-2">
                  {["Entry Level", "Mid Level", "Senior", "Lead / Manager"].map(level => (
                    <label key={level} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 rounded border border-[rgba(255,255,255,0.2)] group-hover:border-[#10B981] transition-all" />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Job Feed */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-4 border-b border-[rgba(255,255,255,0.05)] pb-2">
            {["Recommended", "Recent Searches", "Saved Alerts"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab ? "bg-[rgba(255,255,255,0.1)] text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
            {jobsFeed.map((job) => (
              <motion.div 
                key={job.id} 
                variants={itemVariants}
                className="krish-glass p-5 rounded-3xl border border-[rgba(255,255,255,0.05)] bg-transparent hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(16,185,129,0.3)] transition-all group relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${job.color} bg-opacity-20 flex items-center justify-center shrink-0 border border-[rgba(255,255,255,0.1)]`}>
                      <span className="text-xl font-bold text-white">{job.logo}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#10B981] transition-colors">{job.role}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-gray-300">{job.company}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-2.5 py-1 rounded-lg bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] text-[#10B981] text-xs font-semibold flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] text-gray-300 text-xs font-medium">
                          {job.type}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] text-gray-300 text-xs font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {job.posted}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                    <div className="flex items-center gap-1.5 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 text-[#3B82F6] fill-[#3B82F6]" />
                      <span className="text-xs font-bold text-[#3B82F6]">{job.match}% Match</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] flex items-center justify-center text-gray-400 hover:text-white transition-all border border-[rgba(255,255,255,0.05)]">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleSaveToTracker(job)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 ${
                          savedJobId === job.id 
                            ? "bg-white text-black" 
                            : careerJobs.some(j => j.company === job.company && j.role === job.role)
                              ? "bg-[rgba(255,255,255,0.1)] text-gray-300 border border-[rgba(255,255,255,0.1)] cursor-not-allowed"
                              : "bg-[#10B981] hover:bg-[#059669] text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        }`}
                        disabled={careerJobs.some(j => j.company === job.company && j.role === job.role)}
                      >
                        {savedJobId === job.id ? (
                          <><CheckCircle2 className="w-4 h-4" /> Added to Tracker</>
                        ) : careerJobs.some(j => j.company === job.company && j.role === job.role) ? (
                          <><CheckCircle2 className="w-4 h-4" /> In Tracker</>
                        ) : (
                          <><Briefcase className="w-4 h-4" /> Save to Tracker</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Alert when Job Saved */}
      <AnimatePresence>
        {savedJobId && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#10B981] text-white px-6 py-3 rounded-full font-bold shadow-[0_10px_30px_rgba(16,185,129,0.5)] flex items-center gap-3 cursor-pointer"
            onClick={() => router.push('/os/career-os/jobs')}
          >
            <CheckCircle2 className="w-5 h-5" />
            Job saved to Wishlist! Click to view Kanban Tracker.
            <ChevronRight className="w-4 h-4 opacity-50" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
