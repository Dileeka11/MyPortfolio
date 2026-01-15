import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Code snippets that float in the background
const codeSnippets = [
  "const build = () => {",
  "async function deploy() {",
  "import { code } from 'life';",
  "export default Success;",
  "git push origin main",
  "npm run dev",
  "{ ...spread }",
  "<Component />",
  "() => magic",
  "return <App />;",
  "useState(true)",
  "useEffect(() => {})",
  "type Dev = Expert;",
  "interface Skill {}",
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
    size: 11 + Math.random() * 5,
    duration: 25 + Math.random() * 35,
    delay: Math.random() * 10,
    opacity: 0.08 + Math.random() * 0.15,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

export default function AnimatedBackground() {
  const [floatingCode, setFloatingCode] = useState<FloatingCode[]>([]);

  useEffect(() => {
    setFloatingCode(generateFloatingCode(25));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Dark base with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />

      {/* Colorful ambient gradients */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 30%, hsl(var(--secondary) / 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 50% 80%, hsl(var(--accent) / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 10% 70%, hsl(var(--secondary) / 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Circuit pattern overlay - more visible */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Animated gradient orbs - more colorful */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, hsl(var(--primary) / 0.05) 40%, transparent 70%)",
          left: "-15%",
          top: "-15%",
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--secondary) / 0.18) 0%, hsl(var(--secondary) / 0.05) 40%, transparent 70%)",
          right: "-10%",
          top: "30%",
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[550px] h-[550px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, hsl(var(--accent) / 0.05) 40%, transparent 70%)",
          left: "35%",
          bottom: "-20%",
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, 70, 0],
          y: [0, -80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Extra colorful accents */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 60%)",
          right: "20%",
          bottom: "30%",
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating code snippets - more visible */}
      {floatingCode.map((code) => (
        <motion.div
          key={code.id}
          className={`absolute font-mono whitespace-nowrap select-none`}
          style={{
            left: `${code.x}%`,
            top: `${code.y}%`,
            fontSize: `${code.size}px`,
            opacity: code.opacity,
            color: `hsl(var(--${code.color}))`,
            textShadow: `0 0 20px hsl(var(--${code.color}) / 0.5)`,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, 40, 0],
            opacity: [code.opacity, code.opacity * 1.8, code.opacity],
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

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Star particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
