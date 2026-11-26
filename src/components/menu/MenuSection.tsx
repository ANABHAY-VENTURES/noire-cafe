import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/coffeeData';
import { MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { ArrowUpRight, X, Check, ArrowRight } from 'lucide-react';

interface MenuSectionProps {
  onViewFullMenu?: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onViewFullMenu }) => {
  const { addToCart, items: cartItems } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [orderNotice, setOrderNotice] = useState<string | null>(null);

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS.slice(0, 6)
    : MENU_ITEMS.filter((item) => item.category === activeCategory).slice(0, 6);

  const handleOrder = (item: MenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(item, 1);
    setOrderNotice(`Added ${item.name} to order.`);
    setTimeout(() => setOrderNotice(null), 3000);
  };

  const getQuantityInCart = (id: string) => {
    const found = cartItems.find((ci) => ci.product.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <section id="menu" className="py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-white relative border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-champagne block mb-2">
              [02 // CURATED EXTRACTIONS]
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Explore Our Menu.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <p className="text-sm text-white/60 max-w-xs font-sans font-light leading-relaxed">
              Every single beverage is calibrated to order with single-origin micro-lots roasted in small batches.
            </p>
            {onViewFullMenu && (
              <button
                onClick={onViewFullMenu}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono uppercase tracking-widest font-semibold hover:bg-champagne transition-colors shrink-0 group"
              >
                <span>Full Archive</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-8 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-widest whitespace-nowrap transition-all duration-300 border ${
                  isActive
                    ? 'bg-white text-black border-white font-bold shadow-lg'
                    : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Notice */}
        {orderNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-xl bg-champagne/15 border border-champagne/30 text-champagne text-xs font-mono flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-champagne" />
              <span>{orderNotice}</span>
            </div>
            <button onClick={() => setOrderNotice(null)} className="text-white/60 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Product Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => {
              const qtyInCart = getQuantityInCart(item.id);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedItem(item)}
                  className="group relative rounded-2xl bg-[#121214] border border-white/10 p-6 flex flex-col justify-between hover:border-champagne/50 hover:bg-[#16161A] transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Visual Image & Badges */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-black border border-white/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {item.badge && (
                        <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-champagne px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase border border-white/10">
                          {item.badge}
                        </span>
                      )}

                      {item.temperature && (
                        <span className="absolute top-3 right-3 bg-white/10 backdrop-blur-md text-white/90 px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider border border-white/10">
                          {item.temperature}
                        </span>
                      )}
                    </div>

                    {/* Header & Price */}
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="font-sans text-xl font-bold text-white group-hover:text-champagne transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-mono text-lg font-bold text-champagne shrink-0">
                        {item.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-white/60 leading-relaxed font-sans font-light mb-4">
                      {item.description}
                    </p>

                    {/* Origin & Elevation */}
                    {item.origin && (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-white/50 mb-4">
                        <span>{item.origin}</span>
                        {item.elevation && (
                          <>
                            <span>/</span>
                            <span>{item.elevation}</span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Tasting Notes */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.notes.map((note) => (
                        <span
                          key={note}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-white/70 text-[9px] font-mono uppercase tracking-wider"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-[11px] uppercase tracking-wider font-mono text-white/60 hover:text-white flex items-center gap-1 group/btn"
                    >
                      <span>Telemetry</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <button
                      onClick={(e) => handleOrder(item, e)}
                      className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold transition-all ${
                        qtyInCart > 0
                          ? 'bg-champagne text-black'
                          : 'bg-white text-black hover:bg-champagne'
                      }`}
                    >
                      {qtyInCart > 0 ? `In Order (${qtyInCart})` : 'Order Item'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Bottom Banner */}
        {onViewFullMenu && (
          <div className="mt-12 p-8 rounded-2xl bg-[#121214] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-champagne">
                ATELIER ARCHIVES
              </span>
              <h3 className="font-sans text-2xl font-bold text-white">
                Over 20 curated extractions, cold brews, and seasonal roasts.
              </h3>
            </div>
            <button
              onClick={onViewFullMenu}
              className="px-7 py-3.5 rounded-full bg-white text-black text-xs font-mono uppercase tracking-widest font-semibold hover:bg-champagne transition-colors flex items-center gap-2 shadow-lg shrink-0"
            >
              <span>Explore Complete Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141416] border border-white/15 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-champagne">
                    {selectedItem.category} // {selectedItem.temperature || 'SERVED CALM'}
                  </span>
                  <h3 className="font-sans text-3xl font-bold text-white mt-1">
                    {selectedItem.name}
                  </h3>
                  <div className="text-xl font-mono text-champagne font-bold mt-1">
                    {selectedItem.price}
                  </div>
                </div>

                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-white/10">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm text-white/70 leading-relaxed font-sans font-light">
                  {selectedItem.description}
                </p>

                {selectedItem.process && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 font-mono">
                    PROCESS: {selectedItem.process} {selectedItem.elevation ? `· ELEVATION: ${selectedItem.elevation}` : ''}
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      handleOrder(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="w-full py-4 rounded-full bg-champagne text-black text-xs font-mono uppercase tracking-widest font-bold hover:bg-white transition-colors"
                  >
                    Add to Cart ({selectedItem.price})
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
