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
import { Volume2, VolumeX, Sparkles, Terminal } from 'lucide-react';

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
      {/* 1. Friendly Interactive Audio Entry Overlay (Before Video Starts) */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md w-full glass-obsidian rounded-3xl p-7 sm:p-9 text-center space-y-6 shadow-2xl relative overflow-hidden border border-white/15"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

              {/* Glowing Icon Header */}
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mx-auto flex items-center justify-center text-cyan-400 shadow-[0_0_25px_-5px_rgba(6,182,212,0.4)]">
                <Volume2 className="w-7 h-7" />
              </div>

              {/* Title & Friendly Message */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono-code text-slate-300">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>SHEBIN T R // PORTFOLIO</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Experience with Sound?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  This portfolio features an immersive cosmic visual experience. Would you like to enable ambient background music?
                </p>
              </div>

              {/* Choice Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => handleStartExperience(true)}
                  className="flex-1 py-3.5 px-5 rounded-xl font-mono-code text-xs font-semibold text-black bg-white hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-lg group cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Enter with Sound</span>
                </button>

                <button
                  onClick={() => handleStartExperience(false)}
                  className="flex-1 py-3.5 px-5 rounded-xl font-mono-code text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span>Enter Silently</span>
                </button>
              </div>

              <p className="text-[11px] font-mono-code text-slate-500">
                You can toggle audio anytime using the HUD button.
              </p>
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
