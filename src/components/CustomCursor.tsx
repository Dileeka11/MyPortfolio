import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Slower follower
  const followerConfig = { damping: 35, stiffness: 150 };
  const followerXSpring = useSpring(cursorX, followerConfig);
  const followerYSpring = useSpring(cursorY, followerConfig);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const updateCursor = (e: MouseEvent) => {
      const target = e.target as Element;
      const isClickable = target?.matches('a, button, [role="button"], input, textarea, select, [onclick], .magnetic-button');
      setIsPointer(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Main cursor - code bracket style */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isClicking ? 0.8 : isPointer ? 1.3 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ marginLeft: -12, marginTop: -12 }}
        >
          {/* Left bracket */}
          <motion.span
            className="text-primary font-mono text-xl font-bold"
            animate={{
              x: isPointer ? -4 : 0,
              color: isPointer ? 'hsl(var(--accent))' : 'hsl(var(--primary))',
            }}
            transition={{ duration: 0.2 }}
          >
            {'<'}
          </motion.span>
          
          {/* Center dot */}
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary mx-0.5"
            animate={{
              scale: isPointer ? 1.5 : 1,
              backgroundColor: isPointer ? 'hsl(var(--accent))' : 'hsl(var(--primary))',
            }}
          />
          
          {/* Right bracket */}
          <motion.span
            className="text-primary font-mono text-xl font-bold"
            animate={{
              x: isPointer ? 4 : 0,
              color: isPointer ? 'hsl(var(--accent))' : 'hsl(var(--primary))',
            }}
            transition={{ duration: 0.2 }}
          >
            {'>'}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Follower ring - terminal style */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: followerXSpring,
          y: followerYSpring,
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: isPointer ? 1.8 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ marginLeft: -24, marginTop: -24 }}
        >
          {/* Outer ring with gradient */}
          <motion.div
            className="w-12 h-12 rounded-lg border-2 border-primary/30"
            animate={{
              rotate: isPointer ? 45 : 0,
              borderColor: isPointer ? 'hsl(var(--accent) / 0.5)' : 'hsl(var(--primary) / 0.3)',
              borderRadius: isPointer ? '50%' : '8px',
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Corner accents */}
          {!isPointer && (
            <>
              <motion.div
                className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-primary/50"
                style={{ marginLeft: -1, marginTop: -1 }}
              />
              <motion.div
                className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-primary/50"
                style={{ marginRight: -1, marginTop: -1 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-primary/50"
                style={{ marginLeft: -1, marginBottom: -1 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-primary/50"
                style={{ marginRight: -1, marginBottom: -1 }}
              />
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Typing cursor blink */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-0.5 h-5 bg-primary/40"
          style={{ marginLeft: 20, marginTop: -10 }}
          animate={{
            opacity: isVisible ? [0, 1, 0] : 0,
            scaleY: isPointer ? 0 : 1,
          }}
          transition={{
            opacity: { duration: 0.8, repeat: Infinity },
            scaleY: { duration: 0.2 },
          }}
        />
      </motion.div>
    </>
  );
}
