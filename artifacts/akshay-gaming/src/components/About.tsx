import { useState } from "react";
import { motion } from "framer-motion";

const FACTS = [
  { emoji: "🎮", title: "Free Fire Addict", desc: "Plays Free Fire EVERY. SINGLE. DAY. for 8 straight hours. His mom: 'beta kuch aur karo.' Akshay: 🎮🎮🎮" },
  { emoji: "🏎️", title: "Backup Gamer", desc: "When Free Fire doesn't load, he suffers through Asphalt Legends like a true champion." },
  { emoji: "📺🎵", title: "Off-Time Routine", desc: "Occasionally surfaces from gaming to watch TV and listen to songs. A man of many activities (2 activities)." },
  { emoji: "🎶", title: "Favorite Song", desc: "\"Bairan\" — plays it on loop while headbanging and probably crying about that last match he lost." },
  { emoji: "😡", title: "Rage Specialist", desc: "Gets EXTREMELY angry when he dies in Free Fire. Neighbors have called the police twice. (May be exaggerated.)" },
  { emoji: "🔫", title: "Weapon Connoisseur", desc: "Sniper 🎯, Shotgun 💥, Desert Eagle 🔫 — an elite weapon loadout for someone who keeps dying 💀" },
  { emoji: "🩺", title: "Future Doc", desc: "Plans to become an orthopedic surgeon. Will fix your bones with the same precision he misses enemies." },
  { emoji: "💀", title: "Zero Chill", desc: "Gets angry very quickly. His resting face is 😤. His activated face is 😡😡😡. His mom's face is 😨." },
  { emoji: "🆔", title: "Free Fire ID", desc: "UID: 12695841391 — search him up if you want to watch someone rage in real time." },
  { emoji: "👤", title: "In-Game Name", desc: "Danger_Team. Very dangerous. Very team-oriented (unless the team dies, then it's their fault)." },
  { emoji: "👶", title: "Guild Member", desc: "Member of TM baby guild. The 'baby' is very fitting." },
  { emoji: "🤣", title: "Friend Whisperer", desc: "Treats his friends rudely but lovingly. His friends: 😭😭😭. Also his friends: 🤣❤️." },
  { emoji: "🍬", title: "Sweet Tooth Supreme", desc: "LOVES sweets more than winning (which makes sense since he rarely does either). Hover me for confetti! 🎉", confetti: true },
  { emoji: "📭", title: "Email Who?", desc: "Has no email ID. How does he buy games? A mystery for the ages. (He uses dad's phone.)" },
  { emoji: "⛏️🎲", title: "Dream Games", desc: "Wants to play Roblox and Minecraft but is too busy dying in Free Fire to find time." },
  { emoji: "🚗", title: "Car Fanatic", desc: "Loves cars. Drives them in Asphalt Legends because his mom definitely won't let him near a real one." },
  { emoji: "😨", title: "Greatest Fear", desc: "His mother. 100% fear level. All rage disappears instantly. Phone goes face-down. Browser history cleared.", scary: true },
];

function ConfettiParticle({ x, y }: { x: number; y: number }) {
  const colors = ["#ff0080", "#00ff88", "#ffff00", "#00ffff", "#ff8800"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-sm pointer-events-none"
      style={{ background: color, left: x, top: y, zIndex: 50 }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        x: (Math.random() - 0.5) * 120,
        y: (Math.random() - 0.5) * 120,
        opacity: 0,
        scale: 0,
        rotate: Math.random() * 360,
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}

function FactCard({ fact, index }: { fact: typeof FACTS[0]; index: number }) {
  const [confetti, setConfetti] = useState<{ x: number; y: number }[]>([]);

  const handleHover = () => {
    if (fact.confetti) {
      const particles = Array.from({ length: 18 }, () => ({
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
      }));
      setConfetti(particles);
      setTimeout(() => setConfetti([]), 900);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      whileHover={{ scale: 1.04, y: -4 }}
      onHoverStart={handleHover}
      className="relative bg-card border border-border rounded-lg p-4 cursor-default overflow-hidden group"
      style={{
        boxShadow: fact.scary
          ? "0 0 15px hsl(var(--destructive) / 0.3)"
          : "0 0 10px hsl(var(--primary) / 0.1)",
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
        style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--secondary) / 0.05))" }}
      />
      {confetti.map((p, i) => (
        <ConfettiParticle key={i} x={p.x} y={p.y} />
      ))}
      <div className="relative z-10">
        <div className="text-3xl mb-2">{fact.emoji}</div>
        <h3 className="font-display text-xs uppercase text-primary mb-2 tracking-wide">{fact.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{fact.desc}</p>
      </div>
      {fact.scary && (
        <motion.div
          className="absolute top-2 right-2 text-lg"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >🚨</motion.div>
      )}
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
        <h2 className="font-display text-2xl sm:text-3xl uppercase text-foreground mb-2"
          style={{ textShadow: "0 0 20px hsl(var(--primary))" }}>
          😎 WHO IS AKSHAY? 😎
        </h2>
        <p className="text-muted-foreground text-sm font-mono">A rare specimen. Handle with caution.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FACTS.map((fact, i) => (
          <FactCard key={i} fact={fact} index={i} />
        ))}
      </div>
    </section>
  );
}
