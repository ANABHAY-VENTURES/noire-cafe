import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Compass, Sparkles } from 'lucide-react';
import { HERO_DATA } from '../../data/coffeeData';
import { MagneticButton } from '../common/MagneticButton';

interface HeroProps {
  onExploreMenu: () => void;
  onExploreStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onExploreStory }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 overflow-hidden bg-ivory">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />

      {/* Top Editorial Sub-bar */}
      <div className="relative max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 pb-6 border-b border-espresso/10">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-caramel" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-espresso/70">
            {HERO_DATA.location}
          </span>
          <span className="text-espresso/20">/</span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-olive">
            {HERO_DATA.established}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-espresso/60">
          <Sparkles className="w-3.5 h-3.5 text-caramel" />
          <span>Curated Single-Origin Extractions</span>
        </div>
      </div>

      {/* Main Hero Centerpiece */}
      <div className="relative max-w-7xl mx-auto w-full my-auto py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-olive/30 bg-olive/10 text-olive text-xs font-mono uppercase tracking-widest"
            >
              <span>Swiss Editorial Precision</span>
              <span>•</span>
              <span>Nordic Roast Philosophy</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-normal tracking-tight text-espresso leading-[0.96]"
            >
              Coffee.{' '}
              <span className="italic font-light text-caramel block sm:inline">Crafted</span>{' '}
              Slowly.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-espresso/80 font-normal leading-relaxed max-w-xl"
            >
              {HERO_DATA.subheading}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton
                onClick={onExploreMenu}
                className="px-7 py-3.5 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-medium hover:bg-caramel hover:shadow-lg transition-all duration-300"
              >
                Explore Menu
              </MagneticButton>

              <button
                onClick={onExploreStory}
                className="px-7 py-3.5 rounded-full border border-espresso/20 text-espresso text-xs uppercase tracking-widest font-medium hover:bg-ivory-dark/60 hover:border-espresso/40 transition-all duration-300 flex items-center gap-2 group"
              >
                <Compass className="w-3.5 h-3.5 text-caramel transition-transform group-hover:rotate-45" />
                <span>Discover Our Story</span>
              </button>
            </motion.div>
          </div>

          {/* Right Editorial Hero Image Card with Asymmetric Mask */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-espresso/10 group"
            >
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85"
                alt="Slow drip specialty coffee in a warm ceramic vessel at NOIRÉ"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                loading="eager"
              />

              {/* Editorial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent opacity-80" />

              {/* Floating Coffee Details Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-ivory/95 backdrop-blur-md border border-espresso/10 text-espresso shadow-lg">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-olive mb-1.5">
                  <span>Current Extraction</span>
                  <span className="font-semibold text-caramel">LOT #09 GEISHA</span>
                </div>
                <div className="font-serif text-lg font-medium text-espresso">
                  Finca Deborah · Nitrogen Cold Brew
                </div>
                <div className="text-xs text-espresso/70 mt-1 flex items-center gap-2">
                  <span>Jasmine</span>
                  <span>•</span>
                  <span>Bergamot</span>
                  <span>•</span>
                  <span>White Peach</span>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-espresso/80 backdrop-blur-sm text-ivory px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase border border-ivory/20">
                92 PTS CUP SCORE
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div className="relative max-w-7xl mx-auto w-full pt-6 border-t border-espresso/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {HERO_DATA.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className="space-y-1"
            >
              <div className="font-serif text-2xl md:text-3xl font-medium text-espresso tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-olive font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onExploreMenu}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-espresso/50 hover:text-caramel transition-colors group"
            aria-label="Scroll down to menu"
          >
            <span>Explore Slow Bar</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-caramel" />
          </button>
        </div>
      </div>
    </section>
  );
};
