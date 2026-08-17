'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming they have cn from shadcn/ui or tailwind-merge, I should check if it exists or use standard twMerge

interface SmoothButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function SmoothButton({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: SmoothButtonProps) {
  
  const baseStyles = "relative inline-flex items-center justify-center font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06070B] overflow-hidden";
  
  const variants = {
    primary: "bg-[#A855F7] text-white hover:bg-[#9333EA] shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] border border-transparent",
    secondary: "bg-white text-black hover:bg-gray-100 border border-transparent",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5 border border-transparent",
    glass: "bg-white/[0.03] text-white border border-white/10 hover:bg-white/[0.08] hover:border-white/20 backdrop-blur-md",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-full",
    md: "px-6 py-2.5 text-sm rounded-full",
    lg: "px-8 py-3.5 text-base rounded-full",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`}
      {...props}
    >
      {/* Shine effect overlay for primary buttons */}
      {variant === 'primary' && (
        <motion.div 
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          initial={false}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
