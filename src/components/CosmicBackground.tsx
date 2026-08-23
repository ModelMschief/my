import React, { useEffect, useRef, useState } from 'react';

interface CosmicBackgroundProps {
  onExplosionClear?: () => void;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ onExplosionClear }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [explosionCleared, setExplosionCleared] = useState(false);

  // Monitor video playback time to detect the 6-7s transition where the supernova settles
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // User noted: "at 6-7 second the white explosion reduce and black background apper"
      if (video.currentTime >= 6.0 && !explosionCleared) {
        setExplosionCleared(true);
        if (onExplosionClear) onExplosionClear();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [explosionCleared, onExplosionClear]);

  // Interactive Gravitational Starfield & Cosmic Dust Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates for gravitational lensing
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Generate cosmic particles
    const particleCount = Math.min(90, Math.floor(width / 18));
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#06b6d4', '#8b5cf6', '#38bdf8', '#f59e0b', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        size: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.01;
      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Gravitational deflection towards mouse
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 && dist > 1) {
            const force = (200 - dist) / 200;
            p.x += (dx / dist) * force * 1.0;
            p.y += (dy / dist) * force * 1.0;
          }
        }

        // Draw particle with pulsating glow
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(time * 3 + i));
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      // Draw subtle orbital connections between nearby particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#06b6d4';
            ctx.globalAlpha = (1 - dist / 75) * 0.12;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712]">
      {/* 1. Atmospheric Big Bang Video Background */}
      <video
        ref={videoRef}
        src="/bigbang.mp4"
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-85' : 'opacity-0'
        }`}
        style={{
          filter: 'contrast(1.15) saturate(1.2) brightness(0.9)',
        }}
      />

      {/* 2. Deep Space Contrast Scrim & Vignette (Guarantees 100% text readability) */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(3, 7, 18, 0.45) 0%, rgba(3, 7, 18, 0.85) 60%, rgba(3, 7, 18, 0.98) 100%),
            linear-gradient(to bottom, rgba(3, 7, 18, 0.4) 0%, rgba(3, 7, 18, 0.8) 50%, #030712 100%)
          `,
        }}
      />

      {/* 3. Subtle Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 z-[2]" />

      {/* 4. Interactive Gravitational Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[3]"
      />

      {/* 5. Glowing Celestial Horizon Light */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-cyan-500/10 via-violet-500/5 to-transparent rounded-full blur-3xl z-[3]" />
    </div>
  );
};

export default CosmicBackground;
