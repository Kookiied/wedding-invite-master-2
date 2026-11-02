import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Wind, Heart, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Feature Flag: Enable Multicolor Confetti on Candle Blow (Enabled for all themes except Rani)
const ENABLE_MULTICOLOR_CONFETTI = true;

export default function CandleReveal() {
  const { theme, themeId } = useTheme();
  const [isLit, setIsLit] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Monitor visibility of CandleReveal section in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Extinguish candle ONLY when section is visible and blow event fires
  useEffect(() => {
    const handleBlow = () => {
      if (isLit && isInView) {
        setIsLit(false);
        const confettiColors = (ENABLE_MULTICOLOR_CONFETTI && themeId !== 'rani')
          ? ['#FFD700', '#FF1493', '#00F0FF', '#00E676', '#FF5722', '#7C4DFF', '#FFEB3B', '#FFFFFF', '#FF4081', '#00B0FF']
          : [theme.colors.gold, theme.colors.lightAccent, theme.colors.border, '#FFFFFF'];

        confetti({
          particleCount: 150,
          spread: 110,
          origin: { y: 0.7 },
          colors: confettiColors
        });
      }
    };

    window.addEventListener('MAGIC_BLOW', handleBlow);
    return () => window.removeEventListener('MAGIC_BLOW', handleBlow);
  }, [isLit, isInView, theme, themeId]);

  const handleManualBlow = () => {
    setIsLit(false);
    const confettiColors = (ENABLE_MULTICOLOR_CONFETTI && themeId !== 'rani')
      ? ['#FFD700', '#FF1493', '#00F0FF', '#00E676', '#FF5722', '#7C4DFF', '#FFEB3B', '#FFFFFF', '#FF4081', '#00B0FF']
      : [theme.colors.gold, theme.colors.lightAccent, theme.colors.border, '#FFFFFF'];

    confetti({
      particleCount: 150,
      spread: 110,
      origin: { y: 0.7 },
      colors: confettiColors
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 flex flex-col items-center justify-center text-center border-t overflow-hidden transition-colors duration-500"
      style={{
        background: `linear-gradient(to bottom, ${theme.colors.darkDeep}, ${theme.colors.darkSurface}, ${theme.colors.darkDeep})`,
        borderColor: theme.colors.borderLight
      }}
    >
      {/* Background Ambient Polka Dot Grid */}
      <div 
        className="absolute inset-0 [background-size:24px_24px] opacity-20 pointer-events-none transition-all duration-500" 
        style={{
          backgroundImage: `radial-gradient(${theme.colors.border} 1px, transparent 1px)`
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="z-10 flex flex-col items-center px-4 w-full max-w-md"
      >
        <span 
          className="text-[10px] font-serif uppercase tracking-[0.35em] mb-2 transition-colors duration-500"
          style={{ color: theme.colors.border }}
        >
          Interactive Wish Ceremony
        </span>

        <h2 
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 tracking-wide transition-colors duration-500"
          style={{ color: theme.colors.textLight }}
        >
          Make a Wish
        </h2>

        {/* Status Guidance Badge */}
        {isLit ? (
          <motion.div 
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-8 border text-xs md:text-sm font-serif px-5 md:px-8 py-2 md:py-3 rounded-full flex items-center gap-2 backdrop-blur-md transition-all duration-500"
            style={{
              backgroundColor: `${theme.colors.darkRich}E6`,
              borderColor: theme.colors.borderLight,
              color: theme.colors.textLight,
              boxShadow: `0 0 20px ${theme.colors.glowShadow}`
            }}
          >
            <Wind className="w-4 h-4 md:w-5 md:h-5" style={{ color: theme.colors.gold }} />
            <span>Blow air toward camera to extinguish flame</span>
          </motion.div>
        ) : (
          <div 
            className="mb-8 border text-xs md:text-sm font-serif px-5 md:px-8 py-2 md:py-3 rounded-full flex items-center gap-2 shadow-lg transition-all duration-500"
            style={{
              backgroundColor: `${theme.colors.darkAccent}F2`,
              borderColor: theme.colors.gold,
              color: theme.colors.gold
            }}
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" style={{ color: theme.colors.gold }} />
            <span className="font-semibold">✨ Wish Granted!</span>
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

          {/* Themed Velvet Candle Pillar */}
          <div 
            className="relative w-20 h-44 rounded-t-xl z-20 border-t-2 border-white/80 transition-all duration-500"
            style={{
              background: `linear-gradient(to bottom, ${theme.colors.lightBg}, ${theme.colors.lightAccent}, ${theme.colors.border})`,
              boxShadow: `inset 0 -10px 25px ${theme.colors.darkRich}99`
            }}
          >
            {/* Wax drips */}
            <div className="absolute top-0 left-2 w-3 h-8 bg-white/80 rounded-b-full" />
            <div className="absolute top-0 right-4 w-2 h-12 bg-white/70 rounded-b-full" />
            
            {/* Candle Wick */}
            <div 
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-4 rounded-t-sm z-20" 
              style={{ backgroundColor: theme.colors.darkDeep }}
            />
          </div>

          {/* Ambient Warm Golden Room Glow */}
          <AnimatePresence>
            {isLit && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl z-10 pointer-events-none"
                style={{ backgroundColor: `${theme.colors.gold}33` }}
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
              className="w-full border-2 p-6 sm:p-8 md:p-12 md:max-w-xl mx-auto rounded-3xl z-30 text-center relative overflow-hidden transition-all duration-500"
              style={{
                background: `linear-gradient(to bottom, ${theme.colors.darkRich}, ${theme.colors.darkSurface})`,
                borderColor: `${theme.colors.gold}CC`,
                boxShadow: `0 0 50px ${theme.colors.glowShadow}`
              }}
            >
              <div 
                className="w-12 h-12 mx-auto rounded-full border-2 flex items-center justify-center mb-4 shadow-lg transition-colors duration-500"
                style={{
                  backgroundColor: theme.colors.darkAccent,
                  borderColor: theme.colors.gold,
                  color: theme.colors.gold
                }}
              >
                <Heart className="w-6 h-6 fill-current" style={{ color: theme.colors.gold }} />
              </div>

              <h3 
                className="font-serif text-2xl md:text-3xl lg:text-4xl mb-3 transition-colors duration-500"
                style={{ color: theme.colors.gold }}
              >
                Thank You for Your Blessings
              </h3>
              
              <p 
                className="font-serif text-sm sm:text-base md:text-lg italic leading-relaxed mb-4 transition-colors duration-500"
                style={{ color: theme.colors.lightBg }}
              >
                "Your presence, love, and warm wishes light up our lives as we step into this beautiful new chapter together."
              </p>

              <div 
                className="text-[11px] md:text-xs font-sans uppercase tracking-widest font-semibold transition-colors duration-500"
                style={{ color: theme.colors.border }}
              >
                &mdash; Warmly, The Raitani Family &mdash;
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Manual Blow Out Fallback Button */}
        {isLit && (
          <button 
            onClick={handleManualBlow}
            className="mt-6 md:mt-10 text-[10px] md:text-[11px] uppercase tracking-widest transition-colors underline cursor-pointer hover:opacity-100"
            style={{ color: theme.colors.border }}
          >
            [ Tap Here to Blow Out Candle ]
          </button>
        )}

      </motion.div>
    </section>
  );
}
