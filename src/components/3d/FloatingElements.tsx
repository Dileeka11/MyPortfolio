import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Tech icons/symbols that represent programming
const techSymbols = [
  "{ }",
  "< />",
  "( )",
  "[ ]",
  "=>",
  "++",
  "//",
  "/*",
  "&&",
  "||",
  ":::",
  "===",
  "?.",
  "...",
  "#!",
  "@",
];

const techTerms = [
  "API",
  "Git",
  "npm",
  "tsx",
  "jsx",
  "SQL",
  "DOM",
  "CLI",
  "SSH",
  "AWS",
];

interface FloatingElement {
  id: number;
  content: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "symbol" | "term" | "shape";
  variant: "primary" | "secondary" | "accent";
}

function generateElements(count: number): FloatingElement[] {
  const variants: FloatingElement["variant"][] = ["primary", "secondary", "accent"];
  const types: FloatingElement["type"][] = ["symbol", "term", "shape"];

  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    let content = "";
    
    if (type === "symbol") {
      content = techSymbols[Math.floor(Math.random() * techSymbols.length)];
    } else if (type === "term") {
      content = techTerms[Math.floor(Math.random() * techTerms.length)];
    }

    return {
      id: i,
      content,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: type === "shape" ? 30 + Math.random() * 50 : 12 + Math.random() * 8,
      duration: 20 + Math.random() * 25,
      delay: Math.random() * 8,
      type,
      variant: variants[Math.floor(Math.random() * variants.length)],
    };
  });
}

function getColor(variant: FloatingElement["variant"]) {
  switch (variant) {
    case "primary":
      return "hsl(var(--primary))";
    case "secondary":
      return "hsl(var(--secondary))";
    case "accent":
      return "hsl(var(--accent))";
  }
}

function Shape({ variant }: { variant: FloatingElement["variant"] }) {
  const shapes = [
    // Bracket shape
    <svg viewBox="0 0 40 60" className="w-full h-full">
      <path
        d="M30 5 L10 5 L10 55 L30 55"
        fill="none"
        stroke={getColor(variant)}
        strokeWidth="2"
        strokeOpacity="0.15"
      />
    </svg>,
    // Hexagon
    <svg viewBox="0 0 50 50" className="w-full h-full">
      <polygon
        points="25,2 45,15 45,35 25,48 5,35 5,15"
        fill="none"
        stroke={getColor(variant)}
        strokeWidth="1.5"
        strokeOpacity="0.12"
      />
    </svg>,
    // Diamond
    <svg viewBox="0 0 40 40" className="w-full h-full">
      <rect
        x="5"
        y="5"
        width="30"
        height="30"
        fill="none"
        stroke={getColor(variant)}
        strokeWidth="1.5"
        strokeOpacity="0.1"
        transform="rotate(45 20 20)"
      />
    </svg>,
    // Circle with dot
    <svg viewBox="0 0 40 40" className="w-full h-full">
      <circle
        cx="20"
        cy="20"
        r="15"
        fill="none"
        stroke={getColor(variant)}
        strokeWidth="1.5"
        strokeOpacity="0.12"
      />
      <circle
        cx="20"
        cy="20"
        r="3"
        fill={getColor(variant)}
        fillOpacity="0.15"
      />
    </svg>,
  ];

  return shapes[Math.floor(Math.random() * shapes.length)];
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    setElements(generateElements(25));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            rotate: element.type === "shape" ? [0, 360] : [0, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {element.type === "shape" ? (
            <div style={{ width: element.size, height: element.size }}>
              <Shape variant={element.variant} />
            </div>
          ) : (
            <span
              className="font-mono select-none"
              style={{
                fontSize: `${element.size}px`,
                color: getColor(element.variant),
                opacity: 0.08,
                textShadow: `0 0 10px ${getColor(element.variant)}`,
              }}
            >
              {element.content}
            </span>
          )}
        </motion.div>
      ))}

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <motion.line
          x1="10%"
          y1="20%"
          x2="30%"
          y2="40%"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
        <motion.line
          x1="70%"
          y1="30%"
          x2="85%"
          y2="60%"
          stroke="hsl(var(--secondary))"
          strokeWidth="1"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 1,
          }}
        />
        <motion.line
          x1="40%"
          y1="70%"
          x2="60%"
          y2="90%"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: 2,
          }}
        />
      </svg>
    </div>
  );
}
