import { motion } from "framer-motion";

const akshayphoto = `${import.meta.env.BASE_URL}akshay-photo.png`;

const PHOTO_W = 220;
const PHOTO_H = 300;

export default function Hero({ onShake }: { onShake: () => void }) {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center py-12 overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Photo with gradient fade */}
        <div className="relative mb-4" style={{ width: PHOTO_W, height: PHOTO_H }}>
          {/* Neon glow behind */}
          <div
            className="absolute"
            style={{
              inset: "-20px",
              background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.25) 0%, transparent 70%)",
              filter: "blur(24px)",
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

          {/* Smooth gradient fade at the bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "50%",
              background: "linear-gradient(to bottom, transparent 0%, #090b16 100%)",
              zIndex: 16,
            }}
          />
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
      </motion.div>
    </section>
  );
}
