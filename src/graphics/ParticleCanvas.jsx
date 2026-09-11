import React, { useEffect, useRef } from 'react';
import { particleSystem } from './ParticleSystem';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      particleSystem.mount(canvasRef.current);
    }
    
    // Global event listeners for magic interactions
    const handleKiss = () => {
      // Spawn FaceTime-style red hearts floating up from center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      particleSystem.emit(centerX, centerY, 25, 'HEART');
    };

    const handleSnap = (e) => {
      const x = e.detail?.x !== undefined ? e.detail.x * window.innerWidth : window.innerWidth / 2;
      const y = e.detail?.y !== undefined ? e.detail.y * window.innerHeight : window.innerHeight / 2;
      particleSystem.emit(x, y, 40, 'SPARKLE');
    };

    window.addEventListener('MAGIC_BLOW_KISS', handleKiss);
    window.addEventListener('MAGIC_SNAP', handleSnap);

    return () => {
      particleSystem.unmount();
      window.removeEventListener('MAGIC_BLOW_KISS', handleKiss);
      window.removeEventListener('MAGIC_SNAP', handleSnap);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 z-[55] pointer-events-none"
    />
  );
}
