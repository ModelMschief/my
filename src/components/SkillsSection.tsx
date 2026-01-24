import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  {
    category: 'Programming',
    icon: '</>',
    items: [
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 45 },
      { name: 'SQL', level: 65 },
      { name: 'TypeScript', level: 20 },
    ],
  },
  {
    category: 'Machine Learning',
    icon: '💭',
    items: [
      { name: 'TensorFlow/PyTorch', level: 50 },
      { name: 'Scikit-learn', level: 80 },
      { name: 'NLP/LLMs', level: 75 },
      { name: 'Computer Vision', level: 25 },
    ],
  },
  {
    category: 'Data & Analytics',
    icon: '📊',
    items: [
      { name: 'Pandas/NumPy', level: 85 },
      { name: 'Data Visualization', level: 75 },
      { name: 'ETL Pipelines', level: 40 },
      { name: 'Statistical Analysis', level: 75 },
    ],
  },
  {
    category: 'Development',
    icon: '♨️',
    items: [
      { name: 'FastAPI/Flask', level: 80 },
      { name: 'HTML/CSS', level: 75 },
      { name: 'Docker/DevOps', level: 35 },
      { name: 'PostgreSQL/MongoDB', level: 60 },
    ],
  },
];

const technologies = [
  { name: 'Python', color: 'from-blue-500 to-yellow-500' },
  { name: 'LangChain', color: 'from-green-500 to-teal-500' },
  { name: 'OpenAI API', color: 'from-emerald-500 to-green-600' },
  { name: 'RAG Pipelines', color: 'from-purple-500 to-pink-500' },
  { name: 'FastAPI', color: 'from-teal-500 to-cyan-500' },
  { name: 'Flask', color: 'from-gray-600 to-gray-700' },
  { name: 'Telegram Bot API', color: 'from-blue-400 to-blue-500' },
  { name: 'Scikit-learn', color: 'from-orange-500 to-orange-600' },
  { name: 'PostgreSQL', color: 'from-blue-600 to-indigo-600' },
  { name: 'HTML/CSS', color: 'from-orange-500 to-red-500' },
  { name: 'Pandas', color: 'from-blue-500 to-indigo-500' },
  { name: 'Git', color: 'from-orange-600 to-red-600' },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
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
            What I Do
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Combining technical expertise with practical experience to deliver intelligent solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-background p-8 rounded-2xl shadow-card hover:shadow-hover transition-shadow duration-300 relative overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.span
                    className="text-3xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    {skillGroup.icon}
                  </motion.span>
                  <h3 className="text-xl font-bold text-foreground">{skillGroup.category}</h3>
                </div>

                <div className="space-y-5">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <motion.span
                          className="text-sm font-bold text-accent"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ delay: groupIndex * 0.1 + skillIndex * 0.1 + 0.5 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-accent rounded-full relative"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{
                            duration: 1.2,
                            delay: groupIndex * 0.1 + skillIndex * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <motion.div
                            className="absolute right-0 top-0 w-2 h-full bg-white/50 rounded-full"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Tags with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-center text-lg font-semibold text-foreground mb-8">
            Technologies I Work With
          </h3>
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {technologies.map((tech, index) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                whileHover={{
                  scale: 1.1,
                  y: -3,
                  transition: { duration: 0.2 },
                }}
                className="px-5 py-2.5 bg-secondary hover:bg-accent hover:text-accent-foreground text-secondary-foreground rounded-xl text-sm font-semibold cursor-default transition-colors duration-300 shadow-soft"
              >
                {tech.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
