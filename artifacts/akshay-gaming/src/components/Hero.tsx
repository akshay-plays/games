import { motion } from "framer-motion";

export default function Hero({ onShake }: { onShake: () => void }) {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center py-12 overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.span
          className="text-7xl md:text-8xl select-none mb-6"
          animate={{ rotate: [-5, 5, -5], scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 24px hsl(var(--primary)))" }}
        >
          😎
        </motion.span>

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
