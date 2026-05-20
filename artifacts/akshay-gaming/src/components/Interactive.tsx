import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RAGE_QUOTES = [
  "WHY IS EVERYONE CAMPING?! 🤬",
  "MY WIFI IS FINE THE GAME IS BROKEN! 😤",
  "THIS SNIPER IS TRASH! 🔫💀",
  "REPORTED. REPORTED. REPORTED. 🚨",
  "I QUIT. (rejoins 10 seconds later) 😭",
  "THAT WAS NOT A VALID HIT! 💀",
  "I HATE THIS GAME 🔥 (still plays 8 hrs)",
  "WHY DID MY TEAMMATE PUSH ALONE?! 😡",
];

const SCHEDULE = [
  { time: "9 AM", icon: "🎮", label: "Free Fire", color: "hsl(var(--primary))" },
  { time: "12 PM", icon: "🍬", label: "Sweets break", color: "hsl(var(--secondary))" },
  { time: "1 PM", icon: "🎮", label: "More Free Fire", color: "hsl(var(--primary))" },
  { time: "4 PM", icon: "🏎️", label: "Asphalt Legends", color: "hsl(var(--accent))" },
  { time: "6 PM", icon: "📺", label: "TV time", color: "#8b5cf6" },
  { time: "8 PM", icon: "🎵", label: "Bairan on repeat", color: "hsl(var(--secondary))" },
  { time: "10 PM", icon: "🔁", label: "Repeat from 9 AM", color: "hsl(var(--destructive))" },
];

const XP_STATS = [
  { label: "Free Fire Hours", value: 98, color: "hsl(var(--primary))" },
  { label: "Rage Level", value: 95, color: "hsl(var(--destructive))" },
  { label: "Asphalt Hours", value: 45, color: "hsl(var(--accent))" },
  { label: "Study Hours", value: 3, color: "#8b5cf6" },
  { label: "Sweets Eaten", value: 88, color: "hsl(var(--secondary))" },
  { label: "Mom Fear Level", value: 100, color: "#ff00ff" },
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="font-display text-2xl sm:text-3xl uppercase mb-2"
          style={{ textShadow: "0 0 20px hsl(var(--destructive))", color: "hsl(var(--destructive))" }}>
          😤 RAGE CONTROL CENTER 😤
        </h2>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <motion.button
          whileHover={{ scale: 1.06, boxShadow: "0 0 40px hsl(var(--destructive))" }}
          whileTap={{ scale: 0.92 }}
          onClick={handleRage}
          className="relative px-10 py-6 rounded-xl font-display text-lg uppercase tracking-wide text-white transition-all"
          style={{
            background: "linear-gradient(135deg, hsl(var(--destructive)), #cc0000)",
            boxShadow: "0 0 20px hsl(var(--destructive) / 0.6), inset 0 0 20px rgba(255,255,255,0.05)",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block mr-2 text-2xl"
          >😤</motion.span>
          RAGE BUTTON
          <div className="text-xs mt-1 font-mono opacity-75">Clicks: {rageClicks}</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.06, boxShadow: "0 0 30px #ff8800" }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setMotherAlert(!motherAlert)}
          className="relative px-8 py-6 rounded-xl font-display text-lg uppercase tracking-wide text-white transition-all"
          style={{
            background: "linear-gradient(135deg, #cc6600, #884400)",
            boxShadow: "0 0 20px rgba(255, 136, 0, 0.5)",
          }}
        >
          <span className="text-2xl mr-2">🚨👩</span>
          MOTHER ALERT<br />
          <span className="text-xs font-mono opacity-75">MODE {motherAlert ? "ON 🔒" : "OFF"}</span>
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

      <div>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-xl uppercase text-center mb-6"
          style={{ color: "hsl(var(--secondary))", textShadow: "0 0 15px hsl(var(--secondary))" }}
        >
          ⚡ AKSHAY'S STATS ⚡
        </motion.h3>
        <div className="space-y-4">
          {XP_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-muted-foreground">{stat.label}</span>
                <span style={{ color: stat.color }}>{stat.value}%</span>
              </div>
              <div className="w-full h-5 bg-card border border-border rounded-sm overflow-hidden">
                <motion.div
                  className="h-full rounded-sm"
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

      <div>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-xl uppercase text-center mb-6"
          style={{ color: "hsl(var(--accent))", textShadow: "0 0 15px hsl(var(--accent))" }}
        >
          🗓️ DAILY SCHEDULE 🗓️
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
                transition={{ delay: i * 0.1 }}
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
                  <div className="flex items-center justify-between">
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
