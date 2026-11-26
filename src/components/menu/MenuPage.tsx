import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/coffeeData';
import { MenuItem, MenuCategoryType } from '../../types';
import { useCart } from '../../context/CartContext';
import { 
  ArrowUpRight, 
  Check, 
  Search, 
  Sparkles, 
  SlidersHorizontal,
  X,
  ArrowLeft
} from 'lucide-react';

interface MenuPageProps {
  onBackToHome?: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onBackToHome }) => {
  const { addToCart, items: cartItems } = useCart();
  const [activeCategory, setActiveCategory] = useState<MenuCategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemperature, setSelectedTemperature] = useState<'all' | 'Hot' | 'Iced'>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.notes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTemp = 
        selectedTemperature === 'all' || 
        item.temperature === selectedTemperature || 
        item.temperature === 'Both' ||
        !item.temperature;

      return matchesCategory && matchesSearch && matchesTemp;
    });
  }, [activeCategory, searchQuery, selectedTemperature]);

  const handleAddToCart = (item: MenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(item, 1);
    setAddedItemNotice(item.name);
    setTimeout(() => setAddedItemNotice(null), 2500);
  };

  const getQuantityInCart = (id: string) => {
    const found = cartItems.find((ci) => ci.product.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-28 pb-24 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-architectural-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Back Navigation Pill */}
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="mb-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-champagne transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Return to Sanctuary</span>
          </button>
        )}

        {/* Editorial Menu Header */}
        <header className="pb-12 border-b border-white/10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-champagne text-[10px] font-mono uppercase tracking-widest mb-3">
                <Sparkles className="w-3 h-3" />
                <span>[01 // COMPLETE HARVEST ARCHIVE]</span>
              </div>
              <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
                The Curated Menu.
              </h1>
            </div>

            <p className="text-sm md:text-base text-white/60 max-w-md font-sans font-light leading-relaxed">
              Every extraction is dialed to order using remineralized 72 PPM water and single-origin micro-lots roasted in small batches. All prices inclusive of hospitality taxes.
            </p>
          </div>

          {/* Editorial Specs Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-[10px] font-mono text-white/50 border-t border-white/10">
            <div>
              <span className="text-champagne block">WATER PROFILE</span>
              <span className="text-white font-semibold">72 PPM · 93.5°C Stability</span>
            </div>
            <div>
              <span className="text-champagne block">EXTRACTION RATIOS</span>
              <span className="text-white font-semibold">1:1.8 Espresso · 1:16.2 Filter</span>
            </div>
            <div>
              <span className="text-champagne block">DAIRY PARTNERSHIP</span>
              <span className="text-white font-semibold">Pasture Whole & Oatly Barista</span>
            </div>
            <div>
              <span className="text-champagne block">CURRENCY</span>
              <span className="text-champagne font-semibold">INR (₹) Hospitality Pricing</span>
            </div>
          </div>
        </header>

        {/* Filter & Search Bar */}
        <div className="py-8 space-y-6">
          {/* Category Navigation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as MenuCategoryType)}
                  className={`px-5 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-widest whitespace-nowrap transition-all duration-300 border ${
                    isActive
                      ? 'bg-white text-black border-white font-bold shadow-md'
                      : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Temperature Sub-Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes (e.g. Cardamom, Jasmine, Valrhona)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-champagne font-sans transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Temperature Pills */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" />
                <span>Temp:</span>
              </span>
              {(['all', 'Hot', 'Iced'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTemperature(t)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all border ${
                    selectedTemperature === t
                      ? 'bg-champagne text-black border-champagne font-bold'
                      : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {t === 'all' ? 'All' : t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notification Toast */}
        <AnimatePresence>
          {addedItemNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed bottom-8 right-8 z-50 p-4 rounded-xl bg-black text-white text-xs font-mono flex items-center gap-3 shadow-2xl border border-champagne/40"
            >
              <div className="w-5 h-5 rounded-full bg-champagne flex items-center justify-center text-black">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Added <strong>{addedItemNotice}</strong> to your order.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Responsive Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => {
              const qtyInCart = getQuantityInCart(item.id);
              const isTall = item.span === 'tall';
              const isWide = item.span === 'wide';

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative rounded-2xl bg-[#121214] border border-white/10 p-5 flex flex-col justify-between hover:border-champagne/40 hover:bg-[#16161A] transition-all duration-300 cursor-pointer ${
                    isWide ? 'md:col-span-2' : ''
                  }`}
                >
                  <div>
                    {/* Visual Photography */}
                    <div
                      className={`relative rounded-xl overflow-hidden mb-5 bg-black border border-white/5 ${
                        isTall ? 'aspect-[4/4.5]' : isWide ? 'aspect-[21/10]' : 'aspect-[16/11]'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {item.badge && (
                          <span className="bg-black/85 backdrop-blur-sm text-champagne px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase border border-white/15">
                            {item.badge}
                          </span>
                        )}
                        {item.temperature && (
                          <span className="bg-white/10 backdrop-blur-sm text-white/90 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider border border-white/10">
                            {item.temperature}
                          </span>
                        )}
                      </div>

                      {/* Origin overlay */}
                      {item.origin && (
                        <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/80">
                          {item.origin}
                        </div>
                      )}
                    </div>

                    {/* Category metadata */}
                    <div className="text-[9px] font-mono uppercase tracking-widest text-champagne mb-1">
                      {item.category.replace('-', ' & ')}
                    </div>

                    {/* Name & INR Price */}
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <h3 className="font-sans text-lg font-bold text-white group-hover:text-champagne transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-mono text-base font-bold text-champagne shrink-0">
                        {item.price}
                      </span>
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed font-sans font-light mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Flavor Notes */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.notes.map((note) => (
                        <span
                          key={note}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/70 text-[9px] font-mono uppercase tracking-wider"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-[10px] uppercase tracking-wider font-mono text-white/50 hover:text-white flex items-center gap-1 group/btn"
                    >
                      <span>Telemetry</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold transition-all ${
                        qtyInCart > 0
                          ? 'bg-champagne text-black'
                          : 'bg-white text-black hover:bg-champagne'
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

        {/* Modal */}
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
                className="bg-[#141416] border border-white/15 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-5">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-champagne">
                      {selectedItem.category} // {selectedItem.temperature || 'SERVED CALM'}
                    </span>
                    <h3 className="font-sans text-2xl font-bold text-white mt-1">
                      {selectedItem.name}
                    </h3>
                    <div className="text-xl font-mono text-champagne font-bold mt-1">
                      {selectedItem.price} (₹{selectedItem.priceInr})
                    </div>
                  </div>

                  <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-white/10">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                    {selectedItem.description}
                  </p>

                  {selectedItem.process && (
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/60 font-mono">
                      PROCESS: {selectedItem.process} {selectedItem.elevation ? `· ELEVATION: ${selectedItem.elevation}` : ''}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      handleAddToCart(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="w-full py-4 rounded-full bg-champagne text-black text-xs font-mono uppercase tracking-widest font-bold hover:bg-white transition-colors"
                  >
                    Add to Cart ({selectedItem.price})
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
