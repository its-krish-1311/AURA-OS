"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  X, Lock, ShieldCheck, Loader2, CheckCircle2,
  FileText, PenTool, Globe, Music, LineChart, Code, LayoutDashboard, MonitorSmartphone, Play, ArrowLeft
} from "lucide-react";
import LivingBackground from "@/components/background/LivingBackground";

// Map URL params to display names
const osMap: Record<string, string> = {
  "study-os": "Study OS",
  "career-os": "Career OS",
  "health-os": "Health OS",
  "finance-os": "Finance OS",
  "travel-os": "Travel OS",
  "fashion-os": "Fashion OS",
  "productivity": "Productivity",
  "goals-os": "Goals OS",
  "diet-os": "Diet OS",
  "music-os": "Music OS",
  "library-os": "Library OS",
  "automation": "Automation"
};

// Actual local apps found on the user's C:\ Drive
const getMockApps = (osName: string) => {
  const defaultApps = [
    { name: "Microsoft Edge", icon: Globe },
    { name: "Notepad", icon: FileText },
    { name: "Snipping Tool", icon: PenTool },
  ];

  const appMap: Record<string, any[]> = {
    "Study OS": [
      { name: "Jupyter Notebook", icon: Code },
      { name: "KrishBook - Colab", icon: Globe },
      { name: "Notepad", icon: FileText },
      { name: "Microsoft Edge", icon: Globe },
      { name: "YouTube", icon: Play },
    ],
    "Career OS": [
      { name: "Visual Studio Code", icon: Code },
      { name: "Git Bash", icon: Code },
      { name: "Node.js", icon: MonitorSmartphone },
      { name: "Krish's - Gmail", icon: Globe },
    ],
    "Music OS": [
      { name: "Windows Media Player", icon: Music },
      { name: "YouTube", icon: Play },
    ],
    "Finance OS": [
      { name: "Microsoft Edge", icon: Globe },
      { name: "Excel (Web)", icon: LineChart },
    ],
    "Travel OS": [
      { name: "Google Maps (Web)", icon: Globe },
    ],
    "Fashion OS": [
      { name: "Microsoft Edge", icon: Globe },
    ],
    "Productivity": [
      { name: "Snipping Tool", icon: PenTool },
      { name: "Notepad", icon: FileText },
      { name: "Wordpad", icon: FileText },
      { name: "Steps Recorder", icon: MonitorSmartphone },
    ],
    "Goals OS": [
      { name: "Notepad", icon: FileText },
    ],
    "Diet OS": [
      { name: "Microsoft Edge", icon: Globe },
    ],
    "Health OS": [
      { name: "Microsoft Edge", icon: Globe },
    ],
    "Library OS": [
      { name: "KrishBook - Colab", icon: Globe },
      { name: "Microsoft Edge", icon: Globe },
    ],
    "Automation": [
      { name: "Antigravity", icon: Code },
      { name: "Task Scheduler", icon: LayoutDashboard },
      { name: "Windows PowerShell", icon: Code },
      { name: "Git CMD", icon: Code },
    ]
  };

  return appMap[osName] || defaultApps;
};

