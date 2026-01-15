import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2, Palette, Rocket, Zap, Database, Globe, Cpu, Cloud } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

const skills = [
  { name: 'React / Next.js', level: 95, icon: '⚛️' },
  { name: 'TypeScript', level: 90, icon: '📘' },
  { name: 'Node.js', level: 85, icon: '🟢' },
  { name: 'Three.js / WebGL', level: 80, icon: '🎨' },
  { name: 'UI/UX Design', level: 85, icon: '✨' },
  { name: 'Database / SQL', level: 88, icon: '🗃️' },
];

const techIcons = [
  { icon: Code2, label: 'Clean Code', color: 'from-cyan-400 to-blue-500' },
  { icon: Palette, label: 'Design', color: 'from-pink-400 to-purple-500' },
  { icon: Database, label: 'Backend', color: 'from-green-400 to-emerald-500' },
  { icon: Globe, label: 'Web', color: 'from-orange-400 to-red-500' },
  { icon: Cpu, label: 'Performance', color: 'from-violet-400 to-indigo-500' },
  { icon: Cloud, label: 'Cloud', color: 'from-sky-400 to-cyan-500' },
];

function FloatingSkillSphere({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position}>
        <MeshDistortMaterial color={color} distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
      </Sphere>
    </Float>
  );
}

function SkillsScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
      <Suspense fallback={null}>
        <FloatingSkillSphere position={[-1.5, 1, 0]} color="#22d3ee" />
        <FloatingSkillSphere position={[1.5, -1, 0]} color="#a855f7" />
        <FloatingSkillSphere position={[0, 0, -1]} color="#8b5cf6" />
      </Suspense>
    </Canvas>
  );
}

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50, rotateY: -15 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.6, -0.05, 0.01, 0.99] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="perspective-1000"
    >
      <motion.div
        animate={{ 
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
          z: isHovered ? 20 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-card/80 backdrop-blur-xl rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all relative overflow-hidden group"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"
        />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.span 
                className="text-2xl"
                animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 10 : 0 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {skill.icon}
              </motion.span>
              <span className="font-semibold text-foreground">{skill.name}</span>
            </div>
            <motion.span
              animate={{ scale: isHovered ? 1.2 : 1 }}
              className="text-primary font-mono text-sm font-bold"
            >
              {skill.level}%
            </motion.span>
          </div>
          
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : {}}
              transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full relative"
            >
              <motion.div
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden bg-background/80 backdrop-blur-sm">
      {/* Background elements */}
      <motion.div 
        style={{ y }}
        className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute top-1/3 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" 
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4"
          >
            {'<'} About Me {'/>'}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold"
          >
            <span className="gradient-text">Who I Am</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full origin-left" 
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden border border-border/50">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full" />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                I'm a passionate <span className="text-primary font-semibold">software engineer</span> with 5+ years of 
                experience building web applications that combine cutting-edge technology with beautiful design.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8"
              >
                My journey started with curiosity about how things work, evolving into a career creating 
                <span className="text-accent font-semibold"> digital experiences that matter</span>. I believe in 
                the power of technology to solve real-world problems.
              </motion.p>

              {/* Tech icons grid */}
              <div className="grid grid-cols-3 gap-4">
                {techIcons.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.5, y: 30 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1, ease: [0.6, -0.05, 0.01, 0.99] }}
                    whileHover={{ scale: 1.1, y: -8, rotate: 5 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 transition-all group cursor-default"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 3D Skills visualization */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-64 mt-8 bg-card/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-border/50"
            >
              <SkillsScene />
            </motion.div>
          </motion.div>

          {/* Right column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border/50">
              <div className="flex items-center gap-3 mb-8">
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="p-2 rounded-lg bg-primary/20"
                >
                  <Zap className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-foreground">Technical Skills</h3>
              </div>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              {[
                { value: '5+', label: 'Years Exp' },
                { value: '50+', label: 'Projects' },
                { value: '30+', label: 'Clients' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="bg-card/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-border/50 hover:border-primary/30 transition-all"
                >
                  <motion.div 
                    className="text-3xl font-bold gradient-text mb-1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.4 + index * 0.1, type: 'spring' }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
