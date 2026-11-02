import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import { Shirt, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function DressCode() {
  const { theme } = useTheme();

  return (
    <section className="relative w-full bg-pink-paper-pattern text-[#2D2D2D] pt-16 pb-32 md:pb-40 px-4 transition-colors duration-500">
      
      {/* Section Header */}
      <div className="text-center max-w-md md:max-w-xl lg:max-w-3xl mx-auto mb-12 md:mb-16">
        <span 
          className="font-sans text-xs uppercase tracking-[0.3em] font-semibold block mb-6 transition-colors duration-500"
          style={{ color: theme.colors.textTitle }}
        >
          Attire Guide
        </span>
        <h2 
          className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl transition-colors duration-500"
          style={{ color: theme.colors.textTitle }}
        >
          Dress Code
        </h2>
        <p 
          className="font-serif text-xs uppercase tracking-widest mt-2 opacity-80 transition-colors duration-500"
          style={{ color: theme.colors.textTitle }}
        >
          Saree / Lehenga / Jodhpuri & Shimmer
        </p>
        <div 
          className="w-16 h-0.5 mx-auto mt-3 rounded-full transition-colors duration-500" 
          style={{ backgroundColor: theme.colors.border }}
        />
      </div>

      <div className="max-w-md md:max-w-xl lg:max-w-2xl mx-auto space-y-6 md:space-y-8">
        {weddingData.dressCodes.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative bg-white border-2 rounded-2xl p-6 shadow-lg overflow-hidden group transition-all duration-500"
            style={{
              borderColor: theme.colors.border,
              boxShadow: `0 4px 20px ${theme.colors.glowShadow}`
            }}
          >
            {/* Corner Decorative Borders */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: theme.colors.border }} />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: theme.colors.border }} />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: theme.colors.border }} />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: theme.colors.border }} />

            {/* Event Title */}
            <div className="text-center mb-4">
              <span 
                className="font-sans text-[10px] uppercase tracking-widest font-bold block mb-1"
                style={{ color: theme.colors.textTitle }}
              >
                Event Attire
              </span>
              <h3 
                className="font-serif text-xl md:text-2xl font-bold"
                style={{ color: theme.colors.textTitle }}
              >
                {item.title}
              </h3>
            </div>

            {/* Color Palette Display */}
            <div className="flex flex-col items-center mb-4">
              <span 
                className="font-script text-2xl md:text-3xl mb-2 font-bold transition-colors duration-500"
                style={{ color: theme.colors.darkAccent }}
              >
                {item.theme}
              </span>
              <div className="flex gap-2">
                {item.paletteColors.map((color, cIdx) => (
                  <span 
                    key={cIdx} 
                    style={{ backgroundColor: color }} 
                    className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-black/20 shadow-inner"
                  />
                ))}
              </div>
              <p className="font-sans text-xs text-[#2D2D2D]/70 italic mt-1 text-center">
                "{item.subtitle}"
              </p>
            </div>

            {/* Recommendations Grid */}
            <div 
              className="grid grid-cols-2 gap-3 pt-3 border-t text-xs md:text-sm font-sans"
              style={{ borderColor: theme.colors.borderLight }}
            >
              {/* Women */}
              <div 
                className="p-3 md:p-4 rounded-xl border transition-colors duration-500"
                style={{
                  backgroundColor: `${theme.colors.lightBg}CC`,
                  borderColor: theme.colors.borderLight
                }}
              >
                <span 
                  className="font-serif text-[11px] md:text-xs uppercase tracking-wider font-bold flex items-center gap-1 mb-1"
                  style={{ color: theme.colors.textTitle }}
                >
                  <User className="w-3 h-3" style={{ color: theme.colors.darkAccent }} /> Women
                </span>
                <p className="text-[#2D2D2D]/80 leading-snug">
                  {item.women}
                </p>
              </div>

              {/* Men */}
              <div 
                className="p-3 md:p-4 rounded-xl border transition-colors duration-500"
                style={{
                  backgroundColor: `${theme.colors.lightBg}CC`,
                  borderColor: theme.colors.borderLight
                }}
              >
                <span 
                  className="font-serif text-[11px] md:text-xs uppercase tracking-wider font-bold flex items-center gap-1 mb-1"
                  style={{ color: theme.colors.textTitle }}
                >
                  <Shirt className="w-3 h-3" style={{ color: theme.colors.darkAccent }} /> Men
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
