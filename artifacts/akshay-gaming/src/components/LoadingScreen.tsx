import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random jumps for gaming feel
        return Math.min(100, p + Math.floor(Math.random() * 15) + 2);
      });
    }, 150);

    return () => clearInterval(interval);
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
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-primary border-r-secondary border-b-accent border-l-destructive rounded-full mb-8"
        />
        
        <h1 className="font-display text-primary text-xl md:text-2xl mb-6 neon-text-primary uppercase">
          Booting Akshay.exe...
        </h1>
        
        <div className="w-full h-6 bg-card border border-primary/50 p-1 rounded-sm relative overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 text-xs font-mono text-muted-foreground flex justify-between w-full">
          <span>{progress}%</span>
          <span>Loading Rage Modules...</span>
        </div>
      </div>
    </motion.div>
  );
}
