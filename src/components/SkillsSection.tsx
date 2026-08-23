import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Brain, 
  Cpu, 
  Layers, 
  Link2, 
  Database, 
  Bot, 
  Zap, 
  Server, 
  ShieldCheck, 
  CheckCircle2, 
  Code2 
} from 'lucide-react';

interface SkillItem {
  name: string;
  badge: string;
  desc: string;
  tagColor: string;
}

interface SkillCluster {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  borderGlow: string;
  gradientText: string;
  items: SkillItem[];
}

const SKILL_CLUSTERS: SkillCluster[] = [
  {
    id: 'ai-rag',
    title: 'AI & Neural Systems',
    subtitle: 'RAG Pipelines & LLM Orchestration',
    icon: Brain,
    color: 'from-purple-500/20 to-cyan-500/20',
    borderGlow: 'hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]',
    gradientText: 'text-gradient-violet',
    items: [
      {
        name: 'Custom RAG Architectures',
        badge: 'Core Specialty',
        desc: 'Hybrid retrieval pipelines combining dense vector embeddings with BM25 keyword search.',
        tagColor: 'bg-violet-950/60 text-violet-300 border-violet-500/30',
      },
      {
        name: 'LangChain & Agentic Workflows',
        badge: 'Production',
        desc: 'Autonomous multi-step agents with tool routing and long-term memory retrieval.',
        tagColor: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
      },
      {
        name: 'Vector Databases (Chroma/Pinecone)',
        badge: 'High-Scale',
        desc: 'Sub-40ms semantic similarity search and high-dimensional vector partitioning.',
        tagColor: 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30',
      },
      {
        name: 'Scikit-Learn & Predictive ML',
        badge: 'Analytics',
        desc: 'Feature engineering, regression models, classification pipelines, and data clustering.',
        tagColor: 'bg-purple-950/60 text-purple-300 border-purple-500/30',
      },
    ],
  },
  {
    id: 'backend-apis',
    title: 'High-Throughput Backend',
    subtitle: 'Scalable Async Architecture & APIs',
    icon: Server,
    color: 'from-cyan-500/20 to-blue-500/20',
    borderGlow: 'hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
    gradientText: 'text-gradient-cyan',
    items: [
      {
        name: 'Python (FastAPI & Flask)',
        badge: 'Expert',
        desc: 'Asynchronous microservices with auto OpenAPI specs, dependency injection, and Pydantic.',
        tagColor: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
      },
      {
        name: 'Node.js & Express / Bun',
        badge: 'Runtime',
        desc: 'High-concurrency event loops, worker threads, and streaming response endpoints.',
        tagColor: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
      },
      {
        name: 'RESTful Gateways & WebSockets',
        badge: 'Real-Time',
        desc: 'Bi-directional live feeds, low-overhead binary frames, and structured JSON-RPC.',
        tagColor: 'bg-blue-950/60 text-blue-300 border-blue-500/30',
      },
      {
        name: 'Async Workers & Task Queues',
        badge: 'Resilient',
        desc: 'Background job dispatching, failure recovery, and distributed worker orchestration.',
        tagColor: 'bg-teal-950/60 text-teal-300 border-teal-500/30',
      },
    ],
  },
  {
    id: 'blockchain-web3',
    title: 'Web3 & Decentralized Protocols',
    subtitle: 'Non-Custodial Infrastructure & Gateways',
    icon: Link2,
    color: 'from-amber-500/20 to-yellow-500/20',
    borderGlow: 'hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
    gradientText: 'text-gradient-gold',
    items: [
      {
        name: 'BSC (Binance Smart Chain)',
        badge: 'Direct Node',
        desc: 'Non-custodial payment processing via raw JSON-RPC node calls with zero middleman dependencies.',
        tagColor: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
      },
      {
        name: 'TON Blockchain Libraries',
        badge: 'Telegram Native',
        desc: 'Custom Python client libraries for frictionless TON transactions inside Telegram Mini Apps.',
        tagColor: 'bg-blue-950/60 text-blue-300 border-blue-500/30',
      },
      {
        name: 'Smart Contract Interaction',
        badge: 'EVM / TVM',
        desc: 'ABI encoding/decoding, event log listeners, gas optimization, and balance confirmations.',
        tagColor: 'bg-yellow-950/60 text-yellow-300 border-yellow-500/30',
      },
      {
        name: 'Telegram Bot API & Webhooks',
        badge: 'Automation',
        desc: 'Enterprise bots handling payment verifications, dynamic keyboard menus, and push alerts.',
        tagColor: 'bg-sky-950/60 text-sky-300 border-sky-500/30',
      },
    ],
  },
  {
    id: 'data-infra',
    title: 'Data Infrastructure & Cache',
    subtitle: 'Persistence, Caching & Vector Storage',
    icon: Database,
    color: 'from-emerald-500/20 to-teal-500/20',
    borderGlow: 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
    gradientText: 'text-gradient-cyan',
    items: [
      {
        name: 'Redis In-Memory & Pub/Sub',
        badge: 'Sub-5ms',
        desc: 'Distributed caching, session persistence, rate limiting, and real-time message broadcasting.',
        tagColor: 'bg-red-950/60 text-red-300 border-red-500/30',
      },
      {
        name: 'MongoDB Document Engine',
        badge: 'Aggregation',
        desc: 'Complex aggregation pipelines, multi-document ACID transactions, and indexed query routing.',
        tagColor: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
      },
      {
        name: 'PostgreSQL Relational DB',
        badge: 'ACID',
        desc: 'Normalized schema modeling, connection pooling, and pgvector extension integrations.',
        tagColor: 'bg-blue-950/60 text-blue-300 border-blue-500/30',
      },
      {
        name: 'Linux & Docker Deployments',
        badge: 'DevOps',
        desc: 'Containerized microservice packaging, systemd daemon setups, and reverse proxying.',
        tagColor: 'bg-slate-800 text-slate-200 border-slate-700',
      },
    ],
  },
];

