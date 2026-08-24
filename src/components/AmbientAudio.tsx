import React, { useRef, useEffect, useState } from 'react';
import trimmedAudio from '@/assets/awakening_trimmed.mp3';
import { Volume2, VolumeX } from 'lucide-react';

interface AmbientAudioProps {
  isRevealed?: boolean;
}

export const AmbientAudio: React.FC<AmbientAudioProps> = ({ isRevealed = true }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio(trimmedAudio);
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0.25; // Very low, comfortable ambient volume

    const startAudio = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Autoplay pending user interaction:', err);
        });
    };

    // Attempt direct play
    startAudio();

    // Browser autoplay policy fallback on first interaction
    const handleFirstInteraction = () => {
      if (audio.paused) {
        startAudio();
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      audio.pause();
      audio.src = '';
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
      setIsMuted(true);
    }
  };

  if (!isRevealed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <button
        onClick={toggleSound}
        className="group flex items-center gap-2 px-3 py-2 rounded-full glass-obsidian hover:border-white/20 transition-all duration-300 text-xs font-mono-code text-slate-300 shadow-xl cursor-pointer"
        title={isPlaying ? 'Mute Ambient Audio' : 'Play Ambient Audio'}
        aria-label={isPlaying ? 'Mute Audio' : 'Play Audio'}
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Wave Bars */}
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-2 bg-cyan-400 rounded-full animate-[pulse_1.1s_ease-in-out_infinite]" />
              <span className="w-0.5 h-3.5 bg-cyan-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite]" />
            </div>
            <span className="text-[11px] text-cyan-300">AUDIO ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            <span className="text-[11px] text-slate-400 group-hover:text-white transition-colors">
              AUDIO MUTED
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default AmbientAudio;
