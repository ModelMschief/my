import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    title: 'RAG Chatbot with Telegram',
    description: 'An intelligent Telegram chatbot powered by Retrieval-Augmented Generation (RAG). Uses vector databases for context-aware document retrieval and provides accurate, conversational responses using LLMs.',
    tags: ['Python', 'LangChain', 'OpenAI API', 'Vector DB', 'Telegram API'],
    category: 'AI Chatbot',
    icon: '🔥',
    gradient: 'from-purple-500 via-pink-500 to-red-500',
  },
  {
    title: 'Customer Support Bot',
    description: 'An automated customer support chatbot built to handle FAQs, provide instant responses, and escalate complex queries. Integrated with messaging platforms for seamless user interaction.',
    tags: ['Python', 'NLP', 'Flask', 'REST API', 'Webhooks'],
    category: 'Chatbot',
    icon: '💬',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
  },
  {
    title: 'ML Classification Model',
    description: 'Machine learning models built for classification and prediction tasks. Includes data preprocessing, feature engineering, model training, evaluation, and performance optimization.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    category: 'Machine Learning',
    icon: '🧠',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
  },
  {
    title: 'Portfolio & Landing Pages',
    description: 'Modern, responsive websites including portfolios, landing pages, and business sites. Built with clean design, smooth animations, and optimized for performance.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    category: 'Web Development',
    icon: '🌐',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4"
          >
            My Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A selection of projects that showcase my expertise in Python development, machine learning, and data analytics
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ y: -12 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500"
            >
              {/* Gradient top bar */}
              <motion.div
                className={`h-2 bg-gradient-to-r ${project.gradient}`}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                style={{ originX: 0 }}
              />

              <div className="p-8">
                {/* Icon and category */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-2xl shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {project.icon}
                    </motion.div>
                    <div>
                      <span className="text-xs font-bold text-accent uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <motion.div
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
                    animate={hoveredIndex === index ? { scale: 1.1, backgroundColor: 'hsl(var(--accent))' } : {}}
                  >
                    <motion.svg
                      className="w-5 h-5 text-muted-foreground group-hover:text-accent-foreground transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={hoveredIndex === index ? { x: 3 } : { x: 0 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </motion.div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + tagIndex * 0.05 + 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-semibold rounded-lg"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Hover overlay effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  }}
                />
              </div>

              {/* Background gradient on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View more button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-accent text-accent font-semibold rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Want to see more? Let's talk
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
