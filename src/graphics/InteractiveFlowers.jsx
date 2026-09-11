import React, { useEffect, useRef, useState } from 'react';
import { particleSystem } from './ParticleSystem';

class CarnivalFlower {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.radius = radius;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.rotation = Math.random() * Math.PI * 2;
    this.angularVelocity = (Math.random() - 0.5) * 0.02;
    this.scale = 1;
    this.removed = false;
    
    // Vibrant Carnival / Royal Wedding Palette
    const palettes = [
      { main: '#FF1493', inner: '#FF69B4', core: '#FFD700' }, // Deep Pink & Gold
      { main: '#FF8C00', inner: '#FFD700', core: '#FFFFFF' }, // Radiant Orange
      { main: '#9400D3', inner: '#DA70D6', core: '#00FFFF' }, // Royal Violet & Cyan
      { main: '#00FA9A', inner: '#7FFFD4', core: '#FF1493' }, // Emerald Mint
      { main: '#FF007F', inner: '#FFB6C1', core: '#FFD700' }  // Rose Ruby
    ];
    this.colors = palettes[Math.floor(Math.random() * palettes.length)];
    this.petals = Math.floor(Math.random() * 2) + 6; // 6 to 8 petals
  }

  update(handX, handY) {
    if (this.removed) return;

    // Gentle friction
    this.vx *= 0.92;
    this.vy *= 0.92;
    this.angularVelocity *= 0.95;

    // Repulsion from Hand / Cursor
    if (handX !== null && handY !== null) {
      const dx = this.x - handX;
      const dy = this.y - handY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const threshold = 140; // Interaction radius
      if (dist < threshold) {
        const force = (threshold - dist) / threshold;
        this.vx += (dx / Math.max(dist, 1)) * force * 7;
        this.vy += (dy / Math.max(dist, 1)) * force * 7;
        this.angularVelocity += (Math.random() - 0.5) * force * 0.3;
        
        // Emit sparkle on push
        if (Math.random() < 0.3) {
          particleSystem.emit(this.x, this.y, 1, 'SPARKLE');
        }
      }
    }

    // Distance check from origin: if pushed far enough, fly away
    const distFromOrigin = Math.sqrt(Math.pow(this.x - this.originX, 2) + Math.pow(this.y - this.originY, 2));
    if (distFromOrigin > 220) {
      this.removed = true;
      particleSystem.emit(this.x, this.y, 8, 'SPARKLE');
    } else {
      // Gentle spring return force
      this.vx += (this.originX - this.x) * 0.01;
      this.vy += (this.originY - this.y) * 0.01;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.angularVelocity;
  }

  draw(ctx) {
    if (this.removed) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale, this.scale);

    // Glow Effect
    ctx.shadowColor = this.colors.main;
    ctx.shadowBlur = 12;

    // 1. Draw Outer Petals
    ctx.fillStyle = this.colors.main;
    for (let i = 0; i < this.petals; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI * 2) / this.petals);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.radius * 0.5, -this.radius * 0.8, -this.radius * 0.4, -this.radius * 1.3, 0, -this.radius * 1.4);
      ctx.bezierCurveTo(this.radius * 0.4, -this.radius * 1.3, this.radius * 0.5, -this.radius * 0.8, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    // 2. Draw Inner Petals
    ctx.fillStyle = this.colors.inner;
    for (let i = 0; i < this.petals; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI * 2) / this.petals + (Math.PI / this.petals));
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.radius * 0.3, -this.radius * 0.5, -this.radius * 0.25, -this.radius * 0.9, 0, -this.radius * 1.0);
      ctx.bezierCurveTo(this.radius * 0.25, -this.radius * 0.9, this.radius * 0.3, -this.radius * 0.5, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    // 3. Golden Core
    ctx.shadowBlur = 0;
    ctx.fillStyle = this.colors.core;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }
}

export default function InteractiveFlowers({ onAllRemoved }) {
  const canvasRef = useRef(null);
  const pointerPosRef = useRef({ x: null, y: null });
  const isRunningRef = useRef(true);
  const [remainingCount, setRemainingCount] = useState(35);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Cluster flowers around center envelope wax seal
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const initialFlowers = [];

    // Dense inner cluster over seal
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 90;
      initialFlowers.push(new CarnivalFlower(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius,
        Math.random() * 14 + 18
      ));
    }
    
    // Outer decorative ring
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 120 + 70;
      initialFlowers.push(new CarnivalFlower(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius,
        Math.random() * 10 + 14
      ));
    }

    // Hand tracking event listener
    const handleHandMove = (e) => {
      pointerPosRef.current = {
        x: e.detail.x * canvas.width,
        y: e.detail.y * canvas.height
      };
    };
    
    const handleHandLost = () => {
      pointerPosRef.current = { x: null, y: null };
    };

    // Mouse & Touch Fallback
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointerPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handlePointerLeave = () => {
      pointerPosRef.current = { x: null, y: null };
    };

    window.addEventListener('MAGIC_HAND_MOVE', handleHandMove);
    window.addEventListener('MAGIC_HAND_LOST', handleHandLost);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0]);
      }
    });

    let animationId;
    const loop = () => {
      if (!isRunningRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeCount = 0;
      for (const flower of initialFlowers) {
        flower.update(pointerPosRef.current.x, pointerPosRef.current.y);
        flower.draw(ctx);
        if (!flower.removed) activeCount++;
      }

      setRemainingCount(activeCount);

      // Trigger envelope open when flowers are cleared
      if (activeCount <= 3) {
        isRunningRef.current = false;
        if (onAllRemoved) onAllRemoved();
      } else {
        animationId = requestAnimationFrame(loop);
      }
    };
    loop();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('MAGIC_HAND_MOVE', handleHandMove);
      window.removeEventListener('MAGIC_HAND_LOST', handleHandLost);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(animationId);
      isRunningRef.current = false;
    };
  }, [onAllRemoved]);

  const handleForceClear = (e) => {
    e.stopPropagation();
    isRunningRef.current = false;
    if (onAllRemoved) onAllRemoved();
  };

  return (
    <div className="absolute inset-0 z-[45] pointer-events-auto flex flex-col items-center justify-between">
      <canvas 
        ref={canvasRef}
        className="w-full h-full absolute inset-0"
      />
      
      {/* Quick Clear Action Button */}
      <button
        onClick={handleForceClear}
        className="absolute bottom-20 z-[50] bg-[#3D061A]/80 hover:bg-[#5E0B2B] backdrop-blur-md border border-[#E6A4B4]/60 text-[#F8C8DC] text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-105"
      >
        ✨ Swipe / Click Flowers to Clear
      </button>
    </div>
  );
}
