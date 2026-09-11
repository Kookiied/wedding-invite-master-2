// Centralized Canvas 2D Particle System for FaceTime-Style Red Hearts & Sparkles

class Particle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.life = 1.0;
    this.decay = 0.008 + Math.random() * 0.01;
    this.rotation = (Math.random() - 0.5) * 0.4;
    this.rotationSpeed = (Math.random() - 0.5) * 0.03;
    
    if (type === 'HEART') {
      // FaceTime Style Floating Red Hearts
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = -Math.random() * 4 - 3; // Float up rapidly
      this.size = Math.random() * 25 + 20; // Crisp large FaceTime hearts
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = 0.05 + Math.random() * 0.05;
    } else if (type === 'SPARKLE') {
      this.vx = (Math.random() - 0.5) * 10;
      this.vy = (Math.random() - 0.5) * 10;
      this.decay = 0.03 + Math.random() * 0.03;
      this.size = Math.random() * 6 + 2;
    }
  }

  update() {
    if (this.type === 'HEART') {
      this.wobble += this.wobbleSpeed;
      this.x += this.vx + Math.sin(this.wobble) * 1.5;
      this.y += this.vy;
    } else {
      this.x += this.vx;
      this.y += this.vy;
    }
    this.rotation += this.rotationSpeed;
    this.life -= this.decay;
  }
}

class ParticleSystemEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.isRunning = false;
    this.animationId = null;
  }

  mount(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', this.resize);
    this.start();
  }

  unmount() {
    window.removeEventListener('resize', this.resize);
    this.stop();
  }

  resize = () => {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  };

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

  emit(x, y, count, type) {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, type));
    }
  }

  // Draw Vibrant FaceTime Style Red Hearts
  drawHeart(ctx, x, y, size, life) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 30, size / 30);
    ctx.globalAlpha = Math.max(0, life);

    // Deep Red Glow
    ctx.shadowColor = '#FF0033';
    ctx.shadowBlur = 15;

    // Heart Path
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.bezierCurveTo(-16, -26, -32, -4, 0, 18);
    ctx.bezierCurveTo(32, -4, 16, -26, 0, -8);
    
    // Rich FaceTime Red Gradient
    const grad = ctx.createLinearGradient(-15, -20, 15, 15);
    grad.addColorStop(0, '#FF1A4B'); // Bright red top
    grad.addColorStop(0.7, '#D60029'); // Deep royal crimson
    grad.addColorStop(1, '#99001C'); // Dark ruby edge

    ctx.fillStyle = grad;
    ctx.fill();

    // Subtle glossy reflection highlight
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(-6, -10, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fill();

    ctx.restore();
  }

  drawSparkle(ctx, x, y, size, life) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = Math.max(0, life);
    ctx.fillStyle = '#FFD700'; // Gold
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  loop = () => {
    if (!this.isRunning || !this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update();

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      if (p.type === 'HEART') this.drawHeart(this.ctx, p.x, p.y, p.size, p.life);
      if (p.type === 'SPARKLE') this.drawSparkle(this.ctx, p.x, p.y, p.size, p.life);
    }

    this.animationId = requestAnimationFrame(this.loop);
  };
}

export const particleSystem = new ParticleSystemEngine();
