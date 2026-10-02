import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, Send, Menu, X, Github, Linkedin } from 'lucide-react';

interface NavbarProps {
  isRevealed?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isRevealed = true }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // RAF-Throttled Scroll Tracking: prevents UI thread lock during touch momentum scrolling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 25);

          const sections = ['home', 'skills', 'projects', 'contact'];
          const scrollPosition = scrollY + 200;

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetHeight = element.offsetHeight;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: '// Home' },
    { href: '#skills', label: '// Skills' },
    { href: '#projects', label: '// Projects' },
    { href: '#contact', label: '// Contact' },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 pointer-events-auto"
      initial={{ y: -70, opacity: 0 }}
      animate={isRevealed ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        className={`max-w-6xl mx-auto rounded-2xl px-5 py-2.5 flex items-center justify-between transition-all duration-300 border ${
          isScrolled 
            ? 'bg-[#F8E7C9]/90 backdrop-blur-xl border-[#DFCCA8] shadow-[0_8px_30px_0_rgba(6,78,59,0.08)]' 
            : 'bg-[#FFFDF8]/85 backdrop-blur-md border-[#DFCCA8]/80 shadow-sm'
        }`}
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <a
            href="#home"
            className="group flex items-center gap-2 font-display text-lg sm:text-xl font-bold tracking-tight text-[#064E3B]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#064E3B]/10 border border-[#064E3B]/20 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-[#064E3B]" />
            </div>
            <span className="tracking-wide">
              SHEBIN<span className="text-[#064E3B]">.</span>TR
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links & Socials */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-mono-code transition-all duration-200 rounded-lg ${
                  isActive
                    ? 'text-[#064E3B] font-semibold bg-[#064E3B]/10 border border-[#064E3B]/20 shadow-xs'
                    : 'text-[#2D4E42] hover:text-[#064E3B] hover:bg-[#064E3B]/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <div className="flex items-center gap-1 ml-2 pl-2 border-l border-[#DFCCA8]">
            <a
              href="https://github.com/modelmschief"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-[#2D4E42] hover:text-[#064E3B] hover:bg-[#064E3B]/10 transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/shebin-t-r"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-[#2D4E42] hover:text-[#064E3B] hover:bg-[#064E3B]/10 transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <a
            href="#contact"
            className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold font-mono-code text-[#F8E7C9] bg-[#064E3B] hover:bg-[#043D2E] rounded-xl transition-all shadow-sm"
          >
            <Send className="w-3 h-3 text-[#F8E7C9]" />
            <span>Contact</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-[#064E3B]/10 border border-[#DFCCA8] text-[#064E3B] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden max-w-6xl mx-auto mt-2 p-4 rounded-2xl bg-[#FFFDF8]/95 backdrop-blur-xl border border-[#DFCCA8] shadow-xl space-y-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-mono-code transition-colors ${
                activeSection === link.href.slice(1)
                  ? 'text-[#064E3B] bg-[#064E3B]/10 font-semibold'
                  : 'text-[#2D4E42] hover:bg-[#064E3B]/5'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center justify-center gap-4 py-2 border-t border-[#DFCCA8]/60">
            <a
              href="https://github.com/modelmschief"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono-code text-[#2D4E42] hover:text-[#064E3B]"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/shebin-t-r"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono-code text-[#064E3B]"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-center mt-2 py-2.5 px-4 rounded-xl bg-[#064E3B] text-[#F8E7C9] font-mono-code text-sm font-semibold"
          >
            Contact
          </a>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
