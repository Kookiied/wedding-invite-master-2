import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Wind, Heart, Sparkles } from 'lucide-react';

export default function CandleReveal() {
  const [isLit, setIsLit] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Monitor visibility of CandleReveal section in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        // Turn OFF kiss detection entirely while the candle section is on screen
        window.dispatchEvent(new CustomEvent('SET_KISS_DETECTION', { detail: !entry.isIntersecting }));
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      // Ensure kisses are re-enabled if the component unmounts
      window.dispatchEvent(new CustomEvent('SET_KISS_DETECTION', { detail: true }));
    };
  }, []);

  // Extinguish candle ONLY when section is visible and blow event fires
  useEffect(() => {
    const handleBlow = () => {
      if (isLit && isInView) {
        setIsLit(false);
        confetti({
          particleCount: 150,
          spread: 110,
          origin: { y: 0.7 },
          colors: ['#FFD700', '#F8C8DC', '#E6A4B4', '#FFFFFF']
        });
      }
    };

    window.addEventListener('MAGIC_BLOW', handleBlow);
    return () => window.removeEventListener('MAGIC_BLOW', handleBlow);
  }, [isLit, isInView]);

  const handleManualBlow = () => {
    setIsLit(false);
    confetti({
      particleCount: 150,
      spread: 110,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#F8C8DC', '#E6A4B4', '#FFFFFF']
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 flex flex-col items-center justify-center bg-gradient-to-b from-[#1A030D] via-[#2A0412] to-[#1A030D] text-center border-t border-[#E6A4B4]/30 overflow-hidden"
    >
      {/* Background Ambient Polka Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E6A4B4_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="z-10 flex flex-col items-center px-4 w-full max-w-md"
      >
        <span className="text-[10px] font-serif uppercase tracking-[0.35em] text-[#E6A4B4] mb-2">
          Interactive Wish Ceremony
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F8C8DC] mb-3 tracking-wide">
          Make a Wish
        </h2>

        {/* Status Guidance Badge */}
        {isLit ? (
          <motion.div 
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-8 bg-[#3D061A]/90 border border-[#E6A4B4]/50 text-[#F8C8DC] text-xs md:text-sm font-serif px-5 md:px-8 py-2 md:py-3 rounded-full shadow-[0_0_20px_rgba(230,164,180,0.4)] flex items-center gap-2"
          >
            <Wind className="w-4 h-4 md:w-5 md:h-5 text-[#FFD700]" />
            <span>Blow air toward camera to extinguish flame</span>
          </motion.div>
        ) : (
          <div className="mb-8 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs md:text-sm font-serif px-5 md:px-8 py-2 md:py-3 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#FFD700]" />
            <span>Wish Granted!</span>
          </div>
        )}

        {/* Glowing Candle Stage */}
        <div className="relative w-full h-[260px] flex flex-col items-center justify-end mb-6">
          
          {/* Animated Glowing Flame */}
          <AnimatePresence>
            {isLit && (
              <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0, y: -20, transition: { duration: 0.5 } }}
                className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-16 origin-bottom z-30"
              >
                {/* Radiant Outer Flame Aura */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 0.9, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 bg-[#FF4500]/70 rounded-full blur-lg"
                />
                
                {/* Core Flickering Flame */}
                <motion.div 
                  animate={{ 
                    scaleY: [1, 1.12, 0.9, 1.08, 1],
                    skewX: [-3, 3, -2, 4, -3]
                  }}
                  transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-12 bg-gradient-to-t from-[#FFFFFF] via-[#FFD700] to-[#FF4500] shadow-[0_0_40px_rgba(255,215,0,1)]"
                  style={{ borderRadius: '50% 50% 50% 50% / 80% 80% 20% 20%' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wispy Smoke Burst when blown out */}
          <AnimatePresence>
            {!isLit && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.8, 0], y: -80, scale: 2.2 }}
                transition={{ duration: 2 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/30 rounded-full blur-xl z-20 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Golden Velvet Candle Pillar */}
          <div className="relative w-20 h-44 bg-gradient-to-b from-[#FFF0F5] via-[#F8C8DC] to-[#E6A4B4] rounded-t-xl shadow-[inset_0_-10px_25px_rgba(61,6,26,0.6)] z-20 border-t-2 border-white/80">
            {/* Wax drips */}
            <div className="absolute top-0 left-2 w-3 h-8 bg-white/80 rounded-b-full" />
            <div className="absolute top-0 right-4 w-2 h-12 bg-white/70 rounded-b-full" />
            
            {/* Candle Wick */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-[#1A030D] rounded-t-sm z-20" />
          </div>

          {/* Ambient Warm Golden Room Glow */}
          <AnimatePresence>
            {isLit && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FFD700]/20 rounded-full blur-3xl z-10 pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Revealed Thank You Message Card */}
        <AnimatePresence>
          {!isLit && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, type: "spring", damping: 20 }}
              className="w-full bg-gradient-to-b from-[#3D061A] to-[#2A0412] border-2 border-[#FFD700]/80 p-6 sm:p-8 md:p-12 md:max-w-xl mx-auto rounded-3xl shadow-[0_0_50px_rgba(255,215,0,0.4)] z-30 text-center relative overflow-hidden"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-[#5E0B2B] border-2 border-[#FFD700] flex items-center justify-center text-[#FFD700] mb-4 shadow-[0_0_20px_rgba(255,215,0,0.6)]">
                <Heart className="w-6 h-6 fill-current text-[#FFD700]" />
              </div>

              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#FFD700] mb-3">
                Thank You for Your Blessings
              </h3>
              
              <p className="font-serif text-sm sm:text-base md:text-lg text-[#FFF0F5] italic leading-relaxed mb-4">
                "Your presence, love, and warm wishes light up our lives as we step into this beautiful new chapter together."
              </p>

              <div className="text-[11px] md:text-xs font-sans uppercase tracking-widest text-[#E6A4B4] font-semibold">
                &mdash; Warmly, The Raitani Family &mdash;
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Manual Blow Out Fallback Button */}
        {isLit && (
          <button 
            onClick={handleManualBlow}
            className="mt-6 md:mt-10 text-[10px] md:text-[11px] text-[#E6A4B4]/80 uppercase tracking-widest hover:text-[#F8C8DC] transition-colors underline cursor-pointer"
          >
            [ Tap Here to Blow Out Candle ]
          </button>
        )}

      </motion.div>
    </section>
  );
}
