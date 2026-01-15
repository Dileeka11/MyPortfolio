import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CodeColumn {
  id: number;
  x: number;
  chars: string[];
  speed: number;
  opacity: number;
  fontSize: number;
  color: 'primary' | 'secondary' | 'accent';
}

const CODE_CHARS = [
  '0', '1', 
  '{', '}', '[', ']', '(', ')', '<', '>', 
  '/', '\\', '|', '-', '+', '=', '*', '&', '%', '$', '#', '@',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ',
  '∞', '∑', '∏', '√', '∫', 'Δ', 'π', 'Ω', 'λ', 'φ',
];

const COLORS: Array<'primary' | 'secondary' | 'accent'> = ['primary', 'secondary', 'accent'];

function generateColumn(id: number, screenWidth: number): CodeColumn {
  const x = Math.random() * screenWidth;
  const charCount = 15 + Math.floor(Math.random() * 25);
  const chars = Array.from({ length: charCount }, () => 
    CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
  );
  
  return {
    id,
    x,
    chars,
    speed: 0.8 + Math.random() * 2,
    opacity: 0.15 + Math.random() * 0.25, // Much more visible
    fontSize: 12 + Math.floor(Math.random() * 8),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

function MatrixColumn({ column }: { column: CodeColumn }) {
  const [offset, setOffset] = useState(-column.chars.length * column.fontSize);
  const [chars, setChars] = useState(column.chars);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => {
        const newOffset = prev + column.speed * 2.5;
        if (newOffset > window.innerHeight + 100) {
          setChars(Array.from({ length: column.chars.length }, () => 
            CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
          ));
          return -column.chars.length * column.fontSize;
        }
        return newOffset;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [column]);

  // Randomly mutate characters
  useEffect(() => {
    const mutateInterval = setInterval(() => {
      setChars(prev => {
        const newChars = [...prev];
        const indexToChange = Math.floor(Math.random() * newChars.length);
        newChars[indexToChange] = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        return newChars;
      });
    }, 150 + Math.random() * 300);

    return () => clearInterval(mutateInterval);
  }, []);

  const colorVar = `--${column.color}`;

  return (
    <div
      className="absolute font-mono select-none pointer-events-none"
      style={{
        left: column.x,
        top: offset,
        fontSize: column.fontSize,
        opacity: column.opacity,
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
      }}
    >
      {chars.map((char, index) => {
        const isHead = index >= chars.length - 4;
        const brightness = isHead ? 1 : 0.3 + (index / chars.length) * 0.7;
        
        return (
          <span
            key={index}
            className="inline-block"
            style={{
              color: `hsl(var(${colorVar}) / ${brightness})`,
              textShadow: isHead 
                ? `0 0 15px hsl(var(${colorVar})), 0 0 30px hsl(var(${colorVar})), 0 0 45px hsl(var(${colorVar}) / 0.5)` 
                : `0 0 8px hsl(var(${colorVar}) / 0.3)`,
              fontWeight: isHead ? 600 : 400,
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}

export default function MatrixRain() {
  const [columns, setColumns] = useState<CodeColumn[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const columnCount = Math.floor(screenWidth / 40); // Slightly less dense for clarity
    
    const initialColumns = Array.from({ length: columnCount }, (_, i) => 
      generateColumn(i, screenWidth)
    );
    
    setColumns(initialColumns);

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newCount = Math.floor(newWidth / 40);
      setColumns(Array.from({ length: newCount }, (_, i) => generateColumn(i, newWidth)));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-[1]"
    >
      {/* Matrix columns */}
      {columns.map(column => (
        <MatrixColumn key={column.id} column={column} />
      ))}
      
      {/* Colorful glow spots */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 60%)',
          left: '10%',
          top: '20%',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--secondary) / 0.25) 0%, transparent 60%)',
          right: '15%',
          top: '30%',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.2) 0%, transparent 60%)',
          left: '50%',
          bottom: '20%',
          transform: 'translateX(-50%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 60%)',
          right: '5%',
          bottom: '10%',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}
