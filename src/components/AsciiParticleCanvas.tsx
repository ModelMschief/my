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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isRevealedRef = useRef(isRevealed);
  const revealStartTimeRef = useRef<number | null>(performance.now());

  const mouseRef = useRef<{ x: number; y: number; radius: number; isHovering: boolean }>({
    x: -9999,
    y: -9999,
    radius: 65,
    isHovering: false,
  });

  useEffect(() => {
    isRevealedRef.current = isRevealed;
    if (revealStartTimeRef.current === null) {
      revealStartTimeRef.current = performance.now();
    }
  }, [isRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isLoopRunning = false;
    let isIntersecting = true;
    let particles: Particle[] = [];

    // Parse ASCII Matrix lines & columns
    const rawLines = asciiText.split('\n');
    const rowCount = rawLines.length;
    let maxColCount = 0;
    rawLines.forEach((l) => {
      if (l.length > maxColCount) maxColCount = l.length;
    });

    const initParticles = (width: number, height: number) => {
      particles = [];
      const cellHeight = height / rowCount;
      const cellWidth = width / maxColCount;
      const fontSize = cellHeight * 1.08;
      const isMobile = window.innerWidth < 640;

      for (let r = 0; r < rowCount; r++) {
        const line = rawLines[r] || '';
        for (let c = 0; c < line.length; c++) {
          const char = line[c];
          if (char && char !== ' ') {
            // Adaptive Mobile Stride for mobile devices
            if (isMobile && (r + c) % 2 !== 0) {
              continue;
            }

            const targetX = c * cellWidth + cellWidth / 2;
            const targetY = r * cellHeight + cellHeight / 2;

            // Start with a subtle right-staggered scatter within the dark section
            const startX = targetX + 45 + Math.random() * 85;
            const startY = targetY + (Math.random() - 0.5) * 55;

            particles.push({
              x: startX,
              y: startY,
              col: c,
              row: r,
              vx: 0,
              vy: 0,
              char,
              size: fontSize,
              ease: 0.014 + Math.random() * 0.012,
              friction: 0.92 + Math.random() * 0.02,
              blastMultiplier: 1.0 + Math.random() * 0.7,
              driftPhase: Math.random() * Math.PI * 2,
              spawnDelay: Math.random() * 0.8,
              hasStartedTravel: false,
              alpha: 0,
            });
          }
        }
      }
    };

    const handleResize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
      const isMobileDevice = window.innerWidth < 768 || (window.innerWidth <= 1024 && isTouchDevice);
      const dpr = Math.min(window.devicePixelRatio || 1, isMobileDevice ? 1.5 : 2.0);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initParticles(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Track mouse & touch relative to the black section
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.isHovering = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
        mouseRef.current.isHovering = true;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      mouseRef.current.isHovering = false;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleMouseLeave);
    container.addEventListener('touchcancel', handleMouseLeave);

    // 60 FPS Particle Physics & Assembly Engine Loop
    let timeTick = 0;
    const render = () => {
      if (!isIntersecting) {
        isLoopRunning = false;
        return;
      }

      timeTick += 0.015;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
      const isMobileDevice = window.innerWidth < 768 || (window.innerWidth <= 1024 && isTouchDevice);
      const dpr = Math.min(window.devicePixelRatio || 1, isMobileDevice ? 1.5 : 2.0);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const radius = mouse.radius;
      const now = performance.now();
      const isRev = isRevealedRef.current;
      const startTime = revealStartTimeRef.current || now;
      const timeSinceRevealSec = (now - startTime) / 1000;

      const cellHeight = height / rowCount;
      const cellWidth = width / maxColCount;
      const fontSize = cellHeight * 1.08;

      // Bold font definition
      ctx.font = `bold ${fontSize}px "JetBrains Mono", ui-monospace, SFMono-Regular, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Desktop atmospheric glow in pure white
      if (!isMobileDevice) {
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.45)';
      } else {
        ctx.shadowBlur = 0;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.size = fontSize;

        const originX = p.col * cellWidth + cellWidth / 2;
        const originY = p.row * cellHeight + cellHeight / 2;

        if (isRev && !p.hasStartedTravel) {
          if (timeSinceRevealSec >= p.spawnDelay) {
            p.hasStartedTravel = true;
          }
        }

        if (!p.hasStartedTravel) {
          continue;
        }

        // Fade in
        if (p.alpha < 1.0) {
          p.alpha = Math.min(1.0, p.alpha + 0.04);
        }

        // 1. High-Velocity Scatter on Cursor / Touch Contact
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const force = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx) + (Math.sin(p.driftPhase + timeTick) * 0.35);
          const push = force * (20 * p.blastMultiplier);
          
          p.vx += Math.cos(angle) * push;
          p.vy += Math.sin(angle) * push;
          p.x += Math.cos(angle) * (push * 0.4);
          p.y += Math.sin(angle) * (push * 0.4);
        }

        // 2. Precision Return & Stream-In Assembly
        const homeDx = originX - p.x;
        const homeDy = originY - p.y;
        const homeDist = Math.sqrt(homeDx * homeDx + homeDy * homeDy);

        if (homeDist > 25) {
          p.vx += homeDx * p.ease;
          p.vy += homeDy * p.ease;

          // Subtle zero-gravity atmospheric drift
          p.vx += Math.cos(p.driftPhase + timeTick) * 0.12;
          p.vy += Math.sin(p.driftPhase + timeTick) * 0.12;

          p.vx *= p.friction;
          p.vy *= p.friction;

          p.x += p.vx;
          p.y += p.vy;
        } else if (homeDist > 0.4) {
          const lerpSpeed = Math.min(0.22, 0.10 + ((25 - homeDist) / 25) * 0.12);
          p.x += homeDx * lerpSpeed;
          p.y += homeDy * lerpSpeed;
          p.vx *= 0.6;
          p.vy *= 0.6;
        } else {
          p.x = originX;
          p.y = originY;
          p.vx = 0;
          p.vy = 0;
        }

        // 3. Render White Glowing Character
        ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * p.alpha})`;
        ctx.fillText(p.char, p.x, p.y);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isLoopRunning && isIntersecting) {
        isLoopRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startLoop();
        } else {
          isLoopRunning = false;
          cancelAnimationFrame(animationFrameId);
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.restore();
        }
      });
    }, { rootMargin: '50px' });

    observer.observe(container);
    startLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleMouseLeave);
      container.removeEventListener('touchcancel', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      className={`relative w-full max-w-[320px] xs:max-w-[350px] sm:max-w-[380px] lg:max-w-[420px] rounded-2xl bg-black border border-neutral-800 shadow-2xl overflow-hidden select-none ${className}`}
    >
      <div 
        ref={containerRef} 
        className="relative w-full aspect-[4/5] overflow-hidden bg-black touch-none cursor-default"
      >
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full block" 
          aria-label="Shebin T R ASCII Particle Portrait" 
        />
      </div>
    </div>
  );
};

export default AsciiParticleCanvas;
