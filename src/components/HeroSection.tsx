import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, Terminal, Cpu, ShieldCheck, Layers, Bot, Send } from 'lucide-react';

const ROLES = [
  'AI & RAG Pipeline Architect',
  'Non-Custodial Blockchain Engineer',
  'High-Throughput Backend Specialist',
  'Telegram Bot & Automation Engineer',
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
      className="min-h-screen relative flex items-center justify-center pt-28 pb-16 px-4 sm:px-6"
    >
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Glides in from the LEFT at 6s */}
          <motion.div
            initial={{ x: -140, opacity: 0 }}
            animate={isRevealed ? { x: 0, opacity: 1 } : { x: -140, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-code text-slate-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>AVAILABLE FOR AI & BLOCKCHAIN ARCHITECTURE</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Shebin T R
              </h1>
              <div className="h-9 flex items-center">
                <span className="text-xl sm:text-2xl font-mono-code text-cyan-400 mr-2">&gt;</span>
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl sm:text-2xl font-semibold font-display text-slate-200"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </div>
            </div>

            {/* Narrative Summary */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-light">
              Building high-concurrency backend infrastructures, custom{' '}
              <span className="text-white font-medium">RAG intelligence pipelines</span>, and{' '}
              <span className="text-white font-medium">non-custodial blockchain payment gateways</span> on BSC and TON.
            </p>

            {/* Clean Professional Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-black bg-white hover:bg-slate-200 transition-all duration-200 shadow-sm"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <Send className="w-4 h-4 text-slate-300" />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Minimal Metric Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white">
                  100%
                </p>
                <p className="text-xs text-slate-400 font-mono-code mt-0.5">Non-Custodial Web3</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white">
                  &lt;40ms
                </p>
                <p className="text-xs text-slate-400 font-mono-code mt-0.5">RAG Query Latency</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white">
                  20+
                </p>
                <p className="text-xs text-slate-400 font-mono-code mt-0.5">Deployments</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Glides in from the RIGHT at 6s */}
          <motion.div
            initial={{ x: 140, opacity: 0 }}
            animate={isRevealed ? { x: 0, opacity: 1 } : { x: 140, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-obsidian rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono-code text-slate-400">core_architecture.py</span>
                <span className="text-[11px] font-mono-code text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SYSTEM SYNCED
                </span>
              </div>

              {/* Clean Architectural Capabilities Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <p className="text-[11px] text-slate-400 font-mono-code">RAG Architecture</p>
                  <p className="text-xs font-semibold text-white">Hybrid Vector + BM25</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <p className="text-[11px] text-slate-400 font-mono-code">Blockchain Gateway</p>
                  <p className="text-xs font-semibold text-white">Direct BSC/TON Nodes</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <Layers className="w-4 h-4 text-violet-400" />
                  <p className="text-[11px] text-slate-400 font-mono-code">Cache & Messaging</p>
                  <p className="text-xs font-semibold text-white">Redis Pub/Sub & Memory</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <Bot className="w-4 h-4 text-amber-400" />
                  <p className="text-[11px] text-slate-400 font-mono-code">Telegram Automation</p>
                  <p className="text-xs font-semibold text-white">Async Webhook Daemons</p>
                </div>
              </div>

              {/* Stack Snippet */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono-code text-slate-300 space-y-1">
                <p className="text-slate-400">// Production Stack Matrix</p>
                <p className="text-slate-200"><span className="text-cyan-400">backend</span> = ["FastAPI", "Python", "Node.js"]</p>
                <p className="text-slate-200"><span className="text-violet-400">ai_infra</span> = ["ChromaDB", "LangChain", "RAG"]</p>
                <p className="text-slate-200"><span className="text-amber-400">web3</span> = ["BSC JSON-RPC", "TON SDK"]</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
