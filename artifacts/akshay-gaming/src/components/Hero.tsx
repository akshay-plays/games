import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const akshayphoto = `${import.meta.env.BASE_URL}akshay-photo.png`;
const thugsGlasses = `${import.meta.env.BASE_URL}thug-glasses.png`;

const PHOTO_W = 270;
const PHOTO_H = 370;
const GLASSES_W = 130;

const FACE_ZONE = { x0: 25, x1: 230, y0: 15, y1: 140 };

/* Confetti particle colors */
const CONFETTI_COLORS = [
  "#ff0080", "#ff8c00", "#ffd700", "#00ff88",
  "#00cfff", "#bf5fff", "#ff4444", "#ffffff",
];

function ConfettiBurst() {
  const particles = Array.from({ length: 36 }, (_, i) => {
    const angle = (i / 36) * 360 + Math.random() * 10;
    const dist = 80 + Math.random() * 100;
    const rad = (angle * Math.PI) / 180;
    const tx = Math.cos(rad) * dist;
    const ty = Math.sin(rad) * dist - 40;
    const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    const size = 6 + Math.random() * 8;
    const rotate = Math.random() * 720 - 360;
    return { tx, ty, color, size, rotate, i };
  });

  return (
    <div
      className="pointer-events-none absolute"
      style={{ top: "30%", left: "50%", zIndex: 50, transform: "translate(-50%,-50%)" }}
    >
      {particles.map(({ tx, ty, color, size, rotate, i }) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{ x: tx, y: ty, opacity: 0, rotate, scale: 0.4 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: Math.random() * 0.1 }}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            backgroundColor: color,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      ))}
    </div>
  );
}

function ThugLifeGlasses({
  onDrop,
  onDragStart,
}: {
  onDrop: (inFace: boolean) => void;
  onDragStart: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => {
        setIsDragging(true);
        onDragStart();
      }}
      onDragEnd={() => {
        setIsDragging(false);
        const el = document.getElementById("glasses-drag");
        if (el) {
          const rect = el.getBoundingClientRect();
          const parent = el.closest("[data-photo-container]")?.getBoundingClientRect();
          if (parent) {
            const cx = rect.left - parent.left + GLASSES_W / 2;
            const cy = rect.top - parent.top + 10;
            onDrop(
              cx >= FACE_ZONE.x0 && cx <= FACE_ZONE.x1 &&
              cy >= FACE_ZONE.y0 && cy <= FACE_ZONE.y1
            );
            return;
          }
        }
        onDrop(false);
      }}
      id="glasses-drag"
      /* Start to the right of his head */
      initial={{ x: 165, y: 58 }}
      whileDrag={{ scale: 1.08 }}
      className="absolute top-0 left-0 pointer-events-auto select-none"
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
        zIndex: 30,
        width: GLASSES_W,
        filter: "drop-shadow(0 0 8px #bf5fff) drop-shadow(0 0 14px #ff00ff88)",
      }}
      title="Drag glasses onto his face!"
    >
      <img
        src={thugsGlasses}
        alt="Thug Life Glasses"
        draggable={false}
        style={{ width: "100%", display: "block", transform: "scaleX(-1)" }}
      />
    </motion.div>
  );
}

export default function Hero({ onShake }: { onShake: () => void }) {
  const [dealWithIt, setDealWithIt] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleDrop = (inFace: boolean) => {
    setDealWithIt(inFace);
    if (inFace) {
      setConfettiKey((k) => k + 1);
      setShowConfetti(true);
    }
  };

  useEffect(() => {
    if (!showConfetti) return;
    const t = setTimeout(() => setShowConfetti(false), 1400);
    return () => clearTimeout(t);
  }, [showConfetti, confettiKey]);

  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center py-12 overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Photo with glasses */}
        <div
          className="relative mb-4"
          data-photo-container=""
          style={{ width: PHOTO_W, height: PHOTO_H, overflow: "visible" }}
        >
          {/* Neon glow behind */}
          <div
            className="absolute"
            style={{
              inset: "-24px",
              background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.22) 0%, transparent 70%)",
              filter: "blur(26px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* Photo */}
          <motion.img
            src={akshayphoto}
            alt="Akshay Yadav"
            draggable={false}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "relative",
              width: PHOTO_W,
              height: PHOTO_H,
              objectFit: "cover",
              objectPosition: "center top",
              zIndex: 10,
              display: "block",
            }}
          />

          {/* Gradient fade at the bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "48%",
              background: "linear-gradient(to bottom, transparent 0%, #090b16 100%)",
              zIndex: 16,
            }}
          />

          {/* Confetti burst layer */}
          {showConfetti && <ConfettiBurst key={confettiKey} />}

          {/* Glasses layer */}
          <div className="absolute inset-0" style={{ zIndex: 20, overflow: "visible" }}>
            <ThugLifeGlasses
              onDrop={handleDrop}
              onDragStart={() => setDealWithIt(false)}
            />
          </div>
        </div>

        {/* DEAL WITH IT */}
        <AnimatePresence>
          {dealWithIt && (
            <motion.div
              key="deal-with-it"
              initial={{ opacity: 0, y: 24, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="font-display uppercase text-center mb-3"
              style={{
                fontSize: "clamp(1.1rem, 4.5vw, 2rem)",
                color: "#ffd700",
                textShadow: "0 0 20px #ffd700, 0 0 40px #ff8800, 2px 2px 0 #000",
                letterSpacing: "0.08em",
              }}
            >
              DEAL WITH IT 😎
            </motion.div>
          )}
        </AnimatePresence>

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
      </motion.div>
    </section>
  );
}
