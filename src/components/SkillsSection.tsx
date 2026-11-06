import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Brain, 
  Cpu, 
  Link2, 
  Server, 
  Cloud,
  Bot,
  Zap,
  Radio,
  Smartphone,
  Activity,
  Send,
  Layers,
  Database,
  Terminal,
  Eye,
  Network,
  LucideIcon
} from 'lucide-react';

interface BentoSkillCard {
  id: string;
  clusterId: string;
  category: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  tags: string[];
  highlightMetric: string;
}

const BENTO_SKILLS: BentoSkillCard[] = [
  // AI, Vision & Neural Systems
  {
    id: 'cv-yolo',
    clusterId: 'ai-rag',
    category: 'Computer Vision',
    title: 'Object Detection & Custom CNNs',
    desc: 'Training custom YOLO architectures, CNN feature extractors, dataset annotation pipelines, and real-time inference with OpenCV.',
    icon: Eye,
    tags: ['PyTorch', 'OpenCV', 'YOLO'],
    highlightMetric: 'Visual Inference',
  },
  {
    id: 'vector-rag',
    clusterId: 'ai-rag',
    category: 'Neural Search',
    title: 'High-Dim Vectorization & RAG',
    desc: 'Multi-modal embeddings, ChromaDB indexing, and BM25 hybrid fusion with cross-encoder re-ranking for sub-second retrieval.',
    icon: Network,
    tags: ['ChromaDB', 'Pinecone', 'LangChain'],
    highlightMetric: 'Dense + BM25',
  },
  {
    id: 'neural-nets',
    clusterId: 'ai-rag',
    category: 'Deep Learning',
    title: 'Neural Topologies & Training',
    desc: 'Designing feedforward, convolutional, and deep NN topologies with custom loss functions and backpropagation optimization.',
    icon: Brain,
    tags: ['PyTorch', 'Backprop', 'Tensors'],
    highlightMetric: 'Deep Learning',
  },
  {
    id: 'agent-os',
    clusterId: 'ai-rag',
    category: 'Agentic Systems',
    title: 'Autonomous AI Agent OS',
    desc: 'Multi-step autonomous execution runtimes, dual-tier episodic/vector memory, and structured schema validation via Pydantic.',
    icon: Bot,
    tags: ['Agent Runtimes', 'Tool Sandboxing', 'Memory'],
    highlightMetric: 'Autonomous AI',
  },

  // High-Throughput Backend & Concurrency
  {
    id: 'fastapi-backend',
    clusterId: 'backend-apis',
    category: 'Async Backend',
    title: 'Asynchronous Python (FastAPI)',
    desc: 'Non-blocking async microservices with automated OpenAPI schemas, dependency injection, and Pydantic validation.',
    icon: Server,
    tags: ['FastAPI', 'Asyncio', 'Pydantic'],
    highlightMetric: 'Non-Blocking',
  },
  {
    id: 'go-microservices',
    clusterId: 'backend-apis',
    category: 'Compiled Concurrency',
    title: 'Go (Golang) Microservices',
    desc: 'Ultra-fast concurrent routines, channel communication, structured logging, and compiled low-latency network microservices.',
    icon: Zap,
    tags: ['Golang', 'Goroutines', 'Channels'],
    highlightMetric: 'High Concurrency',
  },
  {
    id: 'realtime-gateways',
    clusterId: 'backend-apis',
    category: 'Real-Time Protocols',
    title: 'REST Gateways & WebSockets',
    desc: 'Full-duplex real-time communication feeds, low-overhead binary frames, and structured JSON-RPC over TCP/HTTP.',
    icon: Radio,
    tags: ['WebSockets', 'JSON-RPC', 'REST APIs'],
    highlightMetric: 'Full-Duplex',
  },

  // Web3 & Non-Custodial Infrastructure
  {
    id: 'multichain-gateway',
    clusterId: 'blockchain-web3',
    category: 'Web3 Infrastructure',
    title: 'BSC & TON Payment Gateways',
    desc: 'Non-custodial payment processing connecting directly to BSC mempool block headers and TON shardchain block updates.',
    icon: Link2,
    tags: ['BSC EVM', 'TON SDK', 'Non-Custodial'],
    highlightMetric: 'Zero Custody',
  },
  {
    id: 'ton-sdk',
    clusterId: 'blockchain-web3',
    category: 'Telegram Native',
    title: 'TON Blockchain Python SDK',
    desc: 'Pure-Python async library implementing Bag-of-Cells (BOC) cell tree serialization and TonConnect integrations.',
    icon: Smartphone,
    tags: ['TonConnect', 'BOC Parsing', 'Python 3.11'],
    highlightMetric: 'Pure Async',
  },
  {
    id: 'node-rpc',
    clusterId: 'blockchain-web3',
    category: 'Node Architecture',
    title: 'Direct Node & RPC Ingestion',
    desc: 'Direct node queries and raw JSON-RPC listeners, eliminating third-party API dependencies and single points of failure.',
    icon: Activity,
    tags: ['Raw RPC', 'Mempool', 'TonLib'],
    highlightMetric: 'Direct RPC',
  },
  {
    id: 'telegram-automation',
    clusterId: 'blockchain-web3',
    category: 'Event Daemons',
    title: 'Telegram Bot API Daemons',
    desc: 'Event-driven daemons with Motor async MongoDB drivers for automated payment verification, group admin, and alerts.',
    icon: Send,
    tags: ['Telegram API', 'Motor', 'Webhooks'],
    highlightMetric: 'Event Driven',
  },

  // Data, Cloud & DevOps
  {
    id: 'redis-cache',
    clusterId: 'data-infra',
    category: 'In-Memory Systems',
    title: 'Redis In-Memory & Pub/Sub',
    desc: 'Distributed caching layers, token bucket rate limiters, session persistence, and real-time message broadcasting.',
    icon: Layers,
    tags: ['Redis', 'Token Bucket', 'Pub/Sub'],
    highlightMetric: 'In-Memory Store',
  },
  {
    id: 'databases-acid',
    clusterId: 'data-infra',
    category: 'Data Persistence',
    title: 'MongoDB & PostgreSQL',
    desc: 'Complex aggregation pipelines, multi-document ACID transactions, indexing strategies, and relational schema modeling.',
    icon: Database,
    tags: ['MongoDB', 'PostgreSQL', 'ACID'],
    highlightMetric: 'Dual Engine',
  },
  {
    id: 'docker-cloud',
    clusterId: 'data-infra',
    category: 'Cloud Infrastructure',
    title: 'Docker & GCP Cloud Run',
    desc: 'Multi-stage container packaging, serverless container compute, artifact registries, and automated CI/CD pipelines.',
    icon: Cloud,
    tags: ['Docker', 'Google Cloud', 'CI/CD'],
    highlightMetric: 'Serverless Compute',
  },
  {
    id: 'linux-daemons',
    clusterId: 'data-infra',
    category: 'Systems Engineering',
    title: 'Linux & systemd Daemons',
    desc: 'Production server administration, POSIX shell scripting, systemd service units, reverse proxies, and log management.',
    icon: Terminal,
    tags: ['Linux', 'systemd', 'Bash Scripting'],
    highlightMetric: 'Unix Daemons',
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'ai-rag', label: 'Vision, NN & AI' },
  { id: 'backend-apis', label: 'Backend & Concurrency' },
  { id: 'blockchain-web3', label: 'Web3 & Node Gateways' },
  { id: 'data-infra', label: 'Cloud & In-Memory' },
];

