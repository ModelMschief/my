import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CosmicBackground from '@/components/CosmicBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AmbientAudio from '@/components/AmbientAudio';
import { Volume2, VolumeX } from 'lucide-react';

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Memoized callback to prevent unnecessary re-render triggers
  const handleReveal = useCallback(() => {
    setIsRevealed(true);
  }, []);

  // If user scrolls after starting, ensure everything is revealed
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20 && hasStarted) {
        setIsRevealed(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasStarted]);

  const handleStartExperience = (withSound: boolean) => {
    setAudioEnabled(withSound);
    setHasStarted(true);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Clean, Classic Modern Audio Entry Modal */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md w-full bg-[#050811]/90 backdrop-blur-2xl rounded-2xl p-6 sm:p-7 text-left space-y-5 shadow-2xl relative overflow-hidden border border-white/10"
            >
              {/* Subtle top edge specular highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-white tracking-wide">
                      Soundtrack
                    </h3>
                    <p className="text-[11px] font-mono-code text-slate-400">
                      Ambient Experience
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono-code text-slate-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                  OPTIONAL
                </span>
              </div>

              {/* Body message */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                An ambient soundscape is paired with this portfolio. Would you like to enable sound?
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => handleStartExperience(true)}
                  className="py-2.5 px-4 rounded-xl text-xs font-mono-code font-semibold text-black bg-white hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>With Sound</span>
                </button>

                <button
                  onClick={() => handleStartExperience(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-mono-code font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mute</span>
                </button>
              </div>

              {/* Minimal footer note */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono-code text-slate-400">
                <span>Shebin T R</span>
                <span>Toggleable anytime via HUD</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Atmospheric Non-Looping Big Bang Background Engine */}
      <CosmicBackground 
        hasStarted={hasStarted} 
        onReveal={handleReveal} 
      />

      {/* 3. Interactive Navigation (Slides down at 5s) */}
      <Navbar isRevealed={isRevealed} />

      {/* 4. Main Content Sections */}
      <main className="relative z-10">
        <HeroSection isRevealed={isRevealed} />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* 5. Looped Background Ambient Audio */}
      <AmbientAudio 
        hasStarted={hasStarted} 
        audioEnabled={audioEnabled} 
        isRevealed={isRevealed} 
      />

      {/* 6. Cosmic Footer */}
      <Footer />
    </div>
  );
};

export default Index;
