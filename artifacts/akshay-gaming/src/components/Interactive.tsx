import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RAGE_QUOTES = [
  "YE KAUNSA GAME HAI BHAI, MERA PHONE TODUNGA!! 🤬",
  "WIFI THEEK HAI, GAME BEKAR HAI — FINAL ANSWER! 📡",
  "EK CLUTCH CHAHIYE THA, EK!! BUT NAHI MILTI!! 💀",
  "REPORTED. REPORTED. REPORTED. REPORTED. (loop) 🚨",
  "GAME CHOD RAHA HU. (5 second baad wapas aata hai) 😤",
  "BHAI YE SNIPER CROOKED HAI, PAKKA! 🔫",
  "TEAMMATES BRAIN NAHI HAI — CERTIFIED! 🧠❌",
  "MUMMY KI KASAM BADLA LUNGA!! 😡🔥",
];

const SCHEDULE = [
  { time: "Subah uthte hi",    icon: "🎮", label: "Phone uthao, Free Fire kholo",           color: "hsl(var(--primary))" },
  { time: "Naste ke baad",     icon: "🍬", label: "Mitha khao, game continue",               color: "hsl(var(--secondary))" },
  { time: "School ke baad",    icon: "📚", label: "Homework? Kal karna hai",                  color: "#8b5cf6" },
  { time: "Shaam 5 baje",      icon: "🏎️", label: "Asphalt race time",                        color: "hsl(var(--accent))" },
  { time: "Raat 8 baje",       icon: "📺", label: "Mummy ki zaroorat se TV dekhna 😑",        color: "#ff8800" },
  { time: "Sone se pehle",     icon: "🎵", label: "Bairan loop pe (aankh band nahi hoti)",    color: "hsl(var(--secondary))" },
  { time: "Raat 12 baje",      icon: "🎮", label: '"Ek aur game" — actually 4 aur game',      color: "hsl(var(--destructive))" },
  { time: "Raat 2 baje",       icon: "💀", label: "Phone rakhna padta hai (reluctantly)",     color: "#ff0055" },
];

const XP_STATS = [
  { label: "Masti 🎮",         value: 98, color: "hsl(var(--primary))" },
  { label: "Gussa Level 😡",   value: 95, color: "hsl(var(--destructive))" },
  { label: "Padhai ka XP 📚",  value: 3,  color: "#8b5cf6" },
];

export default function Interactive({
  onShake,
  motherAlert,
  setMotherAlert,
}: {
  onShake: () => void;
  motherAlert: boolean;
  setMotherAlert: (v: boolean) => void;
}) {
  const [rageQuote, setRageQuote] = useState("");
  const [rageClicks, setRageClicks] = useState(0);

  const handleRage = () => {
    const count = rageClicks + 1;
    setRageClicks(count);
    setRageQuote(RAGE_QUOTES[count % RAGE_QUOTES.length]);
    onShake();
  };

  return (
    <section className="py-8 space-y-14">
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <motion.button
          whileHover={{ scale: 1.06, boxShadow: "0 0 40px hsl(var(--destructive))" }}
          whileTap={{ scale: 0.92 }}
          onClick={handleRage}
          className="relative px-10 py-6 rounded-xl font-display text-lg uppercase tracking-wide text-white transition-all"
          style={{ background: "linear-gradient(135deg, hsl(var(--destructive)), #cc0000)", boxShadow: "0 0 20px hsl(var(--destructive) / 0.6)" }}
          data-testid="button-rage"
        >
          <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="inline-block mr-2 text-2xl">😤</motion.span>
          GUSSA BUTTON
          <div className="text-xs mt-1 font-mono opacity-75">Dabaya: {rageClicks} baar</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.06, boxShadow: "0 0 30px #ff8800" }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setMotherAlert(!motherAlert)}
          className="relative px-8 py-6 rounded-xl font-display text-lg uppercase tracking-wide text-white transition-all"
          style={{ background: "linear-gradient(135deg, #cc6600, #884400)", boxShadow: "0 0 20px rgba(255,136,0,0.5)" }}
          data-testid="button-mother-alert"
        >
          <span className="text-2xl mr-2">🚨👩</span>
          MUMMY AA GAYI!<br />
          <span className="text-xs font-mono opacity-75">Mode: {motherAlert ? "ON — Padh raha hu 📚" : "OFF — Game on hai"}</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {rageQuote && (
          <motion.div
            key={rageQuote}
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center p-4 rounded-lg border border-destructive/50 font-display text-sm uppercase"
            style={{ background: "hsl(var(--destructive) / 0.1)", color: "hsl(var(--destructive))", textShadow: "0 0 10px hsl(var(--destructive))" }}
          >
            {rageQuote}
          </motion.div>
        )}
      </AnimatePresence>

      {/* XP Stats */}
      <div>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-base sm:text-xl uppercase text-center mb-6 whitespace-nowrap"
          style={{ color: "hsl(var(--secondary))", textShadow: "0 0 15px hsl(var(--secondary))" }}
        >
          ⚡ AKSHAY KE STATS ⚡
        </motion.h3>
        <div className="space-y-4">
          {XP_STATS.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-muted-foreground">{stat.label}</span>
                <span style={{ color: stat.color }}>{stat.value}%</span>
              </div>
              <div className="w-full h-5 bg-card border border-border rounded-sm overflow-hidden">
                <motion.div className="h-full rounded-sm"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                  style={{ background: stat.color, boxShadow: `0 0 8px ${stat.color}` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Daily Routine */}
      <div>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-xl uppercase text-center mb-6"
          style={{ color: "hsl(var(--accent))", textShadow: "0 0 15px hsl(var(--accent))" }}
        >
          🗓️ AKSHAY KA DAILY ROUTINE 🗓️
        </motion.h3>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-4">
            {SCHEDULE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative flex items-center gap-4 pl-16"
              >
                <motion.div
                  className="absolute left-4 w-8 h-8 rounded-full flex items-center justify-center text-lg border-2"
                  style={{ borderColor: item.color, background: `${item.color}20`, boxShadow: `0 0 12px ${item.color}` }}
                  animate={{ boxShadow: [`0 0 8px ${item.color}`, `0 0 20px ${item.color}`, `0 0 8px ${item.color}`] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {item.icon}
                </motion.div>
                <div className="bg-card border border-border rounded-lg px-4 py-2 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="font-display text-xs" style={{ color: item.color }}>{item.time}</span>
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
