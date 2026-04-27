import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const codeSnippets = [
  "const build = () => {",
  "async function deploy() {",
  "import { code } from 'life';",
  "export default Success;",
  "<Component />",
  "() => magic",
  "useState(true)",
  "useEffect(() => {})",
  "// TODO: ship it",
  "console.log('🚀');",
];

interface FloatingCode {
  id: number;
  text: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: 'primary' | 'secondary' | 'accent';
}

const COLORS: Array<'primary' | 'secondary' | 'accent'> = ['primary', 'secondary', 'accent'];

function generateFloatingCode(count: number): FloatingCode[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 11 + Math.random() * 4,
    duration: 28 + Math.random() * 25,
    delay: Math.random() * 8,
    opacity: 0.08 + Math.random() * 0.12,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

export default function AnimatedBackground() {
  const [floatingCode, setFloatingCode] = useState<FloatingCode[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setFloatingCode(generateFloatingCode(prefersReduced ? 0 : 10));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient — works in both themes */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />

      {/* Ambient gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, hsl(var(--primary) / 0.1) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 80% 30%, hsl(var(--secondary) / 0.09) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 50% 80%, hsl(var(--accent) / 0.08) 0%, transparent 55%)
          `,
        }}
      />

      {/* Circuit pattern — dark only */}
      <div
        className="absolute inset-0 opacity-[0.04] fx-dark-only"
        style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Animated gradient orbs — lighter blur for perf */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 65%)",
          left: "-12%",
          top: "-12%",
          filter: 'blur(70px)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--secondary) / 0.16) 0%, transparent 65%)",
          right: "-8%",
          top: "30%",
          filter: 'blur(70px)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[460px] h-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent) / 0.14) 0%, transparent 65%)",
          left: "40%",
          bottom: "-15%",
          filter: 'blur(70px)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating code snippets — dark only */}
      <div className="fx-dark-only absolute inset-0">
        {floatingCode.map((code) => (
          <motion.div
            key={code.id}
            className="absolute font-mono whitespace-nowrap select-none"
            style={{
              left: `${code.x}%`,
              top: `${code.y}%`,
              fontSize: `${code.size}px`,
              opacity: code.opacity,
              color: `hsl(var(--${code.color}))`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, 30, 0],
            }}
            transition={{
              duration: code.duration,
              delay: code.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {code.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
