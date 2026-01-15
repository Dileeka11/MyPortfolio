import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TypeWriter from './TypeWriter';
import GlitchText from './GlitchText';
import MagneticButton from './MagneticButton';
import { ChevronDown, Sparkles, Download, ArrowRight } from 'lucide-react';

export default function Hero() {
  const roles = ['Full Stack Developer', 'UI/UX Designer', 'Creative Coder', 'Tech Innovator'];
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  const textVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.15 + 0.5,
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.03 + 1, duration: 0.5 },
    }),
  };

  const name = 'John Doe';

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000">
      <motion.div
        style={{ y, opacity, scale, filter: `blur(${blur}px)` }}
        className="container mx-auto px-6 py-20 relative z-10"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Floating status badge */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-strong border border-primary/20 mb-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm text-foreground font-medium">Available for Opportunities</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
            />
          </motion.div>

          {/* Avatar with complex animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="mb-12 relative inline-block"
          >
            <div className="relative">
              {/* Outermost rotating hexagon */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-12"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon
                    points="50,2 95,25 95,75 50,98 5,75 5,25"
                    fill="none"
                    stroke="hsl(var(--primary) / 0.2)"
                    strokeWidth="0.3"
                    strokeDasharray="5 3"
                  />
                </svg>
              </motion.div>

              {/* Rotating dashed circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-8 rounded-full border-2 border-dashed border-primary/20"
              />

              {/* Pulsing gradient glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-6 rounded-full bg-gradient-to-r from-primary/30 via-accent/30 to-secondary/30 blur-2xl"
              />

              {/* Inner counter-rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#avatar-gradient)"
                    strokeWidth="1"
                    strokeDasharray="8 4"
                  />
                  <defs>
                    <linearGradient id="avatar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="50%" stopColor="hsl(var(--accent))" />
                      <stop offset="100%" stopColor="hsl(var(--secondary))" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Avatar container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-40 h-40 rounded-full p-1 relative z-10"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)))',
                }}
              >
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  <motion.span
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent bg-[size:200%_auto]"
                  >
                    JD
                  </motion.span>
                </div>
              </motion.div>

              {/* Orbiting elements */}
              {[0, 90, 180, 270].map((angle, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 - i * 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                  style={{ transformOrigin: 'center' }}
                >
                  <motion.div
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`,
                      top: '-8px',
                      left: '50%',
                      transform: `rotate(${angle}deg) translateX(-50%)`,
                      boxShadow: '0 0 20px hsl(var(--primary) / 0.5)',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Intro text */}
          <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible">
            <p className="text-primary font-mono text-sm mb-6 tracking-[0.4em] uppercase flex items-center justify-center gap-3">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
              Hello, I'm
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
            </p>
          </motion.div>

          {/* Name with letter animation */}
          <motion.h1
            className="text-7xl md:text-9xl font-bold mb-8 relative inline-block"
            initial="hidden"
            animate="visible"
          >
            <span className="gradient-text">
              {name.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterAnimation}
                  className="inline-block"
                  whileHover={{ scale: 1.2, color: 'hsl(var(--primary))' }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
            <motion.span
              className="absolute -right-8 -top-2 text-4xl"
              animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦
            </motion.span>
          </motion.h1>

          {/* Role with typewriter */}
          <motion.div custom={2} variants={textVariants} initial="hidden" animate="visible" className="mb-10">
            <h2 className="text-3xl md:text-5xl text-muted-foreground font-light">
              I'm a{' '}
              <span className="text-foreground font-semibold relative inline-block">
                <TypeWriter words={roles} className="gradient-text" />
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                />
              </span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-muted-foreground max-w-3xl mx-auto text-xl leading-relaxed mb-14"
          >
            Crafting <span className="text-primary font-medium">exceptional digital experiences</span> through 
            innovative code and creative design. Specialized in building{' '}
            <span className="text-accent font-medium">immersive 3D web applications</span> that push the 
            boundaries of what's possible on the web.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <MagneticButton
              href="#projects"
              className="group relative px-10 py-5 rounded-full overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary" />
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-secondary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <span className="relative z-10 flex items-center gap-3 text-primary-foreground font-bold text-lg">
                Explore My Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className="px-10 py-5 rounded-full glass-strong border border-primary/30 hover:border-primary/60 transition-all duration-300"
            >
              <span className="flex items-center gap-3 text-foreground font-bold text-lg">
                <Download className="w-5 h-5 text-primary" />
                Download CV
              </span>
            </MagneticButton>
          </motion.div>

          {/* Tech stack showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-20 flex items-center justify-center gap-6 flex-wrap"
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Built with</span>
            <div className="h-px w-16 bg-gradient-to-r from-muted-foreground/30 to-transparent" />
            <div className="flex items-center gap-8">
              {['React', 'TypeScript', 'Three.js', 'Node.js', 'Framer'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="relative group"
                >
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors cursor-default">
                    {tech}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors group cursor-pointer"
        >
          <span className="text-xs mb-3 font-mono tracking-[0.3em] group-hover:tracking-[0.4em] transition-all">
            SCROLL
          </span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-current"
            />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Decorative gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/6 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"
      />
    </section>
  );
}
