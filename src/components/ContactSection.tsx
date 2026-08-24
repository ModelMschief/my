import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink,
  Bot,
  Linkedin,
  Github
} from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [dispatchMethod, setDispatchMethod] = useState<'telegram' | 'email'>('telegram');
  const [submitted, setSubmitted] = useState(false);

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
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Fade In */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-code text-slate-300 mb-4">
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMMUNICATION CHANNEL</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get in Touch
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg mt-3 font-light">
            Ready to architect high-throughput APIs, RAG intelligence, or non-custodial blockchain systems? Let's connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Slides from LEFT on scroll */}
          <motion.div
            initial={{ opacity: 0, x: -90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="rounded-2xl glass-obsidian p-6 space-y-3.5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <h3 className="font-display text-lg font-bold text-white">
                Direct Channels
              </h3>

              {/* Telegram Channel */}
              <a
                href="https://t.me/gojo16s"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5 hover:border-white/15 hover:bg-black/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-mono-code">Telegram</p>
                    <p className="text-xs font-medium text-white group-hover:text-cyan-300 transition-colors">
                      @gojo16s
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              {/* LinkedIn Channel */}
              <a
                href="https://www.linkedin.com/in/shebin-t-r"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5 hover:border-white/15 hover:bg-black/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-mono-code">LinkedIn</p>
                    <p className="text-xs font-medium text-white group-hover:text-cyan-300 transition-colors">
                      in/shebin-t-r
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              {/* WhatsApp Channel */}
              <a
                href="https://wa.me/919037610098"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5 hover:border-white/15 hover:bg-black/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-mono-code">WhatsApp</p>
                    <p className="text-xs font-medium text-white group-hover:text-emerald-300 transition-colors">
                      +91 9037610098
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              {/* Email Channel */}
              <a
                href="mailto:shebinraju2021@gmail.com"
                className="group flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5 hover:border-white/15 hover:bg-black/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-mono-code">Email</p>
                    <p className="text-xs font-medium text-white group-hover:text-blue-300 transition-colors">
                      shebinraju2021@gmail.com
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              {/* GitHub Profile Card */}
              <a
                href="https://github.com/modelmschief"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5 hover:border-white/15 hover:bg-black/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-mono-code">GitHub</p>
                    <p className="text-xs font-medium text-white group-hover:text-slate-200 transition-colors">
                      github.com/modelmschief
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Slides from RIGHT on scroll */}
          <motion.div
            initial={{ opacity: 0, x: 90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleFormSubmit}
              className="rounded-2xl glass-obsidian p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Send Message
                  </h3>
                  <p className="text-xs font-mono-code text-slate-400 mt-0.5">
                    Select delivery destination
                  </p>
                </div>

                {/* Dispatch Mode Selector */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setDispatchMethod('telegram')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all ${
                      dispatchMethod === 'telegram'
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Telegram
                  </button>
                  <button
                    type="button"
                    onClick={() => setDispatchMethod('email')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all ${
                      dispatchMethod === 'email'
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Email
                  </button>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1.5">
                    Your Name or Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-white/30 focus:bg-black/60 text-sm text-white placeholder:text-slate-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1.5">
                    Your Contact Email / Handle
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com or @alex_tg"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-white/30 focus:bg-black/60 text-sm text-white placeholder:text-slate-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1.5">
                    Project Scope / Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your backend requirement, RAG pipeline goals, or Web3 scope..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-white/30 focus:bg-black/60 text-sm text-white placeholder:text-slate-600 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-mono-code text-sm font-medium text-black bg-white hover:bg-slate-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Transmitted Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" />
                    <span>
                      {dispatchMethod === 'telegram'
                        ? 'Dispatch via Telegram'
                        : 'Dispatch via Email'}
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
