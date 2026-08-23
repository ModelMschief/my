import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, Send, Activity, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [timeString, setTimeString] = useState('');
  const { scrollY } = useScroll();

  // Real-time HUD Clock (UTC/Local)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${mins}:${secs}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const navOpacity = useTransform(scrollY, [0, 80], [0.8, 0.95]);
  const navBlur = useTransform(scrollY, [0, 80], ['12px', '20px']);
  const navBorder = useTransform(
    scrollY,
    [0, 80],
    ['rgba(255, 255, 255, 0.05)', 'rgba(6, 182, 212, 0.2)']
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
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
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
        {/* Brand Logo & Live System Beacon */}
        <div className="flex items-center gap-4">
          <a
            href="#home"
            className="group flex items-center gap-2 font-display text-lg sm:text-xl font-bold tracking-tight text-white"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 p-[1px] flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-[#030712] rounded-[7px] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <span className="tracking-wide">
              SHEBIN<span className="text-cyan-400">.</span>TR
            </span>
          </a>

          {/* System Status Pill (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[11px] font-mono-code text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SYSTEM: ONLINE</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">{timeString}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-mono-code transition-all duration-200 rounded-lg ${
                  isActive
                    ? 'text-cyan-300 font-semibold bg-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-lg border border-cyan-500/30 -z-10 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          <a
            href="#contact"
            className="ml-3 group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold font-mono-code text-white rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 p-[1px] hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            <span className="px-3.5 py-1.5 rounded-[11px] bg-[#030712]/90 flex items-center gap-1.5 group-hover:bg-transparent transition-colors">
              <Send className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>DISPATCH</span>
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
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
          className="md:hidden max-w-6xl mx-auto mt-2 p-4 rounded-2xl glass-dock border border-cyan-500/20 shadow-2xl space-y-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-mono-code transition-colors ${
                activeSection === link.href.slice(1)
                  ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-center mt-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-mono-code text-sm font-semibold shadow-lg shadow-cyan-500/20"
          >
            // INITIALIZE CONTACT
          </a>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
