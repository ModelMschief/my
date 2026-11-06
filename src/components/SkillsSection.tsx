import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Brain, 
  Network, 
  Server, 
  Link2, 
  Cpu, 
  CheckCircle2, 
  LucideIcon 
} from 'lucide-react';

interface ExecutiveQuadrant {
  id: string;
  index: string;
  code: string;
  title: string;
  domain: string;
  icon: LucideIcon;
  statement: string;
  competencies: { name: string; highlight: string }[];
  stack: string[];
}

const QUADRANTS: ExecutiveQuadrant[] = [
  {
    id: 'vision-ai',
    index: '01',
    code: 'SYS_VISION',
    title: 'Computer Vision & Deep Learning',
    domain: 'Neural Architectures & Inference',
    icon: Brain,
    statement: 'Designing convolutional feature extractors, training custom object detection backbones, and deploying real-time visual inference pipelines.',
    competencies: [
      { name: 'Custom YOLO & CNN Topologies', highlight: 'Deep Learning' },
      { name: 'Dataset Annotation & Data Pipelines', highlight: 'Preprocessing' },
      { name: 'Loss Optimization & Backpropagation', highlight: 'PyTorch' },
      { name: 'Real-Time Edge/CPU Inference', highlight: 'OpenCV' },
    ],
    stack: ['PyTorch', 'OpenCV', 'YOLO', 'Scikit-Learn', 'TorchVision'],
  },
  {
    id: 'neural-rag',
    index: '02',
    code: 'SYS_RETRIEVAL',
    title: 'High-Dim Vectorization & RAG',
    domain: 'Hybrid Search & Neural Re-Ranking',
    icon: Network,
    statement: 'Engineering low-latency retrieval pipelines merging high-dimensional dense embeddings with sparse BM25 indices and cross-encoder validation.',
    competencies: [
      { name: 'Multi-Modal Vector Embeddings', highlight: 'ChromaDB' },
      { name: 'Hybrid Dense + BM25 Fusion', highlight: 'Reciprocal Rank' },
      { name: 'Cross-Encoder Neural Re-Ranking', highlight: 'Precision' },
      { name: 'Dynamic Context Compression', highlight: 'Token Efficiency' },
    ],
    stack: ['ChromaDB', 'Pinecone', 'LangChain', 'FastAPI', 'HuggingFace'],
  },
  {
    id: 'concurrency-backend',
    index: '03',
    code: 'SYS_CONCURRENCY',
    title: 'Concurrent Backends & In-Memory',
    domain: 'Asynchronous Microservices',
    icon: Server,
    statement: 'Architecting non-blocking asynchronous APIs and high-concurrency compiled microservices with low-latency caching and rate limiting.',
    competencies: [
      { name: 'Async Microservices with Auto OpenAPI', highlight: 'FastAPI' },
      { name: 'Concurrent Goroutines & Channel Routing', highlight: 'Go (Golang)' },
      { name: 'Distributed Caching & Rate Limiting', highlight: 'Redis Token Bucket' },
      { name: 'Full-Duplex Real-Time Protocols', highlight: 'WebSockets & RPC' },
    ],
    stack: ['Python', 'FastAPI', 'Go (Golang)', 'Redis', 'Pydantic'],
  },
  {
    id: 'web3-protocols',
    index: '04',
    code: 'SYS_PROTOCOLS',
    title: 'Decentralized Nodes & Cloud Infra',
    domain: 'Multi-Chain RPC & Deployment',
    icon: Link2,
    statement: 'Connecting directly to blockchain full nodes and shardchains for zero-custody settlement, backed by containerized Linux cloud daemons.',
    competencies: [
      { name: 'Direct Mempool & Shardchain Ingestion', highlight: 'BSC & TON' },
      { name: 'Bag-of-Cells (BOC) Serialization', highlight: 'TON SDK' },
      { name: 'Event-Driven Webhook Daemons', highlight: 'Asyncio & Motor' },
      { name: 'Serverless Container Compute', highlight: 'Docker & GCP' },
    ],
    stack: ['BSC EVM', 'TON SDK', 'Docker', 'Google Cloud', 'Linux'],
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Quadrants' },
  { id: 'vision-ai', label: 'Vision & Deep Learning' },
  { id: 'neural-rag', label: 'Vectorization & RAG' },
  { id: 'concurrency-backend', label: 'Backends & Concurrency' },
  { id: 'web3-protocols', label: 'Nodes & Cloud Infra' },
];

export const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const visibleQuadrants = activeTab === 'all' 
    ? QUADRANTS 
    : QUADRANTS.filter(q => q.id === activeTab);

  return (
    <section id="skills" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#DFCCA8] text-xs font-mono-code text-[#064E3B] mb-4 shadow-2xs">
            <Cpu className="w-3.5 h-3.5 text-[#064E3B]" />
            <span>TECHNICAL ARSENAL</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#064E3B] tracking-tight">
            Technical Capabilities
          </h2>
          <p className="text-[#26473D] max-w-2xl mx-auto text-base sm:text-lg mt-3 font-normal">
            Core engineering disciplines structured across deep learning, neural search, high-concurrency systems, and decentralized nodes.
          </p>

          {/* Smooth Filter Tabs */}
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

        {/* 4-Quadrant Executive Matrix Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {visibleQuadrants.map((quadrant, index) => {
              const Icon = quadrant.icon;

              return (
                <motion.div
                  layout
                  key={quadrant.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.08, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  whileHover={{ y: -6 }}
                  className="relative rounded-3xl bg-[#FFFDF8] border border-[#DFCCA8] hover:border-[#064E3B]/70 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group shadow-sm hover:shadow-[0_16px_40px_rgba(6,78,59,0.08)] cursor-default"
                >
                  <div>
                    {/* Top Architectural Telemetry Header */}
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#DFCCA8]/60">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#064E3B] animate-pulse" />
                        <span className="font-mono-code text-[11px] font-semibold text-[#064E3B] tracking-wider uppercase">
                          {quadrant.code}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono-code px-2.5 py-0.5 rounded-full bg-[#FAF3E5] border border-[#DFCCA8] text-[#4D6D62] font-semibold">
                        QUADRANT {quadrant.index}
                      </span>
                    </div>

                    {/* Header: Icon + Title + Domain */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#064E3B] text-[#F8E7C9] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <Icon className="w-6 h-6 text-[#F8E7C9]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#064E3B] tracking-tight">
                          {quadrant.title}
                        </h3>
                        <p className="text-xs font-mono-code text-[#4D6D62] mt-0.5 font-medium">
                          {quadrant.domain}
                        </p>
                      </div>
                    </div>

                    {/* Core Architectural Statement */}
                    <p className="text-xs sm:text-sm text-[#26473D] leading-relaxed font-normal mb-6 pl-1">
                      {quadrant.statement}
                    </p>

                    {/* Competency Modules */}
                    <div className="space-y-2.5 mb-6">
                      {quadrant.competencies.map((comp) => (
                        <div
                          key={comp.name}
                          className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#FAF3E5]/60 border border-[#E8D9BD] hover:border-[#064E3B]/40 hover:bg-[#FAF3E5] transition-all"
                        >
                          <span className="text-xs font-medium text-[#1B3B31] flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
                            <span>{comp.name}</span>
                          </span>
                          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-md bg-[#FFFDF8] border border-[#DFCCA8] text-[#064E3B] shrink-0 font-medium">
                            {comp.highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Tooling Stack Strip */}
                  <div className="pt-4 border-t border-[#DFCCA8]/60">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono-code text-[#4D6D62] uppercase tracking-wider mr-1 font-medium">
                        Production Stack:
                      </span>
                      {quadrant.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-md bg-[#FAF3E5] border border-[#DFCCA8] text-[10px] font-mono-code text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-[#F8E7C9] group-hover:border-[#064E3B] transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
