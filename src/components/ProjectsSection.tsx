import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Layers, 
  ExternalLink, 
  Github, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  X, 
  CheckCircle,
  Terminal,
  Bot
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  categoryTag: 'ai' | 'blockchain' | 'backend';
  shortDesc: string;
  fullDesc: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  gradient: string;
  borderGlow: string;
  architecture: {
    problem: string;
    solution: string;
    flow: string[];
  };
  links: {
    github?: string;
    telegram?: string;
    demo?: string;
  };
}

const PROJECTS: Project[] = [
  {
    id: 'bsc-gateway',
    title: 'BSC Non-Custodial Payment Gateway',
    category: 'Blockchain & Cryptography',
    categoryTag: 'blockchain',
    shortDesc: 'High-throughput, non-custodial Binance Smart Chain payment infrastructure with direct node communication and zero third-party intermediaries.',
    fullDesc: 'Architected a zero-custody BSC payment pipeline directly querying BSC full nodes via raw JSON-RPC. Users retain 100% private key sovereignty while merchant applications receive instantaneous on-chain confirmation webhooks.',
    metrics: [
      { label: 'Security Model', value: '100% Non-Custodial' },
      { label: 'Intermediaries', value: '0 Third-Party APIs' },
      { label: 'Platform', value: 'Telegram Native' },
    ],
    tags: ['Python', 'BSC JSON-RPC', 'Web3.py', 'Telegram API', 'Asyncio'],
    gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    borderGlow: 'hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
    architecture: {
      problem: 'Traditional crypto gateways enforce custody, charge hefty 1-3% fees, and introduce single points of failure via closed-source SaaS APIs.',
      solution: 'Direct RPC node subscription listening to pending block headers, verifying raw tx inputs, and confirming balance state with zero counterparty risk.',
      flow: [
        'Client requests unique payment session',
        'Deterministic deposit address generated via cryptographic derivation',
        'Async background daemon monitors BSC mempool & confirmed blocks',
        'Automatic Telegram webhook and database state update on confirmation',
      ],
    },
    links: {
      github: 'https://github.com/modelmsschief',
      telegram: 'https://t.me/gojo16s',
    },
  },
  {
    id: 'custom-rag',
    title: 'Custom Modular RAG Pipeline',
    category: 'AI & Machine Learning',
    categoryTag: 'ai',
    shortDesc: 'Production-ready Retrieval-Augmented Generation framework featuring hybrid keyword/vector search, re-ranking, and dynamic citation tracing.',
    fullDesc: 'An enterprise RAG library built for high retrieval fidelity and minimal latency. Implements custom chunking strategies, dense embeddings, BM25 sparse index merging, and context compression before LLM generation.',
    metrics: [
      { label: 'Retrieval Speed', value: '< 40ms P95' },
      { label: 'Search Method', value: 'Hybrid Dense+BM25' },
      { label: 'LLM Support', value: 'Gemini / OpenAI' },
    ],
    tags: ['Python', 'ChromaDB', 'LangChain', 'FastAPI', 'Vector Search'],
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    borderGlow: 'hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]',
    architecture: {
      problem: 'Vanilla RAG setups suffer from semantic hallucinations, slow multi-second retrieval times, and context token bloat.',
      solution: 'Multi-stage pipeline: Recursive character chunking -> Dense vector + BM25 sparse retrieval -> Cross-encoder re-ranking -> Citation generation.',
      flow: [
        'Document ingestion with metadata tagging & chunking',
        'Embedding generation stored in persistent vector collection',
        'Query semantic expansion and multi-index retrieval',
        'Contextual compression and prompt synthesis to LLM',
      ],
    },
    links: {
      github: 'https://github.com/modelmsschief',
    },
  },
  {
    id: 'ton-crypto-lib',
    title: 'TON Blockchain Python Library',
    category: 'Web3 & Decentralized Protocols',
    categoryTag: 'blockchain',
    shortDesc: 'Developer-facing Python SDK for seamless TON transactions, address checksumming, and Telegram Mini App payment integrations.',
    fullDesc: 'Engineered a lightweight, async-first Python client library for TON (The Open Network). Eliminates massive dependency overhead while offering typed helpers for TonConnect payload generation and Bag-of-Cells (BOC) deserialization.',
    metrics: [
      { label: 'Architecture', value: 'Pure Async Python' },
      { label: 'Target', value: 'Telegram Mini Apps' },
      { label: 'Dependency Size', value: 'Minimal Overhead' },
    ],
    tags: ['Python 3.11', 'TON Network', 'BOC Serialization', 'Asyncio', 'API'],
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    borderGlow: 'hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
    architecture: {
      problem: 'Existing TON tooling in Python was fragmented, poorly typed, or tied to bloated C-bindings.',
      solution: 'A clean, modern async library supporting TON HTTP API v2/v4, raw message serialization, and TonConnect signature verifications.',
      flow: [
        'App constructs transfer payload with memo & amount',
        'Library formats BOC structure with CRC32 checksum',
        'Broadcasts through TON lite servers with retry logic',
        'Emits structured transaction status receipts',
      ],
    },
    links: {
      github: 'https://github.com/modelmsschief',
    },
  },
  {
    id: 'api-platform',
    title: 'High-Concurrency Multi-Tenant API Gateway',
    category: 'Backend & Cloud Systems',
    categoryTag: 'backend',
    shortDesc: 'Multi-server API gateway prototype hosting 5+ specialized microservices with Flask ML inference nodes and Redis in-memory caching.',
    fullDesc: 'Designed a distributed microservice topology where a FastAPI gateway routes incoming client traffic, enforces rate limiting via Redis token buckets, and dispatches compute-heavy machine learning tasks to dedicated Flask worker nodes.',
    metrics: [
      { label: 'Cache Latency', value: 'Sub-5ms' },
      { label: 'Rate Limiter', value: 'Redis Token Bucket' },
      { label: 'Topology', value: 'Multi-Server Nodes' },
    ],
    tags: ['FastAPI', 'Flask', 'Redis', 'Machine Learning', 'Docker'],
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderGlow: 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
    architecture: {
      problem: 'Monolithic API backends bottleneck when serving compute-heavy ML inferences alongside low-latency CRUD requests.',
      solution: 'Split architecture: Fast non-blocking asynchronous gateway for auth/caching + decoupled horizontal Flask workers for ML inference.',
      flow: [
        'Incoming request validated with JWT & rate-limited via Redis',
        'Cache hit returns instantaneous cached response',
        'Cache miss dispatched asynchronously to ML worker cluster',
        'Result cached and returned with standard response headers',
      ],
    },
    links: {
      github: 'https://github.com/modelmsschief',
    },
  },
  {
    id: 'telegram-automation',
    title: 'Enterprise Telegram Automation & Bot Engine',
    category: 'Systems Automation',
    categoryTag: 'backend',
    shortDesc: 'Automated notification pipelines, MongoDB persistence layers, dynamic interactive keyboards, and payment state machines on Telegram.',
    fullDesc: 'End-to-end automation suite running on the Telegram Bot API. Integrates stateful conversational funnels, MongoDB aggregations, and webhook verification to handle thousands of automated user interactions.',
    metrics: [
      { label: 'Architecture', value: 'Async Webhook Daemon' },
      { label: 'Database', value: 'MongoDB Aggregations' },
      { label: 'Uptime', value: '99.9% Resilient' },
    ],
    tags: ['Python', 'Telegram Bot API', 'MongoDB', 'Redis', 'Webhooks'],
    gradient: 'from-sky-500/20 via-cyan-500/10 to-transparent',
    borderGlow: 'hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.25)]',
    architecture: {
      problem: 'Standard polling Telegram bots drop updates under load and suffer from race conditions in payment workflows.',
      solution: 'Webhook-driven architecture with idempotent event processing, distributed Redis locks, and ACID MongoDB session states.',
      flow: [
        'Telegram webhook dispatches encrypted update payload',
        'State machine resolves current user step and context',
        'MongoDB atomic transaction updates user balance or state',
        'Instantaneous rich response rendered to Telegram chat',
      ],
    },
    links: {
      github: 'https://github.com/modelmsschief',
      telegram: 'https://t.me/gojo16s',
    },
  },
];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ai' | 'blockchain' | 'backend'>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.categoryTag === selectedFilter);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-cyan-500/30 text-xs font-mono-code text-cyan-300 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Layers className="w-3.5 h-3.5" />
            <span>MISSION ARCHIVES</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient-cyan">Architectures</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg mt-3 font-light">
            Real-world systems engineered for non-custodial blockchain execution, sub-50ms RAG retrieval, and scalable backend automation.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: '// ALL PROJECTS' },
              { id: 'blockchain', label: '// BLOCKCHAIN & WEB3' },
              { id: 'ai', label: '// AI & RAG' },
              { id: 'backend', label: '// BACKEND & AUTOMATION' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all duration-200 ${
                  selectedFilter === tab.id
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'glass-card text-slate-300 hover:text-white hover:border-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group rounded-2xl glass-card border border-slate-800/90 ${project.borderGlow} transition-all duration-500 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden`}
            >
              {/* Subtle top ambient glow */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${project.gradient}`} />

              <div>
                {/* Top Row: Category & Blueprint Trigger */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-[11px] font-mono-code text-cyan-400 uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/20">
                    {project.category}
                  </span>
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono-code text-slate-400 group-hover:text-cyan-300 transition-colors"
                  >
                    <span>[BLUEPRINT]</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>

                {/* Title */}
                <h3 
                  onClick={() => setActiveModalProject(project)}
                  className="font-display text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors cursor-pointer mb-3"
                >
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                  {project.shortDesc}
                </p>

                {/* Architecture Metric Badges */}
                <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="text-xs font-bold text-white font-mono-code truncate">{m.value}</p>
                      <p className="text-[10px] text-slate-400 font-mono-code truncate">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-[11px] font-mono-code text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-semibold"
                  >
                    <span>VIEW ARCHITECTURE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                        title="GitHub Profile & Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.links.telegram && (
                      <a
                        href={project.links.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                        title="Telegram Integration"
                      >
                        <Bot className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Architecture Blueprint Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-2xl w-full rounded-2xl glass-card border border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono-code text-cyan-400 uppercase tracking-wider">
                    // ARCHITECTURE BLUEPRINT
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mt-1">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 rounded-lg bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="mt-6 space-y-6">
                {/* Full Description */}
                <div>
                  <h4 className="text-xs font-mono-code text-slate-400 uppercase mb-2">
                    // Overview & Technical Scope
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed font-light">
                    {activeModalProject.fullDesc}
                  </p>
                </div>

                {/* Problem vs Solution */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
                    <p className="text-xs font-mono-code text-red-400 font-bold mb-1">
                      [THE BOTTLENECK]
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeModalProject.architecture.problem}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                    <p className="text-xs font-mono-code text-cyan-400 font-bold mb-1">
                      [THE ARCHITECTURE]
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeModalProject.architecture.solution}
                    </p>
                  </div>
                </div>

                {/* Data Flow Execution Steps */}
                <div>
                  <h4 className="text-xs font-mono-code text-slate-400 uppercase mb-3">
                    // Data Flow Pipeline
                  </h4>
                  <div className="space-y-2 font-mono-code text-xs">
                    {activeModalProject.architecture.flow.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-slate-300"
                      >
                        <span className="text-cyan-400 font-bold shrink-0">
                          0{idx + 1}.
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="p-4 rounded-xl glass-card border border-slate-800">
                  <h4 className="text-xs font-mono-code text-slate-400 uppercase mb-3">
                    // Key Engineering Verification
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {activeModalProject.metrics.map((m) => (
                      <div key={m.label} className="text-center p-2 rounded-lg bg-black/40">
                        <p className="text-sm font-bold text-cyan-300 font-mono-code">{m.value}</p>
                        <p className="text-[10px] text-slate-400 font-mono-code mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  {activeModalProject.links.github && (
                    <a
                      href={activeModalProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card hover:bg-slate-800 text-xs font-mono-code text-white border-slate-700"
                    >
                      <Github className="w-4 h-4" />
                      <span>GITHUB PROFILE</span>
                    </a>
                  )}
                  {activeModalProject.links.telegram && (
                    <a
                      href={activeModalProject.links.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-xs font-mono-code font-bold text-white shadow-lg shadow-cyan-500/20"
                    >
                      <Bot className="w-4 h-4" />
                      <span>DISPATCH VIA TELEGRAM</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
