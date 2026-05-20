import { motion } from "framer-motion";

const ANGER_TRIGGERS = [
  { label: "Teammate went AFK", value: 55, color: "#ff8800" },
  { label: "Killed by shotgun noob", value: 70, color: "#ff4400" },
  { label: "Enemy had speed hack", value: 85, color: "hsl(var(--destructive))" },
  { label: "Bad WiFi ping spike", value: 75, color: "#ff3300" },
  { label: "Missed sniper at 2m range", value: 60, color: "#ff6600" },
  { label: "Mom called during clutch", value: 100, color: "#ff0000" },
];

const WEAPONS = [
  {
    name: "AWM Sniper", icon: "🔭",
    stats: { damage: 92, range: 98, accuracy: 78, coolness: 99 },
    tagline: "Misses 90% of shots. Blames the gun.",
    color: "hsl(var(--primary))",
  },
  {
    name: "Shotgun", icon: "💥",
    stats: { damage: 98, range: 20, accuracy: 65, coolness: 88 },
    tagline: "One shot, one kill (if you're 5cm away).",
    color: "hsl(var(--secondary))",
  },
  {
    name: "Desert Eagle", icon: "🔫",
    stats: { damage: 85, range: 60, accuracy: 72, coolness: 95 },
    tagline: "Iconic. Classic. Still dies. Still iconic.",
    color: "hsl(var(--accent))",
  },
];

const FEAR_FACTORS = [
  { label: "Spiders 🕷️", value: 10 },
  { label: "Enemies in Free Fire 🔫", value: 20 },
  { label: "Losing WiFi 📡", value: 65 },
  { label: "Failing exams 📝", value: 40 },
  { label: "HIS MOTHER 👩", value: 100 },
];

export default function FunnyStats() {
  return (
    <section className="py-8 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl uppercase text-center mb-8"
          style={{ color: "hsl(var(--destructive))", textShadow: "0 0 20px hsl(var(--destructive))" }}>
          😡 AKSHAY'S ANGER LEVELS 😡
        </h2>
        <div className="space-y-4 bg-card border border-border rounded-xl p-6">
          {ANGER_TRIGGERS.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-muted-foreground">{t.label}</span>
                <span style={{ color: t.color }} className="font-bold">{t.value}% 😡</span>
              </div>
              <div className="h-5 bg-background border border-border rounded-sm overflow-hidden">
                <motion.div
                  className="h-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${t.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                  style={{ background: `linear-gradient(90deg, ${t.color}88, ${t.color})`, boxShadow: `0 0 10px ${t.color}` }}
                />
              </div>
            </motion.div>
          ))}
          <p className="text-xs text-center text-muted-foreground mt-4 font-mono">
            * 100% reached when mom walks in during a clutch round. Device promptly turned off.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl uppercase text-center mb-8"
          style={{ color: "hsl(var(--secondary))", textShadow: "0 0 20px hsl(var(--secondary))" }}>
          🔫 TOP WEAPONS 🔫
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {WEAPONS.map((w, i) => (
            <motion.div
              key={w.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="bg-card border rounded-xl p-5 text-center"
              style={{ borderColor: w.color, boxShadow: `0 0 15px ${w.color}30` }}
            >
              <motion.div
                className="text-5xl mb-3"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              >{w.icon}</motion.div>
              <h3 className="font-display text-sm uppercase mb-1" style={{ color: w.color }}>{w.name}</h3>
              <p className="text-xs text-muted-foreground mb-4 italic">"{w.tagline}"</p>
              <div className="space-y-2">
                {Object.entries(w.stats).map(([key, val]) => (
                  <div key={key}>
                    <div className="flex justify-between text-xs font-mono mb-0.5">
                      <span className="text-muted-foreground capitalize">{key}</span>
                      <span style={{ color: w.color }}>{val}</span>
                    </div>
                    <div className="h-2 bg-background border border-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{ background: w.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display text-lg uppercase mb-4 text-center"
            style={{ color: "#00ff88", textShadow: "0 0 15px #00ff88" }}>
            🩺 FUTURE SURGEON 🩺
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>Plans to become an <span className="text-foreground font-bold">orthopedic surgeon</span> 🦴</p>
            <p>Will fix your broken bones with the same calm energy he has during Free Fire matches.</p>
            <p className="italic opacity-75">— "Sir, your patient is dying!"</p>
            <p className="italic" style={{ color: "hsl(var(--destructive))" }}>— "HOLD ON I'M CLUTCHING"</p>
            <div className="mt-4 p-3 rounded border border-border bg-background text-xs font-mono">
              <div>Specialty: Orthopedics 🦴</div>
              <div>Success Rate: TBD 📊</div>
              <div>Rage Quitting Risk: HIGH 😡</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display text-lg uppercase mb-4 text-center"
            style={{ color: "#8b5cf6", textShadow: "0 0 15px #8b5cf6" }}>
            ⛏️ DREAM GAMES ⛏️
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "⛏️", name: "Minecraft", desc: "Build stuff, not die?", color: "#7cb342" },
              { icon: "🎲", name: "Roblox", desc: "Social gaming awaits", color: "#ff3300" },
            ].map(g => (
              <motion.div key={g.name} whileHover={{ scale: 1.05 }}
                className="rounded-lg p-4 text-center border"
                style={{ borderColor: g.color, background: `${g.color}10` }}>
                <div className="text-3xl mb-2">{g.icon}</div>
                <div className="font-display text-xs uppercase" style={{ color: g.color }}>{g.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{g.desc}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-center text-muted-foreground mt-4">
            Currently too busy dying in Free Fire to play either 😭
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-card border border-destructive/40 rounded-xl p-6"
        style={{ boxShadow: "0 0 20px hsl(var(--destructive) / 0.2)" }}
      >
        <h2 className="font-display text-xl uppercase text-center mb-6"
          style={{ color: "hsl(var(--destructive))", textShadow: "0 0 20px hsl(var(--destructive))" }}>
          😨 FEAR LEVEL ANALYSIS 😨
        </h2>
        <div className="space-y-4">
          {FEAR_FACTORS.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-muted-foreground">{f.label}</span>
                <span className={f.value === 100 ? "text-destructive font-bold animate-pulse" : "text-foreground"}>
                  {f.value}%
                </span>
              </div>
              <div className="h-5 bg-background border border-border rounded-sm overflow-hidden">
                <motion.div
                  className="h-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${f.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1 }}
                  style={{
                    background: f.value === 100
                      ? "linear-gradient(90deg, hsl(var(--destructive)), #ff0000)"
                      : "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))",
                    boxShadow: f.value === 100 ? "0 0 20px hsl(var(--destructive))" : "none",
                  }}
                />
              </div>
            </motion.div>
          ))}
          <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
            👩 MOTHER = Akshay's natural predator. No known counter-strategy exists.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
