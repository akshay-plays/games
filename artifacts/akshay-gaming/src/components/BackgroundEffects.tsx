import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const FLOATING_EMOJIS = ["🔥", "💀", "🎮", "🔫", "🍬", "💥", "😡", "⚡", "🏆", "🚗", "🎵", "😤"];

function FloatingEmoji({ emoji, delay, x, size }: { emoji: string; delay: number; x: number; size: number }) {
  return (
    <motion.div
      className="fixed pointer-events-none select-none z-0"
      style={{ left: `${x}%`, bottom: "-10%" }}
      animate={{ y: [0, -window.innerHeight - 100], opacity: [0, 0.7, 0.7, 0] }}
      transition={{ duration: 8 + Math.random() * 6, delay, repeat: Infinity, ease: "linear" }}
    >
      <span style={{ fontSize: `${size}px` }}>{emoji}</span>
    </motion.div>
  );
}

export default function BackgroundEffects() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    emoji: FLOATING_EMOJIS[i % FLOATING_EMOJIS.length],
    delay: (i * 1.3) % 10,
    x: (i * 17 + 5) % 95,
    size: 14 + (i % 4) * 6,
  }));

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />
        {particles.map((p, i) => (
          <FloatingEmoji key={i} {...p} />
        ))}
      </div>

      <style>{`
        .custom-cursor-dot {
          width: 8px; height: 8px;
          background: hsl(var(--primary));
          box-shadow: 0 0 12px hsl(var(--primary)), 0 0 24px hsl(var(--primary));
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.05s;
        }
        .custom-cursor-ring {
          width: 32px; height: 32px;
          border: 2px solid hsl(var(--secondary) / 0.6);
          box-shadow: 0 0 8px hsl(var(--secondary));
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: transform 0.12s ease-out, width 0.2s, height 0.2s;
        }
      `}</style>
      <CursorEffect />
    </>
  );
}

function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + "px";
        ringRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot hidden md:block" />
      <div ref={ringRef} className="custom-cursor-ring hidden md:block" />
    </>
  );
}
