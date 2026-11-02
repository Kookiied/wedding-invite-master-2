import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import { MapPin, ExternalLink, Phone, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function LocationDetails() {
  const { theme } = useTheme();

  return (
    <section 
      className="relative w-full pt-40 sm:pt-48 md:pt-56 pb-48 sm:pb-56 md:pb-64 lg:pb-72 px-4 transition-colors duration-500"
      style={{
        backgroundColor: theme.colors.darkAccent,
        color: theme.colors.textLightMuted
      }}
    >
      
      {/* Seamless Overlapping Floral Divider */}
      <div className="absolute top-0 left-0 right-0 -translate-y-1/2 z-20 pointer-events-none flex justify-center">
        <img 
          src="/flowers-divider.png" 
          alt="Floral Divider" 
          className="w-full scale-110 h-auto object-contain" 
        />
      </div>

      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-center">

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 mt-2 sm:mt-4"
        >
          <span 
            className="font-sans text-xs uppercase tracking-[0.3em] font-semibold block mb-6 sm:mb-8 transition-colors duration-500"
            style={{ color: theme.colors.textLight }}
          >
            The Destination
          </span>
          <h2 
            className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl transition-colors duration-500"
            style={{ color: theme.colors.textLight }}
          >
            Location & Venue
          </h2>
        </motion.div>

        {/* Venue Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-2 rounded-2xl p-6 shadow-2xl overflow-hidden mb-12 transition-all duration-500"
          style={{
            backgroundColor: theme.colors.darkRich,
            borderColor: theme.colors.border,
            boxShadow: `0 10px 40px ${theme.colors.glowShadow}`
          }}
        >
          {/* Watercolor Venue Sketch */}
          <div 
            className="w-full h-48 md:h-64 rounded-xl border overflow-hidden mb-6 relative group shadow-lg"
            style={{ borderColor: theme.colors.borderLight }}
          >
            <img 
              src="/venue-sketch.jpg" 
              alt="Raj Vilas Watercolor Sketch" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.95]"
            />
          </div>

          <h3 
            className="font-serif text-2xl md:text-3xl font-bold mb-2 transition-colors duration-500"
            style={{ color: theme.colors.textLight }}
          >
            {weddingData.venue.name}
          </h3>
          <p 
            className="font-sans text-xs md:text-sm leading-relaxed max-w-xs md:max-w-sm mx-auto mb-6 opacity-90 transition-colors duration-500"
            style={{ color: theme.colors.textLightMuted }}
          >
            {weddingData.venue.fullAddress}
          </p>

          {/* View on Google Maps Button */}
          <motion.a 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={weddingData.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full font-serif font-bold text-xs md:text-sm uppercase tracking-widest shadow-lg transition-all"
            style={{
              background: `linear-gradient(to right, ${theme.colors.lightAccent}, ${theme.colors.border}, ${theme.colors.lightAccent})`,
              color: theme.colors.darkRich
            }}
          >
            <MapPin className="w-4 h-4" style={{ color: theme.colors.darkRich }} />
            View On Google Maps
            <ExternalLink className="w-3.5 h-3.5" style={{ color: theme.colors.darkRich }} />
          </motion.a>

        </motion.div>

        {/* Contact Help Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border rounded-xl p-5 transition-all duration-500"
          style={{
            backgroundColor: `${theme.colors.darkRich}CC`,
            borderColor: theme.colors.borderLight
          }}
        >
          <span 
            className="font-sans text-[11px] md:text-xs uppercase tracking-widest font-semibold block mb-1"
            style={{ color: theme.colors.textLight }}
          >
            Questions & Assistance
          </span>
          <p 
            className="font-serif text-xs md:text-sm italic mb-4 opacity-90"
            style={{ color: theme.colors.textLightMuted }}
          >
            For travel inquiries, accommodation, or directions, please reach out to our team:
          </p>

          <div className="grid grid-cols-2 gap-3">
            {weddingData.contacts.map((contact) => (
              <div 
                key={contact.name} 
                className="border p-3 md:p-4 rounded-lg text-center transition-colors duration-500"
                style={{
                  backgroundColor: theme.colors.darkAccent,
                  borderColor: theme.colors.borderLight
                }}
              >
                <span 
                  className="font-serif text-xs md:text-sm font-bold block mb-1"
                  style={{ color: theme.colors.textLight }}
                >
                  {contact.name}
                </span>
                <span 
                  className="font-sans text-[11px] md:text-xs block mb-2 opacity-90"
                  style={{ color: theme.colors.textLightMuted }}
                >
                  {contact.phone}
                </span>
                <div className="flex justify-center gap-2">
                  <a 
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`} 
                    className="p-1.5 rounded-full border transition-colors"
                    style={{
                      backgroundColor: `${theme.colors.border}33`,
                      borderColor: theme.colors.borderLight,
                      color: theme.colors.textLight
                    }}
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </motion.div>

      </div>

    </section>
  );
}
