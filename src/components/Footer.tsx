import { Terminal, Github, Bot, MessageSquare, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/modelmschief', color: 'hover:text-white hover:border-slate-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/shebin-t-r', color: 'hover:text-cyan-400 hover:border-cyan-500/40' },
    { name: 'Telegram', icon: Bot, href: 'https://t.me/gojo16s', color: 'hover:text-sky-400 hover:border-sky-500/40' },
    { name: 'WhatsApp', icon: MessageSquare, href: 'https://wa.me/919037610098', color: 'hover:text-emerald-400 hover:border-emerald-500/40' },
    { name: 'X (Twitter)', icon: Twitter, href: 'https://x.com/TShebin2920', color: 'hover:text-blue-400 hover:border-blue-500/40' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-black/80 backdrop-blur-xl py-12 px-4 sm:px-6 z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Motto */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-6 h-6 rounded-md bg-white/10 border border-white/15 flex items-center justify-center text-cyan-400">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-display text-lg font-bold text-white tracking-tight">
              SHEBIN<span className="text-cyan-400">.</span>TR
            </span>
          </div>
          <p className="text-xs font-mono-code text-slate-400 italic">
            "Building things that work. Then making them work better."
          </p>
        </div>

        {/* Verified Social Connects */}
        <div className="flex items-center gap-2.5">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl glass-obsidian border border-white/10 text-slate-400 ${social.color} transition-all duration-300 shadow-sm`}
                title={social.name}
                aria-label={social.name}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        {/* Copyright & Live Status */}
        <div className="text-center md:text-right space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[10px] font-mono-code text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
          <p className="text-[11px] font-mono-code text-slate-500">
            © {currentYear} Shebin T R. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
