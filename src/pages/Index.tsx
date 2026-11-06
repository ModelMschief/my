import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F8E7C9] text-[#064E3B] relative selection:bg-[#064E3B] selection:text-[#F8E7C9] font-sans">
      {/* 1. Visible, atmospheric champagne & emerald ambient breathing mesh */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
        aria-hidden="true"
      >
        {/* Top Radiant Golden-Champagne Glow */}
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#E2BE82]/45 via-[#ECD3A8]/25 to-transparent blur-3xl rounded-full animate-ambient-1" />
        
        {/* Mid-Left Emerald Auroral Glow */}
        <div className="absolute top-[28%] -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-[#064E3B]/20 via-[#047857]/14 to-transparent blur-3xl rounded-full animate-ambient-2" />
        
        {/* Mid-Right Warm Honey-Gold Glow */}
        <div className="absolute top-[55%] -right-40 w-[650px] h-[650px] bg-gradient-to-bl from-[#DFBA78]/35 via-[#F0D8AA]/20 to-transparent blur-3xl rounded-full animate-ambient-3" />

        {/* Bottom Emerald Mist */}
        <div className="absolute -bottom-40 left-1/3 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-t from-[#064E3B]/16 via-[#047857]/10 to-transparent blur-3xl rounded-full animate-ambient-1" />
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
