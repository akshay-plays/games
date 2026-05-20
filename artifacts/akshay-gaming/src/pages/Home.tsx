import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Interactive from "@/components/Interactive";
import FunnyStats from "@/components/FunnyStats";
import Achievements from "@/components/Achievements";
import BackgroundEffects from "@/components/BackgroundEffects";
import { Volume2, VolumeX } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [motherAlert, setMotherAlert] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Simulate loading screen
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (motherAlert) {
      document.documentElement.classList.add("mother-alert-mode");
    } else {
      document.documentElement.classList.remove("mother-alert-mode");
    }
  }, [motherAlert]);

  const triggerShake = () => {
    setShakeKey(prev => prev + 1);
  };

  const toggleMusic = () => {
    setMusicOn(!musicOn);
    // Real implementation would play audio here
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
              ? { 
                  x: [0, -20, 20, -20, 20, -10, 10, -5, 5, 0], 
                  y: [0, -15, 15, -15, 15, -10, 10, -5, 5, 0] 
                } 
              : {}
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative z-10 w-full"
        >
          {motherAlert ? (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
              <h1 className="text-4xl font-serif mb-8">Studying Very Seriously 📚</h1>
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full border border-gray-200">
                <h2 className="text-xl font-bold mb-4">Biology 101: The Skeletal System</h2>
                <p className="mb-4">As a future orthopedic surgeon, I am diligently studying the human skeleton.</p>
                <div className="h-4 bg-gray-200 rounded overflow-hidden mb-8">
                  <div className="h-full bg-blue-500 w-[85%]"></div>
                </div>
                <button 
                  onClick={() => setMotherAlert(false)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
                >
                  Mom Left Room
                </button>
              </div>
            </div>
          ) : (
            <>
              <BackgroundEffects />
              <button 
                onClick={toggleMusic}
                className="fixed top-4 right-4 z-50 bg-card/80 backdrop-blur-sm p-3 rounded-full border border-border neon-border-secondary text-secondary hover:bg-secondary/20 transition-colors"
                aria-label="Toggle Music"
              >
                {musicOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </button>

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
                <p>Built with pure rage 😤 for Akshay Yadav.</p>
                <p className="text-xs mt-2 opacity-50">Please don't tell his mom.</p>
              </footer>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
