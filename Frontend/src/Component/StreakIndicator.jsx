// components/StreakIndicator.js
import { useEffect, useState, useMemo } from "react";
import { FaFire } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const StreakIndicator = () => {
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [randomEmoji, setRandomEmoji] = useState("💪");
  const [burstKey, setBurstKey] = useState(0);
  const [funWord, setFunWord] = useState("Push!");

  const encouragementEmojis = useMemo(
    () => ["💪", "🔥", "🚀", "⭐", "🎯", "🏆"],
    []
  );
  const funWords = useMemo(
    () => ["Push!", "Smash!", "Hustle", "Go!", "Grind", "Crush!"],
    []
  );

  useEffect(() => {
    const updateStreak = async () => {
      try {
        const res = await axios.put("/api/users/update-streak");
        setStreak(res.data.streak);
      } catch (err) {
        console.error("Error updating streak:", err);
      } finally {
        setIsLoading(false);
      }
    };
    updateStreak();
  }, []);

  useEffect(() => {
    if (streak > 0 && streak % 5 === 0) {
      toast.success(`🔥 ${streak}-day streak! Keep it going!`);
    }
  }, [streak]);

  useEffect(() => {
    if (streak === 0) {
      const interval = setInterval(() => {
        const index = Math.floor(Math.random() * encouragementEmojis.length);
        setRandomEmoji(encouragementEmojis[index]);
        setFunWord(funWords[index]);
        setBurstKey((prev) => prev + 1); // refresh animation
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [streak, encouragementEmojis, funWords]);

  if (isLoading) return null;

  return (
    <div className="flex items-center gap-2 ml-4 relative">
      {streak > 0 ? (
        <>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-green-500"
          >
            <FaFire className="text-xl" />
          </motion.div>
          <span className="font-medium text-green-600">{streak}</span>
        </>
      ) : (
        <div className="relative flex items-center justify-center w-10 h-10">
          {/* Emoji */}
          <AnimatePresence mode="wait">
            <motion.div
              key={randomEmoji}
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl z-10"
            >
              {randomEmoji}
            </motion.div>
          </AnimatePresence>

          {/* ⬇️ Down Word Pop */}
          <AnimatePresence mode="wait">
            <motion.div
              key={funWord}
              initial={{ opacity: 0, y: -10, scale: 0.5 }}
              animate={{ opacity: 1, y: 35, scale: 1.1 }}
              exit={{ opacity: 0, y: 60, scale: 0.3 }}
              transition={{ duration: 0.6 }}
              className="absolute text-green-600 font-bold text-sm"
            >
              {funWord}
            </motion.div>
          </AnimatePresence>

          {/* 💥 Burst particles */}
          <AnimatePresence>
            <motion.div
              key={burstKey}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-green-400 rounded-full"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((i / 6) * 2 * Math.PI) * 18,
                    y: Math.sin((i / 6) * 2 * Math.PI) * 18,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.05 * i,
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default StreakIndicator;
