import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import { Clock, MapPin } from 'lucide-react';
import FallingFlora from './FallingFlora';
import { useTheme } from '../context/ThemeContext';

export default function EventTimeline() {
  const { theme } = useTheme();
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

  return (
    <section 
      className="relative w-full py-16 md:py-24 px-1 sm:px-4 md:px-8 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: theme.colors.darkAccent,
        color: theme.colors.textLightMuted
      }}
    >
      
      {/* Falling Flora and Butterfly Background Animation */}
      <FallingFlora />
      
      {/* Section Header */}
      <div className="text-center max-w-md mx-auto mb-16">
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
          style={{ backgroundColor: theme.colors.border }}
        />
      </div>

      <div ref={containerRef} className="max-w-lg md:max-w-3xl lg:max-w-4xl mx-auto relative px-1 md:px-4">
        
        {/* Central Vertical Line */}
        <div 
          className="absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 pointer-events-none transition-all duration-500"
          style={{
            background: `linear-gradient(to bottom, ${theme.colors.borderLight}, ${theme.colors.border}, ${theme.colors.borderLight})`
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
                style={{ backgroundColor: `${theme.colors.glow}99` }}
              />

              {/* White Lotus / Rose Image Asset with subtle theme filter */}
              <img 
                src="/lotus.png" 
                alt="Lotus Symbol" 
                className="w-6 h-6 sm:w-9 sm:h-9 object-contain relative z-10 transition-transform hover:scale-110"
                style={{ filter: `drop-shadow(0 2px 8px ${theme.colors.border})` }}
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
                    <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                      <div 
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 transition-colors duration-500"
                        style={{
                          backgroundColor: theme.colors.border,
                          boxShadow: `0 0 6px ${theme.colors.glow}`
                        }}
                      />
                    </div>

                    {/* Event Content Card */}
                    <div className={`w-1/2 ${isEven ? 'pr-4 sm:pr-8 text-left sm:text-right' : 'ml-auto pl-4 sm:pl-8 text-left'}`}>

                      <div 
                        className="border rounded-2xl p-4 sm:p-7 shadow-2xl transition-all duration-500 group text-left"
                        style={{
                          backgroundColor: `${theme.colors.darkRich}F2`,
                          borderColor: theme.colors.borderLight,
                          boxShadow: `0 8px 30px rgba(0,0,0,0.4)`
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
