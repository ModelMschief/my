import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, Send, Menu, X, Github, Linkedin } from 'lucide-react';

interface NavbarProps {
  isRevealed?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isRevealed = true }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();

  const navOpacity = useTransform(scrollY, [0, 80], [0.8, 0.95]);
  const navBlur = useTransform(scrollY, [0, 80], ['12px', '20px']);
  const navBorder = useTransform(
    scrollY,
    [0, 80],
    ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.15)']
  );

  // Track active section during scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 220;

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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        className="max-w-6xl mx-auto rounded-2xl px-5 py-2.5 flex items-center justify-between transition-all duration-300"
        style={{
          backgroundColor: `rgba(3, 7, 18, ${navOpacity})`,
          backdropFilter: `blur(${navBlur})`,
          WebkitBackdropFilter: `blur(${navBlur})`,
          borderColor: navBorder,
          borderWidth: 1,
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <a
            href="#home"
            className="group flex items-center gap-2 font-display text-lg sm:text-xl font-bold tracking-tight text-white"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="tracking-wide">
              SHEBIN<span className="text-cyan-400">.</span>TR
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
                    ? 'text-white font-semibold bg-white/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <div className="flex items-center gap-1 ml-2 pl-2 border-l border-white/10">
            <a
              href="https://github.com/modelmschief"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/shebin-t-r"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <a
            href="#contact"
            className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold font-mono-code text-black bg-white hover:bg-slate-200 rounded-xl transition-all shadow-sm"
          >
            <Send className="w-3 h-3 text-black" />
            <span>Contact</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
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
          className="md:hidden max-w-6xl mx-auto mt-2 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-white/10 shadow-2xl space-y-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-mono-code transition-colors ${
                activeSection === link.href.slice(1)
                  ? 'text-white bg-white/10 font-semibold'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center justify-center gap-4 py-2 border-t border-white/10">
            <a
              href="https://github.com/modelmschief"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono-code text-slate-300 hover:text-white"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/shebin-t-r"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono-code text-cyan-400"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-center mt-2 py-2.5 px-4 rounded-xl bg-white text-black font-mono-code text-sm font-semibold"
          >
            Contact
          </a>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
