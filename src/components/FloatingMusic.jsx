import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import { useTheme } from '../context/ThemeContext';

export default function FloatingMusic({ autoPlayTriggered = false }) {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Instantiate audio object pointing to public/music.mp3
    const audio = new Audio(weddingData.audioUrl);
    audio.volume = 0.7;

    // Custom loop: When music ends, reset to 20 seconds and play again
    const handleEnded = () => {
      audio.currentTime = 20;
      audio.play().catch(err => console.warn("Loop play failed:", err));
    };
    audio.addEventListener('ended', handleEnded);

    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = 0.7;
    
    // Ensure we start playing from the 20-second mark
    if (audio.currentTime < 20) {
      audio.currentTime = 20;
    }

    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);

          // Configure Media Session Metadata so iOS Lock Screen shows the beautiful couple-logo
          if ('mediaSession' in navigator) {
            try {
              navigator.mediaSession.metadata = new window.MediaMetadata({
                title: "Vivek & Indira",
                artist: "Wedding Invitation",
                album: "October 25, 2026",
                artwork: [
                  { src: '/couple-logo.jpg', sizes: '256x256', type: 'image/jpeg' },
                  { src: '/couple-logo.jpg', sizes: '512x512', type: 'image/jpeg' }
                ]
              });
            } catch (err) {
              console.warn("MediaSession metadata failed to set:", err);
            }
          }
        })
        .catch((error) => {
          console.warn("Audio play waiting for user gesture:", error);
          setIsPlaying(false);
        });
    }
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  };

  // Add global first interaction listener to unlock audio on mobile/desktop
  useEffect(() => {
    const handleFirstGesture = () => {
      if (audioRef.current && !isPlaying && !hasInteracted) {
        startAudio();
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, [isPlaying, hasInteracted]);

  // Handle external trigger from envelope opening
  useEffect(() => {
    if (autoPlayTriggered && !isPlaying && audioRef.current) {
      startAudio();
    }
  }, [autoPlayTriggered]);

  const togglePlay = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setHasInteracted(true);
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 pointer-events-auto">
      {/* Floating Instant Touch/Click Music Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={togglePlay}
        aria-label="Toggle Background Music"
        className="relative group p-3.5 rounded-full border-2 shadow-2xl transition-all flex items-center justify-center cursor-pointer"
        style={{
          backgroundColor: theme.colors.darkAccent,
          color: theme.colors.textLight,
          borderColor: theme.colors.border,
          boxShadow: `0 4px 20px ${theme.colors.glowShadow}`
        }}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5" style={{ color: theme.colors.textLight }} />
        ) : (
          <VolumeX className="w-5 h-5 opacity-70 group-hover:opacity-100" style={{ color: theme.colors.textLight }} />
        )}
      </motion.button>
    </div>
  );
}
