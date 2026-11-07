import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Report visitor telemetry once per browser session
    try {
      if (typeof window !== 'undefined' && !sessionStorage.getItem('portfolio_visited')) {
        const payload = JSON.stringify({
          path: window.location.pathname || '/',
          referrer: document.referrer || '',
          user_agent: navigator.userAgent || '',
        });

        if (navigator.sendBeacon) {
          const blob = new Blob([payload], { type: 'application/json' });
          navigator.sendBeacon('https://fahhh.duckdns.org/portfolio/visit', blob);
        } else {
          fetch('https://fahhh.duckdns.org/portfolio/visit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
        sessionStorage.setItem('portfolio_visited', 'true');
      }
    } catch {
      // Telemetry must never disrupt client rendering
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8E7C9] text-[#064E3B] relative selection:bg-[#064E3B] selection:text-[#F8E7C9] font-sans">
      {/* 1. Visibly Living Luxury Ambient Breathing Layer (Framer Motion RAF Driven) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
        aria-hidden="true"
      >
        {/* Subtle Architectural Drafting Grid that catches the moving light */}
        <div className="absolute inset-0 bg-cyber-grid opacity-30" />

        {/* Top Radiant Golden Sunburst */}
        <motion.div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-b from-[#CFA146]/55 via-[#E8C779]/35 to-transparent blur-2xl rounded-full"
          animate={{
            x: ['-50%', '-45%', '-55%', '-50%'],
            y: [0, 35, -20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Mid-Left Luminous Emerald Nebula */}
        <motion.div 
          className="absolute top-[25%] -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-[#064E3B]/50 via-[#0D7A5C]/40 to-transparent blur-2xl rounded-full"
          animate={{
            x: [0, 65, -30, 0],
            y: [0, -55, 35, 0],
            scale: [1, 1.2, 0.92, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Mid-Right Warm Amber Honey Glow */}
        <motion.div 
          className="absolute top-[52%] -right-32 w-[650px] h-[650px] bg-gradient-to-bl from-[#D99A26]/50 via-[#E8B856]/35 to-transparent blur-2xl rounded-full"
          animate={{
            x: [0, -55, 35, 0],
            y: [0, 45, -30, 0],
            scale: [1, 1.18, 0.94, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Bottom Emerald Mist */}
        <motion.div 
          className="absolute -bottom-36 left-1/3 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-t from-[#064E3B]/45 via-[#0D7A5C]/30 to-transparent blur-2xl rounded-full"
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -35, 25, 0],
            scale: [1, 1.16, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
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
