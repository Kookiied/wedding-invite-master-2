import React from 'react';
import { motion } from 'framer-motion';

// SVG Vector Butterfly matching the reference image's rounded wings and vibrant style
const ButterflySVG = ({ primaryColor = "#00A8FF", secondaryColor = "#0055FF" }) => (
  <svg viewBox="0 0 100 100" className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
    <g transform="translate(50,50)">
      {/* Upper Left Wing */}
      <path d="M-2, -4 C-25,-36 -50,-18 -38,8 C-28,24 -8,12 -2,0" fill={primaryColor} />
      <path d="M-4, -6 C-20,-28 -38,-14 -30,4 C-22,16 -8,8 -4,0" fill={secondaryColor} opacity="0.65" />

      {/* Upper Right Wing */}
      <path d="M2, -4 C25,-36 50,-18 38,8 C28,24 8,12 2,0" fill={primaryColor} />
      <path d="M4, -6 C20,-28 38,-14 30,4 C22,16 8,8 4,0" fill={secondaryColor} opacity="0.65" />

      {/* Lower Left Wing */}
      <path d="M-2, 2 C-32,16 -28,42 -10,32 C-2,26 -2,8 -2,2" fill={secondaryColor} />
      
      {/* Lower Right Wing */}
      <path d="M2, 2 C32,16 28,42 10,32 C2,26 2,8 2,2" fill={secondaryColor} />

      {/* Center Body */}
      <ellipse cx="0" cy="5" rx="3.5" ry="19" fill="#1A030D" />
      
      {/* Head */}
      <circle cx="0" cy="-15" r="4" fill="#1A030D" />

      {/* Antennas */}
      <path d="M-1,-18 C-5,-25 -10,-28 -12,-26" stroke="#1A030D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M1,-18 C5,-25 10,-28 12,-26" stroke="#1A030D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="-12" cy="-26" r="1.8" fill="#1A030D" />
      <circle cx="12" cy="-26" r="1.8" fill="#1A030D" />
    </g>
  </svg>
);

export default function FallingFlora() {
  // Collection of falling sunflowers, pink flowers, and green leaves
  const flora = [
    { id: 1, emoji: '🌸', left: '5%', duration: 25, delay: 0, size: 'text-2xl', xOffset: 30 },
    { id: 2, emoji: '🌻', left: '25%', duration: 28, delay: 5, size: 'text-3xl', xOffset: -40 },
    { id: 3, emoji: '🍃', left: '40%', duration: 22, delay: 2, size: 'text-xl', xOffset: 25 },
    { id: 4, emoji: '🌺', left: '55%', duration: 26, delay: 8, size: 'text-2xl', xOffset: -35 },
    { id: 5, emoji: '🌿', left: '70%', duration: 24, delay: 3, size: 'text-xl', xOffset: 30 },
    { id: 6, emoji: '🌻', left: '85%', duration: 29, delay: 7, size: 'text-3xl', xOffset: -30 },
    { id: 7, emoji: '🌸', left: '15%', duration: 27, delay: 10, size: 'text-xl', xOffset: 45 },
    { id: 8, emoji: '🍃', left: '80%', duration: 25, delay: 12, size: 'text-2xl', xOffset: -25 },
    { id: 9, emoji: '🌺', left: '95%', duration: 23, delay: 6, size: 'text-xl', xOffset: 35 },
    { id: 10, emoji: '🌸', left: '33%', duration: 24, delay: 4, size: 'text-2xl', xOffset: -30 },
    { id: 11, emoji: '🌸', left: '62%', duration: 26, delay: 1, size: 'text-xl', xOffset: 35 },
    { id: 12, emoji: '🌸', left: '78%', duration: 28, delay: 9, size: 'text-2xl', xOffset: -40 },
  ];

  // 3 Vibrant Butterflies with different colors and smooth W / Zigzag paths
  const butterflies = [
    {
      id: 1,
      primaryColor: "#00BFFF", // Exact Cyan Blue from reference image
      secondaryColor: "#0055FF",
      duration: 16,
      delay: 0,
      pathLeft: ['-15%', '25%', '50%', '75%', '115%'],
      pathTop: ['15%', '45%', '10%', '55%', '20%'] // Smooth 'W' Flight Path
    },
    {
      id: 2,
      primaryColor: "#FF9F00", // Vibrant Golden Amber / Warm Coral
      secondaryColor: "#FF3366",
      duration: 20,
      delay: 5,
      pathLeft: ['-15%', '30%', '60%', '80%', '115%'],
      pathTop: ['50%', '20%', '65%', '30%', '70%'] // Smooth Zigzag Wave
    },
    {
      id: 3,
      primaryColor: "#E056FD", // Electric Violet / Magenta
      secondaryColor: "#686DE0",
      duration: 22,
      delay: 11,
      pathLeft: ['-15%', '20%', '50%', '80%', '115%'],
      pathTop: ['75%', '35%', '80%', '25%', '40%'] // Deep Sweeping 'W' Wave
    }
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      
      {/* Falling Flowers & Leaves */}
      {flora.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.size} drop-shadow-md opacity-80`}
          style={{ left: item.left }}
          initial={{ top: '-10%' }}
          animate={{ 
            top: ['-10%', '110%'],
            rotate: [0, 360],
            x: [0, item.xOffset, 0, -item.xOffset, 0]
          }}
          transition={{
            top: { duration: item.duration, delay: item.delay, repeat: Infinity, ease: 'linear' },
            rotate: { duration: item.duration * 0.5, delay: item.delay, repeat: Infinity, ease: 'linear' },
            x: { duration: item.duration * 0.3, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* 3 Vibrant Vector Butterflies flying in 'W' & Zigzag paths */}
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute z-10"
          initial={{ left: '-15%', top: b.pathTop[0] }}
          animate={{
            left: b.pathLeft,
            top: b.pathTop
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {/* Smooth Wing Flap Animation */}
          <motion.div
            animate={{ scaleX: [1, 0.25, 1], rotate: [-8, 8, -8] }}
            transition={{ duration: 0.25, repeat: Infinity, ease: 'linear' }}
          >
            <ButterflySVG primaryColor={b.primaryColor} secondaryColor={b.secondaryColor} />
          </motion.div>
        </motion.div>
      ))}

    </div>
  );
}
