import React from 'react';
import asciiText from '@/assets/portrait_ascii.txt?raw';

interface AsciiPortraitProps {
  className?: string;
}

export const AsciiPortrait: React.FC<AsciiPortraitProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}>
      {/* Enlarged pure white ASCII text portrait */}
      <pre 
        className="font-mono-code text-[4.8px] sm:text-[5.8px] md:text-[6.8px] lg:text-[7.6px] xl:text-[8.2px] leading-[4.5px] sm:leading-[5.4px] md:leading-[6.3px] lg:leading-[7.0px] xl:leading-[7.6px] text-white/95 whitespace-pre tracking-[-0.03em] overflow-hidden drop-shadow-[0_0_12px_rgba(255,255,255,0.45)] transition-all duration-300"
        aria-label="Shebin T R ASCII Portrait"
      >
        {asciiText}
      </pre>
    </div>
  );
};

export default AsciiPortrait;
