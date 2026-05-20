import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BOOT_MESSAGES = [
  "Loading Rage Modules... 😤",
  "Importing Gussa.dll... 😡",
  "Connecting to Free Fire servers... 🔫",
  "Calibrating Sniper Aim (still bad)... 🎯",
  "Hiding from Maa... 🤫",
  "Stocking up on sweets... 🍬",
  "Setting up Danger_Team profile... 😎",
  "Almost ready, bhai ruk! ⏳",
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, p + Math.floor(Math.random() * 15) + 2);
      });
    }, 150);

    const msgInterval = setInterval(() => {
      setMsgIndex(i => (i + 1) % BOOT_MESSAGES.length);
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
    };
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="w-full max-w-sm px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          className="text-7xl mb-6 select-none"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [-5, 5, -5],
            filter: [
              "drop-shadow(0 0 10px hsl(var(--primary)))",
              "drop-shadow(0 0 30px hsl(var(--secondary)))",
              "drop-shadow(0 0 10px hsl(var(--primary)))",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          😎
        </motion.div>

        <h1 className="font-display text-primary text-xl md:text-2xl mb-2 neon-text-primary uppercase">
          Booting Akshay.exe...
        </h1>
        <p className="text-xs text-muted-foreground font-mono mb-6 italic">
          Ek second bhai, aa raha hu...
        </p>

        <div className="w-full h-6 bg-card border border-primary/50 p-1 rounded-sm relative overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <div className="mt-3 text-xs font-mono text-muted-foreground flex justify-between w-full">
          <span className="text-primary font-bold">{progress}%</span>
          <motion.span
            key={msgIndex}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {BOOT_MESSAGES[msgIndex]}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
