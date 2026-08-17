import Link from 'next/link';

export default function FeaturesDocs() {
  return (
    <main className="min-h-screen flex flex-col font-sans relative overflow-hidden bg-[#04060B]">
      
      {/* Top Header */}
      <header className="relative z-50 w-full px-8 py-6 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link href="/">
            <div className="flex flex-col shrink-0 hover:opacity-80 transition-opacity">
              <div className="text-xl md:text-2xl font-ethno text-white tracking-widest flex items-center gap-3">
                <span className="text-[#A855F7]">✦</span> AURA OS
              </div>
              <span className="text-[10px] text-gray-400 tracking-[0.3em] pl-8 mt-1 uppercase font-semibold">Platform Docs</span>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="/auth">
            <button className="text-sm font-bold tracking-wide text-white bg-[#A855F7] hover:bg-[#9333EA] px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] transform active:scale-95 flex items-center gap-2">
              Open Workspace
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto flex flex-1 h-[calc(100vh-88px)]">
        
        {/* Sidebar Nav */}
        <aside className="w-72 hidden lg:flex flex-col gap-8 p-8 border-r border-white/5 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Core Infrastructure</h3>
            <a href="#auth" className="text-sm text-gray-300 hover:text-white transition-colors">Authentication & Security</a>
            <a href="#workspaces" className="text-sm text-gray-300 hover:text-white transition-colors">Workspaces & Billing</a>
            <a href="#api" className="text-sm text-gray-300 hover:text-white transition-colors">API Keys</a>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Dashboard Ecosystem</h3>
            <a href="#chat" className="text-sm text-gray-300 hover:text-white transition-colors">Conversational AI (Chat)</a>
            <a href="#agents" className="text-sm text-gray-300 hover:text-white transition-colors">Autonomous Agents</a>
            <a href="#code" className="text-sm text-gray-300 hover:text-white transition-colors">Cloud Coding Workspace</a>
            <a href="#train" className="text-sm text-gray-300 hover:text-white transition-colors">Train Siya UI</a>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Siya AI Intelligence</h3>
            <a href="#memory" className="text-sm text-gray-300 hover:text-white transition-colors">Deep Memory & RAG</a>
            <a href="#personas" className="text-sm text-gray-300 hover:text-white transition-colors">The 5 Chat Personas</a>
            <a href="#models" className="text-sm text-gray-300 hover:text-white transition-colors">The 5 Siya Models</a>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Aura OS Ecosystem</h3>
            <a href="#study-os" className="text-sm text-gray-300 hover:text-white transition-colors">Study OS</a>
            <a href="#specialized-agents" className="text-sm text-gray-300 hover:text-white transition-colors">Specialized Agents</a>
            <a href="#complain-box" className="text-sm text-gray-300 hover:text-white transition-colors">Complain Box</a>
          </div>
        </aside>

        {/* Documentation Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-14 custom-scrollbar scroll-smooth">
          <div className="max-w-4xl flex flex-col gap-20 pb-32">
            
            {/* Header section */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/30 w-max">
                <span className="text-[#A855F7] text-xs animate-pulse">●</span>
                <span className="text-[10px] font-semibold tracking-widest text-[#D8B4FE] uppercase">Full System Architecture</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Aura OS: Comprehensive Documentation
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed font-light">
                Explore the complete A-Z technical breakdown of the Aura OS platform. From core PostgreSQL schema architecture to the advanced multi-agent Siya AI intelligence layer and the broader app ecosystem.
              </p>
            </div>

            {/* =========================================
                SECTION 1: CORE INFRASTRUCTURE
               ========================================= */}
            <div className="flex flex-col gap-12">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">🏗️</div>
                <h2 className="text-3xl font-bold text-white">Core Infrastructure</h2>
              </div>

              {/* Auth */}
              <section id="auth" className="scroll-mt-10">
                <h3 className="text-2xl font-semibold text-white mb-4">Authentication & Security</h3>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Aura OS uses an industry-standard secure authentication flow backed by NextAuth. It supports multiple strategies mapped directly to our PostgreSQL <code className="text-[#A855F7]">User</code> and <code className="text-[#A855F7]">Account</code> models.
                  </p>
                  <ul className="flex flex-col gap-4 text-sm text-gray-400">
                    <li className="flex items-start gap-3">
                      <span className="text-[#A855F7] mt-1">✦</span>
                      <div><strong className="text-gray-200">OAuth Providers:</strong> Seamless integration with third-party providers (Google, GitHub) generating secure <code className="text-xs bg-black/50 px-1 rounded">Session</code> tokens.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#A855F7] mt-1">✦</span>
                      <div><strong className="text-gray-200">OTP Verification:</strong> Native One-Time Password verification utilizing the <code className="text-xs bg-black/50 px-1 rounded">OTP</code> model for passwordless magic links.</div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#A855F7] mt-1">✦</span>
                      <div><strong className="text-gray-200">Verification Tokens:</strong> Secure token generation mapped via the <code className="text-xs bg-black/50 px-1 rounded">VerificationToken</code> schema to prevent replay attacks.</div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Workspaces */}
              <section id="workspaces" className="scroll-mt-10">
                <h3 className="text-2xl font-semibold text-white mb-4">Workspaces & Billing</h3>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    The platform is heavily multi-tenant. Every user can own or belong to multiple <code className="text-[#A855F7]">Workspace</code> environments.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-black/30 border border-white/5">
                      <h4 className="text-white font-medium mb-2">Team Roles</h4>
                      <p className="text-sm text-gray-400">The <code className="text-xs bg-white/10 px-1 rounded">WorkspaceMember</code> schema dictates access (Admin, Member). Users can seamlessly switch environments without logging out.</p>
                    </div>
                    <div className="p-5 rounded-xl bg-black/30 border border-white/5">
                      <h4 className="text-white font-medium mb-2">Stripe Subscriptions</h4>
                      <p className="text-sm text-gray-400">The <code className="text-xs bg-white/10 px-1 rounded">Subscription</code> schema tracks <code className="text-white">FREE</code>, <code className="text-white">PRO</code>, and <code className="text-white">ENTERPRISE</code> tiers, mapping directly to <code className="text-xs">stripeCustomerId</code>.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* API */}
              <section id="api" className="scroll-mt-10">
                <h3 className="text-2xl font-semibold text-white mb-4">API Keys</h3>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                  <p className="text-gray-300 leading-relaxed">
                    Workspaces can generate unique secure tokens via the <code className="text-[#A855F7]">ApiKey</code> model. These keys allow programmatic access to Siya AI endpoints, enabling developers to integrate Aura OS intelligence into external CI/CD pipelines or custom applications.
                  </p>
                </div>
              </section>
            </div>


            {/* =========================================
                SECTION 2: DASHBOARD ECOSYSTEM
               ========================================= */}
            <div className="flex flex-col gap-12 mt-10">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">🌐</div>
                <h2 className="text-3xl font-bold text-white">Dashboard Ecosystem</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Chat */}
                <section id="chat" className="scroll-mt-10">
                  <div className="h-full p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-[#A855F7]/30 transition-colors">
                    <div className="text-3xl mb-4">💬</div>
                    <h3 className="text-xl font-medium text-white mb-2">Conversational AI</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Powered by the <code className="bg-black/50 px-1 rounded">Conversation</code> and <code className="bg-black/50 px-1 rounded">Message</code> models. Aura OS stores multi-turn histories persistently, differentiating between 'user', 'assistant', 'system', and 'data' roles.
                    </p>
                  </div>
                </section>

                {/* Agents */}
                <section id="agents" className="scroll-mt-10">
                  <div className="h-full p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-[#A855F7]/30 transition-colors">
                    <div className="text-3xl mb-4">🤖</div>
                    <h3 className="text-xl font-medium text-white mb-2">Autonomous Agents</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Dedicated pipelines where agents run in the background. Provide a high-level goal, and the agents will iteratively plan, execute, and verify code without human intervention.
                    </p>
                  </div>
                </section>

                {/* Code */}
                <section id="code" className="scroll-mt-10">
                  <div className="h-full p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-[#A855F7]/30 transition-colors">
                    <div className="text-3xl mb-4">💻</div>
                    <h3 className="text-xl font-medium text-white mb-2">Cloud Coding</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      An integrated IDE interface. Instead of switching to VS Code, write, run, and preview applications directly within Aura OS while Siya AI assists in real-time.
                    </p>
                  </div>
                </section>

                {/* Train */}
                <section id="train" className="scroll-mt-10">
                  <div className="h-full p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-[#A855F7]/30 transition-colors">
                    <div className="text-3xl mb-4">🧠</div>
                    <h3 className="text-xl font-medium text-white mb-2">Train Siya UI</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      A dedicated dashboard panel for managing Siya's neural knowledge base. Toggle auto-memory, view vector embeddings, and curate explicit facts you've taught the AI.
                    </p>
                  </div>
                </section>
              </div>
            </div>

            {/* =========================================
                SECTION 3: SIYA AI INTELLIGENCE
               ========================================= */}
            <div className="flex flex-col gap-12 mt-10">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">✨</div>
                <h2 className="text-3xl font-bold text-white">Siya AI Intelligence</h2>
              </div>

              {/* Memory & RAG */}
              <section id="memory" className="scroll-mt-10">
                <h3 className="text-2xl font-semibold text-white mb-4">Deep Memory & RAG Architecture</h3>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Aura OS does not suffer from amnesia. It implements a highly advanced Retrieval-Augmented Generation (RAG) system utilizing vector embeddings.
                  </p>
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4">
                      <div className="mt-1 text-[#A855F7]">✦</div>
                      <div>
                        <h4 className="text-white font-medium text-lg">SiyaSettings & Auto-Memory</h4>
                        <p className="text-sm text-gray-400 mt-1">The <code className="text-[#D8B4FE]">SiyaSetting</code> database table allows fine-grained control. Siya can automatically detect user preferences during chat and save them. You can configure her to <strong className="text-white">Ask Before Remembering</strong> or adjust her Response Style seamlessly.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="mt-1 text-[#A855F7]">✦</div>
                      <div>
                        <h4 className="text-white font-medium text-lg">Knowledge Sources (PDF, TXT)</h4>
                        <p className="text-sm text-gray-400 mt-1">Users can upload massive documents. The <code className="text-[#D8B4FE]">KnowledgeSource</code> table tracks the upload, parses the file, chunks the text, and generates embeddings for instant contextual retrieval.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="mt-1 text-[#A855F7]">✦</div>
                      <div>
                        <h4 className="text-white font-medium text-lg">Vector Embeddings</h4>
                        <p className="text-sm text-gray-400 mt-1">Every explicit or implicit memory is stored in the <code className="text-[#D8B4FE]">Memory</code> table with an associated embedding (JSON stringified float array) and category (Goal, Project, Personal, etc.), guaranteeing extreme precision using Cosine Similarity.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Personas */}
              <section id="personas" className="scroll-mt-10">
                <h3 className="text-2xl font-semibold text-white mb-4">The 5 Chat Personas</h3>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#A855F7]/20 blur-[100px] pointer-events-none rounded-full"></div>
                  <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                    Siya AI isn't just one identity. The API dynamically routes system prompts to completely alter her behavior based on your selection:
                  </p>
                  
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                    <li className="p-4 bg-black/40 rounded-xl border border-white/5">
                      <h4 className="text-white font-medium">Developer Siya</h4>
                      <p className="text-gray-400 text-sm mt-1">An elite coding assistant focused on rigorous bug fixing and architecture.</p>
                    </li>
                    <li className="p-4 bg-black/40 rounded-xl border border-white/5">
                      <h4 className="text-white font-medium">Designer Siya</h4>
                      <p className="text-gray-400 text-sm mt-1">Focuses on aesthetics, accessibility, color theory, and Tailwind UI/UX.</p>
                    </li>
                    <li className="p-4 bg-black/40 rounded-xl border border-white/5">
                      <h4 className="text-white font-medium">Siya Think</h4>
                      <p className="text-gray-400 text-sm mt-1">An analytical AI that breaks complex problems down via first principles.</p>
                    </li>
                    <li className="p-4 bg-black/40 rounded-xl border border-white/5">
                      <h4 className="text-white font-medium">Startup Siya</h4>
                      <p className="text-gray-400 text-sm mt-1">A ruthless and brilliant strategist for growth hacking and VC pitching.</p>
                    </li>
                    <li className="p-4 bg-black/40 rounded-xl border border-white/5 md:col-span-2">
                      <h4 className="text-white font-medium">Siya Personal</h4>
                      <p className="text-gray-400 text-sm mt-1">An empathetic digital companion providing warm, encouraging, and supportive advice.</p>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Models */}
              <section id="models" className="scroll-mt-10">
                <h3 className="text-2xl font-semibold text-white mb-4">The 5 Siya Models</h3>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                  <p className="text-gray-300 leading-relaxed mb-8">
                    To balance operational cost, latency, and reasoning capability, Aura OS dynamically routes tasks across a proprietary 5-model fleet architecture:
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    <div className="p-5 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-white font-medium text-lg">1. Mini Siya</h4>
                        <p className="text-gray-400 text-sm mt-1">The ultra-fast, lightweight model designed for blazing fast autocomplete and simple text queries.</p>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] uppercase font-bold tracking-widest border border-cyan-500/20 whitespace-nowrap">Speed</span>
                    </div>
                    
                    <div className="p-5 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-white font-medium text-lg">2. Siya Air</h4>
                        <p className="text-gray-400 text-sm mt-1">Perfectly balanced performance for everyday conversational chat and standard workflow tasks.</p>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] uppercase font-bold tracking-widest border border-blue-500/20 whitespace-nowrap">Balanced</span>
                    </div>

                    <div className="p-5 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-white font-medium text-lg">3. Siya Edge</h4>
                        <p className="text-gray-400 text-sm mt-1">Optimized for privacy-first, on-device execution to handle sensitive data without leaving your local environment.</p>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-[10px] uppercase font-bold tracking-widest border border-green-500/20 whitespace-nowrap">Local / Private</span>
                    </div>

                    <div className="p-5 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-white font-medium text-lg">4. Siya One</h4>
                        <p className="text-gray-400 text-sm mt-1">The flagship reasoning model. Excels at complex logic, deep coding, and autonomous workflow execution.</p>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-[#A855F7]/10 text-[#D8B4FE] text-[10px] uppercase font-bold tracking-widest border border-[#A855F7]/30 whitespace-nowrap">Pro Reasoning</span>
                    </div>

                    <div className="p-5 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-white font-medium text-lg">5. Siya Atlas</h4>
                        <p className="text-gray-400 text-sm mt-1">The massive, ultra-advanced architecture model. Used for full-codebase generation and multi-agent orchestration.</p>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] uppercase font-bold tracking-widest border border-orange-500/20 whitespace-nowrap">Maximum Power</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* =========================================
                SECTION 4: AURA OS ECOSYSTEM
               ========================================= */}
            <div className="flex flex-col gap-12 mt-10">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">🌍</div>
                <h2 className="text-3xl font-bold text-white">Aura OS Ecosystem</h2>
              </div>

              {/* Study OS */}
              <section id="study-os" className="scroll-mt-10">
                <h3 className="text-2xl font-semibold text-white mb-4">Study OS: Intelligent Learning</h3>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Aura OS extends beyond productivity into deep learning with <strong className="text-[#D8B4FE]">Study OS</strong>. A dedicated environment engineered to accelerate how you learn, retain, and apply new information.
                  </p>
                  
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <li className="p-4 bg-black/40 rounded-xl border border-white/5">
                      <div className="text-2xl mb-2">📚</div>
                      <h4 className="text-white font-medium">Auto-Notes & Flashcards</h4>
                      <p className="text-gray-400 text-sm mt-1">Upload a lecture PDF or video. Study OS automatically generates structured notes and active-recall flashcards.</p>
                    </li>
                    <li className="p-4 bg-black/40 rounded-xl border border-white/5">
                      <div className="text-2xl mb-2">🎯</div>
                      <h4 className="text-white font-medium">Focus Workspaces</h4>
                      <p className="text-gray-400 text-sm mt-1">Distraction-free modes with Pomodoro integration and real-time biometric/cognitive load tracking.</p>
                    </li>
                    <li className="p-4 bg-black/40 rounded-xl border border-white/5 md:col-span-2">
                      <div className="text-2xl mb-2">🧠</div>
                      <h4 className="text-white font-medium">Socratic Tutor</h4>
                      <p className="text-gray-400 text-sm mt-1">Siya acts as a Socratic tutor—rather than giving you the answer, she guides you to solve complex math or programming problems yourself.</p>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Specialized Agents */}
              <section id="specialized-agents" className="scroll-mt-10">
                <h3 className="text-2xl font-semibold text-white mb-4">Specialized Agents Fleet</h3>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md relative overflow-hidden">
                  <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                    Beyond the core 5 Chat Personas, Aura OS deploys a fleet of highly specialized, fully autonomous background agents that execute tasks without human intervention.
                  </p>
                  
                  <ul className="flex flex-col gap-5 relative z-10">
                    <li className="flex gap-3">
                      <span className="text-[#A855F7] mt-1">✦</span>
                      <div>
                        <h4 className="text-white font-medium">DevOps Agent</h4>
                        <p className="text-gray-400 text-sm mt-1">Monitors server health, automatically scales instances, and rolls back failed deployments in real-time.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#A855F7] mt-1">✦</span>
                      <div>
                        <h4 className="text-white font-medium">Research Agent</h4>
                        <p className="text-gray-400 text-sm mt-1">Scours the web, reads through hundreds of academic papers, and compiles massive synthesis reports.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#A855F7] mt-1">✦</span>
                      <div>
                        <h4 className="text-white font-medium">Marketing Agent</h4>
                        <p className="text-gray-400 text-sm mt-1">Drafts copy, schedules social media posts, and analyzes A/B test conversion metrics autonomously.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Complain Box */}
              <section id="complain-box" className="scroll-mt-10">
                <h3 className="text-2xl font-semibold text-white mb-4">Complain Box & Support Ticketing</h3>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    No operating system is perfect. The <strong className="text-[#D8B4FE]">Complain Box</strong> is an AI-driven ticketing and feedback resolution system built directly into Aura OS to handle user issues proactively.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5">
                      <div className="text-3xl mb-4">📝</div>
                      <h3 className="text-lg font-medium text-white mb-2">Instant Ticketing</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Log issues or feature requests instantly. Siya AI categorizes, prioritizes, and routes the complaint to the right engineering queue.
                      </p>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5">
                      <div className="text-3xl mb-4">🛠️</div>
                      <h3 className="text-lg font-medium text-white mb-2">Auto-Triage</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Known bugs are matched against the internal knowledge base, often providing the user with an instant workaround or patch fix.
                      </p>
                    </div>
                    <div className="p-5 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5">
                      <div className="text-3xl mb-4">📈</div>
                      <h3 className="text-lg font-medium text-white mb-2">Sentiment Tracking</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        The system tracks user sentiment and frustration levels across chats, automatically escalating critical complaints to human admins.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </div>
      </div>
      
    </main>
  );
}
