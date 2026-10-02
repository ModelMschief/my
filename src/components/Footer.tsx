import { Terminal, Github, Bot, MessageSquare, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/modelmschief' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/shebin-t-r' },
    { name: 'Telegram', icon: Bot, href: 'https://t.me/gojo16s' },
    { name: 'WhatsApp', icon: MessageSquare, href: 'https://wa.me/919037610098' },
    { name: 'X (Twitter)', icon: Twitter, href: 'https://x.com/TShebin2920' },
  ];

  return (
    <footer className="relative border-t border-[#DFCCA8] bg-[#FFFDF8]/80 backdrop-blur-xl py-12 px-4 sm:px-6 z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Motto */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-6 h-6 rounded-md bg-[#064E3B]/10 border border-[#064E3B]/20 flex items-center justify-center text-[#064E3B]">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-display text-lg font-bold text-[#064E3B] tracking-tight">
              SHEBIN<span className="text-[#064E3B]">.</span>TR
            </span>
          </div>
          <p className="text-xs font-mono-code text-[#4D6D62] italic">
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
                className="p-2.5 rounded-xl bg-[#FAF3E5] border border-[#DFCCA8] text-[#064E3B] hover:bg-[#064E3B] hover:text-[#F8E7C9] hover:border-[#064E3B] transition-all duration-300 shadow-2xs"
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#064E3B]/10 border border-[#064E3B]/20 text-[10px] font-mono-code text-[#064E3B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#064E3B] animate-pulse" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
          <p className="text-[11px] font-mono-code text-[#4D6D62]">
            © {currentYear} Shebin T R. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
