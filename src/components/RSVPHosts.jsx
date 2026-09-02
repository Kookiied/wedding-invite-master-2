import React from 'react';
import { motion } from 'framer-motion';

export default function RSVPHosts() {
  return (
    <section className="relative w-full bg-[#3D061A] text-[#FFF0F5] py-20 px-6 overflow-hidden border-t border-[#E6A4B4]/20 flex flex-col items-center">
      
      {/* Background Decorative Sparkle Particle overlays */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFF0F5]/10 via-transparent to-transparent z-0" />

      <div className="max-w-md w-full mx-auto text-center flex flex-col items-center z-10">
        
        {/* Rose Gold V&I Wreath Monogram Logo */}
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
            className="w-28 h-28 sm:w-32 sm:h-32 object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        {/* Cursive Couple Names (Solid bright rose gold for crisp legibility) */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-script text-4xl sm:text-5xl text-[#F8C8DC] tracking-wide mb-6 py-1"
        >
          Vivek & Indira
        </motion.h2>

        {/* Separator Line with Heart */}
        <div className="flex items-center justify-center gap-4 w-4/5 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#F596AA] to-[#FFD6E5]/40" />
          <span className="text-[#F596AA] text-xs">♥</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#F596AA] to-[#FFD6E5]/40" />
        </div>

        {/* RSVP Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center mb-8"
        >
          <h3 className="font-script text-4xl sm:text-5xl text-[#F8C8DC] mb-4">
            Rsvp
          </h3>
          <div className="font-serif text-sm sm:text-base text-[#FFF0F5]/90 tracking-[0.2em] leading-loose font-bold uppercase">
            <p>Mr. Deepak Raitani</p>
            <p>Mr. Chetan Raitani</p>
          </div>
        </motion.div>

        {/* Separator Line with Heart (Updated from diamond to heart) */}
        <div className="flex items-center justify-center gap-4 w-4/5 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#F596AA] to-[#FFD6E5]/40" />
          <span className="text-[#F596AA] text-xs">♥</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#F596AA] to-[#FFD6E5]/40" />
        </div>

        {/* Heartful Wishes Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <h3 className="font-script text-4xl sm:text-5xl text-[#F8C8DC] leading-tight mb-4">
            Heartful Wishes <br /> From
          </h3>
          <div className="font-serif text-sm sm:text-base text-[#FFF0F5]/90 tracking-[0.2em] leading-loose font-bold uppercase">
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
