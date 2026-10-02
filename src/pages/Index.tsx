import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F8E7C9] text-[#064E3B] relative selection:bg-[#064E3B] selection:text-[#F8E7C9] font-sans">
      {/* 1. Subtle warm champagne & soft emerald ambient gradient accents */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-40 overflow-hidden" 
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#EED5AB]/60 via-[#F8E7C9]/40 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-[35%] -left-32 w-[500px] h-[500px] bg-[#064E3B]/5 blur-3xl rounded-full" />
        <div className="absolute top-[65%] -right-32 w-[500px] h-[500px] bg-[#EED5AB]/40 blur-3xl rounded-full" />
      </div>

      {/* 2. Interactive Navigation Dock */}
      <Navbar isRevealed={true} />

      {/* 3. Main Content Sections */}
      <main className="relative z-10">
        <HeroSection isRevealed={true} />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
};

export default Index;
