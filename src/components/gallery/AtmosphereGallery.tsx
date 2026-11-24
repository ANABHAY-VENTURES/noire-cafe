import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_PHOTOS } from '../../data/coffeeData';
import { GalleryPhoto } from '../../types';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const AtmosphereGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Architecture', 'Craft', 'Atmosphere', 'Extraction', 'Bakery'];

  const filteredPhotos = activeFilter === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === activeFilter);

  const currentIndex = selectedPhoto
    ? filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
    : -1;

  const handleNextPhoto = useCallback(() => {
    if (currentIndex >= 0 && filteredPhotos.length > 0) {
      const nextIdx = (currentIndex + 1) % filteredPhotos.length;
      setSelectedPhoto(filteredPhotos[nextIdx]);
    }
  }, [currentIndex, filteredPhotos]);

  const handlePrevPhoto = useCallback(() => {
    if (currentIndex >= 0 && filteredPhotos.length > 0) {
      const prevIdx = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      setSelectedPhoto(filteredPhotos[prevIdx]);
    }
  }, [currentIndex, filteredPhotos]);

  // Keyboard navigation: ESC to close, Left/Right arrows to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, handleNextPhoto, handlePrevPhoto]);

  // Editorial captions mapped by photo id
  const CAPTIONS: Record<string, string> = {
    g1: 'Monolithic Terrazzo Bar · Calibrated for silent workflow and gentle morning light reflection.',
    g2: 'Hand-Thrown Ceramic Dripper · Flatbed extraction engineered with Swiss stoneware for thermal preservation.',
    g3: 'Morning Solitude · North window lounge reserved for reading, contemplative design, and quiet cupping.',
    g4: 'Tactile Materials · Smoked alpine oak seating paired with Mediterranean olive greenery and linen acoustics.',
    g5: 'Synesso MVP Extraction · 9-bar saturated groupheads delivering silky single-estate crema down to 21.4% yield.',
    g6: 'Laminated Brioche · Freshly rolled with churned pasture butter and freshly stone-crushed green cardamom.',
    g7: 'Courtyard Light · Natural daylight filtering through raw linen drapery in the inner garden atrium.',
    g8: 'Kyoto Cold Extraction · Drop-by-drop slow immersion through hand-blown glass coils at a sustained 4°C.',
  };

  return (
    <section id="gallery" className="py-24 md:py-36 px-6 md:px-12 bg-ivory border-t border-espresso/10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-espresso/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-olive mb-3">
              <Sparkles className="w-3.5 h-3.5 text-caramel" />
              <span>05 / THE VISUAL ARCHIVE</span>
            </div>
            <h2 data-reveal="heading" className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-espresso tracking-tight">
              Café Atmosphere.
            </h2>
          </div>
          <p className="text-sm md:text-base text-espresso/70 max-w-md font-sans leading-relaxed">
            Constructed with acoustic silence in mind. Minimalist Swiss limestone, smoked alpine oak, and soft morning daylight.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 py-8 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-espresso text-ivory shadow-sm'
                  : 'bg-ivory-dark/60 text-espresso/70 hover:bg-ivory-dark hover:text-espresso'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetric Editorial Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 pt-4"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, idx) => {
              // Create deliberate asymmetric rhythm across 12-column grid
              let colSpanClass = 'lg:col-span-4';
              let aspectClass = 'aspect-[4/3]';

              if (photo.aspect === 'landscape') {
                colSpanClass = idx % 2 === 0 ? 'lg:col-span-8' : 'lg:col-span-7';
                aspectClass = 'aspect-[16/10]';
              } else if (photo.aspect === 'portrait') {
                colSpanClass = 'lg:col-span-4 sm:col-span-1';
                aspectClass = 'aspect-[3/4]';
              } else if (photo.aspect === 'square') {
                colSpanClass = 'lg:col-span-5 sm:col-span-1';
                aspectClass = 'aspect-square';
              }

              return (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  onClick={() => setSelectedPhoto(photo)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl border border-espresso/10 bg-ivory-dark ${colSpanClass}`}
                >
                  <div className={`relative w-full h-full ${aspectClass} overflow-hidden`}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Subtle Editorial Overlay on Hover */}
                    <div className="absolute inset-0 bg-espresso/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-ivory backdrop-blur-[2px]">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-caramel bg-espresso/80 px-3 py-1 rounded-full border border-ivory/15">
                          {photo.category}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-ivory/20 backdrop-blur-sm flex items-center justify-center text-ivory group-hover:rotate-45 transition-transform duration-300">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-olive-light uppercase tracking-wider block">
                          {photo.location}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-medium text-ivory">
                          {photo.title}
                        </h3>
                        <p className="text-xs text-ivory/80 font-sans line-clamp-2 pt-1 font-light">
                          {CAPTIONS[photo.id] || photo.alt}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-espresso/95 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-ivory/10 text-ivory hover:bg-ivory hover:text-espresso transition-colors z-50 shadow-lg"
              aria-label="Close lightbox (ESC)"
              title="Close (ESC)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Image Chevron */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-ivory/10 text-ivory hover:bg-ivory hover:text-espresso transition-colors z-50 shadow-lg"
              aria-label="Previous photo (Left Arrow)"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Image Chevron */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-ivory/10 text-ivory hover:bg-ivory hover:text-espresso transition-colors z-50 shadow-lg"
              aria-label="Next photo (Right Arrow)"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full max-h-[90vh] flex flex-col rounded-3xl overflow-hidden bg-ivory border border-espresso/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] bg-espresso overflow-hidden max-h-[68vh] flex items-center justify-center">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lightbox Caption Bar */}
              <div className="p-6 sm:p-8 bg-ivory flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-espresso/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-olive bg-olive/15 px-2.5 py-0.5 rounded-full">
                      {selectedPhoto.category}
                    </span>
                    <span className="text-xs font-mono text-espresso/60">
                      {selectedPhoto.location}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-espresso">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs text-espresso/70 font-sans max-w-xl">
                    {CAPTIONS[selectedPhoto.id] || selectedPhoto.alt}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono text-xs font-semibold text-espresso">
                    0{currentIndex + 1} / 0{filteredPhotos.length}
                  </div>
                  <span className="text-[10px] font-mono text-espresso/50 uppercase tracking-wider block">
                    Use Arrow Keys or ESC
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