export default function OsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [step, setStep] = useState<"PERMISSION" | "SCANNING" | "APPS">("PERMISSION");
  const [scanProgress, setScanProgress] = useState(0);

  const resolvedParams = React.use(params);
  const rawId = resolvedParams.id || "";
  const osName = osMap[rawId] || rawId.replace("-", " ");

  const handleAllow = () => {
    setStep("SCANNING");
    
    // Simulate a deep system scan
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setStep("APPS"), 800);
      }
      setScanProgress(Math.floor(progress));
    }, 400);
  };

  const apps = getMockApps(osName);

  return (
    <div className="min-h-screen w-full bg-transparent relative flex flex-col overflow-hidden">
      {/* Background Ambience - Living Background for Liquid Feel */}
      <div className="fixed inset-0 z-0">
        <LivingBackground />
      </div>

      {/* Header Navigation */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full p-6 flex justify-between items-center z-50 absolute top-0 left-0"
      >
        <button 
          onClick={() => router.push("/")}
          className="px-5 py-2.5 rounded-full bg-[rgba(255,255,255,0.01)] backdrop-blur-[60px] border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center gap-2 text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.04)] hover:shadow-[0_8px_32px_rgba(126,34,206,0.2)] transition-all font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <div className="bg-[rgba(255,255,255,0.01)] backdrop-blur-[60px] border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] px-5 py-2.5 rounded-full flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse shadow-[0_0_10px_rgba(126,34,206,0.8)]"></span>
          <span className="text-white font-bold tracking-wide">{osName} Environment</span>
        </div>
      </motion.div>

      {/* Main Content Area - Perfectly Centered */}
      <div className="flex-1 flex items-center justify-center p-6 mt-16 z-10 relative">
        <AnimatePresence mode="wait">
          
          {step === "PERMISSION" && (
            <motion.div 
              key="permission"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-center max-w-2xl w-full bg-[rgba(10,14,24,0.3)] backdrop-blur-[80px] p-12 rounded-[2.5rem] border border-[rgba(255,255,255,0.08)] shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.2)] relative overflow-hidden"
            >
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.06)] to-transparent skew-x-[-25deg] animate-[sweep_4s_ease-in-out_infinite]" />
              
              <div className="w-28 h-28 rounded-full bg-[rgba(126,34,206,0.05)] border border-[rgba(126,34,206,0.2)] backdrop-blur-xl flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(126,34,206,0.15),inset_0_2px_10px_rgba(255,255,255,0.05)] relative">
                <div className="absolute inset-0 rounded-full border border-[rgba(126,34,206,0.4)] blur-[2px]"></div>
                <Lock className="w-14 h-14 text-[#C084FC] drop-shadow-[0_0_15px_rgba(126,34,206,0.8)] relative z-10" />
              </div>
              <h3 className="text-4xl text-white font-extrabold mb-6 tracking-tight drop-shadow-md">System Access Required</h3>
              <p className="text-gray-300 mb-12 max-w-lg mx-auto leading-relaxed text-lg font-medium opacity-90">
                AuraOS requires permission to scan your local <span className="text-[#D8B4FE] font-mono bg-[rgba(126,34,206,0.1)] px-3 py-1 rounded-lg border border-[rgba(126,34,206,0.2)] shadow-inner">C:\ Drive</span> to sync and organize all related applications into {osName}.
              </p>
              
              <div className="flex flex-wrap gap-5 justify-center items-center">
                <button 
                  onClick={() => router.push("/")}
                  className="px-8 py-4 rounded-full text-gray-400 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.08)] hover:text-white transition-all font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
                >
                  Deny
                </button>
                
                <button 
                  onClick={() => setStep("APPS")}
                  className="px-8 py-4 rounded-full text-white bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)] backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all font-bold tracking-wide"
                >
                  Skip & Check Apps
                </button>

                <button 
                  onClick={handleAllow}
                  className="px-8 py-4 rounded-full text-white bg-gradient-to-br from-[#7E22CE] to-[#7E22CE] hover:from-[#A855F7] hover:to-[#7E22CE] hover:shadow-[0_10px_40px_rgba(126,34,206,0.5),inset_0_2px_5px_rgba(255,255,255,0.3)] border border-[#C084FC]/30 transition-all font-bold flex items-center gap-3 hover:scale-105 active:scale-95 shadow-[0_8px_20px_rgba(126,34,206,0.3)]"
                >
                  <ShieldCheck className="w-6 h-6" />
                  Allow & Scan System
                </button>
              </div>
            </motion.div>
          )}

          {step === "SCANNING" && (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="text-center w-full max-w-xl bg-[rgba(10,14,24,0.3)] backdrop-blur-[80px] p-16 rounded-[3rem] border border-[rgba(255,255,255,0.08)] shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.2)]"
            >
              <div className="relative w-44 h-44 mx-auto mb-14">
                <div className="absolute inset-0 rounded-full border-4 border-[rgba(126,34,206,0.1)] shadow-inner"></div>
                <div 
                  className="absolute inset-0 rounded-full border-4 border-[#A855F7] border-t-transparent animate-spin drop-shadow-[0_0_15px_rgba(126,34,206,0.8)]"
                  style={{ animationDuration: '1s' }}
                ></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(126,34,206,0.02)] backdrop-blur-sm rounded-full m-2">
                  <span className="text-white font-black text-5xl drop-shadow-md">{scanProgress}%</span>
                </div>
              </div>
              <h3 className="text-3xl text-white font-extrabold mb-4 tracking-tight">Scanning Local Filesystem...</h3>
              <p className="text-[#D8B4FE] text-lg animate-pulse font-semibold">Searching C:\Program Files for {osName} modules</p>
              
              {/* Progress bar */}
              <div className="w-full h-3 bg-[rgba(0,0,0,0.5)] rounded-full mt-12 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] border border-[rgba(255,255,255,0.05)]">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#7E22CE] via-[#D8B4FE] to-[#7E22CE] rounded-full shadow-[0_0_20px_rgba(126,34,206,0.8)] relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ type: "tween" }}
                >
                   <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === "APPS" && (
            <motion.div 
              key="apps"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="w-full flex flex-col items-center max-w-6xl w-full"
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 mb-12 text-[#D8B4FE] bg-[rgba(126,34,206,0.1)] backdrop-blur-2xl px-10 py-4 rounded-full border border-[rgba(126,34,206,0.3)] shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)]"
              >
                <CheckCircle2 className="w-7 h-7 drop-shadow-[0_0_8px_rgba(126,34,206,0.8)]" />
                <span className="font-bold tracking-wide text-xl">Successfully synced {apps.length} applications from C:\</span>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 w-full">
                {apps.map((app, idx) => {
                  const AppIcon = app.icon;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05, y: -8 }}
                      className="flex flex-col items-center gap-6 p-8 rounded-[2rem] bg-transparent backdrop-blur-[60px] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] hover:bg-transparent transition-all cursor-pointer group shadow-[0_15px_35px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden"
                    >
                      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent skew-x-[-25deg] group-hover:animate-[sweep_2s_ease-in-out_infinite]" />
                      
                      <div className="w-24 h-24 rounded-[1.5rem] bg-gradient-to-br from-[rgba(126,34,206,0.15)] to-[rgba(4,6,11,0.5)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center group-hover:shadow-[0_0_40px_rgba(126,34,206,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)] group-hover:border-[rgba(126,34,206,0.4)] transition-all duration-300 relative">
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.03] transition-opacity rounded-[1.5rem]"></div>
                        <AppIcon className="w-12 h-12 text-[#D8B4FE] drop-shadow-[0_0_10px_rgba(126,34,206,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(192,132,252,1)] group-hover:scale-110 transition-all duration-300 relative z-10" />
                      </div>
                      <span className="text-gray-200 font-extrabold text-lg text-center group-hover:text-white transition-colors tracking-wide drop-shadow-sm">{app.name}</span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
          
        </AnimatePresence>
      </div>
    </div>
  );
}
