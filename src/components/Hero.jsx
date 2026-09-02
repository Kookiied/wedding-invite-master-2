import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import WhimsicalButterflies from './WhimsicalButterflies';
import { Sliders, X } from 'lucide-react';

/* 
 * DEVELOPER TOGGLE FOR LIVE POSITION & SIZE CONTROLLER:
 * Set ENABLE_DEV_CONTROLLER to true anytime in the future to reactivate the on-screen live slider widget!
 */
const ENABLE_DEV_CONTROLLER = false;

export default function Hero() {
  const [showTuner, setShowTuner] = useState(false);

  // Permanently Locked Layout & Font Size Values
  const [layout, setLayout] = useState({
    mantraTop: 79,           // Mantra position from top (px)
    topPadding: 120,         // Section top distance (px)
    nameFontSize: 86,        // Vivek & Indira name font size (px)
    vivekParentGap: -5,      // Vivek family text top margin (px)
    vivekParentSize: 11,     // Vivek family text font size (px)
    wedsGap: 27,             // Gap around Weds separator (px)
    indiraParentGap: 27,     // Indira family text top margin (px)
    indiraParentSize: 11     // Indira family text font size (px)
  });

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between text-center overflow-hidden bg-gradient-to-b from-[#FFF0F5] via-[#FFEBEF] to-[#FFF0F5]">
      
      {/* Delicate Theme-based Light Polka-Dot Matrix Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(#E6A4B4_1.2px,transparent_1.2px)] [background-size:20px_20px] pointer-events-none" />

      {/* Subtle Soft Rose Glow Orbs in Corners */}
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-[#F596AA]/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-16 w-72 h-72 rounded-full bg-[#E6A4B4]/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-[#F596AA]/20 blur-3xl pointer-events-none" />

      {/* Whimsical Animated Flying Butterflies Layer */}
      <WhimsicalButterflies />

      {/* S.B.D Monograms at Upper Corners */}
      <div className="absolute top-4 sm:top-6 left-0 right-0 z-20 flex justify-between items-center px-6 sm:px-10 pointer-events-none">
        <span className="font-serif text-sm sm:text-base md:text-lg font-black tracking-normal text-[#E65C8A] drop-shadow-sm uppercase">
          S.B.D
        </span>

        <span className="font-serif text-sm sm:text-base md:text-lg font-black tracking-normal text-[#E65C8A] drop-shadow-sm uppercase">
          S.B.D
        </span>
      </div>

      {/* Dark Magenta Ganesha Symbol & Sanskrit Mantra Container (Positioned in Upper Mid) */}
      <div 
        className="absolute left-0 right-0 z-20 px-4 text-center pointer-events-none transition-all duration-75 flex flex-col items-center"
        style={{ top: `${layout.mantraTop - 58}px` }}
      >
        {/* Dark Magenta Lord Ganesha Icon (Enlarged & Centered Directly Above Mantra) */}
        <img 
          src="/ganesha-magenta.png" 
          alt="Dark Magenta Lord Ganesha" 
          className="w-14 h-16 sm:w-18 sm:h-20 object-contain mb-1.5 filter drop-shadow-[0_2px_8px_rgba(139,0,50,0.25)]"
        />

        {/* Sanskrit Mantra */}
        <p className="font-serif text-[11px] sm:text-xs text-[#E65C8A] tracking-wide max-w-xs sm:max-w-sm mx-auto font-bold leading-relaxed drop-shadow-sm">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः ।<br />
          निर्विघ्नं कुरु में देव, सर्व कार्येषु सर्वदा ॥
        </p>
      </div>

      {/* Main Couple Names & Announcement (Locked at 120px Section Top Distance) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="relative z-20 px-6 my-auto pb-2 max-w-lg w-full flex flex-col items-center transition-all duration-75"
        style={{ paddingTop: `${layout.topPadding}px` }}
      >
        {/* Invitation Text (Between Mantra and Vivek's Name) */}
        <p 
          className="font-sans uppercase tracking-widest text-[#5E0B2B] font-extrabold leading-relaxed text-center mb-8 max-w-xs sm:max-w-md"
          style={{ fontSize: `${layout.vivekParentSize}px` }}
        >
          We request your gracious<br />
          presence and blessings on the auspicious occasion<br />
          of the wedding celebration of
        </p>

        {/* Groom: Vivek */}
        <div className="mb-0 text-center w-full">
          <h1 
            className="font-script text-[#5E0B2B] font-normal tracking-wide drop-shadow-[0_2px_4px_rgba(94,11,43,0.15)] py-0 px-3 leading-tight transition-all duration-75"
            style={{ fontSize: `${layout.nameFontSize}px` }}
          >
            Vivek
          </h1>
          <p 
            className="font-sans uppercase tracking-widest text-[#3D061A] font-extrabold leading-relaxed transition-all duration-75"
            style={{ 
              marginTop: `${layout.vivekParentGap}px`,
              fontSize: `${layout.vivekParentSize}px`
            }}
          >
            Grand S/o Mrs. Devi Rani Raitani & Late Duni Chand Raitani<br />
            S/o Mrs. Renu Raitani & Mr. Chetan Raitani
          </p>
        </div>

        {/* Weds Separator (Locked at 27px Gap) */}
        <div 
          className="flex items-center justify-center gap-4 w-5/6 transition-all duration-75"
          style={{ marginTop: `${layout.wedsGap}px`, marginBottom: `${layout.wedsGap}px` }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#E6A4B4] to-[#5E0B2B]/40" />
          <span className="font-serif text-base sm:text-lg text-[#5E0B2B] font-bold tracking-widest uppercase">
            Weds
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#E6A4B4] to-[#5E0B2B]/40" />
        </div>

        {/* Bride: Indira */}
        <div className="mb-2 text-center w-full">
          <h1 
            className="font-script text-[#5E0B2B] font-normal tracking-wide drop-shadow-[0_2px_4px_rgba(94,11,43,0.15)] py-0 px-3 leading-tight transition-all duration-75"
            style={{ fontSize: `${layout.nameFontSize}px` }}
          >
            Indira
          </h1>
          <p 
            className="font-sans uppercase tracking-widest text-[#3D061A] font-extrabold leading-relaxed transition-all duration-75"
            style={{ 
              marginTop: `${layout.indiraParentGap}px`,
              fontSize: `${layout.indiraParentSize}px`
            }}
          >
            Grand D/o Late Sushila Devi Lakhmani & Late Lal Chand Lakhmani<br />
            D/o Mrs. Ratna Lakhmani & Mr. Kanhaiya Lal Lakhmani
          </p>
        </div>

        <div className="w-12 h-0.5 bg-[#E6A4B4] mx-auto my-3 rounded-full opacity-80" />
        <p className="font-serif text-[11px] tracking-[0.2em] text-[#5E0B2B] uppercase font-bold">
          {weddingData.venue.name} &bull; {weddingData.venue.city}
        </p>
      </motion.div>

      {/* Transparent Bottom Spacer */}
      <div className="h-6 w-full z-20 pointer-events-none" />

      {/* PRESERVED IN CODEBASE: Live Size & Position Controller Widget */}
      {ENABLE_DEV_CONTROLLER && (
        <>
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setShowTuner(!showTuner)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#5E0B2B] text-[#F8C8DC] border-2 border-[#E6A4B4] font-sans text-xs font-bold shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[#F8C8DC]" />
              <span>{showTuner ? 'Close Controller' : '🎛️ Adjust Size & Position'}</span>
            </button>
          </div>

          <AnimatePresence>
            {showTuner && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                className="fixed bottom-16 right-4 left-4 sm:left-auto sm:w-84 z-50 bg-[#3D061A]/95 backdrop-blur-xl border-2 border-[#E6A4B4] rounded-2xl p-4 text-[#FFF0F5] shadow-2xl flex flex-col gap-2.5 text-left max-h-[80vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-[#E6A4B4]/40 pb-2 sticky top-0 bg-[#3D061A] z-10 pt-1">
                  <span className="font-serif text-xs font-bold text-[#F8C8DC] uppercase tracking-wider">
                    🎛️ Size & Position Controller
                  </span>
                  <button onClick={() => setShowTuner(false)} className="text-[#FFF0F5]/70 hover:text-white p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Slider 1: Mantra Top Position */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="font-medium text-[#FFF0F5]/90">Mantra Top Position:</span>
                    <span className="font-bold text-[#F8C8DC]">{layout.mantraTop}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={layout.mantraTop}
                    onChange={(e) => setLayout({ ...layout, mantraTop: Number(e.target.value) })}
                    className="w-full accent-[#E6A4B4] cursor-pointer"
                  />
                </div>

                {/* Slider 2: Section Top Padding */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="font-medium text-[#FFF0F5]/90">Section Top Position:</span>
                    <span className="font-bold text-[#F8C8DC]">{layout.topPadding}px</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="300"
                    value={layout.topPadding}
                    onChange={(e) => setLayout({ ...layout, topPadding: Number(e.target.value) })}
                    className="w-full accent-[#E6A4B4] cursor-pointer"
                  />
                </div>

                {/* Slider 3: Couple Names Font Size */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="font-medium text-[#FFF0F5]/90">Couple Names Size:</span>
                    <span className="font-bold text-[#F8C8DC]">{layout.nameFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="120"
                    value={layout.nameFontSize}
                    onChange={(e) => setLayout({ ...layout, nameFontSize: Number(e.target.value) })}
                    className="w-full accent-[#E6A4B4] cursor-pointer"
                  />
                </div>

                {/* Slider 4: Vivek Family Gap */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="font-medium text-[#FFF0F5]/90">Vivek Family Text Gap:</span>
                    <span className="font-bold text-[#F8C8DC]">{layout.vivekParentGap}px</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    value={layout.vivekParentGap}
                    onChange={(e) => setLayout({ ...layout, vivekParentGap: Number(e.target.value) })}
                    className="w-full accent-[#E6A4B4] cursor-pointer"
                  />
                </div>

                {/* Slider 5: Vivek Family Font Size */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="font-medium text-[#FFF0F5]/90">Vivek Family Font Size:</span>
                    <span className="font-bold text-[#F8C8DC]">{layout.vivekParentSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="20"
                    value={layout.vivekParentSize}
                    onChange={(e) => setLayout({ ...layout, vivekParentSize: Number(e.target.value) })}
                    className="w-full accent-[#E6A4B4] cursor-pointer"
                  />
                </div>

                {/* Slider 6: Weds Separator Gap */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="font-medium text-[#FFF0F5]/90">Weds Separator Gap:</span>
                    <span className="font-bold text-[#F8C8DC]">{layout.wedsGap}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={layout.wedsGap}
                    onChange={(e) => setLayout({ ...layout, wedsGap: Number(e.target.value) })}
                    className="w-full accent-[#E6A4B4] cursor-pointer"
                  />
                </div>

                {/* Slider 7: Indira Family Gap */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="font-medium text-[#FFF0F5]/90">Indira Family Text Gap:</span>
                    <span className="font-bold text-[#F8C8DC]">{layout.indiraParentGap}px</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    value={layout.indiraParentGap}
                    onChange={(e) => setLayout({ ...layout, indiraParentGap: Number(e.target.value) })}
                    className="w-full accent-[#E6A4B4] cursor-pointer"
                  />
                </div>

                {/* Slider 8: Indira Family Font Size */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="font-medium text-[#FFF0F5]/90">Indira Family Font Size:</span>
                    <span className="font-bold text-[#F8C8DC]">{layout.indiraParentSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="20"
                    value={layout.indiraParentSize}
                    onChange={(e) => setLayout({ ...layout, indiraParentSize: Number(e.target.value) })}
                    className="w-full accent-[#E6A4B4] cursor-pointer"
                  />
                </div>

                <div className="text-[10px] text-[#F8C8DC] bg-[#5E0B2B] p-2 rounded-lg border border-[#E6A4B4]/40 mt-1 font-mono text-center">
                  Copy values to state to lock permanently!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

    </section>
  );
}
