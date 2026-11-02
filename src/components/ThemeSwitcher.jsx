import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check, Sparkles, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, themeId, setTheme, themes } = useTheme();

  return (
    <>
      {/* 
        FLOATING ALL-6-THEMES DOCK BAR (ALWAYS VISIBLE WITH Z-[9999])
        Pinned at top-center so guests can directly see and toggle all 6 themes with one tap!
      */}
      <div className="fixed top-2.5 sm:top-4 left-1/2 -translate-x-1/2 z-[9999] max-w-[96vw] flex items-center pointer-events-auto">
        <div 
          className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full backdrop-blur-xl border shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-500"
          style={{
            backgroundColor: `${theme.colors.darkRich}E6`,
            borderColor: theme.colors.borderLight,
            boxShadow: `0 4px 25px ${theme.colors.glowShadow}`
          }}
        >
          {/* Active Theme Info Badge / Click to Open Modal */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 pr-2 border-r cursor-pointer hover:opacity-90 transition-opacity"
            style={{ 
              borderColor: `${theme.colors.border}4D`,
              color: theme.colors.textLight 
            }}
            title="Click to view all 6 theme details"
          >
            <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFD700] animate-pulse" />
            <span className="font-serif text-[11px] sm:text-xs font-bold tracking-wide whitespace-nowrap">
              <span className="mr-1">{theme.emoji}</span>
              <span className="hidden xs:inline">{theme.name.split(' ')[0]}</span>
            </span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* ALL 6 THEME TOGGLE BUTTONS - DIRECTLY CLICKABLE */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {themes.map((t) => {
              const isActive = t.id === themeId;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  aria-label={`Switch to ${t.name} color theme`}
                  title={`${t.name} (${t.subtitle})`}
                  className={`relative group rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer ${
                    isActive 
                      ? 'scale-115 ring-2 shadow-lg' 
                      : 'opacity-75 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{
                    ringColor: t.colors.gold,
                    boxShadow: isActive ? `0 0 14px ${t.colors.gold}` : 'none'
                  }}
                >
                  {/* Glossy Dual Tone Circle (50% Dark Velvet, 50% Pastel Light) */}
                  <div 
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border shadow-inner relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${t.colors.darkRich} 50%, ${t.colors.lightAccent} 50%)`,
                      borderColor: isActive ? t.colors.gold : 'rgba(255,255,255,0.4)'
                    }}
                  >
                    {/* Metallic Shine Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span 
                      className="absolute -bottom-1 w-1.5 h-1.5 rounded-full shadow-sm animate-ping"
                      style={{ backgroundColor: t.colors.gold }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FULL LUXURY THEME SELECTOR MODAL SHEET */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 pointer-events-auto">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-3xl p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9)] border-2 flex flex-col text-center"
              style={{
                background: `linear-gradient(145deg, ${theme.colors.darkRich} 0%, ${theme.colors.darkSurface} 50%, ${theme.colors.darkDeep} 100%)`,
                borderColor: theme.colors.border,
                boxShadow: `0 0 50px ${theme.colors.glowShadow}`
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
                aria-label="Close theme selector"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Section */}
              <div className="mb-6 flex flex-col items-center">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-sm border"
                  style={{
                    backgroundColor: theme.colors.darkAccent,
                    borderColor: theme.colors.borderLight,
                    color: theme.colors.gold
                  }}
                >
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>

                <span 
                  className="text-[10px] font-serif uppercase tracking-[0.3em] font-semibold"
                  style={{ color: theme.colors.textLight }}
                >
                  Six Royal Color Suites
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-wide mt-1">
                  Choose Color Theme
                </h3>

                <p 
                  className="font-sans text-xs sm:text-sm mt-1 max-w-md mx-auto"
                  style={{ color: theme.colors.textLightMuted }}
                >
                  Each suite pairs a deep royal velvet dark tone with a glowing pastel light paper tone & metallic accents.
                </p>
              </div>

              {/* 6 Theme Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-left">
                {themes.map((t) => {
                  const isCurrent = t.id === themeId;
                  return (
                    <motion.div
                      key={t.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setTheme(t.id);
                      }}
                      className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-between overflow-hidden shadow-md group ${
                        isCurrent ? 'ring-2 ring-offset-2 ring-offset-black' : 'hover:border-white/40'
                      }`}
                      style={{
                        backgroundColor: isCurrent ? `${t.colors.darkAccent}EE` : `${t.colors.darkDeep}99`,
                        borderColor: isCurrent ? t.colors.gold : `${t.colors.border}66`,
                        ringColor: t.colors.gold
                      }}
                    >
                      {/* Active Checkmark Pill */}
                      {isCurrent && (
                        <div 
                          className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm"
                          style={{
                            backgroundColor: t.colors.gold,
                            color: t.colors.darkRich
                          }}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Active</span>
                        </div>
                      )}

                      {/* Header with dual tone gloss spheres */}
                      <div className="flex items-center gap-3 mb-3">
                        {/* High-Gloss Dual Tone Sphere Pill */}
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center p-1.5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_10px_rgba(0,0,0,0.5)] border border-white/30 relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${t.colors.darkRich} 50%, ${t.colors.lightAccent} 50%)`
                          }}
                        >
                          <span className="text-xl relative z-10">{t.emoji}</span>
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent pointer-events-none" />
                        </div>

                        <div>
                          <span 
                            className="text-[9px] uppercase tracking-wider font-semibold block"
                            style={{ color: t.colors.lightAccent }}
                          >
                            {t.category}
                          </span>
                          <h4 className="font-serif text-base sm:text-lg text-white font-bold leading-tight">
                            {t.name}
                          </h4>
                        </div>
                      </div>

                      {/* Subtitle & Vibe Description */}
                      <p 
                        className="font-serif text-xs italic mb-3"
                        style={{ color: t.colors.textLightMuted }}
                      >
                        {t.subtitle}
                      </p>

                      {/* Color Palette Pill Swatches */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px]">
                        <div className="flex items-center gap-1.5">
                          {/* Dark velvet swatch */}
                          <span 
                            className="w-4 h-4 rounded-full border border-white/50 shadow-sm"
                            style={{ backgroundColor: t.colors.darkRich }}
                            title="Dark Velvet Tone"
                          />
                          {/* Light pastel swatch */}
                          <span 
                            className="w-4 h-4 rounded-full border border-white/50 shadow-sm"
                            style={{ backgroundColor: t.colors.lightAccent }}
                            title="Pastel Light Tone"
                          />
                          {/* Gloss highlight swatch */}
                          <span 
                            className="w-4 h-4 rounded-full border border-white/50 shadow-sm"
                            style={{ backgroundColor: t.colors.glow }}
                            title="Gloss Highlight"
                          />
                          {/* Gold accent */}
                          <span 
                            className="w-4 h-4 rounded-full border border-white/50 shadow-sm"
                            style={{ backgroundColor: t.colors.gold }}
                            title="Gold Shimmer Accent"
                          />
                        </div>

                        <span 
                          className="font-sans text-[10px] tracking-wide"
                          style={{ color: t.colors.lightAccent }}
                        >
                          {t.vibe.split(',')[0]}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Done Action Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-2.5 rounded-full font-serif text-xs uppercase tracking-widest font-bold transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: theme.colors.gold,
                    color: theme.colors.darkRich
                  }}
                >
                  Apply & Enjoy Ceremony
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
