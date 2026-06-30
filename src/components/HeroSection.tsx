import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const roles = ['Backend Engineer', 'AI Engineer', 'Blockchain Developer', 'Node.js Developer', 'API Specialist'];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentText = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-hero">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-accent/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-accent font-semibold mb-4 tracking-widest uppercase text-sm"
          >
            Welcome to my portfolio
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Hi, I'm{' '}
            <span className="text-gradient relative">
              Shebin T R
              <motion.span
                className="absolute -bottom-2 left-0 h-1 bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
              />
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="h-16 md:h-20 mb-8 flex items-center"
          >
            <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground">
              I'm a{' '}
            </span>
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent ml-2">
              {displayText}
              <motion.span
                className="inline-block w-1 h-8 md:h-10 bg-accent ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Specializing in{' '}
            <span className="text-foreground font-medium">Machine Learning</span>,{' '}
            <span className="text-foreground font-medium">RAG Pipelines</span>, and{' '}
            <span className="text-foreground font-medium">Full Stack Development</span>.
            I transform data into intelligent solutions and build scalable applications.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-16">
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
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
              </span>
              <motion.div
                className="absolute inset-0 bg-accent"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="px-8 py-4 border-2 border-accent text-accent font-semibold rounded-xl relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 group-hover:text-primary-foreground transition-colors duration-300">
                Get In Touch
              </span>
              <motion.div
                className="absolute inset-0 bg-accent"
                initial={{ y: '100%' }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap gap-8 md:gap-16"
          >
            {[
              { value: '1+', label: 'Years Experience' },
              { value: '20+', label: 'Projects Completed' },
              { value: '10+', label: 'Happy Clients' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statsVariants}
                className="relative group"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute -inset-2 bg-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId={`stat-bg-${index}`}
                />
                <div className="relative">
                  <motion.p
                    className="text-4xl md:text-5xl font-bold text-foreground"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.2, type: 'spring', stiffness: 100 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-3 bg-accent rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
