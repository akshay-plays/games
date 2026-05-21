import { motion } from "framer-motion";

const SCHEDULE_TIMELINE = [
  { time: "Subah uthte hi", icon: "🎮", label: "Phone uthao, Free Fire kholo",       color: "hsl(var(--primary))" },
  { time: "Naste ke baad",  icon: "🍬", label: "Snacks khao, game continue",          color: "hsl(var(--secondary))" },
  { time: "School ke baad", icon: "📚", label: "Homework? Kal karlenge",               color: "#8b5cf6" },
  { time: "Raat 12 baje",   icon: "🎮", label: '"Ek aur game" — actually 4 aur game', color: "hsl(var(--destructive))" },
  { time: "Raat 1 baje",    icon: "💀", label: "Phone rakhna padta hai",               color: "#ff0055" },
];

const SCHEDULE_CARDS = [
  { time: "Shaam 5 baje",  icon: "🏎️", label: "Chalo khelne",  color: "hsl(var(--accent))" },
  { time: "Raat 8 baje",   icon: "📺", label: "TV Time!!",      color: "#ff8800" },
  { time: "Sone se pehle", icon: "🎵", label: "Aur Gaming",     color: "hsl(var(--secondary))" },
];

const XP_STATS = [
  { label: "Masti 🎮",        value: 98, color: "hsl(var(--primary))" },
  { label: "Gussa Level 😡",  value: 95, color: "hsl(var(--destructive))" },
  { label: "Padhai ka XP 📚", value: 3,  color: "#8b5cf6" },
];

export default function Interactive() {
  return (
    <section className="py-8 space-y-14">
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

        {/* Timeline entries */}
        <div className="relative mb-6">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-4">
            {SCHEDULE_TIMELINE.map((item, i) => (
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

        {/* Card-style entries */}
        <div className="grid grid-cols-3 gap-3">
          {SCHEDULE_CARDS.map((item, i) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative bg-card border border-border rounded-lg p-4 text-center overflow-hidden cursor-default"
              style={{ boxShadow: `0 0 12px ${item.color}22` }}
            >
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"
                style={{ background: `linear-gradient(135deg, ${item.color}0a, ${item.color}18)` }}
              />
              <div className="relative z-10">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-display text-xs uppercase mb-1 tracking-wide" style={{ color: item.color }}>{item.time}</h3>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
