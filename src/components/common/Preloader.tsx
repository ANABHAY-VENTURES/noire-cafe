import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    // Controlled, elegant progress over ~1.3 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        // Accelerate smoothly
        const increment = prev < 60 ? 4 : 6;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const letters = ['N', 'O', 'I', 'R', 'É'];

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100000] bg-ivory flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />

          {/* Central Monogram and Wordmark */}
          <div className="relative z-10 flex flex-col items-center space-y-6">
            
            {/* Monogram Seal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 h-14 rounded-full border border-espresso/25 flex items-center justify-center relative"
            >
              <span className="font-serif text-2xl font-semibold text-espresso">N</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-caramel/40 border-t-transparent"
              />
            </motion.div>

            {/* Letter-by-Letter Reveal */}
            <div className="flex items-center gap-2 overflow-hidden">
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-espresso inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-olive"
            >
              <span>Coffee</span>
              <span className="text-caramel">•</span>
              <span>Crafted Slowly</span>
            </motion.div>

            {/* Animated Loading Bar */}
            <div className="w-48 sm:w-56 h-[1.5px] bg-espresso/10 rounded-full overflow-hidden mt-4 relative">
              <motion.div
                className="h-full bg-caramel rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] font-mono text-espresso/40"
            >
              {progress}%
            </motion.span>

          </div>

          {/* Bottom Ambient Tag */}
          <div className="absolute bottom-8 text-[9px] font-mono uppercase tracking-widest text-espresso/30">
            ZÜRICH · LEVEL 01 · 8001
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
