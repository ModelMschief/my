import { useState, useEffect } from 'react';
import CosmicBackground from '@/components/CosmicBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AmbientAudio from '@/components/AmbientAudio';

const Index = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  // If user scrolls before 5 seconds, reveal immediately for convenience
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsRevealed(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Atmospheric Non-Looping Big Bang Background Engine */}
      <CosmicBackground onReveal={() => setIsRevealed(true)} />

      {/* 2. Interactive Navigation (Slides down at 5s) */}
      <Navbar isRevealed={isRevealed} />

      {/* 3. Main Content Sections */}
      <main className="relative z-10">
        <HeroSection isRevealed={isRevealed} />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* 4. Looped Background Ambient Audio (Low volume with HUD control) */}
      <AmbientAudio isRevealed={isRevealed} />

      {/* 5. Cosmic Footer */}
      <Footer />
    </div>
  );
};

export default Index;
