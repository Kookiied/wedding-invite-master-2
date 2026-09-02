import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import { Clock, MapPin } from 'lucide-react';
import FallingFlora from './FallingFlora';

export default function EventTimeline() {
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
    <section className="relative w-full bg-[#5E0B2B] text-[#FFF0F5] py-16 px-1 sm:px-4 overflow-hidden">
      
      {/* Falling Flora and Butterfly Background Animation */}
      <FallingFlora />
      
      {/* Section Header */}
      <div className="text-center max-w-md mx-auto mb-16">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#F8C8DC] font-semibold block mb-2">
          Itinerary
        </span>
        <h2 className="font-script text-5xl sm:text-6xl text-[#F8C8DC]">
          Schedule of Events
        </h2>
        <div className="w-16 h-0.5 bg-[#E6A4B4] mx-auto mt-3 rounded-full opacity-60" />
      </div>

      <div ref={containerRef} className="max-w-lg mx-auto relative px-1">
        
        {/* Central Rose Gold Vertical Line (Centered on all screens) */}
        <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#E6A4B4]/40 via-[#E6A4B4] to-[#E6A4B4]/40 -translate-x-1/2 pointer-events-none">
          
          {/* Scroll-driven White Lotus Traveling Node (Sized perfectly to avoid touching cards) */}
          <motion.div 
            style={{ top: lotusTop }}
            className="absolute -left-3.5 sm:-left-5 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center"
          >
            <div className="relative w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center">
              {/* Soft pink halo glow */}
              <div className="absolute inset-0 rounded-full bg-[#E6A4B4]/60 blur-md animate-pulse" />

              {/* White Lotus / Rose Image Asset */}
              <img 
                src="/lotus.png" 
                alt="White Rose" 
                className="w-6 h-6 sm:w-9 sm:h-9 object-contain relative z-10 filter drop-shadow-[0_2px_8px_rgba(230,164,180,0.85)] hover:scale-110 transition-transform"
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
              <div className="bg-[#3D061A]/95 border border-[#E6A4B4]/60 text-[#F8C8DC] px-5 sm:px-8 py-2 rounded-full shadow-lg backdrop-blur-md flex items-center justify-center">
                <div className="text-center">
                  <span className="font-serif font-bold text-xs sm:text-sm tracking-[0.2em] uppercase block leading-none">
                    {dayGroup.dayTitle}
                  </span>
                  <span className="font-sans text-[9px] text-[#FFF0F5]/80 uppercase tracking-[0.25em] block mt-1.5">
                    {dayGroup.dayOfWeek}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Day Events - Alternating Left & Right with center rose clearance */}
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
                    {/* Delicate Rose Gold Diamond Marker */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#E6A4B4] rotate-45 shadow-[0_0_6px_rgba(230,164,180,0.8)]" />
                    </div>

                    {/* Event Content Card (Expanded downward block length & larger fonts) */}
                    <div className={`w-1/2 ${isEven ? 'pr-4 sm:pr-8 text-left sm:text-right' : 'ml-auto pl-4 sm:pl-8 text-left'}`}>

                      <div className="bg-[#3D061A]/95 border border-[#E6A4B4]/50 rounded-2xl p-4 sm:p-7 shadow-2xl hover:border-[#E6A4B4] transition-all group text-left">
                        
                        {/* Event Number & Time */}
                        <div className={`flex items-center gap-1 mb-2 text-[#F8C8DC] text-[11px] sm:text-sm font-semibold ${isEven ? 'justify-start sm:justify-end' : 'justify-start'}`}>
                          <span className="font-serif opacity-75">
                            {event.number} &bull;
                          </span>
                          <span className="inline-flex items-center gap-1 bg-[#5E0B2B] px-2.5 py-0.5 rounded-full border border-[#E6A4B4]/40 text-[11px] sm:text-sm font-bold">
                            <Clock className="w-3.5 h-3.5 text-[#F8C8DC]" />
                            {event.time}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className={`font-serif text-base sm:text-xl font-black text-[#F8C8DC] mb-2 leading-snug ${event.title.includes("WEDDING") ? 'text-base sm:text-2xl text-[#F8C8DC] tracking-wider' : ''}`}>
                          {event.title}
                        </h3>

                        {/* Location */}
                        <div className={`flex items-center gap-1 text-[11px] sm:text-sm text-[#FFF0F5]/90 font-semibold mb-2 ${isEven ? 'justify-start sm:justify-end' : 'justify-start'}`}>
                          <MapPin className="w-3.5 h-3.5 text-[#E6A4B4] shrink-0" />
                          <span>{event.location}</span>
                        </div>

                        {/* Description */}
                        <p className="font-sans text-[11px] sm:text-sm text-[#FFF0F5]/90 leading-relaxed font-normal">
                          {event.description.includes("Vivek and Varun") ? (
                            <>
                              <strong className="font-extrabold text-[#F8C8DC] text-[13px] sm:text-base tracking-wide font-sans">
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
