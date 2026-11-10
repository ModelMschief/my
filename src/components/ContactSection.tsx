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
  Github,
  Loader2
} from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [dispatchMethod, setDispatchMethod] = useState<'telegram' | 'email'>('telegram');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('https://fahhh.duckdns.org/portfolio/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.email,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        throw new Error('Server returned error status');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      // Graceful client fallback: open direct Telegram / Email client
      if (dispatchMethod === 'telegram') {
        const text = encodeURIComponent(
          `Hi Shebin, I saw your portfolio!\nName: ${formData.name}\nContact: ${formData.email}\nMessage: ${formData.message}`
        );
        window.open(`https://t.me/gojo16s?text=${text}`, '_blank');
      } else {
        const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nContact: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        window.open(`mailto:shebinraju2021@gmail.com?subject=${subject}&body=${body}`, '_blank');
      }
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Fade In */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-impact text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-[#064E3B] leading-[0.95]">
            Get in Touch
          </h2>
          <p className="text-[#26473D] max-w-2xl mx-auto text-base sm:text-lg mt-3 font-normal">
            Ready to architect high-throughput APIs, RAG intelligence, or non-custodial blockchain systems? Let's connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="rounded-2xl bg-[#FFFDF8] border border-[#DFCCA8] p-6 space-y-3.5 shadow-sm text-left">
              <h3 className="font-display text-lg font-bold text-[#064E3B]">
                Direct Channels
              </h3>

              {/* Telegram Channel */}
              <a
                href="https://t.me/gojo16s"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-[#FAF3E5] border border-[#DFCCA8] hover:border-[#064E3B]/40 hover:bg-[#F3E7D3] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#064E3B]/10 border border-[#064E3B]/20 flex items-center justify-center text-[#064E3B]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#4D6D62] font-mono-code">Telegram</p>
                    <p className="text-xs font-semibold text-[#064E3B] group-hover:text-[#043D2E] transition-colors">
                      @gojo16s
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#4D6D62] group-hover:text-[#064E3B] transition-colors" />
              </a>

              {/* LinkedIn Channel */}
              <a
                href="https://www.linkedin.com/in/shebin-t-r"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-[#FAF3E5] border border-[#DFCCA8] hover:border-[#064E3B]/40 hover:bg-[#F3E7D3] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#064E3B]/10 border border-[#064E3B]/20 flex items-center justify-center text-[#064E3B]">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#4D6D62] font-mono-code">LinkedIn</p>
                    <p className="text-xs font-semibold text-[#064E3B] group-hover:text-[#043D2E] transition-colors">
                      in/shebin-t-r
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#4D6D62] group-hover:text-[#064E3B] transition-colors" />
              </a>

              {/* WhatsApp Channel */}
              <a
                href="https://wa.me/919037610098"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-[#FAF3E5] border border-[#DFCCA8] hover:border-[#064E3B]/40 hover:bg-[#F3E7D3] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#064E3B]/10 border border-[#064E3B]/20 flex items-center justify-center text-[#064E3B]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#4D6D62] font-mono-code">WhatsApp</p>
                    <p className="text-xs font-semibold text-[#064E3B] group-hover:text-[#043D2E] transition-colors">
                      +91 9037610098
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#4D6D62] group-hover:text-[#064E3B] transition-colors" />
              </a>

              {/* Email Channel */}
              <a
                href="mailto:shebinraju2021@gmail.com"
                className="group flex items-center justify-between p-3 rounded-xl bg-[#FAF3E5] border border-[#DFCCA8] hover:border-[#064E3B]/40 hover:bg-[#F3E7D3] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#064E3B]/10 border border-[#064E3B]/20 flex items-center justify-center text-[#064E3B]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#4D6D62] font-mono-code">Email</p>
                    <p className="text-xs font-semibold text-[#064E3B] group-hover:text-[#043D2E] transition-colors">
                      shebinraju2021@gmail.com
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#4D6D62] group-hover:text-[#064E3B] transition-colors" />
              </a>

              {/* GitHub Profile Card */}
              <a
                href="https://github.com/modelmschief"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-[#FAF3E5] border border-[#DFCCA8] hover:border-[#064E3B]/40 hover:bg-[#F3E7D3] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#064E3B]/10 border border-[#064E3B]/20 flex items-center justify-center text-[#064E3B]">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#4D6D62] font-mono-code">GitHub</p>
                    <p className="text-xs font-semibold text-[#064E3B] group-hover:text-[#043D2E] transition-colors">
                      github.com/modelmschief
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#4D6D62] group-hover:text-[#064E3B] transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleFormSubmit}
              className="rounded-2xl bg-[#FFFDF8] border border-[#DFCCA8] p-6 sm:p-8 space-y-5 shadow-sm text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#DFCCA8]">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#064E3B]">
                    Send Message
                  </h3>
                  <p className="text-xs font-mono-code text-[#4D6D62] mt-0.5">
                    Select delivery destination
                  </p>
                </div>

                {/* Dispatch Mode Selector */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF3E5] border border-[#DFCCA8]">
                  <button
                    type="button"
                    onClick={() => setDispatchMethod('telegram')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                      dispatchMethod === 'telegram'
                        ? 'bg-[#064E3B] text-[#F8E7C9] font-semibold shadow-xs'
                        : 'text-[#26473D] hover:text-[#064E3B]'
                    }`}
                  >
                    Telegram
                  </button>
                  <button
                    type="button"
                    onClick={() => setDispatchMethod('email')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all cursor-pointer ${
                      dispatchMethod === 'email'
                        ? 'bg-[#064E3B] text-[#F8E7C9] font-semibold shadow-xs'
                        : 'text-[#26473D] hover:text-[#064E3B]'
                    }`}
                  >
                    Email
                  </button>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-code text-[#26473D] mb-1.5">
                    Your Name or Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF3E5] border border-[#DFCCA8] focus:border-[#064E3B] focus:bg-[#FFFDF8] text-sm text-[#064E3B] placeholder:text-[#4D6D62]/60 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-[#26473D] mb-1.5">
                    Your Contact Email / Handle
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com or @alex_tg"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF3E5] border border-[#DFCCA8] focus:border-[#064E3B] focus:bg-[#FFFDF8] text-sm text-[#064E3B] placeholder:text-[#4D6D62]/60 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-[#26473D] mb-1.5">
                    Project Scope / Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your backend requirement, RAG pipeline goals, or Web3 scope..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF3E5] border border-[#DFCCA8] focus:border-[#064E3B] focus:bg-[#FFFDF8] text-sm text-[#064E3B] placeholder:text-[#4D6D62]/60 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl font-mono-code text-sm font-semibold text-[#F8E7C9] bg-[#064E3B] hover:bg-[#043D2E] disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#F8E7C9] animate-spin" />
                    <span>Transmitting to Telegram...</span>
                  </>
                ) : submitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#F8E7C9]" />
                    <span>Transmitted to Shebin's Telegram!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#F8E7C9]" />
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
