import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Phone, MessageCircle } from 'lucide-react';
import EnvelopeIntro from './components/EnvelopeIntro';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import EventTimeline from './components/EventTimeline';
import DressCode from './components/DressCode';
import LocationDetails from './components/LocationDetails';
import RSVPForm from './components/RSVPForm';
import RSVPHosts from './components/RSVPHosts';
import FinalPortrait from './components/FinalPortrait';
import FloatingMusic from './components/FloatingMusic';
import AdminDashboard from './components/AdminDashboard';

// Feature Flag: Lock scrolling past countdown until scratch cards are scratched.
// Set to false: Allows guests to freely scroll the entire website immediately!
// Set to true: Locks sections 4-9 until all 3 hearts are scratched.
const ENABLE_SCRATCH_LOCK = false;

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isScratchUnlocked, setIsScratchUnlocked] = useState(!ENABLE_SCRATCH_LOCK);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true);
    setAutoPlayAudio(true);
    // Dispatch resize event after envelope animation to recalculate scroll positions
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  };

  const handleScratchComplete = () => {
    setIsScratchUnlocked(true);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-[#1A030D] flex justify-center items-center font-sans antialiased text-[#2D2D2D] sm:py-6">
      
      {/* Mobile-first Container Frame (max-w-md centered on desktop) */}
      <div className="w-full max-w-md min-h-screen sm:min-h-[92vh] sm:rounded-3xl bg-[#FFF0F5] relative shadow-[0_0_50px_rgba(61,6,26,0.9)] overflow-x-hidden border-x sm:border-2 border-[#E6A4B4]/50 flex flex-col">
        
        {/* Floating Persistent Audio Controller */}
        <FloatingMusic autoPlayTriggered={autoPlayAudio} />

        {/* 1. Envelope Intro Screen */}
        <AnimatePresence>
          {!isEnvelopeOpen && (
            <EnvelopeIntro onOpen={handleEnvelopeOpen} />
          )}
        </AnimatePresence>

        {/* Main Invitation Sections (Visible after envelope opening or scrolling) */}
        <div className={`w-full transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          
          {/* 2. Hero Announcement */}
          <Hero />

          {/* 3. Countdown & Scratch Card (Locks scroll until 3 hearts are scratched) */}
          <Countdown onScratchComplete={handleScratchComplete} />

          {/* Locked Sections 4-9 & Footer: Unlocked ONLY after scratching the hearts */}
          <AnimatePresence>
            {isScratchUnlocked && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="w-full"
              >
                {/* 4. Schedule of Events */}
                <EventTimeline key={isEnvelopeOpen ? 'open' : 'closed'} />

                {/* 5. Dress Code Guide */}
                <DressCode />

                {/* 6. Location & Venue */}
                <LocationDetails />

                {/* 7. RSVP Engine */}
                <RSVPForm />

                {/* 8. RSVP Hosts Details */}
                <RSVPHosts />

                {/* 9. Final Portrait */}
                <FinalPortrait />

                {/* Footer: Admin Portal Link & Developer Credits */}
                <div className="w-full py-4 bg-[#3D061A] text-center border-t border-[#E6A4B4]/40 flex flex-col items-center justify-center gap-2 px-4">
                  <button 
                    onClick={() => setIsAdminOpen(true)}
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#F8C8DC] opacity-80 hover:opacity-100 transition-opacity cursor-pointer font-serif py-1 px-3 rounded-full hover:bg-white/10"
                  >
                    <Lock className="w-3 h-3 text-[#F8C8DC]" />
                    Host Admin Portal
                  </button>

                  {/* Developer Credits with Interactive Call & WhatsApp Links */}
                  <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] text-[#FFF0F5]/80 font-serif pt-1 border-t border-white/10 w-full">
                    <span>Developed by <strong className="text-[#F8C8DC] font-semibold">Varun Raitani</strong></span>
                    <span className="text-[#E6A4B4]/50">&bull;</span>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[#FFF0F5]/90 font-sans text-[11px] font-medium">+91 7310138649</span>
                      
                      {/* Phone Call Link Button */}
                      <a 
                        href="tel:+917310138649" 
                        title="Call Varun Raitani"
                        aria-label="Call Varun Raitani"
                        className="p-1.5 rounded-full bg-[#E6A4B4]/20 border border-[#E6A4B4]/60 text-[#F8C8DC] hover:bg-[#E6A4B4] hover:text-[#3D061A] transition-all cursor-pointer flex items-center justify-center shadow-sm"
                      >
                        <Phone className="w-3 h-3" />
                      </a>

                      {/* WhatsApp Message Link Button */}
                      <a 
                        href="https://wa.me/917310138649" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        title="Send WhatsApp Message to Varun Raitani"
                        aria-label="Send WhatsApp Message to Varun Raitani"
                        className="p-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-sm"
                      >
                        <MessageCircle className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* Secret Password-Protected Admin Dashboard Modal */}
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

    </div>
  );
}
