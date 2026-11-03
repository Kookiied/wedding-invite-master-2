import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import { Clock, MapPin } from 'lucide-react';
import { FallingFloraPetals, FlyingButterflies } from './FallingFlora';
import { useTheme } from '../context/ThemeContext';
import { usePattern } from '../context/PatternContext';

export default function EventTimeline() {
  const { theme } = useTheme();
  const { pattern, patternId, patternOpacity } = usePattern();
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [activeEventId, setActiveEventId] = useState(null);
  const containerRef = useRef(null);

  // Track scroll position as user scrolls through the schedule section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 15%"]
  });

  // Smooth out progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  // Map progress to percentage along vertical line
  const lotusTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const timelineLineColor = theme.colors.timelineLine || theme.colors.border;
  const timelineLineLight = theme.colors.timelineLineLight || theme.colors.borderLight;

  return (
    <section 
      className="relative w-full py-16 md:py-24 px-1 sm:px-4 md:px-8 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: theme.colors.darkAccent,
        color: theme.colors.textLightMuted
      }}
    >
      
      {/* 1. Falling Flora (Flowers and Leaves) at the back of the pattern */}
      <FallingFloraPetals />
      
      {/* 2. Royal Mughal Islamic Girih Geometric Background with Luminous Bursts (Selected via PatternSwitcher) */}
      {patternId !== 'none' && pattern.svgUrl && patternOpacity > 0 && (
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden z-[1]"
          aria-hidden="true"
        >
          {/* Soft Ambient Radial Luminous Bursts */}
          <div 
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: Math.min(1, patternOpacity * 2),
              background: `
                radial-gradient(circle at 50% 12%, ${theme.colors.glow}33 0%, transparent 60%),
                radial-gradient(circle at 15% 42%, ${theme.colors.borderLight} 0%, transparent 50%),
                radial-gradient(circle at 85% 68%, ${theme.colors.glow}26 0%, transparent 55%),
                radial-gradient(circle at 50% 92%, ${theme.colors.borderLight} 0%, transparent 60%)
              `
            }}
          />

          {/* Delicate Seamless Geometric Pattern with Radiant Edge Fade */}
          <div 
            className="absolute inset-0 transition-all duration-200"
            style={{
              backgroundImage: `url(${pattern.svgUrl})`,
              backgroundRepeat: 'repeat',
              backgroundSize: pattern.scaleDesktop,
              opacity: patternOpacity,
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)'
            }}
          />
        </div>
      )}

      {/* 3. Flying Butterflies positioned ABOVE / in front of the pattern */}
      <FlyingButterflies />

      {/* Section Header */}
      <div className="text-center max-w-md mx-auto mb-16 relative z-10">
        <span 
          className="font-sans text-xs uppercase tracking-[0.3em] font-semibold block mb-2 transition-colors duration-500"
          style={{ color: theme.colors.textLight }}
        >
          Itinerary
        </span>
        <h2 
          className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl transition-colors duration-500"
          style={{ color: theme.colors.textLight }}
        >
          Schedule of Events
        </h2>
        <div 
          className="w-16 h-0.5 mx-auto mt-3 rounded-full opacity-60 transition-colors duration-500" 
          style={{ backgroundColor: timelineLineColor }}
        />
      </div>

      <div ref={containerRef} className="max-w-lg md:max-w-3xl lg:max-w-4xl mx-auto relative px-1 md:px-4 z-10">
        
        {/* Central Vertical Line */}
        <div 
          className="absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 pointer-events-none transition-all duration-500"
          style={{
            background: `linear-gradient(to bottom, ${timelineLineLight}, ${timelineLineColor}, ${timelineLineLight})`,
            boxShadow: `0 0 10px ${timelineLineLight}`
          }}
        >
          
          {/* Scroll-driven Lotus/Rose Traveling Node */}
          <motion.div 
            style={{ top: lotusTop }}
            className="absolute -left-3.5 sm:-left-5 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center"
          >
            <div className="relative w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center">
              {/* Soft halo glow */}
              <div 
                className="absolute inset-0 rounded-full blur-md animate-pulse" 
                style={{ backgroundColor: `${timelineLineColor}99` }}
              />

              {/* White Lotus / Rose Image Asset with subtle theme filter */}
              <img 
                src="/lotus.png" 
                alt="Lotus Symbol" 
                className="w-6 h-6 sm:w-9 sm:h-9 object-contain relative z-10 transition-transform hover:scale-110"
                style={{ filter: `drop-shadow(0 2px 8px ${timelineLineColor})` }}
              />
            </div>
          </motion.div>

        </div>

        {/* Loop Days */}
        {weddingData.schedule.map((dayGroup) => (
          <div key={dayGroup.dayTitle} className="mb-16 last:mb-0">
            
            {/* Day Title Header Banner */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sticky top-4 z-20 flex justify-center mb-8"
            >
              <div 
                className="border px-5 sm:px-8 md:px-12 py-2 md:py-3 rounded-full shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-500"
                style={{
                  backgroundColor: `${theme.colors.darkRich}F2`,
                  borderColor: theme.colors.borderLight,
                  color: theme.colors.textLight,
                  boxShadow: `0 4px 20px ${theme.colors.glowShadow}`
                }}
              >
                <div className="text-center">
                  <span className="font-serif font-bold text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.2em] uppercase block leading-none">
                    {dayGroup.dayTitle}
                  </span>
                  <span className="font-sans text-[9px] uppercase tracking-[0.25em] block mt-1.5 opacity-80">
                    {dayGroup.dayOfWeek}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Day Events - Alternating Left & Right with center clearance */}
            <div className="space-y-14">
              {dayGroup.events.map((event, eventIdx) => {
                const isEven = eventIdx % 2 === 0;
                const isGlowing = hoveredEventId === event.id || activeEventId === event.id;

                return (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: eventIdx * 0.1 }}
                    className="relative flex items-center"
                  >
                    {/* Delicate Diamond Marker */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center pointer-events-none">
                      <div 
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 transition-all duration-500"
                        style={{
                          backgroundColor: timelineLineColor,
                          boxShadow: isGlowing 
                            ? `0 0 10px ${timelineLineColor}` 
                            : `0 0 4px ${timelineLineLight}`
                        }}
                      />
                    </div>

                    {/* Event Content Card */}
                    <div className={`w-1/2 ${isEven ? 'pr-4 sm:pr-8 text-left sm:text-right' : 'ml-auto pl-4 sm:pl-8 text-left'}`}>

                      <div 
                        onMouseEnter={() => setHoveredEventId(event.id)}
                        onMouseLeave={() => setHoveredEventId(null)}
                        onClick={() => setActiveEventId(activeEventId === event.id ? null : event.id)}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isGlowing}
                        className="border rounded-2xl p-4 sm:p-7 shadow-2xl transition-all duration-500 ease-out text-left relative cursor-pointer select-none"
                        style={{
                          backgroundColor: `${theme.colors.darkRich}F2`,
                          borderColor: isGlowing ? theme.colors.border : theme.colors.borderLight,
                          boxShadow: isGlowing 
                            ? `0 0 16px ${theme.colors.glowShadow}, 0 8px 30px rgba(0,0,0,0.4)`
                            : `0 8px 30px rgba(0,0,0,0.4)`
                        }}
                      >
                        {/* Event Number & Time */}
                        <div 
                          className={`flex items-center gap-1 mb-2 text-[11px] sm:text-sm md:text-base font-semibold ${isEven ? 'justify-start sm:justify-end' : 'justify-start'}`}
                          style={{ color: theme.colors.textLight }}
                        >
                          <span className="font-serif opacity-75">
                            {event.number} &bull;
                          </span>
                          <span 
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full border text-[11px] sm:text-sm md:text-base font-bold transition-colors duration-500"
                            style={{
                              backgroundColor: theme.colors.darkAccent,
                              borderColor: theme.colors.borderLight,
                              color: theme.colors.textLight
                            }}
                          >
                            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: theme.colors.textLight }} />
                            {event.time}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 
                          className={`font-serif text-base sm:text-xl md:text-3xl lg:text-4xl font-black mb-2 leading-snug transition-colors duration-500 ${event.title.includes("WEDDING") ? 'text-base sm:text-2xl md:text-4xl lg:text-5xl tracking-wider' : ''}`}
                          style={{ color: theme.colors.textLight }}
                        >
                          {event.title}
                        </h3>

                        {/* Location */}
                        <div 
                          className={`flex items-center gap-1 text-[11px] sm:text-sm md:text-base font-semibold mb-2 ${isEven ? 'justify-start sm:justify-end' : 'justify-start'}`}
                          style={{ color: theme.colors.textLightMuted }}
                        >
                          <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" style={{ color: theme.colors.glow }} />
                          <span>{event.location}</span>
                        </div>

                        {/* Description */}
                        <p 
                          className="font-sans text-[11px] sm:text-sm md:text-base leading-relaxed font-normal opacity-90 transition-colors duration-500"
                          style={{ color: theme.colors.textLightMuted }}
                        >
                          {event.description.includes("Vivek and Varun") ? (
                            <>
                              <strong 
                                className="font-extrabold text-[13px] sm:text-base md:text-lg tracking-wide font-sans"
                                style={{ color: theme.colors.textLight }}
                              >
                                Vivek and Varun
                              </strong>
                              {event.description.replace("Vivek and Varun", "")}
                            </>
                          ) : (
                            event.description
                          )}
                        </p>

                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}
