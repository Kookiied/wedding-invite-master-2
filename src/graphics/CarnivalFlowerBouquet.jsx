import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hand } from 'lucide-react';
import { particleSystem } from './ParticleSystem';

// Array of vibrant Carnival / Royal Wedding Flower SVGs
const FLOWER_DESIGNS = [
  // Design 1: Royal Lotus/Dahlia (Deep Pink & Gold)
  ({ size, color1 = "#FF1493", color2 = "#FFD700" }) => (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }} className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
      <g transform="translate(50,50)">
        {[...Array(8)].map((_, i) => (
          <path
            key={i}
            d="M0,0 C15,-25 15,-40 0,-48 C-15,-40 -15,-25 0,0"
            transform={`rotate(${i * 45})`}
            fill={color1}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <path
            key={i}
            d="M0,0 C10,-18 10,-30 0,-36 C-10,-30 -10,-18 0,0"
            transform={`rotate(${i * 45 + 22.5})`}
            fill={color2}
          />
        ))}
        <circle cx="0" cy="0" r="9" fill="#FFF" />
        <circle cx="0" cy="0" r="6" fill="#FF8C00" />
      </g>
    </svg>
  ),
  // Design 2: Carnival Marigold (Bright Amber & Ruby)
  ({ size, color1 = "#FF8C00", color2 = "#DC143C" }) => (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }} className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
      <g transform="translate(50,50)">
        {[...Array(12)].map((_, i) => (
          <circle
            key={i}
            cx="0"
            cy="-22"
            r="12"
            transform={`rotate(${i * 30})`}
            fill={i % 2 === 0 ? color1 : color2}
            opacity="0.9"
          />
        ))}
        <circle cx="0" cy="0" r="14" fill="#FFD700" />
        <circle cx="0" cy="0" r="8" fill="#5E0B2B" />
      </g>
    </svg>
  ),
  // Design 3: Passion Bloom (Violet & Cyan)
  ({ size, color1 = "#8A2BE2", color2 = "#00FFFF" }) => (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }} className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
      <g transform="translate(50,50)">
        {[...Array(6)].map((_, i) => (
          <path
            key={i}
            d="M0,0 C25,-15 35,-35 0,-45 C-35,-35 -25,-15 0,0"
            transform={`rotate(${i * 60})`}
            fill={color1}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <path
            key={i}
            d="M0,0 C15,-10 20,-25 0,-30 C-20,-25 -15,-10 0,0"
            transform={`rotate(${i * 60 + 30})`}
            fill={color2}
          />
        ))}
        <circle cx="0" cy="0" r="10" fill="#FF1493" />
      </g>
    </svg>
  ),
  // Design 4: Emerald Mint Rose
  ({ size, color1 = "#00FA9A", color2 = "#FFB6C1" }) => (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }} className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
      <g transform="translate(50,50)">
        {[...Array(10)].map((_, i) => (
          <path
            key={i}
            d="M0,0 Q20,-30 0,-40 Q-20,-30 0,0"
            transform={`rotate(${i * 36})`}
            fill={color1}
          />
        ))}
        <circle cx="0" cy="0" r="12" fill={color2} />
        <circle cx="0" cy="0" r="6" fill="#FFD700" />
      </g>
    </svg>
  )
];

const PALETTES = [
  { c1: "#FF1493", c2: "#FFD700" },
  { c1: "#FF8C00", c2: "#DC143C" },
  { c1: "#9400D3", c2: "#00FFFF" },
  { c1: "#00FA9A", c2: "#FF69B4" },
  { c1: "#FF007F", c2: "#FFD700" },
  { c1: "#E65C8A", c2: "#FFF0F5" }
];

