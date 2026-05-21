import { motion } from "framer-motion";
import { useRef, useState } from "react";
const akshayphoto = `${import.meta.env.BASE_URL}akshay-photo.png`;

function ThugLifeGlasses() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      ref={constraintsRef}
      className="absolute inset-0 overflow-visible pointer-events-none"
      style={{ zIndex: 20 }}
    >
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        initial={{ x: 60, y: 80 }}
        whileDrag={{ scale: 1.08 }}
        className="absolute pointer-events-auto select-none"
        style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "none" }}
        title="Drag the glasses!"
      >
        <svg
          viewBox="0 0 220 60"
          width="160"
          height="44"
          style={{ filter: "drop-shadow(0 4px 12px #000a) drop-shadow(0 0 6px #ff00ff88)" }}
        >
          {/* Left lens */}
          <rect x="4" y="10" width="84" height="40" rx="6" fill="#111" stroke="#333" strokeWidth="3" />
          {/* Right lens */}
          <rect x="132" y="10" width="84" height="40" rx="6" fill="#111" stroke="#333" strokeWidth="3" />
          {/* Bridge */}
          <rect x="88" y="24" width="44" height="12" rx="4" fill="#111" stroke="#333" strokeWidth="2" />
          {/* Left temple */}
          <rect x="0" y="24" width="6" height="6" rx="2" fill="#222" />
          {/* Right temple */}
          <rect x="214" y="24" width="6" height="6" rx="2" fill="#222" />
          {/* Pixel shine left */}
          <rect x="12" y="16" width="16" height="6" rx="2" fill="#ffffff22" />
          {/* Pixel shine right */}
          <rect x="140" y="16" width="16" height="6" rx="2" fill="#ffffff22" />
        </svg>
        <div
          className="text-center font-display text-xs mt-1 select-none"
          style={{ color: "#ff00ff", textShadow: "0 0 8px #ff00ff", fontSize: "9px", letterSpacing: "0.1em" }}
        >
          DRAG ME 😎
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero({ onShake }: { onShake: () => void }) {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center py-12 overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Photo container with glasses */}
        <div className="relative mb-6" style={{ width: 200, height: 220 }}>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
            style={{ width: 200, height: 220 }}
          >
            {/* Neon glow ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
                filter: "blur(16px)",
                transform: "scale(1.2)",
              }}
            />
            {/* Photo */}
            <img
              src={akshayphoto}
              alt="Akshay Yadav"
              className="relative z-10 w-full h-full object-cover object-top rounded-2xl"
              style={{
                border: "3px solid hsl(var(--primary))",
                boxShadow: "0 0 30px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--secondary) / 0.3)",
              }}
              draggable={false}
            />
          </motion.div>
          {/* Draggable glasses overlay */}
          <ThugLifeGlasses />
        </div>

        <motion.h1
          className="font-display font-black uppercase leading-tight mb-2"
          style={{
            fontSize: "clamp(2rem, 8vw, 5rem)",
            background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.8))",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          AKSHAY YADAV!
        </motion.h1>

        <motion.p
          className="font-display uppercase tracking-widest whitespace-nowrap mb-6"
          style={{
            fontSize: "clamp(0.6rem, 3vw, 1.1rem)",
            color: "hsl(var(--secondary))",
            textShadow: "0 0 12px hsl(var(--secondary))",
            letterSpacing: "0.15em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          THE FREE FIRE LEGEND 🔥
        </motion.p>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-foreground font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{ textShadow: "0 0 10px hsl(var(--primary) / 0.5)" }}
        >
          Mera naam Akshay.. Akshay Yadav 🔥
        </motion.p>

        <motion.p
          className="text-sm text-muted-foreground mt-2 font-mono italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Roz 8 ghante Free Fire. Gussa? Hamesha. 😡
        </motion.p>
      </motion.div>
    </section>
  );
}
