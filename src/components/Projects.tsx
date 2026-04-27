import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Layers, ArrowUpRight, X } from 'lucide-react';

const projects = [
  {
    title: 'AI Dashboard Platform',
    description: 'A comprehensive analytics dashboard with real-time data visualization, machine learning insights, and predictive analytics powered by cutting-edge AI.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['React', 'TypeScript', 'D3.js', 'Python', 'TensorFlow'],
    category: 'fullstack',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'E-Commerce Experience',
    description: 'Modern shopping platform with AR try-on features, AI recommendations, and seamless checkout integration.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    tags: ['React Native', 'Node.js', 'Stripe', 'MongoDB'],
    category: 'mobile',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: '3D Product Configurator',
    description: 'Interactive 3D customization tool with real-time rendering, material simulation, and export capabilities.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    tags: ['Three.js', 'React', 'WebGL', 'GLSL'],
    category: 'frontend',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    title: 'Social Media API',
    description: 'Scalable microservices handling millions of requests with real-time messaging and notifications.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    tags: ['Node.js', 'GraphQL', 'Redis', 'PostgreSQL'],
    category: 'backend',
    github: '#',
    live: '#',
  },
  {
    title: 'Design System Library',
    description: 'Comprehensive component library with accessibility-first approach and theme customization.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    tags: ['React', 'Storybook', 'CSS-in-JS', 'Figma'],
    category: 'frontend',
    github: '#',
    live: '#',
  },
  {
    title: 'DevOps Platform',
    description: 'CI/CD automation with intelligent deployment strategies, monitoring, and incident management.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
    tags: ['Docker', 'Kubernetes', 'Terraform', 'AWS'],
    category: 'backend',
    github: '#',
    live: '#',
  },
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'mobile', label: 'Mobile' },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Stagger animation based on grid position
  const row = Math.floor(index / 3);
  const col = index % 3;
  const delay = row * 0.2 + col * 0.1;

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100, rotateX: -15, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
        transition={{ 
          duration: 0.8, 
          delay, 
          ease: [0.6, -0.05, 0.01, 0.99] 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
        className={`group perspective-1000 cursor-pointer ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
      >
        <motion.div
          animate={{
            rotateY: isHovered ? 5 : 0,
            rotateX: isHovered ? -5 : 0,
            z: isHovered ? 50 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 h-full shadow-xl"
        >
          {/* Image container */}
          <div className="relative h-40 sm:h-56 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              animate={{ scale: isHovered ? 1.15 : 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
            
            {/* Hover overlay with actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center gap-4"
            >
              <motion.a
                href={project.github}
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-background/90 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={project.live}
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-background/90 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            </motion.div>

            {/* Featured badge */}
            {project.featured && (
              <motion.div 
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ delay: delay + 0.3 }}
                className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-semibold"
              >
                Featured
              </motion.div>
            )}

            {/* Category badge */}
            <motion.div 
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ delay: delay + 0.3 }}
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs"
            >
              <Layers className="w-3 h-3 text-primary" />
              <span className="text-primary font-mono uppercase">{project.category}</span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <motion.div
                animate={{ x: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0, rotate: isHovered ? 0 : 45 }}
                className="text-primary"
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: delay + 0.4 + i * 0.05 }}
                  className="px-3 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border/30 hover:border-primary/30 hover:text-primary transition-all"
                >
                  {tag}
                </motion.span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, rotateX: -15 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: 50, rotateX: -15 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card/95 backdrop-blur-xl rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-auto border border-border/50 shadow-2xl"
            >
              <div className="relative">
                <img src={project.image} alt={project.title} className="w-full h-40 sm:h-64 object-cover" />
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 sm:p-8">
                <h2 className="text-xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4">{project.title}</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-full bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a href={project.live} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-center hover:shadow-lg transition-shadow">
                    View Live Demo
                  </a>
                  <a href={project.github} className="flex-1 py-3 rounded-xl bg-card border border-primary/30 text-foreground font-semibold text-center hover:border-primary transition-colors">
                    View Source
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" ref={containerRef} className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-background/80 backdrop-blur-sm">
      {/* Background elements */}
      <motion.div 
        style={{ y }}
        className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" 
      />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="text-center mb-10 sm:mb-16 lg:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4"
          >
            {'{'} My Work {'}'}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            <span className="gradient-text">Featured Projects</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full origin-center" 
          />
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 sm:mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-500 overflow-hidden ${
                filter === category.id
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/30'
              }`}
            >
              {filter === category.id && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary animate-gradient"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
