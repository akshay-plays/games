import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const RAGE_MESSAGES = [
  "AKSHAY HAS DIED AGAIN 💀",
  "ENEMY CHEATER DETECTED 😤",
  "TEAMMATE AFK... RIP 🤬",
  "SNIPER MISSED FROM 2M AWAY 😭",
  "LAG KILLED AKSHAY AGAIN 🌐😡",
  "THIRD PARTY ATTACK!! 💀💀💀",
];

function ControllerSVG() {
  return (
    <motion.svg
      viewBox="0 0 120 80"
      className="w-28 h-20 md:w-40 md:h-28"
      animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <filter id="glow-ctrl">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect x="15" y="20" width="90" height="45" rx="22" fill="#1a1a2e" stroke="hsl(var(--primary))" strokeWidth="2" filter="url(#glow-ctrl)" />
      <rect x="25" y="30" width="28" height="22" rx="4" fill="#0d0d1a" stroke="hsl(var(--primary))" strokeWidth="1" />
      <circle cx="39" cy="41" r="8" fill="#0a0a18" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <circle cx="39" cy="35" r="2" fill="hsl(var(--primary))" opacity="0.8" />
      <circle cx="45" cy="41" r="2" fill="hsl(var(--primary))" opacity="0.8" />
      <circle cx="39" cy="47" r="2" fill="hsl(var(--primary))" opacity="0.8" />
      <circle cx="33" cy="41" r="2" fill="hsl(var(--primary))" opacity="0.8" />
      <circle cx="75" cy="35" r="4" fill="#ff00ff" opacity="0.9" />
      <circle cx="83" cy="41" r="4" fill="hsl(var(--secondary))" opacity="0.9" />
      <circle cx="75" cy="47" r="4" fill="hsl(var(--primary))" opacity="0.9" />
      <circle cx="67" cy="41" r="4" fill="hsl(var(--destructive))" opacity="0.9" />
      <rect x="52" y="34" width="16" height="14" rx="2" fill="#0d0d1a" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
      <rect x="56" y="38" width="3" height="6" rx="1" fill="hsl(var(--muted-foreground))" />
      <rect x="54" y="40" width="7" height="3" rx="1" fill="hsl(var(--muted-foreground))" />
      <rect x="9" y="28" width="12" height="8" rx="4" fill="#1a1a2e" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <rect x="99" y="28" width="12" height="8" rx="4" fill="#1a1a2e" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    </motion.svg>
  );
}

function ExplosionSVG({ x, y }: { x: number; y: number }) {
  return (
    <motion.g transform={`translate(${x},${y})`}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: [0, 1.5, 0], opacity: [1, 0.8, 0] }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.line key={i}
          x1="0" y1="0"
          x2={Math.cos(angle * Math.PI / 180) * 20}
          y2={Math.sin(angle * Math.PI / 180) * 20}
          stroke={i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--secondary))"}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      <circle r="8" fill="hsl(var(--destructive))" opacity="0.9" />
      <circle r="4" fill="orange" />
    </motion.g>
  );
}

export default function Hero({ onShake }: { onShake: () => void }) {
  const [rageMeter, setRageMeter] = useState(35);
  const [rageMsg, setRageMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [explosions, setExplosions] = useState<{ id: number; x: number; y: number }[]>([]);
  const controls = useAnimation();
  let explosionId = 0;

  const addExplosion = () => {
    const id = explosionId++;
    const x = 30 + Math.random() * 40;
    const y = 20 + Math.random() * 60;
    setExplosions(prev => [...prev, { id, x, y }]);
    setTimeout(() => setExplosions(prev => prev.filter(e => e.id !== id)), 700);
  };

  const handleDied = () => {
    const newRage = Math.min(100, rageMeter + 15 + Math.floor(Math.random() * 10));
    setRageMeter(newRage);
    setRageMsg(RAGE_MESSAGES[Math.floor(Math.random() * RAGE_MESSAGES.length)]);
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2000);
    addExplosion();
    addExplosion();
    if (newRage >= 100) {
      onShake();
      controls.start({ color: ["hsl(var(--primary))", "hsl(var(--destructive))", "hsl(var(--primary))"] });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center py-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
          <ControllerSVG />
          <div className="flex flex-col items-center gap-2">
            <motion.span
              className="text-5xl"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >🔥</motion.span>
            <motion.span
              className="text-4xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            >💥</motion.span>
          </div>
        </div>

        <motion.h1
          className="font-display text-3xl sm:text-4xl md:text-6xl font-black uppercase leading-tight mb-4"
          animate={controls}
          style={{
            background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.8))",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          AKSHAY:<br />THE FREE FIRE<br />LEGEND 🔥
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-2 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          8 hours of Free Fire. Infinite rage 😡
        </motion.p>
        <motion.p
          className="text-sm text-muted-foreground mb-8 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          UID: <span className="text-primary">12695841391</span> · Name: <span className="text-secondary">Danger_Team</span> · Guild: <span className="text-accent">TM baby guild</span>
        </motion.p>

        <div className="w-full max-w-sm mb-6">
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-muted-foreground">😤 RAGE METER</span>
            <span className={rageMeter >= 100 ? "text-destructive animate-pulse font-bold" : "text-primary"}>{rageMeter}%</span>
          </div>
          <div className="w-full h-6 bg-card border border-border rounded-sm overflow-hidden relative">
            <motion.div
              className="h-full rounded-sm"
              animate={{ width: `${rageMeter}%` }}
              style={{
                background: rageMeter >= 80
                  ? "linear-gradient(90deg, hsl(var(--destructive)), #ff4400)"
                  : rageMeter >= 50
                    ? "linear-gradient(90deg, #ff8800, hsl(var(--destructive)))"
                    : "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))",
                boxShadow: "0 0 10px currentColor",
              }}
              transition={{ type: "spring", stiffness: 100 }}
            />
            {rageMeter >= 100 && (
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white animate-pulse">
                💀 MAXIMUM RAGE 💀
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDied}
            className="px-6 py-3 rounded font-display text-sm uppercase tracking-wide border-2 border-destructive text-destructive hover:bg-destructive/20 transition-colors"
            style={{ textShadow: "0 0 10px hsl(var(--destructive))", boxShadow: "0 0 15px hsl(var(--destructive) / 0.4)" }}
          >
            Akshay died again 💀
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRageMeter(0)}
            className="px-6 py-3 rounded font-display text-sm uppercase tracking-wide border-2 border-muted-foreground text-muted-foreground hover:bg-muted/20 transition-colors"
          >
            Respawn 🔄
          </motion.button>
        </div>
      </motion.div>

      {showMsg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-destructive text-white px-6 py-3 rounded font-display text-sm uppercase text-center"
          style={{ boxShadow: "0 0 30px hsl(var(--destructive))" }}
        >
          {rageMsg}
        </motion.div>
      )}

      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {explosions.map(e => <ExplosionSVG key={e.id} x={e.x + "%"} y={e.y + "%"} />)}
      </svg>
    </section>
  );
}
