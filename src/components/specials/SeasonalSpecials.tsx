import React, { useState } from 'react';
import { SEASONAL_SPECIALS } from '../../data/coffeeData';
import { SeasonalSpecial, MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { Sparkles, Award } from 'lucide-react';

export const SeasonalSpecials: React.FC = () => {
  const { addToCart } = useCart();
  const [reservedSpecial, setReservedSpecial] = useState<string | null>(null);

  const handleReserve = (special: SeasonalSpecial) => {
    const specialAsMenuItem: MenuItem = {
      id: special.id,
      name: special.title,
      category: 'signature',
      description: special.description,
      price: special.price,
      priceInr: special.priceInr,
      notes: special.notes,
      image: special.image,
      badge: special.edition,
    };
    addToCart(specialAsMenuItem, 1);
    setReservedSpecial(special.id);
    setTimeout(() => setReservedSpecial(null), 3000);
  };

  return (
    <section id="specials" className="py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#0C0C0E] text-white border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-champagne mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>[04 // LIMITED CELLAR ARCHIVE]</span>
            </div>
            <h2 data-reveal="heading" className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Featured Seasonal Specials.
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/60 max-w-md font-sans font-light leading-relaxed">
            Reserved for discerning coffee palates. These rare micro-lots are procured in ultra-small quantities and served until the jar runs dry.
          </p>
        </div>

        {/* Featured Items Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12">
          {SEASONAL_SPECIALS.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-[#121214] border border-white/10 overflow-hidden hover:border-champagne/40 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black border-b border-white/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Floating Edition Tag */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-champagne text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/15">
                    {item.edition}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-champagne block">
                        {item.subtitle}
                      </span>
                      <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white">
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-mono text-2xl font-bold text-champagne">
                      {item.price}
                    </span>
                  </div>
                </div>

                {/* Description & Sensory Meters */}
                <div className="p-6 sm:p-8 space-y-6">
                  <p className="text-sm text-white/70 leading-relaxed font-sans font-light">
                    {item.description}
                  </p>

                  {/* Harvest Info */}
                  <div className="text-xs font-mono text-white/60 flex items-center gap-2">
                    <Award className="w-4 h-4 text-champagne" />
                    <span>{item.harvest}</span>
                  </div>

                  {/* Tasting notes */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.notes.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-mono uppercase tracking-wider"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={() => handleReserve(item)}
                  className="w-full py-4 rounded-full bg-white text-black text-xs font-mono uppercase tracking-widest font-bold hover:bg-champagne transition-all duration-300"
                >
                  {reservedSpecial === item.id ? 'Added to Order' : 'Order Seasonal Special'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
