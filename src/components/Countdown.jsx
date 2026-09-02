import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import ScratchCard from './ScratchCard';

export default function Countdown({ onScratchComplete }) {
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
    <section className="relative w-full bg-[#5E0B2B] text-[#FFF0F5] pb-16">
      
      {/* Top SVG Mask Transition */}
      <div className="relative w-full overflow-hidden leading-none -mt-1 z-10 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 text-[#5E0B2B] fill-current">
          <path d="M0,0 C150,90 350,-40 500,65 C650,170 900,-30 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="max-w-md mx-auto px-6 text-center pt-1">
        
        {/* Header Block: SAVE THE DATE (Shifted Upper) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-2"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#F8C8DC] font-bold block mb-1">
            SAVE THE DATE
          </span>
          <h2 className="font-script text-4xl sm:text-5xl text-[#F8C8DC] font-bold leading-[1.15] my-1">
            Reveal<br />Our Big Day
          </h2>
          <span className="font-serif text-[11px] italic text-[#FFF0F5]/80 block mt-1.5 mb-5">
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
              <h2 className="font-script text-4xl text-[#F8C8DC] font-semibold mb-6">
                The beginning of forever...
              </h2>

              {/* Classy Rounded Blush Pink Countdown Timer Grid */}
              <div className="grid grid-cols-4 gap-3 max-w-xs sm:max-w-sm mx-auto">
                {/* Days */}
                <div className="bg-[#FFF0F5] border border-[#E6A4B4]/40 rounded-2xl py-3 px-2 shadow-sm text-center flex flex-col items-center justify-center">
                  <span className="font-serif text-2xl font-bold text-[#5E0B2B] block leading-none">
                    {timeLeft.days}
                  </span>
                  <span className="font-sans text-[8px] uppercase tracking-widest text-[#5E0B2B]/70 mt-1.5 block font-bold">
                    DAYS
                  </span>
                </div>

                {/* Hours */}
                <div className="bg-[#FFF0F5] border border-[#E6A4B4]/40 rounded-2xl py-3 px-2 shadow-sm text-center flex flex-col items-center justify-center">
                  <span className="font-serif text-2xl font-bold text-[#5E0B2B] block leading-none">
                    {timeLeft.hours}
                  </span>
                  <span className="font-sans text-[8px] uppercase tracking-widest text-[#5E0B2B]/70 mt-1.5 block font-bold">
                    HRS
                  </span>
                </div>

                {/* Minutes */}
                <div className="bg-[#FFF0F5] border border-[#E6A4B4]/40 rounded-2xl py-3 px-2 shadow-sm text-center flex flex-col items-center justify-center">
                  <span className="font-serif text-2xl font-bold text-[#5E0B2B] block leading-none">
                    {timeLeft.minutes}
                  </span>
                  <span className="font-sans text-[8px] uppercase tracking-widest text-[#5E0B2B]/70 mt-1.5 block font-bold">
                    MINS
                  </span>
                </div>

                {/* Seconds */}
                <div className="bg-[#FFF0F5] border border-[#E6A4B4]/40 rounded-2xl py-3 px-2 shadow-sm text-center flex flex-col items-center justify-center">
                  <span className="font-serif text-2xl font-bold text-[#5E0B2B] block leading-none">
                    {timeLeft.seconds}
                  </span>
                  <span className="font-sans text-[8px] uppercase tracking-widest text-[#5E0B2B]/70 mt-1.5 block font-bold">
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
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-10 text-[#5E0B2B] fill-current">
          <path d="M0,0 C150,90 350,-40 500,65 C650,170 900,-30 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>

    </section>
  );
}
