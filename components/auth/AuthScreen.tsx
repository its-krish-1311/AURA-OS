"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Mail, ArrowRight, Loader2, Command, AlertCircle } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface AuthScreenProps {
  onLogin: () => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSendOtp = async () => {
    if (!email || !password || (!isLogin && !name)) {
      setErrorMsg("Please fill in all fields");
      return;
    }
    
    setIsProcessing(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to send OTP");
      } else {
        setShowOtp(true);
        setSuccessMsg("OTP sent to your email!");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (isLogin) {
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (res?.error) {
          setErrorMsg(res.error);
        } else {
          onLogin();
        }
      } else {
        if (!showOtp) {
          await handleSendOtp();
          return;
        }

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name, otp }),
        });

        const data = await res.json();
        if (!res.ok) {
          setErrorMsg(data.error || "Registration failed");
        } else {
          const loginRes = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });
          if (loginRes?.error) {
            setErrorMsg(loginRes.error);
          } else {
            onLogin();
          }
        }
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9333EA] blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3B82F6] blur-[150px] opacity-10 pointer-events-none" />

      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: 0.2 }}
        className="w-full max-w-[420px] mx-4 relative"
      >
        <div className="p-8 rounded-[32px] border border-[rgba(168,85,247,0.2)] shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1)] relative overflow-hidden w-full max-w-md">
          
          {/* Top Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-6 flex items-center justify-center">
              <Image src="/logo.png" alt="Aura OS Logo" width={112} height={112} className="w-28 h-28 object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]" />
            </div>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A855F7] mb-2">
              {isLogin ? "Welcome Back" : (showOtp ? "Verify Email" : "Create Account")}
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin ? "Sign in to access your digital universe" : (showOtp ? "Enter the 6-digit code sent to your email" : "Join the most advanced AI operating system")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <AnimatePresence mode="popLayout">
              {!showOtp ? (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-4"
                >
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-30">
                      <Mail className="w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors duration-500" />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address" 
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.3)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-full py-3 pl-12 pr-4 text-sm text-white outline-none focus:bg-[rgba(255,255,255,0.1)] focus:border-white focus:shadow-[0_0_20px_rgba(255,255,255,0.2),inset_0_0_10px_rgba(255,255,255,0.05)] transition-all duration-500 relative z-20"
                    />
                  </div>

                  {!isLogin && (
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-30">
                        <User className="w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors duration-500" />
                      </div>
                      <input 
                        type="text" 
                        required={!isLogin}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name" 
                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.3)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-full py-3 pl-12 pr-4 text-sm text-white outline-none focus:bg-[rgba(255,255,255,0.1)] focus:border-white focus:shadow-[0_0_20px_rgba(255,255,255,0.2),inset_0_0_10px_rgba(255,255,255,0.05)] transition-all duration-500 relative z-20"
                      />
                    </div>
                  )}

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-30">
                      <Lock className="w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors duration-500" />
                    </div>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password" 
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.3)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-full py-3 pl-12 pr-4 text-sm text-white outline-none focus:bg-[rgba(255,255,255,0.1)] focus:border-white focus:shadow-[0_0_20px_rgba(255,255,255,0.2),inset_0_0_10px_rgba(255,255,255,0.05)] transition-all duration-500 relative z-20"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col gap-4"
                >
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-30">
                      <Lock className="w-5 h-5 text-[#A855F7] group-focus-within:text-white transition-colors" />
                    </div>
                    <input 
                      type="text" 
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="6-Digit OTP" 
                      className="w-full bg-[rgba(168,85,247,0.1)] border border-[#A855F7] shadow-[0_0_15px_rgba(168,85,247,0.2),inset_0_1px_2px_rgba(255,255,255,0.1)] rounded-full py-3 pl-12 pr-4 text-xl tracking-[0.5em] text-center text-white outline-none focus:bg-[rgba(168,85,247,0.2)] focus:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all relative z-20 font-mono"
                    />
                  </div>
                  <button type="button" onClick={() => setShowOtp(false)} className="text-xs text-gray-400 hover:text-white transition-colors text-center">
                    Change Email
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-2 rounded-lg mt-1"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{errorMsg}</p>
              </motion.div>
            )}

            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-4 py-2 rounded-lg mt-1"
              >
                <Command className="w-4 h-4 flex-shrink-0" />
                <p>{successMsg}</p>
              </motion.div>
            )}

            {!showOtp && isLogin && (
              <div className="flex justify-end mt-[-4px]">
                <button type="button" className="text-xs text-gray-400 hover:text-[#A855F7] transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isProcessing}
              className="relative group/btn w-full bg-gradient-to-r from-[#9333EA] to-[#A855F7] hover:from-[#A855F7] hover:to-[#C084FC] text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 overflow-hidden"
            >
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.3)] to-transparent skew-x-[-25deg] group-hover/btn:animate-[sweep_1s_ease-in-out]" />
              
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : (showOtp ? "Verify & Join" : "Continue")} 
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[rgba(255,255,255,0.1)]"></div>
            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[rgba(255,255,255,0.1)]"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => window.open('https://accounts.google.com/AccountChooser', '_blank', 'width=500,height=600,left=200,top=100')}
              className="relative overflow-hidden flex-1 flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.2)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] rounded-full py-3 hover:bg-[rgba(168,85,247,0.05)] hover:border-[rgba(168,85,247,0.4)] hover:shadow-[0_0_15px_rgba(168,85,247,0.15),inset_0_1px_2px_rgba(255,255,255,0.1)] transition-all duration-300 group hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.12)] to-transparent skew-x-[-25deg] group-hover:animate-[sweep_1s_ease-in-out] pointer-events-none z-10" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 group-hover:scale-110 transition-transform relative z-20">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <span className="text-sm font-semibold text-white relative z-20">Google</span>
            </button>
            <button 
              onClick={() => window.open('https://appleid.apple.com/sign-in', '_blank', 'width=500,height=600,left=200,top=100')}
              className="relative overflow-hidden flex-1 flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(168,85,247,0.2)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] rounded-full py-3 hover:bg-[rgba(168,85,247,0.05)] hover:border-[rgba(168,85,247,0.4)] hover:shadow-[0_0_15px_rgba(168,85,247,0.15),inset_0_1px_2px_rgba(255,255,255,0.1)] transition-all duration-300 group hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.12)] to-transparent skew-x-[-25deg] group-hover:animate-[sweep_1s_ease-in-out] pointer-events-none z-10" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="white" className="w-5 h-5 group-hover:scale-110 transition-transform pb-1 relative z-20">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <span className="text-sm font-semibold text-white relative z-20">Apple</span>
            </button>
          </div>

          <div className="mt-2 text-center">
            <p className="text-gray-400 text-xs">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={() => { setIsLogin(!isLogin); setErrorMsg(""); setSuccessMsg(""); setShowOtp(false); }} 
                className="text-[#A855F7] font-semibold hover:underline focus:outline-none"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
