import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import { Shirt, User } from 'lucide-react';

export default function DressCode() {
  return (
    <section className="relative w-full bg-pink-paper-pattern text-[#2D2D2D] py-16 px-4">
      
      {/* Section Header */}
      <div className="text-center max-w-md mx-auto mb-12">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#5E0B2B] font-semibold block mb-6">
          Attire Guide
        </span>
        <h2 className="font-script text-5xl sm:text-6xl text-[#5E0B2B]">
          Dress Code
        </h2>
        <p className="font-serif text-xs text-[#5E0B2B]/70 uppercase tracking-widest mt-2">
          Saree / Lehenga / Jodhpuri & Shimmer
        </p>
        <div className="w-16 h-0.5 bg-[#E6A4B4] mx-auto mt-3 rounded-full" />
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {weddingData.dressCodes.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative bg-white border-2 border-[#E6A4B4] rounded-2xl p-6 shadow-lg overflow-hidden group"
          >
            {/* Corner Decorative SVGs */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#E6A4B4]" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#E6A4B4]" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#E6A4B4]" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#E6A4B4]" />

            {/* Event Title */}
            <div className="text-center mb-4">
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#5E0B2B] font-bold block mb-1">
                Event Attire
              </span>
              <h3 className="font-serif text-xl font-bold text-[#5E0B2B]">
                {item.title}
              </h3>
            </div>

            {/* Color Palette Display */}
            <div className="flex flex-col items-center mb-4">
              <span className="font-script text-2xl text-[#B83B5E] mb-2 font-bold">
                {item.theme}
              </span>
              <div className="flex gap-2">
                {item.paletteColors.map((color, cIdx) => (
                  <span 
                    key={cIdx} 
                    style={{ backgroundColor: color }} 
                    className="w-5 h-5 rounded-full border border-black/20 shadow-inner"
                  />
                ))}
              </div>
              <p className="font-sans text-xs text-[#2D2D2D]/70 italic mt-1 text-center">
                "{item.subtitle}"
              </p>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E6A4B4]/30 text-xs font-sans">
              {/* Women */}
              <div className="bg-[#FFF0F5]/70 p-3 rounded-xl border border-[#E6A4B4]/30">
                <span className="font-serif text-[11px] uppercase tracking-wider text-[#5E0B2B] font-bold flex items-center gap-1 mb-1">
                  <User className="w-3 h-3 text-[#B83B5E]" /> Women
                </span>
                <p className="text-[#2D2D2D]/80 leading-snug">
                  {item.women}
                </p>
              </div>

              {/* Men */}
              <div className="bg-[#FFF0F5]/70 p-3 rounded-xl border border-[#E6A4B4]/30">
                <span className="font-serif text-[11px] uppercase tracking-wider text-[#5E0B2B] font-bold flex items-center gap-1 mb-1">
                  <Shirt className="w-3 h-3 text-[#B83B5E]" /> Men
                </span>
                <p className="text-[#2D2D2D]/80 leading-snug">
                  {item.men}
                </p>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
}
