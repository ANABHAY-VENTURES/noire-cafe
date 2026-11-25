import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="bg-ivory border-y border-espresso/10 relative overflow-hidden">
      {/* Background Subtle Grain Texture */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />

      {/* =========================================================================
          SECTION 1: OUR STORY
          ========================================================================= */}
      <div className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Subtitle Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-caramel" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-olive">
            01 / OUR PROVENANCE & DEVOTION
          </span>
        </div>

        {/* Oversized Headline */}
        <div className="pb-16 md:pb-24 border-b border-espresso/10">
          <h2
            data-reveal="heading"
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal text-espresso tracking-tight leading-[0.94]"
          >
            More than{' '}
            <span className="italic font-light text-caramel">just</span>{' '}
            a cup.
          </h2>
        </div>

        {/* Split-Screen Image & Text Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16 items-center">
          
          {/* Left Column: Large Asymmetrical Lifestyle Photography */}
          <div className="lg:col-span-6 relative">
            <div
              data-reveal="image-clip"
              className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-espresso/15 group bg-ivory-dark"
            >
              <img
                data-parallax
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85"
                alt="NOIRÉ barista slow-pouring filter coffee into ceramic vessel"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

              {/* Floating Lifestyle Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-ivory/95 backdrop-blur-md border border-espresso/10 text-espresso shadow-xl">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-olive mb-1">
                  <span>Slow Bar Ritual</span>
                  <span className="text-caramel font-semibold">93.5°C EXTRACTION</span>
                </div>
                <div className="font-serif text-base font-medium text-espresso">
                  Hand-crafted single-estate extractions, served at calm table pace.
                </div>
              </div>
            </div>

            {/* Overlapping Secondary Offset Card (Asymmetric Layering) */}
            <div className="relative -mt-16 -mr-4 ml-auto max-w-[240px] sm:max-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-ivory hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                alt="Tactile coffee cup with morning steam"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-espresso/25" />
              <div className="absolute bottom-3 left-3 text-[9px] font-mono text-ivory tracking-widest uppercase bg-espresso/80 px-2.5 py-1 rounded-full backdrop-blur-sm">
                HAND-TURNED STONEWARE
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text Composition */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-caramel font-semibold">
                <Compass className="w-3.5 h-3.5" />
                <span>BORN IN ZÜRICH · ROOTED IN SLOWNESS</span>
              </span>

              <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-espresso font-normal leading-snug">
                “At NOIRÉ, we believe coffee is more than a daily routine. It is a moment to pause, connect and enjoy the little things. Every cup is thoughtfully prepared, every detail matters, and every visit should feel special.”
              </p>

              <div className="text-sm sm:text-base text-espresso/75 space-y-4 leading-relaxed font-sans font-light">
                <p>
                  Specialty coffee begins long before water meets the grounds. It lives in the mountain soils of Boquete and Huila, in the shaded canopies where cherries ripen slowly over months, and in the hands of growers whose families have stewarded the earth across generations.
                </p>
                <p>
                  At NOIRÉ, our responsibility is preservation. We strip away artificial additives, rushed counter lines, and industrial machinery. Instead, we use gentle convective thermal roasting, custom remineralized spring water, and hand-thrown ceramicware that insulates heat and honors the drinker.
                </p>
              </div>
            </div>

            {/* Editorial Stats Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-espresso/10">
              <div className="space-y-1">
                <span className="font-serif text-3xl font-medium text-espresso">100%</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-olive block">Single-Estate Lots</span>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-3xl font-medium text-espresso">3.4x</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-olive block">Fair-Trade Benchmark</span>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-3xl font-medium text-espresso">0 dB</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-olive block">Acoustic Calm Target</span>
              </div>
            </div>

            {/* Founder Signature Line */}
            <div className="pt-4 flex items-center justify-between border-t border-espresso/5">
              <div>
                <div className="font-serif text-base italic text-espresso">Elias & Mia Vonderau</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-olive">Founders & Head Roasters</div>
              </div>
              <span className="font-serif text-3xl font-light text-espresso/30 italic">
                Noir&eacute;
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* =========================================================================
          SECTION 2: OUR PHILOSOPHY
          ========================================================================= */}
      <div className="py-24 md:py-36 px-6 md:px-12 bg-ivory-light border-t border-espresso/10 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-espresso/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-olive block mb-3">
                02 / THE NOIRÉ CODE
              </span>
              <h2
                data-reveal="heading"
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-espresso tracking-tight leading-tight"
              >
                Good coffee. Good company.{' '}
                <span className="italic font-light text-caramel block sm:inline">Good moments.</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-espresso/70 max-w-sm font-sans leading-relaxed">
              Three unyielding principles guiding every harvest we source, every bean we roast, and every guest we welcome.
            </p>
          </div>

          {/* Three Minimal Feature Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-16">
            
            {/* Block 01 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group p-8 rounded-2xl bg-ivory border border-espresso/10 hover:border-caramel/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-espresso/10 mb-6">
                  <span className="font-serif text-4xl sm:text-5xl font-light text-caramel group-hover:scale-105 transition-transform">
                    01
                  </span>
                  <div className="w-9 h-9 rounded-full bg-olive/15 flex items-center justify-center text-olive">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso mb-4 group-hover:text-caramel transition-colors">
                  Quality without compromise.
                </h3>

                <p className="text-xs sm:text-sm text-espresso/70 leading-relaxed font-sans font-light">
                  We purchase solely micro-lots scored above 88 points by certified Q-graders. Sourced transparently from single-estate agriculturalists at 3.4x the Fair Trade floor, safeguarding biodiversity and multi-generational farming dignity.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-espresso/5 flex items-center justify-between text-[11px] font-mono text-olive">
                <span>TERROIR SCORING</span>
                <span className="font-semibold text-espresso">88+ PTS MINIMUM</span>
              </div>
            </motion.div>

            {/* Block 02 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group p-8 rounded-2xl bg-ivory border border-espresso/10 hover:border-caramel/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-espresso/10 mb-6">
                  <span className="font-serif text-4xl sm:text-5xl font-light text-caramel group-hover:scale-105 transition-transform">
                    02
                  </span>
                  <div className="w-9 h-9 rounded-full bg-caramel/15 flex items-center justify-center text-caramel">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso mb-4 group-hover:text-caramel transition-colors">
                  Crafted with intention.
                </h3>

                <p className="text-xs sm:text-sm text-espresso/70 leading-relaxed font-sans font-light">
                  Roasting on zero-direct-scorching thermal convection air to protect volatile stone fruit acids. Pulling espresso on 9-bar saturated groupheads with 72 PPM remineralized mountain spring water, calculated to the exact tenth of a gram.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-espresso/5 flex items-center justify-between text-[11px] font-mono text-olive">
                <span>EXTRACTION PRECISION</span>
                <span className="font-semibold text-espresso">72 PPM · 93.5°C PID</span>
              </div>
            </motion.div>

            {/* Block 03 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group p-8 rounded-2xl bg-ivory border border-espresso/10 hover:border-caramel/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-espresso/10 mb-6">
                  <span className="font-serif text-4xl sm:text-5xl font-light text-caramel group-hover:scale-105 transition-transform">
                    03
                  </span>
                  <div className="w-9 h-9 rounded-full bg-espresso/10 flex items-center justify-center text-espresso">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso mb-4 group-hover:text-caramel transition-colors">
                  A space to slow down.
                </h3>

                <p className="text-xs sm:text-sm text-espresso/70 leading-relaxed font-sans font-light">
                  Acoustic calm designed with washed Swiss limestone, smoked alpine oak, and soft morning daylight. No loud sirens, no rushing queues—just a serene, unhurried space to read, converse, or simply exist.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-espresso/5 flex items-center justify-between text-[11px] font-mono text-olive">
                <span>ATMOSPHERE</span>
                <span className="font-semibold text-espresso">UNHURRIED SANCTUARY</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
