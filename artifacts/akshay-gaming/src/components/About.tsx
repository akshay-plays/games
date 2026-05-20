import { useState } from "react";
import { motion } from "framer-motion";

const FACTS = [
  { emoji: "🎮", title: "Free Fire Addict", desc: "Roz 8 ghante Free Fire. Maa kehti hai 'beta kuch aur karo.' Akshay kehta hai: 'Bhai ek aur game.' (Yahi roz hota hai.)" },
  { emoji: "🏎️", title: "Backup Gamer", desc: "Jab Free Fire nahi chalta, Asphalt Legends pe dukh bhulata hai. Second love. First dukh." },
  { emoji: "📺🎵", title: "Off-Time Routine", desc: "Kabhi kabhi TV dekhta hai, gaane sunata hai. Matlab total 2 hobbies hain. Overachiever hai yaar 💀" },
  { emoji: "🎶", title: "Favorite Song", desc: "\"Bairan\" — loop pe chalti hai jab game pe full gussa ho jaata hai. Bairan = Free Fire bhi, life bhi. 🎵" },
  { emoji: "😡", title: "Gussa Specialist", desc: "Ek death = nuclear meltdown. Dono hands-free hain — ek phone pe, doosra Allah ke hawaale 💀" },
  { emoji: "🔫", title: "Weapon Connoisseur", desc: "Sniper 🎯, Shotgun 💥, Desert Eagle 🔫 — teen hathiyaar, zeher teen. Fir bhi mar jaata hai. Respect hai." },
  { emoji: "🩺", title: "Future Doc", desc: "Ek din orthopedic surgeon banega. Teri haddi todega aur khud jorega bhi. Literally Danger_Team. 🦴" },
  { emoji: "💀", title: "Zero Chill Bhai", desc: "Itna jaldi gussa aata hai ki game load hone se pehle hi angry ho jaata hai. Loading screen pe bhi rage quit." },
  { emoji: "🆔", title: "Free Fire ID", desc: "UID: 12695841391 — dhundh ke dekho. Live rage show free mein milega. No ticket needed. 🎪" },
  { emoji: "👤", title: "In-Game Name", desc: "Danger_Team. Danger: ✅ Team: ❌ (sab AFK hain usually). Accuracy alag hi level ka jugaad hai." },
  { emoji: "👶", title: "Guild Member", desc: "TM baby guild. 'Baby' bilkul sahi naam hai — crying bhi hota hai, tantrums bhi. But lovingly. 🤝" },
  { emoji: "🤣", title: "Dosti ka Style", desc: "Dost se milne ka andaaz: 'Abe tu bhi bekaar khelta hai.' Dost ka reply: '😭' (phir bhi saath khelte hain)." },
  { emoji: "🍬", title: "Mitha Mitha", desc: "Sweets se pyaar hai usse — zyada sweets khao, theek se khelo theory pe believe karta hai. Hover karo! 🎉", confetti: true },
  { emoji: "📭", title: "Email? Kaisa Email?", desc: "Koi email nahi hai. Zero. Game download karne ke liye baap ka Gmail use karta hai. Classic. 😂" },
  { emoji: "⛏️🎲", title: "Dream Games", desc: "Roblox aur Minecraft khelna chahta hai — lekin Free Fire se fursat milni chahiye na pehle. Kabhi nahi milti." },
  { emoji: "🚗", title: "Car Fan", desc: "Gaadi se zyada pyaar hai kisi cheez se nahi — Asphalt mein bhi gaadi, dreams mein bhi gaadi. Bhai fast hai. 🏎️💨" },
  { emoji: "😨", title: "Sabse Bada Dushman", desc: "Teri Maa — nahi nahi, USKI MAA. 100% fear. Baaki sab enemies toh kuch nahi. MAA = BOSS LEVEL. 👩🚨", scary: true },
];

function ConfettiParticle({ x, y }: { x: number; y: number }) {
  const colors = ["#ff0080", "#00ff88", "#ffff00", "#00ffff", "#ff8800"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-sm pointer-events-none"
      style={{ background: color, left: x, top: y, zIndex: 50 }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ x: (Math.random() - 0.5) * 120, y: (Math.random() - 0.5) * 120, opacity: 0, scale: 0, rotate: Math.random() * 360 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}

function FactCard({ fact, index }: { fact: typeof FACTS[0]; index: number }) {
  const [confetti, setConfetti] = useState<{ x: number; y: number }[]>([]);

  const handleHover = () => {
    if (fact.confetti) {
      const particles = Array.from({ length: 18 }, () => ({ x: 20 + Math.random() * 60, y: 20 + Math.random() * 60 }));
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
      style={{ boxShadow: fact.scary ? "0 0 15px hsl(var(--destructive) / 0.3)" : "0 0 10px hsl(var(--primary) / 0.1)" }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
        style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--secondary) / 0.05))" }}
      />
      {confetti.map((p, i) => <ConfettiParticle key={i} x={p.x} y={p.y} />)}
      <div className="relative z-10">
        <div className="text-3xl mb-2">{fact.emoji}</div>
        <h3 className="font-display text-xs uppercase text-primary mb-2 tracking-wide">{fact.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{fact.desc}</p>
      </div>
      {fact.scary && (
        <motion.div className="absolute top-2 right-2 text-lg" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🚨</motion.div>
      )}
    </motion.div>
  );
}

export default function About() {
  return (
    <section className="py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="font-display text-2xl sm:text-3xl uppercase text-foreground mb-2" style={{ textShadow: "0 0 20px hsl(var(--primary))" }}>
          😎 KON HAI AKSHAY? 😎
        </h2>
        <p className="text-muted-foreground text-sm font-mono">Rare specimen. Handle with extreme caution. 🧪</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FACTS.map((fact, i) => <FactCard key={i} fact={fact} index={i} />)}
      </div>
    </section>
  );
}
