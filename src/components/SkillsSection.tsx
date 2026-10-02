import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Brain, 
  Cpu, 
  Link2, 
  Server, 
  Cloud,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';

interface SkillItem {
  name: string;
  badge: string;
  desc: string;
}

interface SkillCluster {
  id: string;
  index: string;
  code: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  metric: {
    label: string;
    value: string;
  };
  secondaryMetric: {
    label: string;
    value: string;
  };
  techStack: string[];
  items: SkillItem[];
}

const SKILL_CLUSTERS: SkillCluster[] = [
  {
    id: 'ai-rag',
    index: '01',
    code: 'SYS_VISION_AI',
    title: 'AI, Vision & Neural Networks',
    subtitle: 'Image Detection, Vectorization & RAG',
    icon: Brain,
    metric: {
      label: 'Model Training',
      value: 'CNNs • Object Detection',
    },
    secondaryMetric: {
      label: 'Vectorization',
      value: '< 35ms Multi-Modal Embeddings',
    },
    techStack: ['PyTorch', 'OpenCV', 'YOLO/CNNs', 'Vectorization', 'ChromaDB', 'LangChain', 'Scikit-Learn'],
    items: [
      {
        name: 'Image Detection & Computer Vision',
        badge: 'Deep Learning',
        desc: 'Training custom object detection models, CNN backbones, dataset annotation pipelines, and real-time visual inference.',
      },
      {
        name: 'High-Dimensional Vectorization',
        badge: 'Embeddings',
        desc: 'Extracting dense multi-modal & textual vector representations, cosine indexing, and sub-40ms semantic partition search.',
      },
      {
        name: 'Neural Network Architecture & Training',
        badge: 'PyTorch / NN',
        desc: 'Designing feedforward, convolutional, and deep NN topologies, loss function optimization, and backpropagation tuning.',
      },
      {
        name: 'Custom Modular RAG & Agents',
        badge: 'Orchestration',
        desc: 'Hybrid retrieval fusing dense vector embeddings with BM25 keyword search, plus multi-step autonomous tool routing.',
      },
    ],
  },
  {
    id: 'backend-apis',
    index: '02',
    code: 'SYS_ASYNC',
    title: 'High-Throughput Backend',
    subtitle: 'Scalable Async Architecture & APIs',
    icon: Server,
    metric: {
      label: 'RPS Benchmark',
      value: '12k+ req/sec',
    },
    secondaryMetric: {
      label: 'Protocols',
      value: 'REST • WebSocket • RPC',
    },
    techStack: ['Python', 'FastAPI', 'Go (Golang)', 'Node.js', 'Pydantic'],
    items: [
      {
        name: 'Python (FastAPI & Flask)',
        badge: 'Expert',
        desc: 'Asynchronous microservices with auto OpenAPI specs, dependency injection, and Pydantic.',
      },
      {
        name: 'Go (Golang) Microservices',
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
    index: '03',
    code: 'SYS_WEB3',
    title: 'Web3 & Decentralized Protocols',
    subtitle: 'Non-Custodial Infrastructure & Gateways',
    icon: Link2,
    metric: {
      label: 'Verification',
      value: 'Direct Node RPC (BSC & TON)',
    },
    secondaryMetric: {
      label: 'Networks',
      value: 'BSC (EVM) • TON (TVM)',
    },
    techStack: ['BSC EVM', 'TON SDK', 'Web3.py', 'TonConnect', 'Telegram API', 'Smart Contracts'],
    items: [
      {
        name: 'BSC & TON Payment Gateways',
        badge: 'Multi-Chain',
        desc: 'Non-custodial payment processing via raw BSC JSON-RPC and TON client bindings with zero middleman dependencies.',
      },
      {
        name: 'TON Blockchain SDKs & Mini Apps',
        badge: 'Telegram Native',
        desc: 'Custom Python client libraries for frictionless TON transactions and TonConnect flows inside Telegram Mini Apps.',
      },
      {
        name: 'Smart Contract Interaction',
        badge: 'EVM / TVM',
        desc: 'ABI encoding/decoding, TON cell BOC serialization, event log listeners, and gas optimization.',
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
    index: '04',
    code: 'SYS_INFRA',
    title: 'Data, Cloud & DevOps',
    subtitle: 'Persistence, Caching & Cloud Platforms',
    icon: Cloud,
    metric: {
      label: 'Cache Latency',
      value: '< 5ms In-Memory',
    },
    secondaryMetric: {
      label: 'Infra Tier',
      value: 'Docker • GCP • Linux',
    },
    techStack: ['Redis', 'PostgreSQL', 'MongoDB', 'Docker', 'Google Cloud', 'Linux'],
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

const FILTER_TABS = [
  { id: 'all', label: 'All Domains' },
  { id: 'ai-rag', label: 'Vision, NN & AI' },
  { id: 'backend-apis', label: 'Backend & APIs' },
  { id: 'blockchain-web3', label: 'Blockchain & Web3' },
  { id: 'data-infra', label: 'Cloud & Databases' },
];

const TECH_BADGES = [
  'PyTorch', 'OpenCV', 'Computer Vision', 'Image Detection', 'Neural Networks', 'Vectorization',
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
    <section id="skills" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Fade In */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#DFCCA8] text-xs font-mono-code text-[#064E3B] mb-4 shadow-2xs">
            <Cpu className="w-3.5 h-3.5 text-[#064E3B]" />
            <span>ENGINEERING STACK</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#064E3B] tracking-tight">
            Technical Capabilities
          </h2>
          <p className="text-[#26473D] max-w-2xl mx-auto text-base sm:text-lg mt-3 font-normal">
            Engineered for high throughput, sub-50ms AI retrieval, and zero-compromise cryptographic security.
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

        {/* 4 Professional Architecture Grid Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {filteredClusters.map((cluster, index) => {
            const Icon = cluster.icon;

            return (
              <motion.div
                key={cluster.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ 
                  duration: 0.55, 
                  delay: index * 0.08, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ y: -6 }}
                className="relative rounded-3xl bg-[#FFFDF8] border border-[#DFCCA8] hover:border-[#064E3B]/70 transition-all duration-300 p-6 sm:p-8 overflow-hidden group shadow-sm hover:shadow-[0_16px_40px_rgba(6,78,59,0.08)] flex flex-col justify-between"
              >
                {/* Subtle Ambient Emerald Aura on Hover */}
                <div className="absolute -right-20 -top-20 w-44 h-44 rounded-full bg-[#064E3B]/5 blur-3xl pointer-events-none group-hover:bg-[#064E3B]/10 transition-colors duration-500" />

                <div>
                  {/* Top Architectural Telemetry Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#DFCCA8]/60 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#064E3B] animate-pulse" />
                      <span className="font-mono-code text-[11px] font-semibold text-[#064E3B] tracking-wider uppercase">
                        {cluster.code}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-code px-2.5 py-0.5 rounded-full bg-[#FAF3E5] border border-[#DFCCA8] text-[#4D6D62] font-medium">
                        NODE {cluster.index}
                      </span>
                    </div>
                  </div>

                  {/* Header with High-Contrast Icon and Typography */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#064E3B] text-[#F8E7C9] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
                      <Icon className="w-6 h-6 text-[#F8E7C9]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#064E3B] tracking-tight">
                        {cluster.title}
                      </h3>
                      <p className="text-xs font-mono-code text-[#4D6D62] mt-0.5">
                        {cluster.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Telemetry Benchmark Strip */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#FAF3E5] border border-[#DFCCA8]/70 mb-5 shadow-2xs">
                    <div className="space-y-0.5 border-r border-[#DFCCA8]/60 pr-2">
                      <span className="block text-[10px] font-mono-code text-[#4D6D62] uppercase tracking-wider">
                        {cluster.metric.label}
                      </span>
                      <span className="block font-mono-code text-xs font-bold text-[#064E3B]">
                        {cluster.metric.value}
                      </span>
                    </div>
                    <div className="space-y-0.5 pl-2">
                      <span className="block text-[10px] font-mono-code text-[#4D6D62] uppercase tracking-wider">
                        {cluster.secondaryMetric.label}
                      </span>
                      <span className="block font-mono-code text-xs font-bold text-[#064E3B]">
                        {cluster.secondaryMetric.value}
                      </span>
                    </div>
                  </div>

                  {/* Capability Items with Slide & Accent Interaction */}
                  <div className="space-y-2.5">
                    {cluster.items.map((item) => (
                      <div
                        key={item.name}
                        className="group/item relative p-3 rounded-xl bg-[#FAF3E5]/60 hover:bg-[#FAF3E5] border border-[#E8D9BD] hover:border-[#064E3B]/40 transition-all duration-200 overflow-hidden pl-4 hover:translate-x-1"
                      >
                        {/* Active Left Emerald Accent Line */}
                        <div className="absolute left-0 inset-y-0 w-1 bg-[#064E3B] opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
                        
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs sm:text-sm font-bold text-[#064E3B] font-display flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
                            {item.name}
                          </span>
                          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#FFFDF8] text-[#064E3B] border border-[#DFCCA8] shadow-2xs shrink-0 group-hover/item:bg-[#064E3B] group-hover/item:text-[#F8E7C9] group-hover/item:border-[#064E3B] transition-colors">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs text-[#26473D] leading-relaxed font-normal pl-5">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chip Ribbon */}
                <div className="mt-6 pt-4 border-t border-[#DFCCA8]/60">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono-code text-[#4D6D62] uppercase tracking-wider mr-1">
                      Stack:
                    </span>
                    {cluster.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-[#FFFDF8] border border-[#DFCCA8] text-[10px] font-mono-code text-[#064E3B] hover:bg-[#064E3B] hover:text-[#F8E7C9] hover:border-[#064E3B] transition-colors cursor-default shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Tech Constellation Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 pt-8 border-t border-[#DFCCA8] text-center"
        >
          <p className="text-xs font-mono-code text-[#4D6D62] mb-4 tracking-wider uppercase">
            // Full Technology & Tooling Constellation (Synced with GitHub Profile)
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
