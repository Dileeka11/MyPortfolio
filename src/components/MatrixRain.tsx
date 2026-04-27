import { useEffect, useRef } from 'react';

interface CodeColumn {
  x: number;
  chars: string[];
  speed: number;
  opacity: number;
  fontSize: number;
  color: 'primary' | 'secondary' | 'accent';
  offset: number;
  height: number;
}

const CODE_CHARS = [
  '0', '1', '{', '}', '[', ']', '(', ')', '<', '>',
  '/', '\\', '|', '-', '+', '=', '*', '&', '%', '$', '#', '@',
  'a', 'b', 'c', 'd', 'e', 'f', 'x', 'y', 'z',
  'ア', 'イ', 'ウ', 'エ', 'オ',
  '∞', '∑', 'π', 'Ω', 'λ',
];

const COLORS: Array<'primary' | 'secondary' | 'accent'> = ['primary', 'secondary', 'accent'];

function randChar() {
  return CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
}

function generateColumn(x: number, screenHeight: number): CodeColumn {
  const charCount = 14 + Math.floor(Math.random() * 14);
  const fontSize = 13 + Math.floor(Math.random() * 5);
  return {
    x,
    chars: Array.from({ length: charCount }, randChar),
    speed: 40 + Math.random() * 90,
    opacity: 0.18 + Math.random() * 0.22,
    fontSize,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    offset: -Math.random() * screenHeight,
    height: charCount * fontSize,
  };
}

export default function MatrixRain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let columns: CodeColumn[] = [];
    let columnEls: HTMLDivElement[] = [];
    let charEls: HTMLSpanElement[][] = [];

    const build = () => {
      container.innerHTML = '';
      columnEls = [];
      charEls = [];

      const spacing = 60; // fewer columns = smoother
      const count = Math.floor(width / spacing);
      columns = Array.from({ length: count }, (_, i) =>
        generateColumn(i * spacing + Math.random() * 20, height)
      );

      const frag = document.createDocumentFragment();
      columns.forEach((col) => {
        const el = document.createElement('div');
        el.className = 'absolute font-mono select-none pointer-events-none';
        el.style.left = `${col.x}px`;
        el.style.top = '0';
        el.style.fontSize = `${col.fontSize}px`;
        el.style.opacity = String(col.opacity);
        el.style.writingMode = 'vertical-rl';
        el.style.willChange = 'transform';
        el.style.transform = `translate3d(0, ${col.offset}px, 0)`;

        const colorVar = `--${col.color}`;
        const spans: HTMLSpanElement[] = [];
        col.chars.forEach((ch, index) => {
          const span = document.createElement('span');
          const isHead = index >= col.chars.length - 3;
          const brightness = isHead ? 1 : 0.25 + (index / col.chars.length) * 0.7;
          span.textContent = ch;
          span.style.display = 'inline-block';
          span.style.color = `hsl(var(${colorVar}) / ${brightness})`;
          span.style.fontWeight = isHead ? '600' : '400';
          if (isHead) {
            span.style.textShadow = `0 0 10px hsl(var(${colorVar})), 0 0 20px hsl(var(${colorVar}) / 0.5)`;
          }
          el.appendChild(span);
          spans.push(span);
        });

        frag.appendChild(el);
        columnEls.push(el);
        charEls.push(spans);
      });
      container.appendChild(frag);
    };

    build();

    let last = performance.now();
    let mutateAccum = 0;
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      mutateAccum += dt;

      const doMutate = mutateAccum > 0.25;
      if (doMutate) mutateAccum = 0;

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        col.offset += col.speed * dt;
        if (col.offset - col.height > height) {
          col.offset = -col.height;
        }
        columnEls[i].style.transform = `translate3d(0, ${col.offset}px, 0)`;

        if (doMutate && Math.random() < 0.35) {
          const idx = Math.floor(Math.random() * col.chars.length);
          const ch = randChar();
          col.chars[idx] = ch;
          const span = charEls[i][idx];
          if (span) span.textContent = ch;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        build();
      }, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-[1] fx-dim"
    >
      <div ref={containerRef} className="absolute inset-0" />

      <div
        className="absolute w-[420px] h-[420px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 65%)',
          left: '8%',
          top: '20%',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute w-[380px] h-[380px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--secondary) / 0.2) 0%, transparent 65%)',
          right: '10%',
          top: '35%',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute w-[320px] h-[320px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.18) 0%, transparent 65%)',
          left: '45%',
          bottom: '15%',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}
