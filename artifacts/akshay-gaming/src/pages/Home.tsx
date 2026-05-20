import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Interactive from "@/components/Interactive";
import FunnyStats from "@/components/FunnyStats";
import Achievements from "@/components/Achievements";
import BackgroundEffects from "@/components/BackgroundEffects";
import { useGameMusic } from "@/hooks/useGameMusic";

function MusicButton({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-label="Toggle Music"
      className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-2 rounded-full border border-border transition-colors"
      style={on ? { borderColor: "hsl(var(--secondary))", boxShadow: "0 0 12px hsl(var(--secondary) / 0.5)" } : {}}
    >
      {on ? (
        <span className="flex items-end gap-[3px] h-5">
          {[1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full"
              style={{ background: "hsl(var(--secondary))" }}
              animate={{ height: ["4px", `${8 + i * 4}px`, "4px"] }}
              transition={{ duration: 0.4 + i * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
            />
          ))}
        </span>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
      <span className="text-xs font-display hidden sm:inline" style={on ? { color: "hsl(var(--secondary))" } : { color: "hsl(var(--muted-foreground))" }}>
        {on ? "♪ BAIRAN" : "MUTE"}
      </span>
    </motion.button>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [motherAlert, setMotherAlert] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const { start, stop } = useGameMusic();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const handleFirstInteraction = () => {
        start();
        setMusicOn(true);
        document.removeEventListener("click", handleFirstInteraction);
        document.removeEventListener("touchstart", handleFirstInteraction);
      };
      document.addEventListener("click", handleFirstInteraction);
      document.addEventListener("touchstart", handleFirstInteraction);
      return () => {
        document.removeEventListener("click", handleFirstInteraction);
        document.removeEventListener("touchstart", handleFirstInteraction);
      };
    }
  }, [loading, start]);

  useEffect(() => {
    if (motherAlert) {
      document.documentElement.classList.add("mother-alert-mode");
      stop();
    } else {
      document.documentElement.classList.remove("mother-alert-mode");
      if (musicOn) start();
    }
  }, [motherAlert]);

  const triggerShake = () => setShakeKey(prev => prev + 1);

  const toggleMusic = () => {
    if (musicOn) {
      stop();
      setMusicOn(false);
    } else {
      start();
      setMusicOn(true);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-background text-foreground font-sans">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          key={shakeKey}
          initial={{ x: 0, y: 0 }}
          animate={
            shakeKey > 0
              ? { x: [0, -20, 20, -20, 20, -10, 10, -5, 5, 0], y: [0, -15, 15, -15, 15, -10, 10, -5, 5, 0] }
              : {}
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative z-10 w-full"
        >
          {motherAlert ? (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
              <h1 className="text-4xl font-serif mb-2">Studying Very Seriously 📚</h1>
              <p className="text-sm text-gray-500 mb-8 italic">Maa aa gayi... act normal act normal act normal</p>
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full border border-gray-200">
                <h2 className="text-xl font-bold mb-4">Biology 101: The Skeletal System</h2>
                <p className="mb-2">As a future orthopedic surgeon, I am diligently studying the human skeleton.</p>
                <p className="text-xs text-gray-400 mb-4 italic">(Free Fire tab is hidden. Nothing suspicious here.)</p>
                <div className="h-4 bg-gray-200 rounded overflow-hidden mb-8">
                  <div className="h-full bg-blue-500 w-[85%]"></div>
                </div>
                <button
                  onClick={() => setMotherAlert(false)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
                >
                  Maa chali gayi, wapas aao 🎮
                </button>
              </div>
            </div>
          ) : (
            <>
              <BackgroundEffects />
              <MusicButton on={musicOn} onClick={toggleMusic} />

              <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-24 relative z-10">
                <Hero onShake={triggerShake} />
                <About />
                <Interactive
                  onShake={triggerShake}
                  motherAlert={motherAlert}
                  setMotherAlert={setMotherAlert}
                />
                <FunnyStats />
                <Achievements />
              </main>

              <footer className="w-full py-8 text-center text-muted-foreground border-t border-border mt-20">
                <p>Pure gusse ke saath banaya gaya 😤 — Akshay Yadav ke liye.</p>
                <p className="text-xs mt-2 opacity-50">Maa ko mat batana. 🤫</p>
              </footer>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
