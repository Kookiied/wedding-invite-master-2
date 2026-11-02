import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Camera, ShieldCheck, Check, Palette } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ExperienceSelector({ onSelectMode }) {
  const { theme, themeId, setTheme, themes } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md p-3 xs:p-4 sm:p-6 select-none overflow-y-auto transition-colors duration-500"
      style={{ backgroundColor: `${theme.colors.darkDeep}F2` }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="w-full max-w-sm xs:max-w-md sm:max-w-xl border-2 rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-7 text-center relative overflow-hidden my-auto flex flex-col justify-between max-h-[96dvh] transition-all duration-500 shadow-2xl"
        style={{
          background: `linear-gradient(to bottom, ${theme.colors.darkRich}, ${theme.colors.darkSurface}, ${theme.colors.darkDeep})`,
          borderColor: theme.colors.borderLight,
          boxShadow: `0 0 50px ${theme.colors.glowShadow}`
        }}
      >
        {/* Decorative Background Elements */}
        <div 
          className="absolute -top-24 -left-24 w-40 h-40 sm:w-48 sm:h-48 rounded-full blur-3xl pointer-events-none" 
          style={{ backgroundColor: `${theme.colors.glow}26` }}
        />
        <div 
          className="absolute -bottom-24 -right-24 w-40 h-40 sm:w-48 sm:h-48 rounded-full blur-3xl pointer-events-none" 
          style={{ backgroundColor: `${theme.colors.gold}20` }}
        />

        {/* Top Header Section */}
        <div className="flex flex-col items-center">
          {/* Header Icon */}
          <div 
            className="inline-flex items-center justify-center w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full border mb-1.5 sm:mb-2.5 shadow-md transition-colors duration-500"
            style={{
              backgroundColor: theme.colors.darkAccent,
              borderColor: theme.colors.borderLight,
              color: theme.colors.textLight,
              boxShadow: `0 0 15px ${theme.colors.glowShadow}`
            }}
          >
            <Heart className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 fill-current" />
          </div>

          <h1 
            className="font-serif text-lg xs:text-xl sm:text-2xl md:text-3xl tracking-wide mb-0.5 transition-colors duration-500"
            style={{ color: theme.colors.textLight }}
          >
            Royal Wedding Invitation
          </h1>
          <p 
            className="font-sans text-[11px] xs:text-xs sm:text-sm mb-2 sm:mb-3 leading-snug opacity-90 transition-colors duration-500 max-w-xs sm:max-w-md mx-auto"
            style={{ color: theme.colors.textLightMuted }}
          >
            Welcome! Please choose how you would like to experience this invitation:
          </p>

          {/* Quick Color Palette Selector Strip */}
          <div 
            className="w-full flex items-center justify-between px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl mb-2.5 sm:mb-4 border transition-all"
            style={{
              backgroundColor: `${theme.colors.darkDeep}99`,
              borderColor: theme.colors.borderLight
            }}
          >
            <div className="flex items-center gap-1.5 text-[10px] xs:text-[11px] font-serif" style={{ color: theme.colors.textLight }}>
              <Palette className="w-3 h-3 xs:w-3.5 xs:h-3.5" style={{ color: theme.colors.gold }} />
              <span className="font-semibold">Theme:</span>
              <span className="text-[10px] opacity-80 truncate max-w-[80px] xs:max-w-[120px] sm:max-w-none">{theme.name}</span>
            </div>

            <div className="flex items-center gap-1 xs:gap-1.5">
              {themes.map((t) => {
                const active = t.id === themeId;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    title={`${t.name} (${t.subtitle})`}
                    className={`w-4 h-4 xs:w-5 xs:h-5 rounded-full transition-transform cursor-pointer relative border ${
                      active ? 'scale-125 ring-2 ring-white shadow-md' : 'opacity-70 hover:opacity-100 hover:scale-110'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${t.colors.darkRich} 50%, ${t.colors.lightAccent} 50%)`,
                      borderColor: active ? t.colors.gold : 'rgba(255,255,255,0.4)'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Choice Cards Grid (Stacked gracefully on mobile, 2-column on tablet/desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-2.5 sm:gap-4 mb-2.5 sm:mb-4">
          
          {/* Option A: AI Magic Mode */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('magic')}
            className="cursor-pointer border-2 rounded-xl sm:rounded-2xl p-2.5 xs:p-3 sm:p-4 text-left flex flex-col justify-between relative shadow-md transition-all group"
            style={{
              backgroundColor: `${theme.colors.darkAccent}99`,
              borderColor: theme.colors.border,
              boxShadow: `0 0 16px ${theme.colors.glowShadow}`
            }}
          >
            <div 
              className="absolute top-2 right-2 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shadow-xs"
              style={{
                backgroundColor: theme.colors.border,
                color: theme.colors.darkRich
              }}
            >
              Recommended
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
                <div 
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: `${theme.colors.border}33`, color: theme.colors.textLight }}
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: theme.colors.gold }} />
                </div>
                <h3 
                  className="font-serif text-sm xs:text-base sm:text-lg font-semibold"
                  style={{ color: theme.colors.textLight }}
                >
                  AI Magic Mode
                </h3>
              </div>
              <p className="text-[10px] xs:text-[11px] leading-tight mb-2 opacity-85" style={{ color: theme.colors.textLightMuted }}>
                Camera gestures for heart detection, smiling flower blooms & blow-out candles.
              </p>
            </div>

            <button 
              className="w-full py-1.5 xs:py-2 sm:py-2.5 rounded-lg font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
              style={{
                background: `linear-gradient(to right, ${theme.colors.border}, ${theme.colors.lightAccent})`,
                color: theme.colors.darkRich
              }}
            >
              <Camera className="w-3 h-3 xs:w-3.5 xs:h-3.5" /> Start Magic Mode
            </button>
          </motion.div>

          {/* Option B: Standard Classic Mode */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('classic')}
            className="cursor-pointer border rounded-xl sm:rounded-2xl p-2.5 xs:p-3 sm:p-4 text-left flex flex-col justify-between shadow-xs transition-all group"
            style={{
              backgroundColor: `${theme.colors.darkDeep}CC`,
              borderColor: theme.colors.borderLight
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
                <div 
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                >
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: theme.colors.border }} />
                </div>
                <h3 
                  className="font-serif text-sm xs:text-base sm:text-lg font-semibold"
                  style={{ color: theme.colors.textLightMuted }}
                >
                  Classic Mode
                </h3>
              </div>
              <p className="text-[10px] xs:text-[11px] leading-tight mb-2 opacity-75" style={{ color: theme.colors.textLightMuted }}>
                Traditional touch & click digital invitation experience with wax seal opening.
              </p>
            </div>

            <button 
              className="w-full py-1.5 xs:py-2 sm:py-2.5 rounded-lg border font-semibold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: theme.colors.textLight,
                borderColor: theme.colors.borderLight
              }}
            >
              <Check className="w-3 h-3 xs:w-3.5 xs:h-3.5" /> Classic Invitation
            </button>
          </motion.div>

        </div>

        {/* Privacy Note */}
        <div 
          className="flex items-center justify-center gap-1.5 text-[9px] xs:text-[10px] uppercase tracking-wider pt-1.5 sm:pt-2 border-t border-white/10 opacity-80"
          style={{ color: theme.colors.border }}
        >
          <ShieldCheck className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
          <span>100% Private &bull; No Video Saved or Transmitted</span>
        </div>

      </motion.div>
    </motion.div>
  );
}
