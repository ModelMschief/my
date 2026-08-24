import React, { useRef, useEffect } from 'react';
import bigbangVideo from '@/assets/bigbang.mp4';

interface CosmicBackgroundProps {
  hasStarted?: boolean;
  onReveal?: () => void;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ 
  hasStarted = true, 
  onReveal 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const revealedRef = useRef(false);
  const slowMoRef = useRef(false);
  const onRevealRef = useRef(onReveal);
  const isInitializedRef = useRef(false);

  // Keep latest onReveal callback reference without triggering re-render effects
  useEffect(() => {
    onRevealRef.current = onReveal;
  }, [onReveal]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasStarted || isInitializedRef.current) return;

    isInitializedRef.current = true;
    video.currentTime = 0;
    video.playbackRate = 1.0;
    video.play().catch((err) => {
      console.warn('Video playback error:', err);
    });

    const handleTimeUpdate = () => {
      const time = video.currentTime;

      // 1. Milestone at 5.0s: Trigger Left & Right portfolio emergence
      if (time >= 5.0 && !revealedRef.current) {
        revealedRef.current = true;
        if (onRevealRef.current) {
          onRevealRef.current();
        }
      }

      // 2. Milestone at 8.0s: Full slow-motion (0.35x)
      if (time >= 8.0 && !slowMoRef.current) {
        slowMoRef.current = true;
        video.playbackRate = 0.35;
      }

      // 3. Milestone at 26.5s: Freeze & pause permanently on the starfield frame
      if (time >= 26.5) {
        video.pause();
        video.currentTime = 26.5;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [hasStarted]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Big bang video starts once and never resets on re-renders */}
      <video
        ref={videoRef}
        src={bigbangVideo}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{
          objectFit: 'cover',
          width: '100vw',
          height: '100vh',
        }}
      />
    </div>
  );
};

export default CosmicBackground;
