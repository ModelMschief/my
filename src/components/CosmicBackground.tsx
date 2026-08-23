import React, { useRef, useEffect } from 'react';
import bigbangVideo from '@/assets/bigbang.mp4';

export const CosmicBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Video auto-play error:', err);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* 100% Guaranteed Vite Asset Imported Video */}
      <video
        ref={videoRef}
        src={bigbangVideo}
        autoPlay
        loop
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
