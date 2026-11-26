import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, MapPin, Compass } from 'lucide-react';

interface ExperienceSectionProps {
  onNavigateToVisit?: () => void;
}

interface CraftCard {
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  details: string;
  image: string;
  alt: string;
}

const CRAFT_CARDS: CraftCard[] = [
  {
    number: '01',
    tag: 'TERROIR & BOTANY',
    title: 'The Beans',
    subtitle: 'High-Elevation Shaded Canopy',
    description: 'Procured solely from single-estate farms situated between 1,800m and 2,200m in Boquete, Huila, and Gedeb.',
    details: 'Hand-picked at peak brix sugar density, fermented slowly in cool mountain ambient air.',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=1000&q=80',
    alt: 'Freshly harvested specialty coffee beans drying on raised beds',
  },
  {
    number: '02',
    tag: 'THERMAL MASTERY',
    title: 'The Process',
    subtitle: 'Convective Heat & Nordic Profile',
    description: 'We roast exclusively with recirculated thermal air on a single-pass Loring convection roaster.',
    details: 'Zero direct scorching flame protects delicate jasmine florals and bright malic fruit acids.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    alt: 'Artisan coffee roasting process with golden roasted beans',
  },
  {
    number: '03',
    tag: 'SLOW EXTRACTION',
    title: 'The Brew',
    subtitle: 'Calibrated Water & Ceramic Flatbeds',
    description: 'Extracted using structured 72 PPM reverse-osmosis water reconstructed with precise mineral salts.',
    details: 'Slow-poured over custom ceramic drippers at 93.5°C down to the tenth of a gram.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
    alt: 'Slow pour over extraction dripping through ceramic dripper',
  },
  {
    number: '04',
    tag: 'SENSORY RITUAL',
    title: 'The Moment',
    subtitle: 'Stoneware & Unhurried Stillness',
    description: 'Served in hand-turned Swiss stoneware vessels designed to preserve temperature and aroma.',
    details: 'A deliberate pause in your day: notes of white peach, bergamot blossom, and dark cocoa.',
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=1000&q=80',
    alt: 'Quiet coffee cup and open book in morning sunlight',
  },
];

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onNavigateToVisit }) => {
  const handleScrollToVisit = () => {
    if (onNavigateToVisit) {
      onNavigateToVisit();
    } else {
      const visitEl = document.getElementById('visit');
      if (visitEl) {
        visitEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="experience" className="bg-[#09090B] text-white relative overflow-hidden border-t border-white/10">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-architectural-grid opacity-20 pointer-events-none" />

      {/* =========================================================================
          SECTION 3: THE CRAFT
          ========================================================================= */}
      <div className="py-24 md:py-36 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-champagne mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>[03 // THE EXTRACTION SEQUENCE]</span>
            </div>
            <h2
              data-reveal="heading"
              className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
            >
              The Art Behind Every Cup.
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/60 max-w-md font-sans font-light leading-relaxed">
            Four disciplined milestones transforming high-altitude coffee cherries into a sublime sensory moment.
          </p>
        </div>

        {/* Four Photographic Storytelling Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16">
          {CRAFT_CARDS.map((card, idx) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group rounded-2xl bg-[#121214] border border-white/10 overflow-hidden hover:border-champagne/40 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Visual Photography with Subtle Hover Zoom */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-black">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                  {/* Number Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-black/80 backdrop-blur-md text-champagne px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase border border-white/15">
                    PHASE [{card.number}]
                  </div>

                  <div className="absolute bottom-3 left-3 text-[9px] font-mono uppercase tracking-[0.2em] text-white/70">
                    {card.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-2.5">
                  <h3 className="font-sans text-xl font-bold text-white group-hover:text-champagne transition-colors">
                    {card.title}
                  </h3>

                  <div className="text-[11px] font-mono text-champagne">
                    {card.subtitle}
                  </div>

                  <p className="text-xs text-white/60 leading-relaxed font-sans font-light">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Detail */}
              <div className="p-6 pt-0">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono text-white/50 leading-relaxed">
                  {card.details}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* =========================================================================
          SECTION 4: EXPERIENCE (Cinematic Full-Width Atmospheric Hero)
          ========================================================================= */}
      <div className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden border-t border-white/10">
        
        {/* Full-Width Cinematic Café Interior Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <img
            data-parallax
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2000&q=85"
            alt="Cinematic calm interior of NOIRÉ Café Zürich"
            className="w-full h-[120%] -top-[10%] object-cover object-center scale-105 grayscale contrast-125"
            loading="lazy"
          />
          {/* Editorial Gradient & Tonal Tint */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        </div>

        {/* Central Overlay Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center space-y-8 py-20">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-champagne text-[11px] font-mono uppercase tracking-[0.25em]"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>[04 // THE ARCHITECTURAL SANCTUARY]</span>
          </motion.div>

          {/* Large Overlay Typography */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight leading-[0.95]"
          >
            Stay a{' '}
            <span className="font-serif italic font-light text-champagne">little</span>{' '}
            longer.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-white/70 max-w-xl mx-auto font-sans font-light leading-relaxed"
          >
            Whether you stop by for a dialed single-origin espresso or spend the afternoon reading beside natural light, our doors are open for quiet reflection and sensory calm.
          </motion.p>

          {/* Minimal CTA Linking to Visit Us */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={handleScrollToVisit}
              className="group px-8 py-4 rounded-full bg-white text-black text-xs font-mono uppercase tracking-widest font-semibold hover:bg-champagne transition-all duration-300 flex items-center gap-2.5 shadow-2xl"
            >
              <MapPin className="w-3.5 h-3.5 text-black" />
              <span>Visit Us in Zürich</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>

        </div>

        {/* Bottom Ambient Coordinates Bar */}
        <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[9px] font-mono uppercase tracking-widest text-white/40 border-t border-white/10 pt-4">
          <span>BAHNHOFSTRASSE 42 · 8001 ZÜRICH</span>
          <span>ACOUSTIC LOW-DB ARCHITECTURE</span>
        </div>

      </div>
    </section>
  );
};
