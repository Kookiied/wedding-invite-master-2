import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function RSVPHosts() {
  const { theme } = useTheme();

  return (
    <section 
      className="relative w-full py-20 md:py-32 px-6 overflow-hidden border-t flex flex-col items-center transition-colors duration-500"
      style={{
        backgroundColor: theme.colors.darkRich,
        color: theme.colors.textLightMuted,
        borderColor: theme.colors.borderLight
      }}
    >
      
      {/* Background Decorative Sparkle Particle overlays */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 [background-image:radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent z-0" 
      />

      <div className="max-w-md md:max-w-2xl lg:max-w-4xl w-full mx-auto text-center flex flex-col items-center z-10">
        
        {/* Monogram Logo - Preserved in Original File Colors without any theme tinting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <img 
            src="/vi-monogram.png" 
            alt="V & I Monogram Logo" 
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-transform duration-300"
          />
        </motion.div>

        {/* Cursive Couple Names */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6 py-1 transition-colors duration-500"
          style={{ color: theme.colors.textLight }}
        >
          Vivek & Indira
        </motion.h2>

        {/* Separator Line with Heart */}
        <div className="flex items-center justify-center gap-4 w-4/5 mb-8">
          <div 
            className="h-px flex-1 transition-all duration-500"
            style={{
              background: `linear-gradient(to right, transparent, ${theme.colors.glow}, ${theme.colors.lightAccent}66)`
            }} 
          />
          <span className="text-xs transition-colors duration-500" style={{ color: theme.colors.glow }}>♥</span>
          <div 
            className="h-px flex-1 transition-all duration-500"
            style={{
              background: `linear-gradient(to left, transparent, ${theme.colors.glow}, ${theme.colors.lightAccent}66)`
            }} 
          />
        </div>

        {/* RSVP Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center mb-8"
        >
          <h3 
            className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 transition-colors duration-500"
            style={{ color: theme.colors.textLight }}
          >
            Rsvp
          </h3>
          <div 
            className="font-serif text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.2em] leading-loose font-bold uppercase transition-colors duration-500 opacity-95"
            style={{ color: theme.colors.textLightMuted }}
          >
            <p>Mr. Deepak Raitani</p>
            <p>Mr. Chetan Raitani</p>
          </div>
        </motion.div>

        {/* Separator Line with Heart */}
        <div className="flex items-center justify-center gap-4 w-4/5 mb-8">
          <div 
            className="h-px flex-1 transition-all duration-500"
            style={{
              background: `linear-gradient(to right, transparent, ${theme.colors.glow}, ${theme.colors.lightAccent}66)`
            }} 
          />
          <span className="text-xs transition-colors duration-500" style={{ color: theme.colors.glow }}>♥</span>
          <div 
            className="h-px flex-1 transition-all duration-500"
            style={{
              background: `linear-gradient(to left, transparent, ${theme.colors.glow}, ${theme.colors.lightAccent}66)`
            }} 
          />
        </div>

        {/* Heartful Wishes Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <h3 
            className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4 transition-colors duration-500"
            style={{ color: theme.colors.textLight }}
          >
            Heartful Wishes <br /> From
          </h3>
          <div 
            className="font-serif text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.2em] leading-loose font-bold uppercase transition-colors duration-500 opacity-95"
            style={{ color: theme.colors.textLightMuted }}
          >
            <p>Varun Raitani</p>
            <p>Mohit Raitani</p>
            <p>Gautam Raitani</p>
            <p>& All Raitani Family</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
