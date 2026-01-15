import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Github, Linkedin, Twitter, Mail, CheckCircle, MapPin, Clock, ArrowRight, Terminal } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:bg-gray-800' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-600' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-sky-500' },
  { icon: Mail, href: 'mailto:hello@example.com', label: 'Email', color: 'hover:bg-red-500' },
];

function ContactSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#22d3ee"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const inputVariants = {
    focused: { scale: 1.02, borderColor: 'hsl(var(--primary))' },
    unfocused: { scale: 1, borderColor: 'hsla(0, 0%, 100%, 0.1)' },
  };

  return (
    <section id="contact" ref={containerRef} className="py-32 relative overflow-hidden bg-background/80 backdrop-blur-sm">
      {/* Background elements */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" 
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
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 text-primary font-mono text-sm tracking-[0.2em] uppercase mb-4"
          >
            <Terminal className="w-4 h-4" />
            Get In Touch
            <Terminal className="w-4 h-4" />
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold"
          >
            <span className="gradient-text">Let's Work Together</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full" 
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground mt-6 max-w-xl mx-auto text-lg"
          >
            Have a project in mind? I'd love to hear about it. Let's create something amazing together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <form onSubmit={handleSubmit} className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden border border-border/50 shadow-xl">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
              
              <div className="space-y-6 relative z-10">
                {/* Name field */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  variants={inputVariants}
                  className="relative"
                >
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-6 py-5 bg-muted/30 border border-border/50 rounded-2xl text-foreground placeholder-transparent peer focus:outline-none focus:border-primary/50 transition-all duration-300"
                    placeholder="Your Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-6 -top-2.5 text-xs text-primary bg-card px-2 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary rounded"
                  >
                    Your Name
                  </label>
                </motion.div>

                {/* Email field */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  variants={inputVariants}
                  className="relative"
                >
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-6 py-5 bg-muted/30 border border-border/50 rounded-2xl text-foreground placeholder-transparent peer focus:outline-none focus:border-primary/50 transition-all duration-300"
                    placeholder="Email Address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-6 -top-2.5 text-xs text-primary bg-card px-2 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary rounded"
                  >
                    Email Address
                  </label>
                </motion.div>

                {/* Message field */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 }}
                  variants={inputVariants}
                  className="relative"
                >
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-6 py-5 bg-muted/30 border border-border/50 rounded-2xl text-foreground placeholder-transparent peer focus:outline-none focus:border-primary/50 transition-all duration-300 resize-none"
                    placeholder="Your Message"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-6 -top-2.5 text-xs text-primary bg-card px-2 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary rounded"
                  >
                    Your Message
                  </label>
                </motion.div>

                {/* Submit button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px hsl(190 95% 55% / 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground font-semibold flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary via-accent to-primary"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Message Sent Successfully!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info & 3D Element */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="flex flex-col gap-8"
          >
            {/* 3D Element */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="h-64 bg-card/60 backdrop-blur-xl rounded-3xl overflow-hidden relative border border-border/50"
            >
              <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
                <Suspense fallback={null}>
                  <ContactSphere />
                </Suspense>
              </Canvas>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-2xl font-bold gradient-text">Let's Connect</p>
              </div>
            </motion.div>

            {/* Info cards */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 border border-border/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" 
                />
                <span className="text-foreground font-semibold text-lg">Available for freelance</span>
              </div>
              
              <div className="space-y-4 mb-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 }}
                  className="flex items-center gap-4 text-muted-foreground"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>San Francisco, CA</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.1 }}
                  className="flex items-center gap-4 text-muted-foreground"
                >
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Response within 24 hours</span>
                </motion.div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.15, y: -8, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-2xl bg-card border border-border/50 hover:border-transparent transition-all group ${social.color} hover:text-white`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 border border-primary/20"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">Have a quick question?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Feel free to reach out directly via email for faster response.
              </p>
              <a
                href="mailto:hello@johndoe.dev"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                hello@johndoe.dev
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
