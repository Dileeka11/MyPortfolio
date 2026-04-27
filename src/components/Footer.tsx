import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 sm:py-12 border-t border-border/40 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4 sm:gap-6 text-center"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">SD</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">© {currentYear} Supun Dileeka</span>
          </div>
          
          <p className="text-muted-foreground text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
            Designed & Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 fill-red-500" />
            </motion.span>
            using
            <span className="text-primary font-semibold">React</span>
            &
            <span className="text-accent font-semibold">Three.js</span>
          </p>
          
          <a href="#home" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
            Back to top ↑
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
