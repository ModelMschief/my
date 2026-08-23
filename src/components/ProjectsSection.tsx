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
  Bot,
  ArrowRight,
  Code2
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  consoleSnippet: {
    filename: string;
    code: string[];
  };
  architecture: {
    problem: string;
    solution: string;
    flow: string[];
  };
  links: {
    github?: string;
    telegram?: string;
  };
}

const PROJECTS: Project[] = [
  {
    id: 'bsc-gateway',
    title: 'BSC Non-Custodial Payment Gateway',
    category: 'Blockchain & Cryptography',
    shortDesc: 'High-throughput, non-custodial Binance Smart Chain payment infrastructure with direct node communication and zero third-party intermediaries.',
    fullDesc: 'Architected a zero-custody BSC payment pipeline directly querying BSC full nodes via raw JSON-RPC. Users retain 100% private key sovereignty while merchant applications receive instantaneous on-chain confirmation webhooks.',
    metrics: [
      { label: 'Security Model', value: '100% Non-Custodial' },
      { label: 'Intermediaries', value: '0 Third-Party APIs' },
      { label: 'Platform', value: 'Telegram Native' },
    ],
    tags: ['Python', 'BSC JSON-RPC', 'Web3.py', 'Telegram API', 'Asyncio'],
    consoleSnippet: {
      filename: 'bsc_gateway_engine.py',
      code: [
        '# Direct JSON-RPC Node Subscription',
        'async def listen_deposits(contract_address):',
        '    async with bsc_node_session() as node:',
        '        events = await node.get_transfer_logs(contract_address)',
        '        for tx in events:',
        '            if verify_signature(tx.hash) and tx.confirmed:',
        '                await dispatch_telegram_receipt(tx.recipient, tx.amount)',
      ],
    },
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
    shortDesc: 'Production-ready Retrieval-Augmented Generation framework featuring hybrid keyword/vector search, re-ranking, and dynamic citation tracing.',
    fullDesc: 'An enterprise RAG library built for high retrieval fidelity and minimal latency. Implements custom chunking strategies, dense embeddings, BM25 sparse index merging, and context compression before LLM generation.',
    metrics: [
      { label: 'Retrieval Speed', value: '< 40ms P95' },
      { label: 'Search Method', value: 'Hybrid Dense+BM25' },
      { label: 'LLM Support', value: 'Gemini / OpenAI' },
    ],
    tags: ['Python', 'ChromaDB', 'LangChain', 'FastAPI', 'Vector Search'],
    consoleSnippet: {
      filename: 'rag_hybrid_retriever.py',
      code: [
        '# Hybrid Dense + Sparse BM25 Fusion',
        'class HybridRetriever:',
        '    def query(self, text: str, top_k: int = 5):',
        '        dense_results = self.vector_store.similarity_search(text, k=10)',
        '        sparse_results = self.bm25_index.search(text, k=10)',
        '        ranked_docs = reciprocal_rank_fusion(dense_results, sparse_results)',
        '        return self.cross_encoder.rerank(ranked_docs)[:top_k]',
      ],
    },
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
    shortDesc: 'Developer-facing Python SDK for seamless TON transactions, address checksumming, and Telegram Mini App payment integrations.',
    fullDesc: 'Engineered a lightweight, async-first Python client library for TON (The Open Network). Eliminates massive dependency overhead while offering typed helpers for TonConnect payload generation and Bag-of-Cells (BOC) deserialization.',
    metrics: [
      { label: 'Architecture', value: 'Pure Async Python' },
      { label: 'Target', value: 'Telegram Mini Apps' },
      { label: 'Dependency Size', value: 'Minimal Overhead' },
    ],
    tags: ['Python 3.11', 'TON Network', 'BOC Serialization', 'Asyncio', 'API'],
    consoleSnippet: {
      filename: 'ton_wallet_client.py',
      code: [
        '# TON Async Payload Construction',
        'async def send_ton_transfer(dest_addr: str, nano_ton: int, memo: str):',
        '    boc_cell = Cell.create_transfer_payload(dest_addr, nano_ton, memo)',
        '    serialized = boc_cell.to_boc(has_crc32=True)',
        '    response = await ton_lite_client.broadcast_message(serialized)',
        '    return response.tx_hash',
      ],
    },
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
    shortDesc: 'Multi-server API gateway prototype hosting 5+ specialized microservices with Flask ML inference nodes and Redis in-memory caching.',
    fullDesc: 'Designed a distributed microservice topology where a FastAPI gateway routes incoming client traffic, enforces rate limiting via Redis token buckets, and dispatches compute-heavy machine learning tasks to dedicated Flask worker nodes.',
    metrics: [
      { label: 'Cache Latency', value: 'Sub-5ms' },
      { label: 'Rate Limiter', value: 'Redis Token Bucket' },
      { label: 'Topology', value: 'Multi-Server Nodes' },
    ],
    tags: ['FastAPI', 'Flask', 'Redis', 'Machine Learning', 'Docker'],
    consoleSnippet: {
      filename: 'api_gateway_router.py',
      code: [
        '# Redis Token Bucket & ML Proxying',
        '@app.post("/v1/predict/inference")',
        '@rate_limit(redis_client, max_requests=100, window_sec=60)',
        'async def dispatch_ml_inference(payload: PredictRequest):',
        '    cached_res = await redis_client.get(payload.cache_key)',
        '    if cached_res: return cached_res',
        '    return await ml_worker_pool.forward(payload)',
      ],
    },
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
];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-code text-slate-300 mb-4">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>FEATURED SHOWCASE</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Production <span className="text-slate-200">Architectures</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg mt-3 font-light">
            Engineered for zero-custody blockchain execution, sub-50ms AI retrieval, and scalable backend automation.
          </p>
        </motion.div>

        {/* Alternating Left-Right-Left-Right Showcase */}
        <div className="space-y-20 sm:space-y-28">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center"
              >
                {/* Visual / Code Console Column */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl group hover:border-white/20 transition-all duration-300">
                    {/* Console Header Bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                        <span className="text-xs font-mono-code text-slate-400 ml-2">
                          {project.consoleSnippet.filename}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono-code text-slate-500">PRODUCTION</span>
                    </div>

                    {/* Console Code Body */}
                    <div className="p-5 font-mono-code text-xs leading-relaxed text-slate-300 overflow-x-auto space-y-1">
                      {project.consoleSnippet.code.map((line, i) => (
                        <div key={i} className="flex">
                          <span className="text-slate-600 select-none w-6 shrink-0">{i + 1}</span>
                          <span className={`${line.startsWith('#') ? 'text-slate-500 italic' : line.includes('def ') || line.includes('class ') ? 'text-cyan-400 font-semibold' : 'text-slate-200'}`}>
                            {line}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Console Bottom Verification Metrics Bar */}
                    <div className="grid grid-cols-3 gap-2 px-4 py-3 bg-white/[0.02] border-t border-white/10 text-center">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="text-xs font-bold text-white font-mono-code truncate">{m.value}</p>
                          <p className="text-[10px] text-slate-400 font-mono-code truncate">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Narrative & Details Column */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono-code text-cyan-400 uppercase tracking-wider px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 inline-block">
                      {project.category}
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-base text-slate-300 leading-relaxed font-light">
                      {project.fullDesc}
                    </p>
                  </div>

                  {/* Architecture Highlights Pill Box */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <p className="text-xs font-mono-code text-slate-400 uppercase">
                      // Core Architecture Solution
                    </p>
                    <p className="text-xs text-slate-200 leading-relaxed font-light">
                      {project.architecture.solution}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono-code text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons (Clean & Professional) */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium text-black bg-white hover:bg-slate-200 transition-all shadow-sm font-mono-code"
                    >
                      <span>Architecture Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </button>

                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all font-mono-code"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {project.links.telegram && (
                      <a
                        href={project.links.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all font-mono-code"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span>Telegram Bot</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
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
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative max-w-2xl w-full rounded-2xl bg-slate-950 border border-white/15 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono-code text-cyan-400 uppercase">
                    // ARCHITECTURE BLUEPRINT
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mt-1">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white border border-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Problem vs Solution */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <p className="text-xs font-mono-code text-red-400 font-bold mb-1">
                    [THE BOTTLENECK]
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {activeModalProject.architecture.problem}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <p className="text-xs font-mono-code text-cyan-400 font-bold mb-1">
                    [THE ARCHITECTURE]
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {activeModalProject.architecture.solution}
                  </p>
                </div>
              </div>

              {/* Data Flow Pipeline */}
              <div>
                <h4 className="text-xs font-mono-code text-slate-400 uppercase mb-3">
                  // Data Flow Pipeline
                </h4>
                <div className="space-y-2 font-mono-code text-xs">
                  {activeModalProject.architecture.flow.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300"
                    >
                      <span className="text-cyan-400 font-bold shrink-0">0{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono-code text-white transition-colors"
                >
                  Close
                </button>
                {activeModalProject.links.github && (
                  <a
                    href={activeModalProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-slate-200 text-xs font-mono-code font-semibold transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
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
