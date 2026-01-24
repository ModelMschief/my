import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '#home', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, hsl(var(--accent)) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, hsl(var(--accent)) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, hsl(var(--accent)) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <motion.a
              href="#home"
              className="text-2xl font-bold tracking-tight inline-block"
              whileHover={{ scale: 1.05 }}
            >
              Shebin<span className="text-accent">.</span>
            </motion.a>
            <p className="text-primary-foreground/70 text-sm mt-1">
              Python Developer & ML Engineer
            </p>
          </motion.div>

          {/* Navigation links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-6"
          >
            {footerLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-primary-foreground/70"
          >
            © {currentYear} All rights reserved.
          </motion.p>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="mt-8 pt-8 border-t border-primary-foreground/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-xs text-primary-foreground/50">
            A first portfolio creation by Me ^_^
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
