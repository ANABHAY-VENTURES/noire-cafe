import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';

interface FinalCtaSectionProps {
  onNavigateToVisit: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onNavigateToVisit }) => {
  return (
    <section className="relative min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden border-t border-white/10 bg-[#0A0A0A] text-white">
      {/* Full-Width Cinematic Café Photograph with Parallax */}
      <div className="absolute inset-0 z-0">
        <img
          data-parallax
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2200&q=85"
          alt="Atmospheric warm café roastery at NOIRÉ"
          className="w-full h-[125%] -top-[12%] object-cover object-center scale-105 grayscale contrast-125"
          loading="lazy"
        />
        {/* Dark Editorial Gradient */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/90" />
      </div>

      {/* Central Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center space-y-8 py-24">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-champagne text-[11px] font-mono uppercase tracking-[0.25em]"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>[DAILY CONTEMPLATION]</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight leading-[0.94]"
        >
          Make room for a{' '}
          <span className="font-serif italic font-light text-champagne">little</span>{' '}
          ritual.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg text-white/70 max-w-xl mx-auto font-sans font-light leading-relaxed"
        >
          A freshly dialed espresso, the scent of toasted cardamom brioche, and an unhurried hour to yourself. Our doors on Limmatquai await.
        </motion.p>

        {/* Minimal COME FIND US Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="pt-4 flex justify-center"
        >
          <MagneticButton
            onClick={onNavigateToVisit}
            className="group px-10 py-4 rounded-full bg-white text-black text-xs font-mono uppercase tracking-widest font-bold hover:bg-champagne transition-all duration-300 flex items-center gap-3 shadow-2xl"
          >
            <span>COME FIND US</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </motion.div>

      </div>

      {/* Frame Borders */}
      <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-white/40 border-t border-white/10 pt-4">
        <span>ZÜRICH · BAHNHOFSTRASSE & LIMMATQUAI</span>
        <span>OPEN DAILY FROM 07:30</span>
      </div>
    </section>
  );
};
