import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Clock, MapPin, ShoppingBag, X } from 'lucide-react';
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
      
      setIsScrolled(scrollTop > 30);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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
    { label: 'Home', id: 'home' },
    { label: 'Menu', id: 'menu' },
    { label: 'Our Story', id: 'story' },
    { label: 'The Craft', id: 'experience' },
    { label: 'Specials', id: 'specials' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Visit Us', id: 'visit' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md border-b border-espresso/10 py-3.5 shadow-sm'
            : 'bg-transparent py-5 sm:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleLinkClick('home')}
            className="group text-left flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel rounded-lg p-1 -m-1"
            aria-label="NOIRÉ Café Home"
          >
            <div className="w-8 h-8 rounded-full border border-espresso/30 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 group-hover:border-caramel">
              <span className="font-serif text-sm font-semibold tracking-tighter text-espresso">N</span>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-espresso block leading-none">
                NOIRÉ
              </span>
              <span className="text-[10px] uppercase tracking-widest text-olive font-sans block mt-0.5">
                Specialty Coffee
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links with Animated Underline */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = 
                (item.id === 'menu' && currentView === 'menu') ||
                (item.id === 'home' && currentView === 'home');

              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-xs uppercase tracking-widest transition-colors duration-300 font-medium relative group py-1 focus-visible:ring-2 focus-visible:ring-caramel rounded px-1 -mx-1 ${
                    isActive ? 'text-caramel font-semibold' : 'text-espresso/80 hover:text-caramel'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-caramel transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right Action: Cart Drawer Trigger & Magnetic Reservation */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Opening Hours pill (Desktop only) */}
            <div className="hidden xl:flex items-center gap-2 text-xs text-espresso/70 bg-ivory-dark/60 px-3 py-1.5 rounded-full border border-espresso/5">
              <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
              <span className="font-mono text-[11px]">Open Today · 07:30 – 19:00</span>
            </div>

            {/* Shopping Cart Button with Dynamic Badge */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full bg-ivory-light border border-espresso/15 text-espresso hover:border-caramel hover:text-caramel transition-all duration-300 group flex items-center justify-center shadow-sm focus-visible:ring-2 focus-visible:ring-caramel"
              aria-label={`View cart (${totalItems} items)`}
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-caramel text-ivory text-[10px] font-mono font-bold flex items-center justify-center shadow-md animate-scale">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Magnetic Table Reservation Button */}
            <div className="hidden sm:block">
              <MagneticButton
                onClick={onOpenReservation}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-medium overflow-hidden transition-all duration-300 hover:bg-caramel hover:shadow-md"
              >
                <span>Reserve Table</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
            </div>

            {/* Animated Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 p-2 rounded-full hover:bg-espresso/5 transition-colors focus-visible:ring-2 focus-visible:ring-caramel"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-[1.5px] bg-espresso rounded-full block"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-[1.5px] bg-espresso rounded-full block"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-[1.5px] bg-espresso rounded-full block"
              />
            </button>
          </div>
        </div>

        {/* Scroll Progress Indicator Line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-caramel transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      </header>

      {/* Full-Screen Luxury Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-espresso/70 backdrop-blur-md lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="absolute top-0 right-0 w-full max-w-sm h-full bg-ivory shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-espresso/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full border border-espresso/30 flex items-center justify-center">
                      <span className="font-serif text-xs font-semibold">N</span>
                    </div>
                    <span className="font-serif text-2xl font-medium text-espresso">NOIRÉ</span>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-espresso/5 text-espresso/70 hover:text-espresso transition-colors"
                    aria-label="Close navigation"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Staggered Navigation Links */}
                <nav className="mt-8 flex flex-col gap-3">
                  {navItems.map((item, idx) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + idx * 0.05 }}
                      onClick={() => handleLinkClick(item.id)}
                      className="flex items-center justify-between text-left py-3.5 px-3 rounded-xl hover:bg-espresso/5 transition-colors border-b border-espresso/5 group"
                    >
                      <span className={`text-xl font-serif tracking-wide ${
                        item.id === currentView ? 'text-caramel font-semibold' : 'text-espresso'
                      }`}>
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-olive group-hover:text-caramel transition-colors">
                        0{idx + 1}
                      </span>
                    </motion.button>
                  ))}
                </nav>
              </div>

              {/* Bottom Quick Actions */}
              <div className="space-y-4 pt-6 border-t border-espresso/10">
                {/* Cart Shortcut */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCart();
                  }}
                  className="w-full py-3.5 rounded-xl bg-ivory-light border border-espresso/10 flex items-center justify-between px-4 text-xs font-mono hover:border-caramel transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-caramel" />
                    <span>Shopping Cart</span>
                  </div>
                  <span className="bg-espresso text-ivory px-2.5 py-0.5 rounded-full font-bold">
                    {totalItems} Items
                  </span>
                </button>

                {/* Opening Hours & Address */}
                <div className="text-xs text-espresso/70 space-y-1 font-mono">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-olive shrink-0" />
                    <span>Mon – Sun: 07:30 – 19:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-olive shrink-0" />
                    <span className="truncate">42 Limmatquai, 8001 Zürich</span>
                  </div>
                </div>

                {/* Reservation CTA */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full py-4 rounded-full bg-espresso text-ivory text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 hover:bg-caramel transition-colors shadow-md"
                >
                  <span>Reserve Table</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
