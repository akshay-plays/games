import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const akshayphoto = `${import.meta.env.BASE_URL}akshay-photo.png`;
const thugsGlasses = `${import.meta.env.BASE_URL}thug-glasses.png`;

const PHOTO_W = 280;
const PHOTO_H = 360;
const GLASSES_W = 120;

// Face zone: top ~45% of photo, center horizontal
const FACE_ZONE = { x0: 30, x1: 220, y0: 20, y1: 155 };

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
      onDragEnd={(_e, info) => {
        setIsDragging(false);
        // info.point is the absolute page position — use offset instead
        const el = document.getElementById("glasses-drag");
        if (el) {
          const rect = el.getBoundingClientRect();
          const parentRect = el.closest("[data-photo-container]")?.getBoundingClientRect();
          if (parentRect) {
            const relX = rect.left - parentRect.left;
            const relY = rect.top - parentRect.top;
            const cx = relX + GLASSES_W / 2;
            const cy = relY + 10; // top of glasses
            const inFace =
              cx >= FACE_ZONE.x0 &&
              cx <= FACE_ZONE.x1 &&
              cy >= FACE_ZONE.y0 &&
              cy <= FACE_ZONE.y1;
            onDrop(inFace);
            return;
          }
        }
        onDrop(false);
      }}
      id="glasses-drag"
      initial={{
        x: Math.round((PHOTO_W - GLASSES_W) / 2),
        y: Math.round(PHOTO_H * 0.22),
      }}
      whileDrag={{ scale: 1.06 }}
      className="absolute top-0 left-0 pointer-events-auto select-none"
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
        zIndex: 30,
        width: GLASSES_W,
        filter: "drop-shadow(0 0 6px #ff00ffaa)",
      }}
      title="Drag glasses onto the face!"
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
          data-photo-container=""
          style={{ width: PHOTO_W, height: PHOTO_H }}
        >
          {/* Ambient glow */}
          <div
            className="absolute"
            style={{
              inset: "-30px",
              background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.2) 0%, transparent 65%)",
              filter: "blur(28px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

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
              objectPosition: "20% top",
              zIndex: 10,
              display: "block",
            }}
          />

          {/* Glasses layer */}
          <div className="absolute inset-0" style={{ zIndex: 20, overflow: "visible" }}>
            <ThugLifeGlasses
              onDrop={(inFace) => setDealWithIt(inFace)}
              onDragStart={() => setDealWithIt(false)}
            />
          </div>
        </div>

        {/* DEAL WITH IT text */}
        <AnimatePresence>
          {dealWithIt && (
            <motion.div
              key="deal-with-it"
              initial={{ opacity: 0, y: 30, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="font-display uppercase text-center mb-4"
              style={{
                fontSize: "clamp(1.2rem, 5vw, 2.2rem)",
                color: "#ffd700",
                textShadow: "0 0 20px #ffd700, 0 0 40px #ff8800, 2px 2px 0 #000",
                letterSpacing: "0.08em",
              }}
            >
              DEAL WITH IT 😎
            </motion.div>
          )}
        </AnimatePresence>

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
      </motion.div>
    </section>
  );
}
