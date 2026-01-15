import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-white/5 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">JD</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground text-sm">
              © {currentYear} John Doe
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Designed & Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
            using
            <span className="text-primary font-semibold">React</span>
            &
            <span className="text-accent font-semibold">Three.js</span>
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#home" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Back to top ↑
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
