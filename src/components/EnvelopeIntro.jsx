import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function EnvelopeIntro({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  // Default selected animation set to 'stardust' (Golden Stardust & Ripple)
  // Options preserved in code: 'outburst', 'lotus', 'stardust', 'curtain', 'butterfly'
  const [activeAnim, setActiveAnim] = useState('stardust');

  const handleOpen = (e) => {
    if (e) {
      e.stopPropagation();
    }
    if (isOpen) return;
    setIsOpen(true);

    let timeoutDuration = 1500;

    if (activeAnim === 'outburst') {
      confetti({
        particleCount: 100,
        spread: 110,
        origin: { y: 0.5 },
        colors: ['#E65C8A', '#FFD6E5', '#F596AA', '#3D061A', '#FFF0F5']
      });
      timeoutDuration = 1300;
    } 
    else if (activeAnim === 'lotus') {
      confetti({
        particleCount: 150,
        spread: 360,
        startVelocity: 45,
        origin: { y: 0.5 },
        colors: ['#FFB6C1', '#FF69B4', '#FFF0F5', '#E6A4B4', '#F8C8DC'],
        shapes: ['circle', 'square'], 
        gravity: 0.6,
        scalar: 1.2,
        ticks: 200
      });
      timeoutDuration = 2200;
    }
    else if (activeAnim === 'stardust') {
      confetti({
        particleCount: 200,
        spread: 360,
        startVelocity: 55,
        origin: { y: 0.5 },
        colors: ['#FFD700', '#FFA500', '#FFFFFF', '#F1C40F'],
        shapes: ['star', 'circle'],
        gravity: 0.8,
        scalar: 1.2,
        ticks: 200
      });
      timeoutDuration = 2000;
    }
    else if (activeAnim === 'curtain') {
      confetti({
        particleCount: 150,
        spread: 180,
        startVelocity: 60,
        origin: { y: 0.5 },
        colors: ['#FFD700', '#F8C8DC', '#FFFFFF', '#E6A4B4'],
        gravity: 1.2,
        scalar: 0.9,
        ticks: 300
      });
      timeoutDuration = 1700;
    }
    else if (activeAnim === 'butterfly') {
      confetti({
        particleCount: 150,
        spread: 360,
        startVelocity: 55,
        origin: { y: 0.5 },
        colors: ['#1E90FF', '#87CEEB', '#FFFFFF', '#E6A4B4'],
        shapes: ['circle'],
        gravity: 0.5,
        scalar: 1.5,
        ticks: 250
      });
      timeoutDuration = 2000;
    }

    // Notify parent after animation unfolds
    setTimeout(() => {
      onOpen();
    }, timeoutDuration);
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.0, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#180104] overflow-hidden select-none"
    >

      {/* Full-Screen Velvet Envelope Container */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black">
        
        {/* Pure Photographic Velvet Envelope Image (Only the original envelope photograph) */}
        <img 
          src="/velvet-envelope.png" 
          alt="Real Royal Plush Velvet Envelope" 
          className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.05] brightness-[1.02]"
        />

        {/* Subtle Dark Vignette Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 pointer-events-none" />
        
        {/* Invisible Interactive Click/Touch Target directly over the Envelope Seal */}
        {!isOpen && (
          <button 
            onClick={handleOpen}
            onTouchEnd={handleOpen}
            aria-label="Open Invitation Wax Seal"
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full z-40 cursor-pointer focus:outline-none opacity-0"
          />
        )}

        <AnimatePresence>
          {/* ANIMATION 1: Pink Sunburst */}
          {isOpen && activeAnim === 'outburst' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0, 0.95, 1], scale: [0.3, 2.5, 6] }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              className="absolute z-30 pointer-events-none flex items-center justify-center"
            >
              <div className="w-[600px] h-[600px] rounded-full bg-radial from-[#FFF0F5] via-[#E65C8A]/85 to-transparent blur-xl" />
              <svg viewBox="0 0 200 200" className="absolute w-[1000px] h-[1000px] animate-spin-slow opacity-90 text-[#E65C8A] fill-current">
                {[...Array(16)].map((_, i) => (
                  <polygon key={i} points="100,100 93,0 107,0" transform={`rotate(${i * 22.5} 100 100)`} />
                ))}
              </svg>
            </motion.div>
          )}

          {/* ANIMATION 2: Blooming Lotus */}
          {isOpen && activeAnim === 'lotus' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 1], scale: [0, 1.8, 8], rotate: [0, 90, 180] }}
              transition={{ duration: 2.6, ease: "easeInOut" }}
              className="absolute z-30 pointer-events-none flex items-center justify-center"
            >
              <div className="absolute w-[500px] h-[500px] rounded-full bg-[#E6A4B4]/60 blur-3xl" />
              <svg viewBox="0 0 200 200" className="absolute w-[700px] h-[700px] text-[#E6A4B4] fill-current opacity-95 drop-shadow-[0_0_30px_rgba(230,164,180,0.95)]">
                <g transform="translate(100,100)">
                  {[...Array(12)].map((_, i) => (
                    <path key={`outer-${i}`} d="M0,0 C20,-40 20,-80 0,-100 C-20,-80 -20,-40 0,0" transform={`rotate(${i * 30})`} opacity="0.85"/>
                  ))}
                  {[...Array(12)].map((_, i) => (
                    <path key={`inner-${i}`} d="M0,0 C15,-30 15,-60 0,-75 C-15,-60 -15,-30 0,0" transform={`rotate(${i * 30 + 15})`} fill="#FFF0F5" opacity="0.95"/>
                  ))}
                  <circle cx="0" cy="0" r="18" fill="#FFD6E5" className="animate-pulse" />
                </g>
              </svg>
            </motion.div>
          )}

          {/* ANIMATION 3: Golden Stardust & Ripple */}
          {isOpen && activeAnim === 'stardust' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 1], scale: [0, 1, 6] }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
              className="absolute z-30 pointer-events-none flex items-center justify-center"
            >
              <div className="absolute w-[400px] h-[400px] rounded-full bg-[#FFD700]/40 blur-3xl" />
              <motion.div 
                initial={{ opacity: 1, scale: 0 }}
                animate={{ opacity: 0, scale: 8 }}
                transition={{ duration: 2.0, ease: "easeOut" }}
                className="absolute w-[200px] h-[200px] rounded-full border-[6px] border-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,1)]"
              />
            </motion.div>
          )}

          {/* ANIMATION 4: Velvet Curtain Draw */}
          {isOpen && activeAnim === 'curtain' && (
            <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
              {/* Left Curtain */}
              <motion.div 
                initial={{ x: '0%' }}
                animate={{ x: '-100%' }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#3D061A] to-[#5E0B2B] z-40 border-r-4 border-[#FFD700] shadow-[10px_0_40px_rgba(0,0,0,0.9)]"
              />
              {/* Right Curtain */}
              <motion.div 
                initial={{ x: '0%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#3D061A] to-[#5E0B2B] z-40 border-l-4 border-[#FFD700] shadow-[-10px_0_40px_rgba(0,0,0,0.9)]"
              />
              {/* Glowing Center Sparkle */}
              <motion.div 
                initial={{ opacity: 1, scale: 0 }}
                animate={{ opacity: [0, 1, 1], scale: [0, 2, 6] }}
                transition={{ duration: 2.0, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-64 h-64 rounded-full bg-[#FFD700]/50 blur-3xl"
              />
            </div>
          )}

          {/* ANIMATION 5: Ethereal Butterfly Swarm */}
          {isOpen && activeAnim === 'butterfly' && (
            <motion.div 
              className="absolute z-30 pointer-events-none flex items-center justify-center w-full h-full"
            >
              {/* Glowing Core */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 1], scale: [0, 2, 8] }}
                transition={{ duration: 2.6, ease: "easeInOut" }}
                className="absolute w-[500px] h-[500px] rounded-full bg-[#1E90FF]/40 blur-3xl"
              />
              
              {/* Swarm of 16 Butterflies bursting outward */}
              {[...Array(16)].map((_, i) => {
                const angle = (i / 16) * Math.PI * 2;
                const distance = 1000; 
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                return (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: x, y: y, scale: [0, 3, 5], opacity: [0, 1, 0] }}
                    transition={{ duration: 2.2, ease: "easeOut" }}
                    className="absolute text-5xl sm:text-6xl drop-shadow-[0_0_15px_rgba(30,144,255,0.8)]"
                    style={{ transformOrigin: 'center' }}
                  >
                    🦋
                  </motion.div>
                )
              })}
            </motion.div>
          )}

        </AnimatePresence>

        {/* Clean Instruction Banner at Bottom */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-10 left-0 right-0 z-40 text-center px-4 flex items-center justify-center pointer-events-none"
            >
              <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#FFF0F5] font-semibold flex items-center justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/60 py-2.5 px-6 rounded-full border border-[#E6A4B4]/50 backdrop-blur-md">
                Tap Wax Seal to Open Invitation
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
