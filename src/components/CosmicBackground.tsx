import React, { useRef, useEffect } from 'react';
import bigbangVideo from '@/assets/bigbang.mp4';

interface CosmicBackgroundProps {
  onReveal?: () => void;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ onReveal }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const revealedRef = useRef(false);
  const slowMoRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start video at normal speed (1.0x)
    video.playbackRate = 1.0;
    video.play().catch((err) => {
      console.warn('Video auto-play error:', err);
    });

    const handleTimeUpdate = () => {
      const time = video.currentTime;

      // 1. Milestone at 6.0s: Trigger Left & Right portfolio emergence
      if (time >= 6.0 && !revealedRef.current) {
        revealedRef.current = true;
        if (onReveal) onReveal();
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
  }, [onReveal]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Non-looping bigbang video: plays normal, slows down at 8s, stops at 26.5s */}
      <video
        ref={videoRef}
        src={bigbangVideo}
        autoPlay
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