export default function CarnivalFlowerBouquet({ onAllCleared }) {
  const containerRef = useRef(null);
  const [flowers, setFlowers] = useState([]);
  const [clearedCount, setClearedCount] = useState(0);

  // Initialize scattered bouquet across the envelope screen
  useEffect(() => {
    const initial = [];
    const total = 24;

    for (let i = 0; i < total; i++) {
      const designIndex = Math.floor(Math.random() * FLOWER_DESIGNS.length);
      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      
      // Position flowers centered around the envelope seal area with cluster density
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 140 + 20; // 20px to 160px from center
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      initial.push({
        id: i,
        designIndex,
        color1: palette.c1,
        color2: palette.c2,
        size: Math.floor(Math.random() * 25) + 45, // 45px to 70px
        baseX: x,
        baseY: y,
        offsetX: 0,
        offsetY: 0,
        rotation: Math.random() * 360,
        isCleared: false
      });
    }
    setFlowers(initial);
  }, []);

  // Handle Hand Tracking & Mouse Repulsion
  useEffect(() => {
    const updateRepulsion = (pointX, pointY) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Pointer pos relative to center
      const relX = pointX - rect.left - centerX;
      const relY = pointY - rect.top - centerY;

      setFlowers(prev => {
        let newCleared = 0;
        const updated = prev.map(flower => {
          if (flower.isCleared) {
            newCleared++;
            return flower;
          }

          const flowerCurX = flower.baseX + flower.offsetX;
          const flowerCurY = flower.baseY + flower.offsetY;

          const dx = flowerCurX - relX;
          const dy = flowerCurY - relY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const threshold = 110;
          if (dist < threshold) {
            const force = (threshold - dist) / threshold;
            const pushX = (dx / Math.max(dist, 1)) * force * 160;
            const pushY = (dy / Math.max(dist, 1)) * force * 160;

            const newOffsetX = flower.offsetX + pushX;
            const newOffsetY = flower.offsetY + pushY;

            // Particle effect on push
            if (Math.random() < 0.2) {
              particleSystem.emit(pointX, pointY, 2, 'SPARKLE');
            }

            // Check if pushed far off center
            const totalDist = Math.sqrt(
              Math.pow(flower.baseX + newOffsetX, 2) + Math.pow(flower.baseY + newOffsetY, 2)
            );

            const isClearedNow = totalDist > 200;
            if (isClearedNow) {
              newCleared++;
              particleSystem.emit(pointX, pointY, 6, 'SPARKLE');
            }

            return {
              ...flower,
              offsetX: newOffsetX,
              offsetY: newOffsetY,
              rotation: flower.rotation + force * 45,
              isCleared: isClearedNow
            };
          }
          return flower;
        });

        setClearedCount(newCleared);
        if (newCleared >= prev.length * 0.6 && prev.length > 0) {
          if (onAllCleared) onAllCleared();
        }

        return updated;
      });
    };

    // Listen to Vision Engine Hand Move
    const handleHandMove = (e) => {
      const px = e.detail.x * window.innerWidth;
      const py = e.detail.y * window.innerHeight;
      updateRepulsion(px, py);
    };

    // Listen to Mouse Move & Touch Move
    const handleMouseMove = (e) => {
      updateRepulsion(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        updateRepulsion(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('MAGIC_HAND_MOVE', handleHandMove);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('MAGIC_HAND_MOVE', handleHandMove);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onAllCleared]);

  const clearAllFlowers = () => {
    setFlowers(prev => prev.map(f => ({ ...f, isCleared: true, offsetX: f.baseX * 4, offsetY: f.baseY * 4 })));
    setClearedCount(flowers.length);
    if (onAllCleared) onAllCleared();
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-[45] flex items-center justify-center pointer-events-auto overflow-hidden"
    >
      {/* Scattered Bouquet Items */}
      {flowers.map(flower => {
        if (flower.isCleared) return null;
        const Design = FLOWER_DESIGNS[flower.designIndex];

        return (
          <motion.div
            key={flower.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              x: flower.baseX + flower.offsetX,
              y: flower.baseY + flower.offsetY,
              rotate: flower.rotation,
              scale: 1,
              opacity: 1
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 120 }}
            className="absolute cursor-pointer hover:scale-125 transition-transform"
            style={{ transformOrigin: 'center center' }}
          >
            <Design size={flower.size} color1={flower.color1} color2={flower.color2} />
          </motion.div>
        );
      })}

      {/* Touchless Sweep Hint & Manual Clear Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-16 z-[50] flex flex-col items-center gap-2 pointer-events-auto"
      >
        <div className="bg-[#3D061A]/90 backdrop-blur-md border border-[#E6A4B4]/60 text-[#F8C8DC] text-[11px] font-serif uppercase tracking-widest px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
          <Hand className="w-4 h-4 text-[#FFD700] animate-bounce" />
          <span>Wave hand or swipe to clear flowers ({clearedCount}/{flowers.length})</span>
        </div>

        <button
          onClick={clearAllFlowers}
          className="text-[10px] text-[#E6A4B4]/80 underline hover:text-[#FFF0F5] transition-colors"
        >
          [ Tap to Clear All Flowers Instantly ]
        </button>
      </motion.div>
    </div>
  );
}
