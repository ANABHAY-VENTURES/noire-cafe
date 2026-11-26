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

    // Controlled progress over ~1.1 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 250);
          return 100;
        }
        const increment = prev < 50 ? 5 : 8;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  const letters = ['N', 'O', 'I', 'R', 'É'];

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100000] bg-[#0A0A0A] flex flex-col items-center justify-center p-6 select-none text-white"
        >
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-architectural-grid opacity-25 pointer-events-none" />

          {/* Central Monogram and Wordmark */}
          <div className="relative z-10 flex flex-col items-center space-y-6">
            
            {/* Monogram Seal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 h-14 rounded-full border border-champagne/40 bg-white/5 flex items-center justify-center relative"
            >
              <span className="font-serif text-2xl font-semibold text-champagne">N</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-champagne border-t-transparent"
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
                    duration: 0.45,
                    delay: 0.1 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-sans text-4xl sm:text-5xl font-bold tracking-[0.2em] text-white inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/50"
            >
              <span>ATELIER DE CAFÉ</span>
              <span className="text-champagne">•</span>
              <span>ZÜRICH</span>
            </motion.div>

            {/* Architectural Loading Bar */}
            <div className="w-48 sm:w-64 h-[1px] bg-white/10 rounded-full overflow-hidden relative mt-4">
              <motion.div
                className="h-full bg-champagne transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage */}
            <span className="text-[10px] font-mono text-champagne/80">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
