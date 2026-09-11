import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Camera, ShieldCheck, Check } from 'lucide-react';

export default function ExperienceSelector({ onSelectMode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A030D]/95 backdrop-blur-md p-4 sm:p-6 select-none"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-lg bg-gradient-to-b from-[#3D061A] via-[#2A0412] to-[#1A030D] border-2 border-[#E6A4B4]/40 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(230,164,180,0.3)] relative overflow-hidden"
      >
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#E6A4B4]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#5E0B2B] border border-[#E6A4B4]/50 mb-4 text-[#F8C8DC] shadow-[0_0_20px_rgba(230,164,180,0.4)]">
          <Heart className="w-7 h-7 fill-current" />
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl text-[#F8C8DC] tracking-wide mb-2">
          Royal Wedding Invitation
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#FFF0F5]/80 mb-6 leading-relaxed">
          Welcome! Please choose how you would like to experience this invitation:
        </p>

        {/* Choice Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          
          {/* Option A: AI Magic Mode */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('magic')}
            className="cursor-pointer bg-[#5E0B2B]/60 hover:bg-[#5E0B2B] border-2 border-[#E6A4B4] rounded-2xl p-5 text-left flex flex-col justify-between relative shadow-[0_0_20px_rgba(230,164,180,0.2)] transition-all group"
          >
            <div className="absolute top-3 right-3 bg-[#E6A4B4] text-[#3D061A] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              Recommended
            </div>
            
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E6A4B4]/20 flex items-center justify-center text-[#F8C8DC] mb-3 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-[#FFD700]" />
              </div>
              <h3 className="font-serif text-lg text-[#F8C8DC] font-semibold mb-1">
                AI Magic Mode
              </h3>
              <p className="text-[11px] text-[#FFF0F5]/70 leading-relaxed mb-3">
                Camera-activated experience with hand gesture envelope reveal, smile flower blooms & blow-out candle.
              </p>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E6A4B4] to-[#F8C8DC] text-[#3D061A] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md">
              <Camera className="w-3.5 h-3.5" /> Start Magic Mode
            </button>
          </motion.div>

          {/* Option B: Standard Classic Mode */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('classic')}
            className="cursor-pointer bg-[#2A0412]/80 hover:bg-[#3D061A]/80 border border-[#E6A4B4]/30 rounded-2xl p-5 text-left flex flex-col justify-between shadow-sm transition-all group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#E6A4B4] mb-3 group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 text-[#E6A4B4]" />
              </div>
              <h3 className="font-serif text-lg text-[#FFF0F5] font-semibold mb-1">
                Classic Mode
              </h3>
              <p className="text-[11px] text-[#FFF0F5]/60 leading-relaxed mb-3">
                Traditional touch & click digital invitation experience with wax seal opening.
              </p>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F8C8DC] border border-[#E6A4B4]/40 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors">
              <Check className="w-3.5 h-3.5" /> Classic Invitation
            </button>
          </motion.div>

        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#E6A4B4]/70 uppercase tracking-widest pt-2 border-t border-white/10">
          <ShieldCheck className="w-3.5 h-3.5 text-[#E6A4B4]" />
          <span>100% Private & Secure &bull; No Video Saved or Transmitted</span>
        </div>

      </motion.div>
    </motion.div>
  );
}
