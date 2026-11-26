import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Terminal } from 'lucide-react';
import { HERO_DATA } from '../../data/coffeeData';
import { MagneticButton } from '../common/MagneticButton';

interface HeroProps {
  onExploreMenu: () => void;
  onExploreStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onExploreStory }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 md:px-12 overflow-hidden bg-[#0A0A0A] text-white">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />

      {/* Top Architectural Telemetry Bar */}
      <div className="relative max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70">
            [ZÜRICH 47.3769° N, 8.5417° E] // ATELIER NOIRÉ
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-champagne">
            {HERO_DATA.established}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span>MICRO-LOT ARCHIVES & CONVECTIVE ROASTING</span>
        </div>
      </div>

      {/* Main Centerpiece */}
      <div className="relative max-w-7xl mx-auto w-full my-auto py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-champagne text-[11px] font-mono uppercase tracking-[0.2em]"
            >
              <Terminal className="w-3 h-3 text-champagne" />
              <span>EDITION 2026 // HARVEST 09</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-sans text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[0.95]"
            >
              Calibrated <br />
              <span className="font-serif italic font-light text-champagne">Extraction.</span> <br />
              Architectural Calm.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-base sm:text-lg text-white/70 font-sans font-light leading-relaxed max-w-xl"
            >
              A dialogue between precision thermal roasting, Nordic clarity, and sensory stillness. Single-estate harvests presented in their purest state at our Limmatquai sanctuary.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              <MagneticButton
                onClick={onExploreMenu}
                className="px-7 py-3.5 rounded-full bg-champagne text-black text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-white hover:shadow-[0_0_25px_rgba(197,168,128,0.4)] transition-all duration-300"
              >
                Explore Menu [→]
              </MagneticButton>

              <button
                onClick={onExploreStory}
                className="px-7 py-3.5 rounded-full border border-white/20 text-white text-xs font-mono uppercase tracking-[0.2em] font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center gap-2 group"
              >
                <Compass className="w-3.5 h-3.5 text-champagne transition-transform group-hover:rotate-45" />
                <span>Monograph & Philosophy</span>
              </button>
            </motion.div>
          </div>

          {/* Right Photographic Visual with Architectural Crosshairs */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 group shadow-2xl bg-[#141416]"
            >
              {/* Corner crosshairs for architectural aesthetic */}
              <div className="absolute top-3 left-3 z-20 text-champagne/60 font-mono text-xs">+</div>
              <div className="absolute top-3 right-3 z-20 text-champagne/60 font-mono text-xs">+</div>
              <div className="absolute bottom-3 left-3 z-20 text-champagne/60 font-mono text-xs">+</div>
              <div className="absolute bottom-3 right-3 z-20 text-champagne/60 font-mono text-xs">+</div>

              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85"
                alt="Slow drip specialty coffee in a warm ceramic vessel at NOIRÉ"
                className="w-full h-full object-cover object-center grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                loading="eager"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Floating Extraction Specs Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#16161A]/90 backdrop-blur-xl border border-white/15 text-white shadow-2xl">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-champagne mb-1">
                  <span>EXTRACTION TELEMETRY</span>
                  <span className="font-bold">92.5 PTS CUP</span>
                </div>
                <div className="font-serif text-lg font-normal text-white">
                  Panama Geisha · Nitrogen Immersion
                </div>
                <div className="text-[11px] font-mono text-white/60 mt-1 flex items-center gap-2">
                  <span>Jasmine</span>
                  <span>/</span>
                  <span>Bergamot</span>
                  <span>/</span>
                  <span>White Peach</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-champagne px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase border border-champagne/30">
                DAILY RELEASE
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom Metrics Ticker */}
      <div className="relative max-w-7xl mx-auto w-full pt-6 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {HERO_DATA.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              className="space-y-1 group"
            >
              <div className="font-sans text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-champagne transition-colors">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
