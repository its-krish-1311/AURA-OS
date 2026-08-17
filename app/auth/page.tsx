"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleOAuth = (provider: string) => {
    setIsLoading(true);
    signIn(provider, { callbackUrl: "/dashboard/chat" });
  };

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (res.ok) {
        toast.success("Verification code sent to your email!");
        setOtpSent(true);
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Sign In Flow
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("Welcome back to Aura OS!");
          router.push("/dashboard/chat");
        }
      } else {
        // Create Account Flow
        if (!otpSent) {
          toast.error("Please verify your email first");
          setIsLoading(false);
          return;
        }

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, otp }),
        });
        const data = await res.json();

        if (res.ok) {
          toast.success("Account created successfully!");
          // Auto sign-in after register
          const signInRes = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });
          if (!signInRes?.error) {
            router.push("/dashboard/chat");
          }
        } else {
          toast.error(data.error || "Registration failed");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 z-10 relative">
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-xl md:text-2xl font-ethno text-white tracking-widest flex items-center gap-3 hover:opacity-80 transition-opacity">
          <span className="text-[#A855F7]">✦</span> AURA OS
        </Link>
      </div>

      <div className="krish-glass p-8 md:p-10 rounded-3xl w-full max-w-md flex flex-col gap-8 shadow-2xl relative overflow-hidden">
        {/* Glow accent inside card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#A855F7]/30 blur-[60px] rounded-full pointer-events-none"></div>

        <div className="flex flex-col items-center text-center gap-2 relative z-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm text-gray-400">
            {isLogin 
              ? "Access your intelligent workspace." 
              : "Start your journey with Aura OS."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#A855F7] transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isLogin && otpSent}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#A855F7] transition-colors disabled:opacity-50"
              placeholder="name@company.com"
            />
          </div>

          {!isLogin && !otpSent && (
            <button 
              type="button" 
              onClick={handleSendOTP}
              disabled={isLoading || !email}
              className="w-full py-2.5 rounded-xl border border-[#A855F7]/40 text-[#D8B4FE] font-medium text-sm hover:bg-[#A855F7]/10 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Verification Code"}
            </button>
          )}

          {(!isLogin && otpSent) && (
            <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Verification Code (OTP)</label>
              <input 
                type="text" 
                required 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-black/40 border border-[#A855F7]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#A855F7] shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-colors text-center tracking-[0.5em] font-mono text-lg"
                placeholder="000000"
                maxLength={6}
              />
              <p className="text-[10px] text-gray-400 text-center mt-1">Check your server terminal if in DEV mode.</p>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#A855F7] transition-colors"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading || (!isLogin && !otpSent)}
            className="w-full py-3.5 mt-2 rounded-xl bg-white text-black font-bold tracking-wide hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
            ) : (
              isLogin ? "Sign In" : "Create Account"
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center z-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative bg-transparent px-4 text-xs text-gray-500 uppercase font-semibold">Or continue with</span>
        </div>

        <div className="flex gap-4 z-10 relative">
          <button 
            onClick={() => handleOAuth("google")}
            className="flex-1 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
          </button>
          <button 
            onClick={() => handleOAuth("apple")}
            className="flex-1 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05 1.8-3.08 1.8-1.09 0-1.44-.65-2.67-.65-1.2 0-1.63.63-2.65.65-1.07.02-2.25-.92-3.15-2.25C3.59 16.99 2.5 12.87 4.54 10.02c1.02-1.42 2.53-2.31 4.12-2.34 1.05-.02 2.04.7 2.68.7.63 0 1.94-.85 3.23-.73 1.37.13 2.58.73 3.38 1.89-2.92 1.77-2.45 6.06.49 7.23-.67 1.57-1.63 3.12-2.79 4.25V20.28zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.33 2.31-1.8 4.2-3.74 4.25z"/></svg>
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 z-10 relative">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setOtpSent(false); // reset state on switch
              setOtp("");
            }}
            className="text-white hover:text-[#A855F7] font-semibold transition-colors focus:outline-none"
          >
            {isLogin ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
