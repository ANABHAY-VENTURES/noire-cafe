import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/coffeeData';
import { MenuItem, MenuCategoryType } from '../../types';
import { useCart } from '../../context/CartContext';
import { 
  ArrowUpRight, 
  Plus, 
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
    <div className="min-h-screen bg-ivory text-espresso pt-28 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Subtle Grain Texture */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Back Navigation Pill */}
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="mb-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-espresso/60 hover:text-caramel transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Return to Sanctuary</span>
          </button>
        )}

        {/* Editorial Menu Header */}
        <header className="pb-12 border-b border-espresso/10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-olive/15 text-olive text-[11px] font-mono uppercase tracking-widest mb-3">
                <Sparkles className="w-3 h-3" />
                <span>01 / Complete Harvest Offerings</span>
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-espresso">
                The Curated Menu.
              </h1>
            </div>

            <p className="text-sm md:text-base text-espresso/70 max-w-md font-sans leading-relaxed">
              Every extraction is dialed to order using remineralized 72 PPM water and single-origin micro-lots roasted in small batches. All prices inclusive of hospitality taxes.
            </p>
          </div>

          {/* Editorial Specs Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-[11px] font-mono text-espresso/60 border-t border-espresso/5">
            <div>
              <span className="text-olive block">WATER PROFILE</span>
              <span className="text-espresso font-semibold">72 PPM · 93.5°C Stability</span>
            </div>
            <div>
              <span className="text-olive block">EXTRACTION RATIOS</span>
              <span className="text-espresso font-semibold">1:1.8 Espresso · 1:16.2 Filter</span>
            </div>
            <div>
              <span className="text-olive block">DAIRY PARTNERSHIP</span>
              <span className="text-espresso font-semibold">Pasture Whole & Oatly Barista</span>
            </div>
            <div>
              <span className="text-olive block">CURRENCY</span>
              <span className="text-caramel font-semibold">INR (₹) Hospitality Pricing</span>
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
                  className={`relative px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-espresso text-ivory shadow-md'
                      : 'bg-ivory-dark/60 text-espresso/80 hover:bg-ivory-dark hover:text-espresso'
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="categoryActiveIndicator"
                      className="absolute inset-0 rounded-full border-2 border-caramel -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search & Temperature Sub-Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-espresso/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes (e.g. Cardamom, Jasmine, Valrhona)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-ivory-light border border-espresso/15 text-xs text-espresso placeholder-espresso/40 focus:outline-none focus:border-caramel font-sans transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Temperature Pills */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[10px] font-mono uppercase tracking-wider text-espresso/50 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" />
                <span>Temp:</span>
              </span>
              {(['all', 'Hot', 'Iced'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTemperature(t)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all ${
                    selectedTemperature === t
                      ? 'bg-espresso text-ivory'
                      : 'bg-ivory-dark/40 text-espresso/70 hover:bg-ivory-dark'
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
              className="fixed bottom-8 right-8 z-50 p-4 rounded-xl bg-espresso text-ivory text-xs font-mono flex items-center gap-3 shadow-2xl border border-ivory/20"
            >
              <div className="w-5 h-5 rounded-full bg-olive flex items-center justify-center text-ivory">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Added <strong>{addedItemNotice}</strong> to your order.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Responsive Asymmetric Product Grid */}
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
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative rounded-2xl bg-ivory-light border border-espresso/10 p-5 flex flex-col justify-between hover:border-caramel/40 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    isWide ? 'md:col-span-2' : ''
                  }`}
                >
                  <div>
                    {/* Visual Photography with Zoom Animation */}
                    <div
                      className={`relative rounded-xl overflow-hidden mb-5 bg-ivory-dark ${
                        isTall ? 'aspect-[4/4.5]' : isWide ? 'aspect-[21/10]' : 'aspect-[16/11]'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {item.badge && (
                          <span className="bg-espresso/85 backdrop-blur-sm text-ivory px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase border border-ivory/15">
                            {item.badge}
                          </span>
                        )}
                        {item.temperature && (
                          <span className="bg-ivory/90 backdrop-blur-sm text-espresso px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider">
                            {item.temperature}
                          </span>
                        )}
                      </div>

                      {/* Origin overlay */}
                      {item.origin && (
                        <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-ivory/90 drop-shadow">
                          {item.origin}
                        </div>
                      )}
                    </div>

                    {/* Category metadata */}
                    <div className="text-[10px] font-mono uppercase tracking-widest text-olive mb-1">
                      {item.category.replace('-', ' & ')}
                    </div>

                    {/* Name & INR Price */}
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <h3 className="font-serif text-xl font-medium text-espresso group-hover:text-caramel transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-serif text-lg font-medium text-caramel shrink-0">
                        {item.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-espresso/70 font-sans line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Tasting Notes */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.notes.map((note) => (
                        <span
                          key={note}
                          className="px-2 py-0.5 rounded bg-ivory-dark/70 text-espresso/80 text-[10px] font-mono uppercase tracking-wider"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-3 border-t border-espresso/10 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-espresso/60 group-hover:text-espresso flex items-center gap-1">
                      <span>Details</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>

                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-medium flex items-center gap-1.5 transition-all duration-300 ${
                        qtyInCart > 0
                          ? 'bg-olive text-ivory shadow-sm'
                          : 'bg-espresso text-ivory hover:bg-caramel'
                      }`}
                      aria-label={`Add ${item.name} to order`}
                    >
                      <Plus className="w-3 h-3" />
                      <span>{qtyInCart > 0 ? `In Order (${qtyInCart})` : 'Add to Order'}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <p className="font-serif text-2xl text-espresso">
              No items matching "{searchQuery}" in this category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setSelectedTemperature('all');
              }}
              className="px-6 py-2.5 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-mono hover:bg-caramel transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Item Extraction Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/65 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-ivory rounded-3xl p-6 sm:p-8 shadow-2xl border border-espresso/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-ivory-dark text-espresso hover:bg-espresso hover:text-ivory transition-colors z-10"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="aspect-square rounded-2xl overflow-hidden bg-ivory-dark">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-olive bg-olive/15 px-3 py-1 rounded-full">
                    {selectedItem.category.toUpperCase()} · EXTRACTION LAB
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso">
                    {selectedItem.name}
                  </h3>

                  <div className="font-serif text-2xl text-caramel font-medium">
                    {selectedItem.price}
                  </div>

                  <p className="text-xs text-espresso/70 leading-relaxed font-sans">
                    {selectedItem.description}
                  </p>

                  <div className="space-y-2 py-3 border-y border-espresso/10 text-xs font-mono">
                    {selectedItem.origin && (
                      <div className="flex justify-between">
                        <span className="text-espresso/60">Terroir Origin</span>
                        <span className="text-espresso">{selectedItem.origin}</span>
                      </div>
                    )}
                    {selectedItem.process && (
                      <div className="flex justify-between">
                        <span className="text-espresso/60">Fermentation</span>
                        <span className="text-espresso">{selectedItem.process}</span>
                      </div>
                    )}
                    {selectedItem.elevation && (
                      <div className="flex justify-between">
                        <span className="text-espresso/60">Farm Altitude</span>
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
                      handleAddToCart(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="w-full py-3.5 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-medium hover:bg-caramel transition-colors flex items-center justify-center gap-2 shadow-md"
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
    </div>
  );
};
