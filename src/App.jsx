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
import CandleReveal from './components/CandleReveal';
import FinalPortrait from './components/FinalPortrait';
import FloatingMusic from './components/FloatingMusic';
import AdminDashboard from './components/AdminDashboard';
import MagicModeOverlay from './components/MagicMode/MagicModeOverlay';
import ExperienceSelector from './components/MagicMode/ExperienceSelector';
import ParticleCanvas from './graphics/ParticleCanvas';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useTheme } from './context/ThemeContext';

// Feature Flag: Lock scrolling past countdown until scratch cards are scratched.
// Set to false: Allows guests to freely scroll the entire website immediately!
// Set to true: Locks sections 4-9 until all 3 hearts are scratched.
const ENABLE_SCRATCH_LOCK = false;

export default function App() {
  const { theme } = useTheme();
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isScratchUnlocked, setIsScratchUnlocked] = useState(!ENABLE_SCRATCH_LOCK);
  const [experienceMode, setExperienceMode] = useState(null); // null = modal prompt, 'magic' | 'classic'
  const magicOverlayRef = React.useRef(null);

  const handleSelectExperienceMode = (mode) => {
    setExperienceMode(mode);
    if (mode === 'magic') {
      setTimeout(() => {
        magicOverlayRef.current?.startMagicMode();
      }, 100);
    }
  };

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
    <div 
      className="min-h-screen w-full flex justify-center items-center font-sans antialiased text-[#2D2D2D] sm:py-6 relative transition-colors duration-500"
      style={{ backgroundColor: theme.colors.darkDeep }}
    >
      
      {/* 6-THEME TOGGLE DOCK (Available once the invitation envelope is opened) */}
      {isEnvelopeOpen && <ThemeSwitcher />}

      {/* Upfront Luxury Choice Screen */}
      {experienceMode === null && (
        <ExperienceSelector onSelectMode={handleSelectExperienceMode} />
      )}

      {/* Global Particle VFX System */}
      <ParticleCanvas />

      {/* Global Magic Mode Permission & Overlay */}
      <MagicModeOverlay 
        ref={magicOverlayRef} 
        externalTrigger={true}
        onMagicModeReady={(ready) => console.log('Magic Mode Ready:', ready)} 
      />

      {/* Mobile-first Container Frame (max-w-md centered on desktop, expanded on tablets) */}
      <div 
        className="w-full max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-5xl min-h-screen sm:min-h-[92vh] sm:rounded-3xl relative overflow-x-hidden border-x sm:border-2 flex flex-col z-10 transition-all duration-500"
        style={{
          backgroundColor: theme.colors.lightBg,
          borderColor: theme.colors.borderLight,
          boxShadow: `0 0 50px ${theme.colors.glowShadow}`
        }}
      >
        
        {/* Floating Persistent Audio Controller */}
        <FloatingMusic autoPlayTriggered={autoPlayAudio} />

        {/* 1. Envelope Intro Screen */}
        <AnimatePresence>
          {!isEnvelopeOpen && (
            <EnvelopeIntro 
              onOpen={handleEnvelopeOpen} 
              experienceMode={experienceMode || 'magic'}
            />
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

                {/* 8.5 Magic Candle Reveal */}
                <CandleReveal />

                {/* 9. Final Portrait */}
                <FinalPortrait />

                {/* Footer: Admin Portal Link & Developer Credits */}
                <div 
                  className="w-full py-4 text-center border-t flex flex-col items-center justify-center gap-2 px-4 transition-colors duration-500"
                  style={{
                    backgroundColor: theme.colors.darkRich,
                    borderColor: theme.colors.borderLight
                  }}
                >
                  <button 
                    onClick={() => setIsAdminOpen(true)}
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity cursor-pointer font-serif py-1 px-3 rounded-full hover:bg-white/10"
                    style={{ color: theme.colors.textLight }}
                  >
                    <Lock className="w-3 h-3" style={{ color: theme.colors.textLight }} />
                    Host Admin Portal
                  </button>

                  {/* Developer Credits with Interactive Call & WhatsApp Links */}
                  <div 
                    className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-serif pt-1 border-t border-white/10 w-full"
                    style={{ color: theme.colors.textLightMuted }}
                  >
                    <span>Developed by <strong className="font-semibold" style={{ color: theme.colors.textLight }}>Varun Raitani</strong></span>
                    <span className="opacity-50">&bull;</span>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-[11px] font-medium" style={{ color: theme.colors.textLightMuted }}>+91 7310138649</span>
                      
                      {/* Phone Call Link Button */}
                      <a 
                        href="tel:+917310138649" 
                        title="Call Varun Raitani"
                        aria-label="Call Varun Raitani"
                        className="p-1.5 rounded-full border hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center shadow-sm"
                        style={{
                          backgroundColor: `${theme.colors.border}33`,
                          borderColor: theme.colors.border,
                          color: theme.colors.textLight
                        }}
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
