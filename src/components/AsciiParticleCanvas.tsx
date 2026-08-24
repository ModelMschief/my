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
  spawnDelay: number;
  hasStartedTravel: boolean;
  alpha: number;
}

interface AsciiParticleCanvasProps {
  className?: string;
  isRevealed?: boolean;
}

export const AsciiParticleCanvas: React.FC<AsciiParticleCanvasProps> = ({ 
  className = '', 
  isRevealed = true 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const isRevealedRef = useRef(isRevealed);
  const revealStartTimeRef = useRef<number | null>(null);

  const mouseRef = useRef<{ x: number; y: number; radius: number; isHovering: boolean }>({
    x: -9999,
    y: -9999,
    radius: 95,
    isHovering: false,
  });

  useEffect(() => {
    isRevealedRef.current = isRevealed;
    if (isRevealed && revealStartTimeRef.current === null) {
      revealStartTimeRef.current = performance.now();
    }
  }, [isRevealed]);

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
            const targetX = anchorRect.left + c * cellWidth + cellWidth / 2;
            const targetY = anchorRect.top + r * cellHeight + cellHeight / 2;

            // Start off-screen to the right with random staggered distances and vertical spread
            const startX = targetX + 280 + Math.random() * 450;
            const startY = targetY + (Math.random() - 0.5) * 220;

            particles.push({
              x: startX,
              y: startY,
              col: c,
              row: r,
              vx: 0,
              vy: 0,
              char,
              size: fontSize,
              ease: 0.009 + Math.random() * 0.009, // Smooth graceful travel speed
              friction: 0.94 + Math.random() * 0.02,
              blastMultiplier: 1.0 + Math.random() * 0.7,
              driftPhase: Math.random() * Math.PI * 2,
              spawnDelay: Math.random() * 1.6, // Staggered stream-in delay (0 - 1.6s)
              hasStartedTravel: false,
              alpha: 0,
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

    // 60 FPS Particle Physics & Assembly Engine
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
      const now = performance.now();
      const isRev = isRevealedRef.current;
      const startTime = revealStartTimeRef.current || now;
      const timeSinceRevealSec = (now - startTime) / 1000;

      // Real-time anchor tracking (adapts dynamically to scroll, resize)
      const anchorRect = anchor.getBoundingClientRect();
      const anchorWidth = anchorRect.width;
      const anchorHeight = (anchorWidth * rowCount) / (maxColCount * CHAR_ASPECT_RATIO);
      const cellHeight = anchorHeight / rowCount;
      const cellWidth = anchorWidth / maxColCount;
      const fontSize = cellHeight * 1.05;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur = 6;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.size = fontSize;

        // Dynamic home coordinates following anchor position in real time
        const originX = anchorRect.left + p.col * cellWidth + cellWidth / 2;
        const originY = anchorRect.top + p.row * cellHeight + cellHeight / 2;

        // Check if particle should start streaming in from the right
        if (isRev && !p.hasStartedTravel) {
          if (timeSinceRevealSec >= p.spawnDelay) {
            p.hasStartedTravel = true;
          }
        }

        if (!p.hasStartedTravel) {
          // Keep floating off-screen to the right until staggered turn arrives
          continue;
        }

        // Fade particle in as it travels
        if (p.alpha < 1.0) {
          p.alpha = Math.min(1.0, p.alpha + 0.035);
        }

        // 1. High-Velocity Scatter on Cursor Contact (Unchanged Hover Engine)
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

        // 2. Two-Phase Precision Return & Stream-In Assembly
        const homeDx = originX - p.x;
        const homeDy = originY - p.y;
        const homeDist = Math.sqrt(homeDx * homeDx + homeDy * homeDy);

        if (homeDist > 35) {
          p.vx += homeDx * p.ease;
          p.vy += homeDy * p.ease;

          // Gentle zero-gravity atmospheric drift while traveling
          p.vx += Math.cos(p.driftPhase + timeTick) * 0.16;
          p.vy += Math.sin(p.driftPhase + timeTick) * 0.16;

          p.vx *= p.friction;
          p.vy *= p.friction;

          p.x += p.vx;
          p.y += p.vy;
        } else if (homeDist > 0.4) {
          // Decisive smooth convergence straight into position
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

        // 3. Render Character Particle with Alpha Fade
        ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * p.alpha})`;
        ctx.shadowColor = `rgba(255, 255, 255, ${0.55 * p.alpha})`;
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

      {/* 2. Full-Screen Fixed Canvas allowing particles to stream in and disperse */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-screen h-screen pointer-events-none z-20 block touch-none"
        aria-label="Interactive Full-Screen Shebin T R ASCII Particle Portrait"
      />
    </>
  );
};

export default AsciiParticleCanvas;
