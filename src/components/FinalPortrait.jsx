import React from 'react';
import { weddingData } from '../config/weddingData';

export default function FinalPortrait() {
  return (
    <section className="relative w-full bg-pink-paper-pattern overflow-hidden flex flex-col items-center">
      
      {/* Full-bleed 9:16 story-ratio image container */}
      <div className="relative w-full aspect-[9/16] overflow-hidden shadow-inner">
        <img 
          src={weddingData.images.couplePhoto} 
          alt="Vivek & Indira" 
          className="w-full h-full object-cover object-center"
        />

        {/* Text Overlay directly on the bottom section of the photo */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3D061A]/95 via-black/40 to-transparent pt-16 pb-6 px-6 text-center z-10 pointer-events-none">
          <span className="block text-[11px] uppercase tracking-[0.25em] text-[#F8C8DC] font-bold mb-1">
            Vivek & Indira
          </span>
          <span className="block text-[9px] uppercase tracking-widest text-[#FFF0F5]/90 font-medium">
            October 25, 2026 &bull; Raj Vilas, Orchha
          </span>
          <span className="block text-[8px] text-[#FFF0F5]/60 tracking-wider mt-4">
            Crafted with love for Vivek & Indira's Wedding
          </span>
        </div>
      </div>

    </section>
  );
}
