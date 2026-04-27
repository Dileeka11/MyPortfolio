import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingTexts = [
  'Initializing Neural Network...',
  'Loading 3D Assets...',
  'Compiling Shaders...',
  'Generating Experience...',
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    const minDurationMs = 1800;
    const maxDurationMs = 3800;

    const timer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const t = Math.min(elapsed / minDurationMs, 1);

      // Ease-out progress (deterministic, so it never gets stuck)
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.min(100, Math.round(eased * 100));
      setProgress(next);

      if (elapsed >= maxDurationMs || next >= 100) {
        window.clearInterval(timer);
        setProgress(100);
        window.setTimeout(() => setIsLoading(false), 600);
      }
    }, 60);

    const textTimer = window.setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 700);

    return () => {
      window.clearInterval(timer);
      window.clearInterval(textTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.5,
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
        >
          {/* Animated background patterns */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"
                style={{
                  left: `${(i / 8) * 100}%`,
                  height: '100%',
                  willChange: 'transform',
                }}
                initial={{ y: '-100%' }}
                animate={{ y: '100%' }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* Main logo with advanced animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative mb-16"
          >
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-12 rounded-full"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="0.5"
                  strokeDasharray="10 5"
                />
              </svg>
            </motion.div>

            {/* Middle pulsing ring */}
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-8 rounded-full border border-primary/30"
            />

            {/* Inner counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1"
                  strokeDasharray="3 7"
                  opacity="0.5"
                />
              </svg>
            </motion.div>

            {/* Orbiting dots */}
            {[0, 120, 240].map((angle, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-10"
                style={{ transformOrigin: 'center' }}
              >
                <div
                  className="absolute w-2 h-2 rounded-full bg-primary glow"
                  style={{
                    top: '0%',
                    left: '50%',
                    transform: `rotate(${angle}deg) translateX(-50%)`,
                  }}
                />
              </motion.div>
            ))}

            {/* Center logo */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px hsl(var(--primary) / 0.3)',
                  '0 0 60px hsl(var(--primary) / 0.6)',
                  '0 0 20px hsl(var(--primary) / 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary via-accent to-secondary p-[2px]"
            >
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold gradient-text"
                >
                  SD
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          {/* Progress section */}
          <div className="w-64 sm:w-80 relative">
            {/* Progress bar container */}
            <div className="relative h-1 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>

            {/* Progress text */}
            <div className="flex justify-between items-center mt-4">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs text-muted-foreground font-mono"
              >
                {loadingTexts[textIndex]}
              </motion.p>
              <motion.span
                className="text-sm font-mono text-primary font-bold"
                key={Math.floor(progress)}
              >
                {Math.min(Math.round(progress), 100)}%
              </motion.span>
            </div>
          </div>

          {/* Bottom decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground uppercase tracking-[0.3em]">
              Crafting Experience
            </span>
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
