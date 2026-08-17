"use client";

import React from "react";
import { 
  Code2, 
  TerminalSquare, 
  MonitorPlay, 
  Bug, 
  Database, 
  GitBranch,
  Play,
  Square,
  FilePlus,
  Save,
  Rocket,
  Folder,
  FolderOpen,
  FileText,
  FileCode2,
  FileJson,
  File,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Terminal,
  Cpu,
  Clock,
  MessageSquare
} from "lucide-react";

export default function CodeAgentPage() {
  return (
    <div className="h-full flex flex-col p-4 sm:p-6 text-gray-300">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 bg-[#111116] border border-white/[0.05] rounded-2xl p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 p-[1px]">
            <div className="w-full h-full bg-[#05050A] rounded-full flex items-center justify-center">
              <img src="https://i.pravatar.cc/150?img=47" alt="Siya Dev" className="w-full h-full rounded-full opacity-80 mix-blend-screen" />
            </div>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg flex items-center gap-3">
              Siya Dev – Code Agent
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </span>
            </h2>
            <p className="text-gray-500 text-sm">Autonomous Coding Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium transition-all">
            <Play className="w-4 h-4" /> Run
          </button>
          <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium transition-all">
            <Square className="w-4 h-4 fill-current" /> Stop
          </button>
          <div className="w-px h-6 bg-white/10 mx-2"></div>
          <button className="bg-[#1C1C24] hover:bg-[#252530] text-gray-300 border border-white/[0.05] rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium transition-all">
            <FilePlus className="w-4 h-4" /> New File
          </button>
          <button className="bg-[#1C1C24] hover:bg-[#252530] text-gray-300 border border-white/[0.05] rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium transition-all">
            <Save className="w-4 h-4" /> Save
          </button>
          <button className="bg-[#1C1C24] hover:bg-[#252530] text-gray-300 border border-white/[0.05] rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium transition-all">
            <Rocket className="w-4 h-4" /> Deploy
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-white/[0.05] pb-2">
        <button className="px-4 py-2 text-purple-400 border-b-2 border-purple-500 font-medium text-sm flex items-center gap-2">
          <Code2 className="w-4 h-4" /> Code
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-300 font-medium text-sm flex items-center gap-2 transition-colors">
          <TerminalSquare className="w-4 h-4" /> Terminal
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-300 font-medium text-sm flex items-center gap-2 transition-colors">
          <MonitorPlay className="w-4 h-4" /> Preview
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-300 font-medium text-sm flex items-center gap-2 transition-colors">
          <Bug className="w-4 h-4" /> Debug
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-300 font-medium text-sm flex items-center gap-2 transition-colors">
          <Database className="w-4 h-4" /> Database
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-300 font-medium text-sm flex items-center gap-2 transition-colors">
          <GitBranch className="w-4 h-4" /> Git
        </button>
      </div>

      {/* IDE Workspace */}
      <div className="flex-1 flex gap-4 min-h-0">
        
        {/* Explorer Panel */}
        <div className="w-64 bg-[#111116] border border-white/[0.05] rounded-xl flex flex-col overflow-hidden shrink-0">
          <div className="px-4 py-3 border-b border-white/[0.05] flex items-center justify-between bg-[#0A0A0E]">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Explorer</span>
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 overflow-y-auto p-2 text-sm font-mono custom-scrollbar">
            
            <div className="flex items-center gap-1.5 px-2 py-1.5 text-gray-300 cursor-pointer">
              <ChevronDown className="w-4 h-4" />
              <FolderOpen className="w-4 h-4 text-blue-400" />
              <span>krish-os</span>
            </div>
            
            <div className="ml-4">
              <div className="flex items-center gap-1.5 px-2 py-1.5 text-gray-400 hover:text-gray-200 cursor-pointer">
                <ChevronRight className="w-4 h-4" />
                <Folder className="w-4 h-4 text-gray-500" />
                <span>src</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 text-gray-400 hover:text-gray-200 cursor-pointer">
                <ChevronRight className="w-4 h-4" />
                <Folder className="w-4 h-4 text-gray-500" />
                <span>components</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 text-purple-400 bg-purple-500/10 rounded cursor-pointer">
                <div className="w-4"></div>
                <FileCode2 className="w-4 h-4" />
                <span>index.py</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 text-gray-400 hover:text-gray-200 cursor-pointer">
                <div className="w-4"></div>
                <FileCode2 className="w-4 h-4 text-yellow-500" />
                <span>app.py</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 text-gray-400 hover:text-gray-200 cursor-pointer">
                <div className="w-4"></div>
                <FileText className="w-4 h-4 text-gray-300" />
                <span>requirements.txt</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 text-gray-400 hover:text-gray-200 cursor-pointer">
                <div className="w-4"></div>
                <File className="w-4 h-4 text-blue-300" />
                <span>README.md</span>
              </div>
            </div>

          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-[2] bg-[#0A0A0F] border border-white/[0.05] rounded-xl flex flex-col overflow-hidden">
          <div className="flex items-center bg-[#111116] border-b border-white/[0.05]">
            <div className="px-4 py-2.5 bg-[#0A0A0F] border-r border-white/[0.05] border-t-2 border-t-purple-500 flex items-center gap-2 text-sm text-gray-200">
              <FileCode2 className="w-4 h-4 text-purple-400" /> index.py
            </div>
          </div>
          <div className="flex-1 p-4 font-mono text-[13px] leading-relaxed overflow-auto custom-scrollbar relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#111116] border-r border-white/[0.02] flex flex-col text-right pr-3 pt-4 text-gray-600 select-none">
              {Array.from({length: 15}).map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <div className="pl-12">
              <div className="text-gray-500 italic"># Initialize Data Processing</div>
              <div><span className="text-purple-400">import</span> pandas <span className="text-purple-400">as</span> pd</div>
              <div><span className="text-purple-400">import</span> numpy <span className="text-purple-400">as</span> np</div>
              <br/>
              <div><span className="text-purple-400">def</span> <span className="text-blue-400">analyze_data</span>(file_path):</div>
              <div className="pl-4">df = pd.<span className="text-blue-400">read_csv</span>(file_path)</div>
              <div className="pl-4"><span className="text-yellow-300">print</span>(<span className="text-green-400">"Shape:"</span>, df.shape)</div>
              <div className="pl-4"><span className="text-yellow-300">print</span>(<span className="text-green-400">"Columns:"</span>, df.columns.tolist())</div>
              <div className="pl-4"><span className="text-yellow-300">print</span>(<span className="text-green-400">"Missing Values:"</span>, df.isnull().sum().sum())</div>
              <div className="pl-4"><span className="text-yellow-300">print</span>(<span className="text-green-400">"Summary Statistics:"</span>)</div>
              <div className="pl-4"><span className="text-yellow-300">print</span>(df.describe())</div>
              <br/>
              <div className="pl-4"><span className="text-purple-400">return</span> df</div>
              <br/>
              <div className="text-gray-500 italic"># Run</div>
              <div>result = <span className="text-blue-400">analyze_data</span>(<span className="text-green-400">'data.csv'</span>)</div>
            </div>
          </div>
        </div>

        {/* Output & Console */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1 bg-[#111116] border border-white/[0.05] rounded-xl flex flex-col overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.05] bg-[#0A0A0E]">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Output</span>
            </div>
            <div className="flex-1 p-4 font-mono text-[12px] text-gray-300 overflow-auto custom-scrollbar">
              <div>Shape: (1000, 5)</div>
              <div>Columns: ['A', 'B', 'C', 'D', 'E']</div>
              <div>Missing Values:</div>
              <div>A      0</div>
              <div>B      2</div>
              <div>C      0</div>
              <div>D      5</div>
              <div>E      0</div>
              <div>dtype: int64</div>
              <div>Summary Statistics:</div>
              <div className="text-gray-500">
                {'       '}A       B       C       D       E<br/>
                count 1000.0  998.0  1000.0  995.0  1000.0<br/>
                mean    50.2   32.6    65.1   24.1    73.5<br/>
                std     12.4    8.9    15.2    6.7    11.0<br/>
                min     10.0    5.0    20.0    8.0    30.0<br/>
              </div>
            </div>
          </div>

          <div className="h-48 bg-[#111116] border border-white/[0.05] rounded-xl flex flex-col overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.05] bg-[#0A0A0E]">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Console</span>
            </div>
            <div className="flex-1 p-4 font-mono text-[12px] overflow-auto custom-scrollbar">
              <div className="flex gap-2 text-gray-400 mb-1">
                <span className="text-gray-600">[10:31:02]</span> File loaded successfully
              </div>
              <div className="flex gap-2 text-gray-400 mb-1">
                <span className="text-gray-600">[10:31:04]</span> Running index.py
              </div>
              <div className="flex gap-2 text-green-400">
                <span className="text-gray-600">[10:31:05]</span> Analysis Complete ✓
              </div>
            </div>
            <div className="px-4 py-2 border-t border-white/[0.05] bg-[#0A0A0E] flex items-center">
              <span className="text-purple-400 mr-2">❯</span>
              <input type="text" placeholder="Type a command..." className="bg-transparent border-none outline-none text-sm w-full text-gray-300 placeholder-gray-600" />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Shortcuts & Summary */}
        <div className="w-56 flex flex-col gap-4 shrink-0">
          
          <div className="bg-[#111116] border border-white/[0.05] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <Command className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">Shortcuts</span>
            </div>
            <div className="space-y-3 text-[11px] font-mono">
              <div className="flex items-center justify-between text-gray-400"><span className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">⌘ N</span> New Chat</div>
              <div className="flex items-center justify-between text-gray-400"><span className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">⌘ K</span> Command Palette</div>
              <div className="flex items-center justify-between text-gray-400"><span className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">⌘ J</span> Search Chats</div>
              <div className="flex items-center justify-between text-gray-400"><span className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">⌘ R</span> Regenerate</div>
              <div className="flex items-center justify-between text-gray-400"><span className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">⌘ S</span> Settings</div>
            </div>
          </div>

          <div className="bg-[#111116] border border-white/[0.05] rounded-xl p-4 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">Today's Summary</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <div className="text-[10px] text-gray-500 uppercase">Chats</div>
                <div className="text-lg font-bold text-white">12</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase">Messages</div>
                <div className="text-lg font-bold text-white">245</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase">Tokens</div>
                <div className="text-lg font-bold text-white">45.2K</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase">Time Saved</div>
                <div className="text-lg font-bold text-white">2.4 hrs</div>
              </div>
            </div>
            <div className="mt-auto">
              <p className="text-[11px] text-gray-500 italic leading-relaxed text-center">
                "The best way to predict the future is to invent it."<br/>- Alan Kay
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function Command(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  );
}