const TECH_BADGES = [
  'Python', 'FastAPI', 'Node.js', 'Flask', 'LangChain', 'RAG Pipelines',
  'Vector DBs', 'BSC Network', 'TON Blockchain', 'Redis', 'MongoDB',
  'PostgreSQL', 'Telegram API', 'Docker', 'Linux', 'REST APIs', 'WebSockets', 'Scikit-Learn'
];

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredClusters = activeTab === 'all' 
    ? SKILL_CLUSTERS 
    : SKILL_CLUSTERS.filter(c => c.id === activeTab);

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-cyan-500/30 text-xs font-mono-code text-cyan-300 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Cpu className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL MATRIX</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical Capabilities & <span className="text-gradient-cyan">Stack</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg mt-3 font-light">
            Engineered for high throughput, sub-50ms AI retrieval, and zero-compromise cryptographic security.
          </p>

          {/* Interactive Domain Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'glass-card text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              // ALL DOMAINS
            </button>
            <button
              onClick={() => setActiveTab('ai-rag')}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all duration-200 ${
                activeTab === 'ai-rag'
                  ? 'bg-violet-500 text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                  : 'glass-card text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              // AI & RAG
            </button>
            <button
              onClick={() => setActiveTab('backend-apis')}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all duration-200 ${
                activeTab === 'backend-apis'
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'glass-card text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              // BACKEND & APIS
            </button>
            <button
              onClick={() => setActiveTab('blockchain-web3')}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all duration-200 ${
                activeTab === 'blockchain-web3'
                  ? 'bg-amber-500 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'glass-card text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              // BLOCKCHAIN & WEB3
            </button>
            <button
              onClick={() => setActiveTab('data-infra')}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all duration-200 ${
                activeTab === 'data-infra'
                  ? 'bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'glass-card text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              // DATABASES & CACHE
            </button>
          </div>
        </motion.div>

        {/* 4 Architectural Matrix Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredClusters.map((cluster, index) => {
            const Icon = cluster.icon;
            return (
              <motion.div
                key={cluster.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group rounded-2xl glass-card p-6 sm:p-8 border border-slate-800/90 ${cluster.borderGlow} transition-all duration-500 relative overflow-hidden`}
              >
                {/* Subtle top ambient beam */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${cluster.color}`} />

                {/* Card Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl glass-card border border-slate-700/80 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className={`font-display text-xl font-bold ${cluster.gradientText}`}>
                        {cluster.title}
                      </h3>
                      <p className="text-xs font-mono-code text-slate-400 mt-0.5">
                        {cluster.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Capability Items */}
                <div className="space-y-4">
                  {cluster.items.map((item) => (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-semibold text-slate-200 font-display flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          {item.name}
                        </span>
                        <span
                          className={`text-[10px] font-mono-code px-2 py-0.5 rounded-md border ${item.tagColor}`}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light pl-5">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Tech Constellation Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 pt-8 border-t border-slate-800/80 text-center"
        >
          <p className="text-xs font-mono-code text-slate-400 mb-4 tracking-wider uppercase">
            // Full Technology & Tooling Constellation
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {TECH_BADGES.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-lg glass-card border-slate-800 text-xs font-mono-code text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-cyan-950/20 transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
