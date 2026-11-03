import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, ChevronDown, Ban, Sliders, Sparkles, EyeOff } from 'lucide-react';
import { usePattern } from '../context/PatternContext';
import { useTheme } from '../context/ThemeContext';

export default function PatternSwitcher({ isOpen, onToggle, onClose }) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = isOpen !== undefined ? isOpen : internalExpanded;
  const toggleExpanded = onToggle || (() => setInternalExpanded(prev => !prev));
  const closeExpanded = onClose || (() => setInternalExpanded(false));

  const { pattern, patternId, setPattern, patterns, patternOpacity, setPatternOpacity } = usePattern();
  const { theme } = useTheme();
  const switcherRef = useRef(null);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        closeExpanded();
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
  }, [isExpanded, closeExpanded]);

  return (
    <div 
      ref={switcherRef}
      className="relative flex flex-col items-end pointer-events-auto select-none"
    >
      {/* Sleek Pattern Button with Arrow (Stacked below Theme) */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={toggleExpanded}
        aria-label={isExpanded ? "Close pattern controls" : "Open pattern controls"}
        title={isExpanded ? "Click to close" : "Click to choose background pattern and opacity"}
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

        {/* Mini level indicator badge when pattern is active */}
        {patternId !== 'none' && (
          <span className="text-[9px] font-mono px-1 py-0.2 rounded-full bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30 font-bold">
            {Math.round(patternOpacity * 100)}%
          </span>
        )}

        {/* Arrow Button - Rotates smoothly downwards when open */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex items-center justify-center ml-0.5"
        >
          <ChevronDown className="w-3.5 h-3.5 text-white/80" />
        </motion.div>
      </motion.button>

      {/* Downward Sliding Luxury Control Panel with Opacity Level Slider & Pattern Selection */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="w-64 sm:w-72 p-3 sm:p-3.5 rounded-2xl backdrop-blur-2xl border shadow-2xl flex flex-col gap-3 mt-1.5 overflow-hidden"
            style={{
              backgroundColor: `${theme.colors.darkRich}F5`,
              borderColor: theme.colors.borderLight,
              boxShadow: `0 10px 35px ${theme.colors.glowShadow}`
            }}
          >
            {/* Header: Title & Current Status */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <Grid className="w-3.5 h-3.5 text-[#FFD700]" />
                <span className="font-serif text-xs font-bold tracking-wider" style={{ color: theme.colors.textLight }}>
                  Pattern & Level
                </span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                {patternId === 'none' ? 'Disabled' : pattern.name}
              </span>
            </div>

            {/* 1. Opacity / Volume Level Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-serif font-semibold text-white/90 flex items-center gap-1.5">
                  <Sliders className="w-3 h-3 text-[#FFD700]" />
                  Line Opacity Level
                </span>
                <span 
                  className="px-2 py-0.5 rounded-full font-mono text-[11px] font-bold border"
                  style={{
                    backgroundColor: `${theme.colors.gold}20`,
                    color: theme.colors.gold,
                    borderColor: `${theme.colors.gold}40`
                  }}
                >
                  {Math.round(patternOpacity * 100)}%
                </span>
              </div>

              {/* Volume-Style Slider Track */}
              <div className="flex items-center gap-2 px-1">
                <EyeOff className="w-3.5 h-3.5 text-white/40 shrink-0" title="0% - Vanish" />
                <input 
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={Math.round(patternOpacity * 100)}
                  onChange={(e) => {
                    const val = Number(e.target.value) / 100;
                    setPatternOpacity(val);
                    // If user slides up while pattern is none, activate the first pattern
                    if (patternId === 'none' && val > 0) {
                      setPattern('pattern-1');
                    }
                  }}
                  className="luxury-slider flex-1"
                  aria-label="Adjust pattern opacity level"
                />
                <Sparkles className="w-3.5 h-3.5 text-[#FFD700] shrink-0" title="100% - Bold" />
              </div>

              {/* Quick Presets for Instant Level Selection */}
              <div className="grid grid-cols-4 gap-1 pt-1">
                {[
                  { label: '0% Vanish', value: 0 },
                  { label: '25% Soft', value: 0.25 },
                  { label: '50% Mid', value: 0.5 },
                  { label: '85% Rich', value: 0.85 }
                ].map((preset) => {
                  const isPresetActive = Math.abs(patternOpacity - preset.value) < 0.05;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setPatternOpacity(preset.value);
                        if (preset.value > 0 && patternId === 'none') {
                          setPattern('pattern-1');
                        }
                      }}
                      className={`py-1 px-1 rounded text-[10px] font-mono font-medium transition-all cursor-pointer text-center ${
                        isPresetActive
                          ? 'bg-[#FFD700] text-black font-bold shadow-md'
                          : 'bg-white/10 hover:bg-white/20 text-white/70'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hairline Divider */}
            <div 
              className="w-full h-px" 
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)' }} 
            />

            {/* 2. Pattern Selectors (6 options) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[10px] text-white/60 mb-0.5">
                <span>SELECT DESIGN</span>
                <span>{patterns.length} options</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-0.5 scrollbar-thin">
                {patterns.map((p) => {
                  const isActive = p.id === patternId;
                  return (
                    <motion.button
                      key={p.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPattern(p.id)}
                      className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all cursor-pointer text-left ${
                        isActive
                          ? 'border-[#FFD700] bg-white/15 shadow-sm'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      {/* Swatch Icon / Preview */}
                      <div 
                        className="w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 relative overflow-hidden"
                        style={{
                          borderColor: isActive ? '#FFD700' : 'rgba(255,255,255,0.3)',
                          backgroundColor: isActive ? 'rgba(255,215,0,0.2)' : 'rgba(0,0,0,0.3)'
                        }}
                      >
                        {p.svgUrl && (
                          <div 
                            className="absolute inset-0 opacity-40 pointer-events-none"
                            style={{
                              backgroundImage: `url(${p.svgUrl})`,
                              backgroundSize: '20px 20px',
                              backgroundRepeat: 'repeat'
                            }}
                          />
                        )}
                        {p.id === 'none' ? (
                          <Ban className="w-3.5 h-3.5 text-white/70 relative z-10" />
                        ) : (
                          <span className="text-xs relative z-10">{p.icon}</span>
                        )}
                      </div>

                      {/* Name & Subtitle */}
                      <div className="min-w-0 flex-1">
                        <p className={`font-serif text-[11px] leading-tight truncate font-bold ${
                          isActive ? 'text-[#FFD700]' : 'text-white/90'
                        }`}>
                          {p.name}
                        </p>
                        <p className="text-[9px] text-white/50 truncate leading-tight">
                          {p.id === 'none' ? 'Plain dark' : p.subtitle.split(' ')[0]}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
