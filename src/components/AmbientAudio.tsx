import React, { useRef, useEffect, useState } from 'react';
import trimmedAudio from '@/assets/awakening_trimmed.mp3';
import { Volume2, VolumeX } from 'lucide-react';

interface AmbientAudioProps {
  hasStarted?: boolean;
  audioEnabled?: boolean;
  isRevealed?: boolean;
}

export const AmbientAudio: React.FC<AmbientAudioProps> = ({ 
  hasStarted = true,
  audioEnabled = true,
  isRevealed = true 
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(trimmedAudio);
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0.25; // Pleasant ambient volume

    if (hasStarted && audioEnabled) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log('Audio playback prevented:', err);
      });
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [hasStarted, audioEnabled]);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  if (!isRevealed || !hasStarted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <button
        onClick={toggleSound}
        className="group flex items-center gap-2 px-3.5 py-2 rounded-full glass-obsidian hover:border-white/20 transition-all duration-300 text-xs font-mono-code text-slate-300 shadow-xl cursor-pointer"
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
