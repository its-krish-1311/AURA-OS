import Link from 'next/link';
import dynamic from 'next/dynamic';
import TypewriterHeading from "@/components/ui/TypewriterHeading";
import SmoothButton from "@/components/ui/SmoothButton";

const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 border-4 border-[#A855F7]/30 border-t-[#A855F7] rounded-full animate-spin"></div>
    </div>
  )
});

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden relative font-sans">

      {/* Top Header */}
      <header className="absolute top-0 left-0 w-full px-8 py-6 z-50 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col shrink-0">
          <div className="text-xl md:text-2xl font-ethno text-white tracking-widest flex items-center gap-3">
            <span className="text-[#A855F7]">✦</span> AURA OS
          </div>
          <span className="text-[10px] text-gray-400 tracking-[0.3em] pl-8 mt-1 uppercase font-semibold">AI Operating System</span>
        </div>

        {/* Navigation Links (Hidden on mobile) */}
        <nav className="hidden lg:flex items-center gap-10">
          <div className="relative flex flex-col items-center">
            <Link href="/" className="text-white text-sm font-semibold tracking-wide transition-colors">Home</Link>
            <div className="absolute -bottom-2 w-4 h-[3px] rounded-full bg-gradient-to-r from-[#D8B4FE] to-[#A855F7]"></div>
          </div>
          <Link href="#features" className="text-gray-300 hover:text-white text-sm font-medium tracking-wide transition-colors">Features</Link>
          <Link href="#modules" className="text-gray-300 hover:text-white text-sm font-medium tracking-wide transition-colors">Modules</Link>
          <Link href="#pricing" className="text-gray-300 hover:text-white text-sm font-medium tracking-wide transition-colors">Pricing</Link>
          <Link href="#docs" className="text-gray-300 hover:text-white text-sm font-medium tracking-wide transition-colors">Docs</Link>
          <Link href="#community" className="text-gray-300 hover:text-white text-sm font-medium tracking-wide transition-colors">Community</Link>
        </nav>

        {/* Right Side Action */}
        <div className="hidden md:flex items-center gap-6 shrink-0">
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          </button>
          <Link href="/auth" className="text-sm font-medium tracking-wide text-white hover:text-gray-300 transition-colors">
            Sign In
          </Link>
          <Link href="/auth">
            <SmoothButton variant="primary" size="md">
              Get Started <span className="text-lg leading-none">→</span>
            </SmoothButton>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column (Text Content) */}
        <div className="flex flex-col gap-6 text-left relative z-20 pt-32 lg:pt-20">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 w-max mb-2">
            <span className="text-[#D8B4FE] text-sm">✨</span>
            <span className="text-[11px] font-semibold tracking-widest text-gray-300 uppercase">AI-Powered Everything</span>
          </div>

          <TypewriterHeading />
          
          <p className="text-gray-400 text-lg max-w-lg leading-relaxed font-light mt-2">
            Elevate your daily workflow with an intelligent operating system that does the heavy lifting for you. Seamlessly plan, create, code, and automate your entire workflow in one unified AI workspace.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Link href="/auth">
              <SmoothButton variant="primary" size="lg">
                Start Your Journey <span className="text-lg leading-none">→</span>
              </SmoothButton>
            </Link>
            
            <Link href="/features">
              <SmoothButton variant="glass" size="lg">
                Explore Features <span className="text-xs">▶</span>
              </SmoothButton>
            </Link>
          </div>



        </div>

        {/* Right Column (Spline 3D Orb) */}
        <div className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center pointer-events-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#A855F7] rounded-full blur-[140px] opacity-15 pointer-events-none"></div>
          
          <div className="w-full h-full relative z-10 transform lg:scale-95">
            <Spline
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
              className="w-full h-full"
            />
          </div>
        </div>
        
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#A855F7]/10 to-transparent pointer-events-none"></div>
    </main>
  );
}
