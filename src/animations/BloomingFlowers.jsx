import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Rich Royal Carnival SVG Flower
const SVGFlower = ({ color1, color2, size }) => (
  <svg viewBox="0 0 200 200" style={{ width: size, height: size }} className="drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
    <g transform="translate(100,100)">
      {/* Outer Petals */}
      {[...Array(8)].map((_, i) => (
        <path 
          key={`outer-${i}`} 
          d="M0,0 C30,-50 30,-90 0,-100 C-30,-90 -30,-50 0,0" 
          transform={`rotate(${i * 45})`} 
          fill={color1} 
          opacity="0.9"
        />
      ))}
      {/* Inner Petals */}
      {[...Array(8)].map((_, i) => (
        <path 
          key={`inner-${i}`} 
          d="M0,0 C20,-40 20,-70 0,-80 C-20,-70 -20,-40 0,0" 
          transform={`rotate(${i * 45 + 22.5})`} 
          fill={color2} 
          opacity="0.95"
        />
      ))}
      {/* Center core */}
      <circle cx="0" cy="0" r="22" fill="#FFD700" />
      <circle cx="0" cy="0" r="14" fill="#FFFFFF" opacity="0.8" />
    </g>
  </svg>
);

export default function BloomingFlowers() {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const handleSmile = () => {
      const colors = [
        ['#FF1493', '#FFB6C1'], // Deep Pink & Rose
        ['#FF8C00', '#FFD700'], // Radiant Amber & Gold
        ['#9400D3', '#DA70D6'], // Royal Violet & Orchid
        ['#00FA9A', '#7FFFD4'], // Emerald Mint
        ['#FF007F', '#FFF0F5']  // Crimson & Cream
      ];

      // Spawn 8-12 flowers framed around ALL 4 SIDES (Top, Bottom, Left, Right)
      const newBatch = [];
      const now = Date.now();

      // Top Side
      for (let i = 0; i < 3; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        newBatch.push({
          id: `${now}-top-${i}`,
          left: `${Math.random() * 85 + 5}%`,
          top: `${Math.random() * 12 + 3}%`,
          size: Math.random() * 30 + 60,
          color1: color[0],
          color2: color[1]
        });
      }

      // Bottom Side
      for (let i = 0; i < 3; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        newBatch.push({
          id: `${now}-bot-${i}`,
          left: `${Math.random() * 85 + 5}%`,
          top: `${Math.random() * 12 + 82}%`,
          size: Math.random() * 30 + 60,
          color1: color[0],
          color2: color[1]
        });
      }

      // Left Side
      for (let i = 0; i < 2; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        newBatch.push({
          id: `${now}-left-${i}`,
          left: `${Math.random() * 10 + 2}%`,
          top: `${Math.random() * 55 + 20}%`,
          size: Math.random() * 30 + 60,
          color1: color[0],
          color2: color[1]
        });
      }

      // Right Side
      for (let i = 0; i < 2; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        newBatch.push({
          id: `${now}-right-${i}`,
          left: `${Math.random() * 10 + 88}%`,
          top: `${Math.random() * 55 + 20}%`,
          size: Math.random() * 30 + 60,
          color1: color[0],
          color2: color[1]
        });
      }

      setFlowers(prev => [...prev, ...newBatch]);

      // Automatically trigger gradual fade out after 2.8 seconds
      setTimeout(() => {
        setFlowers(prev => prev.filter(f => !newBatch.some(nb => nb.id === f.id)));
      }, 2800);
    };

    window.addEventListener('MAGIC_SMILE', handleSmile);
    return () => window.removeEventListener('MAGIC_SMILE', handleSmile);
  }, []);

  return (
    <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {flowers.map(flower => (
          <motion.div
            key={flower.id}
            initial={{ scale: 0, opacity: 0, rotate: -60 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              rotate: 0,
              transition: { type: "spring", damping: 14, stiffness: 120, duration: 1.2 }
            }}
            exit={{ 
              scale: 0.1, 
              opacity: 0, 
              rotate: 45,
              transition: { duration: 1.4, ease: "easeInOut" }
            }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: flower.left, 
              top: flower.top,
              transformOrigin: "center center"
            }}
          >
            <SVGFlower size={flower.size} color1={flower.color1} color2={flower.color2} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
