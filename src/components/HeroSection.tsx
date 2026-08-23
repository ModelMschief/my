import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, Terminal, Cpu, ShieldCheck, Sparkles, Activity, Layers } from 'lucide-react';

const ROLES = [
  'AI & RAG Pipeline Architect',
  'Non-Custodial Blockchain Engineer',
  'High-Throughput Backend Specialist',
  'Telegram Automation & Bot Engineer',
];

const GLYPHS = '01#$@%&*<>_+=/{}[]~!';

export const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [scrambledName, setScrambledName] = useState('SHEBIN T R');
  const [isScrambling, setIsScrambling] = useState(false);

  // Scramble / Decryption text effect
  const triggerScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    const target = 'SHEBIN T R';
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambledName(
        target
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return target[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );
      if (iteration >= target.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      iteration += 1 / 2;
    }, 40);
  };

  useEffect(() => {
    triggerScramble();
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(roleTimer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Hero Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Beacon Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-cyan-500/30 text-xs font-mono-code text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <span>QUANTUM SINGULARITY ARCHITECTURE</span>
              </div>
            </motion.div>

            {/* Name with Interactive Decryption */}
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-sm font-mono-code text-slate-400 tracking-wider">
                // SYSTEM ARCHITECT & DEVELOPER
              </p>
              <h1
                onMouseEnter={triggerScramble}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white cursor-pointer select-none"
              >
                <span className="text-gradient-cyan drop-shadow-sm">{scrambledName}</span>
              </h1>
            </motion.div>

            {/* Animated Role Carousel */}
            <motion.div variants={itemVariants} className="h-10 flex items-center">
              <span className="text-xl sm:text-2xl font-mono-code text-slate-400 mr-2">&gt;</span>
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.4 }}
                className="text-xl sm:text-2xl font-semibold font-display text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </motion.div>

            {/* Bio Narrative */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-light"
            >
              Architecting high-concurrency backend infrastructures, custom{' '}
              <span className="text-cyan-300 font-medium">RAG retrieval pipelines</span>, and zero-compromise{' '}
              <span className="text-violet-300 font-medium">non-custodial blockchain payment gateways</span> on BSC & TON.
            </motion.p>

            {/* High-Impact CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold font-mono-code text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] transition-all duration-300"
              >
                <span>EXPLORE ARCHITECTURES</span>
                <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold font-mono-code text-slate-200 glass-card hover:bg-slate-800/60 hover:text-white border-slate-700/80 hover:border-cyan-500/50 transition-all duration-300"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>TELEGRAM BOT DISPATCH</span>
              </a>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              variants={itemVariants}
              className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-800/80 max-w-lg"
            >
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white text-gradient-cyan">
                  100%
                </p>
                <p className="text-[11px] font-mono-code text-slate-400 mt-0.5">Non-Custodial Web3</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white text-gradient-violet">
                  &lt;50ms
                </p>
                <p className="text-[11px] font-mono-code text-slate-400 mt-0.5">RAG Query Latency</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white text-gradient-gold">
                  20+
                </p>
                <p className="text-[11px] font-mono-code text-slate-400 mt-0.5">Production Deployments</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Live Cyber Telemetry Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl glass-card border border-cyan-500/30 p-6 shadow-2xl shadow-cyan-950/40 overflow-hidden group hover:border-cyan-400/60 transition-all duration-500">
              {/* Top Bar Indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono-code text-slate-400 ml-2">node_telemetry.py</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono-code text-cyan-400">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>SYNCED</span>
                </div>
              </div>

              {/* Code Snippet & Live Stats */}
              <div className="mt-4 space-y-3 font-mono-code text-xs">
                <div className="p-3 rounded-xl bg-black/50 border border-slate-800 space-y-1.5 text-slate-300">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>// Active Runtime Context</span>
                    <span className="text-emerald-400">STATUS 200 OK</span>
                  </div>
                  <p className="text-cyan-300">
                    <span className="text-violet-400">engine</span> = FastAPIRuntime(async_workers=8)
                  </p>
                  <p className="text-slate-300">
                    <span className="text-violet-400">rag_layer</span> = VectorRetriever(top_k=5, latency="38ms")
                  </p>
                  <p className="text-slate-300">
                    <span className="text-violet-400">bsc_node</span> = NonCustodialGateway(direct_rpc=True)
                  </p>
                </div>

                {/* Live System Nodes */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400">RAG Vector Speed</p>
                      <p className="font-semibold text-slate-100 text-xs">Sub-40ms</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400">Blockchain Trust</p>
                      <p className="font-semibold text-slate-100 text-xs">100% Non-Custodial</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-violet-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400">In-Memory Cache</p>
                      <p className="font-semibold text-slate-100 text-xs">Redis Cluster</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400">Telegram Bot API</p>
                      <p className="font-semibold text-slate-100 text-xs">Webhook Daemon</p>
                    </div>
                  </div>
                </div>

                {/* Availability Beacon */}
                <div className="mt-2 p-2.5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-violet-950/20 to-transparent border border-cyan-500/20 flex items-center justify-between">
                  <span className="text-[11px] text-slate-300">Ready for High-Scale Roles</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                    AVAILABLE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
