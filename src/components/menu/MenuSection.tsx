import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/coffeeData';
import { MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { ArrowUpRight, X, Check, Plus, ArrowRight } from 'lucide-react';

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
    setOrderNotice(`Added ${item.name} to your order.`);
    setTimeout(() => setOrderNotice(null), 3000);
  };

  const getQuantityInCart = (id: string) => {
    const found = cartItems.find((ci) => ci.product.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <section id="menu" className="py-24 md:py-36 px-6 md:px-12 bg-ivory relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-espresso/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-olive block mb-2">
              02 / The Curated Offerings
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-espresso tracking-tight">
              Explore Our Menu.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <p className="text-sm md:text-base text-espresso/70 max-w-xs font-sans leading-relaxed">
              Every beverage is calibrated to order with single-origin micro-lots roasted in small batches.
            </p>
            {onViewFullMenu && (
              <button
                onClick={onViewFullMenu}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-mono hover:bg-caramel transition-colors shrink-0 group"
              >
                <span>Full Menu</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-8 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-espresso text-ivory shadow-md'
                    : 'bg-ivory-dark/50 text-espresso/80 hover:bg-ivory-dark hover:text-espresso'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Notification */}
        {orderNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-xl bg-olive/15 border border-olive/30 text-espresso text-xs font-mono flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-olive" />
              <span>{orderNotice}</span>
            </div>
            <button onClick={() => setOrderNotice(null)} className="text-espresso/60 hover:text-espresso">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Product Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                  className="group relative rounded-2xl bg-ivory-light border border-espresso/10 p-6 flex flex-col justify-between hover:border-caramel/40 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-ivory-dark">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
                      
                      {item.badge && (
                        <span className="absolute top-3 left-3 bg-espresso/80 backdrop-blur-sm text-ivory px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase">
                          {item.badge}
                        </span>
                      )}

                      {item.temperature && (
                        <span className="absolute top-3 right-3 bg-ivory/90 backdrop-blur-sm text-espresso px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider">
                          {item.temperature}
                        </span>
                      )}
                    </div>

                    {/* Header & Price */}
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="font-serif text-xl font-medium text-espresso group-hover:text-caramel transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-serif text-lg font-medium text-caramel shrink-0">
                        {item.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-espresso/70 leading-relaxed font-sans mb-4">
                      {item.description}
                    </p>

                    {/* Origin & Elevation */}
                    {item.origin && (
                      <div className="flex items-center gap-3 text-[11px] font-mono text-olive mb-4">
                        <span>{item.origin}</span>
                        {item.elevation && (
                          <>
                            <span>•</span>
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
                          className="px-2.5 py-1 rounded-md bg-ivory-dark/60 text-espresso/80 text-[10px] font-mono uppercase tracking-wider"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 border-t border-espresso/5 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-xs uppercase tracking-wider font-mono text-espresso/70 hover:text-espresso flex items-center gap-1 group/btn"
                    >
                      <span>Extraction Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <button
                      onClick={(e) => handleOrder(item, e)}
                      className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-wider font-medium transition-all ${
                        qtyInCart > 0
                          ? 'bg-olive text-ivory'
                          : 'bg-espresso text-ivory hover:bg-caramel'
                      }`}
                    >
                      {qtyInCart > 0 ? `In Order (${qtyInCart})` : 'Add to Order'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Bottom Banner */}
        {onViewFullMenu && (
          <div className="mt-12 p-8 rounded-2xl bg-ivory-light border border-espresso/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-caramel">
                FULL SPECIALTY CATALOG
              </span>
              <h3 className="font-serif text-2xl font-medium text-espresso">
                Over 20 curated extractions, cold brews, and fresh bakery specialties.
              </h3>
            </div>
            <button
              onClick={onViewFullMenu}
              className="px-8 py-3.5 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-medium hover:bg-caramel transition-colors flex items-center gap-2 shadow-md shrink-0"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-ivory rounded-2xl p-6 sm:p-8 shadow-2xl border border-espresso/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-ivory-dark text-espresso hover:bg-espresso hover:text-ivory transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="aspect-square rounded-xl overflow-hidden bg-ivory-dark">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-olive bg-olive/15 px-3 py-1 rounded-full">
                    {selectedItem.category.toUpperCase()} · RESERVE SPEC
                  </span>

                  <h3 className="font-serif text-2xl font-medium text-espresso">
                    {selectedItem.name}
                  </h3>

                  <div className="font-serif text-xl text-caramel font-medium">
                    {selectedItem.price}
                  </div>

                  <p className="text-xs text-espresso/70 leading-relaxed font-sans">
                    {selectedItem.description}
                  </p>

                  <div className="space-y-2 py-3 border-y border-espresso/10 text-xs font-mono">
                    {selectedItem.origin && (
                      <div className="flex justify-between">
                        <span className="text-espresso/60">Origin</span>
                        <span className="text-espresso">{selectedItem.origin}</span>
                      </div>
                    )}
                    {selectedItem.process && (
                      <div className="flex justify-between">
                        <span className="text-espresso/60">Processing</span>
                        <span className="text-espresso">{selectedItem.process}</span>
                      </div>
                    )}
                    {selectedItem.elevation && (
                      <div className="flex justify-between">
                        <span className="text-espresso/60">Elevation</span>
                        <span className="text-espresso">{selectedItem.elevation}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-espresso/60">Recommended Cup</span>
                      <span className="text-espresso">Swiss Stoneware 180ml</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleOrder(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="w-full py-3 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-medium hover:bg-caramel transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Order ({selectedItem.price})</span>
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
