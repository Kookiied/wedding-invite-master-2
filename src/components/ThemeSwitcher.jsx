import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronDown } from 'lucide-react';
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
      className="fixed top-12 sm:top-14 right-3.5 sm:right-5 z-[9999] flex flex-col items-end pointer-events-auto select-none"
    >
      {/* Sleek Theme Button with Arrow */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Close themes" : "Open themes"}
        title={isExpanded ? "Click to close" : "Click to choose theme"}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl border shadow-lg cursor-pointer transition-all duration-300"
        style={{
          backgroundColor: `${theme.colors.darkRich}E6`,
          borderColor: theme.colors.borderLight,
          boxShadow: `0 4px 18px ${theme.colors.glowShadow}`
        }}
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

        {/* Arrow Button - Rotates smoothly downwards when open */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex items-center justify-center ml-0.5"
        >
          <ChevronDown className="w-3.5 h-3.5 text-white/80" />
        </motion.div>
      </motion.button>

      {/* Downward Sliding Vertical Stack of 6 Circular Color Palettes */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="flex flex-col items-center gap-2.5 sm:gap-3 py-3 px-2 rounded-full backdrop-blur-2xl border shadow-2xl overflow-hidden mt-1.5"
            style={{
              backgroundColor: `${theme.colors.darkRich}F2`,
              borderColor: theme.colors.borderLight,
              boxShadow: `0 8px 30px ${theme.colors.glowShadow}`
            }}
          >
            {themes.map((t, idx) => {
              const isActive = t.id === themeId;
              return (
                <motion.button
                  key={t.id}
                  initial={{ scale: 0, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: -10 }}
                  transition={{ delay: idx * 0.025, duration: 0.18 }}
                  onClick={() => {
                    setTheme(t.id);
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label={`Switch to ${t.name}`}
                  title={`${t.name} (${t.subtitle})`}
                  className={`relative rounded-full transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive 
                      ? 'ring-2 ring-[#FFD700] ring-offset-2 ring-offset-black/50' 
                      : 'hover:ring-1 hover:ring-white/90'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 14px ${t.colors.gold}` : '0 2px 8px rgba(0,0,0,0.35)'
                  }}
                >
                  {/* Glossy Circular Dual-Tone Swatch - 100% Clear & Vivid */}
                  <div 
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[1.5px] shadow-md relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${t.colors.darkRich} 50%, ${t.colors.lightAccent} 50%)`,
                      borderColor: isActive ? t.colors.gold : 'rgba(255,255,255,0.85)'
                    }}
                  >
                    {/* Subtle Pure Glass Sheen without milkiness */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
                  </div>

                  {/* Active theme indicator dot */}
                  {isActive && (
                    <span 
                      className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-black/50"
                      style={{ backgroundColor: t.colors.gold }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
