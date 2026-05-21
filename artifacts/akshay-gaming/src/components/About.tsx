import { motion } from "framer-motion";

const FACTS = [
  {
    emoji: "🎮",
    title: "Free Fire Pro",
    desc: `Mummy: "Akshaay!.. Phone rakh abhi!"
Akshay: "Bas, 2 minute. Abhi chalu kiya! Yeh wala hone ke baad rakh dunga!"
(Aur 2 ghante beet jate hai)`,
  },
  {
    emoji: "🏎️",
    title: "Backup Gamer",
    desc: "Jab Free Fire me mar jata hai to Car racing khelta hai 😎. Dukh vahi, Pyaar dusra.",
  },
  {
    emoji: "📺🎵⚽",
    title: "Off-Time Routine",
    desc: "Jab Games se fursat mil jaye to TV, gaane aur khelne bhi chale jata hu.",
  },
  {
    emoji: "🎶",
    title: "Favorite Song",
    desc: "Volume Full karo or suno — Bairan 🔥🔊🕺",
  },
  {
    emoji: "😷",
    title: "Future Doc",
    desc: "Ek din orthopedic surgeon banega. Teri haddi todega aur khud jodega bhi. Literally Danger_Team. 🦴",
  },
  {
    emoji: "💀",
    title: "Mai to nahi sehta",
    desc: "Dikh nahi raha tha mai game me tha, samne banda tha!?",
  },
  {
    emoji: "🚗",
    title: "Car Fan",
    desc: "Gaadi se zyada pyaar hai kisi cheez se nahi — Asphalt mein bhi gaadi, dreams mein bhi gaadi. Bhai fast hai. 🏎️💨",
  },
];

function FactCard({ fact, index }: { fact: typeof FACTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ scale: 1.04, y: -4 }}
      className="relative bg-card border border-border rounded-lg p-4 cursor-default overflow-hidden group"
      style={{ boxShadow: "0 0 10px hsl(var(--primary) / 0.1)" }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
        style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--secondary) / 0.05))" }}
      />
      <div className="relative z-10">
        <div className="text-3xl mb-2">{fact.emoji}</div>
        <h3 className="font-display text-xs uppercase text-primary mb-2 tracking-wide">{fact.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{fact.desc}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2
          className="font-display text-2xl sm:text-3xl uppercase text-foreground leading-tight"
          style={{ textShadow: "0 0 20px hsl(var(--primary))" }}
        >
          Akshay?<br />
          <span style={{ color: "hsl(var(--secondary))", textShadow: "0 0 20px hsl(var(--secondary))" }}>
            Yeh Kon Hai?
          </span>
        </h2>
        <p className="text-muted-foreground text-sm font-mono mt-3">Rare specimen. Handle with extreme caution. 🧪</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FACTS.map((fact, i) => (
          <FactCard key={i} fact={fact} index={i} />
        ))}
      </div>
    </section>
  );
}
