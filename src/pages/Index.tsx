import CosmicBackground from '@/components/CosmicBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Atmospheric Big Bang & Gravitational Starfield Engine */}
      <CosmicBackground />

      {/* 2. Interactive Glassmorphic Navigation */}
      <Navbar />

      {/* 3. Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* 4. Cosmic HUD Footer */}
      <Footer />
    </div>
  );
};

export default Index;

