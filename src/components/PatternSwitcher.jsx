import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, ChevronDown, Ban } from 'lucide-react';
import { usePattern } from '../context/PatternContext';
import { useTheme } from '../context/ThemeContext';

export default function PatternSwitcher() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pattern, patternId, setPattern, patterns } = usePattern();
  const { theme } = useTheme();
  const switcherRef = useRef(null);

  // Click outside listener
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
      className="fixed top-12 sm:top-14 right-[136px] sm:right-[150px] z-[9999] flex flex-col items-end pointer-events-auto select-none"
    >
      {/* Sleek Pattern Button with Arrow */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Close pattern selection" : "Open pattern selection"}
        title={isExpanded ? "Click to close" : "Click to choose background pattern"}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl border shadow-lg cursor-pointer transition-all duration-300"
        style={{
          backgroundColor: `${theme.colors.darkRich}E6`,
          borderColor: theme.colors.borderLight,
          boxShadow: `0 4px 18px ${theme.colors.glowShadow}`
        }}
      >
        <Grid className="w-3.5 h-3.5 text-[#FFD700]" />
        
        <span 
          className="font-serif text-[11px] font-bold tracking-wider"
          style={{ color: theme.colors.textLight }}
        >
          {patternId === 'none' ? 'Pattern' : pattern.name.split(' ')[0]}
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

      {/* Downward Sliding Vertical Stack of Pattern Options */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="flex flex-col items-center gap-2 sm:gap-2.5 py-2.5 px-2 rounded-full backdrop-blur-2xl border shadow-2xl overflow-y-auto max-h-[82vh] mt-1.5 scrollbar-none"
            style={{
              backgroundColor: `${theme.colors.darkRich}F2`,
              borderColor: theme.colors.borderLight,
              boxShadow: `0 8px 30px ${theme.colors.glowShadow}`
            }}
          >
            {patterns.map((p, idx) => {
              const isActive = p.id === patternId;
              return (
                <motion.button
                  key={p.id}
                  initial={{ scale: 0, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: -10 }}
                  transition={{ delay: idx * 0.025, duration: 0.18 }}
                  onClick={() => {
                    setPattern(p.id);
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label={`Switch to ${p.name}`}
                  title={`${p.name} (${p.subtitle})`}
                  className={`relative rounded-full transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive 
                      ? 'ring-2 ring-[#FFD700] ring-offset-2 ring-offset-black/50' 
                      : 'hover:ring-1 hover:ring-white/90'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 14px ${theme.colors.gold}` : '0 2px 8px rgba(0,0,0,0.35)'
                  }}
                >
                  {/* Swatch Icon Circle */}
                  <div 
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[1.5px] shadow-md relative overflow-hidden flex items-center justify-center font-serif text-xs font-bold"
                    style={{
                      backgroundColor: isActive ? theme.colors.darkAccent : `${theme.colors.darkSurface}E6`,
                      borderColor: isActive ? theme.colors.gold : 'rgba(255,255,255,0.85)',
                      color: isActive ? theme.colors.gold : theme.colors.textLight
                    }}
                  >
                    {p.svgUrl && (
                      <div 
                        className="absolute inset-0 opacity-30 pointer-events-none"
                        style={{
                          backgroundImage: `url(${p.svgUrl})`,
                          backgroundSize: '28px 28px',
                          backgroundRepeat: 'repeat'
                        }}
                      />
                    )}
                    {p.id === 'none' ? (
                      <Ban className="w-3.5 h-3.5 opacity-80 relative z-10" />
                    ) : (
                      <span className="relative z-10">{p.icon}</span>
                    )}
                  </div>

                  {/* Active indicator dot */}
                  {isActive && (
                    <span 
                      className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-black/50"
                      style={{ backgroundColor: theme.colors.gold }}
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
