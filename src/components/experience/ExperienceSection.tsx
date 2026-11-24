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
    <section id="experience" className="bg-espresso text-ivory relative overflow-hidden">
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />

      {/* =========================================================================
          SECTION 3: THE CRAFT
          ========================================================================= */}
      <div className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-ivory/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-caramel mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03 / THE CRAFT SEQUENCE</span>
            </div>
            <h2
              data-reveal="heading"
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-ivory tracking-tight"
            >
              From Terroir to Cup.
            </h2>
          </div>
          <p className="text-sm md:text-base text-ivory/70 max-w-md font-sans leading-relaxed">
            Four disciplined milestones that transform high-altitude coffee cherries into a sublime sensory moment.
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
              className="group rounded-2xl bg-ivory/5 border border-ivory/10 overflow-hidden hover:border-caramel/40 hover:bg-ivory/10 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Visual Photography with Image Zoom Transition */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-espresso/80">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                  {/* Number Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-espresso/80 backdrop-blur-sm text-caramel px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border border-ivory/10">
                    PHASE {card.number}
                  </div>

                  <div className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-widest text-olive-light">
                    {card.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-2xl font-medium text-ivory group-hover:text-caramel transition-colors">
                    {card.title}
                  </h3>

                  <div className="text-xs font-mono text-caramel/90">
                    {card.subtitle}
                  </div>

                  <p className="text-xs text-ivory/75 leading-relaxed font-sans font-light">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Detail */}
              <div className="p-6 pt-0">
                <div className="p-3 rounded-xl bg-ivory/5 border border-ivory/10 text-[11px] font-mono text-ivory/60 leading-relaxed">
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
      <div className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden border-t border-ivory/15">
        
        {/* Full-Width Cinematic Café Interior Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <img
            data-parallax
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2000&q=85"
            alt="Cinematic calm interior of NOIRÉ Café Zürich"
            className="w-full h-[120%] -top-[10%] object-cover object-center scale-105"
            loading="lazy"
          />
          {/* Editorial Gradient & Tonal Tint */}
          <div className="absolute inset-0 bg-espresso/65 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-espresso/80" />
        </div>

        {/* Central Overlay Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8 py-20">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory/10 backdrop-blur-md border border-ivory/20 text-caramel text-xs font-mono uppercase tracking-widest"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>04 / THE SANCTUARY</span>
          </motion.div>

          {/* Large Overlay Typography */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal text-ivory tracking-tight leading-[0.95]"
          >
            Stay a{' '}
            <span className="italic font-light text-caramel">little</span>{' '}
            longer.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-ivory/80 max-w-xl mx-auto font-sans font-light leading-relaxed"
          >
            Whether you stop by for a morning espresso or sink into a reading corner for three hours, our doors are open for quiet reflection and shared moments.
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
              className="group px-8 py-4 rounded-full bg-ivory text-espresso text-xs uppercase tracking-widest font-medium hover:bg-caramel hover:text-ivory transition-all duration-300 flex items-center gap-2.5 shadow-2xl"
            >
              <MapPin className="w-3.5 h-3.5 text-caramel group-hover:text-ivory transition-colors" />
              <span>Visit Us in Zürich</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>

        </div>

        {/* Bottom Ambient Coordinates Bar */}
        <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-widest text-ivory/50 border-t border-ivory/10 pt-4">
          <span>BAHNHOFSTRASSE 42 · 8001 ZÜRICH</span>
          <span>ACOUSTIC LOW-DB COMFORT</span>
        </div>

      </div>
    </section>
  );
};
