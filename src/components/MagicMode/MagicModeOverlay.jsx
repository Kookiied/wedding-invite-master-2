import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Camera, CameraOff } from 'lucide-react';
import { magicInteractionEngine } from '../../interactions/MagicInteractionEngine';

const MagicModeOverlay = forwardRef(({ onMagicModeReady, externalTrigger = false }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Notifications
  const [notification, setNotification] = useState(null);

  useImperativeHandle(ref, () => ({
    startMagicMode: () => startMagicMode(),
    stopMagicMode: () => stopMagicMode()
  }));

  useEffect(() => {
    // Listen for custom magic events with specific matching symbols
    const handleSmile = () => showFeedback("🌸", "Smile Detected");
    const handleKiss = () => showFeedback("💕", "Kiss Detected");
    const handleSnap = () => showFeedback("⚡", "Snap Detected");
    const handlePalm = () => showFeedback("✋", "Open Palm Detected");
    const handleBlow = () => showFeedback("🌬️", "Blow Detected");

    window.addEventListener('MAGIC_SMILE', handleSmile);
    window.addEventListener('MAGIC_BLOW_KISS', handleKiss);
    window.addEventListener('MAGIC_SNAP', handleSnap);
    window.addEventListener('MAGIC_OPEN_PALM', handlePalm);
    window.addEventListener('MAGIC_BLOW', handleBlow);

    return () => {
      window.removeEventListener('MAGIC_SMILE', handleSmile);
      window.removeEventListener('MAGIC_BLOW_KISS', handleKiss);
      window.removeEventListener('MAGIC_SNAP', handleSnap);
      window.removeEventListener('MAGIC_OPEN_PALM', handlePalm);
      window.removeEventListener('MAGIC_BLOW', handleBlow);
    };
  }, []);

  const showFeedback = (icon, text) => {
    setNotification({ icon, text });
    setTimeout(() => setNotification(null), 1800);
  };

  const startMagicMode = async () => {
    setLoading(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
        audio: false
      });
      streamRef.current = stream;

      const video = videoRef.current;
      if (!video) {
        throw new Error("Video element not ready");
      }

      video.srcObject = stream;
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          video.play().then(resolve).catch(resolve);
        };
      });

      // Start engine
      const started = await magicInteractionEngine.start(video, null);
      if (started) {
        setIsCameraActive(true);
        setIsOpen(false);
        if (onMagicModeReady) onMagicModeReady(true);
      } else {
        throw new Error("Failed to initialize Vision Engine.");
      }
    } catch (err) {
      console.error('✨ Camera start error:', err);
      setError("Camera permission denied or unavailable.");
      if (onMagicModeReady) onMagicModeReady(false);
    } finally {
      setLoading(false);
    }
  };

  const stopMagicMode = () => {
    magicInteractionEngine.stop();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setIsOpen(false);
    if (onMagicModeReady) onMagicModeReady(false);
  };

  return (
    <>
      {/* Hidden Persistent Video Element ALWAYS in DOM */}
      <video 
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`fixed bottom-6 right-6 z-[60] w-28 h-36 bg-black rounded-2xl object-cover transform -scale-x-100 border-2 border-[#E6A4B4] shadow-2xl transition-opacity duration-300 ${
          isCameraActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {isCameraActive && (
        <button 
          onClick={stopMagicMode}
          title="Turn off camera"
          className="fixed bottom-36 right-6 z-[65] bg-black/70 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg border border-white/20 transition-all"
        >
          <CameraOff className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Floating Action Button for Magic Mode (if not active & not handled externally) */}
      {!isCameraActive && !externalTrigger && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[60] bg-gradient-to-r from-[#5E0B2B] to-[#3D061A] text-[#F8C8DC] p-3 rounded-full shadow-[0_0_20px_rgba(230,164,180,0.5)] border border-[#E6A4B4]/50 flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Sparkles className="w-6 h-6" />
        </motion.button>
      )}

      {/* Permissions & Intro Modal */}
      <AnimatePresence>
        {isOpen && !isCameraActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ y: 50, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              className="bg-[#3D061A] border border-[#E6A4B4]/40 p-8 rounded-3xl max-w-sm w-full text-center relative shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-[#E6A4B4] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto bg-[#5E0B2B] rounded-full flex items-center justify-center mb-6 border border-[#E6A4B4]/30 shadow-[0_0_15px_rgba(230,164,180,0.3)]">
                <Camera className="w-8 h-8 text-[#F8C8DC]" />
              </div>
              
              <h3 className="font-serif text-2xl text-[#F8C8DC] mb-2">Enter Magic Mode</h3>
              <p className="font-sans text-sm text-[#FFF0F5]/80 mb-6 leading-relaxed">
                Allow camera access to interact using hand gestures, smiles, and magic.
              </p>

              <div className="text-[10px] text-[#E6A4B4]/70 mb-6 uppercase tracking-wider">
                Processing happens securely on your device. No video is recorded or uploaded.
              </div>

              {error && (
                <div className="text-red-400 text-xs mb-4 bg-red-950/50 p-2 rounded border border-red-900">
                  {error}
                </div>
              )}

              <button
                onClick={startMagicMode}
                disabled={loading}
                className="w-full bg-[#E6A4B4] text-[#3D061A] font-bold py-3 rounded-full hover:bg-[#F8C8DC] transition-colors flex justify-center items-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Initializing Magic...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Allow Camera & Start
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Detection Toast Notifications with specific matching symbol */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[110] bg-[#3D061A]/95 backdrop-blur-md border border-[#E6A4B4]/60 text-[#F8C8DC] px-5 py-2.5 rounded-full font-serif text-sm shadow-[0_0_20px_rgba(230,164,180,0.5)] flex items-center gap-2"
          >
            <span className="text-base">{notification.icon}</span>
            <span>{notification.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default MagicModeOverlay;
