import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TypeWriter from "./TypeWriter";
import GlitchText from "./GlitchText";
import MagneticButton from "./MagneticButton";
import { ChevronDown, Sparkles, Download, ArrowRight } from "lucide-react";

export default function Hero() {
  const roles = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Creative Coder",
    "Tech Innovator",
  ];
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
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

  const name = 'Supun Dileeka';

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center perspective-1000 pt-24 pb-12"
    >
      <motion.div
        style={{ y, opacity, scale, filter: `blur(${blur}px)` }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating status badge */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-strong border border-primary/20 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-3 h-3 text-primary" />
            </motion.div>
            <span className="text-xs text-foreground font-medium uppercase tracking-wider">
              Available for Opportunities
            </span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
            />
          </motion.div>

          {/* Avatar with complex animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="mb-8 relative inline-block"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-6 scale-75 sm:scale-100">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-10 pointer-events-none"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
                    <polygon
                      points="50,2 95,25 95,75 50,98 5,75 5,25"
                      fill="none"
                      stroke="hsl(var(--primary) / 0.2)"
                      strokeWidth="0.3"
                      strokeDasharray="5 3"
                    />
                  </svg>
                </motion.div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-6 rounded-full border border-dashed border-primary/20 pointer-events-none"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-xl pointer-events-none"
                />
              </div>

              {/* Avatar container - significantly smaller for better height fit */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-40 h-40 sm:w-56 sm:h-56 rounded-full p-1 relative z-10 shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)))",
                }}
              >
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/profile-photo.png"
                    alt="Profile Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Intro text */}
          <motion.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-primary font-mono text-xs mb-4 tracking-[0.4em] uppercase flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-gradient-to-r from-transparent to-primary" />
              Hello, I'm
              <span className="w-6 h-px bg-gradient-to-l from-transparent to-primary" />
            </p>
          </motion.div>

          {/* Name with letter animation - much smaller to avoid 'zoomed' feel */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 relative inline-block tracking-tight"
            initial="hidden"
            animate="visible"
          >
            <span className="gradient-text">
              {name.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterAnimation}
                  className="inline-block"
                  whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </span>
            <motion.span
              className="absolute -right-4 sm:-right-6 -top-1 text-xl sm:text-3xl"
              animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦
            </motion.span>
          </motion.h1>

          {/* Role with typewriter */}
          <motion.div
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl text-muted-foreground font-light">
              I'm a{" "}
              <span className="text-foreground font-semibold relative inline-block">
                <TypeWriter words={roles} className="gradient-text" />
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                />
              </span>
            </h2>
          </motion.div>

          {/* Description - more compact */}
          <motion.p
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-8"
          >
            Crafting{" "}
            <span className="text-primary font-medium">
              exceptional digital experiences
            </span>{" "}
            through clean code and creative design. Specialized in{" "}
            <span className="text-accent font-medium">
              3D web applications.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8 sm:mt-12 w-full px-4 sm:px-0"
          >
            <MagneticButton
              href="#projects"
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full overflow-hidden shadow-2xl shadow-primary/20 transition-all duration-300 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary animate-gradient" />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-3 text-primary-foreground font-bold text-base sm:text-lg whitespace-nowrap">
                Explore My Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.span>
              </span>
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full glass-strong border border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-xl flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="relative z-10 flex items-center gap-3 text-foreground font-bold text-base sm:text-lg whitespace-nowrap">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:-translate-y-1 transition-transform" />
                Download CV
              </span>
            </MagneticButton>
          </motion.div>

          {/* Tech stack showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-10 sm:mt-14 flex items-center justify-center gap-3 sm:gap-6 flex-wrap px-4"
          >
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
              Built with
            </span>
            <div className="hidden sm:block h-px w-16 bg-gradient-to-r from-muted-foreground/30 to-transparent" />
            <div className="flex items-center gap-4 sm:gap-8 flex-wrap justify-center">
              {["React", "TypeScript", "Three.js", "Node.js", "Framer"].map(
                (tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.2 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="relative group"
                  >
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors cursor-default">
                      {tech}
                    </span>
                    <motion.span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator - hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
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
          <motion.div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-current"
            />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Decorative gradient orbs (reduced blur for smoother perf) */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: 'transform' }}
        className="absolute top-1/4 left-0 sm:left-[16%] w-[200px] h-[200px] sm:w-[440px] sm:h-[440px] bg-primary/10 rounded-full blur-[40px] sm:blur-[70px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: 'transform' }}
        className="absolute bottom-1/4 right-0 sm:right-[16%] w-[250px] h-[250px] sm:w-[520px] sm:h-[520px] bg-secondary/10 rounded-full blur-[50px] sm:blur-[80px] pointer-events-none"
      />
    </section>
  );
}
