import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, themeId, setTheme, themes } = useTheme();
  const switcherRef = useRef(null);

  // Click outside listener to slide close automatically
  useEffect(() => {
    function handleClickOutside(event) {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    }
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div 
      ref={switcherRef}
      className="fixed top-12 sm:top-14 right-3 sm:right-5 z-[9999] flex items-center justify-end pointer-events-auto select-none"
    >
      <div 
        className="flex items-center p-1 sm:p-1.5 rounded-full backdrop-blur-xl border shadow-xl transition-all duration-300"
        style={{
          backgroundColor: `${theme.colors.darkRich}E6`,
          borderColor: theme.colors.borderLight,
          boxShadow: `0 4px 20px ${theme.colors.glowShadow}`
        }}
      >
        {/* All Six Circular Color Palettes - Slides smoothly open to the left */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0, x: 20 }}
              animate={{ width: 'auto', opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="flex items-center gap-1.5 sm:gap-2 overflow-hidden pl-1.5 pr-1"
            >
              {themes.map((t, idx) => {
                const isActive = t.id === themeId;
                return (
                  <motion.button
                    key={t.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: idx * 0.025, duration: 0.18 }}
                    onClick={() => setTheme(t.id)}
                    aria-label={`Switch to ${t.name}`}
                    title={`${t.name} (${t.subtitle})`}
                    className={`relative rounded-full transition-all duration-200 cursor-pointer shrink-0 ${
                      isActive 
                        ? 'scale-115 ring-2 shadow-lg' 
                        : 'opacity-70 hover:opacity-100 hover:scale-110'
                    }`}
                    style={{
                      ringColor: t.colors.gold,
                      boxShadow: isActive ? `0 0 12px ${t.colors.gold}` : 'none'
                    }}
                  >
                    {/* Glossy Circular Dual-Tone Swatch */}
                    <div 
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border shadow-inner relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${t.colors.darkRich} 50%, ${t.colors.lightAccent} 50%)`,
                        borderColor: isActive ? t.colors.gold : 'rgba(255,255,255,0.4)'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/35 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Active theme indicator dot */}
                    {isActive && (
                      <span 
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: t.colors.gold }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimalistic & Sleek Toggle Button: Theme Icon + Active Color Swatch + Arrow */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Close theme palettes" : "Open theme palettes"}
          title={isExpanded ? "Click arrow to close" : "Click arrow to choose theme"}
          className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full hover:bg-white/10 cursor-pointer transition-colors duration-200 shrink-0"
        >
          <Palette className="w-3.5 h-3.5 text-[#FFD700]" />
          
          {/* Active Theme Mini Circular Dual-Tone Jewel */}
          <div 
            className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-inner relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.darkRich} 50%, ${theme.colors.lightAccent} 50%)`
            }}
          />
          
          <span 
            className="font-serif text-[11px] font-bold tracking-wider"
            style={{ color: theme.colors.textLight }}
          >
            Theme
          </span>

          {/* The Arrow Button - Rotates direction smoothly when open vs closed */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center ml-0.5"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-white/80" />
          </motion.div>
        </button>

      </div>
    </div>
  );
}
