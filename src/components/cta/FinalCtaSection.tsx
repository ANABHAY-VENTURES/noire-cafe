import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';

interface FinalCtaSectionProps {
  onNavigateToVisit: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onNavigateToVisit }) => {
  return (
    <section className="relative min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden border-t border-espresso/15 bg-espresso text-ivory">
      {/* Full-Width Cinematic Café Photograph with Parallax */}
      <div className="absolute inset-0 z-0">
        <img
          data-parallax
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2200&q=85"
          alt="Atmospheric warm café roastery at NOIRÉ"
          className="w-full h-[125%] -top-[12%] object-cover object-center scale-105"
          loading="lazy"
        />
        {/* Editorial Tonal Tint & Gradients */}
        <div className="absolute inset-0 bg-espresso/70 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/80" />
      </div>

      {/* Central Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8 py-24">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory/10 backdrop-blur-md border border-ivory/20 text-caramel text-xs font-mono uppercase tracking-widest"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>YOUR DAILY CONTEMPLATION</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal text-ivory tracking-tight leading-[0.94]"
        >
          Make room for a{' '}
          <span className="italic font-light text-caramel">little</span>{' '}
          ritual.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-ivory/80 max-w-xl mx-auto font-sans font-light leading-relaxed"
        >
          A freshly dialed espresso, the scent of toasted brioche, and an hour to yourself. Our doors on Limmatquai await.
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
            className="group px-10 py-4 rounded-full bg-ivory text-espresso text-xs uppercase tracking-widest font-mono font-medium hover:bg-caramel hover:text-ivory transition-all duration-300 flex items-center gap-3 shadow-2xl"
          >
            <span>COME FIND US</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </motion.div>

      </div>

      {/* Subtle Frame Borders */}
      <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-ivory/40 border-t border-ivory/10 pt-4">
        <span>ZÜRICH · BAHNHOFSTRASSE & LIMMATQUAI</span>
        <span>OPEN DAILY FROM 07:30</span>
      </div>
    </section>
  );
};
