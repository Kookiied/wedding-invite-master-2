import React from 'react';
import { weddingData } from '../config/weddingData';
import { useTheme } from '../context/ThemeContext';

export default function FinalPortrait() {
  const { theme } = useTheme();

  return (
    <section className="relative w-full bg-pink-paper-pattern overflow-hidden flex flex-col items-center transition-colors duration-500">
      
      {/* Full-bleed 9:16 story-ratio image container */}
      <div className="relative w-full aspect-[9/16] overflow-hidden shadow-inner">
        <img 
          src={weddingData.images.couplePhoto} 
          alt="Vivek & Indira" 
          className="w-full h-full object-cover object-center"
        />

        {/* Text Overlay directly on the bottom section of the photo */}
        <div 
          className="absolute bottom-0 left-0 right-0 pt-16 pb-6 px-6 text-center z-10 pointer-events-none transition-all duration-500"
          style={{
            background: `linear-gradient(to top, ${theme.colors.darkRich}F5 0%, rgba(0,0,0,0.5) 60%, transparent 100%)`
          }}
        >
          <span 
            className="block text-[11px] uppercase tracking-[0.25em] font-bold mb-1 transition-colors duration-500"
            style={{ color: theme.colors.textLight }}
          >
            Vivek & Indira
          </span>
          <span 
            className="block text-[9px] uppercase tracking-widest font-medium opacity-90 transition-colors duration-500"
            style={{ color: theme.colors.textLightMuted }}
          >
            October 25, 2026 &bull; Raj Vilas, Orchha
          </span>
          <span 
            className="block text-[8px] tracking-wider mt-4 opacity-70 transition-colors duration-500"
            style={{ color: theme.colors.textLightMuted }}
          >
            Crafted with love for Vivek & Indira's Wedding
          </span>
        </div>
      </div>

    </section>
  );
}
