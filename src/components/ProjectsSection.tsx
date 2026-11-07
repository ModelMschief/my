import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Layers, 
  Github, 
  X, 
  Bot,
  ArrowRight,
  ExternalLink,
  Workflow,
  Sparkles
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  featured?: boolean;
  featuredBadge?: string;
  shortDesc: string;
  fullDesc: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  architecture: {
    problem: string;
    solution: string;
    flow: string[];
  };
  links: {
    github?: string;
    live?: string;
    telegram?: string;
    bot?: string;
  };
}

const PROJECTS: Project[] = [
  {
    id: 'bsc-gateway',
    title: 'Multi-Chain Non-Custodial Payment Gateway (BSC & TON)',
    category: 'Blockchain & Cryptography',
    featured: true,
    featuredBadge: 'FLAGSHIP MULTI-CHAIN ARCHITECTURE',
    shortDesc: 'Fully non-custodial multi-chain payment infrastructure supporting Binance Smart Chain (BSC) and The Open Network (TON) with direct node communication and zero third-party intermediaries.',
    fullDesc: 'Architected a non-custodial multi-chain payment pipeline supporting both Binance Smart Chain (BSC) via raw JSON-RPC and The Open Network (TON) via TonLib and HTTP v2 clients. Users retain private key sovereignty while merchant applications receive on-chain confirmation webhooks.',
    metrics: [
      { label: 'Security Model', value: 'Non-Custodial' },
      { label: 'Supported Chains', value: 'BSC (EVM) + TON' },
      { label: 'Node Ingestion', value: 'Direct RPC / TonLib' },
    ],
    tags: ['BSC JSON-RPC', 'TON SDK', 'Node.js', 'Python', 'Express', 'MongoDB', 'Telegram API'],
    architecture: {
      problem: 'Traditional crypto gateways enforce custody, charge high fees, and introduce single points of failure via closed-source SaaS APIs.',
      solution: 'Direct multi-chain node subscription listening to BSC mempool block headers and TON shardchain block updates, verifying raw transaction inputs with zero counterparty risk.',
      flow: [
        'Client requests unique payment session for BSC (BEP-20) or TON',
        'Deterministic deposit address or payment memo generated',
        'Async background daemons monitor BSC mempool and TON shard transactions',
        'Automatic Telegram webhook and database state update on confirmation',
      ],
    },
    links: {
      github: 'https://github.com/ModelMschief/GateWays',
      telegram: 'https://t.me/gojo16s',
    },
  },
  {
    id: 'custom-rag',
    title: 'Modular RAG & Neural Vectorization Engine',
    category: 'AI & Neural Systems',
    shortDesc: 'Production-ready vectorization & Retrieval-Augmented Generation framework featuring hybrid keyword/vector search, re-ranking, and dynamic citation tracing.',
    fullDesc: 'A custom modular neural vectorization and RAG library built for high retrieval fidelity and minimal latency. Implements custom chunking strategies, dense embeddings, BM25 sparse index merging, cross-encoder neural re-ranking, and context compression before LLM generation.',
    metrics: [
      { label: 'Search Method', value: 'Hybrid Dense + BM25' },
      { label: 'Neural Re-Rank', value: 'Cross-Encoder' },
      { label: 'Vector Engine', value: 'ChromaDB / Pinecone' },
    ],
    tags: ['PyTorch', 'Vector Embeddings', 'ChromaDB', 'LangChain', 'FastAPI', 'Python'],
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
      github: 'https://github.com/ModelMschief/Mini-Project-Colab',
    },
  },
  {
    id: 'ton-crypto-lib',
    title: 'TON Blockchain Python SDK',
    category: 'Web3 & Decentralized Protocols',
    shortDesc: 'Developer-facing Python SDK for seamless TON transactions, address checksumming, and Telegram Mini App payment integrations.',
    fullDesc: 'Engineered a lightweight, async-first Python client library for TON (The Open Network). Eliminates massive dependency overhead while offering typed helpers for TonConnect payload generation and Bag-of-Cells (BOC) deserialization.',
    metrics: [
      { label: 'Architecture', value: 'Pure Asyncio' },
      { label: 'Target Runtime', value: 'Telegram Mini Apps' },
      { label: 'Serialization', value: 'Bag-of-Cells (BOC)' },
    ],
    tags: ['Python 3.11', 'TON Network', 'BOC Serialization', 'Asyncio', 'API'],
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
      github: 'https://github.com/ModelMschief/Ton-Crypto-Lib',
    },
  },
  {
    id: 'api-platform',
    title: 'Multi-Provider API Gateway Platform',
    category: 'Backend & Cloud Systems',
    shortDesc: 'Multi-server API gateway prototype hosting 5+ specialized microservices with image detection & neural model inference nodes, vector lookup, and Redis caching.',
    fullDesc: 'Designed a distributed microservice topology where a FastAPI gateway routes incoming client traffic, enforces rate limiting via Redis token buckets, and dispatches compute-heavy neural network models and visual inference tasks to dedicated Flask worker nodes.',
    metrics: [
      { label: 'Worker Pool', value: 'Decoupled ML Flask' },
      { label: 'Rate Limiter', value: 'Redis Token Bucket' },
      { label: 'Core Gateway', value: 'Asynchronous FastAPI' },
    ],
    tags: ['FastAPI', 'PyTorch / OpenCV', 'Flask', 'Redis', 'Docker', 'Neural Inference'],
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
      live: 'https://botfusion.kesug.com/',
      github: 'https://github.com/ModelMschief/reactbotfuse',
    },
  },
  {
    id: 'orchestra-ai',
    title: 'OrchestraAI — Developer AI Agent OS',
    category: 'Applied AI & Orchestration',
    shortDesc: 'An AI Operating System for developers—build production-ready AI agents with automated memory, knowledge, tools, and intelligent model routing.',
    fullDesc: 'A framework providing developer primitives for multi-agent autonomous orchestration. Features persistent session memory, dynamic tool execution, streaming LLM outputs, and automated prompt optimization.',
    metrics: [
      { label: 'Model Support', value: 'Multi-LLM Unified' },
      { label: 'Memory Engine', value: 'Episodic & Vector' },
      { label: 'Tool Execution', value: 'Sandboxed Runtime' },
    ],
    tags: ['Python', 'Agentic AI', 'Memory Systems', 'Tool Routing', 'FastAPI'],
    architecture: {
      problem: 'Building autonomous agents requires stitching fragmented libraries for memory, function execution, and state persistence.',
      solution: 'A unified single-runtime API providing long-term vector memory, automatic tool sandboxing, and reliable output schemas.',
      flow: [
        'Developer defines tools & memory retention window',
        'Agent intercepts prompt and fetches relevant historical vectors',
        'Executes required tool calls with sandboxed parameters',
        'Emits validated typed response payload to client',
      ],
    },
    links: {
      github: 'https://github.com/ModelMschief/OrchestraAI',
    },
  },
  {
    id: 'telegram-automation',
    title: 'Telegram Payment & Group Management Bot',
    category: 'Fintech & Community Management',
    shortDesc: 'Automated payment processing and membership lifecycle engine for Telegram groups, handling subscriber billing, access control, and real-time database state synchronization.',
    fullDesc: 'Production daemon engineered for Telegram communities, orchestrating automated member onboarding, payment verification, recurring subscription state, and automated kick/invite group management with zero dropped webhooks.',
    metrics: [
      { label: 'Core Engine', value: 'Telegram Bot API' },
      { label: 'Persistence', value: 'MongoDB ACID' },
      { label: 'Capabilities', value: 'Payments & Group Admin' },
    ],
    tags: ['Telegram Bot API', 'Payment Gateways', 'Group Management', 'Asyncio', 'MongoDB'],
    architecture: {
      problem: 'Managing high-traffic paid Telegram groups manually or with slow synchronous bots leads to dropped webhooks, missed payments, and delayed access grants.',
      solution: 'Decoupled asynchronous webhook receiver paired with atomic Motor MongoDB transactions and automated Telegram admin permission triggers.',
      flow: [
        'Telegram server pushes webhook payment/command payload',
        'Async daemon validates transaction signature and membership tier',
        'Atomic MongoDB record update with timestamped subscription expiry',
        'Automatic group invite link dispatch or scheduled access revocation',
      ],
    },
    links: {
      github: 'https://github.com/ModelMschief/premium',
      telegram: 'https://t.me/gojo16s',
      bot: 'https://t.me/AiGojoBot',
    },
  },
];

