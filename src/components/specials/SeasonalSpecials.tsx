import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SEASONAL_SPECIALS } from '../../data/coffeeData';
import { SeasonalSpecial, MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { Sparkles, Check, Award, Plus } from 'lucide-react';

export const SeasonalSpecials: React.FC = () => {
  const { addToCart, items: cartItems } = useCart();
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

  const getQuantityInCart = (id: string) => {
    const found = cartItems.find((ci) => ci.product.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <section id="specials" className="py-24 md:py-36 px-6 md:px-12 bg-ivory-light border-y border-espresso/5 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-espresso/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-caramel mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04 / Limited Cellar Release</span>
            </div>
            <h2 data-reveal="heading" className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-espresso tracking-tight">
              Featured Seasonal Specials.
            </h2>
          </div>
          <p className="text-sm md:text-base text-espresso/70 max-w-md font-sans leading-relaxed">
            Reserved for discerning coffee palates. These rare micro-lots are procured in ultra-small quantities and served until the jar runs dry.
          </p>
        </div>

        {/* Featured Items Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-12">
          {SEASONAL_SPECIALS.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-ivory border border-espresso/10 overflow-hidden shadow-lg hover:shadow-2xl hover:border-caramel/40 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-ivory-dark">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
                  
                  {/* Floating Edition Tag */}
                  <div className="absolute top-4 left-4 bg-espresso/90 text-ivory text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border border-ivory/20">
                    {item.edition}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-caramel block">
                        {item.subtitle}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ivory">
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-serif text-2xl font-medium text-caramel">
                      {item.price}
                    </span>
                  </div>
                </div>

                {/* Description & Sensory Meters */}
                <div className="p-6 sm:p-8 space-y-6">
                  <p className="text-sm text-espresso/80 leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {/* Harvest Info */}
                  <div className="text-xs font-mono text-olive flex items-center gap-2">
                    <Award className="w-4 h-4 text-caramel" />
                    <span>{item.harvest}</span>
                  </div>

                  {/* Tasting Note Pills */}
                  <div className="flex flex-wrap gap-2">
                    {item.notes.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1 rounded-full bg-ivory-dark text-espresso/90 text-xs font-mono"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Sensory Profile Bars */}
                  <div className="p-4 rounded-xl bg-ivory-light border border-espresso/5 space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-espresso/60 block">
                      Sensory Profile Calibration
                    </span>

                    <div className="space-y-2 text-xs font-mono">
                      <div>
                        <div className="flex justify-between mb-1 text-espresso/80">
                          <span>Vibrant Acidity</span>
                          <span>{item.flavorProfile.acidity}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-espresso/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.flavorProfile.acidity}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-olive rounded-full"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 text-espresso/80">
                          <span>Honeyed Sweetness</span>
                          <span>{item.flavorProfile.sweetness}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-espresso/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.flavorProfile.sweetness}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-caramel rounded-full"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 text-espresso/80">
                          <span>Silky Tactile Body</span>
                          <span>{item.flavorProfile.body}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-espresso/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.flavorProfile.body}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-espresso rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                <button
                  onClick={() => handleReserve(item)}
                  className={`w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    getQuantityInCart(item.id) > 0 || reservedSpecial === item.id
                      ? 'bg-olive text-ivory'
                      : 'bg-espresso text-ivory hover:bg-caramel'
                  }`}
                >
                  {reservedSpecial === item.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Order</span>
                    </>
                  ) : getQuantityInCart(item.id) > 0 ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>In Order ({getQuantityInCart(item.id)})</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Reserve A Tasting Cup ({item.price})</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
