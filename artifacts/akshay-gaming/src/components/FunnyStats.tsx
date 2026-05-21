import { motion } from "framer-motion";

const ANGER_TRIGGERS = [
  { label: "Baat nhi sunrhe",                       value: 55,  color: "#ff8800" },
  { label: "Game mai mar gaya",                      value: 70,  color: "#ff4400" },
  { label: "Enemy had speed hack",                   value: 85,  color: "hsl(var(--destructive))" },
  { label: "Kisine mummy ko complain kardi",         value: 75,  color: "#ff3300" },
  { label: "Missed sniper at 2m range",              value: 60,  color: "#ff6600" },
  { label: "Banda amne tha aur disturb kardiya!!",   value: 100, color: "#ff0000" },
];

export default function FunnyStats() {
  return (
    <section className="py-8 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2
          className="font-display text-xl sm:text-2xl uppercase text-center mb-8"
          style={{ color: "hsl(var(--destructive))", textShadow: "0 0 20px hsl(var(--destructive))" }}
        >
          😡 Akshay Ko Gussa Kab aata hai? 😡
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
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="bg-card border border-border rounded-xl p-6">
          <h2
            className="font-display text-base sm:text-lg uppercase mb-4 text-center whitespace-nowrap"
            style={{ color: "#00ff88", textShadow: "0 0 15px #00ff88" }}
          >
            😷 FUTURE SURGEON 😷
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>Plans to become an <span className="text-foreground font-bold">orthopedic surgeon</span> 🦴</p>
            <p>Will fix your broken bones with the same calm energy he has during Free Fire matches.</p>
            <p className="italic opacity-75">— "Sir, your patient is dying!"</p>
            <p className="italic" style={{ color: "hsl(var(--destructive))" }}>— "AREE RUK JA SAMNE BANDA HAI!!"</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
