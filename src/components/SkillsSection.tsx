import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Brain, 
  Cpu, 
  Link2, 
  Database, 
  Server, 
  Cloud,
  CheckCircle2 
} from 'lucide-react';

interface SkillItem {
  name: string;
  badge: string;
  desc: string;
}

interface SkillCluster {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  items: SkillItem[];
}

const SKILL_CLUSTERS: SkillCluster[] = [
  {
    id: 'ai-rag',
    title: 'AI & Neural Systems',
    subtitle: 'RAG Pipelines & Autonomous Agents',
    icon: Brain,
    items: [
      {
        name: 'Custom RAG Architectures',
        badge: 'Specialty',
        desc: 'Hybrid retrieval pipelines combining dense vector embeddings with BM25 keyword search.',
      },
      {
        name: 'Agentic AI & Tool Routing',
        badge: 'Orchestration',
        desc: 'Autonomous multi-step agents with tool routing and long-term memory retrieval.',
      },
      {
        name: 'Vector Databases (Chroma/Pinecone)',
        badge: 'High-Scale',
        desc: 'Sub-40ms semantic similarity search and high-dimensional vector partitioning.',
      },
      {
        name: 'Scikit-Learn & Predictive ML',
        badge: 'Analytics',
        desc: 'Feature engineering, regression models, classification pipelines, and data clustering.',
      },
    ],
  },
  {
    id: 'backend-apis',
    title: 'High-Throughput Backend',
    subtitle: 'Scalable Async Architecture & APIs',
    icon: Server,
    items: [
      {
        name: 'Python (FastAPI & Flask)',
        badge: 'Expert',
        desc: 'Asynchronous microservices with auto OpenAPI specs, dependency injection, and Pydantic.',
      },
      {
        name: 'Go (Golang)',
        badge: 'High-Concurrency',
        desc: 'Ultra-fast concurrent routines, channel communication, and compiled low-latency microservices.',
      },
      {
        name: 'Node.js & Express',
        badge: 'Runtime',
        desc: 'High-concurrency event loops, worker threads, and streaming response endpoints.',
      },
      {
        name: 'RESTful Gateways & WebSockets',
        badge: 'Real-Time',
        desc: 'Bi-directional live feeds, low-overhead binary frames, and structured JSON-RPC.',
      },
    ],
  },
  {
    id: 'blockchain-web3',
    title: 'Web3 & Decentralized Protocols',
    subtitle: 'Non-Custodial Infrastructure & Gateways',
    icon: Link2,
    items: [
      {
        name: 'BSC (Binance Smart Chain)',
        badge: 'Direct Node',
        desc: 'Non-custodial payment processing via raw JSON-RPC node calls with zero middleman dependencies.',
      },
      {
        name: 'TON Blockchain SDKs',
        badge: 'Telegram Native',
        desc: 'Custom Python client libraries for frictionless TON transactions inside Telegram Mini Apps.',
      },
      {
        name: 'Smart Contract Interaction',
        badge: 'EVM / TVM',
        desc: 'ABI encoding/decoding, event log listeners, gas optimization, and balance confirmations.',
      },
      {
        name: 'Telegram Bot API & Webhooks',
        badge: 'Automation',
        desc: 'Enterprise bots handling payment verifications, dynamic keyboard menus, and push alerts.',
      },
    ],
  },
  {
    id: 'data-infra',
    title: 'Data, Cloud & DevOps',
    subtitle: 'Persistence, Caching & Cloud Platforms',
    icon: Cloud,
    items: [
      {
        name: 'Redis In-Memory & Pub/Sub',
        badge: 'Sub-5ms',
        desc: 'Distributed caching, session persistence, rate limiting, and real-time message broadcasting.',
      },
      {
        name: 'MongoDB & PostgreSQL',
        badge: 'ACID / NoSQL',
        desc: 'Complex aggregation pipelines, multi-document transactions, and relational modeling.',
      },
      {
        name: 'Cloud Platforms (GCP, AWS, Azure)',
        badge: 'Cloud Infra',
        desc: 'Serverless functions, container compute, object storage, and cloud deployment pipelines.',
      },
      {
        name: 'Docker & Linux Environments',
        badge: 'DevOps',
        desc: 'Containerized packaging, systemd daemons, networking, and reverse proxying.',
      },
    ],
  },
];

const TECH_BADGES = [
  'Python', 'Go', 'FastAPI', 'Flask', 'Node.js', 'Express', 'React', 'JavaScript',
  'PostgreSQL', 'MongoDB', 'Redis', 'SQL', 'Linux', 'Docker', 'Google Cloud',
  'AWS', 'Azure', 'RAG Systems', 'LLM Integration', 'Machine Learning', 'BSC Blockchain',
  'TON Blockchain', 'Telegram API', 'R', 'Git', 'GitHub'
];

export const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredClusters = activeTab === 'all' 
    ? SKILL_CLUSTERS 
    : SKILL_CLUSTERS.filter(c => c.id === activeTab);

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
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
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENGINEERING STACK</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical Capabilities
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg mt-3 font-light">
            Engineered for high throughput, sub-50ms AI retrieval, and zero-compromise cryptographic security.
          </p>

          {/* Clean Domain Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Domains' },
              { id: 'ai-rag', label: 'AI & RAG' },
              { id: 'backend-apis', label: 'Backend & APIs' },
              { id: 'blockchain-web3', label: 'Blockchain & Web3' },
              { id: 'data-infra', label: 'Cloud & Databases' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 4 Architecture Grid Cards with Scroll-Driven Left/Right Slide */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {filteredClusters.map((cluster, index) => {
            const Icon = cluster.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={cluster.id}
                initial={{ opacity: 0, x: isLeft ? -85 : 85 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl glass-obsidian p-6 sm:p-8 transition-all duration-300 overflow-hidden group shadow-2xl"
              >
                {/* Subtle top ambient edge line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                {/* Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {cluster.title}
                    </h3>
                    <p className="text-xs font-mono-code text-slate-400 mt-0.5">
                      {cluster.subtitle}
                    </p>
                  </div>
                </div>

                {/* Capability Items */}
                <div className="space-y-3">
                  {cluster.items.map((item) => (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-xl bg-black/30 border border-white/5 hover:border-white/15 hover:bg-black/50 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-semibold text-slate-200 font-display flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          {item.name}
                        </span>
                        <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-xs font-mono-code text-slate-400 mb-4 tracking-wider uppercase">
            // Full Technology & Tooling Constellation (Synced with GitHub Profile)
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {TECH_BADGES.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono-code text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-200 cursor-default"
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
