import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from './context/CartContext';
import { useLenis } from './hooks/useLenis';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Preloader } from './components/common/Preloader';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/common/Navbar';
import { Hero } from './components/hero/Hero';
import { StorySection } from './components/story/StorySection';
import { MenuSection } from './components/menu/MenuSection';
import { MenuPage } from './components/menu/MenuPage';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { SeasonalSpecials } from './components/specials/SeasonalSpecials';
import { AtmosphereGallery } from './components/gallery/AtmosphereGallery';
import { VisitSection } from './components/visit/VisitSection';
import { FinalCtaSection } from './components/cta/FinalCtaSection';
import { ReservationModal } from './components/visit/ReservationModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { Footer } from './components/footer/Footer';

import { AdminApp } from './admin/AdminApp';

const AppContent: React.FC = () => {
  const { scrollTo } = useLenis();
  useScrollReveal();
  const [currentView, setCurrentView] = useState<'home' | 'menu' | 'admin'>('home');
  const [reservationOpen, setReservationOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#admin' || hash === '#/admin' || hash === '#dashboard') {
        setCurrentView('admin');
      } else if (hash === '#menu-page' || hash === '#menu') {
        setCurrentView('menu');
      } else {
        setCurrentView('home');
      }
    };

    if (window.location.hash === '#admin' || window.location.hash === '#/admin' || window.location.hash === '#dashboard') {
      setCurrentView('admin');
    } else if (window.location.hash === '#menu-page' || window.location.hash === '#menu') {
      setCurrentView('menu');
    }

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Refresh GSAP ScrollTrigger after route transition
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);
    return () => clearTimeout(timer);
  }, [currentView]);

  const handleNavigate = (target: string) => {
    if (target === 'admin') {
      setCurrentView('admin');
      window.location.hash = 'admin';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'menu') {
      setCurrentView('menu');
      window.location.hash = 'menu-page';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'home' || target === 'hero') {
      setCurrentView('home');
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Navigating to section on homepage
    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = '';
      setTimeout(() => {
        scrollTo(`#${target}`, { offset: -60, duration: 1.2 });
      }, 120);
    } else {
      scrollTo(`#${target}`, { offset: -60, duration: 1.2 });
    }
  };

  if (currentView === 'admin') {
    return (
      <div className="relative min-h-screen bg-ivory text-espresso font-sans">
        <CustomCursor />
        <AdminApp onBackToSite={() => handleNavigate('home')} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-ivory text-espresso selection:bg-caramel/25 selection:text-espresso font-sans">
      
      {/* Elegant Full-Screen Preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Accessible Skip-To-Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-5 focus:py-2.5 focus:bg-espresso focus:text-ivory focus:rounded-full focus:font-mono focus:text-xs focus:shadow-xl focus:border focus:border-caramel"
      >
        Skip to main content
      </a>

      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Global Minimal Navigation with Dynamic Cart Badge & Hairline Progress */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenReservation={() => setReservationOpen(true)}
      />

      {/* Main Content with Route Transitions */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Full Screen Cinematic Hero */}
              <Hero
                onExploreMenu={() => handleNavigate('menu')}
                onExploreStory={() => handleNavigate('story')}
              />

              {/* Section 1: Our Story & Section 2: Our Philosophy */}
              <StorySection />

              {/* Explore Our Menu Section with Category Pills & Interactive Cards */}
              <MenuSection onViewFullMenu={() => handleNavigate('menu')} />

              {/* Section 3: The Craft Sequence & Section 4: Experience */}
              <ExperienceSection onNavigateToVisit={() => handleNavigate('visit')} />

              {/* Featured Seasonal Specials with Sensory Meters */}
              <SeasonalSpecials />

              {/* Café Atmosphere and Interior Gallery with Fullscreen Lightbox */}
              <AtmosphereGallery />

              {/* Visit Us: Opening Hours, Location, Interactive Google Maps Embed */}
              <VisitSection onOpenReservation={() => setReservationOpen(true)} />

              {/* Final Cinematic CTA (Make room for a little ritual) */}
              <FinalCtaSection onNavigateToVisit={() => handleNavigate('visit')} />
            </motion.div>
          ) : (
            /* Full Dedicated Editorial Menu Page */
            <motion.div
              key="menu-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <MenuPage onBackToHome={() => handleNavigate('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenReservation={() => setReservationOpen(true)}
      />

      {/* Interactive Shopping Cart Drawer */}
      <CartDrawer
        onCheckout={() => setCheckoutOpen(true)}
        onExploreMenu={() => handleNavigate('menu')}
      />

      {/* Functional Demo Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />

      {/* Table Reservation Dialog Modal */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
