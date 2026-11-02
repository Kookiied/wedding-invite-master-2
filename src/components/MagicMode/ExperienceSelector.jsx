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
      className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md p-4 sm:p-6 select-none transition-colors duration-500"
      style={{ backgroundColor: `${theme.colors.darkDeep}F2` }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-lg border-2 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden transition-all duration-500"
        style={{
          background: `linear-gradient(to bottom, ${theme.colors.darkRich}, ${theme.colors.darkSurface}, ${theme.colors.darkDeep})`,
          borderColor: theme.colors.borderLight,
          boxShadow: `0 0 60px ${theme.colors.glowShadow}`
        }}
      >
        {/* Decorative Background Elements */}
        <div 
          className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none" 
          style={{ backgroundColor: `${theme.colors.glow}33` }}
        />
        <div 
          className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none" 
          style={{ backgroundColor: `${theme.colors.gold}22` }}
        />

        {/* Header Icon */}
        <div 
          className="inline-flex items-center justify-center w-14 h-14 rounded-full border mb-4 shadow-lg transition-colors duration-500"
          style={{
            backgroundColor: theme.colors.darkAccent,
            borderColor: theme.colors.borderLight,
            color: theme.colors.textLight,
            boxShadow: `0 0 20px ${theme.colors.glowShadow}`
          }}
        >
          <Heart className="w-7 h-7 fill-current" />
        </div>

        <h1 
          className="font-serif text-2xl sm:text-3xl tracking-wide mb-1 transition-colors duration-500"
          style={{ color: theme.colors.textLight }}
        >
          Royal Wedding Invitation
        </h1>
        <p 
          className="font-sans text-xs sm:text-sm mb-4 leading-relaxed opacity-90 transition-colors duration-500"
          style={{ color: theme.colors.textLightMuted }}
        >
          Welcome! Please choose how you would like to experience this invitation:
        </p>

        {/* Quick Color Palette Selector Strip */}
        <div 
          className="flex items-center justify-between p-2.5 rounded-2xl mb-5 border transition-all"
          style={{
            backgroundColor: `${theme.colors.darkDeep}99`,
            borderColor: theme.colors.borderLight
          }}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-serif" style={{ color: theme.colors.textLight }}>
            <Palette className="w-3.5 h-3.5" style={{ color: theme.colors.gold }} />
            <span className="font-semibold">Theme:</span>
            <span className="text-[10px] opacity-80 truncate max-w-[90px] sm:max-w-none">{theme.name}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {themes.map((t) => {
              const active = t.id === themeId;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  title={`${t.name} (${t.subtitle})`}
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer relative border ${
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

        {/* Choice Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          
          {/* Option A: AI Magic Mode */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('magic')}
            className="cursor-pointer border-2 rounded-2xl p-5 text-left flex flex-col justify-between relative shadow-lg transition-all group"
            style={{
              backgroundColor: `${theme.colors.darkAccent}99`,
              borderColor: theme.colors.border,
              boxShadow: `0 0 20px ${theme.colors.glowShadow}`
            }}
          >
            <div 
              className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm"
              style={{
                backgroundColor: theme.colors.border,
                color: theme.colors.darkRich
              }}
            >
              Recommended
            </div>
            
            <div>
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${theme.colors.border}33`, color: theme.colors.textLight }}
              >
                <Sparkles className="w-5 h-5" style={{ color: theme.colors.gold }} />
              </div>
              <h3 
                className="font-serif text-lg font-semibold mb-1"
                style={{ color: theme.colors.textLight }}
              >
                AI Magic Mode
              </h3>
              <p className="text-[11px] leading-relaxed mb-3 opacity-80" style={{ color: theme.colors.textLightMuted }}>
                Camera-activated experience with hand gesture heart detection, smile flower blooms & blow-out candle.
              </p>
            </div>

            <button 
              className="w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-colors"
              style={{
                background: `linear-gradient(to right, ${theme.colors.border}, ${theme.colors.lightAccent})`,
                color: theme.colors.darkRich
              }}
            >
              <Camera className="w-3.5 h-3.5" /> Start Magic Mode
            </button>
          </motion.div>

          {/* Option B: Standard Classic Mode */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('classic')}
            className="cursor-pointer border rounded-2xl p-5 text-left flex flex-col justify-between shadow-sm transition-all group"
            style={{
              backgroundColor: `${theme.colors.darkDeep}CC`,
              borderColor: theme.colors.borderLight
            }}
          >
            <div>
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
              >
                <Heart className="w-5 h-5" style={{ color: theme.colors.border }} />
              </div>
              <h3 
                className="font-serif text-lg font-semibold mb-1"
                style={{ color: theme.colors.textLightMuted }}
              >
                Classic Mode
              </h3>
              <p className="text-[11px] leading-relaxed mb-3 opacity-70" style={{ color: theme.colors.textLightMuted }}>
                Traditional touch & click digital invitation experience with wax seal opening.
              </p>
            </div>

            <button 
              className="w-full py-2.5 rounded-xl border font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: theme.colors.textLight,
                borderColor: theme.colors.borderLight
              }}
            >
              <Check className="w-3.5 h-3.5" /> Classic Invitation
            </button>
          </motion.div>

        </div>

        {/* Privacy Note */}
        <div 
          className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest pt-2 border-t border-white/10 opacity-80"
          style={{ color: theme.colors.border }}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Private & Secure &bull; No Video Saved or Transmitted</span>
        </div>

      </motion.div>
    </motion.div>
  );
}