export const ProjectsSection = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Fade In */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#DFCCA8] text-xs font-mono-code text-[#064E3B] mb-4 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-[#064E3B]" />
            <span>FEATURED SHOWCASE</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#064E3B] tracking-tight">
            Production <span className="text-[#1B3B31]">Architectures</span>
          </h2>
          <p className="text-[#2D4E42] max-w-2xl mx-auto text-base sm:text-lg mt-3 font-normal">
            Engineered for decentralized blockchain execution, neural retrieval intelligence, and high-concurrency microservices.
          </p>
        </motion.div>

        {/* Alternating Left-Right-Left-Right Showcase */}
        <div className="space-y-20 sm:space-y-28">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={project.id}
                className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center"
              >
                {/* Visual Architectural Blueprint Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative rounded-3xl bg-[#FFFDF8] border border-[#DFCCA8] overflow-hidden shadow-sm hover:shadow-[0_16px_40px_rgba(6,78,59,0.08)] hover:border-[#064E3B]/60 group transition-all duration-300">
                    {/* Architectural Header Bar */}
                    <div className="flex items-center justify-between px-5 py-3.5 bg-[#FAF3E5] border-b border-[#DFCCA8]">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#064E3B] animate-pulse" />
                        <span className="text-xs font-mono-code text-[#064E3B] font-semibold tracking-wide uppercase flex items-center gap-1.5">
                          <Workflow className="w-3.5 h-3.5 text-[#064E3B]" />
                          System Topology &amp; Pipeline
                        </span>
                      </div>
                      <span className="text-[10px] font-mono-code px-2.5 py-0.5 rounded-full bg-[#064E3B]/10 text-[#064E3B] font-semibold border border-[#064E3B]/20">
                        VERIFIED ARCHITECTURE
                      </span>
                    </div>

                    {/* Architectural Pipeline Node Schematics */}
                    <div className="p-5 sm:p-6 space-y-2.5">
                      {project.architecture.flow.map((step, i) => (
                        <div 
                          key={i} 
                          className="relative flex items-start gap-3.5 p-3 rounded-xl bg-[#FAF3E5]/60 border border-[#E8D9BD] hover:border-[#064E3B]/40 hover:bg-[#FAF3E5] transition-all group/node"
                        >
                          <div className="w-6 h-6 rounded-lg bg-[#064E3B] text-[#F8E7C9] text-[10px] font-mono-code font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs group-hover/node:scale-105 transition-transform">
                            0{i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#1B3B31] font-medium leading-relaxed">
                              {step}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Architectural Telemetry Strip */}
                    <div className="grid grid-cols-3 gap-2 px-4 py-3 bg-[#FAF3E5] border-t border-[#DFCCA8] text-center">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="truncate">
                          <p className="text-xs font-bold text-[#064E3B] font-mono-code truncate">{m.value}</p>
                          <p className="text-[10px] text-[#4D6D62] font-mono-code truncate mt-0.5">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Narrative & Details Column */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  className={`lg:col-span-6 space-y-6 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {project.featured && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#064E3B] text-[#F8E7C9] text-[11px] font-mono-code font-bold tracking-wider uppercase shadow-xs">
                          <Sparkles className="w-3 h-3 text-[#F8E7C9]" />
                          <span>{project.featuredBadge || 'FEATURED ARCHITECTURE'}</span>
                        </span>
                      )}
                      <span className="text-xs font-mono-code text-[#064E3B] font-semibold uppercase tracking-wider px-3 py-1 rounded-md bg-[#064E3B]/10 border border-[#064E3B]/20 inline-block">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#064E3B]">
                      {project.title}
                    </h3>
                    <p className="text-base text-[#26473D] leading-relaxed font-normal">
                      {project.fullDesc}
                    </p>
                  </div>

                  {/* Architecture Highlights Box */}
                  <div className="p-4 rounded-xl bg-[#FFFDF8] border border-[#DFCCA8] shadow-2xs space-y-2">
                    <p className="text-xs font-mono-code text-[#4D6D62] uppercase font-semibold">
                      Core Architecture Solution
                    </p>
                    <p className="text-xs text-[#1B3B31] leading-relaxed font-normal">
                      {project.architecture.solution}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-[#FFFDF8] border border-[#DFCCA8] text-xs font-mono-code text-[#064E3B] shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium text-[#F8E7C9] bg-[#064E3B] hover:bg-[#043D2E] transition-all shadow-sm font-mono-code cursor-pointer"
                    >
                      <span>Architecture Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F8E7C9]" />
                    </button>

                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-[#064E3B] bg-[#FFFDF8] hover:bg-[#FAF3E5] border border-[#DFCCA8] hover:border-[#064E3B]/40 transition-all font-mono-code shadow-2xs"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-[#F8E7C9] bg-[#064E3B] hover:bg-[#043D2E] transition-all font-mono-code shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}

                    {project.links.bot && (
                      <a
                        href={project.links.bot}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#F8E7C9] bg-[#064E3B] hover:bg-[#043D2E] transition-all font-mono-code shadow-sm"
                      >
                        <Bot className="w-3.5 h-3.5 text-[#F8E7C9]" />
                        <span>Test Live Bot</span>
                      </a>
                    )}

                    {project.links.telegram && (
                      <a
                        href={project.links.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-[#064E3B] bg-[#FFFDF8] hover:bg-[#FAF3E5] border border-[#DFCCA8] hover:border-[#064E3B]/40 transition-all font-mono-code shadow-2xs"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span>Contact Dev</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture Deep-Dive Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-[#064E3B]/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative max-w-2xl w-full rounded-2xl bg-[#FFFDF8] border border-[#DFCCA8] p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6 text-left"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#DFCCA8]">
                <div>
                  <span className="text-xs font-mono-code text-[#064E3B] uppercase font-semibold">
                    Architecture Blueprint
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#064E3B] mt-1">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 rounded-lg bg-[#FAF3E5] text-[#064E3B] hover:bg-[#F0E5D0] border border-[#DFCCA8] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Problem vs Solution */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FDF6ED] border border-[#EAD5BE]">
                  <p className="text-xs font-mono-code text-[#8C3D2B] font-bold mb-1 uppercase">
                    Challenge &amp; Bottleneck
                  </p>
                  <p className="text-xs text-[#2D4E42] leading-relaxed font-normal">
                    {activeModalProject.architecture.problem}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#EAF3EE] border border-[#B7D8CD]">
                  <p className="text-xs font-mono-code text-[#064E3B] font-bold mb-1 uppercase">
                    Engineered Solution
                  </p>
                  <p className="text-xs text-[#1B3B31] leading-relaxed font-normal">
                    {activeModalProject.architecture.solution}
                  </p>
                </div>
              </div>

              {/* Data Flow Pipeline */}
              <div>
                <h4 className="text-xs font-mono-code text-[#4D6D62] uppercase mb-3 font-semibold">
                  Data Flow Pipeline
                </h4>
                <div className="space-y-2 font-mono-code text-xs">
                  {activeModalProject.architecture.flow.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-[#FAF3E5] border border-[#E8D9BD] text-[#1B3B31]"
                    >
                      <span className="text-[#064E3B] font-bold shrink-0">0{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DFCCA8]">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-xl bg-[#FAF3E5] hover:bg-[#F0E5D0] text-xs font-mono-code text-[#064E3B] border border-[#DFCCA8] transition-colors cursor-pointer"
                >
                  Close
                </button>
                {activeModalProject.links.github && (
                  <a
                    href={activeModalProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#064E3B] text-[#F8E7C9] hover:bg-[#043D2E] text-xs font-mono-code font-semibold transition-colors shadow-sm"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
                {activeModalProject.links.bot && (
                  <a
                    href={activeModalProject.links.bot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#064E3B] text-[#F8E7C9] hover:bg-[#043D2E] text-xs font-mono-code font-semibold transition-colors shadow-sm"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Test Live Bot</span>
                  </a>
                )}
                {activeModalProject.links.live && (
                  <a
                    href={activeModalProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#064E3B] text-[#F8E7C9] hover:bg-[#043D2E] text-xs font-mono-code font-semibold transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
