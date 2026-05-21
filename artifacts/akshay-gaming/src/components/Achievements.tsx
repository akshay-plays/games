import { motion } from "framer-motion";

const TROPHIES = [
  {
    icon: "🏆",
    title: "8 Hours No Sleep",
    desc: "Played Free Fire from 9AM to 5AM. Doctor said: 'please stop.' Akshay said: 'one more match.'",
    rarity: "LEGENDARY",
    color: "#ffd700",
  },
  {
    icon: "😤",
    title: "Peak Rage",
    desc: "Broke his phone charger out of rage then gently fixed it because he needed to keep playing.",
    rarity: "EPIC",
    color: "hsl(var(--destructive))",
  },
  {
    icon: "👩",
    title: "Survived Mummy's Wrath",
    desc: "Closed 15 tabs in under 2 seconds, opened a biology textbook, and was 'studying' before Mummy entered.",
    rarity: "MYTHIC",
    color: "#ff00ff",
  },
  {
    icon: "🔫",
    title: "Desert Eagle God",
    desc: "Landed a sick headshot with the Desert Eagle. Immediately told 6 people. They weren't impressed.",
    rarity: "EPIC",
    color: "hsl(var(--secondary))",
  },
  {
    icon: "🍬",
    title: "Sweet Tooth Unlocked",
    desc: "Ate 3 packets of sweets during a single match. Stats temporarily improved. Coincidence? Probably yes.",
    rarity: "RARE",
    color: "#ff69b4",
  },
  {
    icon: "🚗",
    title: "Car Connoisseur",
    desc: "Named every car in Asphalt Legends. Cannot name 5 capitals of India. Priorities aligned.",
    rarity: "RARE",
    color: "hsl(var(--accent))",
  },
  {
    icon: "💀",
    title: "Zero Chill Champion",
    desc: "Set a world record: got angry at a mobile game in under 3 seconds after launching it.",
    rarity: "LEGENDARY",
    color: "#00ff88",
  },
  {
    icon: "🩺",
    title: "Future Doc",
    desc: "Declared 'I will become an orthopedic surgeon' between two rounds of Free Fire. No context.",
    rarity: "RARE",
    color: "hsl(var(--primary))",
  },
];

const RARITY_COLORS: Record<string, string> = {
  LEGENDARY: "#ffd700",
  MYTHIC: "#ff00ff",
  EPIC: "hsl(var(--destructive))",
  RARE: "hsl(var(--secondary))",
};

export default function Achievements() {
  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="font-display text-2xl sm:text-3xl uppercase mb-2"
          style={{ color: "#ffd700", textShadow: "0 0 30px #ffd700, 0 0 60px #ffd70050" }}>
          🏆 ACHIEVEMENTS & TROPHIES 🏆
        </h2>
        <p className="text-muted-foreground text-sm font-mono">Milestones that will never appear on his resume.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {TROPHIES.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -3 }}
            className="relative bg-card border rounded-xl p-5 overflow-hidden group cursor-default"
            style={{ borderColor: t.color + "60", boxShadow: `0 0 15px ${t.color}20` }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity"
              style={{ background: t.color, filter: "blur(30px)", transform: "translate(30%, -30%)" }}
            />

            <div className="flex gap-4 items-start relative z-10">
              <motion.div
                className="text-4xl flex-shrink-0"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              >{t.icon}</motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-display text-xs uppercase text-foreground">{t.title}</h3>
                  <span
                    className="text-[10px] font-display px-2 py-0.5 rounded border"
                    style={{ color: RARITY_COLORS[t.rarity], borderColor: RARITY_COLORS[t.rarity] + "80", background: RARITY_COLORS[t.rarity] + "15" }}
                  >{t.rarity}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
              style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center p-8 rounded-xl border border-border relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))" }}
        />
        <div className="relative z-10">
          <motion.div
            className="text-5xl mb-4 inline-block"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >🎮</motion.div>
          <h3 className="font-display text-xl uppercase mb-3"
            style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            THE LEGEND CONTINUES...
          </h3>
          <p className="text-muted-foreground text-sm">
            Akshay is out there right now, somewhere between Free Fire and a snack break, building his legacy one rage quit at a time. 💀
          </p>
        </div>
      </motion.div>
    </section>
  );
}
