import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HelpPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 8000); // hide after 8s

    const interval = setInterval(() => {
      setShowPrompt(true);
      setTimeout(() => setShowPrompt(false), 8000);
    }, 30000); // show every 30s

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-24 right-6 bg-green-100 border border-green-400 text-green-800 text-sm px-4 py-2 rounded-xl shadow-lg z-50 max-w-xs"
        >
          👋 Need help? Click the chatbot in the corner!
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HelpPrompt;
