import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Camera, CameraOff, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { magicInteractionEngine } from '../../interactions/MagicInteractionEngine';

const MagicModeOverlay = forwardRef(({ onMagicModeReady, externalTrigger = false }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [hasBeenClosed, setHasBeenClosed] = useState(false);
  const [stashedState, setStashedState] = useState(null); // 'left', 'right', or null

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Notifications
  const [notification, setNotification] = useState(null);

  useImperativeHandle(ref, () => ({
    startMagicMode: () => startMagicMode(),
    stopMagicMode: () => stopMagicMode()
  }));

  const handleDragEnd = (event, info) => {
    // If dragged near the edges, stash it!
    const threshold = 50;
    if (info.point.x < threshold) {
      setStashedState('left');
      stopMagicMode(); // Stashes and pauses camera automatically
    } else if (info.point.x > window.innerWidth - threshold) {
      setStashedState('right');
      stopMagicMode();
    }
  };

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
    setHasBeenClosed(true); // Remember that user manually closed it
    if (onMagicModeReady) onMagicModeReady(false);
  };

  return (
    <>
      {/* Draggable Camera Container */}
      <motion.div
        drag
        onDragEnd={handleDragEnd}
        dragElastic={0.1}
        dragMomentum={false}
        className={`fixed bottom-[100px] sm:bottom-6 right-6 z-[60] w-28 h-36 rounded-2xl shadow-2xl border-2 border-[#E6A4B4] overflow-hidden cursor-grab active:cursor-grabbing bg-black transition-opacity duration-300 ${
          isCameraActive && !stashedState ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <video 
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 pointer-events-none"
        />

        {/* Turn Off Camera Button inside the draggable window */}
        {isCameraActive && (
          <button 
            onClick={stopMagicMode}
            title="Turn off camera"
            className="absolute top-2 right-2 z-[65] bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-full backdrop-blur-sm border border-white/20 transition-all"
            onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when clicking the button
          >
            <CameraOff className="w-3.5 h-3.5" />
          </button>
        )}
      </motion.div>

      {/* FaceTime-style Stash Tab */}
      {stashedState && !isCameraActive && (
        <motion.div 
          initial={{ opacity: 0, x: stashedState === 'left' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`fixed top-1/2 -translate-y-1/2 z-[65] bg-[#3D061A]/95 border border-[#E6A4B4]/50 shadow-[0_0_15px_rgba(230,164,180,0.4)] backdrop-blur-md p-1.5 flex items-center justify-center cursor-pointer hover:bg-[#5E0B2B] transition-colors h-16 w-8 ${
            stashedState === 'left' ? 'left-0 rounded-r-xl border-l-0' : 'right-0 rounded-l-xl border-r-0'
          }`}
          onClick={async () => {
            setStashedState(null);
            await startMagicMode();
          }}
        >
          {stashedState === 'left' ? <ChevronRight className="w-5 h-5 text-[#F8C8DC]" /> : <ChevronLeft className="w-5 h-5 text-[#F8C8DC]" />}
        </motion.div>
      )}

      {/* Floating Action Button for Magic Mode (Golden Star placed above Volume button) */}
      {!isCameraActive && (!externalTrigger || hasBeenClosed) && !stashedState && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-5 z-[60] bg-gradient-to-r from-[#5E0B2B] to-[#3D061A] text-[#FFD700] p-3 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.4)] border border-[#FFD700]/50 flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Star className="w-6 h-6 fill-current text-[#FFD700]" />
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
