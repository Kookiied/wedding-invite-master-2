import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Camera, CameraOff, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { magicInteractionEngine } from '../../interactions/MagicInteractionEngine';
import { useTheme } from '../../context/ThemeContext';

const MagicModeOverlay = forwardRef(({ onMagicModeReady, externalTrigger = false }, ref) => {
  const { theme } = useTheme();
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
    const handleHeart = () => showFeedback("💕", "Hand Heart Detected");
    const handlePalm = () => showFeedback("✋", "Open Palm Detected");
    const handleBlow = () => showFeedback("🌬️", "Blow Detected");

    window.addEventListener('MAGIC_SMILE', handleSmile);
    window.addEventListener('MAGIC_HEART', handleHeart);
    window.addEventListener('MAGIC_OPEN_PALM', handlePalm);
    window.addEventListener('MAGIC_BLOW', handleBlow);

    return () => {
      window.removeEventListener('MAGIC_SMILE', handleSmile);
      window.removeEventListener('MAGIC_HEART', handleHeart);
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
        className={`fixed bottom-[100px] sm:bottom-6 right-6 z-[60] w-28 h-36 rounded-2xl shadow-2xl border-2 overflow-hidden cursor-grab active:cursor-grabbing bg-black transition-opacity duration-300 ${
          isCameraActive && !stashedState ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ borderColor: theme.colors.border }}
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
            className="absolute top-2 right-2 z-[65] bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-full backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
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
          className={`fixed top-1/2 -translate-y-1/2 z-[65] backdrop-blur-md p-1.5 flex items-center justify-center cursor-pointer transition-colors h-16 w-8 border ${
            stashedState === 'left' ? 'left-0 rounded-r-xl border-l-0' : 'right-0 rounded-l-xl border-r-0'
          }`}
          style={{
            backgroundColor: `${theme.colors.darkRich}F2`,
            borderColor: theme.colors.borderLight,
            boxShadow: `0 0 15px ${theme.colors.glowShadow}`
          }}
          onClick={async () => {
            setStashedState(null);
            await startMagicMode();
          }}
        >
          {stashedState === 'left' ? (
            <ChevronRight className="w-5 h-5" style={{ color: theme.colors.textLight }} />
          ) : (
            <ChevronLeft className="w-5 h-5" style={{ color: theme.colors.textLight }} />
          )}
        </motion.div>
      )}

      {/* Floating Action Button for Magic Mode (Golden Star placed above Volume button) */}
      {!isCameraActive && (!externalTrigger || hasBeenClosed) && !stashedState && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-5 z-[60] p-3 rounded-full border flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${theme.colors.darkAccent}, ${theme.colors.darkRich})`,
            borderColor: `${theme.colors.gold}99`,
            boxShadow: `0 0 20px ${theme.colors.gold}66`
          }}
        >
          <Star className="w-6 h-6 fill-current" style={{ color: theme.colors.gold }} />
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
              className="border p-8 rounded-3xl max-w-sm w-full text-center relative shadow-2xl transition-all duration-500"
              style={{
                backgroundColor: theme.colors.darkRich,
                borderColor: theme.colors.borderLight
              }}
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 hover:text-white"
                style={{ color: theme.colors.border }}
              >
                <X className="w-5 h-5" />
              </button>

              <div 
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 border shadow-lg"
                style={{
                  backgroundColor: theme.colors.darkAccent,
                  borderColor: theme.colors.borderLight
                }}
              >
                <Camera className="w-8 h-8" style={{ color: theme.colors.textLight }} />
              </div>
              
              <h3 className="font-serif text-2xl mb-2" style={{ color: theme.colors.textLight }}>
                Enter Magic Mode
              </h3>
              <p className="font-sans text-sm mb-6 leading-relaxed opacity-90" style={{ color: theme.colors.textLightMuted }}>
                Allow camera access to interact using hand gestures, smiles, and magic.
              </p>

              <div className="text-[10px] mb-6 uppercase tracking-wider opacity-75" style={{ color: theme.colors.border }}>
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
                className="w-full font-bold py-3 rounded-full transition-colors flex justify-center items-center gap-2 cursor-pointer"
                style={{
                  backgroundColor: theme.colors.lightAccent,
                  color: theme.colors.darkRich
                }}
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

      {/* Floating Detection Toast Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[110] backdrop-blur-md border px-5 py-2.5 rounded-full font-serif text-sm shadow-xl flex items-center gap-2"
            style={{
              backgroundColor: `${theme.colors.darkRich}F2`,
              borderColor: theme.colors.borderLight,
              color: theme.colors.textLight,
              boxShadow: `0 0 20px ${theme.colors.glowShadow}`
            }}
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
