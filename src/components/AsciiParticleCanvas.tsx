import React, { useRef, useEffect } from 'react';
import asciiText from '@/assets/portrait_ascii.txt?raw';

interface Particle {
  x: number;
  y: number;
  col: number;
  row: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  ease: number;
  friction: number;
  blastMultiplier: number;
  driftPhase: number;
}

interface AsciiParticleCanvasProps {
  className?: string;
}

export const AsciiParticleCanvas: React.FC<AsciiParticleCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; radius: number; isHovering: boolean }>({
    x: -9999,
    y: -9999,
    radius: 95,
    isHovering: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const anchor = anchorRef.current;
    if (!canvas || !anchor) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Parse ASCII Matrix lines & columns
    const rawLines = asciiText.split('\n');
    const rowCount = rawLines.length;
    let maxColCount = 0;
    rawLines.forEach((l) => {
      if (l.length > maxColCount) maxColCount = l.length;
    });

    const CHAR_ASPECT_RATIO = 0.52;

    const initParticles = () => {
      if (!anchor) return;
      particles = [];
      const anchorRect = anchor.getBoundingClientRect();
      const anchorWidth = anchorRect.width;
      const anchorHeight = (anchorWidth * rowCount) / (maxColCount * CHAR_ASPECT_RATIO);

      const cellHeight = anchorHeight / rowCount;
      const cellWidth = anchorWidth / maxColCount;
      const fontSize = cellHeight * 1.05;

      for (let r = 0; r < rowCount; r++) {
        const line = rawLines[r] || '';
        for (let c = 0; c < line.length; c++) {
          const char = line[c];
          if (char && char !== ' ') {
            const startX = anchorRect.left + c * cellWidth + cellWidth / 2;
            const startY = anchorRect.top + r * cellHeight + cellHeight / 2;

            particles.push({
              x: startX,
              y: startY,
              col: c,
              row: r,
              vx: 0,
              vy: 0,
              char,
              size: fontSize,
              ease: 0.008 + Math.random() * 0.010, // Majestic, leisurely return drift across site
              friction: 0.94 + Math.random() * 0.02,
              blastMultiplier: 1.0 + Math.random() * 0.7,
              driftPhase: Math.random() * Math.PI * 2,
            });
          }
        }
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initParticles();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Global Mouse & Touch Tracking across the site
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isHovering = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.isHovering = true;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      mouseRef.current.isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseLeave);

    // 60 FPS Dynamic Tracking & Physics Loop
    let timeTick = 0;
    const render = () => {
      timeTick += 0.015;
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const radius = mouse.radius;

      // Real-time anchor tracking (adapts dynamically to scroll, resize, entrance animation)
      const anchorRect = anchor.getBoundingClientRect();
      const anchorWidth = anchorRect.width;
      const anchorHeight = (anchorWidth * rowCount) / (maxColCount * CHAR_ASPECT_RATIO);
      const cellHeight = anchorHeight / rowCount;
      const cellWidth = anchorWidth / maxColCount;
      const fontSize = cellHeight * 1.05;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.55)';
      ctx.shadowBlur = 6;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.size = fontSize;

        // Dynamic target home coordinates following anchor position in real time
        const originX = anchorRect.left + p.col * cellWidth + cellWidth / 2;
        const originY = anchorRect.top + p.row * cellHeight + cellHeight / 2;

        // 1. High-Velocity Scatter on Cursor Contact
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const force = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx) + (Math.sin(p.driftPhase + timeTick) * 0.4);
          const push = force * (30 * p.blastMultiplier);
          
          p.vx += Math.cos(angle) * push;
          p.vy += Math.sin(angle) * push;
          p.x += Math.cos(angle) * (push * 0.4);
          p.y += Math.sin(angle) * (push * 0.4);
        }

        // 2. Two-Phase Precision Return:
        // - Phase A (Far > 35px): Slow, majestic cosmic drift across the site
        // - Phase B (Near <= 35px): Decisive, clean convergence locking straight into target without stalling
        const homeDx = originX - p.x;
        const homeDy = originY - p.y;
        const homeDist = Math.sqrt(homeDx * homeDx + homeDy * homeDy);

        if (homeDist > 35) {
          p.vx += homeDx * p.ease;
          p.vy += homeDy * p.ease;

          // Zero-gravity atmospheric wave drift while far away
          p.vx += Math.cos(p.driftPhase + timeTick) * 0.16;
          p.vy += Math.sin(p.driftPhase + timeTick) * 0.16;

          p.vx *= p.friction;
          p.vy *= p.friction;

          p.x += p.vx;
          p.y += p.vy;
        } else if (homeDist > 0.4) {
          // Decisive smooth convergence when close to home (no stalling or lingering)
          const lerpSpeed = Math.min(0.22, 0.10 + ((35 - homeDist) / 35) * 0.12);
          p.x += homeDx * lerpSpeed;
          p.y += homeDy * lerpSpeed;
          p.vx *= 0.6;
          p.vy *= 0.6;
        } else {
          // Crisp clean lock into origin
          p.x = originX;
          p.y = originY;
          p.vx = 0;
          p.vy = 0;
        }

        // 3. Render Character Particle
        ctx.font = `${p.size}px "JetBrains Mono", ui-monospace, SFMono-Regular, monospace`;
        ctx.fillText(p.char, p.x, p.y);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* 1. Invisible Layout Anchor preserving perfect grid positioning in Hero */}
      <div 
        ref={anchorRef} 
        className={`relative w-full max-w-[380px] sm:max-w-[430px] lg:max-w-[480px] xl:max-w-[520px] aspect-[112/68] pointer-events-none select-none ${className}`}
        aria-hidden="true"
      />

      {/* 2. Full-Screen Fixed Canvas allowing particles to disperse across the entire website */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-screen h-screen pointer-events-none z-20 block touch-none"
        aria-label="Interactive Full-Screen Shebin T R ASCII Particle Portrait"
      />
    </>
  );
};

export default AsciiParticleCanvas;
