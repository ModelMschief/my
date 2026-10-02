import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, Send, Github, Linkedin, Briefcase } from 'lucide-react';
import AsciiParticleCanvas from '@/components/AsciiParticleCanvas';

const ROLES = [
  'Computer Vision & Neural Networks',
  'AI & RAG Pipeline Architect',
  'Vectorization & Deep Learning',
  'Backend & Systems Engineer',
  'Non-Custodial Blockchain Engineer',
];

interface HeroSectionProps {
  isRevealed?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isRevealed = true }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(roleTimer);
  }, []);

  return (
    <section
      id="home"
      className="min-h-fit md:min-h-0 lg:min-h-[85vh] relative flex items-start justify-center pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 overflow-x-hidden"
    >
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Glides in smoothly on load */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={isRevealed ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 space-y-4 sm:space-y-6 text-left"
          >
            {/* Main Headline */}
            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#064E3B] leading-tight">
                Shebin T R
              </h1>
              <div className="h-9 flex items-center">
                <span className="text-xl sm:text-2xl font-mono-code text-[#064E3B] mr-2 font-bold">&gt;</span>
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl sm:text-2xl font-semibold font-display text-[#1B3B31]"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </div>
            </div>

            {/* Narrative Summary with High Readability */}
            <p className="text-base sm:text-lg text-[#26473D] max-w-xl leading-relaxed font-normal">
              Studying AI & Data Science Engineering. Training{' '}
              <span className="text-[#064E3B] font-semibold">image detection models & neural networks</span>, architecting{' '}
              <span className="text-[#064E3B] font-semibold">high-dimensional vectorization & RAG pipelines</span>, and building{' '}
              <span className="text-[#064E3B] font-semibold">non-custodial payment gateways</span> on BSC and TON.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-[#F8E7C9] bg-[#064E3B] hover:bg-[#043D2E] transition-all duration-200 shadow-sm font-mono-code"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 text-[#F8E7C9]" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-[#064E3B] bg-[#FFFDF8] hover:bg-[#FAF3E5] border border-[#DFCCA8] hover:border-[#064E3B]/40 transition-all duration-200 font-mono-code shadow-xs"
              >
                <Send className="w-4 h-4 text-[#064E3B]" />
                <span>Get in Touch</span>
              </a>

              <a
                href="https://github.com/modelmschief"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#FFFDF8] hover:bg-[#FAF3E5] border border-[#DFCCA8] hover:border-[#064E3B]/40 text-[#064E3B] transition-colors shadow-xs"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/shebin-t-r"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#FFFDF8] hover:bg-[#FAF3E5] border border-[#DFCCA8] hover:border-[#064E3B]/40 text-[#064E3B] transition-colors shadow-xs"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Verified Metrics Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#DFCCA8] max-w-lg">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#064E3B] flex items-center gap-1">
                  <span>4</span>
                  <Briefcase className="w-4 h-4 text-[#064E3B]" />
                </p>
                <p className="text-xs text-[#4D6D62] font-mono-code mt-0.5">Internships Completed</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#064E3B]">
                  100%
                </p>
                <p className="text-xs text-[#4D6D62] font-mono-code mt-0.5">Non-Custodial Web3</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#064E3B]">
                  &lt;40ms
                </p>
                <p className="text-xs text-[#4D6D62] font-mono-code mt-0.5">RAG Query Latency</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive 60 FPS ASCII Particle Physics Portrait (Unaltered) */}
          <div className="md:col-span-5 flex justify-center md:justify-end mt-4 md:mt-0 md:pt-1">
            <AsciiParticleCanvas isRevealed={isRevealed} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
