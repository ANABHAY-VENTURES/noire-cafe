import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MagneticButton } from './MagneticButton';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentView: 'home' | 'menu';
  onNavigate: (target: string) => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setIsScrolled(scrollTop > 20);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Overview', id: 'home' },
    { label: 'Menu', id: 'menu' },
    { label: 'Philosophy', id: 'story' },
    { label: 'Craft', id: 'experience' },
    { label: 'Seasonal', id: 'specials' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Visit', id: 'visit' },
    { label: 'Admin', id: 'admin' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 md:px-8 ${
          isScrolled ? 'pt-3' : 'pt-5 sm:pt-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Main Floating Capsule Dock */}
          <div
            className={`w-full flex items-center justify-between px-5 sm:px-7 py-3 rounded-full transition-all duration-500 border ${
              isScrolled
                ? 'bg-[#0E0E10]/90 backdrop-blur-xl border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                : 'bg-[#141416]/70 backdrop-blur-lg border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
            }`}
          >
            {/* Minimal Brandmark */}
            <button
              onClick={() => handleLinkClick('home')}
              className="group text-left flex items-center gap-3 focus:outline-none rounded-full shrink-0"
              aria-label="NOIRÉ Atelier Home"
            >
              <div className="w-8 h-8 rounded-full border border-champagne/40 bg-white/5 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:border-champagne shrink-0">
                <span className="font-serif text-xs font-semibold tracking-tighter text-champagne">N</span>
              </div>
              <div className="flex flex-col shrink-0">
                <span className="font-sans text-sm tracking-[0.25em] font-semibold text-white uppercase block leading-none whitespace-nowrap">
                  NOIRÉ
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-mono block mt-1 whitespace-nowrap">
                  ATELIER · ZÜRICH
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-7 shrink-0" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = 
                  (item.id === 'menu' && currentView === 'menu') ||
                  (item.id === 'home' && currentView === 'home');

                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`text-[11px] uppercase tracking-[0.18em] font-mono transition-all duration-200 relative py-1.5 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      isActive ? 'text-champagne font-semibold' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {isActive && <span className="w-1 h-1 rounded-full bg-champagne animate-pulse shrink-0" />}
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action: Live Status, Cart & Reserve Table */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Telemetry pill */}
              <div className="hidden xl:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ROASTERY OPEN · 07:30</span>
              </div>

              {/* Shopping Bag Trigger */}
              <button
                onClick={openCart}
                className="relative p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:border-champagne hover:text-champagne transition-all duration-300 group flex items-center justify-center focus-visible:ring-1 focus-visible:ring-champagne"
                aria-label={`View cart (${totalItems} items)`}
              >
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-champagne text-black text-[9px] font-mono font-bold flex items-center justify-center shadow-lg">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Magnetic Reservation Button */}
              <div className="hidden sm:block">
                <MagneticButton
                  onClick={onOpenReservation}
                  className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-[11px] font-mono uppercase tracking-widest font-semibold overflow-hidden transition-all duration-300 hover:bg-champagne hover:shadow-lg"
                >
                  <span>Reserve Atelier</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1 p-2 rounded-full bg-white/5 border border-white/10 text-white focus-visible:ring-1 focus-visible:ring-champagne"
                aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              >
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-[1.5px] bg-white rounded-full block"
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-[1.5px] bg-white rounded-full block"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-[1.5px] bg-white rounded-full block"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Scroll Hairline */}
        <div
          className="max-w-7xl mx-auto h-[1px] bg-champagne/40 transition-all duration-100 ease-out mt-1"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      </header>

      {/* Full-Screen Modern Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl lg:hidden flex flex-col justify-between p-6 sm:p-10"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-champagne/50 flex items-center justify-center">
                    <span className="font-serif text-sm font-semibold text-champagne">N</span>
                  </div>
                  <div>
                    <span className="font-sans text-sm font-bold tracking-[0.2em] text-white uppercase block">NOIRÉ</span>
                    <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block">Atelier</span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="mt-8 flex flex-col gap-2">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + idx * 0.04 }}
                    onClick={() => handleLinkClick(item.id)}
                    className="flex items-center justify-between text-left py-3.5 px-3 rounded-xl hover:bg-white/5 transition-colors border-b border-white/5 group"
                  >
                    <span className={`text-lg font-mono tracking-wider uppercase ${
                      item.id === currentView ? 'text-champagne font-bold' : 'text-white/80 group-hover:text-white'
                    }`}>
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-white/30 group-hover:text-champagne">
                      [0{idx + 1}]
                    </span>
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-between text-xs font-mono uppercase tracking-widest"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-champagne" />
                  Cart Checkout
                </span>
                <span className="text-champagne font-bold">{totalItems} Items</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-champagne text-black flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest font-bold shadow-lg"
              >
                <span>Reserve Table Experience</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
