import React from 'react';
import { motion } from 'framer-motion';

export default function WhimsicalButterflies() {
  return (
    <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
      
      {/* BUTTERFLY 1: Sunset Orange & Gold (Upper Left) */}
      <motion.div
        initial={{ x: 0, y: 0, rotate: -10 }}
        animate={{
          x: [-15, 35, -20, 25, -15],
          y: [0, -25, 20, -15, 0],
          rotate: [-12, 14, -8, 12, -12]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[18%] left-[8%] sm:left-[12%]"
      >
        <motion.div
          animate={{ scaleX: [1, 0.25, 1] }}
          transition={{ duration: 0.38, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center"
        >
          {/* Pure Circular Soft Light Aura (No Box Lines) */}
          <div className="absolute inset-[-20%] rounded-full bg-amber-500/30 blur-md pointer-events-none" />

          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
            <defs>
              <linearGradient id="carnivalOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE082" />
                <stop offset="45%" stopColor="#FFB300" />
                <stop offset="100%" stopColor="#FF5722" />
              </linearGradient>
            </defs>

            {/* Left Wings */}
            <path d="M 50,45 C 30,10 5,20 15,48 C 22,60 45,52 50,45 Z" fill="url(#carnivalOrange)" />
            <path d="M 50,50 C 25,52 10,72 25,85 C 38,90 48,65 50,50 Z" fill="#D84315" opacity="0.9" />

            {/* Right Wings */}
            <path d="M 50,45 C 70,10 95,20 85,48 C 78,60 55,52 50,45 Z" fill="url(#carnivalOrange)" />
            <path d="M 50,50 C 75,52 90,72 75,85 C 62,90 52,65 50,50 Z" fill="#D84315" opacity="0.9" />

            {/* Yellow Spots */}
            <circle cx="28" cy="35" r="4" fill="#FFF59D" />
            <circle cx="72" cy="35" r="4" fill="#FFF59D" />

            {/* Body */}
            <ellipse cx="50" cy="50" rx="2.5" ry="18" fill="#3E2723" />
            <path d="M 50,34 Q 42,20 38,18 M 50,34 Q 58,20 62,18" stroke="#FFE082" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>


      {/* BUTTERFLY 2: Electric Peacock Blue & Cyan (Mid Right) */}
      <motion.div
        initial={{ x: 0, y: 0, rotate: 12 }}
        animate={{
          x: [0, -40, 25, -30, 0],
          y: [0, 30, -25, 20, 0],
          rotate: [12, -10, 16, -8, 12]
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[38%] right-[6%] sm:right-[10%]"
      >
        <motion.div
          animate={{ scaleX: [1, 0.22, 1] }}
          transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
        >
          {/* Pure Circular Soft Light Aura */}
          <div className="absolute inset-[-20%] rounded-full bg-cyan-400/35 blur-md pointer-events-none" />

          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
            <defs>
              <linearGradient id="carnivalBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0F7FA" />
                <stop offset="35%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#2979FF" />
              </linearGradient>
            </defs>

            {/* Wings */}
            <path d="M 50,45 C 25,8 0,18 10,48 C 18,62 42,52 50,45 Z" fill="url(#carnivalBlue)" />
            <path d="M 50,50 C 20,55 5,75 22,88 C 36,92 48,68 50,50 Z" fill="#1565C0" opacity="0.9" />

            <path d="M 50,45 C 75,8 100,18 90,48 C 82,62 58,52 50,45 Z" fill="url(#carnivalBlue)" />
            <path d="M 50,50 C 80,55 95,75 78,88 C 64,92 52,68 50,50 Z" fill="#1565C0" opacity="0.9" />

            {/* Cyan Dots */}
            <circle cx="26" cy="32" r="3.5" fill="#FFFFFF" />
            <circle cx="74" cy="32" r="3.5" fill="#FFFFFF" />

            {/* Body */}
            <ellipse cx="50" cy="50" rx="3" ry="19" fill="#0D47A1" />
            <path d="M 50,33 Q 40,18 36,15 M 50,33 Q 60,18 64,15" stroke="#E0F7FA" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>


      {/* BUTTERFLY 3: Emerald Jade Green & Mint (Mid Left) */}
      <motion.div
        initial={{ x: 0, y: 0, rotate: -15 }}
        animate={{
          x: [0, 45, -20, 30, 0],
          y: [0, -35, 25, -20, 0],
          rotate: [-15, 12, -10, 14, -15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[60%] left-[5%] sm:left-[9%]"
      >
        <motion.div
          animate={{ scaleX: [1, 0.28, 1] }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center"
        >
          {/* Pure Circular Soft Light Aura */}
          <div className="absolute inset-[-20%] rounded-full bg-emerald-400/35 blur-md pointer-events-none" />

          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
            <defs>
              <linearGradient id="carnivalGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8F5E9" />
                <stop offset="40%" stopColor="#1DE9B6" />
                <stop offset="100%" stopColor="#00E676" />
              </linearGradient>
            </defs>

            {/* Wings */}
            <path d="M 50,45 C 28,12 2,22 12,50 C 20,62 44,54 50,45 Z" fill="url(#carnivalGreen)" />
            <path d="M 50,50 C 22,54 8,74 24,86 C 37,90 48,66 50,50 Z" fill="#00897B" opacity="0.9" />

            <path d="M 50,45 C 72,12 98,22 88,50 C 80,62 56,54 50,45 Z" fill="url(#carnivalGreen)" />
            <path d="M 50,50 C 78,54 92,74 76,86 C 63,90 52,66 50,50 Z" fill="#00897B" opacity="0.9" />

            {/* Gold highlights */}
            <circle cx="28" cy="34" r="3" fill="#FFD700" opacity="0.95" />
            <circle cx="72" cy="34" r="3" fill="#FFD700" opacity="0.95" />

            {/* Body */}
            <ellipse cx="50" cy="50" rx="2.5" ry="17" fill="#004D40" />
            <path d="M 50,34 Q 42,20 38,18 M 50,34 Q 58,20 62,18" stroke="#E8F5E9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>


      {/* BUTTERFLY 4: Ruby Crimson Red & Gold (Lower Right) */}
      <motion.div
        initial={{ x: 0, y: 0, rotate: 10 }}
        animate={{
          x: [0, -35, 30, -20, 0],
          y: [0, -20, 30, -15, 0],
          rotate: [10, -12, 14, -8, 10]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[78%] right-[8%] sm:right-[12%]"
      >
        <motion.div
          animate={{ scaleX: [1, 0.3, 1] }}
          transition={{ duration: 0.42, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center"
        >
          {/* Pure Circular Soft Light Aura */}
          <div className="absolute inset-[-20%] rounded-full bg-rose-500/35 blur-md pointer-events-none" />

          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
            <defs>
              <linearGradient id="carnivalRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF8E1" />
                <stop offset="35%" stopColor="#FF4081" />
                <stop offset="100%" stopColor="#FF1744" />
              </linearGradient>
            </defs>

            {/* Wings */}
            <path d="M 50,45 C 26,10 2,20 12,48 C 20,60 44,52 50,45 Z" fill="url(#carnivalRed)" />
            <path d="M 50,50 C 24,53 10,73 25,85 C 38,89 48,65 50,50 Z" fill="#C2185B" opacity="0.9" />

            <path d="M 50,45 C 74,10 98,20 88,48 C 80,60 56,52 50,45 Z" fill="url(#carnivalRed)" />
            <path d="M 50,50 C 76,53 90,73 75,85 C 62,89 52,65 50,50 Z" fill="#C2185B" opacity="0.9" />

            {/* Body */}
            <ellipse cx="50" cy="50" rx="2.5" ry="17" fill="#4A148C" />
            <path d="M 50,34 Q 42,20 38,18 M 50,34 Q 58,20 62,18" stroke="#FFD700" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>


      {/* BUTTERFLY 5: Royal Purple & Magenta (Upper Right Sky) */}
      <motion.div
        initial={{ x: 0, y: 0, rotate: -8 }}
        animate={{
          x: [0, -30, 20, -15, 0],
          y: [0, 25, -20, 15, 0],
          rotate: [-8, 10, -12, 8, -8]
        }}
        transition={{
          duration: 9.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[22%] right-[15%] sm:right-[20%]"
      >
        <motion.div
          animate={{ scaleX: [1, 0.26, 1] }}
          transition={{ duration: 0.37, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
        >
          {/* Pure Circular Soft Light Aura */}
          <div className="absolute inset-[-20%] rounded-full bg-purple-500/35 blur-md pointer-events-none" />

          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
            <defs>
              <linearGradient id="carnivalPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EA80FC" />
                <stop offset="50%" stopColor="#D500F9" />
                <stop offset="100%" stopColor="#651FFF" />
              </linearGradient>
            </defs>

            {/* Wings */}
            <path d="M 50,45 C 26,10 2,20 12,48 C 20,60 44,52 50,45 Z" fill="url(#carnivalPurple)" />
            <path d="M 50,50 C 24,53 10,73 25,85 C 38,89 48,65 50,50 Z" fill="#4A148C" opacity="0.9" />

            <path d="M 50,45 C 74,10 98,20 88,48 C 80,60 56,52 50,45 Z" fill="url(#carnivalPurple)" />
            <path d="M 50,50 C 76,53 90,73 75,85 C 62,89 52,65 50,50 Z" fill="#4A148C" opacity="0.9" />

            {/* Body */}
            <ellipse cx="50" cy="50" rx="2.5" ry="17" fill="#1A237E" />
            <path d="M 50,34 Q 42,20 38,18 M 50,34 Q 58,20 62,18" stroke="#EA80FC" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>

    </div>
  );
}
