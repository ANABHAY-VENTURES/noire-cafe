import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="bg-[#0C0C0E] text-white border-y border-white/10 relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-architectural-grid opacity-25 pointer-events-none" />

      {/* =========================================================================
          SECTION 1: OUR STORY
          ========================================================================= */}
      <div className="py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Subtitle Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">
            [01 // PROVENANCE & DEVOTION]
          </span>
        </div>

        {/* Oversized Headline */}
        <div className="pb-16 md:pb-24 border-b border-white/10">
          <h2
            data-reveal="heading"
            className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight leading-[0.94]"
          >
            More than{' '}
            <span className="font-serif italic font-light text-champagne">just</span>{' '}
            a cup.
          </h2>
        </div>

        {/* Split-Screen Image & Text Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16 items-center">
          
          {/* Left Column: Asymmetrical Photography */}
          <div className="lg:col-span-6 relative">
            <div
              data-reveal="image-clip"
              className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 group bg-[#141416]"
            >
              <img
                data-parallax
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85"
                alt="NOIRÉ barista slow-pouring filter coffee into ceramic vessel"
                className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              {/* Floating Lifestyle Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#16161A]/90 backdrop-blur-xl border border-white/15 text-white shadow-2xl">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-champagne mb-1">
                  <span>SLOW EXTRACTION RITUAL</span>
                  <span className="font-semibold text-white">93.5°C EXTRACTION</span>
                </div>
                <div className="font-serif text-base font-normal text-white">
                  Hand-crafted single-estate extractions, served at calm table pace.
                </div>
              </div>
            </div>

            {/* Overlapping Secondary Card */}
            <div className="relative -mt-16 -mr-4 ml-auto max-w-[240px] sm:max-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20 hidden md:block bg-[#16161A]">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                alt="Tactile coffee cup with morning steam"
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 hover:scale-105 hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-3 left-3 text-[9px] font-mono text-white tracking-widest uppercase bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                HAND-TURNED STONEWARE
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text Composition */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-champagne font-semibold">
                <Compass className="w-3.5 h-3.5" />
                <span>BORN IN ZÜRICH · ROOTED IN SLOWNESS</span>
              </span>

              <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-light leading-snug">
                “At NOIRÉ, coffee is an architectural experience of time. A calibrated pause in the rapid cadence of everyday life, honoring the farmers and the water.”
              </p>

              <div className="text-sm sm:text-base text-white/70 space-y-4 leading-relaxed font-sans font-light">
                <p>
                  Specialty coffee begins long before heat meets water. It lives in the high mountain terroir of Boquete and Huila, where cherries mature slowly beneath native canopy shade, hand-gathered at optimal brix density.
                </p>
                <p>
                  Our commitment is precision and preservation: gentle convective roasting, balanced Swiss spring water minerals, and tactile ceramic stoneware designed to hold aroma and sensory balance.
                </p>
              </div>
            </div>

            {/* Editorial Stats Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="space-y-1">
                <span className="font-mono text-3xl font-bold text-white">100%</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">Single-Estate Lots</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-3xl font-bold text-champagne">3.4x</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">Fair-Trade Floor</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-3xl font-bold text-white">0 dB</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">Acoustic Calm</span>
              </div>
            </div>

            {/* Founder Signature Line */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <div>
                <div className="font-serif text-base italic text-white">Elias & Mia Vonderau</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">Founders & Head Roasters</div>
              </div>
              <span className="font-serif text-3xl font-light text-white/20 italic">
                Noir&eacute;
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* =========================================================================
          SECTION 2: OUR PHILOSOPHY
          ========================================================================= */}
      <div className="py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#09090B] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-champagne block mb-3">
                [02 // PHILOSOPHICAL FOUNDATIONS]
              </span>
              <h2
                data-reveal="heading"
                className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight"
              >
                Purity. Purpose.{' '}
                <span className="font-serif italic font-light text-champagne block sm:inline">Stillness.</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-white/60 max-w-sm font-sans font-light leading-relaxed">
              Three uncompromising pillars guiding every harvest we source, every bean we roast, and every guest we welcome.
            </p>
          </div>

          {/* Three Minimal Feature Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-16">
            
            {/* Block 01 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group p-8 rounded-2xl bg-[#121214] border border-white/10 hover:border-champagne/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-light text-champagne">
                    [01]
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-champagne">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-champagne transition-colors">
                  Quality without compromise.
                </h3>

                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans font-light">
                  We purchase solely micro-lots scored above 88 points by certified Q-graders. Sourced transparently from single-estate agriculturalists at 3.4x the Fair Trade floor, safeguarding biodiversity and farming dignity.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                <span>TERROIR SCORING</span>
                <span className="font-semibold text-champagne">88+ PTS MINIMUM</span>
              </div>
            </motion.div>

            {/* Block 02 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group p-8 rounded-2xl bg-[#121214] border border-white/10 hover:border-champagne/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-light text-champagne">
                    [02]
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-champagne">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-champagne transition-colors">
                  Crafted with intention.
                </h3>

                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans font-light">
                  Roasting on zero-direct-scorching thermal convection air to protect volatile stone fruit acids. Pulling espresso on 9-bar saturated groupheads with 72 PPM remineralized mountain spring water.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                <span>EXTRACTION PRECISION</span>
                <span className="font-semibold text-champagne">72 PPM · 93.5°C PID</span>
              </div>
            </motion.div>

            {/* Block 03 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group p-8 rounded-2xl bg-[#121214] border border-white/10 hover:border-champagne/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-light text-champagne">
                    [03]
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-champagne">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-champagne transition-colors">
                  A space to slow down.
                </h3>

                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans font-light">
                  Acoustic calm designed with washed Swiss limestone, smoked alpine oak, and soft morning daylight. No loud sirens, no rushing queues—just a serene, unhurried space to read, converse, or simply exist.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                <span>ATMOSPHERE</span>
                <span className="font-semibold text-champagne">UNHURRIED SANCTUARY</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
