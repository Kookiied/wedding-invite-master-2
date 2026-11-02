import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import ScratchCard from './ScratchCard';
import { useTheme } from '../context/ThemeContext';

export default function Countdown({ onScratchComplete }) {
  const { theme } = useTheme();
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const handleAllRevealed = () => {
    setIsFullyRevealed(true);
    if (onScratchComplete) {
      onScratchComplete();
    }
  };

  useEffect(() => {
    const targetDate = new Date('2026-10-25T12:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days.toString().padStart(2, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative w-full pb-16 transition-colors duration-500"
      style={{
        backgroundColor: theme.colors.darkAccent,
        color: theme.colors.textLightMuted
      }}
    >
      
      {/* Top SVG Mask Transition */}
      <div className="relative w-full overflow-hidden leading-none -mt-1 z-10 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 fill-current transition-colors duration-500" style={{ color: theme.colors.darkAccent }}>
          <path d="M0,0 C150,90 350,-40 500,65 C650,170 900,-30 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-6 text-center pt-1">
        
        {/* Header Block: SAVE THE DATE (Shifted Upper) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-2"
        >
          <span 
            className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold block mb-1 transition-colors duration-500"
            style={{ color: theme.colors.textLight }}
          >
            SAVE THE DATE
          </span>
          <h2 
            className="font-script text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15] my-1 transition-colors duration-500"
            style={{ color: theme.colors.textLight }}
          >
            Reveal<br />Our Big Day
          </h2>
          <span 
            className="font-serif text-[11px] italic block mt-1.5 mb-5 transition-colors duration-500"
            style={{ color: theme.colors.textLightMuted }}
          >
            Scratch the hearts to reveal
          </span>
        </motion.div>

        {/* Interactive Heart Scratch Card Date Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6"
        >
          <ScratchCard onAllRevealed={handleAllRevealed} />
        </motion.div>

        {/* Section Header & Timer Grid: Rendered ONLY AFTER all 3 hearts are scratched */}
        <AnimatePresence>
          {isFullyRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-6"
            >
              <h2 
                className="font-script text-4xl md:text-5xl font-semibold mb-6 transition-colors duration-500"
                style={{ color: theme.colors.textLight }}
              >
                The beginning of forever...
              </h2>

              {/* Classy Rounded Countdown Timer Grid */}
              <div className="grid grid-cols-4 gap-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                {/* Days */}
                <div 
                  className="rounded-2xl py-3 md:py-4 px-2 shadow-sm text-center flex flex-col items-center justify-center border transition-colors duration-500"
                  style={{
                    backgroundColor: theme.colors.lightBg,
                    borderColor: theme.colors.borderLight
                  }}
                >
                  <span 
                    className="font-serif text-2xl md:text-4xl font-bold block leading-none transition-colors duration-500"
                    style={{ color: theme.colors.textTitle }}
                  >
                    {timeLeft.days}
                  </span>
                  <span 
                    className="font-sans text-[8px] md:text-[10px] uppercase tracking-widest mt-1.5 md:mt-2 block font-bold transition-colors duration-500"
                    style={{ color: theme.colors.textTitle }}
                  >
                    DAYS
                  </span>
                </div>

                {/* Hours */}
                <div 
                  className="rounded-2xl py-3 md:py-4 px-2 shadow-sm text-center flex flex-col items-center justify-center border transition-colors duration-500"
                  style={{
                    backgroundColor: theme.colors.lightBg,
                    borderColor: theme.colors.borderLight
                  }}
                >
                  <span 
                    className="font-serif text-2xl md:text-4xl font-bold block leading-none transition-colors duration-500"
                    style={{ color: theme.colors.textTitle }}
                  >
                    {timeLeft.hours}
                  </span>
                  <span 
                    className="font-sans text-[8px] md:text-[10px] uppercase tracking-widest mt-1.5 md:mt-2 block font-bold transition-colors duration-500"
                    style={{ color: theme.colors.textTitle }}
                  >
                    HRS
                  </span>
                </div>

                {/* Minutes */}
                <div 
                  className="rounded-2xl py-3 md:py-4 px-2 shadow-sm text-center flex flex-col items-center justify-center border transition-colors duration-500"
                  style={{
                    backgroundColor: theme.colors.lightBg,
                    borderColor: theme.colors.borderLight
                  }}
                >
                  <span 
                    className="font-serif text-2xl md:text-4xl font-bold block leading-none transition-colors duration-500"
                    style={{ color: theme.colors.textTitle }}
                  >
                    {timeLeft.minutes}
                  </span>
                  <span 
                    className="font-sans text-[8px] md:text-[10px] uppercase tracking-widest mt-1.5 md:mt-2 block font-bold transition-colors duration-500"
                    style={{ color: theme.colors.textTitle }}
                  >
                    MINS
                  </span>
                </div>

                {/* Seconds */}
                <div 
                  className="rounded-2xl py-3 md:py-4 px-2 shadow-sm text-center flex flex-col items-center justify-center border transition-colors duration-500"
                  style={{
                    backgroundColor: theme.colors.lightBg,
                    borderColor: theme.colors.borderLight
                  }}
                >
                  <span 
                    className="font-serif text-2xl md:text-4xl font-bold block leading-none transition-colors duration-500"
                    style={{ color: theme.colors.textTitle }}
                  >
                    {timeLeft.seconds}
                  </span>
                  <span 
                    className="font-sans text-[8px] md:text-[10px] uppercase tracking-widest mt-1.5 md:mt-2 block font-bold transition-colors duration-500"
                    style={{ color: theme.colors.textTitle }}
                  >
                    SECS
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Bottom SVG Divider */}
      <div className="relative w-full overflow-hidden leading-none mt-16 -mb-1 pointer-events-none rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-10 fill-current transition-colors duration-500" style={{ color: theme.colors.darkAccent }}>
          <path d="M0,0 C150,90 350,-40 500,65 C650,170 900,-30 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>

    </section>
  );
}
