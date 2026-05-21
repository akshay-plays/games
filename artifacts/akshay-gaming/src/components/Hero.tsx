import { motion } from "framer-motion";
import { useRef, useState } from "react";

const akshayphoto = `${import.meta.env.BASE_URL}akshay-photo.png`;
const thugsGlasses = `${import.meta.env.BASE_URL}thug-glasses.png`;

function ThugLifeGlasses({ containerW, containerH }: { containerW: number; containerH: number }) {
  const [isDragging, setIsDragging] = useState(false);
  const glassesW = Math.round(containerW * 0.78);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      initial={{
        x: Math.round((containerW - glassesW) / 2),
        y: Math.round(containerH * 0.26),
      }}
      whileDrag={{ scale: 1.06 }}
      className="absolute top-0 left-0 pointer-events-auto select-none"
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
        zIndex: 30,
        width: glassesW,
        filter: "drop-shadow(0 0 8px #ff00ffaa)",
      }}
      title="Drag glasses onto the face!"
    >
      <img
        src={thugsGlasses}
        alt="Thug Life Glasses"
        draggable={false}
        style={{ width: "100%", display: "block" }}
      />
      <div
        className="text-center font-display select-none"
        style={{
          color: "#ff00ff",
          textShadow: "0 0 8px #ff00ff",
          fontSize: "9px",
          letterSpacing: "0.1em",
          marginTop: 2,
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
        DRAG ME 😎
      </div>
    </motion.div>
  );
}

const PHOTO_W = 260;
const PHOTO_H = 340;

export default function Hero({ onShake }: { onShake: () => void }) {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center py-12 overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Photo + draggable glasses */}
        <div
          className="relative mb-6"
          style={{ width: PHOTO_W, height: PHOTO_H }}
        >
          {/* Ambient glow only — no border/box */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.25) 0%, transparent 70%)",
              filter: "blur(24px)",
              transform: "scale(1.25)",
              borderRadius: "50%",
            }}
          />
          <motion.img
            src={akshayphoto}
            alt="Akshay Yadav"
            draggable={false}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
            style={{
              width: PHOTO_W,
              height: PHOTO_H,
              objectFit: "cover",
              objectPosition: "top center",
              zIndex: 10,
              borderRadius: 0,
            }}
          />

          {/* Glasses layer — absolutely positioned over the photo */}
          <div className="absolute inset-0" style={{ zIndex: 20, overflow: "visible" }}>
            <ThugLifeGlasses containerW={PHOTO_W} containerH={PHOTO_H} />
          </div>
        </div>

        {/* Title */}
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