const TECH_BADGES = [
  'PyTorch', 'OpenCV', 'Computer Vision', 'Image Detection', 'Neural Networks', 'Vectorization',
  'Python', 'Go', 'FastAPI', 'Flask', 'Node.js', 'Express', 'React', 'JavaScript',
  'PostgreSQL', 'MongoDB', 'Redis', 'SQL', 'Linux', 'Docker', 'Google Cloud',
  'AWS', 'Azure', 'RAG Systems', 'LLM Integration', 'Machine Learning', 'BSC Blockchain',
  'TON Blockchain', 'Telegram API', 'R', 'Git', 'GitHub'
];

// Staggered sine-wave floating configurations for independent Zero-G suspension
const FLOAT_DELAYS = [0, 0.4, 0.8, 1.2, 1.6, 2.0, 0.3, 0.7, 1.1, 1.5, 1.9, 0.5, 0.9, 1.3, 1.7];
const FLOAT_DURATIONS = [4.2, 4.8, 5.2, 4.5, 5.0, 4.6, 4.4, 5.1, 4.7, 4.9, 5.3, 4.3, 4.7, 5.0, 4.6];

export const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredCards = activeTab === 'all' 
    ? BENTO_SKILLS 
    : BENTO_SKILLS.filter(card => card.clusterId === activeTab);

  return (
    <section id="skills" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Fade In */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#DFCCA8] text-xs font-mono-code text-[#064E3B] mb-4 shadow-2xs">
            <Cpu className="w-3.5 h-3.5 text-[#064E3B]" />
            <span>ENGINEERING SUPERPOWERS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#064E3B] tracking-tight">
            Technical Capabilities
          </h2>
          <p className="text-[#26473D] max-w-2xl mx-auto text-base sm:text-lg mt-3 font-normal">
            Deconstructed micro-architectures engineered for neural retrieval, concurrent execution, and zero-compromise security.
          </p>

          {/* Smooth Sliding Domain Filter Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="relative inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-[#FFFDF8] border border-[#DFCCA8] shadow-sm">
              {FILTER_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-mono-code transition-colors duration-200 cursor-pointer ${
                      isActive ? 'text-[#F8E7C9] font-semibold' : 'text-[#26473D] hover:text-[#064E3B]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSkillTab"
                        className="absolute inset-0 bg-[#064E3B] rounded-xl shadow-xs"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Magnetic Zero-G Bento Grid (Floating Micro-Cards) */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, index) => {
              const Icon = card.icon;
              const floatDelay = FLOAT_DELAYS[index % FLOAT_DELAYS.length];
              const floatDuration = FLOAT_DURATIONS[index % FLOAT_DURATIONS.length];

              return (
                <motion.div
                  layout
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -5, 0],
                  }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{
                    y: {
                      duration: floatDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: floatDelay,
                    },
                    layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.25 },
                    scale: { duration: 0.25 },
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative rounded-2xl bg-[#FFFDF8] border border-[#DFCCA8] hover:border-[#064E3B]/70 p-5 flex flex-col justify-between transition-colors duration-200 group shadow-sm hover:shadow-[0_16px_36px_rgba(6,78,59,0.12)] cursor-default"
                >
                  {/* Subtle Top Telemetry Strip */}
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DFCCA8]/60">
                      <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#4D6D62] font-medium">
                        {card.category}
                      </span>
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-[#FAF3E5] border border-[#DFCCA8] text-[#064E3B] font-semibold">
                        {card.highlightMetric}
                      </span>
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-start gap-3 mb-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#064E3B] text-[#F8E7C9] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                        <Icon className="w-4 h-4 text-[#F8E7C9]" />
                      </div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#064E3B] leading-snug">
                        {card.title}
                      </h3>
                    </div>

                    {/* Punchy Description */}
                    <p className="text-xs text-[#26473D] leading-relaxed font-normal mb-4">
                      {card.desc}
                    </p>
                  </div>

                  {/* Micro Tech Tags Ribbon */}
                  <div className="pt-3 border-t border-[#DFCCA8]/60 flex items-center gap-1.5 flex-wrap">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[#FAF3E5] border border-[#DFCCA8] text-[10px] font-mono-code text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-[#F8E7C9] group-hover:border-[#064E3B] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Global Tech Constellation Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 pt-8 border-t border-[#DFCCA8] text-center"
        >
          <p className="text-xs font-mono-code text-[#4D6D62] mb-4 tracking-wider uppercase">
            Full Technology &amp; Tooling Constellation (Synced with GitHub Profile)
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {TECH_BADGES.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-xl bg-[#FFFDF8] border border-[#DFCCA8] text-xs font-mono-code text-[#064E3B] hover:text-[#F8E7C9] hover:bg-[#064E3B] hover:border-[#064E3B] transition-all duration-200 cursor-default shadow-2xs"
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
