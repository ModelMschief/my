import { motion, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Terminal as TerminalIcon, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink,
  Bot,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [dispatchMethod, setDispatchMethod] = useState<'telegram' | 'email'>('telegram');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Terminal Easter Egg State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string | React.ReactNode }>>([
    {
      command: 'init',
      output: 'Quantum Singularity Shell v2.6.4 // Type "help" for available commands.',
    },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = 'Available: whoami, skills, projects, contact, telegram, bigbang, clear';
        break;
      case 'whoami':
        output = 'Shebin T R // AI & RAG Pipeline Architect, Non-Custodial BSC/TON Blockchain Engineer.';
        break;
      case 'skills':
        output = 'Core: Python (FastAPI/Flask), RAG (Chroma/LangChain), BSC JSON-RPC, TON SDK, Node.js, Redis, MongoDB.';
        break;
      case 'projects':
        output = '1. BSC Non-Custodial Gateway | 2. Custom RAG Framework | 3. TON Crypto Lib | 4. API Provider Platform.';
        break;
      case 'contact':
      case 'telegram':
        output = 'Telegram: @gojo16s | WhatsApp: +91 9037610098 | Email: shebinraju2021@gmail.com';
        break;
      case 'bigbang':
        output = '💥 Supernova Singularity Triggered! Cosmic particle drift initialized.';
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        output = `Command not recognized: "${cmd}". Type "help" for valid directives.`;
    }

    setTerminalHistory((prev) => [...prev, { command: cmd, output }]);
    setTerminalInput('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dispatchMethod === 'telegram') {
      const text = encodeURIComponent(
        `Hi Shebin, I saw your portfolio!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
      );
      window.open(`https://t.me/gojo16s?text=${text}`, '_blank');
    } else {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.open(`mailto:shebinraju2021@gmail.com?subject=${subject}&body=${body}`, '_blank');
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-cyan-500/30 text-xs font-mono-code text-cyan-300 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Send className="w-3.5 h-3.5" />
            <span>QUANTUM DISPATCH PROTOCOL</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Initialize <span className="text-gradient-cyan">Connection</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg mt-3 font-light">
            Ready to architect high-throughput APIs, RAG intelligence, or non-custodial blockchain systems? Let's connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Telegram & Social Hub */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Connect Cards */}
            <div className="rounded-2xl glass-card border border-slate-800/90 p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                <span>Instant Direct Channels</span>
              </h3>

              {/* Telegram Channel */}
              <a
                href="https://t.me/gojo16s"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-950/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-mono-code">Telegram Handle</p>
                    <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      @gojo16s
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>

              {/* WhatsApp Channel */}
              <a
                href="https://wa.me/919037610098"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-mono-code">WhatsApp Direct</p>
                    <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      +91 9037610098
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </a>

              {/* Email Channel */}
              <a
                href="mailto:shebinraju2021@gmail.com"
                className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-mono-code">Direct Email</p>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                      shebinraju2021@gmail.com
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </a>
            </div>

            {/* Interactive Cyber Terminal Easter Egg */}
            <div className="rounded-2xl glass-card border border-cyan-500/20 p-5 font-mono-code text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-300 text-[11px]">interactive_cli_shell</span>
                </div>
                <span className="text-[10px] text-slate-500">TRY: "help"</span>
              </div>

              {/* Terminal Logs */}
              <div className="h-32 overflow-y-auto space-y-2 pr-1 scrollbar-thin text-slate-300">
                {terminalHistory.map((item, i) => (
                  <div key={i} className="space-y-0.5">
                    <p className="text-cyan-400">
                      <span className="text-slate-500">&gt;</span> {item.command}
                    </p>
                    <p className="text-slate-300 pl-3 leading-relaxed text-[11px]">{item.output}</p>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Input */}
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <span className="text-cyan-400 font-bold">&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type a command (e.g. whoami, bigbang)..."
                  className="w-full bg-transparent text-slate-100 placeholder:text-slate-600 outline-none text-xs"
                />
              </form>
            </div>
          </motion.div>

          {/* Right Column: Dispatcher Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleFormSubmit}
              className="rounded-2xl glass-card border border-slate-800/90 p-6 sm:p-8 space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Send Transmission
                  </h3>
                  <p className="text-xs font-mono-code text-slate-400 mt-0.5">
                    Choose preferred dispatch pipe
                  </p>
                </div>

                {/* Dispatch Mode Selector */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setDispatchMethod('telegram')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all ${
                      dispatchMethod === 'telegram'
                        ? 'bg-cyan-500 text-black font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Telegram Pipe
                  </button>
                  <button
                    type="button"
                    onClick={() => setDispatchMethod('email')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all ${
                      dispatchMethod === 'email'
                        ? 'bg-violet-500 text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Email Mailto
                  </button>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1.5">
                    // YOUR NAME OR ORGANIZATION
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan / CyberTech Lab"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 focus:border-cyan-500/60 focus:bg-slate-950/90 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1.5">
                    // YOUR CONTACT EMAIL / HANDLE
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@enterprise.io or @alex_tg"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 focus:border-cyan-500/60 focus:bg-slate-950/90 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1.5">
                    // TRANSMISSION PAYLOAD (PROJECT DETAILS)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your architecture requirements, AI pipeline goals, or Web3 gateway scope..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 focus:border-cyan-500/60 focus:bg-slate-950/90 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-mono-code text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>DISPATCH INITIALIZED!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-cyan-200" />
                    <span>
                      {dispatchMethod === 'telegram'
                        ? 'DISPATCH DIRECTLY TO TELEGRAM'
                        : 'DISPATCH VIA EMAIL CLIENT'}
                    </span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
